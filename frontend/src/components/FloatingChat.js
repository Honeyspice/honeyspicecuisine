import React from 'react';
import { Fab, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WHATSAPP_NUMBER = '447721629566'; // your WhatsApp number without '+'

// The auto-opening "Chat with HoneySpice" card was removed. It appeared
// unprompted 4 seconds after load and added a third floating layer over the
// food. The button remains, so the action is still one tap away.
const FloatingChat = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hi HoneySpice, I have a question about my order.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Mobile has WhatsApp in the bottom bar already.
  if (isMobile) return null;

  return (
    <Fab
      color="primary"
      size="large"
      aria-label="Chat on WhatsApp"
      onClick={openWhatsApp}
      sx={{
        display: { xs: 'none', md: 'flex' },
        position: 'fixed',
        right: 'max(16px, env(safe-area-inset-right))',
        bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        zIndex: 1299,
        bgcolor: '#25D366',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        '&:hover': { bgcolor: '#1ebe5c' },
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
};

export default FloatingChat;
