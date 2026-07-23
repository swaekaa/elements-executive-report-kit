import React from 'react';
import { Document, Row, Column, Heading, Paragraph } from '@unlayer/react-elements';
import {
  Hero,
  Section,
  SectionDivider,
  MetricCardGrid,
  Timeline,
  Callout,
  RecommendationCard,
  ContentBlock,
  References,
  Footer,
} from '../../components';
import type { Theme } from '../../theme';
import type { ExecutiveReportData } from '../../data/types';
import type { SectionStyles } from '../../hooks/useDocumentState';

interface ExecutiveReportProps {
  data: ExecutiveReportData;
  sectionStyles: SectionStyles;
  theme: Theme;
}

/**
 * Executive Report Template
 */
export const ExecutiveReport: React.FC<ExecutiveReportProps> = ({ data, sectionStyles, theme }) => {
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

      {/* Key Performance Indicators */}
      <Section id="metrics" title="Key Performance Indicators" sectionNumber="2" theme={theme} styleOverrides={sectionStyles['metrics']}>
        {data.metrics && (
          <MetricCardGrid
            metrics={data.metrics.map((m) => ({ ...m, theme }))}
            theme={theme}
          />
        )}
      </Section>

      <SectionDivider theme={theme} />

      {/* Highlights */}
      <Section id="highlights" title="Highlights" sectionNumber="3" theme={theme} styleOverrides={sectionStyles['highlights']}>
        {data.highlights?.map((highlight, index) => (
          <Row key={index} backgroundColor={sectionStyles['highlights']?.backgroundColor || theme.colors.background} padding="4px 0">
            <Column>
              <Paragraph
                fontSize={theme.typography.fontSize.base}
                color={theme.colors.textSecondary}
              >
                {`• ${highlight}`}
              </Paragraph>
            </Column>
          </Row>
        ))}
      </Section>

      <SectionDivider theme={theme} />

      {/* Timeline */}
      <Section id="timeline" title="Timeline" sectionNumber="4" theme={theme} styleOverrides={sectionStyles['timeline']}>
        {data.timeline && <Timeline items={data.timeline} theme={theme} />}
      </Section>

      <SectionDivider theme={theme} />

      {/* Key Findings */}
      <Section id="findings" title="Key Findings" sectionNumber="5" theme={theme} styleOverrides={sectionStyles['findings']}>
        {data.findings?.map((finding, index) => (
          <Callout
            key={index}
            type="info"
            title={finding.title}
            theme={theme}
          >
            {finding.description}
          </Callout>
        ))}
      </Section>

      <SectionDivider theme={theme} />

      {/* Recommendations */}
      <Section id="recommendations" title="Recommendations" sectionNumber="6" theme={theme} styleOverrides={sectionStyles['recommendations']}>
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

      {/* Appendix */}
      <Section id="appendix" title="Appendix" sectionNumber="7" theme={theme} styleOverrides={sectionStyles['appendix']}>
        {data.appendix?.map((item, index) => (
          <React.Fragment key={index}>
            <Row backgroundColor={sectionStyles['appendix']?.backgroundColor || theme.colors.background} padding="8px 0 4px 0">
              <Column>
                <Heading
                  headingType="h4"
                  fontSize={theme.typography.fontSize.base}
                  color={theme.colors.textPrimary}
                >
                  {item.title}
                </Heading>
              </Column>
            </Row>
            <ContentBlock theme={theme}>{item.content}</ContentBlock>
          </React.Fragment>
        ))}
      </Section>

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
