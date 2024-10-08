import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance.
var mainTheme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    h4: {
      fontWeight: 800,
    },
    h5: {
      color: '#bbbbbb',
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
    },
    primary: {
      main: '#e0e0e0',
    },
    secondary: {
      main: '#b31b1b',
    },
  },
});

mainTheme = responsiveFontSizes(mainTheme);

export default mainTheme;
