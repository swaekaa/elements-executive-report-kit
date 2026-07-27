import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import type { FieldProps } from '../fields';

export const TableDataField: React.FC<FieldProps<string>> = ({ value, onChange }) => {
  let rows: string[][] = [];
  try {
    rows = JSON.parse(value || '[]');
    if (!Array.isArray(rows)) rows = [];
  } catch (e) {
    rows = [];
  }

  const handleCellChange = (rowIndex: number, colIndex: number, newValue: string) => {
    const newRows = [...rows];
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = newValue;
    onChange(JSON.stringify(newRows, null, 2));
  };

  const handleAddRow = () => {
    const colCount = rows.length > 0 ? rows[0].length : 2;
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                background: '#18181b',
                border: '1px solid #3f3f46',
                borderRadius: '4px',
                padding: '6px 8px',
                color: '#e5e7eb',
                fontSize: '12px',
                outline: 'none'
              }}
              onFocus={e => (e.target.style.borderColor = '#3B82F6')}
              onBlur={e => (e.target.style.borderColor = '#3f3f46')}
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
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <button
          onClick={handleAddRow}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: '#27272a',
            border: '1px solid #3f3f46',
            borderRadius: '4px',
            padding: '8px',
            color: '#e5e7eb',
            cursor: 'pointer',
            fontSize: '12px'
          }}
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
            background: '#27272a',
            border: '1px solid #3f3f46',
            borderRadius: '4px',
            padding: '8px',
            color: '#e5e7eb',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          <Plus size={14} /> Add Column
        </button>
      </div>
    </div>
  );
};
