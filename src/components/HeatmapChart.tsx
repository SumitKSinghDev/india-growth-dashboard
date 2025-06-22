import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';

interface HeatmapChartProps {
  selectedCities: string[];
  selectedMetrics: string[];
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ selectedCities, selectedMetrics }) => {
  const theme = useTheme();

  // Use all cities and top metrics if none selected
  const citiesToShow = selectedCities.length > 0 ? selectedCities : CITIES.slice(0, 10).map(c => c.cityId);
  const metricsToShow = selectedMetrics.length > 0 ? selectedMetrics : METRICS.slice(0, 8).map(m => m.id);

  const chartData = citiesToShow.map(cityId => {
    const cityData = MOCK_DATA.find(data => data.cityId === cityId);
    const cityInfo = CITIES.find(c => c.cityId === cityId);
    
    const cityMetrics: any = {
      city: cityInfo ? `${cityInfo.name}, ${cityInfo.state}` : cityId,
    };

    metricsToShow.forEach(metricId => {
      cityMetrics[metricId] = cityData?.metrics[metricId] || 0;
    });

    return cityMetrics;
  });

  const getColorForValue = (value: number, metricId: string) => {
    const metric = METRICS.find(m => m.id === metricId);
    if (!metric) return '#e0e0e0';

    // Simple normalization based on typical ranges
    let normalized = 0;
    
    if (metric.unit === '₹' || metric.unit === 'INR') {
      normalized = Math.min(1, value / 100000); // Normalize by 100k
    } else if (metric.unit === '%') {
      normalized = value / 100; // Already 0-1
    } else if (metric.unit === 'Index') {
      normalized = Math.min(1, value / 10); // Normalize by 10
    } else if (metric.unit === 'Years') {
      normalized = Math.min(1, value / 100); // Normalize by 100 years
    } else if (metric.unit === 'Tons') {
      normalized = Math.min(1, value / 20); // Normalize by 20 tons
    } else {
      normalized = Math.min(1, value / 1000); // Default normalization
    }

    // Create gradient colors
    const colors = {
      low: theme.palette.mode === 'dark' ? '#1a1a2e' : '#e3f2fd',
      high: theme.palette.mode === 'dark' ? '#667eea' : '#1976d2',
    };

    // Interpolate between colors
    const r1 = parseInt(colors.low.slice(1, 3), 16);
    const g1 = parseInt(colors.low.slice(3, 5), 16);
    const b1 = parseInt(colors.low.slice(5, 7), 16);
    
    const r2 = parseInt(colors.high.slice(1, 3), 16);
    const g2 = parseInt(colors.high.slice(3, 5), 16);
    const b2 = parseInt(colors.high.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * normalized);
    const g = Math.round(g1 + (g2 - g1) * normalized);
    const b = Math.round(b1 + (b2 - b1) * normalized);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const formatValue = (value: number, metricId: string) => {
    const metric = METRICS.find(m => m.id === metricId);
    if (!metric) return value.toLocaleString();

    if (metric.unit === '₹') {
      return `₹${value.toLocaleString()}`;
    } else if (metric.unit === '%') {
      return `${value.toFixed(1)}%`;
    } else if (metric.unit === '') {
      return value.toFixed(2);
    }
    return `${value.toLocaleString()} ${metric.unit}`;
  };

  if (citiesToShow.length === 0 || metricsToShow.length === 0) {
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
          Select cities and metrics to view heatmap
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 600 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Regional Performance Heatmap
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Compare cities across multiple metrics. Darker colors indicate higher values.
      </Typography>
      
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `200px repeat(${metricsToShow.length}, 1fr)`,
            gap: 1,
            minWidth: 'max-content',
            p: 2,
            background: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.02)' 
              : 'rgba(0,0,0,0.02)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.1)' 
              : 'rgba(0,0,0,0.1)',
          }}
        >
          {/* Header row */}
          <Box sx={{ p: 2, fontWeight: 600, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.primary">
              Cities
            </Typography>
          </Box>
          {metricsToShow.map(metricId => {
            const metric = METRICS.find(m => m.id === metricId);
            return (
              <Box 
                key={metricId} 
                sx={{ 
                  p: 2, 
                  fontWeight: 600, 
                  textAlign: 'center',
                  background: theme.palette.mode === 'dark' 
                    ? 'rgba(255,255,255,0.05)' 
                    : 'rgba(33,150,243,0.05)',
                  borderRadius: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary" display="block">
                  {metric?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {metric?.unit}
                </Typography>
              </Box>
            );
          })}

          {/* Data rows */}
          {chartData.map((cityData, cityIndex) => (
            <React.Fragment key={cityData.city}>
              <Box 
                sx={{ 
                  p: 2, 
                  fontWeight: 500,
                  background: cityIndex % 2 === 0 
                    ? (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)')
                    : 'transparent',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" color="text.primary">
                  {cityData.city}
                </Typography>
              </Box>
              {metricsToShow.map(metricId => (
                <Box
                  key={metricId}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    background: getColorForValue(cityData[metricId], metricId),
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255,255,255,0.1)' 
                      : 'rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: theme.palette.mode === 'dark' 
                        ? '0 4px 12px rgba(0,0,0,0.3)' 
                        : '0 4px 12px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600,
                      color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                      textShadow: theme.palette.mode === 'dark' 
                        ? '0 1px 2px rgba(0,0,0,0.5)' 
                        : '0 1px 2px rgba(255,255,255,0.8)',
                    }}
                  >
                    {formatValue(cityData[metricId], metricId)}
                  </Typography>
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HeatmapChart; 