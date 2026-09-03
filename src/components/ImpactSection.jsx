import React from "react";

export function ImpactSection() {
  const impacts = [
    {
      title: "Eliminate Scheme Confusion",
      desc: "Transforms dense government gazette notifications into simple, explainable questions understandable by every citizen.",
      icon: "🔍",
    },
    {
      title: "Prevent Misrouted Applications",
      desc: "Directs applicants only to authorized channel partners actively processing their chosen scheme with unexhausted quotas.",
      icon: "🧭",
    },
    {
      title: "Demystify Concessional Finance",
      desc: "Interactive calculators make moratorium benefits, 5% interest rates, and 90% project coverage crystal clear before applying.",
      icon: "💡",
    },
    {
      title: "Maximize Public Fund Utilization",
      desc: "Enables state channelizing agencies and public sector banks to disburse designated SC concessional funds efficiently.",
      icon: "📈",
    },
  ];

  return (
    <section className="impact-section" id="impact">
      <div className="container">
        <div className="section-head-center">
          <div className="section-kicker">SOCIO-ECONOMIC TRANSFORMATION</div>
          <h2 className="section-title">Solving the Inclusion Challenge</h2>
          <p className="section-lead">
            Bridging the last-mile gap between marginalized entrepreneurs and government concessional assistance.
          </p>
        </div>

        {/* 4 IMPACT PILLARS */}
        <div className="impact-cards-grid">
          {impacts.map((item, idx) => (
            <div key={idx} className="impact-card">
              <span className="impact-icon">{item.icon}</span>
              <h3 className="impact-title">{item.title}</h3>
              <p className="impact-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ILLUSTRATIVE METRICS STRIP */}
        <div className="impact-metrics-banner">
          <div className="banner-top-label">
            <span className="prototype-pill">PROTOTYPE / DEMONSTRATION METRICS</span>
          </div>

          <div className="metrics-strip-grid">
            <div className="metric-strip-item">
              <strong className="metric-strip-num">100+</strong>
              <span className="metric-strip-label">Authorized Channel Partners</span>
              <small>SCAs, PSBs, RRBs & MFIs</small>
            </div>

            <div className="metric-strip-item">
              <strong className="metric-strip-num">6</strong>
              <span className="metric-strip-label">Regional Indian Languages</span>
              <small>EN, HI, MR, GU, BN, TA</small>
            </div>

            <div className="metric-strip-item">
              <strong className="metric-strip-num">100%</strong>
              <span className="metric-strip-label">Transparent Rule Engine</span>
              <small>Explainable compatibility scoring</small>
            </div>

            <div className="metric-strip-item">
              <strong className="metric-strip-num">0 ₹</strong>
              <span className="metric-strip-label">Zero Intermediary Exploitation</span>
              <small>Direct nodal officer linkage</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
