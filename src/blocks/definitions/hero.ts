import { blocksRegistry } from '../registry';

blocksRegistry.register({
  type: 'core/hero',
  name: 'Hero Banner',
  description: 'A large cover banner with title, subtitle, and metadata.',
  icon: 'Image',
  category: 'Cover',
  supportedArtifacts: ['document', 'email', 'web'],
  schema: [
    {
      key: 'title',
      label: 'Title',
      type: 'text',
      group: 'Content',
      defaultValue: '{{report.title}}'
    },
    {
      key: 'subtitle',
      label: 'Subtitle',
      type: 'textarea',
      group: 'Content',
      defaultValue: '{{report.subtitle}}'
    },
    {
      key: 'date',
      label: 'Date',
      type: 'text',
      group: 'Metadata',
      defaultValue: '{{report.date}}'
    },
    {
      key: 'author',
      label: 'Author',
      type: 'text',
      group: 'Metadata',
      defaultValue: '{{author.name}}'
    },
    {
      key: 'organization',
      label: 'Organization',
      type: 'text',
      group: 'Metadata',
      defaultValue: '{{company.name}}'
    },
    {
      key: 'version',
      label: 'Version',
      type: 'text',
      group: 'Metadata'
    }
  ],
  defaultData: {
    title: '{{report.title}}',
    subtitle: '{{report.subtitle}}',
    date: '{{report.date}}',
    author: '{{author.name}}',
    organization: '{{company.name}}',
    version: '1.0'
  }
});
