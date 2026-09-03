import React from "react";
import { SCHEMES } from "../data/schemes";

export function PartnerDetailsModal({
  partner,
  onClose,
  onStartApplicationGuidance,
}) {
  if (!partner) return null;

  // Resolve supported schemes details
  const supportedSchemeObjs = SCHEMES.filter((s) =>
    partner.supportedSchemes.includes(s.id)
  );

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="partner-detail-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-x" onClick={onClose}>
          ✕
        </button>

        <div className="modal-badge-row">
          <span className="type-badge-large">{partner.fullTypeName} ({partner.type})</span>
          <span className="status-badge-active">Verified Channel Partner</span>
        </div>

        <h3 className="partner-detail-name">{partner.name}</h3>
        <p className="partner-detail-address">📍 {partner.address}</p>

        {/* METRICS ROW */}
        <div className="partner-detail-metrics-grid">
          <div className="detail-metric-card">
            <small>CURRENT FUND AVAILABILITY</small>
            <strong className={partner.fundAvailabilityScore >= 80 ? "text-green" : "text-amber"}>
              {partner.fundAvailabilityScore}% ({partner.fundStatus})
            </strong>
            <span>Active concessional disbursal window</span>
          </div>

          <div className="detail-metric-card">
            <small>DISTANCE FROM YOUR LOCATION</small>
            <strong>~{partner.distanceKm} Kilometers</strong>
            <span>Estimated 15 mins travel time</span>
          </div>

          <div className="detail-metric-card">
            <small>OPERATIONAL HEALTH / NPA</small>
            <strong>{partner.npaLevel}</strong>
            <span>{partner.operationalHealth}</span>
          </div>

          <div className="detail-metric-card">
            <small>AVERAGE DISBURSAL SPEED</small>
            <strong>~{partner.avgProcessingDays} Business Days</strong>
            <span>Expedited scrutiny for priority SC groups</span>
          </div>
        </div>

        {/* SUPPORTED SCHEMES */}
        <div className="detail-section">
          <h4>Supported Concessional Credit Schemes:</h4>
          <div className="detail-schemes-chips">
            {supportedSchemeObjs.map((s) => (
              <div key={s.id} className="scheme-support-pill">
                <strong>{s.name}</strong>
                <small>Ceiling: {s.displayMaxLoan} @ {s.interestRate}%</small>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT & WORKING HOURS */}
        <div className="detail-section contact-section">
          <h4>Official Contact & Working Hours:</h4>
          <div className="contact-grid">
            <div>
              <span className="c-label">Nodal Officer:</span>
              <strong>{partner.contact.officer}</strong>
            </div>
            <div>
              <span className="c-label">Contact Phone:</span>
              <strong>{partner.contact.phone}</strong>
            </div>
            <div>
              <span className="c-label">Email:</span>
              <span>{partner.contact.email}</span>
            </div>
            <div>
              <span className="c-label">Working Hours:</span>
              <span>{partner.workingHours}</span>
            </div>
          </div>
        </div>

        {/* APPLICATION INITIATION GUIDANCE */}
        <div className="detail-actions-footer">
          <button
            className="directions-btn"
            onClick={() => {
              const query = encodeURIComponent(`${partner.name}, ${partner.address}`);
              window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
            }}
          >
            🗺 View on Google Maps
          </button>

          <button
            className="start-guidance-btn"
            onClick={() => {
              onClose();
              onStartApplicationGuidance(partner);
            }}
          >
            Start Application Guidance →
          </button>
        </div>
      </div>
    </div>
  );
}
