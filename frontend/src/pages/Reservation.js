import React, { useState } from 'react';
import Seo from '../components/Seo';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  CircularProgress,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #F46A06 30%, #FF8D3D 90%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 20px rgba(244, 106, 6, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8D3D 30%, #F46A06 90%)',
    boxShadow: '0 6px 25px rgba(244, 106, 6, 0.4)',
  },
}));

const SOWO_PROFILE_URL = 'https://usesowo.com/provider/honeyspice-cuisine-85677b63';

// Named to match the profile so a customer arriving there recognises what they
// clicked. Prices deliberately live on Sowo only.
const SOWO_SERVICES = [
  {
    name: 'Private / Mobile Chef',
    blurb: 'A chef-led experience at home: private dinners, small gatherings and celebrations.',
  },
  {
    name: 'Corporate & Event Catering',
    blurb: 'Corporate functions, conferences, church and community events, birthdays and larger gatherings.',
  },
  {
    name: 'Wedding Catering',
    blurb: 'Planned separately from other events, around guest numbers and presentation.',
  },
];

const Reservation = () => {
  const [reservationType, setReservationType] = useState('bulk');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [eventType, setEventType] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    notes: '',
  });

  const menuItems = [
    { category: 'Rice Dishes', items: [
      'Ofada Sauce Ayamase Stew',
      'Jollof Rice',
      'Coconut Rice',
      'Fried Rice'
    ]},
    { category: 'Soups & Swallows', items: [
      'Egusi Soup',
      'Efo Riro',
      'Ogbono Soup',
      'Banga Soup'
    ]},
    { category: 'Swallows', items: [
      'Pounded Yam',
      'Amala',
      'Eba',
      'Fufu'
    ]},
    { category: 'Special Dishes', items: [
      'Ewa Agoyin',
      'Boli (Roasted Plantain)',
      'Suya',
      'Pepper Soup'
    ]},
    { category: 'Sides & Extras', items: [
      'Dodo (Fried Plantain)',
      'Moi Moi',
      'Akara',
      'Coleslaw'
    ]}
  ];

