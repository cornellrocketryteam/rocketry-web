import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Create a theme instance.
var mainTheme = createMuiTheme({
  typography:{
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
    h4:{
      fontWeight: 800,
    },
    h5: {
      color: '#bbbbbb'
    },
  },
  palette: {
    type: 'dark',
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

export const adminTheme = createMuiTheme({
  
  palette: {
    type: 'dark',
    background: {
      default: '#161c24',
    }
  },
});