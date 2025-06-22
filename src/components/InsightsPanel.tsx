import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Chip,
  Grid
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  LocalHospital,
  Eco,
  School,
  AttachMoney,
  Warning
} from '@mui/icons-material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';

const InsightsPanel: React.FC = () => {
  // Get top 10 cities by HDI
  const topHDICities = [...MOCK_DATA]
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        cityName: cityInfo ? cityInfo.name : data.cityId,
        state: cityInfo ? cityInfo.state : '',
        hdi: data.metrics.hdi || 0
      };
    })
    .sort((a, b) => b.hdi - a.hdi)
    .slice(0, 10);

  // Get cities with highest inequality (Gini coefficient)
  const highInequalityCities = [...MOCK_DATA]
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        cityName: cityInfo ? cityInfo.name : data.cityId,
        state: cityInfo ? cityInfo.state : '',
        gini: data.metrics.gini_coefficient || 0
      };
    })
    .sort((a, b) => b.gini - a.gini)
    .slice(0, 5);

  // Get cities with best healthcare systems
  const bestHealthcareCities = [...MOCK_DATA]
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      const healthcareScore = (
        (data.metrics.physicians || 0) * 0.4 +
        (data.metrics.hospital_beds || 0) * 0.3 +
        (data.metrics.healthcare_expenditure || 0) / 1000 * 0.3
      );
      return {
        cityName: cityInfo ? cityInfo.name : data.cityId,
        state: cityInfo ? cityInfo.state : '',
        score: healthcareScore
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Get environmental leaders and laggards
  const environmentalLeaders = [...MOCK_DATA]
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      const envScore = (
        (data.metrics.renewable_energy || 0) * 0.4 +
        (100 - (data.metrics.co2_emissions || 0) * 20) * 0.3 +
        (data.metrics.forest_area || 0) * 0.3
      );
      return {
        cityName: cityInfo ? cityInfo.name : data.cityId,
        state: cityInfo ? cityInfo.state : '',
        score: envScore
      };
    })
    .sort((a, b) => b.score - a.score);

  const topEnvironmental = environmentalLeaders.slice(0, 3);
  const bottomEnvironmental = environmentalLeaders.slice(-3).reverse();

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Key Insights
      </Typography>
      
      <Grid container spacing={2}>
        {/* Top HDI Cities */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <School sx={{ mr: 1 }} />
              Top 10 Cities by HDI
            </Typography>
            <List dense>
              {topHDICities.map((city, index) => (
                <ListItem key={city.cityName} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <Chip 
                      label={index + 1} 
                      size="small" 
                      color={index < 3 ? "primary" : "default"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={city.cityName}
                    secondary={`${city.state} - HDI: ${city.hdi.toFixed(3)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Healthcare Leaders */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalHospital sx={{ mr: 1 }} />
              Best Healthcare Systems
            </Typography>
            <List dense>
              {bestHealthcareCities.map((city, index) => (
                <ListItem key={city.cityName} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <Chip 
                      label={index + 1} 
                      size="small" 
                      color="success"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={city.cityName}
                    secondary={`${city.state} - Score: ${city.score.toFixed(1)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* High Inequality */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Warning sx={{ mr: 1 }} />
              Highest Inequality (Gini)
            </Typography>
            <List dense>
              {highInequalityCities.map((city, index) => (
                <ListItem key={city.cityName} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <Chip 
                      label={index + 1} 
                      size="small" 
                      color="error"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={city.cityName}
                    secondary={`${city.state} - Gini: ${city.gini.toFixed(3)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Environmental Performance */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Eco sx={{ mr: 1 }} />
              Environmental Performance
            </Typography>
            <Box sx={{ mb: 1 }}>
              <Typography variant="caption" color="success.main">Leaders:</Typography>
              {topEnvironmental.map((city, index) => (
                <Chip 
                  key={city.cityName}
                  label={`${city.cityName} (${city.score.toFixed(0)})`}
                  size="small"
                  color="success"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
            <Box>
              <Typography variant="caption" color="error.main">Laggards:</Typography>
              {bottomEnvironmental.map((city, index) => (
                <Chip 
                  key={city.cityName}
                  label={`${city.cityName} (${city.score.toFixed(0)})`}
                  size="small"
                  color="error"
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InsightsPanel; 