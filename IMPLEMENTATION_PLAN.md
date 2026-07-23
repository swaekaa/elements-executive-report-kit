# Elements Executive Report Kit — Implementation Plan (Updated)

## Overview

Build a production-quality open-source component library and template collection using **Unlayer Elements** (`@unlayer/react-elements`) as the core rendering system.

**Target Repository:** `https://github.com/swaekaa/elements-executive-report-kit`

---

## Verified Elements API (from official sources)

### Package
`@unlayer/react-elements` — installed via `npm install @unlayer/react-elements`

### Root Wrappers (render modes)
- `Email` — table-based email-safe HTML
- `Page` — div/flexbox responsive web HTML  
- `Document` — print-optimized HTML for PDF
- `Body` — generic root wrapper

### Layout Components
- `Row` — container for columns; props: `layout`, `cells`, `backgroundColor`, `padding`, `noStackMobile`
- `Column` — section within row (12-column grid)
- `ColumnLayouts` — enum for preset layouts (`OneColumn`, `TwoEqual`, etc.)

### Content Components
- `Heading` — props: `headingType` (h1–h4), `fontSize`, `color`, `textAlign`, children
- `Paragraph` — props: `html`, `fontSize`, children
- `Button` — props: `href`, `backgroundColor`, `color`, children
- `Image` — props: `src`, `alt`, `width`
- `Divider` — horizontal rule
- `Table` — data tables
- `Html` — raw HTML content (for custom blocks)
- `Social` — social links
- `Menu` — navigation menu
- `Video` — video embed

### Render Functions
- `renderToHtml()` — full HTML document output
- `renderToHtmlParts()` — returns `{ head, body }` chunks
- `renderToPlainText()` — text-only output
- `renderToJson()` — Unlayer JSON format

### Hierarchy Rule
`Root (Document/Page/Email) → Row → Column → Content Components`

---

## Design Principles (per user)
1. Consistency over novelty
2. Composition over duplication
3. Minimalism over decoration
4. Reusable components over one-off implementations
5. Elements as the primary abstraction layer

---

## Phase 1: Project Setup
- Vite + React + TypeScript scaffold
- Install `@unlayer/react-elements`
- Git init + first commit

## Phase 2: Theme System (Light first, Dark-ready structure)
- Design tokens: colors, typography, spacing, borders, layout
- TypeScript interfaces for full type safety

## Phase 3: Reusable Components (Elements-based)
- All components compose Row/Column/Heading/Paragraph/Html/Divider/Image/Table
- Components: Header, Footer, Hero, Section, SectionDivider, MetricCard, Timeline, DataTable, ChartPlaceholder, Callout, Badge, RecommendationCard, RiskCard, Quote, ImageBlock, References, ProgressBar

## Phase 4: Sample Data
- TypeScript data files with realistic content for all 3 templates
- Full type definitions

## Phase 5: Templates
1. Executive Report
2. Research Report  
3. Security Audit Report

## Phase 6: Preview Application
- Template selector, rendered HTML preview via renderToHtml() in iframe
- Accessible, keyboard-friendly

## Phase 7: Documentation
- Comprehensive README with all required sections
- Screenshot placeholders in /public/screenshots/
- MIT License

## Phase 8: Polish
- Build verification
- Accessibility review
- Code cleanup

## Commit Strategy
init → setup → theme → components → data → executive → research → security → preview → docs → polish
