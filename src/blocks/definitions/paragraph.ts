import { blocksRegistry } from '../registry';

blocksRegistry.register({
  type: 'core/paragraph',
  name: 'Paragraph',
  description: 'A block of rich text content.',
  icon: 'AlignLeft',
  category: 'Content',
  supportedArtifacts: ['document', 'email', 'web'],
  schema: [
    {
      key: 'content',
      label: 'Content',
      type: 'richtext',
      group: 'Content',
      defaultValue: '<p>Start typing here...</p>'
    }
  ],
  defaultData: {
    content: '<p>Start typing here...</p>'
  }
});
