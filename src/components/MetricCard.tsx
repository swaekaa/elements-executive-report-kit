import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  theme: Theme;
}

/**
 * KPI/metric display card with label, value, and optional change indicator.
 * Uses Html component for custom card styling within Row/Column.
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changeType = 'neutral',
  theme,
}) => {
  const t = theme;

  const changeColor =
    changeType === 'positive'
      ? t.colors.semantic.success
      : changeType === 'negative'
        ? t.colors.semantic.danger
        : t.colors.textMuted;

  const changePrefix = changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '';

  return (
    <Row backgroundColor={t.colors.background} padding="0">
      <Column>
        <Html
          html={`
            <div style="
              background: ${t.colors.surface};
              border: 1px solid ${t.colors.border};
              border-radius: ${t.borders.radius.lg};
              padding: 24px;
              font-family: ${t.typography.fontFamily};
            ">
              <div style="
                font-size: ${t.typography.fontSize.sm};
                color: ${t.colors.textMuted};
                font-weight: ${t.typography.fontWeight.medium};
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              ">${label}</div>
              <div style="
                font-size: ${t.typography.fontSize['3xl']};
                font-weight: ${t.typography.fontWeight.bold};
                color: ${t.colors.textPrimary};
                line-height: ${t.typography.lineHeight.tight};
              ">${value}</div>
              ${
                change
                  ? `<div style="
                      font-size: ${t.typography.fontSize.sm};
                      color: ${changeColor};
                      font-weight: ${t.typography.fontWeight.medium};
                      margin-top: 8px;
                    ">${changePrefix} ${change}</div>`
                  : ''
              }
            </div>
          `}
        />
      </Column>
    </Row>
  );
};

export interface MetricCardGridProps {
  metrics: MetricCardProps[];
  theme: Theme;
}

/**
 * Grid of metric cards rendered in rows of two.
 */
export const MetricCardGrid: React.FC<MetricCardGridProps> = ({ metrics, theme }) => {
  const t = theme;
  const rows: MetricCardProps[][] = [];

  for (let i = 0; i < metrics.length; i += 2) {
    rows.push(metrics.slice(i, i + 2));
  }

  return (
    <>
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex} backgroundColor={t.colors.background} padding="8px 0" cells={[1, 1]}>
          {row.map((metric, colIndex) => (
            <Column key={colIndex}>
              <Html
                html={`
                  <div style="
                    background: ${t.colors.surface};
                    border: 1px solid ${t.colors.border};
                    border-radius: ${t.borders.radius.lg};
                    padding: 24px;
                    font-family: ${t.typography.fontFamily};
                    ${colIndex === 0 ? 'margin-right: 8px;' : 'margin-left: 8px;'}
                  ">
                    <div style="
                      font-size: ${t.typography.fontSize.sm};
                      color: ${t.colors.textMuted};
                      font-weight: ${t.typography.fontWeight.medium};
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                      margin-bottom: 8px;
                    ">${metric.label}</div>
                    <div style="
                      font-size: ${t.typography.fontSize['3xl']};
                      font-weight: ${t.typography.fontWeight.bold};
                      color: ${t.colors.textPrimary};
                      line-height: ${t.typography.lineHeight.tight};
                    ">${metric.value}</div>
                    ${
                      metric.change
                        ? `<div style="
                            font-size: ${t.typography.fontSize.sm};
                            color: ${
                              metric.changeType === 'positive'
                                ? t.colors.semantic.success
                                : metric.changeType === 'negative'
                                  ? t.colors.semantic.danger
                                  : t.colors.textMuted
                            };
                            font-weight: ${t.typography.fontWeight.medium};
                            margin-top: 8px;
                          ">${metric.changeType === 'positive' ? '↑' : metric.changeType === 'negative' ? '↓' : ''} ${metric.change}</div>`
                        : ''
                    }
                  </div>
                `}
              />
            </Column>
          ))}
        </Row>
      ))}
    </>
  );
};
