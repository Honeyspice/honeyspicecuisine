import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1A1A1A', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Link 
              href="https://facebook.com/Honeyspicecuisine" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'white' }}
            >
              <FacebookIcon sx={{ color: 'white' }} />
            </Link>
            <Link 
              href="https://twitter.com/Honeyspicecuisine" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'white' }}
            >
              <TwitterIcon sx={{ color: 'white' }} />
            </Link>
            <Link 
              href="https://instagram.com/Honeyspicecuisine" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'white' }}
            >
              <InstagramIcon sx={{ color: 'white' }} />
            </Link>
            <Link 
              href="mailto:support@honeyspicecuisine.co.uk" 
              sx={{ mx: 1, color: 'white' }}
            >
              <EmailIcon sx={{ color: 'white' }} />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Link 
              component={RouterLink} 
              to="/about" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                px: 2, 
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  color: 'white',
                  opacity: 0.8,
                  textDecoration: 'none'
                }
              }}
            >
              About
            </Link>
            <Link 
              component={RouterLink} 
              to="/contact" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '1rem', 
                px: 2, 
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  color: 'white',
                  opacity: 0.8,
                  textDecoration: 'none'
                }
              }}
            >
              Contact
            </Link>
          </Box>
          <Typography variant="body2" color="white">
            © 2025 HoneySpice Cuisine. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 