import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F46A06',
      light: '#FF8B3D',
      dark: '#C54D00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: {
        xs: '2.5rem',    // ~40px on mobile
        sm: '2.75rem',   // ~44px on tablet
        md: '3rem',      // ~48px on desktop
        lg: '3.25rem',   // ~52px on large screens
      },
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: {
        xs: '2rem',      // ~32px on mobile
        sm: '2.25rem',   // ~36px on tablet
        md: '2.5rem',    // ~40px on desktop
        lg: '2.75rem',   // ~44px on large screens
      },
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: {
        xs: '1.75rem',   // ~28px on mobile
        sm: '1.875rem',  // ~30px on tablet
        md: '2rem',      // ~32px on desktop
        lg: '2.25rem',   // ~36px on large screens
      },
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: {
        xs: '1.5rem',    // ~24px on mobile
        sm: '1.625rem',  // ~26px on tablet
        md: '1.75rem',   // ~28px on desktop
        lg: '2rem',      // ~32px on large screens
      },
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: {
        xs: '1.25rem',   // ~20px on mobile
        sm: '1.375rem',  // ~22px on tablet
        md: '1.5rem',    // ~24px on desktop
        lg: '1.625rem',  // ~26px on large screens
      },
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: {
        xs: '1.125rem',  // ~18px on mobile
        sm: '1.25rem',   // ~20px on tablet
        md: '1.375rem',  // ~22px on desktop
        lg: '1.5rem',    // ~24px on large screens
      },
      lineHeight: 1.4,
    },
    body1: {
      fontSize: {
        xs: '1.5rem',    // ~24px on mobile
        sm: '1.75rem',   // ~28px on tablet
        md: '2rem',      // ~32px on desktop
      },
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: {
        xs: '0.9375rem', // ~15px on mobile
        sm: '1rem',      // ~16px on tablet and up
      },
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: {
        xs: '1rem',      // ~16px on mobile
        sm: '1.125rem',  // ~18px on tablet and up
      },
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: {
        xs: '1.5rem',    // ~24px on mobile
        sm: '1.75rem',   // ~28px on tablet
        md: '2rem',      // ~32px on desktop
      },
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    subtitle2: {
      fontSize: {
        xs: '1rem',      // ~16px on mobile
        sm: '1.125rem',  // ~18px on tablet and up
      },
      lineHeight: 1.5,
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0 24px',
        },
      },
    },
  },
});

export default theme; 