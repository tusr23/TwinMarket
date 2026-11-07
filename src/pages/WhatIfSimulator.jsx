import React, { useState, useMemo } from 'react';
import {
  Sliders,
  TrendingUp,
  Percent,
  DollarSign,
  Boxes,
  Users,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Play
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
import { runFullSimulationCycle } from '../simulation/simulationManager.js';

export default function WhatIfSimulator() {
  const { business, simulation, formatCurrency, updateBusinessSettings, triggerSimulationRun } = useBusiness();

  // Multi-variable Sandbox Sliders
  const [priceDeltaPct, setPriceDeltaPct] = useState(0);       // -30% to +30%
  const [marketingDeltaPct, setMarketingDeltaPct] = useState(0); // -50% to +100%
  const [stockDeltaUnits, setStockDeltaUnits] = useState(0);     // -50 to +150 units
  const [fixedCostDeltaPct, setFixedCostDeltaPct] = useState(0); // -20% to +50%

  // Compute what happens under these adjustments
  const whatIfOutcome = useMemo(() => {
    // Clone business
    const modifiedBiz = {
      ...business,
      monthlyMarketingSpend: Math.max(5000, Math.round(business.monthlyMarketingSpend * (1 + marketingDeltaPct / 100))),
      monthlyFixedOverhead: Math.max(10000, Math.round(business.monthlyFixedOverhead * (1 + fixedCostDeltaPct / 100))),
      products: business.products.map((p) => {
        const newSellingPrice = Math.max(p.costPrice * 1.05, Math.round(p.sellingPrice * (1 + priceDeltaPct / 100)));
        const newStock = Math.max(0, p.stock + Math.round(stockDeltaUnits / business.products.length));
        return {
          ...p,
          sellingPrice: newSellingPrice,
          stock: newStock
        };
      })
    };

    return runFullSimulationCycle(modifiedBiz);
  }, [business, priceDeltaPct, marketingDeltaPct, stockDeltaUnits, fixedCostDeltaPct]);

  const handleResetSliders = () => {
    setPriceDeltaPct(0);
    setMarketingDeltaPct(0);
    setStockDeltaUnits(0);
    setFixedCostDeltaPct(0);
  };

  const handleCommitWhatIf = () => {
    updateBusinessSettings({
      monthlyMarketingSpend: whatIfOutcome.business.monthlyMarketingSpend,
      monthlyFixedOverhead: whatIfOutcome.business.monthlyFixedOverhead,
      products: whatIfOutcome.business.products
    });
    triggerSimulationRun(`Applied What-If Multi-Variable Calibration (Price ${priceDeltaPct}%, Marketing ${marketingDeltaPct}%)`);
    handleResetSliders();
  };

  const baselineFin = simulation.financials;
  const simFin = whatIfOutcome.financials;
  const baselineHealth = simulation.risks.businessHealthScore;
  const simHealth = whatIfOutcome.risks.businessHealthScore;

  const comparisonChartData = [
    {
      metric: 'Revenue (₹k)',
      Baseline: Math.round(baselineFin.totalRevenue / 1000),
      'What-If Scenario': Math.round(simFin.totalRevenue / 1000)
    },
    {
      metric: 'Expenses (₹k)',
      Baseline: Math.round(baselineFin.totalExpenses / 1000),
      'What-If Scenario': Math.round(simFin.totalExpenses / 1000)
    },
    {
      metric: 'Net Profit (₹k)',
      Baseline: Math.round(baselineFin.netProfit / 1000),
      'What-If Scenario': Math.round(simFin.netProfit / 1000)
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Sliders className="w-4 h-4" />
            <span>Multi-Variable Decision Sandbox</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            What-If Business Simulator
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Test hypothetical combinations of pricing, marketing investments, warehouse inventory capacity, and operating overheads side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetSliders}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold neu-btn text-slate-300 flex items-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Sliders
          </button>
          <button
            onClick={handleCommitWhatIf}
            className="neu-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <Play className="w-4 h-4" />
            Commit To Live Business
          </button>
        </div>
      </div>

      {/* Sliders Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders Panel (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-cyanAccent-400" />
            Decision Variables
          </h3>

          {/* 1. Price Delta */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Across-the-Board Price Adjustment:</span>
              <span className={`font-mono font-bold ${priceDeltaPct > 0 ? 'text-cyanAccent-400' : priceDeltaPct < 0 ? 'text-amber-400' : 'text-white'}`}>
                {priceDeltaPct > 0 ? `+${priceDeltaPct}%` : `${priceDeltaPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              step="1"
              value={priceDeltaPct}
              onChange={(e) => setPriceDeltaPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-25% (Heavy Discount)</span>
              <span>0% (Parity)</span>
              <span>+25% (Premium)</span>
            </div>
          </div>

          {/* 2. Marketing Delta */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Marketing Ad Budget Adjustment:</span>
              <span className={`font-mono font-bold ${marketingDeltaPct > 0 ? 'text-brand-400' : marketingDeltaPct < 0 ? 'text-amber-400' : 'text-white'}`}>
                {marketingDeltaPct > 0 ? `+${marketingDeltaPct}%` : `${marketingDeltaPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="100"
              step="5"
              value={marketingDeltaPct}
              onChange={(e) => setMarketingDeltaPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-50% (Lean Budget)</span>
              <span>Baseline</span>
              <span>+100% (Scale Blitz)</span>
            </div>
          </div>

          {/* 3. Inventory Stock Delta */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Warehouse Buffer Stock Units:</span>
              <span className={`font-mono font-bold ${stockDeltaUnits > 0 ? 'text-emerald-400' : stockDeltaUnits < 0 ? 'text-rose-400' : 'text-white'}`}>
                {stockDeltaUnits > 0 ? `+${stockDeltaUnits} units` : `${stockDeltaUnits} units`}
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="150"
              step="10"
              value={stockDeltaUnits}
              onChange={(e) => setStockDeltaUnits(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-50 Units (Lean)</span>
              <span>Baseline Buffer</span>
              <span>+150 Units (High Capacity)</span>
            </div>
          </div>

          {/* 4. Overhead Delta */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Fixed Overhead Cost Calibration:</span>
              <span className="font-mono font-bold text-white">
                {fixedCostDeltaPct > 0 ? `+${fixedCostDeltaPct}%` : `${fixedCostDeltaPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              step="5"
              value={fixedCostDeltaPct}
              onChange={(e) => setFixedCostDeltaPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-20% (Austerity)</span>
              <span>Standard Rent/Payroll</span>
              <span>+50% (Expansion)</span>
            </div>
          </div>
        </div>

        {/* Projected Impact Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Side-by-Side Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Baseline */}
            <div className="glass-card rounded-2xl p-5 border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block pb-2 border-b border-slate-800 mb-3">
                Baseline Operations
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Revenue:</span>
                  <span className="font-bold text-white">{formatCurrency(baselineFin.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Expenses:</span>
                  <span className="font-bold text-slate-300">{formatCurrency(baselineFin.totalExpenses)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Profit:</span>
                  <span className={`font-extrabold ${baselineFin.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatCurrency(baselineFin.netProfit)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Profit Margin:</span>
                  <span className="font-bold text-brand-300">{baselineFin.netProfitMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Health Score:</span>
                  <span className="font-bold text-cyanAccent-400">{baselineHealth}/100</span>
                </div>
              </div>
            </div>

            {/* Simulated What-If */}
            <div className="glass-card rounded-2xl p-5 border-white/30 bg-[var(--bg-card)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyanAccent-400 block pb-2 border-b border-slate-800 mb-3">
                Simulated What-If Outcome
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monthly Revenue:</span>
                  <div className="text-right">
                    <span className="font-bold text-white">{formatCurrency(simFin.totalRevenue)}</span>
                    <span className={`text-[11px] ml-1 font-semibold ${simFin.totalRevenue >= baselineFin.totalRevenue ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({simFin.totalRevenue >= baselineFin.totalRevenue ? '+' : ''}{formatCurrency(simFin.totalRevenue - baselineFin.totalRevenue)})
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Expenses:</span>
                  <span className="font-bold text-slate-300">{formatCurrency(simFin.totalExpenses)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Profit:</span>
                  <div className="text-right">
                    <span className={`font-extrabold ${simFin.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatCurrency(simFin.netProfit)}
                    </span>
                    <span className={`text-[11px] ml-1 font-semibold ${simFin.netProfit >= baselineFin.netProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({simFin.netProfit >= baselineFin.netProfit ? '+' : ''}{formatCurrency(simFin.netProfit - baselineFin.netProfit)})
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Profit Margin:</span>
                  <span className="font-bold text-cyanAccent-400">{simFin.netProfitMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Health Score:</span>
                  <span className={`font-bold ${simHealth >= baselineHealth ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {simHealth}/100 ({simHealth >= baselineHealth ? `+${simHealth - baselineHealth}` : simHealth - baselineHealth})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="glass-card rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-3">
              Baseline vs Proposed Decision Package
            </h4>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4D5A8F40" vertical={false} />
                  <XAxis dataKey="metric" stroke="#8F9DCC" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8F9DCC" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Baseline" fill="#6D7CB0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="What-If Scenario" fill="#8F9DCC" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

