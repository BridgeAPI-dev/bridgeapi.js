import { createMuiTheme } from '@material-ui/core/styles';

require('typeface-open-sans');

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#184d47',
    },
    secondary: {
      main: '#96bb7c',
    },
    lightGreen: {
      main: '#d6efc7',
    },
    lightGrey: {
      main: '#e8e8e8',
    },
    darkGrey: {
      main: '#a6a6a4',
    },
    background: {
      default: '#F5F8FB',
    },
  },
  typography: {
    fontFamily: [
      'Open Sans',
    ],
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Open Sans',
      },
    },
    MuiButton: {
      // Name of the rule
      outlinedSecondary: {
        // Some CSS
        border: '2px solid #96bb7c',
        fontWeight: 600,
        '&:hover': {
          border: '2px solid #96bb7c',
          boxShadow: '0px 2px 2px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.04),0px 1px 1px 0px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

export default theme;
