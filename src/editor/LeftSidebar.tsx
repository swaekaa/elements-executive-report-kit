import React, { useState } from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { 
  ChevronRight, ChevronDown, Folder, FileText, Mail, Monitor, Smartphone,
  Layers, Image as ImageIcon, Palette, Database, LayoutTemplate, Type
} from 'lucide-react';
import type { TemplateId, ViewportMode, RenderMode } from '../types/studio';

const CollapsibleSection: React.FC<{ title: string; icon: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode }> = ({ title, icon, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '2px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#374151',
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        <span style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6B7280' }}>
          {icon}
        </span>
        {title}
      </button>
      {isOpen && (
        <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

const TreeItem: React.FC<{ 
  label: string; 
  icon?: React.ReactNode; 
  active?: boolean; 
  onClick?: () => void;
}> = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      background: active ? '#EFF6FF' : 'transparent',
      border: 'none',
      borderLeft: `2px solid ${active ? '#3B82F6' : 'transparent'}`,
      cursor: 'pointer',
      color: active ? '#1D4ED8' : '#374151',
      fontSize: '13px',
      textAlign: 'left',
      borderRadius: '0 4px 4px 0'
    }}
  >
    {icon && <span style={{ color: active ? '#3B82F6' : '#9CA3AF' }}>{icon}</span>}
    {label}
  </button>
);

export const LeftSidebar: React.FC = () => {
  const { state, dispatch } = useDocumentState();

  const templates: { id: TemplateId; label: string }[] = [
    { id: 'executive', label: 'Executive Report' },
    { id: 'research', label: 'Research Report' },
    { id: 'security', label: 'Security Audit' },
    { id: 'incident', label: 'Incident Report' },
    { id: 'business', label: 'Business Review' },
    { id: 'investor', label: 'Investor Update' },
    { id: 'compliance', label: 'Compliance Report' }
  ];

  const themes = ['Corporate', 'Executive', 'Minimal', 'Dark', 'Academic'];
  const dataPresets = ['SaaS', 'AI Startup', 'Healthcare', 'Bank', 'Government'];
  const layers = ['Header', 'Cover', 'Summary', 'Metrics', 'Timeline', 'Tables', 'Charts', 'Recommendations', 'Appendix', 'Footer'];

  const getArtifactIcon = (renderMode: string, viewport: string) => {
    if (renderMode === 'email') return <Mail size={14} />;
    if (renderMode === 'web' && viewport === 'phone') return <Smartphone size={14} />;
    if (renderMode === 'web') return <Monitor size={14} />;
    return <FileText size={14} />;
  };

  const switchArtifact = (id: string) => {
    dispatch({ type: 'SET_ACTIVE_ARTIFACT', payload: id });
    dispatch({ type: 'SET_EXPORT_TAB', payload: 'preview' });
  };

  return (
    <div style={{
      width: '280px',
      backgroundColor: '#F9FAFB',
      borderRight: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      userSelect: 'none',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E7EB', fontWeight: 600, fontSize: '13px', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Folder size={16} color="#3B82F6" />
        {state.projectMetadata?.name || 'Project Explorer'}
      </div>

      <div style={{ padding: '12px 0' }}>
        <CollapsibleSection title="Artifacts" icon={<FileText size={14} />} defaultOpen={true}>
          {state.artifacts?.map(a => (
            <TreeItem 
              key={a.id} 
              label={a.name} 
              icon={getArtifactIcon(a.renderMode, a.viewport)} 
              active={state.activeArtifactId === a.id}
              onClick={() => switchArtifact(a.id)}
            />
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Templates" icon={<LayoutTemplate size={14} />} defaultOpen={true}>
          {templates.map(t => (
            <TreeItem 
              key={t.id} 
              label={t.label} 
              active={state.activeTemplate === t.id}
              onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })}
            />
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Layers" icon={<Layers size={14} />} defaultOpen={true}>
          {layers.map(layer => {
            const layerId = layer.toLowerCase();
            return (
              <TreeItem 
                key={layerId} 
                label={layer} 
                active={state.selectedSectionId === layerId}
                onClick={() => dispatch({ type: 'SET_SELECTED_SECTION', payload: layerId })}
              />
            );
          })}
        </CollapsibleSection>

        <CollapsibleSection title="Themes" icon={<Palette size={14} />}>
          {themes.map(theme => (
            <TreeItem key={theme} label={theme} />
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Variables" icon={<Type size={14} />} defaultOpen={true}>
          <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {['company', 'report', 'author', 'theme', 'custom'].map(category => {
              const varsInCategory = Object.values(state.variables || {}).filter(v => v.category === category);
              if (varsInCategory.length === 0) return null;
              
              return (
                <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {category}
                  </div>
                  {varsInCategory.map(v => {
                    const dataString = JSON.stringify(state.documentData || {});
                    const bindingString = `{{${v.key}}}`;
                    const usageCount = dataString.split(bindingString).length - 1;
                    
                    return (
                      <div key={v.key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <label style={{ fontSize: '11px', color: '#374151', fontWeight: 600 }}>{v.label}</label>
                          {usageCount > 0 && (
                            <span style={{ fontSize: '9px', background: '#DBEAFE', color: '#1D4ED8', padding: '2px 6px', borderRadius: '10px', fontWeight: 500 }} title={`Used ${usageCount} time(s)`}>
                              {usageCount} used
                            </span>
                          )}
                        </div>
                        {v.description && <div style={{ fontSize: '10px', color: '#9CA3AF' }}>{v.description}</div>}
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {v.type === 'color' && (
                            <input
                              type="color"
                              value={v.value}
                              onChange={(e) => dispatch({ type: 'SET_VARIABLE', payload: { key: v.key, value: e.target.value } })}
                              style={{ width: '24px', height: '24px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            />
                          )}
                          <input
                            type={v.type === 'date' ? 'date' : 'text'}
                            value={v.value}
                            placeholder={v.defaultValue}
                            onChange={(e) => dispatch({ type: 'SET_VARIABLE', payload: { key: v.key, value: e.target.value } })}
                            style={{
                              flex: 1,
                              padding: '4px 8px',
                              fontSize: '12px',
                              border: '1px solid #E5E7EB',
                              borderRadius: '4px',
                              outline: 'none',
                              color: '#374151'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Data Presets" icon={<Database size={14} />}>
          {dataPresets.map(preset => (
            <TreeItem key={preset} label={preset} />
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Assets" icon={<ImageIcon size={14} />}>
          <TreeItem label="Logo (Dark).png" />
          <TreeItem label="Logo (Light).png" />
          <TreeItem label="cover-bg.jpg" />
        </CollapsibleSection>
      </div>
    </div>
  );
};
