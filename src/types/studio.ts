/**
 * Shared type definitions used across the studio.
 * This file must NOT import from hooks/useDocumentState or data/* to avoid circular deps.
 */

export type RenderMode = 'document' | 'email' | 'web';
export type ExportTab = 'preview' | 'html' | 'json' | 'markdown' | 'latex';
export type TemplateId = 'executive' | 'research' | 'security' | 'incident' | 'business' | 'investor' | 'compliance';
export type ViewportMode = 
  | 'desktop' | 'laptop' | 'tablet' | 'phone' | 'foldable' 
  | 'square' | 'letter' | 'a4' | 'poster' | 'presentation' 
  | 'tv' | 'cinema' | 'imax' | 'vision-pro' | 'watch' | 'kindle' | 'ultrawide';

export interface StyleOverrides {
  backgroundColor?: string;
  padding?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderRadius?: string;
  opacity?: number;
}

export type SectionStyles = Record<string, StyleOverrides>;
