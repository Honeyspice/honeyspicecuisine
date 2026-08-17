import React from 'react';
import { Box, Container, Typography, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link as RouterLink } from 'react-router-dom';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const FooterLink = ({ to, children }) => (
  <Box
    component={RouterLink}
    to={to}
    sx={{
      display: 'block',
      color: 'rgba(255,255,255,0.6)',
      textDecoration: 'none',
      fontSize: '0.85rem',
      fontWeight: 500,
      letterSpacing: '0.03em',
      py: 0.5,
      transition: 'color 0.2s',
      '&:hover': { color: '#fff' },
    }}
  >
    {children}
  </Box>
);

const ColHeading = ({ children }) => (
  <Typography
    sx={{
      color: '#fff',
      fontWeight: 700,
      fontSize: '0.7rem',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      mb: 2.5,
    }}
  >
    {children}
  </Typography>
);

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#111',
        pt: { xs: 7, md: 10 },
        pb: { xs: 'calc(48px + env(safe-area-inset-bottom, 0px))', md: 6 },
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container maxWidth="lg">
        {/* Top row: logo + columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' },
            gap: { xs: 5, md: 4 },
            mb: { xs: 6, md: 8 },
          }}
        >
          {/* Brand column */}
          <Box>
            <Box
              component="img"
              src="/logo.png"
              alt="HoneySpice Cuisine"
              sx={{ height: 56, width: 'auto', mb: 2.5, filter: 'brightness(0) invert(1)', opacity: 0.9 }}
            />
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
                lineHeight: 1.6,
                maxWidth: 280,
                mb: 1.5,
              }}
            >
              Wholesome at Heart. Bold on the Plate.
            </Typography>
            {/* The previous blurb ended "Built with intelligent recommendation
                technology to personalise your experience", which described the
                software rather than the food and is not what anyone comes here
                to read. */}
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem',
                lineHeight: 1.8,
                maxWidth: 280,
                mb: 3,
              }}
            >
              Nigerian food in Stirling for collection and local delivery, and catering for events across the UK.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                component="a"
                href="https://instagram.com/Honeyspicecuisine"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.55)', '&:hover': { color: '#fff' } }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href="https://facebook.com/Honeyspicecuisine"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.55)', '&:hover': { color: '#fff' } }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.tiktok.com/@honeyspicecuisine_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                size="small"
                sx={{ color: 'rgba(255,255,255,0.55)', '&:hover': { color: '#fff' } }}
              >
                <TikTokIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Explore */}
          <Box>
            <ColHeading>Explore</ColHeading>
            <FooterLink to="/menu">Our Menu</FooterLink>
            <FooterLink to="/gallery">Our Cuisine</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/why-us">Why HoneySpice</FooterLink>
            <FooterLink to="/recipe-manual">Recipe Book</FooterLink>
          </Box>

          {/* Services */}
          <Box>
            <ColHeading>Services</ColHeading>
            <FooterLink to="/reservation">Event Catering</FooterLink>
            <FooterLink to="/order">Order Online</FooterLink>
            <FooterLink to="/location">Find Us</FooterLink>
          </Box>

          {/* Contact */}
          <Box>
            <ColHeading>Get In Touch</ColHeading>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
              Stirling, Scotland, UK
            </Typography>
            <Box
              component="a"
              href="mailto:chef@honeyspicecuisine.co.uk"
              sx={{
                display: 'block',
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                py: 0.5,
                transition: 'color 0.2s',
                '&:hover': { color: '#fff' },
              }}
            >
              chef@honeyspicecuisine.co.uk
            </Box>
            <Box
              component="a"
              href="https://wa.me/447721629566"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-block',
                mt: 2,
                px: 2.5,
                py: 1,
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'border-color 0.2s, background 0.2s',
                '&:hover': { borderColor: '#F46A06', background: '#F46A06' },
              }}
            >
              WhatsApp Us
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 3 }} />

        {/* Bottom row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>
            © 2026 HoneySpice Cuisine Ltd. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { label: 'Contact', to: '/contact' },
              { label: 'Book Catering', to: '/reservation' },
              { label: 'Find Us', to: '/location' },
            ].map(({ label, to }) => (
              <Box
                key={label}
                component={RouterLink}
                to={to}
                sx={{
                  color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'rgba(255,255,255,0.75)' },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
