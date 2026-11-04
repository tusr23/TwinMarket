/**
 * TwinMarket AI - Business Risk & Enterprise Health Engine
 * Evaluates multi-dimensional operational risks, generates 5x5 heatmaps,
 * and calculates the composite Business Health Score (0-100).
 */

/**
 * Calculates risk scores across 6 enterprise vectors
 */
export function evaluateBusinessRisks({
  financials,
  inventory,
  competitors = [],
  userMarketShare = 15,
  activeScenario = null
}) {
  const risks = [];

  // 1. FINANCIAL RISK
  let finScore = 20;
  let finLikelihood = 2;
  let finImpact = 3;
  let finDesc = 'Cash flow is healthy with comfortable operating runway.';
  let finAction = 'Maintain current capital deployment and monitor receivables.';

  if (financials.netProfit < 0) {
    finScore = financials.runwayMonths < 3 ? 92 : 72;
    finLikelihood = financials.runwayMonths < 3 ? 5 : 4;
    finImpact = 5;
    finDesc = `Operating at a net loss with estimated cash runway of ${financials.runwayMonths} months.`;
    finAction = 'Trim non-critical fixed expenses, review marketing efficiency, and optimize product margins.';
  } else if (financials.netProfitMargin < 8) {
    finScore = 48;
    finLikelihood = 3;
    finImpact = 3;
    finDesc = 'Modest net profit margin (<8%). Vulnerable to unexpected wholesale price shocks.';
    finAction = 'Raise prices on low-elasticity accessory items to bolster gross margin cushion.';
  }

  risks.push({
    id: 'risk-financial',
    category: 'Financial Risk',
    score: finScore,
    severity: finScore >= 75 ? 'Critical' : (finScore >= 50 ? 'High' : (finScore >= 35 ? 'Moderate' : 'Low')),
    likelihood: finLikelihood, // 1 to 5
    impact: finImpact,         // 1 to 5
    description: finDesc,
    potentialImpact: 'Severe cash depletion, delayed supplier payments, inability to scale inventory.',
    recommendedAction: finAction
  });

  // 2. COMPETITION RISK
  const aggressiveRivals = competitors.filter((c) => c.priceFactor < 0.95);
  let compScore = 30;
  let compLikelihood = 2;
  let compImpact = 3;
  let compDesc = 'Competitors are operating at standard market parity.';
  let compAction = 'Differentiate on service quality and customer post-sale support.';

  if (aggressiveRivals.length >= 2 || (activeScenario && activeScenario.id === 'price-war')) {
    compScore = 85;
    compLikelihood = 5;
    compImpact = 4;
    compDesc = `${aggressiveRivals.length} aggressive rivals are undercutting average market prices. High customer churn threat.`;
    compAction = 'Do not engage in race-to-the-bottom discounting. Offer bundled value warranties and loyalty rewards.';
  } else if (userMarketShare < 10) {
    compScore = 65;
    compLikelihood = 4;
    compImpact = 3;
    compDesc = 'Low market share (<10%) exposes business to margin squeeze by volume leaders.';
    compAction = 'Target high-margin niche customer segments that rivals overlook.';
  }

  risks.push({
    id: 'risk-competition',
    category: 'Competition Risk',
    score: compScore,
    severity: compScore >= 75 ? 'Critical' : (compScore >= 50 ? 'High' : (compScore >= 35 ? 'Moderate' : 'Low')),
    likelihood: compLikelihood,
    impact: compImpact,
    description: compDesc,
    potentialImpact: 'Market share loss, compressed customer lifetime value, defection to discount rivals.',
    recommendedAction: compAction
  });

  // 3. INVENTORY RISK
  let invScore = 25;
  let invLikelihood = 2;
  let invImpact = 2;
  let invDesc = 'Stock levels and reorder cycles are well synchronized.';
  let invAction = 'Continue automated replenishment for items below minimum buffer.';

  if (inventory.outOfStockCount > 0) {
    invScore = 80;
    invLikelihood = 5;
    invImpact = 4;
    invDesc = `${inventory.outOfStockCount} active products are completely out of stock, causing immediate lost revenue.`;
    invAction = 'Immediately trigger bulk restock for top sellers to capture unfulfilled buyer demand.';
  } else if (inventory.lowStockCount >= 2) {
    invScore = 60;
    invLikelihood = 4;
    invImpact = 3;
    invDesc = `${inventory.lowStockCount} products are running critically low on inventory.`;
    invAction = 'Reorder buffer stock before suppliers experience delivery lead time delays.';
  } else if (inventory.turnoverRatio < 2.0 && inventory.totalCostValue > 1500000) {
    invScore = 55;
    invLikelihood = 3;
    invImpact = 3;
    invDesc = 'High volume of tied-up capital in slow-moving inventory (low turnover).';
    invAction = 'Execute a clearance sale for stagnant SKUs to liquidate cash.';
  }

  risks.push({
    id: 'risk-inventory',
    category: 'Inventory Risk',
    score: invScore,
    severity: invScore >= 75 ? 'Critical' : (invScore >= 50 ? 'High' : (invScore >= 35 ? 'Moderate' : 'Low')),
    likelihood: invLikelihood,
    impact: invImpact,
    description: invDesc,
    potentialImpact: 'Lost customer sales due to stockouts, inventory obsolescence, elevated carrying overheads.',
    recommendedAction: invAction
  });

  // 4. PRICING RISK
  let priceScore = 32;
  let priceLikelihood = 2;
  let priceImpact = 3;
  let priceDesc = 'Product pricing aligns smoothly with market willingness-to-pay.';
  let priceAction = 'Conduct quarterly elasticity testing to optimize incremental margins.';

  if (financials.grossMargin < 12) {
    priceScore = 78;
    priceLikelihood = 4;
    priceImpact = 5;
    priceDesc = 'Gross margins are dangerously thin (<12%). Little buffer against supply price volatility.';
    priceAction = 'Adjust retail pricing upward or renegotiate procurement bulk terms with distributors.';
  }

  risks.push({
    id: 'risk-pricing',
    category: 'Pricing Risk',
    score: priceScore,
    severity: priceScore >= 75 ? 'Critical' : (priceScore >= 50 ? 'High' : (priceScore >= 35 ? 'Moderate' : 'Low')),
    likelihood: priceLikelihood,
    impact: priceImpact,
    description: priceDesc,
    potentialImpact: 'Erosion of gross profits, unviable unit economics, vulnerability to distributor cost hikes.',
    recommendedAction: priceAction
  });

  // 5. DEMAND RISK
  let demandScore = 28;
  let demandLikelihood = 2;
  let demandImpact = 3;
  let demandDesc = 'Customer purchasing trends are steady and predictable.';
  let demandAction = 'Engage top customers with personalized loyalty incentives.';

  if (activeScenario && activeScenario.id === 'economic-slowdown') {
    demandScore = 84;
    demandLikelihood = 5;
    demandImpact = 4;
    demandDesc = 'Macroeconomic slowdown contracting customer discretionary budgets.';
    demandAction = 'Promote affordable entry-level models and flexible EMI payment options.';
  }

  risks.push({
    id: 'risk-demand',
    category: 'Demand Risk',
    score: demandScore,
    severity: demandScore >= 75 ? 'Critical' : (demandScore >= 50 ? 'High' : (demandScore >= 35 ? 'Moderate' : 'Low')),
    likelihood: demandLikelihood,
    impact: demandImpact,
    description: demandDesc,
    potentialImpact: 'Declining foot traffic, rising customer acquisition costs, prolonged sales cycles.',
    recommendedAction: demandAction
  });

  // 6. MARKET RISK
  let marketScore = 30;
  let marketLikelihood = 2;
  let marketImpact = 3;
  let marketDesc = 'Market environment is relatively stable with predictable regulations.';
  let marketAction = 'Monitor supplier pipelines and geopolitical component trends.';

  if (activeScenario && (activeScenario.id === 'supply-shortage' || activeScenario.id === 'sudden-cost-hike')) {
    marketScore = 82;
    marketLikelihood = 4;
    marketImpact = 5;
    marketDesc = `Active market shock: ${activeScenario.title}. Procurement costs disrupted.`;
    marketAction = 'Diversify supplier channels and lock in 90-day wholesale price contracts.';
  }

  risks.push({
    id: 'risk-market',
    category: 'Market Risk',
    score: marketScore,
    severity: marketScore >= 75 ? 'Critical' : (marketScore >= 50 ? 'High' : (marketScore >= 35 ? 'Moderate' : 'Low')),
    likelihood: marketLikelihood,
    impact: marketImpact,
    description: marketDesc,
    potentialImpact: 'Supply chain freeze, unexpected regulatory costs, raw material inflation.',
    recommendedAction: marketAction
  });

  // Overall Composite Risk Score (Average of 6 categories)
  const compositeRiskScore = Math.round(risks.reduce((sum, r) => sum + r.score, 0) / risks.length);
  const overallSeverity = compositeRiskScore >= 70 ? 'Critical' : (compositeRiskScore >= 50 ? 'High' : (compositeRiskScore >= 35 ? 'Moderate' : 'Low'));

  // Enterprise Health Score (Inversely proportional to risk + weighted by performance)
  // Profitability (25%), Demand (20%), Market Share (20%), Inventory (15%), Financial Runway (20%)
  const profitHealth = Math.max(0, Math.min(100, (financials.netProfitMargin + 10) * 3.3));
  const runwayHealth = Math.min(100, financials.runwayMonths >= 12 ? 100 : financials.runwayMonths * 8);
  const marketShareHealth = Math.min(100, userMarketShare * 3.5);
  const invHealth = inventory.healthScore;
  const demandHealth = activeScenario && activeScenario.id === 'economic-slowdown' ? 50 : 85;

  const businessHealthScore = Math.round(
    (profitHealth * 0.25) +
    (demandHealth * 0.20) +
    (marketShareHealth * 0.20) +
    (invHealth * 0.15) +
    (runwayHealth * 0.20)
  );

  return {
    compositeRiskScore,
    overallSeverity,
    businessHealthScore: Math.max(10, Math.min(100, businessHealthScore)),
    healthSubscores: {
      profitability: Math.round(profitHealth),
      demandTraction: Math.round(demandHealth),
      marketShare: Math.round(marketShareHealth),
      inventoryHealth: Math.round(invHealth),
      financialStability: Math.round(runwayHealth)
    },
    risks
  };
}

