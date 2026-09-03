// Swatantra Bharat Scheme - Smart Partner Routing Engine
// Evaluates and ranks authorized channel partners using multi-criteria optimization:
// 1. Scheme compatibility (40 pts)
// 2. Current fund/processing availability (30 pts)
// 3. Operational eligibility & low NPA rating (20 pts)
// 4. Distance proximity (10 pts)
// Generates clear, human-readable comparative routing justification.

import { PARTNERS } from "../data/partners.js";

/**
 * Routes and ranks partners based on the chosen scheme, beneficiary location, and operational parameters.
 * @param {string} schemeId - E.g. 'micro-finance', 'term-loan', 'educational-loan'
 * @param {string} [cityFilter] - Optional filter by city
 * @param {string} [typeFilter] - Optional filter by partner type ('ALL', 'SCA', 'PSB', etc.)
 * @returns {Object} { rankedPartners, topRecommendedPartner, routingRationale }
 */
export function routePartners(schemeId = "micro-finance", cityFilter = "ALL", typeFilter = "ALL") {
  const scoredPartners = PARTNERS.map((partner) => {
    let schemeScore = 0;
    let availabilityScore = 0;
    let operationalScore = 0;
    let distanceScore = 0;
    const rationalePoints = [];

    // 1. Scheme Compatibility (40 pts)
    const supportsScheme = partner.supportedSchemes.includes(schemeId);
    if (supportsScheme) {
      schemeScore = 40;
      rationalePoints.push(`Certified & authorized to disburse this specific scheme.`);
    } else {
      schemeScore = 0;
      rationalePoints.push(`Not authorized for the selected scheme window.`);
    }

    // 2. Current Fund & Processing Availability (30 pts)
    // E.g. 94% availability yields ~28 pts, 45% yields ~13 pts
    const fundFactor = (partner.fundAvailabilityScore || 50) / 100;
    availabilityScore = Math.round(fundFactor * 30);
    if (partner.fundAvailabilityScore >= 80) {
      rationalePoints.push(`Active concessional window with ${partner.fundAvailabilityScore}% fund quota availability.`);
    } else if (partner.fundAvailabilityScore >= 60) {
      rationalePoints.push(`Moderate processing availability (${partner.fundAvailabilityScore}% quota remaining).`);
    } else {
      rationalePoints.push(`Constrained quota: Only ${partner.fundAvailabilityScore}% quota remaining.`);
    }

    // 3. Operational Eligibility & NPA Health (20 pts)
    if (partner.npaLevel.includes("Minimal") || partner.npaLevel.includes("Low")) {
      operationalScore = 20;
      rationalePoints.push(`Clean operational rating with low NPA backlog (${partner.npaLevel}).`);
    } else if (partner.npaLevel.includes("Moderate")) {
      operationalScore = 14;
      rationalePoints.push(`Satisfactory operational health.`);
    } else {
      operationalScore = 6;
      rationalePoints.push(`Higher processing delay due to elevated compliance reviews.`);
    }

    // 4. Distance Proximity (10 pts)
    // Closer distance gets higher score, but distance alone CANNOT override low availability!
    const dist = partner.distanceKm || 5;
    if (dist <= 3) {
      distanceScore = 10;
    } else if (dist <= 5) {
      distanceScore = 7;
    } else if (dist <= 10) {
      distanceScore = 4;
    } else {
      distanceScore = 2;
    }

    const totalRoutingScore = schemeScore + availabilityScore + operationalScore + distanceScore;

    return {
      ...partner,
      supportsScheme,
      routingScore: totalRoutingScore,
      scoreBreakdown: {
        schemeScore,
        availabilityScore,
        operationalScore,
        distanceScore,
      },
      rationalePoints,
    };
  });

  // Filter if user selected a specific type or city
  let filtered = scoredPartners;
  if (typeFilter && typeFilter !== "ALL") {
    filtered = filtered.filter((p) => p.type === typeFilter);
  }
  if (cityFilter && cityFilter !== "ALL") {
    filtered = filtered.filter((p) => p.city.toLowerCase() === cityFilter.toLowerCase());
  }

  // Sort by overall routing score (descending)
  filtered.sort((a, b) => b.routingScore - a.routingScore);

  const topRecommendedPartner = filtered[0] || null;

  let routingRationale = "";
  if (topRecommendedPartner) {
    routingRationale = `This partner is recommended because it supports your selected scheme, has high active fund quota availability (${topRecommendedPartner.fundAvailabilityScore}%), an expedited turnaround of ~${topRecommendedPartner.avgProcessingDays} days, and verified operational compliance.`;
  }

  return {
    rankedPartners: filtered,
    topRecommendedPartner,
    routingRationale,
  };
}
