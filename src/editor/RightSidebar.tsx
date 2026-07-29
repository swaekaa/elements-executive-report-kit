import React, { useState } from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { DynamicInspector } from './inspector/DynamicInspector';
import { Settings, Paintbrush, LayoutTemplate, Trash2 } from 'lucide-react';

type InspectorTab = 'content' | 'style' | 'layout' | 'typography' | 'data' | 'accessibility' | 'advanced';

export const RightSidebar: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  const [activeTab, setActiveTab] = useState<InspectorTab>('content');

  const tabs: { id: InspectorTab; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Content', icon: <Settings size={14} /> },
    { id: 'style', label: 'Style', icon: <Paintbrush size={14} /> },
    { id: 'layout', label: 'Layout', icon: <LayoutTemplate size={14} /> }
  ];

  const handleStyleChange = (property: string, value: string) => {
    if (!state.focusedBlockId) return;
    dispatch({
      type: 'UPDATE_SECTION_STYLE',
      payload: {
        sectionId: state.focusedBlockId,
        styles: { [property]: value }
      }
    });
  };

  const selectedStyles = state.focusedBlockId ? (state.sectionStyles[state.focusedBlockId] || {}) : {};

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#F5F5F0',
      borderLeft: '1px solid #E6E4DD',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-4px 0 15px rgba(0,0,0,0.05)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #E6E4DD',
        fontWeight: 600,
        fontSize: '13px',
        color: '#3C3830',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Inspector</span>
        {state.focusedBlockId && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#787569', fontWeight: 500, backgroundColor: '#FAFAED', border: '1px solid #E6E4DD', padding: '2px 6px', borderRadius: '4px', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={state.focusedBlockId}>
              {state.focusedBlockId.substring(0, 8)}
            </span>
            <button 
              onClick={() => dispatch({ type: 'BLOCK_REMOVE', payload: { id: state.focusedBlockId! } })}
              style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', opacity: 0.8 }}
              onMouseOver={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              title="Delete Block"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        borderBottom: '1px solid #E6E4DD',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none' // IE/Edge
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 12px',
              border: 'none',
              background: 'transparent',
              borderBottom: `2px solid ${activeTab === tab.id ? '#D97706' : 'transparent'}`,
              color: activeTab === tab.id ? '#D97706' : '#787569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: activeTab === tab.id ? 600 : 500,
              whiteSpace: 'nowrap'
            }}
            title={tab.label}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {!state.focusedBlockId ? (
          <div style={{ textAlign: 'center', color: '#9A9486', fontSize: '13px', marginTop: '40px' }}>
            <Settings size={32} style={{ opacity: 0.5, marginBottom: '12px' }} />
            <p>Select a block to inspect properties.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Content Tab - Dynamic Inspector */}
            {activeTab === 'content' && (
              <DynamicInspector />
            )}
            {/* Style Tab */}
            {activeTab === 'style' && (() => {
              const focusedBlock = state.blocks?.find(b => b.id === state.focusedBlockId);
              const defaultBgColor = focusedBlock?.type === 'core/hero' ? '#0a0a0a' : '#ffffff';
              const defaultTextColor = focusedBlock?.type === 'core/hero' ? '#ffffff' : '#3C3830';

              return (
              <div>
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#9A9486', marginBottom: '12px', letterSpacing: '0.05em' }}>Colors & Appearance</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#787569' }}>Background</label>
                    <input 
                      type="color" 
                      value={selectedStyles.backgroundColor || defaultBgColor} 
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      style={{ border: '1px solid #E6E4DD', borderRadius: '4px', cursor: 'pointer', width: '28px', height: '28px', padding: 0, backgroundColor: '#FFFFFF' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#787569' }}>Text Color</label>
                    <input 
                      type="color" 
                      value={selectedStyles.color || defaultTextColor} 
                      onChange={(e) => handleStyleChange('color', e.target.value)}
                      style={{ border: '1px solid #E6E4DD', borderRadius: '4px', cursor: 'pointer', width: '28px', height: '28px', padding: 0, backgroundColor: '#FFFFFF' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#787569' }}>Border Radius</label>
                    <select 
                      value={selectedStyles.borderRadius || '0px'}
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '12px', border: '1px solid #E6E4DD', borderRadius: '4px', backgroundColor: '#FAFAED', color: '#3C3830', outline: 'none' }}
                    >
                      <option value="0px">None (0px)</option>
                      <option value="4px">Small (4px)</option>
                      <option value="8px">Medium (8px)</option>
                      <option value="16px">Large (16px)</option>
                      <option value="9999px">Full (9999px)</option>
                    </select>
                  </div>
                </div>
              </div>
              );
            })()}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div>
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#9A9486', marginBottom: '12px', letterSpacing: '0.05em' }}>Spacing & Alignment</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#787569', display: 'block', marginBottom: '4px' }}>Padding</label>
                    <input 
                      type="text" 
                      value={selectedStyles.padding || ''} 
                      onChange={(e) => handleStyleChange('padding', e.target.value)}
                      placeholder="e.g. 24px 32px"
                      style={{ width: '100%', padding: '6px 8px', fontSize: '12px', border: '1px solid #E6E4DD', borderRadius: '4px', backgroundColor: '#FFFFFF', color: '#3C3830', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: '#787569', display: 'block', marginBottom: '4px' }}>Text Alignment</label>
                    <div style={{ display: 'flex', gap: '4px', background: '#FAFAED', padding: '4px', borderRadius: '6px', border: '1px solid #E6E4DD' }}>
                      {['left', 'center', 'right'].map(align => (
                        <button
                          key={align}
                          onClick={() => handleStyleChange('textAlign', align)}
                          style={{
                            flex: 1,
                            padding: '4px',
                            border: 'none',
                            background: selectedStyles.textAlign === align ? '#E6E4DD' : 'transparent',
                            boxShadow: selectedStyles.textAlign === align ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            color: selectedStyles.textAlign === align ? '#3C3830' : '#787569'
                          }}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
