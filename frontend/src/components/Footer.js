import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'grey.900', py: { xs: 5, md: 7 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Link 
              href="https://facebook.com/Honeyspicecuisine" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'common.white' }}
            >
              <FacebookIcon sx={{ color: 'common.white' }} />
            </Link>
            <Link 
              href="https://twitter.com/Honeyspicecuisine" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'common.white' }}
            >
              <TwitterIcon sx={{ color: 'common.white' }} />
            </Link>
            <Link 
              href="https://instagram.com/Honeyspicecuisine" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'common.white' }}
            >
              <InstagramIcon sx={{ color: 'common.white' }} />
            </Link>
            <Link 
              href="mailto:support@honeyspicecuisine.co.uk" 
              sx={{ mx: 1, color: 'common.white' }}
            >
              <EmailIcon sx={{ color: 'common.white' }} />
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
                color: 'common.white',
                textDecoration: 'none',
                '&:hover': {
                  color: 'common.white',
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
                color: 'common.white',
                textDecoration: 'none',
                '&:hover': {
                  color: 'common.white',
                  opacity: 0.8,
                  textDecoration: 'none'
                }
              }}
            >
              Contact
            </Link>
          </Box>
          <Typography variant="body2" color="common.white" sx={{ opacity: 0.9 }}>
            © 2025 HoneySpice Cuisine. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 