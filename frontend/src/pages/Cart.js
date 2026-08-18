import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Divider,
  IconButton,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { computeFees } from '../utils/pricing';
import { formatGBP } from '../utils/money';

const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();
  const { deliveryFee, serviceFee, total } = computeFees(subtotal);

  const handleClearBasket = () => {
    if (items.length === 0) return;
    const shouldClear = window.confirm('Clear all items from your basket?');
    if (shouldClear) {
      clear();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.paper',
        pt: { xs: 4, sm: 5, md: 6 },
        pb: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        {/* Stacks on mobile. Forcing the heading and both actions into one
            375px row wrapped all three onto two lines each, so "Your basket",
            "Clear basket" and "Continue shopping" were each broken in half. */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'baseline' },
            justifyContent: 'space-between',
            gap: { xs: 1.5, sm: 2 },
            mb: 3,
          }}
        >
          <Typography variant="h2" component="h1" sx={{ color: 'text.primary' }}>
            Your basket
          </Typography>
          <Stack direction="row" spacing={1}>
            {items.length > 0 ? (
              <Button variant="outlined" color="error" onClick={handleClearBasket}>
                Clear basket
              </Button>
            ) : null}
            <Button component={RouterLink} to="/menu" variant="text">
              Continue shopping
            </Button>
          </Stack>
        </Box>

        {items.length === 0 ? (
          <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" gutterBottom>
              Your basket is empty.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add a few items from the menu to get started.
            </Typography>
            <Button component={RouterLink} to="/menu" variant="contained">
              View menu
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: { xs: 2.5, md: 3 } }}>
                <Stack spacing={2}>
                  {items.map((item, idx) => (
                    <Box key={item.id}>
                      {/* Stacks on mobile. The four children need about 404px
                          of intrinsic width and a 375px phone gives 375, so the
                          name was squeezed onto three lines and the Qty label
                          clipped to "Q..". Name on its own row, controls
                          beneath. */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'stretch', sm: 'center' },
                          gap: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ mb: 0.25 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatGBP(item.price)} each
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            justifyContent: { xs: 'space-between', sm: 'flex-start' },
                          }}
                        >
                          <TextField
                            size="small"
                            label="Qty"
                            type="number"
                            inputProps={{ min: 1 }}
                            value={item.quantity}
                            onChange={(e) => setQuantity(item.id, e.target.value)}
                            sx={{ width: 96, flexShrink: 0 }}
                          />

                          <Typography sx={{ minWidth: 96, textAlign: 'right', fontWeight: 600 }}>
                            {formatGBP(item.price * item.quantity)}
                          </Typography>

                          <IconButton aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      {idx < items.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  p: { xs: 2.5, md: 3 },
                  position: { xs: 'static', md: 'sticky' },
                  top: { md: 320 },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Summary
                </Typography>

                <Stack spacing={1.25} sx={{ mb: 2 }}>
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Total
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {formatGBP(total)}
                  </Typography>
                </Box>

                <Button variant="contained" fullWidth size="large" onClick={() => navigate('/checkout')}>
                  Checkout
                </Button>

              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                Delivery is free over £100. Service fee helps cover platform and support costs.
              </Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;

