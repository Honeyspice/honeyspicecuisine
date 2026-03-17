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
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const { deliveryFee, serviceFee, total } = computeFees(subtotal);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.paper',
        pt: { xs: 12, sm: 13, md: 14 },
        pb: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h2" component="h1" sx={{ color: 'text.primary' }}>
            Your basket
          </Typography>
          <Button component={RouterLink} to="/menu" variant="text">
            Continue shopping
          </Button>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ mb: 0.25 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatGBP(item.price)} each
                          </Typography>
                        </Box>

                        <TextField
                          size="small"
                          label="Qty"
                          type="number"
                          inputProps={{ min: 1 }}
                          value={item.quantity}
                          onChange={(e) => setQuantity(item.id, e.target.value)}
                          sx={{ width: 110 }}
                        />

                        <Typography sx={{ minWidth: 96, textAlign: 'right', fontWeight: 600 }}>
                          {formatGBP(item.price * item.quantity)}
                        </Typography>

                        <IconButton aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
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
                  Delivery is free over £30. Service fee helps cover platform and support costs.
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

