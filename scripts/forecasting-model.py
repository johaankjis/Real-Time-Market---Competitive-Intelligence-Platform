"""
Market Forecasting & Simulation Model
Implements various forecasting methods and investment simulations
"""

import json
from typing import Dict, List, Tuple
from dataclasses import dataclass
import math

@dataclass
class ForecastParameters:
    base_value: float
    growth_rate: float
    seasonality_factor: float = 1.0
    volatility: float = 0.05

class MarketForecastingModel:
    def __init__(self):
        self.historical_data = []
        
    def linear_forecast(
        self, 
        current_value: float, 
        growth_rate: float, 
        periods: int
    ) -> List[float]:
        """
        Simple linear growth forecast
        
        Args:
            current_value: Starting value
            growth_rate: Annual growth rate (e.g., 0.15 for 15%)
            periods: Number of periods to forecast
            
        Returns:
            List of forecasted values
        """
        forecasts = [current_value]
        for i in range(1, periods + 1):
            forecasts.append(current_value * (1 + growth_rate) ** i)
        
        print(f"[v0] Linear forecast: {len(forecasts)} periods")
        return forecasts
    
    def compound_growth_forecast(
        self,
        current_value: float,
        cagr: float,
        periods: int
    ) -> List[float]:
        """
        Compound Annual Growth Rate (CAGR) forecast
        
        Args:
            current_value: Starting value
            cagr: Compound annual growth rate
            periods: Number of periods
            
        Returns:
            List of forecasted values
        """
        forecasts = [current_value]
        for i in range(1, periods + 1):
            forecasts.append(current_value * ((1 + cagr) ** i))
        
        return forecasts
    
    def seasonal_forecast(
        self,
        params: ForecastParameters,
        periods: int,
        seasonal_pattern: List[float] = None
    ) -> List[Dict]:
        """
        Forecast with seasonal adjustments
        
        Args:
            params: Forecast parameters
            periods: Number of periods
            seasonal_pattern: Optional seasonal multipliers (e.g., [1.2, 1.0, 0.8, 1.0] for quarters)
            
        Returns:
            List of forecast dictionaries with seasonal adjustments
        """
        if seasonal_pattern is None:
            seasonal_pattern = [1.0, 1.1, 0.9, 1.0]  # Default quarterly pattern
        
        forecasts = []
        current = params.base_value
        
        for i in range(periods):
            season_idx = i % len(seasonal_pattern)
            seasonal_multiplier = seasonal_pattern[season_idx]
            
            # Apply growth
            current = current * (1 + params.growth_rate)
            
            # Apply seasonality
            seasonal_value = current * seasonal_multiplier
            
            forecasts.append({
                "period": i + 1,
                "base_forecast": current,
                "seasonal_forecast": seasonal_value,
                "seasonal_factor": seasonal_multiplier
            })
        
        return forecasts
    
    def monte_carlo_simulation(
        self,
        base_value: float,
        expected_growth: float,
        volatility: float,
        periods: int,
        simulations: int = 1000
    ) -> Dict:
        """
        Monte Carlo simulation for probabilistic forecasting
        
        Args:
            base_value: Starting value
            expected_growth: Expected growth rate
            volatility: Standard deviation of returns
            periods: Number of periods
            simulations: Number of simulation runs
            
        Returns:
            Dictionary with percentile forecasts
        """
        import random
        
        all_outcomes = []
        
        for _ in range(simulations):
            value = base_value
            for _ in range(periods):
                # Random growth with normal distribution
                random_growth = random.gauss(expected_growth, volatility)
                value = value * (1 + random_growth)
            all_outcomes.append(value)
        
        all_outcomes.sort()
        
        return {
            "base_value": base_value,
            "periods": periods,
            "simulations": simulations,
            "percentiles": {
                "p10": all_outcomes[int(simulations * 0.1)],
                "p25": all_outcomes[int(simulations * 0.25)],
                "p50": all_outcomes[int(simulations * 0.5)],
                "p75": all_outcomes[int(simulations * 0.75)],
                "p90": all_outcomes[int(simulations * 0.9)],
            },
            "mean": sum(all_outcomes) / len(all_outcomes),
            "min": min(all_outcomes),
            "max": max(all_outcomes)
        }

