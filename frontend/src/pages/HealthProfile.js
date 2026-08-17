import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/apiBase';

const STEPS = ['Body & Activity', 'Health Goals', 'Diet & Kitchen'];

const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Desk job, little exercise' },
  { value: 'light', label: 'Light', desc: '1–3 days exercise/week' },
  { value: 'moderate', label: 'Moderate', desc: '3–5 days exercise/week' },
  { value: 'active', label: 'Active', desc: '6–7 days exercise/week' },
  { value: 'very_active', label: 'Very Active', desc: 'Physical job + daily training' },
];

const HEALTH_GOALS = [
  { value: 'balanced_diet', label: 'Balanced Diet', icon: '🥗' },
  { value: 'weight_loss', label: 'Lose Weight', icon: '⚖️' },
  { value: 'muscle_gain', label: 'Build Muscle', icon: '💪' },
  { value: 'manage_diabetes', label: 'Manage Diabetes', icon: '🩺' },
  { value: 'manage_hypertension', label: 'Manage Blood Pressure', icon: '❤️' },
  { value: 'heart_health', label: 'Heart Health', icon: '🫀' },
];

const DIETARY = [
  { value: 'none', label: 'No Restrictions' },
  { value: 'halal', label: 'Halal' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten_free', label: 'Gluten-Free' },
  { value: 'dairy_free', label: 'Dairy-Free' },
];

const defaultProfile = {
  age: '', gender: 'male', weight: '', height: '',
  activityLevel: 'moderate',
  healthGoals: ['balanced_diet'],
  dietaryRestrictions: ['none'],
  allergies: '',
  cookingSkill: 'intermediate',
  numberOfPeople: 1,
  budgetPerWeek: 'moderate',
};

const pill = (active, onClick, children) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '10px 18px',
      borderRadius: 50,
      border: `2px solid ${active ? '#F46A06' : '#e0e0e0'}`,
      background: active ? '#F46A06' : 'white',
      color: active ? 'white' : '#444',
      fontWeight: 600,
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.15s',
    }}
  >
    {children}
  </button>
);

