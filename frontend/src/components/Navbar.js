import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Badge from '@mui/material/Badge';
import { useCart } from '../context/CartContext';

const cartPulse = keyframes`
  0% { transform: scale(1); }
  35% { transform: scale(1.15); }
  70% { transform: scale(0.98); }
  100% { transform: scale(1); }
`;

const StyledAppBar = muiStyled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: theme.palette.grey[900],
  // Respect iPhone notch / status bar
  paddingTop: 'env(safe-area-inset-top, 0px)',
  boxShadow: 'none',
  border: 'none',
  borderRadius: 0,
  transition: 'all 0.3s ease',
  '&::before': {
    display: 'none',
  },
  '&::after': {
    display: 'none',
  },
}));

const Logo = muiStyled(RouterLink)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  fontSize: '24px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.9)',
    '& img': {
      transform: 'scale(1.05)',
    }
  },
}));

const MenuLink = muiStyled(RouterLink)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.9)',
  textDecoration: 'none',
  margin: '0 16px',
  fontSize: '16px',
  fontWeight: 500,
  position: 'relative',
  padding: '8px 16px',
  minWidth: 'auto',
  height: '36px',
  lineHeight: '20px',
  display: 'flex',
  alignItems: 'center',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '4px',
    left: '16px',
    right: '16px',
    backgroundColor: 'white',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: 'white',
    '&:after': {
      width: 'calc(100% - 32px)',
    },
  },
}));

const AdditionalButton = muiStyled(Button)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.9)',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 500,
  padding: '8px 16px',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'transparent !important',
    color: 'rgba(255, 255, 255, 0.9) !important',
    textDecoration: 'none !important',
  },
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.9)',
  }
}));

// Mobile Navbar Component
const MobileNavbar = ({ handleDrawerToggle, cartBadgeSx, itemCount }) => {
  return (
    <>
      <Toolbar disableGutters sx={{ py: 1.5 }}>
        <Logo component={RouterLink} to="/">
          <Box
            component="img"
            src="/logo.png"
            alt="HoneySpice Logo"
            sx={{
              height: 45,
              width: 'auto',
              display: 'block',
              transition: 'transform 0.3s ease',
              objectFit: 'contain',
              filter: 'brightness(1.1)',
              marginTop: '-5px'
            }}
          />
        </Logo>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          component={RouterLink}
          to="/cart"
          aria-label="Open basket"
          sx={{ color: 'common.white', mr: 0.5 }}
          size="medium"
        >
          <Badge badgeContent={itemCount} color="warning" sx={cartBadgeSx}>
            <ShoppingBagOutlinedIcon />
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
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </>
  );
};

// Desktop Navbar Component
const DesktopNavbar = () => {
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Menu', path: '/menu' },
    { text: 'View Gallery', path: '/gallery' },
    { text: 'Recipe Book', path: '/recipe-manual' },
  ];

  return (
    <Box>
      <Toolbar disableGutters sx={{ py: 1.5 }}>
        <Logo component={RouterLink} to="/">
          <Box
            component="img"
            src="/logo.png"
            alt="HoneySpice Logo"
            sx={{
              height: 75,
              width: 'auto',
              display: 'block',
              transition: 'transform 0.3s ease',
              objectFit: 'contain',
              filter: 'brightness(1.1)',
              marginTop: '-5px'
            }}
          />
        </Logo>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          {menuItems.map((item) => (
            <MenuLink 
              key={item.text}
              component={RouterLink} 
              to={item.path}
              sx={{
                margin: '0 16px',
                fontSize: '16px',
                padding: '8px 16px',
              }}
            >
              {item.text}
            </MenuLink>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
          <Button
            component={RouterLink}
            to="/reservation"
            variant="contained"
            sx={{
              backgroundColor: '#1A1A1A',
              color: 'white',
              border: '1px solid white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#1A1A1A',
              },
              fontSize: '14px',
              padding: '6px 16px',
            }}
          >
            Make Reservations
          </Button>
          <Button
            component={RouterLink}
            to="/order"
            variant="contained"
            sx={{
              backgroundColor: 'white',
              color: '#1A1A1A',
              '&:hover': {
                backgroundColor: '#1A1A1A',
                color: 'white',
                border: '1px solid white',
              },
              fontSize: '14px',
              padding: '6px 16px',
            }}
          >
            Order Now
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2, 
        py: 1,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <AdditionalButton 
          disabled
          sx={{
            fontSize: '14px',
            padding: '6px 12px',
          }}
        >
          Allergen Information
        </AdditionalButton>
        <AdditionalButton 
          disabled
          sx={{
            fontSize: '14px',
            padding: '6px 12px',
          }}
        >
          Offers
        </AdditionalButton>
        <AdditionalButton
          disabled
          sx={{
            fontSize: '14px',
            padding: '6px 12px',
          }}
        >
          Jobs
        </AdditionalButton>
        <Typography
          component={RouterLink}
          to="/location"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            padding: '6px 12px',
            cursor: 'pointer',
            '&:hover': {
              color: 'white',
            },
          }}
        >
          Locate Us
        </Typography>
      </Box>
    </Box>
  );
};

const Navbar = () => {
  const location = useLocation();
  const isMenuPage =
    location.pathname === '/menu' ||
    location.pathname === '/gallery' ||
    location.pathname === '/location';
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { itemCount } = useCart();
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

  const cartBadgeSx = useMemo(
    () => ({
      '& .MuiBadge-badge': {
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
    { text: 'Menu', path: '/menu' },
    { text: 'View Gallery', path: '/gallery' },
    { text: 'Recipe Book', path: '/recipe-manual' },
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
          <ListItemButton
            component={RouterLink}
            to="/order"
            onClick={handleDrawerToggle}
            sx={{ minHeight: 52, py: 1.25, px: 2 }}
          >
            <ListItemText primary="Order Now" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
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
    <StyledAppBar position={isMenuPage ? "static" : "fixed"} scrolled={trigger}>
      <Container maxWidth="lg">
        {isMobile ? (
          <MobileNavbar 
            handleDrawerToggle={handleDrawerToggle}
            handleWhatsAppClick={handleWhatsAppClick}
            cartBadgeSx={cartBadgeSx}
            itemCount={itemCount}
          />
        ) : (
          <DesktopNavbar handleWhatsAppClick={handleWhatsAppClick} />
        )}
      </Container>
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 16, sm: 24 },
          top: { xs: 14, sm: 18 },
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
        }}
      >
        <IconButton
          component={RouterLink}
          to="/cart"
          aria-label="Open basket"
          sx={{ color: 'common.white' }}
        >
          <Badge badgeContent={itemCount} color="warning" sx={cartBadgeSx}>
            <ShoppingBagOutlinedIcon />
          </Badge>
        </IconButton>
      </Box>
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