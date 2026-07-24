# Elements Studio V2 Implementation Plan

This document outlines the massive architectural upgrade to transform the current prototype into a production-grade, Figma/Linear-inspired document authoring studio powered by Unlayer Elements.

## Goal Description
Evolve the Elements Executive Report Kit into a professional, robust document authoring studio. This includes a complete overhaul of the UI shell (Top Toolbar, Left/Right Sidebars, Developer Console, Responsive Previewer) and a massive expansion of the state management to support deep editing of arrays, undo/redo, multiple themes, and real-time output switching (Email vs. Document vs. Web).

> [!WARNING]
> **User Review Required**
> This is a very large architectural shift. Please review the proposed Component structure and Open Questions below before we begin execution.

## Open Questions

1. **Sidebar Responsibilities**: You requested "expandable sections" in the Left Sidebar (Content, Appearance, Typography) AND a redesigned Right Sidebar with Tabs (Content, Style, Layout, Advanced). To avoid duplicate UI, I propose treating the **Left Sidebar** strictly as a "Layers / Outline Tree" (for adding, deleting, duplicating, and reordering sections/metrics/events) and the **Right Sidebar** as the "Inspector" (where you actually edit the text, colors, padding, and layout of the selected layer). Does this Figma-like separation of concerns work for you?
2. **LaTeX Generation**: Unlayer Elements produces HTML/JSON. Generating LaTeX from the JSON state is an entirely custom mapping layer we will need to build from scratch. I will implement a basic `jsonToLatex` transpiler for the core primitives (Row, Column, Text). Is this acceptable?
3. **Undo/Redo**: Implementing a robust history stack for deep nested state changes can be complex. I will implement a `past`, `present`, `future` wrapper around our `useReducer` state. 

## Proposed Architecture Changes

### State Management (`src/hooks/useDocumentState.tsx`)
We need to overhaul the reducer to support:
- **Undo/Redo History**: Wrapping the state in a history object.
- **Deep Array Editing**: New action types to `ADD`, `REMOVE`, `REORDER`, and `UPDATE_INDEX` for complex nested arrays (Metrics, Timelines, Recommendations).
- **Global Studio State**: Tracking Zoom level (50%-200%), Viewport Mode (Desktop, Mobile, IMAX, etc.), Render Mode (Email, Document, Page), and Bottom Panel visibility.

### Layout Overhaul (`src/editor/EditorLayout.tsx`)
Moving from a simple 3-panel layout to a complex IDE layout (VS Code / Figma style):
- **Top Toolbar**: Global controls, view modes, and export tabs.
- **Left Sidebar**: Component hierarchy and data structure tree.
- **Right Sidebar**: Deep property inspector (Content, Style, Layout, Advanced tabs).
- **Center Area**: Split pane with the Live Preview (top) and Developer Panel (bottom).

### Live Preview Engine (`src/preview/LivePreview.tsx`)
- Implement a responsive scaling wrapper using CSS `transform: scale(zoom)` and fixed `width/height` dimensions based on the selected Viewport.
- Add Grid Overlays and Margin Guides toggles.
- Switch the root Elements component dynamically (`<DocumentEmail>`, `<Document>`, `<Page>`) based on the Toolbar selection.

---

## Execution Phases (Incremental Commits)

To ensure stability and buildability at every step, the implementation will be broken down into phases.

### Phase 1: Core Layout & State Overhaul
- Rewrite `useDocumentState` to include history (Undo/Redo), Viewport settings, and deep array mutation actions.
- Build the `TopToolbar` with Mode Switchers (Email/Doc/Web) and Zoom/Viewport selectors.
- Update `LivePreview` to support responsive container sizing and zoom scaling.
- *Verify & Commit*

### Phase 2: The Right Sidebar (Inspector)
- Build the Right Sidebar tab system (Content, Style, Layout, Advanced).
- Create dedicated form controls for Typography, Padding, Margins, Borders, and Colors.
- Wire these controls up to update the global `sectionStyles` and `documentData` state.
- *Verify & Commit*

### Phase 3: The Left Sidebar (Layer Tree)
- Build the collapsible tree view representing the document structure.
- Add deep array controls (Add/Delete/Duplicate/Reorder) for Metrics, Timeline events, and Recommendations.
- *Verify & Commit*

### Phase 4: Developer Panel & Export Modes
- Build the bottom developer console (VS Code style).
- Implement live HTML and JSON output tabs.
- Build the custom `jsonToLatex` transpiler.
- *Verify & Commit*

### Phase 5: Themes, Data & Polish
- Inject the new Theme presets (Corporate, Minimal, Dark, etc.).
- Inject the new Data presets (AI Startup, SaaS, Healthcare, etc.).
- Add premium micro-interactions (hover states, smooth transitions) and polish the UI to match standard-bearers like Linear and Vercel.
- *Verify & Commit*

## Verification Plan

### Automated Tests
- Typecheck compilation to ensure all state interactions are correctly typed.

### Manual Verification
- Visual confirmation of layout scaling in the Live Preview.
- Testing Undo/Redo stack integrity.
- Ensuring the `renderToHtml()` payload outputs pure static HTML without hydration issues.
- Verifying the LaTeX transpiler produces valid `.tex` syntax.
