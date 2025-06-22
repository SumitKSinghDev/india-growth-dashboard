import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';

interface ScatterPlotProps {
  selectedCities: string[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ selectedCities }) => {
  const theme = useTheme();

  // Create scatter plot data comparing GDP per capita vs HDI
  const chartData = MOCK_DATA
    .filter(data => selectedCities.includes(data.cityId))
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        name: cityInfo ? `${cityInfo.name}, ${cityInfo.state}` : data.cityId,
        gdp: data.metrics.gdpPerCapita || 0,
        hdi: data.metrics.humanDevelopmentIndex || 0,
        population: data.metrics.population || 0,
        size: Math.sqrt(data.metrics.population || 0) / 1000, // Scale for visualization
      };
    });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
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
            {data.name}
          </Typography>
          <Typography variant="body2" color="primary">
            GDP per Capita: ₹{data.gdp.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="secondary">
            HDI: {data.hdi.toFixed(3)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Population: {data.population.toLocaleString()}
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
          Select cities to view correlation analysis
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 500 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        GDP per Capita vs Human Development Index
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Bubble size represents population size. Explore the relationship between economic prosperity and human development.
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
          />
          <XAxis 
            type="number" 
            dataKey="gdp" 
            name="GDP per Capita"
            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            tickLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
          />
          <YAxis 
            type="number" 
            dataKey="hdi" 
            name="Human Development Index"
            tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
            axisLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            tickLine={{ stroke: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            domain={[0.6, 1]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <ZAxis type="number" dataKey="size" range={[60, 400]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Scatter 
            name="Cities" 
            data={chartData} 
            fill="url(#scatterGradient)"
            stroke={theme.palette.mode === 'dark' ? '#667eea' : '#1976d2'}
            strokeWidth={2}
          />
          <defs>
            <radialGradient id="scatterGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#764ba2" stopOpacity={0.6} />
            </radialGradient>
          </defs>
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ScatterPlot; 