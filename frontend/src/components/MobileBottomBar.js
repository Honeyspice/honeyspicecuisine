import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '447721629566';

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

      {/* Sticky cart CTA, only when cart has items */}
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

      {/* Nav bar */}
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
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            pb: 'env(safe-area-inset-bottom, 0px)',
            transition: 'background 0.2s',
            '&:active': { background: '#F46A06' },
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Order
          </Typography>
        </Box>

        {/* SUGGEST A MEAL */}
        <Box
          component={RouterLink}
          to="/ai-assistant"
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            borderRight: '1px solid rgba(255,255,255,0.1)',
            pb: 'env(safe-area-inset-bottom, 0px)',
            transition: 'background 0.2s',
            '&:active': { background: '#F46A06' },
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Suggest a Meal
          </Typography>
        </Box>

        {/* WHATSAPP */}
        <Box
          onClick={openWhatsApp}
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pb: 'env(safe-area-inset-bottom, 0px)',
            transition: 'background 0.2s',
            '&:active': { background: '#25D366' },
          }}
        >
          <WhatsAppIcon sx={{ color: '#25D366', fontSize: 22 }} />
        </Box>
      </Box>
    </Box>
  );
}
