import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export type CalloutType = 'info' | 'warning' | 'success' | 'danger';

export interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: string;
  theme: Theme;
}

/**
 * Highlighted callout/alert box with semantic color coding.
 * Uses Html within Row/Column from Elements.
 */
export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
  theme,
}) => {
  const t = theme;

  const colorMap: Record<CalloutType, { bg: string; border: string; text: string }> = {
    info: { bg: t.colors.semantic.infoLight, border: t.colors.semantic.info, text: t.colors.semantic.info },
    warning: { bg: t.colors.semantic.warningLight, border: t.colors.semantic.warning, text: t.colors.semantic.warning },
    success: { bg: t.colors.semantic.successLight, border: t.colors.semantic.success, text: t.colors.semantic.success },
    danger: { bg: t.colors.semantic.dangerLight, border: t.colors.semantic.danger, text: t.colors.semantic.danger },
  };

  const colors = colorMap[type];

  return (
    <Row backgroundColor={t.colors.background} padding={`${t.spacing.md} 0`}>
      <Column>
        <Html
          html={`
            <div role="note" style="
              background: ${colors.bg};
              border-left: 4px solid ${colors.border};
              border-radius: ${t.borders.radius.md};
              padding: 16px 20px;
              font-family: ${t.typography.fontFamily};
            ">
              ${
                title
                  ? `<div style="
                      font-size: ${t.typography.fontSize.base};
                      font-weight: ${t.typography.fontWeight.semibold};
                      color: ${colors.text};
                      margin-bottom: 6px;
                    ">${title}</div>`
                  : ''
              }
              <div style="
                font-size: ${t.typography.fontSize.base};
                color: ${t.colors.textPrimary};
                line-height: ${t.typography.lineHeight.normal};
              ">${children}</div>
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
