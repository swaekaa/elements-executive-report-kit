import type { Theme } from '../theme';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  theme: Theme;
}

/**
 * Inline status badge/tag.
 * Returns an HTML string for embedding within Html components.
 *
 * Usage:
 * ```
 * import { badgeHtml } from './Badge';
 * const html = badgeHtml('High', 'danger', theme);
 * ```
 */
export function badgeHtml(label: string, variant: BadgeVariant, theme: Theme): string {
  const t = theme;

  const variantMap: Record<BadgeVariant, { bg: string; color: string }> = {
    default: { bg: t.colors.surfaceAlt, color: t.colors.textSecondary },
    success: { bg: t.colors.semantic.successLight, color: t.colors.semantic.success },
    warning: { bg: t.colors.semantic.warningLight, color: t.colors.semantic.warning },
    danger: { bg: t.colors.semantic.dangerLight, color: t.colors.semantic.danger },
    info: { bg: t.colors.semantic.infoLight, color: t.colors.semantic.info },
  };

  const v = variantMap[variant];

  return `<span style="
    display: inline-block;
    font-family: ${t.typography.fontFamily};
    font-size: ${t.typography.fontSize.xs};
    font-weight: ${t.typography.fontWeight.semibold};
    color: ${v.color};
    background: ${v.bg};
    padding: 3px 10px;
    border-radius: ${t.borders.radius.full};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  ">${label}</span>`;
}
