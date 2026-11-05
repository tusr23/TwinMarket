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
  BookOpen,
  Headphones,
  Briefcase
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext.jsx';

export default function Sidebar({ isOpen, onClose }) {
  const { business, simulation } = useBusiness();
  const healthScore = simulation.risks?.businessHealthScore || 80;

  const primaryNavItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/my-business', label: 'Portfolio', icon: Briefcase },
    { to: '/pricing-simulator', label: 'Analysis', icon: TrendingUp, highlight: true },
    { to: '/market-simulator', label: 'Market', icon: Zap },
    { to: '/advisor', label: 'Community', icon: Bot, highlight: true },
  ];

  const extendedNavItems = [
    { to: '/products', label: 'Product Catalog', icon: Package },
    { to: '/competitors', label: 'Competitor Radar', icon: Users },
    { to: '/customer-demand', label: 'Customer Demand', icon: Activity },
    { to: '/inventory', label: 'Inventory', icon: Boxes },
    { to: '/risk-analysis', label: 'Risk Analysis', icon: ShieldAlert },
    { to: '/what-if', label: 'What-If Lab', icon: Sliders },
    { to: '/strategies', label: 'Strategy Playbook', icon: PieChart },
    { to: '/reports', label: 'Audits & Reports', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111018]/95 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo and Brand Header */}
        <div className="px-6 py-6 border-b border-white/[0.06] flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
            {/* Helios Interlocking Glyph */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E087B7] via-[#C06497] to-[#A855F7] p-0.5 shadow-md shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-shadow">
              <div className="w-full h-full bg-[#14131C] rounded-[6px] flex items-center justify-center">
                <div className="flex items-center gap-0.5">
                  <span className="w-1.5 h-3.5 bg-gradient-to-b from-[#E087B7] to-[#A855F7] rounded-sm" />
                  <span className="w-1.5 h-2 bg-[#E087B7] rounded-sm" />
                  <span className="w-1.5 h-3.5 bg-gradient-to-b from-[#A855F7] to-[#E087B7] rounded-sm" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-white tracking-tight">Helios TwinMarket</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium">Investments & AI Simulation</p>
            </div>
          </NavLink>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Primary Helios Navigation */}
          <nav className="space-y-1.5">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E087B7]/25 via-[#C06497]/15 to-[#8E3E79]/10 text-white border border-[#E087B7]/40 shadow-[0_0_15px_rgba(224,135,183,0.18)] font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-zinc-400 group-hover:text-[#E087B7] transition-colors" />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#E087B7]/20 text-[#E087B7] border border-[#E087B7]/30 tracking-wider">
                      AI
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Extended Simulation Suite */}
          <div className="pt-2 border-t border-white/[0.06]">
            <p className="px-4 mb-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Simulation Lab</p>
            <nav className="space-y-1">
              {extendedNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-[#E087B7]/20 to-transparent text-white border-l-2 border-[#E087B7] font-semibold'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#E087B7] transition-colors" />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Pinned Bottom Navigation: Settings & Support */}
        <div className="p-3 border-t border-white/[0.06] bg-[#0E0D14]/80 space-y-1">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'text-white bg-white/[0.08] font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`
            }
          >
            <Settings className="w-4 h-4 text-zinc-400" />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/guide"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'text-white bg-white/[0.08] font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`
            }
          >
            <Headphones className="w-4 h-4 text-zinc-400" />
            <span>Support</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

