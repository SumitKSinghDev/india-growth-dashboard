import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';

interface BarChartProps {
  selectedCities: string[];
  selectedMetric: string;
}

const BarChart: React.FC<BarChartProps> = ({ selectedCities, selectedMetric }) => {
  const chartData = MOCK_DATA
    .filter(data => selectedCities.includes(data.cityId))
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        name: cityInfo ? `${cityInfo.name}, ${cityInfo.state}` : data.cityId,
        value: data.metrics[selectedMetric] || 0
      };
    });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => [`${value.toLocaleString()}`, 'Value']} />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart; 