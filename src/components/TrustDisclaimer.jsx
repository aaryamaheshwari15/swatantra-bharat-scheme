import React from "react";
import { TRANSLATIONS } from "../data/translations";

export function TrustDisclaimer({ language }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <aside className="trust-disclaimer-section" aria-label="Official Disclaimer">
      <div className="container">
        <div className="disclaimer-inner-card">
          <div className="disclaimer-emblem-badge">
            <span className="scale-symbol">⚖</span>
            <span>{t.disclaimerTitle}</span>
          </div>

          <p className="disclaimer-paragraph">{t.disclaimerText}</p>

          <div className="disclaimer-meta-row">
            <span className="prototype-pill-tag">
              🏷 {t.demoDataBadge}
            </span>
            <span className="sih-notice">
              Developed for Smart India Hackathon 2026 | Beneficiary Empowerment Initiative
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
