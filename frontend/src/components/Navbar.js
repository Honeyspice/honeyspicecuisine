import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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

const UtilityLink = muiStyled(RouterLink)(() => ({
  fontSize: '13px',
  color: 'rgba(255, 255, 255, 0.82)',
  textDecoration: 'none',
  lineHeight: 1,
  '&:hover': {
    color: '#ffffff',
    textDecoration: 'none',
  },
}));

// Auth-aware Sign In / Dashboard button
const AuthNavButton = () => {
  const { user, logout } = useAuth();
  if (user) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
        <Button
          component={RouterLink}
          to="/dashboard"
          disableElevation
          sx={{
            height: 44,
            borderRadius: '10px',
            textTransform: 'none',
            color: '#fff',
            px: 2,
            fontSize: '13px',
            fontWeight: 700,
            background: 'linear-gradient(135deg,#F46A06,#FF8D3D)',
            '&:hover': { background: '#D45A00' },
          }}
        >
          ✨ My Plan
        </Button>
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
        <ListItemButton component={RouterLink} to="/dashboard" onClick={handleDrawerToggle} sx={{ minHeight: 52, py: 1.25, px: 2 }}>
          <ListItemText primary="✨ My Meal Plan" primaryTypographyProps={{ fontWeight: 700, color: '#F46A06' }} />
        </ListItemButton>
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
  '/dashboard': 'My Dashboard',
  '/meal-plan': 'My Meal Plan',
  '/profile-setup': 'Health Profile',
};

// Mobile Navbar Component
const MobileNavbar = ({ handleDrawerToggle, cartBadgeSx, itemCount, pathname }) => {
  const isHome = pathname === '/';
  const pageTitle = PAGE_TITLES[pathname];

  return (
    <>
      <Toolbar disableGutters sx={{ py: 1.1, position: 'relative' }}>
        {/* Logo always visible — tapping goes home */}
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

  const cuisineCategories = [
    { label: 'Rice Dishes', path: '/menu?category=rice' },
    { label: 'Soups and Swallows', path: '/menu?category=soups-swallows' },
    { label: 'Grills and Suya', path: '/menu?category=grills-suya' },
    { label: 'Small Chops', path: '/menu?category=small-chops' },
    { label: 'Drinks and Sides', path: '/menu?category=drinks-sides' },
  ];

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
        <Box
          sx={{
            minHeight: 34,
            py: 0.75,
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            ml: '-50vw',
            mr: '-50vw',
            borderBottom: 'none',
            color: 'rgba(255, 255, 255, 0.82)',
            fontSize: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          }}
        >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 0.75, md: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '13px', sm: '14px', md: '15px' },
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.72)',
              lineHeight: 1.35,
              pr: { md: 2 },
              flex: 1,
            }}
          >
            Welcome To Honeyspice-Home To Your Authentic Nigerian Cuisine Made With Love And Delivered Fresh
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              ml: { md: 3 },
              flexWrap: 'wrap',
            }}
          >
            <UtilityLink to="/reservation">
              Book Catering
            </UtilityLink>
            <UtilityLink to="/location">
              Find Us
            </UtilityLink>
            <UtilityLink to="/contact">
              Contact
            </UtilityLink>
          </Box>
        </Box>
        </Box>
        <Toolbar
        disableGutters
        sx={{
          minHeight: 94,
          py: 1,
          px: 2,
          borderBottom: 'none',
          overflow: 'visible',
        }}
      >
        <Logo component={RouterLink} to="/" sx={{ minWidth: 138 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="HoneySpice Logo"
            sx={{
              height: 78,
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
              mt: 0,
            }}
          />
        </Logo>
        <Box sx={{ width: 390, ml: 3.5, mr: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e4e4e4',
              borderRadius: 1,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <Box
              component="input"
              aria-label="Search for products"
              placeholder="Search for..."
              sx={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                px: 1.5,
                flex: 1,
                fontSize: '14px',
                color: '#fff',
              }}
            />
            <Box sx={{ width: 46, display: 'grid', placeItems: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <SearchIcon sx={{ fontSize: 19, color: '#fff' }} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, flex: 1, minWidth: 0 }}>
          <AuthNavButton />
          <Button
            component={RouterLink}
            to="/cart"
            disableElevation
            sx={{
              minWidth: 118,
              height: 52,
              borderRadius: '10px',
              textTransform: 'none',
              color: 'white',
              px: 1.1,
              backgroundColor: '#F46A06',
              boxShadow: '0 4px 14px rgba(244, 106, 6, 0.32)',
              '&:hover': { backgroundColor: '#D45A00', boxShadow: '0 6px 16px rgba(212, 90, 0, 0.34)' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
              filter: 'none',
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