import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { Theme } from '../theme';
import { lightTheme } from '../theme';
import { executiveReportData } from '../data/executive';
import { researchReportData } from '../data/research';
import { securityReportData } from '../data/security';
import { incidentReportData, businessReviewData, investorUpdateData, complianceReportData } from '../data/newReports';
import { defaultVariables } from '../variables';
import type { VariableMap } from '../variables';

// Re-export from the shared types module (which has no internal imports)
export type { TemplateId, RenderMode, ExportTab, ViewportMode, StyleOverrides, SectionStyles, Artifact, ProjectMetadata } from '../types/studio';
import type { TemplateId, RenderMode, ExportTab, ViewportMode, StyleOverrides, SectionStyles, Artifact, ProjectMetadata } from '../types/studio';

export interface ProjectState {
  projectMetadata: ProjectMetadata;
  activeTemplate: TemplateId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documentData: any;
  theme: Theme;
  sectionStyles: SectionStyles;
  selectedSectionId: string | null;
  
  // First-Class Artifacts
  artifacts: Artifact[];
  activeArtifactId: string;
  
  // Studio UI State
  activeLeftPanel: 'explorer' | 'components';
  exportTab: ExportTab;
  zoom: number;
  devConsoleOpen: boolean;
  guidesEnabled: boolean;
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  
  // Variable Binding System
  variables: VariableMap;
}

export interface StateHistory {
  past: ProjectState[];
  present: ProjectState;
  future: ProjectState[];
}

type Action =
  // History Actions
  | { type: 'UNDO' }
  | { type: 'REDO' }
  
  // Content Actions
  | { type: 'SET_TEMPLATE'; payload: TemplateId }
  | { type: 'UPDATE_DATA'; payload: { path: string; value: any } }
  | { type: 'UPDATE_THEME'; payload: Partial<Theme> }
  | { type: 'UPDATE_SECTION_STYLE'; payload: { sectionId: string; styles: Partial<StyleOverrides> } }
  
  // Array Manipulation (For deep edits)
  | { type: 'ARRAY_ADD'; payload: { path: string; value: any } }
  | { type: 'ARRAY_REMOVE'; payload: { path: string; index: number } }
  | { type: 'ARRAY_REORDER'; payload: { path: string; startIndex: number; endIndex: number } }
  | { type: 'ARRAY_DUPLICATE'; payload: { path: string; index: number } }
  
  // Variable Actions (undoable)
  | { type: 'SET_VARIABLE'; payload: { key: string; value: string } }
  
  // Artifact Actions
  | { type: 'ADD_ARTIFACT'; payload: Artifact }
  | { type: 'REMOVE_ARTIFACT'; payload: string }
  | { type: 'UPDATE_ARTIFACT'; payload: { id: string; changes: Partial<Artifact> } }
  
  // Studio UI Actions (Don't trigger undo history)
  | { type: 'SET_LEFT_PANEL'; payload: 'explorer' | 'components' }
  | { type: 'SET_ACTIVE_ARTIFACT'; payload: string }
  | { type: 'SET_SELECTED_SECTION'; payload: string | null }
  | { type: 'SET_EXPORT_TAB'; payload: ExportTab }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'TOGGLE_DEV_CONSOLE' }
  | { type: 'TOGGLE_GUIDES' }
  | { type: 'SET_SIDEBARS'; payload: { left?: boolean; right?: boolean } };

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

const defaultArtifacts: Artifact[] = [
  { id: 'art-1', name: 'Executive Report', renderMode: 'document', viewport: 'a4', visibility: true },
  { id: 'art-2', name: 'Email Broadcast', renderMode: 'email', viewport: 'desktop', visibility: true },
  { id: 'art-3', name: 'Landing Page', renderMode: 'web', viewport: 'desktop', visibility: true },
  { id: 'art-4', name: 'Mobile Version', renderMode: 'web', viewport: 'phone', visibility: true }
];

