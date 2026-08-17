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
  Stack,
} from '@mui/material';
import Seo from '../components/Seo';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MENU_CATEGORIES, BUNDLES } from '../data/menu';
// Menu data lives in src/data/menu.js so search reads the same definition.


const TABS = [
  { id: 'all', label: 'All Items' },
  ...MENU_CATEGORIES.map((c) => ({ id: c.id, label: c.title })),
  { id: 'bundles', label: 'Bundles' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Menu = () => {
  const { addItem } = useCart();
  const [lastAdded, setLastAdded] = React.useState(null);
  // Search results deep link to a category, so /menu?category=soups opens on
  // that tab rather than dropping the reader at the top of everything. An
  // unknown or absent value falls back to "all", so a stale link still works.
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get('category');
  const [activeTab, setActiveTab] = React.useState(
    TABS.some((t) => t.id === requestedTab) ? requestedTab : 'all'
  );

  React.useEffect(() => {
    if (TABS.some((t) => t.id === requestedTab)) setActiveTab(requestedTab);
  }, [requestedTab]);

  const handleAdd = React.useCallback(
    (categoryTitle, item) => {
      const id = `honeyspice:${categoryTitle}:${item.name}`;
      addItem({ id, name: item.name, price: item.price });
      setLastAdded(id);
      window.setTimeout(() => setLastAdded((cur) => (cur === id ? null : cur)), 1000);
    },
    [addItem]
  );

  const handleBundleAdd = React.useCallback(
    (bundle) => {
      const id = `honeyspice:bundles:${bundle.name}`;
      addItem({ id, name: bundle.name, price: bundle.price });
      setLastAdded(id);
      window.setTimeout(() => setLastAdded((cur) => (cur === id ? null : cur)), 1000);
    },
    [addItem]
  );

  const visibleCategories =
    activeTab === 'all'
      ? MENU_CATEGORIES
      : activeTab === 'bundles'
      ? []
      : MENU_CATEGORIES.filter((c) => c.id === activeTab);

  const showBundles = activeTab === 'all' || activeTab === 'bundles';

  return (
    <>
      <Seo
        title="Menu | HoneySpice Cuisine Stirling"
        description="Explore the full HoneySpice Kitchen menu: wraps, rice meals, soups and swallow, sides and curated bundles. Authentic Nigerian food in Stirling, UK."
      />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 0 } }}>
        <Container maxWidth="lg">

          {/* Kitchen header */}
          <Paper
            elevation={0}
            sx={(theme) => ({
              mb: { xs: 3, sm: 4 },
              p: { xs: 2.5, sm: 3 },
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              bgcolor: 'rgba(244, 106, 6, 0.06)',
            })}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: 'primary.main', fontWeight: 800, fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.85rem' } }}
            >
              Honeyspice Kitchen
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Authentic Nigerian cuisine, cooked and served from our Stirling kitchen.
            </Typography>
          </Paper>

          {/* Category tabs */}
          <Paper
            elevation={0}
            sx={(theme) => ({
              mb: { xs: 3, sm: 4 },
              p: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: 'background.paper',
            })}
          >
            <Box sx={{ position: 'relative' }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  overflowX: 'auto',
                  pb: 0.5,
                  // The row overflows on narrow screens, hiding roughly 148px of
                  // it including the Bundles tab. The native scrollbar is absent
                  // on iOS, so it is hidden here and a fade signals the overflow
                  // instead.
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <Chip
                      key={tab.id}
                      label={tab.label}
                      onClick={() => setActiveTab(tab.id)}
                      clickable
                      sx={{
                        flexShrink: 0,
                        // 32px was under the 44px touch minimum the theme already
                        // enforces on icon buttons.
                        height: 40,
                        fontSize: '0.875rem',
                        fontWeight: active ? 700 : 500,
                        // Active keeps brand orange for recognition. Inactive was
                        // MUI's default rgba(0,0,0,0.08) grey, which read as
                        // unstyled rather than deliberately quiet.
                        bgcolor: active ? '#F46A06' : 'transparent',
                        color: active ? '#FFFFFF' : '#1A1A1A',
                        border: `1px solid ${active ? '#F46A06' : 'rgba(26, 26, 26, 0.22)'}`,
                        '&:hover': {
                          bgcolor: active ? '#D45A00' : 'rgba(26, 26, 26, 0.04)',
                        },
                      }}
                    />
                  );
                })}
              </Stack>
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: 40,
                  pointerEvents: 'none',
                  background: 'linear-gradient(to right, rgba(255,255,255,0), #FFFFFF)',
                }}
              />
            </Box>
          </Paper>

          {/* Menu categories */}
          {visibleCategories.length > 0 && (
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: showBundles ? { xs: 5, md: 7 } : 0 }}>
              {visibleCategories.map((category) => (
                <Grid item xs={12} md={6} key={category.id}>
                  <Paper
                    elevation={0}
                    sx={(theme) => ({
                      p: { xs: 2, sm: 3 },
                      height: '100%',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: { xs: 3, sm: 4 },
                      bgcolor: 'background.paper',
                      boxShadow: '0 14px 40px rgba(16, 24, 40, 0.06)',
                    })}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        color: 'primary.main',
                        mb: { xs: 2, sm: 3 },
                        fontWeight: 600,
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.55rem' },
                      }}
                    >
                      {category.title}
                    </Typography>
                    <List disablePadding>
                      {category.items.map((item, index) => {
                        const itemId = `honeyspice:${category.title}:${item.name}`;
                        const isAdded = lastAdded === itemId;
                        return (
                          <React.Fragment key={item.name}>
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
                                {item.image && (
                                  <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                    sx={{
                                      // Mobile was a fixed 100px tall against a
                                      // full-width card, so 277x100, a 2.77:1
                                      // letterbox. Cover-cropping a square photo
                                      // into that shows about a third of the
                                      // dish, and a portrait one about a
                                      // quarter. 3:2 is the usual food-card
                                      // ratio and roughly doubles what is
                                      // visible, and as a ratio rather than a
                                      // fixed height it scales with the card on
                                      // wider phones. Desktop keeps its 80px
                                      // square thumbnail.
                                      width: { xs: '100%', sm: 80 },
                                      height: { xs: 'auto', sm: 80 },
                                      aspectRatio: { xs: '3 / 2', sm: 'auto' },
                                      objectFit: 'cover',
                                      borderRadius: 2,
                                      flexShrink: 0,
                                    }}
                                  />
                                )}
                                <ListItemText
                                  sx={{ m: 0, flexGrow: 1, minWidth: 0 }}
                                  primary={
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                                      {item.name}
                                    </Typography>
                                  }
                                  secondary={
                                    <Box sx={{ mt: 0.5 }}>
                                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' }, lineHeight: 1.45 }}>
                                        {item.description}
                                      </Typography>
                                      {/* Plain type, not a chip. There were 29 orange
                                          outlined price pills on this page, which read
                                          as discount badges and competed with the dish
                                          names for attention. */}
                                      <Typography
                                        component="span"
                                        sx={{
                                          display: 'block',
                                          mt: 1,
                                          color: '#1A1A1A',
                                          fontWeight: 700,
                                          fontSize: { xs: '1rem', sm: '1.05rem' },
                                          letterSpacing: '0.01em',
                                        }}
                                      >
                                        {`£${item.price.toFixed(2)}`}
                                      </Typography>
                                    </Box>
                                  }
                                />
                                <Button
                                  variant={isAdded ? 'contained' : 'outlined'}
                                  size="small"
                                  onClick={() => handleAdd(category.title, item)}
                                  disabled={isAdded}
                                  color={isAdded ? 'success' : undefined}
                                  sx={{
                                    flexShrink: 0,
                                    // Was minWidth 100% on mobile, which made a
                                    // full-width slab the heaviest element in every
                                    // card. Now a normal control, still 44px tall so
                                    // it stays an easy target, and left-aligned rather
                                    // than stretched by the column layout.
                                    alignSelf: { xs: 'flex-start', sm: 'auto' },
                                    minWidth: { xs: 148, sm: 108 },
                                    height: { xs: 44, sm: 36 },
                                    mt: { xs: 1, sm: 0.25 },
                                    borderRadius: 999,
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    transform: isAdded ? 'scale(1.03)' : 'scale(1)',
                                    transition: 'transform 180ms ease, background-color 180ms ease, color 180ms ease',
                                    bgcolor: isAdded ? 'success.main' : undefined,
                                    boxShadow: isAdded ? '0 10px 30px rgba(9, 162, 16, 0.32)' : 'none',
                                    '&:hover': {
                                      bgcolor: isAdded ? 'success.dark' : 'rgba(244, 106, 6, 0.06)',
                                      boxShadow: isAdded ? '0 12px 36px rgba(9, 162, 16, 0.36)' : 'none',
                                      transform: isAdded ? 'scale(1.03)' : 'scale(1.02)',
                                    },
                                  }}
                                  startIcon={isAdded ? <CheckCircleIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />}
                                >
                                  {isAdded ? 'Added' : 'Add'}
                                </Button>
                              </Box>
                            </ListItem>
                            {index < category.items.length - 1 && <Divider sx={{ my: { xs: 1, sm: 1.25 } }} />}
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ── Bundles section ─────────────────────────────────────────── */}
          {showBundles && (
            <Box>
              {activeTab === 'all' && (
                <Box sx={{ mb: { xs: 4, md: 5 } }}>
                  <Divider sx={{ mb: { xs: 4, md: 5 } }} />
                  <Typography
                    variant="overline"
                    sx={{ letterSpacing: '0.2em', color: 'primary.main', fontWeight: 700, fontSize: '0.7rem' }}
                  >
                    Ready-made deals
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 800, mt: 0.5, mb: 1, fontSize: { xs: '1.5rem', sm: '1.85rem', md: '2.25rem' }, letterSpacing: '-0.02em' }}
                  >
                    Bundles
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, maxWidth: 500 }}>
                    Curated Nigerian spreads for every group size: better value, less hassle.
  </Typography>
                </Box>
              )}

              <Grid container spacing={{ xs: 2.5, md: 3 }}>
                {BUNDLES.map((bundle) => {
                  const bundleId = `honeyspice:bundles:${bundle.name}`;
                  const isAdded = lastAdded === bundleId;
                  return (
                    <Grid item xs={12} sm={6} md={4} key={bundle.id}>
                      <Paper
                        elevation={0}
                        sx={(theme) => ({
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: { xs: 3, sm: 4 },
                          overflow: 'hidden',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'box-shadow 0.25s',
                          '&:hover': { boxShadow: '0 12px 36px rgba(0,0,0,0.09)' },
                        })}
                      >
                        {/* Bundle image */}
                        <Box sx={{ width: '100%', height: 180, overflow: 'hidden', position: 'relative' }}>
                          <Box
                            component="img"
                            src={bundle.image}
                            alt={bundle.name}
                            loading="lazy"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              left: 12,
                              bgcolor: 'primary.main',
                              color: '#fff',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              px: 1.25,
                              py: 0.4,
                              borderRadius: 0.5,
                            }}
                          >
                            {bundle.tag}
                          </Box>
                        </Box>

                        {/* Bundle details */}
                        <Box sx={{ p: { xs: 2.5, sm: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: 'text.primary', lineHeight: 1.2 }}>
                              {bundle.name}
                            </Typography>
                            {/* Plain type, matching the item cards. */}
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                color: '#1A1A1A',
                                ml: 1,
                                flexShrink: 0,
                                letterSpacing: '0.01em',
                              }}
                            >
                              {`£${bundle.price}`}
                            </Typography>
                          </Box>

                          <Typography color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.6, mb: 2 }}>
                            {bundle.desc}
                          </Typography>

                          {/* Item list */}
                          <Box component="ul" sx={{ m: 0, pl: 2, mb: 2.5, flexGrow: 1 }}>
                            {bundle.items.map((item) => (
                              <Box
                                component="li"
                                key={item}
                                sx={{ fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.85 }}
                              >
                                {item}
                              </Box>
                            ))}
                          </Box>

                          {/* Add to cart */}
                          <Button
                            variant={isAdded ? 'contained' : 'outlined'}
                            fullWidth
                            onClick={() => handleBundleAdd(bundle)}
                            disabled={isAdded}
                            color={isAdded ? 'success' : 'primary'}
                            sx={{
                              borderRadius: 999,
                              fontWeight: 800,
                              textTransform: 'none',
                              height: 40,
                              transform: isAdded ? 'scale(1.03)' : 'scale(1)',
                              transition: 'transform 180ms ease, background-color 180ms ease',
                              bgcolor: isAdded ? 'success.main' : undefined,
                              boxShadow: isAdded ? '0 10px 30px rgba(9, 162, 16, 0.32)' : 'none',
                              '&:hover': {
                                bgcolor: isAdded ? 'success.dark' : 'rgba(244, 106, 6, 0.06)',
                                transform: 'scale(1.02)',
                              },
                            }}
                            startIcon={isAdded ? <CheckCircleIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />}
                          >
                            {isAdded ? 'Added to Cart' : 'Add to Cart'}
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {/* Allergen notice */}
          <Box sx={{ mt: { xs: 5, sm: 6 }, p: { xs: 2, sm: 3 }, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Allergen Information
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}>
              Please inform our team of any allergies or dietary requirements before ordering.
              Our menu items may contain allergens including nuts, dairy, gluten, and shellfish.
            </Typography>
          </Box>

        </Container>
      </Box>
    </>
  );
};

export default Menu;
