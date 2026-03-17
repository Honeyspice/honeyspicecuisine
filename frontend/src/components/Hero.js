import React from 'react';
import { Box, Container, Typography, Grid, Chip, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Button from './Button';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import foodImg from '../assets/background/background.png';

const Hero = () => {
  return (
    <Box
      sx={(theme) => ({
        py: { xs: 6, sm: 7.5, md: 10 },
        mt: { xs: 0, sm: 2 },
        minHeight: { xs: 'auto', md: 'calc(100vh - 120px)' },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        borderRadius: 0,
        boxShadow: 'none',
        border: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(700px 320px at 10% 0%, rgba(244, 106, 6, 0.16) 0%, rgba(0,0,0,0) 60%),
            radial-gradient(600px 280px at 90% 10%, rgba(252, 169, 0, 0.14) 0%, rgba(0,0,0,0) 55%)`,
          pointerEvents: 'none',
        },
      })}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              gutterBottom
              sx={{
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              }}
            >
              Authentic Nigerian food in the UK
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                mb: { xs: 2, md: 3 },
                fontSize: {
                  xs: '1rem',
                  sm: '1.125rem',
                  md: '1.25rem'
                }
              }}
            >
              Bold flavours, authentic recipes — ready for delivery and catering across the UK.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ mb: { xs: 2.5, md: 3 } }}
            >
              <Chip icon={<LocalShippingOutlinedIcon />} label="Free delivery over £30" variant="outlined" />
              <Chip icon={<CreditCardOutlinedIcon />} label="Secure card checkout" variant="outlined" />
              <Chip icon={<StarRoundedIcon />} label="Loved by customers" variant="outlined" />
            </Stack>

            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button 
                arrow 
                component={RouterLink} 
                to="/order"
                fullWidth={false}
              >
                Order Now
              </Button>
              <Button 
                variant="outlined" 
                arrow 
                component={RouterLink} 
                to="/menu"
                fullWidth={false}
              >
                View Menu
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={(theme) => ({
                width: '100%',
                maxWidth: 680,
                minHeight: { xs: 260, sm: 340, md: 460 },
                ml: { md: 'auto' },
                borderRadius: 0,
                border: 'none',
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden',
              })}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  filter: 'contrast(1.04) saturate(1.05) brightness(0.92)',
                }}
              >
                <Box
                  component="img"
                  src="/images/efo_riro.png"
                  alt=""
                  aria-hidden="true"
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    transform: 'none',
                    transition: 'none',
                    willChange: 'auto',
                  }}
                  onError={(e) => {
                    // Fallback to bundled background image if a public image is missing.
                    // eslint-disable-next-line no-param-reassign
                    e.currentTarget.src = foodImg;
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(16,24,40,0.08) 0%, rgba(16,24,40,0.55) 75%, rgba(16,24,40,0.70) 100%)',
                }}
              />
              {/* Removed overlay text block to keep hero cleaner */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 