import { Box, Container, Grid, Typography, Skeleton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Button from './Button';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/efo riro.png';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <Box sx={{ 
      bgcolor: 'background.default',
      pt: { xs: 4, sm: 6, md: 8 },
      pb: { xs: 4, sm: 6, md: 8 },
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              sx={{
                fontSize: {
                  xs: '2.5rem',
                  sm: '3rem',
                  md: '3.5rem'
                },
                fontWeight: 700,
                mb: { xs: 2, sm: 3 },
                color: 'text.primary',
                lineHeight: 1.2
              }}
            >
              Experience Authentic Nigerian Cuisine
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ 
                mb: { xs: 3, sm: 4 },
                fontSize: {
                  xs: '1.125rem',
                  sm: '1.25rem',
                  md: '1.375rem'
                },
                lineHeight: 1.5
              }}
            >
              Delight in the rich flavors and vibrant spices of traditional Nigerian dishes, 
              crafted with love and served with warmth.
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
            {!imageLoaded && (
              <Skeleton 
                variant="rectangular" 
                sx={{
                  width: '100%',
                  maxWidth: 502,
                  height: { xs: 300, sm: 400, md: 500 },
                  borderRadius: { xs: '10px', sm: '20px' }
                }} 
              />
            )}
            <Box
              component="img"
              src="/images/efo riro.png"
              alt="Nigerian Efo Riro"
              onLoad={() => setImageLoaded(true)}
              sx={{
                width: '100%',
                maxWidth: 502,
                height: 'auto',
                borderRadius: { xs: '10px', sm: '20px' },
                boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.1)',
                filter: 'contrast(1.05) brightness(1.02)',
                objectFit: 'cover',
                objectPosition: 'center',
                mt: { xs: 2, md: 0 },
                display: imageLoaded ? 'block' : 'none'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 