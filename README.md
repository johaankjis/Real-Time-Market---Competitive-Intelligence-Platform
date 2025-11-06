# Real-Time Market & Competitive Intelligence Platform

A comprehensive market intelligence and competitive analysis platform that provides real-time insights, market sizing, forecasting, and competitive tracking capabilities.

## 🚀 Overview

This platform is designed to help businesses make data-driven decisions by aggregating and analyzing market data, competitor information, and financial metrics from multiple sources. It features interactive dashboards, advanced forecasting models, and automated data collection from various market intelligence sources.

## ✨ Features

### Dashboard & Visualization
- **Real-time Metrics Overview**: Track Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM)
- **Competitive Analysis**: Monitor and compare up to 24 competitors with detailed metrics
- **Market Sizing Charts**: Visual representation of market segments and growth trends
- **Trend Analysis**: Track market trends and identify patterns over time
- **Pricing Comparison**: Compare pricing strategies across competitors

### Data Collection & Integration
- **Crunchbase Scraper**: Extracts funding, valuation, and financial metrics
- **G2 Scraper**: Gathers product reviews, ratings, and customer sentiment
- **LinkedIn Scraper**: Collects employee counts, company growth, and hiring trends

### Forecasting & Analytics
- **Linear Forecasting**: Simple growth projections based on historical data
- **Exponential Forecasting**: Compound growth rate calculations
- **Monte Carlo Simulations**: Probabilistic forecasting with confidence intervals
- **Market Entry Simulation**: ROI analysis and market penetration modeling
- **Seasonal Adjustments**: Account for cyclical patterns in forecasts

### API Endpoints
- `/api/forecast` - Generate market forecasts with various models
- `/api/market-sizing` - Calculate and analyze market size
- `/api/ingest` - Import and process external data
- `/api/export` - Export analysis results in multiple formats

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0** - React framework with App Router
- **React 19.2** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library

### Backend & Data Processing
- **Python 3.x** - Data scraping and analytics scripts
- **Next.js API Routes** - Serverless API endpoints

### UI Components
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Performant form validation
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date utility library
- **Sonner** - Toast notifications

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm
- Python 3.8 or higher (for data scripts)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Real-Time-Market---Competitive-Intelligence-Platform.git
   cd Real-Time-Market---Competitive-Intelligence-Platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys and configuration
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── export/              # Data export endpoints
│   │   ├── forecast/            # Forecasting endpoints
│   │   ├── ingest/              # Data ingestion endpoints
│   │   └── market-sizing/       # Market analysis endpoints
│   ├── forecast/                # Forecast page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Dashboard home page
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui base components
│   ├── competitive-analysis.tsx
│   ├── dashboard-header.tsx
│   ├── export-dialog.tsx
│   ├── market-sizing-chart.tsx
│   ├── metrics-overview.tsx
│   ├── pricing-comparison.tsx
│   ├── theme-provider.tsx
│   └── trend-analysis.tsx
│
├── lib/                         # Utility libraries
│   ├── forecasting.ts           # Forecasting functions
│   └── mock-data.ts             # Mock data for development
│
├── scripts/                     # Data collection scripts
│   ├── 01-create-schema.sql     # Database schema
│   ├── 02-seed-data.sql         # Sample data
│   ├── forecasting-model.py     # Python forecasting model
│   ├── market-sizing-model.py   # Market analysis model
│   ├── scraper-crunchbase.py    # Crunchbase data scraper
│   ├── scraper-g2.py            # G2 review scraper
│   └── scraper-linkedin.py      # LinkedIn data scraper
│
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
├── styles/                      # Additional styles
└── components.json              # shadcn/ui configuration
```

## 🔧 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Python Scripts

Run individual data collection scripts:

```bash
# Crunchbase data scraper
python scripts/scraper-crunchbase.py

# G2 reviews scraper
python scripts/scraper-g2.py

# LinkedIn company data
python scripts/scraper-linkedin.py

# Forecasting model
python scripts/forecasting-model.py

# Market sizing analysis
python scripts/market-sizing-model.py
```

## 📊 Key Components

### Dashboard Components

#### MetricsOverview
Displays key performance indicators including TAM, SAM, SOM, and competitor tracking metrics.

#### CompetitiveAnalysis
Provides detailed competitor comparison with funding, employees, market share, and growth metrics.

#### MarketSizingChart
Visualizes market segmentation and total addressable market breakdown.

#### TrendAnalysis
Shows market trends over time with interactive charts.

#### PricingComparison
Compares pricing tiers and strategies across competitors.

### Forecasting Models

The platform includes multiple forecasting approaches:

- **Linear Forecast**: Simple linear growth projection
- **Compound Growth**: CAGR-based forecasting
- **Seasonal Forecast**: Adjusts for cyclical patterns
- **Monte Carlo Simulation**: Probabilistic forecasting with risk analysis
- **Market Entry Simulation**: ROI and customer acquisition modeling

## 🔌 API Usage

### Forecast Endpoint

```typescript
POST /api/forecast

// Linear forecast
{
  "type": "linear",
  "params": {
    "currentValue": 77000000000,
    "growthRate": 0.155,
    "periods": 5
  }
}

// Market entry simulation
{
  "type": "market-entry",
  "params": {
    "investment": 5000000,
    "targetMarketShare": 0.05,
    "marketSize": 1250000000,
    "timeHorizon": 3,
    "avgRevenuePerCustomer": 50000,
    "cac": 15000
  }
}
```

### Market Sizing Endpoint

```typescript
POST /api/market-sizing

{
  "industry": "SaaS Analytics",
  "geography": "North America",
  "timeframe": "2024-2029"
}
```

## 🎨 Customization

### Theme
The platform supports light/dark mode theming using `next-themes`. Customize colors in `tailwind.config.ts` and global styles in `app/globals.css`.

### Components
All UI components are built with shadcn/ui and can be customized by editing files in the `components/ui/` directory.

## 📈 Data Sources

The platform integrates with multiple data sources:

- **Crunchbase**: Company financials, funding rounds, valuations
- **G2**: Product reviews, ratings, market positioning
- **LinkedIn**: Employee data, company growth metrics
- **Custom APIs**: Configurable data ingestion endpoints

## 🔒 Security

- Environment variables for sensitive API keys
- Type-safe API routes with request validation
- Secure data handling practices
- No credentials committed to repository

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint for linting
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is private and proprietary. All rights reserved.

## 🙋 Support

For questions, issues, or feature requests, please open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Real-time data streaming
- [ ] Advanced AI-powered insights
- [ ] Multi-user collaboration features
- [ ] Enhanced data visualization options
- [ ] Mobile app development
- [ ] Integration with additional data sources
- [ ] Automated alert system for market changes
- [ ] Custom dashboard builder

## 📸 Screenshots

> Screenshots and demo coming soon

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
