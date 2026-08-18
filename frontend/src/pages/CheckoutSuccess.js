import React from 'react';
import { Alert, Box, Button, Card, CircularProgress, Container, Divider, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { apiUrl } from '../utils/apiBase';

function generateRef() {
  return 'HS-' + Math.random().toString(36).toUpperCase().slice(2, 8);
}

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const { clear } = useCart();

  const [state, setState] = React.useState({ loading: true, ok: false, message: null });
  const orderRef = React.useRef(generateRef());

  React.useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!sessionId) {
        setState({ loading: false, ok: false, message: 'Missing Stripe session id.' });
        return;
      }
      try {
        const res = await fetch(apiUrl(`/api/payments/checkout-session/${encodeURIComponent(sessionId)}`), {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || 'Could not verify payment.');

        const paid = data?.payment_status === 'paid' && data?.status === 'complete';
        if (!cancelled) {
          setState({ loading: false, ok: paid, message: paid ? null : 'Payment not confirmed yet. If you were charged, contact support.' });
        }
      } catch (err) {
        if (!cancelled) setState({ loading: false, ok: false, message: err.message || 'Could not verify payment.' });
      }
    }
    run();
    return () => { cancelled = true; };
  }, [sessionId]);

  React.useEffect(() => {
    if (state.loading || !state.ok || !sessionId) return;
    const key = `honeyspice.checkout.success.clear.${sessionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      clear();
      sessionStorage.setItem(key, '1');
    } catch {
      clear();
    }
  }, [state.loading, state.ok, sessionId, clear]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAF6F0', pt: { xs: 4, sm: 5, md: 6 }, pb: { xs: 5, md: 7 } }}>
      <Container maxWidth="sm">
        {state.loading ? (
          <Card sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Stack spacing={2} alignItems="center">
              <CircularProgress size={32} />
              <Typography color="text.secondary">Verifying your payment…</Typography>
            </Stack>
          </Card>
        ) : state.ok ? (
          /* ── Success ─────────────────────────────────────────────────── */
          <Card sx={{ p: { xs: 3, md: 4.5 }, overflow: 'hidden' }}>
            {/* Orange top bar */}
            <Box sx={{ height: 4, bgcolor: 'primary.main', mx: -4.5, mt: -4.5, mb: 4 }} />

            {/* Check icon */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: '3.5rem', color: 'primary.main' }} />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 900, textAlign: 'center', mb: 1 }}>
              Order confirmed!
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.95rem', mb: 3.5 }}>
              Thanks for your order. We've received it and will get started shortly.
            </Typography>

            {/* Kitchen badge */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'rgba(244,106,6,0.07)',
                border: '1px solid rgba(244,106,6,0.2)',
                borderRadius: 2,
                px: 2.5,
                py: 2,
                mb: 3,
              }}
            >
              <LocalDiningIcon sx={{ color: 'primary.main', fontSize: '1.4rem', flexShrink: 0 }} />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'primary.main' }}>
                  Prepared by Honeyspice Kitchen
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', mt: 0.2 }}>
                  Stirling, Scotland · Fresh to order
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Order details */}
            <Stack spacing={1.5} sx={{ mb: 3.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Order reference</Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>{orderRef.current}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Estimated ready time</Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>30–45 mins</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>Updates</Typography>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>Sent by email & SMS</Typography>
              </Box>
            </Stack>

            <Alert severity="info" sx={{ mb: 3.5, fontSize: '0.85rem' }}>
              Questions? WhatsApp us on{' '}
              <Box component="a" href="https://wa.me/447721629566" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 700, color: 'inherit' }}>
                +44 7721 629566
              </Box>
              {' '}and quote your order reference.
            </Alert>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button component={RouterLink} to="/menu" variant="contained" fullWidth sx={{ fontWeight: 700 }}>
                Order more
              </Button>
              <Button component={RouterLink} to="/" variant="outlined" fullWidth sx={{ fontWeight: 700 }}>
                Back to home
              </Button>
            </Stack>
          </Card>
        ) : (
          /* ── Not confirmed ──────────────────────────────────────────── */
          <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Payment status</Typography>
              <Alert severity="warning">{state.message || 'Payment not confirmed.'}</Alert>
              <Typography variant="body2" color="text.secondary">
                If you believe you were charged, please contact us and we'll resolve it promptly.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button component={RouterLink} to="/menu" variant="contained">Back to menu</Button>
                <Button component="a" href="https://wa.me/447721629566" target="_blank" rel="noopener noreferrer" variant="outlined">
                  Contact us on WhatsApp
                </Button>
              </Stack>
            </Stack>
          </Card>
        )}
      </Container>
    </Box>
  );
}
