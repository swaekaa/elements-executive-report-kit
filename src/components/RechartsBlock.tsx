import React from 'react';
import { renderToString } from 'react-dom/server';
import { Row, Column, Html } from '@unlayer/react-elements';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import type { Theme } from '../theme';

interface ChartProps {
  type: string;
  data: any[];
  theme: Theme;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const renderChartToString = (type: string, data: any[], theme: Theme) => {
  const width = 600;
  const height = 300;
  const commonProps = { width, height, data };

  let chartElement;
  switch (type) {
    case 'line':
      chartElement = (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey="name" stroke={theme.colors.textSecondary} />
          <YAxis stroke={theme.colors.textSecondary} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={COLORS[0]} strokeWidth={3} />
        </LineChart>
      );
      break;
    case 'area':
      chartElement = (
        <AreaChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey="name" stroke={theme.colors.textSecondary} />
          <YAxis stroke={theme.colors.textSecondary} />
          <Legend />
          <Area type="monotone" dataKey="value" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.3} />
        </AreaChart>
      );
      break;
    case 'pie':
    case 'donut':
      chartElement = (
        <PieChart width={width} height={height}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={type === 'donut' ? 60 : 0}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      );
      break;
    case 'bar':
    default:
      chartElement = (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey="name" stroke={theme.colors.textSecondary} />
          <YAxis stroke={theme.colors.textSecondary} />
          <Legend />
          <Bar dataKey="value" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
        </BarChart>
      );
      break;
  }

  return renderToString(chartElement);
};

export const RechartsBlock: React.FC<ChartProps> = ({ type, data, theme }) => {
  const chartHtml = renderChartToString(type, data, theme);

  return (
    <Row>
      <Column>
        <Html
          content={`
            <div style="display: flex; justify-content: center; padding: 20px 0; background: ${theme.colors.surface}; border-radius: ${theme.borders.radius.md}; border: 1px solid ${theme.colors.border};">
              ${chartHtml}
            </div>
          `}
        />
      </Column>
    </Row>
  );
};
