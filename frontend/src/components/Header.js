import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'primary.main',
        color: 'white',
        py: 3,
        mb: 10,
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -100,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          transform: 'scaleY(-1)',
          filter: 'blur(25px)',
          opacity: 1,
          zIndex: 1,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: -100,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          filter: 'blur(25px)',
          opacity: 0.8,
          zIndex: 1,
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h2"
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 2,
          }}
        >
          Authentic Nigerian Cuisine
        </Typography>
      </Container>
    </Box>
  );
};

export default Header; 