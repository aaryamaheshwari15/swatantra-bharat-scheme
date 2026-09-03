import React from "react";

export function AdminDashboard() {
  const topSchemesData = [
    { name: "Micro Finance Scheme", searches: 5820, percent: 85, color: "#138808" },
    { name: "Term Loan Scheme", searches: 3410, percent: 55, color: "#0d6efd" },
    { name: "Educational Loan Scheme", searches: 2940, percent: 45, color: "#6f42c1" },
    { name: "Mahila Samriddhi Yojana", searches: 2180, percent: 35, color: "#d63384" },
    { name: "Skill & Tooling Loan", searches: 1240, percent: 22, color: "#ff9933" },
  ];

  const categoryDistribution = [
    { label: "Micro & Small Retail", share: "42%", color: "#138808" },
    { label: "Manufacturing & Trades", share: "24%", color: "#0d6efd" },
    { label: "Higher & Professional Edu", share: "18%", color: "#6f42c1" },
    { label: "Women SHG Clusters", share: "11%", color: "#d63384" },
    { label: "Allied Livelihoods", share: "5%", color: "#ff9933" },
  ];

  const geographicDemand = [
    { state: "Uttar Pradesh", volume: "2,420 queries", fill: 90 },
    { state: "Maharashtra", volume: "2,110 queries", fill: 82 },
    { state: "Delhi / NCR", volume: "1,890 queries", fill: 74 },
    { state: "Rajasthan", volume: "1,540 queries", fill: 62 },
    { state: "Gujarat", volume: "1,320 queries", fill: 55 },
    { state: "Tamil Nadu", volume: "1,180 queries", fill: 48 },
  ];

  const loanSizeBrackets = [
    { bracket: "Under ₹1.40 Lakh (Micro)", count: "52% of users", width: 85 },
    { bracket: "₹1.40 – ₹5.00 Lakh (Small)", count: "26% of users", width: 50 },
    { bracket: "₹5.00 – ₹20.00 Lakh (Medium/Edu)", count: "16% of users", width: 32 },
    { bracket: "Above ₹20.00 Lakh (Term Loan)", count: "6% of users", width: 15 },
  ];

  return (
    <section className="admin-dashboard-section" id="insights">
      <div className="container">
        <div className="section-head-center">
          <div className="section-kicker">GOVERNANCE & POLICY INTELLIGENCE</div>
          <h2 className="section-title">System Insights & Policy Dashboard</h2>
          <p className="section-lead">
            Real-time analytics demonstrating how administrative authorities monitor citizen demand, channel partner utilization, and scheme uptake.
          </p>
        </div>

        {/* DEMO NOTICE */}
        <div className="demo-notice-tag-center">
          <span className="demo-badge">PROTOTYPE / DEMONSTRATION ANALYTICS</span>
        </div>

        {/* KPI COUNTERS */}
        <div className="admin-kpi-grid">
          <div className="kpi-card">
            <span className="kpi-title">TOTAL SCHEME QUERIES</span>
            <strong className="kpi-value">16,890</strong>
            <small className="kpi-change positive">↑ +23% this month</small>
          </div>

          <div className="kpi-card">
            <span className="kpi-title">AVG. COMPATIBILITY SCORE</span>
            <strong className="kpi-value">89.6%</strong>
            <small className="kpi-sub">Rule-based algorithm accuracy</small>
          </div>

          <div className="kpi-card">
            <span className="kpi-title">ACTIVE CHANNEL PARTNERS</span>
            <strong className="kpi-value">114</strong>
            <small className="kpi-sub">SCAs, PSBs, RRBs & MFIs</small>
          </div>

          <div className="kpi-card">
            <span className="kpi-title">APPLICATIONS ROUTED</span>
            <strong className="kpi-value">7,420</strong>
            <small className="kpi-change positive">Zero misrouted requests</small>
          </div>
        </div>

        {/* CHARTS 2-COLUMN GRID */}
        <div className="analytics-charts-grid">
          {/* CHART 1: MOST SEARCHED SCHEMES */}
          <div className="chart-card">
            <div className="chart-header">
              <h4>Most Searched Concessional Schemes</h4>
              <span className="chart-sub-tag">Search Volume (30 Days)</span>
            </div>

            <div className="bar-chart-list">
              {topSchemesData.map((scheme, sIdx) => (
                <div key={sIdx} className="bar-row-item">
                  <div className="bar-label-line">
                    <span className="bar-name">{scheme.name}</span>
                    <strong className="bar-val">{scheme.searches.toLocaleString()} hits</strong>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${scheme.percent}%`,
                        backgroundColor: scheme.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHART 2: USER REQUIREMENTS BY CATEGORY */}
          <div className="chart-card">
            <div className="chart-header">
              <h4>Citizen Needs by Trade Domain</h4>
              <span className="chart-sub-tag">Sector Allocation</span>
            </div>

            <div className="category-split-container">
              {/* VISUAL SVG DONUT */}
              <div className="donut-chart-wrap">
                <svg viewBox="0 0 36 36" className="donut-chart-svg">
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#e6e8eb" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#138808"
                    strokeWidth="4"
                    strokeDasharray="42 58"
                    strokeDashoffset="25"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#0d6efd"
                    strokeWidth="4"
                    strokeDasharray="24 76"
                    strokeDashoffset="83"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke="#6f42c1"
                    strokeWidth="4"
                    strokeDasharray="18 82"
                    strokeDashoffset="59"
                  />
                </svg>
                <div className="donut-center-stat">
                  <strong>42%</strong>
                  <small>Micro Trade</small>
                </div>
              </div>

              {/* LEGEND */}
              <div className="category-legend-list">
                {categoryDistribution.map((cat, cIdx) => (
                  <div key={cIdx} className="legend-row">
                    <span className="legend-color-box" style={{ background: cat.color }}></span>
                    <span className="legend-cat-name">{cat.label}</span>
                    <strong className="legend-cat-share">{cat.share}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CHART 3: GEOGRAPHIC DEMAND */}
          <div className="chart-card">
            <div className="chart-header">
              <h4>Geographic Demand Distribution</h4>
              <span className="chart-sub-tag">Top Applying States</span>
            </div>

            <div className="geo-list">
              {geographicDemand.map((geo, gIdx) => (
                <div key={gIdx} className="geo-row">
                  <div className="geo-info">
                    <span className="geo-state-name">{geo.state}</span>
                    <span className="geo-vol">{geo.volume}</span>
                  </div>
                  <div className="geo-progress-bar">
                    <div className="geo-fill" style={{ width: `${geo.fill}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHART 4: COMMON LOAN SIZES */}
          <div className="chart-card">
            <div className="chart-header">
              <h4>Common Loan Size Distribution</h4>
              <span className="chart-sub-tag">Project Cost Brackets</span>
            </div>

            <div className="loan-brackets-list">
              {loanSizeBrackets.map((bracket, bIdx) => (
                <div key={bIdx} className="bracket-row">
                  <div className="bracket-text-line">
                    <span className="bracket-title">{bracket.bracket}</span>
                    <strong className="bracket-count">{bracket.count}</strong>
                  </div>
                  <div className="bracket-track">
                    <div
                      className="bracket-fill"
                      style={{ width: `${bracket.width}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chart-insight-box">
              <span className="insight-bulb">💡</span>
              <p>
                <strong>Policy Finding:</strong> Over 78% of demand is clustered under ₹5 Lakh, highlighting the decisive importance of the <strong>Micro Finance Scheme</strong> and <strong>Mahila Samriddhi Yojana</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
