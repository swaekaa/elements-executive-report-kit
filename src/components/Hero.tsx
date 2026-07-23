import React from 'react';
import { Row, Column, Heading, Paragraph, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface HeroProps {
  title: string;
  subtitle?: string;
  date?: string;
  author?: string;
  organization?: string;
  version?: string;
  theme: Theme;
}

/**
 * Full-width cover/hero section for report cover pages.
 * Large title, metadata, and professional styling.
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  date,
  author,
  organization,
  version,
  theme,
}) => {
  const t = theme;

  return (
    <Row backgroundColor={t.colors.neutral[950]} padding="64px 0 56px 0">
      <Column>
        {organization && (
          <Html
            html={`
              <div style="
                font-family: ${t.typography.fontFamily};
                font-size: ${t.typography.fontSize.sm};
                font-weight: ${t.typography.fontWeight.semibold};
                color: ${t.colors.neutral[400]};
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: 24px;
              ">${organization}</div>
            `}
          />
        )}
        <Heading
          headingType="h1"
          fontSize={t.typography.fontSize['5xl']}
          color="#FFFFFF"
          textAlign="left"
        >
          {title}
        </Heading>
        {subtitle && (
          <Paragraph fontSize={t.typography.fontSize.xl} color={t.colors.neutral[400]}>
            {subtitle}
          </Paragraph>
        )}
        <Html
          html={`
            <div style="
              margin-top: 32px;
              font-family: ${t.typography.fontFamily};
              font-size: ${t.typography.fontSize.sm};
              color: ${t.colors.neutral[500]};
              line-height: ${t.typography.lineHeight.relaxed};
            ">
              ${author ? `<div><span style="color: ${t.colors.neutral[400]};">Author:</span> ${author}</div>` : ''}
              ${date ? `<div><span style="color: ${t.colors.neutral[400]};">Date:</span> ${date}</div>` : ''}
              ${version ? `<div><span style="color: ${t.colors.neutral[400]};">Version:</span> ${version}</div>` : ''}
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
