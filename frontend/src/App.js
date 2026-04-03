import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, LinearProgress } from '@mui/material';
import theme from './theme';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import WhyUs from './pages/WhyUs';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import RecipeBook from './pages/RecipeBook';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import Order from './pages/Order';
import PartnerDashboard from './pages/PartnerDashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import CookieBanner from './components/CookieBanner';
import FloatingChat from './components/FloatingChat';

// ScrollToTop component
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search, hash]);
  return null;
}

function RouteLoadingIndicator() {
  const { pathname, search } = useLocation();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 320);
    return () => window.clearTimeout(t);
  }, [pathname, search]);

  if (!loading) return null;

  return (
    <LinearProgress
      color="primary"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 4000,
        height: 3,
      }}
    />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <ScrollToTop />
          <RouteLoadingIndicator />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                // Navbar + notch / status bar on phones
                pt: {
                  xs: 'calc(64px + env(safe-area-inset-top, 0px))',
                  sm: 'calc(72px + env(safe-area-inset-top, 0px))',
                  md: 'calc(176px + env(safe-area-inset-top, 0px))',
                },
                pb: { xs: 'env(safe-area-inset-bottom, 0px)', md: 0 },
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                <Route path="/order" element={<Order />} />
                <Route path="/partner/dashboard" element={<PartnerDashboard />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/location" element={<Location />} />
                <Route path="/recipe-manual" element={<RecipeBook />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
          <CookieBanner />
          <FloatingChat />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App; 