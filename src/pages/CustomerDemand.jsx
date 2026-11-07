import React, { useState } from 'react';
import {
  Activity,
  Users,
  TrendingUp,
  Percent,
  Sliders,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
import { SEASONALITY_FACTORS } from '../simulation/demandEngine.js';

export default function CustomerDemand() {
  const { business, simulation, formatCurrency, updateBusinessSettings, triggerSimulationRun } = useBusiness();
  const demand = simulation.demand;

  const [marketingBudget, setMarketingBudget] = useState(business.monthlyMarketingSpend);

  const handleMarketingChange = (e) => {
    const val = Number(e.target.value);
    setMarketingBudget(val);
  };

  const handleApplyMarketing = () => {
    updateBusinessSettings({
      monthlyMarketingSpend: marketingBudget,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          title: 'Marketing Budget Adjusted',
          detail: `Calibrated monthly marketing allocation to ${formatCurrency(marketingBudget)}`,
          type: 'marketing',
          impact: `${formatCurrency(marketingBudget)}/mo`
        },
        ...business.activityLog
      ]
    });
    triggerSimulationRun(`Updated marketing budget to ${formatCurrency(marketingBudget)}`);
  };

  const segmentColors = ['#8F9DCC', '#6D7CB0', '#B3C0E6', '#CED8F2', '#4D5A8F'];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Activity className="w-4 h-4" />
            <span>Behavioral Economics & Micro-Forecasting</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Customer Demand Prediction
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Multi-factor purchase propensity model evaluating price elasticity, brand loyalty coefficients, seasonal demand waves, and marketing effectiveness.
          </p>
        </div>

        <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyanAccent-400 shrink-0" />
          <span>All demand values are algorithmic client-side simulated estimates.</span>
        </div>
      </div>

      {/* Demand Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Total Monthly Demand</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">{demand.totalDemandUnits} Units</h3>
          <span className="text-xs text-emerald-400 font-semibold mt-2 block">+18.5% Growth Trajectory</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Potential Gross Sales</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-cyanAccent-400 mt-2">{formatCurrency(demand.totalPotentialRevenue)}</h3>
          <span className="text-xs text-slate-400 mt-2 block">If 100% stock fulfillment</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Marketing Multiplier</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-400 mt-2">{demand.marketingMultiplier}x</h3>
          <span className="text-xs text-slate-400 mt-2 block">Diminishing return efficiency</span>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Seasonal Index (Oct)</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-2">{demand.seasonFactor}x</h3>
          <span className="text-xs text-amber-400/90 font-semibold mt-2 block">Festive Holiday Shopping Wave</span>
        </div>
      </div>

      {/* Interactive Marketing Spend Control */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border-brand-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <Sliders className="w-4 h-4 text-cyanAccent-400" />
              Marketing Investment Elasticity Slider
            </h3>
            <p className="text-xs text-slate-400">
              Calibrate monthly ad spend to expand consumer reach and purchase frequency
            </p>

            <div className="mt-4 flex items-center gap-4">
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={marketingBudget}
                onChange={handleMarketingChange}
                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <span className="font-mono text-sm font-bold text-cyanAccent-400 shrink-0 w-28 text-right">
                {formatCurrency(marketingBudget)}
              </span>
            </div>
          </div>

          <button
            onClick={handleApplyMarketing}
            className="neu-btn-primary px-5 py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-all cursor-pointer shrink-0"
          >
            Apply Marketing Budget
          </button>
        </div>
      </div>

      {/* Charts Row: Forward 6-Month Demand Projection & Segment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Forward Demand Trend (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">6-Month Forward Demand Forecast</h3>
              <p className="text-xs text-slate-400 mt-0.5">Seasonal cycles combined with brand organic compounding</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Next: Q4-Q1</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demand.forwardProjection} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="demandArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8F9DCC" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6D7CB0" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4D5A8F40" vertical={false} />
                <XAxis dataKey="month" stroke="#8F9DCC" fontSize={11} tickLine={false} />
                <YAxis stroke="#8F9DCC" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="projectedUnits" name="Projected Demand (Units)" stroke="#8F9DCC" strokeWidth={2.5} fill="url(#demandArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segments Breakdown (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-1">
            Customer Segmentation Architecture
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Audience behavior mapped by price vs quality elasticity
          </p>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demand.segmentsBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="sharePct"
                >
                  {demand.segmentsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={segmentColors[index % segmentColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Segment Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-2">
            {demand.segmentsBreakdown.map((seg, idx) => (
              <div key={seg.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: segmentColors[idx % segmentColors.length] }} />
                  <div>
                    <span className="font-semibold text-white block">{seg.name}</span>
                    <span className="text-[10px] text-slate-400">{seg.volumeUnits} estimated monthly buyers</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-300">{seg.sharePct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SKU-Level Demand Fulfillment Breakdown */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-base font-bold text-white mb-4">
          SKU Demand & Stock Fulfillment Health
        </h3>

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Retail Price</th>
                <th className="py-3 px-4">Predicted Demand</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4">Fulfillment Capacity</th>
                <th className="py-3 px-4">Stock Shortage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {demand.productDemands.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{prod.name}</td>
                  <td className="py-3.5 px-4 text-slate-400">{prod.category}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">{formatCurrency(prod.sellingPrice)}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-cyanAccent-400">{prod.predictedUnits} units</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{prod.stock} units</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            prod.fulfillmentRate >= 100 ? 'bg-emerald-400' :
                            prod.fulfillmentRate >= 70 ? 'bg-amber-400' : 'bg-rose-500'
                          }`}
                          style={{ width: `${Math.min(100, prod.fulfillmentRate)}%` }}
                        />
                      </div>
                      <span className="font-mono font-semibold text-slate-300">{prod.fulfillmentRate}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {prod.stockShortage > 0 ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        -{prod.stockShortage} Units Lost
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-semibold">100% Met</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

