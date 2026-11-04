import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext.jsx';
import { ADVISOR_PROMPT_TEMPLATES, answerAdvisorInquiry } from '../simulation/advisorEngine.js';

export default function AIBusinessAdvisor() {
  const { business, simulation } = useBusiness();
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'advisor',
      timestamp: 'Just now',
      title: 'Virtual Enterprise Intelligence Advisor',
      text: `Hello! I am your **TwinMarket AI Business Advisor**.\n\nI have fully ingested the operational data for **${business.name}** (${business.categoryName}):\n- **Monthly Revenue**: ₹${Math.round(simulation.financials.totalRevenue).toLocaleString('en-IN')}\n- **Net Profit**: ₹${Math.round(simulation.financials.netProfit).toLocaleString('en-IN')} (${simulation.financials.netProfitMargin}% margin)\n- **Enterprise Health**: ${simulation.risks.businessHealthScore}/100\n\nSelect any strategic query below or type your custom inquiry to receive quantitative business advice.`,
      suggestedActions: [
        { label: 'Check Pricing Simulator', link: '/pricing-simulator' },
        { label: 'View Enterprise Risks', link: '/risk-analysis' }
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendQuery = (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    // Add user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: q
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Context for advisor
    const context = {
      business,
      financials: simulation.financials,
      inventory: simulation.inventory,
      demand: simulation.demand,
      competitors: simulation.competitorAnalysis?.competitors || [],
      risks: simulation.risks?.risks || [],
      userMarketShare: simulation.competitorAnalysis?.userMarketShare,
      businessHealthScore: simulation.risks?.businessHealthScore,
      compositeRiskScore: simulation.risks?.compositeRiskScore,
      overallSeverity: simulation.risks?.overallSeverity
    };

    setTimeout(() => {
      const response = answerAdvisorInquiry(q, context);
      setMessages((prev) => [...prev, { ...response, id: `adv-${Date.now()}` }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Bot className="w-4 h-4" />
            <span>Heuristic Conversational Advisor</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            AI Business Advisor
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Real-time conversational executive partner powered by deterministic microeconomic rules and live store metrics.
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyanAccent-400 shrink-0" />
          <span>Client-Side Intelligence Engine. No external AI API connected.</span>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400 block px-1">
          Recommended Strategic Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {ADVISOR_PROMPT_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleSendQuery(tmpl.label)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{tmpl.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono">
                {tmpl.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="glass-card rounded-2xl flex flex-col h-[580px] overflow-hidden border-slate-800">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyanAccent-400 p-0.5 shrink-0 shadow-lg shadow-brand-500/20">
                    <div className="w-full h-full bg-[var(--bg-base)] rounded-[10px] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-cyanAccent-400" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-5 ${
                    isUser
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-bold text-white">
                      {isUser ? 'You' : msg.title || 'Advisor Insight'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                    {msg.text}
                  </div>

                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
                      {msg.suggestedActions.map((action, idx) => (
                        <NavLink
                          key={idx}
                          to={action.link}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 border border-brand-500/30 transition-colors"
                        >
                          {action.label} <ChevronRight className="w-3 h-3" />
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3.5 items-center text-xs text-slate-400 pl-12">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
              Advisor engine formulating mathematical diagnosis...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask the advisor about pricing, inventory, margins, competitors, or risk..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-sans"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Advisor</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

