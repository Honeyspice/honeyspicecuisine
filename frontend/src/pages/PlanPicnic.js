import React, { useState } from 'react';
import { Box, Container, Typography, Slider, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../components/Seo';
import { recommendBundle, INDIVIDUAL_MEAL } from '../utils/bundleRecommender';

// Bundle recommendation uses shared logic from bundleRecommender:
// people <= 2 → Couple Pack (£25)
// people 3–5  → Friends Pack (£45)
// people >= 6 → Group Pack (£70)
// budget too low → individual meals

// ─── Picnic spots ─────────────────────────────────────────────────────────────

const SPOTS = [
  {
    name: "King's Park",
    location: 'Stirling',
    desc: 'Large open parkland with grassy areas, benches, and a beautiful view of Stirling Castle. Great for groups.',
    tags: ['Free entry', 'Open space', 'Good for groups'],
  },
  {
    name: 'Stirling Castle Esplanade',
    location: 'Stirling',
    desc: "A wide open esplanade with panoramic views over the city and surrounding landscape. One of Stirling's finest spots.",
    tags: ['Views', 'Historic', 'Family friendly'],
  },
  {
    name: 'Cambuskenneth Abbey Grounds',
    location: 'Near Stirling',
    desc: 'Peaceful riverside grounds surrounding the ancient abbey ruins. Quiet, scenic, and ideal for a relaxed outdoor meal.',
    tags: ['Quiet', 'Riverside', 'Scenic'],
  },
  {
    name: 'University of Stirling Campus',
    location: 'Bridge of Allan',
    desc: 'Sprawling campus grounds with a loch, wooded paths, and open lawns. Perfect for a long, leisurely picnic.',
    tags: ['Loch views', 'Wooded walks', 'Large lawns'],
  },
  {
    name: 'Bannockburn Heritage Site',
    location: 'Bannockburn, Stirling',
    desc: 'Open fields and grassy spaces around the historic site. Plenty of room for a group spread in good weather.',
    tags: ['Historic', 'Open fields', 'Easy parking'],
  },
];


// ─── Preference pill ──────────────────────────────────────────────────────────

const PREFERENCES = [
  { key: 'light', label: 'Light', sub: 'Snacks & small bites' },
  { key: 'filling', label: 'Filling', sub: 'Soups, rice & swallows' },
  { key: 'mixed', label: 'Mixed', sub: 'A bit of everything' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

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

  // Resolved display data (bundle or individual fallback)
  const display = result
    ? result.type === 'individual'
      ? { ...INDIVIDUAL_MEAL, price: result.totalCost }
      : result.bundle
    : null;

  return (
    <>
      <Seo
        title="Plan a Picnic | HoneySpice Cuisine"
        description="Plan your perfect picnic in seconds. Tell us how many people you're feeding and your budget — we'll suggest the best meal options for you."
      />

      {/* Hero header */}
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
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 55%',
            filter: 'brightness(0.38) saturate(1.1)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}
          >
            Outdoor dining
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: '#fff',
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
              letterSpacing: '-0.02em',
              mt: 1,
              mb: 1.5,
              lineHeight: 1.1,
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
            }}
          >
            Plan a Picnic
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              maxWidth: 440,
              mx: 'auto',
              lineHeight: 1.75,
            }}
          >
            Tell us your group size and budget — we'll suggest the perfect Nigerian spread for the outdoors.
          </Typography>
        </Box>
      </Box>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 11 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 7 },
            alignItems: 'start',
          }}
        >
          {/* ── Form ──────────────────────────────────────────────────────── */}
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
                ].map((btn, i) =>
                  btn ? (
                    <Box
                      key={btn.label}
                      onClick={btn.action}
                      sx={{
                        width: 38,
                        height: 38,
                        border: '2px solid #E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        color: '#374151',
                        userSelect: 'none',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#F46A06', color: '#F46A06' },
                      }}
                    >
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
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
                  Total budget
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#F46A06' }}>
                  £{budget}
                </Typography>
              </Box>
              <Slider
                value={budget}
                onChange={(_, v) => setBudget(v)}
                min={10}
                max={200}
                step={5}
                sx={{
                  color: '#F46A06',
                  '& .MuiSlider-thumb': { width: 20, height: 20 },
                  '& .MuiSlider-rail': { bgcolor: '#E5E7EB' },
                }}
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
                    <Box
                      key={p.key}
                      onClick={() => setPreference(p.key)}
                      sx={{
                        border: '2px solid',
                        borderColor: active ? '#F46A06' : '#E5E7EB',
                        bgcolor: active ? '#FFF7F0' : '#fff',
                        px: 2.5,
                        py: 1.5,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#F46A06' },
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: active ? 700 : 600, fontSize: '0.9rem', color: active ? '#F46A06' : '#1a1a1a' }}>
                          {p.label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF', mt: 0.25 }}>
                          {p.sub}
                        </Typography>
                      </Box>
                      {active && (
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            bgcolor: '#F46A06',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '0.7rem',
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* CTA */}
            <Box
              onClick={handlePlan}
              sx={{
                display: 'block',
                width: '100%',
                py: 1.8,
                bgcolor: '#F46A06',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
                cursor: 'pointer',
                border: '2px solid #F46A06',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' },
              }}
            >
              Plan My Picnic
            </Box>
          </Box>

          {/* ── Result ────────────────────────────────────────────────────── */}
          <Box id="picnic-result">
            {!result ? (
              <Box
                sx={{
                  border: '2px dashed #E5E7EB',
                  p: { xs: 4, md: 6 },
                  textAlign: 'center',
                  bgcolor: '#FAFAFA',
                  minHeight: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <Box sx={{ fontSize: '2.5rem' }}>🧺</Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#374151' }}>
                  Your bundle will appear here
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#9CA3AF', maxWidth: 260 }}>
                  Fill in your details and tap "Plan My Picnic".
                </Typography>
              </Box>
            ) : (
              <Box sx={{ border: '1px solid #E5E7EB', bgcolor: '#fff', overflow: 'hidden' }}>
                {/* Image */}
                <Box sx={{ width: '100%', height: { xs: 190, md: 230 }, overflow: 'hidden', position: 'relative' }}>
                  <Box
                    component="img"
                    src={display.image}
                    alt={display.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      bgcolor: '#F46A06',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    {display.tag}
                  </Box>
                </Box>

                <Box sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontSize: '0.78rem', color: '#F46A06', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', mb: 0.5 }}>
                    Recommended bundle
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.55rem' }, color: '#1a1a1a', lineHeight: 1.2 }}>
                      {display.name}
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#F46A06', ml: 2, whiteSpace: 'nowrap' }}>
                      £{display.price}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, mb: 3 }}>
                    {display.desc}
                  </Typography>

                  {/* Item breakdown */}
                  <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#374151', mb: 1.5 }}>
                    What's included
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 1 }}>
                    {display.items.map((item) => (
                      <Box component="li" key={item} sx={{ fontSize: '0.9rem', color: '#374151', lineHeight: 2 }}>
                        {item}
                      </Box>
                    ))}
                  </Box>

                  {/* Total cost summary */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      bgcolor: '#FAF6F0',
                      px: 2.5,
                      py: 1.5,
                      mt: 2,
                      mb: result.budgetNote ? 2.5 : 3,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Total cost</Typography>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#F46A06' }}>£{display.price}</Typography>
                  </Box>

                  {/* Budget note */}
                  {result.budgetNote && (
                    <Box sx={{ bgcolor: '#FFF7ED', border: '1px solid #FED7AA', px: 2, py: 1.5, mb: 3 }}>
                      <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#92400E' }}>
                        💰 {result.budgetNote}
                      </Typography>
                    </Box>
                  )}

                  {/* CTAs */}
                  <Box
                    component={RouterLink}
                    to="/reservation"
                    sx={{
                      textDecoration: 'none',
                      display: 'block',
                      width: '100%',
                      py: 1.8,
                      bgcolor: '#F46A06',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      border: '2px solid #F46A06',
                      transition: 'background 0.2s',
                      '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' },
                      mb: 1.5,
                    }}
                  >
                    Order Picnic Bundle
                  </Box>
                  <Box
                    component="a"
                    href="https://wa.me/447721629566"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: 'none',
                      display: 'block',
                      width: '100%',
                      py: 1.6,
                      border: '2px solid #1a1a1a',
                      color: '#1a1a1a',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      transition: 'background 0.2s, color 0.2s',
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

        {/* ── Suggested Picnic Spots ───────────────────────────────────────── */}
        <Box sx={{ mt: { xs: 10, md: 14 } }}>
          <Divider sx={{ mb: { xs: 8, md: 10 } }} />

          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}
            >
              Near Stirling
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mt: 1,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                letterSpacing: '-0.02em',
                color: '#1a1a1a',
              }}
            >
              Suggested Picnic Spots
            </Typography>
            <Typography sx={{ color: '#666', mt: 1.5, maxWidth: 480, mx: 'auto', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Some of our favourite outdoor spots in and around Stirling — order your bundle and head out.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: { xs: 2.5, md: 3 },
            }}
          >
            {SPOTS.map((spot) => (
              <Box
                key={spot.name}
                sx={{
                  border: '1px solid #E5E7EB',
                  bgcolor: '#fff',
                  p: 3,
                  transition: 'box-shadow 0.25s',
                  '&:hover': { boxShadow: '0 8px 28px rgba(0,0,0,0.08)' },
                }}
              >
                {/* Green dot icon */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    mb: 2,
                  }}
                >
                  🌳
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#1a1a1a', mb: 0.5 }}>
                  {spot.name}
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: '#F46A06', fontWeight: 600, mb: 1.5 }}>
                  {spot.location}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.7, mb: 2 }}>
                  {spot.desc}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {spot.tags.map((tag) => (
                    <Box
                      key={tag}
                      sx={{
                        px: 1.5,
                        py: 0.4,
                        bgcolor: '#F3F4F6',
                        color: '#374151',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Bottom CTA */}
          <Box sx={{ textAlign: 'center', mt: { xs: 7, md: 9 } }}>
            <Typography sx={{ color: '#666', fontSize: '0.95rem', mb: 3 }}>
              Ready to head out? Order your bundle and we'll have it ready.
            </Typography>
            <Box
              component={RouterLink}
              to="/reservation"
              sx={{
                textDecoration: 'none',
                display: 'inline-block',
                px: 5,
                py: 1.8,
                bgcolor: '#F46A06',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '2px solid #F46A06',
                transition: 'background 0.2s',
                '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' },
              }}
            >
              Order Picnic Bundle
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
