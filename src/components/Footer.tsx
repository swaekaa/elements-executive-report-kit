import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface FooterProps {
  text: string;
  secondaryText?: string;
  theme: Theme;
}

/**
 * Document footer with divider line and text.
 * Uses Row/Column/Html from Elements.
 */
export const Footer: React.FC<FooterProps> = ({ text, secondaryText, theme }) => {
  const t = theme;

  return (
    <Row backgroundColor={t.colors.background} padding="24px 0 32px 0">
      <Column>
        <Html
          html={`
            <div style="
              border-top: 1px solid ${t.colors.border};
              padding-top: 20px;
              font-family: ${t.typography.fontFamily};
              font-size: ${t.typography.fontSize.xs};
              color: ${t.colors.textMuted};
              line-height: ${t.typography.lineHeight.normal};
            ">
              <div>${text}</div>
              ${secondaryText ? `<div style="margin-top: 4px;">${secondaryText}</div>` : ''}
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
