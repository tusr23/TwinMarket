import React, { useState } from 'react';
import {
  Users,
  Shield,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  Percent,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from 'recharts';
import { useBusiness } from '../context/BusinessContext.jsx';
import { simulateCompetitorReactions } from '../simulation/competitorEngine.js';

export default function CompetitorIntelligence() {
  const { business, simulation, updateBusinessSettings, triggerSimulationRun } = useBusiness();
  const competitorAnalysis = simulation.competitorAnalysis;
  const competitors = competitorAnalysis.competitors;

  const [testAction, setTestAction] = useState('price-cut');
  const [simulationLog, setSimulationLog] = useState(competitorAnalysis.reactionLogs || []);

  const handleSimulateCompetitorWar = () => {
    let priceDelta = 0;
    let marketingDelta = 0;

    if (testAction === 'price-cut') priceDelta = -8;
    else if (testAction === 'price-hike') priceDelta = +10;
    else if (testAction === 'marketing-surge') marketingDelta = +35;

    const result = simulateCompetitorReactions({
      userPriceDeltaPct: priceDelta,
      userMarketingDeltaPct: marketingDelta,
      competitors: business.competitors,
      userMarketShare: competitorAnalysis.userMarketShare,
      activeScenario: simulation.activeScenario
    });

    updateBusinessSettings({
      competitors: result.competitors,
      userMarketShare: result.userMarketShare
    });

    setSimulationLog(result.reactionLogs);
    triggerSimulationRun(`Tested rival reactions to ${testAction}`);
  };

  // Pie chart data
  const pieData = [
    { name: business.name, value: competitorAnalysis.userMarketShare, color: '#8F9DCC' },
    ...competitors.map((c, i) => {
      const colors = ['#6D7CB0', '#B3C0E6', '#CED8F2', '#4D5A8F'];
      return {
        name: c.name,
        value: c.marketShare,
        color: colors[i % colors.length]
      };
    })
  ];

  // Radar chart comparison data
  const radarData = [
    { subject: 'Price Competitiveness', User: 78, MarketAvg: 72 },
    { subject: 'Customer Satisfaction', User: business.customerSatisfaction, MarketAvg: 82 },
    { subject: 'Brand Power', User: business.brandReputation, MarketAvg: 80 },
    { subject: 'Financial Buffer', User: 85, MarketAvg: 79 },
    { subject: 'Market Agility', User: 90, MarketAvg: 74 },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Users className="w-4 h-4" />
            <span>Market Positioning & Multi-Agent Game Theory</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            AI Competitor Intelligence
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Monitor 4 active rival storefronts. When you modify pricing, promotions, or catalog width, competitors adapt dynamically using game-theoretic retail behavior.
          </p>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl neu-inset flex items-center gap-3 sm:gap-4 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Market Threat Level</span>
            <span className={`text-xs sm:text-sm font-extrabold ${
              competitorAnalysis.threatLevel.includes('Severe') ? 'text-rose-400' :
              competitorAnalysis.threatLevel.includes('Elevated') ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {competitorAnalysis.threatLevel}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Your Share</span>
            <span className="text-xs sm:text-sm font-extrabold text-brand-400">{competitorAnalysis.userMarketShare}%</span>
          </div>
        </div>
      </div>

      {/* Interactive Rival Stress-Tester Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyanAccent-400" />
              Dynamic Competitor Reaction Stress-Test
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate an aggressive move and observe how rivals adjust their pricing and marketing
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={testAction}
              onChange={(e) => setTestAction(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-500 font-medium cursor-pointer"
            >
              <option value="price-cut">Initiate -8% Price Cut</option>
              <option value="price-hike">Execute +10% Premium Price Increase</option>
              <option value="marketing-surge">Launch +35% Marketing Campaign</option>
            </select>

            <button
              onClick={handleSimulateCompetitorWar}
              className="neu-btn-primary px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Trigger Rival Response
            </button>
          </div>
        </div>
      </div>

      {/* Competitors Table */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <h3 className="text-base font-bold text-white mb-4">
          Rival Enterprise Matrix
        </h3>

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Competitor Name</th>
                <th className="py-3 px-4">Strategy Profile</th>
                <th className="py-3 px-4">Price Index</th>
                <th className="py-3 px-4">Market Share</th>
                <th className="py-3 px-4">Satisfaction</th>
                <th className="py-3 px-4">Financial Power</th>
                <th className="py-3 px-4">Active Promo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {/* User row */}
              <tr className="bg-brand-950/20 font-semibold text-white">
                <td className="py-3.5 px-4 flex items-center gap-2 text-brand-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  {business.name} (Your Store)
                </td>
                <td className="py-3.5 px-4 text-brand-300 capitalize">{business.strategy}</td>
                <td className="py-3.5 px-4 text-cyanAccent-400">1.00x (Baseline)</td>
                <td className="py-3.5 px-4 font-mono font-bold text-white">{competitorAnalysis.userMarketShare}%</td>
                <td className="py-3.5 px-4 text-emerald-400">{business.customerSatisfaction}%</td>
                <td className="py-3.5 px-4">88/100</td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    Standard
                  </span>
                </td>
              </tr>

              {/* Rivals */}
              {competitors.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{comp.name}</td>
                  <td className="py-3.5 px-4 text-slate-400">{comp.strategy}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {comp.priceFactor}x ({comp.priceFactor < 1 ? `-${((1 - comp.priceFactor) * 100).toFixed(0)}%` : `+${((comp.priceFactor - 1) * 100).toFixed(0)}%`})
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{comp.marketShare}%</td>
                  <td className="py-3.5 px-4 text-slate-300">{comp.customerSat}%</td>
                  <td className="py-3.5 px-4 text-slate-300">{comp.financialStrength}/100</td>
                  <td className="py-3.5 px-4">
                    {comp.promoActive ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                        Active Discount
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row: Market Share Donut & Competitive Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Market Share Donut (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-1">
            Market Share Equilibrium
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Aggregated market distribution across all 5 participating entities
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitive Radar (6 cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-1">
            Competitive Dimension Radar
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Benchmark your performance against market averages
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#4D5A8F40" />
                <PolarAngleAxis dataKey="subject" stroke="#CED8F2" fontSize={11} />
                <PolarRadiusAxis stroke="#6D7CB0" angle={30} domain={[0, 100]} />
                <Radar name="Your Store" dataKey="User" stroke="#8F9DCC" fill="#8F9DCC" fillOpacity={0.4} />
                <Radar name="Market Average" dataKey="MarketAvg" stroke="#6D7CB0" fill="#6D7CB0" fillOpacity={0.25} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-subtle)', borderRadius: '12px', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Competitor Real-Time Reaction Log */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-400" />
          Rival Game-Theoretic Response Ledger
        </h3>

        <div className="space-y-3">
          {simulationLog.map((log) => (
            <div key={log.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white">{log.competitorName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {log.strategy}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{log.detail}</p>
              </div>
              <span className="text-[11px] text-cyanAccent-400 font-mono font-bold shrink-0">
                {log.priceAdjustment !== '0.0%' ? `Price: ${log.priceAdjustment}` : 'Price Held'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

