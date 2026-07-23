import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface QuoteProps {
  text: string;
  attribution?: string;
  theme: Theme;
}

/**
 * Blockquote-style component for highlighted quotes or callouts.
 * Uses Html within Row/Column from Elements.
 */
export const Quote: React.FC<QuoteProps> = ({ text, attribution, theme }) => {
  const t = theme;

  return (
    <Row backgroundColor={t.colors.background} padding={`${t.spacing.md} 0`}>
      <Column>
        <Html
          html={`
            <blockquote style="
              margin: 0;
              padding: 16px 24px;
              border-left: 3px solid ${t.colors.neutral[300]};
              font-family: ${t.typography.fontFamily};
            ">
              <div style="
                font-size: ${t.typography.fontSize.lg};
                color: ${t.colors.textSecondary};
                font-style: italic;
                line-height: ${t.typography.lineHeight.relaxed};
              ">${text}</div>
              ${attribution ? `<div style="
                font-size: ${t.typography.fontSize.sm};
                color: ${t.colors.textMuted};
                margin-top: 8px;
                font-style: normal;
              ">— ${attribution}</div>` : ''}
            </blockquote>
          `}
        />
      </Column>
    </Row>
  );
};
