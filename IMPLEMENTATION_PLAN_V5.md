# Phase 5: Visual Document Builder — Implementation Plan

> Transform Elements Studio from a property inspector into a Figma/Notion-style visual document editor where **everything visible is editable** and the user feels like they're directly editing a professional document.

---

## Current Architecture (What We Have)

| Layer | Current State |
|---|---|
| **Document Model** | Flat `documentData` object with template-specific shapes (`ExecutiveReportData`, etc.) |
| **Templates** | 7 monolithic `.tsx` files that render `@unlayer/react-elements` components |
| **Preview** | Iframe with `renderToHtml()` output + basic hover/click via text-matching heuristics |
| **Left Sidebar** | Hardcoded `layers` string array — no real connection to document structure |
| **Right Sidebar** | Hardcoded `if/else` per `selectedSectionId` → `PropertyField` or `ArrayBuilder` |
| **Component Registry** | Exists (`registry/`) with schema definitions but **not wired** to the Inspector or Layers |
| **State Management** | `useReducer` with undo/redo, `setDeep`/`getDeep`, array manipulation actions |

## Target Architecture (What We're Building)

| Layer | Target State |
|---|---|
| **Document Model** | Ordered array of **Blocks**, each with a `type`, `id`, `data`, and `schema` |
| **Templates** | Become **presets** that populate the block array — no longer control rendering |
| **Preview** | Every rendered element carries `data-block-id` and `data-field` attributes. Click selects, double-click edits inline. |
| **Left Sidebar** | **Auto-generated** block tree from the document model. Supports reorder, hide, lock, delete, duplicate. |
| **Right Sidebar** | **Auto-generated** from block schema. Search bar, breadcrumbs, property groups. |
| **Component Registry** | Central source of truth powering Insert Menu, Inspector, Validation, and Preview rendering. |
| **State Management** | Extended with block CRUD, reorder, focus, inline-edit mode. |

---

## Phased Rollout

> Each phase produces a fully functional, shippable increment. We never break existing functionality.

---

### Phase 5A — Block-Based Document Model & Auto-Generated Layer Tree

**Goal:** Replace the hardcoded `layers` array and flat `documentData` with a real block-based document model. The Left Sidebar becomes a live, auto-generated tree.

#### [NEW] `src/blocks/types.ts`
Define the core `Block` interface and `BlockSchema`:
```typescript
interface Block {
  id: string;
  type: string;          // e.g. 'hero', 'section', 'metric-grid', 'timeline', 'paragraph'
  label: string;         // User-visible name
  data: Record<string, any>;  // Block-specific content
  children?: Block[];    // Nested blocks (e.g. Section contains paragraphs)
  locked?: boolean;
  hidden?: boolean;
  collapsed?: boolean;
}

interface BlockFieldSchema {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'number' | 'color' | 'select' | 'date' | 'image' | 'array' | 'json';
  group?: string;        // Property group in Inspector
  placeholder?: string;
  options?: { label: string; value: string }[];  // For 'select'
  arrayFields?: BlockFieldSchema[];               // For 'array' type
  validation?: { required?: boolean; maxLength?: number };
}

interface BlockDefinition {
  type: string;
  name: string;
  description: string;
  icon: string;          // Lucide icon name
  category: 'cover' | 'content' | 'data' | 'layout' | 'footer';
  schema: BlockFieldSchema[];
  defaultData: Record<string, any>;
  supportedArtifacts: ('document' | 'email' | 'web')[];
  toolbarActions?: string[];
}
```

#### [NEW] `src/blocks/registry.ts`
Central registry where all block definitions register themselves. Powers the Insert Menu, Layer Tree, and Inspector.

#### [NEW] `src/blocks/definitions/` (directory)
One file per block type:
- `hero.ts` — Cover/Hero block
- `section-heading.ts` — Section heading with number
- `paragraph.ts` — Rich text paragraph
- `metric-grid.ts` — Grid of metric cards
- `timeline.ts` — Timeline events
- `callout.ts` — Info/warning callout
- `recommendation-list.ts` — Recommendation cards
- `data-table.ts` — Spreadsheet-like table
- `reference-list.ts` — References section
- `footer.ts` — Footer block
- `highlight-list.ts` — Bullet list of highlights

#### [NEW] `src/blocks/templateToBlocks.ts`
Converter that takes existing `ExecutiveReportData` (or any template data) and produces an ordered `Block[]` array. Ensures backward compatibility.

#### [MODIFY] `src/hooks/useDocumentState.tsx`
- Add `blocks: Block[]` to `ProjectState`
- Add `focusedBlockId: string | null` (replaces `selectedSectionId`)
- Add `focusedFieldKey: string | null` (for inline editing)
- New actions: `BLOCK_ADD`, `BLOCK_REMOVE`, `BLOCK_MOVE`, `BLOCK_DUPLICATE`, `BLOCK_UPDATE`, `BLOCK_TOGGLE_HIDDEN`, `BLOCK_TOGGLE_LOCKED`, `BLOCK_SET_FOCUS`, `BLOCK_SET_FIELD_FOCUS`

