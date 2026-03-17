import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProductCard from './ProductCard';
import foodImg from '../assets/background/background.png';

const Products = () => {
  const products = [
    {
      image: foodImg,
      title: 'Amala with Ewedu',
    },
    {
      image: foodImg,
      title: 'Boli with Fish',
    },
    {
      image: foodImg,
      title: 'Efo Riro with Pounded Yam',
    },
    {
      image: foodImg,
      title: 'Egusi Soup with Fufu',
    },
    {
      image: foodImg,
      title: 'Jollof Rice with Chicken',
    },
    {
      image: foodImg,
      title: 'Ofada Sauce Ayamase Stew',
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
          Best sellers
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
          Fan favourites our customers keep coming back for.
        </Typography>
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }} 
          justifyContent="center"
        >
          {products.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <ProductCard image={product.image} title={product.title} />
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
            to="/menu"
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
            View full menu
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Products; 