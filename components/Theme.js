import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

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
    type: 'dark',
    background: {
      default: '#000000',
    },
    secondary: {
      main: '#b31b1b',
    },
  },
});

mainTheme = responsiveFontSizes(mainTheme);

export default mainTheme;
