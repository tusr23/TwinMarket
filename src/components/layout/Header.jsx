import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Menu,
  Play,
  RotateCcw,
  Bell,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  X,
  ChevronDown,
  Palette,
  BookOpen
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext.jsx';
import { MARKET_SCENARIOS, UI_THEMES } from '../../simulation/defaultData.js';

export default function Header({ onMenuToggle }) {
  const {
    business,
    simulation,
    currency,
    setCurrency,
    theme,
    setTheme,
    formatCurrency,
    triggerSimulationRun,
    clearMarketScenario,
    resetToDemo
  } = useBusiness();

  const [showActivityModal, setShowActivityModal] = useState(false);
  const [isRunningSim, setIsRunningSim] = useState(false);

  const activeScenario = business.activeScenarioId
    ? MARKET_SCENARIOS.find((s) => s.id === business.activeScenarioId)
    : null;

  const handleSimulateClick = () => {
    setIsRunningSim(true);
    setTimeout(() => {
      triggerSimulationRun('Manual Market Simulation Recalibrated');
      setIsRunningSim(false);
    }, 600);
  };

  const financials = simulation.financials;
  const healthScore = simulation.risks?.businessHealthScore || 80;

  return (
    <>
      <header className="sticky top-0 z-30 bg-[var(--bg-base)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] px-4 lg:px-8 py-3.5 transition-colors duration-300">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-white text-base lg:text-lg tracking-tight">
                  {business.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-card)] text-slate-300 border border-[var(--border-card)] font-medium">
                  {business.categoryName}
                </span>
                {activeScenario && (
                  <span className="hidden md:inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse font-semibold">
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    {activeScenario.title}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center / Metrics Strip (Hidden on small mobile) */}
          <div className="hidden xl:flex items-center gap-6 text-xs neu-inset px-5 py-2.5 rounded-xl border border-[var(--border-subtle)]">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold tracking-wider">Revenue / Mo</span>
              <span className="font-bold text-white text-xs">{formatCurrency(financials.totalRevenue)}</span>
            </div>
            <div className="w-px h-6 bg-slate-800/80 shadow-sm" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold tracking-wider">Net Profit</span>
              <span className={`font-bold text-xs ${financials.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatCurrency(financials.netProfit)}
                <span className="text-[10px] ml-1 opacity-80">({financials.netProfitMargin}%)</span>
              </span>
            </div>
            <div className="w-px h-6 bg-slate-800/80 shadow-sm" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold tracking-wider">Liquid Cash</span>
              <span className="font-bold text-cyanAccent-400 text-xs">{formatCurrency(business.currentCash)}</span>
            </div>
            <div className="w-px h-6 bg-slate-800/80 shadow-sm" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold tracking-wider">Health Score</span>
              <span className="font-bold text-brand-400 text-xs">{healthScore}/100</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            {/* Theme Palette Switcher */}
            <div className="relative flex items-center">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[var(--bg-card)] border border-[var(--border-card)] text-slate-200 text-xs rounded-lg pl-7 pr-3 py-2 font-medium focus:ring-1 focus:ring-brand-500 focus:outline-none cursor-pointer appearance-none transition-colors"
                title="Change UI Theme Palette"
              >
                {UI_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <Palette className="w-3.5 h-3.5 text-brand-400 absolute left-2 pointer-events-none" />
            </div>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[var(--bg-card)] border border-[var(--border-card)] text-slate-300 text-xs rounded-lg px-2.5 py-2 font-mono font-medium focus:ring-1 focus:ring-brand-500 focus:outline-none cursor-pointer transition-colors"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Run Market Simulation Button */}
            <button
              onClick={handleSimulateClick}
              disabled={isRunningSim}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold text-xs text-white bg-gradient-to-r from-brand-600 via-brand-500 to-cyanAccent-400 hover:opacity-95 shadow-lg shadow-brand-500/25 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
              title="Recalculate customer demand, competitor moves, and market balance"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRunningSim ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {isRunningSim ? 'Simulating...' : 'RUN MARKET SIMULATION'}
              </span>
              <span className="sm:hidden">Run Sim</span>
            </button>

            {/* Guide & How to Use Quicklink */}
            <NavLink
              to="/guide"
              className="relative px-3 py-2 rounded-xl neu-btn text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              title="Platform Guide & How to Use"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline text-xs font-semibold text-slate-200">Guide</span>
            </NavLink>

            {/* Activity Log / Notifications */}
            <button
              onClick={() => setShowActivityModal(true)}
              className="relative p-2.5 rounded-xl neu-btn text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="View recent activities"
            >
              <Bell className="w-4 h-4" />
              {business.activityLog?.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(var(--color-brand-500),0.8)] animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile scenario warning bar */}
        {activeScenario && (
          <div className="mt-2.5 md:hidden flex items-center justify-between bg-rose-500/15 border border-rose-500/30 rounded-lg px-3 py-1.5 text-xs text-rose-300">
            <span className="flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Active Scenario: {activeScenario.title}
            </span>
            <button
              onClick={clearMarketScenario}
              className="underline text-[11px] font-bold text-rose-200 ml-2"
            >
              Clear
            </button>
          </div>
        )}
      </header>

      {/* Activity Log Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="neu-card rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col border border-[var(--neu-border)]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-400" />
                <h3 className="text-base font-bold text-white">Recent Business Activities</h3>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white neu-btn transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {business.activityLog && business.activityLog.length > 0 ? (
                business.activityLog.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl neu-inset flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{act.title}</span>
                        {act.impact && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded neu-pill text-brand-300 border border-brand-500/30">
                            {act.impact}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{act.detail}</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-1.5 block">
                        {new Date(act.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No business activities logged yet.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end">
              <button
                onClick={() => setShowActivityModal(false)}
                className="px-4 py-2 text-xs font-medium neu-btn text-white rounded-xl transition-all cursor-pointer"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

