import React, { useRef, useCallback, useState } from 'react';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Maximize, Minimize } from 'lucide-react';
import type { FieldProps } from '../fields';

/**
 * RichTextField — a lightweight contenteditable-based rich text editor.
 * No external dependencies (Tiptap removed to fix white-screen crash).
 */
export const RichTextField: React.FC<FieldProps<string>> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
        background: active ? '#D97706' : 'transparent',
        border: 'none',
        borderRadius: '4px',
        padding: '4px',
        color: active ? '#ffffff' : '#787569',
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

  const containerStyle: React.CSSProperties = isFullscreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: '#FAFAED',
        display: 'flex',
        flexDirection: 'column',
      }
    : {
        width: '100%',
        background: '#FAFAED',
        border: '1px solid #E6E4DD',
        borderRadius: '6px',
        overflow: 'hidden'
      };

  return (
    <div style={containerStyle}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '4px', padding: '6px', borderBottom: '1px solid #E6E4DD', background: '#F5F5F0', flexWrap: 'wrap' }}>
        <MenuButton onClick={() => exec('bold')} active={isActive('bold')} icon={Bold} title="Bold" />
        <MenuButton onClick={() => exec('italic')} active={isActive('italic')} icon={Italic} title="Italic" />
        <MenuButton onClick={() => exec('strikeThrough')} active={isActive('strikeThrough')} icon={Strikethrough} title="Strikethrough" />
        <div style={{ width: '1px', background: '#E6E4DD', margin: '0 4px' }} />
        <MenuButton onClick={() => exec('formatBlock', 'h1')} icon={Heading1} title="Heading 1" />
        <MenuButton onClick={() => exec('formatBlock', 'h2')} icon={Heading2} title="Heading 2" />
        <div style={{ width: '1px', background: '#E6E4DD', margin: '0 4px' }} />
        <MenuButton onClick={() => exec('insertUnorderedList')} active={isActive('insertUnorderedList')} icon={List} title="Bullet List" />
        <MenuButton onClick={() => exec('insertOrderedList')} active={isActive('insertOrderedList')} icon={ListOrdered} title="Ordered List" />
        
        <div style={{ flex: 1 }} />
        <MenuButton onClick={() => setIsFullscreen(!isFullscreen)} icon={isFullscreen ? Minimize : Maximize} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"} />
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value || '' }}
        style={{
          flex: isFullscreen ? 1 : 'none',
          minHeight: '120px',
          padding: isFullscreen ? '40px' : '12px',
          outline: 'none',
          color: '#3C3830',
          fontSize: '13px',
          lineHeight: 1.6,
          cursor: 'text',
          overflowY: 'auto'
        }}
      />
    </div>
  );
};
