-- Market Intelligence Platform Database Schema
-- Version 1.0

-- Companies/Competitors Table
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    industry VARCHAR(100),
    company_size VARCHAR(50),
    headquarters VARCHAR(255),
    founded_year INTEGER,
    is_competitor BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Competitive Intelligence Data
CREATE TABLE IF NOT EXISTS competitive_intelligence (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    data_source VARCHAR(100),
    metric_type VARCHAR(100),
    metric_value TEXT,
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confidence_score DECIMAL(3,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product/Service Offerings
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    pricing_model VARCHAR(50),
    base_price DECIMAL(10,2),
    features JSONB,
    launch_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Market Segments
CREATE TABLE IF NOT EXISTS market_segments (
    id SERIAL PRIMARY KEY,
    segment_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    geography VARCHAR(100),
    customer_type VARCHAR(50),
    tam_value DECIMAL(15,2),
    sam_value DECIMAL(15,2),
    som_value DECIMAL(15,2),
    growth_rate DECIMAL(5,2),
    year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing Data
CREATE TABLE IF NOT EXISTS pricing_data (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    tier_name VARCHAR(100),
    price DECIMAL(10,2),
    billing_cycle VARCHAR(50),
    features JSONB,
    effective_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Market Trends
CREATE TABLE IF NOT EXISTS market_trends (
    id SERIAL PRIMARY KEY,
    trend_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    impact_score DECIMAL(3,2),
    adoption_rate DECIMAL(5,2),
    time_period VARCHAR(50),
    data_points JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial Metrics
CREATE TABLE IF NOT EXISTS financial_metrics (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    metric_name VARCHAR(100),
    metric_value DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'USD',
    period VARCHAR(50),
    year INTEGER,
    quarter INTEGER,
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer Reviews & Sentiment
CREATE TABLE IF NOT EXISTS customer_sentiment (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    source_platform VARCHAR(100),
    rating DECIMAL(3,2),
    review_text TEXT,
    sentiment_score DECIMAL(3,2),
    review_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investment Scenarios
CREATE TABLE IF NOT EXISTS investment_scenarios (
    id SERIAL PRIMARY KEY,
    scenario_name VARCHAR(255) NOT NULL,
    investment_amount DECIMAL(15,2),
    expected_roi DECIMAL(5,2),
    time_horizon_months INTEGER,
    risk_level VARCHAR(50),
    assumptions JSONB,
    results JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);
CREATE INDEX IF NOT EXISTS idx_companies_competitor ON companies(is_competitor);
CREATE INDEX IF NOT EXISTS idx_competitive_intelligence_company ON competitive_intelligence(company_id);
CREATE INDEX IF NOT EXISTS idx_products_company ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_market_segments_year ON market_segments(year);
CREATE INDEX IF NOT EXISTS idx_pricing_data_company ON pricing_data(company_id);
CREATE INDEX IF NOT EXISTS idx_financial_metrics_company ON financial_metrics(company_id);
