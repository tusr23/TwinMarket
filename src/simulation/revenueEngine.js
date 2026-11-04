/**
 * TwinMarket AI - Revenue & Financial Modeling Engine
 * Computes comprehensive P&L statements, Gross & Net Margins,
 * Break-even points, Cash Runway, and Unit Economics.
 */

/**
 * Calculates complete enterprise financial statements for the current period
 */
export function calculateFinancialStatements({
  products = [],
  productDemands = [],
  monthlyFixedOverhead = 95000,
  monthlyMarketingSpend = 45000,
  currentCash = 2150000,
  inventoryTotalValue = 1200000
}) {
  let totalRevenue = 0;
  let totalCOGS = 0;
  let totalUnitsSold = 0;

  // Calculate product sales & COGS
  products.forEach((prod) => {
    // Find estimated demand
    const demandObj = productDemands.find((d) => d.id === prod.id);
    const demandUnits = demandObj ? demandObj.predictedUnits : (prod.baseMonthlyDemand || 30);
    // Realized sales volume capped by stock
    const actualSales = Math.min(prod.stock !== undefined ? prod.stock : demandUnits, demandUnits);

    const revenue = actualSales * prod.sellingPrice;
    const cogs = actualSales * prod.costPrice;

    totalRevenue += revenue;
    totalCOGS += cogs;
    totalUnitsSold += actualSales;
  });

  const grossProfit = totalRevenue - totalCOGS;
  const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  // Operating Expenses
  const inventoryCarryingCost = Math.round(inventoryTotalValue * 0.015); // 1.5% storage, insurance, shrinkage
  const totalOperatingExpenses = monthlyFixedOverhead + monthlyMarketingSpend + inventoryCarryingCost;

  // Net Profit
  const netProfit = grossProfit - totalOperatingExpenses;
  const netProfitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  // Total Expenses (COGS + OpEx)
  const totalExpenses = totalCOGS + totalOperatingExpenses;

  // Break-even Analysis
  // Fixed Costs / (Average Contribution Margin Ratio)
  const avgContributionMarginRatio = totalRevenue > 0 ? grossProfit / totalRevenue : 0.25;
  const breakEvenRevenue = avgContributionMarginRatio > 0
    ? Math.round(totalOperatingExpenses / avgContributionMarginRatio)
    : 0;

  // Cash Runway in months
  const monthlyNetBurn = netProfit < 0 ? Math.abs(netProfit) : 0;
  const runwayMonths = monthlyNetBurn > 0
    ? Number((currentCash / monthlyNetBurn).toFixed(1))
    : 99.0; // Profitable / Infinite runway

  // Generate 6-month historical & 6-month projected data
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov (Proj)', 'Dec (Proj)', 'Jan (Proj)', 'Feb (Proj)', 'Mar (Proj)', 'Apr (Proj)'];
  const baselineRev = Math.max(100000, totalRevenue);
  const baselineProfit = netProfit;

  const financialTimeline = months.map((m, idx) => {
    const isHistorical = idx < 6;
    // Controlled seasonal variations
    const variance = isHistorical
      ? 0.88 + (idx * 0.025) + (Math.sin(idx) * 0.04)
      : 1.0 + ((idx - 6) * 0.035) + (Math.cos(idx) * 0.03);

    const rev = Math.round(baselineRev * variance);
    const exp = Math.round((totalCOGS * variance) + totalOperatingExpenses);
    const prof = rev - exp;

    return {
      month: m,
      revenue: rev,
      expenses: exp,
      profit: prof,
      margin: rev > 0 ? Number(((prof / rev) * 100).toFixed(1)) : 0,
      isProjected: !isHistorical
    };
  });

  return {
    totalRevenue: Math.round(totalRevenue),
    totalCOGS: Math.round(totalCOGS),
    grossProfit: Math.round(grossProfit),
    grossMargin: Number(grossMargin.toFixed(1)),
    monthlyFixedOverhead,
    monthlyMarketingSpend,
    inventoryCarryingCost,
    totalOperatingExpenses: Math.round(totalOperatingExpenses),
    totalExpenses: Math.round(totalExpenses),
    netProfit: Math.round(netProfit),
    netProfitMargin: Number(netProfitMargin.toFixed(1)),
    totalUnitsSold,
    breakEvenRevenue,
    currentCash,
    runwayMonths,
    isCashFlowPositive: netProfit >= 0,
    financialTimeline
  };
}

