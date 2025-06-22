import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Alert,
  LinearProgress,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TIME_SERIES_DATA } from '../data/timeSeriesData';
import { CITIES } from '../data/mockData';

interface TrendPredictionProps {
  selectedCities: string[];
  selectedMetric: string;
}

interface PredictionData {
  year: number;
  actual?: number;
  predicted?: number;
  confidence: number;
}

const TrendPrediction: React.FC<TrendPredictionProps> = ({ selectedCities, selectedMetric }) => {
  const [predictions, setPredictions] = useState<{ [cityId: string]: PredictionData[] }>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string>('');

  // Simple linear regression for trend prediction
  const calculateTrend = (data: { year: number; value: number }[]) => {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.year, 0);
    const sumY = data.reduce((sum, point) => sum + point.value, 0);
    const sumXY = data.reduce((sum, point) => sum + point.year * point.value, 0);
    const sumXX = data.reduce((sum, point) => sum + point.year * point.year, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  };

  // Generate predictions for next 3 years
  const generatePredictions = () => {
    if (!selectedMetric || selectedCities.length === 0) {
      setError('Please select a metric and at least one city');
      return;
    }

    setIsCalculating(true);
    setError('');

    const newPredictions: { [cityId: string]: PredictionData[] } = {};

    selectedCities.forEach(cityId => {
      const cityData = TIME_SERIES_DATA.find(
        data => data.cityId === cityId && data.metricId === selectedMetric
      );

      if (cityData && cityData.data.length >= 3) {
        const { slope, intercept } = calculateTrend(cityData.data);
        
        const predictionData: PredictionData[] = [
          ...cityData.data.map(point => ({
            year: point.year,
            actual: point.value,
            predicted: undefined,
            confidence: 1
          }))
        ];

        // Add predictions for next 3 years
        for (let year = 2024; year <= 2026; year++) {
          const predictedValue = slope * year + intercept;
          const confidence = Math.max(0.3, 1 - (year - 2023) * 0.2); // Decreasing confidence over time
          
          predictionData.push({
            year,
            predicted: Math.max(0, predictedValue), // Ensure non-negative values
            confidence
          });
        }

        newPredictions[cityId] = predictionData;
      }
    });

    setPredictions(newPredictions);
    setIsCalculating(false);
  };

  const getTrendDirection = (cityId: string) => {
    const data = predictions[cityId];
    if (!data || data.length < 2) return 'stable';

    const recentActual = data.filter(d => d.actual !== undefined).slice(-3);
    const recentPredicted = data.filter(d => d.predicted !== undefined).slice(0, 3);

    if (recentActual.length === 0 || recentPredicted.length === 0) return 'stable';

    const actualAvg = recentActual.reduce((sum, d) => sum + (d.actual || 0), 0) / recentActual.length;
    const predictedAvg = recentPredicted.reduce((sum, d) => sum + (d.predicted || 0), 0) / recentPredicted.length;

    const change = ((predictedAvg - actualAvg) / actualAvg) * 100;

    if (change > 5) return 'increasing';
    if (change < -5) return 'decreasing';
    return 'stable';
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'increasing': return '#4caf50';
      case 'decreasing': return '#f44336';
      default: return '#ff9800';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'increasing': return '↗️';
      case 'decreasing': return '↘️';
      default: return '→';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        AI-Powered Trend Prediction
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={generatePredictions}
          disabled={isCalculating || !selectedMetric || selectedCities.length === 0}
          sx={{ mb: 2 }}
        >
          {isCalculating ? 'Calculating Predictions...' : 'Generate Predictions'}
        </Button>
        
        {isCalculating && <LinearProgress sx={{ mb: 2 }} />}
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      </Box>

      {Object.keys(predictions).length > 0 && (
        <Grid container spacing={2}>
          {selectedCities.map(cityId => {
            const cityInfo = CITIES.find(c => c.cityId === cityId);
            const cityPredictions = predictions[cityId];
            const trendDirection = getTrendDirection(cityId);
            
            if (!cityPredictions) return null;

            const chartData = cityPredictions.map(point => ({
              year: point.year,
              actual: point.actual,
              predicted: point.predicted,
              confidence: point.confidence
            }));

            return (
              <Grid item xs={12} md={6} key={cityId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {cityInfo?.name}, {cityInfo?.state}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Trend: {getTrendIcon(trendDirection)} {trendDirection}
                      </Typography>
                      <Box 
                        sx={{ 
                          width: 12, 
                          height: 12, 
                          borderRadius: '50%', 
                          backgroundColor: getTrendColor(trendDirection),
                          ml: 1
                        }} 
                      />
                    </Box>

                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          connectNulls={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#82ca9d" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          connectNulls={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    <Typography variant="caption" color="text.secondary">
                      Confidence: {Math.round(cityPredictions[cityPredictions.length - 1]?.confidence * 100)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Paper>
  );
};

export default TrendPrediction; 