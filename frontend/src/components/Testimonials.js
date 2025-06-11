import { Box, Container, Typography, IconButton, Fade, Slide, Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('left');
  const [isVisible, setIsVisible] = useState(true);

  const testimonials = [
    {
      text: "The best Nigerian food I've had in the UK! The Jollof Rice is absolutely amazing, and the customer service is top-notch.",
      author: "Sarah Johnson",
      rating: 5
    },
    {
      text: "I've been searching for authentic Nigerian cuisine in the UK, and Honeyspice Cuisine delivers exactly that! Their Amala and Ewedu soup taste just like home. The attention to detail in their preparation is remarkable.",
      author: "Babajide Tolulope",
      rating: 5
    },
    {
      text: "Great food and excellent service. The portions are generous and the flavors are incredible. Will definitely order again!",
      author: "Enos Smart",
      rating: 5
    }
  ];

  const handleNext = useCallback(() => {
    setDirection('left');
    setIsVisible(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setIsVisible(true);
    }, 800);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection('right');
    setIsVisible(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsVisible(true);
    }, 800);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <Box sx={{ 
      bgcolor: 'primary.main', 
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
          Customers Reviews
        </Typography>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: '10px',
            p: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 6, sm: 7, md: 8 },
            maxWidth: 1140,
            mx: 'auto',
            position: 'relative',
            textAlign: 'center',
            overflow: 'hidden',
            minHeight: { xs: 300, sm: 350, md: 400 }
          }}
        >
          <Fade in={isVisible} timeout={800}>
            <Box>
              <Slide direction={direction} in={isVisible} timeout={800}>
                <Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    mb: { xs: 2, sm: 2.5, md: 3 }
                  }}>
                    {[...Array(testimonials[activeIndex].rating)].map((_, index) => (
                      <StarIcon 
                        key={index}
                        sx={{ 
                          color: '#00b67a',
                          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                          mx: 0.5
                        }} 
                      />
                    ))}
                  </Box>
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
          <Box sx={{ 
            position: 'absolute',
            bottom: { xs: 0, sm: 0, md: 0 },
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            pb: { xs: 1, sm: 1.5, md: 2 }
          }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="https://uk.trustpilot.com/review/honeyspicecuisine.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                fontSize: '1.1rem',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'none',
                '&:hover': {
                  transform: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}
            >
              Submit Your Review
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials; 