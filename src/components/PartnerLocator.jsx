import React, { useState, useMemo } from "react";
import { TRANSLATIONS } from "../data/translations";
import { PARTNER_TYPES } from "../data/partners";
import { SCHEMES } from "../data/schemes";
import { routePartners } from "../utils/partnerRouter";
import { PartnerMap } from "./PartnerMap";

export function PartnerLocator({
  language,
  selectedSchemeId = "micro-finance",
  onSelectPartnerForDetails,
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [activeSchemeId, setActiveSchemeId] = useState(selectedSchemeId);
  const [partnerTypeFilter, setPartnerTypeFilter] = useState("ALL");
  const [searchCity, setSearchCity] = useState("ALL");
  const [selectedMapPartner, setSelectedMapPartner] = useState(null);

  // Compute smart routed partners dynamically
  const { rankedPartners, topRecommendedPartner, routingRationale } = useMemo(() => {
    return routePartners(activeSchemeId, searchCity, partnerTypeFilter);
  }, [activeSchemeId, searchCity, partnerTypeFilter]);

  const activeSchemeObj = SCHEMES.find((s) => s.id === activeSchemeId) || SCHEMES[0];

  return (
    <section className="partner-locator-section" id="locator">
      <div className="container">
        <div className="section-head-center">
          <div className="section-kicker">AUTHORIZED DISBURSAL NETWORK</div>
          <h2 className="section-title">{t.partnerTitle}</h2>
          <p className="section-lead">{t.partnerSubtitle}</p>
        </div>

        {/* DEMO NOTICE BADGE */}
        <div className="demo-notice-tag-center">
          <span className="demo-badge">PROTOTYPE / DEMONSTRATION DATA</span>
          <small>Channel partner fund allocations and status reflect live simulation parameters.</small>
        </div>

        {/* FILTER CONTROLS TOOLBAR */}
        <div className="partner-filter-toolbar">
          <div className="filter-group">
            <label>Selected Concessional Scheme:</label>
            <select
              className="filter-select"
              value={activeSchemeId}
              onChange={(e) => setActiveSchemeId(e.target.value)}
            >
              {SCHEMES.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.name} ({scheme.displayMaxLoan})
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Partner Institutional Type:</label>
            <select
              className="filter-select"
              value={partnerTypeFilter}
              onChange={(e) => setPartnerTypeFilter(e.target.value)}
            >
              {PARTNER_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by Region / State:</label>
            <select
              className="filter-select"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            >
              <option value="ALL">All Available Regions</option>
              <option value="New Delhi">Delhi / NCR</option>
              <option value="Jaipur">Rajasthan (Jaipur)</option>
              <option value="Mumbai">Maharashtra (Mumbai)</option>
              <option value="Pune">Maharashtra (Pune)</option>
              <option value="Lucknow">Uttar Pradesh (Lucknow)</option>
              <option value="Ahmedabad">Gujarat (Ahmedabad)</option>
              <option value="Chennai">Tamil Nadu (Chennai)</option>
            </select>
          </div>
        </div>

        {/* SMART ROUTING HIGHLIGHT BANNER */}
        {topRecommendedPartner && (
          <div className="smart-routing-card">
            <div className="routing-badge-row">
              <span className="routing-ai-pill">⚡ {t.smartRoutingBadge}</span>
              <span className="routing-score-pill">
                Algorithmic Suitability: {topRecommendedPartner.routingScore}%
              </span>
            </div>

            <div className="routing-card-body">
              <div className="routing-main-info">
                <span className="partner-type-tag">{topRecommendedPartner.fullTypeName}</span>
                <h3 className="partner-headline-name">{topRecommendedPartner.name}</h3>
                <p className="partner-headline-address">📍 {topRecommendedPartner.address}</p>

                <div className="routing-metrics-inline">
                  <div className="metric-chip">
                    <small>FUND AVAILABILITY</small>
                    <strong className="avail-high">
                      {topRecommendedPartner.fundAvailabilityScore}% ({topRecommendedPartner.fundStatus})
                    </strong>
                  </div>

                  <div className="metric-chip">
                    <small>OPERATIONAL RATING</small>
                    <strong>{topRecommendedPartner.npaLevel}</strong>
                  </div>

                  <div className="metric-chip">
                    <small>DISTANCE</small>
                    <strong>{topRecommendedPartner.distanceKm} km</strong>
                  </div>

                  <div className="metric-chip">
                    <small>AVG. DISBURSAL</small>
                    <strong>~{topRecommendedPartner.avgProcessingDays} Days</strong>
                  </div>
                </div>

                {/* THE MULTI-FACTOR EXPLANATION */}
                <div className="smart-routing-explanation">
                  <strong>Why This Partner Is Recommended Over Closer Alternatives:</strong>
                  <p>
                    {routingRationale ||
                      `Recommended because it explicitly supports ${activeSchemeObj.name}, possesses high active fund availability (${topRecommendedPartner.fundAvailabilityScore}%), and has a clean NPA operational rating with no disbursal backlog.`}
                  </p>
                </div>
              </div>

              <div className="routing-action-column">
                <button
                  className="routing-primary-cta"
                  onClick={() => onSelectPartnerForDetails(topRecommendedPartner)}
                >
                  <span>Select Recommended Partner</span>
                  <span className="cta-arrow">→</span>
                </button>
                <small className="routing-sub-note">
                  Fastest application processing for {activeSchemeObj.shortName}
                </small>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE MAP + PARTNER LIST SPLIT VIEW */}
        <div className="locator-split-layout">
          {/* LEAFLET MAP VIEW */}
          <div className="locator-map-panel">
            <div className="panel-title-bar">
              <h4>Geographic Channel Partner Map</h4>
              <span className="map-count-badge">
                {rankedPartners.length} Active Centers Found
              </span>
            </div>

            <PartnerMap
              partners={rankedPartners}
              selectedPartner={selectedMapPartner}
              onSelectPartner={(partner) => {
                setSelectedMapPartner(partner);
                onSelectPartnerForDetails(partner);
              }}
              recommendedPartnerId={topRecommendedPartner?.id}
            />
          </div>

          {/* PARTNERS LIST SCROLLER */}
          <div className="locator-list-panel">
            <div className="panel-title-bar">
              <h4>Ranked Channel Partners</h4>
              <small>Sorted by multi-factor suitability</small>
            </div>

            <div className="partners-cards-scroll">
              {rankedPartners.map((partner, pIdx) => {
                const isTop = partner.id === topRecommendedPartner?.id;
                const isSelected = selectedMapPartner?.id === partner.id;

                return (
                  <div
                    key={partner.id}
                    className={`partner-tile-card ${isTop ? "is-top-pick" : ""} ${
                      isSelected ? "is-selected-map" : ""
                    }`}
                    onClick={() => setSelectedMapPartner(partner)}
                  >
                    <div className="partner-tile-header">
                      <span className="type-badge-pill">{partner.type}</span>
                      <span className="distance-badge">~{partner.distanceKm} km</span>
                    </div>

                    <h5 className="partner-tile-name">{partner.name}</h5>
                    <p className="partner-tile-addr">📍 {partner.address}</p>

                    <div className="partner-tile-stats">
                      <div>
                        <small>Quota Availability:</small>
                        <strong
                          className={
                            partner.fundAvailabilityScore >= 80
                              ? "green-text"
                              : partner.fundAvailabilityScore >= 60
                              ? "orange-text"
                              : "red-text"
                          }
                        >
                          {partner.fundAvailabilityScore}%
                        </strong>
                      </div>
                      <div>
                        <small>Operational NPA:</small>
                        <span>{partner.npaLevel}</span>
                      </div>
                    </div>

                    {isTop && (
                      <div className="top-choice-flag">
                        ★ Best Multi-Factor Match
                      </div>
                    )}

                    <div className="partner-tile-actions">
                      <button
                        className="tile-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPartnerForDetails(partner);
                        }}
                      >
                        Partner Details & Guidance →
                      </button>
                    </div>
                  </div>
                );
              })}

              {rankedPartners.length === 0 && (
                <div className="no-partners-empty">
                  <span>📍</span>
                  <h5>No Channel Partners Match This Filter</h5>
                  <p>Try resetting the institutional type or region filter above.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
