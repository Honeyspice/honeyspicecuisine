const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Inline JWT auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Save health profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { healthProfile: req.body },
      { new: true, select: 'healthProfile name email' }
    );
    res.json({ healthProfile: user.healthProfile });
  } catch (err) {
    console.error('Profile save error:', err);
    res.status(500).json({ message: 'Failed to save profile' });
  }
});

// Get health profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('healthProfile name email');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Generate AI meal plan using Claude
router.post('/generate', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('healthProfile name');
    const profile = req.body.profile || user.healthProfile;

    if (!profile || !profile.age) {
      return res.status(400).json({ message: 'Please complete your health profile first' });
    }

    const bmi = profile.weight && profile.height
      ? (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)
      : null;

    const goalDescriptions = {
      weight_loss: 'weight loss (reduced calorie, high fibre)',
      muscle_gain: 'muscle gain (high protein)',
      balanced_diet: 'a balanced, nutritious diet',
      manage_diabetes: 'blood sugar management (low glycaemic index)',
      manage_hypertension: 'blood pressure management (low sodium)',
      heart_health: 'heart health (low saturated fat)',
    };

    const goalText = (profile.healthGoals || ['balanced_diet'])
      .map(g => goalDescriptions[g] || g)
      .join(', ');

    const skillNote = {
      beginner: 'Keep recipes very simple — under 30 minutes, minimal ingredients.',
      intermediate: 'Recipes can have moderate complexity.',
      advanced: 'Feel free to include complex traditional techniques.',
    }[profile.cookingSkill] || '';

    const prompt = `You are a registered Nigerian nutritionist and personal chef. Create a personalised 7-day Nigerian food meal plan.

PERSON PROFILE:
- Name: ${user.name}
- Age: ${profile.age}, Gender: ${profile.gender}
- Weight: ${profile.weight}kg, Height: ${profile.height}cm${bmi ? `, BMI: ${bmi}` : ''}
- Activity Level: ${profile.activityLevel?.replace('_', ' ')}
- Health Goals: ${goalText}
- Dietary Restrictions: ${profile.dietaryRestrictions?.filter(r => r !== 'none').join(', ') || 'None'}
- Allergies: ${profile.allergies || 'None'}
- Cooking for: ${profile.numberOfPeople} person(s)
- Weekly Budget: ${profile.budgetPerWeek}
- Cooking Skill: ${profile.cookingSkill}. ${skillNote}

RULES:
- Use ONLY authentic Nigerian dishes
- Respect all dietary restrictions and allergies strictly
- Tailor calories and portions to their goals and BMI
- Vary dishes — do not repeat the same dish more than twice across the week
- recipe should be 3 clear numbered steps

Return ONLY a raw JSON object (no markdown, no code fences) with this exact structure:
{
  "summary": "2-3 sentence personalised intro addressing ${user.name} directly",
  "weeklyPlan": {
    "monday": {
      "breakfast": { "name": "dish name", "description": "what it is in 1 sentence", "prepTime": 20, "calories": 350, "nutrients": "key nutrients", "recipe": "1. Step one. 2. Step two. 3. Step three." },
      "lunch": { "name": "", "description": "", "prepTime": 30, "calories": 500, "nutrients": "", "recipe": "" },
      "dinner": { "name": "", "description": "", "prepTime": 40, "calories": 600, "nutrients": "", "recipe": "" }
    },
    "tuesday": { "breakfast": {...}, "lunch": {...}, "dinner": {...} },
    "wednesday": { "breakfast": {...}, "lunch": {...}, "dinner": {...} },
    "thursday": { "breakfast": {...}, "lunch": {...}, "dinner": {...} },
    "friday": { "breakfast": {...}, "lunch": {...}, "dinner": {...} },
    "saturday": { "breakfast": {...}, "lunch": {...}, "dinner": {...} },
    "sunday": { "breakfast": {...}, "lunch": {...}, "dinner": {...} }
  },
  "shoppingList": ["item 1", "item 2", "item 3"],
  "nutritionTips": ["tip 1", "tip 2", "tip 3"],
  "cookingTips": ["tip 1", "tip 2"]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 8000,
      thinking: { type: 'adaptive' },
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = response.content.find(b => b.type === 'text');
    if (!textBlock) throw new Error('No text in Claude response');

    // Strip markdown fences if present
    const cleaned = textBlock.text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not extract JSON from Claude response');

    const mealPlan = JSON.parse(jsonMatch[0]);

    // Persist to user document
    await User.findByIdAndUpdate(req.user.userId, {
      currentMealPlan: mealPlan,
      mealPlanGeneratedAt: new Date(),
    });

    res.json({ mealPlan });
  } catch (err) {
    console.error('Meal plan generation error:', err);
    res.status(500).json({ message: 'Failed to generate meal plan. Please try again.' });
  }
});

// Get saved meal plan
router.get('/current', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('currentMealPlan mealPlanGeneratedAt');
    res.json({ mealPlan: user.currentMealPlan, generatedAt: user.mealPlanGeneratedAt });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch meal plan' });
  }
});

module.exports = router;
