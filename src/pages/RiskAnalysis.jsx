import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext.jsx';

export default function RiskAnalysis() {
  const { business, simulation } = useBusiness();
  const risksObj = simulation.risks;
  const risksList = risksObj.risks;

  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState(risksList[0]);

  const filteredRisks = activeCategoryFilter === 'ALL'
    ? risksList
    : risksList.filter((r) => r.category === activeCategoryFilter);

  // 5x5 Matrix Grid (Likelihood: 1-5, Impact: 1-5)
  // Rows: Likelihood 5 down to 1
  // Columns: Impact 1 up to 5
  const likelihoodLevels = [5, 4, 3, 2, 1];
  const impactLevels = [1, 2, 3, 4, 5];

  const getCellColor = (l, i) => {
    const score = l * i;
    if (score >= 15) return 'bg-rose-950/40 border-rose-500/40 text-rose-300';
    if (score >= 9) return 'bg-amber-950/40 border-amber-500/40 text-amber-300';
    if (score >= 5) return 'bg-cyan-950/30 border-cyan-500/30 text-cyan-300';
    return 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300';
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Enterprise Vulnerability & Risk Management</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Business Risk Analysis & Heatmap
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Algorithmic appraisal across Financial, Competitive, Supply Chain, Pricing, Demand, and Macroeconomic exposure vectors.
          </p>
        </div>

        <div className="p-4 rounded-2xl neu-inset flex items-center gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Composite Risk Index</span>
            <span className="text-2xl font-extrabold text-white">{risksObj.compositeRiskScore}/100</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Enterprise Health</span>
            <span className="text-2xl font-extrabold text-emerald-400">{risksObj.businessHealthScore}/100</span>
          </div>
        </div>
      </div>

      {/* 5x5 Heatmap & Detailed Risk Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 5x5 Heatmap (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">5x5 Enterprise Risk Matrix</h3>
              <p className="text-xs text-slate-400 mt-0.5">Likelihood (Y) vs Business Consequence Impact (X)</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">Interactive Nodes</span>
          </div>

          {/* Matrix Container with horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-2 -mx-2 sm:mx-0 px-2 sm:px-0">
            <div className="min-w-[460px] space-y-2">
              {likelihoodLevels.map((lVal) => (
                <div key={`row-${lVal}`} className="flex items-center gap-2">
                  <span className="w-14 text-[11px] font-mono font-bold text-slate-400 text-right shrink-0">
                    L{lVal} ({lVal === 5 ? 'Extreme' : lVal === 4 ? 'High' : lVal === 3 ? 'Medium' : lVal === 2 ? 'Low' : 'Rare'})
                  </span>
                  <div className="grid grid-cols-5 gap-2 flex-1">
                    {impactLevels.map((iVal) => {
                      // Find if any risk is located here
                      const matchingRisks = risksList.filter(
                        (r) => r.likelihood === lVal && r.impact === iVal
                      );

                      return (
                        <div
                          key={`cell-${lVal}-${iVal}`}
                          className={`h-14 rounded-xl border flex flex-col items-center justify-center p-1 relative transition-all ${getCellColor(
                            lVal,
                            iVal
                          )}`}
                        >
                          <span className="text-[9px] font-mono opacity-50 absolute top-1 left-1">
                            {lVal * iVal}
                          </span>
                          {matchingRisks.map((risk) => (
                            <button
                              key={risk.id}
                              onClick={() => setSelectedRisk(risk)}
                              className={`w-full py-0.5 px-1 rounded text-[9px] font-bold truncate text-center transition-transform hover:scale-105 cursor-pointer ${
                                selectedRisk?.id === risk.id
                                  ? 'bg-white text-slate-950 shadow-md ring-2 ring-brand-400 font-extrabold'
                                  : 'bg-slate-900/80 text-white'
                              }`}
                              title={risk.category}
                            >
                              {risk.category.replace(' Risk', '')}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Impact Axis Label */}
              <div className="flex items-center gap-2 pt-2">
                <span className="w-14 shrink-0" />
                <div className="grid grid-cols-5 gap-2 flex-1 text-center">
                  <span className="text-[10px] font-mono text-slate-400">I1 (Negligible)</span>
                  <span className="text-[10px] font-mono text-slate-400">I2 (Minor)</span>
                  <span className="text-[10px] font-mono text-slate-400">I3 (Moderate)</span>
                  <span className="text-[10px] font-mono text-slate-400">I4 (Major)</span>
                  <span className="text-[10px] font-mono text-slate-400">I5 (Severe)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Risk Detail Card (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Risk Category Dossier
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1">{selectedRisk.category}</h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                selectedRisk.severity === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                selectedRisk.severity === 'High' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                selectedRisk.severity === 'Moderate' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {selectedRisk.severity} Severity
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-1">Threat Assessment & Description:</span>
                <p className="text-slate-200 leading-relaxed p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  {selectedRisk.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Potential Enterprise Impact:</span>
                <p className="text-rose-300/90 leading-relaxed p-3 rounded-xl bg-rose-950/20 border border-rose-500/20">
                  {selectedRisk.potentialImpact}
                </p>
              </div>

              <div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Prescribed Strategic Mitigation:
                </span>
                <p className="text-slate-200 leading-relaxed p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  {selectedRisk.recommendedAction}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Risk Score: <strong className="text-white">{selectedRisk.score}/100</strong></span>
            <span className="text-slate-400 font-mono">Likelihood: L{selectedRisk.likelihood} | Impact: I{selectedRisk.impact}</span>
          </div>
        </div>
      </div>

      {/* 6 Dimensions Breakdown Table */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4">
          All 6 Enterprise Risk Vectors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {risksList.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedRisk(r)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedRisk?.id === r.id
                  ? 'bg-slate-900 border-brand-500 ring-1 ring-brand-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-white">{r.category}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  r.severity === 'Critical' ? 'text-rose-400 bg-rose-500/10' :
                  r.severity === 'High' ? 'text-amber-400 bg-amber-500/10' :
                  'text-emerald-400 bg-emerald-500/10'
                }`}>
                  {r.severity} ({r.score})
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {r.description}
              </p>
              <div className="text-[11px] text-brand-400 font-medium flex items-center justify-between pt-2 border-t border-slate-800">
                <span>View Remediation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

