import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.paper',
      py: { xs: 4, sm: 6, md: 8 },
      borderTop: '1px solid',
      borderColor: 'divider'
    }}>
      <Container maxWidth="md">
        <Box sx={{ 
          textAlign: 'center',
          maxWidth: 600,
          mx: 'auto',
          px: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '1.75rem',
                md: '2rem'
              },
              fontWeight: 600,
              mb: { xs: 1, sm: 1.5 }
            }}
          >
            Subscribe to Our Newsletter
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              mb: { xs: 2, sm: 3 },
              fontSize: {
                xs: '0.875rem',
                sm: '1rem',
                md: '1.125rem'
              }
            }}
          >
            Stay updated with our latest menu items, special offers, and events.
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 2 },
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            <TextField
              fullWidth
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: { xs: 48, sm: 56 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                height: { xs: 48, sm: 56 },
                px: { xs: 3, sm: 4 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                whiteSpace: 'nowrap'
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter; 