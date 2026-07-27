import { blocksRegistry } from './registry';
import type { Block } from './types';
import type { 
  ExecutiveReportData, 
  SecurityReportData,
  ResearchReportData,
  IncidentReportData,
  BusinessReviewData,
  InvestorUpdateData,
  ComplianceReportData
} from '../data/types';

export function convertExecutiveDataToBlocks(data: ExecutiveReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version }
  }));
  const summarySection = blocksRegistry.createInstance('core/section', { id: 'section-summary', data: { title: 'Executive Summary', sectionNumber: '1' } });
  summarySection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'summary-p1', data: { content: data.executiveSummary } })];
  blocks.push(summarySection);
  if (data.metrics && data.metrics.length > 0) {
    const metricsSection = blocksRegistry.createInstance('core/section', { id: 'section-metrics', data: { title: 'Key Performance Indicators', sectionNumber: '2' } });
    metricsSection.children = [blocksRegistry.createInstance('core/metric-grid', { id: 'metrics-grid-1', data: { metrics: data.metrics } })];
    blocks.push(metricsSection);
  }
  if (data.timeline && data.timeline.length > 0) {
    const timelineSection = blocksRegistry.createInstance('core/section', { id: 'section-timeline', data: { title: 'Project Timeline', sectionNumber: '3' } });
    timelineSection.children = [blocksRegistry.createInstance('core/timeline', { id: 'timeline-1', data: { events: data.timeline } })];
    blocks.push(timelineSection);
  }
  const chartSection = blocksRegistry.createInstance('core/section', { id: 'section-chart', data: { title: 'Financial Overview', sectionNumber: '4' } });
  chartSection.children = [blocksRegistry.createInstance('core/chart', {
    id: 'chart-1',
    data: { chartType: 'bar', data: [{ name: 'Q1', value: '4200' }, { name: 'Q2', value: '4800' }, { name: 'Q3', value: '5500' }, { name: 'Q4', value: '6200' }] }
  })];
  blocks.push(chartSection);
  if (data.findings && data.findings.length > 0) {
    const tableSection = blocksRegistry.createInstance('core/section', { id: 'section-table', data: { title: 'Key Findings', sectionNumber: '5' } });
    const tableRows = data.findings.map(f => [f.title, f.category || '', f.description]);
    tableSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-1', data: { headers: [{label:'Finding'}, {label:'Category'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(tableSection);
  }
  return blocks;
}

export function convertSecurityDataToBlocks(data: SecurityReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version }
  }));
  
  const summarySection = blocksRegistry.createInstance('core/section', { id: 'section-summary', data: { title: 'Executive Summary', sectionNumber: '1' } });
  summarySection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'summary-p1', data: { content: data.executiveSummary } })];
  blocks.push(summarySection);

  const scopeSection = blocksRegistry.createInstance('core/section', { id: 'section-scope', data: { title: 'Scope Description', sectionNumber: '2' } });
  scopeSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'scope-p1', data: { content: data.scopeDescription } })];
  blocks.push(scopeSection);

  if (data.vulnerabilities && data.vulnerabilities.length > 0) {
    const vulnSection = blocksRegistry.createInstance('core/section', { id: 'section-vuln', data: { title: 'Vulnerabilities', sectionNumber: '3' } });
    const tableRows = data.vulnerabilities.map(v => [v.id, v.title, v.severity, v.affectedArea]);
    vulnSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-vuln', data: { headers: [{label:'ID'}, {label:'Title'}, {label:'Severity'}, {label:'Area'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(vulnSection);
  }

  return blocks;
}

export function convertResearchDataToBlocks(data: ResearchReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version }
  }));
  
  const abstractSection = blocksRegistry.createInstance('core/section', { id: 'section-abstract', data: { title: 'Abstract', sectionNumber: '1' } });
  abstractSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'abstract-p1', data: { content: data.abstract } })];
  blocks.push(abstractSection);

  const objectiveSection = blocksRegistry.createInstance('core/section', { id: 'section-objective', data: { title: 'Objective', sectionNumber: '2' } });
  objectiveSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'objective-p1', data: { content: data.objective } })];
  blocks.push(objectiveSection);

  if (data.dataset) {
    const datasetSection = blocksRegistry.createInstance('core/section', { id: 'section-dataset', data: { title: 'Dataset', sectionNumber: '3' } });
    const tableRows = [['Name', data.dataset.name], ['Size', data.dataset.size], ['Source', data.dataset.source]];
    datasetSection.children = [
      blocksRegistry.createInstance('core/table', { id: 'table-dataset', data: { headers: [{label:'Property'}, {label:'Value'}], rows: JSON.stringify(tableRows) } }),
      blocksRegistry.createInstance('core/paragraph', { id: 'dataset-desc', data: { content: data.dataset.description } })
    ];
    blocks.push(datasetSection);
  }
  
  if (data.chartData && data.chartData.length > 0) {
    const resultsSection = blocksRegistry.createInstance('core/section', { id: 'section-results', data: { title: 'Results', sectionNumber: '5' } });
    resultsSection.children = [blocksRegistry.createInstance('core/chart', {
      id: 'chart-results',
      data: { chartType: 'bar', data: data.chartData.map(c => ({ name: c.label, value: c.value.toString() })) }
    })];
    blocks.push(resultsSection);
  }

  return blocks;
}

