import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  Warning,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';
import { METRICS } from '../data/metrics';

interface Anomaly {
  cityId: string;
  metricId: string;
  value: number;
  expectedRange: [number, number];
  severity: 'low' | 'medium' | 'high';
  type: 'outlier' | 'trend' | 'performance';
  description: string;
}

const AnomalyDetection: React.FC = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Calculate z-score for outlier detection
  const calculateZScore = (value: number, values: number[]) => {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    return stdDev === 0 ? 0 : (value - mean) / stdDev;
  };

  // Detect anomalies using statistical methods
  const detectAnomalies = () => {
    setIsAnalyzing(true);
    const detectedAnomalies: Anomaly[] = [];

    METRICS.forEach(metric => {
      const values = MOCK_DATA.map(data => data.metrics[metric.id] || 0).filter(val => val > 0);
      
      if (values.length < 3) return; // Need at least 3 data points

      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const stdDev = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length);
      
      const lowerBound = mean - 2 * stdDev;
      const upperBound = mean + 2 * stdDev;

      MOCK_DATA.forEach(cityData => {
        const value = cityData.metrics[metric.id] || 0;
        const zScore = calculateZScore(value, values);
        
        // Detect outliers (z-score > 2 or < -2)
        if (Math.abs(zScore) > 2) {
          const severity = Math.abs(zScore) > 3 ? 'high' : Math.abs(zScore) > 2.5 ? 'medium' : 'low';
          
          detectedAnomalies.push({
            cityId: cityData.cityId,
            metricId: metric.id,
            value,
            expectedRange: [lowerBound, upperBound],
            severity,
            type: 'outlier',
            description: `${zScore > 0 ? 'Unusually high' : 'Unusually low'} ${metric.name} value`
          });
        }
        
        // Detect performance issues based on metric type
        if (metric.category === 'Health' && metric.id === 'physicians' && value < 0.5) {
          detectedAnomalies.push({
            cityId: cityData.cityId,
            metricId: metric.id,
            value,
            expectedRange: [0.5, 5],
            severity: 'high',
            type: 'performance',
            description: 'Critical shortage of physicians'
          });
        }
        
        if (metric.category === 'Environment' && metric.id === 'co2_emissions' && value > 4) {
          detectedAnomalies.push({
            cityId: cityData.cityId,
            metricId: metric.id,
            value,
            expectedRange: [0, 4],
            severity: 'high',
            type: 'performance',
            description: 'Excessive CO2 emissions'
          });
        }
        
        if (metric.category === 'Economic' && metric.id === 'unemployment' && value > 10) {
          detectedAnomalies.push({
            cityId: cityData.cityId,
            metricId: metric.id,
            value,
            expectedRange: [0, 10],
            severity: 'medium',
            type: 'performance',
            description: 'High unemployment rate'
          });
        }
      });
    });

    setAnomalies(detectedAnomalies);
    setIsAnalyzing(false);
  };

  useEffect(() => {
    detectAnomalies();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <Error color="error" />;
      case 'medium': return <Warning color="warning" />;
      case 'low': return <CheckCircle color="info" />;
      default: return <CheckCircle />;
    }
  };

  const getAnomalyTypeIcon = (type: string) => {
    switch (type) {
      case 'outlier': return <TrendingUp />;
      case 'trend': return <TrendingDown />;
      case 'performance': return <Warning />;
      default: return <Warning />;
    }
  };

  const highSeverityAnomalies = anomalies.filter(a => a.severity === 'high');
  const mediumSeverityAnomalies = anomalies.filter(a => a.severity === 'medium');
  const lowSeverityAnomalies = anomalies.filter(a => a.severity === 'low');

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Anomaly Detection
      </Typography>
      
      {isAnalyzing && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Analyzing city performance patterns...
        </Alert>
      )}

      <Grid container spacing={2}>
        {/* High Severity Anomalies */}
        {highSeverityAnomalies.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ border: '2px solid #f44336' }}>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  🔴 Critical Issues ({highSeverityAnomalies.length})
                </Typography>
                <List dense>
                  {highSeverityAnomalies.map((anomaly, index) => {
                    const cityInfo = CITIES.find(c => c.cityId === anomaly.cityId);
                    const metric = METRICS.find(m => m.id === anomaly.metricId);
                    return (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getSeverityIcon(anomaly.severity)}
                        </ListItemIcon>
                        <ListItemText
                          primary={`${cityInfo?.name}, ${cityInfo?.state}`}
                          secondary={`${metric?.name}: ${anomaly.value.toFixed(2)} ${metric?.unit} - ${anomaly.description}`}
                        />
                        <Chip 
                          label={anomaly.type} 
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

        {/* Medium Severity Anomalies */}
        {mediumSeverityAnomalies.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '2px solid #ff9800' }}>
              <CardContent>
                <Typography variant="h6" color="warning.main" gutterBottom>
                  🟡 Warning Issues ({mediumSeverityAnomalies.length})
                </Typography>
                <List dense>
                  {mediumSeverityAnomalies.slice(0, 5).map((anomaly, index) => {
                    const cityInfo = CITIES.find(c => c.cityId === anomaly.cityId);
                    const metric = METRICS.find(m => m.id === anomaly.metricId);
                    return (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getSeverityIcon(anomaly.severity)}
                        </ListItemIcon>
                        <ListItemText
                          primary={`${cityInfo?.name}`}
                          secondary={`${metric?.name}: ${anomaly.value.toFixed(2)}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Low Severity Anomalies */}
        {lowSeverityAnomalies.length > 0 && (
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '2px solid #2196f3' }}>
              <CardContent>
                <Typography variant="h6" color="info.main" gutterBottom>
                  🔵 Minor Issues ({lowSeverityAnomalies.length})
                </Typography>
                <List dense>
                  {lowSeverityAnomalies.slice(0, 5).map((anomaly, index) => {
                    const cityInfo = CITIES.find(c => c.cityId === anomaly.cityId);
                    const metric = METRICS.find(m => m.id === anomaly.metricId);
                    return (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {getSeverityIcon(anomaly.severity)}
                        </ListItemIcon>
                        <ListItemText
                          primary={`${cityInfo?.name}`}
                          secondary={`${metric?.name}: ${anomaly.value.toFixed(2)}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Summary */}
        <Grid item xs={12}>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Analysis Summary:</strong> Detected {anomalies.length} anomalies across {METRICS.length} metrics. 
              {highSeverityAnomalies.length > 0 && ` ${highSeverityAnomalies.length} critical issues require immediate attention.`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AnomalyDetection; 