import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const STORAGE_KEY = 'honeyspice.cookieConsent.v1';

const CookieBanner = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignore
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        pb: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <Box
        sx={{
          maxWidth: 840,
          width: '100%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.25)',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          p: { xs: 2, sm: 2.5 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            We use cookies
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We use essential cookies to make this site work, and optional analytics cookies to understand how you use
            HoneySpice so we can improve it.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexShrink: 0,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Button
            size="medium"
            fullWidth
            variant="outlined"
            sx={{ sm: { width: 'auto', minWidth: 120 } }}
            onClick={() => {
              try {
                window.localStorage.setItem(STORAGE_KEY, 'rejected');
              } catch {
                // ignore
              }
              setOpen(false);
            }}
          >
            Reject
          </Button>
          <Button variant="contained" size="medium" fullWidth sx={{ sm: { width: 'auto', minWidth: 120 } }} onClick={handleAccept}>
            Accept
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CookieBanner;

