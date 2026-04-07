import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Skeleton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/Seo';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const Dashboard = () => {
  const { user, token, API_BASE, logout } = useAuth();
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const hasProfile = user?.healthProfile?.age;
  const hasMealPlan = user?.currentMealPlan;

  const handleGenerate = async () => {
    setError('');
    setGenerating(true);
    try {
      const res = await fetch(`${API_BASE}/api/mealplan/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Generation failed');
      navigate('/meal-plan');
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const bmi = hasProfile
    ? (user.healthProfile.weight / Math.pow(user.healthProfile.height / 100, 2)).toFixed(1)
    : null;

  const bmiLabel = bmi
    ? bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese'
    : null;

  const bmiColor = bmi
    ? bmi < 18.5 ? '#3498db' : bmi < 25 ? '#27ae60' : bmi < 30 ? '#e67e22' : '#e74c3c'
    : '#666';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f6' }}>
      <Seo title="My Dashboard | HoneySpice Cuisine" description="View your AI-generated Nigerian meal plan, health profile and quick-access features on your HoneySpice dashboard." />
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, rgba(244,106,6,0.12) 0%, rgba(255,141,61,0.08) 100%)', borderBottom: '1px solid rgba(244,106,6,0.1)', py: 3, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a1a' }}>
                Welcome back, {user?.name?.split(' ')[0]} 👋
              </Typography>
              <Typography sx={{ color: '#666', fontSize: '0.9rem', mt: 0.5 }}>
                Your personalised Nigerian health nutrition hub
              </Typography>
            </Box>
            <button
              onClick={logout}
              style={{ padding: '8px 18px', borderRadius: 8, border: '1.5px solid #e0e0e0', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#666', fontSize: '0.875rem' }}
            >
              Sign out
            </button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>

          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Box sx={{ background: 'white', borderRadius: 3, p: 3, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', height: '100%' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Health Profile</Typography>
              {hasProfile ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 1.5, bgcolor: '#f8f8f6', borderRadius: 2 }}>
                      <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#F46A06' }}>{user.healthProfile.age}</Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Age</Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 1.5, bgcolor: '#f8f8f6', borderRadius: 2 }}>
                      <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#F46A06' }}>{user.healthProfile.weight}<span style={{ fontSize: '0.8rem' }}>kg</span></Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Weight</Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 1.5, bgcolor: '#f8f8f6', borderRadius: 2 }}>
                      <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: bmiColor }}>{bmi}</Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: bmiColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{bmiLabel}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 1.5, bgcolor: '#fff8f3', borderRadius: 2, border: '1px solid rgba(244,106,6,0.15)' }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#666', mb: 0.5 }}>Goals</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#F46A06' }}>
                      {user.healthProfile.healthGoals?.map(g => g.replace(/_/g, ' ')).join(', ')}
                    </Typography>
                  </Box>
                  <button
                    onClick={() => navigate('/profile-setup')}
                    style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #e0e0e0', background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', color: '#444' }}
                  >
                    Edit Profile
                  </button>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography sx={{ color: '#888', mb: 2, fontSize: '0.9rem' }}>Complete your health profile to unlock your AI meal plan</Typography>
                  <button
                    onClick={() => navigate('/profile-setup')}
                    style={{ padding: '12px 24px', borderRadius: 10, border: 'none', background: '#F46A06', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
                  >
                    Set Up Profile
                  </button>
                </Box>
              )}
            </Box>
          </Grid>

          {/* AI Meal Plan Card */}
          <Grid item xs={12} md={8}>
            <Box sx={{ background: 'white', borderRadius: 3, p: 3, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>AI Meal Plan</Typography>
                  <Typography sx={{ color: '#888', fontSize: '0.85rem' }}>
                    {hasMealPlan ? 'Your personalised 7-day Nigerian timetable' : 'Get your personalised Nigerian food plan'}
                  </Typography>
                </Box>
                {hasMealPlan && (
                  <button
                    onClick={() => navigate('/meal-plan')}
                    style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#F46A06', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                  >
                    View Full Plan
                  </button>
                )}
              </Box>

              {error && (
                <Box sx={{ bgcolor: '#fff3f0', border: '1px solid #ffccc7', color: '#c0392b', p: 2, borderRadius: 2, mb: 2, fontSize: '0.875rem' }}>
                  {error}
                </Box>
              )}

              {hasMealPlan ? (
                <>
                  {/* Summary */}
                  <Box sx={{ p: 2, bgcolor: '#fff8f3', borderRadius: 2, mb: 2, border: '1px solid rgba(244,106,6,0.12)' }}>
                    {generating ? <Skeleton variant="text" width="90%" /> : (
                    <Typography sx={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.6 }}>
                      {user.currentMealPlan.summary}
                    </Typography>
                    )}
                  </Box>
                  {/* Preview: today + tomorrow */}
                  <Grid container spacing={1.5}>
                    {DAYS.slice(0, 3).map(day => {
                      const dayPlan = user.currentMealPlan.weeklyPlan?.[day];
                      if (!dayPlan) return null;
                      return (
                        <Grid item xs={12} sm={4} key={day}>
                          <Box sx={{ p: 1.5, bgcolor: '#f8f8f6', borderRadius: 2, height: '100%' }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#F46A06', mb: 1 }}>{day}</Typography>
                            {['breakfast', 'lunch', 'dinner'].map(meal => (
                              <Typography key={meal} sx={{ fontSize: '0.8rem', color: '#555', mb: 0.5 }}>
                                <span style={{ color: '#888', fontSize: '0.7rem', textTransform: 'capitalize' }}>{meal}: </span>
                                {dayPlan[meal]?.name}
                              </Typography>
                            ))}
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <button
                    onClick={handleGenerate}
                    disabled={generating || !hasProfile}
                    style={{ marginTop: 16, width: '100%', padding: '12px', borderRadius: 10, border: '1.5px solid #e0e0e0', background: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem', color: '#444' }}
                  >
                    {generating ? '✨ Generating…' : '🔄 Regenerate Plan'}
                  </button>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ fontSize: '3rem', mb: 1 }}>🤖</Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>AI-Powered Meal Planning</Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.9rem', mb: 3, maxWidth: 400, mx: 'auto' }}>
                    Our AI analyses your health profile and generates a complete 7-day Nigerian food timetable with recipes and shopping lists.
                  </Typography>
                  <button
                    onClick={handleGenerate}
                    disabled={generating || !hasProfile}
                    style={{
                      padding: '14px 32px', borderRadius: 12, border: 'none',
                      background: !hasProfile ? '#ccc' : generating ? '#e8a870' : 'linear-gradient(135deg, #F46A06, #FF8D3D)',
                      color: 'white', fontWeight: 700, cursor: !hasProfile || generating ? 'not-allowed' : 'pointer',
                      fontSize: '1rem', boxShadow: !hasProfile ? 'none' : '0 4px 16px rgba(244,106,6,0.3)',
                    }}
                  >
                    {generating ? '✨ Generating your plan…' : '✨ Generate My Meal Plan'}
                  </button>
                  {!hasProfile && (
                    <Typography sx={{ color: '#e67e22', fontSize: '0.8rem', mt: 1.5 }}>
                      Complete your health profile first
                    </Typography>
                  )}
                  {generating && (
                    <Typography sx={{ color: '#888', fontSize: '0.8rem', mt: 1.5 }}>
                      Claude AI is crafting your personalised plan… this takes 15–30 seconds
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {[
                { icon: '🍽️', title: 'View Full Menu', desc: 'Browse our Nigerian dishes', path: '/menu' },
                { icon: '📅', title: 'Book Catering', desc: 'Events & reservations', path: '/reservation' },
                { icon: '📍', title: 'Find Us', desc: 'Stirling, Scotland', path: '/location' },
                { icon: '💬', title: 'Contact Us', desc: 'Get in touch', path: '/contact' },
              ].map(a => (
                <Grid item xs={6} sm={3} key={a.path}>
                  <button
                    onClick={() => navigate(a.path)}
                    style={{ width: '100%', padding: '20px 16px', borderRadius: 12, border: '1.5px solid #e8e8e8', background: 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = '#F46A06'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{a.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a1a' }}>{a.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888', marginTop: 2 }}>{a.desc}</div>
                  </button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
