import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
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
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import CookieBanner from './components/CookieBanner';
import FloatingChat from './components/FloatingChat';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                pt: { xs: 8, sm: 9 }, // fixed navbar offset
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
                <Route path="/order" element={<Checkout />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/location" element={<Location />} />
                <Route path="/recipe-manual" element={<RecipeBook />} />
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