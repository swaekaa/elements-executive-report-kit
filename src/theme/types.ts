/**
 * Theme type definitions for the Elements Executive Report Kit.
 * Structured to support Light mode now and Dark mode later.
 */

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  info: string;
  infoLight: string;
}

export interface ThemeColors {
  /** Primary brand color */
  primary: string;
  primaryLight: string;
  /** Neutral palette for text, backgrounds, borders */
  neutral: ColorPalette;
  /** Semantic status colors */
  semantic: SemanticColors;
  /** Page and content backgrounds */
  background: string;
  surface: string;
  surfaceAlt: string;
  /** Text colors */
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  /** Border color */
  border: string;
  borderLight: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyMono: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  section: string;
  page: string;
}

export interface ThemeBorders {
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  width: string;
}

export interface ThemeLayout {
  contentWidth: string;
  narrowWidth: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borders: ThemeBorders;
  layout: ThemeLayout;
}
