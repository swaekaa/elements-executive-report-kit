import { blocksRegistry } from '../registry';

blocksRegistry.register({
  type: 'core/chart',
  name: 'Data Chart',
  description: 'A customizable chart powered by Recharts.',
  icon: 'BarChart3',
  category: 'Data',
  supportedArtifacts: ['document', 'web'],
  schema: [
    {
      key: 'chartType',
      label: 'Chart Type',
      type: 'select',
      group: 'Chart Settings',
      options: [
        { label: 'Bar', value: 'bar' },
        { label: 'Line', value: 'line' },
        { label: 'Area', value: 'area' },
        { label: 'Pie', value: 'pie' }
      ],
      defaultValue: 'bar'
    },
    {
      key: 'data',
      label: 'Chart Data',
      type: 'array',
      group: 'Data',
      arrayFields: [
        { key: 'name', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'text' }
      ],
      defaultValue: []
    }
  ],
  defaultData: {
    chartType: 'bar',
    data: [
      { name: 'Jan', value: '400' },
      { name: 'Feb', value: '300' },
      { name: 'Mar', value: '600' },
      { name: 'Apr', value: '800' }
    ]
  }
});
