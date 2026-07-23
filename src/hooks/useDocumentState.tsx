import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Theme } from '../theme';
import { lightTheme } from '../theme';
import { executiveReportData } from '../data/executive';
import { researchReportData } from '../data/research';
import { securityReportData } from '../data/security';
import { incidentReportData, businessReviewData, investorUpdateData, complianceReportData } from '../data/newReports';

export type TemplateId = 'executive' | 'research' | 'security' | 'incident' | 'business' | 'investor' | 'compliance';

export interface StyleOverrides {
  backgroundColor?: string;
  padding?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export type SectionStyles = Record<string, StyleOverrides>;

export interface DocumentState {
  activeTemplate: TemplateId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documentData: any;
  theme: Theme;
  sectionStyles: SectionStyles;
  selectedSectionId: string | null;
}

type Action =
  | { type: 'SET_TEMPLATE'; payload: TemplateId }
  | { type: 'UPDATE_DATA'; payload: { path: string; value: any } }
  | { type: 'SET_SELECTED_SECTION'; payload: string | null }
  | { type: 'UPDATE_SECTION_STYLE'; payload: { sectionId: string; styles: Partial<StyleOverrides> } }
  | { type: 'UPDATE_THEME'; payload: Partial<Theme> };

const getInitialData = (templateId: TemplateId) => {
  switch (templateId) {
    case 'executive': return executiveReportData;
    case 'research': return researchReportData;
    case 'security': return securityReportData;
    case 'incident': return incidentReportData;
    case 'business': return businessReviewData;
    case 'investor': return investorUpdateData;
    case 'compliance': return complianceReportData;
    default: return executiveReportData;
  }
};

const initialState: DocumentState = {
  activeTemplate: 'executive',
  documentData: executiveReportData,
  theme: lightTheme,
  sectionStyles: {},
  selectedSectionId: null,
};

const LOCAL_STORAGE_KEY = 'elements_studio_state';

const loadState = (): DocumentState => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Re-hydrate full theme and data to avoid missing required fields if version changes
      return {
        ...initialState,
        activeTemplate: parsed.activeTemplate || initialState.activeTemplate,
        documentData: parsed.documentData || initialState.documentData,
        sectionStyles: parsed.sectionStyles || initialState.sectionStyles,
      };
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }
  return initialState;
};

// Simple utility to deep update object based on dot-notation path
const setDeep = (obj: any, path: string, value: any): any => {
  const parts = path.split('.');
  const newObj = { ...obj };
  let current = newObj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i] as string;
    if (Array.isArray(current[part])) {
      current[part] = [...current[part]];
    } else {
      current[part] = { ...current[part] };
    }
    current = current[part];
  }
  
  current[parts[parts.length - 1] as string] = value;
  return newObj;
};

const reducer = (state: DocumentState, action: Action): DocumentState => {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return {
        ...state,
        activeTemplate: action.payload,
        documentData: getInitialData(action.payload),
        sectionStyles: {},
        selectedSectionId: null,
      };
    case 'UPDATE_DATA':
      return {
        ...state,
        documentData: setDeep(state.documentData, action.payload.path, action.payload.value),
      };
    case 'SET_SELECTED_SECTION':
      return {
        ...state,
        selectedSectionId: action.payload,
      };
    case 'UPDATE_SECTION_STYLE':
      return {
        ...state,
        sectionStyles: {
          ...state.sectionStyles,
          [action.payload.sectionId]: {
            ...state.sectionStyles[action.payload.sectionId],
            ...action.payload.styles,
          }
        }
      };
    case 'UPDATE_THEME':
      return {
        ...state,
        theme: {
          ...state.theme,
          ...action.payload,
        }
      };
    default:
      return state;
  }
};

const DocumentContext = createContext<{
  state: DocumentState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      activeTemplate: state.activeTemplate,
      documentData: state.documentData,
      sectionStyles: state.sectionStyles,
    }));
  }, [state]);

  return (
    <DocumentContext.Provider value={{ state, dispatch }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentState = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentState must be used within a DocumentProvider');
  }
  return context;
};
