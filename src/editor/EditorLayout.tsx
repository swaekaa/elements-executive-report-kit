import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { LivePreview } from '../preview/LivePreview';
import { TopToolbar } from './TopToolbar';
import { CommandPalette } from './CommandPalette';
import { StatusBar } from './StatusBar';
import { useDocumentState } from '../hooks/useDocumentState';
import { ComponentLibrary } from './ComponentLibrary';
import { Folder, Package, Settings } from 'lucide-react';

const ActivityBar: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  
  const NavItem: React.FC<{ id: 'explorer' | 'components', icon: React.ReactNode, title: string }> = ({ id, icon, title }) => {
    const isActive = state.leftSidebarOpen && state.activeLeftPanel === id;
    return (
      <button
        title={title}
        onClick={() => {
          if (isActive) {
            dispatch({ type: 'SET_SIDEBARS', payload: { left: false } });
          } else {
            dispatch({ type: 'SET_LEFT_PANEL', payload: id });
          }
        }}
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          borderLeft: isActive ? '2px solid #FFFFFF' : '2px solid transparent',
          color: isActive ? '#FFFFFF' : '#858585',
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#858585'; }}
      >
        {icon}
      </button>
    );
  };

  return (
    <div style={{
      width: '48px',
      height: '100%',
      backgroundColor: '#333333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '8px',
      borderRight: '1px solid #252526'
    }}>
      <NavItem id="explorer" icon={<Folder size={24} />} title="Project Explorer" />
      <NavItem id="components" icon={<Package size={24} />} title="Component Library" />
      <div style={{ flex: 1 }} />
      <button style={{
        width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent', border: 'none', color: '#858585', cursor: 'pointer'
      }} title="Settings">
        <Settings size={24} />
      </button>
    </div>
  );
};

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
        <ActivityBar />
        {state.leftSidebarOpen && (
          state.activeLeftPanel === 'explorer' ? <LeftSidebar /> : <ComponentLibrary />
        )}
        <LivePreview />
        {state.rightSidebarOpen && <RightSidebar />}
      </div>
      <StatusBar />
    </div>
  );
};
