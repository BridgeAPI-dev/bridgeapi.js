import { createMuiTheme } from '@material-ui/core/styles';

require('typeface-open-sans');

const primary = '#184d47';
const secondary = '#96bb7c';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
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
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        '*': {
          boxSizing: 'border-box',
        },
        '.menuLinkItem': {
          textDecoration: 'none',
          margin: 'auto',
        },
      },

    },
    MuiButton: {
      // Name of the rule
      outlinedSecondary: {
        // Some CSS
        border: '2px solid #96bb7c',
        fontWeight: 600,
        '&:hover': {
          border: `2px solid ${primary}`,
          boxShadow: '0px 2px 2px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.04),0px 1px 1px 0px rgba(0,0,0,0.12)',
          color: primary,
        },
      },
      containedSecondary: {
        color: 'white',
        fontWeight: 600,
      },
    },
  },
});

export default theme;
