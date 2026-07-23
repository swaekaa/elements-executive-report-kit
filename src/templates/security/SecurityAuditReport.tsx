import React from 'react';
import { Document, Row, Column, Paragraph } from '@unlayer/react-elements';
import { lightTheme } from '../../theme';
import {
  Hero,
  Section,
  SectionDivider,
  ChartPlaceholder,
  DataTable,
  RiskCard,
  RecommendationCard,
  ContentBlock,
  Callout,
  References,
  Footer,
} from '../../components';
import type { SecurityReportData } from '../../data/types';

interface SecurityAuditReportProps {
  data: SecurityReportData;
}

/**
 * Security Audit Report Template
 *
 * Sections: Executive Summary → Scope → Vulnerability Overview →
 * Risk Matrix → Findings → Recommendations → Compliance → Appendix
 *
 * All layout and rendering uses Unlayer Elements components.
 */
export const SecurityAuditReport: React.FC<SecurityAuditReportProps> = ({ data }) => {
  const theme = lightTheme;

  return (
    <Document>
      {/* Cover Page */}
      <Hero
        title={data.title}
        subtitle={data.subtitle}
        date={data.date}
        author={data.author}
        organization={data.organization}
        version={data.version}
        theme={theme}
      />

      {/* Executive Summary */}
      <Section title="Executive Summary" sectionNumber="1" theme={theme}>
        <ContentBlock theme={theme}>{data.executiveSummary}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Scope */}
      <Section title="Assessment Scope" sectionNumber="2" theme={theme}>
        <ContentBlock theme={theme}>{data.scopeDescription}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Vulnerability Overview / Risk Matrix */}
      <Section title="Vulnerability Overview" sectionNumber="3" theme={theme}>
        <ChartPlaceholder
          title="Findings by Severity"
          bars={data.riskMatrix.map((r) => ({
            label: r.severity,
            value: r.count,
            color: r.color,
          }))}
          theme={theme}
        />
        <DataTable
          headers={['Severity', 'Count']}
          rows={data.riskMatrix.map((r) => [r.severity, String(r.count)])}
          caption="Risk Matrix Summary"
          theme={theme}
        />
        <Callout type="danger" title="Immediate Attention Required" theme={theme}>
          {`${data.riskMatrix.find((r) => r.severity === 'Critical')?.count ?? 0} critical and ${data.riskMatrix.find((r) => r.severity === 'High')?.count ?? 0} high severity vulnerabilities require immediate remediation.`}
        </Callout>
      </Section>

      <SectionDivider theme={theme} />

      {/* Detailed Findings */}
      <Section title="Detailed Findings" sectionNumber="4" theme={theme}>
        {data.vulnerabilities.map((vuln, index) => (
          <RiskCard
            key={index}
            id={vuln.id}
            title={vuln.title}
            description={vuln.description}
            severity={vuln.severity}
            affectedArea={vuln.affectedArea}
            theme={theme}
          />
        ))}
      </Section>

      <SectionDivider theme={theme} />

      {/* Recommendations */}
      <Section title="Recommendations" sectionNumber="5" theme={theme}>
        {data.recommendations.map((rec, index) => (
          <RecommendationCard
            key={index}
            title={rec.title}
            description={rec.description}
            priority={rec.priority}
            category={rec.category}
            theme={theme}
          />
        ))}
      </Section>

      <SectionDivider theme={theme} />

      {/* Compliance */}
      <Section title="Compliance Status" sectionNumber="6" theme={theme}>
        <DataTable
          headers={['Standard', 'Status', 'Notes']}
          rows={data.compliance.map((c) => [c.standard, c.status, c.notes])}
          caption="Compliance Framework Assessment"
          theme={theme}
        />
      </Section>

      <SectionDivider theme={theme} />

      {/* Appendix */}
      <Section title="Appendix" sectionNumber="7" theme={theme}>
        {data.appendix.map((item, index) => (
          <React.Fragment key={index}>
            <Row backgroundColor={theme.colors.background} padding="8px 0 4px 0">
              <Column>
                <Paragraph
                  fontSize={theme.typography.fontSize.base}
                  color={theme.colors.textPrimary}
                  fontWeight={theme.typography.fontWeight.semibold}
                >
                  {item.title}
                </Paragraph>
              </Column>
            </Row>
            <ContentBlock theme={theme}>{item.content}</ContentBlock>
          </React.Fragment>
        ))}
      </Section>

      {/* References */}
      <Section title="References" theme={theme}>
        <References items={data.references} theme={theme} />
      </Section>

      {/* Footer */}
      <Footer
        text={data.footerText}
        secondaryText="Distribution restricted to authorized personnel only."
        theme={theme}
      />
    </Document>
  );
};
