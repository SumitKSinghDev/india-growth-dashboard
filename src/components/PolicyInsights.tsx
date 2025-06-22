import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Lightbulb,
  School,
  LocalHospital,
  Nature,
  AttachMoney,
  Star,
  Group
} from '@mui/icons-material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';

interface PolicyInsight {
  cityId: string;
  category: string;
  issue: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  successStory?: string;
  similarCities?: string[];
}

const PolicyInsights: React.FC = () => {
  const [policyInsights, setPolicyInsights] = useState<PolicyInsight[]>([]);
  const [successStories, setSuccessStories] = useState<PolicyInsight[]>([]);
  const [cityClusters, setCityClusters] = useState<{ [cluster: string]: string[] }>({});

  useEffect(() => {
    generatePolicyInsights();
    generateSuccessStories();
    generateCityClusters();
  }, []);

  const generatePolicyInsights = () => {
    const insights: PolicyInsight[] = [];

    MOCK_DATA.forEach(cityData => {
      const cityInfo = CITIES.find(c => c.cityId === cityData.cityId);
      if (!cityInfo) return;

      // Healthcare insights
      if (cityData.metrics.physicians < 0.8) {
        insights.push({
          cityId: cityData.cityId,
          category: 'Healthcare',
          issue: 'Low physician density',
          recommendation: 'Implement medical education incentives and improve healthcare infrastructure',
          priority: 'high'
        });
      }

      if (cityData.metrics.hospital_beds < 2) {
        insights.push({
          cityId: cityData.cityId,
          category: 'Healthcare',
          issue: 'Insufficient hospital beds',
          recommendation: 'Expand hospital capacity and invest in healthcare facilities',
          priority: 'high'
        });
      }

      // Education insights
      if (cityData.metrics.literacy < 85) {
        insights.push({
          cityId: cityData.cityId,
          category: 'Education',
          issue: 'Low literacy rate',
          recommendation: 'Launch adult literacy programs and improve school infrastructure',
          priority: 'medium'
        });
      }

      // Economic insights
      if (cityData.metrics.unemployment > 8) {
        insights.push({
          cityId: cityData.cityId,
          category: 'Economic',
          issue: 'High unemployment rate',
          recommendation: 'Create job training programs and attract new industries',
          priority: 'high'
        });
      }

      // Environmental insights
      if (cityData.metrics.co2_emissions > 3) {
        insights.push({
          cityId: cityData.cityId,
          category: 'Environment',
          issue: 'High CO2 emissions',
          recommendation: 'Implement green energy policies and public transportation improvements',
          priority: 'medium'
        });
      }

      if (cityData.metrics.renewable_energy < 15) {
        insights.push({
          cityId: cityData.cityId,
          category: 'Environment',
          issue: 'Low renewable energy adoption',
          recommendation: 'Incentivize renewable energy projects and solar panel installations',
          priority: 'medium'
        });
      }

      // Infrastructure insights
      if (cityData.metrics.internet_penetration < 70) {
        insights.push({
          cityId: cityData.cityId,
          category: 'Infrastructure',
          issue: 'Low internet penetration',
          recommendation: 'Expand broadband infrastructure and digital literacy programs',
          priority: 'medium'
        });
      }
    });

    setPolicyInsights(insights);
  };

  const generateSuccessStories = () => {
    const stories: PolicyInsight[] = [
      {
        cityId: 'bangalore',
        category: 'Technology',
        issue: 'Tech hub development',
        recommendation: 'Successfully attracted major tech companies through infrastructure and policy support',
        priority: 'high',
        successStory: 'Bangalore transformed into India\'s Silicon Valley through strategic IT policies, startup incubators, and world-class educational institutions.'
      },
      {
        cityId: 'mumbai',
        category: 'Financial Services',
        issue: 'Financial center growth',
        recommendation: 'Established as India\'s financial capital through regulatory reforms and infrastructure development',
        priority: 'high',
        successStory: 'Mumbai\'s financial district development created thousands of jobs and attracted global financial institutions.'
      },
      {
        cityId: 'hyderabad',
        category: 'Healthcare',
        issue: 'Medical tourism',
        recommendation: 'Developed world-class healthcare facilities and medical tourism infrastructure',
        priority: 'medium',
        successStory: 'Hyderabad became a leading medical tourism destination through investment in healthcare infrastructure and international partnerships.'
      }
    ];

    setSuccessStories(stories);
  };

  const generateCityClusters = () => {
    // Simple clustering based on similar performance patterns
    const clusters: { [cluster: string]: string[] } = {
      'Tech Leaders': ['bangalore', 'hyderabad'],
      'Financial Hubs': ['mumbai', 'delhi'],
      'Manufacturing Centers': ['chennai', 'pune'],
      'Cultural Heritage': ['jaipur', 'lucknow'],
      'Port Cities': ['mumbai', 'kolkata'],
      'Educational Hubs': ['bangalore', 'pune', 'hyderabad']
    };

    setCityClusters(clusters);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Healthcare': return <LocalHospital />;
      case 'Education': return <School />;
      case 'Economic': return <AttachMoney />;
      case 'Environment': return <Nature />;
      case 'Infrastructure': return <TrendingUp />;
      case 'Technology': return <Lightbulb />;
      case 'Financial Services': return <AttachMoney />;
      default: return <Lightbulb />;
    }
  };

  const highPriorityInsights = policyInsights.filter(insight => insight.priority === 'high');
  const mediumPriorityInsights = policyInsights.filter(insight => insight.priority === 'medium');

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Policy Insights & Recommendations
      </Typography>

      <Grid container spacing={2}>
        {/* High Priority Recommendations */}
        {highPriorityInsights.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ border: '2px solid #f44336' }}>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  🔴 High Priority Actions ({highPriorityInsights.length})
                </Typography>
                <List dense>
                  {highPriorityInsights.slice(0, 5).map((insight, index) => {
                    const cityInfo = CITIES.find(c => c.cityId === insight.cityId);
                    return (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getCategoryIcon(insight.category)}
                        </ListItemIcon>
                        <ListItemText
                          primary={`${cityInfo?.name}, ${cityInfo?.state}`}
                          secondary={`${insight.issue}: ${insight.recommendation}`}
                        />
                        <Chip 
                          label={insight.category} 
                          size="small" 
                          color="error"
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Success Stories */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '2px solid #4caf50' }}>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ mr: 1 }} />
                Success Stories
              </Typography>
              {successStories.map((story, index) => {
                const cityInfo = CITIES.find(c => c.cityId === story.cityId);
                return (
                  <Accordion key={index} sx={{ mb: 1 }}>
                    <AccordionSummary>
                      <Typography variant="subtitle2">
                        {cityInfo?.name} - {story.category}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {story.successStory}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

        {/* City Clusters */}
        <Grid item xs={12} md={6}>
          <Card sx={{ border: '2px solid #2196f3' }}>
            <CardContent>
              <Typography variant="h6" color="info.main" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Group sx={{ mr: 1 }} />
                Similar City Profiles
              </Typography>
              {Object.entries(cityClusters).map(([cluster, cities]) => (
                <Box key={cluster} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {cluster}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {cities.map(cityId => {
                      const cityInfo = CITIES.find(c => c.cityId === cityId);
                      return (
                        <Chip
                          key={cityId}
                          label={cityInfo?.name}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Medium Priority Recommendations */}
        {mediumPriorityInsights.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ border: '2px solid #ff9800' }}>
              <CardContent>
                <Typography variant="h6" color="warning.main" gutterBottom>
                  🟡 Medium Priority Actions ({mediumPriorityInsights.length})
                </Typography>
                <List dense>
                  {mediumPriorityInsights.slice(0, 5).map((insight, index) => {
                    const cityInfo = CITIES.find(c => c.cityId === insight.cityId);
                    return (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getCategoryIcon(insight.category)}
                        </ListItemIcon>
                        <ListItemText
                          primary={`${cityInfo?.name}`}
                          secondary={`${insight.issue}: ${insight.recommendation}`}
                        />
                        <Chip 
                          label={insight.category} 
                          size="small" 
                          color="warning"
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Summary */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Policy Summary:</strong> Generated {policyInsights.length} policy recommendations across {new Set(policyInsights.map(i => i.category)).size} categories. 
          {highPriorityInsights.length > 0 && ` ${highPriorityInsights.length} high-priority actions require immediate attention.`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default PolicyInsights; 