const initialProjectState: ProjectState = {
  projectMetadata: {
    id: 'proj-default',
    name: 'AI Startup Series A',
    description: 'Executive reporting for Q4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  activeTemplate: 'executive',
  documentData: getInitialData('executive'),
  theme: lightTheme,
  sectionStyles: {},
  selectedSectionId: null,
  artifacts: defaultArtifacts,
  activeArtifactId: 'art-1',
  activeLeftPanel: 'explorer',
  exportTab: 'preview',
  zoom: 1,
  devConsoleOpen: false,
  guidesEnabled: true,
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  variables: defaultVariables
};

const initialState: StateHistory = {
  past: [],
  present: initialProjectState,
  future: []
};

// Utility to set deep nested object values
const setDeep = (obj: any, path: string, value: any): any => {
  if (!path) return value;
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

const getDeep = (obj: any, path: string): any => {
  if (!path) return obj;
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// Helper to determine if an action should be saved in history
const isUndoable = (actionType: string) => {
  return [
    'SET_TEMPLATE', 'UPDATE_DATA', 'UPDATE_THEME', 'UPDATE_SECTION_STYLE',
    'ARRAY_ADD', 'ARRAY_REMOVE', 'ARRAY_REORDER', 'ARRAY_DUPLICATE',
    'SET_VARIABLE', 'ADD_ARTIFACT', 'REMOVE_ARTIFACT', 'UPDATE_ARTIFACT'
  ].includes(actionType);
};

const MAX_HISTORY = 50;

const projectReducer = (state: ProjectState, action: Action): ProjectState => {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return {
        ...state,
        activeTemplate: action.payload,
        documentData: getInitialData(action.payload),
        sectionStyles: {},
        selectedSectionId: null
      };
    case 'UPDATE_DATA':
      return {
        ...state,
        documentData: setDeep(state.documentData, action.payload.path, action.payload.value)
      };
    case 'UPDATE_SECTION_STYLE':
      return {
        ...state,
        sectionStyles: {
          ...state.sectionStyles,
          [action.payload.sectionId]: {
            ...(state.sectionStyles[action.payload.sectionId] || {}),
            ...action.payload.styles
          }
        }
      };
    case 'UPDATE_THEME':
      return {
        ...state,
        theme: { ...state.theme, ...action.payload }
      };
    case 'ARRAY_ADD': {
      const arr = getDeep(state.documentData, action.payload.path) || [];
      return {
        ...state,
        documentData: setDeep(state.documentData, action.payload.path, [...arr, action.payload.value])
      };
    }
    case 'ARRAY_REMOVE': {
      const arr = [...(getDeep(state.documentData, action.payload.path) || [])];
      arr.splice(action.payload.index, 1);
      return {
        ...state,
        documentData: setDeep(state.documentData, action.payload.path, arr)
      };
    }
    case 'ARRAY_REORDER': {
      const arr = [...(getDeep(state.documentData, action.payload.path) || [])];
      const [moved] = arr.splice(action.payload.startIndex, 1);
      arr.splice(action.payload.endIndex, 0, moved);
      return {
        ...state,
        documentData: setDeep(state.documentData, action.payload.path, arr)
      };
    }
    case 'ARRAY_DUPLICATE': {
      const arr = [...(getDeep(state.documentData, action.payload.path) || [])];
      const itemToDuplicate = JSON.parse(JSON.stringify(arr[action.payload.index]));
      arr.splice(action.payload.index + 1, 0, itemToDuplicate);
      return {
        ...state,
        documentData: setDeep(state.documentData, action.payload.path, arr)
      };
    }
    case 'SET_VARIABLE': {
      const variable = state.variables[action.payload.key];
      if (!variable) return state;
      return {
        ...state,
        variables: {
          ...state.variables,
          [action.payload.key]: { ...variable, value: action.payload.value }
        }
      };
    }
    case 'ADD_ARTIFACT':
      return { ...state, artifacts: [...state.artifacts, action.payload] };
    case 'REMOVE_ARTIFACT':
      return { 
        ...state, 
        artifacts: state.artifacts.filter(a => a.id !== action.payload),
        activeArtifactId: state.activeArtifactId === action.payload ? state.artifacts[0]?.id : state.activeArtifactId
      };
    case 'UPDATE_ARTIFACT':
      return {
        ...state,
        artifacts: state.artifacts.map(a => 
          a.id === action.payload.id ? { ...a, ...action.payload.changes } : a
        )
      };
    case 'SET_LEFT_PANEL':
      return { ...state, activeLeftPanel: action.payload, leftSidebarOpen: true };
    case 'SET_ACTIVE_ARTIFACT':
      return { ...state, activeArtifactId: action.payload };
    case 'SET_SELECTED_SECTION':
      return { ...state, selectedSectionId: action.payload };
    case 'SET_EXPORT_TAB':
      return { ...state, exportTab: action.payload };
    case 'SET_ZOOM':
      return { ...state, zoom: Math.max(0.25, Math.min(3, action.payload)) };
    case 'TOGGLE_DEV_CONSOLE':
      return { ...state, devConsoleOpen: !state.devConsoleOpen };
    case 'TOGGLE_GUIDES':
      return { ...state, guidesEnabled: !state.guidesEnabled };
    case 'SET_SIDEBARS':
      return { 
        ...state, 
        leftSidebarOpen: action.payload.left !== undefined ? action.payload.left : state.leftSidebarOpen,
        rightSidebarOpen: action.payload.right !== undefined ? action.payload.right : state.rightSidebarOpen
      };
    default:
      return state;
  }
};

const historyReducer = (state: StateHistory, action: Action): StateHistory => {
  if (action.type === 'UNDO') {
    if (state.past.length === 0) return state;
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    return {
      past: newPast,
      present: previous,
      future: [state.present, ...state.future]
    };
  }

  if (action.type === 'REDO') {
    if (state.future.length === 0) return state;
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    return {
      past: [...state.past, state.present],
      present: next,
      future: newFuture
    };
  }

  const newPresent = projectReducer(state.present, action);

  if (state.present === newPresent) {
    return state;
  }

  if (isUndoable(action.type)) {
    const newPast = [...state.past, state.present].slice(-MAX_HISTORY);
    return {
      past: newPast,
      present: newPresent,
      future: [] // Clear future on new action
    };
  } else {
    // UI actions don't clear future or add to past, they just update present
    return {
      ...state,
      present: newPresent
    };
  }
};

const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<Action>;
  canUndo: boolean;
  canRedo: boolean;
}>({
  state: initialProjectState,
  dispatch: () => null,
  canUndo: false,
  canRedo: false
});

export const useProjectState = () => useContext(ProjectContext);
export const useDocumentState = useProjectState;

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [historyState, dispatch] = useReducer(historyReducer, initialState, (initial) => {
    try {
      const saved = localStorage.getItem('elements-studio-state-v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Safely merge present state with initial to avoid undefined properties
        if (parsed && parsed.present) {
          parsed.present = { ...initial.present, ...parsed.present };
          if (!parsed.present.sectionStyles) parsed.present.sectionStyles = {};
          if (!parsed.present.artifacts) parsed.present.artifacts = initial.present.artifacts;
          if (!parsed.present.activeArtifactId) parsed.present.activeArtifactId = initial.present.activeArtifactId;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('elements-studio-state-v3', JSON.stringify(historyState));
  }, [historyState]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for Command Palette (handled separately, but we could broadcast event)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          dispatch({ type: 'REDO' });
        } else {
          dispatch({ type: 'UNDO' });
        }
        e.preventDefault();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        dispatch({ type: 'REDO' });
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ProjectContext.Provider value={{ 
      state: historyState.present, 
      dispatch,
      canUndo: historyState.past.length > 0,
      canRedo: historyState.future.length > 0
    }}>
      {children}
    </ProjectContext.Provider>
  );
};
