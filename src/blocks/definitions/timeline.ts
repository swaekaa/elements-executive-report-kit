import { blocksRegistry } from '../registry';

blocksRegistry.register({
  type: 'core/timeline',
  name: 'Timeline',
  description: 'A chronologically ordered list of events.',
  icon: 'Clock',
  category: 'Content',
  supportedArtifacts: ['document', 'email', 'web'],
  schema: [
    {
      key: 'events',
      label: 'Timeline Events',
      type: 'array',
      group: 'Content',
      arrayFields: [
        { key: 'date', label: 'Date / Time', type: 'text' },
        { key: 'title', label: 'Event Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' }
      ],
      defaultValue: []
    }
  ],
  defaultData: {
    events: [
      { date: 'Q1', title: 'Planning Phase', description: 'Initial requirements and planning.' }
    ]
  }
});
