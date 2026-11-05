import React, { useState } from 'react';
import {
  PieChart as PieIcon,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  Sparkles,
  Layers,
  Scale
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
import { STRATEGIES } from '../simulation/defaultData.js';

export default function StrategyComparison() {
  const { business, simulation, formatCurrency, updateBusinessSettings, triggerSimulationRun } = useBusiness();
  const currentStrategyId = business.strategy || 'balanced';

  const baseRev = simulation.financials.totalRevenue || 1000000;
  const baseProfit = simulation.financials.netProfit || 150000;

  // Comparison projections for all 3 strategies
  const strategyData = [
    {
      id: 'aggressive',
      title: 'Aggressive Growth',
      tagline: 'High Volume & Rapid Market Share Expansion',
      expectedShare: '24.5%',
      marginProfile: '12.8%',
      cashNeed: 'High Working Capital',
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
      activeColor: 'border-cyan-400 bg-cyan-900/40 ring-1 ring-cyan-400',
      proj3m: { rev: Math.round(baseRev * 1.28), profit: Math.round(baseProfit * 0.95), share: 19 },
      proj6m: { rev: Math.round(baseRev * 1.55), profit: Math.round(baseProfit * 1.25), share: 23 },
      proj12m: { rev: Math.round(baseRev * 2.10), profit: Math.round(baseProfit * 1.80), share: 28 },
      rules: [
        'Discount prices by -5% to -8% below market benchmark',
        'Ramp marketing investment by +40%',
        'Tolerate compressed initial margin for rapid customer acquisition',
        'Risk: Rival retaliation and severe cash burn'
      ]
    },
    {
      id: 'balanced',
      title: 'Balanced Strategy',
      tagline: 'Optimal Enterprise Health & Sustainable Profitability',
      expectedShare: '17.2%',
      marginProfile: '19.4%',
      cashNeed: 'Self-Funded Organic',
      color: 'border-brand-500/40 bg-brand-950/20 text-brand-300',
      activeColor: 'border-brand-400 bg-brand-900/40 ring-1 ring-brand-400',
      proj3m: { rev: Math.round(baseRev * 1.10), profit: Math.round(baseProfit * 1.12), share: 15 },
      proj6m: { rev: Math.round(baseRev * 1.25), profit: Math.round(baseProfit * 1.30), share: 17 },
      proj12m: { rev: Math.round(baseRev * 1.50), profit: Math.round(baseProfit * 1.65), share: 20 },
      rules: [
        'Maintain parity pricing with dominant competitors',
        'Steady 5-6% marketing investment to protect catchment area',
        'Balanced inventory buffers with minimal dead-stock risk',
        'Recommended default for long-term compounding stability'
      ]
    },
    {
      id: 'max-profit',
      title: 'Maximum Profit Strategy',
      tagline: 'Premium Margins & Selective High-Value Clientele',
      expectedShare: '11.8%',
      marginProfile: '31.5%',
      cashNeed: 'Ultra Lean Operations',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
      activeColor: 'border-emerald-400 bg-emerald-900/40 ring-1 ring-emerald-400',
      proj3m: { rev: Math.round(baseRev * 0.94), profit: Math.round(baseProfit * 1.38), share: 13 },
      proj6m: { rev: Math.round(baseRev * 1.05), profit: Math.round(baseProfit * 1.62), share: 12 },
      proj12m: { rev: Math.round(baseRev * 1.20), profit: Math.round(baseProfit * 2.10), share: 12 },
      rules: [
        'Premium markup (+8% to +12%) backed by white-glove warranty',
        'Target price-inelastic brand loyalists and enterprise buyers',
        'Lean overheads and strict inventory carrying limits',
        'Risk: Slower customer acquisition and vulnerability to price wars'
      ]
    }
  ];

  const handleActivateStrategy = (stratId) => {
    updateBusinessSettings({
      strategy: stratId,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          title: 'Strategic Directive Shift',
          detail: `Activated ${stratId.toUpperCase()} strategy roadmap across operations.`,
          type: 'strategy',
          impact: 'Strategic Shift'
        },
        ...business.activityLog
      ]
    });
    triggerSimulationRun(`Activated ${stratId} operating blueprint`);
  };

  // Chart data for 12-Month Projections
  const chartData = [
    {
      timeline: '3 Months',
      'Aggressive Growth': strategyData[0].proj3m.profit,
      'Balanced Strategy': strategyData[1].proj3m.profit,
      'Max Profit': strategyData[2].proj3m.profit
    },
    {
      timeline: '6 Months',
      'Aggressive Growth': strategyData[0].proj6m.profit,
      'Balanced Strategy': strategyData[1].proj6m.profit,
      'Max Profit': strategyData[2].proj6m.profit
    },
    {
      timeline: '12 Months',
      'Aggressive Growth': strategyData[0].proj12m.profit,
      'Balanced Strategy': strategyData[1].proj12m.profit,
      'Max Profit': strategyData[2].proj12m.profit
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Target className="w-4 h-4" />
            <span>Strategic Direction & Growth Trajectories</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Business Strategy Comparison
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Evaluate the mathematical trade-offs between rapid market conquest, steady balanced enterprise compounding, and ultra-high-margin cash extraction.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl neu-inset flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Currently Active:</span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase tracking-wider">
            {currentStrategyId} Strategy
          </span>
        </div>
      </div>

      {/* 3 Strategy Pillar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {strategyData.map((strat) => {
          const isActive = currentStrategyId === strat.id;

          return (
            <div
              key={strat.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                isActive ? strat.activeColor : 'glass-card hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200">
                    {strat.title}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {strat.tagline}
                </p>

                {/* Metrics Breakdown */}
                <div className="space-y-3 text-xs mb-6 p-4 rounded-2xl neu-inset">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Market Share:</span>
                    <span className="font-bold text-white">{strat.expectedShare}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Net Margin:</span>
                    <span className="font-bold text-cyanAccent-400">{strat.marginProfile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capital Requirement:</span>
                    <span className="font-semibold text-slate-200">{strat.cashNeed}</span>
                  </div>
                </div>

                {/* Operating Rules */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Operating Playbook:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {strat.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-brand-400 shrink-0 font-bold">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleActivateStrategy(strat.id)}
                  disabled={isActive}
                  className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'neu-inset text-slate-400 cursor-default font-medium'
                      : 'neu-btn-primary text-white active:scale-98'
                  }`}
                >
                  {isActive ? 'Strategy Currently Active' : `Activate ${strat.title}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Projected Earnings Chart */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1">
          Comparative Cumulative Net Profit Projections
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Comparing projected earnings trajectory over 3, 6, and 12-month horizons
        </p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="timeline" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#0F1523', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} formatter={(v) => [formatCurrency(v)]} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Aggressive Growth" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Balanced Strategy" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Max Profit" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

