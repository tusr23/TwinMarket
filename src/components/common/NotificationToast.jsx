import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-cyanAccent-400" />
  };

  const borders = {
    success: 'border-emerald-500/40 bg-slate-900/95 shadow-emerald-500/10',
    warning: 'border-amber-500/40 bg-slate-900/95 shadow-amber-500/10',
    error: 'border-rose-500/40 bg-slate-900/95 shadow-rose-500/10',
    info: 'border-cyan-500/40 bg-slate-900/95 shadow-cyan-500/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-xl ${borders[toast.type] || borders.info}`}>
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium text-slate-100 max-w-sm">
          {toast.message}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

