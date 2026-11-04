/**
 * TwinMarket AI - Competitor Intelligence Simulation Engine
 * Simulates game-theoretic responses of rival businesses to user pricing,
 * marketing moves, and macroeconomic shocks.
 */

/**
 * Evaluates competitors' reaction to a user action (price change, marketing surge, scenario)
 */
export function simulateCompetitorReactions({
  userPriceDeltaPct = 0,
  userMarketingDeltaPct = 0,
  competitors = [],
  userMarketShare = 15,
  activeScenario = null
}) {
  const reactionLogs = [];
  let marketShareShiftToUser = 0;

  // Process each competitor
  const updatedCompetitors = competitors.map((comp) => {
    let newPriceFactor = comp.priceFactor;
    let promoActive = comp.promoActive;
    let shareChange = 0;
    let reactionNote = '';

    // If user increased prices (> +3%)
    if (userPriceDeltaPct > 3) {
      if (comp.strategy.toLowerCase().includes('aggressive') || comp.strategy.toLowerCase().includes('discount')) {
        // Aggressive rival holds price or cuts slightly to poach customers
        newPriceFactor = Math.max(0.85, comp.priceFactor - 0.02);
        promoActive = true;
        shareChange = +1.8;
        marketShareShiftToUser -= 1.8;
        reactionNote = `${comp.name} launched a predatory discount campaign to capture price-sensitive buyers moving away from your store.`;
      } else if (comp.strategy.toLowerCase().includes('volume') || comp.strategy.toLowerCase().includes('value')) {
        // Value store holds firm
        shareChange = +1.1;
        marketShareShiftToUser -= 1.1;
        reactionNote = `${comp.name} maintained its value pricing and reported an inflow of newly acquired walk-ins.`;
      } else {
        // Premium store raises price slightly to capture extra margin
        newPriceFactor = comp.priceFactor + 0.01;
        shareChange = +0.6;
        marketShareShiftToUser -= 0.6;
        reactionNote = `${comp.name} reaffirmed its luxury positioning, absorbing high-end customers without discounting.`;
      }
    }
    // If user decreased prices (< -3%)
    else if (userPriceDeltaPct < -3) {
      if (comp.strategy.toLowerCase().includes('aggressive')) {
        // Retaliatory price war response
        newPriceFactor = Math.max(0.82, comp.priceFactor - 0.035);
        promoActive = true;
        shareChange = -0.8;
        marketShareShiftToUser += 1.5;
        reactionNote = `${comp.name} detected your aggressive undercutting and immediately activated a retaliatory flash sale (-3.5%).`;
      } else if (comp.strategy.toLowerCase().includes('premium')) {
        // Premium store ignores price war and boosts warranty/loyalty perks
        newPriceFactor = comp.priceFactor;
        shareChange = -0.4;
        marketShareShiftToUser += 0.8;
        reactionNote = `${comp.name} refused to discount, emphasizing lifetime warranty and premium VIP support.`;
      } else {
        // Moderate price matching
        newPriceFactor = Math.max(0.90, comp.priceFactor - 0.015);
        shareChange = -0.5;
        marketShareShiftToUser += 1.0;
        reactionNote = `${comp.name} matched part of your price cut to stem customer defection.`;
      }
    }
    // If user boosted marketing (> +20%)
    else if (userMarketingDeltaPct > 20) {
      promoActive = true;
      shareChange = -0.5;
      marketShareShiftToUser += 0.9;
      reactionNote = `${comp.name} increased local social media ad spend by 15% to counter your marketing blitz.`;
    } else {
      reactionNote = `${comp.name} maintained stable operating cadence and standard catalog pricing.`;
    }

    // Scenario impacts
    if (activeScenario) {
      if (activeScenario.id === 'price-war') {
        newPriceFactor = Math.max(0.80, newPriceFactor - 0.05);
        promoActive = true;
        reactionNote += ' [Price War Triggered: Extra 5% slash]';
      } else if (activeScenario.id === 'supply-shortage') {
        newPriceFactor += 0.06;
        reactionNote += ' [Supply Shortage: Forced price hike to manage stock]';
      }
    }

    if (reactionNote) {
      reactionLogs.push({
        id: `log-${comp.id}-${Date.now()}`,
        competitorName: comp.name,
        strategy: comp.strategy,
        detail: reactionNote,
        priceAdjustment: `${((newPriceFactor - comp.priceFactor) * 100).toFixed(1)}%`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    const calculatedShare = Math.max(5, comp.marketShare + shareChange);

    return {
      ...comp,
      priceFactor: Number(newPriceFactor.toFixed(3)),
      marketShare: Number(calculatedShare.toFixed(1)),
      promoActive,
      lastReaction: reactionNote
    };
  });

  // Calculate new User Market Share and normalize total to 100%
  const updatedUserShare = Math.max(3, Math.min(60, userMarketShare + marketShareShiftToUser));
  const totalCompShare = updatedCompetitors.reduce((sum, c) => sum + c.marketShare, 0);
  const totalPool = totalCompShare + updatedUserShare;

  // Normalized
  const normalizedUserShare = Number(((updatedUserShare / totalPool) * 100).toFixed(1));
  const normalizedCompetitors = updatedCompetitors.map((c) => ({
    ...c,
    marketShare: Number(((c.marketShare / totalPool) * 100).toFixed(1))
  }));

  // Determine market threat level
  let threatLevel = 'Moderate';
  let threatDescription = 'Competitors are active but not engaging in predatory discounting.';
  const hasAggressivePromo = normalizedCompetitors.some((c) => c.promoActive && c.priceFactor < 0.93);
  if (hasAggressivePromo || (activeScenario && activeScenario.id === 'price-war')) {
    threatLevel = 'Severe (Price War)';
    threatDescription = 'Rivals have activated deep margin cuts. Customers have high incentive to switch.';
  } else if (normalizedUserShare > 25) {
    threatLevel = 'Elevated (Target of Rivals)';
    threatDescription = 'Your market share growth is drawing targeted competitive retaliation.';
  } else if (normalizedUserShare < 10) {
    threatLevel = 'High (Squeezed Margin)';
    threatDescription = 'Dominant competitors control market pricing power and customer mindshare.';
  }

  return {
    competitors: normalizedCompetitors,
    userMarketShare: normalizedUserShare,
    threatLevel,
    threatDescription,
    reactionLogs
  };
}

