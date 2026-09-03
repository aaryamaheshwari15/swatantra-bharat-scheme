
import React from "react";
import { SCHEMES } from "../data/schemes";

export function CitizenDashboard({
  user,
  savedSchemeIds = [],
  applications = [],
  onSelectScheme,
  onOpenGuidance,
  onLogout,
}) {
  const savedSchemes = SCHEMES.filter((s) => savedSchemeIds.includes(s.id));

  const category = user?.category || "Not Provided";

  return (
    <section className="citizen-dashboard-section" id="dashboard">
      <div className="container">

        {/* USER HEADER */}
        <div className="dashboard-user-header">
          <div className="user-greeting">
            <div className="user-avatar-large">
              <span>
                {user?.name?.trim()?.[0]?.toUpperCase() || "A"}
              </span>
            </div>

            <div>
              <span className="kicker-tag">CITIZEN DASHBOARD</span>

              <h2>
                Welcome, {user?.name || "Citizen"}
              </h2>

              <p>
                Mobile: +91 {user?.mobile || "Not Provided"}{" "}
                <span className="dashboard-divider">|</span>{" "}
                Category: {category}
              </p>
            </div>
          </div>

          <div className="dashboard-header-actions">
            <button className="logout-btn" onClick={onLogout}>
              Sign Out
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="dash-kpi-grid">

          <div className="dash-kpi-card">
            <small>PROFILE STATUS</small>

            <strong className="text-green">
              Verified
            </strong>

            <span>
              Category: {category}
            </span>
          </div>

          <div className="dash-kpi-card">
            <small>SAVED SCHEMES</small>

            <strong>
              {savedSchemeIds.length}
            </strong>

            <span>
              Bookmarked for review
            </span>
          </div>

          <div className="dash-kpi-card">
            <small>ACTIVE APPLICATIONS</small>

            <strong>
              {applications.length}
            </strong>

            <span>
              Tracked in pipeline
            </span>
          </div>

          <div className="dash-kpi-card">
            <small>BENEFICIARY PACK</small>

            <strong>
              Ready
            </strong>

            <button
              className="dash-inline-link"
              onClick={() => onOpenGuidance(null)}
            >
              View Checklist →
            </button>
          </div>

        </div>

        {/* SAVED SCHEMES SECTION */}
        <div className="dash-section-panel">
          <div className="panel-head-bar">
            <h3>
              Saved Schemes ({savedSchemes.length})
            </h3>

            <small>
              Quick access to your preferred concessional programs
            </small>
          </div>

          {savedSchemes.length === 0 ? (
            <div className="empty-dash-box">
              <p>
                You have not bookmarked any schemes yet.
                Browse the catalogue and click the ★ icon.
              </p>
            </div>
          ) : (
            <div className="saved-schemes-dash-grid">
              {savedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="saved-card"
                >
                  <div className="saved-card-cat">
                    {scheme.category}
                  </div>

                  <h4>
                    {scheme.name}
                  </h4>

                  <p>
                    {scheme.tagline}
                  </p>

                  <div className="saved-specs">
                    <span>
                      Ceiling:{" "}
                      <strong>
                        {scheme.displayMaxLoan}
                      </strong>
                    </span>

                    <span>
                      Rate:{" "}
                      <strong>
                        {scheme.interestRate}%
                      </strong>
                    </span>
                  </div>

                  <button
                    className="view-saved-btn"
                    onClick={() => onSelectScheme(scheme)}
                  >
                    View Scheme Details →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* APPLICATION TRACKER SECTION */}
        <div className="dash-section-panel">
          <div className="panel-head-bar">
            <h3>
              Tracked Application Journey
            </h3>

            <small>
              Simulated progress through official channel partners
            </small>
          </div>

          {applications.length === 0 ? (
            <div className="empty-dash-box">
              <p>
                No active applications currently started.
                Open any scheme and click "Start Application Guidance"
                to begin.
              </p>
            </div>
          ) : (
            <div className="dash-apps-list">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="app-tracker-card"
                >
                  <div className="app-tracker-top">
                    <div>
                      <span className="app-id-tag">
                        ID: {app.id}
                      </span>

                      <h4>
                        {app.schemeName}
                      </h4>

                      <small>
                        Partner:{" "}
                        {app.partnerName ||
                          "State Channelizing Agency"}
                      </small>
                    </div>

                    <div className="app-status-badge">
                      <span className="status-dot"></span>

                      {app.status ||
                        "Under Nodal Verification"}
                    </div>
                  </div>

                  <div className="app-journey-steps">

                    <div className="journey-step-pill done">
                      <span>✓</span>
                      1. Eligibility Matched
                    </div>

                    <div className="journey-step-pill done">
                      <span>✓</span>
                      2. Partner Allocated
                    </div>

                    <div className="journey-step-pill current">
                      <span>●</span>
                      3. Document Scrutiny
                    </div>

                    <div className="journey-step-pill">
                      <span>○</span>
                      4. Loan Disbursal
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
