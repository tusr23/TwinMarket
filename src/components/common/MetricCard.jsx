import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({
  title,
  value,
  subvalue,
  change,
  isPositive,
  icon: Icon,
  accentColor = 'brand', // 'brand', 'cyan', 'emerald', 'amber', 'rose'
  tooltip
}) {
  const accentStyles = {
    brand: 'text-[#B0F2BC] bg-[#153B3E]/60 border-[#24656B]/50 group-hover:border-[#4CC8A3]/60',
    cyan: 'text-[#4CC8A3] bg-[#153B3E]/60 border-[#24656B]/50 group-hover:border-[#4CC8A3]/60',
    emerald: 'text-white bg-[#38B2A3]/40 border-[#4CC8A3]/50 group-hover:border-[#B0F2BC]/60',
    amber: 'text-amber-400 bg-amber-500/15 border-amber-500/30 group-hover:border-amber-400',
    rose: 'text-rose-400 bg-rose-500/15 border-rose-500/30 group-hover:border-rose-400'
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 relative overflow-hidden group">
      {/* Background ambient glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#4CC8A3]/10 rounded-full blur-2xl group-hover:bg-[#4CC8A3]/20 transition-colors pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 block truncate">
            {title}
          </span>
          <div className="mt-1.5 sm:mt-2 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {value}
            </h3>
            {subvalue && (
              <span className="text-xs text-slate-400 font-medium">
                {subvalue}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-2 sm:p-2.5 rounded-xl neu-inset border transition-all shrink-0 ${accentStyles[accentColor] || accentStyles.brand}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-semibold">
            {isPositive === true && <TrendingUp className="w-3.5 h-3.5 text-[#4CC8A3]" />}
            {isPositive === false && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
            {isPositive === null && <Minus className="w-3.5 h-3.5 text-slate-400" />}
            <span className={`px-2 py-0.5 rounded-full text-[11px] ${
              isPositive === true ? 'bg-[#B0F2BC] text-[#0B2224] font-bold shadow-sm' :
              isPositive === false ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold' :
              'bg-[#153B3E] text-[#B0F2BC] font-medium'
            }`}>
              {change}
            </span>
          </div>
          {tooltip && (
            <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
              {tooltip}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

