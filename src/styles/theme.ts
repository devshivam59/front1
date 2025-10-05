import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#38b6ff'
    },
    secondary: {
      main: '#64ffda'
    },
    background: {
      default: '#0b101a',
      paper: '#111827'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'linear-gradient(145deg, rgba(21,27,41,0.95), rgba(10,13,20,0.9))',
          border: '1px solid rgba(99, 102, 241, 0.12)',
          boxShadow: '0 18px 45px rgba(15,23,42,0.45)'
        }
      }
    }
  }
});

export default theme;
