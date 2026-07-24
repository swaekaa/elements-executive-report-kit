import type { ReactNode } from 'react';
import type { RenderMode } from '../types/studio';

export type PropertyType = 'string' | 'number' | 'boolean' | 'color' | 'image' | 'richtext' | 'select';

export interface PropertyDefinition {
  type: PropertyType;
  label: string;
  description?: string;
  defaultValue?: any;
  options?: { label: string; value: string | number }[]; // For select type
}

export interface ComponentSchema {
  /** Map of property key to its definition */
  properties: Record<string, PropertyDefinition>;
}

export interface ComponentMetadata<TProps = any> {
  id: string;
  name: string;
  description: string;
  category: 'Header' | 'Cover' | 'Summary' | 'Metrics' | 'Timeline' | 'Tables' | 'Charts' | 'Recommendations' | 'Appendix' | 'Footer' | 'Core';
  tags: string[];
  
  /** Which artifact modes this component supports rendering in */
  supportedArtifacts: RenderMode[];
  
  /** Schema defining the editable properties for the dynamic inspector */
  schema: ComponentSchema;
  
  /** Default properties used when instantiating this component */
  defaultProps: TProps;
  
  /** The actual React component that renders the Elements markup */
  Component: React.FC<TProps>;
}

export type ComponentRegistry = Record<string, ComponentMetadata>;
