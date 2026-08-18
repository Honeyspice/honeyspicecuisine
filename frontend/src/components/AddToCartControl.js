import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

// Add, then adjust, without leaving the menu.
//
// The button this replaces flashed "Added" for one second and then reverted, so
// a card carried no evidence of what was already in the basket. Checking meant
// opening the cart, and adding a second portion meant pressing Add again and
// hoping. The quantity is now read straight from the cart, so the control shows
// the real state for as long as the item is in it.
//
// Decrementing from 1 removes the line rather than clamping. The reducer's
// SET_QUANTITY floors at 1, so removeItem is the only way back to zero, and
// leaving a 1 the customer is trying to clear would be worse than useless.

const CONFIRMATION_MS = 2000;

const AddToCartControl = ({ id, name, price, fullWidthOnMobile = false }) => {
  const { items, addItem, removeItem, setQuantity } = useCart();

  const line = items.find((i) => i.id === id);
  const quantity = line ? line.quantity : 0;

  // "Added" confirms an action, so it is temporary. The stepper is state, so it
  // stays. The ref starts at the current quantity, which means returning to the
  // page with items already in the basket shows the stepper without flashing a
  // confirmation for something you did earlier.
  const [justAdded, setJustAdded] = React.useState(false);
  const previousQuantity = React.useRef(quantity);

  React.useEffect(() => {
    const increased = quantity > previousQuantity.current;
    previousQuantity.current = quantity;
    if (!increased) return undefined;
    setJustAdded(true);
    const timer = window.setTimeout(() => setJustAdded(false), CONFIRMATION_MS);
    return () => window.clearTimeout(timer);
  }, [quantity]);

  if (quantity === 0) {
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => addItem({ id, name, price })}
        startIcon={<AddShoppingCartIcon fontSize="small" />}
        sx={{
          flexShrink: 0,
          alignSelf: { xs: 'flex-start', sm: 'auto' },
          minWidth: fullWidthOnMobile ? { xs: '100%', sm: 108 } : { xs: 148, sm: 108 },
          height: { xs: 44, sm: 36 },
          mt: { xs: 1, sm: 0.25 },
          borderRadius: 999,
          fontWeight: 800,
          textTransform: 'none',
          transition: 'transform 180ms ease, background-color 180ms ease',
          '&:hover': { bgcolor: 'rgba(244, 106, 6, 0.06)', transform: 'scale(1.02)' },
          '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
        }}
      >
        Add
      </Button>
    );
  }

  const stepBtn = {
    display: 'grid',
    placeItems: 'center',
    // 36px keeps the whole control inside the row height it replaces while
    // staying comfortably tappable.
    width: 36,
    height: 36,
    flexShrink: 0,
    border: 'none',
    borderRadius: '50%',
    bgcolor: 'transparent',
    color: 'primary.main',
    cursor: 'pointer',
    p: 0,
    transition: 'background-color 0.2s ease',
    '&:hover': { bgcolor: 'rgba(244, 106, 6, 0.12)' },
    '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        alignSelf: { xs: 'flex-start', sm: 'auto' },
        mt: { xs: 1, sm: 0.25 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0.5,
      }}
    >
      {/* Kept in the layout and faded rather than unmounted. Removing it would
          shrink the control two seconds after a tap and shunt the rest of the
          row upwards, which reads as a glitch. */}
      <Box
        aria-hidden={!justAdded}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          height: 18,
          color: 'success.main',
          opacity: justAdded ? 1 : 0,
          transition: 'opacity 400ms ease',
          pointerEvents: 'none',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 15 }} />
        <Typography component="span" sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.02em' }}>
          Added
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'primary.main',
          borderRadius: 999,
          px: 0.5,
        }}
      >
        <Box
          component="button"
          type="button"
          onClick={() => (quantity <= 1 ? removeItem(id) : setQuantity(id, quantity - 1))}
          aria-label={quantity <= 1 ? `Remove ${name} from basket` : `Decrease ${name} quantity`}
          sx={stepBtn}
        >
          <RemoveIcon sx={{ fontSize: 17 }} />
        </Box>

        <Typography
          aria-live="polite"
          sx={{ minWidth: 26, textAlign: 'center', fontWeight: 800, fontSize: '0.95rem', color: 'text.primary' }}
        >
          {quantity}
        </Typography>

        <Box
          component="button"
          type="button"
          onClick={() => setQuantity(id, quantity + 1)}
          aria-label={`Increase ${name} quantity`}
          sx={stepBtn}
        >
          <AddIcon sx={{ fontSize: 17 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default AddToCartControl;
