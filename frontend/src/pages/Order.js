import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';

const Order = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const menuItems = {
    'Rice Dishes': [
      { id: 1, name: 'Ofada Sauce Ayamase Stew', price: 15.99 },
      { id: 2, name: 'Jollof Rice', price: 12.99 },
      { id: 3, name: 'Coconut Rice', price: 12.99 },
      { id: 4, name: 'Fried Rice', price: 12.99 }
    ],
    'Soups & Swallows': [
      { id: 5, name: 'Egusi Soup', price: 15.99 },
      { id: 6, name: 'Efo Riro', price: 15.99 },
      { id: 7, name: 'Ogbono Soup', price: 15.99 },
      { id: 8, name: 'Banga Soup', price: 15.99 }
    ],
    'Swallows': [
      { id: 13, name: 'Pounded Yam', price: 9.99 },
      { id: 14, name: 'Amala', price: 9.99 },
      { id: 15, name: 'Eba', price: 9.99 },
      { id: 16, name: 'Fufu', price: 9.99 }
    ],
    'Special Dishes': [
      { id: 17, name: 'Ewa Agoyin', price: 12.99 },
      { id: 18, name: 'Boli (Roasted Plantain)', price: 9.99 },
      { id: 19, name: 'Suya', price: 15.99 },
      { id: 20, name: 'Pepper Soup', price: 15.99 }
    ],
    'Sides & Extras': [
      { id: 21, name: 'Dodo (Fried Plantain)', price: 6.99 },
      { id: 22, name: 'Moi Moi', price: 6.99 },
      { id: 23, name: 'Akara', price: 6.99 },
      { id: 24, name: 'Coleslaw', price: 6.99 }
    ],
    'Drinks': [
      { id: 9, name: 'Zobo', price: 6.99 },
      { id: 10, name: 'Chapman', price: 9.99 },
      { id: 11, name: 'Kunu', price: 6.99 },
      { id: 12, name: 'Soft Drinks', price: 3.99 }
    ]
  };

  const handleAddItem = (category, item) => {
    if (item) {
      setSelectedItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const totalAmount = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
          {/* Left side - Menu and Order Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              mb: { xs: 2, sm: 3, md: 4 }
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: { xs: 2, sm: 3, md: 4 }, 
                  fontWeight: 'bold',
                  fontSize: {
                    xs: '0.875rem',
                    sm: '1rem',
                    md: '1.125rem'
                  }
                }}
              >
                Browse our menu and place your order for a delightful culinary experience.
              </Typography>
            </Card>

            <Card sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold',
                  fontSize: {
                    xs: '1.25rem',
                    sm: '1.5rem',
                    md: '1.75rem'
                  }
                }}
              >
                Place Your Order
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                  {Object.entries(menuItems).map(([category, items]) => (
                    <Grid item xs={12} key={category}>
                      <FormControl fullWidth>
                        <InputLabel sx={{
                          fontSize: {
                            xs: '0.875rem',
                            sm: '1rem'
                          }
                        }}>
                          {category}
                        </InputLabel>
                        <Select
                          label={category}
                          onChange={(e) => handleAddItem(category, e.target.value)}
                          value=""
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
                          <MenuItem value="">
                            <em>Select an item</em>
                          </MenuItem>
                          {items.map((item) => (
                            <MenuItem 
                              key={item.id} 
                              value={item}
                              sx={{
                                fontSize: {
                                  xs: '0.875rem',
                                  sm: '1rem'
                                }
                              }}
                            >
                              {item.name} - £{item.price.toFixed(2)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ 
                        py: { xs: 1.5, sm: 2 },
                        fontSize: {
                          xs: '0.875rem',
                          sm: '1rem'
                        },
                        fontWeight: 600
                      }}
                      disabled={selectedItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

          {/* Right side - Order Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              p: { xs: 2, sm: 3, md: 4 },
              position: { md: 'sticky' },
              top: { md: 24 }
            }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  fontSize: {
                    xs: '1.1rem',
                    sm: '1.25rem',
                    md: '1.5rem'
                  },
                  fontWeight: 600
                }}
              >
                Order Summary
              </Typography>
              {selectedItems.length > 0 ? (
                <Box>
                  {selectedItems.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                      }}
                    >
                      <Box>
                        <Typography 
                          variant="body2"
                          sx={{
                            fontSize: {
                              xs: '0.875rem',
                              sm: '1rem'
                            }
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{
                            fontSize: {
                              xs: '0.75rem',
                              sm: '0.875rem'
                            }
                          }}
                        >
                          £{item.price.toFixed(2)} x {item.quantity}
                        </Typography>
                      </Box>
                      <span
                        onClick={() => handleRemoveItem(item.id)}
                        style={{
                          cursor: 'pointer',
                          color: '#F46A06',
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}
                      >
                        X
                      </span>
                    </Box>
                  ))}
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: {
                          xs: '1rem',
                          sm: '1.125rem'
                        }
                      }}
                    >
                      Total: £{totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem'
                    }
                  }}
                >
                  No items selected yet
                </Typography>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowMessage(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your order has been placed successfully! We'll contact you shortly.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Order; 