import React from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { Settings, AlignLeft, AlignCenter, AlignRight, X } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const { state, dispatch } = useDocumentState();

  if (!state.selectedSectionId) {
    return (
      <div style={{
        width: '260px',
        backgroundColor: 'var(--color-bg)',
        borderLeft: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '24px',
        color: 'var(--color-text-muted)',
        textAlign: 'center'
      }}>
        <Settings size={24} style={{ marginBottom: '12px', opacity: 0.5 }} />
        <p style={{ fontSize: '13px' }}>Select a section from the left sidebar to edit its properties.</p>
      </div>
    );
  }

  const sectionStyles = state.sectionStyles[state.selectedSectionId] || {};

  const handleStyleChange = (key: string, value: string) => {
    dispatch({
      type: 'UPDATE_SECTION_STYLE',
      payload: { sectionId: state.selectedSectionId!, styles: { [key]: value } }
    });
  };

  return (
    <div style={{
      width: '260px',
      backgroundColor: 'var(--color-bg)',
      borderLeft: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto'
    }}>
      <div style={{ 
        padding: '16px', 
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text)', textTransform: 'capitalize' }}>
          {state.selectedSectionId} Properties
        </h2>
        <button 
          onClick={() => dispatch({ type: 'SET_SELECTED_SECTION', payload: null })}
          style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '4px' }}
        >
          <X size={14} />
        </button>
      </div>

      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Background Color */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '8px' }}>Background Color</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {['#FFFFFF', '#FAFAFA', '#F4F4F5', '#EFF6FF', '#FEF2F2'].map(color => (
              <button
                key={color}
                onClick={() => handleStyleChange('backgroundColor', color)}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  backgroundColor: color,
                  border: sectionStyles.backgroundColor === color ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Padding */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '8px' }}>Vertical Padding</label>
          <select 
            value={sectionStyles.padding || '32px 0'}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            style={{ width: '100%', padding: '6px 8px', fontSize: '13px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-surface)', color: 'var(--color-text)' }}
          >
            <option value="16px 0">Compact (16px)</option>
            <option value="32px 0">Normal (32px)</option>
            <option value="48px 0">Spacious (48px)</option>
            <option value="64px 0">Relaxed (64px)</option>
          </select>
        </div>

        {/* Alignment */}
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--color-text)', marginBottom: '8px' }}>Content Alignment</label>
          <div style={{ display: 'flex', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '2px' }}>
            {[
              { value: 'left', icon: <AlignLeft size={16} /> },
              { value: 'center', icon: <AlignCenter size={16} /> },
              { value: 'right', icon: <AlignRight size={16} /> }
            ].map(align => (
              <button
                key={align.value}
                onClick={() => handleStyleChange('textAlign', align.value)}
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '6px 0',
                  background: sectionStyles.textAlign === align.value ? 'var(--color-bg)' : 'transparent',
                  color: sectionStyles.textAlign === align.value ? 'var(--color-text)' : 'var(--color-text-muted)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  boxShadow: sectionStyles.textAlign === align.value ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                {align.icon}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
