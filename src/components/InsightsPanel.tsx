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
  Grid,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  LocalHospital,
  Nature,
  School,
  AttachMoney,
  Warning,
  Star,
  EmojiEvents,
  Visibility
} from '@mui/icons-material';
import { MOCK_DATA } from '../data/mockData';
import { CITIES } from '../data/mockData';

const InsightsPanel: React.FC = () => {
  const theme = useTheme();

  // Get top 10 cities by HDI
  const topHDICities = [...MOCK_DATA]
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      return {
        cityName: cityInfo ? cityInfo.name : data.cityId,
        state: cityInfo ? cityInfo.state : '',
        hdi: data.metrics.humanDevelopmentIndex || 0
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
        gini: data.metrics.giniCoefficient || 0
      };
    })
    .sort((a, b) => b.gini - a.gini)
    .slice(0, 5);

  // Get cities with best healthcare systems
  const bestHealthcareCities = [...MOCK_DATA]
    .map(data => {
      const cityInfo = CITIES.find(c => c.cityId === data.cityId);
      const healthcareScore = (
        (data.metrics.physiciansPer1000 || 0) * 0.4 +
        (data.metrics.hospitalBedsPer1000 || 0) * 0.3 +
        (data.metrics.healthcareExpenditure || 0) / 1000 * 0.3
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
        (data.metrics.renewableEnergyPercentage || 0) * 0.4 +
        (100 - (data.metrics.co2EmissionsPerCapita || 0) * 20) * 0.3 +
        (data.metrics.forestCoveragePercentage || 0) * 0.3
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

  const InsightCard = ({ title, icon, children, color = 'primary' }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  }) => (
    <Box
      sx={{
        p: 3,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.1)' 
          : 'rgba(0,0,0,0.1)',
        borderRadius: 3,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 8px 32px rgba(0,0,0,0.3)' 
            : '0 8px 32px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          color: color === 'primary' ? theme.palette.primary.main :
                 color === 'secondary' ? theme.palette.secondary.main :
                 color === 'success' ? theme.palette.success.main :
                 color === 'error' ? theme.palette.error.main :
                 color === 'warning' ? theme.palette.warning.main :
                 color === 'info' ? theme.palette.info.main :
                 theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        {icon}
        <Box component="span" sx={{ ml: 1 }}>
          {title}
        </Box>
      </Typography>
      {children}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mb: 3, 
          fontWeight: 700,
          textAlign: 'center',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(45deg, #2196F3 0%, #21CBF3 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
        Key Insights & Rankings
      </Typography>
      
      <Grid container spacing={3}>
        {/* Top HDI Cities */}
        <Grid item xs={12} lg={6}>
          <InsightCard title="Top 10 Cities by HDI" icon={<School />} color="primary">
            <List dense>
              {topHDICities.map((city, index) => (
                <ListItem 
                  key={city.cityName} 
                  sx={{ 
                    py: 1,
                    background: index < 3 
                      ? (theme.palette.mode === 'dark' ? 'rgba(33,150,243,0.1)' : 'rgba(33,150,243,0.05)')
                      : 'transparent',
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Chip 
                      label={index + 1} 
                      size="small" 
                      color={index < 3 ? "primary" : "default"}
                      sx={{ 
                        fontWeight: 600,
                        background: index < 3 
                          ? 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
                          : undefined,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {city.cityName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {city.state} • HDI: {city.hdi.toFixed(3)}
                      </Typography>
                    }
                  />
                  {index < 3 && <Star sx={{ color: '#FFD700', fontSize: 20 }} />}
                </ListItem>
              ))}
            </List>
          </InsightCard>
        </Grid>

        {/* Healthcare Leaders */}
        <Grid item xs={12} lg={6}>
          <InsightCard title="Best Healthcare Systems" icon={<LocalHospital />} color="success">
            <List dense>
              {bestHealthcareCities.map((city, index) => (
                <ListItem 
                  key={city.cityName} 
                  sx={{ 
                    py: 1,
                    background: index < 3 
                      ? (theme.palette.mode === 'dark' ? 'rgba(76,175,80,0.1)' : 'rgba(76,175,80,0.05)')
                      : 'transparent',
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Chip 
                      label={index + 1} 
                      size="small" 
                      color="success"
                      sx={{ 
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #4CAF50 0%, #45a049 100%)',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {city.cityName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {city.state} • Score: {city.score.toFixed(1)}
                      </Typography>
                    }
                  />
                  {index < 3 && <Visibility sx={{ color: '#4CAF50', fontSize: 20 }} />}
                </ListItem>
              ))}
            </List>
          </InsightCard>
        </Grid>

        {/* High Inequality */}
        <Grid item xs={12} lg={6}>
          <InsightCard title="Highest Inequality (Gini)" icon={<Warning />} color="error">
            <List dense>
              {highInequalityCities.map((city, index) => (
                <ListItem 
                  key={city.cityName} 
                  sx={{ 
                    py: 1,
                    background: index < 3 
                      ? (theme.palette.mode === 'dark' ? 'rgba(244,67,54,0.1)' : 'rgba(244,67,54,0.05)')
                      : 'transparent',
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Chip 
                      label={index + 1} 
                      size="small" 
                      color="error"
                      sx={{ 
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #f44336 0%, #d32f2f 100%)',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {city.cityName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {city.state} • Gini: {city.gini.toFixed(3)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </InsightCard>
        </Grid>

        {/* Environmental Performance */}
        <Grid item xs={12} lg={6}>
          <InsightCard title="Environmental Performance" icon={<Nature />} color="success">
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="success.main" sx={{ fontWeight: 600, mb: 1 }}>
                🌱 Environmental Leaders:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {topEnvironmental.map((city, index) => (
                  <Chip 
                    key={city.cityName}
                    label={`${city.cityName} (${city.score.toFixed(0)})`}
                    size="small"
                    color="success"
                    sx={{ 
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #4CAF50 0%, #45a049 100%)',
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="error.main" sx={{ fontWeight: 600, mb: 1 }}>
                ⚠️ Environmental Laggards:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {bottomEnvironmental.map((city, index) => (
                  <Chip 
                    key={city.cityName}
                    label={`${city.cityName} (${city.score.toFixed(0)})`}
                    size="small"
                    color="error"
                    sx={{ 
                      fontWeight: 600,
                      background: 'linear-gradient(45deg, #f44336 0%, #d32f2f 100%)',
                    }}
                  />
                ))}
              </Box>
            </Box>
          </InsightCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsightsPanel; 