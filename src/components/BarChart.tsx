import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';

interface BarChartProps {
  selectedCities: string[];
  selectedMetric: string;
}

const BarChart: React.FC<BarChartProps> = ({ selectedCities, selectedMetric }) => {
  const theme = useTheme();
  
  const chartData = MOCK_DATA
    .filter(data => selectedCities.includes(data.cityId))
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        name: cityInfo ? `${cityInfo.name}, ${cityInfo.state}` : data.cityId,
        value: data.metrics[selectedMetric] || 0
      };
    });

  // Modern color palette
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#fa709a', '#fee140', '#a8edea', '#fed6e3',
    '#ffecd2', '#fcb69f', '#ff9a9e', '#fecfef'
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
            {label}
          </Typography>
          <Typography variant="body2" color="primary">
            Value: {payload[0].value.toLocaleString()}
          </Typography>
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
          Select cities to view comparison
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 500 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        City Comparison: {selectedMetric}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsBarChart 
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
          />
          <XAxis 
            dataKey="name" 
            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            tickLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            tickLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="value" 
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
            maxBarSize={80}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChart; 