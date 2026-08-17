import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SLIDES = [
  {
    src: '/images/efo_riro.png',
    heading: 'TASTE NIGERIAN\nFLAVOURS.',
    sub: 'Authentic soups, stews and swallows: bold, rich and cooked the traditional way. Delivery & collection from Stirling.',
    cta: { label: 'Order Now', to: '/menu' },
    secondaryCta: { label: 'Get Suggestions', to: '/ai-assistant' },
  },
  {
    src: '/images/jollof_rice.png',
    heading: 'BOOK YOUR\nEVENT.',
    sub: 'Private catering, weddings, corporate gatherings. Cooked and delivered by our kitchen.',
    cta: { label: 'Book Catering', to: '/reservation' },
    secondaryCta: { label: 'View Menu', to: '/menu' },
  },
  {
    src: '/images/grilled_suya.jpg',
    heading: 'SMART MEAL\nSUGGESTIONS.',
    sub: 'Tell us your budget, group size and occasion. We\'ll suggest the perfect Nigerian spread for you.',
    cta: { label: 'Get Suggestions', to: '/ai-assistant' },
    secondaryCta: { label: 'View Menu', to: '/menu' },
  },
  {
    src: '/images/barbecue.jpg',
    heading: 'PICNIC &\nGROUP MEALS.',
    sub: 'Planning a picnic or feeding a crowd? We\'ll bundle the right dishes for your group size and budget.',
    cta: { label: 'Plan My Picnic', to: '/plan-picnic' },
    secondaryCta: { label: 'View Menu', to: '/menu' },
  },
];

const INTERVAL = 5000; // ms per slide

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setFading(true);
      setCurrent(c => (c + 1) % SLIDES.length);
      setTimeout(() => { setPrev(null); setFading(false); }, 900);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (i) => {
    if (i === current) return;
    setPrev(current);
    setFading(true);
    setCurrent(i);
    setTimeout(() => { setPrev(null); setFading(false); }, 900);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '100svh', md: '100vh' },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Previous slide, fades out */}
      {prev !== null && (
        <Box
          component="img"
          src={SLIDES[prev].src}
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.72) saturate(1.1)',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.9s ease',
            zIndex: 1,
          }}
        />
      )}

      {/* Current slide, fades in */}
      <Box
        component="img"
        src={SLIDES[current].src}
        alt=""
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.72) saturate(1.1)',
          opacity: fading ? 1 : 1,
          transition: 'opacity 0.9s ease',
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* Centred content, fades with slide */}
      <Box
        key={current}
        sx={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          px: { xs: 3, md: 6 },
          maxWidth: 820,
          animation: 'heroFadeUp 0.8s ease forwards',
          '@keyframes heroFadeUp': {
            from: { opacity: 0, transform: 'translateY(18px)' },
            to:   { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: '#fff',
            fontWeight: 900,
            fontSize: { xs: '2rem', sm: '3.2rem', md: '4.5rem' },
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 28px rgba(0,0,0,0.4)',
            mb: 3,
            whiteSpace: 'pre-line',
          }}
        >
          {SLIDES[current].heading}
        </Typography>

        <Typography
          sx={{
            color: 'rgba(255,255,255,0.88)',
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            lineHeight: 1.75,
            mb: 5,
            maxWidth: 520,
            mx: 'auto',
          }}
        >
          {SLIDES[current].sub}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Box
            component={RouterLink}
            to={SLIDES[current].cta.to}
            sx={{
              textDecoration: 'none',
              display: 'inline-block',
              px: { xs: 3.5, md: 5 },
              py: 1.6,
              background: '#F46A06',
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '0.82rem', md: '0.88rem' },
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: '2px solid #F46A06',
              transition: 'background 0.25s, border-color 0.25s',
              '&:hover': { background: '#D45A00', borderColor: '#D45A00' },
            }}
          >
            {SLIDES[current].cta.label}
          </Box>
          <Box
            component={RouterLink}
            to={SLIDES[current].secondaryCta.to}
            sx={{
              textDecoration: 'none',
              display: 'inline-block',
              px: { xs: 3.5, md: 5 },
              py: 1.6,
              border: '2px solid rgba(255,255,255,0.8)',
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '0.82rem', md: '0.88rem' },
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'transparent',
              transition: 'background 0.25s, color 0.25s',
              '&:hover': { background: '#fff', color: '#1a1a1a' },
            }}
          >
            {SLIDES[current].secondaryCta.label}
          </Box>
        </Box>
      </Box>

      {/* Slide dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          gap: 1.25,
          alignItems: 'center',
        }}
      >
        {SLIDES.map((_, i) => (
          <Box
            key={i}
            onClick={() => goTo(i)}
            sx={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 999,
              background: i === current ? '#F46A06' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'width 0.4s ease, background 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero;
