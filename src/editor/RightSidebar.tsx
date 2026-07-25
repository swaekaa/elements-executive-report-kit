import React, { useState } from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { Settings, Paintbrush, LayoutTemplate, Type, Database, Eye, Code } from 'lucide-react';

type InspectorTab = 'content' | 'style' | 'layout' | 'typography' | 'data' | 'accessibility' | 'advanced';

const PropertyField = ({ label, type = 'text', path, state, dispatch }: { label: string, type?: 'text' | 'textarea' | 'json', path: string, state: any, dispatch: any }) => {
  const [isFocused, setIsFocused] = useState(false);
  const rawValue = path.split('.').reduce((acc, part) => acc && acc[part], state.documentData);
  const value = rawValue || '';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_DATA', payload: { path, value: e.target.value } });
  };
  
  const handleVariable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      dispatch({ type: 'UPDATE_DATA', payload: { path, value: value + e.target.value } });
      e.target.value = "";
    }
  };

  const inputStyles = {
    padding: '8px 12px',
    fontSize: '13px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
    width: '100%',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s ease',
    minHeight: type === 'textarea' ? '120px' : '36px',
    lineHeight: '1.5'
  };

  const displayStyles = {
    ...inputStyles,
    cursor: 'text',
    backgroundColor: '#FFFFFF',
    overflowY: 'auto' as const,
    whiteSpace: type === 'textarea' ? 'pre-wrap' as const : 'nowrap' as const,
    overflowX: type === 'text' ? 'auto' as const : 'hidden' as const
  };

  const renderPills = (text: string) => {
    if (!text) return <span style={{ color: '#9CA3AF' }}>Empty</span>;
    
    // Split by {{...}}
    const parts = text.split(/(\{\{.*?\}\})/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('{{') && part.endsWith('}}')) {
        const key = part.slice(2, -2);
        const varLabel = state.variables?.[key]?.label || key;
        return (
          <span 
            key={index} 
            style={{ 
              display: 'inline-block',
              backgroundColor: '#EFF6FF', 
              color: '#1D4ED8', 
              padding: '2px 6px', 
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              margin: '0 2px',
              verticalAlign: 'middle',
              border: '1px solid #BFDBFE'
            }}
          >
            {varLabel}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>{label}</label>
        {type !== 'json' && (
          <select 
            onChange={handleVariable}
            style={{
              fontSize: '11px',
              background: '#F3F4F6',
              border: 'none',
              color: '#4B5563',
              padding: '2px 6px',
              borderRadius: '4px',
              cursor: 'pointer',
              outline: 'none',
              fontWeight: 500
            }}
          >
            <option value="">+ Variable</option>
            {Object.values(state.variables || {}).map((v: any) => (
              <option key={v.key} value={`{{${v.key}}}`}>{v.label}</option>
            ))}
          </select>
        )}
      </div>
      
      {type === 'json' ? (
        <textarea 
          value={JSON.stringify(rawValue, null, 2)} 
          onChange={(e) => {
            try {
              dispatch({ type: 'UPDATE_DATA', payload: { path, value: JSON.parse(e.target.value) } });
            } catch(err) {}
          }} 
          rows={10}
          style={{ ...inputStyles, fontFamily: 'monospace', fontSize: '12px', resize: 'vertical', backgroundColor: '#F9FAFB' }}
          onFocus={e => e.target.style.borderColor = '#3B82F6'}
          onBlur={e => e.target.style.borderColor = '#D1D5DB'}
        />
      ) : isFocused ? (
        type === 'text' ? (
          <input 
            type="text" 
            value={value} 
            onChange={handleChange} 
            style={{ ...inputStyles, borderColor: '#3B82F6' }}
            autoFocus
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <textarea 
            value={value} 
            onChange={handleChange} 
            style={{ ...inputStyles, resize: 'vertical', borderColor: '#3B82F6' }}
            autoFocus
            onBlur={() => setIsFocused(false)}
          />
        )
      ) : (
        <div 
          onClick={() => setIsFocused(true)}
          style={displayStyles}
        >
          {renderPills(value)}
        </div>
      )}
    </div>
  );
};

export const RightSidebar: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  const [activeTab, setActiveTab] = useState<InspectorTab>('content');

  const tabs: { id: InspectorTab; label: string; icon: React.ReactNode }[] = [
    { id: 'content', label: 'Content', icon: <Settings size={14} /> },
    { id: 'style', label: 'Style', icon: <Paintbrush size={14} /> },
    { id: 'layout', label: 'Layout', icon: <LayoutTemplate size={14} /> }
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

  const selectedStyles = state.selectedSectionId ? (state.sectionStyles[state.selectedSectionId] || {}) : {};

  return (
    <div style={{
      width: '300px',
      height: '100%',
      backgroundColor: '#FFFFFF',
      borderLeft: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-4px 0 15px rgba(0,0,0,0.02)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #E5E7EB',
        fontWeight: 600,
        fontSize: '13px',
        color: '#111827',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
            {/* Content Tab - Dynamic Inspector */}
            {activeTab === 'content' && (
              <div>
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '12px', letterSpacing: '0.05em' }}>Component Properties</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {state.selectedSectionId === 'header' && (
                    <>
                      <PropertyField label="Organization" path="organization" state={state} dispatch={dispatch} />
                      <PropertyField label="Date" path="date" state={state} dispatch={dispatch} />
                    </>
                  )}

                  {state.selectedSectionId === 'cover' && (
                    <>
                      <PropertyField label="Title" path="title" state={state} dispatch={dispatch} />
                      <PropertyField label="Subtitle" path="subtitle" state={state} dispatch={dispatch} />
                      <PropertyField label="Author" path="author" state={state} dispatch={dispatch} />
                      <PropertyField label="Version" path="version" state={state} dispatch={dispatch} />
                    </>
                  )}

                  {state.selectedSectionId === 'summary' && (
                    <PropertyField label="Executive Summary" path="executiveSummary" type="textarea" state={state} dispatch={dispatch} />
                  )}

                  {state.selectedSectionId === 'metrics' && (
                    <PropertyField label="Metrics Data (JSON)" path="metrics" type="json" state={state} dispatch={dispatch} />
                  )}

                  {state.selectedSectionId === 'timeline' && (
                    <PropertyField label="Timeline Events (JSON)" path="timeline" type="json" state={state} dispatch={dispatch} />
                  )}

                  {state.selectedSectionId === 'tables' && (
                    <PropertyField label="Financial Data (JSON)" path="financials" type="json" state={state} dispatch={dispatch} />
                  )}

                  {state.selectedSectionId === 'recommendations' && (
                    <PropertyField label="Recommendations (JSON)" path="recommendations" type="json" state={state} dispatch={dispatch} />
                  )}

                  {state.selectedSectionId === 'appendix' && (
                    <PropertyField label="Appendix Data (JSON)" path="appendix" type="json" state={state} dispatch={dispatch} />
                  )}

                  {/* Default message if no fields mapped */}
                  {!['header', 'cover', 'summary', 'metrics', 'timeline', 'tables', 'recommendations', 'appendix'].includes(state.selectedSectionId) && (
                    <div style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic', padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '6px' }}>
                      No editable content properties mapped for this section.
                    </div>
                  )}
                </div>
              </div>
            )}
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
          </div>
        )}
      </div>
    </div>
  );
};
