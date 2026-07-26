import { blocksRegistry } from '../registry';

blocksRegistry.register({
  type: 'core/section',
  name: 'Section Heading',
  description: 'A standard section heading with an optional subtitle.',
  icon: 'Heading2',
  category: 'Content',
  supportedArtifacts: ['document', 'email', 'web'],
  schema: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: 'New Section'
    },
    {
      key: 'subtitle',
      label: 'Subtitle',
      type: 'textarea',
      group: 'Content'
    },
    {
      key: 'sectionNumber',
      label: 'Section Number',
      type: 'text',
      group: 'Content'
    }
  ],
  defaultData: {
    title: 'New Section',
    subtitle: '',
    sectionNumber: ''
  }
});
