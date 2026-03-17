import React from 'react';
import { Box, Container, Typography, Button, Card, Stack } from '@mui/material';
import Seo from '../components/Seo';
import DirectionsIcon from '@mui/icons-material/Directions';

const Location = () => {
  const handleGetDirections = () => {
    const address = '34 Woodside Road, Stirling FK8 1PS';
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  return (
    <>
      <Seo
        title="Find Us | HoneySpice Cuisine Stirling"
        description="Find HoneySpice Cuisine in Stirling, UK at 34 Woodside Road, FK8 1PS. View our location and get directions."
      />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.paper',
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 0 },
        }}
      >
        <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'text.secondary',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          Our restaurant
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'primary.main',
            mb: { xs: 3, sm: 4, md: 6 },
            fontWeight: 'bold',
            fontSize: {
              xs: '1.75rem',
              sm: '2.25rem',
              md: '2.5rem',
            },
          }}
        >
          Find us in Stirling
        </Typography>

        <Card
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 18px 40px rgba(15, 23, 42, 0.18)',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: { xs: 260, sm: 340, md: 420 },
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8924.21380722936!2d-3.9580!3d56.1182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48886546d7b00001%3A0x0!2s34%20Woodside%20Road%2C%20Stirling%20FK8%201PS!5e0!3m2!1sen!2suk!4v1700000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HoneySpice Location"
            />
          </Box>

          <Box
            sx={{
              px: { xs: 2.5, sm: 3 },
              py: { xs: 2.5, sm: 3 },
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 0.5 }}>
                  Restaurant address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  34 Woodside Road, Stirling FK8 1PS
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DirectionsIcon />}
                onClick={handleGetDirections}
                sx={{
                  mt: { xs: 1, sm: 0 },
                  px: 3.5,
                  py: 1.1,
                  fontWeight: 600,
                  borderRadius: 999,
                  textTransform: 'none',
                }}
              >
                Get directions
              </Button>
            </Stack>
          </Box>
        </Card>
      </Container>
    </Box>
    </>
  );
};

export default Location; 