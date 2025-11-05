-- Seed Data for Market Intelligence Platform
-- Version 1.0

-- Insert sample companies
INSERT INTO companies (name, domain, industry, company_size, headquarters, founded_year, is_competitor) VALUES
('TechVision Analytics', 'techvision.com', 'Business Intelligence', '500-1000', 'San Francisco, CA', 2018, true),
('DataStream Pro', 'datastream.io', 'Business Intelligence', '100-500', 'New York, NY', 2019, true),
('InsightHub', 'insighthub.com', 'Business Intelligence', '50-100', 'Austin, TX', 2020, true),
('MarketPulse', 'marketpulse.com', 'Market Research', '200-500', 'Boston, MA', 2017, true),
('CompeteIQ', 'competeiq.com', 'Competitive Intelligence', '100-200', 'Seattle, WA', 2019, true);

-- Insert competitive intelligence data
INSERT INTO competitive_intelligence (company_id, data_source, metric_type, metric_value, confidence_score) VALUES
(1, 'LinkedIn', 'employee_count', '750', 0.95),
(1, 'Crunchbase', 'funding_total', '45000000', 0.90),
(1, 'G2', 'customer_rating', '4.5', 0.98),
(2, 'LinkedIn', 'employee_count', '320', 0.95),
(2, 'Crunchbase', 'funding_total', '28000000', 0.90),
(2, 'G2', 'customer_rating', '4.3', 0.98),
(3, 'LinkedIn', 'employee_count', '85', 0.95),
(3, 'Crunchbase', 'funding_total', '12000000', 0.90),
(3, 'G2', 'customer_rating', '4.6', 0.98),
(4, 'LinkedIn', 'employee_count', '450', 0.95),
(4, 'Crunchbase', 'funding_total', '35000000', 0.90),
(5, 'LinkedIn', 'employee_count', '180', 0.95),
(5, 'Crunchbase', 'funding_total', '18000000', 0.90);

-- Insert products
INSERT INTO products (company_id, product_name, category, description, pricing_model, base_price, features) VALUES
(1, 'TechVision Enterprise', 'Analytics Platform', 'Comprehensive business intelligence solution', 'subscription', 999.00, '{"dashboards": true, "ai_insights": true, "api_access": true}'),
(1, 'TechVision Starter', 'Analytics Platform', 'Entry-level analytics tool', 'subscription', 299.00, '{"dashboards": true, "basic_reports": true}'),
(2, 'DataStream Analytics', 'Data Platform', 'Real-time data analytics', 'subscription', 799.00, '{"real_time": true, "integrations": 50}'),
(3, 'InsightHub Pro', 'Market Intelligence', 'Market research and insights', 'subscription', 599.00, '{"market_data": true, "competitor_tracking": true}'),
(4, 'MarketPulse Research', 'Research Platform', 'Market research tools', 'subscription', 899.00, '{"surveys": true, "analysis": true}'),
(5, 'CompeteIQ Monitor', 'Competitive Intelligence', 'Competitor monitoring', 'subscription', 699.00, '{"web_scraping": true, "alerts": true}');

-- Insert market segments
INSERT INTO market_segments (segment_name, industry, geography, customer_type, tam_value, sam_value, som_value, growth_rate, year) VALUES
('Enterprise BI - North America', 'Business Intelligence', 'North America', 'Enterprise', 25000000000, 8000000000, 400000000, 15.5, 2024),
('SMB Analytics - North America', 'Business Intelligence', 'North America', 'SMB', 12000000000, 4000000000, 200000000, 18.2, 2024),
('Enterprise BI - Europe', 'Business Intelligence', 'Europe', 'Enterprise', 18000000000, 6000000000, 300000000, 14.8, 2024),
('Enterprise BI - Asia Pacific', 'Business Intelligence', 'Asia Pacific', 'Enterprise', 22000000000, 7000000000, 350000000, 22.5, 2024),
('Market Research - Global', 'Market Research', 'Global', 'Enterprise', 35000000000, 10000000000, 500000000, 12.3, 2024);

