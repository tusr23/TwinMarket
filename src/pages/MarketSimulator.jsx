import React, { useState, useMemo } from 'react';
import {
  Zap,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Flame,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useBusiness } from '../context/BusinessContext.jsx';
import { MARKET_SCENARIOS } from '../simulation/defaultData.js';
import { runFullSimulationCycle } from '../simulation/simulationManager.js';

export default function MarketSimulator() {
  const {
    business,
    simulation,
    formatCurrency,
    applyMarketScenario,
    clearMarketScenario
  } = useBusiness();

  const [selectedScenarioId, setSelectedScenarioId] = useState(
    business.activeScenarioId || MARKET_SCENARIOS[0].id
  );

  const selectedScenario = MARKET_SCENARIOS.find((s) => s.id === selectedScenarioId) || MARKET_SCENARIOS[0];
  const isScenarioLive = business.activeScenarioId === selectedScenario.id;

  // Compute what would happen under this scenario (isolated test run)
  const simulatedOutcome = useMemo(() => {
    const testBusiness = {
      ...business,
      activeScenarioId: selectedScenario.id
    };
    return runFullSimulationCycle(testBusiness);
  }, [business, selectedScenario]);

  // Baseline outcome (no scenario active)
  const baselineOutcome = useMemo(() => {
    const cleanBusiness = {
      ...business,
      activeScenarioId: null
    };
    return runFullSimulationCycle(cleanBusiness);
  }, [business]);

  // Delta calculations
  const baselineFin = baselineOutcome.financials;
  const simFin = simulatedOutcome.financials;
  const baselineDemand = baselineOutcome.demand.totalDemandUnits;
  const simDemand = simulatedOutcome.demand.totalDemandUnits;
  const baselineShare = baselineOutcome.competitorAnalysis.userMarketShare;
  const simShare = simulatedOutcome.competitorAnalysis.userMarketShare;
  const baselineHealth = baselineOutcome.risks.businessHealthScore;
  const simHealth = simulatedOutcome.risks.businessHealthScore;

  // Comparison chart
  const comparisonData = [
    {
      metric: 'Revenue (₹k)',
      'Baseline Market': Math.round(baselineFin.totalRevenue / 1000),
      'Scenario Impact': Math.round(simFin.totalRevenue / 1000)
    },
    {
      metric: 'Expenses (₹k)',
      'Baseline Market': Math.round(baselineFin.totalExpenses / 1000),
      'Scenario Impact': Math.round(simFin.totalExpenses / 1000)
    },
    {
      metric: 'Net Profit (₹k)',
      'Baseline Market': Math.round(baselineFin.netProfit / 1000),
      'Scenario Impact': Math.round(simFin.netProfit / 1000)
    },
    {
      metric: 'Demand (Units)',
      'Baseline Market': baselineDemand,
      'Scenario Impact': simDemand
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Zap className="w-4 h-4" />
            <span>Macroeconomic Stress Testing & Scenario Engine</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Market Competition Simulator
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Test business resilience against 8 real-world market shocks: price wars, hyper-inflation, recession, supplier delays, and peak festive spikes.
          </p>
        </div>

        {business.activeScenarioId && (
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
              Scenario Active in Live Store
            </span>
            <button
              onClick={clearMarketScenario}
              className="px-3 py-1.5 rounded-xl text-xs font-bold neu-btn text-slate-200 cursor-pointer"
            >
              Clear Live Shock
            </button>
          </div>
        )}
      </div>

      {/* 8 Preset Scenario Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MARKET_SCENARIOS.map((scenario) => {
          const isSelected = selectedScenarioId === scenario.id;
          const isLive = business.activeScenarioId === scenario.id;

          return (
            <div
              key={scenario.id}
              onClick={() => setSelectedScenarioId(scenario.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'neu-inset border-brand-500 shadow-xl'
                  : 'neu-card neu-card-hover'
              }`}
            >
              {isLive && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  LIVE
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded neu-pill text-slate-300">
                  {scenario.severity}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {scenario.durationMonths} Months
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{scenario.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {scenario.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Scenario Impact Analytics */}
      <div className="neu-card rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[var(--border-subtle)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-extrabold text-white">{selectedScenario.title}</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedScenario.severity}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">{selectedScenario.description}</p>
          </div>

          <div className="flex items-center gap-3">
            {isScenarioLive ? (
              <button
                onClick={clearMarketScenario}
                className="px-5 py-2.5 rounded-xl text-xs font-bold neu-btn text-white transition-colors cursor-pointer"
              >
                Restore Baseline Market
              </button>
            ) : (
              <button
                onClick={() => applyMarketScenario(selectedScenario.id)}
                className="neu-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Flame className="w-4 h-4" />
                Activate Scenario On Live Business
              </button>
            )}
          </div>
        </div>

        {/* 6 Key Impact Delta Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl neu-inset">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Monthly Revenue</span>
            <span className="text-lg font-bold text-white mt-1 block">{formatCurrency(simFin.totalRevenue)}</span>
            <span className={`text-xs font-semibold ${simFin.totalRevenue >= baselineFin.totalRevenue ? 'text-emerald-400' : 'text-rose-400'}`}>
              {simFin.totalRevenue >= baselineFin.totalRevenue ? '+' : ''}
              {formatCurrency(simFin.totalRevenue - baselineFin.totalRevenue)}
            </span>
          </div>

          <div className="p-4 rounded-xl neu-inset">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Net Profit</span>
            <span className={`text-lg font-bold mt-1 block ${simFin.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {formatCurrency(simFin.netProfit)}
            </span>
            <span className={`text-xs font-semibold ${simFin.netProfit >= baselineFin.netProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
              {simFin.netProfit >= baselineFin.netProfit ? '+' : ''}
              {formatCurrency(simFin.netProfit - baselineFin.netProfit)}
            </span>
          </div>

          <div className="p-4 rounded-xl neu-inset">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Customer Demand</span>
            <span className="text-lg font-bold text-cyanAccent-400 mt-1 block">{simDemand} units</span>
            <span className={`text-xs font-semibold ${simDemand >= baselineDemand ? 'text-emerald-400' : 'text-rose-400'}`}>
              {simDemand >= baselineDemand ? '+' : ''}{simDemand - baselineDemand} units
            </span>
          </div>

          <div className="p-4 rounded-xl neu-inset">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Market Share</span>
            <span className="text-lg font-bold text-white mt-1 block">{simShare}%</span>
            <span className={`text-xs font-semibold ${simShare >= baselineShare ? 'text-emerald-400' : 'text-rose-400'}`}>
              {simShare >= baselineShare ? '+' : ''}{(simShare - baselineShare).toFixed(1)}%
            </span>
          </div>

          <div className="p-4 rounded-xl neu-inset">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Stock Buffer</span>
            <span className="text-lg font-bold text-white mt-1 block">{simulatedOutcome.inventory.totalStockUnits}</span>
            <span className="text-xs text-slate-400">Inventory Units</span>
          </div>

          <div className="p-4 rounded-xl neu-inset">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Health Score</span>
            <span className={`text-lg font-bold mt-1 block ${simHealth >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {simHealth}/100
            </span>
            <span className={`text-xs font-semibold ${simHealth >= baselineHealth ? 'text-emerald-400' : 'text-rose-400'}`}>
              {simHealth >= baselineHealth ? '+' : ''}{simHealth - baselineHealth} Pts
            </span>
          </div>
        </div>

        {/* Side-by-side Chart */}
        <div>
          <h4 className="text-sm font-bold text-white mb-2">
            Baseline vs Scenario Comparison
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="metric" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F1523', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="Baseline Market" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Scenario Impact" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

