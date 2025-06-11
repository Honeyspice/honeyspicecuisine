import { createTheme } from '@mui/material/styles';

// Mixed color calculation:
// Orange (#EA6D27) + Honey Gold (#FCA900) + Dark Gold (#9C7D0C)
// Resulting in a rich amber color: #C37A1A

const theme = createTheme({
  palette: {
    primary: {
      main: '#F46A06', // Orange
      light: '#FF8D3D',
      dark: '#D45A00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#09A210', // Green
      light: '#0BC219',
      dark: '#07820D',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#FCA900', // Honey Gold
      light: '#FFC233',
      dark: '#E69800',
      contrastText: '#000000',
    },
    warning: {
      main: '#FCA900', // Honey Gold
      light: '#FFC233',
      dark: '#E69800',
      contrastText: '#000000',
    },
    background: {
      default: '#F8F9FA', // Light Gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50', // Dark Gray
      secondary: '#7F8C8D', // Muted Gray
    },
    error: {
      main: '#E74C3C',
    },
    success: {
      main: '#09A210', // Green
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: {
        xs: '2.75rem',   // ~44px on mobile
        sm: '3.25rem',   // ~52px on tablet
        md: '3.75rem',   // ~60px on desktop
        lg: '4.25rem',   // ~68px on large screens
      },
      letterSpacing: '0.05em',
      color: '#2C3E50',
    },
    h2: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: {
        xs: '2.25rem',   // ~36px on mobile
        sm: '2.75rem',   // ~44px on tablet
        md: '3.25rem',   // ~52px on desktop
        lg: '3.75rem',   // ~60px on large screens
      },
      letterSpacing: '0.05em',
      color: '#2C3E50',
    },
    h3: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: {
        xs: '1.75rem',   // ~28px on mobile
        sm: '2.25rem',   // ~36px on tablet
        md: '2.75rem',   // ~44px on desktop
        lg: '3.25rem',   // ~52px on large screens
      },
      letterSpacing: '0.05em',
      color: '#2C3E50',
    },
    h4: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: {
        xs: '1.5rem',    // ~24px on mobile
        sm: '1.75rem',   // ~28px on tablet
        md: '2.25rem',   // ~36px on desktop
        lg: '2.75rem',   // ~44px on large screens
      },
      letterSpacing: '0.05em',
      color: '#2C3E50',
    },
    h5: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: {
        xs: '1.25rem',   // ~20px on mobile
        sm: '1.5rem',    // ~24px on tablet
        md: '1.75rem',   // ~28px on desktop
        lg: '2.25rem',   // ~36px on large screens
      },
      letterSpacing: '0.05em',
      color: '#2C3E50',
    },
    h6: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: {
        xs: '1.125rem',  // ~18px on mobile
        sm: '1.25rem',   // ~20px on tablet
        md: '1.5rem',    // ~24px on desktop
        lg: '1.75rem',   // ~28px on large screens
      },
      letterSpacing: '0.05em',
      color: '#2C3E50',
    },
    body1: {
      fontSize: {
        xs: '1.125rem',  // ~18px on mobile
        sm: '1.25rem',   // ~20px on tablet and up
      },
      lineHeight: 1.6,
      color: '#2C3E50',
      fontWeight: 400,
    },
    body2: {
      fontSize: {
        xs: '1rem',      // ~16px on mobile
        sm: '1.125rem',  // ~18px on tablet and up
      },
      lineHeight: 1.5,
      color: '#7F8C8D',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.05em',
      fontSize: {
        xs: '1.125rem',  // ~18px on mobile
        sm: '1.25rem',   // ~20px on tablet
        md: '1.375rem',  // ~22px on desktop
      },
    },
    subtitle1: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: {
        xs: '1.125rem',  // ~18px on mobile
        sm: '1.25rem',   // ~20px on tablet and up
      },
    },
    subtitle2: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: {
        xs: '1rem',      // ~16px on mobile
        sm: '1.125rem',  // ~18px on tablet and up
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(244, 106, 6, 0.3)',
          },
        },
        contained: {
          backgroundColor: '#F46A06',
          '&:hover': {
            backgroundColor: '#FF8D3D',
          },
        },
        outlined: {
          borderColor: '#F46A06',
          color: '#F46A06',
          '&:hover': {
            borderColor: '#FF8D3D',
            backgroundColor: 'rgba(244, 106, 6, 0.04)',
          },
        },
        text: {
          color: '#F46A06',
          '&:hover': {
            backgroundColor: 'rgba(244, 106, 6, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(244, 106, 6, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(244, 106, 6, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000000',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000000',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#000000',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
        colorPrimary: {
          backgroundColor: '#F46A06',
          color: '#FFFFFF',
          '& .MuiChip-deleteIcon': {
            color: '#FFFFFF',
            '&:hover': {
              color: '#FFF3E0',
            },
          },
        },
        colorSecondary: {
          backgroundColor: '#09A210',
          color: '#FFFFFF',
          '& .MuiChip-deleteIcon': {
            color: '#FFFFFF',
            '&:hover': {
              color: '#E8F5E9',
            },
          },
        },
        colorWarning: {
          backgroundColor: '#FCA900',
          color: '#000000',
          '& .MuiChip-deleteIcon': {
            color: '#000000',
            '&:hover': {
              color: '#333333',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
        elevation0: {
          '&.MuiAppBar-root, &[class*="header"], &[class*="footer"]': {
            backgroundColor: '#F46A06',
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F46A06',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 0,
          '&::before': {
            display: 'none',
          },
          '&::after': {
            display: 'none',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(244, 106, 6, 0.2)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#F46A06',
          '&:hover': {
            color: '#FF8D3D',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '&[class*="footer"]': {
            backgroundColor: '#F46A06',
            color: '#FFFFFF',
            padding: '2rem 0',
          },
        },
      },
    },
  },
});

export default theme; 