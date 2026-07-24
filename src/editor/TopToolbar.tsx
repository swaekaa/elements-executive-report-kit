import React from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { Undo, Redo, Monitor, FileText, Mail, Layout, Code, FileJson, Type, Box } from 'lucide-react';
import type { RenderMode, ExportTab } from '../hooks/useDocumentState';

export const TopToolbar: React.FC = () => {
  const { state, dispatch, canUndo, canRedo } = useDocumentState();

  const renderModes: { id: RenderMode; label: string; icon: React.ReactNode }[] = [
    { id: 'email', label: 'EMAIL', icon: <Mail size={14} /> },
    { id: 'document', label: 'DOCUMENT', icon: <FileText size={14} /> },
    { id: 'web', label: 'WEB PAGE', icon: <Monitor size={14} /> }
  ];

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
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      color: '#374151',
      fontSize: '13px',
      fontWeight: 500,
      userSelect: 'none'
    }}>
      {/* Left: Branding & History */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontWeight: 600, color: '#111827' }}>Elements Studio</div>
        <div style={{ width: '1px', height: '24px', backgroundColor: '#E5E7EB' }} />
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            onClick={() => dispatch({ type: 'UNDO' })}
            disabled={!canUndo}
            style={{ 
              padding: '6px', 
              background: 'none', 
              border: 'none', 
              cursor: canUndo ? 'pointer' : 'not-allowed',
              color: canUndo ? '#374151' : '#D1D5DB',
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
              color: canRedo ? '#374151' : '#D1D5DB',
              borderRadius: '4px'
            }}
            title="Redo (Ctrl+Y)"
          >
            <Redo size={16} />
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Saved locally</div>
      </div>

      {/* Center: Render Mode Switcher */}
      <div style={{ display: 'flex', backgroundColor: '#F3F4F6', padding: '4px', borderRadius: '6px', gap: '4px' }}>
        {renderModes.map(mode => (
          <button
            key={mode.id}
            onClick={() => dispatch({ type: 'SET_RENDER_MODE', payload: mode.id })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              border: 'none',
              background: state.renderMode === mode.id ? '#FFFFFF' : 'transparent',
              boxShadow: state.renderMode === mode.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              borderRadius: '4px',
              color: state.renderMode === mode.id ? '#111827' : '#6B7280',
              fontWeight: state.renderMode === mode.id ? 600 : 500,
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.05em'
            }}
          >
            {mode.icon}
            {mode.label}
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
                background: state.exportTab === tab.id ? '#F3F4F6' : 'transparent',
                borderRadius: '4px',
                color: state.exportTab === tab.id ? '#111827' : '#6B7280',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        <div style={{ width: '1px', height: '24px', backgroundColor: '#E5E7EB' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select 
            value={state.zoom} 
            onChange={(e) => dispatch({ type: 'SET_ZOOM', payload: parseFloat(e.target.value) })}
            style={{
              padding: '4px 8px',
              border: '1px solid #E5E7EB',
              borderRadius: '4px',
              background: '#FFFFFF',
              fontSize: '12px',
              color: '#374151',
              cursor: 'pointer'
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
