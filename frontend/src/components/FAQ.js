import { Box, Container, Typography, Collapse } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Answers describe what the business actually does today. Three of these had
// drifted from the site: the founding year was wrong, two answers advertised the
// meal-planning feature that was removed, and the dish list named items that are
// no longer on the menu. This block renders on the homepage, so a stale answer
// here is the first thing a search engine and a customer read.
const faqs = [
  {
    question: 'What makes HoneySpice Cuisine unique?',
    answer: 'HoneySpice Cuisine started in Ibadan, Nigeria, in 2019 and came to Scotland with our founder, Lois Smart, a certified chef. We cook Nigerian food in Stirling for collection and local delivery, and we cater for events across the UK.',
  },
  {
    question: 'What services does HoneySpice offer?',
    answer: 'Collection and local delivery in Stirling, and catering for weddings, birthdays, parties and corporate events across the UK. For catering we build the menu with you around your guest numbers and your budget.',
  },
  {
    question: 'What types of dishes do you serve?',
    answer: 'Wraps, including chicken and beef shawarma. Rice meals: Jollof, Ofada with ayamase stew, coconut rice and fried rice. Soups served with any swallow of your choice: Egusi, Efo Riro, Ogbono, Banga and pepper soup. Sides such as beef suya, grilled chicken, boli, coleslaw and akara.',
  },
  {
    question: 'How can I place an order?',
    answer: 'Order online through our website, message us on WhatsApp, or call us. We offer collection and local delivery. For large events or catering, please contact us at least 48 hours in advance.',
  },
  {
    question: 'Do you cater for weddings and events?',
    answer: 'Yes: weddings, corporate events, birthday parties, cultural celebrations and private gatherings. We plan the menu with you, and the food stays Nigerian.',
  },
  {
    question: 'Do you offer vegetarian options?',
    answer: 'Some of our sides are vegetarian, including akara, boli and coleslaw. Our soups and rice meals are cooked with meat and fish as standard. Tell us what you need when you order or enquire about catering and we will tell you what we can do.',
  },
  {
    question: 'How far in advance should I book catering?',
    answer: 'Two to three weeks for large events (50 guests or more), one week for medium events (20 to 50 guests), and 48 hours for small gatherings. We can sometimes take last-minute bookings. Get in touch to discuss.',
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
