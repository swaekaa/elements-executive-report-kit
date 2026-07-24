/**
 * Elements Studio — Variable Binding System
 * 
 * Variables are the core abstraction that makes "edit once, update everywhere" possible.
 * Every artifact (Document, Email, Web Page, etc.) resolves the same variables,
 * so changing {{company.name}} updates every output simultaneously.
 * 
 * This module has ZERO internal imports to prevent circular dependencies.
 */

export type VariableType = 'string' | 'number' | 'boolean' | 'color' | 'image' | 'date';

export interface Variable {
  /** Unique key, e.g. "company.name" */
  key: string;
  /** Variable type for the UI editor */
  type: VariableType;
  /** Human-readable label */
  label: string;
  /** Category for grouping in the explorer */
  category: 'company' | 'report' | 'author' | 'theme' | 'custom';
  /** The current resolved value */
  value: string;
  /** Default fallback if value is empty */
  defaultValue: string;
  /** Optional description for tooltips */
  description?: string;
}

export type VariableMap = Record<string, Variable>;

/**
 * Default variable set for a new project.
 */
export const defaultVariables: VariableMap = {
  'company.name': {
    key: 'company.name',
    type: 'string',
    label: 'Company Name',
    category: 'company',
    value: 'Meridian Consulting Group',
    defaultValue: 'Company Name',
    description: 'The primary organization name used across all artifacts.'
  },
  'company.logo': {
    key: 'company.logo',
    type: 'image',
    label: 'Company Logo URL',
    category: 'company',
    value: '',
    defaultValue: '',
    description: 'URL to the company logo image.'
  },
  'company.tagline': {
    key: 'company.tagline',
    type: 'string',
    label: 'Company Tagline',
    category: 'company',
    value: 'Strategic Innovation Partners',
    defaultValue: 'Your tagline here'
  },
  'company.website': {
    key: 'company.website',
    type: 'string',
    label: 'Website',
    category: 'company',
    value: 'https://meridian.consulting',
    defaultValue: 'https://example.com'
  },
  'report.title': {
    key: 'report.title',
    type: 'string',
    label: 'Report Title',
    category: 'report',
    value: 'Q4 2024 Executive Performance Report',
    defaultValue: 'Report Title'
  },
  'report.subtitle': {
    key: 'report.subtitle',
    type: 'string',
    label: 'Report Subtitle',
    category: 'report',
    value: 'Annual Strategic Assessment',
    defaultValue: 'Report Subtitle'
  },
  'report.date': {
    key: 'report.date',
    type: 'date',
    label: 'Report Date',
    category: 'report',
    value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    defaultValue: 'January 1, 2025'
  },
  'report.version': {
    key: 'report.version',
    type: 'string',
    label: 'Version',
    category: 'report',
    value: '1.0',
    defaultValue: '1.0'
  },
  'report.status': {
    key: 'report.status',
    type: 'string',
    label: 'Status',
    category: 'report',
    value: 'Final',
    defaultValue: 'Draft'
  },
  'author.name': {
    key: 'author.name',
    type: 'string',
    label: 'Author Name',
    category: 'author',
    value: 'Sarah Mitchell',
    defaultValue: 'Author Name'
  },
  'author.title': {
    key: 'author.title',
    type: 'string',
    label: 'Author Title',
    category: 'author',
    value: 'Chief Strategy Officer',
    defaultValue: 'Job Title'
  },
  'author.email': {
    key: 'author.email',
    type: 'string',
    label: 'Author Email',
    category: 'author',
    value: 'sarah.mitchell@meridian.consulting',
    defaultValue: 'email@example.com'
  },
  'theme.primary': {
    key: 'theme.primary',
    type: 'color',
    label: 'Primary Color',
    category: 'theme',
    value: '#1E3A5F',
    defaultValue: '#1E3A5F'
  },
  'theme.accent': {
    key: 'theme.accent',
    type: 'color',
    label: 'Accent Color',
    category: 'theme',
    value: '#2196F3',
    defaultValue: '#2196F3'
  }
};

/**
 * Resolve all {{variable.key}} placeholders in a string.
 */
export const resolveVariables = (text: string, variables: VariableMap): string => {
  return text.replace(/\{\{([^}]+)\}\}/g, (_match, key: string) => {
    const trimmed = key.trim();
    const variable = variables[trimmed];
    if (variable) {
      return variable.value || variable.defaultValue;
    }
    return `{{${trimmed}}}`;
  });
};

/**
 * Deep-resolve all string values in an object tree.
 * This is the core engine that powers "edit once, update everywhere."
 */
export const resolveVariablesDeep = (obj: unknown, variables: VariableMap): unknown => {
  if (typeof obj === 'string') {
    return resolveVariables(obj, variables);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => resolveVariablesDeep(item, variables));
  }
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = resolveVariablesDeep(value, variables);
    }
    return result;
  }
  return obj;
};
