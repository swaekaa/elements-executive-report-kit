# Phase 6: Universal Block Architecture — Implementation Plan

Provide a brief description of the problem, any background context, and what the change accomplishes.
Currently, the new visual block-based editor, interactive hover highlights, and dynamic inspector are only wired up for the **Executive Report** template (implemented in Phase 5). All other templates (Research, Security, Incident, Business, Investor, Compliance) are still using the legacy static JSX rendering. Because of this, the interactive studio features do not work on them. 

This phase will migrate all remaining templates to the block-based Document Model. 

## User Review Required

> [!WARNING]
> **Deprecating Static Templates**
> Once all templates are migrated to the block architecture, the static React components in `src/templates/*` (e.g., `ResearchReport.tsx`, `SecurityAuditReport.tsx`) will be completely obsolete. The UI will be entirely rendered dynamically via `BlockRenderer.tsx` from the underlying block data. I plan to delete these legacy `.tsx` files to clean up the codebase. Let me know if you want to keep them for any reason!

## Open Questions

None at this time. The block primitives (Hero, Section, Paragraph, Data Table, Timeline, Chart) we built in Phase 5 are robust enough to construct all the other templates.

## Proposed Changes

### `src/blocks/templateToBlocks.ts`
- **[MODIFY]** Expand this file to include converters for all template shapes:
  - `convertResearchDataToBlocks`
  - `convertSecurityDataToBlocks`
  - `convertIncidentDataToBlocks`
  - `convertBusinessDataToBlocks`
  - `convertInvestorDataToBlocks`
  - `convertComplianceDataToBlocks`
- **[MODIFY]** Add a master `convertTemplateToBlocks(templateId, data)` router function.

### `src/hooks/useDocumentState.tsx`
- **[MODIFY]** Update the reducer so that when the user switches templates (`CHANGE_TEMPLATE`), it automatically converts the new template's default data into the corresponding `Block[]` array.

### `src/preview/LivePreview.tsx`
- **[MODIFY]** Remove the hardcoded `if (state.activeTemplate === 'executive')` condition.
- **[MODIFY]** Map `state.blocks` through `BlockRenderer` unconditionally for all templates.
- **[MODIFY]** Remove all legacy template imports.

### `src/templates/*`
- **[DELETE]** `research/ResearchReport.tsx`
- **[DELETE]** `security/SecurityAuditReport.tsx`
- **[DELETE]** `incident/IncidentReport.tsx`
- **[DELETE]** `business/BusinessReview.tsx`
- **[DELETE]** `investor/InvestorUpdate.tsx`
- **[DELETE]** `compliance/ComplianceReport.tsx`

## Verification Plan

### Manual Verification
1. Open the application.
2. Select the **Research Report** from the template dropdown.
3. Verify that the document renders correctly.
4. Hover over sections in the Research Report and verify the blue interactive highlights appear perfectly.
5. Repeat for at least one more template (e.g., Security Audit) to ensure the block conversion router is working globally.
