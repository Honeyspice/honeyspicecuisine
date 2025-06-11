import React, { useState } from 'react';
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
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = muiStyled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: '#1A1A1A',
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
const MobileNavbar = ({ handleDrawerToggle, handleWhatsAppClick }) => {
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Menu', path: '/menu' },
    { text: 'View Gallery', path: '/gallery' },
    { text: 'Recipe Book', path: '/recipe-manual' },
  ];

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
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={false}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: '#1A1A1A',
            color: 'white',
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.text} 
              component={RouterLink} 
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem 
            component={RouterLink} 
            to="/reservation"
            onClick={handleDrawerToggle}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemText primary="Make Reservations" />
          </ListItem>
          <ListItem 
            component={RouterLink} 
            to="/order"
            onClick={handleDrawerToggle}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemText primary="Order Now" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

// Desktop Navbar Component
const DesktopNavbar = ({ handleWhatsAppClick }) => {
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
            }
          }}
        >
          Locate Us
        </Typography>
        <Typography
          onClick={handleWhatsAppClick}
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            padding: '6px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              color: 'white',
            }
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 18 }} />
          Chat
        </Typography>
      </Box>
    </Box>
  );
};

const Navbar = () => {
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            sx={{
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem 
          component={RouterLink} 
          to="/reservation"
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemText primary="Make Reservations" />
        </ListItem>
        <ListItem 
          component={RouterLink} 
          to="/order"
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemText primary="Order Now" />
        </ListItem>
        <ListItem 
          component={RouterLink} 
          to="/location"
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemText primary="Locate Us" />
        </ListItem>
        <ListItem 
          onClick={handleWhatsAppClick}
          sx={{
            color: 'text.primary',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <ListItemText 
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WhatsAppIcon sx={{ fontSize: 20 }} />
                Chat
              </Box>
            } 
          />
        </ListItem>
        <ListItem 
          disabled
          sx={{
            color: 'text.secondary',
            opacity: 0.7,
          }}
        >
          <ListItemText primary="Allergen Information" />
        </ListItem>
        <ListItem 
          disabled
          sx={{
            color: 'text.secondary',
            opacity: 0.7,
          }}
        >
          <ListItemText primary="Offers" />
        </ListItem>
        <ListItem 
          disabled
          sx={{
            color: 'text.secondary',
            opacity: 0.7,
          }}
        >
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
          />
        ) : (
          <DesktopNavbar handleWhatsAppClick={handleWhatsAppClick} />
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
            width: 240,
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