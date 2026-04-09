import React from 'react';
import { Box, Container, Typography, Grid, Button, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import foodImg from '../assets/background/background.png';

const WhyUs = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* First Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box
                component="img"
                src={foodImg}
                alt="Jollof Rice"
                sx={{ width: '100%', height: { xs: 240, md: 340 }, objectFit: 'cover' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              Experience Authentic Nigerian Cuisine
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Indulge in authentic Nigerian cuisine prepared with love and tradition. Our chefs bring the rich flavors of Nigeria to your table, creating an unforgettable dining experience.
            </Typography>
          </Grid>
        </Grid>

        {/* Second Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
              At Honeyspice Cuisine, we believe great food starts with fresh ingredients and clean kitchens.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Every meal is made from scratch using quality produce, carefully selected spices, and proper hygiene. No shortcuts, no compromise.
            </Typography>
            <List>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="We care about what goes into your food and how it's prepared, because your health and satisfaction matter most."
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
              <ListItem sx={{ pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="From the first bite to the last, we want you to feel the warmth, the care, and the flavour in every dish."
                  primaryTypographyProps={{ color: 'text.secondary' }}
                />
              </ListItem>
            </List>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component="a"
              href="/menu"
              sx={{
                borderRadius: 2,
                px: 4,
                mt: 2,
                '&:hover': {
                  backgroundColor: 'primary.light'
                }
              }}
            >
              See Our Menu
            </Button>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box
                component="img"
                src={foodImg}
                alt="Egusi Soup"
                sx={{ width: '100%', height: { xs: 240, md: 340 }, objectFit: 'cover' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyUs; 