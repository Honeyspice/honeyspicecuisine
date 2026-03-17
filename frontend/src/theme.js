import { createTheme, responsiveFontSizes, alpha } from '@mui/material/styles';

let theme = createTheme({
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
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#1A1A1A',
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
      // Back to a light, high-contrast base so text stays very readable
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2933', // Very dark gray for maximum legibility
      secondary: '#5A6A6C', // Slightly stronger muted gray for readability
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
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.35,
    },
    h6: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.02rem',
      lineHeight: 1.65,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.55,
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: '0.02em',
      fontSize: '0.95rem',
    },
    subtitle1: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle2: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '0.95rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8F9FA',
          backgroundImage: `radial-gradient(1200px 600px at 10% 0%, ${alpha(
            '#F46A06',
            0.08
          )} 0%, rgba(0,0,0,0) 60%),
            radial-gradient(900px 500px at 90% 10%, ${alpha('#FCA900', 0.08)} 0%, rgba(0,0,0,0) 55%)`,
          backgroundAttachment: 'fixed',
        },
      },
    },
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
          boxShadow: '0 10px 30px rgba(16, 24, 40, 0.08)',
          border: `1px solid ${alpha('#2C3E50', 0.08)}`,
          '&:hover': {
            boxShadow: '0 16px 50px rgba(16, 24, 40, 0.12)',
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
              borderColor: '#2C3E50',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#F46A06',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#F46A06',
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
            borderColor: '#2C3E50',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#F46A06',
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
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
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
          borderColor: alpha('#2C3E50', 0.12),
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
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 2.2 });

export default theme; 