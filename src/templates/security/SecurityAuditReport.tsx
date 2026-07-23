import React from 'react';
import { Document, Row, Column, Paragraph } from '@unlayer/react-elements';
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
import type { Theme } from '../../theme';
import type { SecurityReportData } from '../../data/types';
import type { SectionStyles } from '../../hooks/useDocumentState';

interface SecurityAuditReportProps {
  data: SecurityReportData;
  sectionStyles: SectionStyles;
  theme: Theme;
}

/**
 * Security Audit Report Template
 */
export const SecurityAuditReport: React.FC<SecurityAuditReportProps> = ({ data, sectionStyles, theme }) => {
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
      <Section id="summary" title="Executive Summary" sectionNumber="1" theme={theme} styleOverrides={sectionStyles['summary']}>
        <ContentBlock theme={theme}>{data.executiveSummary}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Scope */}
      <Section id="scope" title="Assessment Scope" sectionNumber="2" theme={theme} styleOverrides={sectionStyles['scope']}>
        <ContentBlock theme={theme}>{data.scopeDescription}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Vulnerability Overview / Risk Matrix */}
      <Section id="overview" title="Vulnerability Overview" sectionNumber="3" theme={theme} styleOverrides={sectionStyles['overview']}>
        {data.riskMatrix && (
          <>
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
          </>
        )}
      </Section>

      <SectionDivider theme={theme} />

      {/* Detailed Findings */}
      <Section id="findings" title="Detailed Findings" sectionNumber="4" theme={theme} styleOverrides={sectionStyles['findings']}>
        {data.vulnerabilities?.map((vuln, index) => (
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
      <Section id="recommendations" title="Recommendations" sectionNumber="5" theme={theme} styleOverrides={sectionStyles['recommendations']}>
        {data.recommendations?.map((rec, index) => (
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
      <Section id="compliance" title="Compliance Status" sectionNumber="6" theme={theme} styleOverrides={sectionStyles['compliance']}>
        {data.compliance && (
          <DataTable
            headers={['Standard', 'Status', 'Notes']}
            rows={data.compliance.map((c) => [c.standard, c.status, c.notes])}
            caption="Compliance Framework Assessment"
            theme={theme}
          />
        )}
      </Section>

      <SectionDivider theme={theme} />

      {/* Appendix */}
      <Section id="appendix" title="Appendix" sectionNumber="7" theme={theme} styleOverrides={sectionStyles['appendix']}>
        {data.appendix?.map((item, index) => (
          <React.Fragment key={index}>
            <Row backgroundColor={sectionStyles['appendix']?.backgroundColor || theme.colors.background} padding="8px 0 4px 0">
              <Column>
                <Paragraph
                  fontSize={theme.typography.fontSize.base}
                  color={theme.colors.textPrimary}
                >
                  {item.title}
                </Paragraph>
              </Column>
            </Row>
            <ContentBlock theme={theme}>{item.content}</ContentBlock>
          </React.Fragment>
        ))}
      </Section>

      <SectionDivider theme={theme} />

      {/* References */}
      {data.references && (
        <Section id="references" title="References" theme={theme} styleOverrides={sectionStyles['references']}>
          <References items={data.references} theme={theme} />
        </Section>
      )}

      {/* Footer */}
      <Footer
        text={data.footerText}
        secondaryText="Distribution restricted to authorized personnel only."
        theme={theme}
      />
    </Document>
  );
};
