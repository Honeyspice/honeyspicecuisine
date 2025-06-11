import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';

const Location = () => {
  const handleGetDirections = () => {
    const address = "7 Youd Street, Leigh, WN7 4BY";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  return (
    <Box sx={{ 
      py: 8,
      pt: { xs: 12, sm: 14 },
      minHeight: '100vh'
    }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Find Us
        </Typography>
        <Box sx={{ 
          width: '100%', 
          height: '500px', 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.1234567890123!2d-2.5187!3d53.4987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b0e9b0c0c0c0c%3A0x0!2s7%20Youd%20St%2C%20Leigh%20WN7%204BY!5e0!3m2!1sen!2suk!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HoneySpice Location"
          />
        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            7 Youd Street, Leigh, WN7 4BY
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DirectionsIcon />}
            onClick={handleGetDirections}
            sx={{
              mt: 2,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-1px)'
              }
            }}
          >
            Get Directions
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Location; 