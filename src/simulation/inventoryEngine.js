/**
 * TwinMarket AI - Inventory Management Engine
 * Calculates inventory health, stock turnover ratios, stockout risk penalties,
 * replenishment lead times, and carrying cost impacts.
 */

/**
 * Analyzes inventory metrics across all active SKUs
 */
export function analyzeInventory({
  products = [],
  productDemands = [],
  annualCOGS = 0
}) {
  let totalStockUnits = 0;
  let totalCostValue = 0;
  let totalRetailValue = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;
  let stockoutRiskCount = 0;

  const skuAnalysis = products.map((prod) => {
    const stock = prod.stock || 0;
    const minStock = prod.minStock || 10;
    const costValue = stock * prod.costPrice;
    const retailValue = stock * prod.sellingPrice;
    const unrealizedProfit = retailValue - costValue;

    // Find predicted demand
    const demandObj = productDemands.find((d) => d.id === prod.id);
    const predictedUnits = demandObj ? demandObj.predictedUnits : (prod.baseMonthlyDemand || 30);

    // Days of supply remaining: (stock / (monthlyDemand / 30))
    const dailyDemand = predictedUnits / 30;
    const daysOfSupply = dailyDemand > 0 ? Math.round(stock / dailyDemand) : 999;

    let status = 'Healthy';
    let statusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';

    if (stock === 0) {
      status = 'Out of Stock';
      statusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      outOfStockCount++;
    } else if (stock < minStock) {
      status = 'Critical Shortage';
      statusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      lowStockCount++;
    } else if (stock < predictedUnits) {
      status = 'Stockout Risk';
      statusColor = 'text-cyanAccent-400 bg-cyan-500/10 border-cyan-500/20';
      stockoutRiskCount++;
    }

    totalStockUnits += stock;
    totalCostValue += costValue;
    totalRetailValue += retailValue;

    return {
      ...prod,
      costValue,
      retailValue,
      unrealizedProfit,
      predictedUnits,
      daysOfSupply,
      status,
      statusColor,
      reorderNeeded: stock < minStock,
      recommendedReorderUnits: Math.max(0, (prod.maxStock || minStock * 3) - stock)
    };
  });

  // Inventory Turnover Ratio = Annual COGS / Average Inventory Value
  // If annual COGS isn't passed, assume monthly COGS * 12
  const effectiveAnnualCOGS = annualCOGS > 0 ? annualCOGS : (totalCostValue * 0.8 * 12);
  const turnoverRatio = totalCostValue > 0 ? Number((effectiveAnnualCOGS / totalCostValue).toFixed(1)) : 0;

  // Inventory Health Score (0-100)
  let healthScore = 95;
  if (outOfStockCount > 0) healthScore -= (outOfStockCount * 18);
  if (lowStockCount > 0) healthScore -= (lowStockCount * 8);
  if (stockoutRiskCount > 0) healthScore -= (stockoutRiskCount * 5);
  healthScore = Math.max(20, Math.min(100, healthScore));

  return {
    totalStockUnits,
    totalCostValue: Math.round(totalCostValue),
    totalRetailValue: Math.round(totalRetailValue),
    totalUnrealizedProfit: Math.round(totalRetailValue - totalCostValue),
    lowStockCount,
    outOfStockCount,
    stockoutRiskCount,
    turnoverRatio,
    healthScore,
    skuAnalysis
  };
}

