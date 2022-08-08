import type { CSSProperties } from 'react';
import { alpha, createTheme } from '@mui/material';
import type { ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    code: CSSProperties;
  }

  interface TypographyVariantsOptions {
    code?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}

const blissDarkOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    text: {
      primary: '#EBEDFF',
      secondary: '#8086A0',
    },
    background: {
      default: '#070A1B',
      paper: '#070A1B',
    },
    divider: alpha('#D1D7FF', 0.15),
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h5: {
      fontFamily: "'Outfit', sans-serif",
    },
    subtitle2: {},
    code: {
      fontFamily: "'Source Code Pro', monospace",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
  },
};

const yourApplicationOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00A0BC',
    },
    background: {
      paper: '#F9F9FF',
    },
    grey: {
      '200': '#EAEDFF',
      '300': '#C4C8E0',
    },
  },
  typography: blissDarkOptions.typography,
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit',
        },
      },
    },
  },
};

const blissDark = createTheme(blissDarkOptions);
const yourApplication = createTheme(yourApplicationOptions);

export { blissDarkOptions, blissDark, yourApplication, yourApplicationOptions };
