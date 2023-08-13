import { createTheme, responsiveFontSizes, adaptV4Theme } from '@mui/material/styles';

// Create a theme instance.
var mainTheme = createTheme(adaptV4Theme({
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
    secondary: {
      main: '#b31b1b',
    },
  },
}));

mainTheme = responsiveFontSizes(mainTheme);

export default mainTheme;
