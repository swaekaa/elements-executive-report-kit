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
  styleOverrides?: {
    backgroundColor?: string;
    color?: string;
  };
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
  styleOverrides = {},
}) => {
  const t = theme;
  const bgColor = styleOverrides.backgroundColor || t.colors.neutral[950];
  const textColor = styleOverrides.color || '#FFFFFF';
  const subtitleColor = styleOverrides.color ? styleOverrides.color : t.colors.neutral[400];

  return (
    <Row backgroundColor={bgColor} padding="64px 0 56px 0">
      <Column>
        {organization && (
          <Html
            html={`
              <div style="
                font-family: ${t.typography.fontFamily.replace(/['"]/g, '')};
                font-size: ${t.typography.fontSize.sm};
                font-weight: ${t.typography.fontWeight.semibold};
                color: ${subtitleColor};
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
          color={textColor}
          textAlign="left"
        >
          {title}
        </Heading>
        {subtitle && (
          <Paragraph fontSize={t.typography.fontSize.xl} color={subtitleColor}>
            {subtitle}
          </Paragraph>
        )}
        <Html
          html={`
            <div style="
              margin-top: 32px;
              font-family: ${t.typography.fontFamily.replace(/['"]/g, '')};
              font-size: ${t.typography.fontSize.sm};
              color: ${textColor};
              line-height: ${t.typography.lineHeight.relaxed};
            ">
              ${author ? `<div style="margin-bottom: 4px;"><span style="opacity: 0.6; font-weight: ${t.typography.fontWeight.medium}; margin-right: 6px;">Author:</span> <span style="opacity: 0.95;">${author}</span></div>` : ''}
              ${date ? `<div style="margin-bottom: 4px;"><span style="opacity: 0.6; font-weight: ${t.typography.fontWeight.medium}; margin-right: 6px;">Date:</span> <span style="opacity: 0.95;">${date}</span></div>` : ''}
              ${version ? `<div><span style="opacity: 0.6; font-weight: ${t.typography.fontWeight.medium}; margin-right: 6px;">Version:</span> <span style="opacity: 0.95;">${version}</span></div>` : ''}
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
