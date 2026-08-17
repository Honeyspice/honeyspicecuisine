import { Box, Container, Typography, Avatar, IconButton, Fade, Slide } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('left');
  const [isVisible, setIsVisible] = useState(true);

  const testimonials = [
    {
      text: "The best Nigerian food I've had in the UK! The Jollof Rice is absolutely amazing, and the customer service is top-notch.",
      author: "Sarah Johnson",
    },
    {
      text: "Authentic taste that reminds me of home. Their Egusi Soup is just like my mother's recipe. Highly recommended!",
      author: "Babajide Tolulope",
    },
    {
      text: "Great food and excellent service. The portions are generous and the flavors are incredible. Will definitely order again!",
      author: "Enos Smart",
    }
  ];

  const handleNext = useCallback(() => {
    setDirection('left');
    setIsVisible(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsVisible(true);
    }, 500);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection('right');
    setIsVisible(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsVisible(true);
    }, 500);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <Box sx={{
      // Charcoal, not orange. As a full-bleed 672px band this was the largest
      // orange surface on the site and it broke the "orange as signature
      // accent" rule on its own. Charcoal gives one strong editorial break
      // against the cream page, and orange returns in the small details that
      // were already here: the carousel arrows and the avatar initials. The
      // rating stars stay honey gold, which reads better than orange against
      // charcoal.
      bgcolor: 'grey.900',
      py: { xs: 4, sm: 6, md: 8 }
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          sx={{ 
            color: 'white',
            mb: { xs: 3, sm: 4, md: 6 },
            fontSize: {
              xs: '1.75rem',
              sm: '2.25rem',
              md: '2.5rem'
            },
            fontWeight: 700
          }}
        >
          Customer reviews
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: { xs: 2, sm: 3 } }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarRoundedIcon key={i} sx={{ color: 'warning.main' }} />
          ))}
        </Box>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '10px',
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: 1140,
            mx: 'auto',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
            minHeight: { xs: 300, sm: 350, md: 400 }
          }}
        >
          <Fade in={isVisible} timeout={500}>
            <Box>
              <Slide direction={direction} in={isVisible} timeout={500}>
                <Box>
                  <Avatar
                    alt={testimonials[activeIndex].author}
                    sx={{
                      width: { xs: 60, sm: 70, md: 80 },
                      height: { xs: 60, sm: 70, md: 80 },
                      mx: 'auto',
                      mb: { xs: 2, sm: 2.5, md: 3 },
                      bgcolor: 'grey.100',
                      color: 'primary.main',
                      fontWeight: 800,
                      fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {String(testimonials[activeIndex].author || '?')
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0]?.toUpperCase())
                      .join('')}
                  </Avatar>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: { xs: 2, sm: 2.5, md: 3 },
                      maxWidth: 604,
                      mx: 'auto',
                      transition: 'all 0.5s ease',
                      fontSize: {
                        xs: '0.875rem',
                        sm: '1rem',
                        md: '1.125rem'
                      },
                      lineHeight: 1.6
                    }}
                  >
                    "{testimonials[activeIndex].text}"
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: {
                        xs: '0.875rem',
                        sm: '1rem',
                        md: '1.125rem'
                      }
                    }}
                  >
                    {testimonials[activeIndex].author}
                  </Typography>
                </Box>
              </Slide>
            </Box>
          </Fade>
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: 0, 
            right: 0, 
            display: 'flex', 
            justifyContent: 'space-between',
            px: { xs: 1, sm: 2 }
          }}>
            <IconButton 
              onClick={handlePrev}
              sx={{ 
                color: 'primary.main',
                bgcolor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
            </IconButton>
            <IconButton 
              onClick={handleNext}
              sx={{ 
                color: 'primary.main',
                bgcolor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials; 