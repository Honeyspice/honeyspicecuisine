import React from 'react';
import Seo from '../components/Seo';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { LocalDining as ChefHatIcon } from '@mui/icons-material';

// The story is prose, so it is laid out as prose: one column at a readable
// measure. The previous version put six equal cards in a two-column grid, which
// suits a feature list and fights a narrative, because a card grid invites
// skimming and gives every section the same weight.
//
// Copy is kept as plain strings rather than JSX so it stays editable without
// touching markup. Emphasis uses **double asterisks**, unwrapped by emphasise()
// below: the alternative was inlining <strong> through every sentence, which
// buries the words in tags.
const emphasise = (text) =>
  String(text)
    .split('**')
    .map((part, i) =>
      i % 2 === 1 ? (
        <Box key={i} component="strong" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {part}
        </Box>
      ) : (
        part
      )
    );

const STORY = [
  {
    heading: 'From Ibadan to Stirling',
    paragraphs: [
      'HoneySpice Cuisine started in **Ibadan, Nigeria, in 2019**, when our founder, **Lois Smart**, was still at university.',
      'Lois loved cooking and trying new recipes. Her friends and fellow students often talked about the aroma coming from her food and how good it tasted.',
      'Their comments encouraged her to cook more.',
      'Soon, she was cooking for events on campus. She kept trying new recipes and different ways of preparing familiar dishes. She also asked people to taste her food and tell her what they liked and what she could improve.',
      'She listened, learned and kept cooking.',
      'What started in a university kitchen was becoming something she wanted to take seriously.',
    ],
  },
  {
    heading: 'Learning the Profession',
    paragraphs: [
      'After university and her **National Youth Service Corps (NYSC)** programme, Lois went for professional catering training and became a **certified chef**.',
      'There, she learned professional cooking and catering, building on what she had already learned from years of cooking for friends, students and events.',
      'HoneySpice continued to grow.',
      'The idea behind it was simple: **make good food, cook it well and keep it affordable.**',
    ],
  },
  {
    heading: 'Bringing Nigerian Food to the UK',
    paragraphs: [
      'When Lois moved to the UK, she brought HoneySpice with her.',
      'Living away from Nigeria made her realise how much people miss the food they grew up eating.',
      'You hear it often among Nigerians living abroad. Someone is travelling home and already thinking about what they will eat when they arrive.',
    ],
    // Set apart because it is the one moment the page stops explaining and just
    // names the food. Runs as a list of dishes, not a sentence.
    pullQuote: 'Jollof rice. Egusi and swallow. Amala. Efo Riro.',
    afterQuote: [
      'The kind of food where the smell alone can remind you of home.',
      'Lois wanted people to find that food here too.',
      'Today, HoneySpice Cuisine serves **Nigerian food in Stirling** for collection and local delivery. We also provide **Nigerian catering for weddings, birthdays, parties and events across the UK**.',
      'HoneySpice started in Ibadan and now calls Stirling home.',
      'But the reason for doing it has stayed the same: **good food, made with care, at a fair price.**',
    ],
  },
];

const PRINCIPLES = [
  {
    heading: 'Our Mission',
    paragraphs: [
      'Our mission is simple: **make good Nigerian food, cook it well and keep it affordable.**',
      'We use good ingredients, listen to our customers and keep improving what we cook.',
      'Whether you are ordering dinner or asking us to cater for an event, we want to serve food that you will enjoy and want to order again.',
    ],
  },
  {
    heading: 'Our Vision',
    paragraphs: [
      'We want HoneySpice to become a distinctive Nigerian food brand **where sweetness meets boldness**.',
      'A brand known for Nigerian food that tastes like home, while bringing those flavours to more people and celebrations across the UK.',
    ],
  },
];

const NEXT_STEPS = [
  {
    heading: 'Ordering Food?',
    body: 'Order Nigerian food for collection or local delivery in Stirling.',
    label: 'View Menu',
    to: '/menu',
    filled: true,
  },
  {
    heading: 'Planning an Event?',
    body: 'We cater for weddings, birthdays, parties and other events across the UK.',
    label: 'Make a Reservation',
    to: '/reservation',
    filled: false,
  },
];

const bodyType = {
  color: 'text.secondary',
  fontSize: { xs: '1rem', md: '1.08rem' },
  lineHeight: 1.85,
  mb: 2.5,
};

