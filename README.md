# TwinMarket AI — Virtual Business Simulation & Market Intelligence Platform

**TwinMarket AI** is an advanced, production-grade client-side business simulation and market intelligence web platform built with **React**, **Tailwind CSS**, **Recharts**, **Framer Motion**, and **Lucide React**.

It models a realistic enterprise business environment where users can create virtual businesses, calibrate product pricing, battle simulated AI rivals, predict demand elasticity, manage warehouse inventory buffers, assess enterprise risks with a 5x5 heatmap, and consult a conversational AI business advisor.

---

## 🚀 Key Features & Modules

### 1. Executive Dashboard (Module 1)
- **8 Core Real-Time KPIs**: Total Revenue, Total Expenses, Net Profit, Profit Margin, Customer Demand, Market Share %, Inventory Value, and Business Health Score.
- **Interactive Multi-Horizon Charts**:
  - 12-Month Revenue & Net Profit Trajectory (Historical actuals + forward projected growth).
  - Customer Demand vs Fulfillment Capacity bar charts.
  - Market Share Donut Visualization (100% normalized pool).
- **AI Real-Time Insights Ribbon**: Actionable suggestions linking directly to remediation tools.
- **Live Transaction Ledger**: Real-time business activity stream.

### 2. Virtual Business Creation & Overview (Module 2)
- **7 Industry Categories**: Mobile Shop, Clothing Store, Electronics Store, Grocery Store, Restaurant & Bistro, Cosmetics & Skincare, Custom Venture.
- **Enterprise Creation Wizard**: Form to configure Business Name, Category, Initial Capital, Location, Target Demographics, and Strategy.
- **Automatic Environment Synthesis**: Automatically generates starting SKU lineup, rival competitors, cost bases, and market elasticity coefficients.
- **Treasury Management**: Simulate capital injections, dividend withdrawals, and runway monitoring.

### 3. AI Product Pricing Simulator (Module 3)
- **Interactive Microeconomic Pricing Lab**:
  - Dynamic Selling Price slider and Wholesale Cost calibration.
  - Unit contribution margin and gross margin calculation.
  - Price Competitiveness Index (0–100) benchmarked against rival market averages.
- **Before vs After Comparative Analytics**:
  - Side-by-side metric cards with percentage and currency deltas.
  - Before vs After comparison bar charts.
- **Dynamic Price Elasticity & Revenue Curve**:
  - Plots expected demand, revenue, and profit across ±30% price shifts.
- **"Run Market Simulation & Apply"**: Commits pricing calibration to live inventory and triggers rival reactions.

### 4. AI Competitor Simulation (Module 4)
- **3–5 Virtual Competitors**: Real-time competitor profiles with Pricing Multipliers, Market Share %, Customer Satisfaction, Strategy Profiles (Aggressive Discounter, Premium Experience, High-Volume Value, Regional Retail), and Financial Strength ratings.
- **Game-Theoretic Reaction Stress-Testing**: Simulate user price cuts, price hikes, or ad blitzes to witness rival counter-promotions and market share reallocation.
- **Competitive Dimension Radar**: Benchmark Price, Satisfaction, Brand Power, Financial Buffer, and Market Agility.

### 5. Customer Demand Prediction (Module 5)
- **Multi-Factor Microeconomic Demand Model**:
  $$\text{Demand} = \text{Base} \times (1 + \% \Delta P)^E \times \text{CompAttractiveness} \times \text{MarketingEff} \times \text{Seasonality} \times \text{ScenarioEffect}$$
- **Customer Segmentation Architecture**:
  - Price-Sensitive Bargain Hunters (38%)
  - Rational Value Seekers (32%)
  - Premium Brand Loyalists (18%)
  - Impulse & Convenience Buyers (12%)
- **Seasonal Demand Cycles**: Monthly seasonality indexes (festive surge, holiday rush, summer sales).
- **Interactive Marketing Ad Budget Slider**: Real-time demand expansion simulation.

### 6. Inventory & Product Management (Module 6 & Catalog)
- **Comprehensive Stock Monitoring**: Track stock on hand, days of supply remaining, wholesale cost value, and unrealized margin.
- **Stock Turnover Ratio & Health Scoring**: Automatic stockout risk penalties.
- **Batch Restock Automation**: Replenish low stock items with treasury deductions.
- **Product Management**: Add new SKUs, adjust pricing, update safety buffers, and delist items.

### 7. Market Competition Simulator (Module 7)
- **8 Selectable Real-World Scenarios**:
  1. Price War Outbreak
  2. Customer Demand Surge (Boom)
  3. Economic Slowdown (Recession)
  4. New Well-Funded Competitor Entry
  5. Supply Chain Bottleneck
  6. Festival & Holiday Season Surge
  7. Viral Marketing Campaign
  8. Wholesale Tariff & Price Shock
- **Scenario Impact Engine**: Compare Baseline vs Scenario Impact across Revenue, Profit, Demand, and Health Score.
- **"Activate On Live Business"**: Live store simulation switch.

### 8. Enterprise Risk Analysis & Heatmap (Module 8)
- **6 Enterprise Vectors**: Financial, Competition, Inventory, Pricing, Demand, and Market Risk.
- **Interactive 5x5 Likelihood vs Impact Matrix**: Visual heatmap with clickable coordinate nodes.
- **Prescribed Remediation Actions**: Actionable mitigation guidelines for each risk vector.

### 9. AI Business Advisor (Module 9)
- **Conversational Intelligence Advisor**:
  - Context-aware chatbot evaluating live metrics, specific product names, cash levels, and competitor moves.
  - Quick-prompt chips: "How can I increase profit?", "Should I reduce price?", "Which product is performing best?", "How can I defeat competitors?", "What are my biggest risks?".
  - Clear disclaimer: *Client-Side Intelligence Engine. No external AI API connected.*

### 10. Advanced Sandbox Features (Module 4A, 4B, 4C, 4D)
- **What-If Multi-Variable Simulator**: Adjust price delta, marketing spend, stock buffers, and fixed overhead simultaneously.
- **Business Health Score Gauge**: Animated circular radial indicator evaluating Profitability (25%), Demand (20%), Market Share (20%), Inventory (15%), and Stability (20%).
- **Strategy Comparison**: Compare Aggressive Growth, Balanced Strategy, and Maximum Profit over 3, 6, and 12-month projections.
- **Market Intelligence Report**: Print-optimized executive dossier (`@media print` supported) and full JSON backup export/import.

### 11. Platform Guide & System Manual (`/guide`)
- **10-Step Interactive Workflow**: Sequential operations manual with direct launch buttons for every module.
- **Microeconomic Mathematical Specifications**: Explainable formulas for PED, Logarithmic Ad Multipliers, Rival Game Theory, and the Composite Health Score.
- **Platform Architecture & Specifications**: Detailed technical mapping of all 7 simulation engine files to UI pages.
- **Interactive Knowledge Base & FAQ**: Expandable answers to common operational questions.

---

## 🛠 Technology Stack

- **Framework**: React.js 18 (Vite 6)
- **Styling**: Tailwind CSS 3 (Dark SaaS theme, custom glow, glassmorphism)
- **Charts**: Recharts (Area, Bar, Line, Pie, Radar)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **Persistence**: LocalStorage with demo data fallback

---

## 🏃 Running the Application Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. Build for production:
   ```bash
   npm run build
   ```

