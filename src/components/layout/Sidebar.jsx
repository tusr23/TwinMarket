import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Package,
  TrendingUp,
  Users,
  PieChart,
  Activity,
  Boxes,
  ShieldAlert,
  Bot,
  FileText,
  Settings,
  Sparkles,
  Sliders,
  ChevronRight,
  Zap,
  BookOpen
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext.jsx';

export default function Sidebar({ isOpen, onClose }) {
  const { business, simulation } = useBusiness();
  const healthScore = simulation.risks?.businessHealthScore || 80;

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/my-business', label: 'My Business', icon: Building2 },
    { to: '/products', label: 'Product Management', icon: Package },
    { to: '/pricing-simulator', label: 'Pricing Simulator', icon: TrendingUp, highlight: true },
    { to: '/competitors', label: 'Competitor Intelligence', icon: Users },
    { to: '/customer-demand', label: 'Customer Demand', icon: Activity },
    { to: '/market-simulator', label: 'Market Simulator', icon: Zap },
    { to: '/inventory', label: 'Inventory Management', icon: Boxes },
    { to: '/risk-analysis', label: 'Risk Analysis', icon: ShieldAlert },
    { to: '/advisor', label: 'AI Business Advisor', icon: Bot, highlight: true },
    { to: '/reports', label: 'Business Reports', icon: FileText },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const advancedFeatures = [
    { to: '/what-if', label: 'What-If Simulator', icon: Sliders },
    { to: '/strategies', label: 'Strategy Comparison', icon: PieChart },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[var(--bg-base)]/95 backdrop-blur-2xl border-r border-[var(--border-subtle)] flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Brand Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8F9DCC] to-[#4D5A8F] p-0.5 shadow-md shadow-[#4D5A8F]/30 group-hover:shadow-[#8F9DCC]/40 transition-all flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#F5F8FF]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight">TwinMarket</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#E3EAFA] text-[#4D5A8F] border border-[#B3C0E6]">AI</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Virtual Market Intelligence</p>
            </div>
          </NavLink>
        </div>

        {/* Active Business Quick Widget */}
        <div className="px-4 py-3 mx-3 my-3 rounded-xl neu-inset border border-[var(--border-subtle)] flex items-center justify-between">
          <div className="overflow-hidden pr-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Active Venture</p>
            <p className="text-sm font-semibold truncate">{business.name}</p>
            <span className="text-[10px] text-slate-400 font-medium">{business.categoryName}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Health</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#4D5A8F]/30 text-[#CED8F2] border border-[#6D7CB0]/40">
              {healthScore}%
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
          {/* Main 12 Modules */}
          <div>
            <p className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Core Modules</p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-[#8F9DCC] to-[#4D5A8F] text-[#F5F8FF] shadow-lg shadow-[#4D5A8F]/25 font-bold active-nav-pill'
                          : 'text-slate-300 hover:text-[#F5F8FF] hover:bg-white/5'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    {item.highlight && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#E3EAFA] text-[#4D5A8F] border border-[#B3C0E6] uppercase tracking-wider">
                        AI
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Advanced Sandbox Features */}
          <div>
            <p className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Advanced Sandbox</p>
            <nav className="space-y-1">
              {advancedFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-[#6D7CB0] to-[#8F9DCC] text-[#F5F8FF] shadow-lg shadow-[#6D7CB0]/25 font-bold active-nav-pill'
                          : 'text-slate-300 hover:text-[#F5F8FF] hover:bg-white/5'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 transition-colors" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Platform Manual & Details */}
          <div>
            <p className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Help & Documentation</p>
            <nav className="space-y-1">
              <NavLink
                to="/guide"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8F9DCC] to-[#4D5A8F] text-[#F5F8FF] shadow-lg shadow-[#4D5A8F]/25 font-bold active-nav-pill'
                      : 'text-slate-300 hover:text-[#F5F8FF] hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 transition-colors" />
                  <span>How to Use & Details</span>
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#E3EAFA] text-[#4D5A8F] border border-[#B3C0E6] tracking-wider">
                  GUIDE
                </span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-deep)]/60">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8F9DCC] animate-pulse"></span>
              Client Simulation Engine
            </span>
            <span className="font-mono text-[10px]">v1.0-prod</span>
          </div>
        </div>
      </aside>
    </>
  );
}

