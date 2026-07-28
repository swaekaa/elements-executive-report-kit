import React, { useState } from 'react';
import { Trash2, Plus, Maximize, Minimize } from 'lucide-react';
import type { FieldProps } from '../fields';

export const TableDataField: React.FC<FieldProps<string>> = ({ value, onChange }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  let rows: string[][] = [];
  try {
    rows = JSON.parse(value || '[]');
    if (!Array.isArray(rows)) rows = [];
  } catch (e) {
    rows = [];
  }

  const handleCellChange = (rowIndex: number, colIndex: number, newValue: string) => {
    const newRows = [...rows];
    newRows[rowIndex] = [...(newRows[rowIndex] || [])];
    newRows[rowIndex][colIndex] = newValue;
    onChange(JSON.stringify(newRows, null, 2));
  };

  const handleAddRow = () => {
    const colCount = rows.length > 0 && rows[0] ? rows[0].length : 2;
    const newRow = Array(colCount).fill('New Value');
    const newRows = [...rows, newRow];
    onChange(JSON.stringify(newRows, null, 2));
  };

  const handleRemoveRow = (rowIndex: number) => {
    const newRows = rows.filter((_, i) => i !== rowIndex);
    onChange(JSON.stringify(newRows, null, 2));
  };

  const handleAddColumn = () => {
    const newRows = rows.map(row => [...row, 'New Col']);
    if (newRows.length === 0) {
      newRows.push(['New Col']);
    }
    onChange(JSON.stringify(newRows, null, 2));
  };

  const handleRemoveColumn = (colIndex: number) => {
    const newRows = rows.map(row => row.filter((_, i) => i !== colIndex));
    onChange(JSON.stringify(newRows, null, 2));
  };

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
        padding: '20px',
        overflowY: 'auto'
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
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', borderBottom: '1px solid #E6E4DD', background: '#F5F5F0', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#787569', textTransform: 'uppercase', alignSelf: 'center' }}>Table Data</span>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#787569', padding: '4px', borderRadius: '4px' }}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: isFullscreen ? '0 20px' : '0 8px', flex: isFullscreen ? 1 : 'none' }}>
        <div style={{ display: 'flex', gap: '4px', paddingRight: '26px' }}>
          {rows[0]?.map((_, colIndex) => (
            <div key={colIndex} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => handleRemoveColumn(colIndex)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  padding: '2px',
                  opacity: 0.7,
                  fontSize: '10px'
                }}
                title="Remove Column"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
        
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: '#FFFFFF',
                  border: '1px solid #E6E4DD',
                  borderRadius: '4px',
                  padding: '6px 8px',
                  color: '#3C3830',
                  fontSize: '12px',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={e => (e.target.style.borderColor = '#D97706')}
                onBlur={e => (e.target.style.borderColor = '#E6E4DD')}
              />
            ))}
            <button
              onClick={() => handleRemoveRow(rowIndex)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                cursor: 'pointer',
                padding: '4px',
                opacity: 0.7,
                flexShrink: 0
              }}
              title="Remove Row"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', marginBottom: '8px' }}>
          <button
            onClick={handleAddRow}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#F5F5F0',
              border: '1px dashed #D6D3D1',
              borderRadius: '4px',
              padding: '8px',
              color: '#787569',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#9A9486'; e.currentTarget.style.color = '#3C3830'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#D6D3D1'; e.currentTarget.style.color = '#787569'; }}
          >
            <Plus size={14} /> Add Row
          </button>
          <button
            onClick={handleAddColumn}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: '#F5F5F0',
              border: '1px dashed #D6D3D1',
              borderRadius: '4px',
              padding: '8px',
              color: '#787569',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.15s ease'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#9A9486'; e.currentTarget.style.color = '#3C3830'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#D6D3D1'; e.currentTarget.style.color = '#787569'; }}
          >
            <Plus size={14} /> Add Column
          </button>
        </div>
      </div>
    </div>
  );
};
