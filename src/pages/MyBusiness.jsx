import React, { useState } from 'react';
import {
  Building2,
  PlusCircle,
  RotateCcw,
  Sparkles,
  DollarSign,
  MapPin,
  Target,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Percent,
  Layers,
  Coins
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext.jsx';
import { BUSINESS_CATEGORIES, STRATEGIES, DEMO_BUSINESS } from '../simulation/defaultData.js';

export default function MyBusiness() {
  const {
    business,
    simulation,
    formatCurrency,
    createNewVirtualBusiness,
    updateBusinessSettings,
    resetToDemo
  } = useBusiness();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [capitalAdjustment, setCapitalAdjustment] = useState('');
  const [formData, setFormData] = useState({
    name: 'NeoGizmo Superstore',
    category: 'mobile-shop',
    initialCapital: 3500000,
    location: 'North Galleria Mall, Tech City',
    targetCustomers: 'Early Adopters, Students & Corporate Executives',
    strategy: 'balanced'
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'initialCapital' ? Number(value) : value
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    createNewVirtualBusiness(formData);
    setIsCreatingNew(false);
  };

  const handleCapitalInjection = (isAdd) => {
    const amount = Number(capitalAdjustment);
    if (!amount || amount <= 0) return;
    const newCash = isAdd
      ? business.currentCash + amount
      : Math.max(0, business.currentCash - amount);

    updateBusinessSettings({
      currentCash: newCash,
      activityLog: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          title: isAdd ? 'Capital Injected' : 'Capital Withdrawn',
          detail: `${isAdd ? 'Injected' : 'Withdrew'} ${formatCurrency(amount)} into operating treasury.`,
          type: 'finance',
          impact: `${isAdd ? '+' : '-'}${formatCurrency(amount)} Cash`
        },
        ...business.activityLog
      ]
    });
    setCapitalAdjustment('');
  };

  const currentStrategyObj = STRATEGIES[business.strategy?.toUpperCase()] || STRATEGIES.BALANCED;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Building2 className="w-4 h-4" />
            <span>Virtual Enterprise Entity</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {business.name}
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyanAccent-400" />
              {business.location}
            </span>
            <span>•</span>
            <span className="text-brand-300 font-semibold">{business.categoryName}</span>
            <span>•</span>
            <span className="text-slate-400">Incorporated: {new Date(business.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreatingNew(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Create New Business
          </button>
          <button
            onClick={resetToDemo}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            title="Reset to default demo shop"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Demo
          </button>
        </div>
      </div>

      {/* Main Enterprise Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Business Profile & Strategy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Strategy Selection Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-brand-400" />
                  Active Business Strategy
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Defines autonomous pricing elasticity and growth bias</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                {currentStrategyObj.name}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.values(STRATEGIES).map((strat) => {
                const isActive = business.strategy === strat.id;
                return (
                  <div
                    key={strat.id}
                    onClick={() => updateBusinessSettings({ strategy: strat.id })}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-brand-900/30 border-brand-500/80 shadow-lg shadow-brand-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{strat.name}</span>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-brand-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                      {strat.description}
                    </p>
                    <div className="text-[10px] font-semibold text-cyanAccent-400 pt-2 border-t border-slate-800/80">
                      Target: {strat.expectedGrowth}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operating Profile & Parameters */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyanAccent-400" />
              Operational Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Target Customer Demographic</span>
                <span className="text-sm font-semibold text-white">{business.targetCustomers}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Customer Satisfaction Rating</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-400">{business.customerSatisfaction}/100</span>
                  <span className="text-[11px] text-slate-400">High Trust Tier</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Brand Reputation Score</span>
                <span className="text-sm font-bold text-brand-400">{business.brandReputation}/100</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Active Catalog Depth</span>
                <span className="text-sm font-bold text-white">{business.products.length} Active SKUs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Treasury & Capital Management (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Coins className="w-4 h-4 text-emerald-400" />
              Treasury & Capital Management
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#131B2E] border border-slate-800">
                <span className="text-xs text-slate-400 block">Current Liquid Cash Reserves</span>
                <h4 className="text-3xl font-extrabold text-cyanAccent-400 mt-1">
                  {formatCurrency(business.currentCash)}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
                  <span>Initial Capital:</span>
                  <span className="text-white font-semibold">{formatCurrency(business.initialCapital)}</span>
                </div>
              </div>

              {/* Monthly Fixed Overheads & Marketing */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly Fixed Overhead (Rent/Salaries):</span>
                  <span className="font-semibold text-white">{formatCurrency(business.monthlyFixedOverhead)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly Marketing Budget:</span>
                  <span className="font-semibold text-brand-400">{formatCurrency(business.monthlyMarketingSpend)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Estimated Monthly Net Profit:</span>
                  <span className={`font-semibold ${simulation.financials.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatCurrency(simulation.financials.netProfit)}
                  </span>
                </div>
              </div>

              {/* Capital Adjustment Controls */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Simulate Capital Injection / Dividend Withdrawal
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Enter amount (e.g. 500000)"
                    value={capitalAdjustment}
                    onChange={(e) => setCapitalAdjustment(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCapitalInjection(true)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition-colors cursor-pointer"
                  >
                    + Inject Cash
                  </button>
                  <button
                    onClick={() => handleCapitalInjection(false)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 transition-colors cursor-pointer"
                  >
                    - Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creation Modal */}
      {isCreatingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0F1523] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 lg:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-white">Create Virtual Business Entity</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Our simulation engine will automatically synthesize realistic market demand, inventory, and competitors.
                </p>
              </div>
              <button
                onClick={() => setIsCreatingNew(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Business Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="e.g. Apex Mobile Tech, Urban Loom, FreshBasket"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Business Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Initial Capital (INR)</label>
                  <input
                    type="number"
                    name="initialCapital"
                    value={formData.initialCapital}
                    onChange={handleFormChange}
                    step="100000"
                    min="500000"
                    max="50000000"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Business Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  placeholder="e.g. Metro Commercial Plaza, High Street, Downtown Cyber Corridor"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Customers</label>
                <input
                  type="text"
                  name="targetCustomers"
                  value={formData.targetCustomers}
                  onChange={handleFormChange}
                  placeholder="e.g. Students, Tech Professionals, Luxury Discerning Shoppers"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Starting Business Strategy</label>
                <select
                  name="strategy"
                  value={formData.strategy}
                  onChange={handleFormChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="balanced">Balanced Strategy (Recommended)</option>
                  <option value="aggressive">Aggressive Growth (Volume & Share)</option>
                  <option value="max-profit">Maximum Profit (Premium Margin)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Launch Virtual Venture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

