import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Button,
  TextField,
} from '@mui/material';
import Seo from '../components/Seo';

const Contact = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <>
      <Seo
        title="Contact | HoneySpice Cuisine"
        description="Contact HoneySpice Cuisine in Stirling, UK for Nigerian food orders, catering, and general enquiries."
      />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', position: 'relative' }}>
      {/* Header Section with Gradient Mesh */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '28vh', md: '36vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 8,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 0% 0%, rgba(244, 106, 6, 0.7) 0%, transparent 50%),
              radial-gradient(circle at 100% 0%, rgba(255, 139, 61, 0.6) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(244, 106, 6, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(255, 139, 61, 0.8) 0%, transparent 50%)
            `,
            filter: 'blur(70px)',
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 2
          }
        }}
      >
        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, pt: { xs: 4, md: 6 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontSize: { xs: '2.2rem', md: '3.2rem' },
                  fontWeight: 'bold',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                  textAlign: 'center'
                }}
              >
                Get in Touch
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  mb: 3,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  fontWeight: 500,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  textAlign: 'center'
                }}
              >
                We'd Love to Hear From You
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  maxWidth: '600px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  fontWeight: 400,
                  opacity: 0.9,
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  textAlign: 'center',
                  mx: 'auto'
                }}
              >
                Have questions about our menu, reservations, or catering services? 
                Reach out to us and we'll get back to you as soon as possible.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Card
          sx={{
            p: 4,
            borderRadius: '10px',
            boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Send Us a Message
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Fill out the form below and we'll get back to you as soon as possible.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                required
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                required
                fullWidth
                label="Your Email"
                type="email"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                required
                fullWidth
                label="Your Message"
                multiline
                rows={6}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Send Message
              </Button>
            </Box>
          </form>

          {showMessage && (
            <Typography
              sx={{
                mt: 2,
                p: 2,
                bgcolor: 'warning.light',
                color: 'warning.dark',
                borderRadius: 1,
                textAlign: 'center'
              }}
            >
              Contact form not available yet!
            </Typography>
          )}
        </Card>
      </Container>
    </Box>
    </>
  );
};

export default Contact; 