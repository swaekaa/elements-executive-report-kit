import { ProjectProvider } from './hooks/useDocumentState';
import { EditorLayout } from './editor/EditorLayout';
import { registerCoreComponents } from './registry/components';

// Initialize the IDE's core component registry
registerCoreComponents();

/**
 * Elements Studio Application
 * Wraps the 3-panel editor in the state provider.
 */
function App() {
  return (
    <ProjectProvider>
      <EditorLayout />
    </ProjectProvider>
  );
}

export default App;
