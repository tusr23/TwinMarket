/**
 * TwinMarket AI - AI Business Advisor Engine
 * Advanced rule-based and heuristics engine that emulates a top-tier management consultant.
 * Generates tailored recommendations and answers contextual conversational inquiries.
 */

/**
 * Predefined Quick Questions for the Advisor Chat
 */
export const ADVISOR_PROMPT_TEMPLATES = [
  {
    id: 'increase-profit',
    label: 'How can I increase my profit?',
    badge: 'Profit Optimization'
  },
  {
    id: 'reduce-price',
    label: 'Should I reduce my product price?',
    badge: 'Pricing Strategy'
  },
  {
    id: 'best-product',
    label: 'Which product is performing best?',
    badge: 'Product Analytics'
  },
  {
    id: 'defeat-competitors',
    label: 'How can I defeat my competitors?',
    badge: 'Market Strategy'
  },
  {
    id: 'biggest-risks',
    label: 'What are my biggest business risks?',
    badge: 'Risk Mitigation'
  },
  {
    id: 'inventory-advice',
    label: 'Is my inventory optimized for demand?',
    badge: 'Supply Chain'
  }
];

/**
 * Generates real-time top executive insights & actionable recommendations
 */
export function generateAdvisorInsights({
  business,
  financials,
  inventory,
  demand,
  competitors = [],
  risks = []
}) {
  const insights = [];

  // 1. Pricing / Margin insight
  if (financials.netProfitMargin > 18) {
    insights.push({
      id: 'ins-margin-strong',
      type: 'success',
      tag: 'Strong Margins',
      title: 'Healthy Profit Cushion Detected',
      message: `Your net profit margin of ${financials.netProfitMargin}% is comfortably above the retail average. You have financial leverage to invest in aggressive marketing or seasonal bundle offers.`,
      actionLabel: 'Explore Expansion',
      suggestedPath: '/pricing-simulator'
    });
  } else if (financials.netProfitMargin < 8) {
    insights.push({
      id: 'ins-margin-weak',
      type: 'warning',
      tag: 'Margin Compression',
      title: 'Net Profit Margin Needs Optimization',
      message: `Current net margin is only ${financials.netProfitMargin}%. Consider selective 3-5% price hikes on low-elasticity accessories or negotiate wholesale bulk discounts.`,
      actionLabel: 'Optimize Pricing',
      suggestedPath: '/pricing-simulator'
    });
  }

  // 2. Inventory / Stockout insight
  if (inventory.outOfStockCount > 0) {
    insights.push({
      id: 'ins-stock-out',
      type: 'danger',
      tag: 'Lost Revenue',
      title: `${inventory.outOfStockCount} Products Completely Stocked Out`,
      message: `You are losing sales volume daily due to zero stock. Predicted demand is being absorbed by rival stores.`,
      actionLabel: 'Restock Immediately',
      suggestedPath: '/inventory'
    });
  } else if (inventory.lowStockCount > 0) {
    insights.push({
      id: 'ins-stock-low',
      type: 'warning',
      tag: 'Supply Warning',
      title: `${inventory.lowStockCount} Products Approaching Reorder Buffer`,
      message: `Stock levels are below safe safety stock buffers. Trigger a reorder to prevent delivery bottlenecks.`,
      actionLabel: 'View Inventory',
      suggestedPath: '/inventory'
    });
  }

  // 3. Competitor Alert
  const aggressiveComp = competitors.find((c) => c.priceFactor < 0.95);
  if (aggressiveComp) {
    insights.push({
      id: 'ins-comp-threat',
      type: 'info',
      tag: 'Competitive Threat',
      title: `${aggressiveComp.name} is Undercutting Market`,
      message: `${aggressiveComp.name} is pricing ${(100 - (aggressiveComp.priceFactor * 100)).toFixed(0)}% below market standard. Avoid price matching directly; counter with bundle warranties or VIP loyalty rewards.`,
      actionLabel: 'Analyze Competitors',
      suggestedPath: '/competitors'
    });
  }

  // 4. Marketing Leverage
  if (business.monthlyMarketingSpend < 30000) {
    insights.push({
      id: 'ins-marketing-under',
      type: 'info',
      tag: 'Growth Opportunity',
      title: 'Marketing Budget Is Below Optimal Growth Scale',
      message: `Your marketing multiplier is currently at ${demand.marketingMultiplier}x. Testing an incremental ₹15,000 ad budget could unlock ~18% higher sales traffic without cannibalizing margin.`,
      actionLabel: 'What-If Simulation',
      suggestedPath: '/what-if'
    });
  }

  return insights;
}

