import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface DataTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
  theme: Theme;
}

/**
 * Styled data table component.
 * Uses Html within Row/Column for consistent cross-platform table rendering.
 */
export const DataTable: React.FC<DataTableProps> = ({ headers, rows, caption, theme }) => {
  const t = theme;

  const headerCells = headers
    .map(
      (h) => `
      <th style="
        font-family: ${t.typography.fontFamily};
        font-size: ${t.typography.fontSize.sm};
        font-weight: ${t.typography.fontWeight.semibold};
        color: ${t.colors.textSecondary};
        background: ${t.colors.surface};
        text-align: left;
        padding: 16px;
        border: 1px solid ${t.colors.border};
        border-bottom: 2px solid ${t.colors.border};
        text-transform: uppercase;
        letter-spacing: 0.5px;
      ">${h}</th>
    `
    )
    .join('');

  const bodyRows = rows
    .map(
      (row, rowIndex) => `
      <tr>
        ${row
          .map(
            (cell) => `
          <td style="
            font-family: ${t.typography.fontFamily};
            font-size: ${t.typography.fontSize.sm};
            color: ${t.colors.textPrimary};
            padding: 16px;
            border: 1px solid ${t.colors.border};
            background: ${t.colors.background};
            vertical-align: top;
            line-height: 1.6;
          ">${cell}</td>
        `
          )
          .join('')}
      </tr>
    `
    )
    .join('');

  return (
    <Row backgroundColor={t.colors.background} padding={`${t.spacing.md} 0`}>
      <Column>
        <Html
          html={`
            <div style="
              border: 1px solid ${t.colors.border};
              border-radius: ${t.borders.radius.lg};
              overflow: hidden;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            ">
              ${caption ? `<div style="
                font-family: ${t.typography.fontFamily};
                font-size: ${t.typography.fontSize.sm};
                color: ${t.colors.textMuted};
                padding: 12px 16px;
                background: ${t.colors.surface};
                border-bottom: 1px solid ${t.colors.border};
              ">${caption}</div>` : ''}
              <table role="table" style="
                width: 100%;
                border-collapse: collapse;
              ">
                <thead>
                  <tr>${headerCells}</tr>
                </thead>
                <tbody>
                  ${bodyRows}
                </tbody>
              </table>
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
