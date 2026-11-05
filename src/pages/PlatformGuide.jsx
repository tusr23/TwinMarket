import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  Activity,
  Boxes,
  ShieldAlert,
  Bot,
  FileText,
  Settings,
  Sliders,
  PieChart,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Code2,
  Cpu,
  Database,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Percent,
  DollarSign,
  Scale
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext.jsx';
import { UI_THEMES } from '../simulation/defaultData.js';

export default function PlatformGuide() {
  const { business, theme } = useBusiness();
  const [activeTab, setActiveTab] = useState('walkthrough'); // 'walkthrough' | 'engine' | 'architecture' | 'faq'
  const [expandedFaq, setExpandedFaq] = useState(null);

  const activeTheme = UI_THEMES.find((t) => t.id === theme) || UI_THEMES[0];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // 10-Step Interactive Workflow
  const walkthroughSteps = [
    {
      step: '01',
      title: 'Initialize & Configure Your Virtual Venture',
      module: 'My Business',
      path: '/my-business',
      icon: BuildingIcon,
      badge: 'Step 1: Setup',
      summary: 'Explore the default preloaded shop ("Apex Mobile Tech") or create a completely custom enterprise across 7 distinct retail verticals.',
      howToTest: [
        'Navigate to My Business to inspect current liquid capital, monthly rent, and staff payroll.',
        'Click "Create New Business" to configure initial capital, target demographic, and category.',
        'Use the Treasury Management panel to simulate capital injection or dividend withdrawals.'
      ],
      proTip: 'Creating a new venture automatically synthesizes category-specific products, starting competitor stores, and demand price elasticity.'
    },
    {
      step: '02',
      title: 'Simulate Product Pricing & Price Elasticity',
      module: 'Pricing Simulator',
      path: '/pricing-simulator',
      icon: TrendingUp,
      badge: 'Core Feature',
      summary: 'Test how raising or lowering retail prices affects consumer purchase willingness, unit gross margins, and net profits.',
      howToTest: [
        'Select any product (e.g. Samsung Galaxy S24 Ultra or iPhone 15 Pro) from the dropdown.',
        'Drag the Proposed Selling Price slider to see instant Before vs. After financial comparisons.',
        'Examine the Price Competitiveness Index (benchmark vs. competitor market average).',
        'Click "RUN MARKET SIMULATION & APPLY" to commit the new price to live business state.'
      ],
      proTip: 'Inspect the Dynamic Price Elasticity curve at the bottom to find the exact price point that maximizes gross revenue.'
    },
    {
      step: '03',
      title: 'Battle AI Competitors in Game-Theoretic Stress Tests',
      module: 'Competitor Intelligence',
      path: '/competitors',
      icon: Users,
      badge: 'Multi-Agent AI',
      summary: 'Compete against 4 virtual rival storefronts with distinct strategic archetypes (Aggressive Discounter, Luxury Experience, High-Volume Value, Regional Retail).',
      howToTest: [
        'Review the Rival Enterprise Matrix comparing price indexes, market shares, and customer ratings.',
        'Select an action in the Rival Stress-Test bar (e.g., "-8% Price Cut" or "+10% Premium Hike").',
        'Click "Trigger Rival Response" to observe real-time retaliatory discounting or customer poaching.'
      ],
      proTip: 'If you initiate deep price cuts, aggressive rivals like TechZone will launch flash sales to protect market share.'
    },
    {
      step: '04',
      title: 'Forecast Customer Demand & Marketing Elasticity',
      module: 'Customer Demand',
      path: '/customer-demand',
      icon: Activity,
      badge: 'Micro-Forecasting',
      summary: 'Examine buyer demand distribution across 4 demographic segments, seasonal waves, and test marketing ad spend efficiency.',
      howToTest: [
        'Review the 4 customer profiles: Bargain Hunters (38%), Value Seekers (32%), Brand Loyalists (18%), and Convenience Shoppers (12%).',
        'Use the Marketing Investment Elasticity slider to increase monthly ad spend from ₹25k to ₹150k.',
        'Click "Apply Marketing Budget" to see the logarithmic marketing multiplier boost sales demand.'
      ],
      proTip: 'Marketing exhibits diminishing returns—doubling the budget beyond ₹100k yields smaller incremental demand gains.'
    },
    {
      step: '05',
      title: 'Optimize Warehouse Buffers & Automate Restocks',
      module: 'Inventory Management',
      path: '/inventory',
      icon: Boxes,
      badge: 'Supply Chain',
      summary: 'Prevent revenue loss caused by stockouts while minimizing dead-stock holding costs and tracking inventory turnover ratios.',
      howToTest: [
        'Inspect the SKU table for "Stockout Risk" or "Critical Shortage" badges.',
        'Use the quick "+10" or "+25" restock buttons to order inventory for fast-moving products.',
        'Click "Batch Restock Low Stock" to automatically replenish all depleted items in a single click.',
        'Click "Add New Product" to launch a brand new SKU into the catalog.'
      ],
      proTip: 'Products with zero stock forfeit daily sales demand to competitors. Maintaining 2–3 weeks of safety stock maximizes revenue.'
    },
    {
      step: '06',
      title: 'Subject Your Business to 8 Real-World Market Shocks',
      module: 'Market Simulator',
      path: '/market-simulator',
      icon: Zap,
      badge: 'Stress Testing',
      summary: 'Simulate macro shocks including Price Wars, Recessions, New Competitor Entries, Wholesale Cost Shocks, and Festive Holiday Booms.',
      howToTest: [
        'Select any scenario card (e.g., "Price War Outbreak" or "Festival & Holiday Season Surge").',
        'Review the side-by-side delta cards comparing Baseline Revenue vs. Scenario Impact.',
        'Click "Activate Scenario on Live Business" to inject the shock into the store environment.'
      ],
      proTip: 'The "Festival Season" shock provides a +45% surge in customer demand—make sure inventory is fully stocked before activating it!'
    },
    {
      step: '07',
      title: 'Diagnose Vulnerabilities with the 5x5 Risk Matrix',
      module: 'Risk Analysis',
      path: '/risk-analysis',
      icon: ShieldAlert,
      badge: 'Risk Heatmap',
      summary: 'Evaluate enterprise vulnerabilities across Financial, Competition, Inventory, Pricing, Demand, and Market dimensions.',
      howToTest: [
        'Inspect the interactive 5×5 Likelihood vs. Impact matrix.',
        'Click on any active coordinate node (e.g., L4 / I4) to open that category’s complete threat dossier.',
        'Review the Prescribed Strategic Mitigation for tailored action steps.'
      ],
      proTip: 'Cells colored deep red indicate critical severity where likelihood and impact multiply to 15 or higher.'
    },
    {
      step: '08',
      title: 'Consult the Conversational AI Business Advisor',
      module: 'AI Business Advisor',
      path: '/advisor',
      icon: Bot,
      badge: 'Consultant Bot',
      summary: 'Engage with an intelligent heuristics-powered executive advisor that references live store figures, profit margins, and competitor threats.',
      howToTest: [
        'Click any suggested prompt chip, e.g. "How can I increase my profit?" or "Which product is performing best?".',
        'Type any custom business inquiry in the input bar and press enter.',
        'Click the action pills inside the advisor’s response to jump directly to recommended actions.'
      ],
      proTip: 'The advisor performs live introspection on your business data—it cites your exact revenue numbers and calculates custom margin advice.'
    },
    {
      step: '09',
      title: 'Test Multi-Variable Sandboxes & Compare Growth Roadmaps',
      module: 'What-If & Strategy',
      path: '/what-if',
      icon: Sliders,
      badge: 'Sandbox Tools',
      summary: 'Use the What-If Simulator to adjust 4 variables at once, or compare Aggressive Growth vs. Balanced vs. Max Profit strategies.',
      howToTest: [
        'In What-If Simulator, move the Price, Marketing, Stock, and Overhead sliders simultaneously.',
        'Review the combined outcome before clicking "Commit To Live Business".',
        'Navigate to Strategy Comparison to compare 3, 6, and 12-month projected earnings.'
      ],
      proTip: 'The "Maximum Profit" strategy increases markups and focuses on high-margin products with lean overheads.'
    },
    {
      step: '10',
      title: 'Export Audit Dossiers & Customize Theme Aesthetics',
      module: 'Reports & Settings',
      path: '/reports',
      icon: FileText,
      badge: 'Export & Theming',
      summary: 'Generate print-ready executive reports, download full database backups in JSON, and select from 5 trending UI themes.',
      howToTest: [
        'Navigate to Business Reports and click "Print Full Report" for clean print styling.',
        'Click "Export Data JSON" to save a timestamped backup file to your computer.',
        'Use the Theme dropdown in the Header or Settings to switch between Cyber Violet, Emerald Matrix, Bloomberg Gold, and more.'
      ],
      proTip: 'All business progress is automatically persisted in your browser’s LocalStorage—no account creation or server required.'
    }
  ];

  // Mathematical Formulas Breakdown
  const mathematicalModels = [
    {
      title: 'Price Elasticity of Demand (PED)',
      formula: 'Q_{new} = Q_{base} \\times (1 + \\%\\Delta P)^E \\times Attractiveness_{comp}',
      engine: 'pricingEngine.js & demandEngine.js',
      description: 'Calculates how customer demand shifts when prices change. Mobile retail defaults to E = -1.65 (elastic), grocery stores to E = -0.75 (inelastic), and restaurants to E = -1.30.',
      variables: [
        { name: 'E', desc: 'Price Elasticity Coefficient (industry-specific)' },
        { name: '%ΔP', desc: 'Percentage change in retail price: (P_new - P_base) / P_base' },
        { name: 'Attractiveness_comp', desc: 'Relative price ratio against competitor market average: 1 - 1.15 * (P_user / P_compAvg - 1)' }
      ]
    },
    {
      title: 'Unit Contribution & Net Margin Formulation',
      formula: 'Profit_{net} = \\sum (P_{sell} - C_{cogs}) \\times Q_{sales} - (OpEx_{fixed} + AdSpend + InventoryCost_{carry})',
      engine: 'revenueEngine.js & pricingEngine.js',
      description: 'Enterprise profit & loss calculation. Realized sales volume is bounded by current available warehouse stock (Q_sales = min(Stock, Demand)).',
      variables: [
        { name: 'Gross Margin %', desc: '(Gross Profit / Total Revenue) * 100' },
        { name: 'Inventory Carrying Overhead', desc: '1.5% of wholesale inventory valuation per month (storage, insurance, shrinkage)' },
        { name: 'Break-even Point', desc: 'Total Operating Expenses / Average Contribution Margin Ratio' }
      ]
    },
    {
      title: 'Logarithmic Marketing Response Curve',
      formula: 'M_{mult} = 1.0 + 0.22 \\times \\log_{10}\\left(\\frac{AdSpend}{30000}\\right)',
      engine: 'demandEngine.js',
      description: 'Models consumer advertising effectiveness with diminishing marginal returns. Doubling marketing budget yields progressive expansion that naturally saturates.',
      variables: [
        { name: 'Baseline Ad Budget', desc: '₹30,000/month corresponds to standard 1.0x marketing multiplier' },
        { name: 'Saturation Ceiling', desc: 'Logarithmic curvature prevents infinite demand scaling from ad spend alone' }
      ]
    },
    {
      title: 'Game-Theoretic Rival Response Engine',
      formula: '\\Delta Share_{user} = f(\\Delta P_{user}, \\Delta Ad_{user}, Strategy_{rival})',
      engine: 'competitorEngine.js',
      description: 'Simulates reactions from 4 competitors. When the user increases prices (>+3%), aggressive competitors cut prices or poach customers. When the user discounts (<-3%), discount rivals launch retaliatory flash sales.',
      variables: [
        { name: 'Normalized Market Pool', desc: 'User Share + Rivals Share is dynamically normalized to equal exactly 100%' },
        { name: 'Threat Index', desc: 'Calculated based on active competitor discount campaigns and user market share defensibility' }
      ]
    },
    {
      title: 'Composite Enterprise Health Score (0–100)',
      formula: 'Health = 0.25 \\times H_{profit} + 0.20 \\times H_{demand} + 0.20 \\times H_{share} + 0.15 \\times H_{inventory} + 0.20 \\times H_{runway}',
      engine: 'riskEngine.js',
      description: 'A multi-vector health rating combining profitability, customer demand traction, market share, inventory buffers, and cash runway.',
      variables: [
        { name: 'Profitability (25%)', desc: 'Evaluates net profit margin against commercial retail benchmarks' },
        { name: 'Demand Traction (20%)', desc: 'Evaluates fulfillment rate and organic buyer willingness-to-pay' },
        { name: 'Market Share (20%)', desc: 'Evaluates competitive positioning against the market leader' },
        { name: 'Inventory Buffer (15%)', desc: 'Evaluates stockout incidents and inventory turnover ratios' },
        { name: 'Financial Runway (20%)', desc: 'Evaluates liquid treasury runway in months' }
      ]
    },
    {
      title: '5x5 Enterprise Risk Coordinate Mapping',
      formula: 'RiskScore_{category} = Likelihood (1..5) \\times Impact (1..5) \\times 4',
      engine: 'riskEngine.js',
      description: 'Maps 6 risk dimensions (Financial, Competition, Inventory, Pricing, Demand, Market) onto a 5×5 probability matrix with categorized mitigation playbooks.',
      variables: [
        { name: 'Critical Severity', desc: 'Score >= 75 (Coordinates L5/I4, L4/I5, L5/I5)' },
        { name: 'High Severity', desc: 'Score >= 50 (Coordinates L3/I4, L4/I3, L4/I4)' },
        { name: 'Moderate / Low', desc: 'Score < 50 (Managed risks under monitoring)' }
      ]
    }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'Does TwinMarket AI require an internet connection, backend server, or database?',
      a: 'No. TwinMarket AI is a 100% frontend-only web application. All calculations, economic models, competitor reactions, and AI advisory recommendations run locally in your browser using client-side JavaScript. Your data is automatically saved to LocalStorage.'
    },
    {
      q: 'How does the AI Business Advisor work without an external AI API?',
      a: 'The AI Business Advisor uses an advanced heuristic rules and business intelligence engine. When you ask a question or click a prompt, it inspects your live business state in real-time (your exact revenue, profit margins, top-margin products, lowest-margin SKUs, stock levels, and competitor prices) and synthesizes contextual, quantitative advice with actionable navigation links.'
    },
    {
      q: 'What happens when I click "RUN MARKET SIMULATION"?',
      a: 'When you click "RUN MARKET SIMULATION" in the Header or Pricing Simulator, the simulation engine recalculates demand across all products, computes rival competitor counter-moves, updates financial statements, refreshes enterprise health scores, and records a verified transaction entry in your business activity log.'
    },
    {
      q: 'How does the Pricing Simulator calculate expected demand?',
      a: 'The engine uses microeconomic Price Elasticity of Demand (PED) compounded with cross-price competitor attractiveness. If your proposed price is lower than competitor averages, your demand expands and poaches volume from rivals. If your price is higher, demand contracts unless balanced by high product quality ratings or advertising investment.'
    },
    {
      q: 'What is the Business Health Score and how can I improve it?',
      a: 'The Health Score (0–100) is an algorithmic evaluation weighted across Profitability (25%), Customer Demand (20%), Market Share (20%), Inventory Health (15%), and Financial Runway (20%). You can improve it by raising margins on low-elasticity items, eliminating stockout incidents with batch restocks, and avoiding deep price wars.'
    },
    {
      q: 'Can I export my data or reset to default demo data?',
      a: 'Yes. In the Settings page or Business Reports page, click "Export Data JSON" to download your complete virtual business backup file. If you ever want to start fresh, click "Reset to Demo Data" in Settings or Header to restore pristine defaults.'
    },
    {
      q: 'How do I switch color themes?',
      a: 'Click the Palette dropdown in the top Header (next to the currency selector) or visit the visual theme gallery in the Settings page. You can choose between Cyber Violet, Emerald Matrix, Electric Azure, Bloomberg Gold, and Sunset Rose.'
    }
  ];

  function BuildingIcon(props) {
    return <Layers {...props} />;
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl neu-card border border-[var(--neu-border)] p-6 lg:p-10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-brand-400" />
              Platform Knowledge Base & System Documentation
            </div>
            <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
              How to Use TwinMarket AI
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
              Welcome to the official user manual, architectural overview, and mathematical reference for <strong className="text-white">TwinMarket AI</strong>. Learn how to simulate pricing experiments, compete with AI rivals, manage inventory buffers, and extract strategic market intelligence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/pricing-simulator"
              className="neu-btn-primary px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              Launch Pricing Lab
            </NavLink>
            <NavLink
              to="/advisor"
              className="neu-btn px-4 py-2.5 rounded-xl font-bold text-xs text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Bot className="w-4 h-4 text-cyanAccent-400" />
              Ask AI Advisor
            </NavLink>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-[var(--border-subtle)]">
          {[
            { id: 'walkthrough', label: 'Interactive Walkthrough', icon: Sparkles, count: '10 Steps' },
            { id: 'engine', label: 'Microeconomic Engine & Formulas', icon: Scale, count: '6 Models' },
            { id: 'architecture', label: 'Platform Architecture & Tech', icon: Cpu, count: 'Client-Side' },
            { id: 'faq', label: 'Knowledge Base & FAQ', icon: HelpCircle, count: '7 Topics' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                  isActive
                    ? 'neu-btn-primary text-white shadow-lg'
                    : 'neu-btn text-slate-300 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: INTERACTIVE STEP-BY-STEP WALKTHROUGH */}
      {activeTab === 'walkthrough' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                10-Step Interactive Workflow Manual
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Follow this sequential operational playbook to test all capabilities of TwinMarket AI.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
              End-to-End Retail Sandbox
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {walkthroughSteps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="glass-card rounded-2xl p-6 lg:p-7 border-[var(--border-card)] hover:border-brand-500/40 transition-all flex flex-col lg:flex-row lg:items-start justify-between gap-6 group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyanAccent-400 p-0.5 shrink-0 shadow-lg shadow-brand-500/20">
                      <div className="w-full h-full bg-[var(--bg-card)] rounded-[14px] flex items-center justify-center font-mono font-extrabold text-sm text-cyanAccent-400">
                        {s.step}
                      </div>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                          {s.badge}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">•</span>
                        <span className="text-xs font-semibold text-cyanAccent-400">{s.module}</span>
                      </div>

                      <h3 className="text-base lg:text-lg font-extrabold text-white group-hover:text-brand-300 transition-colors">
                        {s.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {s.summary}
                      </p>

                      {/* How to test checklist */}
                      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Operational Checklist:
                        </span>
                        {s.howToTest.map((test, tIdx) => (
                          <div key={tIdx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{test}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pro tip */}
                      <div className="flex items-center gap-2 text-xs text-brand-300/90 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span><strong>Pro-Tip:</strong> {s.proTip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Direct Launch Button */}
                  <div className="lg:w-48 shrink-0 flex flex-col justify-center">
                    <NavLink
                      to={s.path}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Open {s.module}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MATHEMATICAL SIMULATION ENGINE FORMULAS */}
      {activeTab === 'engine' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyanAccent-400" />
              Microeconomic & Mathematical Engine Specifications
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              TwinMarket AI does not rely on random number generators for business outcomes. Every price change, demand surge, competitor reaction, and margin delta is calculated through deterministic, explainable microeconomic formulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mathematicalModels.map((model, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border-[var(--border-card)] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyanAccent-400 border border-cyan-500/30">
                      Formula {idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{model.engine}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{model.title}</h3>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyanAccent-400 overflow-x-auto shadow-inner">
                    <code>{model.formula}</code>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-3">
                    {model.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Variables & Explanations:
                  </span>
                  {model.variables.map((v, vIdx) => (
                    <div key={vIdx} className="flex items-start gap-2 text-slate-300 text-[11px]">
                      <span className="font-mono font-bold text-brand-400 shrink-0">• {v.name}:</span>
                      <span className="text-slate-400">{v.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLATFORM ARCHITECTURE & TECH STACK */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-400" />
              Platform Architecture & Technical Specifications
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              TwinMarket AI is designed as a self-contained, enterprise-grade client-side simulation engine. It eliminates cloud latency, requires zero backend dependencies, and provides instant zero-latency feedback for all pricing experiments.
            </p>
          </div>

          {/* Architecture Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-card rounded-2xl p-5 border-[var(--border-card)]">
              <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 w-fit mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">React 18 & Vite 6</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ultra-fast component reconciliation, React Context global state management, and optimized microsecond rendering cycles.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 border-[var(--border-card)]">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyanAccent-400 w-fit mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Recharts Visualizations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive SVG Area, Bar, Line, Donut, and Radar charts that dynamically adapt colors to the active UI theme.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 border-[var(--border-card)]">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit mb-3">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Zero Backend & LocalStorage</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All business data, simulation runs, transactions, and themes persist in the browser's LocalStorage with zero server overhead.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-5 border-[var(--border-card)]">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Tailwind 3 Design System</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamic CSS variable tokens supporting 5 curated themes (Cyber Violet, Emerald Matrix, Electric Azure, Bloomberg Gold, Sunset Rose).
              </p>
            </div>
          </div>

          {/* Module Architecture Table */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">
              Simulation Engine Module Mapping
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                    <th className="py-3 px-4">Engine File</th>
                    <th className="py-3 px-4">Mathematical Function</th>
                    <th className="py-3 px-4">Coupled UI Pages</th>
                    <th className="py-3 px-4">Output Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-300">pricingEngine.js</td>
                    <td className="py-3.5 px-4 text-slate-300">Price Elasticity (PED), unit gross margins, rival parity ratio</td>
                    <td className="py-3.5 px-4 text-slate-400">Pricing Simulator, What-If</td>
                    <td className="py-3.5 px-4 text-emerald-400">Demand delta, revenue curve, competitiveness score</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyanAccent-400">demandEngine.js</td>
                    <td className="py-3.5 px-4 text-slate-300">Logarithmic marketing curve, 4 customer segments, 12-mo seasonality</td>
                    <td className="py-3.5 px-4 text-slate-400">Customer Demand, Dashboard</td>
                    <td className="py-3.5 px-4 text-emerald-400">Forecast units, segment volume, seasonal indices</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">competitorEngine.js</td>
                    <td className="py-3.5 px-4 text-slate-300">Game-theoretic reaction models, predatory discounting, share shifts</td>
                    <td className="py-3.5 px-4 text-slate-400">Competitor Intelligence, Dashboard</td>
                    <td className="py-3.5 px-4 text-emerald-400">Rival reaction ledger, normalized market shares</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-300">revenueEngine.js</td>
                    <td className="py-3.5 px-4 text-slate-300">Comprehensive P&L formulation, carrying overheads, break-even</td>
                    <td className="py-3.5 px-4 text-slate-400">Dashboard, Reports, What-If</td>
                    <td className="py-3.5 px-4 text-emerald-400">Net profit, gross margin, cash runway months</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-300">inventoryEngine.js</td>
                    <td className="py-3.5 px-4 text-slate-300">Days of supply, stockout penalty, inventory turnover ($COGS/AvgInv$)</td>
                    <td className="py-3.5 px-4 text-slate-400">Inventory Management, Products</td>
                    <td className="py-3.5 px-4 text-emerald-400">Turnover ratio, wholesale value, restock counts</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-rose-300">riskEngine.js</td>
                    <td className="py-3.5 px-4 text-slate-300">6 risk vectors, 5x5 Likelihood vs Impact coordinate mapping</td>
                    <td className="py-3.5 px-4 text-slate-400">Risk Analysis, Dashboard</td>
                    <td className="py-3.5 px-4 text-emerald-400">Health Score (0-100), composite risk index</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-purple-300">advisorEngine.js</td>
                    <td className="py-3.5 px-4 text-slate-300">Heuristic introspection on live figures, margin & competitor parsing</td>
                    <td className="py-3.5 px-4 text-slate-400">AI Business Advisor, Dashboard</td>
                    <td className="py-3.5 px-4 text-emerald-400">Contextual answers, actionable guidance buttons</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KNOWLEDGE BASE & FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              Frequently Asked Questions & Operations Knowledge Base
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Find instant answers to common questions about simulation mechanics, data persistence, and strategic features.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-2xl border-[var(--border-card)] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="text-sm font-bold text-white flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        Q{idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 bg-slate-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Launch Directory Grid (Available at the bottom of all tabs) */}
      <div className="glass-card rounded-2xl p-6 lg:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-brand-400" />
              Quick Module Launch Directory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant shortcuts to all primary modules and sandbox features in TwinMarket AI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {[
            { to: '/', label: 'Dashboard', sub: 'KPIs & Trajectories', icon: '📊' },
            { to: '/my-business', label: 'My Business', sub: 'Setup & Treasury', icon: '🏢' },
            { to: '/pricing-simulator', label: 'Pricing Simulator', sub: 'Elasticity Lab', icon: '📈' },
            { to: '/competitors', label: 'Competitor Intelligence', sub: 'Rival Matrix', icon: '⚔️' },
            { to: '/customer-demand', label: 'Customer Demand', sub: 'Buyer Segments', icon: '👥' },
            { to: '/market-simulator', label: 'Market Simulator', sub: '8 Macro Shocks', icon: '⚡' },
            { to: '/inventory', label: 'Inventory Management', sub: 'Warehouse & Buffers', icon: '📦' },
            { to: '/risk-analysis', label: 'Risk Analysis', sub: '5x5 Heatmap', icon: '🛡️' },
            { to: '/advisor', label: 'AI Business Advisor', sub: 'Consultant Chat', icon: '🤖' },
            { to: '/reports', label: 'Business Reports', sub: 'Print & Export', icon: '📄' },
            { to: '/what-if', label: 'What-If Simulator', sub: 'Decision Sandbox', icon: '🎛️' },
            { to: '/strategies', label: 'Strategy Comparison', sub: 'Growth Roadmaps', icon: '🎯' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-brand-500/50 hover:bg-slate-900 transition-all flex items-center gap-3 group"
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors block truncate">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {item.sub}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

