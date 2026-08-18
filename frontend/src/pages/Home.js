import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

// Display size for the brand tagline. Scales with the viewport so each clause
// stays on one line, and keeps at least 12% headroom at every width instead of
// stepping between fixed sizes.
//
// The old fixed sizes wrapped at both ends. At 375px, 2.2rem needed 410px inside
// 327px, stranding "HEART." and "PLATE." on lines of their own. At exactly 900px
// the md breakpoint jumped to 5rem, which needs about 916px inside the 837px the
// flex parent allows, so it wrapped there too.
//
// The 3rem cap matches the homepage section headings, which measure 48px for
// "How it works", "Popular Bundles" and "Why HoneySpice". The previous 5rem cap
// rendered at 79px, which was not merely larger than its peers, it was larger
// than the hero h1 at 72px, so a mid-page band out-shouted the top of the page.
// Set in caps, 48px still reads larger than a sentence-case heading of the same
// size, so the tagline keeps its emphasis without breaking the scale.
const TAGLINE_SIZE = 'clamp(1.3rem, 6.2vw, 3rem)';

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Tell us what you want',
    desc: 'Share your occasion, group size, and budget. Even just a craving is enough to get started.',
  },
  {
    step: '02',
    title: 'Get personalised meal suggestions',
    desc: 'We suggest the perfect Nigerian spread based on your group size, budget and occasion.',
  },
  {
    step: '03',
    title: 'Order instantly',
    desc: 'Confirm your bundle, choose collection or delivery, and our kitchen gets cooking.',
  },
];

const BUNDLES = [
  {
    name: 'Couple Pack',
    price: '£25',
    desc: 'Two portions of your favourite Nigerian classics. Perfect for a date night or quiet dinner for two.',
    image: '/images/jollof_rice.webp',
    tag: 'For 2',
    color: '#F46A06',
  },
  {
    name: 'Friends Pack',
    price: '£45',
    desc: 'A generous spread for 4–6 people. Mix of soups, swallows, grills and sides.',
    image: '/images/efo_riro.webp',
    tag: 'For 4–6',
    color: '#1a1a1a',
  },
  {
    name: 'Group Pack',
    price: '£70',
    desc: 'Built for events, picnics and gatherings. We scale it to your headcount and budget.',
    image: '/images/barbecue.jpg',
    tag: 'For 10+',
    color: '#2D6A4F',
  },
];

