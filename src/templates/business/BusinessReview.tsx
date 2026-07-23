import React from 'react';
import { Document, Row, Column, Paragraph } from '@unlayer/react-elements';
import {
  Hero,
  Section,
  SectionDivider,
  MetricCardGrid,
  Callout,
  ContentBlock,
  Footer,
  InfoGrid
} from '../../components';
import type { Theme } from '../../theme';
import type { BusinessReviewData } from '../../data/types';
import type { SectionStyles } from '../../hooks/useDocumentState';

interface BusinessReviewProps {
  data: BusinessReviewData;
  sectionStyles: SectionStyles;
  theme: Theme;
}

export const BusinessReview: React.FC<BusinessReviewProps> = ({ data, sectionStyles, theme }) => {
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
          { label: 'Prepared By', value: data.author },
          { label: 'Version', value: data.version },
          { label: 'Status', value: 'Confidential' },
        ]}
        theme={theme}
      />

      <Section id="summary" title="Executive Summary" sectionNumber="1" theme={theme} styleOverrides={sectionStyles['summary']}>
        <ContentBlock theme={theme}>{data.executiveSummary}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      <Section id="kpis" title="Business KPIs" sectionNumber="2" theme={theme} styleOverrides={sectionStyles['kpis']}>
        {data.kpis && (
          <MetricCardGrid
            metrics={data.kpis.map((m) => ({ ...m, theme }))}
            theme={theme}
          />
        )}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="financials" title="Financial Highlights" sectionNumber="3" theme={theme} styleOverrides={sectionStyles['financials']}>
        {data.financialHighlights?.map((item, index) => (
          <Row key={index} backgroundColor={sectionStyles['financials']?.backgroundColor || theme.colors.background} padding="4px 0">
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

      <Section id="operations" title="Operational Updates" sectionNumber="4" theme={theme} styleOverrides={sectionStyles['operations']}>
        {data.operationalUpdates?.map((item, index) => (
          <Callout key={index} type="info" theme={theme}>
            {item}
          </Callout>
        ))}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="strategic" title="Strategic Initiatives" sectionNumber="5" theme={theme} styleOverrides={sectionStyles['strategic']}>
        {data.strategicInitiatives?.map((item, index) => (
          <Row key={index} backgroundColor={sectionStyles['strategic']?.backgroundColor || theme.colors.background} padding="4px 0">
            <Column>
              <Paragraph
                fontSize={theme.typography.fontSize.base}
                color={theme.colors.textSecondary}
              >
                {`${index + 1}. ${item}`}
              </Paragraph>
            </Column>
          </Row>
        ))}
      </Section>

      <Footer text={data.footerText} theme={theme} />
    </Document>
  );
};
