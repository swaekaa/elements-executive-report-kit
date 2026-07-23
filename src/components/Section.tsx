import React from 'react';
import { Row, Column, Heading, Paragraph } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  sectionNumber?: string;
  children: React.ReactNode;
  theme: Theme;
  styleOverrides?: {
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

/**
 * Reusable section wrapper with title, optional subtitle, and content slot.
 * Provides consistent spacing and heading hierarchy.
 */
export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  sectionNumber,
  children,
  theme,
  styleOverrides = {},
}) => {
  const t = theme;
  const displayTitle = sectionNumber ? `${sectionNumber}. ${title}` : title;

  const bgColor = styleOverrides.backgroundColor || t.colors.background;
  const padding = styleOverrides.padding || `${t.spacing.section} 0 ${t.spacing.md} 0`;
  const align = styleOverrides.textAlign || 'left';

  return (
    <>
      <Row backgroundColor={bgColor} padding={padding}>
        <Column>
          <Heading
            headingType="h2"
            fontSize={t.typography.fontSize['2xl']}
            color={t.colors.textPrimary}
            textAlign={align}
          >
            {displayTitle}
          </Heading>
          {subtitle && (
            <Paragraph fontSize={t.typography.fontSize.base} color={t.colors.textSecondary}>
              {subtitle}
            </Paragraph>
          )}
        </Column>
      </Row>
      {children}
    </>
  );
};
