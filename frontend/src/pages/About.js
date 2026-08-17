import React from 'react';
import Seo from '../components/Seo';
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
      <Seo title="About Us | HoneySpice Cuisine" description="Learn the story behind HoneySpice Cuisine, authentic Nigerian food brought to Stirling, Scotland, with love and tradition." />
      {/* Header Section with Photo Background */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '32vh', md: '42vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 8,
          overflow: 'hidden',
          backgroundImage: 'url(/images/jollof_rice.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(244,106,6,0.45) 0%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.52)',
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
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.82)', mt: 1.5, fontSize: { xs: '0.95rem', md: '1.1rem' }, textAlign: 'center' }}
          >
            Bringing authentic Nigerian flavours to the UK since 2018.
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* First card spans full width, most important section */}
        <Grid container spacing={4}>
          <Grid item xs={12} key={0}>
            <Card
              sx={{
                borderRadius: '12px',
                boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                backgroundColor: 'rgba(244, 106, 6, 0.04)',
                border: '1px solid rgba(244, 106, 6, 0.12)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' },
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {sections[0].icon}
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      {sections[0].title}
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {sections[0].content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Remaining sections in 2-column grid */}
          {sections.slice(1).map((section, index) => (
            <Grid item xs={12} md={6} key={index + 1}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' },
                }}
              >
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {section.icon}
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                        {section.title}
                      </Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', lineHeight: 1.75 }}>
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