const HealthProfile = () => {
  const { token, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(defaultProfile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Pre-fill if profile already exists
    fetch(apiUrl('/api/mealplan/profile'), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.healthProfile?.age) {
          setProfile(p => ({ ...p, ...data.healthProfile }));
        }
      })
      .catch(() => {});
  }, [token]);

  const toggleGoal = (val) => {
    setProfile(p => ({
      ...p,
      healthGoals: p.healthGoals.includes(val)
        ? p.healthGoals.filter(g => g !== val)
        : [...p.healthGoals, val],
    }));
  };

  const toggleDiet = (val) => {
    if (val === 'none') {
      setProfile(p => ({ ...p, dietaryRestrictions: ['none'] }));
      return;
    }
    setProfile(p => {
      const filtered = p.dietaryRestrictions.filter(d => d !== 'none');
      return {
        ...p,
        dietaryRestrictions: filtered.includes(val)
          ? filtered.filter(d => d !== val)
          : [...filtered, val],
      };
    });
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      const res = await fetch(apiUrl('/api/mealplan/profile'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error('Failed to save');
      refreshUser();
      navigate('/dashboard');
    } catch (err) {
      setError('Could not save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const input = (label, field, type = 'number', props = {}) => (
    <Box>
      <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
        {label}
      </Typography>
      <input
        type={type}
        value={profile[field]}
        onChange={e => setProfile(p => ({ ...p, [field]: e.target.value }))}
        style={{ display: 'block', width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
        onFocus={e => (e.target.style.borderColor = '#F46A06')}
        onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
        {...props}
      />
    </Box>
  );

  const progressPct = ((step + 1) / STEPS.length) * 100;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #F46A06 0%, #FF8D3D 100%)',
        py: { xs: 4, md: 6 }, px: 2, textAlign: 'center',
      }}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>Your Health Profile</Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>
          Tell us about yourself so we can build your perfect Nigerian meal plan
        </Typography>
        {/* Progress bar */}
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            {STEPS.map((s, i) => (
              <Typography key={s} sx={{ fontSize: '0.75rem', color: i <= step ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: i === step ? 700 : 400 }}>
                {s}
              </Typography>
            ))}
          </Box>
          <Box sx={{ height: 6, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 3 }}>
            <Box sx={{ height: '100%', bgcolor: 'white', borderRadius: 3, width: `${progressPct}%`, transition: 'width 0.4s ease' }} />
          </Box>
        </Box>
      </Box>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ background: 'white', borderRadius: 4, p: { xs: 3, md: 4 }, boxShadow: '0 4px 30px rgba(0,0,0,0.07)' }}>
          {error && (
            <Box sx={{ bgcolor: '#fff3f0', border: '1px solid #ffccc7', color: '#c0392b', p: 2, borderRadius: 2, mb: 3, fontSize: '0.875rem' }}>
              {error}
            </Box>
          )}

          {/* Step 0: Body & Activity */}
          {step === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>About Your Body</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>{input('Age (years)', 'age', 'number', { min: 10, max: 120 })}</Grid>
                <Grid item xs={6}>{input('Weight (kg)', 'weight', 'number', { min: 20, max: 300 })}</Grid>
                <Grid item xs={6}>{input('Height (cm)', 'height', 'number', { min: 100, max: 250 })}</Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Gender</Typography>
                  <select
                    value={profile.gender}
                    onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))}
                    style={{ display: 'block', width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none', background: 'white' }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>Activity Level</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {ACTIVITY_LEVELS.map(a => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setProfile(p => ({ ...p, activityLevel: a.value }))}
                    style={{
                      padding: '12px 16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                      border: `2px solid ${profile.activityLevel === a.value ? '#F46A06' : '#e0e0e0'}`,
                      background: profile.activityLevel === a.value ? '#fff8f3' : 'white',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#1a1a1a' }}>{a.label}</span>
                    <span style={{ color: '#666', fontSize: '0.85rem', marginLeft: 8 }}>{a.desc}</span>
                  </button>
                ))}
              </Box>
            </Box>
          )}

          {/* Step 1: Health Goals */}
          {step === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Your Health Goals</Typography>
              <Typography sx={{ color: '#666', fontSize: '0.9rem', mt: -2 }}>Select all that apply</Typography>
              <Grid container spacing={1.5}>
                {HEALTH_GOALS.map(g => {
                  const active = profile.healthGoals.includes(g.value);
                  return (
                    <Grid item xs={6} key={g.value}>
                      <button
                        type="button"
                        onClick={() => toggleGoal(g.value)}
                        style={{
                          width: '100%', padding: '16px 12px', borderRadius: 12, cursor: 'pointer',
                          border: `2px solid ${active ? '#F46A06' : '#e0e0e0'}`,
                          background: active ? '#fff8f3' : 'white',
                          textAlign: 'center', transition: 'all 0.15s',
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{g.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: active ? '#F46A06' : '#1a1a1a' }}>{g.label}</div>
                      </button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {/* Step 2: Diet & Kitchen */}
          {step === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Dietary Preferences</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {DIETARY.map(d => pill(
                  profile.dietaryRestrictions.includes(d.value),
                  () => toggleDiet(d.value),
                  d.label
                ))}
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Allergies (optional)</Typography>
                <input
                  type="text"
                  value={profile.allergies}
                  onChange={e => setProfile(p => ({ ...p, allergies: e.target.value }))}
                  placeholder="e.g. peanuts, shellfish"
                  style={{ display: 'block', width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700 }}>Cooking Skill</Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {['beginner', 'intermediate', 'advanced'].map(s => pill(
                  profile.cookingSkill === s,
                  () => setProfile(p => ({ ...p, cookingSkill: s })),
                  s.charAt(0).toUpperCase() + s.slice(1)
                ))}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Cooking for</Typography>
                  <select
                    value={profile.numberOfPeople}
                    onChange={e => setProfile(p => ({ ...p, numberOfPeople: parseInt(e.target.value) }))}
                    style={{ display: 'block', width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '1rem', boxSizing: 'border-box', background: 'white', outline: 'none' }}
                  >
                    {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                  </select>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Weekly Budget</Typography>
                  <select
                    value={profile.budgetPerWeek}
                    onChange={e => setProfile(p => ({ ...p, budgetPerWeek: e.target.value }))}
                    style={{ display: 'block', width: '100%', marginTop: 6, padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '1rem', boxSizing: 'border-box', background: 'white', outline: 'none' }}
                  >
                    <option value="budget">Budget (£30–50/wk)</option>
                    <option value="moderate">Moderate (£50–80/wk)</option>
                    <option value="generous">Generous (£80+/wk)</option>
                  </select>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 2 }}>
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                style={{ flex: 1, padding: '14px', borderRadius: 10, border: '2px solid #e0e0e0', background: 'white', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', color: '#444' }}
              >
                Back
              </button>
            ) : <div style={{ flex: 1 }} />}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                disabled={!profile.age || !profile.weight || !profile.height}
                style={{ flex: 1, padding: '14px', borderRadius: 10, border: 'none', background: '#F46A06', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || profile.healthGoals.length === 0}
                style={{ flex: 1, padding: '14px', borderRadius: 10, border: 'none', background: saving ? '#ccc' : '#F46A06', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                {saving ? 'Saving…' : 'Save & Go to Dashboard'}
              </button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HealthProfile;
