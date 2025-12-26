import { createTheme, alpha } from '@mui/material/styles';

// Custom color palette - dark theme with gold accents
const goldAccent = '#C9A227';
const goldLight = '#E5C76B';
const goldDark = '#9A7B1A';
const darkBg = '#0A0A0A';
const darkSurface = '#141414';
const darkCard = '#1A1A1A';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: goldAccent,
      light: goldLight,
      dark: goldDark,
      contrastText: '#000000',
    },
    secondary: {
      main: '#2A2A2A',
      light: '#3A3A3A',
      dark: '#1A1A1A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: darkBg,
      paper: darkCard,
    },
    text: {
      primary: '#FFFFFF',
      secondary: alpha('#FFFFFF', 0.7),
    },
    divider: alpha('#FFFFFF', 0.1),
    error: {
      main: '#FF6B6B',
    },
    success: {
      main: '#4ADE80',
    },
    warning: {
      main: goldAccent,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${goldAccent} 0%, ${goldDark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${goldLight} 0%, ${goldAccent} 100%)`,
          },
        },
        outlinedPrimary: {
          borderColor: goldAccent,
          '&:hover': {
            borderColor: goldLight,
            backgroundColor: alpha(goldAccent, 0.1),
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: alpha('#FFFFFF', 0.05),
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(goldAccent, 0.5),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: goldAccent,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: darkCard,
          borderRadius: 16,
          border: `1px solid ${alpha('#FFFFFF', 0.1)}`,
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(darkBg, 0.9),
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${alpha('#FFFFFF', 0.1)}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: darkSurface,
          borderRight: `1px solid ${alpha('#FFFFFF', 0.1)}`,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(darkBg, 0.95),
          backdropFilter: 'blur(10px)',
          borderTop: `1px solid ${alpha('#FFFFFF', 0.1)}`,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: alpha('#FFFFFF', 0.5),
          '&.Mui-selected': {
            color: goldAccent,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        filled: {
          backgroundColor: alpha(goldAccent, 0.2),
          color: goldAccent,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: darkCard,
          borderRadius: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            color: goldAccent,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: goldAccent,
        },
      },
    },
  },
});
