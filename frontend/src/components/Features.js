import { Box, Container, Typography, Grid } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';

const features = [
  {
    icon: <RestaurantIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
    title: 'Authentic Taste',
    description: 'Experience the true flavors of Nigeria with our traditional recipes and cooking methods.'
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery service to bring the taste of Nigeria to your doorstep.'
  },
  {
    icon: <StarIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
    title: 'Quality Ingredients',
    description: 'We use only the freshest and highest quality ingredients in all our dishes.'
  }
];

const Features = () => {
  return (
    <Box
      sx={(theme) => ({
        py: { xs: 6, sm: 8, md: 10 },
        bgcolor: 'background.paper',
        borderRadius: { xs: 3, sm: 4 },
        boxShadow: '0 18px 60px rgba(16, 24, 40, 0.08)',
        border: `1px solid ${theme.palette.divider}`,
        my: { xs: 3, sm: 4, md: 6 },
      })}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{
            fontSize: {
              xs: '2rem',
              sm: '2.5rem',
              md: '3rem'
            },
            mb: { xs: 2, sm: 3 }
          }}
        >
          Why HoneySpice
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: { xs: 4, sm: 6 }, 
            maxWidth: 754, 
            mx: 'auto',
            px: { xs: 2, sm: 0 },
            fontSize: {
              xs: '1rem',
              sm: '1.125rem',
              md: '1.25rem'
            }
          }}
        >
          A modern ordering experience, with the flavours and care you’d expect from home cooking.
        </Typography>
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Box sx={{ 
                textAlign: 'center', 
                p: { xs: 2, sm: 3 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box sx={{ 
                  color: 'primary.main', 
                  mb: { xs: 1.5, sm: 2 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.375rem',
                      md: '1.5rem'
                    },
                    mb: { xs: 1, sm: 1.5 }
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: '0.9375rem',
                      sm: '1rem',
                      md: '1.125rem'
                    }
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features; 