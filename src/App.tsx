import { DocumentProvider } from './hooks/useDocumentState';
import { EditorLayout } from './editor/EditorLayout';

/**
 * Elements Studio Application
 * Wraps the 3-panel editor in the state provider.
 */
function App() {
  return (
    <DocumentProvider>
      <EditorLayout />
    </DocumentProvider>
  );
}

export default App;
