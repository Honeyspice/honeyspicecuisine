import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { keyframes } from '@mui/material/styles';
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
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import AIAssistant from './pages/AIAssistant';
import PlanPicnic from './pages/PlanPicnic';
import Search from './pages/Search';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CookieBanner from './components/CookieBanner';
import FloatingChat from './components/FloatingChat';
import NotFound from './pages/NotFound';
import MobileBottomBar from './components/MobileBottomBar';

// ScrollToTop component
const pageFadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

function PageWrapper({ children }) {
  const { pathname } = useLocation();
  return (
    <Box
      key={pathname}
      sx={{ animation: `${pageFadeIn} 0.35s ease forwards` }}
    >
      {children}
    </Box>
  );
}

const SITE_ORIGIN = 'https://honeyspicecuisine.co.uk';

// Keeps rel=canonical pointing at the current route rather than leaving every
// page claiming to be the homepage, which is what the single static tag in
// index.html would otherwise do. Lives here rather than in Seo.js because
// several routes never render Seo, and a wrong canonical is worse than a
// missing one. Query strings and hashes are stripped so /menu?x=1 does not
// present itself as a separate page.
function Canonical() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const href = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`;
    let tag = document.querySelector('link[rel="canonical"]');
    if (!tag) {
      tag = document.createElement('link');
      tag.setAttribute('rel', 'canonical');
      document.head.appendChild(tag);
    }
    tag.setAttribute('href', href);
    const og = document.querySelector('meta[property="og:url"]');
    if (og) og.setAttribute('content', href);
  }, [pathname]);
  return null;
}

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
      <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Canonical />
          <RouteLoadingIndicator />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                // Clears the fixed navbar, plus the notch on phones. Reads the
                // shared custom properties from index.css rather than repeating
                // the pixel values, which is how the desktop padding came to be
                // 67px larger than the header it was meant to clear.
                pt: 'calc(var(--hs-header-h) + env(safe-area-inset-top, 0px))',
                pb: { xs: 'calc(var(--hs-bottombar-h) + env(safe-area-inset-bottom, 0px))', md: 0 },
              }}
            >
              <PageWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/cancel" element={<CheckoutCancel />} />
                {/* /order rendered the whole Menu page, so it was a genuine
                    duplicate of /menu competing with it in search. */}
                <Route path="/order" element={<Navigate to="/menu" replace />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/plan-picnic" element={<PlanPicnic />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/why-us" element={<WhyUs />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/location" element={<Location />} />
                <Route path="/recipe-manual" element={<RecipeBook />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* The health profile and meal-plan feature was removed: generating
                    dietary plans against conditions like diabetes and hypertension is
                    dietetic advice, and it stored special-category health data. Old
                    links and bookmarks land on the menu rather than a 404. */}
                <Route path="/profile-setup" element={<Navigate to="/menu" replace />} />
                <Route path="/dashboard" element={<Navigate to="/menu" replace />} />
                <Route path="/meal-plan" element={<Navigate to="/menu" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </PageWrapper>
            </Box>
            <Footer />
          </Box>
          {/* SideTabs removed: the vertical "Our Menu" and "Book Now" rails
              duplicated destinations already in the header. Our Menu is the
              "Order" nav item and Book Now is the "Book Catering" utility link,
              so no access was lost. */}
          <MobileBottomBar />
          <CookieBanner />
          <FloatingChat />
        </Router>
      </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 