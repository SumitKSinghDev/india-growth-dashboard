import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Tabs, Tab, useTheme } from '@mui/material';
import { TrendingUp, Analytics, Assessment, Timeline, Map, BubbleChart, Psychology, GetApp, Lightbulb, Science } from '@mui/icons-material';
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
  const theme = useTheme();
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

  const tabConfig = [
    { label: 'City Comparison', icon: <TrendingUp /> },
    { label: 'Time Series Analysis', icon: <Timeline /> },
    { label: 'Rankings', icon: <Assessment /> },
    { label: 'Regional Heatmap', icon: <Map /> },
    { label: 'Correlation Analysis', icon: <BubbleChart /> },
    { label: 'AI Trend Prediction', icon: <Psychology /> },
    { label: 'Export & Reports', icon: <GetApp /> },
    { label: 'Policy Insights', icon: <Lightbulb /> },
    { label: 'Advanced Analytics', icon: <Science /> },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(45deg, #2196F3 0%, #21CBF3 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            mb: 1,
          }}
        >
          India Growth Dashboard
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            fontWeight: 400,
            opacity: 0.8,
          }}
        >
          Comprehensive Analytics & Insights for India's Development
        </Typography>
      </Box>
      
      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={setSearchTerm} />
      </Box>
      
      <Grid container spacing={3}>
        {/* Selectors */}
        <Grid item xs={12} lg={6}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                : 'linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,203,243,0.02) 100%)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(33,150,243,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CitySelector
              selectedCities={selectedCities}
              onCitiesChange={setSelectedCities}
              searchTerm={searchTerm}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper 
            elevation={0}
            sx={{
              p: 3,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                : 'linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,203,243,0.02) 100%)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(33,150,243,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <MetricSelector
              selectedMetric={selectedMetric}
              selectedCategory={selectedCategory}
              onMetricChange={handleMetricChange}
              onCategoryChange={setSelectedCategory}
              searchTerm={searchTerm}
            />
          </Paper>
        </Grid>
        
        {/* Insights Panel */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(156,39,176,0.1) 0%, rgba(233,30,99,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(156,39,176,0.05) 0%, rgba(233,30,99,0.05) 100%)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(156,39,176,0.2)' 
                : 'rgba(156,39,176,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <InsightsPanel />
          </Paper>
        </Grid>

        {/* AI-Powered Analytics */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(255,152,0,0.1) 0%, rgba(255,87,34,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(255,152,0,0.05) 0%, rgba(255,87,34,0.05) 100%)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,152,0,0.2)' 
                : 'rgba(255,152,0,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <AnomalyDetection />
          </Paper>
        </Grid>

        {/* Main Content Tabs */}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(0,0,0,0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                aria-label="dashboard tabs" 
                variant="scrollable" 
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': {
                    minHeight: 64,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&.Mui-selected': {
                      background: theme.palette.mode === 'dark' 
                        ? 'rgba(255,255,255,0.1)' 
                        : 'rgba(33,150,243,0.1)',
                      borderRadius: '8px 8px 0 0',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '3px 3px 0 0',
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(45deg, #2196F3 0%, #21CBF3 100%)',
                  },
                }}
              >
                {tabConfig.map((tab, index) => (
                  <Tab 
                    key={index}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {tab.icon}
                        {tab.label}
                      </Box>
                    }
                  />
                ))}
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