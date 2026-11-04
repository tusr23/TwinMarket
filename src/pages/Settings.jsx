import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  RotateCcw,
  Download,
  Upload,
  DollarSign,
  Shield,
  Trash2,
  Sparkles,
  CheckCircle2,
  Info,
  Palette
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext.jsx';
import { UI_THEMES } from '../simulation/defaultData.js';

export default function Settings() {
  const {
    business,
    currency,
    setCurrency,
    theme,
    setTheme,
    resetToDemo,
    showToast,
    updateBusinessSettings
  } = useBusiness();

  const [importStatus, setImportStatus] = useState('');

  const handleExportData = () => {
    const raw = localStorage.getItem('twinmarket_ai_business_data_v1') || JSON.stringify(business);
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `twinmarket-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported business database backup', 'success');
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && parsed.name && parsed.products) {
          updateBusinessSettings(parsed);
          setImportStatus('Successfully imported business backup!');
          showToast('Imported and restored business backup!', 'success');
        } else {
          setImportStatus('Invalid business snapshot file format.');
        }
      } catch (err) {
        setImportStatus('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to reset all local storage and return to default demo state?')) {
      localStorage.clear();
      resetToDemo();
      showToast('Cache cleared and reset to pristine demo state', 'info');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <SettingsIcon className="w-4 h-4" />
            <span>Platform Configuration</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Settings & Data Management
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Manage local storage persistence, display currency, backup exports, and simulation engine parameters.
          </p>
        </div>
      </div>

      {/* UI Theme & Color Combination Palette */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-brand-400" />
              UI Color Combination & Theme Palette
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Choose from trending SaaS aesthetic combinations. Changes apply instantaneously across all dashboards, charts, and simulation modules.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
            {UI_THEMES.find((t) => t.id === theme)?.name} Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {UI_THEMES.map((t) => {
            const isSelected = theme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  showToast(`Activated ${t.name} color palette`, 'success');
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[var(--bg-card)] border-brand-500 shadow-xl shadow-brand-500/15 ring-1 ring-brand-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  {/* Top Bar Preview */}
                  <div className="h-2 w-full rounded-full bg-gradient-to-r mb-3" style={{
                    background: `linear-gradient(90deg, ${t.primaryColor}, ${t.secondaryColor})`
                  }} />

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.primaryColor }} />
                      {t.name}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-brand-400" /> Active
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono font-semibold text-cyanAccent-400 block mb-2">
                    {t.style}
                  </span>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {t.description}
                  </p>
                </div>

                {/* Color swatches */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-mono">Swatches:</span>
                    <span className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: t.primaryColor }} title="Primary Accent" />
                    <span className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: t.secondaryColor }} title="Secondary Highlight" />
                  </div>
                  <span className="text-[11px] font-semibold text-brand-400 group-hover:underline">
                    {isSelected ? 'Selected' : 'Apply Theme'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Currency & Regional Settings */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-cyanAccent-400" />
          Display Currency
        </h3>
        <p className="text-xs text-slate-400">
          Select preferred currency symbol for dashboard metrics, price simulator, and reports.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { id: 'INR', label: '₹ INR (Indian Rupee)', sub: 'Default' },
            { id: 'USD', label: '$ USD (US Dollar)', sub: '84 INR/USD' },
            { id: 'EUR', label: '€ EUR (Euro)', sub: '91 INR/EUR' },
            { id: 'GBP', label: '£ GBP (British Pound)', sub: '108 INR/GBP' },
          ].map((curr) => {
            const isSelected = currency === curr.id;
            return (
              <div
                key={curr.id}
                onClick={() => setCurrency(curr.id)}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-brand-900/40 border-brand-500 shadow-lg shadow-brand-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold text-white block">{curr.label}</span>
                <span className="text-[10px] text-slate-400 mt-1 block">{curr.sub}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* LocalStorage Data & Snapshots */}
      <div className="glass-card rounded-2xl p-6 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-400" />
          Data Backup, Export & Recovery
        </h3>
        <p className="text-xs text-slate-400">
          All virtual businesses, simulation runs, activity logs, and pricing changes are stored locally in your browser’s LocalStorage. No server required.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Export JSON */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-white mb-1">Export Full Snapshot</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download a complete JSON file containing all products, competitors, cash ledger, and current scenario.
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="mt-4 py-2.5 px-4 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" /> Export Backup JSON
            </button>
          </div>

          {/* Import JSON */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-white mb-1">Restore from Snapshot</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Restore a previously exported TwinMarket AI JSON snapshot file to continue simulation.
              </p>
            </div>
            <div className="mt-4">
              <label className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <Upload className="w-4 h-4" /> Select Backup File
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
              {importStatus && (
                <span className="text-[10px] text-cyanAccent-400 mt-2 block text-center font-medium">
                  {importStatus}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Danger Zone: Reset */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-rose-400">Danger Zone</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Reset everything back to the pristine default Demo Store ("Apex Mobile Tech").
            </p>
          </div>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Demo Data
          </button>
        </div>
      </div>

      {/* About Simulation Engine */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 space-y-2">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-400" />
          About TwinMarket AI Simulation Architecture
        </h4>
        <p className="leading-relaxed">
          TwinMarket AI is an advanced client-side business simulation and market intelligence platform. It utilizes microeconomic formulas, including Price Elasticity of Demand (PED), Cross-Price Competitor Attractiveness, Diminishing Returns Marketing Multipliers, 5x5 Likelihood/Impact Risk Modeling, and Game-Theoretic Competitor Retaliation.
        </p>
        <p className="text-[11px] text-slate-500 font-mono pt-2">
          TwinMarket AI — Final Year Major B.Tech Project Standard • Frontend Only Architecture
        </p>
      </div>
    </div>
  );
}

