import { Box, Container, Typography, Grid, Card, CardContent, IconButton, Collapse } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null);

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

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            color: 'text.primary',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.3s ease',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px rgba(244, 106, 6, 0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'primary.main',
                        flex: 1,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        lineHeight: 1.4
                      }}
                    >
                      {faq.question}
                    </Typography>
                    <IconButton 
                      onClick={() => handleExpandClick(index)}
                      sx={{ 
                        color: 'primary.main',
                        p: 0.5,
                        '&:hover': {
                          backgroundColor: 'rgba(244, 106, 6, 0.1)'
                        }
                      }}
                    >
                      {expandedId === index ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </Box>
                  <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 1.5,
                        whiteSpace: 'pre-line',
                        fontSize: '0.95rem',
                        lineHeight: 1.6
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQ; 