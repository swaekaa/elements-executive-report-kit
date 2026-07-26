import { blocksRegistry } from '../registry';

blocksRegistry.register({
  type: 'core/table',
  name: 'Data Table',
  description: 'A spreadsheet-like grid for tabular data.',
  icon: 'Table',
  category: 'Data',
  supportedArtifacts: ['document', 'web', 'email'],
  schema: [
    {
      key: 'headers',
      label: 'Column Headers',
      type: 'array',
      group: 'Structure',
      arrayFields: [
        { key: 'label', label: 'Column Name', type: 'text' }
      ],
      defaultValue: []
    },
    {
      key: 'rows',
      label: 'Rows Data (JSON array)',
      type: 'textarea', // We will build a better spreadsheet editor, but for now we use JSON text or basic array
      group: 'Data',
      defaultValue: '[\n  ["Row 1 Col 1", "Row 1 Col 2"],\n  ["Row 2 Col 1", "Row 2 Col 2"]\n]'
    }
  ],
  defaultData: {
    headers: [{ label: 'Column 1' }, { label: 'Column 2' }],
    rows: '[\n  ["Row 1 Col 1", "Row 1 Col 2"],\n  ["Row 2 Col 1", "Row 2 Col 2"]\n]'
  }
});
