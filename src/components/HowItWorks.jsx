import React from "react";

export function HowItWorks({ onStartRecommender }) {
  const steps = [
    {
      num: "01",
      title: "Tell Us About You",
      desc: "Answer 4-5 basic questions about your business idea, education plan, project cost, and family income.",
      icon: "✍️",
    },
    {
      num: "02",
      title: "Get Matched",
      desc: "Our rule-based engine scores schemes against statutory guidelines and shows you transparent compatibility percentages.",
      icon: "🎯",
    },
    {
      num: "03",
      title: "Understand Your Finances",
      desc: "Calculate your monthly EMI, moratorium interest, and confirm whether your project fits within the concessional limit.",
      icon: "📊",
    },
    {
      num: "04",
      title: "Find the Right Channel Partner",
      desc: "Smart routing directs you to the nearby accredited bank or state agency with highest fund availability and active quotas.",
      icon: "📍",
    },
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-head-center">
          <div className="section-kicker">CITIZEN JOURNEY ARCHITECTURE</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-lead">
            From scheme confusion to confident channel partner application in four simple steps.
          </p>
        </div>

        <div className="how-steps-grid">
          {steps.map((step, idx) => (
            <div key={step.num} className="how-step-card">
              <div className="how-step-num-bubble">{step.num}</div>
              <span className="how-step-icon">{step.icon}</span>
              <h3 className="how-step-title">{step.title}</h3>
              <p className="how-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="how-it-works-cta-wrap">
          <button className="cta-primary-btn" onClick={onStartRecommender}>
            Start Your Journey Now →
          </button>
        </div>
      </div>
    </section>
  );
}
