import React from 'react';
import { Paper, Typography } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';

interface HeatmapChartProps {
  selectedCities: string[];
  selectedMetrics: string[];
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ 
  selectedCities, 
  selectedMetrics 
}) => {
  if (selectedCities.length === 0 || selectedMetrics.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Regional Comparison Heatmap
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select cities and metrics to view regional comparison
        </Typography>
      </Paper>
    );
  }

  // Prepare data for heatmap
  const cityNames = selectedCities.map(cityId => {
    const city = CITIES.find(c => c.cityId === cityId);
    return city ? city.name : cityId;
  });

  const metricNames = selectedMetrics.map(metricId => {
    const metric = METRICS.find(m => m.id === metricId);
    return metric ? metric.name : metricId;
  });

  const heatmapData = selectedCities.map((cityId, cityIndex) => {
    const cityData = MOCK_DATA.find(d => d.cityId === cityId);
    return selectedMetrics.map((metricId, metricIndex) => {
      const value = cityData ? cityData.metrics[metricId] || 0 : 0;
      return [metricIndex, cityIndex, value];
    });
  }).flat();

  const option = {
    title: {
      text: 'Regional Comparison Heatmap',
      left: 'center'
    },
    tooltip: {
      position: 'top',
      formatter: function (params: any) {
        const cityName = cityNames[params.data[1]];
        const metricName = metricNames[params.data[0]];
        const value = params.data[2];
        return `${cityName}<br/>${metricName}<br/>Value: ${value.toFixed(2)}`;
      }
    },
    grid: {
      height: '70%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: metricNames,
      splitArea: {
        show: true
      },
      axisLabel: {
        rotate: 45,
        fontSize: 10
      }
    },
    yAxis: {
      type: 'category',
      data: cityNames,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffcc', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    series: [{
      name: 'Regional Comparison',
      type: 'heatmap',
      data: heatmapData,
      label: {
        show: true,
        fontSize: 8
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <ReactECharts 
        option={option} 
        style={{ height: '400px' }}
        opts={{ renderer: 'canvas' }}
      />
    </Paper>
  );
};

export default HeatmapChart; 