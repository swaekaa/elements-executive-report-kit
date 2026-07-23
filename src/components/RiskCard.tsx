import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';
import { badgeHtml, type BadgeVariant } from './Badge';

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface RiskCardProps {
  title: string;
  description: string;
  severity: Severity;
  id?: string;
  affectedArea?: string;
  theme: Theme;
}

/**
 * Security risk/severity card with colored severity indicator.
 * Uses Html within Row/Column from Elements.
 */
export const RiskCard: React.FC<RiskCardProps> = ({
  title,
  description,
  severity,
  id,
  affectedArea,
  theme,
}) => {
  const t = theme;

  const severityConfig: Record<Severity, { variant: BadgeVariant; accent: string }> = {
    critical: { variant: 'danger', accent: t.colors.semantic.danger },
    high: { variant: 'danger', accent: t.colors.semantic.danger },
    medium: { variant: 'warning', accent: t.colors.semantic.warning },
    low: { variant: 'info', accent: t.colors.semantic.info },
    info: { variant: 'default', accent: t.colors.textMuted },
  };

  const config = severityConfig[severity];

  return (
    <Row backgroundColor={t.colors.background} padding="6px 0">
      <Column>
        <Html
          html={`
            <div style="
              background: ${t.colors.surface};
              border: 1px solid ${t.colors.border};
              border-left: 4px solid ${config.accent};
              border-radius: ${t.borders.radius.lg};
              padding: 20px 24px;
              font-family: ${t.typography.fontFamily};
            ">
              <div style="
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 8px;
              ">
                ${badgeHtml(severity.toUpperCase(), config.variant, t)}
                ${id ? `<span style="
                  font-size: ${t.typography.fontSize.xs};
                  color: ${t.colors.textMuted};
                  font-family: ${t.typography.fontFamilyMono};
                ">${id}</span>` : ''}
              </div>
              <div style="
                font-size: ${t.typography.fontSize.base};
                font-weight: ${t.typography.fontWeight.semibold};
                color: ${t.colors.textPrimary};
                margin-bottom: 6px;
              ">${title}</div>
              <div style="
                font-size: ${t.typography.fontSize.sm};
                color: ${t.colors.textSecondary};
                line-height: ${t.typography.lineHeight.normal};
                margin-bottom: 8px;
              ">${description}</div>
              ${affectedArea ? `<div style="
                font-size: ${t.typography.fontSize.xs};
                color: ${t.colors.textMuted};
              ">Affected: ${affectedArea}</div>` : ''}
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
