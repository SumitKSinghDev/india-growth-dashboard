import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

interface ScatterPlotProps {
  selectedCities: string[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ selectedCities }) => {
  const [xMetric, setXMetric] = useState<string>('');
  const [yMetric, setYMetric] = useState<string>('');

  const chartData = MOCK_DATA
    .filter(data => selectedCities.includes(data.cityId))
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        name: cityInfo ? `${cityInfo.name}, ${cityInfo.state}` : data.cityId,
        value: [
          data.metrics[xMetric],
          data.metrics[yMetric]
        ]
      };
    });

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>X-Axis Metric</InputLabel>
          <Select
            value={xMetric}
            onChange={(e) => setXMetric(e.target.value)}
            label="X-Axis Metric"
          >
            {METRICS.map(metric => (
              <MenuItem key={metric.id} value={metric.id}>
                {metric.name} ({metric.unit})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Y-Axis Metric</InputLabel>
          <Select
            value={yMetric}
            onChange={(e) => setYMetric(e.target.value)}
            label="Y-Axis Metric"
          >
            {METRICS.map(metric => (
              <MenuItem key={metric.id} value={metric.id}>
                {metric.name} ({metric.unit})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="value[0]" 
            name={METRICS.find(m => m.id === xMetric)?.name || 'X'} 
            unit={METRICS.find(m => m.id === xMetric)?.unit || ''}
          />
          <YAxis 
            dataKey="value[1]" 
            name={METRICS.find(m => m.id === yMetric)?.name || 'Y'} 
            unit={METRICS.find(m => m.id === yMetric)?.unit || ''}
          />
          <Tooltip 
            formatter={(value: number[], name: string, props: any) => {
              const cityName = props.payload.name;
              const xMetricName = METRICS.find(m => m.id === xMetric)?.name || 'X';
              const yMetricName = METRICS.find(m => m.id === yMetric)?.name || 'Y';
              return [
                `${cityName}\n${xMetricName}: ${value[0]?.toLocaleString?.() ?? ''}\n${yMetricName}: ${value[1]?.toLocaleString?.() ?? ''}`,
                ''
              ];
            }}
          />
          <Legend />
          <Scatter 
            name="Cities" 
            data={chartData} 
            fill="#8884d8"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ScatterPlot; 