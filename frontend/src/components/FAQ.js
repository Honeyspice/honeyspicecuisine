import { Box, Container, Typography, Collapse } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const faqs = [
  {
    question: 'What makes HoneySpice Cuisine unique?',
    answer: 'Founded in 2018, HoneySpice Cuisine brings authentic Nigerian flavours to the UK. We prepare traditional dishes with recipes passed down through generations, using fresh ingredients and maintaining the true essence of Nigerian culinary heritage.',
  },
  {
    question: 'What services does HoneySpice offer?',
    answer: 'We offer catering for events and special occasions, food delivery across Stirling and surrounding areas, custom menu planning for corporate events, private chef services, and personalised AI-generated weekly meal plans.',
  },
  {
    question: 'What types of dishes do you serve?',
    answer: 'We specialise in authentic Nigerian cuisine — traditional soups (Egusi, Efo Riro, Ogbono), rice dishes (Jollof, Fried, Coconut), grilled proteins (Suya, Peppered Chicken, Grilled Fish), sides (Moi Moi, Plantain, Yam), and drinks.',
  },
  {
    question: 'How can I place an order?',
    answer: 'Order online through our website, via WhatsApp, or call us directly. We offer both delivery and collection. For large events or corporate catering, please contact us at least 48 hours in advance.',
  },
  {
    question: 'Do you cater for weddings and events?',
    answer: 'Yes — weddings, corporate events, birthday parties, cultural celebrations, and private gatherings. Our team works with you to build a custom menu while keeping the flavours authentically Nigerian.',
  },
  {
    question: 'Do you offer vegetarian or vegan options?',
    answer: 'Yes. We offer vegetable soups and stews, plant-based protein alternatives, vegan-friendly rice dishes, and fresh sides. Just specify your dietary needs when ordering.',
  },
  {
    question: 'How far in advance should I book catering?',
    answer: '2–3 weeks for large events (50+ guests), 1 week for medium events (20–50 guests), and 48 hours for small gatherings. We can sometimes accommodate last-minute bookings — get in touch to discuss.',
  },
  {
    question: 'What is the AI Meal Plan feature?',
    answer: 'Create a free account, fill in your health goals and dietary preferences, and our Claude AI integration generates a personalised 7-day Nigerian food timetable tailored to you.',
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAF6F0' }}>
      <Container maxWidth="md">
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: '0.2em', color: '#999', fontWeight: 600, fontSize: '0.7rem' }}
          >
            Got Questions?
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mt: 0.5,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
            }}
          >
            Frequently Asked
          </Typography>
        </Box>

        {/* Accordion */}
        <Box>
          {faqs.map((faq, i) => {
            const isOpen = openId === i;
            return (
              <Box
                key={i}
                sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', '&:last-of-type': { borderBottom: '1px solid rgba(0,0,0,0.1)' } }}
              >
                <Box
                  onClick={() => setOpenId(isOpen ? null : i)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: { xs: 2.25, md: 2.75 },
                    cursor: 'pointer',
                    gap: 2,
                    userSelect: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      color: isOpen ? '#F46A06' : '#1a1a1a',
                      transition: 'color 0.2s',
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </Typography>
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      border: '1.5px solid',
                      borderColor: isOpen ? '#F46A06' : 'rgba(0,0,0,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? '#F46A06' : '#666',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                  >
                    {isOpen ? <RemoveIcon sx={{ fontSize: 16 }} /> : <AddIcon sx={{ fontSize: 16 }} />}
                  </Box>
                </Box>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <Typography
                    sx={{
                      color: '#555',
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      lineHeight: 1.8,
                      pb: 3,
                      maxWidth: 640,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
