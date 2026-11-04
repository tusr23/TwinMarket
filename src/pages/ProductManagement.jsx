import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Package,
  PlusCircle,
  TrendingUp,
  Percent,
  Search,
  Filter,
  Trash2,
  Edit2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext.jsx';

export default function ProductManagement() {
  const {
    business,
    simulation,
    formatCurrency,
    updateProductPrice,
    updateProductCost,
    addProduct,
    removeProduct
  } = useBusiness();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [editingProdId, setEditingProdId] = useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editCost, setEditCost] = useState(0);

  const categories = ['ALL', ...new Set(business.products.map((p) => p.category))];

  const filteredProducts = business.products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleStartEdit = (prod) => {
    setEditingProdId(prod.id);
    setEditPrice(prod.sellingPrice);
    setEditCost(prod.costPrice);
  };

  const handleSaveEdit = (prodId) => {
    updateProductPrice(prodId, editPrice);
    updateProductCost(prodId, editCost);
    setEditingProdId(null);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Package className="w-4 h-4" />
            <span>Product Catalog & Unit Economics Architecture</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Product Management
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Configure product purchase costs, retail selling prices, quality ratings, and inspect contribution margins across your inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/pricing-simulator"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" />
            Launch Pricing Simulator
          </NavLink>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search catalog by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => {
          const isEditing = editingProdId === prod.id;
          const currentMargin = prod.sellingPrice > 0
            ? (((prod.sellingPrice - prod.costPrice) / prod.sellingPrice) * 100).toFixed(1)
            : 0;

          return (
            <div
              key={prod.id}
              className="glass-card rounded-2xl p-6 border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {prod.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleStartEdit(prod)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                      title="Edit Prices"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeProduct(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                      title="Delist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-3">{prod.name}</h3>

                {isEditing ? (
                  <div className="space-y-3 p-3 bg-slate-900/90 rounded-xl border border-brand-500/40 mb-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Selling Price (INR)</label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Purchase Cost (INR)</label>
                      <input
                        type="number"
                        value={editCost}
                        onChange={(e) => setEditCost(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setEditingProdId(null)}
                        className="px-2.5 py-1 rounded text-[11px] bg-slate-800 text-slate-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(prod.id)}
                        className="px-3 py-1 rounded text-[11px] font-bold bg-brand-600 text-white"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Retail Selling Price:</span>
                      <span className="font-mono font-bold text-white">{formatCurrency(prod.sellingPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Wholesale Purchase Cost:</span>
                      <span className="font-mono text-slate-300">{formatCurrency(prod.costPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Unit Contribution:</span>
                      <span className="font-mono font-semibold text-emerald-400">
                        +{formatCurrency(prod.sellingPrice - prod.costPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gross Margin %:</span>
                      <span className="font-mono font-bold text-cyanAccent-400">{currentMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Quality Score:</span>
                      <span className="font-bold text-brand-300">{prod.qualityScore}/100</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Stock: <strong className="text-white">{prod.stock} units</strong>
                </span>
                <NavLink
                  to="/pricing-simulator"
                  className="text-cyanAccent-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  Simulate <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

