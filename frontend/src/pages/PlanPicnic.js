import React, { useState } from 'react';
import { Box, Container, Typography, Slider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../components/Seo';
import { recommendBundle, INDIVIDUAL_MEAL } from '../utils/bundleRecommender';

const PREFERENCES = [
  { key: 'light', label: 'Light', sub: 'Snacks & small bites' },
  { key: 'filling', label: 'Filling', sub: 'Soups, rice & swallows' },
  { key: 'mixed', label: 'Mixed', sub: 'A bit of everything' },
];

export default function PlanPicnic() {
  const [people, setPeople] = useState(4);
  const [budget, setBudget] = useState(50);
  const [preference, setPreference] = useState('mixed');
  const [result, setResult] = useState(null);

  const handlePlan = () => {
    const rec = recommendBundle(people, budget);
    setResult(rec);
    setTimeout(() => {
      const el = document.getElementById('picnic-result');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const display = result
    ? result.type === 'individual'
      ? { ...INDIVIDUAL_MEAL, price: result.totalCost }
      : result.bundle
    : null;

  return (
    <>
      <Seo
        title="Plan a Picnic | HoneySpice Cuisine"
        description="Plan your perfect picnic in seconds. Tell us how many people you're feeding and your budget. We'll suggest the best Nigerian meal bundle for you."
        noindex
      />

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '42vh', md: '50vh' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src="/images/barbecue.jpg"
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 55%',
            filter: 'brightness(0.38) saturate(1.1)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
          <Typography variant="overline" sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}>
            Outdoor dining
          </Typography>
          <Typography variant="h1" sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' }, letterSpacing: '-0.02em', mt: 1, mb: 1.5, lineHeight: 1.1, textShadow: '0 2px 24px rgba(0,0,0,0.4)' }}>
            Plan a Picnic
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: '0.95rem', md: '1.05rem' }, maxWidth: 440, mx: 'auto', lineHeight: 1.75 }}>
            Tell us your group size and budget. We'll suggest the perfect Nigerian spread for the outdoors.
          </Typography>
        </Box>
      </Box>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 11 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 5, md: 7 }, alignItems: 'start' }}>

          {/* ── Form ── */}
          <Box sx={{ border: '1px solid #E5E7EB', bgcolor: '#fff', p: { xs: 3, md: 4 } }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#1a1a1a', mb: 3.5 }}>
              Your picnic details
            </Typography>

            {/* Number of people */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1.5 }}>
                Number of people
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {[
                  { label: '−', action: () => setPeople((p) => Math.max(1, p - 1)) },
                  null,
                  { label: '+', action: () => setPeople((p) => Math.min(20, p + 1)) },
                ].map((btn) =>
                  btn ? (
                    <Box key={btn.label} onClick={btn.action} sx={{ width: 38, height: 38, border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 700, fontSize: '1.15rem', color: '#374151', userSelect: 'none', transition: 'all 0.2s', '&:hover': { borderColor: '#F46A06', color: '#F46A06' } }}>
                      {btn.label}
                    </Box>
                  ) : (
                    <Typography key="count" sx={{ fontWeight: 800, fontSize: '1.6rem', color: '#1a1a1a', minWidth: 36, textAlign: 'center' }}>
                      {people}
                    </Typography>
                  )
                )}
                <Typography sx={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                  {people === 1 ? 'person' : 'people'}
                </Typography>
              </Box>
            </Box>

            {/* Budget */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>Total budget</Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#F46A06' }}>£{budget}</Typography>
              </Box>
              <Slider value={budget} onChange={(_, v) => setBudget(v)} min={10} max={200} step={5}
                sx={{ color: '#F46A06', '& .MuiSlider-thumb': { width: 20, height: 20 }, '& .MuiSlider-rail': { bgcolor: '#E5E7EB' } }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>£10</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>£200</Typography>
              </Box>
            </Box>

            {/* Food preference */}
            <Box sx={{ mb: 4.5 }}>
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', mb: 1.5 }}>
                Food preference
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {PREFERENCES.map((p) => {
                  const active = preference === p.key;
                  return (
                    <Box key={p.key} onClick={() => setPreference(p.key)} sx={{ border: '2px solid', borderColor: active ? '#F46A06' : '#E5E7EB', bgcolor: active ? '#FFF7F0' : '#fff', px: 2.5, py: 1.5, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s', '&:hover': { borderColor: '#F46A06' } }}>
                      <Box>
                        <Typography sx={{ fontWeight: active ? 700 : 600, fontSize: '0.9rem', color: active ? '#F46A06' : '#1a1a1a' }}>{p.label}</Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF', mt: 0.25 }}>{p.sub}</Typography>
                      </Box>
                      {active && (
                        <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: '#F46A06', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 900, flexShrink: 0 }}>✓</Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            <Box onClick={handlePlan} sx={{ display: 'block', width: '100%', py: 1.8, bgcolor: '#F46A06', color: '#fff', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', cursor: 'pointer', border: '2px solid #F46A06', transition: 'background 0.2s', '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' } }}>
              Plan My Picnic
            </Box>
          </Box>

          {/* ── Result ── */}
          <Box id="picnic-result">
            {!result ? (
              <Box sx={{ border: '2px dashed #E5E7EB', p: { xs: 4, md: 6 }, textAlign: 'center', bgcolor: '#FAFAFA', minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box sx={{ fontSize: '2.5rem' }}>🧺</Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#374151' }}>Your bundle will appear here</Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#9CA3AF', maxWidth: 260 }}>Fill in your details and tap "Plan My Picnic".</Typography>
              </Box>
            ) : (
              <Box sx={{ border: '1px solid #E5E7EB', bgcolor: '#fff', overflow: 'hidden' }}>
                <Box sx={{ width: '100%', height: { xs: 190, md: 230 }, overflow: 'hidden', position: 'relative' }}>
                  <Box component="img" src={display.image} alt={display.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <Box sx={{ position: 'absolute', top: 14, left: 14, bgcolor: '#F46A06', color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', px: 1.5, py: 0.5 }}>
                    {display.tag}
                  </Box>
                </Box>

                <Box sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontSize: '0.78rem', color: '#F46A06', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', mb: 0.5 }}>
                    Recommended bundle
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.55rem' }, color: '#1a1a1a', lineHeight: 1.2 }}>{display.name}</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#F46A06', ml: 2, whiteSpace: 'nowrap' }}>£{display.price}</Typography>
                  </Box>
                  <Typography sx={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, mb: 3 }}>{display.desc}</Typography>

                  <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#374151', mb: 1.5 }}>
                    What's included
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 1 }}>
                    {display.items.map((item) => (
                      <Box component="li" key={item} sx={{ fontSize: '0.9rem', color: '#374151', lineHeight: 2 }}>{item}</Box>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#FAF6F0', px: 2.5, py: 1.5, mt: 2, mb: result.budgetNote ? 2.5 : 3 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Total cost</Typography>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#F46A06' }}>£{display.price}</Typography>
                  </Box>

                  {result.budgetNote && (
                    <Box sx={{ bgcolor: '#FFF7ED', border: '1px solid #FED7AA', px: 2, py: 1.5, mb: 3 }}>
                      <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#92400E' }}>{result.budgetNote}</Typography>
                    </Box>
                  )}

                  <Box component={RouterLink} to="/reservation" sx={{ textDecoration: 'none', display: 'block', width: '100%', py: 1.8, bgcolor: '#F46A06', color: '#fff', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', border: '2px solid #F46A06', transition: 'background 0.2s', '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' }, mb: 1.5 }}>
                    Order Picnic Bundle
                  </Box>
                  <Box component="a" href="https://wa.me/447721629566" target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none', display: 'block', width: '100%', py: 1.6, border: '2px solid #1a1a1a', color: '#1a1a1a', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', transition: 'background 0.2s, color 0.2s', '&:hover': { bgcolor: '#1a1a1a', color: '#fff' } }}>
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
