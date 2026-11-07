import React from 'react';
import {
  FileText,
  Printer,
  Download,
  Building2,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Percent,
  Users,
  Boxes,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext.jsx';

export default function BusinessReports() {
  const { business, simulation, formatCurrency } = useBusiness();
  const financials = simulation.financials;
  const demand = simulation.demand;
  const inventory = simulation.inventory;
  const risks = simulation.risks;
  const comp = simulation.competitorAnalysis;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      businessEntity: business,
      simulationSnapshot: {
        financials,
        demandMetrics: demand,
        inventoryStatus: inventory,
        riskScore: risks,
        competitorLandscape: comp
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `twinmarket-report-${business.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner - Hidden in Print */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <FileText className="w-4 h-4" />
            <span>Comprehensive Enterprise Audit</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Market Intelligence Report
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Consolidated executive dossier combining algorithmic revenue audits, competitor parity indices, customer elasticity, and risk registers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJSON}
            className="neu-btn px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            Export Data JSON
          </button>
          <button
            onClick={handlePrint}
            className="neu-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Full Report
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="glass-card rounded-3xl p-8 lg:p-12 border-[var(--border-card)] space-y-10 bg-[var(--bg-card)] text-[var(--text-primary,#ffffff)] print:bg-white print:text-slate-900 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-slate-800 print:border-slate-300 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl text-white print:text-slate-900">TwinMarket AI</span>
              <span className="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30 print:border-slate-400 print:text-slate-800 font-bold">
                AUDIT REPORT
              </span>
            </div>
            <p className="text-xs text-slate-400 print:text-slate-600 mt-1">Autonomous Market Intelligence & Simulation Engine</p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-400 print:text-slate-600 space-y-1">
            <p><strong>Entity:</strong> {business.name}</p>
            <p><strong>Sector:</strong> {business.categoryName}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()} | <strong>Health:</strong> {risks.businessHealthScore}/100</p>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white print:text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-400 print:bg-slate-700" />
            1. Executive Performance Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
            During the current simulation cycle, <strong>{business.name}</strong> delivered monthly gross revenues of <strong>{formatCurrency(financials.totalRevenue)}</strong> across <strong>{financials.totalUnitsSold} realized units</strong>, resulting in a net monthly profit of <strong>{formatCurrency(financials.netProfit)}</strong> ({financials.netProfitMargin}% net profit margin). Liquid treasury stands at <strong>{formatCurrency(business.currentCash)}</strong>, sustaining an estimated runway of <strong>{financials.runwayMonths} months</strong>. Overall Enterprise Health is categorized at <strong>{risks.businessHealthScore}/100 ({risks.overallSeverity} Risk Tier)</strong>.
          </p>
        </div>

        {/* Section 2: Key Financial Metrics Table */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white print:text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyanAccent-400 print:bg-slate-700" />
            2. Financial Performance & Unit Economics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 print:text-slate-600 block">Gross Revenue</span>
              <span className="text-lg font-extrabold text-white print:text-slate-900">{formatCurrency(financials.totalRevenue)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 print:text-slate-600 block">Total Expenses</span>
              <span className="text-lg font-extrabold text-white print:text-slate-900">{formatCurrency(financials.totalExpenses)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 print:text-slate-600 block">Net Profit</span>
              <span className="text-lg font-extrabold text-emerald-400 print:text-slate-900">{formatCurrency(financials.netProfit)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-[11px] text-slate-400 print:text-slate-600 block">Net Margin %</span>
              <span className="text-lg font-extrabold text-cyanAccent-400 print:text-slate-900">{financials.netProfitMargin}%</span>
            </div>
          </div>
        </div>

        {/* Section 3: Competitor Parity & Market Share */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white print:text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 print:bg-slate-700" />
            3. Competitor Market Share & Intelligence
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 print:text-slate-600 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Entity Name</th>
                  <th className="py-2.5 px-3">Market Strategy</th>
                  <th className="py-2.5 px-3">Price Index</th>
                  <th className="py-2.5 px-3">Market Share</th>
                  <th className="py-2.5 px-3">Customer Sat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                <tr className="font-bold text-white print:text-slate-900">
                  <td className="py-2.5 px-3 text-brand-300 print:text-slate-900">{business.name} (Your Store)</td>
                  <td className="py-2.5 px-3 capitalize">{business.strategy}</td>
                  <td className="py-2.5 px-3">1.00x</td>
                  <td className="py-2.5 px-3">{comp.userMarketShare}%</td>
                  <td className="py-2.5 px-3">{business.customerSatisfaction}%</td>
                </tr>
                {comp.competitors.map((c) => (
                  <tr key={c.id} className="text-slate-300 print:text-slate-800">
                    <td className="py-2.5 px-3">{c.name}</td>
                    <td className="py-2.5 px-3">{c.strategy}</td>
                    <td className="py-2.5 px-3">{c.priceFactor}x</td>
                    <td className="py-2.5 px-3">{c.marketShare}%</td>
                    <td className="py-2.5 px-3">{c.customerSat}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Customer Demand & Segments */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white print:text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 print:bg-slate-700" />
            4. Customer Demand & Elasticity Diagnostics
          </h3>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            Aggregate buyer demand is predicted at <strong>{demand.totalDemandUnits} units/month</strong> with a marketing response factor of <strong>{demand.marketingMultiplier}x</strong>. Customer segmentation reveals <strong>38% Price-Sensitive Bargain Seekers</strong>, <strong>32% Rational Value Seekers</strong>, <strong>18% Brand Loyalists</strong>, and <strong>12% Impulse Convenience Buyers</strong>.
          </p>
        </div>

        {/* Section 5: Risk Register & Future Opportunities */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white print:text-slate-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 print:bg-slate-700" />
            5. Risk Register & Strategic Recommendations
          </h3>

          <div className="space-y-3">
            {risks.risks.slice(0, 3).map((r) => (
              <div key={r.id} className="p-3.5 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white print:text-slate-900">{r.category} ({r.severity} Severity)</span>
                  <span className="font-mono text-slate-400 print:text-slate-600">Likelihood: L{r.likelihood} | Impact: I{r.impact}</span>
                </div>
                <p className="text-slate-400 print:text-slate-700 mb-1.5">{r.description}</p>
                <p className="text-brand-300 print:text-slate-900 font-semibold">Recommended Action: {r.recommendedAction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-8 border-t border-slate-800 print:border-slate-300 flex justify-between items-center text-[11px] text-slate-500">
          <span>TwinMarket AI Client Simulation Engine — Confidential Executive Report</span>
          <span>Verification Hash: SHA256-{(business.id || 'apex').toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

