import React from "react";
import { formatINR } from "../utils/emiCalculator";

export function SchemeComparison({
  comparedSchemes = [],
  allSchemes = [],
  onRemoveScheme,
  onAddScheme,
  onSelectForCalculator,
  onSelectForPartner,
  userProfile = null,
}) {
  if (comparedSchemes.length === 0) return null;

  // Determine which scheme is most suitable if userProfile exists
  let mostSuitableId = null;
  if (userProfile && comparedSchemes.length > 0) {
    // If cost <= 140000, Micro Finance or Mahila Samriddhi
    if (userProfile.projectCost <= 140000) {
      mostSuitableId = comparedSchemes.find((s) => s.id === "micro-finance" || s.id === "mahila-samriddhi")?.id;
    } else if (userProfile.purpose === "education") {
      mostSuitableId = comparedSchemes.find((s) => s.id === "educational-loan")?.id;
    } else {
      mostSuitableId = comparedSchemes.find((s) => s.id === "term-loan")?.id;
    }
  }
  if (!mostSuitableId && comparedSchemes.length > 0) {
    mostSuitableId = comparedSchemes[0].id;
  }

  const availableToAdd = allSchemes.filter(
    (s) => !comparedSchemes.some((c) => c.id === s.id)
  );

  return (
    <section className="comparison-section" id="comparison">
      <div className="container">
        <div className="comparison-header-row">
          <div>
            <div className="section-kicker">FEATURE-BY-FEATURE BENCHMARK</div>
            <h3 className="section-title">Scheme Comparison Matrix</h3>
            <p className="section-lead">
              Side-by-side evaluation of loan limits, interest rates, moratoria, and partner availability.
            </p>
          </div>

          {availableToAdd.length > 0 && comparedSchemes.length < 3 && (
            <div className="add-scheme-compare-dropdown">
              <label>+ Add Scheme:</label>
              <select
                onChange={(e) => {
                  const toAdd = allSchemes.find((s) => s.id === e.target.value);
                  if (toAdd) onAddScheme(toAdd);
                }}
                value=""
              >
                <option value="" disabled>
                  Select to add...
                </option>
                {availableToAdd.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* COMPARISON TABLE */}
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="feature-col">Parameters</th>
                {comparedSchemes.map((scheme) => {
                  const isBestFit = scheme.id === mostSuitableId;
                  return (
                    <th key={scheme.id} className={`scheme-header-cell ${isBestFit ? "best-fit-col" : ""}`}>
                      <div className="header-cell-inner">
                        {isBestFit && <span className="best-fit-tag">★ RECOMMENDED FIT</span>}
                        <h4>{scheme.name}</h4>
                        <span className="cat-sub">{scheme.category}</span>
                        <button
                          className="remove-compare-btn"
                          onClick={() => onRemoveScheme(scheme.id)}
                          title="Remove from comparison"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-title">Maximum Loan Limit</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell highlight-limit">
                    <strong>{s.displayMaxLoan}</strong>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Concessional Interest Rate</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell">
                    <span className="rate-badge">{s.interestRate}% p.a.</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Repayment Moratorium</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell">
                    <strong>{s.moratoriumMonths} Months</strong>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Project Cost Coverage</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell">
                    <strong>Up to {s.coveragePercentage}%</strong>
                    <small> (10% Promoter Contribution)</small>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Family Income Ceiling</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell">
                    <span>{s.displayIncomeLimit}</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Intended Primary Purpose</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell purpose-cell">
                    <span>{s.tagline}</span>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Supported Channel Partners</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell">
                    <div className="partners-chips">
                      {s.supportedPartnerTypes.map((pt) => (
                        <span key={pt} className="partner-type-pill">
                          {pt}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Key Beneficiary Fit</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell">
                    <small>{s.targetBeneficiaries.join(", ")}</small>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="row-title">Actions</td>
                {comparedSchemes.map((s) => (
                  <td key={s.id} className="val-cell action-cell">
                    <button
                      className="calc-small-btn"
                      onClick={() =>
                        onSelectForCalculator({
                          rate: s.interestRate,
                          moratorium: s.moratoriumMonths,
                          maxLimit: s.maxLoanAmount,
                          name: s.name,
                        })
                      }
                    >
                      Calculate EMI
                    </button>
                    <button
                      className="partner-small-btn"
                      onClick={() => onSelectForPartner(s.id)}
                    >
                      Find Partner
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
