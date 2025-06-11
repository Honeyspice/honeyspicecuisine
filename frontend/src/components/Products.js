import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

const Products = () => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = [
        '/images/Amala.png',
        '/images/boli.png',
        '/images/efo riro.png',
        '/images/Egusi.png',
        '/images/jollof_rice.png',
        '/images/Ofada.png'
      ];

      const imagePromises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesPreloaded(true); // Still set to true to show content even if preload fails
      }
    };

    preloadImages();
  }, []);

  const products = [
    {
      image: '/images/Amala.png',
      title: 'Amala with Ewedu'
    },
    {
      image: '/images/boli.png',
      title: 'Boli with Fish'
    },
    {
      image: '/images/efo riro.png',
      title: 'Efo Riro with Pounded Yam'
    },
    {
      image: '/images/Egusi.png',
      title: 'Egusi Soup with Fufu'
    },
    {
      image: '/images/jollof_rice.png',
      title: 'Jollof Rice with Chicken'
    },
    {
      image: '/images/Ofada.png',
      title: 'Ofada Sauce Ayamase Stew'
    }
  ];

  return (
    <Box sx={{ 
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 0 }
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{
            fontSize: {
              xs: '1.75rem',
              sm: '2.25rem',
              md: '2.5rem'
            },
            fontWeight: 700,
            mb: { xs: 1, sm: 2 }
          }}
        >
          Explore Our Foods
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: { xs: 3, sm: 4, md: 6 }, 
            maxWidth: 754, 
            mx: 'auto',
            fontSize: {
              xs: '0.875rem',
              sm: '1rem',
              md: '1.125rem'
            }
          }}
        >
          Experience the rich flavors of authentic Nigerian cuisine. From traditional dishes to modern interpretations, 
          we bring you the best of Nigerian food culture.
        </Typography>
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }} 
          justifyContent="center"
        >
          {products.map((product, index) => (
            <Grid 
              item 
              key={index} 
              xs={12}
              sm={6} 
              md={4}
              sx={{
                display: {
                  xs: index < 3 ? 'block' : 'none',
                  sm: 'block'
                }
              }}
            >
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: { xs: 3, sm: 4 }
        }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/gallery"
            sx={{ 
              borderRadius: 2, 
              fontWeight: 600, 
              minWidth: { xs: '100%', sm: 200 }, 
              backgroundColor: '#F46A06',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(244, 106, 6, 0.15)',
              '&:hover': {
                backgroundColor: '#FF8B3D',
                boxShadow: '0 6px 20px rgba(244, 106, 6, 0.18)',
              }
            }}
          >
            View Gallery
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Products; 