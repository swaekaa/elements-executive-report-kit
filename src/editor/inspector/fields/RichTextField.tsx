import React, { useRef, useCallback } from 'react';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered } from 'lucide-react';
import type { FieldProps } from '../fields';

/**
 * RichTextField — a lightweight contenteditable-based rich text editor.
 * No external dependencies (Tiptap removed to fix white-screen crash).
 */
export const RichTextField: React.FC<FieldProps<string>> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    handleInput();
  };

  const isActive = (command: string): boolean => {
    return document.queryCommandState(command);
  };

  const MenuButton = ({ onClick, active, icon: Icon, title }: { onClick: () => void; active?: boolean; icon: any; title: string }) => (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: active ? '#3B82F6' : 'transparent',
        border: 'none',
        borderRadius: '4px',
        padding: '4px',
        color: active ? '#ffffff' : '#a1a1aa',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease'
      }}
    >
      <Icon size={14} />
    </button>
  );

  return (
    <div style={{
      width: '100%',
      background: '#18181b',
      border: '1px solid #3f3f46',
      borderRadius: '6px',
      overflow: 'hidden'
    }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '4px', padding: '6px', borderBottom: '1px solid #27272a', background: '#0f0f0f', flexWrap: 'wrap' }}>
        <MenuButton onClick={() => exec('bold')} active={isActive('bold')} icon={Bold} title="Bold" />
        <MenuButton onClick={() => exec('italic')} active={isActive('italic')} icon={Italic} title="Italic" />
        <MenuButton onClick={() => exec('strikeThrough')} active={isActive('strikeThrough')} icon={Strikethrough} title="Strikethrough" />
        <div style={{ width: '1px', background: '#27272a', margin: '0 4px' }} />
        <MenuButton onClick={() => exec('formatBlock', 'h1')} icon={Heading1} title="Heading 1" />
        <MenuButton onClick={() => exec('formatBlock', 'h2')} icon={Heading2} title="Heading 2" />
        <div style={{ width: '1px', background: '#27272a', margin: '0 4px' }} />
        <MenuButton onClick={() => exec('insertUnorderedList')} active={isActive('insertUnorderedList')} icon={List} title="Bullet List" />
        <MenuButton onClick={() => exec('insertOrderedList')} active={isActive('insertOrderedList')} icon={ListOrdered} title="Ordered List" />
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value || '' }}
        style={{
          minHeight: '120px',
          padding: '12px',
          outline: 'none',
          color: '#e5e7eb',
          fontSize: '13px',
          lineHeight: 1.6,
          cursor: 'text'
        }}
      />
    </div>
  );
};
