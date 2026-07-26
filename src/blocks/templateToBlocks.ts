import { blocksRegistry } from './registry';
import type { Block } from './types';
import type { ExecutiveReportData } from '../data/types';

export function convertExecutiveDataToBlocks(data: ExecutiveReportData): Block[] {
  const blocks: Block[] = [];

  // 1. Hero Block
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: {
      title: data.title,
      subtitle: data.subtitle,
      date: data.date,
      author: data.author,
      organization: data.organization,
      version: data.version
    }
  }));

  // 2. Executive Summary Section
  const summarySection = blocksRegistry.createInstance('core/section', {
    id: 'section-summary',
    data: {
      title: 'Executive Summary',
      sectionNumber: '1'
    }
  });
  summarySection.children = [
    blocksRegistry.createInstance('core/paragraph', {
      id: 'summary-p1',
      data: { content: data.executiveSummary }
    })
  ];
  blocks.push(summarySection);

  // 3. Metrics Section
  if (data.metrics && data.metrics.length > 0) {
    const metricsSection = blocksRegistry.createInstance('core/section', {
      id: 'section-metrics',
      data: {
        title: 'Key Performance Indicators',
        sectionNumber: '2'
      }
    });
    metricsSection.children = [
      blocksRegistry.createInstance('core/metric-grid', {
        id: 'metrics-grid-1',
        data: { metrics: data.metrics }
      })
    ];
    blocks.push(metricsSection);
  }

  // 4. Timeline Section
  if (data.timeline && data.timeline.length > 0) {
    const timelineSection = blocksRegistry.createInstance('core/section', {
      id: 'section-timeline',
      data: { title: 'Project Timeline', sectionNumber: '3' }
    });
    timelineSection.children = [
      blocksRegistry.createInstance('core/timeline', {
        id: 'timeline-1',
        data: { events: data.timeline }
      })
    ];
    blocks.push(timelineSection);
  }

  // 5. Chart Section
  const chartSection = blocksRegistry.createInstance('core/section', {
    id: 'section-chart',
    data: { title: 'Financial Overview', sectionNumber: '4' }
  });
  chartSection.children = [
    blocksRegistry.createInstance('core/chart', {
      id: 'chart-1',
      data: {
        chartType: 'bar',
        data: [
          { name: 'Q1', value: '4200' },
          { name: 'Q2', value: '4800' },
          { name: 'Q3', value: '5500' },
          { name: 'Q4', value: '6200' }
        ]
      }
    })
  ];
  blocks.push(chartSection);

  // 6. Table Section (Findings)
  if (data.findings && data.findings.length > 0) {
    const tableSection = blocksRegistry.createInstance('core/section', {
      id: 'section-table',
      data: { title: 'Key Findings', sectionNumber: '5' }
    });
    
    // Map findings to a 2D array for the table
    const tableRows = data.findings.map(f => [f.title, f.category, f.description]);
    
    tableSection.children = [
      blocksRegistry.createInstance('core/table', {
        id: 'table-1',
        data: {
          headers: [{ label: 'Finding' }, { label: 'Category' }, { label: 'Details' }],
          rows: JSON.stringify(tableRows, null, 2)
        }
      })
    ];
    blocks.push(tableSection);
  }

  return blocks;
}
