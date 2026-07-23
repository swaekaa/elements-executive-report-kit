import React from 'react';
import { Row, Column, Heading, Paragraph } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface SectionProps {
  title: string;
  subtitle?: string;
  sectionNumber?: string;
  children: React.ReactNode;
  theme: Theme;
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
}) => {
  const t = theme;
  const displayTitle = sectionNumber ? `${sectionNumber}. ${title}` : title;

  return (
    <>
      <Row backgroundColor={t.colors.background} padding={`${t.spacing.section} 0 ${t.spacing.md} 0`}>
        <Column>
          <Heading
            headingType="h2"
            fontSize={t.typography.fontSize['2xl']}
            color={t.colors.textPrimary}
            textAlign="left"
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
