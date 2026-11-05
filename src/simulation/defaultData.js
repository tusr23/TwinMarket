/**
 * TwinMarket AI - Default Business Data & Templates
 * Realistic business initializations across multiple retail and service verticals.
 */

export const BUSINESS_CATEGORIES = [
  {
    id: 'mobile-shop',
    name: 'Mobile Shop',
    icon: 'Smartphone',
    description: 'Smartphones, premium flagships, wearables, and mobile accessories.',
    baseElasticity: -1.65, // Price sensitive electronics
    avgMarginTarget: 22,
    defaultMarketingRatio: 0.05,
    sampleProducts: [
      { id: 'mob-1', name: 'Samsung Galaxy S24 Ultra', category: 'Flagships', costPrice: 98000, sellingPrice: 124999, stock: 18, minStock: 6, maxStock: 50, qualityScore: 96, baseMonthlyDemand: 22 },
      { id: 'mob-2', name: 'Apple iPhone 15 Pro', category: 'Flagships', costPrice: 104000, sellingPrice: 134900, stock: 15, minStock: 5, maxStock: 40, qualityScore: 98, baseMonthlyDemand: 25 },
      { id: 'mob-3', name: 'Samsung Galaxy A55 5G', category: 'Mid-Range', costPrice: 29500, sellingPrice: 38999, stock: 42, minStock: 15, maxStock: 100, qualityScore: 88, baseMonthlyDemand: 55 },
      { id: 'mob-4', name: 'OnePlus 12R', category: 'Mid-Range', costPrice: 31000, sellingPrice: 39999, stock: 38, minStock: 12, maxStock: 90, qualityScore: 89, baseMonthlyDemand: 48 },
      { id: 'mob-5', name: 'Redmi Note 13 Pro+', category: 'Budget', costPrice: 21500, sellingPrice: 28999, stock: 65, minStock: 20, maxStock: 120, qualityScore: 82, baseMonthlyDemand: 80 },
      { id: 'mob-6', name: 'Galaxy Buds 2 Pro', category: 'Accessories', costPrice: 7800, sellingPrice: 13999, stock: 75, minStock: 20, maxStock: 150, qualityScore: 91, baseMonthlyDemand: 95 },
      { id: 'mob-7', name: '65W GaN Fast Charger', category: 'Accessories', costPrice: 750, sellingPrice: 1799, stock: 120, minStock: 30, maxStock: 250, qualityScore: 86, baseMonthlyDemand: 160 },
    ],
    defaultCompetitors: [
      { id: 'c1', name: 'TechZone Mobility', strategy: 'Aggressive Discounting', priceFactor: 0.94, marketShare: 29, customerSat: 78, financialStrength: 86, brandReputation: 80, promoActive: false },
      { id: 'c2', name: 'OmniStore Prime', strategy: 'Premium Brand Experience', priceFactor: 1.07, marketShare: 25, customerSat: 93, financialStrength: 92, brandReputation: 94, promoActive: true },
      { id: 'c3', name: 'GadgetBazaar Metro', strategy: 'High-Volume Value', priceFactor: 0.92, marketShare: 21, customerSat: 74, financialStrength: 72, brandReputation: 75, promoActive: false },
      { id: 'c4', name: 'Cellular World', strategy: 'Balanced Regional Retail', priceFactor: 1.01, marketShare: 13, customerSat: 83, financialStrength: 76, brandReputation: 82, promoActive: false }
    ]
  },
  {
    id: 'clothing-store',
    name: 'Clothing Store',
    icon: 'Shirt',
    description: 'Apparel, seasonal collections, casual wear, and fashion accessories.',
    baseElasticity: -1.35,
    avgMarginTarget: 48,
    defaultMarketingRatio: 0.08,
    sampleProducts: [
      { id: 'clo-1', name: 'Premium Oxford Cotton Shirt', category: 'Formal', costPrice: 850, sellingPrice: 2299, stock: 85, minStock: 25, maxStock: 200, qualityScore: 90, baseMonthlyDemand: 110 },
      { id: 'clo-2', name: 'Slim-Fit Stretch Denim Jeans', category: 'Casual', costPrice: 950, sellingPrice: 2799, stock: 95, minStock: 30, maxStock: 220, qualityScore: 88, baseMonthlyDemand: 130 },
      { id: 'clo-3', name: 'Merino Wool Knit Sweater', category: 'Winterwear', costPrice: 1400, sellingPrice: 3899, stock: 45, minStock: 15, maxStock: 120, qualityScore: 94, baseMonthlyDemand: 60 },
      { id: 'clo-4', name: 'Breathable Athletic Performance Tee', category: 'Activewear', costPrice: 420, sellingPrice: 1199, stock: 140, minStock: 40, maxStock: 300, qualityScore: 85, baseMonthlyDemand: 180 },
      { id: 'clo-5', name: 'Handcrafted Italian Leather Belt', category: 'Accessories', costPrice: 550, sellingPrice: 1699, stock: 70, minStock: 20, maxStock: 150, qualityScore: 92, baseMonthlyDemand: 75 }
    ],
    defaultCompetitors: [
      { id: 'cc1', name: 'Urban Vogue Studio', strategy: 'Fast Fashion Discounter', priceFactor: 0.90, marketShare: 32, customerSat: 76, financialStrength: 84, brandReputation: 82, promoActive: true },
      { id: 'cc2', name: 'Heritage Apparel', strategy: 'Premium Quality & Craft', priceFactor: 1.15, marketShare: 24, customerSat: 91, financialStrength: 88, brandReputation: 93, promoActive: false },
      { id: 'cc3', name: 'Trends & Co.', strategy: 'Balanced High-Street', priceFactor: 0.98, marketShare: 28, customerSat: 82, financialStrength: 79, brandReputation: 85, promoActive: false }
    ]
  },
  {
    id: 'electronics-store',
    name: 'Electronics Store',
    icon: 'Tv',
    description: 'Home appliances, 4K Smart TVs, gaming laptops, and audio soundbars.',
    baseElasticity: -1.5,
    avgMarginTarget: 20,
    defaultMarketingRatio: 0.06,
    sampleProducts: [
      { id: 'elec-1', name: '55" QLED 4K Smart TV', category: 'Home Entertainment', costPrice: 42000, sellingPrice: 56999, stock: 16, minStock: 5, maxStock: 40, qualityScore: 93, baseMonthlyDemand: 24 },
      { id: 'elec-2', name: 'Gaming Laptop RTX 4060', category: 'Computers', costPrice: 68000, sellingPrice: 89990, stock: 12, minStock: 4, maxStock: 30, qualityScore: 95, baseMonthlyDemand: 18 },
      { id: 'elec-3', name: 'Dolby Atmos Soundbar 5.1', category: 'Audio', costPrice: 14000, sellingPrice: 21990, stock: 32, minStock: 10, maxStock: 70, qualityScore: 89, baseMonthlyDemand: 38 },
      { id: 'elec-4', name: 'Inverter Refrigerator 340L', category: 'Appliances', costPrice: 27000, sellingPrice: 36490, stock: 20, minStock: 6, maxStock: 45, qualityScore: 91, baseMonthlyDemand: 28 }
    ],
    defaultCompetitors: [
      { id: 'ec1', name: 'MegaElectro Mart', strategy: 'Aggressive Discounting', priceFactor: 0.93, marketShare: 34, customerSat: 79, financialStrength: 90, brandReputation: 86, promoActive: true },
      { id: 'ec2', name: 'PrimeVision Retails', strategy: 'Premium Service & Warranty', priceFactor: 1.05, marketShare: 28, customerSat: 92, financialStrength: 85, brandReputation: 90, promoActive: false },
      { id: 'ec3', name: 'Digital World', strategy: 'Balanced Neighborhood Store', priceFactor: 0.99, marketShare: 22, customerSat: 81, financialStrength: 75, brandReputation: 80, promoActive: false }
    ]
  },
  {
    id: 'grocery-store',
    name: 'Grocery Store',
    icon: 'ShoppingBasket',
    description: 'Organic produce, packaged pantry essentials, dairy, and household goods.',
    baseElasticity: -0.75, // Inelastic staple goods
    avgMarginTarget: 18,
    defaultMarketingRatio: 0.03,
    sampleProducts: [
      { id: 'gro-1', name: 'Organic Cold-Pressed Olive Oil 1L', category: 'Pantry', costPrice: 650, sellingPrice: 899, stock: 120, minStock: 35, maxStock: 300, qualityScore: 94, baseMonthlyDemand: 140 },
      { id: 'gro-2', name: 'Royal Basmati Rice 5kg', category: 'Staples', costPrice: 480, sellingPrice: 650, stock: 180, minStock: 50, maxStock: 450, qualityScore: 90, baseMonthlyDemand: 220 },
      { id: 'gro-3', name: 'Artisanal Farmhouse Cheddar 400g', category: 'Dairy', costPrice: 260, sellingPrice: 380, stock: 90, minStock: 25, maxStock: 180, qualityScore: 92, baseMonthlyDemand: 110 },
      { id: 'gro-4', name: 'Raw Himalayan Wild Honey 500g', category: 'Healthy Foods', costPrice: 310, sellingPrice: 475, stock: 85, minStock: 20, maxStock: 160, qualityScore: 95, baseMonthlyDemand: 95 }
    ],
    defaultCompetitors: [
      { id: 'gc1', name: 'FreshPicks Superstore', strategy: 'Everyday Low Price', priceFactor: 0.92, marketShare: 36, customerSat: 80, financialStrength: 88, brandReputation: 84, promoActive: false },
      { id: 'gc2', name: 'Natures Basket Boutique', strategy: 'Gourmet Premium Organic', priceFactor: 1.12, marketShare: 26, customerSat: 94, financialStrength: 82, brandReputation: 91, promoActive: true },
      { id: 'gc3', name: 'QuickMart Convenience', strategy: 'Hyper-Local Speed', priceFactor: 1.02, marketShare: 22, customerSat: 83, financialStrength: 75, brandReputation: 81, promoActive: false }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant & Bistro',
    icon: 'UtensilsCrossed',
    description: 'Gourmet dining, artisanal woodfired pizza, specialty coffee, and desserts.',
    baseElasticity: -1.3,
    avgMarginTarget: 60,
    defaultMarketingRatio: 0.09,
    sampleProducts: [
      { id: 'res-1', name: 'Truffle & Wild Mushroom Risotto', category: 'Mains', costPrice: 190, sellingPrice: 649, stock: 150, minStock: 40, maxStock: 350, qualityScore: 95, baseMonthlyDemand: 210 },
      { id: 'res-2', name: 'Artisanal Neapolitan Margherita Pizza', category: 'Pizzas', costPrice: 140, sellingPrice: 520, stock: 220, minStock: 50, maxStock: 450, qualityScore: 92, baseMonthlyDemand: 340 },
      { id: 'res-3', name: 'Signature Cold Brew Coffee', category: 'Beverages', costPrice: 45, sellingPrice: 220, stock: 300, minStock: 80, maxStock: 600, qualityScore: 90, baseMonthlyDemand: 420 },
      { id: 'res-4', name: 'Belgian Dark Chocolate Soufflé', category: 'Desserts', costPrice: 90, sellingPrice: 340, stock: 110, minStock: 30, maxStock: 220, qualityScore: 96, baseMonthlyDemand: 160 }
    ],
    defaultCompetitors: [
      { id: 'rc1', name: 'Bella Cucina Bistro', strategy: 'Authentic Traditional Dining', priceFactor: 1.06, marketShare: 30, customerSat: 92, financialStrength: 85, brandReputation: 90, promoActive: false },
      { id: 'rc2', name: 'Urban Crave Eatery', strategy: 'Casual Fast Dining', priceFactor: 0.91, marketShare: 34, customerSat: 81, financialStrength: 82, brandReputation: 84, promoActive: true },
      { id: 'rc3', name: 'Cafe Lumina', strategy: 'Artisan Coffee & Bakery', priceFactor: 0.98, marketShare: 20, customerSat: 88, financialStrength: 76, brandReputation: 86, promoActive: false }
    ]
  },
  {
    id: 'cosmetics-business',
    name: 'Cosmetics & Skincare',
    icon: 'Sparkles',
    description: 'Clean beauty, anti-aging serums, botanical hair care, and luxury makeup.',
    baseElasticity: -1.15,
    avgMarginTarget: 55,
    defaultMarketingRatio: 0.12,
    sampleProducts: [
      { id: 'cos-1', name: 'Vitamin C + Hyaluronic Acid Radiance Serum', category: 'Serums', costPrice: 320, sellingPrice: 1299, stock: 90, minStock: 25, maxStock: 220, qualityScore: 94, baseMonthlyDemand: 130 },
      { id: 'cos-2', name: 'Ceramide Barrier Repair Cream 50ml', category: 'Moisturizers', costPrice: 280, sellingPrice: 999, stock: 110, minStock: 30, maxStock: 250, qualityScore: 91, baseMonthlyDemand: 160 },
      { id: 'cos-3', name: 'Matte Liquid Velvet Lip Tint', category: 'Makeup', costPrice: 180, sellingPrice: 649, stock: 160, minStock: 40, maxStock: 350, qualityScore: 89, baseMonthlyDemand: 220 },
      { id: 'cos-4', name: 'SPF 50+ Invisible Sunscreen Fluid', category: 'Sun Protection', costPrice: 210, sellingPrice: 799, stock: 140, minStock: 35, maxStock: 300, qualityScore: 93, baseMonthlyDemand: 240 }
    ],
    defaultCompetitors: [
      { id: 'cosc1', name: 'GlowAura Beauty', strategy: 'Influencer Driven Fast-Beauty', priceFactor: 0.94, marketShare: 33, customerSat: 83, financialStrength: 87, brandReputation: 89, promoActive: true },
      { id: 'cosc2', name: 'DermaPure Clinical', strategy: 'Dermatologist Endorsed Premium', priceFactor: 1.14, marketShare: 27, customerSat: 93, financialStrength: 90, brandReputation: 94, promoActive: false },
      { id: 'cosc3', name: 'Botanica Botanicals', strategy: 'Eco-Friendly Organic', priceFactor: 1.02, marketShare: 24, customerSat: 86, financialStrength: 78, brandReputation: 87, promoActive: false }
    ]
  },
  {
    id: 'custom-business',
    name: 'Custom Business',
    icon: 'Briefcase',
    description: 'Custom venture with flexible margins, tailored inventory, and custom elasticity.',
    baseElasticity: -1.3,
    avgMarginTarget: 30,
    defaultMarketingRatio: 0.07,
    sampleProducts: [
      { id: 'cust-1', name: 'Core Product Alpha', category: 'Standard', costPrice: 1200, sellingPrice: 2400, stock: 50, minStock: 15, maxStock: 150, qualityScore: 88, baseMonthlyDemand: 70 },
      { id: 'cust-2', name: 'Enterprise Bundle Beta', category: 'Premium', costPrice: 4500, sellingPrice: 8500, stock: 25, minStock: 8, maxStock: 80, qualityScore: 94, baseMonthlyDemand: 35 }
    ],
    defaultCompetitors: [
      { id: 'custc1', name: 'Vanguard Competitor A', strategy: 'Aggressive Pricing', priceFactor: 0.95, marketShare: 35, customerSat: 80, financialStrength: 82, brandReputation: 82, promoActive: false },
      { id: 'custc2', name: 'Apex Competitor B', strategy: 'Brand Leader', priceFactor: 1.08, marketShare: 35, customerSat: 90, financialStrength: 88, brandReputation: 90, promoActive: false }
    ]
  }
];

export const STRATEGIES = {
  AGGRESSIVE_GROWTH: {
    id: 'aggressive',
    name: 'Aggressive Growth',
    badge: 'High Growth / Lower Margins',
    description: 'Price competitively (-5% to -8%), boost marketing by 40%, capture market share aggressively.',
    priceModifier: 0.95,
    marketingModifier: 1.4,
    expectedGrowth: '+28% Volume',
    riskLevel: 'Moderate to High'
  },
  BALANCED: {
    id: 'balanced',
    name: 'Balanced Strategy',
    badge: 'Optimal Health',
    description: 'Fair market pricing, steady 5% marketing budget, focus on customer retention and balanced cash flow.',
    priceModifier: 1.0,
    marketingModifier: 1.0,
    expectedGrowth: '+12% Volume',
    riskLevel: 'Low to Moderate'
  },
  MAX_PROFIT: {
    id: 'max-profit',
    name: 'Maximum Profit Strategy',
    badge: 'High Margin / Value Focus',
    description: 'Premium pricing (+8% to +12%), focus on high margin SKUs, controlled lean overheads.',
    priceModifier: 1.09,
    marketingModifier: 0.85,
    expectedGrowth: '+32% Margin',
    riskLevel: 'Moderate'
  }
};

export const MARKET_SCENARIOS = [
  {
    id: 'price-war',
    title: 'Price War Outbreak',
    icon: 'Swords',
    severity: 'High Impact',
    description: 'Major competitor slashes prices by 15% across key categories. Market price sensitivity spikes.',
    competitorPriceEffect: -0.15,
    demandMultiplier: 0.88, // user demand drops if they don't respond
    costMultiplier: 1.0,
    durationMonths: 3
  },
  {
    id: 'high-demand',
    title: 'Customer Demand Surge (Boom)',
    icon: 'TrendingUp',
    severity: 'Positive Growth',
    description: 'Consumer confidence surges and disposable income rises. Inflow of new buyers increases by 30%.',
    competitorPriceEffect: 1.03,
    demandMultiplier: 1.30,
    costMultiplier: 1.02,
    durationMonths: 4
  },
  {
    id: 'economic-slowdown',
    title: 'Economic Slowdown (Recession)',
    icon: 'TrendingDown',
    severity: 'Challenging',
    description: 'Inflation and macroeconomic headwinds contract discretionary spending. Consumers seek bargain prices.',
    competitorPriceEffect: 0.95,
    demandMultiplier: 0.72,
    costMultiplier: 1.05, // supply costs may rise
    durationMonths: 6
  },
  {
    id: 'competitor-entry',
    title: 'New Well-Funded Competitor Entry',
    icon: 'Users',
    severity: 'High Threat',
    description: 'A venture-backed national chain opens a flagship outlet nearby with aggressive ad blitz.',
    competitorPriceEffect: 0.90,
    demandMultiplier: 0.82,
    costMultiplier: 1.0,
    durationMonths: 6
  },
  {
    id: 'supply-shortage',
    title: 'Supply Chain Bottleneck',
    icon: 'AlertTriangle',
    severity: 'Supply Crisis',
    description: 'Port congestion and semiconductor delays cause product delivery delays and 12% wholesale cost surge.',
    competitorPriceEffect: 1.10,
    demandMultiplier: 0.95,
    costMultiplier: 1.12,
    durationMonths: 3
  },
  {
    id: 'festival-season',
    title: 'Festival & Holiday Season Surge',
    icon: 'Sparkles',
    severity: 'Peak Sales',
    description: 'Diwali & festive holiday shopping season brings 45% traffic surge. Willingness to pay peaks.',
    competitorPriceEffect: 1.02,
    demandMultiplier: 1.45,
    costMultiplier: 1.0,
    durationMonths: 2
  },
  {
    id: 'marketing-campaign',
    title: 'Viral Marketing Campaign',
    icon: 'Megaphone',
    severity: 'Viral Opportunity',
    description: 'Influencer campaign goes viral, doubling social reach and boosting brand search interest.',
    competitorPriceEffect: 1.0,
    demandMultiplier: 1.35,
    costMultiplier: 1.04, // marketing campaign expense
    durationMonths: 2
  },
  {
    id: 'sudden-cost-hike',
    title: 'Wholesale Tariff & Price Shock',
    icon: 'Zap',
    severity: 'Margin Squeeze',
    description: 'Import tariffs or component shortages immediately inflate wholesale acquisition costs by 18%.',
    competitorPriceEffect: 1.08,
    demandMultiplier: 0.92,
    costMultiplier: 1.18,
    durationMonths: 4
  }
];

export const DEMO_BUSINESS = {
  id: 'biz-apex-mobile-1',
  name: 'Apex Mobile Tech',
  category: 'mobile-shop',
  categoryName: 'Mobile Shop',
  initialCapital: 3000000, // ₹3,000,000 (30 Lakhs INR)
  currentCash: 2150000,
  location: 'Metro Commercial Plaza, Cyber Hub',
  targetCustomers: 'Tech Enthusiasts, Professionals & Value Seekers',
  strategy: 'balanced',
  activeScenarioId: null,
  monthlyMarketingSpend: 45000,
  monthlyFixedOverhead: 95000, // Rent, salaries, utilities, cloud POS
  customerSatisfaction: 87, // out of 100
  brandReputation: 84, // out of 100
  createdAt: '2026-01-15T09:00:00.000Z',
  products: BUSINESS_CATEGORIES[0].sampleProducts,
  competitors: BUSINESS_CATEGORIES[0].defaultCompetitors,
  activityLog: [
    { id: 'act-1', timestamp: '2026-10-28T14:30:00Z', title: 'Restocked Inventory', detail: 'Purchased 20 units of Samsung Galaxy S24 Ultra', type: 'inventory', impact: '-₹1,960,000 Cash' },
    { id: 'act-2', timestamp: '2026-10-29T10:15:00Z', title: 'Competitor Alert', detail: 'TechZone Mobility initiated a 6% discount on flagship models', type: 'competitor', impact: 'Moderate Demand Shift' },
    { id: 'act-3', timestamp: '2026-10-30T17:45:00Z', title: 'Price Optimization', detail: 'Adjusted OnePlus 12R selling price from ₹41,999 to ₹39,999', type: 'pricing', impact: '+18% Projected Demand' },
    { id: 'act-4', timestamp: '2026-11-01T08:00:00Z', title: 'Market Health Evaluation', detail: 'Business Health Score upgraded to 82/100 (Strong Tier)', type: 'system', impact: '+4.2 Pts' }
  ]
};

export const UI_THEMES = [
  {
    id: 'helios-mauve',
    name: 'Helios Luxe Plum',
    tag: 'Helios Default',
    style: 'Helios Investments Dark Luxe',
    primaryColor: '#E087B7',
    secondaryColor: '#A855F7',
    previewGradient: 'from-[#E087B7] via-[#C06497] to-[#7E22CE]',
    dotBg: 'bg-[#E087B7]',
    description: 'Ultra-sleek dark velvet charcoal paired with radiant mauve, plum glow, and pill navigation.'
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet',
    tag: 'Raycast AI',
    style: 'Linear & Raycast AI',
    primaryColor: '#8B5CF6',
    secondaryColor: '#22D3EE',
    previewGradient: 'from-violet-600 via-purple-600 to-cyan-400',
    dotBg: 'bg-violet-500',
    description: 'Electric Violet paired with Neon Cyan over deep obsidian charcoal.'
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    tag: 'Fintech & ESG',
    style: 'Supabase & Bloomberg ESG',
    primaryColor: '#10B981',
    secondaryColor: '#38BDF8',
    previewGradient: 'from-emerald-500 via-teal-500 to-sky-400',
    dotBg: 'bg-emerald-500',
    description: 'High-contrast Electric Emerald with mint glow and crisp cyan accents.'
  },
  {
    id: 'electric-azure',
    name: 'Electric Azure',
    tag: 'Enterprise Silicon',
    style: 'Stripe & Ramp',
    primaryColor: '#3B82F6',
    secondaryColor: '#2DD4BF',
    previewGradient: 'from-blue-600 via-indigo-600 to-teal-400',
    dotBg: 'bg-blue-500',
    description: 'Vibrant Silicon Valley Cobalt Blue accented by cool mint and teal.'
  },
  {
    id: 'amber-gold',
    name: 'Bloomberg Gold',
    tag: 'Terminal Wealth',
    style: 'Bloomberg Financial',
    primaryColor: '#F59E0B',
    secondaryColor: '#06B6D4',
    previewGradient: 'from-amber-500 via-orange-500 to-cyan-400',
    dotBg: 'bg-amber-500',
    description: 'Prestigious Bloomberg Amber/Gold with dark slate contrast.'
  },
  {
    id: 'sunset-rose',
    name: 'Sunset Rose',
    tag: 'Modern Luxury',
    style: 'Cyberpunk & Creative',
    primaryColor: '#F43F5E',
    secondaryColor: '#C084FC',
    previewGradient: 'from-rose-500 via-pink-600 to-purple-400',
    dotBg: 'bg-rose-500',
    description: 'Neon Crimson Rose paired with vivid Amethyst purple highlights.'
  }
];