const eventTypes = [
    'Private Event',
    'Corporate Event',
    'Birthday Celebration',
    'Wedding Ceremony',
    'Child Naming Ceremony',
    'Burial Ceremony',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build WhatsApp message from form data
    const lines = [
      `New ${reservationType === 'bulk' ? 'Bulk Order' : 'Catering Reservation'}`,
      '',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Date: ${formData.date}`,
      `Time: ${formData.time}`,
      `Number of Guests: ${formData.guests}`,
    ];

    if (reservationType === 'catering') {
      lines.push(`Event Type: ${eventType || 'Not specified'}`);
    }

    if (reservationType === 'bulk' && selectedFoods.length > 0) {
      lines.push(
        'Selected Foods:',
        ...selectedFoods.map((item, index) => `${index + 1}. ${item}`)
      );
    }

    if (formData.notes.trim()) {
      lines.push('', `Additional Notes: ${formData.notes.trim()}`);
    }

    const message = encodeURIComponent(lines.join('\n'));

    // Business WhatsApp number (international format without +)
    const whatsappNumber = '447721629566';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    setLoading(true);
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFoodChange = (event) => {
    const value = event.target.value;
    setSelectedFoods(value);
    setOpen(false);
  };

  const handleDelete = (foodToDelete) => {
    setSelectedFoods((prevFoods) => 
      prevFoods.filter((food) => food !== foodToDelete)
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
      <Seo title="Book Catering & Events | HoneySpice Cuisine" description="Book HoneySpice Cuisine for your event, wedding, or corporate catering in Stirling. Authentic Nigerian food for any occasion." />
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '32vh', md: '42vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: { xs: 4, md: 6 },
          overflow: 'hidden',
          backgroundImage: 'url(/images/barbecue.jpg)',
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
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.1,
            }}
          >
            Event Catering & Reservations
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.82)',
              mt: 1.5,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
            }}
          >
            Weddings, corporate events, celebrations. We bring the flavour to your occasion.
          </Typography>
        </Container>
      </Box>

      {/* Booking on Sowo.
          The division of labour is deliberate: HoneySpice owns the food, the
          chef, the menus and the story; Sowo owns the booking, the payment
          protection, the booking record and the verified review. This block is
          the handover point, and it sits above the enquiry form because a
          structured booking asks less trust of a customer than transferring
          money after a WhatsApp conversation, which matters most on the
          high-value jobs.

          The payment line describes what happens rather than calling it escrow.
          Stripe does not position Connect as an escrow service and the word
          carries specific regulatory meaning, so it is not ours to borrow.

          Sowo is the source of truth for pricing. Only the floor price is
          repeated here, so there is one figure to keep in step rather than three
          that can quietly drift out of date. Per-service prices stay one click
          away on the profile. */}
      <Box sx={{ px: { xs: 2, sm: 0 }, pt: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Card
            sx={{
              p: { xs: 2.5, sm: 3.5, md: 4.5 },
              // A 3px brand rule along the top edge, and a real shadow. It was a
              // flat tint with a hairline border, which read as a callout box
              // rather than the panel carrying the booking route.
              borderRadius: '16px',
              bgcolor: 'rgba(244, 106, 6, 0.06)',
              // The shorthand must come first. Declared after borderTopColor it
              // resets it, which left the top rule at the hairline's 0.16 alpha
              // instead of solid brand orange.
              border: '1px solid rgba(244, 106, 6, 0.16)',
              borderTopWidth: 3,
              borderTopStyle: 'solid',
              borderTopColor: 'primary.main',
              boxShadow: '0 10px 40px rgba(244, 106, 6, 0.10)',
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontSize: { xs: '1.5rem', md: '1.95rem' }, fontWeight: 600, mb: 1 }}
            >
              Book HoneySpice on Sowo
            </Typography>
            {/* The protection is the whole reason to click through, and it was
                carried by one grey sentence. The lock is an SVG icon rather than
                decoration: it marks the line as a security statement at a
                glance. */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, maxWidth: 660 }}>
              <LockOutlinedIcon
                aria-hidden="true"
                sx={{ fontSize: 20, color: 'primary.main', mt: '3px', flexShrink: 0 }}
              />
              <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.7 }}>
                Pay through Stripe. Your payment is held until the agreed work is confirmed complete.
              </Typography>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: { xs: 2.5, md: 3.5 } }}>
              {SOWO_SERVICES.map((service) => (
                <Grid item xs={12} md={4} key={service.name}>
                  <Box
                    sx={{
                      height: '100%',
                      // Three unruled text columns read as paragraphs. A rule
                      // above each name separates them into offers.
                      borderTop: '2px solid rgba(244, 106, 6, 0.35)',
                      pt: 1.75,
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '1.02rem', color: 'text.primary', mb: 0.75 }}>
                      {service.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', lineHeight: 1.65 }}>
                      {service.blurb}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                mt: { xs: 3, md: 4 },
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: { xs: 2, sm: 3 },
              }}
            >
              <Box
                component="a"
                href={SOWO_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 48,
                  px: 4,
                  textDecoration: 'none',
                  bgcolor: 'primary.main',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  transition: 'background-color 0.25s ease, border-color 0.25s ease',
                  '&:hover': { bgcolor: '#D45A00', borderColor: '#D45A00' },
                  '&:focus-visible': { outline: '2px solid #1a1a1a', outlineOffset: 3 },
                }}
              >
                Book on Sowo
              </Box>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>
                Three services, from £150. Prices and availability on the profile.
              </Typography>
            </Box>
          </Card>
        </Container>
      </Box>

      <Box sx={{ px: { xs: 2, sm: 0 }, pb: { xs: 3, sm: 4, md: 6 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, fontWeight: 600, mb: 1 }}
        >
          Or send us the details
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.7, mb: { xs: 2.5, md: 3.5 }, maxWidth: 640 }}>
          For something bespoke, or if you would rather talk it through first, tell us about
          your event and we will pick it up on WhatsApp.
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12}>
            <StyledCard>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                  <Grid item xs={12}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: { xs: 1.5, sm: 2 }, 
                        bgcolor: 'rgba(244, 106, 6, 0.05)',
                        borderRadius: '12px'
                      }}
                    >
                      <FormControl component="fieldset" fullWidth>
                        <FormLabel 
                          component="legend" 
                          sx={{ 
                            mb: { xs: 1.5, sm: 2 }, 
                            fontWeight: 600, 
                            textAlign: 'left',
                            fontSize: {
                              xs: '0.875rem',
                              sm: '1rem',
                              md: '1.125rem'
                            }
                          }}
                        >
                          Order Type
                        </FormLabel>
                        <RadioGroup
                          row
                          value={reservationType}
                          onChange={(e) => setReservationType(e.target.value)}
                          sx={{ 
                            justifyContent: 'flex-start', 
                            gap: { xs: 2, sm: 4 },
                            flexWrap: { xs: 'wrap', sm: 'nowrap' }
                          }}
                        >
                          <FormControlLabel 
                            value="bulk" 
                            control={<Radio />} 
                            label="Bulk Food Order"
                            sx={{
                              '& .MuiFormControlLabel-label': {
                                fontWeight: 500,
                                fontSize: {
                                  xs: '0.875rem',
                                  sm: '1rem'
                                }
                              }
                            }}
                          />
                          <FormControlLabel 
                            value="catering" 
                            control={<Radio />} 
                            label="Catering Service"
                            sx={{
                              '& .MuiFormControlLabel-label': {
                                fontWeight: 500,
                                fontSize: {
                                  xs: '0.875rem',
                                  sm: '1rem'
                                }
                              }
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Guests"
                      name="guests"
                      type="number"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }
                      }}
                    />
                  </Grid>

                  {reservationType === 'catering' && (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Event Type</InputLabel>
                        <Select
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          label="Event Type"
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                            },
                            '& .MuiInputLabel-root': {
                              fontSize: {
                                xs: '0.875rem',
                                sm: '1rem'
                              }
                            }
                          }}
                        >
                          {eventTypes.map((type) => (
                            <MenuItem 
                              key={type} 
                              value={type}
                              sx={{
                                fontSize: {
                                  xs: '0.875rem',
                                  sm: '1rem'
                                },
                                '&:hover': {
                                  bgcolor: 'rgba(244, 106, 6, 0.1)'
                                }
                              }}
                            >
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    {reservationType === 'bulk' ? (
                      <>
                        <FormControl fullWidth>
                          <InputLabel id="food-select-label">Select Foods</InputLabel>
                          <Select
                            labelId="food-select-label"
                            multiple
                            value={selectedFoods}
                            onChange={handleFoodChange}
                            onClose={() => setOpen(false)}
                            open={open}
                            onOpen={() => setOpen(true)}
                            label="Select Foods"
                            renderValue={() => (
                              <Typography sx={{ color: 'text.secondary' }}>
                                {selectedFoods.length} items selected
                              </Typography>
                            )}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                              },
                              '& .MuiInputLabel-root': {
                                fontSize: {
                                  xs: '0.875rem',
                                  sm: '1rem'
                                }
                              }
                            }}
                          >
                            {menuItems.map((category) => [
                              <MenuItem
                                key={category.category}
                                disabled
                                sx={{
                                  bgcolor: 'primary.main',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: {
                                    xs: '0.875rem',
                                    sm: '1rem'
                                  }
                                }}
                              >
                                {category.category}
                              </MenuItem>,
                              ...category.items.map((item) => (
                                <MenuItem 
                                  key={item} 
                                  value={item}
                                  sx={{
                                    fontSize: {
                                      xs: '0.875rem',
                                      sm: '1rem'
                                    }
                                  }}
                                >
                                  {item}
                                </MenuItem>
                              ))
                            ])}
                          </Select>
                        </FormControl>
                        
                        {selectedFoods.length > 0 && (
                          <Box 
                            sx={{ 
                              mt: 2,
                              p: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: '12px',
                              bgcolor: 'background.paper'
                            }}
                          >
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                mb: 1,
                                color: 'text.secondary',
                                fontWeight: 600
                              }}
                            >
                              Selected Items:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {selectedFoods.map((value) => (
                                <Box
                                  key={value}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    borderRadius: '16px',
                                    padding: '4px 12px',
                                    fontSize: {
                                      xs: '0.75rem',
                                      sm: '0.875rem'
                                    }
                                  }}
                                >
                                  {value}
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDelete(value)}
                                    sx={{
                                      color: 'white',
                                      padding: '2px',
                                      marginLeft: '4px',
                                      '&:hover': {
                                        color: 'error.light',
                                        bgcolor: 'rgba(255, 255, 255, 0.1)'
                                      }
                                    }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </>
                    ) : null}
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Additional Notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                        },
                        '& .MuiInputLabel-root': {
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <GradientButton
                      type="submit"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{ 
                        position: 'relative'
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress
                            size={24}
                            sx={{
                              color: 'white',
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: '-12px',
                              marginLeft: '-12px',
                            }}
                          />
                          <span style={{ visibility: 'hidden' }}>Submit Reservation</span>
                        </>
                      ) : (
                        'Submit Reservation'
                      )}
                    </GradientButton>
                  </Grid>
                </Grid>
              </form>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
      </Box>
    </Box>
  );
};

export default Reservation; 