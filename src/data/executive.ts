import type { ExecutiveReportData } from './types';

export const executiveReportData: ExecutiveReportData = {
  organization: 'Meridian Consulting Group',
  title: 'Q4 2024 Executive Performance Report',
  subtitle: 'Strategic insights and operational metrics for the fourth quarter',
  date: 'January 15, 2025',
  author: 'Sarah Chen, VP of Strategy',
  version: '2.1',

  executiveSummary:
    'The fourth quarter of 2024 delivered strong results across all key performance areas. Revenue grew 18% year-over-year, driven by expansion in enterprise accounts and successful product launches. Customer retention remained above target at 94.2%, while operational efficiency improvements reduced costs by 12%. This report provides a comprehensive analysis of Q4 performance, identifies emerging trends, and outlines strategic recommendations for the coming fiscal year.',

  metrics: [
    { label: 'Revenue', value: '$24.8M', change: '+18% YoY', changeType: 'positive' },
    { label: 'Customer Retention', value: '94.2%', change: '+2.1pp', changeType: 'positive' },
    { label: 'Net Promoter Score', value: '72', change: '+8 pts', changeType: 'positive' },
    { label: 'Operational Cost', value: '$8.2M', change: '-12% YoY', changeType: 'positive' },
    { label: 'Active Users', value: '148K', change: '+31%', changeType: 'positive' },
    { label: 'Support Response', value: '2.4h', change: '-0.8h', changeType: 'positive' },
  ],

  highlights: [
    'Enterprise segment grew 42% with 12 new Fortune 500 accounts signed in Q4.',
    'Product v3.0 launch exceeded adoption targets by 25% within the first 60 days.',
    'Successfully completed SOC 2 Type II certification ahead of schedule.',
    'Reduced average customer onboarding time from 14 days to 8 days.',
    'Expanded engineering team by 18 hires across three new geographic locations.',
  ],

  timeline: [
    {
      date: 'October 2024',
      title: 'Product v3.0 Launch',
      description: 'Major platform release with new analytics dashboard and API improvements.',
    },
    {
      date: 'October 2024',
      title: 'SOC 2 Certification',
      description: 'Completed SOC 2 Type II audit with zero critical findings.',
    },
    {
      date: 'November 2024',
      title: 'Enterprise Expansion',
      description: 'Signed partnerships with three Fortune 500 companies in the financial sector.',
    },
    {
      date: 'November 2024',
      title: 'Team Expansion',
      description: 'Opened new engineering offices in Austin and Berlin.',
    },
    {
      date: 'December 2024',
      title: 'Year-End Review',
      description: 'Completed annual strategic planning and set FY2025 OKRs.',
    },
  ],

  findings: [
    {
      title: 'Enterprise segment outperforming growth targets',
      description:
        'The enterprise segment has consistently exceeded quarterly targets for the past three quarters. Deal sizes have increased by an average of 35%, indicating strong product-market fit in this segment. The sales cycle has shortened from 120 days to 85 days.',
      category: 'Growth',
    },
    {
      title: 'Infrastructure costs trending downward',
      description:
        'Cloud optimization initiatives have reduced infrastructure costs by 22% while supporting a 40% increase in platform usage. The migration to containerized workloads has improved resource utilization significantly.',
      category: 'Operations',
    },
    {
      title: 'Customer churn concentrated in SMB segment',
      description:
        'While overall retention is strong, the SMB segment shows a churn rate of 8.2%, primarily driven by pricing sensitivity and feature gaps. Targeted retention programs should be considered for this segment.',
      category: 'Risk',
    },
    {
      title: 'Mobile engagement growing rapidly',
      description:
        'Mobile platform usage has grown 65% quarter-over-quarter, with mobile users showing 2.3x higher engagement rates compared to desktop-only users. Investment in mobile experience should be prioritized.',
      category: 'Opportunity',
    },
  ],

  recommendations: [
    {
      title: 'Invest in enterprise sales capacity',
      description:
        'Expand the enterprise sales team by 40% to capitalize on growing demand. Current pipeline coverage ratio suggests potential revenue loss due to capacity constraints.',
      priority: 'high',
      category: 'Growth',
    },
    {
      title: 'Launch SMB retention program',
      description:
        'Develop a targeted retention program for the SMB segment including pricing flexibility, simplified onboarding, and dedicated success resources.',
      priority: 'high',
      category: 'Retention',
    },
    {
      title: 'Accelerate mobile platform development',
      description:
        'Allocate additional engineering resources to mobile development. Consider native app capabilities and offline functionality based on user research.',
      priority: 'medium',
      category: 'Product',
    },
    {
      title: 'Expand partner ecosystem',
      description:
        'Build strategic partnerships with complementary SaaS platforms to create an integrated solution ecosystem and drive indirect revenue.',
      priority: 'medium',
      category: 'Strategy',
    },
    {
      title: 'Implement advanced analytics platform',
      description:
        'Deploy a comprehensive analytics platform to improve data-driven decision making across product, sales, and operations teams.',
      priority: 'low',
      category: 'Infrastructure',
    },
  ],

  appendix: [
    {
      title: 'Methodology',
      content:
        'This report consolidates data from internal analytics platforms, CRM systems, financial reporting tools, and customer surveys conducted during Q4 2024. All financial figures are reported in USD and have been reviewed by the finance team.',
    },
    {
      title: 'Data Sources',
      content:
        'Salesforce CRM, Mixpanel Analytics, Stripe Billing, Zendesk Support, internal data warehouse, and quarterly customer satisfaction survey (n=2,847).',
    },
  ],

  references: [
    { id: '1', text: 'Q4 2024 Financial Statements, Internal Finance Report' },
    { id: '2', text: 'Customer Satisfaction Survey Results, December 2024' },
    { id: '3', text: 'Product Analytics Dashboard, Mixpanel Year-End Summary' },
    { id: '4', text: 'Industry Benchmark Report, Gartner 2024' },
  ],

  footerText: '© 2025 Meridian Consulting Group. Confidential.',
};
