import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Tabs, Tab } from '@mui/material';
import CitySelector from '../components/CitySelector';
import MetricSelector from '../components/MetricSelector';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import ScatterPlot from '../components/ScatterPlot';
import SearchBar from '../components/SearchBar';
import RankingTable from '../components/RankingTable';
import InsightsPanel from '../components/InsightsPanel';
import HeatmapChart from '../components/HeatmapChart';
import TrendPrediction from '../components/TrendPrediction';
import AnomalyDetection from '../components/AnomalyDetection';
import ExportCapabilities from '../components/ExportCapabilities';
import PolicyInsights from '../components/PolicyInsights';
import AdvancedInteractions from '../components/AdvancedInteractions';
import { MetricCategory } from '../data/metrics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MetricCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMetricChange = (metricId: string) => {
    setSelectedMetric(metricId);
    if (!selectedMetrics.includes(metricId)) {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

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
            onMetricChange={handleMetricChange}
            onCategoryChange={setSelectedCategory}
            searchTerm={searchTerm}
          />
        </Grid>
        
        {/* Insights Panel */}
        <Grid item xs={12}>
          <InsightsPanel />
        </Grid>

        {/* AI-Powered Analytics */}
        <Grid item xs={12}>
          <AnomalyDetection />
        </Grid>

        {/* Main Content Tabs */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs" variant="scrollable" scrollButtons="auto">
                <Tab label="City Comparison" />
                <Tab label="Time Series Analysis" />
                <Tab label="Rankings" />
                <Tab label="Regional Heatmap" />
                <Tab label="Correlation Analysis" />
                <Tab label="AI Trend Prediction" />
                <Tab label="Export & Reports" />
                <Tab label="Policy Insights" />
                <Tab label="Advanced Analytics" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <BarChart
                selectedCities={selectedCities}
                selectedMetric={selectedMetric}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <LineChart
                selectedCities={selectedCities}
                selectedMetric={selectedMetric}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <RankingTable selectedMetric={selectedMetric} />
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <HeatmapChart
                selectedCities={selectedCities}
                selectedMetrics={selectedMetrics}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={4}>
              <ScatterPlot
                selectedCities={selectedCities}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={5}>
              <TrendPrediction
                selectedCities={selectedCities}
                selectedMetric={selectedMetric}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={6}>
              <ExportCapabilities
                selectedCities={selectedCities}
                selectedMetrics={selectedMetrics}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={7}>
              <PolicyInsights />
            </TabPanel>

            <TabPanel value={tabValue} index={8}>
              <AdvancedInteractions />
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 