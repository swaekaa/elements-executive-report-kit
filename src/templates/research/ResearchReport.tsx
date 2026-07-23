import React from 'react';
import { Document, Row, Column, Paragraph } from '@unlayer/react-elements';
import {
  Hero,
  Section,
  SectionDivider,
  DataTable,
  ChartPlaceholder,
  ContentBlock,
  References,
  Footer,
} from '../../components';
import type { Theme } from '../../theme';
import type { ResearchReportData } from '../../data/types';
import type { SectionStyles } from '../../hooks/useDocumentState';

interface ResearchReportProps {
  data: ResearchReportData;
  sectionStyles: SectionStyles;
  theme: Theme;
}

/**
 * Research / Experiment Report Template
 */
export const ResearchReport: React.FC<ResearchReportProps> = ({ data, sectionStyles, theme }) => {
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

      {/* Abstract */}
      <Section id="abstract" title="Abstract" sectionNumber="1" theme={theme} styleOverrides={sectionStyles['abstract']}>
        <ContentBlock theme={theme}>{data.abstract}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Objective */}
      <Section id="objective" title="Objective" sectionNumber="2" theme={theme} styleOverrides={sectionStyles['objective']}>
        <ContentBlock theme={theme}>{data.objective}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Dataset */}
      <Section id="dataset" title="Dataset" sectionNumber="3" theme={theme} styleOverrides={sectionStyles['dataset']}>
        {data.dataset && (
          <>
            <DataTable
              headers={['Property', 'Value']}
              rows={[
                ['Name', data.dataset.name],
                ['Size', data.dataset.size],
                ['Source', data.dataset.source],
              ]}
              caption="Dataset Overview"
              theme={theme}
            />
            <ContentBlock theme={theme}>{data.dataset.description}</ContentBlock>
          </>
        )}
      </Section>

      <SectionDivider theme={theme} />

      {/* Methodology */}
      <Section id="methodology" title="Methodology" sectionNumber="4" theme={theme} styleOverrides={sectionStyles['methodology']}>
        {data.methodology?.map((step, index) => (
          <Row key={index} backgroundColor={sectionStyles['methodology']?.backgroundColor || theme.colors.background} padding="4px 0">
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

      {/* Metrics / Results Table */}
      <Section id="results" title="Results" sectionNumber="5" theme={theme} styleOverrides={sectionStyles['results']}>
        {data.metrics && (
          <DataTable
            headers={['Model / Method', 'F1 Score']}
            rows={data.metrics.map((m) => [
              m.name,
              `${m.value}${m.unit ? ` ${m.unit}` : ''}`,
            ])}
            caption="Performance Comparison (Macro F1-Score)"
            theme={theme}
          />
        )}

        {/* Chart Visualization */}
        {data.chartData && (
          <ChartPlaceholder
            title="Model Performance Comparison"
            bars={data.chartData}
            theme={theme}
          />
        )}

        <ContentBlock theme={theme}>{data.results}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Discussion */}
      <Section id="discussion" title="Discussion" sectionNumber="6" theme={theme} styleOverrides={sectionStyles['discussion']}>
        <ContentBlock theme={theme}>{data.discussion}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Future Work */}
      <Section id="futurework" title="Future Work" sectionNumber="7" theme={theme} styleOverrides={sectionStyles['futurework']}>
        {data.futureWork?.map((item, index) => (
          <Row key={index} backgroundColor={sectionStyles['futurework']?.backgroundColor || theme.colors.background} padding="4px 0">
            <Column>
              <Paragraph
                fontSize={theme.typography.fontSize.base}
                color={theme.colors.textSecondary}
              >
                {`• ${item}`}
              </Paragraph>
            </Column>
          </Row>
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
      <Footer text={data.footerText} theme={theme} />
    </Document>
  );
};
