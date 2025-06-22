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
  source: string;
  lastUpdated: string;
}

export const METRICS: Metric[] = [
  // Economic Indicators
  {
    id: 'gdp',
    name: 'GDP',
    category: 'Economic',
    unit: 'INR Crores',
    description: 'Gross Domestic Product',
    source: 'Ministry of Statistics and Programme Implementation',
    lastUpdated: '2023'
  },
  {
    id: 'gni',
    name: 'GNI',
    category: 'Economic',
    unit: 'INR Crores',
    description: 'Gross National Income',
    source: 'World Bank',
    lastUpdated: '2023'
  },
  {
    id: 'gdp_per_capita',
    name: 'GDP per Capita',
    category: 'Economic',
    unit: 'INR',
    description: 'GDP divided by population',
    source: 'World Bank',
    lastUpdated: '2024'
  },
  {
    id: 'unemployment',
    name: 'Unemployment Rate',
    category: 'Economic',
    unit: '%',
    description: 'Percentage of unemployed workforce',
    source: 'Ministry of Labour and Employment',
    lastUpdated: '2023'
  },
  {
    id: 'inflation',
    name: 'Inflation Rate',
    category: 'Economic',
    unit: '%',
    description: 'Annual rate of inflation',
    source: 'Reserve Bank of India',
    lastUpdated: '2023'
  },
  {
    id: 'fdi',
    name: 'Foreign Direct Investment',
    category: 'Economic',
    unit: 'INR Crores',
    description: 'Foreign Direct Investment inflows',
    source: 'Department for Promotion of Industry and Internal Trade',
    lastUpdated: '2023'
  },
  {
    id: 'trade_ratio',
    name: 'Export/Import Ratio',
    category: 'Economic',
    unit: 'Ratio',
    description: 'Ratio of exports to imports',
    source: 'Ministry of Commerce',
    lastUpdated: '2024'
  },
  {
    id: 'public_debt',
    name: 'Public Debt as % of GDP',
    category: 'Economic',
    unit: '% of GDP',
    description: 'Public debt as percentage of GDP',
    source: 'Ministry of Finance',
    lastUpdated: '2023'
  },

  // Social Development
  {
    id: 'hdi',
    name: 'Human Development Index (HDI)',
    category: 'Social',
    unit: 'Index (0-1)',
    description: 'Composite index of life expectancy, education, and per capita income',
    source: 'UNDP',
    lastUpdated: '2023'
  },
  {
    id: 'life_expectancy',
    name: 'Life Expectancy',
    category: 'Social',
    unit: 'Years',
    description: 'Average life expectancy at birth',
    source: 'Ministry of Health and Family Welfare',
    lastUpdated: '2023'
  },
  {
    id: 'infant_mortality',
    name: 'Infant Mortality Rate',
    category: 'Social',
    unit: 'per 1000 births',
    description: 'Deaths of infants under one year old',
    source: 'Ministry of Health',
    lastUpdated: '2024'
  },
  {
    id: 'literacy',
    name: 'Literacy Rate',
    category: 'Social',
    unit: '%',
    description: 'Percentage of literate population',
    source: 'Ministry of Education',
    lastUpdated: '2023'
  },
  {
    id: 'education_index',
    name: 'Education Index',
    category: 'Social',
    unit: 'Index (0-1)',
    description: 'Composite index of education indicators',
    source: 'Ministry of Education',
    lastUpdated: '2023'
  },
  {
    id: 'gender_inequality',
    name: 'Gender Inequality Index',
    category: 'Social',
    unit: 'Index (0-1)',
    description: 'Measure of gender disparities',
    source: 'UNDP',
    lastUpdated: '2023'
  },
  {
    id: 'population_growth',
    name: 'Population Growth Rate',
    category: 'Social',
    unit: '%',
    description: 'Annual population growth rate',
    source: 'Census of India',
    lastUpdated: '2023'
  },
  {
    id: 'urban_population',
    name: 'Urban Population %',
    category: 'Social',
    unit: '%',
    description: 'Percentage of urban population',
    source: 'Census of India',
    lastUpdated: '2023'
  },

  // Health & Well-being
  {
    id: 'healthcare_expenditure',
    name: 'Healthcare Expenditure per Capita',
    category: 'Health',
    unit: 'INR per capita',
    description: 'Per capita healthcare expenditure',
    source: 'Ministry of Health and Family Welfare',
    lastUpdated: '2023'
  },
  {
    id: 'physicians',
    name: 'Physicians per 1000 people',
    category: 'Health',
    unit: 'per 1000 people',
    description: 'Number of physicians per 1000 population',
    source: 'World Health Organization',
    lastUpdated: '2023'
  },
  {
    id: 'hospital_beds',
    name: 'Hospital Beds per 1000 people',
    category: 'Health',
    unit: 'per 1000 people',
    description: 'Number of hospital beds per 1000 population',
    source: 'Ministry of Health and Family Welfare',
    lastUpdated: '2023'
  },
  {
    id: 'clean_water',
    name: 'Access to Clean Water %',
    category: 'Health',
    unit: '%',
    description: 'Percentage with access to clean drinking water',
    source: 'WHO',
    lastUpdated: '2024'
  },
  {
    id: 'vaccination',
    name: 'Vaccination Coverage %',
    category: 'Health',
    unit: '%',
    description: 'Percentage of population with complete vaccination',
    source: 'Ministry of Health and Family Welfare',
    lastUpdated: '2023'
  },

  // Environment & Sustainability
  {
    id: 'co2_emissions',
    name: 'CO2 Emissions per Capita',
    category: 'Environment',
    unit: 'tons per capita',
    description: 'Carbon dioxide emissions per capita',
    source: 'Ministry of Environment, Forest and Climate Change',
    lastUpdated: '2023'
  },
  {
    id: 'renewable_energy',
    name: 'Renewable Energy %',
    category: 'Environment',
    unit: '%',
    description: 'Percentage of renewable energy in total energy mix',
    source: 'Ministry of New and Renewable Energy',
    lastUpdated: '2023'
  },
  {
    id: 'forest_area',
    name: 'Forest Area %',
    category: 'Environment',
    unit: '%',
    description: 'Percentage of land area covered by forests',
    source: 'Forest Survey of India',
    lastUpdated: '2023'
  },
  {
    id: 'air_quality',
    name: 'Air Quality Index',
    category: 'Environment',
    unit: 'Index',
    description: 'Air quality index',
    source: 'Central Pollution Control Board',
    lastUpdated: '2023'
  },
  {
    id: 'environmental_performance',
    name: 'Environmental Performance Index',
    category: 'Environment',
    unit: 'Index (0-100)',
    description: 'Environmental performance index',
    source: 'Yale Center for Environmental Law & Policy',
    lastUpdated: '2023'
  },

  // Governance & Infrastructure
  {
    id: 'corruption_index',
    name: 'Corruption Perceptions Index',
    category: 'Governance',
    unit: 'Index (0-100)',
    description: 'Perceived levels of corruption',
    source: 'Transparency International',
    lastUpdated: '2023'
  },
  {
    id: 'internet_penetration',
    name: 'Internet Penetration %',
    category: 'Governance',
    unit: '%',
    description: 'Percentage of population with internet access',
    source: 'TRAI',
    lastUpdated: '2023'
  },
  {
    id: 'mobile_subscriptions',
    name: 'Mobile Phone Subscriptions',
    category: 'Governance',
    unit: 'per 100 people',
    description: 'Number of mobile phone subscriptions per 100 people',
    source: 'TRAI',
    lastUpdated: '2024'
  },
  {
    id: 'infrastructure_quality',
    name: 'Infrastructure Quality Index',
    category: 'Governance',
    unit: 'Index (1-7)',
    description: 'Quality of infrastructure',
    source: 'World Economic Forum',
    lastUpdated: '2023'
  },
  {
    id: 'political_stability',
    name: 'Political Stability Index',
    category: 'Governance',
    unit: 'Index (-2.5 to 2.5)',
    description: 'Political stability and absence of violence',
    source: 'World Bank',
    lastUpdated: '2023'
  },

  // Economic Equality
  {
    id: 'gini_coefficient',
    name: 'Gini Coefficient (Income Inequality)',
    category: 'Equality',
    unit: 'Index (0-1)',
    description: 'Income inequality measure',
    source: 'NITI Aayog',
    lastUpdated: '2023'
  },
  {
    id: 'poverty_rate',
    name: 'Poverty Rate',
    category: 'Equality',
    unit: '%',
    description: 'Percentage of population below poverty line',
    source: 'NITI Aayog',
    lastUpdated: '2024'
  },
  {
    id: 'social_protection',
    name: 'Social Protection Coverage',
    category: 'Equality',
    unit: '%',
    description: 'Percentage of population covered by social protection',
    source: 'Ministry of Social Justice',
    lastUpdated: '2024'
  }
];

export const METRIC_CATEGORIES: MetricCategory[] = [
  'Economic',
  'Social',
  'Health',
  'Environment',
  'Governance',
  'Equality'
]; 