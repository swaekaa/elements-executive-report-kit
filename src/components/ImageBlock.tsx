import React from 'react';
import { Row, Column, Image, Paragraph } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  theme: Theme;
}

/**
 * Image with optional caption.
 * Uses the Elements Image and Paragraph components.
 */
export const ImageBlock: React.FC<ImageBlockProps> = ({
  src,
  alt,
  caption,
  width = '100%',
  theme,
}) => {
  const t = theme;

  return (
    <Row backgroundColor={t.colors.background} padding={`${t.spacing.md} 0`}>
      <Column>
        <Image src={src} alt={alt} width={width} />
        {caption && (
          <Paragraph
            fontSize={t.typography.fontSize.sm}
            color={t.colors.textMuted}
            textAlign="center"
          >
            {caption}
          </Paragraph>
        )}
      </Column>
    </Row>
  );
};
