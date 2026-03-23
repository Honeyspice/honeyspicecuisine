import React from 'react';
import { Box, Fab, Paper, Typography, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';

const CHAT_STORAGE_KEY = 'honeyspice.chatSeen.v1';
const WHATSAPP_NUMBER = '447721629566'; // your WhatsApp number without '+'

const FloatingChat = () => {
  const [openHint, setOpenHint] = React.useState(false);

  React.useEffect(() => {
    try {
      const seen = window.localStorage.getItem(CHAT_STORAGE_KEY);
      if (!seen) {
        setOpenHint(true);
      }
    } catch {
      // ignore storage errors
    }
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

  return (
    <>
      {openHint && (
        <Box
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 96,
            zIndex: 1300,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 1.5,
              maxWidth: 260,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <WhatsAppIcon sx={{ color: '#25D366', mt: 0.5 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Chat with HoneySpice
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Questions about your order? Tap the green icon to chat on WhatsApp.
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setOpenHint(false)}
              aria-label="Close chat hint"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Paper>
        </Box>
      )}

      <Fab
        color="primary"
        aria-label="Chat on WhatsApp"
        onClick={openWhatsApp}
        sx={{
          position: 'fixed',
          right: 16,
          bottom: 24,
          zIndex: 1299,
          bgcolor: '#25D366',
          '&:hover': { bgcolor: '#1ebe5c' },
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </>
  );
};

export default FloatingChat;

