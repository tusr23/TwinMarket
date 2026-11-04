/**
 * TwinMarket AI - Customer Demand Prediction Engine
 * Simulates microeconomic customer purchase funnels, segment elasticity,
 * seasonality coefficients, and marketing response curves.
 */

/**
 * Customer Segments configuration with distinct sensitivity weights
 */
export const CUSTOMER_SEGMENTS = [
  {
    id: 'price-sensitive',
    name: 'Price-Sensitive Bargain Hunters',
    sharePct: 38,
    priceSensitivity: 0.92, // High sensitivity to price hikes
    qualitySensitivity: 0.25,
    brandLoyalty: 0.15,
    description: 'Prioritize low prices and active discounts. Quickly switch to competitors for 5%+ price drops.'
  },
  {
    id: 'value-seekers',
    name: 'Rational Value Seekers',
    sharePct: 32,
    priceSensitivity: 0.55,
    qualitySensitivity: 0.65,
    brandLoyalty: 0.40,
    description: 'Look for the sweet spot between specs, durability, and fair market price. Evaluate reviews and ratings.'
  },
  {
    id: 'brand-loyalists',
    name: 'Premium Brand Loyalists',
    sharePct: 18,
    priceSensitivity: 0.22,
    qualitySensitivity: 0.90,
    brandLoyalty: 0.85,
    description: 'Willing to pay a premium for recognized flagships, top-tier build quality, and exclusive customer service.'
  },
  {
    id: 'impulse-convenience',
    name: 'Impulse & Convenience Buyers',
    sharePct: 12,
    priceSensitivity: 0.35,
    qualitySensitivity: 0.45,
    brandLoyalty: 0.30,
    description: 'Driven by immediate availability, fast shipping, impulse purchases, and marketing visibility.'
  }
];

/**
 * Monthly Seasonality Indexes (1.0 = average month)
 */
export const SEASONALITY_FACTORS = {
  Jan: 0.92, // Post-holiday slump
  Feb: 0.94,
  Mar: 1.02, // Fiscal year end / tech updates
  Apr: 0.98,
  May: 1.05, // Summer sales
  Jun: 1.04,
  Jul: 0.96, // Monsoon / off-peak
  Aug: 1.08, // Independence day sales
  Sep: 1.15, // New smartphone launch season
  Oct: 1.38, // Diwali & festive peak
  Nov: 1.30, // Black Friday / wedding season
  Dec: 1.22  // Year-end holiday
};

/**
 * Predicts total and segment demand for a catalog or product
 */
export function predictCatalogDemand({
  products = [],
  competitors = [],
  marketingSpend = 45000,
  customerSat = 85,
  brandRep = 82,
  activeScenario = null,
  strategy = 'balanced',
  currentMonth = 'Oct'
}) {
  // Competitor average price index
  const avgCompetitorFactor = competitors.length > 0
    ? competitors.reduce((acc, c) => acc + c.priceFactor, 0) / competitors.length
    : 1.0;

  // Marketing response curve using logarithmic diminishing returns
  // Baseline = 30k => multiplier 1.0
  const marketingMultiplier = Math.max(0.7, 1 + 0.22 * Math.log10(Math.max(5000, marketingSpend) / 30000));

  // Customer satisfaction boost (80 = baseline)
  const satMultiplier = 1 + (customerSat - 80) * 0.006;

  // Brand reputation boost (80 = baseline)
  const brandMultiplier = 1 + (brandRep - 80) * 0.005;

  // Current Seasonality
  const seasonFactor = SEASONALITY_FACTORS[currentMonth] || 1.05;

  // Scenario Multiplier
  const scenarioMultiplier = activeScenario ? (activeScenario.demandMultiplier || 1.0) : 1.0;

  // Strategy Multiplier
  const strategyMultiplier = strategy === 'aggressive' ? 1.22 : (strategy === 'max-profit' ? 0.91 : 1.0);

  // Evaluate each product
  const productDemands = products.map((prod) => {
    const baseDemand = prod.baseMonthlyDemand || 50;
    const qualityBoost = 1 + ((prod.qualityScore || 85) - 80) * 0.005;

    // Price competitiveness factor
    const relativePriceEffect = 1 - 0.9 * ((prod.sellingPrice / (prod.costPrice * 1.25)) - avgCompetitorFactor);

    const calculatedUnits = Math.round(
      baseDemand *
      Math.max(0.2, relativePriceEffect) *
      qualityBoost *
      marketingMultiplier *
      satMultiplier *
      brandMultiplier *
      seasonFactor *
      scenarioMultiplier *
      strategyMultiplier
    );

    return {
      id: prod.id,
      name: prod.name,
      category: prod.category,
      sellingPrice: prod.sellingPrice,
      stock: prod.stock,
      predictedUnits: Math.max(1, calculatedUnits),
      fulfillmentRate: prod.stock ? Math.min(100, Math.round((prod.stock / calculatedUnits) * 100)) : 100,
      stockShortage: prod.stock ? Math.max(0, calculatedUnits - prod.stock) : 0
    };
  });

  const totalDemandUnits = productDemands.reduce((sum, p) => sum + p.predictedUnits, 0);
  const totalPotentialRevenue = productDemands.reduce((sum, p) => sum + (p.predictedUnits * p.sellingPrice), 0);
  const totalStockCapacity = productDemands.reduce((sum, p) => sum + (p.stock || 0), 0);

  // Segment breakdown
  const segmentsBreakdown = CUSTOMER_SEGMENTS.map((seg) => {
    // Modify segment demand based on sensitivity
    const segmentVolume = Math.round(totalDemandUnits * (seg.sharePct / 100));
    return {
      id: seg.id,
      name: seg.name,
      sharePct: seg.sharePct,
      volumeUnits: segmentVolume,
      priceSensitivity: seg.priceSensitivity,
      description: seg.description
    };
  });

  // 6-Month forward demand projection trend
  const monthNames = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const forwardProjection = monthNames.map((m, index) => {
    const mSeason = SEASONALITY_FACTORS[m] || 1.0;
    const naturalGrowth = 1 + (index * 0.025); // 2.5% monthly compound growth
    const projectedUnits = Math.round(totalDemandUnits * (mSeason / seasonFactor) * naturalGrowth);
    return {
      month: m,
      projectedUnits,
      projectedRevenue: Math.round(totalPotentialRevenue * (mSeason / seasonFactor) * naturalGrowth),
      trend: mSeason >= 1.0 ? 'Peak' : 'Moderate'
    };
  });

  return {
    totalDemandUnits,
    totalPotentialRevenue,
    totalStockCapacity,
    productDemands,
    segmentsBreakdown,
    forwardProjection,
    marketingMultiplier: Number(marketingMultiplier.toFixed(2)),
    seasonFactor: Number(seasonFactor.toFixed(2)),
    overallPriceSensitivityRating: avgCompetitorFactor > 1.05 ? 'High Risk' : (avgCompetitorFactor < 0.95 ? 'Low Resistance' : 'Normal Elasticity')
  };
}

