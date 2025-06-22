import React, { useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import CitySelector from '../components/CitySelector';
import MetricSelector from '../components/MetricSelector';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import ScatterPlot from '../components/ScatterPlot';
import SearchBar from '../components/SearchBar';
import { MetricCategory } from '../data/metrics';

const Dashboard: React.FC = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<MetricCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        India Growth Dashboard
      </Typography>
      
      <SearchBar onSearch={setSearchTerm} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CitySelector
            selectedCities={selectedCities}
            onCitiesChange={setSelectedCities}
            searchTerm={searchTerm}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricSelector
            selectedMetric={selectedMetric}
            selectedCategory={selectedCategory}
            onMetricChange={setSelectedMetric}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              City Comparison
            </Typography>
            <BarChart
              selectedCities={selectedCities}
              selectedMetric={selectedMetric}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Time Series Analysis
            </Typography>
            <LineChart
              selectedCities={selectedCities}
              selectedMetric={selectedMetric}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Metric Correlation Analysis
            </Typography>
            <ScatterPlot
              selectedCities={selectedCities}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 