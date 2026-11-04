import React, { useState } from 'react';
import {
  Boxes,
  PlusCircle,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Trash2,
  PackagePlus,
  ArrowUpRight,
  Sparkles,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useBusiness } from '../context/BusinessContext.jsx';

export default function InventoryManagement() {
  const {
    business,
    simulation,
    formatCurrency,
    updateProductStock,
    restockLowStockProducts,
    addProduct,
    removeProduct
  } = useBusiness();

  const inventory = simulation.inventory;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Modal Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Flagships',
    costPrice: 25000,
    sellingPrice: 34999,
    stock: 30,
    minStock: 10,
    maxStock: 80,
    qualityScore: 88,
    baseMonthlyDemand: 40
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    addProduct(newProd);
    setIsAddModalOpen(false);
    setNewProd({
      name: '',
      category: 'Flagships',
      costPrice: 25000,
      sellingPrice: 34999,
      stock: 30,
      minStock: 10,
      maxStock: 80,
      qualityScore: 88,
      baseMonthlyDemand: 40
    });
  };

  // Filtered SKUs
  const categories = ['ALL', ...new Set(business.products.map((p) => p.category))];
  const filteredSkus = inventory.skuAnalysis.filter((sku) => {
    const matchesSearch = sku.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || sku.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  // Chart data
  const chartData = inventory.skuAnalysis.map((sku) => ({
    name: sku.name.length > 15 ? sku.name.substring(0, 14) + '...' : sku.name,
    CurrentStock: sku.stock,
    SafetyBuffer: sku.minStock || 10,
    PredictedDemand: sku.predictedUnits
  }));

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400 mb-2">
            <Boxes className="w-4 h-4" />
            <span>Supply Chain & Warehouse Intelligence</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Inventory Management
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
            Monitor real-time warehouse velocity, buffer safety levels, carrying overheads, and automated replenishment cycles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={restockLowStockProducts}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Batch Restock Low Stock
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Product
          </button>
        </div>
      </div>

      {/* 4 Inventory Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Total Stock On Hand</span>
          <h3 className="text-3xl font-extrabold text-white mt-2">{inventory.totalStockUnits} Units</h3>
          <span className="text-xs text-slate-400 mt-2 block">{business.products.length} Active Catalog SKUs</span>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Wholesale Capital Value</span>
          <h3 className="text-3xl font-extrabold text-cyanAccent-400 mt-2">{formatCurrency(inventory.totalCostValue)}</h3>
          <span className="text-xs text-slate-400 mt-2 block">Wholesale acquisition value</span>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Retail Realization Value</span>
          <h3 className="text-3xl font-extrabold text-brand-400 mt-2">{formatCurrency(inventory.totalRetailValue)}</h3>
          <span className="text-xs text-emerald-400 font-semibold mt-2 block">
            +{formatCurrency(inventory.totalUnrealizedProfit)} Unrealized Margin
          </span>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <span className="text-xs font-semibold uppercase text-slate-400">Stock Turnover Ratio</span>
          <h3 className="text-3xl font-extrabold text-emerald-400 mt-2">{inventory.turnoverRatio}x / yr</h3>
          <span className="text-xs text-slate-400 mt-2 block">Health: {inventory.healthScore}/100</span>
        </div>
      </div>

      {/* Stock Health Alerts Banner if any */}
      {(inventory.outOfStockCount > 0 || inventory.lowStockCount > 0) && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Supply Chain Warning
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                {inventory.outOfStockCount > 0 && `${inventory.outOfStockCount} SKUs are completely out of stock. `}
                {inventory.lowStockCount > 0 && `${inventory.lowStockCount} SKUs have fallen below minimum safety buffer.`}
              </p>
            </div>
          </div>
          <button
            onClick={restockLowStockProducts}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shrink-0 cursor-pointer"
          >
            Restock Now
          </button>
        </div>
      )}

      {/* Stock Level vs Predicted Demand Chart */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1">
          Stock Levels vs Monthly Demand vs Safety Buffer
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Identify overstock or stockout vulnerabilities across key catalog lines
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0F1523', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="CurrentStock" name="Current Stock" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="SafetyBuffer" name="Min Safety Buffer" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="PredictedDemand" name="Predicted Demand" fill="#06B6D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Products & Inventory Table */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        {/* Table Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products by SKU or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">SKU / Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Cost Price</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">Stock Units</th>
                <th className="py-3 px-4">Days Supply</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Restock</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredSkus.map((sku) => (
                <tr key={sku.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{sku.name}</td>
                  <td className="py-3.5 px-4 text-slate-400">{sku.category}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{formatCurrency(sku.costPrice)}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-200">{formatCurrency(sku.sellingPrice)}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">{sku.stock}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{sku.daysOfSupply} days</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sku.statusColor}`}>
                      {sku.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => updateProductStock(sku.id, sku.stock + 10)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-mono cursor-pointer transition-colors"
                        title="Add 10 units"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => updateProductStock(sku.id, sku.stock + 25)}
                        className="px-2 py-1 bg-brand-900/50 hover:bg-brand-800/60 text-brand-300 border border-brand-500/30 rounded text-[11px] font-mono cursor-pointer transition-colors"
                        title="Add 25 units"
                      >
                        +25
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => removeProduct(sku.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors cursor-pointer"
                      title="Delist SKU"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0F1523] border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-white">Add New Catalog Product</h3>
                <p className="text-xs text-slate-400 mt-0.5">Integrate SKU into live pricing & demand simulation</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Google Pixel 9 Pro"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <input
                    type="text"
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    min="1"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Cost Price (INR)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProd.costPrice}
                    onChange={(e) => setNewProd({ ...newProd, costPrice: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Selling Price (INR)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProd.sellingPrice}
                    onChange={(e) => setNewProd({ ...newProd, sellingPrice: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Min Safety Buffer</label>
                  <input
                    type="number"
                    min="1"
                    value={newProd.minStock}
                    onChange={(e) => setNewProd({ ...newProd, minStock: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Base Monthly Demand</label>
                  <input
                    type="number"
                    min="1"
                    value={newProd.baseMonthlyDemand}
                    onChange={(e) => setNewProd({ ...newProd, baseMonthlyDemand: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/25 cursor-pointer"
                >
                  Confirm & List SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

