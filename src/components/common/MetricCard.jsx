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
    brand: 'text-brand-400 bg-brand-500/10 border-brand-500/20 group-hover:border-brand-500/40',
    cyan: 'text-cyanAccent-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20 group-hover:border-rose-500/40'
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 relative overflow-hidden group">
      {/* Background ambient glow */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
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
          <div className={`p-2.5 rounded-xl border transition-colors ${accentStyles[accentColor] || accentStyles.brand}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-semibold">
            {isPositive === true && <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />}
            {isPositive === false && <TrendingDown className="w-3.5 h-3.5 text-rose-400" />}
            {isPositive === null && <Minus className="w-3.5 h-3.5 text-slate-400" />}
            <span className={isPositive === true ? 'text-emerald-400' : isPositive === false ? 'text-rose-400' : 'text-slate-400'}>
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

