import React, { useState } from "react";
import { SCHEMES, CATEGORIES } from "../data/schemes";

export function SchemeExplorer({
  onSelectScheme,
  onCalculateEmi,
  onFindPartner,
  savedSchemeIds = [],
  onToggleSaveScheme,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSchemes = SCHEMES.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.tagline.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || scheme.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="scheme-explorer-section" id="schemes">
      <div className="container">
        <div className="section-head-center">
          <div className="section-kicker">CONCESSIONAL CREDIT CATALOGUE</div>
          <h2 className="section-title">Explore Government Schemes</h2>
          <p className="section-lead">
            Browse through tailored credit programs designed for Scheduled Caste entrepreneurs, students, and artisans.
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="explorer-controls-bar">
          <div className="search-input-wrapper">
            <span className="search-glass-icon">🔍</span>
            <input
              type="text"
              className="search-text-field"
              placeholder="Search by keyword, trade, business type, or education..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="category-select-wrapper">
            <select
              className="category-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SCHEME TILES GRID */}
        <div className="explorer-grid">
          {filteredSchemes.map((scheme) => {
            const isSaved = savedSchemeIds.includes(scheme.id);
            return (
              <div key={scheme.id} className="explorer-card">
                <div className="explorer-card-top">
                  <span className="card-cat-badge">{scheme.category}</span>
                  <button
                    className={`bookmark-btn ${isSaved ? "active" : ""}`}
                    onClick={() => onToggleSaveScheme(scheme.id)}
                    title={isSaved ? "Saved" : "Save scheme"}
                  >
                    {isSaved ? "★" : "☆"}
                  </button>
                </div>

                <h3 className="explorer-card-name">{scheme.name}</h3>
                <p className="explorer-card-desc">{scheme.tagline}</p>

                <div className="explorer-specs-inline">
                  <div className="spec-col">
                    <small>MAX CEILING</small>
                    <strong>{scheme.displayMaxLoan}</strong>
                  </div>
                  <div className="spec-col">
                    <small>RATE (P.A.)</small>
                    <strong className="rate-text">{scheme.interestRate}%</strong>
                  </div>
                  <div className="spec-col">
                    <small>MORATORIUM</small>
                    <strong>{scheme.moratoriumMonths} Mos</strong>
                  </div>
                </div>

                <div className="explorer-card-footer">
                  <button
                    className="card-detail-link"
                    onClick={() => onSelectScheme(scheme)}
                  >
                    View Details →
                  </button>

                  <div className="card-quick-actions">
                    <button
                      className="quick-action-icon-btn"
                      title="Calculate EMI"
                      onClick={() =>
                        onCalculateEmi({
                          rate: scheme.interestRate,
                          moratorium: scheme.moratoriumMonths,
                          maxLimit: scheme.maxLoanAmount,
                          name: scheme.name,
                        })
                      }
                    >
                      📊
                    </button>
                    <button
                      className="quick-action-icon-btn"
                      title="Find Channel Partner"
                      onClick={() => onFindPartner(scheme.id)}
                    >
                      📍
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="no-schemes-empty">
            <span className="empty-icon">📂</span>
            <h3>No matching schemes found</h3>
            <p>Try clearing your search terms or selecting 'All Categories'.</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
