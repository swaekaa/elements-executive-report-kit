import React from 'react';
import { Row, Column, Html } from '@unlayer/react-elements';
import type { Theme } from '../theme';

interface ChartProps {
  type: string;
  data: any[];
  theme: Theme;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const RechartsBlock: React.FC<ChartProps> = ({ type, data, theme }) => {
  // Map our simple data array to a Chart.js config object for QuickChart
  const chartType = type === 'donut' ? 'doughnut' : (type === 'area' ? 'line' : type);
  
  const chartConfig = {
    type: chartType,
    data: {
      labels: data.map(d => d.name),
      datasets: [{
        label: 'Value',
        data: data.map(d => d.value),
        backgroundColor: type === 'line' ? 'transparent' : (type === 'area' ? 'rgba(16, 185, 129, 0.3)' : COLORS),
        borderColor: type === 'area' ? COLORS[1] : (type === 'line' ? COLORS[0] : 'transparent'),
        borderWidth: type === 'bar' || type === 'pie' || type === 'doughnut' ? 0 : 3,
        fill: type === 'area'
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: false }
      }
    }
  };

  const chartUrl = `https://quickchart.io/chart?w=600&h=300&c=${encodeURIComponent(JSON.stringify(chartConfig))}`;

  return (
    <Row>
      <Column>
        <Html
          html={`
            <div style="display: flex; justify-content: center; padding: 20px 0; background: ${theme.colors.surface}; border-radius: ${theme.borders.radius.md}; border: 1px solid ${theme.colors.border};">
              <img src="${chartUrl}" alt="Chart" width="100%" style="max-width: 600px; display: block; margin: 0 auto; border: none; outline: none;" />
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
