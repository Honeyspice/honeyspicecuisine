import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { search } from '../data/searchIndex';
import { MENU_CATEGORIES } from '../data/menu';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { keyframes, styled as muiStyled } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Badge from '@mui/material/Badge';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const cartPulse = keyframes`
  0% { transform: scale(1); }
  35% { transform: scale(1.15); }
  70% { transform: scale(0.98); }
  100% { transform: scale(1); }
`;

const StyledAppBar = muiStyled(AppBar)(({ scrolled }) => ({
  backgroundColor: scrolled ? 'rgba(18, 18, 18, 0.97)' : 'rgba(18, 18, 18, 0.94)',
  // Respect iPhone notch / status bar
  paddingTop: 'env(safe-area-inset-top, 0px)',
  backdropFilter: 'blur(8px)',
  boxShadow: scrolled ? '0 8px 20px rgba(0, 0, 0, 0.25)' : 'none',
  border: 'none',
  borderBottom: 'none',
  borderRadius: 0,
  overflow: 'visible',
  transition: 'all 0.3s ease',
  '&::before': {
    display: 'none',
  },
  '&::after': {
    display: 'none',
  },
}));

const Logo = muiStyled(RouterLink)(() => ({
  color: '#fff',
  textDecoration: 'none',
  fontSize: '22px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '&:hover': {
    color: '#fff',
    '& img': {
      transform: 'scale(1.03)',
    },
  },
}));

const MenuLink = muiStyled(RouterLink)(() => ({
  color: 'rgba(255, 255, 255, 0.9)',
  textDecoration: 'none',
  margin: '0',
  fontSize: '14px',
  fontWeight: 600,
  position: 'relative',
  padding: '14px 22px',
  minWidth: 'auto',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: '#fff',
    transition: 'width 0.28s ease',
  },
  '&:hover': {
    color: '#ffffff',
    '&::after': { width: '100%' },
  },
}));

const MenuButton = muiStyled('button')(() => ({
  color: 'rgba(255, 255, 255, 0.9)',
  background: 'transparent',
  border: 'none',
  margin: '0',
  fontSize: '14px',
  fontWeight: 600,
  position: 'relative',
  padding: '14px 22px',
  minWidth: 'auto',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  cursor: 'pointer',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: '#fff',
    transition: 'width 0.28s ease',
  },
  '&:hover': {
    color: '#ffffff',
    '&::after': { width: '100%' },
  },
}));

// Auth-aware Sign In / Sign Out button
const AuthNavButton = () => {
  const { user, logout } = useAuth();
  if (user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <Button
          onClick={logout}
          disableElevation
          sx={{
            height: 44,
            borderRadius: '10px',
            textTransform: 'none',
            color: 'rgba(255,255,255,0.75)',
            px: 1.5,
            fontSize: '12px',
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.2)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff' },
          }}
        >
          Sign out
        </Button>
      </Box>
    );
  }
  return (
    <Button
      component={RouterLink}
      to="/login"
      disableElevation
      sx={{
        ml: 'auto',
        minWidth: 128,
        height: 52,
        borderRadius: '10px',
        textTransform: 'none',
        color: '#fff',
        px: 2,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
        fontWeight: 700,
      }}
    >
      Sign In
    </Button>
  );
};

const MobileAuthItem = ({ handleDrawerToggle }) => {
  const { user, logout } = useAuth();
  if (user) {
    return (
      <Box sx={{ width: '100%' }}>
        <ListItemButton onClick={() => { logout(); handleDrawerToggle(); }} sx={{ minHeight: 48, py: 1, px: 2 }}>
          <ListItemText primary="Sign Out" primaryTypographyProps={{ fontWeight: 600, color: '#888' }} />
        </ListItemButton>
      </Box>
    );
  }
  return (
    <ListItemButton component={RouterLink} to="/login" onClick={handleDrawerToggle} sx={{ minHeight: 52, py: 1.25, px: 2 }}>
      <ListItemText primary="Account Login / Register" primaryTypographyProps={{ fontWeight: 600 }} />
    </ListItemButton>
  );
};

