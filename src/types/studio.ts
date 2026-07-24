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

/**
 * An Artifact represents a specific output configuration of a project.
 * Multiple artifacts (e.g. Email, Web Page, PDF) share the same document model.
 */
export interface Artifact {
  id: string;
  name: string;
  icon?: string;
  renderMode: RenderMode;
  viewport: ViewportMode;
  themeOverride?: string; // Optional ID of a specific theme to use
  visibility: boolean;
  metadata?: Record<string, string>;
  pages?: { id: string; name: string; isDefault?: boolean }[];
}

export interface ProjectMetadata {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
