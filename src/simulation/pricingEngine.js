/**
 * TwinMarket AI - Pricing Simulation Engine
 * Rigorous microeconomic model based on Price Elasticity of Demand (PED),
 * Cross-Price Elasticity against competitors, and Unit Economics.
 */

/**
 * Calculates the Price Competitiveness Index (0-100)
 * @param {number} userPrice 
 * @param {number} competitorAvgPrice 
 * @returns {object} { score: number, status: string, ratio: number, color: string }
 */
export function calculatePriceCompetitiveness(userPrice, competitorAvgPrice) {
  if (!competitorAvgPrice || competitorAvgPrice <= 0) {
    return { score: 75, status: 'Balanced Market Standard', ratio: 1.0, color: 'text-indigo-400' };
  }

  const ratio = userPrice / competitorAvgPrice;

  if (ratio <= 0.88) {
    return { score: 98, status: 'Aggressive Discount Leader', ratio, color: 'text-emerald-400' };
  } else if (ratio <= 0.96) {
    return { score: 88, status: 'Highly Competitive', ratio, color: 'text-cyanAccent-400' };
  } else if (ratio <= 1.04) {
    return { score: 78, status: 'Balanced Market Parity', ratio, color: 'text-blue-400' };
  } else if (ratio <= 1.14) {
    return { score: 58, status: 'Premium Priced', ratio, color: 'text-amber-400' };
  } else {
    return { score: 32, status: 'Significantly Overpriced', ratio, color: 'text-rose-400' };
  }
}

/**
 * Computes single-product outcome for a specific price
 */
export function evaluateProductPriceOutcome({
  product,
  sellingPrice,
  costPrice,
  competitorAvgPrice,
  categoryElasticity = -1.6,
  marketingBoost = 1.0,
  scenarioDemandMultiplier = 1.0,
  allocatedFixedCost = 4500
}) {
  const currentPrice = product.sellingPrice || sellingPrice;
  const cost = costPrice !== undefined ? costPrice : product.costPrice;
  const baseDemand = product.baseMonthlyDemand || 50;

  // Percentage change in price from baseline
  const pricePctChange = (sellingPrice - currentPrice) / currentPrice;

  // Direct price elasticity effect: %dQ = E * %dP
  // Using exponential curve for realistic compounding: (1 + %dP)^E
  const elasticityEffect = Math.max(0.08, Math.pow(Math.max(0.1, 1 + pricePctChange), categoryElasticity));

  // Cross-price competitor effect:
  // If user price is lower than competitor average, gain extra share
  const compAvg = competitorAvgPrice || currentPrice;
  const priceRatio = sellingPrice / compAvg;
  // If priceRatio < 1 => positive bump; if priceRatio > 1 => demand dampening
  const competitorAttractiveness = Math.max(0.15, 1 - 1.15 * (priceRatio - 1));

  // Combined monthly estimated demand
  const rawDemand = baseDemand * elasticityEffect * competitorAttractiveness * marketingBoost * scenarioDemandMultiplier;
  const estimatedDemand = Math.max(1, Math.round(rawDemand));

  // Actual sales volume is capped by available inventory if in realistic stock mode
  const salesVolume = Math.min(product.stock !== undefined ? product.stock : estimatedDemand, estimatedDemand);
  const stockoutRisk = product.stock !== undefined && estimatedDemand > product.stock;
  const lostSalesDueToStockout = stockoutRisk ? estimatedDemand - product.stock : 0;

  // Financials
  const grossRevenue = sellingPrice * salesVolume;
  const totalCostOfGoodsSold = cost * salesVolume;
  const grossProfit = grossRevenue - totalCostOfGoodsSold;
  const netProfit = grossProfit - allocatedFixedCost;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;
  const grossMargin = grossRevenue > 0 ? (grossProfit / grossRevenue) * 100 : 0;
  const unitContribution = sellingPrice - cost;

  const competitiveness = calculatePriceCompetitiveness(sellingPrice, compAvg);

  return {
    sellingPrice,
    costPrice: cost,
    unitContribution,
    estimatedDemand,
    salesVolume,
    lostSalesDueToStockout,
    stockoutRisk,
    grossRevenue,
    totalCostOfGoodsSold,
    allocatedFixedCost,
    grossProfit,
    netProfit,
    profitMargin: Number(profitMargin.toFixed(1)),
    grossMargin: Number(grossMargin.toFixed(1)),
    competitiveness
  };
}

