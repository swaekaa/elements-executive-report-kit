import React from 'react';
import { Row, Column, Heading, Paragraph, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  logoText?: string;
  theme: Theme;
}

/**
 * Document header with logo area, title, and optional metadata.
 * Uses Row/Column/Heading/Paragraph from Elements.
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  date,
  logoText,
  theme,
}) => {
  const t = theme;

  return (
    <Row backgroundColor={t.colors.background} padding="24px 0 16px 0">
      <Column>
        {logoText && (
          <Html
            html={`
              <div style="
                font-family: ${t.typography.fontFamily};
                font-size: ${t.typography.fontSize.sm};
                font-weight: ${t.typography.fontWeight.semibold};
                color: ${t.colors.textMuted};
                text-transform: uppercase;
                letter-spacing: 1.5px;
                margin-bottom: 8px;
              ">${logoText}</div>
            `}
          />
        )}
        <Heading
          headingType="h1"
          fontSize={t.typography.fontSize['3xl']}
          color={t.colors.textPrimary}
          textAlign="left"
        >
          {title}
        </Heading>
        {subtitle && (
          <Paragraph fontSize={t.typography.fontSize.lg} color={t.colors.textSecondary}>
            {subtitle}
          </Paragraph>
        )}
        {date && (
          <Paragraph fontSize={t.typography.fontSize.sm} color={t.colors.textMuted}>
            {date}
          </Paragraph>
        )}
      </Column>
    </Row>
  );
};
