// Swatantra Bharat Scheme - Rule-Based Scheme Matching Engine
// Implements 100-point weighted compatibility scoring:
// - Purpose match = 30 points
// - Income eligibility = 25 points
// - Project/education cost fit = 20 points
// - Beneficiary profile = 15 points
// - Loan requirement fit = 10 points
// Total = 100 points

import { SCHEMES } from "../data/schemes.js";

/**
 * Evaluates candidate profile against government schemes.
 * @param {Object} profile - User requirement inputs
 * @param {string} profile.purpose - E.g. 'micro_business', 'start_business', 'expand_business', 'education', 'skill_development'
 * @param {number} profile.projectCost - In INR (e.g. 120000)
 * @param {number} profile.income - In INR (e.g. 320000)
 * @param {string} profile.beneficiaryType - E.g. 'Aspiring entrepreneur', 'Student', 'Existing entrepreneur', 'Self-employed'
 * @param {string} [profile.gender] - 'Female', 'Male', 'Other'
 * @param {string} [profile.subDetail] - Optional adaptive detail
 * @returns {Array} List of schemes with matchScore, scoreBreakdown, and explainable reasons
 */
export function matchSchemes(profile) {
  const {
    purpose = "micro_business",
    projectCost = 120000,
    income = 320000,
    beneficiaryType = "Aspiring entrepreneur",
    gender = "Other",
  } = profile;

  const results = SCHEMES.map((scheme) => {
    let purposeScore = 0;
    let incomeScore = 0;
    let costScore = 0;
    let beneficiaryScore = 0;
    let loanFitScore = 0;
    const reasons = [];

    // 1. Purpose Match (Max: 30 Points)
    if (purpose === "education") {
      if (scheme.id === "educational-loan") {
        purposeScore = 28;
        reasons.push("Direct match: Scheme is exclusively dedicated to higher and professional education.");
      } else if (scheme.id === "skill-development-loan") {
        purposeScore = 20;
        reasons.push("Alternative match: Can support vocational certifications and technical training.");
      } else {
        purposeScore = 5;
      }
    } else if (purpose === "skill_development") {
      if (scheme.id === "skill-development-loan") {
        purposeScore = 28;
        reasons.push("Direct match: Tailored for skill development courses and professional toolkits.");
      } else if (scheme.id === "educational-loan") {
        purposeScore = 20;
        reasons.push("Related match: Supports accredited technical diploma/degree programs.");
      } else {
        purposeScore = 8;
      }
    } else if (purpose === "micro_business" || purpose === "start_business") {
      if (scheme.id === "micro-finance") {
        purposeScore = 28;
        reasons.push("Direct match: Purpose matches small & micro enterprise establishment.");
      } else if (scheme.id === "mahila-samriddhi") {
        if (gender === "Female") {
          purposeScore = 28;
          reasons.push("Priority match: Designed specifically for women entrepreneurs with subsidized 4% rate.");
        } else {
          purposeScore = 18;
          reasons.push("Matches micro-business activity (special focus on women and SHGs).");
        }
      } else if (scheme.id === "term-loan") {
        purposeScore = projectCost > 140000 ? 28 : 20;
        reasons.push("Supports business project capital, though primarily scaled for larger outlays.");
      } else if (scheme.id === "sanitation-workers-credit") {
        purposeScore = 18;
        reasons.push("Provides livelihood and dignified enterprise support.");
      } else {
        purposeScore = 6;
      }
    } else if (purpose === "expand_business") {
      if (scheme.id === "term-loan") {
        purposeScore = 28;
        reasons.push("Direct match: Specifically intended for business expansion and capital asset funding.");
      } else if (scheme.id === "micro-finance") {
        purposeScore = projectCost <= 140000 ? 22 : 12;
        reasons.push("Can provide modest working capital expansion within ₹1.40 Lakh ceiling.");
      } else {
        purposeScore = 8;
      }
    } else {
      // Other
      purposeScore = 15;
    }

    // 2. Income Eligibility (Max: 25 Points)
    // Concessional ceiling is ₹5,00,000 per annum
    if (income <= 500000) {
      if (income <= 200000) {
        incomeScore = 24;
        reasons.push(`Annual family income of ₹${(income / 100000).toFixed(2)}L falls in priority bottom tier (highest concessional eligibility).`);
      } else if (income <= 350000) {
        // e.g. Demo scenario: ₹3,20,000 -> 23 pts
        incomeScore = 23;
        reasons.push(`Annual family income of ₹${(income / 100000).toFixed(2)}L is well within the ₹5 Lakh statutory concessional limit.`);
      } else {
        incomeScore = 21;
        reasons.push(`Annual family income of ₹${(income / 100000).toFixed(2)}L satisfies the ₹5 Lakh ceiling requirement.`);
      }
    } else {
      // Income exceeds ₹5 Lakh
      incomeScore = 0;
      reasons.push(`Income exceeds ₹5 Lakh ceiling. SC concessional lending requires annual family income ≤ ₹5,00,000.`);
    }

    // 3. Project / Education Cost Fit (Max: 20 Points)
    if (projectCost <= scheme.maxLoanAmount) {
      const ratio = projectCost / scheme.maxLoanAmount;
      if (ratio >= 0.5 && ratio <= 1.0) {
        // Near-perfect cost fit (e.g. ₹1.20L for ₹1.40L limit = 85.7% utilization)
        costScore = 18;
        reasons.push(`Your estimated project cost is ₹${(projectCost / 100000).toFixed(1)} lakh, which fits within this scheme's maximum loan limit.`);
      } else if (ratio < 0.5 && ratio >= 0.1) {
        costScore = 15;
        reasons.push(`Cost of ₹${(projectCost / 100000).toFixed(2)}L is well within the ₹${(scheme.maxLoanAmount / 100000).toFixed(2)}L maximum allowance.`);
      } else {
        costScore = 13;
        reasons.push(`Cost requirement is covered under the scheme's ceiling.`);
      }
    } else {
      // Cost exceeds scheme maximum
      const excess = projectCost - scheme.maxLoanAmount;
      costScore = Math.max(0, 8 - Math.round(excess / 200000));
      reasons.push(`Requested amount exceeds this scheme limit by ₹${(excess / 100000).toFixed(2)}L.`);
    }

    // 4. Beneficiary Profile Match (Max: 15 Points)
    if (scheme.targetBeneficiaries.includes(beneficiaryType)) {
      beneficiaryScore = 14;
      reasons.push(`Your profile as an "${beneficiaryType}" aligns with target beneficiaries for this scheme.`);
    } else {
      beneficiaryScore = 8;
      reasons.push(`Open to all eligible marginalized applicants subject to verification.`);
    }

    // 5. Loan Requirement Fit / 90% Coverage (Max: 10 Points)
    const concessionalCoverageAmount = projectCost * 0.9;
    if (concessionalCoverageAmount <= scheme.maxLoanAmount) {
      loanFitScore = 9;
      reasons.push(`90% concessional credit (₹${(concessionalCoverageAmount / 100000).toFixed(2)}L) is fully sanctionable with 10% promoter equity.`);
    } else {
      loanFitScore = 4;
      reasons.push(`90% project coverage exceeds the maximum loan sanction limit.`);
    }

    // Calculate total score (capped at 99% to remind that final sanction is determined by channel partner)
    const rawScore = purposeScore + incomeScore + costScore + beneficiaryScore + loanFitScore;
    const finalScore = Math.min(Math.max(rawScore, 10), 98);

    return {
      ...scheme,
      matchScore: finalScore,
      scoreBreakdown: {
        purpose: purposeScore,
        income: incomeScore,
        costFit: costScore,
        beneficiary: beneficiaryScore,
        loanFit: loanFitScore,
      },
      reasons,
    };
  });

  // Sort descending by match score
  results.sort((a, b) => b.matchScore - a.matchScore);
  return results;
}
