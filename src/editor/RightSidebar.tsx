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
    border: '1px solid #27272a',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.2)',
    width: '100%',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s ease',
    minHeight: type === 'textarea' ? '120px' : '36px',
    lineHeight: '1.5',
    backgroundColor: '#111111',
    color: '#e5e7eb'
  };

  const displayStyles = {
    ...inputStyles,
    cursor: 'text',
    backgroundColor: '#111111',
    overflowY: 'auto' as const,
    whiteSpace: type === 'textarea' ? 'pre-wrap' as const : 'nowrap' as const,
    overflowX: type === 'text' ? 'auto' as const : 'hidden' as const,
    color: '#e5e7eb'
  };

  const renderPills = (text: string) => {
    if (!text) return <span style={{ color: '#71717a' }}>Empty</span>;
    
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
              backgroundColor: '#1e3a8a', 
              color: '#bfdbfe', 
              padding: '2px 6px', 
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              margin: '0 2px',
              verticalAlign: 'middle',
              border: '1px solid #1d4ed8'
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
        <label style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
        {type !== 'json' && (
          <select 
            onChange={handleVariable}
            style={{
              fontSize: '11px',
              background: '#27272a',
              border: 'none',
              color: '#a1a1aa',
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
          style={{ ...inputStyles, fontFamily: 'monospace', fontSize: '12px', resize: 'vertical', backgroundColor: '#111111' }}
          onFocus={e => e.target.style.borderColor = '#3B82F6'}
          onBlur={e => e.target.style.borderColor = '#27272a'}
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

const ArrayBuilder = ({ label, path, fields, state, dispatch }: { label: string, path: string, fields: { key: string, label: string, type: 'text'|'textarea' }[], state: any, dispatch: any }) => {
  const rawArray = path.split('.').reduce((acc, part) => acc && acc[part], state.documentData) || [];
  
  const handleUpdate = (index: number, key: string, value: string) => {
    const newArray = [...rawArray];
    newArray[index] = { ...newArray[index], [key]: value };
    dispatch({ type: 'UPDATE_DATA', payload: { path, value: newArray } });
  };

  const handleRemove = (index: number) => {
    const newArray = rawArray.filter((_: any, i: number) => i !== index);
    dispatch({ type: 'UPDATE_DATA', payload: { path, value: newArray } });
  };

  const handleAdd = () => {
    const newItem = fields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {});
    dispatch({ type: 'UPDATE_DATA', payload: { path, value: [...rawArray, newItem] } });
  };

  const inputStyles = {
    padding: '8px 12px',
    fontSize: '13px',
    border: '1px solid #27272a',
    borderRadius: '6px',
    outline: 'none',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.2)',
    width: '100%',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.15s ease',
    backgroundColor: '#111111',
    color: '#e5e7eb'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rawArray.map((item: any, index: number) => (
          <div key={index} style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', color: '#71717a', fontWeight: 600 }}>{String(index + 1).padStart(2, '0')}</span>
              <button 
                onClick={() => handleRemove(index)}
                style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', cursor: 'pointer', opacity: 0.7 }}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
              >
                Remove
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {fields.map(f => (
                <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '10px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea 
                      value={item[f.key] || ''} 
                      onChange={e => handleUpdate(index, f.key, e.target.value)}
                      style={{ ...inputStyles, minHeight: '80px', resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = '#3B82F6'}
                      onBlur={e => e.target.style.borderColor = '#27272a'}
                    />
                  ) : (
                    <input 
                      type="text" 
                      value={item[f.key] || ''} 
                      onChange={e => handleUpdate(index, f.key, e.target.value)}
                      style={{ ...inputStyles, minHeight: '36px' }}
                      onFocus={e => e.target.style.borderColor = '#3B82F6'}
                      onBlur={e => e.target.style.borderColor = '#27272a'}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleAdd}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'transparent',
          border: '1px dashed #3f3f46',
          borderRadius: '8px',
          color: '#a1a1aa',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onMouseOver={e => { e.currentTarget.style.borderColor = '#71717a'; e.currentTarget.style.color = '#e5e7eb'; }}
        onMouseOut={e => { e.currentTarget.style.borderColor = '#3f3f46'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        + Add item
      </button>
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
      width: '320px',
      height: '100%',
      backgroundColor: '#0f0f0f',
      borderLeft: '1px solid #27272a',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-4px 0 15px rgba(0,0,0,0.2)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #27272a',
        fontWeight: 600,
        fontSize: '13px',
        color: '#e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Inspector</span>
        {state.selectedSectionId && (
          <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 500, backgroundColor: '#18181b', border: '1px solid #27272a', padding: '2px 6px', borderRadius: '4px' }}>
            {state.selectedSectionId}
          </span>
        )}
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        borderBottom: '1px solid #27272a',
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
              color: activeTab === tab.id ? '#3B82F6' : '#a1a1aa',
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
          <div style={{ textAlign: 'center', color: '#71717a', fontSize: '13px', marginTop: '40px' }}>
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
                    <ArrayBuilder 
                      label="Metrics" 
                      path="metrics" 
                      fields={[
                        { key: 'label', label: 'Label', type: 'text' },
                        { key: 'value', label: 'Value', type: 'text' },
                        { key: 'change', label: 'Change', type: 'text' },
                        { key: 'changeType', label: 'Change Type (positive/negative)', type: 'text' }
                      ]} 
                      state={state} 
                      dispatch={dispatch} 
                    />
                  )}

                  {state.selectedSectionId === 'timeline' && (
                    <ArrayBuilder 
                      label="Timeline Events" 
                      path="timeline" 
                      fields={[
                        { key: 'date', label: 'Date / Time', type: 'text' },
                        { key: 'title', label: 'Event Title', type: 'text' },
                        { key: 'description', label: 'What Happened', type: 'textarea' }
                      ]} 
                      state={state} 
                      dispatch={dispatch} 
                    />
                  )}

                  {state.selectedSectionId === 'tables' && (
                    <PropertyField label="Financial Data (JSON)" path="financials" type="json" state={state} dispatch={dispatch} />
                  )}

                  {state.selectedSectionId === 'recommendations' && (
                    <ArrayBuilder 
                      label="Recommendations" 
                      path="recommendations" 
                      fields={[
                        { key: 'title', label: 'Title', type: 'text' },
                        { key: 'priority', label: 'Priority', type: 'text' },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                      ]} 
                      state={state} 
                      dispatch={dispatch} 
                    />
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
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#71717a', marginBottom: '12px', letterSpacing: '0.05em' }}>Colors & Appearance</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#a1a1aa' }}>Background</label>
                    <input 
                      type="color" 
                      value={selectedStyles.backgroundColor || '#ffffff'} 
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      style={{ border: '1px solid #27272a', borderRadius: '4px', cursor: 'pointer', width: '28px', height: '28px', padding: 0, backgroundColor: '#18181b' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#a1a1aa' }}>Text Color</label>
                    <input 
                      type="color" 
                      value={selectedStyles.color || '#111827'} 
                      onChange={(e) => handleStyleChange('color', e.target.value)}
                      style={{ border: '1px solid #27272a', borderRadius: '4px', cursor: 'pointer', width: '28px', height: '28px', padding: 0, backgroundColor: '#18181b' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', color: '#a1a1aa' }}>Border Radius</label>
                    <select 
                      value={selectedStyles.borderRadius || '0px'}
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '12px', border: '1px solid #27272a', borderRadius: '4px', backgroundColor: '#18181b', color: '#e5e7eb', outline: 'none' }}
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
                <div style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#71717a', marginBottom: '12px', letterSpacing: '0.05em' }}>Spacing & Alignment</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginBottom: '4px' }}>Padding</label>
                    <input 
                      type="text" 
                      value={selectedStyles.padding || ''} 
                      onChange={(e) => handleStyleChange('padding', e.target.value)}
                      placeholder="e.g. 24px 32px"
                      style={{ width: '100%', padding: '6px 8px', fontSize: '12px', border: '1px solid #27272a', borderRadius: '4px', backgroundColor: '#111111', color: '#e5e7eb', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginBottom: '4px' }}>Text Alignment</label>
                    <div style={{ display: 'flex', gap: '4px', background: '#18181b', padding: '4px', borderRadius: '6px', border: '1px solid #27272a' }}>
                      {['left', 'center', 'right'].map(align => (
                        <button
                          key={align}
                          onClick={() => handleStyleChange('textAlign', align)}
                          style={{
                            flex: 1,
                            padding: '4px',
                            border: 'none',
                            background: selectedStyles.textAlign === align ? '#27272a' : 'transparent',
                            boxShadow: selectedStyles.textAlign === align ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            color: selectedStyles.textAlign === align ? '#f3f4f6' : '#a1a1aa'
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