const About = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', position: 'relative' }}>
    <Seo
      title="About Us | HoneySpice Cuisine"
      description="HoneySpice began in Ibadan in 2019 and now serves Nigerian food in Stirling, with catering across the UK. Founded by certified chef Lois Smart."
    />

    {/* Header, unchanged in treatment. The subtitle previously claimed "since
        2018", which the founder's own account contradicts: HoneySpice started in
        Ibadan in 2019. */}
    <Box
      sx={{
        position: 'relative',
        height: { xs: '32vh', md: '42vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: { xs: 6, md: 8 },
        overflow: 'hidden',
        backgroundImage: 'url(/images/jollof_rice.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(244,106,6,0.45) 0%, rgba(0,0,0,0.1) 100%)',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.52)',
          zIndex: 2,
        },
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
            lineHeight: 1.1,
          }}
        >
          About HoneySpice Cuisine
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.82)',
            mt: 1.5,
            fontSize: { xs: '0.95rem', md: '1.1rem' },
            textAlign: 'center',
          }}
        >
          Nigerian food in Stirling, and catering across the UK, since 2019.
        </Typography>
      </Container>
    </Box>

    {/* Story. Narrow measure: long-form text set across the full container width
        is hard to track back to the start of the next line. */}
    <Container maxWidth="md" sx={{ maxWidth: 760, pb: { xs: 6, md: 9 } }}>
      {STORY.map((section) => (
        <Box key={section.heading} sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.3rem' },
              fontWeight: 600,
              color: 'text.primary',
              mb: 3,
            }}
          >
            {section.heading}
          </Typography>

          {section.paragraphs.map((p, i) => (
            <Typography key={i} sx={bodyType}>
              {emphasise(p)}
            </Typography>
          ))}

          {section.pullQuote && (
            <Box
              sx={{
                borderLeft: '3px solid',
                borderColor: 'primary.main',
                pl: { xs: 2.5, md: 3.5 },
                py: 0.5,
                my: { xs: 4, md: 5 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: { xs: '1.4rem', md: '1.85rem' },
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'text.primary',
                }}
              >
                {section.pullQuote}
              </Typography>
            </Box>
          )}

          {(section.afterQuote || []).map((p, i) => (
            <Typography key={i} sx={bodyType}>
              {emphasise(p)}
            </Typography>
          ))}
        </Box>
      ))}
    </Container>

    {/* Mission and Vision. Short and parallel, so cards genuinely fit here. */}
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {PRINCIPLES.map((item) => (
            <Grid item xs={12} md={6} key={item.heading}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4.5 } }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' }, fontWeight: 600, mb: 2.5 }}
                  >
                    {item.heading}
                  </Typography>
                  {item.paragraphs.map((p, i) => (
                    <Typography key={i} sx={{ ...bodyType, mb: i === item.paragraphs.length - 1 ? 0 : 2.5 }}>
                      {emphasise(p)}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    {/* Founder. Text-led: there is no photograph of Lois in the repository, and
        a stock portrait of someone else would misrepresent the business. */}
    <Container maxWidth="md" sx={{ maxWidth: 760, py: { xs: 6, md: 9 } }}>
      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
          backgroundColor: 'rgba(244, 106, 6, 0.04)',
          border: '1px solid rgba(244, 106, 6, 0.12)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                flexShrink: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(252, 169, 0, 0.16)',
              }}
            >
              <ChefHatIcon sx={{ color: '#FCA900', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontSize: { xs: '1.5rem', md: '1.85rem' }, fontWeight: 600, lineHeight: 1.2 }}
              >
                Lois Smart
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  mt: 0.5,
                }}
              >
                Founder and Chef, HoneySpice Cuisine
              </Typography>
            </Box>
          </Box>

          <Typography sx={bodyType}>Lois started HoneySpice as a university student in Ibadan.</Typography>
          <Typography sx={bodyType}>
            What began with friends enjoying her cooking led to campus events, professional catering training and
            eventually HoneySpice Cuisine in the UK.
          </Typography>
          <Typography sx={bodyType}>
            {emphasise(
              'She still follows the principles she started with: **listen to customers, use good ingredients and keep improving.**'
            )}
          </Typography>
          <Typography sx={bodyType}>From Ibadan to Stirling, a lot has changed.</Typography>
          <Typography sx={{ ...bodyType, mb: 0, color: 'text.primary', fontWeight: 600 }}>
            The food still has to be good.
          </Typography>
        </CardContent>
      </Card>
    </Container>

    {/* The two things a reader might want next. Both destinations already exist
        in the header, so this adds no new functionality, it just puts the choice
        at the point where someone has finished reading. */}
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {NEXT_STEPS.map((step) => (
            <Grid item xs={12} md={6} key={step.heading}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                }}
              >
                <CardContent
                  sx={{ p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                >
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{ fontSize: { xs: '1.4rem', md: '1.7rem' }, fontWeight: 600, mb: 1.5 }}
                  >
                    {step.heading}
                  </Typography>
                  <Typography sx={{ ...bodyType, mb: 3.5 }}>{step.body}</Typography>
                  <Box
                    component={RouterLink}
                    to={step.to}
                    sx={{
                      mt: 'auto',
                      textDecoration: 'none',
                      display: 'inline-block',
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      border: '2px solid #F46A06',
                      background: step.filled ? '#F46A06' : 'transparent',
                      color: step.filled ? '#fff' : '#1a1a1a',
                      transition: 'background 0.25s, border-color 0.25s, color 0.25s',
                      '&:hover': step.filled
                        ? { background: '#D45A00', borderColor: '#D45A00' }
                        : { background: '#F46A06', color: '#fff' },
                    }}
                  >
                    {step.label}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  </Box>
);

export default About;
