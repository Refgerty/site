import { createTheme, ThemeOptions } from '@mui/material/styles';

// Custom color palette
const palette = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#000000',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

// Typography configuration
const typography = {
  fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.4,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: 'none' as const,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    textTransform: 'uppercase' as const,
  },
};

// Spacing configuration
const spacing = 8;

// Shape configuration
const shape = {
  borderRadius: 8,
};

// Shadow configuration
const shadows = [
  'none',
  '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
  '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)',
  '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
  '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
  '0px 19px 38px rgba(0, 0, 0, 0.30), 0px 15px 12px rgba(0, 0, 0, 0.22)',
] as const;

// Component style overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none' as const,
        fontWeight: 500,
        padding: '8px 16px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
      containedPrimary: {
        backgroundColor: palette.primary.main,
        '&:hover': {
          backgroundColor: palette.primary.dark,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      elevation1: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          '& fieldset': {
            borderColor: palette.grey[300],
          },
          '&:hover fieldset': {
            borderColor: palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.primary.main,
            borderWidth: 2,
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        fontWeight: 500,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#ffffff',
        color: palette.grey[800],
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        backgroundColor: '#fafafa',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        margin: '4px 8px',
        '&.Mui-selected': {
          backgroundColor: `${palette.primary.main}15`,
          color: palette.primary.main,
          '&:hover': {
            backgroundColor: `${palette.primary.main}25`,
          },
        },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: palette.grey[50],
        '& .MuiTableCell-head': {
          fontWeight: 600,
          color: palette.grey[700],
          borderBottom: `1px solid ${palette.grey[200]}`,
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: palette.grey[50],
        },
        '&.Mui-selected': {
          backgroundColor: `${palette.primary.main}08`,
          '&:hover': {
            backgroundColor: `${palette.primary.main}12`,
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        '& .MuiSnackbarContent-root': {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: palette.grey[800],
        borderRadius: 6,
        fontSize: '0.75rem',
        fontWeight: 500,
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: palette.primary.main,
          '& + .MuiSwitch-track': {
            backgroundColor: palette.primary.main,
          },
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        '&.Mui-checked': {
          color: palette.primary.main,
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        '&.Mui-checked': {
          color: palette.primary.main,
        },
      },
    },
  },
};

// Light theme configuration
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    ...palette,
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography,
  spacing,
  shape,
  shadows: shadows as any,
  components,
};

// Dark theme configuration
const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...palette,
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
  },
  typography,
  spacing,
  shape,
  shadows: shadows as any,
  components: {
    ...components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: 'rgba(255, 255, 255, 0.87)',
          boxShadow: '0px 1px 3px rgba(255, 255, 255, 0.12)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: '#1e1e1e',
        },
      },
    },
  },
};

// Create the theme
const theme = createTheme(lightTheme);

// Export both light and dark themes
export const lightMuiTheme = createTheme(lightTheme);
export const darkMuiTheme = createTheme(darkTheme);

export default theme;