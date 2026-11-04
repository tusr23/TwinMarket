import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Sliders,
  DollarSign,
  BarChart3,
  Percent,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Sparkles,
  Layers,
  Scale
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { useBusiness } from '../context/BusinessContext.jsx';
import { simulatePricingChange } from '../simulation/pricingEngine.js';
import { UI_THEMES } from '../simulation/defaultData.js';

export default function PricingSimulator() {
  const {
    business,
    simulation,
    formatCurrency,
    updateProductPrice,
    updateProductCost,
    triggerSimulationRun,
    theme
  } = useBusiness();

  const activeTheme = UI_THEMES.find((t) => t.id === theme) || UI_THEMES[0];

  const products = business.products;
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Simulator controls state
  const [newPrice, setNewPrice] = useState(selectedProduct ? selectedProduct.sellingPrice : 10000);
  const [newCost, setNewCost] = useState(selectedProduct ? selectedProduct.costPrice : 7000);
  const [isSimulatingCommit, setIsSimulatingCommit] = useState(false);

  // When selected product changes, reset simulator sliders
  const handleSelectProduct = (prodId) => {
    setSelectedProductId(prodId);
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      setNewPrice(prod.sellingPrice);
      setNewCost(prod.costPrice);
    }
  };

  // Competitor average price for this category
  const competitorAvgPrice = useMemo(() => {
    const comps = simulation.competitorAnalysis?.competitors || [];
    if (!selectedProduct || comps.length === 0) return selectedProduct?.sellingPrice || 10000;
    const avgFactor = comps.reduce((acc, c) => acc + c.priceFactor, 0) / comps.length;
    return Math.round(selectedProduct.costPrice * 1.25 * avgFactor);
  }, [selectedProduct, simulation]);

  // Run simulation engine calculations for Before vs After
  const simulationResult = useMemo(() => {
    if (!selectedProduct) return null;
    return simulatePricingChange({
      product: selectedProduct,
      newSellingPrice: Number(newPrice),
      newCostPrice: Number(newCost),
      competitorAvgPrice,
      categoryElasticity: -1.65,
      marketingBoost: simulation.demand?.marketingMultiplier || 1.0,
      scenarioDemandMultiplier: simulation.activeScenario ? simulation.activeScenario.demandMultiplier : 1.0
    });
  }, [selectedProduct, newPrice, newCost, competitorAvgPrice, simulation]);

  const handleApplyToLiveBusiness = () => {
    setIsSimulatingCommit(true);
    setTimeout(() => {
      updateProductPrice(selectedProduct.id, Number(newPrice));
      if (Number(newCost) !== selectedProduct.costPrice) {
        updateProductCost(selectedProduct.id, Number(newCost));
      }
      triggerSimulationRun(`Applied pricing calibration to ${selectedProduct.name} (${formatCurrency(newPrice)})`);
      setIsSimulatingCommit(false);
    }, 500);
  };

  if (!selectedProduct || !simulationResult) {
    return <div className="p-8 text-center text-slate-400">Loading Pricing Engine...</div>;
  }

  const { before, after, delta, elasticityCurve, verdict, reasoning } = simulationResult;

  // Comparison Bar Chart data
  const comparisonChartData = [
    {
      metric: 'Demand (Units)',
      'Current (Before)': before.estimatedDemand,
      'Simulated (After)': after.estimatedDemand
    },
    {
      metric: 'Gross Revenue (₹k)',
      'Current (Before)': Math.round(before.grossRevenue / 1000),
      'Simulated (After)': Math.round(after.grossRevenue / 1000)
    },
    {
      metric: 'Expenses (₹k)',
      'Current (Before)': Math.round(before.totalCostOfGoodsSold / 1000),
      'Simulated (After)': Math.round(after.totalCostOfGoodsSold / 1000)
    },
    {
      metric: 'Net Profit (₹k)',
      'Current (Before)': Math.round(before.netProfit / 1000),
      'Simulated (After)': Math.round(after.netProfit / 1000)
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>AI Price Elasticity & Margin Laboratory</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            AI Product Pricing Simulator
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Test pricing hypotheses in real-time. Our microeconomic simulation calculates expected demand shifts, cross-competitor poaching, and unit gross margins.
          </p>
        </div>

        {/* Product Selector Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="text-xs font-semibold text-slate-300">Select Product:</label>
          <select
            value={selectedProductId}
            onChange={(e) => handleSelectProduct(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-4 py-2.5 font-medium focus:ring-1 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({formatCurrency(p.sellingPrice)})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Simulator Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Sliders & Controls (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyanAccent-400" />
              Pricing Controls
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30 font-medium">
              {selectedProduct.category}
            </span>
          </div>

          {/* New Selling Price Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">New Proposed Selling Price</span>
              <span className="font-mono text-base font-extrabold text-cyanAccent-400">
                {formatCurrency(newPrice)}
              </span>
            </div>
            <input
              type="range"
              min={Math.round(selectedProduct.costPrice * 0.9)}
              max={Math.round(selectedProduct.sellingPrice * 2)}
              step="100"
              value={newPrice}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Min: {formatCurrency(Math.round(selectedProduct.costPrice * 0.9))}</span>
              <span>Baseline: {formatCurrency(selectedProduct.sellingPrice)}</span>
              <span>Max: {formatCurrency(Math.round(selectedProduct.sellingPrice * 2))}</span>
            </div>
          </div>

          {/* Purchase Cost Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Wholesale Purchase Cost (Per Unit)
            </label>
            <div className="relative">
              <input
                type="number"
                value={newCost}
                onChange={(e) => setNewCost(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
              />
            </div>
          </div>

          {/* Unit Economics Snapshot */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Unit Contribution Margin:</span>
              <span className="font-semibold text-white">{formatCurrency(newPrice - newCost)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Unit Gross Margin %:</span>
              <span className="font-semibold text-brand-300">
                {newPrice > 0 ? (((newPrice - newCost) / newPrice) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Market Price Competitiveness:</span>
              <span className={`font-semibold ${after.competitiveness.color}`}>
                {after.competitiveness.status} ({after.competitiveness.score}/100)
              </span>
            </div>
          </div>

          {/* AI Verdict Box */}
          <div className={`p-4 rounded-xl border ${
            verdict.includes('Strongly') ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' :
            verdict.includes('Cautiously') ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-300' :
            'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}>
            <div className="flex items-center gap-2 mb-1.5 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Simulation Verdict: {verdict}
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{reasoning}</p>
          </div>

          {/* Run Market Simulation Button */}
          <button
            onClick={handleApplyToLiveBusiness}
            disabled={isSimulatingCommit}
            className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-brand-600 via-brand-500 to-cyanAccent-400 hover:opacity-95 shadow-xl shadow-brand-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className={`w-4 h-4 fill-current ${isSimulatingCommit ? 'animate-spin' : ''}`} />
            {isSimulatingCommit ? 'COMMITTING TO MARKET ENGINE...' : 'RUN MARKET SIMULATION & APPLY'}
          </button>
        </div>

        {/* Right Column: BEFORE vs AFTER Comparative Analytics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* BEFORE Card */}
            <div className="glass-card rounded-2xl p-5 border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current (Before Change)
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {formatCurrency(before.sellingPrice)}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Demand:</span>
                  <span className="font-bold text-white">{before.estimatedDemand} units/mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Realized Sales:</span>
                  <span className="font-bold text-white">{before.salesVolume} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Revenue:</span>
                  <span className="font-bold text-white">{formatCurrency(before.grossRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Expenses:</span>
                  <span className="font-bold text-slate-300">{formatCurrency(before.totalCostOfGoodsSold + before.allocatedFixedCost)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-300 font-semibold">Estimated Net Profit:</span>
                  <span className="font-extrabold text-white">{formatCurrency(before.netProfit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Profit Margin:</span>
                  <span className="font-bold text-brand-300">{before.profitMargin}%</span>
                </div>
              </div>
            </div>

            {/* AFTER Card */}
            <div className="glass-card rounded-2xl p-5 border-cyan-500/40 bg-gradient-to-br from-[#0F1523] to-[#121B32]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyanAccent-400">
                  Simulated (After Change)
                </span>
                <span className="text-xs font-mono font-bold text-cyanAccent-400">
                  {formatCurrency(after.sellingPrice)}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Demand:</span>
                  <div className="text-right">
                    <span className="font-bold text-white">{after.estimatedDemand} units</span>
                    <span className={`text-[11px] ml-1.5 font-semibold ${delta.demandDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({delta.demandPct > 0 ? '+' : ''}{delta.demandPct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Realized Sales:</span>
                  <span className="font-bold text-white">{after.salesVolume} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Revenue:</span>
                  <div className="text-right">
                    <span className="font-bold text-white">{formatCurrency(after.grossRevenue)}</span>
                    <span className={`text-[11px] ml-1.5 font-semibold ${delta.revenueDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({delta.revenuePct > 0 ? '+' : ''}{delta.revenuePct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Expenses:</span>
                  <span className="font-bold text-slate-300">{formatCurrency(after.totalCostOfGoodsSold + after.allocatedFixedCost)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-cyan-300 font-semibold">Estimated Net Profit:</span>
                  <div className="text-right">
                    <span className={`font-extrabold ${after.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatCurrency(after.netProfit)}
                    </span>
                    <span className={`text-[11px] ml-1.5 font-semibold ${delta.profitDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({delta.profitDiff > 0 ? '+' : ''}{formatCurrency(delta.profitDiff)})
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Net Profit Margin:</span>
                  <span className="font-bold text-cyanAccent-400">{after.profitMargin}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Comparison Bar Chart */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-1">
              Before vs After Performance Comparison
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Realized metrics side-by-side after elasticity & cost allocation
            </p>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="metric" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F1523', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Current (Before)" fill={activeTheme.primaryColor} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Simulated (After)" fill={activeTheme.secondaryColor} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Elasticity Curve & Revenue Optimization Chart */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-brand-400" />
              Dynamic Price Elasticity & Revenue Curve
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulates demand, revenue, and profit across a spectrum of ±30% price variations for {selectedProduct.name}
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Elasticity E = -1.65 (Elastic)
          </span>
        </div>

        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={elasticityCurve} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="percentChange" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" stroke={activeTheme.secondaryColor} fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val, name) => [name.includes('Units') ? val : formatCurrency(val), name]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line yAxisId="left" type="monotone" dataKey="revenue" name="Expected Revenue" stroke={activeTheme.primaryColor} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line yAxisId="left" type="monotone" dataKey="profit" name="Net Profit" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="demand" name="Demand (Units)" stroke={activeTheme.secondaryColor} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

