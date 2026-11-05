import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  BookOpen,
  Search,
  Sparkles,
  Settings
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

  const navigate = useNavigate();
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/advisor');
    }
  };

  const financials = simulation.financials;
  const healthScore = simulation.risks?.businessHealthScore || 80;

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#0E0D14]/90 backdrop-blur-2xl border-b border-white/[0.07] px-4 lg:px-8 py-3.5 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Greeting matching Helios image */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-extrabold text-white text-lg lg:text-xl tracking-tight flex items-center gap-2">
                  Welcome, Nadia
                  <span className="hidden sm:inline-block text-[11px] font-normal px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/10">
                    {business.name}
                  </span>
                </h1>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Here's your investment portfolio & virtual market overview
                </p>
              </div>
            </div>

            {activeScenario && (
              <span className="md:hidden flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                {activeScenario.title}
              </span>
            )}
          </div>

          {/* Right: Search Pill, Bell, Settings, and Profile Capsule matching image */}
          <div className="flex items-center flex-wrap gap-2.5 md:justify-end">
            {/* Search Pill: "Ask helios.ai anything" */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask helios.ai anything"
                className="w-48 lg:w-60 bg-[#161520] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E087B7]/60 transition-all font-sans"
              />
              <Sparkles className="w-3.5 h-3.5 text-[#E087B7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* Theme Switcher Pill */}
            <div className="relative flex items-center">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[#161520] border border-white/10 text-zinc-300 text-xs rounded-full pl-7 pr-3 py-2 font-medium focus:outline-none cursor-pointer appearance-none transition-colors"
                title="Change UI Theme"
              >
                {UI_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <Palette className="w-3.5 h-3.5 text-[#E087B7] absolute left-2.5 pointer-events-none" />
            </div>

            {/* Currency Pill */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#161520] border border-white/10 text-zinc-300 text-xs rounded-full px-3 py-2 font-mono font-medium focus:outline-none cursor-pointer transition-colors"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Notification Bell Circle */}
            <button
              onClick={() => setShowActivityModal(true)}
              className="relative w-9 h-9 rounded-full bg-[#161520] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E087B7]/40 flex items-center justify-center transition-all cursor-pointer"
              aria-label="View recent activities"
              title="Notifications & Activity Log"
            >
              <Bell className="w-4 h-4" />
              {business.activityLog?.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E087B7] shadow-[0_0_8px_#E087B7] animate-pulse" />
              )}
            </button>

            {/* Settings Gear Circle */}
            <NavLink
              to="/settings"
              className="w-9 h-9 rounded-full bg-[#161520] border border-white/10 text-zinc-300 hover:text-white hover:border-[#E087B7]/40 flex items-center justify-center transition-all cursor-pointer"
              title="Platform Settings"
            >
              <Settings className="w-4 h-4" />
            </NavLink>

            {/* User Profile Capsule (exact replica from screenshot) */}
            <div className="flex items-center gap-2.5 bg-[#161520] border border-white/10 rounded-full pl-1.5 pr-3.5 py-1">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Nadia Rachel"
                className="w-7 h-7 rounded-full object-cover border border-[#E087B7]/40"
              />
              <div className="hidden xl:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">Nadia Rachel</span>
                <span className="text-[10px] text-zinc-400 block leading-none">rachel_helios@gmail.com</span>
              </div>
            </div>
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
          <div className="helios-card rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col border border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#E087B7]" />
                <h3 className="text-base font-bold text-white">Recent Business Activities</h3>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {business.activityLog && business.activityLog.length > 0 ? (
                business.activityLog.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl bg-[#14131C] border border-white/[0.06] flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">{act.title}</span>
                        {act.impact && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E087B7]/20 text-[#E087B7] border border-[#E087B7]/30">
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

            <div className="pt-3 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setShowActivityModal(false)}
                className="px-4 py-2 text-xs font-medium bg-[#1A1925] hover:bg-[#201F2E] text-white rounded-full transition-all cursor-pointer border border-white/10"
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
