import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { LivePreview } from '../preview/LivePreview';
import { TopToolbar } from './TopToolbar';
import { CommandPalette } from './CommandPalette';
import { StatusBar } from './StatusBar';
import { useDocumentState } from '../hooks/useDocumentState';
import { ComponentLibrary } from './ComponentLibrary';
import { ThemeBuilder } from './ThemeBuilder';
import { Folder, Package, Palette, Github } from 'lucide-react';

const ActivityBar: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  
  const NavItem: React.FC<{ id: 'explorer' | 'components' | 'theme', icon: React.ReactNode, title: string }> = ({ id, icon, title }) => {
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
          borderLeft: isActive ? '2px solid #D97706' : '2px solid transparent',
          color: isActive ? '#D97706' : '#A39C8C',
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#D97706'}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#A39C8C'; }}
      >
        {icon}
      </button>
    );
  };

  return (
    <div style={{
      width: '48px',
      height: '100%',
      backgroundColor: '#F0EFE9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '8px',
      borderRight: '1px solid #E6E4DD'
    }}>
      <NavItem id="explorer" icon={<Folder size={24} />} title="Project Explorer" />
      <NavItem id="components" icon={<Package size={24} />} title="Component Library" />
      <NavItem id="theme" icon={<Palette size={24} />} title="Theme Builder" />
      <div style={{ flex: 1 }} />
      <a 
        href="https://github.com/swaekaa/elements-executive-report-kit"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', border: 'none', color: '#A39C8C', cursor: 'pointer', textDecoration: 'none'
        }} 
        title="View Source on GitHub"
        onMouseEnter={e => e.currentTarget.style.color = '#111827'}
        onMouseLeave={e => e.currentTarget.style.color = '#A39C8C'}
      >
        <Github size={22} />
      </a>
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
          state.activeLeftPanel === 'explorer' ? <LeftSidebar /> : 
          state.activeLeftPanel === 'components' ? <ComponentLibrary /> : 
          <ThemeBuilder />
        )}
        <LivePreview />
        {state.rightSidebarOpen && <RightSidebar />}
      </div>
      <StatusBar />
    </div>
  );
};
