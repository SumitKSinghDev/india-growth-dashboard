import { CITIES } from './mockData';
import { METRICS } from './metrics';

export interface TimeSeriesDataPoint {
  year: number;
  value: number;
}

export interface CityTimeSeriesData {
  cityId: string;
  metricId: string;
  data: TimeSeriesDataPoint[];
}

const generateTimeSeriesData = (): CityTimeSeriesData[] => {
  const years = [2019, 2020, 2021, 2022, 2023];
  const timeSeriesData: CityTimeSeriesData[] = [];

  CITIES.forEach(city => {
    METRICS.forEach(metric => {
      const data: TimeSeriesDataPoint[] = [];
      let baseValue: number;

      // Set base value based on metric type
      switch (metric.id) {
        // Economic Indicators
        case 'gdp':
          baseValue = 400000; // INR Crores
          break;
        case 'gni':
          baseValue = 350000; // INR Crores
          break;
        case 'unemployment':
          baseValue = 7; // %
          break;
        case 'inflation':
          baseValue = 5; // %
          break;
        case 'fdi':
          baseValue = 75000; // INR Crores
          break;
        case 'gdp_growth':
          baseValue = 6; // %
          break;
        case 'investment_ratio':
          baseValue = 1.0; // Ratio
          break;
        case 'public_debt':
          baseValue = 40; // %
          break;

        // Social Development
        case 'hdi':
          baseValue = 0.7; // Index (0-1)
          break;
        case 'life_expectancy':
          baseValue = 70; // Years
          break;
        case 'literacy':
          baseValue = 80; // %
          break;
        case 'gender_inequality':
          baseValue = 0.4; // Index (0-1)
          break;
        case 'education_index':
          baseValue = 0.6; // Index (0-1)
          break;
        case 'poverty_rate':
          baseValue = 15; // %
          break;
        case 'population_growth':
          baseValue = 2; // %
          break;
        case 'urban_population':
          baseValue = 60; // %
          break;

        // Health & Well-being
        case 'healthcare_expenditure':
          baseValue = 8000; // INR per capita
          break;
        case 'physicians':
          baseValue = 1.0; // per 1000 people
          break;
        case 'hospital_beds':
          baseValue = 2.0; // per 1000 people
          break;
        case 'maternal_mortality':
          baseValue = 80; // %
          break;
        case 'vaccination':
          baseValue = 75; // %
          break;

        // Environment & Sustainability
        case 'forest_area':
          baseValue = 25; // % of land area
          break;
        case 'co2_emissions':
          baseValue = 2.5; // tons per capita
          break;
        case 'renewable_energy':
          baseValue = 15; // %
          break;
        case 'air_quality':
          baseValue = 100; // Index
          break;
        case 'water_quality':
          baseValue = 70; // Index (0-100)
          break;
        case 'environmental_performance':
          baseValue = 50; // Index (0-100)
          break;

        // Governance & Infrastructure
        case 'corruption_index':
          baseValue = 50; // Index (0-100)
          break;
        case 'internet_penetration':
          baseValue = 60; // %
          break;
        case 'road_quality':
          baseValue = 4.0; // Index (1-7)
          break;
        case 'electricity_access':
          baseValue = 90; // %
          break;
        case 'political_stability':
          baseValue = 0; // Index (-2.5 to 2.5)
          break;

        // Economic Equality
        case 'gini_coefficient':
          baseValue = 0.4; // Index (0-1)
          break;
        case 'income_inequality':
          baseValue = 0.5; // Index (0-1)
          break;
        case 'poverty_gap':
          baseValue = 10; // %
          break;

        default:
          baseValue = 0;
      }

      // Generate time series data with realistic trends
      years.forEach((year, index) => {
        let value = baseValue;
        
        // Add city-specific variation
        const cityFactor = 1 + (parseInt(city.cityId.charCodeAt(0).toString()) % 10) / 100;
        
        // Add year-over-year growth/change
        let yearFactor = 1 + (index * 0.05); // 5% growth per year
        
        // Add some randomness
        const randomFactor = 0.95 + Math.random() * 0.1; // ±5% randomness
        
        // Apply COVID-19 impact for 2020
        if (year === 2020) {
          yearFactor = 1;
          switch (metric.id) {
            case 'gdp':
            case 'gni':
            case 'fdi':
              yearFactor = 0.9; // 10% decline
              break;
            case 'unemployment':
              yearFactor = 1.3; // 30% increase
              break;
            case 'healthcare_expenditure':
              yearFactor = 1.2; // 20% increase
              break;
            default:
              yearFactor = 1;
          }
        }

        value = baseValue * cityFactor * yearFactor * randomFactor;

        // Ensure values stay within reasonable ranges
        if (metric.unit.includes('%')) {
          value = Math.min(Math.max(value, 0), 100);
        } else if (metric.unit.includes('Index')) {
          if (metric.unit.includes('0-1')) {
            value = Math.min(Math.max(value, 0), 1);
          } else if (metric.unit.includes('0-100')) {
            value = Math.min(Math.max(value, 0), 100);
          }
        }

        data.push({
          year,
          value: Number(value.toFixed(2))
        });
      });

      timeSeriesData.push({
        cityId: city.cityId,
        metricId: metric.id,
        data
      });
    });
  });

  return timeSeriesData;
};

export const TIME_SERIES_DATA = generateTimeSeriesData(); 