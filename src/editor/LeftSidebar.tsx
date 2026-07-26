import React, { useState } from 'react';
import { useDocumentState } from '../hooks/useDocumentState';
import { 
  ChevronRight, ChevronDown, Folder, FileText, Mail, Monitor, Smartphone,
  Layers, Image as ImageIcon, Palette, Database, LayoutTemplate, Type,
  EyeOff, Lock, Trash2, Copy, ArrowUp, ArrowDown, Eye, Plus
} from 'lucide-react';
import * as Icons from 'lucide-react';
import type { TemplateId, ViewportMode, RenderMode } from '../types/studio';
import { blocksRegistry } from '../blocks/registry';
import type { Block } from '../blocks/types';

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
          color: '#e5e7eb',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        <span style={{ color: '#71717a', display: 'flex', alignItems: 'center' }}>
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#71717a' }}>
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
      background: active ? '#27272a' : 'transparent',
      border: 'none',
      borderLeft: `2px solid ${active ? '#3B82F6' : 'transparent'}`,
      cursor: 'pointer',
      color: active ? '#f3f4f6' : '#a1a1aa',
      fontSize: '13px',
      textAlign: 'left',
      borderRadius: '0 4px 4px 0',
      transition: 'all 0.15s ease'
    }}
  >
    {icon && <span style={{ color: active ? '#3B82F6' : '#71717a' }}>{icon}</span>}
    {label}
  </button>
);

const BlockTreeItem: React.FC<{
  block: Block;
  level: number;
  state: any;
  dispatch: any;
}> = ({ block, level, state, dispatch }) => {
  const [isExpanded, setIsExpanded] = useState(!block.collapsed);
  const [isHovered, setIsHovered] = useState(false);
  const def = blocksRegistry.get(block.type);
  const IconComponent = (def?.icon && (Icons as any)[def.icon]) ? (Icons as any)[def.icon] : LayoutTemplate;
  const hasChildren = block.children && block.children.length > 0;
  
  const isActive = state.focusedBlockId === block.id;

  return (
    <div>
      <div 
        onClick={() => dispatch({ type: 'BLOCK_SET_FOCUS', payload: { blockId: block.id } })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: `6px 16px 6px ${16 + level * 12}px`,
          cursor: 'pointer',
          color: isActive ? '#FFFFFF' : '#a1a1aa',
          background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
          borderLeft: isActive ? '2px solid #3B82F6' : '2px solid transparent',
          fontSize: '13px',
          transition: 'all 0.15s ease',
          userSelect: 'none',
          opacity: block.hidden ? 0.5 : 1
        }}
        onMouseEnter={e => {
          setIsHovered(true);
          if (!isActive) {
            e.currentTarget.style.background = '#18181b';
            e.currentTarget.style.color = '#e5e7eb';
          }
        }}
        onMouseLeave={e => {
          setIsHovered(false);
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#a1a1aa';
          }
        }}
      >
        <div 
          style={{ width: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: hasChildren ? 'pointer' : 'default' }}
          onClick={(e) => {
            if (hasChildren) {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }
          }}
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown size={14} color={isActive ? '#FFFFFF' : '#71717a'} /> : <ChevronRight size={14} color={isActive ? '#FFFFFF' : '#71717a'} />
          ) : (
            <div style={{ width: '14px' }} />
          )}
        </div>
        <IconComponent size={14} color={isActive ? '#3B82F6' : '#71717a'} />
        <span style={{ 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          flex: 1,
          textDecoration: block.hidden ? 'line-through' : 'none'
        }}>
          {block.label || def?.name || 'Block'}
        </span>
        
        {/* Block Operations - Visible on Hover or Active */}
        <div style={{ display: (isHovered || isActive) ? 'flex' : 'none', alignItems: 'center', gap: '4px' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'BLOCK_MOVE', payload: { id: block.id, direction: -1 } }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#a1a1aa' }}
            title="Move Up"
          >
            <ArrowUp size={12} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'BLOCK_MOVE', payload: { id: block.id, direction: 1 } }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#a1a1aa' }}
            title="Move Down"
          >
            <ArrowDown size={12} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'BLOCK_DUPLICATE', payload: { id: block.id } }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#a1a1aa' }}
            title="Duplicate"
          >
            <Copy size={12} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'BLOCK_UPDATE', payload: { id: block.id, changes: { hidden: !block.hidden } } }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#a1a1aa' }}
            title={block.hidden ? "Show" : "Hide"}
          >
            {block.hidden ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'BLOCK_REMOVE', payload: { id: block.id } }); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#ef4444' }}
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>

        {(!isHovered && !isActive) && block.locked && <Lock size={12} color="#71717a" />}
        {(!isHovered && !isActive) && block.hidden && <EyeOff size={12} color="#71717a" />}
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {block.children!.map(child => (
            <BlockTreeItem key={child.id} block={child} level={level + 1} state={state} dispatch={dispatch} />
          ))}
        </div>
      )}
    </div>
  );
};

