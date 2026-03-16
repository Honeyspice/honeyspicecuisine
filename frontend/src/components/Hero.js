import { Box, Container, Typography, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
  return (
    <Box sx={{ 
      py: { xs: 4, sm: 6, md: 8 },
      mt: { xs: 0, sm: 8 },
      position: 'relative',
      bgcolor: 'background.paper',
      borderRadius: { xs: '0 0 10px 10px', sm: '0 0 20px 20px' },
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
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
              Welcome To HoneySpice Cuisine
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                mb: { xs: 3, md: 4 },
                fontSize: {
                  xs: '1rem',
                  sm: '1.125rem',
                  md: '1.25rem'
                }
              }}
            >
              Discover the rich flavors and traditions of Nigerian food. From Jollof Rice to Egusi Soup, 
              we bring you the best of Nigerian culinary heritage.
            </Typography>
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
              component="img"
              src="/images/efo riro.png"
              alt="Nigerian Efo Riro"
              sx={{
                width: '100%',
                maxWidth: 502,
                height: 'auto',
                borderRadius: { xs: '10px', sm: '20px' },
                boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.1)',
                filter: 'contrast(1.05) brightness(1.02)',
                objectFit: 'cover',
                objectPosition: 'center',
                mt: { xs: 2, md: 0 }
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 