import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

export default function HealthScoreGauge({
  score = 80,
  subscores = {
    profitability: 82,
    demandTraction: 85,
    marketShare: 65,
    inventoryHealth: 90,
    financialStability: 88
  },
  size = 180
}) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreTier = (val) => {
    if (val >= 85) return { label: 'Optimal Health', color: 'text-[#F5F8FF]', stroke: '#8F9DCC', bg: 'bg-[#8F9DCC]/20' };
    if (val >= 70) return { label: 'Strong Performance', color: 'text-[#CED8F2]', stroke: '#6D7CB0', bg: 'bg-[#6D7CB0]/20' };
    if (val >= 50) return { label: 'Moderate Risk', color: 'text-amber-400', stroke: '#F59E0B', bg: 'bg-amber-500/15' };
    return { label: 'Critical Distress', color: 'text-rose-400', stroke: '#F43F5E', bg: 'bg-rose-500/15' };
  };

  const tier = getScoreTier(score);

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8F9DCC]" />
            Enterprise Health Score
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">Composite algorithmic evaluation</p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tier.color} border-current/30 ${tier.bg}`}>
          {tier.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Animated Radial SVG */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#273054"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Progress Bar */}
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke={tier.stroke}
                strokeWidth="12"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-extrabold tracking-tight"
              >
                {score}
              </motion.span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                out of 100
              </span>
            </div>
          </div>
        </div>

        {/* Subscore Drivers */}
        <div className="md:col-span-7 space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Profitability (25%)</span>
              <span className="font-bold">{subscores.profitability}%</span>
            </div>
            <div className="h-2 w-full neu-inset rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-[#8F9DCC] rounded-full transition-all duration-700"
                style={{ width: `${subscores.profitability}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Demand Traction (20%)</span>
              <span className="font-bold">{subscores.demandTraction}%</span>
            </div>
            <div className="h-2 w-full neu-inset rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-[#6D7CB0] rounded-full transition-all duration-700"
                style={{ width: `${subscores.demandTraction}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Market Share Defensibility (20%)</span>
              <span className="font-bold">{subscores.marketShare}%</span>
            </div>
            <div className="h-2 w-full neu-inset rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-[#CED8F2] rounded-full transition-all duration-700"
                style={{ width: `${subscores.marketShare}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Inventory Turnover & Buffer (15%)</span>
              <span className="font-bold">{subscores.inventoryHealth}%</span>
            </div>
            <div className="h-2 w-full neu-inset rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-[#4D5A8F] rounded-full transition-all duration-700"
                style={{ width: `${subscores.inventoryHealth}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-medium">Financial Runway & Stability (20%)</span>
              <span className="font-bold">{subscores.financialStability}%</span>
            </div>
            <div className="h-2 w-full neu-inset rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-[#B3C0E6] rounded-full transition-all duration-700"
                style={{ width: `${subscores.financialStability}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

