import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Percent,
  Users,
  PieChart as PieIcon,
  Boxes,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Layers,
  ArrowUp,
  BarChart2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useBusiness } from '../context/BusinessContext.jsx';
import MetricCard from '../components/common/MetricCard.jsx';
import HealthScoreGauge from '../components/common/HealthScoreGauge.jsx';
import { UI_THEMES } from '../simulation/defaultData.js';

export default function Dashboard() {
  const { business, simulation, formatCurrency, triggerSimulationRun, theme } = useBusiness();
  const activeTheme = UI_THEMES.find((t) => t.id === theme) || UI_THEMES[0];

  const financials = simulation.financials;
  const demand = simulation.demand;
  const inventory = simulation.inventory;
  const risks = simulation.risks;
  const competitorAnalysis = simulation.competitorAnalysis;
  const advisorInsights = simulation.advisorInsights || [];

  // Top Tabs
  const [activeTab, setActiveTab] = useState('wallet'); // 'market' | 'wallet' | 'tools'
  const [holdingTimeframe, setHoldingTimeframe] = useState('6M');
  const [watchlistFilter, setWatchlistFilter] = useState('most-viewed'); // 'most-viewed' | 'gain' | 'lose'
  const [chartTimeframe, setChartTimeframe] = useState('1Y'); // '1D' | '1W' | '1M' | '6M' | '1Y'
  const [showDeepAnalytics, setShowDeepAnalytics] = useState(false);

  // Watchlist Items matching screenshot aesthetic
  const watchlistItems = [
    {
      id: 'spot',
      name: 'Spotify',
      ticker: 'NYSE: SPOT',
      price: '$ 11,770.3',
      change: '+16.31%',
      isPositive: true,
      logoBg: 'bg-[#1DB954]/15 text-[#1DB954]',
      logoChar: 'S'
    },
    {
      id: 'amzn',
      name: 'Amazon',
      ticker: 'NYSE: AMZN',
      price: '$ 10,280.8',
      change: '+8.11%',
      isPositive: true,
      logoBg: 'bg-[#FF9900]/15 text-[#FF9900]',
      logoChar: 'a'
    },
    {
      id: 'msft',
      name: 'MSFT',
      ticker: 'NYSE: MSFT',
      price: '$ 8,510.2',
      change: '+4.89%',
      isPositive: true,
      logoBg: 'bg-[#00A4EF]/15 text-[#00A4EF]',
      logoChar: 'M'
    },
    {
      id: 'nvda',
      name: 'NVDA',
      ticker: 'NYSE: NVDA',
      price: '$ 2,110.2',
      change: '+2.12%',
      isPositive: true,
      logoBg: 'bg-[#76B900]/15 text-[#76B900]',
      logoChar: 'N'
    }
  ];

  // My Portfolio 2x2 Mini Cards matching screenshot
  const portfolioGridItems = [
    {
      id: 'aapl',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '$ 1,721.3',
      change: '+12.31 (0.7%)',
      units: 'Units 104',
      iconChar: '',
      iconBg: 'bg-white/10 text-white'
    },
    {
      id: 'amzn-p',
      symbol: 'AMZN',
      name: 'Amazon.com',
      price: '$ 1,721.3',
      change: '+12.31 (0.7%)',
      units: 'Units 12',
      iconChar: 'a',
      iconBg: 'bg-[#FF9900]/15 text-[#FF9900]'
    },
    {
      id: 'msft-p',
      symbol: 'MSFT',
      name: 'Microsoft',
      price: '$ 1,721.3',
      change: '+12.31 (0.7%)',
      units: 'Units 41',
      iconChar: '田',
      iconBg: 'bg-[#00A4EF]/15 text-[#00A4EF]'
    },
    {
      id: 'nvda-p',
      symbol: 'NVDA',
      name: 'Nvidia Corp.',
      price: '$ 1,721.3',
      change: '+12.31 (0.7%)',
      units: 'Units 16',
      iconChar: 'N',
      iconBg: 'bg-[#76B900]/15 text-[#76B900]'
    }
  ];

  // Performance Chart Data matching undulating smooth curve in screenshot
  const performanceChartData = useMemo(() => {
    return [
      { month: 'Jan', value: 165, display: '$ 165k' },
      { month: 'Feb', value: 130, display: '$ 130k' },
      { month: 'Mar', value: 142, display: '$ 142k' },
      { month: 'Apr', value: 125, display: '$ 125k' },
      { month: 'May', value: 138, display: '$ 138k' },
      { month: 'Jun', value: 165, display: '$ 165k', peak: true, tooltipDate: '1st Jun 2025', tooltipVal: '$ 16,500', tooltipChange: '+35%' },
      { month: 'Jul', value: 128, display: '$ 128k' },
      { month: 'Aug', value: 132, display: '$ 132k' },
      { month: 'Sep', value: 95, display: '$ 95k' },
      { month: 'Oct', value: 110, display: '$ 110k' },
      { month: 'Nov', value: 85, display: '$ 85k' },
      { month: 'Dec', value: 92, display: '$ 92k' }
    ];
  }, [chartTimeframe]);

  // Market share pie data dynamically colored with active theme
  const marketShareData = [
    { name: business.name, value: competitorAnalysis.userMarketShare, color: activeTheme.primaryColor },
    ...competitorAnalysis.competitors.map((c, i) => {
      const colors = [activeTheme.secondaryColor, '#10B981', '#F59E0B', '#EC4899'];
      return {
        name: c.name,
        value: c.marketShare,
        color: colors[i % colors.length]
      };
    })
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* =========================================================================
          TOP FILTER PILLS BAR (Market | Wallet | Tools)
          ========================================================================= */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'market'
                ? 'helios-pill-active'
                : 'helios-pill'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'wallet'
                ? 'helios-pill-active'
                : 'helios-pill'
            }`}
          >
            Wallet
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'tools'
                ? 'helios-pill-active'
                : 'helios-pill'
            }`}
          >
            Tools
          </button>
        </div>

        {/* Quick Simulation Trigger Pill */}
        <div className="flex items-center gap-2.5">
          <NavLink
            to="/pricing-simulator"
            className="helios-pill px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#E087B7]" />
            <span>Price Lab</span>
          </NavLink>

          <button
            onClick={() => setShowDeepAnalytics(!showDeepAnalytics)}
            className="helios-pill px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showDeepAnalytics ? 'Hide Extended Metrics' : 'Extended Enterprise Metrics'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDeepAnalytics ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          ROW 1: 3-COLUMN CARDS GRID (Exact Replica of Uploaded Image)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* -------------------------------------------------------------
            COLUMN 1 (Left): Total Holding + "Decisions Powered by Data"
            ------------------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
          {/* Card 1: Total Holding */}
          <div className="helios-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white tracking-tight">
                Total Holding
              </span>
              <button
                onClick={() => setHoldingTimeframe(holdingTimeframe === '6M' ? '1Y' : '6M')}
                className="helios-pill px-3 py-1 text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>{holdingTimeframe}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-2">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                $ 12,304.11
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-zinc-400 font-medium">
                  Treasury Cash: <strong className="text-white">{formatCurrency(business.currentCash)}</strong>
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
                  <ArrowUp className="w-3 h-3" /> +14.8%
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Decisions Powered by Data (Signature Radiant AI Card) */}
          <div className="helios-ai-glow-card p-6 flex flex-col justify-between relative overflow-hidden min-h-[220px]">
            {/* Radiant Bottom Mauve Bloom Light Beam */}
            <div className="helios-ai-beam" />

            <div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Decisions Powered by Data
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                Move beyond guesswork with AI-driven investment insights tailored to your strategy.
              </p>
            </div>

            {/* Glowing Action Button */}
            <div className="mt-6 pt-2 flex justify-center relative z-10">
              <NavLink
                to="/advisor"
                className="helios-btn-glow px-7 py-2.5 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore AI Insights</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            COLUMN 2 (Center): Watchlist
            ------------------------------------------------------------- */}
        <div className="lg:col-span-4 helios-card p-6 flex flex-col justify-between">
          <div>
            {/* Watchlist Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white tracking-tight">
                Watchlist
              </h3>
            </div>

            {/* Pill Filter Group */}
            <div className="flex items-center gap-1.5 mb-5 p-1 bg-[#121118] rounded-full border border-white/[0.06] w-fit">
              <button
                onClick={() => setWatchlistFilter('most-viewed')}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  watchlistFilter === 'most-viewed'
                    ? 'helios-pill-active'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Most Viewed
              </button>
              <button
                onClick={() => setWatchlistFilter('gain')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  watchlistFilter === 'gain'
                    ? 'helios-pill-active'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Gain
              </button>
              <button
                onClick={() => setWatchlistFilter('lose')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  watchlistFilter === 'lose'
                    ? 'helios-pill-active'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Lose
              </button>
            </div>

            {/* Ticker List */}
            <div className="space-y-4">
              {watchlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-1 group hover:bg-white/[0.02] rounded-xl px-1.5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${item.logoBg} flex items-center justify-center font-bold text-xs`}>
                      {item.logoChar}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-[#E087B7] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono block">
                        {item.ticker}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-white font-mono block">
                      {item.price}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 block">
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            COLUMN 3 (Right): My Portfolio (2x2 Grid of Mini Cards)
            ------------------------------------------------------------- */}
        <div className="lg:col-span-4 helios-card p-6 flex flex-col justify-between">
          <div>
            {/* Header with "See all ↗" */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white tracking-tight">
                My Portfolio
              </h3>
              <NavLink
                to="/products"
                className="helios-pill px-3.5 py-1 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-all"
              >
                <span>See all</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </NavLink>
            </div>

            {/* 2x2 Grid of Mini Asset Cards */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {portfolioGridItems.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-[#14131C] border border-white/[0.07] rounded-2xl p-4 flex flex-col justify-between hover:border-[#E087B7]/40 transition-all cursor-pointer group"
                >
                  <div>
                    <span className="text-xs font-extrabold text-white font-mono block group-hover:text-[#E087B7] transition-colors">
                      {asset.price}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                      {asset.change}
                    </span>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] text-zinc-400">
                      {asset.iconChar}
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">
                      {asset.units}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: PORTFOLIO PERFORMANCE (Full Width Undulating Mauve Chart)
          ========================================================================= */}
      <div className="helios-card p-6 lg:p-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Portfolio Performance
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Cumulative financial trajectory & capital compounding
            </p>
          </div>

          {/* Timeframe Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#13121A] rounded-full border border-white/[0.07]">
            {['1D', '1W', '1M', '6M', '1Y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setChartTimeframe(tf)}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  chartTimeframe === tf
                    ? 'helios-pill-active'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Canvas with Floating Tooltip Pin matching screenshot */}
        <div className="h-72 w-full relative">
          {/* Floating Highlight Pin Tooltip from Screenshot */}
          <div className="absolute left-[48%] top-[14%] z-20 pointer-events-none transform -translate-x-1/2 flex flex-col items-center">
            <div className="bg-[#181723]/95 border border-white/10 rounded-xl px-3.5 py-2 shadow-2xl backdrop-blur-md text-center">
              <span className="text-[10px] text-zinc-400 block font-medium">1st Jun 2025</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-extrabold text-white font-mono">$ 16,500</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded">
                  +35%
                </span>
              </div>
            </div>
            {/* Glowing Pin Dot */}
            <div className="w-3 h-3 rounded-full bg-[#E087B7] shadow-[0_0_12px_#E087B7] ring-4 ring-[#E087B7]/30 mt-1" />
            {/* Vertical Dashed Marker Line */}
            <div className="w-px h-32 border-l border-dashed border-[#E087B7]/40 mt-1" />
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceChartData} margin={{ top: 15, right: 15, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="heliosArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E087B7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#E087B7" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#232230" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}k`}
                ticks={[10, 50, 100, 150, 200]}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#181723', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val) => [`$${val * 100}`, 'Valuation']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#E087B7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#heliosArea)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =========================================================================
          EXTENDABLE ENTERPRISE SIMULATION ENGINE METRICS
          ========================================================================= */}
      {showDeepAnalytics && (
        <div className="space-y-6 pt-4 border-t border-white/[0.08] animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E087B7]" />
                Full Enterprise Simulation Analytics & Health Radar
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Deterministic microeconomic calculations across revenue, unit demand, and competitor threat indices.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Health: {risks.businessHealthScore}/100
            </span>
          </div>

          {/* 8 Primary KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Total Monthly Revenue"
              value={formatCurrency(financials.totalRevenue)}
              subvalue={`${financials.totalUnitsSold} units`}
              change="+14.2% vs baseline"
              isPositive={true}
              icon={DollarSign}
              accentColor="brand"
              tooltip="Gross revenue from current active SKU sales"
            />

            <MetricCard
              title="Total Expenses"
              value={formatCurrency(financials.totalExpenses)}
              subvalue="COGS + OpEx"
              change={`${formatCurrency(financials.totalOperatingExpenses)} OpEx`}
              isPositive={null}
              icon={TrendingUp}
              accentColor="amber"
              tooltip="Direct product costs + fixed overhead + marketing"
            />

            <MetricCard
              title="Net Profit"
              value={formatCurrency(financials.netProfit)}
              subvalue={`Runway: ${financials.runwayMonths} mo`}
              change={financials.netProfit >= 0 ? '+Healthy Cash Flow' : '-Cash Drain'}
              isPositive={financials.netProfit >= 0}
              icon={Percent}
              accentColor={financials.netProfit >= 0 ? 'emerald' : 'rose'}
              tooltip="Net earnings after all expenses and overheads"
            />

            <MetricCard
              title="Profit Margin"
              value={`${financials.netProfitMargin}%`}
              subvalue={`Gross: ${financials.grossMargin}%`}
              change={financials.netProfitMargin > 15 ? 'Above Market Average' : 'Moderate Cushion'}
              isPositive={financials.netProfitMargin >= 10}
              icon={Activity}
              accentColor="cyan"
              tooltip="Net profit percentage of gross revenue"
            />

            <MetricCard
              title="Customer Demand"
              value={`${demand.totalDemandUnits} units`}
              subvalue={`Fulfillment: ${Math.round((financials.totalUnitsSold / demand.totalDemandUnits) * 100)}%`}
              change={`Marketing Eff: ${demand.marketingMultiplier}x`}
              isPositive={true}
              icon={Users}
              accentColor="brand"
              tooltip="Simulated aggregate buyer monthly demand volume"
            />

            <MetricCard
              title="Market Share"
              value={`${competitorAnalysis.userMarketShare}%`}
              subvalue="Rank #3 in Area"
              change={`Threat: ${competitorAnalysis.threatLevel}`}
              isPositive={competitorAnalysis.userMarketShare > 15}
              icon={PieIcon}
              accentColor="cyan"
              tooltip="Relative share of total category consumer volume"
            />

            <MetricCard
              title="Inventory Status"
              value={`${inventory.totalStockUnits} units`}
              subvalue={formatCurrency(inventory.totalCostValue)}
              change={inventory.outOfStockCount > 0 ? `${inventory.outOfStockCount} Out of Stock!` : `${inventory.lowStockCount} Low Stock`}
              isPositive={inventory.outOfStockCount === 0}
              icon={Boxes}
              accentColor={inventory.outOfStockCount > 0 ? 'rose' : 'emerald'}
              tooltip="Active inventory units and wholesale capital value"
            />

            <MetricCard
              title="Business Health Score"
              value={`${risks.businessHealthScore}/100`}
              subvalue={risks.overallSeverity}
              change={risks.businessHealthScore >= 75 ? 'Low Risk Tier' : 'Elevated Risk'}
              isPositive={risks.businessHealthScore >= 75}
              icon={ShieldCheck}
              accentColor={risks.businessHealthScore >= 75 ? 'emerald' : 'amber'}
              tooltip="Composite algorithmic enterprise vitality rating"
            />
          </div>

          {/* Charts Row: Customer Demand vs Fulfillment & Market Share */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 helios-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white">Customer Demand vs Fulfillment</h4>
                <NavLink to="/customer-demand" className="text-xs text-[#E087B7] hover:underline font-semibold">
                  Demand Lab
                </NavLink>
              </div>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demand.productDemands} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#232230" vertical={false} />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
                    <YAxis stroke="#6B7280" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#181723', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                    <Bar dataKey="predictedUnits" name="Demand (Units)" fill="#E087B7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="stock" name="Stock Available" fill="#A855F7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 helios-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white">Market Share Distribution</h4>
                <NavLink to="/competitors" className="text-xs text-cyan-400 hover:underline font-semibold">
                  Competitors
                </NavLink>
              </div>
              <div className="h-60 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#181723', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center pointer-events-none">
                  <span className="text-2xl font-extrabold text-white">{competitorAnalysis.userMarketShare}%</span>
                  <span className="text-[10px] text-zinc-400 block font-semibold">Your Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
