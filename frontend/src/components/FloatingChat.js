import React from 'react';
import { Box, Fab, Paper, Typography, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';

const CHAT_STORAGE_KEY = 'honeyspice.chatSeen.v1';
const WHATSAPP_NUMBER = '447721629566'; // your WhatsApp number without '+'

const FloatingChat = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openHint, setOpenHint] = React.useState(false);

  React.useEffect(() => {
    let showTimer;
    let hideTimer;
    try {
      const seen = window.localStorage.getItem(CHAT_STORAGE_KEY);
      if (!seen) {
        showTimer = window.setTimeout(() => {
          setOpenHint(true);
          // Auto-dismiss after 5s on mobile
          if (window.innerWidth < 768) {
            hideTimer = window.setTimeout(() => setOpenHint(false), 5000);
          }
        }, 4000);
      }
    } catch {
      // ignore storage errors
    }
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hi HoneySpice, I have a question about my order.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    try {
      window.localStorage.setItem(CHAT_STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setOpenHint(false);
  };

  if (isMobile) return null;

  return (
    <>
      {openHint && (
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'fixed',
            right: 'max(16px, env(safe-area-inset-right))',
            bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
            zIndex: 1300,
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: { xs: 1, sm: 1.5 },
              maxWidth: { xs: 220, sm: 260 },
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <WhatsAppIcon sx={{ color: '#25D366', mt: 0.25, fontSize: { xs: 18, sm: 24 } }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: { xs: '0.78rem', sm: '0.875rem' } }}>
                Chat with HoneySpice
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.72rem', sm: '0.8125rem' } }}>
                Tap to chat on WhatsApp.
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setOpenHint(false)}
              aria-label="Close chat hint"
              sx={{ p: 0.25 }}
            >
              <CloseIcon sx={{ fontSize: { xs: 14, sm: 18 } }} />
            </IconButton>
          </Paper>
        </Box>
      )}

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
    </>
  );
};

export default FloatingChat;

