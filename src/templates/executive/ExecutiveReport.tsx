import React from 'react';
import { Document, Row, Column, Heading, Paragraph } from '@unlayer/react-elements';
import { lightTheme } from '../../theme';
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
import type { ExecutiveReportData } from '../../data/types';

interface ExecutiveReportProps {
  data: ExecutiveReportData;
}

/**
 * Executive Report Template
 *
 * Sections: Cover → Executive Summary → KPIs → Highlights →
 * Timeline → Findings → Recommendations → Appendix → Footer
 *
 * All layout and rendering uses Unlayer Elements components.
 */
export const ExecutiveReport: React.FC<ExecutiveReportProps> = ({ data }) => {
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

      {/* Key Performance Indicators */}
      <Section title="Key Performance Indicators" sectionNumber="2" theme={theme}>
        <MetricCardGrid
          metrics={data.metrics.map((m) => ({ ...m, theme }))}
          theme={theme}
        />
      </Section>

      <SectionDivider theme={theme} />

      {/* Highlights */}
      <Section title="Highlights" sectionNumber="3" theme={theme}>
        {data.highlights.map((highlight, index) => (
          <Row key={index} backgroundColor={theme.colors.background} padding="4px 0">
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
      <Section title="Timeline" sectionNumber="4" theme={theme}>
        <Timeline items={data.timeline} theme={theme} />
      </Section>

      <SectionDivider theme={theme} />

      {/* Key Findings */}
      <Section title="Key Findings" sectionNumber="5" theme={theme}>
        {data.findings.map((finding, index) => (
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
      <Section title="Recommendations" sectionNumber="6" theme={theme}>
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

      {/* Appendix */}
      <Section title="Appendix" sectionNumber="7" theme={theme}>
        {data.appendix.map((item, index) => (
          <React.Fragment key={index}>
            <Row backgroundColor={theme.colors.background} padding="8px 0 4px 0">
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
      <Section title="References" theme={theme}>
        <References items={data.references} theme={theme} />
      </Section>

      {/* Footer */}
      <Footer text={data.footerText} theme={theme} />
    </Document>
  );
};
