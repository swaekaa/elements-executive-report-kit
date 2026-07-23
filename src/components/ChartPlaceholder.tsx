import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface ChartBar {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export interface ChartPlaceholderProps {
  title?: string;
  bars: ChartBar[];
  theme: Theme;
}

/**
 * Horizontal bar chart visualization using inline HTML/CSS.
 * No external charting library — pure CSS bars within Elements Html.
 */
export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  title,
  bars,
  theme,
}) => {
  const t = theme;
  const maxVal = Math.max(...bars.map((b) => b.maxValue ?? b.value));

  const barsHtml = bars
    .map((bar) => {
      const percentage = maxVal > 0 ? (bar.value / maxVal) * 100 : 0;
      const color = bar.color ?? t.colors.textPrimary;

      return `
        <div style="
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-family: ${t.typography.fontFamily};
        ">
          <div style="
            width: 120px;
            flex-shrink: 0;
            font-size: ${t.typography.fontSize.sm};
            color: ${t.colors.textSecondary};
            padding-right: 12px;
            text-align: right;
          ">${bar.label}</div>
          <div style="
            flex: 1;
            height: 24px;
            background: ${t.colors.surfaceAlt};
            border-radius: ${t.borders.radius.sm};
            overflow: hidden;
          ">
            <div style="
              width: ${percentage}%;
              height: 100%;
              background: ${color};
              border-radius: ${t.borders.radius.sm};
              transition: width 0.3s ease;
            "></div>
          </div>
          <div style="
            width: 60px;
            flex-shrink: 0;
            font-size: ${t.typography.fontSize.sm};
            font-weight: ${t.typography.fontWeight.semibold};
            color: ${t.colors.textPrimary};
            padding-left: 12px;
            text-align: right;
          ">${bar.value}</div>
        </div>
      `;
    })
    .join('');

  return (
    <Row backgroundColor={t.colors.background} padding={`${t.spacing.md} 0`}>
      <Column>
        <Html
          html={`
            <div style="
              background: ${t.colors.surface};
              border: 1px solid ${t.colors.border};
              border-radius: ${t.borders.radius.lg};
              padding: 24px;
            ">
              ${
                title
                  ? `<div style="
                      font-family: ${t.typography.fontFamily};
                      font-size: ${t.typography.fontSize.base};
                      font-weight: ${t.typography.fontWeight.semibold};
                      color: ${t.colors.textPrimary};
                      margin-bottom: 20px;
                    ">${title}</div>`
                  : ''
              }
              ${barsHtml}
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
