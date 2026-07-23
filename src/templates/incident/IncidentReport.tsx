import React from 'react';
import { Document, Row, Column, Paragraph } from '@unlayer/react-elements';
import {
  Hero,
  Section,
  SectionDivider,
  MetricCardGrid,
  Timeline,
  Callout,
  RecommendationCard,
  ContentBlock,
  Footer,
  SummaryCard
} from '../../components';
import type { Theme } from '../../theme';
import type { IncidentReportData } from '../../data/types';
import type { SectionStyles } from '../../hooks/useDocumentState';

interface IncidentReportProps {
  data: IncidentReportData;
  sectionStyles: SectionStyles;
  theme: Theme;
}

export const IncidentReport: React.FC<IncidentReportProps> = ({ data, sectionStyles, theme }) => {
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

      <Section id="summary" title="Incident Summary" sectionNumber="1" theme={theme} styleOverrides={sectionStyles['summary']}>
        <SummaryCard 
          title="Overview" 
          summary={data.incidentSummary} 
          theme={theme} 
        />
      </Section>

      <SectionDivider theme={theme} />

      <Section id="metrics" title="Impact Metrics" sectionNumber="2" theme={theme} styleOverrides={sectionStyles['metrics']}>
        {data.impactMetrics && (
          <MetricCardGrid
            metrics={data.impactMetrics.map((m) => ({ ...m, theme }))}
            theme={theme}
          />
        )}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="timeline" title="Incident Timeline" sectionNumber="3" theme={theme} styleOverrides={sectionStyles['timeline']}>
        {data.timeline && <Timeline items={data.timeline} theme={theme} />}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="rootcause" title="Root Cause Analysis" sectionNumber="4" theme={theme} styleOverrides={sectionStyles['rootcause']}>
        <Callout type="danger" title="Primary Cause" theme={theme}>
          {data.rootCauseAnalysis}
        </Callout>
      </Section>

      <SectionDivider theme={theme} />

      <Section id="remediation" title="Remediation Steps" sectionNumber="5" theme={theme} styleOverrides={sectionStyles['remediation']}>
        {data.remediationSteps?.map((step, index) => (
          <Row key={index} backgroundColor={sectionStyles['remediation']?.backgroundColor || theme.colors.background} padding="4px 0">
            <Column>
              <Paragraph
                fontSize={theme.typography.fontSize.base}
                color={theme.colors.textSecondary}
              >
                {`${index + 1}. ${step}`}
              </Paragraph>
            </Column>
          </Row>
        ))}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="preventative" title="Preventative Measures" sectionNumber="6" theme={theme} styleOverrides={sectionStyles['preventative']}>
        {data.preventativeMeasures?.map((rec, index) => (
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

      <Footer text={data.footerText} theme={theme} />
    </Document>
  );
};
