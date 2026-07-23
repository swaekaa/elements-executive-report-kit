# Elements Executive Report Kit

A premium open-source component library and template collection for building beautiful executive documents using [Unlayer Elements](https://github.com/unlayer/elements).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![Elements](https://img.shields.io/badge/Unlayer_Elements-React-orange.svg)

---

## Overview

**Elements Executive Report Kit** is a collection of reusable, data-driven document components and ready-to-use templates built on top of [Unlayer Elements](https://unlayer.com/elements). It demonstrates how developers can compose professional executive documents using a code-first approach with React and TypeScript.

The kit includes three polished templates, 17+ reusable components, a theme system, and a preview application — all powered by Unlayer Elements as the core rendering engine.

---

## Why Elements

[Unlayer Elements](https://github.com/unlayer/elements) provides a unique set of capabilities that make it ideal for document generation:

- **Code-first React components** — Build documents using familiar JSX with `Row`, `Column`, `Heading`, `Paragraph`, `Html`, and more.
- **Write once, render anywhere** — The same component tree renders to email-safe HTML, responsive web pages, or print-ready documents.
- **Clean output** — Generates production-ready HTML without React hydration markers or runtime JavaScript.
- **TypeScript-first** — Full type definitions and IDE autocomplete for every component and prop.
- **Framework-native** — Works with Vite, Next.js, Remix, and other modern React frameworks.
- **Visual editor compatibility** — Designs can round-trip to Unlayer's visual editor via `renderToJson()`.

---

## Features

- 🖥️ **Interactive Elements Studio** — A 3-panel SaaS application showcasing live-editing of Unlayer Elements documents.
- 🎛️ **Global State Management** — Real-time updates with Context, `useReducer`, and `localStorage` persistence.
- 🧱 **19+ Reusable Components** — Includes `MetricCard`, `Timeline`, `DataTable`, `ChartPlaceholder`, `SummaryCard`, `InfoGrid`, and more.
- 📊 **7 Professional Templates** — Executive Report, Research Report, Security Audit, Incident Report, Business Review, Investor Update, and Compliance Report.
- 🎨 **Theme & Property Controls** — Context-sensitive right sidebar to edit section-level padding, backgrounds, and alignment on the fly.
- 📱 **Responsive & Print-Friendly** — Consistent layouts across screen sizes and print output.
- 🖨️ **Export Engine** — Download raw Elements HTML, JSON schema, or trigger system Print/PDF workflows.
- 🔧 **TypeScript** — Full type safety across components, state, data, and theme.

---

## Architecture

The project has evolved from a static template gallery into a fully functional **Elements Studio**.

### Application Shell (The Editor)
The Studio is built using standard React components (not Elements):
- `EditorLayout`: The 3-panel shell.
- `LeftSidebar`: Navigation, brand inputs, section selection, and export controls.
- `RightSidebar`: Context-sensitive property editor for the currently selected section.
- `useDocumentState`: The source of truth (Context + Reducer).

### Document Rendering (The Core)
Everything inside the document preview and export payload is rendered exclusively using **Unlayer Elements**.

```
Template → Components → Elements Primitives → renderToHtml() → Iframe Preview
```

The `LivePreview` component acts as a subscriber to the global state. Whenever data, styles, or themes change, it triggers `renderToHtml()` and seamlessly updates the iframe.

---

## Folder Structure

```
elements-executive-report-kit/
├── src/
│   ├── components/            # Reusable Elements-based components
│   ├── data/                  # Mock data for templates
│   ├── editor/                # The React-based Studio UI (Sidebars, Layout)
│   ├── hooks/                 # Global state management
│   ├── preview/               # Live iframe renderer
│   ├── renderer/              # Export utilities (HTML, JSON)
│   ├── templates/             # 7 Document templates
│   ├── theme/                 # Design tokens
│   ├── App.tsx                # Mounts the Studio
│   └── main.tsx
```

---

## Template Descriptions

1. **Executive Report**: Quarterly performance report for leadership.
2. **Research Report**: Academic-style experiment report.
3. **Security Audit**: Vulnerability findings and risk matrices.
4. **Incident Report**: Post-mortem timeline and root cause analysis.
5. **Business Review**: Financial highlights and operational updates.
6. **Investor Update**: CEO message and fundraising milestones.
7. **Compliance Report**: SOC2 / Framework compliance assessment.

---

## Future Roadmap

- [ ] Dark mode theme controls in the sidebar
- [ ] Drag-and-drop section reordering
- [ ] Connect a real backend to save JSON schemas
- [ ] Storybook component documentation
- [ ] Unit tests for components and rendering

---

## Built With

- [Unlayer Elements](https://github.com/unlayer/elements) — Core rendering engine
- [React](https://react.dev) — UI framework
- [TypeScript](https://typescriptlang.org) — Type safety
- [Vite](https://vitejs.dev) — Build tool

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

---

Built for the [Build with Elements Challenge](https://unlayer.com/elements).
