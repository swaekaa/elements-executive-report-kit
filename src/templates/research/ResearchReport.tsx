import React from 'react';
import { Document, Row, Column, Paragraph } from '@unlayer/react-elements';
import { lightTheme } from '../../theme';
import {
  Hero,
  Section,
  SectionDivider,
  DataTable,
  ChartPlaceholder,
  ContentBlock,
  Callout,
  References,
  Footer,
} from '../../components';
import type { ResearchReportData } from '../../data/types';

interface ResearchReportProps {
  data: ResearchReportData;
}

/**
 * Research / Experiment Report Template
 *
 * Sections: Title → Abstract → Objective → Dataset → Methodology →
 * Metrics → Results → Charts → Discussion → Future Work → References
 *
 * All layout and rendering uses Unlayer Elements components.
 */
export const ResearchReport: React.FC<ResearchReportProps> = ({ data }) => {
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

      {/* Abstract */}
      <Section title="Abstract" sectionNumber="1" theme={theme}>
        <ContentBlock theme={theme}>{data.abstract}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Objective */}
      <Section title="Objective" sectionNumber="2" theme={theme}>
        <ContentBlock theme={theme}>{data.objective}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Dataset */}
      <Section title="Dataset" sectionNumber="3" theme={theme}>
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
      </Section>

      <SectionDivider theme={theme} />

      {/* Methodology */}
      <Section title="Methodology" sectionNumber="4" theme={theme}>
        {data.methodology.map((step, index) => (
          <Row key={index} backgroundColor={theme.colors.background} padding="4px 0">
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
      <Section title="Results" sectionNumber="5" theme={theme}>
        <DataTable
          headers={['Model / Method', 'F1 Score']}
          rows={data.metrics.map((m) => [
            m.name,
            `${m.value}${m.unit ? ` ${m.unit}` : ''}`,
          ])}
          caption="Performance Comparison (Macro F1-Score)"
          theme={theme}
        />

        {/* Chart Visualization */}
        <ChartPlaceholder
          title="Model Performance Comparison"
          bars={data.chartData}
          theme={theme}
        />

        <ContentBlock theme={theme}>{data.results}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Discussion */}
      <Section title="Discussion" sectionNumber="6" theme={theme}>
        <ContentBlock theme={theme}>{data.discussion}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {/* Future Work */}
      <Section title="Future Work" sectionNumber="7" theme={theme}>
        {data.futureWork.map((item, index) => (
          <Row key={index} backgroundColor={theme.colors.background} padding="4px 0">
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
      <Section title="References" theme={theme}>
        <References items={data.references} theme={theme} />
      </Section>

      {/* Footer */}
      <Footer text={data.footerText} theme={theme} />
    </Document>
  );
};