#### [MODIFY] `src/editor/LeftSidebar.tsx`
- Replace hardcoded `layers` array with auto-generated tree from `state.blocks`
- Each block shows: icon (from registry), label, context menu (delete, duplicate, hide, lock)
- Active block highlighted; hidden blocks show with reduced opacity; locked blocks show lock icon

---

### Phase 5B — Dynamic Inspector (Schema-Driven)

**Goal:** The Right Sidebar auto-generates its form UI from the focused block's schema. No more hardcoded `if/else` per section.

#### [NEW] `src/editor/inspector/DynamicInspector.tsx`
Reads `focusedBlockId` → looks up block in `state.blocks` → gets `BlockDefinition` from registry → renders form fields grouped by `schema[].group`.

#### [NEW] `src/editor/inspector/fields/` (directory)
Reusable field components: `TextField`, `TextAreaField`, `RichTextField`, `NumberField`, `ColorField`, `SelectField`, `DateField`, `ImageField`, `ArrayField`, `JsonField`

#### [NEW] `src/editor/inspector/PropertySearch.tsx`
Search input at the top of Inspector. Filters visible fields by label match.

#### [NEW] `src/editor/inspector/Breadcrumbs.tsx`
Shows: `Project > Artifact > Page > Block Name`. Updates automatically when focus changes.

#### [MODIFY] `src/editor/RightSidebar.tsx`
- Replace entire hardcoded Content tab with `<DynamicInspector />`
- Add `<PropertySearch />` and `<Breadcrumbs />`

---

### Phase 5C — Interactive Preview (Click-to-Edit)

**Goal:** Clicking any element in the preview selects the corresponding block. Hover shows outline + block name. Double-click opens inline editing.

#### [MODIFY] All template files
Add `data-block-id={block.id}` attributes to every rendered section's outermost element.

#### [NEW] `src/preview/interactiveScript.ts`
Enhanced interactive script:
- **Hover:** `data-block-id` elements get blue outline + floating label showing block name
- **Click:** `postMessage` with `{ type: 'STUDIO_SELECT_BLOCK', blockId }`
- **Double-click:** `postMessage` with `{ type: 'STUDIO_INLINE_EDIT', blockId, fieldKey }`

#### Auto-Navigation Flow:
```
Click element in preview
    → postMessage('STUDIO_SELECT_BLOCK', blockId)
    → dispatch(BLOCK_SET_FOCUS)
    → Left Sidebar auto-expands + scrolls to block
    → Right Sidebar auto-scrolls to block's first field
```

---

### Phase 5D — Rich Text Editing & Inline Toolbar

**Goal:** Paragraph blocks support bold, italic, underline, links, lists, headings, highlighting, text color, and alignment via a floating toolbar.

#### [NEW] `src/editor/inspector/fields/RichTextField.tsx`
Uses `contenteditable` with `document.execCommand` for rich text editing.

#### [NEW] `src/editor/InlineToolbar.tsx`
Floating toolbar that appears when text is selected:
**Bold** | **Italic** | **Underline** | **Link** | **Text Color** | **Highlight** | **Alignment**

---

### Phase 5E — Specialized Editors (Metrics, Timeline, Table, Chart)

**Goal:** Complex data blocks get purpose-built editing UIs.

- **Metric Editor** — Editable cards with Label, Value, Trend, Target, Icon, Color. Add/Duplicate/Delete/Reorder.
- **Timeline Editor (Notion-style)** — Collapsible event cards. Drag to reorder. Add between items.
- **Table Editor (Spreadsheet)** — Grid of editable cells. Add/remove rows/columns. Tab navigation.
- **Chart Editor** — Type selector (Bar, Line, Pie, Donut). Data grid. Color pickers. Axis/legend toggles.

---

### Phase 5F — Block Operations & Insert Menu

**Goal:** Full block management with keyboard shortcuts and searchable insert menu.

| Operation | Shortcut |
|---|---|
| Move Up | `Alt+↑` |
| Move Down | `Alt+↓` |
| Duplicate | `Ctrl+D` |
| Delete | `Delete` |
| Hide/Show | `Ctrl+H` |
| Lock/Unlock | `Ctrl+L` |
| Rename | `F2` |

#### [NEW] `src/editor/InsertMenu.tsx`
Searchable menu triggered by `+` button or `/` command. Shows all registered block types with icon, name, description.

---

## Open Questions

1. **Rich Text Library:** Use Tiptap (~50KB) for proper ProseMirror-based editing, or vanilla `contenteditable`?
2. **Drag-and-Drop Library:** Use `@dnd-kit/core` (~15KB), or build minimal drag system ourselves?
3. **Phase Priority:** Should we start with interactive preview (5C) before dynamic inspector (5B)?
4. **Chart Rendering:** Defer real charts (Chart.js/SVG) or implement in 5E?

---

## Verification Plan

### After Each Phase
- Existing templates continue rendering correctly
- New block model produces identical HTML output via `renderToHtml()`
- All existing undo/redo functionality preserved
- Dev server starts without errors (`npm run dev`)
- TypeScript compilation passes (`tsc --noEmit`)

### Manual Verification
- Click any element in preview → correct block selected in sidebar and inspector
- Edit any field in inspector → preview updates live
- Add/remove/reorder blocks → document updates correctly
- Rich text formatting persists through save/load cycle
