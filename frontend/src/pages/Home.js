import React from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const virtualBrands = [
    {
      name: 'HoneySpice Nigerian Kitchen',
      focus: 'Jollof, soups, and swallows',
      image: '/images/Egusi.png',
      imageAlt: 'Egusi soup from HoneySpice Nigerian Kitchen',
    },
    {
      name: 'Spice Grill House',
      focus: 'Suya and grilled chicken favorites',
      image: '/images/grilled_suya.jpg',
      imageAlt: 'Grilled suya from Spice Grill House',
    },
    {
      name: 'Late Night Bites',
      focus: 'Shawarma, fries, and quick combos',
      image: '/images/barbecue.jpg',
      imageAlt: 'Barbecue platter for Late Night Bites',
    },
  ];

  return (
    <>
      <Seo
        title="HoneySpice Cuisine | Nigerian Food in Stirling"
        description="Authentic Nigerian food in Stirling, UK. Order Jollof Rice, Efo Riro, Ofada and more for collection or delivery from HoneySpice Cuisine."
      />
      <Box>
        <Hero />
        <Box
          sx={{
            py: { xs: 5, md: 7 },
            px: { xs: 2, sm: 0 },
            bgcolor: 'background.paper',
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
              }}
            >
              One Kitchen, Three Food Concepts
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 1.25,
                maxWidth: 760,
                fontSize: { xs: '0.95rem', sm: '1rem' },
              }}
            >
              HoneySpice serves different cravings from one kitchen. Browse your preferred menu
              and order quickly from your phone.
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 1 }}>
              {virtualBrands.map((brand) => (
                <Grid item xs={12} md={4} key={brand.name}>
                  <Paper
                    elevation={0}
                    sx={(theme) => ({
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5,
                    })}
                  >
                    <Box
                      component="img"
                      src={brand.image}
                      alt={brand.imageAlt}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        height: { xs: 300, sm: 360, md: 390 },
                        borderRadius: 2.5,
                        objectFit: 'cover',
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.15rem' } }}
                      >
                        {brand.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {brand.focus}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Button
              component={RouterLink}
              to="/menu"
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                borderRadius: 999,
                px: 3.5,
                py: 1.25,
                textTransform: 'none',
                fontWeight: 700,
              }}
            >
              Explore All Menus
            </Button>
          </Container>
        </Box>
        <Features />
        <Testimonials />
        <FAQ />
        <Newsletter />
      </Box>
    </>
  );
};

export default Home; 