import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TIME_SERIES_DATA } from '../data/timeSeriesData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';

interface LineChartProps {
  selectedCities: string[];
  selectedMetric: string;
}

const LineChart: React.FC<LineChartProps> = ({ selectedCities, selectedMetric }) => {
  const selectedMetricData = METRICS.find(m => m.id === selectedMetric);

  // Transform data for Recharts
  const years = [2019, 2020, 2021, 2022, 2023];
  const chartData = years.map(year => {
    const yearData: any = { year };
    selectedCities.forEach(cityId => {
      const cityData = TIME_SERIES_DATA.find(
        data => data.cityId === cityId && data.metricId === selectedMetric
      );
      const cityInfo = CITIES.find(c => c.cityId === cityId);
      const yearValue = cityData?.data.find(d => d.year === year);
      yearData[cityInfo?.name || cityId] = yearValue?.value || 0;
    });
    return yearData;
  });

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="year" 
          name="Year"
        />
        <YAxis 
          name={selectedMetricData?.unit || ''}
        />
        <Tooltip 
          formatter={(value: number, name: string) => {
            return [`${value.toLocaleString()} ${selectedMetricData?.unit || ''}`, name];
          }}
        />
        <Legend />
        {selectedCities.map((cityId, index) => {
          const cityInfo = CITIES.find(c => c.cityId === cityId);
          return (
            <Line
              key={cityId}
              type="monotone"
              dataKey={cityInfo?.name || cityId}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          );
        })}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart; 