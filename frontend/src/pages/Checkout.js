import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  Divider,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { computeFees } from '../utils/pricing';
import { formatGBP } from '../utils/money';
import { apiUrl } from '../utils/apiBase';

const PAYMENT_TEMPORARILY_DISABLED = true;

const FulfillmentOption = ({ value, selected, onClick, title, sub }) => (
  <Box
    onClick={onClick}
    sx={{
      flex: 1,
      border: '2px solid',
      borderColor: selected ? 'primary.main' : 'divider',
      bgcolor: selected ? 'rgba(244,106,6,0.05)' : 'background.paper',
      borderRadius: 2,
      p: 2,
      cursor: 'pointer',
      transition: 'all 0.2s',
      textAlign: 'center',
      '&:hover': { borderColor: 'primary.main' },
    }}
  >
    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: selected ? 'primary.main' : 'text.primary' }}>
      {title}
    </Typography>
    <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', mt: 0.25 }}>
      {sub}
    </Typography>
  </Box>
);

const Checkout = () => {
  const { items, subtotal } = useCart();
  const { deliveryFee, serviceFee, total } = computeFees(subtotal);

  const [fulfillment, setFulfillment] = React.useState('delivery');
  const [status, setStatus] = React.useState({ type: null, message: null, actionUrl: null });
  const [submitting, setSubmitting] = React.useState(false);

  const handlePayByCard = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: null, actionUrl: null });

    try {
      const fd = new FormData(e.currentTarget);
      const email = String(fd.get('email') || '').trim();

      const res = await fetch(apiUrl('/api/payments/create-checkout-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customer: { email },
          fulfillment,
          kitchen: 'Honeyspice Kitchen',
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Payment setup failed');
      }

      const data = await res.json();
      if (!data.url) throw new Error('Missing Stripe redirect URL');

      setTimeout(() => {
        setSubmitting(false);
        setStatus({ type: 'warning', message: 'Could not redirect automatically. Tap "Continue to Stripe" below.', actionUrl: data.url });
      }, 3500);

      window.location.href = data.url;
    } catch (err) {
      const isNetworkError = String(err?.message || '').toLowerCase().includes('failed to fetch');
      const message = isNetworkError
        ? 'Cannot reach payment server. If this is a live site, set REACT_APP_API_BASE_URL to your backend URL and redeploy frontend.'
        : err.message || 'Payment setup failed';
      setStatus({ type: 'error', message, actionUrl: null });
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', pt: { xs: 13, sm: 14, md: 15 }, pb: { xs: 5, md: 7 } }}>
        <Container maxWidth="md">
          <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" gutterBottom>Your basket is empty.</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Add items first, then come back to checkout.</Typography>
            <Button component={RouterLink} to="/menu" variant="contained">View menu</Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', pt: { xs: 13, sm: 14, md: 15 }, pb: { xs: 5, md: 7 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h2" component="h1">Checkout</Typography>
          <Button component={RouterLink} to="/cart" variant="text">Back to basket</Button>
        </Box>

        {/* Kitchen badge */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: 'rgba(244,106,6,0.08)',
            border: '1px solid rgba(244,106,6,0.2)',
            borderRadius: 99,
            px: 2,
            py: 0.75,
            mb: 3,
          }}
        >
          <LocalDiningIcon sx={{ color: 'primary.main', fontSize: '1rem' }} />
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'primary.main' }}>
            Fulfilled by Honeyspice Kitchen
          </Typography>
        </Box>

        {status.type && (
          <Alert
            severity={status.type}
            sx={{ mb: 3 }}
            action={
              status.actionUrl ? (
                <Button color="inherit" size="small" onClick={() => { window.location.href = status.actionUrl; }}>
                  Continue to Stripe
                </Button>
              ) : null
            }
          >
            {status.message}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* ── Left: form ───────────────────────────────────────────────── */}
          <Grid item xs={12} md={7}>
            <Card sx={{ p: { xs: 2.5, md: 3 } }}>

              {/* Delivery / Collection toggle */}
              <Typography variant="h6" sx={{ mb: 2 }}>Fulfilment</Typography>
              <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                <FulfillmentOption
                  value="delivery"
                  selected={fulfillment === 'delivery'}
                  onClick={() => setFulfillment('delivery')}
                  title="Delivery"
                  sub="We bring it to you"
                />
                <FulfillmentOption
                  value="collection"
                  selected={fulfillment === 'collection'}
                  onClick={() => setFulfillment('collection')}
                  title="Collection"
                  sub="Pick up from Stirling"
                />
              </Stack>

              {/* Collection notice */}
              {fulfillment === 'collection' && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  Collect from our Stirling kitchen. We'll send you a ready notification by SMS or email.
                </Alert>
              )}

              <Divider sx={{ mb: 3 }} />

              <Box
                component="form"
                onSubmit={(e) => {
                  if (PAYMENT_TEMPORARILY_DISABLED) { e.preventDefault(); return; }
                  handlePayByCard(e);
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>Customer details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Full name" fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Mobile number" fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField name="email" label="Email" type="email" fullWidth required />
                  </Grid>

                  {/* Address, only shown for delivery */}
                  {fulfillment === 'delivery' && (
                    <>
                      <Grid item xs={12}>
                        <TextField label="Address line 1" fullWidth required />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Address line 2 (optional)" fullWidth />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Town / City" fullWidth required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Postcode" fullWidth required />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <TextField
                      label={fulfillment === 'collection' ? 'Collection notes (optional)' : 'Delivery notes (optional)'}
                      fullWidth
                      multiline
                      minRows={2}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  {/* Payment section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>Payment</Typography>
                    <Box
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2.5,
                        bgcolor: '#FAFAFA',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1.5,
                      }}
                    >
                      {/* Stripe card placeholder */}
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {['VISA', 'MC', 'AMEX'].map((brand) => (
                          <Box
                            key={brand}
                            sx={{
                              px: 1,
                              py: 0.3,
                              border: '1px solid #D1D5DB',
                              borderRadius: 0.75,
                              bgcolor: '#fff',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              color: '#374151',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {brand}
                          </Box>
                        ))}
                      </Box>
                      <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                        Secure card payment via Stripe
                      </Typography>
                    </Box>

                    <Alert severity={PAYMENT_TEMPORARILY_DISABLED ? 'warning' : 'info'}>
                      {PAYMENT_TEMPORARILY_DISABLED
                        ? 'Card payment is paused for now. Contact us via WhatsApp to complete your order.'
                        : "You'll be redirected to a secure Stripe checkout to pay by card."}
                    </Alert>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type={PAYMENT_TEMPORARILY_DISABLED ? 'button' : 'submit'}
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={PAYMENT_TEMPORARILY_DISABLED || items.length === 0 || submitting}
                      sx={{ height: 50, fontWeight: 800, fontSize: '1rem' }}
                    >
                      {PAYMENT_TEMPORARILY_DISABLED
                        ? `Pay ${formatGBP(total)} (coming soon)`
                        : submitting
                        ? 'Redirecting…'
                        : `Pay ${formatGBP(total)}`}
                    </Button>
                    {PAYMENT_TEMPORARILY_DISABLED && (
                      <Box sx={{ mt: 1.5, textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', mb: 1 }}>
                          Or complete your order via WhatsApp:
                        </Typography>
                        <Button
                          component="a"
                          href="https://wa.me/447721629566"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outlined"
                          fullWidth
                          sx={{ fontWeight: 700 }}
                        >
                          WhatsApp Us to Order
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

          {/* ── Right: order summary ──────────────────────────────────────── */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: { xs: 2.5, md: 3 }, position: { xs: 'static', md: 'sticky' }, top: { md: 320 } }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Order summary</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: 'primary.main', fontWeight: 600, mb: 2 }}>
                Honeyspice Kitchen · Stirling
              </Typography>

              <Stack spacing={1.25} sx={{ mb: 2 }}>
                {items.map((i) => (
                  <Box key={i.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                      {i.quantity} × {i.name}
                    </Typography>
                    <Typography variant="body2">{formatGBP(i.price * i.quantity)}</Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                  <Typography variant="body2">{formatGBP(subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {fulfillment === 'collection' ? 'Delivery' : 'Delivery'}
                  </Typography>
                  <Typography variant="body2">
                    {fulfillment === 'collection' ? 'Free (collection)' : formatGBP(deliveryFee)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Service fee</Typography>
                  <Typography variant="body2">{formatGBP(serviceFee)}</Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {fulfillment === 'collection' ? formatGBP(subtotal + serviceFee) : formatGBP(total)}
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                {fulfillment === 'collection'
                  ? 'No delivery charge for collection orders.'
                  : 'Delivery is free over £100. Service fee is capped at £2.99.'}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
