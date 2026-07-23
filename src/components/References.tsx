import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface ReferenceItem {
  id: string;
  text: string;
  url?: string;
}

export interface ReferencesProps {
  items: ReferenceItem[];
  theme: Theme;
}

/**
 * Reference/bibliography list with numbered entries and optional links.
 * Uses Html within Row/Column from Elements.
 */
export const References: React.FC<ReferencesProps> = ({ items, theme }) => {
  const t = theme;

  const refsHtml = items
    .map(
      (item) => `
      <div style="
        display: flex;
        margin-bottom: 10px;
        font-family: ${t.typography.fontFamily};
        font-size: ${t.typography.fontSize.sm};
        line-height: ${t.typography.lineHeight.normal};
      ">
        <div style="
          width: 32px;
          flex-shrink: 0;
          color: ${t.colors.textMuted};
          font-weight: ${t.typography.fontWeight.medium};
        ">[${item.id}]</div>
        <div style="
          flex: 1;
          color: ${t.colors.textSecondary};
        ">
          ${item.text}
          ${item.url ? ` <a href="${item.url}" style="color: ${t.colors.semantic.info}; text-decoration: none;">${item.url}</a>` : ''}
        </div>
      </div>
    `
    )
    .join('');

  return (
    <Row backgroundColor={t.colors.background} padding={`${t.spacing.md} 0`}>
      <Column>
        <Html html={`<div>${refsHtml}</div>`} />
      </Column>
    </Row>
  );
};
