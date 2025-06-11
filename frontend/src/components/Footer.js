import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
              href="https://twitter.com/Honeyspice" 
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
              href="https://youtube.com/@honeyspicecuisine" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'white' }}
            >
              <YouTubeIcon sx={{ color: 'white' }} />
            </Link>
            <Link 
              href="https://www.tiktok.com/@honeyspicecuisine_" 
              target="_blank" 
              rel="noopener noreferrer" 
              sx={{ mx: 1, color: 'white' }}
            >
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{
                  width: 24,
                  height: 24,
                  fill: 'currentColor'
                }}
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </Box>
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