-- Insert pricing data
INSERT INTO pricing_data (company_id, product_id, tier_name, price, billing_cycle, features, effective_date) VALUES
(1, 1, 'Enterprise', 999.00, 'monthly', '{"users": "unlimited", "support": "24/7", "sla": "99.9%"}', '2024-01-01'),
(1, 1, 'Enterprise Annual', 9990.00, 'annual', '{"users": "unlimited", "support": "24/7", "sla": "99.9%", "discount": "17%"}', '2024-01-01'),
(1, 2, 'Starter', 299.00, 'monthly', '{"users": 10, "support": "email", "dashboards": 5}', '2024-01-01'),
(2, 3, 'Professional', 799.00, 'monthly', '{"users": 50, "integrations": 50, "support": "priority"}', '2024-01-01'),
(3, 4, 'Pro', 599.00, 'monthly', '{"users": 25, "reports": "unlimited", "api": true}', '2024-01-01'),
(4, 5, 'Research Pro', 899.00, 'monthly', '{"surveys": 100, "responses": 10000, "analysis": true}', '2024-01-01'),
(5, 6, 'Monitor', 699.00, 'monthly', '{"competitors": 20, "alerts": "unlimited", "reports": true}', '2024-01-01');

-- Insert market trends
INSERT INTO market_trends (trend_name, category, description, impact_score, adoption_rate, time_period, data_points) VALUES
('AI-Powered Analytics', 'Technology', 'Integration of AI and ML in business intelligence', 0.95, 67.5, '2024-Q1', '{"q1": 62, "q2": 67.5, "q3": 73, "q4": 78}'),
('Real-Time Data Processing', 'Technology', 'Shift towards real-time analytics', 0.88, 54.2, '2024-Q1', '{"q1": 48, "q2": 54.2, "q3": 60, "q4": 65}'),
('Self-Service BI', 'Business Model', 'Democratization of data analytics', 0.82, 71.3, '2024-Q1', '{"q1": 68, "q2": 71.3, "q3": 74, "q4": 77}'),
('Cloud-First Architecture', 'Technology', 'Migration to cloud-based solutions', 0.91, 82.5, '2024-Q1', '{"q1": 78, "q2": 82.5, "q3": 86, "q4": 89}'),
('Embedded Analytics', 'Product Strategy', 'Integration of analytics into applications', 0.79, 45.8, '2024-Q1', '{"q1": 40, "q2": 45.8, "q3": 51, "q4": 56}');

-- Insert financial metrics
INSERT INTO financial_metrics (company_id, metric_name, metric_value, period, year, quarter, source) VALUES
(1, 'Annual Revenue', 45000000, 'annual', 2023, NULL, 'Crunchbase'),
(1, 'Quarterly Revenue', 12500000, 'quarterly', 2024, 1, 'Estimated'),
(2, 'Annual Revenue', 28000000, 'annual', 2023, NULL, 'Crunchbase'),
(2, 'Quarterly Revenue', 8000000, 'quarterly', 2024, 1, 'Estimated'),
(3, 'Annual Revenue', 8500000, 'annual', 2023, NULL, 'Crunchbase'),
(4, 'Annual Revenue', 32000000, 'annual', 2023, NULL, 'Crunchbase'),
(5, 'Annual Revenue', 15000000, 'annual', 2023, NULL, 'Crunchbase');

-- Insert customer sentiment
INSERT INTO customer_sentiment (company_id, product_id, source_platform, rating, review_text, sentiment_score, review_date) VALUES
(1, 1, 'G2', 4.5, 'Excellent analytics platform with great visualizations', 0.85, '2024-01-15'),
(1, 1, 'G2', 4.0, 'Good product but pricing is high', 0.65, '2024-02-01'),
(2, 3, 'G2', 4.3, 'Real-time features are impressive', 0.80, '2024-01-20'),
(3, 4, 'G2', 4.6, 'Best market intelligence tool we have used', 0.90, '2024-02-10'),
(4, 5, 'G2', 4.2, 'Solid research platform with good support', 0.75, '2024-01-25'),
(5, 6, 'G2', 4.4, 'Great for competitor monitoring', 0.82, '2024-02-05');

-- Insert investment scenarios
INSERT INTO investment_scenarios (scenario_name, investment_amount, expected_roi, time_horizon_months, risk_level, assumptions, results) VALUES
('Market Expansion - Enterprise', 5000000, 35.5, 24, 'Medium', '{"market_growth": 15, "conversion_rate": 3.5, "churn": 5}', '{"projected_revenue": 6775000, "customers": 450}'),
('Product Development - AI Features', 3000000, 42.0, 18, 'Medium-High', '{"adoption_rate": 60, "price_increase": 15, "retention_boost": 10}', '{"projected_revenue": 4260000, "new_customers": 200}'),
('Geographic Expansion - APAC', 4000000, 28.5, 30, 'High', '{"market_penetration": 2, "local_competition": "high", "regulatory": "complex"}', '{"projected_revenue": 5140000, "customers": 320}');
