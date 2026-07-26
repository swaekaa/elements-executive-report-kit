import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { TextField, TextAreaField, SelectField } from '../fields';
import type { BlockFieldSchema } from '../../../blocks/types';

interface ArrayFieldProps {
  label: string;
  items: any[];
  schema: BlockFieldSchema[];
  onChange: (items: any[]) => void;
}

const SortableItem = ({ id, index, item, schema, onChange, onRemove }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [expanded, setExpanded] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    marginBottom: '8px',
    overflow: 'hidden'
  };

  const handleFieldChange = (key: string, value: any) => {
    onChange(index, { ...item, [key]: value });
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px', borderBottom: expanded ? '1px solid #27272a' : 'none' }}>
        <button {...attributes} {...listeners} style={{ background: 'none', border: 'none', cursor: 'grab', padding: '4px', color: '#71717a' }}>
          <GripVertical size={14} />
        </button>
        <div style={{ flex: 1, padding: '0 8px', fontSize: '12px', color: '#e5e7eb', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setExpanded(!expanded)}>
          {item.label || item.title || `Item ${index + 1}`}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onRemove(index); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#ef4444', opacity: 0.7 }}>
          <Trash2 size={14} />
        </button>
        <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#a1a1aa' }}>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
      
      {expanded && (
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#0f0f0f' }}>
          {schema.map((field: BlockFieldSchema) => {
            const value = item[field.key] ?? field.defaultValue;
            let FieldComp = null;
            if (field.type === 'text') FieldComp = <TextField value={value} onChange={v => handleFieldChange(field.key, v)} />;
            else if (field.type === 'textarea') FieldComp = <TextAreaField value={value} onChange={v => handleFieldChange(field.key, v)} />;
            else if (field.type === 'select') FieldComp = <SelectField value={value} onChange={v => handleFieldChange(field.key, v)} options={field.options} />;
            
            return (
              <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', color: '#a1a1aa' }}>{field.label}</label>
                {FieldComp}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ArrayField: React.FC<ArrayFieldProps> = ({ label, items, schema, onChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((_, i) => `item-${i}` === active.id);
      const newIndex = items.findIndex((_, i) => `item-${i}` === over?.id);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleItemChange = (index: number, updatedItem: any) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    const newItem = schema.reduce((acc, field) => ({ ...acc, [field.key]: field.defaultValue || '' }), {});
    onChange([...items, newItem]);
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((_, i) => `item-${i}`)} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={`item-${index}`}
              id={`item-${index}`}
              index={index}
              item={item}
              schema={schema}
              onChange={handleItemChange}
              onRemove={handleRemove}
            />
          ))}
        </SortableContext>
      </DndContext>
      
      <button
        onClick={handleAdd}
        style={{
          width: '100%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          background: 'transparent', border: '1px dashed #3f3f46', borderRadius: '6px', color: '#a1a1aa', fontSize: '12px',
          cursor: 'pointer', transition: 'all 0.15s ease'
        }}
        onMouseOver={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#3B82F6'; }}
        onMouseOut={e => { e.currentTarget.style.borderColor = '#3f3f46'; e.currentTarget.style.color = '#a1a1aa'; }}
      >
        <Plus size={14} /> Add Item
      </button>
    </div>
  );
};
