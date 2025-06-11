import React from 'react';
import { Container, Typography, Box, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const Menu = () => {
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
                elevation={3}
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                  }
                }}
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
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 500, 
                                  fontSize: { 
                                    xs: '0.95rem', 
                                    sm: '1.1rem', 
                                    md: '1.25rem' 
                                  } 
                                }}
                              >
                                {item.name}
                              </Typography>
                              <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                  fontWeight: 600,
                                  color: 'primary.main',
                                  ml: 2,
                                  fontSize: { 
                                    xs: '0.95rem', 
                                    sm: '1.1rem', 
                                    md: '1.25rem' 
                                  }
                                }}
                              >
                                £{item.price.toFixed(2)}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography 
                              variant="body2" 
                              color="text.secondary" 
                              sx={{ 
                                fontSize: { 
                                  xs: '0.875rem', 
                                  sm: '0.9375rem', 
                                  md: '1rem' 
                                },
                                mt: 0.5
                              }}
                            >
                              {item.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < category.items.length - 1 && (
                        <Divider sx={{ my: { xs: 0.5, sm: 1 } }} />
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
  );
};

export default Menu; 