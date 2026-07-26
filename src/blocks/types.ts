import type { RenderMode } from '../types/studio';

export type BlockFieldType = 
  | 'text' 
  | 'textarea' 
  | 'richtext' 
  | 'number' 
  | 'boolean' 
  | 'color' 
  | 'select' 
  | 'date' 
  | 'image' 
  | 'array' 
  | 'json'
  | 'variable';

export interface BlockFieldSchema {
  key: string;
  label: string;
  type: BlockFieldType;
  group?: string; // Property group in Inspector (e.g. 'Content', 'Style')
  placeholder?: string;
  options?: { label: string; value: string | number }[]; // For 'select'
  arrayFields?: BlockFieldSchema[]; // For 'array' type
  validation?: {
    required?: boolean;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  defaultValue?: any;
}

export interface BlockDefinition {
  type: string; // unique identifier e.g. 'core/hero'
  name: string; // user-visible name e.g. 'Hero Banner'
  description: string;
  icon: string; // Lucide icon name
  category: 'Cover' | 'Content' | 'Data' | 'Layout' | 'Media' | 'Footer';
  schema: BlockFieldSchema[];
  defaultData: Record<string, any>;
  supportedArtifacts: RenderMode[];
  toolbarActions?: string[]; // e.g. ['move', 'duplicate', 'delete', 'hide', 'lock']
}

export interface Block {
  id: string; // unique instance ID
  type: string; // references BlockDefinition.type
  label: string; // user-visible label for the instance (can be renamed)
  data: Record<string, any>; // instance data
  children?: Block[]; // nested blocks
  locked?: boolean;
  hidden?: boolean;
  collapsed?: boolean;
}
