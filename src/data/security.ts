import type { SecurityReportData } from './types';

export const securityReportData: SecurityReportData = {
  organization: 'Sentinel Security Group',
  title: 'Application Security Audit Report',
  subtitle: 'Comprehensive assessment of the CloudVault platform',
  date: 'November 2024',
  author: 'Marcus Webb, Principal Security Engineer',
  version: '1.2',

  executiveSummary:
    'This report presents the findings of a comprehensive security audit conducted on the CloudVault platform between October 1–31, 2024. The assessment covered application security, infrastructure configuration, authentication mechanisms, data handling practices, and third-party integrations. We identified 23 vulnerabilities across all severity levels, with 2 critical findings requiring immediate remediation. The platform demonstrates a generally strong security posture, but several areas require attention before the planned SOC 2 Type II certification in Q1 2025.',

  scopeDescription:
    'The audit scope included the CloudVault web application (v4.2), REST API endpoints (v3), mobile applications (iOS v2.1, Android v2.0), authentication and authorization subsystems, cloud infrastructure (AWS), CI/CD pipeline, and all third-party integrations. Testing methodologies included OWASP Top 10 assessment, SAST/DAST analysis, manual penetration testing, and infrastructure configuration review.',

  riskMatrix: [
    { severity: 'Critical', count: 2, color: '#DC2626' },
    { severity: 'High', count: 5, color: '#EA580C' },
    { severity: 'Medium', count: 8, color: '#D97706' },
    { severity: 'Low', count: 6, color: '#2563EB' },
    { severity: 'Informational', count: 2, color: '#737373' },
  ],

  vulnerabilities: [
    {
      id: 'CVE-2024-001',
      title: 'SQL Injection in Search API',
      description:
        'The search endpoint does not properly sanitize user input in the query parameter, allowing an attacker to inject arbitrary SQL commands. This could lead to unauthorized data access or modification of database records.',
      severity: 'critical',
      affectedArea: 'API — /api/v3/search',
    },
    {
      id: 'CVE-2024-002',
      title: 'Insecure Direct Object Reference in File Access',
      description:
        'The file download endpoint uses sequential numeric IDs without proper authorization checks. An authenticated user can access files belonging to other accounts by manipulating the file ID parameter.',
      severity: 'critical',
      affectedArea: 'API — /api/v3/files/:id',
    },
    {
      id: 'CVE-2024-003',
      title: 'Missing Rate Limiting on Authentication',
      description:
        'The login endpoint does not implement rate limiting, allowing unlimited authentication attempts. This exposes the system to brute-force attacks against user credentials.',
      severity: 'high',
      affectedArea: 'Authentication — /auth/login',
    },
    {
      id: 'CVE-2024-004',
      title: 'Outdated TLS Configuration',
      description:
        'The production load balancer still supports TLS 1.0 and TLS 1.1, which are deprecated and contain known vulnerabilities. Modern clients should negotiate TLS 1.2 or higher.',
      severity: 'high',
      affectedArea: 'Infrastructure — Load Balancer',
    },
    {
      id: 'CVE-2024-005',
      title: 'Insufficient Session Invalidation',
      description:
        'User sessions are not properly invalidated upon password change or account deactivation. Previously authenticated sessions remain valid until natural expiration.',
      severity: 'high',
      affectedArea: 'Authentication — Session Management',
    },
    {
      id: 'CVE-2024-006',
      title: 'Cross-Site Scripting in User Profile',
      description:
        'The user profile display name field does not sanitize HTML entities, allowing stored XSS attacks that execute when other users view the profile page.',
      severity: 'medium',
      affectedArea: 'Web Application — Profile Module',
    },
    {
      id: 'CVE-2024-007',
      title: 'Sensitive Data in Application Logs',
      description:
        'API request logs include authorization headers and session tokens in plaintext. If logs are compromised, this information could be used to impersonate users.',
      severity: 'medium',
      affectedArea: 'Infrastructure — Logging Pipeline',
    },
  ],

  recommendations: [
    {
      title: 'Remediate SQL injection vulnerability immediately',
      description:
        'Implement parameterized queries across all database access points. Deploy a web application firewall (WAF) rule as an immediate mitigation while code changes are implemented.',
      priority: 'high',
      category: 'Critical Fix',
    },
    {
      title: 'Implement proper authorization checks',
      description:
        'Add resource-level authorization validation to all API endpoints. Replace sequential IDs with UUIDs and implement ownership verification for all data access operations.',
      priority: 'high',
      category: 'Critical Fix',
    },
    {
      title: 'Deploy rate limiting and account lockout',
      description:
        'Implement progressive rate limiting on authentication endpoints (5 attempts per minute, 20 per hour). Add account lockout after 10 failed attempts with automated unlock after 30 minutes.',
      priority: 'high',
      category: 'Authentication',
    },
    {
      title: 'Update TLS configuration',
      description:
        'Disable TLS 1.0 and 1.1 on all production endpoints. Configure TLS 1.2 as minimum with TLS 1.3 preferred. Update cipher suites to remove weak algorithms.',
      priority: 'medium',
      category: 'Infrastructure',
    },
    {
      title: 'Implement comprehensive input sanitization',
      description:
        'Deploy a centralized input sanitization library across all user-facing input fields. Implement Content Security Policy headers to mitigate XSS impact.',
      priority: 'medium',
      category: 'Application Security',
    },
    {
      title: 'Establish security logging standards',
      description:
        'Create logging guidelines that exclude sensitive data. Implement log redaction for authorization headers, tokens, and PII. Deploy automated log scanning for sensitive data.',
      priority: 'low',
      category: 'Operations',
    },
  ],

  compliance: [
    { standard: 'OWASP Top 10 (2021)', status: 'Partial', notes: '7 of 10 categories adequately addressed. Injection, Broken Access Control, and Security Misconfiguration require remediation.' },
    { standard: 'SOC 2 Type II', status: 'Not Ready', notes: 'Critical findings must be resolved before certification audit. Estimated 6-8 weeks of remediation work.' },
    { standard: 'GDPR', status: 'Compliant', notes: 'Data handling practices meet GDPR requirements. Data retention policies are properly implemented.' },
    { standard: 'PCI DSS v4.0', status: 'Partial', notes: 'Payment data handling is compliant, but network segmentation and logging requirements need improvement.' },
    { standard: 'ISO 27001', status: 'In Progress', notes: 'Information security management system is being implemented. Gap analysis completed in Q3 2024.' },
  ],

  appendix: [
    {
      title: 'Testing Methodology',
      content:
        'Testing was conducted using a combination of automated scanning tools (Burp Suite Professional, Nessus, SonarQube) and manual penetration testing. All testing was performed in a staging environment that mirrors the production configuration.',
    },
    {
      title: 'Tools Used',
      content:
        'Burp Suite Professional v2024.8, Nessus Professional v10.6, SonarQube Enterprise v10.2, OWASP ZAP v2.14, nmap v7.94, sqlmap v1.7, custom Python scripts for API testing.',
    },
    {
      title: 'Severity Classification',
      content:
        'Critical: Immediate exploitation possible, significant business impact. High: Exploitation likely, moderate business impact. Medium: Exploitation possible under specific conditions. Low: Minor impact or difficult to exploit. Informational: Best practice recommendation.',
    },
  ],

  references: [
    { id: '1', text: 'OWASP Top Ten Web Application Security Risks (2021)', url: 'https://owasp.org/Top10/' },
    { id: '2', text: 'NIST Cybersecurity Framework v2.0', url: 'https://www.nist.gov/cyberframework' },
    { id: '3', text: 'CWE/SANS Top 25 Most Dangerous Software Weaknesses', url: 'https://cwe.mitre.org/top25/' },
    { id: '4', text: 'SOC 2 Type II Compliance Requirements, AICPA' },
  ],

  footerText: '© 2024 Sentinel Security Group. CONFIDENTIAL — Do not distribute.',
};
