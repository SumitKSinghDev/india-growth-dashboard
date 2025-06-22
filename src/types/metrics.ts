export type MetricCategory = 
  | 'Economic'
  | 'Social'
  | 'Health'
  | 'Environment'
  | 'Governance'
  | 'Equality';

export interface Metric {
  id: string;
  name: string;
  category: MetricCategory;
  unit: string;
  description: string;
  isPercentage?: boolean;
}

export interface CityData {
  cityId: string;
  name: string;
  state: string;
  metrics: {
    [key: string]: {
      value: number;
      year: number;
      trend: number[];
    };
  };
}

export interface TimeSeriesData {
  cityId: string;
  cityName: string;
  metricId: string;
  values: {
    year: number;
    value: number;
  }[];
}

export const METRICS: Metric[] = [
  // Economic Indicators
  {
    id: 'gdp',
    name: 'GDP',
    category: 'Economic',
    unit: 'Trillion INR',
    description: 'Gross Domestic Product'
  },
  {
    id: 'gni',
    name: 'GNI',
    category: 'Economic',
    unit: 'Trillion INR',
    description: 'Gross National Income'
  },
  {
    id: 'gdp_per_capita',
    name: 'GDP per Capita',
    category: 'Economic',
    unit: 'INR',
    description: 'GDP per capita'
  },
  {
    id: 'unemployment_rate',
    name: 'Unemployment Rate',
    category: 'Economic',
    unit: '%',
    description: 'Unemployment Rate',
    isPercentage: true
  },
  // Social Development
  {
    id: 'hdi',
    name: 'Human Development Index',
    category: 'Social',
    unit: 'Index',
    description: 'Human Development Index'
  },
  {
    id: 'life_expectancy',
    name: 'Life Expectancy',
    category: 'Social',
    unit: 'Years',
    description: 'Average Life Expectancy'
  },
  // Health & Well-being
  {
    id: 'healthcare_expenditure',
    name: 'Healthcare Expenditure per Capita',
    category: 'Health',
    unit: 'INR',
    description: 'Healthcare Expenditure per Capita'
  },
  // Environment & Sustainability
  {
    id: 'co2_emissions',
    name: 'CO2 Emissions per Capita',
    category: 'Environment',
    unit: 'Tons',
    description: 'CO2 Emissions per Capita'
  },
  // Governance & Infrastructure
  {
    id: 'internet_penetration',
    name: 'Internet Penetration',
    category: 'Governance',
    unit: '%',
    description: 'Internet Penetration Rate',
    isPercentage: true
  },
  // Economic Equality
  {
    id: 'gini_coefficient',
    name: 'Gini Coefficient',
    category: 'Equality',
    unit: 'Index',
    description: 'Income Inequality Index'
  }
]; 