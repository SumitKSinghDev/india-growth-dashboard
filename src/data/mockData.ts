import { METRICS } from './metrics';

export interface City {
  cityId: string;
  name: string;
  state: string;
}

interface CityData {
  cityId: string;
  metrics: {
    [key: string]: number;
  };
}

export const CITIES: City[] = [
  { cityId: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
  { cityId: 'delhi', name: 'Delhi', state: 'Delhi' },
  { cityId: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
  { cityId: 'hyderabad', name: 'Hyderabad', state: 'Telangana' },
  { cityId: 'chennai', name: 'Chennai', state: 'Tamil Nadu' },
  { cityId: 'kolkata', name: 'Kolkata', state: 'West Bengal' },
  { cityId: 'pune', name: 'Pune', state: 'Maharashtra' },
  { cityId: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat' },
  { cityId: 'jaipur', name: 'Jaipur', state: 'Rajasthan' },
  { cityId: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh' }
];

// Helper function to generate random data within a range
const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Generate mock data for each city and metric
export const generateMockData = (): CityData[] => {
  return CITIES.map(city => {
    const metrics: { [key: string]: number } = {};
    
    METRICS.forEach(metric => {
      switch (metric.id) {
        // Economic Indicators
        case 'gdp':
          metrics[metric.id] = randomInRange(50000, 200000); // INR Crores
          break;
        case 'gni':
          metrics[metric.id] = randomInRange(45000, 180000); // INR Crores
          break;
        case 'gdp_per_capita':
          metrics[metric.id] = randomInRange(80000, 300000); // INR
          break;
        case 'unemployment':
          metrics[metric.id] = randomInRange(3, 12); // %
          break;
        case 'inflation':
          metrics[metric.id] = randomInRange(2, 8); // %
          break;
        case 'fdi':
          metrics[metric.id] = randomInRange(1000, 5000); // INR Crores
          break;
        case 'trade_ratio':
          metrics[metric.id] = randomInRange(0.5, 1.5); // Ratio
          break;
        case 'public_debt':
          metrics[metric.id] = randomInRange(20, 60); // % of GDP
          break;

        // Social Development
        case 'hdi':
          metrics[metric.id] = randomInRange(0.6, 0.9); // Index (0-1)
          break;
        case 'life_expectancy':
          metrics[metric.id] = randomInRange(65, 80); // Years
          break;
        case 'infant_mortality':
          metrics[metric.id] = randomInRange(10, 50); // per 1000 births
          break;
        case 'literacy':
          metrics[metric.id] = randomInRange(70, 95); // %
          break;
        case 'education_index':
          metrics[metric.id] = randomInRange(0.5, 0.9); // Index (0-1)
          break;
        case 'gender_inequality':
          metrics[metric.id] = randomInRange(0.2, 0.5); // Index (0-1)
          break;
        case 'population_growth':
          metrics[metric.id] = randomInRange(1, 3); // %
          break;
        case 'urban_population':
          metrics[metric.id] = randomInRange(40, 90); // %
          break;

        // Health & Well-being
        case 'healthcare_expenditure':
          metrics[metric.id] = randomInRange(5000, 20000); // INR per capita
          break;
        case 'physicians':
          metrics[metric.id] = randomInRange(0.5, 2); // per 1000 people
          break;
        case 'hospital_beds':
          metrics[metric.id] = randomInRange(1, 5); // per 1000 people
          break;
        case 'clean_water':
          metrics[metric.id] = randomInRange(70, 95); // %
          break;
        case 'vaccination':
          metrics[metric.id] = randomInRange(60, 95); // %
          break;

        // Environment & Sustainability
        case 'co2_emissions':
          metrics[metric.id] = randomInRange(1, 5); // tons per capita
          break;
        case 'renewable_energy':
          metrics[metric.id] = randomInRange(5, 30); // %
          break;
        case 'forest_area':
          metrics[metric.id] = randomInRange(10, 40); // %
          break;
        case 'air_quality':
          metrics[metric.id] = randomInRange(50, 150); // Index
          break;
        case 'environmental_performance':
          metrics[metric.id] = randomInRange(30, 70); // Index (0-100)
          break;

        // Governance & Infrastructure
        case 'corruption_index':
          metrics[metric.id] = randomInRange(30, 70); // Index (0-100)
          break;
        case 'internet_penetration':
          metrics[metric.id] = randomInRange(40, 90); // %
          break;
        case 'mobile_subscriptions':
          metrics[metric.id] = randomInRange(60, 120); // per 100 people
          break;
        case 'infrastructure_quality':
          metrics[metric.id] = randomInRange(3, 6); // Index (1-7)
          break;
        case 'political_stability':
          metrics[metric.id] = randomInRange(-1, 1); // Index (-2.5 to 2.5)
          break;

        // Economic Equality
        case 'gini_coefficient':
          metrics[metric.id] = randomInRange(0.3, 0.5); // Index (0-1)
          break;
        case 'poverty_rate':
          metrics[metric.id] = randomInRange(5, 25); // %
          break;
        case 'social_protection':
          metrics[metric.id] = randomInRange(20, 80); // %
          break;

        default:
          // Default random value for any new metrics
          metrics[metric.id] = randomInRange(0, 100);
          break;
      }
    });

    return {
      cityId: city.cityId,
      metrics
    };
  });
};

export const MOCK_DATA = generateMockData(); 