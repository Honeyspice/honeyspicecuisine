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
      // Warm cream base. Matches the cream already used in page sections, so the
      // site no longer mixes a cool grey ground with warm section panels.
      default: '#FAF6F0',
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
    fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.25,
      letterSpacing: '0',
    },
    h4: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.35,
    },
    h6: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
      fontSize: '1.02rem',
      lineHeight: 1.65,
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
      fontSize: '0.95rem',
      lineHeight: 1.55,
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.04em',
      fontSize: '0.95rem',
    },
    subtitle1: {
      fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
    },
    subtitle2: {
      fontFamily: '"Jost", "Helvetica", "Arial", sans-serif',
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
        html: {
          WebkitTextSizeAdjust: '100%',
          textSizeAdjust: '100%',
        },
        body: {
          // Plain warm cream ground. The previous orange and honey radial washes
          // put the brand colour behind every screen, which is what made orange
          // read as constant noise rather than a signature. Warmth now comes
          // from the cream itself. Dropping the image also removes the
          // `backgroundAttachment: fixed` iOS Safari jank workaround.
          backgroundColor: '#FAF6F0',
          minHeight: '100dvh',
          WebkitTapHighlightColor: 'transparent',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '12px',
          padding: '10px 24px',
          boxShadow: 'none',
          minHeight: 44,
          '&:hover': {
            // Neutral lift. Every button previously glowed orange on hover,
            // including secondary ones, which spread the brand colour across
            // all interaction rather than reserving it for the primary action.
            boxShadow: '0 4px 16px rgba(26, 26, 26, 0.12)',
          },
          [theme.breakpoints.up('sm')]: {
            minHeight: 40,
          },
        }),
        // Contained stays orange. This is the signature CTA and the one place
        // the brand colour should own a whole surface.
        contained: {
          backgroundColor: '#F46A06',
          '&:hover': {
            backgroundColor: '#FF8D3D',
          },
        },
        // Secondary actions are charcoal at rest and earn orange on hover, so
        // the brand colour becomes a reward for intent instead of background hum.
        outlined: {
          borderColor: '#1A1A1A',
          color: '#1A1A1A',
          '&:hover': {
            borderColor: '#F46A06',
            color: '#F46A06',
            backgroundColor: 'rgba(244, 106, 6, 0.04)',
          },
        },
        text: {
          color: '#1A1A1A',
          '&:hover': {
            color: '#F46A06',
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
    MuiOutlinedInput: {
      styleOverrides: {
        input: ({ theme }) => ({
          // iOS Safari zooms if font-size < 16px
          [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
          },
        }),
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
          // Charcoal at rest, orange on hover. Body links were previously all
          // orange, which put the brand colour into running text everywhere.
          color: '#1A1A1A',
          '&:hover': {
            color: '#F46A06',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          padding: 10,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 1.4 });

export default theme; 