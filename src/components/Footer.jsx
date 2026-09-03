import React from "react";
import { TRANSLATIONS } from "../data/translations";

export function Footer({ language }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <footer className="portal-main-footer" id="contact">
      <div className="container footer-grid-layout">
        <div className="footer-brand-col">
          <div className="footer-logo-row">
            <img src="/logo.jpeg" alt="Swatantra Bharat Scheme" className="footer-logo-img" />
            <div>
              <strong className="footer-brand-title">{t.portalName}</strong>
              <p className="footer-brand-motto">"{t.tagline}"</p>
            </div>
          </div>
          <p className="footer-description">
            AI-driven digital platform connecting marginalized Scheduled Caste entrepreneurs and students with concessional credit schemes covering up to 90% of project costs and authorized channel partners.
          </p>
        </div>

        <div className="footer-links-col">
          <strong>Portal Navigation</strong>
          <a href="#home">Home</a>
          <a href="#recommender">Find My Scheme</a>
          <a href="#schemes">All Schemes</a>
          <a href="#calculator">EMI Calculator</a>
          <a href="#locator">Partner Locator</a>
          <a href="#insights">System Insights</a>
        </div>

        <div className="footer-links-col">
          <strong>Concessional Programs</strong>
          <a href="#schemes">Micro Finance Scheme (Up to ₹1.40L)</a>
          <a href="#schemes">Term Loan Scheme (Up to ₹50L)</a>
          <a href="#schemes">Educational Loan Scheme (Up to ₹20L)</a>
          <a href="#schemes">Mahila Samriddhi Yojana (4% Concession)</a>
          <a href="#schemes">Skill & Tooling Loan</a>
        </div>

        <div className="footer-notice-col">
          <strong>Smart India Hackathon 2026</strong>
          <p>
            Demonstration prototype developed for Problem Statement: <em>AI-Driven Scheme Matching for Marginalized Entrepreneurs</em>.
          </p>
          <div className="footer-helpline-box">
            <small>Toll-Free Guidance Desk (Simulated):</small>
            <strong>1800-11-2026</strong>
          </div>
        </div>
      </div>

      <div className="footer-sub-bottom">
        <div className="container sub-bottom-content">
          <span>© 2026 Swatantra Bharat Scheme. Designed for citizen accessibility and socio-economic empowerment.</span>
          <span>Government Concessional Credit Prototype</span>
        </div>
      </div>
    </footer>
  );
}