const PAGE_TITLES = {
  '/menu': 'Our Menu',
  '/order': 'Order',
  '/cart': 'Your Basket',
  '/checkout': 'Checkout',
  '/checkout-success': 'Order Confirmed',
  '/ai-assistant': 'Suggest a Meal',
  '/plan-picnic': 'Plan a Picnic',
  '/reservation': 'Book Catering',
  '/contact': 'Contact Us',
  '/location': 'Find Us',
  '/about': 'About Us',
  '/gallery': 'Our Cuisine',
  '/why-us': 'Why HoneySpice',
  '/register': 'Create Account',
  '/login': 'Sign In',
};

// Mobile Navbar Component
const MobileNavbar = ({ handleDrawerToggle, cartBadgeSx, itemCount, pathname }) => {
  const isHome = pathname === '/';
  const pageTitle = PAGE_TITLES[pathname];

  return (
    <>
      <Toolbar disableGutters sx={{ py: 1.1, position: 'relative' }}>
        {/* Logo always visible, tapping goes home */}
        <Logo component={RouterLink} to="/">
          <Box
            component="img"
            src="/logo.png"
            alt="HoneySpice Logo"
            sx={{
              height: 42,
              width: 'auto',
              display: 'block',
              transition: 'transform 0.3s ease',
              objectFit: 'contain',
              marginTop: '-3px'
            }}
          />
        </Logo>

        {/* Centred page title on sub-pages */}
        {!isHome && pageTitle && (
          <Typography
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.02em',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {pageTitle}
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          component={RouterLink}
          to="/cart"
          aria-label="Open basket"
          sx={{ color: '#fff', mr: 0.5 }}
          size="medium"
        >
          <Badge badgeContent={itemCount} sx={cartBadgeSx}>
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="Open menu"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ mr: 0 }}
          size="medium"
        >
          <MenuIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Toolbar>
    </>
  );
};

