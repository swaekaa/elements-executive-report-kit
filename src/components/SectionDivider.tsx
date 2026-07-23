import React from 'react';
import { Row, Column, Divider } from '@unlayer/react-elements';
import type { Theme } from '../theme';

export interface SectionDividerProps {
  theme: Theme;
}

/**
 * Visual divider between document sections.
 * Uses the Elements Divider component.
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({ theme }) => {
  return (
    <Row backgroundColor={theme.colors.background} padding={`${theme.spacing.lg} 0`}>
      <Column>
        <Divider />
      </Column>
    </Row>
  );
};