const InsertBlockMenu: React.FC<{ dispatch: any; parentId: string | null; level: number }> = ({ dispatch, parentId, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const allBlocks = blocksRegistry.getAll();
  const filteredBlocks = allBlocks.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (type: string) => {
    const newBlock = blocksRegistry.createInstance(type, {});
    dispatch({ type: 'BLOCK_ADD', payload: { parentId, block: newBlock } });
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div style={{ padding: `4px 16px 4px ${16 + level * 12}px`, position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px', background: 'transparent', border: '1px dashed #3f3f46',
          borderRadius: '4px', color: '#a1a1aa', fontSize: '11px', cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onMouseOver={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#3B82F6'; }}
        onMouseOut={e => { e.currentTarget.style.borderColor = '#3f3f46'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        <Plus size={12} /> Add Block
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: '16px', right: '16px', zIndex: 50,
          background: '#18181b', border: '1px solid #27272a', borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)', padding: '8px', marginTop: '4px'
        }}>
          <input 
            autoFocus
            type="text"
            placeholder="Search blocks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '6px', background: '#0f0f0f', border: '1px solid #27272a',
              borderRadius: '4px', color: '#e5e7eb', fontSize: '11px', marginBottom: '8px', outline: 'none'
            }}
          />
          <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {filteredBlocks.map(b => (
              <button
                key={b.type}
                onClick={() => handleAdd(b.type)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px',
                  background: 'transparent', border: 'none', color: '#e5e7eb', fontSize: '11px',
                  cursor: 'pointer', textAlign: 'left', borderRadius: '4px'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#27272a'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                {(b.icon && (Icons as any)[b.icon]) ? React.createElement((Icons as any)[b.icon], { size: 14, color: '#a1a1aa' }) : <LayoutTemplate size={14} color="#a1a1aa" />}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 500 }}>{b.name}</span>
                  <span style={{ fontSize: '9px', color: '#71717a' }}>{b.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const LeftSidebar: React.FC = () => {
  const { state, dispatch } = useDocumentState();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if focus is on the body, not inside an input field
      if (state.focusedBlockId && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          dispatch({ type: 'BLOCK_REMOVE', payload: { id: state.focusedBlockId } });
        }
        if (e.ctrlKey || e.metaKey) {
          if (e.key === 'd') {
            e.preventDefault();
            dispatch({ type: 'BLOCK_DUPLICATE', payload: { id: state.focusedBlockId } });
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            dispatch({ type: 'BLOCK_MOVE', payload: { id: state.focusedBlockId, direction: -1 } });
          }
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            dispatch({ type: 'BLOCK_MOVE', payload: { id: state.focusedBlockId, direction: 1 } });
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.focusedBlockId, dispatch]);

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
      backgroundColor: '#0f0f0f',
      borderRight: '1px solid #27272a',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      userSelect: 'none',
      overflowY: 'auto'
    }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #27272a', fontWeight: 600, fontSize: '13px', color: '#e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
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

        {/* Pages Section */}
        <CollapsibleSection title="Pages" icon={<Layers size={14} />} defaultOpen={true}>
          {['Overview (Default)', 'Appendix A', 'Financials'].map((page, i) => (
            <TreeItem 
              key={page} 
              label={page} 
              icon={<FileText size={14} />}
              active={i === 0}
            />
          ))}
        </CollapsibleSection>

        <CollapsibleSection title="Blocks" icon={<Layers size={14} />} defaultOpen={true}>
          {state.blocks?.map(block => (
            <BlockTreeItem key={block.id} block={block} level={0} state={state} dispatch={dispatch} />
          ))}
          <InsertBlockMenu dispatch={dispatch} parentId={null} level={0} />
        </CollapsibleSection>

        <CollapsibleSection title="Themes" icon={<Palette size={14} />}>
          {themes.map(theme => (
            <TreeItem key={theme} label={theme} icon={<Palette size={14} />} />
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
