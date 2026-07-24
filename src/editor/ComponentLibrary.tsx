import React, { useMemo, useState, useEffect } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { getComponents } from '../registry';
import { lightTheme } from '../theme';
import { Search, Plus } from 'lucide-react';
import type { ComponentMetadata } from '../registry/types';

// A dynamic preview component that isolates Elements HTML inside an iframe
const DynamicPreview: React.FC<{ component: ComponentMetadata }> = React.memo(({ component }) => {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    // Render the component asynchronously to avoid blocking the main thread
    const timer = setTimeout(() => {
      try {
        const Cmp = component.Component;
        const rendered = renderToHtml(<Cmp {...component.defaultProps} theme={lightTheme} />);
        setHtml(rendered);
      } catch (e) {
        console.error('Failed to render preview for', component.id, e);
        setHtml('<div>Preview Error</div>');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [component]);

  if (!html) {
    return (
      <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', color: '#9CA3AF', fontSize: '12px' }}>
        Rendering...
      </div>
    );
  }

  return (
    <div style={{ 
      height: '120px', 
      overflow: 'hidden', 
      position: 'relative',
      backgroundColor: '#FFFFFF'
    }}>
      <iframe
        srcDoc={html}
        style={{
          width: '400%',
          height: '400%',
          border: 'none',
          transform: 'scale(0.25)',
          transformOrigin: '0 0',
          pointerEvents: 'none' // Prevent interactions
        }}
        sandbox="allow-same-origin"
        title={`Preview of ${component.name}`}
      />
    </div>
  );
});

export const ComponentLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const allComponents = getComponents();
  
  const filtered = useMemo(() => {
    if (!search) return allComponents;
    return allComponents.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, allComponents]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    filtered.forEach(c => cats.add(c.category));
    return Array.from(cats).sort();
  }, [filtered]);

  return (
    <div style={{
      width: '320px',
      backgroundColor: '#FFFFFF',
      borderLeft: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 12px 0' }}>Component Library</h2>
        <div style={{ position: 'relative' }}>
          <Search size={14} color="#9CA3AF" style={{ position: 'absolute', left: '10px', top: '9px' }} />
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px 6px 30px',
              fontSize: '12px',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              outline: 'none',
              backgroundColor: '#F9FAFB'
            }}
          />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {categories.map(category => (
          <div key={category} style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0' }}>
              {category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.filter(c => c.category === category).map(component => (
                <div 
                  key={component.id}
                  style={{
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    transition: 'box-shadow 0.2s, border-color 0.2s',
                    cursor: 'grab'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#3B82F6';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <DynamicPreview component={component} />
                  <div style={{ padding: '10px 12px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{component.name}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{component.description}</div>
                    </div>
                    <button style={{
                      background: '#EFF6FF',
                      border: 'none',
                      color: '#2563EB',
                      padding: '4px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }} title="Insert Component">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '13px', marginTop: '32px' }}>
            No components found.
          </div>
        )}
      </div>
    </div>
  );
};
