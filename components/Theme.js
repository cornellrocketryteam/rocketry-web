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
    secondary: {
      main: '#b22025',
    },
  },
});

mainTheme = responsiveFontSizes(mainTheme);

export default mainTheme;
