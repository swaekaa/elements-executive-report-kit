import type { IncidentReportData, BusinessReviewData, InvestorUpdateData, ComplianceReportData } from './types';

export const incidentReportData: IncidentReportData = {
  organization: 'Acme Corp',
  title: 'Post-Incident Report',
  subtitle: 'Outage #8932: Database Cluster Failure',
  date: 'August 12, 2026',
  author: 'Site Reliability Engineering',
  version: '1.0 Final',
  incidentSummary: 'On August 10, a cascading failure in the primary database cluster caused a 42-minute global service outage. Data integrity was preserved, and services were fully restored via automated failover mechanisms.',
  impactMetrics: [
    { label: 'Downtime', value: '42 mins', changeType: 'negative' },
    { label: 'Affected Users', value: '14.2K', changeType: 'negative' },
    { label: 'Data Loss', value: '0 bytes', changeType: 'positive' }
  ],
  timeline: [
    { date: '14:00 UTC', title: 'Incident Began', description: 'Primary DB CPU spiked to 100%.' },
    { date: '14:15 UTC', title: 'Automated Alerting', description: 'PagerDuty triggered for SRE on-call.' },
    { date: '14:42 UTC', title: 'Service Restored', description: 'Traffic routed to secondary read-replicas.' }
  ],
  rootCauseAnalysis: 'A rogue migration query executed without an index caused table locks, exhausting connection pools.',
  remediationSteps: [
    'Terminated blocking queries immediately.',
    'Promoted read-replica to primary.',
    'Restarted application connection pools.'
  ],
  preventativeMeasures: [
    { title: 'Strict Query Linting', description: 'Require indexing on all migration queries.', priority: 'high', category: 'Process' },
    { title: 'Connection Limits', description: 'Implement stricter pgbouncer limits.', priority: 'medium', category: 'Infrastructure' }
  ],
  footerText: 'Internal Use Only. Confidential Engineering Report.'
};

export const businessReviewData: BusinessReviewData = {
  organization: 'Acme Corp',
  title: 'Quarterly Business Review',
  subtitle: 'Q3 2026 Operations & Finance',
  date: 'October 1, 2026',
  author: 'Executive Team',
  version: 'Q3-FINAL',
  executiveSummary: 'Q3 saw record revenue growth driven by the enterprise segment, though profit margins were slightly compressed by increased R&D headcount. Customer retention remains best-in-class.',
  kpis: [
    { label: 'Quarterly Revenue', value: '$4.2M', change: '+12%', changeType: 'positive' },
    { label: 'Gross Margin', value: '72%', change: '-2%', changeType: 'negative' },
    { label: 'Net Retention', value: '114%', change: '+1%', changeType: 'positive' }
  ],
  financialHighlights: [
    'Enterprise ARR grew 32% year-over-year.',
    'Operating expenses increased by 8% due to hiring.',
    'Cash on hand is currently $14.5M.'
  ],
  operationalUpdates: [
    'Successfully opened the new London engineering hub.',
    'Launched the highly requested AI Analytics dashboard.'
  ],
  strategicInitiatives: [
    'Expand channel partner network in EMEA.',
    'Reduce AWS infrastructure costs by 15% through reserved instances.'
  ],
  risksAndChallenges: [
    { title: 'Hiring Delays', description: 'Time-to-hire for senior engineers has increased to 45 days.', category: 'HR' }
  ],
  nextSteps: [
    'Finalize Q4 hiring plan by next Friday.',
    'Review SOC2 compliance readiness with external auditors.'
  ],
  footerText: 'Acme Corp Q3 Business Review'
};

export const investorUpdateData: InvestorUpdateData = {
  organization: 'Acme Corp',
  title: 'Investor Update',
  subtitle: 'Monthly Stakeholder Briefing',
  date: 'November 2026',
  author: 'Jane Doe, CEO',
  version: '1.0',
  ceoMessage: 'Thank you for your continued support. This month we hit our biggest milestone yet: crossing $10M in ARR while maintaining cash-flow positivity. Our new product line is exceeding expectations.',
  financialMetrics: [
    { label: 'ARR', value: '$10.2M', change: '+5%', changeType: 'positive' },
    { label: 'Burn Rate', value: '-$50K', changeType: 'positive' },
    { label: 'Runway', value: 'Indefinite', changeType: 'neutral' }
  ],
  growthChart: [
    { label: 'Jan', value: 8.2 },
    { label: 'Feb', value: 8.6 },
    { label: 'Mar', value: 9.3 },
    { label: 'Apr', value: 10.2 }
  ],
  productMilestones: [
    { date: 'Nov 1', title: 'Beta Launch', description: 'Opened v2.0 beta to 500 waitlist users.' },
    { date: 'Nov 15', title: 'Mobile App', description: 'iOS app submitted for App Store review.' }
  ],
  marketPosition: 'We are currently recognized as a "Strong Performer" in the latest industry analyst report, outranking two major incumbents on user experience.',
  fundraisingStatus: 'We are not actively fundraising, but expect to raise a Series B in Q3 next year to accelerate global expansion.',
  footerText: 'Confidential Investor Update - Do not distribute.'
};

export const complianceReportData: ComplianceReportData = {
  organization: 'Acme Corp',
  title: 'Compliance Audit Report',
  subtitle: 'SOC 2 Type II Annual Assessment',
  date: 'December 15, 2026',
  author: 'SecureAudit Partners LLC',
  version: 'Final',
  auditScope: 'This audit covered the Security and Availability trust services criteria for the core SaaS platform hosted on AWS between Jan 1 and Dec 1 2026.',
  complianceStatus: [
    { standard: 'Security (CC1-CC9)', status: 'Passed', notes: 'No material exceptions found.' },
    { standard: 'Availability (A1)', status: 'Passed', notes: 'SLA exceeded 99.99%.' }
  ],
  controlDeficiencies: [
    { title: 'Access Revocation Delay', description: 'One contractor retained VPN access for 48 hours after termination.', category: 'Medium' }
  ],
  remediationPlan: [
    { title: 'Automate Offboarding', description: 'Integrate HRIS directly with Okta for zero-touch deprovisioning.', priority: 'high', category: 'IT' }
  ],
  auditorNotes: 'Management has demonstrated a strong commitment to the control environment. The identified deficiency is isolated and a remediation plan is already in progress.',
  footerText: 'SOC2 Type II Report - Confidential'
};
