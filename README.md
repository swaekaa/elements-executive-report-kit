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

- 🧱 **17+ Reusable Components** — Header, Footer, Hero, Section, MetricCard, Timeline, DataTable, ChartPlaceholder, Callout, Badge, RecommendationCard, RiskCard, Quote, ImageBlock, References, ProgressBar, ContentBlock
- 📊 **3 Professional Templates** — Executive Report, Research Report, Security Audit
- 🎨 **Theme System** — Design tokens for colors, typography, spacing, and borders (light mode, dark-mode ready)
- 📱 **Responsive & Print-Friendly** — Consistent layouts across screen sizes and print output
- 🔤 **Data-Driven** — Templates consume typed data objects — no hardcoded content
- ♿ **Accessible** — Semantic HTML, proper heading hierarchy, keyboard navigation, ARIA roles
- 🖨️ **PDF-Ready** — Print the rendered output directly or convert to PDF
- 🔧 **TypeScript** — Full type safety across components, data, and theme

---

## Architecture

The project follows a composition-first architecture where templates are assembled from reusable components, and all rendering flows through Unlayer Elements.

```
Template → Components → Elements Primitives → renderToHtml() → HTML Output
```

### Component Hierarchy

```
Document (Elements root wrapper)
├── Hero (Row → Column → Heading + Paragraph + Html)
├── Section (Row → Column → Heading + children)
│   ├── ContentBlock (Row → Column → Paragraph)
│   ├── MetricCardGrid (Row → Column → Html)
│   ├── Timeline (Row → Column → Html)
│   ├── DataTable (Row → Column → Html)
│   ├── ChartPlaceholder (Row → Column → Html)
│   ├── Callout (Row → Column → Html)
│   ├── RecommendationCard (Row → Column → Html)
│   ├── RiskCard (Row → Column → Html)
│   └── Quote (Row → Column → Html)
├── SectionDivider (Row → Column → Divider)
├── References (Row → Column → Html)
└── Footer (Row → Column → Html)
```

Every custom component internally composes Elements primitives (`Row`, `Column`, `Heading`, `Paragraph`, `Html`, `Divider`, `Image`). The `Html` component is used for custom-styled blocks like cards, badges, and charts — this is the official Elements approach for embedding custom HTML content.

---

## Folder Structure

```
elements-executive-report-kit/
├── public/
│   └── screenshots/          # Screenshot placeholders
├── src/
│   ├── components/            # Reusable Elements-based components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Section.tsx
│   │   ├── SectionDivider.tsx
│   │   ├── MetricCard.tsx
│   │   ├── Timeline.tsx
│   │   ├── DataTable.tsx
│   │   ├── ChartPlaceholder.tsx
│   │   ├── Callout.tsx
│   │   ├── Badge.tsx
│   │   ├── RecommendationCard.tsx
│   │   ├── RiskCard.tsx
│   │   ├── Quote.tsx
│   │   ├── ImageBlock.tsx
│   │   ├── References.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ContentBlock.tsx
│   │   └── index.ts
│   ├── data/                  # Sample data for templates
│   │   ├── executive.ts
│   │   ├── research.ts
│   │   ├── security.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── templates/             # Document templates
│   │   ├── executive/
│   │   │   ├── ExecutiveReport.tsx
│   │   │   └── index.ts
│   │   ├── research/
│   │   │   ├── ResearchReport.tsx
│   │   │   └── index.ts
│   │   ├── security/
│   │   │   ├── SecurityAuditReport.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── theme/                 # Design tokens and theme system
│   │   ├── theme.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── App.tsx                # Preview application
│   ├── App.css
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── LICENSE
└── README.md
```

---

## Theme System

The theme system provides consistent design tokens used across all components:

| Token Group | Values |
|:---|:---|
| **Colors** | Neutral palette (50–950), semantic (success, warning, danger, info), surface, text |
| **Typography** | Inter font family, 10 size steps (xs–5xl), 4 weight levels, 3 line heights |
| **Spacing** | 8-step scale (xs–4xl) plus section and page constants |
| **Borders** | 5 radius values (sm–full), consistent border width |
| **Layout** | Content width (800px), narrow width (640px) |

The theme is structured so a dark mode variant can be added later by creating a new theme object that implements the same `Theme` interface.

```typescript
import { lightTheme, getTheme } from './theme';

// Use directly
const theme = lightTheme;

// Or via factory (dark mode ready)
const theme = getTheme('light');
```

---

## Installation

```bash
# Clone the repository
git clone https://github.com/swaekaa/elements-executive-report-kit.git
cd elements-executive-report-kit

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Running Locally

```bash
# Development server with hot reload
npm run dev

# Type checking
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

The preview application will be available at `http://localhost:5173`. Use the toolbar tabs to switch between templates and the Print button to export.

---

## Template Descriptions

### 1. Executive Report

A quarterly performance report suitable for leadership presentations and board meetings.

**Sections:** Cover Page → Executive Summary → KPI Cards → Highlights → Timeline → Key Findings → Recommendations → Appendix → References → Footer

**Components used:** Hero, Section, MetricCardGrid, Timeline, Callout, RecommendationCard, ContentBlock, References, Footer

![Executive Report](public/screenshots/executive-report.png)

---

### 2. Research Report

An academic-style experiment report for ML/data science teams.

**Sections:** Cover → Abstract → Objective → Dataset → Methodology → Results (table + chart) → Discussion → Future Work → References → Footer

**Components used:** Hero, Section, DataTable, ChartPlaceholder, ContentBlock, References, Footer

![Research Report](public/screenshots/research-report.png)

---

### 3. Security Audit Report

A professional security assessment with vulnerability findings and compliance status.

**Sections:** Cover → Executive Summary → Scope → Vulnerability Overview (chart + table) → Detailed Findings → Recommendations → Compliance Status → Appendix → References → Footer

**Components used:** Hero, Section, ChartPlaceholder, DataTable, RiskCard, RecommendationCard, Callout, ContentBlock, References, Footer

![Security Audit Report](public/screenshots/security-audit.png)

---

## Customization

### Using Your Own Data

Templates are fully data-driven. Replace the sample data with your own:

```typescript
import { ExecutiveReport } from './templates/executive';
import type { ExecutiveReportData } from './data/types';

const myData: ExecutiveReportData = {
  organization: 'Your Company',
  title: 'Your Report Title',
  // ... fill in all fields
};

// Render to HTML
const html = renderToHtml(<ExecutiveReport data={myData} />);
```

### Creating New Components

Follow the established pattern — compose Elements primitives:

```typescript
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

interface MyComponentProps {
  content: string;
  theme: Theme;
}

export const MyComponent: React.FC<MyComponentProps> = ({ content, theme }) => (
  <Row backgroundColor={theme.colors.background} padding="16px 0">
    <Column>
      <Html html={`<div style="...">${content}</div>`} />
    </Column>
  </Row>
);
```

### Modifying the Theme

Edit `src/theme/theme.ts` to customize design tokens:

```typescript
export const lightTheme: Theme = {
  colors: {
    primary: '#your-color',
    // ...
  },
  typography: {
    fontFamily: "'Your Font', sans-serif",
    // ...
  },
};
```

---

## Future Roadmap

- [ ] Dark mode theme
- [ ] Additional templates (Invoice, Proposal, Newsletter)
- [ ] PDF export integration
- [ ] Template gallery with visual previews
- [ ] JSON export via `renderToJson()` for visual editor round-tripping
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
