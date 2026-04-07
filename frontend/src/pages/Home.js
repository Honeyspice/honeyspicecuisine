import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const virtualBrands = [
    {
      name: 'HoneySpice Nigerian Kitchen',
      focus: 'Jollof, soups, and swallows',
      image: '/images/Egusi.png',
      imageAlt: 'Egusi soup from HoneySpice Nigerian Kitchen',
    },
    {
      name: 'Spice Grill House',
      focus: 'Suya and grilled chicken favorites',
      image: '/images/grilled_suya.jpg',
      imageAlt: 'Grilled suya from Spice Grill House',
    },
    {
      name: 'Late Night Bites',
      focus: 'Shawarma, fries, and quick combos',
      image: '/images/barbecue.jpg',
      imageAlt: 'Barbecue platter for Late Night Bites',
    },
  ];

  return (
    <>
      <Seo
        title="HoneySpice Cuisine | Nigerian Food in Stirling"
        description="Authentic Nigerian food in Stirling, UK. Order Jollof Rice, Efo Riro, Ofada and more for collection or delivery from HoneySpice Cuisine."
      />
      <Box>
        <Hero />

        {/* Find Us — cream section + cinematic image */}
        <Box>
          {/* Cream text section */}
          <Box
            sx={{
              bgcolor: '#FAF6F0',
              py: { xs: 8, md: 11 },
              textAlign: 'center',
              px: 3,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.75rem' },
                color: '#1a1a1a',
                mb: 2,
              }}
            >
              Visit Us in Stirling
            </Typography>
            <Typography
              sx={{
                color: '#666',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                maxWidth: 560,
                mx: 'auto',
                lineHeight: 1.8,
                mb: 5,
              }}
            >
              Come experience authentic Nigerian cuisine at our restaurant in Stirling, Scotland —
              or let us come to you with our full catering and events service.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component={RouterLink}
                to="/location"
                sx={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  px: 4,
                  py: 1.5,
                  border: '2px solid #1a1a1a',
                  color: '#1a1a1a',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  transition: 'background 0.2s, color 0.2s',
                  '&:hover': { background: '#1a1a1a', color: '#fff' },
                }}
              >
                Find Us
              </Box>
              <Box
                component={RouterLink}
                to="/partner/dashboard"
                sx={{
                  textDecoration: 'none',
                  display: 'inline-block',
                  px: 4,
                  py: 1.5,
                  border: '2px solid #F46A06',
                  background: '#F46A06',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'background 0.2s',
                  '&:hover': { background: '#D45A00', borderColor: '#D45A00' },
                }}
              >
                Explore Partner Kitchen
              </Box>
            </Box>
          </Box>

          {/* Full-bleed cinematic image with overlay text */}
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
              src="/images/Egusi.png"
              alt="Nigerian feast spread"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                filter: 'brightness(0.62) saturate(1.15)',
                display: 'block',
              }}
            />
            {/* Overlay text */}
            <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 3 }}>
              <Typography
                variant="h2"
                sx={{
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: { xs: '2.2rem', sm: '3.5rem', md: '5rem' },
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 24px rgba(0,0,0,0.4)',
                  mb: 2.5,
                  textTransform: 'uppercase',
                }}
              >
                COOKED WITH LOVE,<br />SERVED WITH PRIDE.
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  mb: 4,
                  maxWidth: 480,
                  mx: 'auto',
                  lineHeight: 1.75,
                }}
              >
                Every dish crafted from authentic Nigerian recipes — packed with bold spices, fresh ingredients, and real flavour.
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
        </Box>

        {/* What's On — Three Concepts */}
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            {/* Section heading */}
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: '0.2em', color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem' }}
              >
                One Kitchen
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 800,
                  mt: 0.5,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Three Food Concepts
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mt: 1.5, maxWidth: 520, mx: 'auto', fontSize: { xs: '0.95rem', sm: '1rem' } }}
              >
                HoneySpice serves different cravings from one kitchen. Browse your preferred menu and order from your phone.
              </Typography>
            </Box>

          </Container>

          {/* Wide image grid with side breathing room */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: { xs: 2, md: 3 },
              mt: { xs: 2, md: 0 },
              px: { xs: 2, sm: 4, md: 8 },
            }}
          >
            {virtualBrands.map((brand) => (
              <Box key={brand.name} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Orange background square — image contracts in on hover to reveal it */}
                <Box
                  component={RouterLink}
                  to="/menu"
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    background: '#1a1a1a',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover .brand-img': {
                      transform: 'scale(0.9)',
                    },
                  }}
                >
                  <Box
                    className="brand-img"
                    component="img"
                    src={brand.image}
                    alt={brand.imageAlt}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
                      transformOrigin: 'center center',
                    }}
                  />
                </Box>
                {/* Text outside the box */}
                <Box sx={{ pt: 2.5, pb: 3, textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.15rem' }, color: 'text.primary', mb: 0.75 }}>
                    {brand.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {brand.focus}
                  </Typography>
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
              Explore All Menus
            </Button>
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