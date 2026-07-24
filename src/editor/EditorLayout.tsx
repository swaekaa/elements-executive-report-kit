import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { LivePreview } from '../preview/LivePreview';
import { TopToolbar } from './TopToolbar';
import { CommandPalette } from './CommandPalette';
import { StatusBar } from './StatusBar';
import { useDocumentState } from '../hooks/useDocumentState';

export const EditorLayout: React.FC = () => {
  const { state } = useDocumentState();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundColor: 'var(--color-bg)',
      fontFamily: 'var(--font-family)'
    }}>
      <CommandPalette />
      <TopToolbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {state.leftSidebarOpen && <LeftSidebar />}
        <LivePreview />
        {state.rightSidebarOpen && <RightSidebar />}
      </div>
      <StatusBar />
    </div>
  );
};
