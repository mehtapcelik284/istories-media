import { Platform } from 'react-native';

const palette = {
  brand:   { 50: '#E6F4FE', 500: '#0A7EA4', 700: '#065270' },
  neutral: { 0: '#FFFFFF', 50: '#F8F9FA', 100: '#F1F3F5', 200: '#E9ECEF',
             400: '#CED4DA', 500: '#ADB5BD', 600: '#868E96', 700: '#495057',
             900: '#212529' },
  green:   { 100: '#D3F9D8', 500: '#2F9E44', 700: '#1E6E2F' },
  yellow:  { 100: '#FFF3BF', 500: '#F59F00', 700: '#B36A00' },
  red:     { 100: '#FFE3E3', 500: '#E03131', 700: '#9C1F1F' },
  blue:    { 100: '#D0EBFF', 500: '#1971C2', 700: '#0D4F91' },
} as const;

export const Colors = {
  background: {
    primary:   palette.neutral[0],
    secondary: palette.neutral[50],
    tertiary:  palette.neutral[100],
    inverse:   palette.neutral[900],
    overlay:   'rgba(0,0,0,0.5)',
  },
  text: {
    primary:     palette.neutral[900],
    secondary:   palette.neutral[700],
    tertiary:    palette.neutral[600],
    disabled:    palette.neutral[500],
    inverse:     palette.neutral[0],
    link:        palette.brand[500],
    placeholder: palette.neutral[500],
  },
  brand: {
    primary:  palette.brand[500],
    light:    palette.brand[50],
    dark:     palette.brand[700],
    contrast: palette.neutral[0],
  },
  border: {
    default: palette.neutral[200],
    strong:  palette.neutral[400],
    subtle:  palette.neutral[100],
    focus:   palette.brand[500],
  },
  icon: {
    default:  palette.neutral[700],
    subtle:   palette.neutral[500],
    strong:   palette.neutral[900],
    brand:    palette.brand[500],
    inverse:  palette.neutral[0],
    disabled: palette.neutral[400],
  },
  tab: {
    active:   palette.brand[500],
    inactive: palette.neutral[500],
  },
  status: {
    success: { bg: palette.green[100],  fg: palette.green[500],  dark: palette.green[700]  },
    warning: { bg: palette.yellow[100], fg: palette.yellow[500], dark: palette.yellow[700] },
    error:   { bg: palette.red[100],    fg: palette.red[500],    dark: palette.red[700]    },
    info:    { bg: palette.blue[100],   fg: palette.blue[500],   dark: palette.blue[700]   },
  },
} as const;

export type AppColors = typeof Colors;
