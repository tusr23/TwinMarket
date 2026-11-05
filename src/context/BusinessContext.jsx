import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  loadActiveBusiness,
  saveActiveBusiness,
  runFullSimulationCycle,
  createNewBusiness
} from '../simulation/simulationManager.js';
import { DEMO_BUSINESS } from '../simulation/defaultData.js';

const BusinessContext = createContext(null);

export function BusinessProvider({ children }) {
  const [business, setBusiness] = useState(() => loadActiveBusiness());
  const [currency, setCurrency] = useState('INR'); // 'INR', 'USD', 'EUR', 'GBP'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('twinmarket_ai_theme') || 'cyber-violet';
  });
  const [toast, setToast] = useState(null);
  const [simulationTick, setSimulationTick] = useState(0);

  // Apply theme to DOM
  useEffect(() => {
    localStorage.setItem('twinmarket_ai_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Re-run simulation cycle whenever business state changes or tick updates
  const simulation = useMemo(() => {
    return runFullSimulationCycle(business);
  }, [business, simulationTick]);

  // Save to LocalStorage whenever business changes
  useEffect(() => {
    saveActiveBusiness(business);
  }, [business]);

  // Show Toast helper
  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Currency Formatter
  const formatCurrency = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '₹0';
    const num = Math.round(val);
    if (currency === 'USD') {
      return `$${Math.round(num / 84).toLocaleString('en-US')}`;
    } else if (currency === 'EUR') {
      return `€${Math.round(num / 91).toLocaleString('de-DE')}`;
    } else if (currency === 'GBP') {
      return `£${Math.round(num / 108).toLocaleString('en-GB')}`;
    }
    // Default INR (₹)
    return `₹${num.toLocaleString('en-IN')}`;
  };

  // Add activity log entry
  const logActivity = (title, detail, type = 'general', impact = '') => {
    const newEntry = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title,
      detail,
      type,
      impact
    };
    return newEntry;
  };

  // 1. Update product price
  const updateProductPrice = (productId, newPrice) => {
    setBusiness((prev) => {
      const targetProd = prev.products.find((p) => p.id === productId);
      const oldPrice = targetProd ? targetProd.sellingPrice : 0;
      const updatedProducts = prev.products.map((p) =>
        p.id === productId ? { ...p, sellingPrice: Number(newPrice) } : p
      );

      const diff = Number(newPrice) - oldPrice;
      const act = logActivity(
        'Product Price Calibrated',
        `Adjusted ${targetProd?.name} from ${formatCurrency(oldPrice)} to ${formatCurrency(newPrice)}`,
        'pricing',
        `${diff > 0 ? '+' : ''}${formatCurrency(diff)}`
      );

      return {
        ...prev,
        products: updatedProducts,
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });
    showToast(`Updated price to ${formatCurrency(newPrice)}`, 'success');
  };

  // 2. Update product cost
  const updateProductCost = (productId, newCost) => {
    setBusiness((prev) => {
      const updatedProducts = prev.products.map((p) =>
        p.id === productId ? { ...p, costPrice: Number(newCost) } : p
      );
      return {
        ...prev,
        products: updatedProducts
      };
    });
    showToast('Updated purchase cost', 'info');
  };

  // 3. Update product stock (manual restock)
  const updateProductStock = (productId, newStock) => {
    setBusiness((prev) => {
      const prod = prev.products.find((p) => p.id === productId);
      const stockDiff = Number(newStock) - (prod?.stock || 0);
      const totalCost = stockDiff > 0 ? stockDiff * (prod?.costPrice || 0) : 0;

      const updatedProducts = prev.products.map((p) =>
        p.id === productId ? { ...p, stock: Math.max(0, Number(newStock)) } : p
      );

      const newCash = Math.max(0, prev.currentCash - totalCost);
      const act = logActivity(
        'Inventory Adjusted',
        `${prod?.name} stock updated to ${newStock} units (${stockDiff > 0 ? `+${stockDiff} ordered` : `${stockDiff} removed`})`,
        'inventory',
        stockDiff > 0 ? `-${formatCurrency(totalCost)} Cash` : 'Stock updated'
      );

      return {
        ...prev,
        products: updatedProducts,
        currentCash: newCash,
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });
    showToast('Stock level updated successfully', 'success');
  };

  // 4. Batch Restock Low Stock items
  const restockLowStockProducts = () => {
    let totalCashSpent = 0;
    let itemsCount = 0;

    setBusiness((prev) => {
      const updatedProducts = prev.products.map((p) => {
        if (p.stock < (p.minStock || 15)) {
          const needed = (p.maxStock || 50) - p.stock;
          const cost = needed * p.costPrice;
          totalCashSpent += cost;
          itemsCount++;
          return { ...p, stock: p.maxStock || 50 };
        }
        return p;
      });

      if (itemsCount === 0) return prev;

      const act = logActivity(
        'Batch Inventory Replenishment',
        `Restocked ${itemsCount} low-stock SKUs to standard capacity`,
        'inventory',
        `-${formatCurrency(totalCashSpent)} Cash`
      );

      return {
        ...prev,
        products: updatedProducts,
        currentCash: Math.max(0, prev.currentCash - totalCashSpent),
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });

    if (itemsCount > 0) {
      showToast(`Restocked ${itemsCount} SKUs (-${formatCurrency(totalCashSpent)})`, 'success');
    } else {
      showToast('All products are currently above minimum safety buffers', 'info');
    }
  };

  // 5. Add new product
  const addProduct = (productData) => {
    const newProd = {
      id: `sku-${Date.now()}`,
      name: productData.name,
      category: productData.category || 'General',
      costPrice: Number(productData.costPrice),
      sellingPrice: Number(productData.sellingPrice),
      stock: Number(productData.stock || 20),
      minStock: Number(productData.minStock || 8),
      maxStock: Number(productData.maxStock || 80),
      qualityScore: Number(productData.qualityScore || 85),
      baseMonthlyDemand: Number(productData.baseMonthlyDemand || 30)
    };

    const initialInventoryCost = newProd.stock * newProd.costPrice;

    setBusiness((prev) => {
      const act = logActivity(
        'New Product Added',
        `Listed ${newProd.name} at ${formatCurrency(newProd.sellingPrice)}`,
        'product',
        `Initial Stock: ${newProd.stock}`
      );

      return {
        ...prev,
        products: [newProd, ...prev.products],
        currentCash: Math.max(0, prev.currentCash - initialInventoryCost),
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });
    showToast(`Added "${newProd.name}" to inventory`, 'success');
  };

  // 6. Remove product
  const removeProduct = (productId) => {
    setBusiness((prev) => {
      const prod = prev.products.find((p) => p.id === productId);
      const act = logActivity(
        'Product Delisted',
        `Removed ${prod?.name || 'Item'} from active catalog`,
        'product'
      );
      return {
        ...prev,
        products: prev.products.filter((p) => p.id !== productId),
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });
    showToast('Product removed from catalog', 'info');
  };

  // 7. Apply market scenario
  const applyMarketScenario = (scenarioId) => {
    setBusiness((prev) => {
      const act = logActivity(
        'Market Scenario Triggered',
        `Simulating market shock scenario: ${scenarioId}`,
        'market',
        'Live Environment Shift'
      );
      return {
        ...prev,
        activeScenarioId: scenarioId,
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });
    showToast(`Activated scenario: ${scenarioId}`, 'warning');
  };

  // 8. Clear market scenario
  const clearMarketScenario = () => {
    setBusiness((prev) => {
      const act = logActivity(
        'Market Scenario Cleared',
        'Returned market conditions to baseline equilibrium',
        'market',
        'Standard Market'
      );
      return {
        ...prev,
        activeScenarioId: null,
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });
    showToast('Market scenario cleared. Conditions restored to normal.', 'info');
  };

  // 9. Update Business Settings / Parameters
  const updateBusinessSettings = (updates) => {
    setBusiness((prev) => ({
      ...prev,
      ...updates
    }));
    showToast('Business parameters updated', 'success');
  };

  // 10. Switch or Create new business
  const createNewVirtualBusiness = (formData) => {
    const newBiz = createNewBusiness(formData);
    setBusiness(newBiz);
    showToast(`Created and launched "${newBiz.name}"!`, 'success');
  };

  // 11. Reset to Demo Business
  const resetToDemo = () => {
    setBusiness(JSON.parse(JSON.stringify(DEMO_BUSINESS)));
    showToast('Reset business data to demo state', 'info');
  };

  // 12. Trigger Manual Simulation Tick
  const triggerSimulationRun = (note = 'Manual Market Simulation Executed') => {
    setSimulationTick((t) => t + 1);
    setBusiness((prev) => {
      const act = logActivity(
        'Simulation Engine Executed',
        note,
        'system',
        'Recalibrated Metrics'
      );
      return {
        ...prev,
        activityLog: [act, ...prev.activityLog.slice(0, 25)]
      };
    });
    showToast('Simulation calculation complete! All market metrics updated.', 'success');
  };

  const value = {
    business,
    simulation,
    currency,
    setCurrency,
    theme,
    setTheme,
    formatCurrency,
    toast,
    showToast,
    updateProductPrice,
    updateProductCost,
    updateProductStock,
    restockLowStockProducts,
    addProduct,
    removeProduct,
    applyMarketScenario,
    clearMarketScenario,
    updateBusinessSettings,
    createNewVirtualBusiness,
    resetToDemo,
    triggerSimulationRun
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return ctx;
}