const Home = () => {
  return (
    <>
      <Seo
        title="HoneySpice Cuisine | Nigerian Food & Catering UK"
        description="Authentic Nigerian food in Stirling. Order for collection or delivery, or book HoneySpice to cater weddings, parties and events across the UK."
      />
      <Box>
        <Hero />

        {/* Delivery area strip */}
        <Box sx={{ bgcolor: '#1a1a1a', py: 1.5, px: 2, textAlign: 'center' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', fontWeight: 500 }}>
            Delivering to <strong style={{ color: '#fff' }}>Stirling & surrounding areas</strong> · Collection available · From <strong style={{ color: '#F46A06' }}>£10.99</strong>
          </Typography>
        </Box>

        {/* Two journeys. The UK catering claim previously appeared only in the
            footer, so Google and customers read HoneySpice as a Stirling
            takeaway. Local ordering and national catering are different jobs
            with different audiences, so they get one panel each rather than
            sharing a single CTA. */}
        <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 6, md: 9 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {[
                {
                  q: 'Ordering food?',
                  a: 'Order Nigerian food for collection or delivery in Stirling.',
                  cta: 'View Menu',
                  to: '/menu',
                  primary: true,
                },
                {
                  q: 'Planning an event?',
                  a: 'We cater for weddings, parties and events across the UK.',
                  cta: 'Make a Reservation',
                  to: '/reservation',
                  primary: false,
                },
              ].map((panel) => (
                <Grid item xs={12} md={6} key={panel.q}>
                  <Box
                    sx={{
                      height: '100%',
                      p: { xs: 3, md: 4 },
                      border: '1px solid rgba(26, 26, 26, 0.14)',
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        color: '#1A1A1A',
                        mb: 1.5,
                      }}
                    >
                      {panel.q}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: { xs: '1rem', md: '1.05rem' },
                        lineHeight: 1.6,
                        mb: 3,
                        flexGrow: 1,
                      }}
                    >
                      {panel.a}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={panel.to}
                      variant={panel.primary ? 'contained' : 'outlined'}
                      sx={{ minHeight: 44, px: 3.5, textTransform: 'none', fontWeight: 700 }}
                    >
                      {panel.cta}
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* How It Works */}
        <Box sx={{ bgcolor: '#FAF6F0', py: { xs: 9, md: 13 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}
              >
                Simple by design
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mt: 1,
                  fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: '-0.02em',
                  color: '#1a1a1a',
                }}
              >
                How it works
              </Typography>
              <Typography
                sx={{
                  color: '#666',
                  mt: 1.5,
                  maxWidth: 480,
                  mx: 'auto',
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  lineHeight: 1.75,
                }}
              >
                Three steps from craving to kitchen.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 4, md: 5 },
              }}
            >
              {HOW_IT_WORKS.map((item) => (
                <Box key={item.step}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: '3.5rem',
                      color: '#F46A06',
                      lineHeight: 1,
                      mb: 2,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {item.step}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a', mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.75 }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Try the AI Assistant */}
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 10, md: 14 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background image */}
          <Box
            component="img"
            src="/images/Ofada.webp"
            alt=""
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              filter: 'brightness(0.22) saturate(1.1)',
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3, maxWidth: 680, mx: 'auto' }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}
            >
              Personalised for you
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                fontWeight: 900,
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                letterSpacing: '-0.02em',
                mt: 1,
                mb: 2,
                lineHeight: 1.1,
              }}
            >
              Smart Food Assistant
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.8,
                mb: 5,
                maxWidth: 480,
                mx: 'auto',
              }}
            >
              Get personalised meal suggestions based on your budget, group size, and occasion,
              from a solo dinner to a full event.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component={RouterLink}
                to="/register"
                sx={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  px: { xs: 4, md: 5 },
                  py: 1.7,
                  background: '#F46A06',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: '2px solid #F46A06',
                  transition: 'background 0.25s, border-color 0.25s',
                  '&:hover': { background: '#D45A00', borderColor: '#D45A00' },
                }}
              >
                Get Suggestions
              </Box>
              <Box
                component={RouterLink}
                to="/menu"
                sx={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  px: { xs: 4, md: 5 },
                  py: 1.7,
                  border: '2px solid rgba(255,255,255,0.7)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  transition: 'background 0.25s, color 0.25s',
                  '&:hover': { background: '#fff', color: '#1a1a1a' },
                }}
              >
                Browse Menu
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Popular Bundles */}
        <Box sx={{ py: { xs: 9, md: 13 }, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: '0.2em', color: '#F46A06', fontWeight: 700, fontSize: '0.7rem' }}
              >
                Ready-made bundles
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mt: 1,
                  fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' },
                  letterSpacing: '-0.02em',
                  color: '#1a1a1a',
                }}
              >
                Popular Bundles
              </Typography>
              <Typography
                sx={{
                  color: '#666',
                  mt: 1.5,
                  maxWidth: 500,
                  mx: 'auto',
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  lineHeight: 1.75,
                }}
              >
                Curated Nigerian spreads for every occasion, from intimate dinners to big group gatherings.
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: { xs: 3, md: 4 },
              }}
            >
              {BUNDLES.map((bundle) => (
                <Box
                  key={bundle.name}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                    },
                    '&:hover .bundle-img': { transform: 'scale(1.06)' },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                    <Box
                      className="bundle-img"
                      component="img"
                      src={bundle.image}
                      alt={bundle.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
                      }}
                    />
                    {/* Tag pill */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        bgcolor: bundle.color,
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        px: 1.5,
                        py: 0.5,
                      }}
                    >
                      {bundle.tag}
                    </Box>
                  </Box>

                  {/* Text. A column so the button can be pushed to the bottom
                      with mt:auto. The card heights already match because the
                      grid stretches them, but without this the button followed
                      the description directly, so a bundle whose text wrapped one
                      line longer pushed its button 29px below the other two and
                      the slack collected underneath it instead. */}
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>
                        {bundle.name}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#F46A06' }}>
                        {bundle.price}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, mb: 2 }}>
                      {bundle.desc}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/menu"
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 'auto',
                        bgcolor: '#F46A06',
                        color: '#fff',
                        fontWeight: 700,
                        textTransform: 'none',
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#D45A00' },
                      }}
                    >
                      Order This Bundle
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* CTA */}
            <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
              <Button
                component={RouterLink}
                to="/menu"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.4,
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 },
                }}
              >
                Book a Bundle
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Full-bleed cinematic image */}
        <Box
          sx={{
            width: '100%',
            height: { xs: '60vh', md: '80vh' },
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            // Was Egusi.webp, which is also a Gallery tile and a £15.99 menu
            // item. Suya suits "Bold on the Plate".
            src="/images/suya.webp"
            alt="Beef suya skewers"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              filter: 'brightness(0.62) saturate(1.15)',
              display: 'block',
              zIndex: 0,
            }}
          />
          {/* Scrim. The band had none: white text sat directly on a busy food
              photograph, relying only on the image's own brightness filter, so
              legibility changed with whatever happened to be behind each word.
              The Hero already does this properly with its own gradient layer.
              Weighted towards the middle, where the text actually is, so the
              photograph stays visible at the top and bottom edges. */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.66) 38%, rgba(0,0,0,0.66) 62%, rgba(0,0,0,0.36) 100%)',
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                // Weight is left to the theme's h2, which is 600. It was
                // overridden to 900, a weight Cormorant Garamond does not ship:
                // only 300 to 700 are loaded, so the browser synthesised it by
                // thickening the 700 outline uniformly. That flattens the
                // thick/thin contrast the typeface is built on, which is what
                // made it read blunt at display size rather than premium.
                // Scales with the viewport so each clause of the tagline stays on
                // one line. At the old fixed 2.2rem, "Wholesome at Heart." needed
                // 410px inside 327px on a 375px phone, so it wrapped and left
                // "HEART." and "PLATE." stranded on lines of their own. The upper
                // bound keeps the original 5rem display size on desktop.
                fontSize: TAGLINE_SIZE,
                lineHeight: 1.15,
                // Capitals need more room between them than lowercase, so the
                // theme's negative tracking works against this uppercase line.
                // Kept small: tracking is paid for in line width.
                letterSpacing: '0.005em',
                textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                mb: 2.5,
                textTransform: 'uppercase',
              }}
            >
              {/* The brand tagline. Written in sentence case because the style
                  above already uppercases it, so the source stays readable. */}
              Wholesome at Heart.<br />Bold on the Plate.
            </Typography>
            <Typography
              sx={{
                // Was rgba(255,255,255,0.85) with no shadow, which made this the
                // least legible text on the page: small, translucent, and over a
                // photograph. Full white plus a shadow, since body copy has none
                // of the size advantage the heading has.
                color: '#fff',
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                textShadow: '0 1px 12px rgba(0,0,0,0.55)',
                mb: 4,
                maxWidth: 480,
                mx: 'auto',
                lineHeight: 1.75,
              }}
            >
              Every dish crafted from authentic Nigerian recipes, packed with bold spices, fresh ingredients, and real flavour.
            </Typography>
            <Box
              component={RouterLink}
              to="/menu"
              sx={{
                textDecoration: 'none',
                display: 'inline-block',
                px: 5,
                py: 1.6,
                border: '2px solid #fff',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: 'transparent',
                transition: 'background 0.25s, color 0.25s',
                '&:hover': { background: '#fff', color: '#1a1a1a' },
              }}
            >
              View Our Menu
            </Box>
          </Box>
        </Box>

        <Features />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </Box>
    </>
  );
};

export default Home;
