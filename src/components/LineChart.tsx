import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import { TIME_SERIES_DATA } from '../data/timeSeriesData';
import { CITIES } from '../data/mockData';

interface LineChartProps {
  selectedCities: string[];
  selectedMetric: string;
}

const LineChart: React.FC<LineChartProps> = ({ selectedCities, selectedMetric }) => {
  const theme = useTheme();

  // Get time series data for selected cities and metric
  const chartData = TIME_SERIES_DATA
    .filter(data => selectedCities.includes(data.cityId) && data.metricId === selectedMetric)
    .map(data => {
      const cityName = CITIES.find(c => c.cityId === data.cityId)?.name || data.cityId;
      return {
        cityName,
        data: data.data
      };
    });

  // Modern color palette for multiple lines
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#fa709a', '#fee140', '#a8edea', '#fed6e3'
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            borderRadius: 2,
            p: 2,
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 8px 32px rgba(0,0,0,0.5)' 
              : '0 8px 32px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Year: {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ 
                color: entry.color,
                fontWeight: 500,
              }}
            >
              {entry.name}: {entry.value.toLocaleString()}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  if (selectedCities.length === 0) {
    return (
      <Box
        sx={{
          height: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
            : 'linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,203,243,0.02) 100%)',
          borderRadius: 2,
          border: '2px dashed',
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(33,150,243,0.2)',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select cities to view time series
        </Typography>
      </Box>
    );
  }

  // Transform data for Recharts - group by year
  const years = [2019, 2020, 2021, 2022, 2023];
  const finalData = years.map(year => {
    const yearData: any = { year };
    chartData.forEach(cityData => {
      const yearPoint = cityData.data.find(d => d.year === year);
      yearData[cityData.cityName] = yearPoint?.value || 0;
    });
    return yearData;
  });

  return (
    <Box sx={{ height: 500 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Time Series Analysis: {selectedMetric}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart
          data={finalData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
          />
          <XAxis 
            dataKey="year" 
            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            tickLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
          />
          <YAxis 
            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            tickLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {chartData.map((cityData, index) => (
            <Line
              key={cityData.cityName}
              type="monotone"
              dataKey={cityData.cityName}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: colors[index % colors.length], strokeWidth: 2 }}
              connectNulls
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChart; 