/**
 * Runs a complete comparative simulation for Before vs After Price change
 */
export function simulatePricingChange({
  product,
  newSellingPrice,
  newCostPrice,
  competitorAvgPrice,
  categoryElasticity = -1.6,
  marketingBoost = 1.0,
  scenarioDemandMultiplier = 1.0,
  allocatedFixedCost = 4500
}) {
  const before = evaluateProductPriceOutcome({
    product,
    sellingPrice: product.sellingPrice,
    costPrice: product.costPrice,
    competitorAvgPrice,
    categoryElasticity,
    marketingBoost,
    scenarioDemandMultiplier,
    allocatedFixedCost
  });

  const after = evaluateProductPriceOutcome({
    product,
    sellingPrice: newSellingPrice,
    costPrice: newCostPrice !== undefined ? newCostPrice : product.costPrice,
    competitorAvgPrice,
    categoryElasticity,
    marketingBoost,
    scenarioDemandMultiplier,
    allocatedFixedCost
  });

  // Calculate delta metrics
  const delta = {
    priceDiff: after.sellingPrice - before.sellingPrice,
    pricePct: ((after.sellingPrice - before.sellingPrice) / before.sellingPrice) * 100,
    demandDiff: after.estimatedDemand - before.estimatedDemand,
    demandPct: before.estimatedDemand > 0 ? ((after.estimatedDemand - before.estimatedDemand) / before.estimatedDemand) * 100 : 0,
    revenueDiff: after.grossRevenue - before.grossRevenue,
    revenuePct: before.grossRevenue > 0 ? ((after.grossRevenue - before.grossRevenue) / before.grossRevenue) * 100 : 0,
    profitDiff: after.netProfit - before.netProfit,
    profitPct: before.netProfit !== 0 ? ((after.netProfit - before.netProfit) / Math.abs(before.netProfit)) * 100 : 0,
    marginDiff: after.profitMargin - before.profitMargin
  };

  // Generate elasticity curve points for charting (-30% to +30% in 10% steps)
  const steps = [-30, -20, -10, -5, 0, 5, 10, 20, 30];
  const elasticityCurve = steps.map((pct) => {
    const testPrice = Math.round(product.sellingPrice * (1 + pct / 100));
    const outcome = evaluateProductPriceOutcome({
      product,
      sellingPrice: testPrice,
      costPrice: product.costPrice,
      competitorAvgPrice,
      categoryElasticity,
      marketingBoost,
      scenarioDemandMultiplier,
      allocatedFixedCost
    });

    return {
      percentChange: `${pct > 0 ? '+' : ''}${pct}%`,
      price: testPrice,
      demand: outcome.estimatedDemand,
      revenue: outcome.grossRevenue,
      profit: outcome.netProfit,
      isCurrent: pct === 0,
      isProposed: Math.abs(testPrice - newSellingPrice) < (product.sellingPrice * 0.03)
    };
  });

  // Recommendation verdict
  let verdict = 'Neutral';
  let reasoning = '';
  if (delta.profitDiff > 0 && delta.demandDiff >= -5) {
    verdict = 'Strongly Recommended';
    reasoning = `Higher profit (+₹${Math.round(delta.profitDiff).toLocaleString('en-IN')}) with minimal demand resistance. You capture optimal pricing power.`;
  } else if (delta.profitDiff > 0 && delta.demandDiff < -5) {
    verdict = 'Cautiously Recommended';
    reasoning = `Profit increases by +₹${Math.round(delta.profitDiff).toLocaleString('en-IN')}, but sales volume contracts by ${Math.round(Math.abs(delta.demandPct))}%. Watch for competitor counter-moves.`;
  } else if (delta.revenueDiff > 0 && delta.profitDiff <= 0) {
    verdict = 'Unfavorable for Margin';
    reasoning = 'Although sales volume and gross revenue expand, compressed profit margins lead to lower net earnings.';
  } else {
    verdict = 'Not Recommended';
    reasoning = `Significant decline in expected profit (-₹${Math.round(Math.abs(delta.profitDiff)).toLocaleString('en-IN')}) and customer willingness to pay.`;
  }

  return {
    before,
    after,
    delta,
    elasticityCurve,
    verdict,
    reasoning
  };
}

