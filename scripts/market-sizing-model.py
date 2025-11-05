"""
Market Sizing Model - TAM/SAM/SOM Calculator
Calculates Total Addressable Market, Serviceable Addressable Market, and Serviceable Obtainable Market
"""

import json
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class MarketSegment:
    name: str
    industry: str
    geography: str
    customer_type: str
    total_companies: int
    avg_revenue_per_customer: float
    market_growth_rate: float

class MarketSizingModel:
    def __init__(self):
        self.segments: List[MarketSegment] = []
        
    def calculate_tam(self, segment: MarketSegment) -> float:
        """
        Calculate Total Addressable Market (TAM)
        TAM = Total number of potential customers × Average revenue per customer
        
        Args:
            segment: Market segment data
            
        Returns:
            TAM value in dollars
        """
        tam = segment.total_companies * segment.avg_revenue_per_customer
        print(f"[v0] TAM for {segment.name}: ${tam:,.0f}")
        return tam
    
    def calculate_sam(self, tam: float, market_penetration_rate: float = 0.30) -> float:
        """
        Calculate Serviceable Addressable Market (SAM)
        SAM = TAM × Market penetration rate (realistic market share we can capture)
        
        Args:
            tam: Total Addressable Market
            market_penetration_rate: Percentage of TAM we can realistically serve (default 30%)
            
        Returns:
            SAM value in dollars
        """
        sam = tam * market_penetration_rate
        print(f"[v0] SAM (at {market_penetration_rate*100}% penetration): ${sam:,.0f}")
        return sam
    
    def calculate_som(
        self, 
        sam: float, 
        market_share_target: float = 0.05,
        competitive_intensity: float = 0.8
    ) -> float:
        """
        Calculate Serviceable Obtainable Market (SOM)
        SOM = SAM × Market share target × Competitive adjustment
        
        Args:
            sam: Serviceable Addressable Market
            market_share_target: Target market share (default 5%)
            competitive_intensity: Adjustment for competition (0-1, default 0.8)
            
        Returns:
            SOM value in dollars
        """
        som = sam * market_share_target * competitive_intensity
        print(f"[v0] SOM (at {market_share_target*100}% share): ${som:,.0f}")
        return som
    
    def calculate_full_market_sizing(
        self,
        segment: MarketSegment,
        penetration_rate: float = 0.30,
        market_share: float = 0.05,
        competitive_factor: float = 0.8
    ) -> Dict:
        """
        Calculate complete market sizing (TAM/SAM/SOM) for a segment
        
        Returns:
            Dictionary with all market sizing metrics
        """
        tam = self.calculate_tam(segment)
        sam = self.calculate_sam(tam, penetration_rate)
        som = self.calculate_som(sam, market_share, competitive_factor)
        
        # Calculate projected growth
        tam_next_year = tam * (1 + segment.market_growth_rate)
        sam_next_year = sam * (1 + segment.market_growth_rate)
        som_next_year = som * (1 + segment.market_growth_rate)
        
        return {
            "segment_name": segment.name,
            "industry": segment.industry,
            "geography": segment.geography,
            "customer_type": segment.customer_type,
            "current_year": {
                "tam": tam,
                "sam": sam,
                "som": som,
                "tam_percentage": 100,
                "sam_percentage": (sam / tam) * 100,
                "som_percentage": (som / tam) * 100
            },
            "next_year_projection": {
                "tam": tam_next_year,
                "sam": sam_next_year,
                "som": som_next_year,
                "growth_rate": segment.market_growth_rate * 100
            },
            "assumptions": {
                "penetration_rate": penetration_rate * 100,
                "market_share_target": market_share * 100,
                "competitive_intensity": competitive_factor,
                "avg_revenue_per_customer": segment.avg_revenue_per_customer
            }
        }
    
    def calculate_multi_segment_sizing(self, segments: List[MarketSegment]) -> Dict:
        """
        Calculate market sizing across multiple segments
        
        Returns:
            Aggregated market sizing data
        """
        results = []
        total_tam = 0
        total_sam = 0
        total_som = 0
        
        for segment in segments:
            sizing = self.calculate_full_market_sizing(segment)
            results.append(sizing)
            total_tam += sizing["current_year"]["tam"]
            total_sam += sizing["current_year"]["sam"]
            total_som += sizing["current_year"]["som"]
        
        return {
            "segments": results,
            "totals": {
                "tam": total_tam,
                "sam": total_sam,
                "som": total_som,
                "sam_percentage": (total_sam / total_tam) * 100,
                "som_percentage": (total_som / total_tam) * 100
            },
            "segment_count": len(segments)
        }

# Example usage
if __name__ == "__main__":
    model = MarketSizingModel()
    
    # Define market segments
    segments = [
        MarketSegment(
            name="Enterprise BI - North America",
            industry="Business Intelligence",
            geography="North America",
            customer_type="Enterprise",
            total_companies=50000,
            avg_revenue_per_customer=50000,
            market_growth_rate=0.155
        ),
        MarketSegment(
            name="SMB Analytics - North America",
            industry="Business Intelligence",
            geography="North America",
            customer_type="SMB",
            total_companies=200000,
            avg_revenue_per_customer=12000,
            market_growth_rate=0.182
        ),
        MarketSegment(
            name="Enterprise BI - Europe",
            industry="Business Intelligence",
            geography="Europe",
            customer_type="Enterprise",
            total_companies=35000,
            avg_revenue_per_customer=45000,
            market_growth_rate=0.148
        )
    ]
    
    # Calculate market sizing
    results = model.calculate_multi_segment_sizing(segments)
    
    # Save results
    with open("market_sizing_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print("\n=== Market Sizing Summary ===")
    print(f"Total TAM: ${results['totals']['tam']:,.0f}")
    print(f"Total SAM: ${results['totals']['sam']:,.0f}")
    print(f"Total SOM: ${results['totals']['som']:,.0f}")
