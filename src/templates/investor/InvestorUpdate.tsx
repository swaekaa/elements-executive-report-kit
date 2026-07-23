import React from 'react';
import { Document, Row, Column, Paragraph, Heading } from '@unlayer/react-elements';
import {
  Hero,
  Section,
  SectionDivider,
  MetricCardGrid,
  Timeline,
  ChartPlaceholder,
  ContentBlock,
  Footer,
  SummaryCard
} from '../../components';
import type { Theme } from '../../theme';
import type { InvestorUpdateData } from '../../data/types';
import type { SectionStyles } from '../../hooks/useDocumentState';

interface InvestorUpdateProps {
  data: InvestorUpdateData;
  sectionStyles: SectionStyles;
  theme: Theme;
}

export const InvestorUpdate: React.FC<InvestorUpdateProps> = ({ data, sectionStyles, theme }) => {
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

      <Section id="ceo" title="CEO Message" sectionNumber="1" theme={theme} styleOverrides={sectionStyles['ceo']}>
        <ContentBlock theme={theme}>{data.ceoMessage}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      <Section id="financials" title="Financial Overview" sectionNumber="2" theme={theme} styleOverrides={sectionStyles['financials']}>
        {data.financialMetrics && (
          <MetricCardGrid
            metrics={data.financialMetrics.map((m) => ({ ...m, theme }))}
            theme={theme}
          />
        )}
        
        {data.growthChart && (
          <ChartPlaceholder
            title="Revenue Growth"
            bars={data.growthChart}
            theme={theme}
          />
        )}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="product" title="Product Milestones" sectionNumber="3" theme={theme} styleOverrides={sectionStyles['product']}>
        {data.productMilestones && <Timeline items={data.productMilestones} theme={theme} />}
      </Section>

      <SectionDivider theme={theme} />

      <Section id="market" title="Market Position" sectionNumber="4" theme={theme} styleOverrides={sectionStyles['market']}>
        <ContentBlock theme={theme}>{data.marketPosition}</ContentBlock>
      </Section>

      <SectionDivider theme={theme} />

      {data.fundraisingStatus && (
        <Section id="fundraising" title="Fundraising Status" sectionNumber="5" theme={theme} styleOverrides={sectionStyles['fundraising']}>
          <SummaryCard 
            title="Current Round" 
            summary={data.fundraisingStatus} 
            theme={theme} 
          />
        </Section>
      )}

      <Footer text={data.footerText} theme={theme} />
    </Document>
  );
};
