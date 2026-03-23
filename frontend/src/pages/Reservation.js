import React, { useState } from 'react';
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
    ]},
    { category: 'Drinks', items: [
      'Zobo',
      'Chapman',
      'Kunu',
      'Soft Drinks'
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
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.paper',
      pt: { xs: 6, sm: 8, md: 10 },
      pb: { xs: 3, sm: 4, md: 6 },
      px: { xs: 2, sm: 0 }
    }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12}>
            <StyledCard>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  textAlign: 'left',
                  fontSize: {
                    xs: '1.5rem',
                    sm: '1.75rem',
                    md: '2rem'
                  }
                }}
              >
                Make Reservations
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: { xs: 3, sm: 4 },
                  textAlign: 'left',
                  maxWidth: '800px',
                  color: 'text.secondary',
                  fontSize: {
                    xs: '0.875rem',
                    sm: '1rem',
                    md: '1.125rem'
                  }
                }}
              >
                Whether you're planning a corporate event, wedding, or special gathering, 
                we're here to make your food experience special. Place your bulk order or request 
                our catering services today.
              </Typography>
            </StyledCard>
          </Grid>

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
  );
};

export default Reservation; 