import { Box, Container, Typography, Grid, Card, CardContent, IconButton, Collapse, Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleExpandClick = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const faqs = [
    {
      question: 'What makes HoneySpice Cuisine unique?',
      answer: 'Founded in 2018, HoneySpice Cuisine brings authentic Nigerian flavors to the UK. We take pride in preparing traditional Nigerian dishes with recipes passed down through generations, using fresh ingredients and maintaining the true essence of Nigerian culinary heritage. Our commitment to quality and authenticity sets us apart.'
    },
    {
      question: 'What services does HoneySpice offer?',
      answer: 'We offer a comprehensive range of services including:\n• Catering for events and special occasions\n• Food delivery services across the UK\n• Custom menu planning for corporate events\n• Private chef services for intimate gatherings\n• Weekly meal plans for individuals and families\nEach service is designed to bring the authentic taste of Nigeria to your doorstep.'
    },
    {
      question: 'What types of dishes do you serve?',
      answer: 'We specialize in authentic Nigerian cuisine, featuring:\n• Traditional soups (Egusi, Efo Riro, Ogbono)\n• Rice dishes (Jollof Rice, Fried Rice, Coconut Rice)\n• Protein options (Suya, Grilled Fish, Peppered Chicken)\n• Side dishes (Moi Moi, Plantain, Yam)\n• Desserts and beverages\nEvery dish is crafted with care and attention to detail.'
    },
    {
      question: 'How can I place an order?',
      answer: 'You can place an order through multiple channels:\n• Our website for online orders\n• Phone orders for immediate delivery\n• WhatsApp for custom orders\n• In-person at our location\nWe offer both delivery and pickup options. For larger events or corporate catering, we recommend contacting us at least 48 hours in advance.'
    },
    {
      question: 'Do you offer catering for special events?',
      answer: 'Yes, we provide comprehensive catering services for all types of events:\n• Weddings and celebrations\n• Corporate events and meetings\n• Birthday parties\n• Cultural events\n• Private gatherings\nOur team works closely with you to create a custom menu that reflects your preferences while maintaining authentic Nigerian flavors.'
    },
    {
      question: 'What areas do you deliver to?',
      answer: 'We currently offer food delivery services to Leigh and its surrounding areas. For catering services, we are available across the UK for your events and special occasions. Please contact us to confirm delivery availability in your specific location.'
    },
    {
      question: 'Do you offer vegetarian or vegan options?',
      answer: 'Yes, we offer a variety of vegetarian and vegan options:\n• Vegetable soups and stews\n• Plant-based protein alternatives\n• Vegan-friendly rice dishes\n• Fresh salads and sides\nPlease specify any dietary requirements when placing your order.'
    },
    {
      question: 'How far in advance should I book for catering?',
      answer: 'We recommend booking our catering services:\n• 2-3 weeks in advance for large events (50+ guests)\n• 1 week in advance for medium events (20-50 guests)\n• 48 hours for small gatherings\nHowever, we can accommodate last-minute requests based on availability. Contact us to discuss your specific needs.'
    }
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 4);

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
          Frequently Asked Questions
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
          Find answers to common questions about our services, menu, and ordering process.
        </Typography>
        <Grid container spacing={2}>
          {visibleFaqs.map((faq, index) => (
            <Grid item xs={12} key={index}>
              <Card 
                sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 2,
                      cursor: 'pointer'
                    }}
                    onClick={() => handleExpandClick(index)}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: {
                          xs: '1rem',
                          sm: '1.125rem',
                          md: '1.25rem'
                        }
                      }}
                    >
                      {faq.question}
                    </Typography>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(244, 106, 6, 0.1)'
                        }
                      }}
                    >
                      {expandedId === index ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedId === index}>
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ 
                          whiteSpace: 'pre-line',
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem',
                            md: '1.125rem'
                          }
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {!showAll && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 3
          }}>
            <Button
              variant="contained"
              onClick={() => setShowAll(true)}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                backgroundColor: '#F46A06',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#FF8B3D'
                }
              }}
            >
              Show More FAQs
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FAQ; 