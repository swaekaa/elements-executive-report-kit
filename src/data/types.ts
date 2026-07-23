import type { TimelineItem } from '../components';
import type { ReferenceItem } from '../components';

/* ── Type Definitions ── */

export interface MetricData {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface FindingData {
  title: string;
  description: string;
  category?: string;
}

export interface RecommendationData {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
}

export interface AppendixItem {
  title: string;
  content: string;
}

export interface ExecutiveReportData {
  organization: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  version: string;
  executiveSummary: string;
  metrics: MetricData[];
  highlights: string[];
  timeline: TimelineItem[];
  findings: FindingData[];
  recommendations: RecommendationData[];
  appendix: AppendixItem[];
  references: ReferenceItem[];
  footerText: string;
}

/* ── Vulnerability & Security Types ── */

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface VulnerabilityData {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  affectedArea: string;
}

export interface RiskMatrixEntry {
  severity: string;
  count: number;
  color: string;
}

export interface ComplianceItem {
  standard: string;
  status: string;
  notes: string;
}

export interface SecurityReportData {
  organization: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  version: string;
  executiveSummary: string;
  scopeDescription: string;
  riskMatrix: RiskMatrixEntry[];
  vulnerabilities: VulnerabilityData[];
  recommendations: RecommendationData[];
  compliance: ComplianceItem[];
  appendix: AppendixItem[];
  references: ReferenceItem[];
  footerText: string;
}

/* ── Research Report Types ── */

export interface DatasetInfo {
  name: string;
  size: string;
  source: string;
  description: string;
}

export interface ResearchMetric {
  name: string;
  value: number;
  baseline?: number;
  unit?: string;
}

export interface ChartBarData {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export interface ResearchReportData {
  organization: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  version: string;
  abstract: string;
  objective: string;
  dataset: DatasetInfo;
  methodology: string[];
  metrics: ResearchMetric[];
  results: string;
  chartData: ChartBarData[];
  discussion: string;
  futureWork: string[];
  references: ReferenceItem[];
  footerText: string;
}

/* ── Incident Report Types ── */

export interface IncidentReportData {
  organization: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  version: string;
  incidentSummary: string;
  impactMetrics: MetricData[];
  timeline: TimelineItem[];
  rootCauseAnalysis: string;
  remediationSteps: string[];
  preventativeMeasures: RecommendationData[];
  appendix?: AppendixItem[];
  footerText: string;
}

/* ── Business Review Types ── */

export interface BusinessReviewData {
  organization: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  version: string;
  executiveSummary: string;
  kpis: MetricData[];
  financialHighlights: string[];
  operationalUpdates: string[];
  strategicInitiatives: string[];
  risksAndChallenges: FindingData[];
  nextSteps: string[];
  footerText: string;
}

/* ── Investor Update Types ── */

export interface InvestorUpdateData {
  organization: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  version: string;
  ceoMessage: string;
  financialMetrics: MetricData[];
  growthChart: ChartBarData[];
  productMilestones: TimelineItem[];
  marketPosition: string;
  fundraisingStatus?: string;
  footerText: string;
}

/* ── Compliance Report Types ── */

export interface ComplianceReportData {
  organization: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  version: string;
  auditScope: string;
  complianceStatus: ComplianceItem[];
  controlDeficiencies: FindingData[];
  remediationPlan: RecommendationData[];
  auditorNotes: string;
  footerText: string;
}
