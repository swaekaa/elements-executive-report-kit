import React from 'react';
import { Hero, Section, MetricCardGrid, ContentBlock, Timeline, DataTable, RechartsBlock } from '../components';
import type { Block } from './types';
import type { Theme } from '../theme';
import type { SectionStyles } from '../types/studio';

interface BlockRendererProps {
  block: Block;
  theme: Theme;
  sectionStyles: SectionStyles;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, theme, sectionStyles }) => {
  if (block.hidden) return null;

  const renderContent = () => {
    switch (block.type) {
      case 'core/hero':
        return (
          <Hero
            title={block.data.title}
            subtitle={block.data.subtitle}
            date={block.data.date}
            author={block.data.author}
            organization={block.data.organization}
            version={block.data.version}
            theme={theme}
          />
        );
      case 'core/section':
        return (
          <Section
            id={block.id}
            title={block.data.title}
            subtitle={block.data.subtitle}
            sectionNumber={block.data.sectionNumber}
            theme={theme}
            styleOverrides={sectionStyles[block.id]}
          >
            {block.children?.map(child => (
              <BlockRenderer key={child.id} block={child} theme={theme} sectionStyles={sectionStyles} />
            ))}
          </Section>
        );
      case 'core/paragraph':
        return (
          <ContentBlock theme={theme}>
            {block.data.content}
          </ContentBlock>
        );
      case 'core/metric-grid':
        return (
          <MetricCardGrid
            metrics={block.data.metrics?.map((m: any) => ({ ...m, theme })) || []}
            theme={theme}
          />
        );
      case 'core/timeline':
        return (
          <Timeline
            events={block.data.events || []}
            theme={theme}
          />
        );
      case 'core/chart':
        return (
          <RechartsBlock
            type={block.data.chartType}
            data={block.data.data || []}
            theme={theme}
          />
        );
      case 'core/table':
        let rows = [];
        try { rows = JSON.parse(block.data.rows); } catch (e) { /* ignore */ }
        return (
          <DataTable
            headers={block.data.headers?.map((h: any) => h.label) || []}
            rows={rows}
            theme={theme}
          />
        );
      default:
        return (
          <div style={{ padding: '20px', border: '1px dashed red', color: 'red' }}>
            Unknown block type: {block.type}
          </div>
        );
    }
  };

  // We wrap every block in a span/div with data-block-id so the interactive preview can target it
  return (
    <span data-block-id={block.id} style={{ display: 'block', position: 'relative' }}>
      {renderContent()}
    </span>
  );
};
