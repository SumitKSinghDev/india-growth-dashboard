import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress
} from '@mui/material';
import { CITIES } from '../data/mockData';

interface CityCluster {
  name: string;
  cities: string[];
  characteristics: string[];
  avgPerformance: number;
}

interface Scenario {
  name: string;
  description: string;
  impact: { [metricId: string]: number };
}

interface SDGGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  progress: number;
}

const AdvancedInteractions: React.FC = () => {
  const [cityClusters, setCityClusters] = useState<CityCluster[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [, setScenarioImpact] = useState<{ [cityId: string]: { [metricId: string]: number } }>({});
  const [sdgGoals, setSdgGoals] = useState<SDGGoal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    generateCityClusters();
    generateSDGGoals();
  }, []);

  const generateCityClusters = () => {
    const clusters: CityCluster[] = [
      {
        name: 'High-Performance Tech Hubs',
        cities: ['bangalore', 'hyderabad'],
        characteristics: ['High HDI', 'Low unemployment', 'High internet penetration'],
        avgPerformance: 85
      },
      {
        name: 'Financial & Economic Centers',
        cities: ['mumbai', 'delhi'],
        characteristics: ['High GDP', 'High FDI', 'Strong infrastructure'],
        avgPerformance: 78
      },
      {
        name: 'Manufacturing & Industrial',
        cities: ['chennai', 'pune'],
        characteristics: ['Moderate GDP', 'Good infrastructure'],
        avgPerformance: 72
      }
    ];
    setCityClusters(clusters);
  };

  const generateSDGGoals = () => {
    const goals: SDGGoal[] = [
      {
        id: 'sdg1',
        name: 'No Poverty',
        target: 0,
        current: 15,
        progress: 75
      },
      {
        id: 'sdg3',
        name: 'Good Health & Well-being',
        target: 100,
        current: 75,
        progress: 75
      },
      {
        id: 'sdg4',
        name: 'Quality Education',
        target: 100,
        current: 80,
        progress: 80
      }
    ];
    setSdgGoals(goals);
  };

  const scenarios: Scenario[] = [
    {
      name: 'Green Energy Investment',
      description: 'Invest 20% more in renewable energy',
      impact: {
        renewable_energy: 25,
        co2_emissions: -15
      }
    },
    {
      name: 'Healthcare Boost',
      description: 'Increase healthcare spending by 30%',
      impact: {
        healthcare_expenditure: 30,
        physicians: 20
      }
    }
  ];

  const runScenarioAnalysis = () => {
    if (!selectedScenario) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setScenarioImpact({ 'mumbai': { 'renewable_energy': 25 } });
    }, 2000);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'warning';
    return 'error';
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Advanced Analytics & Interactions
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                City Performance Clusters
              </Typography>
              {cityClusters.map((cluster, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {cluster.name} ({cluster.avgPerformance}%)
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    {cluster.cities.map(cityId => {
                      const cityInfo = CITIES.find(c => c.cityId === cityId);
                      return (
                        <Chip
                          key={cityId}
                          label={cityInfo?.name}
                          size="small"
                          color="primary"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Scenario Analysis
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Scenario</InputLabel>
                <Select
                  value={selectedScenario}
                  label="Select Scenario"
                  onChange={(e) => setSelectedScenario(e.target.value)}
                >
                  {scenarios.map((scenario, index) => (
                    <MenuItem key={index} value={scenario.name}>
                      {scenario.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                onClick={runScenarioAnalysis}
                disabled={isAnalyzing}
                fullWidth
              >
                {isAnalyzing ? 'Analyzing...' : 'Run Scenario Analysis'}
              </Button>
              
              {isAnalyzing && <LinearProgress sx={{ mt: 2 }} />}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SDG Progress Tracking
              </Typography>
              
              <Grid container spacing={2}>
                {sdgGoals.map((goal) => (
                  <Grid item xs={12} md={6} key={goal.id}>
                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {goal.name}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {goal.progress}%
                        </Typography>
                        <Box sx={{ flexGrow: 1, ml: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={goal.progress}
                            color={getProgressColor(goal.progress) as any}
                          />
                        </Box>
                      </Box>
                      
                      <Chip 
                        label={goal.progress >= 80 ? "On Track" : "Needs Attention"} 
                        size="small" 
                        color={getProgressColor(goal.progress) as any}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AdvancedInteractions; 