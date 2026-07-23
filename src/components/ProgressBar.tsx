import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  showPercentage?: boolean;
  color?: string;
  theme: Theme;
}

/**
 * Visual progress indicator bar.
 * Uses Html within Row/Column from Elements.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  maxValue = 100,
  showPercentage = true,
  color,
  theme,
}) => {
  const t = theme;
  const percentage = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;
  const barColor = color ?? t.colors.textPrimary;

  return (
    <Row backgroundColor={t.colors.background} padding="6px 0">
      <Column>
        <Html
          html={`
            <div style="
              font-family: ${t.typography.fontFamily};
              margin-bottom: 4px;
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 6px;
              ">
                <span style="
                  font-size: ${t.typography.fontSize.sm};
                  color: ${t.colors.textSecondary};
                ">${label}</span>
                ${showPercentage ? `<span style="
                  font-size: ${t.typography.fontSize.sm};
                  font-weight: ${t.typography.fontWeight.semibold};
                  color: ${t.colors.textPrimary};
                ">${Math.round(percentage)}%</span>` : ''}
              </div>
              <div style="
                height: 8px;
                background: ${t.colors.surfaceAlt};
                border-radius: ${t.borders.radius.full};
                overflow: hidden;
              ">
                <div style="
                  width: ${percentage}%;
                  height: 100%;
                  background: ${barColor};
                  border-radius: ${t.borders.radius.full};
                "></div>
              </div>
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
