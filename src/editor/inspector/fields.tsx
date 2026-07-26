import React from 'react';

export interface FieldProps<T = any> {
  value: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
  options?: { label: string; value: string | number }[]; // For Select
}

export const TextField: React.FC<FieldProps<string>> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    style={{
      width: '100%',
      background: '#18181b',
      border: '1px solid #3f3f46',
      borderRadius: '4px',
      padding: '6px 10px',
      color: '#f3f4f6',
      fontSize: '13px',
      outline: 'none'
    }}
    onFocus={e => (e.target.style.borderColor = '#3B82F6')}
    onBlur={e => (e.target.style.borderColor = '#3f3f46')}
  />
);

export const TextAreaField: React.FC<FieldProps<string>> = ({ value, onChange, placeholder }) => (
  <textarea
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={4}
    style={{
      width: '100%',
      background: '#18181b',
      border: '1px solid #3f3f46',
      borderRadius: '4px',
      padding: '8px 10px',
      color: '#f3f4f6',
      fontSize: '13px',
      outline: 'none',
      resize: 'vertical'
    }}
    onFocus={e => (e.target.style.borderColor = '#3B82F6')}
    onBlur={e => (e.target.style.borderColor = '#3f3f46')}
  />
);

export const SelectField: React.FC<FieldProps<string>> = ({ value, onChange, options }) => (
  <select
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: '100%',
      background: '#18181b',
      border: '1px solid #3f3f46',
      borderRadius: '4px',
      padding: '6px 10px',
      color: '#f3f4f6',
      fontSize: '13px',
      outline: 'none',
      appearance: 'none',
      cursor: 'pointer'
    }}
    onFocus={e => (e.target.style.borderColor = '#3B82F6')}
    onBlur={e => (e.target.style.borderColor = '#3f3f46')}
  >
    {options?.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export { ArrayField } from './fields/ArrayField';
export { RichTextField } from './fields/RichTextField';