// Desktop Navbar Component
const DesktopNavbar = ({ pathname, itemCount, cartBadgeSx, subtotal, cuisineMenuOpen, setCuisineMenuOpen }) => {
  const desktopHeaderRef = useRef(null);
  const cuisineTriggerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [isCuisineTriggerHover, setIsCuisineTriggerHover] = useState(false);
  const [isCuisineDropdownHover, setIsCuisineDropdownHover] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const searchBoxRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Suggestions come from the same in-memory index the results page uses, so
  // what the dropdown promises and what the page delivers cannot diverge. An
  // empty or one-character box yields nothing, which is what makes clearing the
  // input clear the suggestions with it.
  const suggestions = useMemo(
    () => (searchTerm.trim().length >= 2 ? search(searchTerm, { limit: 6 }).results : []),
    [searchTerm]
  );

  const closeSuggestions = useCallback(() => {
    setSearchOpen(false);
    setHighlight(-1);
  }, []);

  const goToSearch = useCallback(
    (q) => {
      const term = q.trim();
      if (!term) return;
      closeSuggestions();
      navigate(`/search?q=${encodeURIComponent(term)}`);
    },
    [navigate, closeSuggestions]
  );

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // Enter on a highlighted suggestion goes straight to that thing rather than
    // to a results page the reader would only have to click through anyway.
    if (highlight >= 0 && suggestions[highlight]) {
      closeSuggestions();
      navigate(suggestions[highlight].path);
      return;
    }
    goToSearch(searchTerm);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
      return;
    }
    if (e.key === 'Escape') {
      closeSuggestions();
      return;
    }
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSearchOpen(true);
      setHighlight((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSearchOpen(true);
      setHighlight((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    }
  };

  // Clicking anywhere else dismisses the dropdown. Listening on the document
  // rather than using onBlur, because onBlur fires before a click on a
  // suggestion registers and would swallow the selection.
  useEffect(() => {
    if (!searchOpen) return undefined;
    const onDocClick = (e) => {
      // The panel is a sibling of the search box, not a child, so both have to
      // count as "inside" or clicking a suggestion would dismiss the list before
      // the click landed on it.
      const inBox = searchBoxRef.current && searchBoxRef.current.contains(e.target);
      const inPanel = suggestionsRef.current && suggestionsRef.current.contains(e.target);
      if (!inBox && !inPanel) closeSuggestions();
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [searchOpen, closeSuggestions]);

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Order', path: '/menu' },
    { text: 'Get Suggestions', path: '/ai-assistant' },
    { text: 'Plan Picnic', path: '/plan-picnic' },
  ];

  const formattedSubtotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(subtotal) || 0);

  // Built from the menu itself. The hand-written version listed five categories
  // and not one of its slugs existed: "rice" for rice-meals, "soups-swallows"
  // for soups, plus "grills-suya", "small-chops" and "drinks-sides", which are
  // not categories at all. Drinks are not even sold. Every link landed on the
  // unfiltered menu. Deriving it means the navigation cannot advertise
  // something the kitchen does not have.
  const cuisineCategories = MENU_CATEGORIES.map((c) => ({
    label: c.title,
    path: `/menu?category=${c.id}`,
  }));

  const openCuisineMenu = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setCuisineMenuOpen(true);
  }, [setCuisineMenuOpen]);

  const closeCuisineMenu = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      if (!isCuisineTriggerHover && !isCuisineDropdownHover) {
        setCuisineMenuOpen(false);
      }
      closeTimerRef.current = null;
    }, 220);
  }, [isCuisineTriggerHover, isCuisineDropdownHover, setCuisineMenuOpen]);

  useEffect(() => {
    const updateDropdownPosition = () => {
      if (!cuisineTriggerRef.current) return;
      const rect = cuisineTriggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 2,
        left: rect.left,
      });
    };

    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition);
    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition);
    };
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (isCuisineTriggerHover || isCuisineDropdownHover) {
      openCuisineMenu();
      return;
    }
    closeCuisineMenu();
  }, [isCuisineTriggerHover, isCuisineDropdownHover, openCuisineMenu, closeCuisineMenu]);

  useEffect(() => {
    const mainEl = document.querySelector('main');
    const footerEl = document.querySelector('footer');
    const targets = [mainEl, footerEl].filter(Boolean);

    targets.forEach((el) => {
      el.style.transition = 'filter 160ms ease, opacity 160ms ease';
      el.style.filter = cuisineMenuOpen ? 'blur(7px)' : 'none';
      el.style.opacity = cuisineMenuOpen ? '0.5' : '1';
    });

    return () => {
      targets.forEach((el) => {
        el.style.filter = 'none';
        el.style.opacity = '1';
      });
    };
  }, [cuisineMenuOpen]);

  return (
    <Box sx={{ position: 'relative', zIndex: 2000, filter: 'none' }}>
      {cuisineMenuOpen ? (
        <Box
          sx={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2050,
            pointerEvents: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.50)',
            transition: 'background-color 160ms ease',
          }}
        />
      ) : null}
      <Box ref={desktopHeaderRef}>
        {/* The utility bar was removed entirely. It held the welcome sentence,
            which carried no action, plus Book Catering, Find Us and Contact,
            all three of which the footer already lists. That made it 34px of
            duplicated chrome on every screen. Removing it takes the fixed
            header from 143px to 109px and leaves the main row (66px) and the
            navigation (43px) at their comfortable heights. */}
        <Toolbar
        disableGutters
        sx={{
          // Slimmer main row. Combined with dropping the welcome sentence this
          // takes the fixed header from 171px, 19% of a 900px viewport, down to
          // roughly 110px, without removing search, nav or any destination.
          minHeight: 68,
          py: 0.75,
          px: 2,
          borderBottom: 'none',
          overflow: 'visible',
        }}
      >
        <Logo component={RouterLink} to="/" sx={{ minWidth: 112 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="HoneySpice Logo"
            sx={{
              height: 54,
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
              mt: 0,
            }}
          />
        </Logo>
        {/* Search. This was a bare input with a placeholder and no state, no
            handler and no destination, so typing into it did nothing at all. It
            is a real form now: Enter or the button submits to /search. */}
        <Box ref={searchBoxRef} sx={{ width: 390, ml: 3.5, mr: 2, position: 'relative' }}>
          <Box
            component="form"
            role="search"
            onSubmit={handleSearchSubmit}
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e4e4e4',
              borderRadius: 1,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              '&:focus-within': { borderColor: '#F46A06' },
            }}
          >
            <Box
              component="input"
              type="search"
              name="q"
              aria-label="Search the menu and the site"
              placeholder="Search for..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSearchOpen(true);
                setHighlight(-1);
              }}
              onFocus={() => setSearchOpen(true)}
              // Enter, Escape and the arrow keys are handled explicitly rather
              // than leaning on the browser's implicit form submission, which
              // depends on the form having exactly the right shape. This is the
              // primary way people will use the box, so it is not left to
              // inference.
              onKeyDown={handleSearchKeyDown}
              autoComplete="off"
              role="combobox"
              aria-expanded={searchOpen && suggestions.length > 0}
              aria-controls="site-search-suggestions"
              aria-autocomplete="list"
              sx={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                px: 1.5,
                flex: 1,
                minWidth: 0,
                fontSize: '14px',
                color: '#fff',
                '&::placeholder': { color: 'rgba(255,255,255,0.6)' },
              }}
            />
            <Box
              component="button"
              type="submit"
              aria-label="Search"
              sx={{
                width: 46,
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderLeftStyle: 'solid',
                background: 'transparent',
                cursor: 'pointer',
                p: 0,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                '&:focus-visible': { outline: '2px solid #F46A06', outlineOffset: -2 },
              }}
            >
              <SearchIcon sx={{ fontSize: 19, color: '#fff' }} />
            </Box>
          </Box>

          {/* Blur the page beneath the header while suggesting, so the list is
              clearly the active thing. The tint is kept light because blur and a
              heavy scrim double up: together they would just look muddy.

              6px is deliberately modest. backdrop-filter is composited on every
              frame, so the radius is the cost, and a small one reads as depth
              while a large one reads as an effect. The -webkit- prefix is still
              required for Safari.

              Portalled to the body because the header sets backdrop-filter, and
              an ancestor with backdrop-filter becomes the containing block for
              position: fixed descendants. Rendered in place this was clipped to
              the 109px header and measured 0px tall. */}
          {searchOpen &&
            suggestions.length > 0 &&
            createPortal(
              <Box
                aria-hidden="true"
                onClick={closeSuggestions}
                sx={{
                  position: 'fixed',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 'calc(var(--hs-header-h) + env(safe-area-inset-top, 0px))',
                  bgcolor: 'rgba(0,0,0,0.22)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  zIndex: 1050,
                }}
              />,
              document.body
            )}
          {searchOpen && suggestions.length > 0 && (
            <Box
              id="site-search-suggestions"
              ref={suggestionsRef}
              role="listbox"
              sx={{
                // Anchored to the search input, which is where a suggestion list
                // belongs. Widening it to span the whole header covered the nav
                // row but left a 1120px panel holding five short rows, with the
                // prices stranded a screen away from the names. The nav row is
                // dealt with by receding it instead, below.
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                // Above the navigation row, which sits in a sibling branch at
                // z-index 2100. At 1400 the nav links painted straight through
                // the suggestions.
                zIndex: 2200,
                bgcolor: '#fff',
                borderRadius: 1,
                boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
                overflow: 'hidden',
              }}
            >
              {suggestions.map((s, i) => (
                <Box
                  key={`${s.kind}-${s.title}`}
                  role="option"
                  aria-selected={i === highlight}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => {
                    closeSuggestions();
                    navigate(s.path);
                  }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 1.5,
                    py: 1.1,
                    cursor: 'pointer',
                    bgcolor: i === highlight ? 'rgba(244,106,6,0.10)' : 'transparent',
                  }}
                >
                  {s.image ? (
                    <Box
                      component="img"
                      src={s.image}
                      alt=""
                      aria-hidden="true"
                      sx={{ width: 34, height: 34, borderRadius: 0.75, objectFit: 'cover', flexShrink: 0 }}
                    />
                  ) : (
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 0.75,
                        flexShrink: 0,
                        bgcolor: 'rgba(244,106,6,0.12)',
                        color: '#F46A06',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                      }}
                    >
                      {s.title.charAt(0)}
                    </Box>
                  )}
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{ fontSize: '13.5px', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3 }}
                      noWrap
                    >
                      {s.title}
                    </Typography>
                    <Typography sx={{ fontSize: '11.5px', color: '#666', lineHeight: 1.3 }} noWrap>
                      {s.category}
                    </Typography>
                  </Box>
                  {typeof s.price === 'number' && (
                    <Typography sx={{ fontSize: '12.5px', fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap' }}>
                      £{s.price.toFixed(2)}
                    </Typography>
                  )}
                </Box>
              ))}

              <Box
                onClick={() => goToSearch(searchTerm)}
                sx={{
                  px: 1.5,
                  py: 1.1,
                  cursor: 'pointer',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#F46A06',
                  '&:hover': { bgcolor: 'rgba(244,106,6,0.06)' },
                }}
              >
                See all results for &ldquo;{searchTerm.trim()}&rdquo;
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, flex: 1, minWidth: 0 }}>
          <AuthNavButton />
          <Button
            component={RouterLink}
            to="/cart"
            disableElevation
            sx={{
              minWidth: 110,
              height: 44,
              borderRadius: '10px',
              textTransform: 'none',
              color: 'white',
              // Was px: 1.1 with justifyContent: 'space-between' against a fixed
              // 110px width, which pushed the icon and the price hard against
              // opposite edges with only 9px of clearance each. The group now
              // centres and the gap does the spacing, so the button breathes.
              px: 1.75,
              // Cart stays orange, it is a primary action. The orange glow is
              // dropped so the colour reads as a solid surface rather than
              // bleeding into the header around it.
              backgroundColor: '#F46A06',
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#D45A00', boxShadow: 'none' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.25,
            }}
          >
            <Badge
              badgeContent={itemCount}
              sx={{
                ...cartBadgeSx,
                '& .MuiBadge-badge': {
                  ...cartBadgeSx['& .MuiBadge-badge'],
                  fontSize: '0.72rem',
                  minWidth: 18,
                  height: 18,
                },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 22, color: 'white' }} />
            </Badge>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.05 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: 'white', m: 0 }}>Cart</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.96)', m: 0 }}>
                {formattedSubtotal}
              </Typography>
            </Box>
          </Button>
        </Box>
        </Toolbar>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'stretch',
              borderBottom: '1px solid rgba(255,255,255,0.18)',
              px: 2,
              zIndex: 2100,
              // While suggestions are showing, the nav row recedes rather than
              // being covered. Anchoring the panel to the input always leaves
              // some nav item beside it, and widening the panel to cover the row
              // made it far too wide for five short results. Fading the row
              // instead means the panel stays the right size and nothing
              // competes with it. Blur is kept small: this is a 43px strip, so
              // the cost is negligible, unlike a full-page filter.
              opacity: searchOpen && suggestions.length > 0 ? 0.25 : 1,
              filter: searchOpen && suggestions.length > 0 ? 'blur(2px)' : 'none',
              pointerEvents: searchOpen && suggestions.length > 0 ? 'none' : 'auto',
              transition: 'opacity 0.2s ease, filter 0.2s ease',
            }}
          >
            <Box sx={{ display: 'flex', flex: 1 }}>
          {navItems.map((item, index) => (
            item.hasArrow ? (
              <MenuButton
                key={item.text}
                type="button"
                ref={cuisineTriggerRef}
                onClick={openCuisineMenu}
                onMouseEnter={() => setIsCuisineTriggerHover(true)}
                onMouseLeave={() => setIsCuisineTriggerHover(false)}
                sx={{
                  flex: 1,
                  borderLeft: index === 0 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  color: cuisineMenuOpen ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                  position: 'relative',
                  zIndex: 2200,
                  boxShadow: cuisineMenuOpen ? 'inset 0 -2px 0 rgba(244, 106, 6, 0.95)' : 'none',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.35 }}>
                  {item.text}
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: 16,
                      mt: -0.15,
                      transform: cuisineMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </Box>
              </MenuButton>
            ) : (
              <MenuLink
                key={item.text}
                component={RouterLink}
                to={item.path}
                onClick={() => {
                  if (item.path === '/' && pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  setCuisineMenuOpen(false);
                  setIsCuisineTriggerHover(false);
                  setIsCuisineDropdownHover(false);
                }}
                sx={{
                  flex: 1,
                  borderLeft: index === 0 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                  color: pathname === item.path ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                  opacity: cuisineMenuOpen ? 0.35 : 1,
                  pointerEvents: cuisineMenuOpen ? 'none' : 'auto',
                  transition: 'opacity 120ms ease',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.35 }}>{item.text}</Box>
              </MenuLink>
            )
          ))}
            </Box>
          </Box>
        </Box>
      </Box>
      {cuisineMenuOpen ? (
        <Box
          onMouseEnter={() => setIsCuisineDropdownHover(true)}
          onMouseLeave={() => setIsCuisineDropdownHover(false)}
          sx={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: { xs: '8px', md: `${dropdownPosition.left}px` },
            width: { xs: 'calc(100vw - 16px)', md: '280px' },
            zIndex: 3000,
            filter: 'none',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            isolation: 'isolate',
            '& *': {
              filter: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
            },
          }}
        >
          <Box
            sx={{
              mt: 0,
              width: '100%',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.18)',
              backgroundColor: 'rgba(18, 18, 18, 0.96)',
              boxShadow: '0 16px 44px rgba(0, 0, 0, 0.35)',
              py: 1,
              maxHeight: `calc(100vh - ${dropdownPosition.top + 12}px)`,
              overflowY: 'auto',
            }}
          >
            {cuisineCategories.map((category) => (
              <Box
                key={category.label}
                component={RouterLink}
                to={category.path}
                onClick={() => {
                  setCuisineMenuOpen(false);
                  setIsCuisineTriggerHover(false);
                  setIsCuisineDropdownHover(false);
                }}
                sx={{
                  display: 'block',
                  px: 2,
                  py: 1.1,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                  },
                }}
              >
                {category.label}
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

const Navbar = () => {
  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cuisineMenuOpen, setCuisineMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { itemCount, subtotal } = useCart();
  const prevCountRef = useRef(itemCount);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const prev = prevCountRef.current;
    prevCountRef.current = itemCount;
    if (itemCount > prev) {
      setPulse(true);
      const t = window.setTimeout(() => setPulse(false), 450);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [itemCount]);

  useEffect(() => {
    setCuisineMenuOpen(false);
  }, [location.pathname]);

  const cartBadgeSx = useMemo(
    () => ({
      '& .MuiBadge-badge': {
        backgroundColor: '#ffffff',
        color: '#F46A06',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        fontWeight: 700,
        minWidth: 18,
        height: 18,
        lineHeight: '18px',
        transformOrigin: '50% 50%',
        animation: pulse ? `${cartPulse} 450ms ease` : 'none',
      },
    }),
    [pulse]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/447721629566', '_blank');
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Order', path: '/menu' },
    { text: 'Get Suggestions', path: '/ai-assistant' },
    { text: 'Plan Picnic', path: '/plan-picnic' },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'left', pt: 1, pb: 'env(safe-area-inset-bottom, 8px)' }}>
      <List disablePadding>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{ minHeight: 52, py: 1.25, px: 2 }}
            >
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/reservation"
            onClick={handleDrawerToggle}
            sx={{ minHeight: 52, py: 1.25, px: 2 }}
          >
            <ListItemText primary="Make Reservations" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <MobileAuthItem handleDrawerToggle={handleDrawerToggle} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/cart"
            onClick={handleDrawerToggle}
            sx={{ minHeight: 52, py: 1.25, px: 2 }}
          >
            <ListItemText primary="Basket" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/location"
            onClick={handleDrawerToggle}
            sx={{ minHeight: 52, py: 1.25, px: 2 }}
          >
            <ListItemText primary="Locate Us" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleWhatsAppClick();
              handleDrawerToggle();
            }}
            sx={{ minHeight: 52, py: 1.25, px: 2 }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WhatsAppIcon sx={{ fontSize: 22 }} />
                  Chat on WhatsApp
                </Box>
              }
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disabled sx={{ opacity: 0.65, px: 2, py: 1 }}>
          <ListItemText primary="Allergen Information" />
        </ListItem>
        <ListItem disabled sx={{ opacity: 0.65, px: 2, py: 1 }}>
          <ListItemText primary="Offers" />
        </ListItem>
        <ListItem disabled sx={{ opacity: 0.65, px: 2, py: 1 }}>
          <ListItemText primary="Jobs" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledAppBar position="fixed" scrolled={trigger}>
      <Container maxWidth="lg">
        {isMobile ? (
          <MobileNavbar
            handleDrawerToggle={handleDrawerToggle}
            handleWhatsAppClick={handleWhatsAppClick}
            cartBadgeSx={cartBadgeSx}
            itemCount={itemCount}
            pathname={location.pathname}
          />
        ) : (
          <DesktopNavbar
            pathname={location.pathname}
            itemCount={itemCount}
            cartBadgeSx={cartBadgeSx}
            subtotal={subtotal}
            cuisineMenuOpen={cuisineMenuOpen}
            setCuisineMenuOpen={setCuisineMenuOpen}
          />
        )}
      </Container>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 'min(100vw - 48px, 320px)',
            maxWidth: '100vw',
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </StyledAppBar>
  );
};

export default Navbar; 