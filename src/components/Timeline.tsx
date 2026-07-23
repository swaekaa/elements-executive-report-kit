import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface TimelineItem {
  date: string;
  title: string;
  description?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  theme: Theme;
}

/**
 * Vertical timeline component for milestones and events.
 * Uses Html for timeline styling within Row/Column.
 */
export const Timeline: React.FC<TimelineProps> = ({ items, theme }) => {
  const t = theme;

  const timelineHtml = items
    .map(
      (item, index) => `
      <div style="
        display: flex;
        margin-bottom: ${index < items.length - 1 ? '24px' : '0'};
        font-family: ${t.typography.fontFamily};
      ">
        <div style="
          flex-shrink: 0;
          width: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
        ">
          <div style="
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${t.colors.textPrimary};
            margin-top: 6px;
          "></div>
          ${
            index < items.length - 1
              ? `<div style="
                  width: 1px;
                  flex: 1;
                  background: ${t.colors.border};
                  margin-top: 8px;
                "></div>`
              : ''
          }
        </div>
        <div style="flex: 1; padding-left: 8px;">
          <div style="
            font-size: ${t.typography.fontSize.xs};
            color: ${t.colors.textMuted};
            font-weight: ${t.typography.fontWeight.medium};
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          ">${item.date}</div>
          <div style="
            font-size: ${t.typography.fontSize.base};
            color: ${t.colors.textPrimary};
            font-weight: ${t.typography.fontWeight.semibold};
            margin-bottom: 4px;
          ">${item.title}</div>
          ${
            item.description
              ? `<div style="
                  font-size: ${t.typography.fontSize.sm};
                  color: ${t.colors.textSecondary};
                  line-height: ${t.typography.lineHeight.normal};
                ">${item.description}</div>`
              : ''
          }
        </div>
      </div>
    `
    )
    .join('');

  return (
    <Row backgroundColor={t.colors.background} padding={`${t.spacing.md} 0`}>
      <Column>
        <Html html={`<div>${timelineHtml}</div>`} />
      </Column>
    </Row>
  );
};
