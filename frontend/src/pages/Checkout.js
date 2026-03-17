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
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { computeFees } from '../utils/pricing';
import { formatGBP } from '../utils/money';
import { apiUrl } from '../utils/apiBase';

const Checkout = () => {
  const { items, subtotal } = useCart();
  const { deliveryFee, serviceFee, total } = computeFees(subtotal);

  const [status, setStatus] = React.useState({ type: null, message: null });
  const [submitting, setSubmitting] = React.useState(false);

  const handlePayByCard = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: null });

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      const email = String(fd.get('email') || '').trim();

      const res = await fetch(apiUrl('/api/payments/create-checkout-session'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customer: { email },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Payment setup failed');
      }

      const data = await res.json();
      if (!data.url) throw new Error('Missing Stripe redirect URL');
      window.location.assign(data.url);
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Payment setup failed' });
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.paper',
          pt: { xs: 13, sm: 14, md: 15 },
          pb: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="md">
          <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" gutterBottom>
              Your basket is empty.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add items first, then come back to checkout.
            </Typography>
            <Button component={RouterLink} to="/menu" variant="contained">
              View menu
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.paper',
        pt: { xs: 13, sm: 14, md: 15 },
        pb: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h2" component="h1">
            Checkout
          </Typography>
          <Button component={RouterLink} to="/cart" variant="text">
            Back to basket
          </Button>
        </Box>

        {status.type && (
          <Alert severity={status.type} sx={{ mb: 3 }}>
            {status.message}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Delivery details
              </Typography>

              <Box component="form" onSubmit={handlePayByCard}>
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
                  <Grid item xs={12}>
                    <TextField label="Delivery notes (optional)" fullWidth multiline minRows={3} />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Alert severity="info">
                      You’ll be redirected to a secure Stripe checkout to pay by card.
                    </Alert>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={items.length === 0 || submitting}
                    >
                      {submitting ? 'Redirecting…' : `Pay ${formatGBP(total)}`}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card
              sx={{
                p: { xs: 2.5, md: 3 },
                position: { xs: 'static', md: 'sticky' },
                top: { md: 320 },
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order summary
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
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2">{formatGBP(subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Delivery
                  </Typography>
                  <Typography variant="body2">{formatGBP(deliveryFee)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Service fee
                  </Typography>
                  <Typography variant="body2">{formatGBP(serviceFee)}</Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {formatGBP(total)}
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                Delivery is free over £30. Service fee is capped at £2.99.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;

