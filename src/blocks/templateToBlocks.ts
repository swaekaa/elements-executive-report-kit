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

const renderList = (items: string[]) => `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;

export function convertExecutiveDataToBlocks(data: ExecutiveReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', { id: 'hero-1', data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version } }));
  
  const summarySection = blocksRegistry.createInstance('core/section', { id: 'section-summary', data: { title: 'Executive Summary', sectionNumber: '1' } });
  summarySection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'summary-p1', data: { content: data.executiveSummary } })];
  blocks.push(summarySection);

  if (data.highlights && data.highlights.length > 0) {
    const highlightsSection = blocksRegistry.createInstance('core/section', { id: 'section-highlights', data: { title: 'Key Highlights', sectionNumber: '2' } });
    highlightsSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'highlights-list', data: { content: renderList(data.highlights) } })];
    blocks.push(highlightsSection);
  }

  if (data.metrics && data.metrics.length > 0) {
    const metricsSection = blocksRegistry.createInstance('core/section', { id: 'section-metrics', data: { title: 'Key Performance Indicators', sectionNumber: '3' } });
    metricsSection.children = [blocksRegistry.createInstance('core/metric-grid', { id: 'metrics-grid-1', data: { metrics: data.metrics } })];
    blocks.push(metricsSection);
  }
  
  if (data.timeline && data.timeline.length > 0) {
    const timelineSection = blocksRegistry.createInstance('core/section', { id: 'section-timeline', data: { title: 'Project Timeline', sectionNumber: '4' } });
    timelineSection.children = [blocksRegistry.createInstance('core/timeline', { id: 'timeline-1', data: { events: data.timeline } })];
    blocks.push(timelineSection);
  }

  if (data.findings && data.findings.length > 0) {
    const tableSection = blocksRegistry.createInstance('core/section', { id: 'section-findings', data: { title: 'Key Findings', sectionNumber: '5' } });
    const tableRows = data.findings.map(f => [f.title, f.category || '', f.description]);
    tableSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-findings', data: { headers: [{label:'Finding'}, {label:'Category'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(tableSection);
  }

  if (data.recommendations && data.recommendations.length > 0) {
    const recSection = blocksRegistry.createInstance('core/section', { id: 'section-recommendations', data: { title: 'Recommendations', sectionNumber: '6' } });
    const tableRows = data.recommendations.map(r => [r.title, r.priority, r.description]);
    recSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-recommendations', data: { headers: [{label:'Recommendation'}, {label:'Priority'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(recSection);
  }

  return blocks;
}

export function convertSecurityDataToBlocks(data: SecurityReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', { id: 'hero-1', data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version } }));
  
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

  if (data.recommendations && data.recommendations.length > 0) {
    const recSection = blocksRegistry.createInstance('core/section', { id: 'section-recommendations', data: { title: 'Recommendations', sectionNumber: '4' } });
    const tableRows = data.recommendations.map(r => [r.title, r.priority, r.description]);
    recSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-recommendations', data: { headers: [{label:'Recommendation'}, {label:'Priority'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(recSection);
  }

  if (data.compliance && data.compliance.length > 0) {
    const compSection = blocksRegistry.createInstance('core/section', { id: 'section-compliance', data: { title: 'Compliance Status', sectionNumber: '5' } });
    const tableRows = data.compliance.map(c => [c.standard, c.status, c.notes]);
    compSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-compliance', data: { headers: [{label:'Standard'}, {label:'Status'}, {label:'Notes'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(compSection);
  }

  return blocks;
}

export function convertResearchDataToBlocks(data: ResearchReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', { id: 'hero-1', data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version } }));
  
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
  
  if (data.methodology && data.methodology.length > 0) {
    const methSection = blocksRegistry.createInstance('core/section', { id: 'section-methodology', data: { title: 'Methodology', sectionNumber: '4' } });
    methSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'methodology-list', data: { content: renderList(data.methodology) } })];
    blocks.push(methSection);
  }

  if (data.chartData && data.chartData.length > 0) {
    const resultsSection = blocksRegistry.createInstance('core/section', { id: 'section-results', data: { title: 'Results', sectionNumber: '5' } });
    resultsSection.children = [
      blocksRegistry.createInstance('core/paragraph', { id: 'results-p1', data: { content: data.results || '' } }),
      blocksRegistry.createInstance('core/chart', {
        id: 'chart-results',
        data: { chartType: 'bar', data: data.chartData.map(c => ({ name: c.label, value: c.value.toString() })) }
      })
    ];
    blocks.push(resultsSection);
  }

  if (data.discussion) {
    const discSection = blocksRegistry.createInstance('core/section', { id: 'section-discussion', data: { title: 'Discussion', sectionNumber: '6' } });
    discSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'discussion-p1', data: { content: data.discussion } })];
    blocks.push(discSection);
  }

  if (data.futureWork && data.futureWork.length > 0) {
    const futureSection = blocksRegistry.createInstance('core/section', { id: 'section-future', data: { title: 'Future Work', sectionNumber: '7' } });
    futureSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'future-list', data: { content: renderList(data.futureWork) } })];
    blocks.push(futureSection);
  }

  return blocks;
}

export function convertIncidentDataToBlocks(data: IncidentReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', { id: 'hero-1', data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version } }));
  
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
  
  if (data.rootCauseAnalysis) {
    const rootCauseSection = blocksRegistry.createInstance('core/section', { id: 'section-rca', data: { title: 'Root Cause Analysis', sectionNumber: '4' } });
    rootCauseSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'rca-p1', data: { content: data.rootCauseAnalysis } })];
    blocks.push(rootCauseSection);
  }

  if (data.remediationSteps && data.remediationSteps.length > 0) {
    const remSection = blocksRegistry.createInstance('core/section', { id: 'section-remediation', data: { title: 'Remediation Steps', sectionNumber: '5' } });
    remSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'rem-list', data: { content: renderList(data.remediationSteps) } })];
    blocks.push(remSection);
  }

  if (data.preventativeMeasures && data.preventativeMeasures.length > 0) {
    const prevSection = blocksRegistry.createInstance('core/section', { id: 'section-preventative', data: { title: 'Preventative Measures', sectionNumber: '6' } });
    const tableRows = data.preventativeMeasures.map(p => [p.title, p.priority, p.description]);
    prevSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-prev', data: { headers: [{label:'Measure'}, {label:'Priority'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(prevSection);
  }

  return blocks;
}

export function convertBusinessDataToBlocks(data: BusinessReviewData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', { id: 'hero-1', data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version } }));
  
  const summarySection = blocksRegistry.createInstance('core/section', { id: 'section-summary', data: { title: 'Executive Summary', sectionNumber: '1' } });
  summarySection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'summary-p1', data: { content: data.executiveSummary } })];
  blocks.push(summarySection);

  if (data.kpis && data.kpis.length > 0) {
    const kpiSection = blocksRegistry.createInstance('core/section', { id: 'section-kpis', data: { title: 'Key Performance Indicators', sectionNumber: '2' } });
    kpiSection.children = [blocksRegistry.createInstance('core/metric-grid', { id: 'metrics-kpi', data: { metrics: data.kpis } })];
    blocks.push(kpiSection);
  }

  if (data.financialHighlights && data.financialHighlights.length > 0) {
    const finSection = blocksRegistry.createInstance('core/section', { id: 'section-financials', data: { title: 'Financial Highlights', sectionNumber: '3' } });
    finSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'fin-list', data: { content: renderList(data.financialHighlights) } })];
    blocks.push(finSection);
  }

  if (data.operationalUpdates && data.operationalUpdates.length > 0) {
    const opSection = blocksRegistry.createInstance('core/section', { id: 'section-operations', data: { title: 'Operational Updates', sectionNumber: '4' } });
    opSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'op-list', data: { content: renderList(data.operationalUpdates) } })];
    blocks.push(opSection);
  }

  if (data.strategicInitiatives && data.strategicInitiatives.length > 0) {
    const stratSection = blocksRegistry.createInstance('core/section', { id: 'section-strategy', data: { title: 'Strategic Initiatives', sectionNumber: '5' } });
    stratSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'strat-list', data: { content: renderList(data.strategicInitiatives) } })];
    blocks.push(stratSection);
  }

  if (data.risksAndChallenges && data.risksAndChallenges.length > 0) {
    const riskSection = blocksRegistry.createInstance('core/section', { id: 'section-risks', data: { title: 'Risks & Challenges', sectionNumber: '6' } });
    const tableRows = data.risksAndChallenges.map(r => [r.title, r.category || '', r.description]);
    riskSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-risks', data: { headers: [{label:'Risk'}, {label:'Category'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(riskSection);
  }

  if (data.nextSteps && data.nextSteps.length > 0) {
    const nextSection = blocksRegistry.createInstance('core/section', { id: 'section-next-steps', data: { title: 'Next Steps', sectionNumber: '7' } });
    nextSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'next-list', data: { content: renderList(data.nextSteps) } })];
    blocks.push(nextSection);
  }

  return blocks;
}

export function convertInvestorDataToBlocks(data: InvestorUpdateData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', { id: 'hero-1', data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version } }));
  
  const ceoSection = blocksRegistry.createInstance('core/section', { id: 'section-ceo', data: { title: 'CEO Message', sectionNumber: '1' } });
  ceoSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'ceo-p1', data: { content: data.ceoMessage } })];
  blocks.push(ceoSection);

  if (data.financialMetrics && data.financialMetrics.length > 0) {
    const kpiSection = blocksRegistry.createInstance('core/section', { id: 'section-financials', data: { title: 'Financial Overview', sectionNumber: '2' } });
    kpiSection.children = [blocksRegistry.createInstance('core/metric-grid', { id: 'metrics-fin', data: { metrics: data.financialMetrics } })];
    blocks.push(kpiSection);
  }

  if (data.growthChart && data.growthChart.length > 0) {
    const growthSection = blocksRegistry.createInstance('core/section', { id: 'section-growth', data: { title: 'Growth Trends', sectionNumber: '3' } });
    growthSection.children = [blocksRegistry.createInstance('core/chart', {
      id: 'chart-growth',
      data: { chartType: 'bar', data: data.growthChart.map(c => ({ name: c.label, value: c.value.toString() })) }
    })];
    blocks.push(growthSection);
  }

  if (data.productMilestones && data.productMilestones.length > 0) {
    const milesSection = blocksRegistry.createInstance('core/section', { id: 'section-milestones', data: { title: 'Product Milestones', sectionNumber: '4' } });
    milesSection.children = [blocksRegistry.createInstance('core/timeline', { id: 'timeline-miles', data: { events: data.productMilestones } })];
    blocks.push(milesSection);
  }

  if (data.marketPosition) {
    const marketSection = blocksRegistry.createInstance('core/section', { id: 'section-market', data: { title: 'Market Position', sectionNumber: '5' } });
    marketSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'market-p1', data: { content: data.marketPosition } })];
    blocks.push(marketSection);
  }

  if (data.fundraisingStatus) {
    const fundSection = blocksRegistry.createInstance('core/section', { id: 'section-fundraising', data: { title: 'Fundraising Status', sectionNumber: '6' } });
    fundSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'fund-p1', data: { content: data.fundraisingStatus } })];
    blocks.push(fundSection);
  }

  return blocks;
}

export function convertComplianceDataToBlocks(data: ComplianceReportData): Block[] {
  const blocks: Block[] = [];
  blocks.push(blocksRegistry.createInstance('core/hero', { id: 'hero-1', data: { title: data.title, subtitle: data.subtitle, date: data.date, author: data.author, organization: data.organization, version: data.version } }));
  
  const scopeSection = blocksRegistry.createInstance('core/section', { id: 'section-scope', data: { title: 'Audit Scope', sectionNumber: '1' } });
  scopeSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'scope-p1', data: { content: data.auditScope } })];
  blocks.push(scopeSection);

  if (data.complianceStatus && data.complianceStatus.length > 0) {
    const tableSection = blocksRegistry.createInstance('core/section', { id: 'section-status', data: { title: 'Compliance Status', sectionNumber: '2' } });
    const tableRows = data.complianceStatus.map(v => [v.standard, v.status, v.notes]);
    tableSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-comp', data: { headers: [{label:'Standard'}, {label:'Status'}, {label:'Notes'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(tableSection);
  }

  if (data.controlDeficiencies && data.controlDeficiencies.length > 0) {
    const defSection = blocksRegistry.createInstance('core/section', { id: 'section-deficiencies', data: { title: 'Control Deficiencies', sectionNumber: '3' } });
    const tableRows = data.controlDeficiencies.map(d => [d.title, d.category || '', d.description]);
    defSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-def', data: { headers: [{label:'Title'}, {label:'Category'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(defSection);
  }

  if (data.remediationPlan && data.remediationPlan.length > 0) {
    const remSection = blocksRegistry.createInstance('core/section', { id: 'section-remediation', data: { title: 'Remediation Plan', sectionNumber: '4' } });
    const tableRows = data.remediationPlan.map(r => [r.title, r.priority, r.description]);
    remSection.children = [blocksRegistry.createInstance('core/table', { id: 'table-rem-plan', data: { headers: [{label:'Task'}, {label:'Priority'}, {label:'Description'}], rows: JSON.stringify(tableRows) } })];
    blocks.push(remSection);
  }

  if (data.auditorNotes) {
    const notesSection = blocksRegistry.createInstance('core/section', { id: 'section-notes', data: { title: 'Auditor Notes', sectionNumber: '5' } });
    notesSection.children = [blocksRegistry.createInstance('core/paragraph', { id: 'notes-p1', data: { content: data.auditorNotes } })];
    blocks.push(notesSection);
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
