import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BusinessProvider, useBusiness } from './context/BusinessContext.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import NotificationToast from './components/common/NotificationToast.jsx';

// Pages
import Dashboard from './pages/Dashboard.jsx';
import MyBusiness from './pages/MyBusiness.jsx';
import ProductManagement from './pages/ProductManagement.jsx';
import PricingSimulator from './pages/PricingSimulator.jsx';
import CompetitorIntelligence from './pages/CompetitorIntelligence.jsx';
import CustomerDemand from './pages/CustomerDemand.jsx';
import MarketSimulator from './pages/MarketSimulator.jsx';
import InventoryManagement from './pages/InventoryManagement.jsx';
import RiskAnalysis from './pages/RiskAnalysis.jsx';
import AIBusinessAdvisor from './pages/AIBusinessAdvisor.jsx';
import BusinessReports from './pages/BusinessReports.jsx';
import Settings from './pages/Settings.jsx';
import WhatIfSimulator from './pages/WhatIfSimulator.jsx';
import StrategyComparison from './pages/StrategyComparison.jsx';
import PlatformGuide from './pages/PlatformGuide.jsx';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useBusiness();

  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-primary,#ffffff)] flex transition-colors duration-300">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Global Header */}
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-business" element={<MyBusiness />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/pricing-simulator" element={<PricingSimulator />} />
            <Route path="/competitors" element={<CompetitorIntelligence />} />
            <Route path="/customer-demand" element={<CustomerDemand />} />
            <Route path="/market-simulator" element={<MarketSimulator />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/risk-analysis" element={<RiskAnalysis />} />
            <Route path="/advisor" element={<AIBusinessAdvisor />} />
            <Route path="/reports" element={<BusinessReports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/what-if" element={<WhatIfSimulator />} />
            <Route path="/strategies" element={<StrategyComparison />} />
            <Route path="/guide" element={<PlatformGuide />} />
            <Route path="/how-to-use" element={<PlatformGuide />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Notifications */}
      <NotificationToast toast={toast} />
    </div>
  );
}

export default function App() {
  return (
    <BusinessProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </BusinessProvider>
  );
}

