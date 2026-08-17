import { Box, Container, Typography, Grid } from '@mui/material';
import FadeIn from '../components/FadeIn';
import Seo from '../components/Seo';

const foodImages = [
  { image: '/images/Amala.png', title: 'Amala with Ewedu' },
  { image: '/images/boli.png', title: 'Boli with Fish' },
  { image: '/images/efo_riro.png', title: 'Efo Riro with Pounded Yam' },
  { image: '/images/Egusi.png', title: 'Egusi Soup with Fufu' },
  { image: '/images/jollof_rice.png', title: 'Jollof Rice with Chicken' },
  { image: '/images/Ofada.png', title: 'Ofada Sauce Ayamase Stew' },
];

const Gallery = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh' }}>
      <Seo title="Gallery | HoneySpice Cuisine" description="Browse our gallery of authentic Nigerian dishes: Jollof Rice, Egusi, Amala, Efo Riro and more from HoneySpice Cuisine in Stirling." />
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '28vh', md: '36vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: { xs: 4, md: 6 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 0% 0%, rgba(244, 106, 6, 0.7) 0%, transparent 50%),
              radial-gradient(circle at 100% 0%, rgba(255, 139, 61, 0.6) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(244, 106, 6, 0.5) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(255, 139, 61, 0.8) 0%, transparent 50%)
            `,
            filter: 'blur(70px)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 2,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.1,
            }}
          >
            Food Gallery
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.82)', mt: 1.5, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
          >
            Explore some of our favourite Nigerian dishes.
          </Typography>
        </Container>
      </Box>

      {/* Grid */}
      <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 8 }, px: { xs: 2, sm: 0 } }}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
          {foodImages.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FadeIn delay={index * 80}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    cursor: 'pointer',
                    height: { xs: 220, sm: 260, md: 300 },
                    '&:hover .gallery-img': {
                      transform: 'scale(1.07)',
                    },
                    '&:hover .gallery-overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    className="gallery-img"
                    component="img"
                    src={item.image}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = '/images/efo_riro.png'; }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box
                    className="gallery-overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
                      opacity: 0,
                      transition: 'opacity 0.35s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: { xs: 2, md: 2.5 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Gallery;
