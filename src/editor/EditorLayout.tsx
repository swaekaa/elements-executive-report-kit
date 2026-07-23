import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { LivePreview } from '../preview/LivePreview';

export const EditorLayout: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundColor: 'var(--color-bg)',
      fontFamily: 'var(--font-family)'
    }}>
      <LeftSidebar />
      <LivePreview />
      <RightSidebar />
    </div>
  );
};
