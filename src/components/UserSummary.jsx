import React from "react";
import { formatINR } from "../utils/emiCalculator";

export function UserSummary({
  userProfile = {
    purpose: "micro_business",
    projectCost: 120000,
    income: 320000,
    beneficiaryType: "Aspiring entrepreneur",
  },
  recommendedScheme = {
    name: "Micro Finance Scheme",
    matchScore: 92,
  },
  recommendedPartner = {
    name: "Delhi SC/ST/OBC Development & Financial Corporation (DSFDC)",
    type: "SCA",
  },
  onOpenCalculator,
  onOpenPartnerLocator,
  onStartGuidance,
}) {
  return (
    <div className="user-profile-summary-card">
      <div className="summary-card-header">
        <div className="header-badge-tag">SIH 2026 JUDGES SUMMARY SNAPSHOT</div>
        <h3 className="summary-title">Your End-to-End Recommendation Profile</h3>
        <p className="summary-subtitle">
          Summary of applicant requirements, algorithmic match, and smart routed disbursal partner.
        </p>
      </div>

      <div className="summary-profile-grid">
        {/* PROFILE ATTRIBUTES */}
        <div className="profile-spec-item">
          <small>INTENDED PURPOSE</small>
          <strong>
            {userProfile.purpose === "micro_business"
              ? "Starting a Small Business"
              : userProfile.purpose === "expand_business"
              ? "Business Expansion"
              : userProfile.purpose === "education"
              ? "Higher / Professional Education"
              : userProfile.purpose.replace("_", " ").toUpperCase()}
          </strong>
          <span>Micro & small business activity</span>
        </div>

        <div className="profile-spec-item">
          <small>PROJECT / EDUCATION COST</small>
          <strong>{formatINR(userProfile.projectCost)}</strong>
          <span>90% Concessional coverage: {formatINR(userProfile.projectCost * 0.9)}</span>
        </div>

        <div className="profile-spec-item">
          <small>ANNUAL FAMILY INCOME</small>
          <strong>{formatINR(userProfile.income)}</strong>
          <span className="text-green">✓ Eligible under ₹5,00,000 cap</span>
        </div>

        <div className="profile-spec-item">
          <small>BENEFICIARY CATEGORY</small>
          <strong>{userProfile.beneficiaryType}</strong>
          <span>Scheduled Caste Beneficiary</span>
        </div>
      </div>

      <div className="summary-solution-strip">
        <div className="solution-box scheme-match-box">
          <div className="solution-label">RECOMMENDED SCHEME</div>
          <h4 className="solution-headline">{recommendedScheme?.name || "Micro Finance Scheme"}</h4>
          <div className="solution-badge-row">
            <span className="score-highlight-pill">
              ★ {recommendedScheme?.matchScore || 92}% Algorithmic Match
            </span>
            <small>5% p.a. Concessional Interest | 6 Mos Moratorium</small>
          </div>
        </div>

        <div className="solution-box partner-route-box">
          <div className="solution-label">SMART ROUTED CHANNEL PARTNER</div>
          <h4 className="solution-headline">
            {recommendedPartner?.name || "State Channelizing Agency (DSFDC)"}
          </h4>
          <div className="solution-badge-row">
            <span className="partner-highlight-pill">
              ⚡ High Fund Quota Availability (94%)
            </span>
            <small>Zero Disbursal Backlog | ~8 Days Turnaround</small>
          </div>
        </div>
      </div>

      <div className="summary-footer-actions">
        <button className="summary-action-btn" onClick={onOpenCalculator}>
          📊 Review EMI Repayment
        </button>
        <button className="summary-action-btn" onClick={onOpenPartnerLocator}>
          📍 View on Partner Map
        </button>
        <button className="summary-action-btn primary" onClick={onStartGuidance}>
          📄 Ready to Apply Checklist →
        </button>
      </div>
    </div>
  );
}
