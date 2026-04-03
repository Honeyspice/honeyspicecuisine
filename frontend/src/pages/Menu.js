import React from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Stack,
} from '@mui/material';
import Seo from '../components/Seo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const { addItem } = useCart();
  const [lastAdded, setLastAdded] = React.useState(null);
  const [activeBrand, setActiveBrand] = React.useState('all');

  const handleAdd = React.useCallback(
    (brandName, categoryTitle, item) => {
      const id = `${brandName}:${categoryTitle}:${item.name}`;
      addItem({ id, name: item.name, price: item.price });
      setLastAdded(id);
      window.setTimeout(() => setLastAdded((cur) => (cur === id ? null : cur)), 1000);
    },
    [addItem]
  );

  const virtualBrands = [
    {
      id: 'honeyspice-kitchen',
      name: 'HoneySpice Nigerian Kitchen',
      subtitle: 'Classic jollof, soups and swallows.',
      categories: [
        {
          title: 'Rice Dishes',
          items: [
            { name: 'Ofada Sauce Ayamase Stew', description: 'Jumbo Ofada rice with assorted meat, egg, ponmo and panla fish', price: 15.99 },
            { name: 'Jollof Rice', description: 'Traditional Nigerian jollof rice with your choice of protein', price: 12.99 },
            { name: 'Coconut Rice', description: 'Fragrant rice cooked in coconut milk with vegetables', price: 12.99 },
            { name: 'Fried Rice', description: 'Nigerian-style fried rice with mixed vegetables and protein', price: 12.99 },
          ],
        },
        {
          title: 'Soups & Swallows',
          items: [
            { name: 'Egusi Soup', description: 'Melon seed soup with assorted meat and fish', price: 15.99 },
            { name: 'Efo Riro', description: 'Vegetable soup with assorted meat and fish', price: 15.99 },
            { name: 'Ogbono Soup', description: 'Wild mango seed soup with assorted meat and fish', price: 15.99 },
            { name: 'Banga Soup', description: 'Palm nut soup with assorted meat and fish', price: 15.99 },
            { name: 'Pounded Yam', description: 'Smooth pounded yam with choice of soup', price: 9.99 },
            { name: 'Amala', description: 'Yam flour swallow with choice of soup', price: 9.99 },
            { name: 'Eba', description: 'Garri (cassava flour) swallow with choice of soup', price: 9.99 },
            { name: 'Fufu', description: 'Cassava and plantain fufu with choice of soup', price: 9.99 },
          ],
        },
      ],
    },
    {
      id: 'spice-grill-house',
      name: 'Spice Grill House',
      subtitle: 'Suya and grilled specials from the same kitchen.',
      categories: [
        {
          title: 'Grilled Favorites',
          items: [
            { name: 'Beef Suya', description: 'Spicy grilled beef skewers with suya spice and onions', price: 15.99 },
            { name: 'Grilled Chicken', description: 'Flame-grilled chicken with house pepper glaze', price: 14.99 },
            { name: 'Boli (Roasted Plantain)', description: 'Roasted plantain with spicy sauce', price: 9.99 },
            { name: 'Pepper Soup', description: 'Spicy meat or fish soup with traditional herbs', price: 15.99 },
          ],
        },
        {
          title: 'Grill Sides',
          items: [
            { name: 'Dodo (Fried Plantain)', description: 'Crispy fried plantain', price: 6.99 },
            { name: 'Coleslaw', description: 'Fresh cabbage and carrot salad', price: 6.99 },
            { name: 'Soft Drinks', description: 'Coca-Cola, Fanta, Sprite', price: 3.99 },
          ],
        },
      ],
    },
    {
      id: 'late-night-bites',
      name: 'Late Night Bites',
      subtitle: 'Quick shawarma, fries and easy late-night combos.',
      categories: [
        {
          title: 'Late Night Combos',
          items: [
            { name: 'Chicken Shawarma Wrap', description: 'Toasted wrap with chicken, slaw and creamy pepper sauce', price: 10.99 },
            { name: 'Loaded Fries', description: 'Crispy fries topped with suya-spiced chicken and sauce', price: 9.99 },
            { name: 'Shawarma + Fries Combo', description: 'Chicken shawarma wrap paired with a regular fries', price: 13.99 },
            { name: 'Mini Bites Platter', description: 'Akara, moi moi and spicy dip for sharing', price: 11.99 },
          ],
        },
        {
          title: 'Drinks',
          items: [
            { name: 'Zobo', description: 'Hibiscus drink with ginger and pineapple', price: 6.99 },
            { name: 'Chapman', description: 'Nigerian cocktail with fruit juice and sprite', price: 9.99 },
            { name: 'Kunu', description: 'Traditional millet drink with spices', price: 6.99 },
          ],
        },
      ],
    },
  ];

  const normalize = React.useCallback(
    (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    []
  );

  const selectedCategory = normalize(searchParams.get('category'));
  const hasCategoryFilter = Boolean(selectedCategory);

  const categoryMatchesFilter = React.useCallback(
    (title) => {
      const slug = normalize(title);
      switch (selectedCategory) {
        case 'rice':
          return slug.includes('rice');
        case 'soups-swallows':
          return slug.includes('soup') || slug.includes('swallow');
        case 'grills-suya':
          return slug.includes('grill') || slug.includes('suya');
        case 'small-chops':
          return slug.includes('small-chops') || slug.includes('late-night-combos') || slug.includes('bites');
        case 'drinks-sides':
          return slug.includes('drink') || slug.includes('side');
        default:
          return slug === selectedCategory;
      }
    },
    [normalize, selectedCategory]
  );

  const brandsToRender = React.useMemo(() => {
    if (hasCategoryFilter) {
      return virtualBrands
        .map((brand) => ({
          ...brand,
          categories: brand.categories.filter((category) => categoryMatchesFilter(category.title)),
        }))
        .filter((brand) => brand.categories.length > 0);
    }
    return activeBrand === 'all'
      ? virtualBrands
      : virtualBrands.filter((brand) => brand.id === activeBrand);
  }, [activeBrand, categoryMatchesFilter, hasCategoryFilter, virtualBrands]);

  const handleBrandChange = (brandId) => {
    setActiveBrand(brandId);
    if (brandId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.setTimeout(() => {
      const el = document.getElementById(`brand-${brandId}`);
      if (el) {
        // Keep selected brand near top and avoid inconsistent browser scrollIntoView behavior.
        const NAVBAR_OFFSET = 190;
        const targetTop = Math.max(0, window.scrollY + el.getBoundingClientRect().top - NAVBAR_OFFSET);
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <>
      <Seo
        title="Menu | HoneySpice Cuisine Stirling"
        description="Explore HoneySpice virtual brands in one place: Nigerian kitchen classics, grill house favorites and late-night bites in Stirling, UK."
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
        {!hasCategoryFilter ? (
        <Paper
          elevation={0}
          sx={(theme) => ({
            mb: { xs: 2.5, sm: 3 },
            p: { xs: 1.5, sm: 2 },
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper',
          })}
        >
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5 }}>
            <Chip
              label="All Items"
              color={activeBrand === 'all' ? 'primary' : 'default'}
              onClick={() => handleBrandChange('all')}
              clickable
            />
            {virtualBrands.map((brand) => (
              <Chip
                key={brand.id}
                label={brand.name}
                color={activeBrand === brand.id ? 'primary' : 'default'}
                onClick={() => handleBrandChange(brand.id)}
                clickable
              />
            ))}
          </Stack>
        </Paper>
        ) : null}

        {brandsToRender.map((brand) => (
          <Box key={brand.id} id={`brand-${brand.id}`} sx={{ mb: { xs: 4, sm: 5 } }}>
            <Paper
              elevation={0}
              sx={(theme) => ({
                mb: { xs: 2, sm: 3 },
                p: { xs: 2, sm: 2.5 },
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                backgroundColor: 'rgba(244, 106, 6, 0.06)',
              })}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 800,
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                }}
              >
                {brand.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {brand.subtitle}
              </Typography>
            </Paper>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {brand.categories.map((category) => (
                <Grid item xs={12} md={6} key={`${brand.id}-${category.title}`}>
                  <Paper
                    id={`category-${brand.id}-${normalize(category.title)}`}
                    elevation={0}
                    sx={(theme) => ({
                      p: { xs: 2, sm: 3 },
                      height: '100%',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: { xs: 3, sm: 4 },
                      backgroundColor: 'background.paper',
                      boxShadow: '0 14px 40px rgba(16, 24, 40, 0.06)',
                    })}
                  >
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        color: 'primary.main',
                        mb: { xs: 2, sm: 3 },
                        fontWeight: 600,
                        fontSize: {
                          xs: '1.2rem',
                          sm: '1.4rem',
                          md: '1.55rem',
                        },
                      }}
                    >
                      {category.title}
                    </Typography>
                    <List>
                      {category.items.map((item, index) => (
                        <React.Fragment key={`${brand.id}-${category.title}-${item.name}`}>
                          <ListItem sx={{ px: 0, py: 1.25 }}>
                            <Box
                              sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'stretch', sm: 'flex-start' },
                                gap: { xs: 1.5, sm: 2 },
                              }}
                            >
                              <ListItemText
                                sx={{ m: 0, flexGrow: 1, minWidth: 0 }}
                                primary={
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      fontWeight: 700,
                                      fontSize: { xs: '0.95rem', sm: '1.1rem' },
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
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
                                          border: '1px solid rgba(244, 106, 6, 0.22)',
                                        })}
                                      />
                                    </Box>
                                  </Box>
                                }
                              />
                              {(() => {
                                const itemId = `${brand.name}:${category.title}:${item.name}`;
                                const isAdded = lastAdded === itemId;
                                return (
                                  <Button
                                    variant={isAdded ? 'contained' : 'outlined'}
                                    size="small"
                                    onClick={() => handleAdd(brand.name, category.title, item)}
                                    disabled={isAdded}
                                    color={isAdded ? 'success' : 'primary'}
                                    sx={{
                                      flexShrink: 0,
                                      minWidth: { xs: '100%', sm: 108 },
                                      height: 36,
                                      mt: { xs: 1, sm: 0.25 },
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
                                        backgroundColor: isAdded
                                          ? 'success.dark'
                                          : 'rgba(244, 106, 6, 0.06)',
                                        boxShadow: isAdded
                                          ? '0 12px 36px rgba(9, 162, 16, 0.36)'
                                          : 'none',
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
          </Box>
        ))}
        
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