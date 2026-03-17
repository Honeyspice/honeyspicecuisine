import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import Seo from '../components/Seo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { addItem } = useCart();
  const [lastAdded, setLastAdded] = React.useState(null);

  const handleAdd = React.useCallback(
    (categoryTitle, item) => {
      const id = `${categoryTitle}:${item.name}`;
      addItem({ id, name: item.name, price: item.price });
      setLastAdded(id);
      window.setTimeout(() => setLastAdded((cur) => (cur === id ? null : cur)), 1000);
    },
    [addItem]
  );
  const menuCategories = [
    {
      title: 'Rice Dishes',
      items: [
        { name: 'Ofada Sauce Ayamase Stew', description: 'Jumbo Ofada Rice with Assorted meat, Egg, Ponmo and Panla fish', price: 15.99 },
        { name: 'Jollof Rice', description: 'Traditional Nigerian Jollof Rice with choice of protein', price: 12.99 },
        { name: 'Coconut Rice', description: 'Fragrant rice cooked in coconut milk with vegetables', price: 12.99 },
        { name: 'Fried Rice', description: 'Nigerian-style fried rice with mixed vegetables and protein', price: 12.99 }
      ]
    },
    {
      title: 'Soups & Swallows',
      items: [
        { name: 'Egusi Soup', description: 'Melon seed soup with assorted meat and fish', price: 15.99 },
        { name: 'Efo Riro', description: 'Vegetable soup with assorted meat and fish', price: 15.99 },
        { name: 'Ogbono Soup', description: 'Wild mango seed soup with assorted meat and fish', price: 15.99 },
        { name: 'Banga Soup', description: 'Palm nut soup with assorted meat and fish', price: 15.99 }
      ]
    },
    {
      title: 'Swallows',
      items: [
        { name: 'Pounded Yam', description: 'Smooth pounded yam with choice of soup', price: 9.99 },
        { name: 'Amala', description: 'Yam flour swallow with choice of soup', price: 9.99 },
        { name: 'Eba', description: 'Garri (cassava flour) swallow with choice of soup', price: 9.99 },
        { name: 'Fufu', description: 'Cassava and plantain fufu with choice of soup', price: 9.99 }
      ]
    },
    {
      title: 'Special Dishes',
      items: [
        { name: 'Ewa Agoyin', description: 'Mashed beans with special pepper sauce', price: 12.99 },
        { name: 'Boli (Roasted Plantain)', description: 'Grilled plantain with spicy sauce', price: 9.99 },
        { name: 'Suya', description: 'Spicy grilled meat skewers with peanut sauce', price: 15.99 },
        { name: 'Pepper Soup', description: 'Spicy meat or fish soup with traditional herbs', price: 15.99 }
      ]
    },
    {
      title: 'Sides & Extras',
      items: [
        { name: 'Dodo (Fried Plantain)', description: 'Crispy fried plantain', price: 6.99 },
        { name: 'Moi Moi', description: 'Steamed bean pudding', price: 6.99 },
        { name: 'Akara', description: 'Fried bean cakes', price: 6.99 },
        { name: 'Coleslaw', description: 'Fresh cabbage and carrot salad', price: 6.99 }
      ]
    },
    {
      title: 'Drinks',
      items: [
        { name: 'Zobo', description: 'Hibiscus drink with ginger and pineapple', price: 6.99 },
        { name: 'Chapman', description: 'Nigerian cocktail with fruit juice and sprite', price: 9.99 },
        { name: 'Kunu', description: 'Traditional millet drink with spices', price: 6.99 },
        { name: 'Soft Drinks', description: 'Coca-Cola, Fanta, Sprite', price: 3.99 }
      ]
    }
  ];

  return (
    <>
      <Seo
        title="Menu | HoneySpice Cuisine Stirling"
        description="Browse the HoneySpice Cuisine menu: Nigerian Jollof Rice, Efo Riro, Ofada, soups, swallows and more served in Stirling, UK."
      />
      <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: 'background.paper',
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 0 }
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            color: 'primary.main',
            mb: { xs: 3, sm: 4, md: 6 },
            fontWeight: 'bold',
            fontSize: {
              xs: '1.75rem',
              sm: '2.25rem',
              md: '2.5rem'
            }
          }}
        >
          Our Menu
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {menuCategories.map((category) => (
            <Grid item xs={12} md={6} lg={4} key={category.title}>
              <Paper 
                elevation={0}
                sx={(theme) => ({ 
                  p: { xs: 2, sm: 3 },
                  height: '100%',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: { xs: 3, sm: 4 },
                  backgroundColor: 'background.paper',
                  boxShadow: '0 14px 40px rgba(16, 24, 40, 0.06)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 18px 55px rgba(16, 24, 40, 0.08)',
                  }
                })}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    color: 'primary.main',
                    mb: { xs: 2, sm: 3 },
                    fontWeight: 600,
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem',
                      md: '1.75rem'
                    }
                  }}
                >
                  {category.title}
                </Typography>
                <List>
                  {category.items.map((item, index) => (
                    <React.Fragment key={item.name}>
                      <ListItem
                        sx={{ px: 0, py: 1.25 }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                          }}
                        >
                          <ListItemText
                            sx={{ m: 0, flexGrow: 1, minWidth: 0 }}
                            primary={
                              <Box>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    fontSize: {
                                      xs: '0.875rem',
                                      sm: '0.9375rem',
                                      md: '1rem',
                                    },
                                    lineHeight: 1.45,
                                  }}
                                >
                                  {item.description}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                  <Chip
                                    size="small"
                                    label={`£${item.price.toFixed(2)}`}
                                    sx={(theme) => ({
                                      fontWeight: 800,
                                      letterSpacing: '0.01em',
                                      backgroundColor: 'rgba(244, 106, 6, 0.10)',
                                      color: theme.palette.primary.dark,
                                      border: `1px solid rgba(244, 106, 6, 0.22)`,
                                    })}
                                  />
                                </Box>
                              </Box>
                            }
                          />

                          {(() => {
                            const itemId = `${category.title}:${item.name}`;
                            const isAdded = lastAdded === itemId;
                            return (
                              <Button
                                variant={isAdded ? 'contained' : 'outlined'}
                                size="small"
                                onClick={() => handleAdd(category.title, item)}
                                disabled={isAdded}
                                color={isAdded ? 'success' : 'primary'}
                                sx={{
                                  flexShrink: 0,
                                  minWidth: 108,
                                  height: 36,
                                  mt: 0.25,
                                  borderRadius: 999,
                                  fontWeight: 800,
                                  letterSpacing: '0.01em',
                                  textTransform: 'none',
                                  transform: isAdded ? 'scale(1.03)' : 'scale(1)',
                                  transition:
                                    'transform 180ms ease, background-color 180ms ease, color 180ms ease, border-color 180ms ease',
                                  backgroundColor: isAdded ? 'success.main' : undefined,
                                  boxShadow: isAdded ? '0 10px 30px rgba(9, 162, 16, 0.32)' : 'none',
                                  '&:hover': {
                                    backgroundColor: isAdded ? 'success.dark' : 'rgba(244, 106, 6, 0.06)',
                                    boxShadow: isAdded ? '0 12px 36px rgba(9, 162, 16, 0.36)' : 'none',
                                    transform: isAdded ? 'scale(1.03)' : 'scale(1.02)',
                                  },
                                }}
                                startIcon={
                                  isAdded ? (
                                    <CheckCircleIcon fontSize="small" />
                                  ) : (
                                    <AddShoppingCartIcon fontSize="small" />
                                  )
                                }
                              >
                                {isAdded ? 'Added' : 'Add'}
                              </Button>
                            );
                          })()}
                        </Box>
                      </ListItem>
                      {index < category.items.length - 1 && (
                        <Divider sx={{ my: { xs: 1, sm: 1.25 } }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ 
          mt: { xs: 3, sm: 4 }, 
          p: { xs: 2, sm: 3 }, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          boxShadow: 1 
        }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontSize: {
                xs: '1.1rem',
                sm: '1.25rem',
                md: '1.5rem'
              }
            }}
          >
            Allergen Information
          </Typography>
          <Typography 
            variant="body1" 
            paragraph
            sx={{
              fontSize: {
                xs: '0.875rem',
                sm: '0.9375rem',
                md: '1rem'
              }
            }}
          >
            Please inform our staff of any allergies or dietary requirements before ordering.
            Our menu items may contain allergens including nuts, dairy, gluten, and shellfish.
          </Typography>
        </Box>
      </Container>
    </Box>
    </>
  );
};

export default Menu; 