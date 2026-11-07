import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Bot,
  Boxes,
  Menu
} from 'lucide-react';

export default function MobileBottomNav({ onMenuToggle }) {
  const navTabs = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/pricing-simulator', label: 'Pricing', icon: TrendingUp },
    { to: '/advisor', label: 'Advisor', icon: Bot, isAi: true },
    { to: '/inventory', label: 'Stock', icon: Boxes },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-base)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] px-2 py-1.5 flex items-center justify-around lg:hidden shadow-2xl transition-colors duration-300"
      style={{ paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))' }}
      aria-label="Mobile Navigation"
    >
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#8F9DCC] font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#8F9DCC]' : ''}`} />
                  {tab.isAi && (
                    <span className="absolute -top-1 -right-2 text-[8px] font-extrabold px-1 py-0.2 rounded-full bg-[#E3EAFA] text-[#4D5A8F] leading-none">
                      AI
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#8F9DCC] absolute bottom-0.5" />
                )}
              </>
            )}
          </NavLink>
        );
      })}

      {/* Menu / All Modules Toggle */}
      <button
        onClick={onMenuToggle}
        className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
        aria-label="Open full menu"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-1 font-medium tracking-tight">Menu</span>
      </button>
    </nav>
  );
}
