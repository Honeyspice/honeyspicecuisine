import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '447721629566';

// Divider between actions. The previous 0.1 alpha was about 1.1:1 against the
// near-black bar, so the three tap zones read as one undifferentiated slab.
const DIVIDER = '1px solid rgba(255, 255, 255, 0.22)';

// Single active colour for all three actions. WhatsApp previously flashed green
// while the other two flashed orange.
const ACTIVE_BG = '#F46A06';

const actionSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  pb: 'env(safe-area-inset-bottom, 0px)',
  transition: 'background 0.2s',
  '&:active': { background: ACTIVE_BG },
};

const labelSx = {
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.72rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

export default function MobileBottomBar() {
  const { itemCount, subtotal } = useCart();
  const navigate = useNavigate();

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hi HoneySpice, I have a question about my order.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const formattedSubtotal = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(subtotal || 0);

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1400 }}>

      {/* Sticky cart CTA, only when the cart has items */}
      {itemCount > 0 && (
        <Box
          onClick={() => navigate('/cart')}
          sx={{
            bgcolor: '#F46A06',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.75,
            cursor: 'pointer',
            boxShadow: '0 -4px 20px rgba(244,106,6,0.35)',
            transition: 'background 0.2s',
            '&:active': { bgcolor: '#D45A00' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                bgcolor: 'rgba(0,0,0,0.2)',
                borderRadius: '50%',
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.8rem' }}>{itemCount}</Typography>
            </Box>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
              View Cart
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem' }}>
              {formattedSubtotal}
            </Typography>
            <ShoppingCartIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
        </Box>
      )}

      {/* Nav bar. Cells are weighted rather than equal thirds: the icon only
          needs its own width, so the two labelled actions get the remaining
          space and Order, the primary action, gets the larger share. Equal
          thirds previously wasted 84px on the icon while "Suggest a Meal"
          wrapped to two lines at 320px. */}
      <Box
        sx={{
          height: 'calc(56px + env(safe-area-inset-bottom, 0px))',
          bgcolor: '#1a1a1a',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
        }}
      >
        {/* ORDER */}
        <Box
          component={RouterLink}
          to="/menu"
          sx={{ ...actionSx, flex: '1.25 1 0', borderRight: DIVIDER }}
        >
          <Typography sx={labelSx}>Order</Typography>
        </Box>

        {/* SUGGEST. Shortened from "Suggest a Meal", which needed 106px in a
            107px cell and wrapped on a 320px screen. */}
        <Box
          component={RouterLink}
          to="/ai-assistant"
          sx={{ ...actionSx, flex: '1 1 0', borderRight: DIVIDER }}
        >
          <Typography sx={labelSx}>Suggest</Typography>
        </Box>

        {/* WHATSAPP. Now a real button: it was a div with an onClick, so it had
            no accessible name and could not be reached by keyboard or switch
            access. Fixed width, since an icon does not need a third of the bar. */}
        <Box
          component="button"
          type="button"
          onClick={openWhatsApp}
          aria-label="Chat on WhatsApp"
          sx={{
            ...actionSx,
            flex: '0 0 64px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            borderRadius: 0,
            p: 0,
            font: 'inherit',
            color: 'inherit',
          }}
        >
          <WhatsAppIcon sx={{ color: '#25D366', fontSize: 22 }} />
        </Box>
      </Box>
    </Box>
  );
}
