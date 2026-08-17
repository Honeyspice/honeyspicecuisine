import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Collapse, Skeleton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';
import { apiUrl } from '../utils/apiBase';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const MEALS = ['breakfast', 'lunch', 'dinner'];
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙' };
const MEAL_COLORS = { breakfast: '#FFF3E0', lunch: '#E8F5E9', dinner: '#EDE7F6' };
const MEAL_BORDER = { breakfast: '#FFB74D', lunch: '#66BB6A', dinner: '#9575CD' };

const MealCard = ({ meal, mealData }) => {
  const [open, setOpen] = useState(false);
  if (!mealData) return null;
  return (
    <Box
      sx={{
        bgcolor: MEAL_COLORS[meal],
        border: `1px solid ${MEAL_BORDER[meal]}`,
        borderRadius: 2.5,
        mb: 1.5,
        overflow: 'hidden',
      }}
    >
      <Box
        onClick={() => setOpen(o => !o)}
        sx={{ p: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5 }}
      >
        <span style={{ fontSize: '1.2rem' }}>{MEAL_ICONS[meal]}</span>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888' }}>{meal}</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', lineHeight: 1.2 }}>{mealData.name}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#F46A06' }}>{mealData.calories} cal</Typography>
          <Typography sx={{ fontSize: '0.7rem', color: '#888' }}>{mealData.prepTime} min</Typography>
        </Box>
        <Typography sx={{ color: '#aaa', fontSize: '1rem', ml: 0.5 }}>{open ? '▲' : '▼'}</Typography>
      </Box>
      <Collapse in={open}>
        <Box sx={{ px: 2, pb: 2, borderTop: `1px solid ${MEAL_BORDER[meal]}`, pt: 1.5 }}>
          {mealData.description && (
            <Typography sx={{ fontSize: '0.85rem', color: '#555', mb: 1.5, lineHeight: 1.6 }}>{mealData.description}</Typography>
          )}
          {mealData.nutrients && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <span style={{ fontSize: '0.9rem' }}>💊</span>
              <Typography sx={{ fontSize: '0.8rem', color: '#27ae60', fontWeight: 600 }}>{mealData.nutrients}</Typography>
            </Box>
          )}
          {mealData.recipe && (
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2, p: 1.5 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', mb: 0.75 }}>How to Cook</Typography>
              <Typography sx={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.7 }}>{mealData.recipe}</Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

const MealPlan = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [activeDay, setActiveDay] = useState('monday');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.currentMealPlan) {
      setPlan(user.currentMealPlan);
      setLoading(false);
      return;
    }
    fetch(apiUrl('/api/mealplan/current'), { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { setPlan(data.mealPlan); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user, token]);

  const handleRegenerate = async () => {
    setError('');
    setGenerating(true);
    try {
      const res = await fetch(apiUrl('/api/mealplan/generate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPlan(data.mealPlan);
    } catch (err) {
      setError(err.message || 'Failed to regenerate. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const totalCalories = plan?.weeklyPlan?.[activeDay]
    ? MEALS.reduce((sum, m) => sum + (plan.weeklyPlan[activeDay][m]?.calories || 0), 0)
    : 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f6' }}>
      <Seo title="My Meal Plan | HoneySpice Cuisine" description="Your personalised 7-day Nigerian meal plan, tailored to your health profile and dietary goals." />
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '28vh', md: '34vh' },
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          backgroundImage: 'url(/images/jollof_rice.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          '&::before': { content: '""', position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(244,106,6,0.5) 0%,rgba(0,0,0,0.1) 100%)', zIndex: 1 },
          '&::after': { content: '""', position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, textShadow: '2px 2px 4px rgba(0,0,0,0.3)', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
            Your Personalised Meal Plan
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.85)', mt: 1 }}>
            Personalised Nigerian nutrition, tailored to your goals
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ background: 'white', borderRadius: 3, p: 2, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                {[...Array(7)].map((_, i) => (
                  <Skeleton key={i} variant="rounded" height={40} sx={{ mb: 0.5, borderRadius: 2 }} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ background: 'white', borderRadius: 3, p: 3, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', mb: 3 }}>
                <Skeleton variant="text" width="40%" height={36} />
                <Skeleton variant="text" width="80%" />
              </Box>
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="rounded" height={72} sx={{ mb: 1.5, borderRadius: 2.5 }} />
              ))}
            </Grid>
          </Grid>
        )}

        {!loading && !plan && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: '2rem', mb: 2 }}>🤖</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>No meal plan yet</Typography>
            <Typography sx={{ color: '#666', mb: 3 }}>Generate your personalised meal plan from the Dashboard</Typography>
            <button
              onClick={() => navigate('/dashboard')}
              style={{ padding: '12px 28px', borderRadius: 10, border: 'none', background: '#F46A06', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Go to Dashboard
            </button>
          </Box>
        )}

        {!loading && plan && (
          <Grid container spacing={3}>
            {/* Left: Days + Summary */}
            <Grid item xs={12} md={3}>
              <Box sx={{ background: 'white', borderRadius: 3, p: 2, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', mb: 2 }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#888', mb: 1.5 }}>This Week</Typography>
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', textAlign: 'left', cursor: 'pointer', marginBottom: 4,
                      background: activeDay === day ? '#F46A06' : 'transparent',
                      color: activeDay === day ? 'white' : '#444',
                      fontWeight: activeDay === day ? 700 : 500, fontSize: '0.9rem', transition: 'all 0.15s',
                    }}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </button>
                ))}
              </Box>

              {/* Shopping List */}
              {plan.shoppingList?.length > 0 && (
                <Box sx={{ background: 'white', borderRadius: 3, p: 2, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                  <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.9rem' }}>Shopping List</Typography>
                  {plan.shoppingList.map((item, i) => (
                    <Typography key={i} sx={{ fontSize: '0.8rem', color: '#555', py: 0.3, borderBottom: i < plan.shoppingList.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      • {item}
                    </Typography>
                  ))}
                </Box>
              )}
            </Grid>

            {/* Right: Daily meals */}
            <Grid item xs={12} md={9}>
              {/* Day header */}
              <Box sx={{ background: 'white', borderRadius: 3, p: 3, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, textTransform: 'capitalize', color: '#1a1a1a' }}>
                    {activeDay}
                  </Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: '#F46A06' }}>{totalCalories}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>total cal</Typography>
                  </Box>
                </Box>
                {plan.summary && (
                  <Typography sx={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6 }}>{plan.summary}</Typography>
                )}
              </Box>

              {/* Meals */}
              {MEALS.map(meal => (
                <MealCard key={meal} meal={meal} mealData={plan.weeklyPlan?.[activeDay]?.[meal]} />
              ))}

              {/* Tips */}
              {(plan.nutritionTips?.length > 0 || plan.cookingTips?.length > 0) && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {plan.nutritionTips?.length > 0 && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ background: 'white', borderRadius: 3, p: 2.5, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                        <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.9rem' }}>Nutrition Tips</Typography>
                        {plan.nutritionTips.map((tip, i) => (
                          <Typography key={i} sx={{ fontSize: '0.82rem', color: '#555', mb: 0.75, lineHeight: 1.5 }}>• {tip}</Typography>
                        ))}
                      </Box>
                    </Grid>
                  )}
                  {plan.cookingTips?.length > 0 && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ background: 'white', borderRadius: 3, p: 2.5, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
                        <Typography sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.9rem' }}>Cooking Tips</Typography>
                        {plan.cookingTips.map((tip, i) => (
                          <Typography key={i} sx={{ fontSize: '0.82rem', color: '#555', mb: 0.75, lineHeight: 1.5 }}>• {tip}</Typography>
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Error + Regenerate */}
              {error && (
                <Box sx={{ bgcolor: '#fff3f0', border: '1px solid #ffccc7', color: '#c0392b', p: 2, borderRadius: 2, mt: 2, fontSize: '0.875rem' }}>
                  {error}
                </Box>
              )}
              <button
                onClick={handleRegenerate}
                disabled={generating}
                style={{ marginTop: 20, width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: generating ? '#ccc' : 'linear-gradient(135deg,#F46A06,#FF8D3D)', color: 'white', fontWeight: 700, cursor: generating ? 'not-allowed' : 'pointer', fontSize: '1rem', boxShadow: generating ? 'none' : '0 4px 16px rgba(244,106,6,0.25)' }}
              >
                {generating ? 'Claude is generating your new plan…' : 'Regenerate Meal Plan'}
              </button>
              {generating && (
                <Typography sx={{ textAlign: 'center', color: '#888', fontSize: '0.8rem', mt: 1 }}>
                  This takes 15–30 seconds. Claude is personalising your nutrition
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MealPlan;
