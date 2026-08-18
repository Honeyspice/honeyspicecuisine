import React from 'react';
import { Alert, Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function CheckoutCancel() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', pt: { xs: 4, sm: 5, md: 6 }, pb: { xs: 5, md: 7 } }}>
      <Container maxWidth="md">
        <Card sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Checkout cancelled
            </Typography>
            <Alert severity="info">No payment was taken. You can return to checkout whenever you’re ready.</Alert>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button component={RouterLink} to="/checkout" variant="contained">
                Return to checkout
              </Button>
              <Button component={RouterLink} to="/cart" variant="text">
                Back to basket
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

