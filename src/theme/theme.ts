import type { Theme } from './types';

/**
 * Light theme — the primary theme for the Elements Executive Report Kit.
 *
 * Inspired by Stripe, Linear, Notion, and OpenAI design systems:
 * generous whitespace, large typography, soft borders, muted palette.
 */
export const lightTheme: Theme = {
  name: 'light',

  colors: {
    primary: '#0A0A0A',
    primaryLight: '#18181B',

    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0A0A0A',
    },

    semantic: {
      success: '#16A34A',
      successLight: '#F0FDF4',
      warning: '#D97706',
      warningLight: '#FFFBEB',
      danger: '#DC2626',
      dangerLight: '#FEF2F2',
      info: '#2563EB',
      infoLight: '#EFF6FF',
    },

    background: '#FFFFFF',
    surface: '#FAFAFA',
    surfaceAlt: '#F5F5F5',

    textPrimary: '#0A0A0A',
    textSecondary: '#525252',
    textMuted: '#A3A3A3',

    border: '#E5E5E5',
    borderLight: '#F5F5F5',
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontFamilyMono: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
    fontSize: {
      xs: '11px',
      sm: '13px',
      base: '15px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
    '3xl': '48px',
    '4xl': '64px',
    section: '40px',
    page: '48px',
  },

  borders: {
    radius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
    width: '1px',
  },

  layout: {
    contentWidth: '800px',
    narrowWidth: '640px',
  },
};

/**
 * Get the current theme. Designed so dark theme can be added later.
 */
export function getTheme(_mode: 'light' | 'dark' = 'light'): Theme {
  // Dark theme placeholder — return light for now
  return lightTheme;
}

export { type Theme } from './types';
