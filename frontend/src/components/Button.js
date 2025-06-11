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

  return (
    <MuiButton
      variant={variant}
      startIcon={startIcon || (arrow && variant === 'contained' ? getIcon() : null)}
      endIcon={endIcon || (arrow && variant !== 'contained' ? getIcon() : null)}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button; 