# Elements Studio V3 Tasks (The Official IDE)

- `[x]` **Phase 1: IDE Core Shell**
  - `[x]` Build `StatusBar.tsx` (Bottom VS Code status bar)
  - `[x]` Build `DevConsole.tsx` (Bottom panel: Logs, Validation, JSON, HTML)
  - `[x]` Wire `EditorLayout.tsx` to include Status Bar and Dev Console
  - `[x]` Implement Split View Layout support

- `[x]` **Phase 2: Interactive Document Selection**
  - `[x]` Inject Hover/Click tracking script into `LivePreview.tsx` iframe
  - `[x]` Wire `postMessage` from iframe to `SET_SELECTED_SECTION`
  - `[x]` Highlight hovered sections with blue Figma-style outline

- `[ ]` **Phase 3: Context-Aware Inspector**
  - `[ ]` Refactor `RightSidebar.tsx` to read the selected section's type
  - `[ ]` Expose data controls (Title, Subtitle, Metrics, Events) dynamically based on selection

- `[ ]` **Phase 4: Asset Manager & Multi-Artifact Setup**
  - `[ ]` Build Asset Manager UI
  - `[ ]` Implement state structures for multi-artifact (Document vs Email outputs from same JSON)
  - `[ ]` Code Editor panels for JSON / HTML / LaTeX

- `[ ]` **Phase 5: Themes, Data, Polish**
  - `[ ]` Implement robust Data Presets (SaaS, AI Startup, etc.)
  - `[ ]` Finalize CSS transitions, spacing, typography
