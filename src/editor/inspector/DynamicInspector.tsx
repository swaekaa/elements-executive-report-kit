import React from 'react';
import { useDocumentState } from '../../hooks/useDocumentState';
import { blocksRegistry } from '../../blocks/registry';
import { TextField, TextAreaField, SelectField, ArrayField, RichTextField } from './fields';
import type { Block } from '../../blocks/types';

const findBlockDeep = (blocks: Block[], id: string): Block | undefined => {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (block.children) {
      const found = findBlockDeep(block.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export const DynamicInspector: React.FC = () => {
  const { state, dispatch } = useDocumentState();
  const focusedBlock = findBlockDeep(state.blocks, state.focusedBlockId || '');

  if (!focusedBlock) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#71717a', fontSize: '13px' }}>
        Select a block to edit its properties
      </div>
    );
  }

  const def = blocksRegistry.get(focusedBlock.type);
  if (!def) {
    return <div style={{ padding: '20px', color: 'red' }}>Unknown block definition.</div>;
  }

  const handleUpdate = (key: string, value: any) => {
    dispatch({
      type: 'BLOCK_UPDATE',
      payload: {
        id: focusedBlock.id,
        changes: {
          data: {
            ...focusedBlock.data,
            [key]: value
          }
        }
      }
    });
  };

  // Group schema fields by their 'group' property
  const groupedSchema = def.schema.reduce((acc, field) => {
    const groupName = field.group || 'General';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(field);
    return acc;
  }, {} as Record<string, typeof def.schema>);

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #27272a' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#f3f4f6' }}>{def.name}</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#a1a1aa' }}>{def.description}</p>
      </div>

      {Object.entries(groupedSchema).map(([groupName, fields]) => (
        <div key={groupName} style={{ marginBottom: '24px' }}>
          <h4 style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            color: '#a1a1aa', 
            margin: '0 0 12px 0' 
          }}>
            {groupName}
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {fields.map(field => {
              const value = focusedBlock.data[field.key] ?? field.defaultValue;
              
              let FieldComponent: React.ReactNode = null;
              switch (field.type) {
                case 'text':
                  FieldComponent = <TextField value={value} onChange={v => handleUpdate(field.key, v)} placeholder={field.placeholder} />;
                  break;
                case 'richtext':
                  FieldComponent = <RichTextField value={value} onChange={v => handleUpdate(field.key, v)} placeholder={field.placeholder} />;
                  break;
                case 'textarea':
                  FieldComponent = <TextAreaField value={value} onChange={v => handleUpdate(field.key, v)} placeholder={field.placeholder} />;
                  break;
                case 'select':
                  FieldComponent = <SelectField value={value} onChange={v => handleUpdate(field.key, v)} options={field.options} />;
                  break;
                case 'array':
                  FieldComponent = (
                    <ArrayField 
                      label={field.label}
                      items={value || []}
                      schema={field.arrayFields || []}
                      onChange={(items) => handleUpdate(field.key, items)}
                    />
                  );
                  break;
                default:
                  FieldComponent = <div style={{ color: '#ef4444', fontSize: '12px' }}>Unsupported field type: {field.type}</div>;
              }

              return (
                <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: '#d4d4d8', fontWeight: 500 }}>
                    {field.label}
                  </label>
                  {FieldComponent}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
