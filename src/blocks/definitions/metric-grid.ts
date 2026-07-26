import { blocksRegistry } from '../registry';

blocksRegistry.register({
  type: 'core/metric-grid',
  name: 'Metric Grid',
  description: 'A grid of cards displaying primary metric values.',
  icon: 'LayoutGrid',
  category: 'Data',
  supportedArtifacts: ['document', 'email', 'web'],
  schema: [
    {
      key: 'metrics',
      label: 'Metrics',
      type: 'array',
      group: 'Content',
      arrayFields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'text' },
        { key: 'change', label: 'Change', type: 'text' },
        {
          key: 'changeType',
          label: 'Trend Direction',
          type: 'select',
          options: [
            { label: 'Positive', value: 'positive' },
            { label: 'Negative', value: 'negative' },
            { label: 'Neutral', value: 'neutral' }
          ]
        }
      ],
      defaultValue: []
    }
  ],
  defaultData: {
    metrics: [
      { label: 'Metric Name', value: '0', change: '+0%', changeType: 'positive' }
    ]
  }
});
