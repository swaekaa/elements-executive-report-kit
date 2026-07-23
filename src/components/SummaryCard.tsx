import React from 'react';
import { Row, Column, Heading, Paragraph, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface SummaryCardProps {
  title: string;
  summary: string;
  highlights?: string[];
  theme: Theme;
}

/**
 * A prominent summary card for the beginning of a report.
 * Uses a subtle background and border to stand out.
 */
export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  summary,
  highlights,
  theme,
}) => {
  const t = theme;

  // Since we can't easily add borders/radius directly to a Row without it affecting the email layout,
  // we use an Html wrapper to create a styled container, and then we put the text inside.
  // Wait, Elements Html component is a block. We can put the whole summary in there to look premium.
  const htmlContent = `
    <div style="background-color: ${t.colors.semantic.info}10; border-left: 4px solid ${t.colors.semantic.info}; padding: 24px; border-radius: 4px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 12px 0; font-size: ${t.typography.fontSize.lg}; color: ${t.colors.textPrimary}; font-family: ${t.typography.fontFamily}; font-weight: 600;">
        ${title}
      </h3>
      <p style="margin: 0 0 ${highlights && highlights.length > 0 ? '16px' : '0'} 0; font-size: ${t.typography.fontSize.base}; color: ${t.colors.textSecondary}; font-family: ${t.typography.fontFamily}; line-height: 1.6;">
        ${summary}
      </p>
      ${highlights && highlights.length > 0 ? `
        <ul style="margin: 0; padding-left: 20px; color: ${t.colors.textSecondary}; font-family: ${t.typography.fontFamily}; font-size: ${t.typography.fontSize.sm};">
          ${highlights.map(h => `<li style="margin-bottom: 8px;">${h}</li>`).join('')}
        </ul>
      ` : ''}
    </div>
  `;

  return (
    <Row backgroundColor={t.colors.background} padding="0">
      <Column>
        <Html content={htmlContent} />
      </Column>
    </Row>
  );
};
