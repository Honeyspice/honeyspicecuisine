import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';
import {
  Restaurant as UtensilsIcon,
  Favorite as HeartIcon,
  People as UsersIcon,
  Public as GlobeIcon,
  LocalDining as ChefHatIcon,
  Inventory as PackageIcon,
} from '@mui/icons-material';

const About = () => {
  const sections = [
    {
      title: 'Our Story',
      icon: <UtensilsIcon sx={{ color: 'primary.main' }} />,
      content: 'Founded in 2018, HoneySpice Cuisine began with a vision to bring the rich and diverse flavors of Nigerian cuisine to the UK. What started as a passion project has grown into a beloved culinary service, bringing authentic Nigerian dishes to homes and events across the region.'
    },
    {
      title: 'Our Mission',
      icon: <GlobeIcon sx={{ color: 'primary.main' }} />,
      content: 'Our mission is to bridge cultures through food, introducing the UK to the authentic tastes of Nigeria. We\'re dedicated to making Nigerian cuisine accessible while maintaining its traditional essence, whether through our catering services, food delivery, or special events.'
    },
    {
      title: 'Authentic Nigerian Cuisine',
      icon: <ChefHatIcon sx={{ color: 'primary.main' }} />,
      content: 'We take pride in preparing traditional Nigerian dishes with authentic recipes passed down through generations. From our famous Jollof Rice to our rich Egusi Soup, every dish is crafted with care and attention to detail, bringing the true taste of Nigeria to your table.'
    },
    {
      title: 'Our Services',
      icon: <PackageIcon sx={{ color: 'primary.main' }} />,
      content: 'We offer a range of services to bring Nigerian cuisine to your doorstep:\n• Catering for events and special occasions\n• Food delivery services\n• Custom menu planning\n• Corporate catering\n• Private chef services'
    },
    {
      title: 'Our Commitment',
      icon: <HeartIcon sx={{ color: 'primary.main' }} />,
      content: 'We\'re committed to delivering not just food, but an experience that celebrates Nigerian culture and culinary heritage. Every dish we prepare is made with fresh, quality ingredients and served with the warmth and hospitality that Nigerian culture is known for.'
    },
    {
      title: 'Join Our Journey',
      icon: <UsersIcon sx={{ color: 'primary.main' }} />,
      content: 'Whether you\'re familiar with Nigerian cuisine or trying it for the first time, we invite you to join us on this culinary journey. Experience the rich flavors, vibrant spices, and warm hospitality that make Nigerian food truly special.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', position: 'relative' }}>
      {/* Header Section with Gradient Mesh */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '28vh', md: '36vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 8,
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
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 2
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontSize: { xs: '2.2rem', md: '3.2rem' },
              fontWeight: 'bold',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.1
            }}
          >
            About HoneySpice Cuisine
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        <Grid container spacing={4}>
          {sections.map((section, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(5px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 35px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {section.icon}
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        {section.title}
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ whiteSpace: 'pre-line' }}
                  >
                    {section.content}
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

export default About; 