import React, { useState } from "react";
import { TRANSLATIONS } from "../data/translations";

export function Navbar({
  language,
  setLanguage,
  isLoggedIn,
  onOpenSignIn,
  onOpenDashboard,
  activeSection,
  setActiveSection,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { id: "home", label: t.navHome, href: "#home" },
    { id: "schemes", label: t.navSchemes, href: "#schemes" },
    { id: "recommender", label: t.navRecommender, href: "#recommender" },
    { id: "calculator", label: t.navCalculator, href: "#calculator" },
    { id: "locator", label: t.navPartners, href: "#locator" },
    { id: "how-it-works", label: t.navHowItWorks, href: "#how-it-works" },
    { id: "insights", label: t.navAdmin, href: "#insights" },
  ];

  const handleNavClick = (id, href) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* TOP GOVERNMENT CONCESSIONAL BANNER */}
      <div className="top-gov-bar">
        <div className="container top-gov-content">
          <div className="gov-flag-wrap">
            <span className="gov-tricolor-strip"></span>
            <span>{t.govIndia}</span>
          </div>

          <div className="top-gov-actions">
            <a href="#main-content" className="gov-skip-link">
              {t.skipToMain}
            </a>

            {/* WORKING LANGUAGE SELECTOR */}
            <div className="lang-picker-wrap">
              <span className="lang-icon">🌐</span>
              <select
                className="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Select Language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER WITH LOGO */}
      <header className="main-header">
        <div className="container header-container">
          <div className="brand-lockup" onClick={() => handleNavClick("home", "#home")}>
            <img
              src="/logo.jpeg"
              alt="Swatantra Bharat Scheme Logo"
              className="brand-logo-img"
            />
            <div className="brand-headings">
              <h1 className="brand-title">{t.portalName}</h1>
              <p className="brand-tagline">"{t.tagline}"</p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="desktop-navbar" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link-btn ${activeSection === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id, item.href)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* USER ACTIONS */}
          <div className="header-actions">
            {isLoggedIn ? (
              <button className="user-profile-badge" onClick={onOpenDashboard}>
                <span className="avatar-circle">SC</span>
                <span className="profile-text">{t.navProfile}</span>
              </button>
            ) : (
              <button className="primary-signin-btn" onClick={onOpenSignIn}>
                <span className="lock-icon">🔒</span>
                <span>{t.navSignIn}</span>
              </button>
            )}

            {/* MOBILE HAMBURGER */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id, item.href)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
