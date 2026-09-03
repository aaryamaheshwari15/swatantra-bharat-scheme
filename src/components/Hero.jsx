import React from "react";
import { TRANSLATIONS } from "../data/translations";

export function Hero({ language, onStartRecommender, onExploreSchemes }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <section className="hero-section" id="home">
      <div className="hero-pattern-bg"></div>
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-accent"></span>
            <span className="eyebrow-text">{t.heroBadge}</span>
          </div>

          <h2 className="hero-headline">{t.heroTitle}</h2>

          <p className="hero-subtext">{t.heroSubtitle}</p>

          <div className="hero-cta-group">
            <button className="cta-primary-btn" onClick={onStartRecommender}>
              <span>{t.heroPrimaryCta}</span>
              <span className="cta-arrow">→</span>
            </button>

            <button className="cta-secondary-btn" onClick={onExploreSchemes}>
              <span>{t.heroSecondaryCta}</span>
            </button>
          </div>

          <div className="hero-trust-indicators">
            <span className="trust-badge">
              <span className="check-bullet">✓</span> Scheduled Caste Beneficiary Focus
            </span>
            <span className="trust-badge">
              <span className="check-bullet">✓</span> Concessional Interest Rates
            </span>
            <span className="trust-badge">
              <span className="check-bullet">✓</span> Direct Channel Partner Linkage
            </span>
          </div>
        </div>

        {/* HERO CARD / FINANCIAL PARAMETER OVERVIEW */}
        <div className="hero-card-display">
          <div className="hero-summary-card">
            <div className="card-top-bar">
              <span className="pulse-indicator"></span>
              <span className="summary-status-label">Active Concessional Window 2026</span>
            </div>

            <div className="stats-2x2-grid">
              <div className="stat-tile">
                <span className="stat-metric-number">{t.heroStat1}</span>
                <span className="stat-metric-label">{t.heroStat1Desc}</span>
                <small className="stat-sublabel">Max 10% promoter contribution</small>
              </div>

              <div className="stat-tile">
                <span className="stat-metric-number">{t.heroStat2}</span>
                <span className="stat-metric-label">{t.heroStat2Desc}</span>
                <small className="stat-sublabel">Statutory eligibility cap</small>
              </div>

              <div className="stat-tile">
                <span className="stat-metric-number">{t.heroStat3}</span>
                <span className="stat-metric-label">{t.heroStat3Desc}</span>
                <small className="stat-sublabel">Deeply subsidized repayment</small>
              </div>

              <div className="stat-tile">
                <span className="stat-metric-number">{t.heroStat4}</span>
                <span className="stat-metric-label">{t.heroStat4Desc}</span>
                <small className="stat-sublabel">SCAs, PSBs, RRBs & MFIs</small>
              </div>
            </div>

            <div className="hero-card-footer">
              <div className="hero-card-footer-info">
                <strong>Intelligent Multi-Factor Matching</strong>
                <p>Rule-based algorithmic compatibility without approval ambiguity.</p>
              </div>
              <button className="quick-start-chip" onClick={onStartRecommender}>
                Check Match
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