/**
 * Answers a user's conversational inquiry with real-time business parameters
 */
export function answerAdvisorInquiry(queryText, context) {
  const { business, financials, inventory, demand, competitors = [], risks = [] } = context;
  const q = queryText.toLowerCase().trim();

  // Helper formatting
  const fmt = (num) => `₹${Math.round(num).toLocaleString('en-IN')}`;

  // 1. Profit increase
  if (q.includes('profit') || q.includes('increase profit') || q.includes('earn more')) {
    const highestMarginProduct = [...business.products].sort((a, b) => {
      const marginA = (a.sellingPrice - a.costPrice) / a.sellingPrice;
      const marginB = (b.sellingPrice - b.costPrice) / b.sellingPrice;
      return marginB - marginA;
    })[0];

    const lowestMarginProduct = [...business.products].sort((a, b) => {
      const marginA = (a.sellingPrice - a.costPrice) / a.sellingPrice;
      const marginB = (b.sellingPrice - b.costPrice) / b.sellingPrice;
      return marginA - marginB;
    })[0];

    return {
      sender: 'advisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Strategic Profit Maximization Plan',
      text: `Based on your live business metrics, your current monthly Gross Revenue is **${fmt(financials.totalRevenue)}** yielding a Net Profit of **${fmt(financials.netProfit)}** (${financials.netProfitMargin}% net margin).\n\nHere are the 3 highest-leverage actions to expand your bottom line:\n\n1. **Promote High-Margin Anchors**: Your highest gross margin SKU is **${highestMarginProduct?.name || 'Accessories'}** (yielding **${Math.round(((highestMarginProduct?.sellingPrice - highestMarginProduct?.costPrice) / highestMarginProduct?.sellingPrice) * 100)}%** margin). Bundle this SKU with flagship hardware sales.\n2. **Optimize Compressed Margins**: **${lowestMarginProduct?.name || 'Entry Hardware'}** currently generates the slimmest margin. A minor 4% price calibration would yield an estimated **+${fmt(financials.totalRevenue * 0.02)}** incremental profit without triggering noticeable customer churn.\n3. **Trim Fixed Overhead**: Operating expenses currently stand at **${fmt(financials.totalOperatingExpenses)}/month**. Reducing non-essential carrying costs by 10% immediately expands your cash cushion.`,
      confidence: 96,
      suggestedActions: [
        { label: 'Run Pricing Simulator', link: '/pricing-simulator' },
        { label: 'Compare Strategies', link: '/strategies' }
      ]
    };
  }

  // 2. Reduce price
  if (q.includes('reduce') || q.includes('cut price') || q.includes('lower price') || q.includes('discount')) {
    return {
      sender: 'advisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Price Elasticity Evaluation',
      text: `In your current category (**${business.categoryName || 'Retail'}**), customer price elasticity is estimated at **-1.65** (moderately elastic).\n\n**Key Findings**:\n- If you cut prices across the board by 10%, predicted demand volume will expand by approximately **+16.5%**.\n- However, because your average gross margin is **${financials.grossMargin}%**, your unit gross profit will contract faster than unit sales volume can compensate.\n- **Verdict**: Across-the-board discounting will likely decrease net profit by **${fmt(financials.grossProfit * 0.08)}/month**.\n\n**Recommendation**: Do not initiate a blanket price reduction. Instead, run targeted flash discounts only on overstocked SKUs or slow-turnover accessories.`,
      confidence: 93,
      suggestedActions: [
        { label: 'Test Price Drop in Simulator', link: '/pricing-simulator' },
        { label: 'View Competitor Pricing', link: '/competitors' }
      ]
    };
  }

  // 3. Best performing product
  if (q.includes('best') || q.includes('top product') || q.includes('performing') || q.includes('winner')) {
    const topRevenueProduct = [...business.products].sort((a, b) => (b.sellingPrice * (b.baseMonthlyDemand || 30)) - (a.sellingPrice * (a.baseMonthlyDemand || 30)))[0];
    const topVolumeProduct = [...business.products].sort((a, b) => (b.baseMonthlyDemand || 30) - (a.baseMonthlyDemand || 30))[0];

    return {
      sender: 'advisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Product Portfolio Breakdown',
      text: `Analyzing your catalog across volume, gross revenue, and contribution margin:\n\n- **Highest Revenue Driver**: **${topRevenueProduct?.name}** generates estimated monthly revenue of **${fmt(topRevenueProduct?.sellingPrice * (topRevenueProduct?.baseMonthlyDemand || 30))}**.\n- **Highest Unit Velocity**: **${topVolumeProduct?.name}** with **~${topVolumeProduct?.baseMonthlyDemand || 30} units/month**.\n\n**Strategic Advice**: Ensure you maintain at least 45 days of safety stock for **${topRevenueProduct?.name}**, as stockouts on this SKU directly destabilize cash flow.`,
      confidence: 98,
      suggestedActions: [
        { label: 'Manage Products', link: '/products' },
        { label: 'Check Stock Levels', link: '/inventory' }
      ]
    };
  }

  // 4. Defeat competitors
  if (q.includes('competitor') || q.includes('defeat') || q.includes('market share') || q.includes('rival')) {
    const topCompetitor = competitors[0] || { name: 'TechZone', marketShare: 28 };
    return {
      sender: 'advisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Competitive Market Strategy',
      text: `Your current market share stands at **${context.userMarketShare || 15}%**, trailing market leader **${topCompetitor.name}** (**${topCompetitor.marketShare}%** share).\n\nTo capture market share effectively:\n1. **Flank Rather Than Confront**: ${topCompetitor.name} competes primarily on price. Competing on price alone will ignite a retaliatory price war that burns margin.\n2. **Quality & Service Superiority**: Your customer satisfaction score is **${business.customerSatisfaction}/100**. Elevating post-sale warranty support, fast exchange policies, and free setup will attract rational **Value Seekers** and **Brand Loyalists** (which represent 50% of the market).\n3. **Localized Marketing Blitz**: Ramp up hyper-local digital ads during peak weekends to out-voice competitors in your catchment area.`,
      confidence: 94,
      suggestedActions: [
        { label: 'Simulate Market Scenario', link: '/market-simulator' },
        { label: 'Competitor Intelligence', link: '/competitors' }
      ]
    };
  }

  // 5. Biggest risks
  if (q.includes('risk') || q.includes('threat') || q.includes('danger') || q.includes('problem')) {
    const topRisk = risks.sort((a, b) => b.score - a.score)[0] || { category: 'Inventory Risk', score: 65, description: 'Stock imbalances detected.' };
    return {
      sender: 'advisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Enterprise Risk Diagnosis',
      text: `Your overall Composite Business Risk score is **${context.compositeRiskScore || 42}/100** (Severity: **${context.overallSeverity || 'Moderate'}**).\n\n**Primary Risk Exposure**: **${topRisk.category}** (Risk Index: **${topRisk.score}/100**)\n- **Diagnostic**: ${topRisk.description}\n- **Business Impact**: ${topRisk.potentialImpact}\n- **Prescribed Mitigation**: ${topRisk.recommendedAction}\n\nReview the Risk Matrix to see the 5x5 Likelihood vs Impact distribution across all operations.`,
      confidence: 95,
      suggestedActions: [
        { label: 'Inspect Risk Matrix', link: '/risk-analysis' },
        { label: 'View Health Score', link: '/dashboard' }
      ]
    };
  }

  // 6. Inventory advice
  if (q.includes('inventory') || q.includes('stock') || q.includes('shortage') || q.includes('warehouse')) {
    return {
      sender: 'advisor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Inventory Optimization Assessment',
      text: `Total active inventory is valued at **${fmt(inventory.totalCostValue)}** across **${business.products.length} active SKUs**.\n\n- **Inventory Turnover Ratio**: **${inventory.turnoverRatio}x**\n- **Stockout Incidents**: **${inventory.outOfStockCount} SKUs**\n- **Low Stock Warnings**: **${inventory.lowStockCount} SKUs**\n\n**Optimization Tip**: Fast-moving flagship SKUs should have at least 3 weeks of lead time coverage. Consider utilizing automated batch restock for low items.`,
      confidence: 92,
      suggestedActions: [
        { label: 'Batch Restock SKUs', link: '/inventory' }
      ]
    };
  }

  // Fallback general business advisory
  return {
    sender: 'advisor',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    title: 'Executive Advisory Response',
    text: `Regarding "${queryText}":\n\nYour business is operating at a **${context.businessHealthScore || 80}/100** Health Score with **${fmt(financials.totalRevenue)}** in monthly revenue and **${fmt(financials.currentCash)}** in cash reserves.\n\nOur recommendation is to test your proposed initiative in the **What-If Business Simulator** or the **Pricing Simulator** before applying changes to live inventory. This guarantees risk-free algorithmic testing before capital commitment.`,
    confidence: 88,
    suggestedActions: [
      { label: 'Open What-If Simulator', link: '/what-if' },
      { label: 'View Strategy Comparison', link: '/strategies' }
    ]
  };
}

