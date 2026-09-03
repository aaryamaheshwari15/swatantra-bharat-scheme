import React from "react";
import { formatINR } from "../utils/emiCalculator";

export function SchemeDetailsModal({
  scheme,
  onClose,
  onCalculateEmi,
  onFindPartner,
  onStartGuidance,
  isSaved,
  onToggleSave,
}) {
  if (!scheme) return null;

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="scheme-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-x" onClick={onClose}>
          ✕
        </button>

        <div className="scheme-modal-hero-top">
          <div className="scheme-modal-category">{scheme.category}</div>
          <h2 className="scheme-modal-name">{scheme.name}</h2>
          <p className="scheme-modal-tagline">{scheme.tagline}</p>
        </div>

        {/* 4-SPEC PILLARS */}
        <div className="scheme-modal-specs-row">
          <div className="spec-pillar">
            <small>MAXIMUM LOAN</small>
            <strong>{scheme.displayMaxLoan}</strong>
          </div>
          <div className="spec-pillar">
            <small>CONCESSIONAL RATE</small>
            <strong className="rate-green">{scheme.interestRate}% p.a.</strong>
          </div>
          <div className="spec-pillar">
            <small>COVERAGE</small>
            <strong>Up to {scheme.coveragePercentage}%</strong>
          </div>
          <div className="spec-pillar">
            <small>REPAYMENT MORATORIUM</small>
            <strong>{scheme.moratoriumMonths} Months</strong>
          </div>
        </div>

        <div className="scheme-modal-scroll-body">
          {/* DESCRIPTION */}
          <div className="modal-content-block">
            <h3>Scheme Objective & Overview</h3>
            <p>{scheme.description}</p>
          </div>

          {/* KEY BENEFITS */}
          <div className="modal-content-block">
            <h3>Key Scheme Advantages</h3>
            <ul className="modal-bullet-list">
              {scheme.keyBenefits.map((benefit, bIdx) => (
                <li key={bIdx}>
                  <span className="bullet-check">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ELIGIBILITY */}
          <div className="modal-content-block">
            <h3>Target Beneficiary & Eligibility Norms</h3>
            <ul className="modal-bullet-list">
              {scheme.eligibilityCriteria.map((crit, cIdx) => (
                <li key={cIdx}>
                  <span className="bullet-check">✓</span>
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* REQUIRED DOCUMENTS */}
          <div className="modal-content-block">
            <h3>Standard Documentation Required</h3>
            <div className="modal-docs-grid">
              {scheme.documentsRequired.map((doc, dIdx) => (
                <div key={dIdx} className="doc-item-box">
                  <span className="doc-icon">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SUPPORTED CHANNEL PARTNERS */}
          <div className="modal-content-block">
            <h3>Authorized Channel Partner Network</h3>
            <p className="sub-p">
              Applications for this scheme are routed through accredited partner institutions:
            </p>
            <div className="partner-badges-row">
              {scheme.supportedPartnerTypes.map((pt) => (
                <span key={pt} className="partner-badge-tag">
                  🏢 {pt === "SCA" ? "State Channelizing Agency (SCA)" : pt === "PSB" ? "Public Sector Bank (PSB)" : pt === "RRB" ? "Regional Rural Bank (RRB)" : "Accredited NBFC-MFI"}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div className="scheme-modal-footer">
          <div className="footer-left">
            <button
              className={`save-scheme-modal-btn ${isSaved ? "saved" : ""}`}
              onClick={() => onToggleSave(scheme.id)}
            >
              {isSaved ? "★ Saved to Profile" : "☆ Save Scheme"}
            </button>
          </div>

          <div className="footer-right">
            <button
              className="modal-cta-calc"
              onClick={() => {
                onClose();
                onCalculateEmi({
                  rate: scheme.interestRate,
                  moratorium: scheme.moratoriumMonths,
                  maxLimit: scheme.maxLoanAmount,
                  name: scheme.name,
                });
              }}
            >
              📊 Calculate EMI
            </button>

            <button
              className="modal-cta-partner"
              onClick={() => {
                onClose();
                onFindPartner(scheme.id);
              }}
            >
              📍 Find Channel Partner
            </button>

            <button
              className="modal-cta-guidance"
              onClick={() => {
                onClose();
                onStartGuidance(scheme);
              }}
            >
              Checklist & Guidance →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
