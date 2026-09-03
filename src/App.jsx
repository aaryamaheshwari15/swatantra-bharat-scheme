import React, { useState } from "react";
import "./App.css";

// Components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Recommender } from "./components/Recommender";
import { UserSummary } from "./components/UserSummary";
import { SchemeComparison } from "./components/SchemeComparison";
import { Calculator } from "./components/Calculator";
import { PartnerLocator } from "./components/PartnerLocator";
import { SchemeExplorer } from "./components/SchemeExplorer";
import { ImpactSection } from "./components/ImpactSection";
import { AdminDashboard } from "./components/AdminDashboard";
import { CitizenDashboard } from "./components/CitizenDashboard";
import { TrustDisclaimer } from "./components/TrustDisclaimer";
import { Footer } from "./components/Footer";

// Modals
import { SchemeDetailsModal } from "./components/SchemeDetailsModal";
import { PartnerDetailsModal } from "./components/PartnerDetailsModal";
import { ApplicationGuidance } from "./components/ApplicationGuidance";
import { AuthModal } from "./components/AuthModal";

// Data
import { SCHEMES } from "./data/schemes";
import { PARTNERS } from "./data/partners";

function App() {
  // Global State
  const [language, setLanguage] = useState("en");
  const [activeNavSection, setActiveNavSection] = useState("home");

  // User Profile from Recommender (Default initialized to SIH Demo values for instant judge viewing)
  const [userProfile, setUserProfile] = useState({
    purpose: "micro_business",
    projectCost: 120000,
    income: 320000,
    beneficiaryType: "Aspiring entrepreneur",
    gender: "Male",
  });

  // Saved Schemes & Applications
  const [savedSchemeIds, setSavedSchemeIds] = useState(["micro-finance"]);
  const [comparedSchemes, setComparedSchemes] = useState([
    SCHEMES[0], // Micro Finance Scheme
    SCHEMES[1], // Term Loan Scheme
  ]);
  const [applications, setApplications] = useState([
    {
      id: "SBS-260901",
      schemeId: "micro-finance",
      schemeName: "Micro Finance Scheme",
      partnerName: "Delhi SC/ST/OBC Development & Financial Corporation (DSFDC)",
      status: "Document Scrutiny In Progress",
      date: "03 Sep 2026",
    },
  ]);

  // Modals & Navigation Deep Links
  const [selectedSchemeForDetails, setSelectedSchemeForDetails] = useState(null);
  const [selectedPartnerForDetails, setSelectedPartnerForDetails] = useState(null);
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);
  const [guidanceContext, setGuidanceContext] = useState({
    scheme: SCHEMES[0],
    partner: PARTNERS[0],
  });

  // Cross-component pre-fills
  const [calculatorPrefill, setCalculatorPrefill] = useState({
    principal: 120000,
    rate: 5.0,
    moratorium: 6,
    maxLimit: 140000,
    name: "Micro Finance Scheme",
  });
  const [locatorSchemeId, setLocatorSchemeId] = useState("micro-finance");

  // Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCitizenDashboard, setShowCitizenDashboard] = useState(false);

  // Bookmark toggle
  const handleToggleSaveScheme = (schemeId) => {
    setSavedSchemeIds((prev) =>
      prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId]
    );
  };

  // Comparison toggle
  const handleToggleCompare = (scheme) => {
    setComparedSchemes((prev) => {
      if (prev.some((s) => s.id === scheme.id)) {
        return prev.filter((s) => s.id !== scheme.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 schemes at a time. Remove one first.");
        return prev;
      }
      return [...prev, scheme];
    });

    // Scroll to comparison section
    setTimeout(() => {
      document.getElementById("comparison")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Calculator interaction
  const handleSelectSchemeForCalculator = (data) => {
    setCalculatorPrefill(data);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  // Partner locator interaction
  const handleSelectSchemeForPartner = (schemeId) => {
    setLocatorSchemeId(schemeId);
    document.getElementById("locator")?.scrollIntoView({ behavior: "smooth" });
  };

  // Application Guidance Launch
  const handleStartGuidance = (partnerOrScheme = null) => {
    const activeScheme =
      SCHEMES.find((s) => s.id === locatorSchemeId) || SCHEMES[0];
    const activePartner =
      PARTNERS.find((p) => p.supportedSchemes.includes(activeScheme.id)) || PARTNERS[0];

    setGuidanceContext({
      scheme: activeScheme,
      partner: partnerOrScheme && partnerOrScheme.type ? partnerOrScheme : activePartner,
    });
    setIsGuidanceOpen(true);
  };

  // Login Success
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setShowCitizenDashboard(true);
  };

  return (
    <div className="app-root">
      {/* NAVBAR */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        isLoggedIn={isLoggedIn}
        onOpenSignIn={() => setIsAuthModalOpen(true)}
        onOpenDashboard={() => setShowCitizenDashboard(!showCitizenDashboard)}
        activeSection={activeNavSection}
        setActiveSection={setActiveNavSection}
      />

      <main id="main-content">
        {/* CITIZEN DASHBOARD (IF LOGGED IN AND TOGGLED) */}
        {isLoggedIn && showCitizenDashboard && (
          <CitizenDashboard
            user={currentUser}
            savedSchemeIds={savedSchemeIds}
            applications={applications}
            onSelectScheme={(scheme) => setSelectedSchemeForDetails(scheme)}
            onOpenGuidance={() => handleStartGuidance()}
            onLogout={() => {
              setIsLoggedIn(false);
              setCurrentUser(null);
              setShowCitizenDashboard(false);
            }}
          />
        )}

        {/* HERO SECTION */}
        <Hero
          language={language}
          onStartRecommender={() => {
            document.getElementById("recommender")?.scrollIntoView({ behavior: "smooth" });
          }}
          onExploreSchemes={() => {
            document.getElementById("schemes")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* HOW IT WORKS (SECTION 14) */}
        <HowItWorks
          onStartRecommender={() => {
            document.getElementById("recommender")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* SMART SCHEME RECOMMENDER (SECTION 2 & 3 & 4) */}
        <Recommender
          language={language}
          onSelectSchemeForDetails={(scheme) => setSelectedSchemeForDetails(scheme)}
          onSelectSchemeForCalculator={handleSelectSchemeForCalculator}
          onSelectSchemeForPartner={handleSelectSchemeForPartner}
          onToggleCompare={handleToggleCompare}
          comparedSchemeIds={comparedSchemes.map((s) => s.id)}
          savedSchemeIds={savedSchemeIds}
          onToggleSaveScheme={handleToggleSaveScheme}
        />

        {/* USER PROFILE SUMMARY CARD (SECTION 13) */}
        <div className="container summary-wrapper-spacer">
          <UserSummary
            userProfile={userProfile}
            recommendedScheme={SCHEMES[0]} // Micro Finance Scheme
            recommendedPartner={PARTNERS[0]} // Delhi DSFDC
            onOpenCalculator={() => {
              document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
            }}
            onOpenPartnerLocator={() => {
              document.getElementById("locator")?.scrollIntoView({ behavior: "smooth" });
            }}
            onStartGuidance={() => handleStartGuidance()}
          />
        </div>

        {/* SCHEME COMPARISON (SECTION 5) */}
        <SchemeComparison
          comparedSchemes={comparedSchemes}
          allSchemes={SCHEMES}
          onRemoveScheme={(schemeId) =>
            setComparedSchemes((prev) => prev.filter((s) => s.id !== schemeId))
          }
          onAddScheme={(scheme) =>
            setComparedSchemes((prev) => [...prev, scheme])
          }
          onSelectForCalculator={handleSelectSchemeForCalculator}
          onSelectForPartner={handleSelectSchemeForPartner}
          userProfile={userProfile}
        />

        {/* FINANCIAL / EMI CALCULATOR (SECTION 6) */}
        <Calculator
          language={language}
          prefillData={calculatorPrefill}
          onClearPrefill={() => setCalculatorPrefill(null)}
        />

        {/* CHANNEL PARTNER LOCATOR & SMART ROUTING (SECTION 7, 8, 9) */}
        <PartnerLocator
          language={language}
          selectedSchemeId={locatorSchemeId}
          onSelectPartnerForDetails={(partner) => setSelectedPartnerForDetails(partner)}
        />

        {/* SCHEME CATALOGUE EXPLORER */}
        <SchemeExplorer
          onSelectScheme={(scheme) => setSelectedSchemeForDetails(scheme)}
          onCalculateEmi={handleSelectSchemeForCalculator}
          onFindPartner={handleSelectSchemeForPartner}
          savedSchemeIds={savedSchemeIds}
          onToggleSaveScheme={handleToggleSaveScheme}
        />

        {/* IMPACT SECTION (SECTION 15) */}
        <ImpactSection />

        {/* SYSTEM INSIGHTS / ADMIN DASHBOARD (SECTION 16) */}
        <AdminDashboard />

        {/* TRUST & STATUTORY DISCLAIMER (SECTION 20) */}
        <TrustDisclaimer language={language} />
      </main>

      {/* FOOTER */}
      <Footer language={language} />

      {/* MODALS */}
      {selectedSchemeForDetails && (
        <SchemeDetailsModal
          scheme={selectedSchemeForDetails}
          onClose={() => setSelectedSchemeForDetails(null)}
          onCalculateEmi={handleSelectSchemeForCalculator}
          onFindPartner={handleSelectSchemeForPartner}
          onStartGuidance={(scheme) => handleStartGuidance(scheme)}
          isSaved={savedSchemeIds.includes(selectedSchemeForDetails.id)}
          onToggleSave={handleToggleSaveScheme}
        />
      )}

      {selectedPartnerForDetails && (
        <PartnerDetailsModal
          partner={selectedPartnerForDetails}
          onClose={() => setSelectedPartnerForDetails(null)}
          onStartApplicationGuidance={(partner) => handleStartGuidance(partner)}
        />
      )}

      <ApplicationGuidance
        isOpen={isGuidanceOpen}
        onClose={() => setIsGuidanceOpen(false)}
        selectedScheme={guidanceContext.scheme}
        selectedPartner={guidanceContext.partner}
        userProfile={userProfile}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;