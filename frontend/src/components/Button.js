import { Button as MuiButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Button = ({ 
  variant = 'contained', 
  children, 
  startIcon, 
  endIcon,
  arrow = false,
  ...props 
}) => {
  const getIcon = () => {
    if (startIcon) return startIcon;
    if (endIcon) return endIcon;
    if (arrow) {
      return variant === 'contained' ? <ArrowForwardIcon /> : <ArrowRightAltIcon />;
    }
    return null;
  };

  const isPrimaryHero =
    props.component && props.to === '/order' && variant === 'contained';

  return (
    <MuiButton
      variant={variant}
      startIcon={startIcon || (arrow && variant === 'contained' ? getIcon() : null)}
      endIcon={endIcon || (arrow && variant !== 'contained' ? getIcon() : null)}
      sx={{
        ...(isPrimaryHero && {
          borderRadius: 999,
          px: 3,
          height: 48,
          fontWeight: 800,
          textTransform: 'none',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.28)',
          transition: 'transform 200ms ease, box-shadow 200ms ease',
          '&:hover': {
            transform: 'translateY(-1px) scale(1.02)',
            boxShadow: '0 18px 40px rgba(15, 23, 42, 0.32)',
          },
        }),
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button; 