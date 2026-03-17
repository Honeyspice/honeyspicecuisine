import React from 'react';
import { Alert, Box, Button, Card, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { apiUrl } from '../utils/apiBase';

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const { clear } = useCart();

  const [state, setState] = React.useState({ loading: true, ok: false, message: null });

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
          setState({
            loading: false,
            ok: paid,
            message: paid ? null : 'Payment not confirmed yet. If you were charged, contact support.',
          });
        }
      } catch (err) {
        if (!cancelled) setState({ loading: false, ok: false, message: err.message || 'Could not verify payment.' });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  React.useEffect(() => {
    if (state.loading) return;
    if (!state.ok) return;
    if (!sessionId) return;

    const key = `honeyspice.checkout.success.clear.${sessionId}`;
    try {
      const seen = sessionStorage.getItem(key);
      if (seen) return;
      clear();
      sessionStorage.setItem(key, '1');
    } catch {
      // If storage fails, still clear (best effort).
      clear();
    }
  }, [state.loading, state.ok, sessionId, clear]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', pt: { xs: 12, sm: 13, md: 14 }, pb: { xs: 5, md: 7 } }}>
      <Container maxWidth="md">
        <Card sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Payment status
            </Typography>

            {state.loading ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={22} />
                <Typography color="text.secondary">Verifying your payment with Stripe…</Typography>
              </Stack>
            ) : state.ok ? (
              <Alert severity="success">Payment confirmed. Thanks — your order is now being processed.</Alert>
            ) : (
              <Alert severity="warning">{state.message || 'Payment not confirmed.'}</Alert>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button component={RouterLink} to="/menu" variant="contained">
                Back to menu
              </Button>
              <Button component={RouterLink} to="/" variant="text">
                Home
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

