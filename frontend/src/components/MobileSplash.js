import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function MobileSplash() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('hs_splash_seen')) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setExiting(true);
    sessionStorage.setItem('hs_splash_seen', '1');
    setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/images/jollof_rice.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.5s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 4 }}>
        <Typography
          sx={{
            fontSize: '2.8rem',
            fontWeight: 900,
            color: '#F46A06',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          HoneySpice
        </Typography>
        <Typography
          sx={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            mt: 0.5,
            mb: 3,
          }}
        >
          Cuisine
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.88)',
            fontSize: '1.05rem',
            lineHeight: 1.65,
            mb: 5,
          }}
        >
          Authentic Nigerian flavours,
          <br />
          made for Stirling.
        </Typography>
        <Box
          component="button"
          onClick={dismiss}
          sx={{
            border: '2px solid rgba(255,255,255,0.85)',
            background: 'transparent',
            color: 'white',
            px: 5,
            py: 1.5,
            borderRadius: 999,
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'background 0.2s, border-color 0.2s',
            '&:active': {
              background: 'rgba(244,106,6,0.85)',
              borderColor: '#F46A06',
            },
          }}
        >
          Enter
        </Box>
      </Box>
    </Box>
  );
}
