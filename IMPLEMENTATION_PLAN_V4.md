# Phase 4: Premium Property Inspector (Dark Mode & Array Builders)

The goal of this phase is to dramatically overhaul the Right Sidebar (Property Inspector) to match the premium, dark-mode aesthetic of top-tier incident management and developer tools (as requested in the reference images). We will replace raw JSON textareas with structured, beautiful array builders.

## User Review Required

> [!IMPORTANT]  
> **Global Dark Mode vs Sidebar Only**: The reference screenshots show a beautiful dark mode UI. Should we convert the **entire application** (Left Sidebar, Top Bar, Right Sidebar) to this dark theme, or **only the Right Sidebar**? (I recommend converting the entire IDE wrapper to dark mode for a cohesive premium feel, while leaving the central report canvas preview in light mode).

> [!IMPORTANT]  
> **Inspector Paradigm**: Currently, you click a layer on the left, and edit it on the right. The reference images show a unified scrolling panel with collapsible sections (`INCIDENT`, `NARRATIVE`, `TIMELINE`). 
> **Decision**: I propose we keep the current "Click left, Edit right" paradigm to maintain the IDE feel, but we will style the Right Sidebar to look exactly like the reference images (collapsible headers, dark inputs, array cards). Does this work for you?

## Proposed Changes

### 1. Unified Premium Dark Theme (IDE Wrapper)
We will update the styling of the Editor UI (Left Sidebar, Right Sidebar, Top Bar) to a premium dark mode (`#0f0f0f` background, `#1a1a1a` cards, `#e5e7eb` text, subtle borders). 
- The central `LivePreview` canvas will remain light-mode (or match the template's theme) so you can accurately see what the final report looks like.

### 2. Structured Array Builder UI
We will build a custom `ArrayBuilder` component to replace the raw JSON textareas for:
- Timeline Events
- Impact Metrics
- Tables / Affected Services
- Recommendations

**Features of the Array Builder:**
- **Item Cards**: Each item in the array will be rendered as a dark card with a number prefix (e.g., `01`, `02`) and a "Remove" button.
- **Form Grids**: Inside each card, we will render a grid of fields (e.g., `TIME (UTC)` and `STATUS` side-by-side).
- **Add Button**: A sleek `+ Add event` / `+ Add metric` button at the bottom of the list.

### 3. Refactoring RightSidebar.tsx
#### [MODIFY] [RightSidebar.tsx](file:///c:/Users/Ekaansh/OneDrive/Desktop/AB/projects/elements-executive-report-kit/src/editor/RightSidebar.tsx)
- Apply the dark theme CSS to the sidebar container.
- Update `PropertyField` to use dark inputs with subtle `#333` borders and `#111` backgrounds.
- Introduce `ArrayBuilder` for all array-based properties.
- Add small, uppercase, spaced-out labels (e.g., `TIME (UTC)`) to match the reference typography.

#### [MODIFY] [LeftSidebar.tsx](file:///c:/Users/Ekaansh/OneDrive/Desktop/AB/projects/elements-executive-report-kit/src/editor/LeftSidebar.tsx) & [TopToolbar.tsx](file:///c:/Users/Ekaansh/OneDrive/Desktop/AB/projects/elements-executive-report-kit/src/editor/TopToolbar.tsx)
- Apply the matching dark theme for cohesive IDE aesthetics.

## Verification Plan
1. **Visual Match**: Compare the new Right Sidebar to the provided reference screenshots.
2. **Functionality**: Ensure adding, removing, and editing items in the `ArrayBuilder` successfully updates the `documentData` and re-renders the preview in real-time.
3. **Variable Injection**: Ensure the variable pill UI still looks beautiful and functions correctly in the new dark mode inputs.
