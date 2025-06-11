import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const foodImages = [
  { image: '/images/Amala.png', title: 'Amala with Ewedu' },
  { image: '/images/boli.png', title: 'Boli with Fish' },
  { image: '/images/efo riro.png', title: 'Efo Riro with Pounded Yam' },
  { image: '/images/Egusi.png', title: 'Egusi Soup with Fufu' },
  { image: '/images/jollof_rice.png', title: 'Jollof Rice with Chicken' },
  { image: '/images/Ofada.png', title: 'Ofada Sauce Ayamase Stew' },
];

const Gallery = () => {
  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      pt: { xs: 6, sm: 8, md: 10 },
      pb: { xs: 3, sm: 4, md: 6 },
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
          Food Gallery
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            mb: { xs: 3, sm: 4, md: 6 }, 
            maxWidth: 754, 
            mx: 'auto',
            px: { xs: 2, sm: 0 },
            fontSize: {
              xs: '0.875rem',
              sm: '1rem',
              md: '1.125rem'
            }
          }}
        >
          Explore our delicious Nigerian dishes. Click on any image to view it in detail (feature coming soon).
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {foodImages.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    height: { xs: 180, sm: 220, md: 260 },
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ 
                  flexGrow: 1, 
                  textAlign: 'center',
                  p: { xs: 1.5, sm: 2 }
                }}>
                  <Typography 
                    variant="h6" 
                    component="h3"
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        sm: '1.125rem',
                        md: '1.25rem'
                      },
                      fontWeight: 600
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Gallery; 