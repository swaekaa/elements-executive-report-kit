import React from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { Monitor, CheckCircle, Package, Eye, ZoomIn, Code } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { state } = useDocumentState();

  const Item: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '0 8px',
      height: '100%',
      cursor: 'pointer',
      backgroundColor: active ? '#2563EB' : 'transparent',
      color: active ? '#FFFFFF' : '#D1D5DB',
      transition: 'background-color 0.15s ease'
    }}>
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '24px',
      backgroundColor: '#1E1E1E', // VS Code Blue/Dark
      color: '#D1D5DB',
      fontSize: '11px',
      fontWeight: 500,
      userSelect: 'none',
      borderTop: '1px solid #374151'
    }}>
      <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
        <Item icon={<Package size={12} />} label="Unlayer Elements v1.0.0" />
        <Item icon={<Monitor size={12} />} label={`Viewport: ${state.viewport}`} />
        <Item icon={<Eye size={12} />} label={`Render Mode: ${state.renderMode}`} />
        <Item icon={<ZoomIn size={12} />} label={`Zoom: ${Math.round(state.zoom * 100)}%`} />
      </div>

      <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
        {state.selectedSectionId && (
          <Item icon={<Code size={12} />} label={`Selected: ${state.selectedSectionId}`} active={true} />
        )}
        <Item icon={<CheckCircle size={12} color="#10B981" />} label="Saved" />
      </div>
    </div>
  );
};