class InvestmentSimulator:
    def __init__(self):
        self.scenarios = []
    
    def calculate_roi(
        self,
        investment: float,
        expected_return: float,
        time_horizon_years: int
    ) -> Dict:
        """
        Calculate Return on Investment
        
        Args:
            investment: Initial investment amount
            expected_return: Expected annual return rate
            time_horizon_years: Investment period in years
            
        Returns:
            ROI analysis dictionary
        """
        final_value = investment * ((1 + expected_return) ** time_horizon_years)
        total_return = final_value - investment
        roi_percentage = (total_return / investment) * 100
        
        return {
            "initial_investment": investment,
            "time_horizon_years": time_horizon_years,
            "expected_return_rate": expected_return * 100,
            "final_value": final_value,
            "total_return": total_return,
            "roi_percentage": roi_percentage,
            "annualized_return": ((final_value / investment) ** (1 / time_horizon_years) - 1) * 100
        }
    
    def simulate_market_entry(
        self,
        investment: float,
        market_size: float,
        target_market_share: float,
        time_to_achieve_years: int,
        avg_revenue_per_customer: float,
        customer_acquisition_cost: float,
        churn_rate: float = 0.05
    ) -> Dict:
        """
        Simulate market entry scenario
        
        Args:
            investment: Total investment amount
            market_size: Total addressable market
            target_market_share: Target market share (e.g., 0.05 for 5%)
            time_to_achieve_years: Years to reach target
            avg_revenue_per_customer: Average revenue per customer
            customer_acquisition_cost: Cost to acquire one customer
            churn_rate: Annual customer churn rate
            
        Returns:
            Simulation results
        """
        target_revenue = market_size * target_market_share
        target_customers = target_revenue / avg_revenue_per_customer
        
        # Calculate customer acquisition trajectory
        yearly_results = []
        cumulative_customers = 0
        cumulative_revenue = 0
        cumulative_cost = investment
        
        for year in range(1, time_to_achieve_years + 1):
            # Linear customer acquisition
            new_customers = target_customers / time_to_achieve_years
            
            # Account for churn
            lost_customers = cumulative_customers * churn_rate
            cumulative_customers = cumulative_customers + new_customers - lost_customers
            
            # Calculate financials
            year_revenue = cumulative_customers * avg_revenue_per_customer
            year_acquisition_cost = new_customers * customer_acquisition_cost
            cumulative_cost += year_acquisition_cost
            cumulative_revenue += year_revenue
            
            yearly_results.append({
                "year": year,
                "customers": int(cumulative_customers),
                "new_customers": int(new_customers),
                "revenue": year_revenue,
                "cumulative_revenue": cumulative_revenue,
                "acquisition_cost": year_acquisition_cost,
                "cumulative_cost": cumulative_cost,
                "profit": cumulative_revenue - cumulative_cost
            })
        
        final_year = yearly_results[-1]
        
        return {
            "scenario": "Market Entry Simulation",
            "investment": investment,
            "target_market_share": target_market_share * 100,
            "time_horizon": time_to_achieve_years,
            "final_customers": final_year["customers"],
            "final_revenue": final_year["revenue"],
            "cumulative_revenue": final_year["cumulative_revenue"],
            "cumulative_cost": final_year["cumulative_cost"],
            "net_profit": final_year["profit"],
            "roi": ((final_year["profit"] / investment) * 100) if investment > 0 else 0,
            "yearly_breakdown": yearly_results
        }
    
    def compare_scenarios(
        self,
        scenarios: List[Dict]
    ) -> Dict:
        """
        Compare multiple investment scenarios
        
        Args:
            scenarios: List of scenario dictionaries
            
        Returns:
            Comparison analysis
        """
        comparison = {
            "scenarios": scenarios,
            "best_roi": max(scenarios, key=lambda x: x.get("roi", 0)),
            "lowest_risk": min(scenarios, key=lambda x: x.get("risk_score", 100)),
            "fastest_payback": min(scenarios, key=lambda x: x.get("payback_period", 999))
        }
        
        return comparison

# Example usage
if __name__ == "__main__":
    # Forecasting example
    forecast_model = MarketForecastingModel()
    
    tam_forecast = forecast_model.linear_forecast(
        current_value=77000000000,
        growth_rate=0.155,
        periods=5
    )
    
    print("\n=== TAM Forecast (5 years) ===")
    for i, value in enumerate(tam_forecast):
        print(f"Year {i}: ${value/1000000000:.2f}B")
    
    # Monte Carlo simulation
    mc_results = forecast_model.monte_carlo_simulation(
        base_value=1250000000,
        expected_growth=0.22,
        volatility=0.15,
        periods=3,
        simulations=1000
    )
    
    print("\n=== Monte Carlo Simulation (SOM, 3 years) ===")
    print(f"P50 (Median): ${mc_results['percentiles']['p50']/1000000:.1f}M")
    print(f"P90 (Optimistic): ${mc_results['percentiles']['p90']/1000000:.1f}M")
    print(f"P10 (Conservative): ${mc_results['percentiles']['p10']/1000000:.1f}M")
    
    # Investment simulation
    simulator = InvestmentSimulator()
    
    market_entry = simulator.simulate_market_entry(
        investment=5000000,
        market_size=1250000000,
        target_market_share=0.05,
        time_to_achieve_years=3,
        avg_revenue_per_customer=50000,
        customer_acquisition_cost=15000,
        churn_rate=0.05
    )
    
    print("\n=== Market Entry Simulation ===")
    print(f"Investment: ${market_entry['investment']:,.0f}")
    print(f"Final Customers: {market_entry['final_customers']:,}")
    print(f"Net Profit: ${market_entry['net_profit']:,.0f}")
    print(f"ROI: {market_entry['roi']:.1f}%")
    
    # Save results
    with open("forecast_results.json", "w") as f:
        json.dump({
            "tam_forecast": tam_forecast,
            "monte_carlo": mc_results,
            "market_entry": market_entry
        }, f, indent=2)
