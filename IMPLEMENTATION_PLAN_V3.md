# Elements Studio IDE — Implementation Plan V3

This plan outlines the architectural shift from a "Document Editor" to the **Official IDE for Unlayer Elements**. The primary goal is to build a development environment that makes "build once with Elements, preview and export everywhere" a reality. 

## Architectural Philosophy
1. **The Project Model:** The root entity is a `Project`, containing multiple `Artifacts` (Document, Email, Web, etc.). They all share one central data and variable model.
2. **Variable Binding System:** This is the crown jewel. Values like `{{company.name}}` are dynamically resolved across all artifacts instantly.
3. **Elements Engine:** Unlayer Elements remains the strict, unmodified rendering pipeline. All edits mutate the abstract document model, never the generated HTML.

---

## User Review Required

> [!IMPORTANT]
> The **Variable Binding System** has been rapidly prototyped in the background. If you reload your local server (`http://localhost:5173`), you will see the `Variables` panel live in the Left Sidebar. This is the first taste of the core feature! 
> 
> Before I proceed with the massive refactoring for the rest of the IDE features, please review the phases below and confirm this architecture matches your exact vision.

## Open Questions

> [!WARNING]
> **1. Data Sources vs Variables:** How strictly should we separate "Variables" (`{{author.name}}`) from "Data Sources" (JSON/APIs)? Should variables be considered a subset of Data Sources, or remain a distinct UI panel?
> **2. Component Library Rendering:** To build the "Insert Component" drag-and-drop workflow, I will need to render mini-previews of Elements primitives. Do you want these previews rendered dynamically via Elements, or static image thumbnails to save performance?

---

## Proposed Changes

### Phase 1: The Core IDE Project Structure
We will transition the Left Sidebar and top-level state from a single document view to a full Project Explorer.

#### [MODIFY] `src/hooks/useDocumentState.tsx`
- Rename state abstractions conceptually to `ProjectState`.
- Support multiple distinct `Artifacts` instead of just switching render modes.

#### [MODIFY] `src/editor/LeftSidebar.tsx`
- Refine the VS Code style explorer with Collapsible Sections for: Project, Artifacts, Templates, Components, Layers, Assets, Themes, Variables, Data Sources, Exports, History.
- Introduce hover states for Lock/Hide/Duplicate actions.

### Phase 2: The Asset Manager & Component Library
We will introduce a Figma/Storybook style component library.

#### [NEW] `src/editor/AssetManager.tsx`
- Build a dedicated modal/panel for uploading and managing images, logos, and SVGs.

#### [NEW] `src/editor/ComponentLibrary.tsx`
- Create a visual catalog of reusable Elements templates (Cards, Metrics, Charts).
- Prepare the architecture for future drag-and-drop insertion.

### Phase 3: The Dynamic Inspector & Theme Builder
The Right Sidebar will become contextually aware.

#### [MODIFY] `src/editor/RightSidebar.tsx`
- Replace the generic inspector with dedicated controls (e.g., Timeline Editor vs Metric Editor).
- Read the active component type via the tracking script in `LivePreview.tsx`.

#### [NEW] `src/editor/ThemeBuilder.tsx`
- Build a comprehensive design system editor mapping to Elements themes (Colors, Typography, Radius, Borders, Shadows).

### Phase 4: Monaco & Split View Integration
Bring true developer tools into the studio.

#### [NEW] `src/editor/SplitView.tsx`
- Implement resizable panes allowing Preview + HTML or Preview + JSON side-by-side.

#### [NEW] `src/editor/MonacoEditor.tsx`
- Integrate Monaco for syntax-highlighted editing of JSON data and output inspection.

### Phase 5: Export Center & Bottom Panel
Complete the VS Code / Unlayer hybrid experience.

#### [MODIFY] `src/editor/DevConsole.tsx`
- Build the Bottom Panel with tabs: Console, Validation, Render Tree, Accessibility.

#### [NEW] `src/editor/ExportCenter.tsx`
- Build a dedicated workflow for exporting HTML, PDF, Markdown, LaTeX, and Design JSON.

---

## Verification Plan

### Automated Tests
- Typecheck the entire project with strict mode enabled (`tsc --noEmit`).
- Ensure no circular dependencies are introduced during the massive refactor.

### Manual Verification
- We will manually test the Variable Binding System: changing `{{company.name}}` should instantly update the Web, Email, and Document views.
- We will test the Monaco editor initialization and ensuring HMR does not crash the React tree.
