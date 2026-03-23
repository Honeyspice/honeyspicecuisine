import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'grey.900',
        pt: { xs: 5, md: 7 },
        pb: { xs: 'calc(40px + env(safe-area-inset-bottom, 0px))', md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0.5 }}>
            <IconButton
              component="a"
              href="https://facebook.com/Honeyspicecuisine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{ color: 'common.white' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com/Honeyspicecuisine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              sx={{ color: 'common.white' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com/Honeyspicecuisine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{ color: 'common.white' }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton component="a" href="mailto:support@honeyspicecuisine.co.uk" aria-label="Email" sx={{ color: 'common.white' }}>
              <EmailIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: { xs: 1, sm: 2 },
              rowGap: 1.5,
              mb: 2,
              px: { xs: 1, sm: 0 },
            }}
          >
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