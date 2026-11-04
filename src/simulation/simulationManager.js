/**
 * TwinMarket AI - Central Simulation Manager
 * Coordinates cross-engine calculations, scenario orchestration,
 * state persistence in LocalStorage, and transactional updates.
 */

import { DEMO_BUSINESS, BUSINESS_CATEGORIES, STRATEGIES, MARKET_SCENARIOS } from './defaultData.js';
import { predictCatalogDemand } from './demandEngine.js';
import { analyzeInventory } from './inventoryEngine.js';
import { calculateFinancialStatements } from './revenueEngine.js';
import { evaluateBusinessRisks } from './riskEngine.js';
import { simulateCompetitorReactions } from './competitorEngine.js';
import { generateAdvisorInsights } from './advisorEngine.js';

const STORAGE_KEY = 'twinmarket_ai_business_data_v1';
const SAVED_BUSINESSES_KEY = 'twinmarket_ai_all_businesses_v1';

/**
 * Initializes and retrieves active business from LocalStorage or fallback demo
 */
export function loadActiveBusiness() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse active business from localStorage', e);
  }
  return DEMO_BUSINESS;
}

/**
 * Persists active business to LocalStorage
 */
export function saveActiveBusiness(business) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(business));
  } catch (e) {
    console.error('Failed to save business to localStorage', e);
  }
}

/**
 * Executes a full calculation cycle for the business
 */
export function runFullSimulationCycle(business) {
  const activeScenario = business.activeScenarioId
    ? MARKET_SCENARIOS.find((s) => s.id === business.activeScenarioId)
    : null;

  // 1. Demand Prediction
  const demand = predictCatalogDemand({
    products: business.products,
    competitors: business.competitors,
    marketingSpend: business.monthlyMarketingSpend,
    customerSat: business.customerSatisfaction,
    brandRep: business.brandReputation,
    activeScenario,
    strategy: business.strategy,
    currentMonth: 'Oct'
  });

  // 2. Inventory Analysis
  const inventory = analyzeInventory({
    products: business.products,
    productDemands: demand.productDemands
  });

  // 3. Financial Statements
  const financials = calculateFinancialStatements({
    products: business.products,
    productDemands: demand.productDemands,
    monthlyFixedOverhead: business.monthlyFixedOverhead,
    monthlyMarketingSpend: business.monthlyMarketingSpend,
    currentCash: business.currentCash,
    inventoryTotalValue: inventory.totalCostValue
  });

  // 4. Competitor Landscape Evaluation
  const competitorAnalysis = simulateCompetitorReactions({
    userPriceDeltaPct: 0,
    userMarketingDeltaPct: 0,
    competitors: business.competitors,
    userMarketShare: business.userMarketShare || 15,
    activeScenario
  });

  // 5. Enterprise Risk & Health Score
  const risks = evaluateBusinessRisks({
    financials,
    inventory,
    competitors: business.competitors,
    userMarketShare: competitorAnalysis.userMarketShare,
    activeScenario
  });

  // 6. AI Advisor Insights
  const advisorInsights = generateAdvisorInsights({
    business,
    financials,
    inventory,
    demand,
    competitors: business.competitors,
    risks: risks.risks
  });

  return {
    business,
    demand,
    inventory,
    financials,
    competitorAnalysis,
    risks,
    advisorInsights,
    activeScenario
  };
}

/**
 * Factory to create a new virtual business with auto-generated condition
 */
export function createNewBusiness({
  name,
  category,
  initialCapital = 2000000,
  location = 'Commercial High Street',
  targetCustomers = 'Broad Consumer Market',
  strategy = 'balanced'
}) {
  const catObj = BUSINESS_CATEGORIES.find((c) => c.id === category) || BUSINESS_CATEGORIES[0];
  const stratObj = STRATEGIES[strategy.toUpperCase()] || STRATEGIES.BALANCED;

  const newBiz = {
    id: `biz-${Date.now()}`,
    name,
    category: catObj.id,
    categoryName: catObj.name,
    initialCapital: Number(initialCapital),
    currentCash: Math.round(Number(initialCapital) * 0.75), // 25% allocated to initial inventory
    location,
    targetCustomers,
    strategy,
    activeScenarioId: null,
    monthlyMarketingSpend: Math.round(Number(initialCapital) * 0.02),
    monthlyFixedOverhead: Math.round(Number(initialCapital) * 0.035),
    customerSatisfaction: 85,
    brandReputation: 80,
    createdAt: new Date().toISOString(),
    products: JSON.parse(JSON.stringify(catObj.sampleProducts)),
    competitors: JSON.parse(JSON.stringify(catObj.defaultCompetitors)),
    activityLog: [
      {
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        title: 'Virtual Enterprise Incorporated',
        detail: `Launched ${name} in ${location} with ₹${Number(initialCapital).toLocaleString('en-IN')} initial capital.`,
        type: 'system',
        impact: 'Fresh Market Entry'
      }
    ]
  };

  return newBiz;
}

