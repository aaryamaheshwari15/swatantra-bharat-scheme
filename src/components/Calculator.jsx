import React, { useState, useEffect } from "react";
import { TRANSLATIONS } from "../data/translations";
import { calculateLoanEmi, formatINR } from "../utils/emiCalculator";

export function Calculator({
  language,
  prefillData = null,
  onClearPrefill,
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [principal, setPrincipal] = useState(120000);
  const [annualRate, setAnnualRate] = useState(5.0);
  const [tenureYears, setTenureYears] = useState(3);
  const [moratoriumMonths, setMoratoriumMonths] = useState(6);
  const [schemeLimit, setSchemeLimit] = useState(140000);
  const [schemeName, setSchemeName] = useState("Micro Finance Scheme");

  // Sync prefill from Recommender or Scheme card
  useEffect(() => {
    if (prefillData) {
      if (prefillData.principal) setPrincipal(prefillData.principal);
      if (prefillData.rate !== undefined) setAnnualRate(prefillData.rate);
      if (prefillData.moratorium !== undefined) setMoratoriumMonths(prefillData.moratorium);
      if (prefillData.maxLimit) setSchemeLimit(prefillData.maxLimit);
      if (prefillData.name) setSchemeName(prefillData.name);
    }
  }, [prefillData]);

  const calculation = calculateLoanEmi({
    principal,
    annualRate,
    tenureYears,
    moratoriumMonths,
    schemeLimit,
  });

  return (
    <section className="calculator-section" id="calculator">
      <div className="container">
        <div className="section-head-center">
          <div className="section-kicker">FINANCIAL LITERACY & TRANSPARENCY</div>
          <h2 className="section-title">{t.calcTitle}</h2>
          <p className="section-lead">{t.calcSubtitle}</p>
        </div>

        {prefillData && (
          <div className="calc-prefill-banner">
            <span className="info-icon">ℹ</span>
            <span>
              Configured for <strong>{schemeName}</strong> with benchmark interest rate of{" "}
              <strong>{annualRate}%</strong> and <strong>{moratoriumMonths} months moratorium</strong>.
            </span>
            <button className="reset-calc-btn" onClick={onClearPrefill}>
              Reset Defaults
            </button>
          </div>
        )}

        <div className="calculator-card-layout">
          {/* INPUT CONTROLS PANEL */}
          <div className="calc-inputs-panel">
            <div className="calc-panel-header">
              <h3>Loan Parameters</h3>
              <span className="badge-concessional">Concessional Terms</span>
            </div>

            {/* Principal input & slider */}
            <div className="calc-input-row">
              <div className="row-label-val">
                <label>{t.loanAmount}</label>
                <div className="input-with-symbol">
                  <span>₹</span>
                  <input
                    type="number"
                    min="10000"
                    max="5000000"
                    step="5000"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                  />
                </div>
              </div>
              <input
                type="range"
                className="custom-range-slider"
                min="10000"
                max="2000000"
                step="10000"
                value={Math.min(principal, 2000000)}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>₹10K</span>
                <span>₹1.4L (Micro)</span>
                <span>₹5L</span>
                <span>₹20L (Edu)</span>
              </div>
            </div>

            {/* Interest rate slider */}
            <div className="calc-input-row">
              <div className="row-label-val">
                <label>{t.interestRate}</label>
                <strong className="active-val-highlight">{annualRate.toFixed(1)}% p.a.</strong>
              </div>
              <input
                type="range"
                className="custom-range-slider"
                min="3.0"
                max="12.0"
                step="0.5"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>3.5% (Women/Edu)</span>
                <span>5.0% (Micro)</span>
                <span>6.0% (Term)</span>
                <span>12% (Commercial)</span>
              </div>
            </div>

            {/* Tenure slider */}
            <div className="calc-input-row">
              <div className="row-label-val">
                <label>{t.tenureYears}</label>
                <strong className="active-val-highlight">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </strong>
              </div>
              <input
                type="range"
                className="custom-range-slider"
                min="1"
                max="10"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>1 Yr</span>
                <span>3 Yrs (Micro)</span>
                <span>5 Yrs (Term)</span>
                <span>10 Yrs (Edu)</span>
              </div>
            </div>

            {/* Moratorium input */}
            <div className="calc-input-row">
              <div className="row-label-val">
                <label>{t.moratoriumMonths}</label>
                <strong className="active-val-highlight">{moratoriumMonths} Months Repayment Holiday</strong>
              </div>
              <input
                type="range"
                className="custom-range-slider"
                min="0"
                max="24"
                step="3"
                value={moratoriumMonths}
                onChange={(e) => setMoratoriumMonths(Number(e.target.value))}
              />
              <div className="slider-ticks">
                <span>0 Mo</span>
                <span>6 Mo (Micro)</span>
                <span>12 Mo</span>
                <span>24 Mo</span>
              </div>
            </div>

            {/* Benchmark scheme ceiling selector */}
            <div className="calc-input-row scheme-ceiling-box">
              <label>Compare Against Scheme Limit:</label>
              <div className="ceiling-buttons-row">
                {[
                  { name: "Micro Finance", limit: 140000 },
                  { name: "Term Loan", limit: 5000000 },
                  { name: "Educational Loan", limit: 2000000 },
                  { name: "Mahila Samriddhi", limit: 140000 },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className={`ceiling-chip ${schemeLimit === item.limit ? "selected" : ""}`}
                    onClick={() => {
                      setSchemeLimit(item.limit);
                      setSchemeName(item.name);
                    }}
                  >
                    {item.name} ({formatINR(item.limit)})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CALCULATED RESULTS & LIMIT VERDICT PANEL */}
          <div className="calc-results-panel">
            {/* MONTHLY EMI MAIN BANNER */}
            <div className="monthly-emi-banner">
              <span className="emi-tagline">{t.monthlyEmi}</span>
              <div className="emi-big-number">{formatINR(calculation.monthlyEmi)}</div>
              <small className="emi-repayment-note">
                Commences after {moratoriumMonths} months moratorium period
              </small>
            </div>

            {/* "CAN THIS SCHEME SUPPORT YOUR REQUIREMENT?" VERDICT */}
            <div className="scheme-support-verdict">
              <div className="verdict-title-bar">
                <span>BENCHMARK CEILING CHECK</span>
                <span className="scheme-tag-name">{schemeName}</span>
              </div>

              <div className="verdict-amounts-compare">
                <div>
                  <small>Required Amount:</small>
                  <strong>{formatINR(principal)}</strong>
                </div>
                <div>
                  <small>Scheme Ceiling:</small>
                  <strong>{formatINR(schemeLimit)}</strong>
                </div>
              </div>

              {calculation.isWithinLimit ? (
                <div className="verdict-status-box success">
                  <span className="verdict-icon">✓</span>
                  <div>
                    <strong>{t.withinLimitText}</strong>
                    <p>
                      Your requested funding of {formatINR(principal)} can be fully sanctioned under{" "}
                      {schemeName}.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="verdict-status-box warning">
                  <span className="verdict-icon">⚠</span>
                  <div>
                    <strong>
                      {t.exceedsLimitText} {formatINR(calculation.excessAmount)}
                    </strong>
                    <p>
                      Consider scaling down or switching to a larger product like the{" "}
                      <strong>Term Loan Scheme (Up to ₹50 Lakh)</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* REPAYMENT SUMMARY BREAKDOWN */}
            <div className="repayment-summary-box">
              <div className="summary-split-bar">
                <div
                  className="split-principal"
                  style={{ width: `${calculation.principalPercent}%` }}
                  title={`Principal: ${calculation.principalPercent}%`}
                ></div>
                <div
                  className="split-interest"
                  style={{ width: `${calculation.interestPercent}%` }}
                  title={`Interest: ${calculation.interestPercent}%`}
                ></div>
              </div>

              <div className="summary-legend-row">
                <div className="legend-item">
                  <span className="dot principal-dot"></span>
                  <div>
                    <small>{t.principalAmount}</small>
                    <strong>{formatINR(calculation.principal)}</strong>
                  </div>
                </div>

                <div className="legend-item">
                  <span className="dot interest-dot"></span>
                  <div>
                    <small>{t.totalInterest}</small>
                    <strong>{formatINR(calculation.totalInterest)}</strong>
                  </div>
                </div>
              </div>

              <div className="summary-total-row">
                <span>{t.totalRepayment}</span>
                <strong>{formatINR(calculation.totalRepayment)}</strong>
              </div>

              {moratoriumMonths > 0 && (
                <div className="moratorium-notice-row">
                  <span>Moratorium Simple Interest ({moratoriumMonths} mos):</span>
                  <strong>{formatINR(calculation.moratoriumInterest)}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
