import React, { useState } from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { Settings, Paintbrush, LayoutTemplate, Type, Database, Eye, Code } from 'lucide-react';

type InspectorTab = 'content' | 'style' | 'layout' | 'typography' | 'data' | 'accessibility' | 'advanced';

export const RightSidebar: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  const [activeTab, setActiveTab] = useState<InspectorTab>('style');

  const tabs: { id: InspectorTab; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Content', icon: <Settings size={14} /> },
    { id: 'style', label: 'Style', icon: <Paintbrush size={14} /> },
    { id: 'layout', label: 'Layout', icon: <LayoutTemplate size={14} /> },
    { id: 'typography', label: 'Typography', icon: <Type size={14} /> },
    { id: 'data', label: 'Data', icon: <Database size={14} /> },
    { id: 'accessibility', label: 'Accessibility', icon: <Eye size={14} /> },
    { id: 'advanced', label: 'Advanced', icon: <Code size={14} /> }
  ];

  const handleStyleChange = (property: string, value: string) => {
    if (!state.selectedSectionId) return;
    dispatch({
      type: 'UPDATE_SECTION_STYLE',
      payload: {
        sectionId: state.selectedSectionId,
        styles: { [property]: value }
      }
    });
  };

  const selectedStyles = state.selectedSectionId ? state.sectionStyles[state.selectedSectionId] || {} : {};

  return (
    <div style={{
      width: '320px',
      backgroundColor: '#FFFFFF',
      borderLeft: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      color: '#111827',
      userSelect: 'none'
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #E5E7EB',
        fontWeight: 600,
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>Inspector</span>
        {state.selectedSectionId && (
          <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500, backgroundColor: '#F3F4F6', padding: '2px 6px', borderRadius: '4px' }}>
            {state.selectedSectionId}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        borderBottom: '1px solid #E5E7EB',
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
              borderBottom: `2px solid ${activeTab === tab.id ? '#3B82F6' : 'transparent'}`,
              color: activeTab === tab.id ? '#3B82F6' : '#6B7280',
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
        {!state.selectedSectionId ? (
          <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '13px', marginTop: '40px' }}>
            <Settings size={32} style={{ opacity: 0.5, marginBottom: '12px' }} />
            <p>Select a layer to inspect properties.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Style Tab */}
            {activeTab === 'style' && (
              <div>
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '12px', letterSpacing: '0.05em' }}>Colors & Appearance</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#374151' }}>Background</label>
                    <input 
                      type="color" 
                      value={selectedStyles.backgroundColor || '#ffffff'} 
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      style={{ border: '1px solid #E5E7EB', borderRadius: '4px', cursor: 'pointer', width: '28px', height: '28px', padding: 0 }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#374151' }}>Text Color</label>
                    <input 
                      type="color" 
                      value={selectedStyles.color || '#111827'} 
                      onChange={(e) => handleStyleChange('color', e.target.value)}
                      style={{ border: '1px solid #E5E7EB', borderRadius: '4px', cursor: 'pointer', width: '28px', height: '28px', padding: 0 }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#374151' }}>Border Radius</label>
                    <select 
                      value={selectedStyles.borderRadius || '0px'}
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '4px' }}
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
            )}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div>
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '12px', letterSpacing: '0.05em' }}>Spacing & Alignment</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#374151', display: 'block', marginBottom: '4px' }}>Padding</label>
                    <input 
                      type="text" 
                      value={selectedStyles.padding || ''} 
                      onChange={(e) => handleStyleChange('padding', e.target.value)}
                      placeholder="e.g. 24px 32px"
                      style={{ width: '100%', padding: '6px 8px', fontSize: '12px', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: '#374151', display: 'block', marginBottom: '4px' }}>Text Alignment</label>
                    <div style={{ display: 'flex', gap: '4px', background: '#F3F4F6', padding: '4px', borderRadius: '6px' }}>
                      {['left', 'center', 'right'].map(align => (
                        <button
                          key={align}
                          onClick={() => handleStyleChange('textAlign', align)}
                          style={{
                            flex: 1,
                            padding: '4px',
                            border: 'none',
                            background: selectedStyles.textAlign === align ? '#FFFFFF' : 'transparent',
                            boxShadow: selectedStyles.textAlign === align ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'capitalize'
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

            {/* Placeholder for other tabs */}
            {['content', 'typography', 'data', 'accessibility', 'advanced'].includes(activeTab) && (
              <div style={{ textAlign: 'center', color: '#6B7280', fontSize: '12px', marginTop: '20px' }}>
                <p>The <strong>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</strong> inspector is currently under construction.</p>
                <p style={{ marginTop: '8px' }}>This panel will expose deep properties for the selected <code>{state.selectedSectionId}</code> layer.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
