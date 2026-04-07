import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WHATSAPP_NUMBER = '447721629566';

export default function MobileBottomBar() {
  const openWhatsApp = () => {
    const text = encodeURIComponent('Hi HoneySpice, I have a question about my order.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1400,
        height: 'calc(56px + env(safe-area-inset-bottom, 0px))',
        bgcolor: '#1a1a1a',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* BOOK NOW */}
      <Box
        component={RouterLink}
        to="/reservation"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          pb: 'env(safe-area-inset-bottom, 0px)',
          transition: 'background 0.2s',
          '&:active': { background: '#F46A06' },
        }}
      >
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Book Now
        </Typography>
      </Box>

      {/* OUR MENU */}
      <Box
        component={RouterLink}
        to="/menu"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          pb: 'env(safe-area-inset-bottom, 0px)',
          transition: 'background 0.2s',
          '&:active': { background: '#F46A06' },
        }}
      >
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Our Menu
        </Typography>
      </Box>

      {/* WHATSAPP */}
      <Box
        onClick={openWhatsApp}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          pb: 'env(safe-area-inset-bottom, 0px)',
          transition: 'background 0.2s',
          '&:active': { background: '#25D366' },
        }}
      >
        <WhatsAppIcon sx={{ color: '#25D366', fontSize: 22 }} />
      </Box>
    </Box>
  );
}
