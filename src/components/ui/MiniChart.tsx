import { memo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniChartProps {
  data: { time: number; price: number }[];
}

export const MiniChart = memo(({ data }: MiniChartProps) => (
  <ResponsiveContainer width={80} height={30}>
    <LineChart data={data}>
      <Line 
        type="monotone" 
        dataKey="price" 
        stroke="#3b82f6" 
        strokeWidth={1.5}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
));

MiniChart.displayName = 'MiniChart';