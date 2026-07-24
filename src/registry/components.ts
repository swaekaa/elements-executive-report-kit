import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { MetricCard } from '../components/MetricCard';
import { registerComponent } from './index';
import type { ComponentMetadata } from './types';

export const registerCoreComponents = () => {
  const headerMeta: ComponentMetadata = {
    id: 'core-header',
    name: 'Document Header',
    description: 'A standard header with logo, title, subtitle, and date.',
    category: 'Header',
    tags: ['header', 'title', 'intro'],
    supportedArtifacts: ['document', 'email', 'web'],
    schema: {
      properties: {
        title: { type: 'string', label: 'Title', defaultValue: 'Document Title' },
        subtitle: { type: 'string', label: 'Subtitle', defaultValue: '' },
        date: { type: 'string', label: 'Date', defaultValue: '' },
        logoText: { type: 'string', label: 'Logo Text', defaultValue: 'COMPANY NAME' }
      }
    },
    defaultProps: {
      title: '{{report.title}}',
      subtitle: '{{report.subtitle}}',
      date: '{{report.date}}',
      logoText: '{{company.name}}',
      theme: undefined // Provided by context/resolver
    },
    Component: Header as any
  };

  const heroMeta: ComponentMetadata = {
    id: 'core-hero',
    name: 'Hero Banner',
    description: 'A large, impactful banner with background color or image.',
    category: 'Cover',
    tags: ['hero', 'cover', 'banner'],
    supportedArtifacts: ['document', 'email', 'web'],
    schema: {
      properties: {
        title: { type: 'string', label: 'Title', defaultValue: 'Hero Title' },
        subtitle: { type: 'string', label: 'Subtitle', defaultValue: '' }
      }
    },
    defaultProps: {
      title: '{{report.title}}',
      subtitle: '{{report.subtitle}}',
      theme: undefined
    },
    Component: Hero as any
  };

  const metricMeta: ComponentMetadata = {
    id: 'core-metric-card',
    name: 'Metric Card',
    description: 'A card displaying a primary metric value with an optional trend indicator.',
    category: 'Metrics',
    tags: ['metric', 'kpi', 'number', 'card'],
    supportedArtifacts: ['document', 'email', 'web'],
    schema: {
      properties: {
        title: { type: 'string', label: 'Metric Name', defaultValue: 'Revenue' },
        value: { type: 'string', label: 'Value', defaultValue: '$1M' },
        trend: { type: 'string', label: 'Trend', defaultValue: '+5%' },
        trendDirection: { 
          type: 'select', 
          label: 'Trend Direction', 
          defaultValue: 'up',
          options: [{ label: 'Up', value: 'up' }, { label: 'Down', value: 'down' }, { label: 'Neutral', value: 'neutral' }]
        },
        description: { type: 'string', label: 'Description', defaultValue: '' }
      }
    },
    defaultProps: {
      title: 'Metric Name',
      value: '0',
      theme: undefined
    },
    Component: MetricCard as any
  };

  registerComponent(headerMeta);
  registerComponent(heroMeta);
  registerComponent(metricMeta);
};
