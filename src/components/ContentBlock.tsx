import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface ContentBlockProps {
  children: string;
  theme: Theme;
}

/**
 * Simple paragraph content block.
 * Uses Paragraph within Row/Column from Elements.
 */
export const ContentBlock: React.FC<ContentBlockProps> = ({ children, theme }) => {
  const t = theme;

  return (
    <Row backgroundColor={t.colors.background} padding="4px 0">
      <Column>
        <Html
          content={`
            <div style="font-family: ${t.typography.fontFamily}; font-size: ${t.typography.fontSize.base}; color: ${t.colors.textSecondary}; line-height: 1.6;">
              ${children}
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
