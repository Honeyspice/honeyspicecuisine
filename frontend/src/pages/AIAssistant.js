import React, { useState } from 'react';
import { Box, Container, Typography, Slider, Chip, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../components/Seo';
import { recommendBundle, INDIVIDUAL_MEAL } from '../utils/bundleRecommender';

const OCCASIONS = ['Solo', 'Couple', 'Friends', 'Picnic'];
const RESTRICTIONS = ['Nuts', 'Dairy', 'Gluten'];

const OccasionPill = ({ label, selected, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      px: 2.5,
      py: 1,
      border: '2px solid',
      borderColor: selected ? '#F46A06' : '#E5E7EB',
      bgcolor: selected ? '#FFF7F0' : '#fff',
      color: selected ? '#F46A06' : '#4B5563',
      fontWeight: selected ? 700 : 500,
      fontSize: '0.875rem',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'all 0.2s',
      '&:hover': { borderColor: '#F46A06' },
    }}
  >
    {label}
  </Box>
);

export default function AIAssistant() {
  const [people, setPeople] = useState(2);
  const [budget, setBudget] = useState(30);
  const [occasion, setOccasion] = useState('Couple');
  const [restrictions, setRestrictions] = useState({ nuts: false, dairy: false, gluten: false });
  const [result, setResult] = useState(null);

  const toggleRestriction = (key) =>
    setRestrictions((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleFind = () => {
    // Core logic: people + budget → bundle recommendation
    const rec = recommendBundle(people, budget);

    // Dietary notes (informational only, kitchen can adapt)
    const dietaryNotes = [];
    if (restrictions.nuts) dietaryNotes.push('Nut allergy noted. Mention this when ordering.');
    if (restrictions.dairy) dietaryNotes.push('Dairy-free request noted. Mention this when ordering.');
    if (restrictions.gluten) dietaryNotes.push('Gluten-free request noted. Mention this when ordering.');

    setResult({ ...rec, dietaryNotes });

    setTimeout(() => {
      const el = document.getElementById('ai-result');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // Resolved display data (bundle or individual fallback)
  const display = result
    ? result.type === 'individual'
      ? { ...INDIVIDUAL_MEAL, price: result.totalCost }
      : result.bundle
    : null;

  return (
    <>
      <Seo
        title="Smart Food Assistant | HoneySpice Cuisine"
        description="Tell us your budget, group size, and occasion. Get personalised Nigerian meal suggestions from Honeyspice Kitchen."
      />

      {/* Page header */}
      <Box sx={{ bgcolor: '#FAF6F0', py: { xs: 8, md: 11 }, textAlign: 'center', px: 3 }}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}
        >
          Smart Food Assistant
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            mt: 1,
            mb: 1.5,
          }}
        >
          What do you feel like eating?
        </Typography>
        <Typography sx={{ color: '#666', fontSize: { xs: '0.95rem', md: '1.05rem' }, maxWidth: 480, mx: 'auto', lineHeight: 1.75 }}>
          Get personalised meal suggestions in seconds, based on your preferences, budget, and plans.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* ── Form ──────────────────────────────────────────────────────── */}
          <Box sx={{ border: '1px solid #E5E7EB', bgcolor: '#fff', p: { xs: 3, md: 4 } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#1a1a1a', mb: 3 }}>
              Your preferences
            </Typography>

            {/* Budget */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Budget</Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#F46A06' }}>£{budget}</Typography>
              </Box>
              <Slider
                value={budget}
                onChange={(_, v) => setBudget(v)}
                min={5}
                max={150}
                step={5}
                sx={{ color: '#F46A06', '& .MuiSlider-thumb': { width: 20, height: 20 }, '& .MuiSlider-rail': { bgcolor: '#E5E7EB' } }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>£5</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>£150</Typography>
              </Box>
            </Box>

            {/* Number of people */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1.5 }}>
                Number of people
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  sx={{ width: 36, height: 36, border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', color: '#374151', userSelect: 'none', transition: 'all 0.2s', '&:hover': { borderColor: '#F46A06', color: '#F46A06' } }}
                >
                  −
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#1a1a1a', minWidth: 32, textAlign: 'center' }}>
                  {people}
                </Typography>
                <Box
                  onClick={() => setPeople((p) => Math.min(20, p + 1))}
                  sx={{ width: 36, height: 36, border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', color: '#374151', userSelect: 'none', transition: 'all 0.2s', '&:hover': { borderColor: '#F46A06', color: '#F46A06' } }}
                >
                  +
                </Box>
                <Typography sx={{ fontSize: '0.85rem', color: '#9CA3AF', ml: 0.5 }}>
                  {people === 1 ? 'person' : 'people'}
                </Typography>
              </Box>
            </Box>

            {/* Occasion */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1.5 }}>Occasion</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {OCCASIONS.map((o) => (
                  <OccasionPill key={o} label={o} selected={occasion === o} onClick={() => setOccasion(o)} />
                ))}
              </Box>
            </Box>

            {/* Dietary restrictions */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1.5 }}>
                Dietary restrictions
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {RESTRICTIONS.map((r) => {
                  const key = r.toLowerCase();
                  const active = restrictions[key];
                  return (
                    <Chip
                      key={r}
                      label={`No ${r}`}
                      onClick={() => toggleRestriction(key)}
                      variant={active ? 'filled' : 'outlined'}
                      sx={{
                        borderColor: active ? '#1a1a1a' : '#D1D5DB',
                        bgcolor: active ? '#1a1a1a' : 'transparent',
                        color: active ? '#fff' : '#6B7280',
                        fontWeight: active ? 700 : 500,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: active ? '#333' : '#F3F4F6' },
                      }}
                    />
                  );
                })}
              </Box>
              <Typography sx={{ fontSize: '0.78rem', color: '#9CA3AF', mt: 1 }}>
                Select any that apply. We'll pass it to the kitchen.
              </Typography>
            </Box>

            {/* Submit */}
            <Box
              onClick={handleFind}
              sx={{
                display: 'block', width: '100%', py: 1.8, bgcolor: '#F46A06', color: '#fff',
                fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                textAlign: 'center', cursor: 'pointer', border: '2px solid #F46A06',
                transition: 'background 0.2s', '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' },
              }}
            >
              Find My Meal
            </Box>
          </Box>

          {/* ── Result panel ──────────────────────────────────────────────── */}
          <Box id="ai-result">
            {!result ? (
              <Box
                sx={{
                  border: '2px dashed #E5E7EB', p: { xs: 4, md: 6 }, textAlign: 'center',
                  bgcolor: '#FAFAFA', minHeight: 320, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 2,
                }}
              >
                <Box sx={{ fontSize: '2.5rem' }}>🍲</Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#374151' }}>
                  Your recommendation will appear here
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#9CA3AF', maxWidth: 260 }}>
                  Set your preferences on the left and tap "Find My Meal".
                </Typography>
              </Box>
            ) : (
              <Box sx={{ border: '1px solid #E5E7EB', bgcolor: '#fff', overflow: 'hidden' }}>
                {/* Image */}
                <Box sx={{ width: '100%', height: { xs: 200, md: 240 }, overflow: 'hidden', position: 'relative' }}>
                  <Box component="img" src={display.image} alt={display.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <Box sx={{ position: 'absolute', top: 14, left: 14, bgcolor: result.type === 'individual' ? '#1a1a1a' : '#F46A06', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', px: 1.5, py: 0.5 }}>
                    {result.type === 'individual' ? `${people} × Individual` : display.tag}
                  </Box>
                </Box>

                <Box sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontSize: '0.78rem', color: '#F46A06', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', mb: 0.5 }}>
                    {result.type === 'individual' ? 'Within your budget' : 'Recommended for you'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.6rem' }, color: '#1a1a1a', lineHeight: 1.2 }}>
                      {display.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#F46A06', ml: 2, whiteSpace: 'nowrap' }}>
                      £{display.price}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, mb: 3 }}>
                    {display.desc}
                  </Typography>

                  <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#374151', mb: 1.5 }}>
                    {"What's included"}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 3 }}>
                    {display.items.map((item) => (
                      <Box component="li" key={item} sx={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.9 }}>
                        {item}
                      </Box>
                    ))}
                  </Box>

                  {/* Notes */}
                  {(result.budgetNote || result.dietaryNotes?.length > 0) && (
                    <>
                      <Divider sx={{ mb: 2.5 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                        {result.budgetNote && (
                          <Box sx={{ bgcolor: '#FFF7ED', border: '1px solid #FED7AA', px: 2, py: 1.5 }}>
                            <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#92400E' }}>
                              {result.budgetNote}
                            </Typography>
                          </Box>
                        )}
                        {result.dietaryNotes?.map((note) => (
                          <Box key={note} sx={{ bgcolor: '#F0FDF4', border: '1px solid #BBF7D0', px: 2, py: 1.5 }}>
                            <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#166534' }}>
                              ✓ {note}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}

                  {/* CTAs */}
                  <Box
                    component={RouterLink}
                    to="/reservation"
                    sx={{
                      textDecoration: 'none', display: 'block', width: '100%', py: 1.8,
                      bgcolor: '#F46A06', color: '#fff', fontWeight: 700, fontSize: '0.88rem',
                      letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center',
                      border: '2px solid #F46A06', transition: 'background 0.2s',
                      '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' }, mb: 1.5,
                    }}
                  >
                    Order this bundle
                  </Box>
                  <Box
                    component="a"
                    href="https://wa.me/447721629566"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: 'none', display: 'block', width: '100%', py: 1.6,
                      border: '2px solid #1a1a1a', color: '#1a1a1a', fontWeight: 700,
                      fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                      textAlign: 'center', transition: 'background 0.2s, color 0.2s',
                      '&:hover': { bgcolor: '#1a1a1a', color: '#fff' },
                    }}
                  >
                    Chat on WhatsApp
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
