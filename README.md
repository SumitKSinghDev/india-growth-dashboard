# India Growth Dashboard

A comprehensive data visualization dashboard showcasing 30+ key metrics across major Indian cities, providing insights into economic, social, health, environmental, governance, and equality indicators.

## 🌟 Features

### 📊 30+ Core Metrics Across 6 Categories

#### Economic Indicators (8 metrics)
- **GDP** - Gross Domestic Product (INR Crores)
- **GNI** - Gross National Income (INR Crores)
- **GDP per Capita** - GDP divided by population (INR)
- **Unemployment Rate** - Percentage of unemployed workforce (%)
- **Inflation Rate** - Annual rate of inflation (%)
- **Foreign Direct Investment** - FDI inflows (INR Crores)
- **Export/Import Ratios** - Ratio of exports to imports
- **Public Debt as % of GDP** - Public debt as percentage of GDP

#### Social Development (8 metrics)
- **Human Development Index (HDI)** - Composite index of life expectancy, education, and per capita income (0-1)
- **Life Expectancy** - Average life expectancy at birth (Years)
- **Infant Mortality Rate** - Deaths of infants under one year old (per 1000 births)
- **Literacy Rate** - Percentage of literate population (%)
- **Education Index** - Composite index of education indicators (0-1)
- **Gender Inequality Index** - Measure of gender disparities (0-1)
- **Population Growth Rate** - Annual population growth rate (%)
- **Urban Population %** - Percentage of urban population (%)

#### Health & Well-being (5 metrics)
- **Healthcare Expenditure per Capita** - Per capita healthcare expenditure (INR per capita)
- **Physicians per 1000 people** - Number of physicians per 1000 population
- **Hospital Beds per 1000 people** - Number of hospital beds per 1000 population
- **Access to Clean Water %** - Percentage with access to clean drinking water (%)
- **Vaccination Coverage %** - Percentage of population with complete vaccination (%)

#### Environment & Sustainability (5 metrics)
- **CO2 Emissions per Capita** - Carbon dioxide emissions per capita (tons per capita)
- **Renewable Energy %** - Percentage of renewable energy in total energy mix (%)
- **Forest Area %** - Percentage of land area covered by forests (%)
- **Air Quality Index** - Air quality index
- **Environmental Performance Index** - Environmental performance index (0-100)

#### Governance & Infrastructure (5 metrics)
- **Corruption Perceptions Index** - Perceived levels of corruption (0-100)
- **Internet Penetration %** - Percentage of population with internet access (%)
- **Mobile Phone Subscriptions** - Number of mobile phone subscriptions per 100 people
- **Infrastructure Quality Index** - Quality of infrastructure (1-7)
- **Political Stability Index** - Political stability and absence of violence (-2.5 to 2.5)

#### Economic Equality (3 metrics)
- **Gini Coefficient (Income Inequality)** - Income inequality measure (0-1)
- **Poverty Rate** - Percentage of population below poverty line (%)
- **Social Protection Coverage** - Percentage of population covered by social protection (%)

### 🏙️ Cities Covered
- Mumbai, Maharashtra
- Delhi, Delhi
- Bangalore, Karnataka
- Hyderabad, Telangana
- Chennai, Tamil Nadu
- Kolkata, West Bengal
- Pune, Maharashtra
- Ahmedabad, Gujarat
- Jaipur, Rajasthan
- Lucknow, Uttar Pradesh

### 📈 Visualization Features
- **Interactive Charts** - Bar charts, line charts, and scatter plots
- **Multi-Metric Comparison** - Compare multiple metrics across cities
- **Category Filtering** - Filter metrics by category
- **Search Functionality** - Search for specific metrics
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Real-time Data Updates** - Mock data generation for demonstration

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/india-growth-dashboard.git
   cd india-growth-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the dashboard.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys to GitHub Pages

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **Charts**: Recharts and ECharts
- **Styling**: Emotion (CSS-in-JS)
- **Routing**: React Router DOM
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages with GitHub Actions

## 📊 Data Sources

The dashboard currently uses mock data for demonstration purposes. In a production environment, data would be sourced from:

- **Government Sources**: Ministry of Statistics, NITI Aayog, RBI
- **International Organizations**: World Bank, UNDP, WHO
- **Research Institutions**: Forest Survey of India, Central Pollution Control Board
- **Regulatory Bodies**: TRAI, Ministry of Health and Family Welfare

## 🚀 Deployment

### GitHub Pages Deployment

1. **Update homepage in package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/india-growth-dashboard"
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### Automated Deployment with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
- Runs tests
- Builds the application
- Deploys to GitHub Pages on push to main branch

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your preferred hosting service:
   - Netlify
   - Vercel
   - AWS S3
   - Firebase Hosting

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Acknowledgments

- Data sources and government organizations
- Open source community for libraries and tools
- Contributors and maintainers

## 📞 Support

For support, email support@indiagrowthdashboard.com or create an issue in the GitHub repository.

---

**Note**: This dashboard currently uses mock data for demonstration purposes. For production use, integrate with real data APIs and ensure data accuracy and timeliness.
