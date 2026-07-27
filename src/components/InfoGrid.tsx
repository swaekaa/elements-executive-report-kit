import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface InfoGridProps {
  items: { label: string; value: string }[];
  theme: Theme;
}

/**
 * A responsive grid of key-value pairs.
 * Great for showing metadata at the top of a report (e.g. Date, Author, Version).
 */
export const InfoGrid: React.FC<InfoGridProps> = ({ items, theme }) => {
  const t = theme;

  const htmlContent = `
    <div style="display: flex; flex-wrap: wrap; gap: 24px; padding: 16px; background-color: ${t.colors.surface}; border-top: 1px solid ${t.colors.border}; border-bottom: 1px solid ${t.colors.border}; margin-bottom: 24px;">
      ${items.map(item => `
        <div style="flex: 1; min-width: 150px;">
          <div style="font-size: ${t.typography.fontSize.xs}; color: ${t.colors.textMuted}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; font-family: ${t.typography.fontFamily}; font-weight: 600;">
            ${item.label}
          </div>
          <div style="font-size: ${t.typography.fontSize.sm}; color: ${t.colors.textPrimary}; font-family: ${t.typography.fontFamily};">
            ${item.value}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  return (
    <Row backgroundColor={t.colors.background} padding="0">
      <Column>
        <Html html={htmlContent} />
      </Column>
    </Row>
  );
};
