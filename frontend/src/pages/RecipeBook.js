import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const RecipeBook = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      bgcolor: 'background.paper'
    }}>
      <Container maxWidth="md">
        <Box sx={{ 
          textAlign: 'center',
          p: 4,
          borderRadius: 4,
          bgcolor: 'background.default',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <AccessTimeIcon sx={{ 
            fontSize: 60, 
            color: 'primary.main',
            mb: 2
          }} />
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              mb: 2
            }}
          >
            Recipe Book Coming Soon
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RecipeBook; 