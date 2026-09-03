// Swatantra Bharat Scheme - Financial / EMI Calculator Utility
// Computes amortized loan installments, moratorium interest, and scheme ceiling validation

/**
 * Calculates monthly EMI and financial breakdown.
 * @param {Object} params
 * @param {number} params.principal - Loan principal in INR
 * @param {number} params.annualRate - Annual interest rate in % (e.g. 5.0)
 * @param {number} params.tenureYears - Repayment duration in years (excluding moratorium)
 * @param {number} params.moratoriumMonths - Moratorium period in months
 * @param {number} [params.schemeLimit] - Optional scheme maximum limit for comparison
 * @returns {Object} Calculated metrics
 */
export function calculateLoanEmi({
  principal = 120000,
  annualRate = 5.0,
  tenureYears = 3,
  moratoriumMonths = 6,
  schemeLimit = 140000,
}) {
  const p = Math.max(0, Number(principal) || 0);
  const rAnnual = Math.max(0, Number(annualRate) || 0);
  const years = Math.max(0.5, Number(tenureYears) || 1);
  const moratorium = Math.max(0, Number(moratoriumMonths) || 0);

  const months = Math.round(years * 12);
  const monthlyRate = rAnnual / (12 * 100);

  let monthlyEmi = 0;
  let repaymentFromEmi = 0;

  if (p > 0 && months > 0) {
    if (monthlyRate > 0) {
      const compoundFactor = Math.pow(1 + monthlyRate, months);
      monthlyEmi = Math.round(
        (p * monthlyRate * compoundFactor) / (compoundFactor - 1)
      );
      repaymentFromEmi = monthlyEmi * months;
    } else {
      monthlyEmi = Math.round(p / months);
      repaymentFromEmi = p;
    }
  }

  // Moratorium simple interest (simple interest accrued during moratorium)
  const moratoriumInterest = Math.round((p * (rAnnual / 100) * moratorium) / 12);

  const emiInterest = Math.max(0, repaymentFromEmi - p);
  const totalInterest = emiInterest + moratoriumInterest;
  const totalRepayment = p + totalInterest;

  // Percentage breakdown
  const principalPercent = totalRepayment > 0 ? Math.round((p / totalRepayment) * 100) : 100;
  const interestPercent = 100 - principalPercent;

  // Scheme limit fit validation
  const isWithinLimit = schemeLimit ? p <= schemeLimit : true;
  const excessAmount = schemeLimit && p > schemeLimit ? p - schemeLimit : 0;
  const limitUtilizationPercent = schemeLimit ? Math.min(100, Math.round((p / schemeLimit) * 100)) : 100;

  return {
    principal: p,
    annualRate: rAnnual,
    tenureYears: years,
    tenureMonths: months,
    moratoriumMonths: moratorium,
    monthlyEmi,
    moratoriumInterest,
    totalInterest,
    totalRepayment,
    principalPercent,
    interestPercent,
    schemeLimit,
    isWithinLimit,
    excessAmount,
    limitUtilizationPercent,
  };
}

/**
 * Formats Indian Currency with ₹ and lakh/thousand grouping
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
