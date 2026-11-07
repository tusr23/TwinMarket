import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-white" />,
    warning: <AlertTriangle className="w-5 h-5 text-zinc-300" />,
    error: <AlertCircle className="w-5 h-5 text-zinc-400" />,
    info: <Info className="w-5 h-5 text-white" />
  };

  const borders = {
    success: 'border-white/30 bg-black/95 text-white shadow-2xl',
    warning: 'border-zinc-400/30 bg-black/95 text-white shadow-2xl',
    error: 'border-zinc-500/30 bg-black/95 text-white shadow-2xl',
    info: 'border-white/20 bg-black/95 text-white shadow-2xl'
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

