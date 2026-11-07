import React from 'react';
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
  ShieldCheck,
  AlertTriangle
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

  // Market share pie data dynamically colored with active theme
  const marketShareData = [
    { name: business.name, value: competitorAnalysis.userMarketShare, color: activeTheme.primaryColor },
    ...competitorAnalysis.competitors.map((c, i) => {
      const colors = [activeTheme.secondaryColor, '#CED8F2', '#B3C0E6', '#4D5A8F', '#273054'];
      return {
        name: c.name,
        value: c.marketShare,
        color: colors[i % colors.length]
      };
    })
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-3xl neu-card p-5 sm:p-6 lg:p-8 border border-[var(--neu-border)]">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-2.5 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              Autonomous Market Intelligence Active
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Executive Business Overview
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Real-time multi-agent simulation model for <strong className="text-white">{business.name}</strong>. Monitor sales elasticity, inventory buffers, and competitive threat indices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <NavLink
              to="/pricing-simulator"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs text-white neu-btn flex items-center gap-2 transition-all cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-white" />
              Simulate Price
            </NavLink>
            <NavLink
              to="/advisor"
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs neu-btn-primary flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              AI Advisor Chat
            </NavLink>
          </div>
        </div>
      </div>

      {/* 8 Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
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
          subvalue={`COGS + OpEx`}
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

      {/* AI Real-Time Insights Ribbon */}
      {advisorInsights.length > 0 && (
        <div className="glass-card rounded-2xl p-6 border-brand-500/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <h3 className="text-base font-bold text-white">AI-Generated Business Intelligence Insights</h3>
            </div>
            <NavLink to="/advisor" className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1">
              Open Full AI Advisor <ChevronRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advisorInsights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-4 rounded-xl neu-inset flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {insight.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{insight.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{insight.message}</p>
                </div>
                <NavLink
                  to={insight.suggestedPath}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyanAccent-400 hover:text-cyan-300 transition-colors"
                >
                  {insight.actionLabel} <ChevronRight className="w-3 h-3" />
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Section Row 1: Revenue Growth & Profit vs Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Growth Trend (8 cols) */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">12-Month Revenue & Profit Trajectory</h3>
              <p className="text-xs text-slate-400 mt-0.5">Historical actuals + forward projected growth</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Net Profit
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financials.financialTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeTheme.primaryColor} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={activeTheme.primaryColor} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeTheme.secondaryColor} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={activeTheme.secondaryColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4D5A8F40" vertical={false} />
                <XAxis dataKey="month" stroke="#8F9DCC" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#8F9DCC"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [formatCurrency(val)]}
                />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke={activeTheme.primaryColor} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke={activeTheme.secondaryColor} strokeWidth={2} fillOpacity={1} fill="url(#colorProf)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Score Gauge (4 cols) */}
        <div className="lg:col-span-4">
          <HealthScoreGauge
            score={risks.businessHealthScore}
            subscores={risks.healthSubscores}
          />
        </div>
      </div>

      {/* Charts Section Row 2: Customer Demand Trend & Market Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customer Demand Trend (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Customer Demand vs Fulfillment Capacity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Estimated buyer volume vs available stock units per SKU</p>
            </div>
            <NavLink to="/customer-demand" className="text-xs text-[#8F9DCC] font-semibold hover:underline">
              Demand Deep Dive
            </NavLink>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demand.productDemands} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4D5A8F40" vertical={false} />
                <XAxis dataKey="name" stroke="#8F9DCC" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#8F9DCC" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="predictedUnits" name="Customer Demand (Units)" fill="#8F9DCC" radius={[6, 6, 0, 0]} />
                <Bar dataKey="stock" name="Stock Available (Units)" fill="#6D7CB0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Share Visualization (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Market Share Breakdown</h3>
              <p className="text-xs text-slate-400 mt-0.5">Competitive market equilibrium (100% pool)</p>
            </div>
            <NavLink to="/competitors" className="text-xs text-[#8F9DCC] font-semibold hover:underline">
              Competitor Radar
            </NavLink>
          </div>

          <div className="h-60 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Market Share']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-2xl font-extrabold text-white">{competitorAnalysis.userMarketShare}%</span>
              <span className="text-[10px] text-slate-400 block font-semibold">Your Share</span>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-800">
            {marketShareData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate max-w-[110px]">{item.name}</span>
                <span className="text-white font-bold ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Recent Business Activities Feed */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-400" />
            <h3 className="text-base font-bold text-white">Recent Business Activities & Simulation Ledger</h3>
          </div>
          <span className="text-xs text-slate-400">Live transaction stream</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {business.activityLog && business.activityLog.slice(0, 5).map((act) => (
            <div key={act.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{act.title}</span>
                    {act.impact && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        {act.impact}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{act.detail}</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 font-mono shrink-0">
                {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

