import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';
import { badgeHtml } from './Badge';

export interface RecommendationCardProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
  theme: Theme;
}

/**
 * Card for actionable recommendations with priority indicator.
 * Uses Html within Row/Column from Elements.
 */
export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  priority,
  category,
  theme,
}) => {
  const t = theme;

  const priorityVariant =
    priority === 'high' ? 'danger' : priority === 'medium' ? 'warning' : 'info';

  return (
    <Row backgroundColor={t.colors.background} padding="6px 0">
      <Column>
        <Html
          html={`
            <div style="
              background: ${t.colors.surface};
              border: 1px solid ${t.colors.border};
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
                ${badgeHtml(priority, priorityVariant as 'danger' | 'warning' | 'info', t)}
                ${category ? `<span style="
                  font-size: ${t.typography.fontSize.xs};
                  color: ${t.colors.textMuted};
                ">${category}</span>` : ''}
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
              ">${description}</div>
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
