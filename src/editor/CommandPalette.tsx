import React, { useEffect, useState, useRef } from 'react';
import { useDocumentState } from '../hooks/useDocumentState';

interface Command {
  id: string;
  label: string;
  action: () => void;
  category: string;
}

export const CommandPalette: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    // Templates
    { id: 't-exec', label: 'Open: Executive Report', category: 'Templates', action: () => dispatch({ type: 'SET_TEMPLATE', payload: 'executive' }) },
    { id: 't-res', label: 'Open: Research Report', category: 'Templates', action: () => dispatch({ type: 'SET_TEMPLATE', payload: 'research' }) },
    { id: 't-sec', label: 'Open: Security Audit', category: 'Templates', action: () => dispatch({ type: 'SET_TEMPLATE', payload: 'security' }) },
    { id: 't-inc', label: 'Open: Incident Report', category: 'Templates', action: () => dispatch({ type: 'SET_TEMPLATE', payload: 'incident' }) },
    

    // Artifacts / Export
    { id: 'e-html', label: 'Export: HTML', category: 'Export', action: () => dispatch({ type: 'SET_EXPORT_TAB', payload: 'html' }) },
    { id: 'e-json', label: 'Export: JSON', category: 'Export', action: () => dispatch({ type: 'SET_EXPORT_TAB', payload: 'json' }) },
    { id: 'e-latex', label: 'Export: LaTeX', category: 'Export', action: () => dispatch({ type: 'SET_EXPORT_TAB', payload: 'latex' }) },
    
    // View
    { id: 'z-in', label: 'Zoom In', category: 'View', action: () => dispatch({ type: 'SET_ZOOM', payload: Math.min(3, state.zoom + 0.25) }) },
    { id: 'z-out', label: 'Zoom Out', category: 'View', action: () => dispatch({ type: 'SET_ZOOM', payload: Math.max(0.25, state.zoom - 0.25) }) },
    { id: 'v-guides', label: 'Toggle Guides', category: 'View', action: () => dispatch({ type: 'TOGGLE_GUIDES' }) },
    { id: 'v-dev', label: 'Toggle Developer Console', category: 'View', action: () => dispatch({ type: 'TOGGLE_DEV_CONSOLE' }) }
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setSearch('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault();
      filtered[selectedIndex]?.action();
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '15vh',
      zIndex: 9999
    }} onClick={() => setIsOpen(false)}>
      <div 
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={search}
          onChange={e => { setSearch(e.target.value); setSelectedIndex(0); }}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or search..."
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '16px',
            border: 'none',
            borderBottom: '1px solid #E5E7EB',
            outline: 'none',
            color: '#111827'
          }}
        />
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>No commands found.</div>
          ) : (
            filtered.map((cmd, idx) => (
              <div
                key={cmd.id}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => { cmd.action(); setIsOpen(false); }}
                style={{
                  padding: '12px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: selectedIndex === idx ? '#F3F4F6' : '#FFFFFF',
                  color: selectedIndex === idx ? '#111827' : '#374151',
                  borderLeft: `3px solid ${selectedIndex === idx ? '#3B82F6' : 'transparent'}`
                }}
              >
                <span>{cmd.label}</span>
                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{cmd.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