export function convertIncidentDataToBlocks(data: IncidentReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version }
  }));
  
  const summarySection = blocksRegistry.createInstance('core/section', { id: 'section-summary', data: { title: 'Incident Summary', sectionNumber: '1' } });
  summarySection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'summary-p1', data: { content: data.incidentSummary } })];
  blocks.push(summarySection);

  if (data.impactMetrics && data.impactMetrics.length > 0) {
    const metricsSection = blocksRegistry.createInstance('core/section', { id: 'section-impact', data: { title: 'Impact Metrics', sectionNumber: '2' } });
    metricsSection.children = [blocksRegistry.createInstance('core/metric-grid', { id: 'metrics-impact', data: { metrics: data.impactMetrics } })];
    blocks.push(metricsSection);
  }

  if (data.timeline && data.timeline.length > 0) {
    const timelineSection = blocksRegistry.createInstance('core/section', { id: 'section-timeline', data: { title: 'Timeline', sectionNumber: '3' } });
    timelineSection.children = [blocksRegistry.createInstance('core/timeline', { id: 'timeline-inc', data: { events: data.timeline } })];
    blocks.push(timelineSection);
  }

  return blocks;
}

export function convertBusinessDataToBlocks(data: BusinessReviewData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version }
  }));
  
  const summarySection = blocksRegistry.createInstance('core/section', { id: 'section-summary', data: { title: 'Executive Summary', sectionNumber: '1' } });
  summarySection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'summary-p1', data: { content: data.executiveSummary } })];
  blocks.push(summarySection);

  if (data.kpis && data.kpis.length > 0) {
    const kpiSection = blocksRegistry.createInstance('core/section', { id: 'section-kpis', data: { title: 'Key Performance Indicators', sectionNumber: '2' } });
    kpiSection.children = [blocksRegistry.createInstance('core/metric-grid', { id: 'metrics-kpi', data: { metrics: data.kpis } })];
    blocks.push(kpiSection);
  }

  return blocks;
}

export function convertInvestorDataToBlocks(data: InvestorUpdateData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version }
  }));
  
  const ceoSection = blocksRegistry.createInstance('core/section', { id: 'section-ceo', data: { title: 'CEO Message', sectionNumber: '1' } });
  ceoSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'ceo-p1', data: { content: data.ceoMessage } })];
  blocks.push(ceoSection);

  if (data.financialMetrics && data.financialMetrics.length > 0) {
    const kpiSection = blocksRegistry.createInstance('core/section', { id: 'section-financials', data: { title: 'Financial Overview', sectionNumber: '2' } });
    kpiSection.children = [blocksRegistry.createInstance('core/metric-grid', { id: 'metrics-fin', data: { metrics: data.financialMetrics } })];
    blocks.push(kpiSection);
  }

  return blocks;
}

export function convertComplianceDataToBlocks(data: ComplianceReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', {
    id: 'hero-1',
    data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version }
  }));
  
  const scopeSection = blocksRegistry.createInstance('core/section', { id: 'section-scope', data: { title: 'Audit Scope', sectionNumber: '1' } });
  scopeSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'scope-p1', data: { content: data.auditScope } })];
  blocks.push(scopeSection);

  if (data.complianceStatus && data.complianceStatus.length > 0) {
    const tableSection = blocksRegistry.createInstance('core/section', { id: 'section-status', data: { title: 'Compliance Status', sectionNumber: '2' } });
    const tableRows = data.complianceStatus.map(v => [v.standard, v.status, v.notes]);
    tableSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-comp', data: { headers: [{label:'Standard'}, {label:'Status'}, {label:'Notes'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(tableSection);
  }

  return blocks;
}

export function convertTemplateToBlocks(templateId: string, data: any): Block[] {
  switch (templateId) {
    case 'security': return convertSecurityDataToBlocks(data);
    case 'research': return convertResearchDataToBlocks(data);
    case 'incident': return convertIncidentDataToBlocks(data);
    case 'business': return convertBusinessDataToBlocks(data);
    case 'investor': return convertInvestorDataToBlocks(data);
    case 'compliance': return convertComplianceDataToBlocks(data);
    case 'executive':
    default:
      return convertExecutiveDataToBlocks(data);
  }
}
