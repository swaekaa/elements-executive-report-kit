import React from 'react';
import { Document } from '@unlayer/react-elements';
import {
  Hero,
  Section,
  SectionDivider,
  DataTable,
  RiskCard,
  RecommendationCard,
  ContentBlock,
  Callout,
  Footer,
  InfoGrid
} from '../../components';
import type { Theme } from '../../theme';
import type { ComplianceReportData } from '../../data/types';
import type { SectionStyles } from '../../hooks/useDocumentState';

interface ComplianceReportProps {
  data: ComplianceReportData;
  sectionStyles: SectionStyles;
  theme: Theme;
}

export const ComplianceReport: React.FC<ComplianceReportProps> = ({ data, sectionStyles, theme }) => {
  return (
    <Document>
      <Hero
        title={data.title}
        subtitle={data.subtitle}
        date={data.date}
        author={data.author}
        organization={data.organization}
        version={data.version}
        theme={theme}
      />

      <InfoGrid 
        items={[
          { label: 'Date', value: data.date },
          { label: 'Lead Auditor', value: data.author },
          { label: 'Version', value: data.version },
          { label: 'Classification', value: 'Restricted' },
        ]}
        theme={theme}
      />

      <Section id="scope" title="Audit Scope" sectionNumber="1" theme={theme} styleOverrides={sectionStyles['scope']}>
        <ContentBlock theme={theme}>{data.auditScope}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      <Section id="compliance" title="Compliance Status" sectionNumber="2" theme={theme} styleOverrides={sectionStyles['compliance']}>
        {data.complianceStatus && (
          <DataTable
            headers={['Standard / Requirement', 'Status', 'Notes']}
            rows={data.complianceStatus.map((c) => [c.standard, c.status, c.notes])}
            caption="Current Framework Assessment"
            theme={theme}
          />
        )}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="deficiencies" title="Control Deficiencies" sectionNumber="3" theme={theme} styleOverrides={sectionStyles['deficiencies']}>
        {data.controlDeficiencies?.map((def, index) => (
          <RiskCard
            key={index}
            id={`DEF-${index + 1}`}
            title={def.title}
            description={def.description}
            severity={def.category === 'Critical' ? 'critical' : 'high'} // Mapping abstract category to severity for RiskCard
            affectedArea={def.category || 'General'}
            theme={theme}
          />
        ))}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="remediation" title="Remediation Plan" sectionNumber="4" theme={theme} styleOverrides={sectionStyles['remediation']}>
        {data.remediationPlan?.map((rec, index) => (
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

      <Section id="auditor" title="Auditor Notes" sectionNumber="5" theme={theme} styleOverrides={sectionStyles['auditor']}>
        <Callout type="warning" title="Final Comments" theme={theme}>
          {data.auditorNotes}
        </Callout>
      </Section>

      <Footer text={data.footerText} theme={theme} />
    </Document>
  );
};
