import React from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { Undo, Redo, Monitor, FileText, Mail, Layout, Code, FileJson, Type, Box } from 'lucide-react';
import type { ExportTab } from '../hooks/useDocumentState';

export const TopToolbar: React.FC = () => {
  const { state, dispatch, canUndo, canRedo } = useDocumentState();

  const getArtifactIcon = (renderMode: string) => {
    if (renderMode === 'email') return <Mail size={14} />;
    if (renderMode === 'web') return <Monitor size={14} />;
    return <FileText size={14} />;
  };

  const exportTabs: { id: ExportTab; label: string; icon: React.ReactNode }[] = [
    { id: 'preview', label: 'Preview', icon: <Layout size={14} /> },
    { id: 'html', label: 'HTML', icon: <Code size={14} /> },
    { id: 'json', label: 'JSON', icon: <FileJson size={14} /> },
    { id: 'markdown', label: 'Markdown', icon: <Type size={14} /> },
    { id: 'latex', label: 'LaTeX', icon: <Box size={14} /> }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      height: '48px',
      backgroundColor: '#0f0f0f',
      borderBottom: '1px solid #27272a',
      color: '#e5e7eb',
      fontSize: '13px',
      fontWeight: 500,
      userSelect: 'none'
    }}>
      {/* Left: Branding & History */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontWeight: 600, color: '#f3f4f6' }}>Elements Studio</div>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#27272a' }} />
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            onClick={() => dispatch({ type: 'UNDO' })}
            disabled={!canUndo}
            style={{ 
              padding: '6px', 
              background: 'none', 
              border: 'none', 
              cursor: canUndo ? 'pointer' : 'not-allowed',
              color: canUndo ? '#a1a1aa' : '#3f3f46',
              borderRadius: '4px'
            }}
            title="Undo (Ctrl+Z)"
          >
            <Undo size={16} />
          </button>
          <button 
            onClick={() => dispatch({ type: 'REDO' })}
            disabled={!canRedo}
            style={{ 
              padding: '6px', 
              background: 'none', 
              border: 'none', 
              cursor: canRedo ? 'pointer' : 'not-allowed',
              color: canRedo ? '#a1a1aa' : '#3f3f46',
              borderRadius: '4px'
            }}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={16} />
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#71717a' }}>Saved locally</div>
      </div>

      {/* Center: Artifact Switcher */}
      <div style={{ display: 'flex', backgroundColor: '#18181b', padding: '4px', borderRadius: '6px', gap: '4px', border: '1px solid #27272a' }}>
        {state.artifacts?.map(artifact => (
          <button
            key={artifact.id}
            onClick={() => dispatch({ type: 'SET_ACTIVE_ARTIFACT', payload: artifact.id })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              border: 'none',
              background: state.activeArtifactId === artifact.id ? '#27272a' : 'transparent',
              boxShadow: state.activeArtifactId === artifact.id ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
              borderRadius: '4px',
              color: state.activeArtifactId === artifact.id ? '#f3f4f6' : '#a1a1aa',
              fontWeight: state.activeArtifactId === artifact.id ? 600 : 500,
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.05em',
              transition: 'all 0.15s ease'
            }}
          >
            {getArtifactIcon(artifact.renderMode)}
            {artifact.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Right: Export Tabs & Zoom */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {exportTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: 'SET_EXPORT_TAB', payload: tab.id })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                border: 'none',
                background: state.exportTab === tab.id ? '#27272a' : 'transparent',
                borderRadius: '4px',
                color: state.exportTab === tab.id ? '#f3f4f6' : '#a1a1aa',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        <div style={{ width: '1px', height: '24px', backgroundColor: '#27272a' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select 
            value={state.zoom} 
            onChange={(e) => dispatch({ type: 'SET_ZOOM', payload: parseFloat(e.target.value) })}
            style={{
              padding: '4px 8px',
              border: '1px solid #27272a',
              borderRadius: '4px',
              background: '#18181b',
              fontSize: '12px',
              color: '#e5e7eb',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value={0.5}>50%</option>
            <option value={0.75}>75%</option>
            <option value={1}>100%</option>
            <option value={1.25}>125%</option>
            <option value={1.5}>150%</option>
            <option value={2}>200%</option>
          </select>
        </div>
      </div>
    </div>
  );
};
