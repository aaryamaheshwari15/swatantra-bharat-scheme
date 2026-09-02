import { useState } from "react";
import "./App.css";

const schemes = [
  {
    id: 1,
    name: "PM-KISAN",
    category: "Agriculture",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description:
      "Income support scheme for eligible landholding farmer families.",
    benefit: "₹6,000 per year",
    eligibility:
      "Eligible landholding farmer families subject to applicable exclusions.",
    documents: ["Aadhaar", "Land records", "Bank account details"],
  },
  {
    id: 2,
    name: "PM SVANidhi",
    category: "Business",
    ministry: "Ministry of Housing & Urban Affairs",
    description:
      "Working capital support for street vendors to restart or expand their businesses.",
    benefit: "Working capital support",
    eligibility:
      "Eligible street vendors meeting the scheme's applicable criteria.",
    documents: ["Aadhaar", "Vendor certificate/ID", "Bank account"],
  },
  {
    id: 3,
    name: "National Scholarship Portal",
    category: "Education",
    ministry: "Government of India",
    description:
      "A digital platform providing access to various scholarship opportunities.",
    benefit: "Scholarship assistance",
    eligibility:
      "Students meeting the eligibility requirements of an applicable scholarship.",
    documents: ["Aadhaar", "Student ID", "Income certificate", "Bank details"],
  },
  {
    id: 4,
    name: "PMEGP",
    category: "Business",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    description:
      "Credit-linked subsidy programme supporting eligible entrepreneurs in setting up micro enterprises.",
    benefit: "Credit-linked subsidy",
    eligibility:
      "Eligible individuals and organisations meeting programme requirements.",
    documents: ["Identity proof", "Address proof", "Project report"],
  },
  {
    id: 5,
    name: "Ayushman Bharat PM-JAY",
    category: "Healthcare",
    ministry: "Ministry of Health & Family Welfare",
    description:
      "Health assurance support for eligible families under the national health protection programme.",
    benefit: "Health coverage",
    eligibility:
      "Families identified according to the applicable eligibility database and criteria.",
    documents: ["Aadhaar", "Government ID"],
  },
  {
    id: 6,
    name: "Sukanya Samriddhi Account",
    category: "Social Welfare",
    ministry: "Government of India",
    description:
      "Savings scheme designed to support the financial future of eligible girl children.",
    benefit: "Long-term savings benefit",
    eligibility:
      "Eligible girl children and guardians according to applicable account rules.",
    documents: ["Birth certificate", "Guardian ID", "Address proof"],
  },
];

const categories = [
  "All",
  "Education",
  "Agriculture",
  "Business",
  "Healthcare",
  "Social Welfare",
];

function App() {
  const [showEligibility, setShowEligibility] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [citizenCategory, setCitizenCategory] = useState("");
  const [income, setIncome] = useState("");
  const [gender, setGender] = useState("");

  const [recommendations, setRecommendations] = useState([]);
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showApplicationPack, setShowApplicationPack] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [savedSchemes, setSavedSchemes] = useState([]);
  const [applications, setApplications] = useState([]);

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(search.toLowerCase()) ||
      scheme.category.toLowerCase().includes(search.toLowerCase()) ||
      scheme.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || scheme.category === category;

    return matchesSearch && matchesCategory;
  });

  const openEligibility = () => {
    setShowEligibility(true);

    setTimeout(() => {
      document.getElementById("eligibility")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const checkEligibility = () => {
  if (!age || !state || !citizenCategory || !income || !gender) {
    setEligibilityChecked(false);
    setRecommendations([]);
    return;
  }

  let result = [];

  if (citizenCategory === "Farmer") {
    result.push({
      ...schemes[0],
      matchScore: 92,
      reasons: [
        "You selected Farmer as your occupation",
        "Your profile matches the agriculture category",
        "Your basic profile information is complete",
      ],
    });
  }

  if (citizenCategory === "Student") {
    result.push({
      ...schemes[2],
      matchScore: 94,
      reasons: [
        "You selected Student as your occupation",
        "This scheme is designed for students",
        "Your basic profile information is complete",
      ],
    });
  }

  if (citizenCategory === "Entrepreneur") {
    result.push({
      ...schemes[1],
      matchScore: 88,
      reasons: [
        "You selected Entrepreneur as your occupation",
        "The scheme provides support for eligible small businesses",
        "Your basic profile information is complete",
      ],
    });

    result.push({
      ...schemes[3],
      matchScore: 90,
      reasons: [
        "You selected Entrepreneur as your occupation",
        "The scheme supports eligible new business ventures",
        "Your basic profile information is complete",
      ],
    });
  }

  if (citizenCategory === "Worker") {
    result.push({
      ...schemes[1],
      matchScore: 86,
      reasons: [
        "You selected Worker as your occupation",
        "The scheme is relevant to eligible street vendors and workers",
        "Your basic profile information is complete",
      ],
    });
  }

  if (citizenCategory === "General") {
    result.push({
      ...schemes[2],
      matchScore: 78,
      reasons: [
        "You may qualify based on your personal profile",
        "The scheme supports eligible students and applicants",
        "Final eligibility depends on official scheme criteria",
      ],
    });

    result.push({
      ...schemes[4],
      matchScore: 75,
      reasons: [
        "You may be able to access healthcare support",
        "Your profile has been successfully analysed",
        "Final eligibility requires official beneficiary verification",
      ],
    });
  }

  if (age === "60+") {
    result.push({
      ...schemes[5],
      matchScore: 82,
      reasons: [
        "Your selected age group is relevant to long-term social welfare planning",
        "The scheme provides a government-backed savings option",
        "Final eligibility depends on scheme-specific conditions",
      ],
    });
  }

  if (income === "Below ₹2.5 Lakh") {
    const existing = result.find((scheme) => scheme.id === 5);

    if (existing) {
      existing.matchScore = Math.min(existing.matchScore + 5, 99);
      existing.reasons.push(
        "Your selected income range may be relevant for beneficiary verification"
      );
    } else {
      result.push({
        ...schemes[4],
        matchScore: 80,
        reasons: [
          "Your selected income range may be relevant for beneficiary verification",
          "The scheme provides healthcare support to eligible beneficiaries",
          "Final eligibility requires official verification",
        ],
      });
    }
  }

  const uniqueResults = result.filter(
    (scheme, index, array) =>
      array.findIndex((item) => item.id === scheme.id) === index
  );

  uniqueResults.sort((a, b) => b.matchScore - a.matchScore);

  setRecommendations(uniqueResults);
  setEligibilityChecked(true);
};

  const resetEligibility = () => {
    setAge("");
    setState("");
    setCitizenCategory("");
    setIncome("");
    setGender("");
    setRecommendations([]);
    setEligibilityChecked(false);
  };

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  const toggleSavedScheme = (schemeId) => {
  setSavedSchemes((current) =>
    current.includes(schemeId)
      ? current.filter((id) => id !== schemeId)
      : [...current, schemeId]
  );
};

const startApplication = (scheme) => {
  const existingApplication = applications.find(
    (application) => application.schemeId === scheme.id
  );

  if (existingApplication) {
    setSelectedScheme(null);
    return;
  }

  const application = {
    id: `SBS-${Date.now().toString().slice(-6)}`,
    schemeId: scheme.id,
    schemeName: scheme.name,
    category: scheme.category,
    status: "Submitted",
    date: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };

  setApplications((current) => [application, ...current]);
  setSelectedScheme(null);

  setTimeout(() => {
    document.getElementById("applications")?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
};

  return (
    <div className="app">
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-content">
          <span>Government of India</span>

          <div className="top-links">
            <button>Skip to Main Content</button>
            <button>English</button>
            <button>हिन्दी</button>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="container header-content">
          <div className="brand">
            <img
              src="/logo.jpeg"
              alt="Swatantra Bharat Scheme"
              className="logo"
            />

            <div className="brand-text">
              <h1>Swatantra Bharat Scheme</h1>
              <p>Citizen-centric government scheme discovery platform</p>
            </div>
          </div>

          {isLoggedIn ? (
  <button
    className="login-btn"
    onClick={() => {
      document.getElementById("dashboard")?.scrollIntoView({
        behavior: "smooth",
      });
    }}
  >
    My Profile
  </button>
) : (
  <button
    className="login-btn"
    onClick={() => setShowLogin(true)}
  >
    Sign In
  </button>
)}
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="container nav-content">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#eligibility">Eligibility</a>
          <a href="#schemes">Schemes</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="container hero-content">
            <div className="hero-text">
              <div className="scheme-tag">
                GOVERNMENT SCHEME DISCOVERY
              </div>

              <h2>
                Find the right government schemes for you.
              </h2>

              <p>
                Swatantra Bharat Scheme helps citizens discover relevant
                government schemes through simple eligibility-based
                recommendations — all in one place.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={openEligibility}
                >
                  Check My Eligibility
                </button>

                <a className="secondary-btn" href="#schemes">
                  Explore Schemes
                </a>
              </div>
            </div>

            <div className="hero-info">
              <div className="info-header">
                Platform Information
              </div>

              <div className="info-row">
                <span>Scheme discovery</span>
                <strong>Personalised</strong>
              </div>

              <div className="info-row">
                <span>Eligibility</span>
                <strong>Rule-based</strong>
              </div>

              <div className="info-row">
                <span>Coverage</span>
                <strong>Central & State</strong>
              </div>

              <div className="info-row">
                <span>Status</span>
                <strong className="active">Prototype Ready</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-heading">
              <span>WHAT WE DO</span>
              <h2>Government benefits, made easier to discover.</h2>

              <p className="section-description">
                Citizens often know that government schemes exist but
                may not know which ones apply to them. Our platform
                simplifies discovery by connecting citizen profiles
                with relevant schemes.
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature">
                <div className="feature-number">01</div>
                <h3>Discover</h3>
                <p>
                  Search government schemes using keywords,
                  categories and citizen needs.
                </p>
              </div>

              <div className="feature">
                <div className="feature-number">02</div>
                <h3>Check</h3>
                <p>
                  Enter basic information to receive schemes that
                  may match your eligibility.
                </p>
              </div>

              <div className="feature">
                <div className="feature-number">03</div>
                <h3>Understand</h3>
                <p>
                  View benefits, eligibility requirements and
                  documents needed before applying.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        {showEligibility && (
          <section className="eligibility-section" id="eligibility">
            <div className="container eligibility-content">
              <div className="eligibility-intro">
                <span className="section-label">
                  PERSONALIZED ELIGIBILITY
                </span>

                <h2>
                  Tell us a little about yourself.
                </h2>

                <p>
                  Your information is used only for this prototype's
                  recommendation engine. Select the options that best
                  describe your current situation.
                </p>

                <div className="trust-box">
                  <strong>Why these questions?</strong>
                  <span>
                    Different schemes have different age, income,
                    occupation and category requirements.
                  </span>
                </div>
              </div>

              <div className="eligibility-box">
                {!eligibilityChecked ? (
                  <>
                    <div className="form-title">
                      Eligibility Profile
                    </div>

                    <div className="form-row">
                      <label>Age Group</label>
                      <select
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      >
                        <option value="">Select age group</option>
                        <option>Below 18</option>
                        <option>18–25</option>
                        <option>26–40</option>
                        <option>41–59</option>
                        <option>60+</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>State / UT</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">Select State / UT</option>
                        <option>Rajasthan</option>
                        <option>Delhi</option>
                        <option>Maharashtra</option>
                        <option>Gujarat</option>
                        <option>Uttar Pradesh</option>
                        <option>Madhya Pradesh</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Citizen Category / Occupation</label>
                      <select
                        value={citizenCategory}
                        onChange={(e) =>
                          setCitizenCategory(e.target.value)
                        }
                      >
                        <option value="">Select category</option>
                        <option>Student</option>
                        <option>Farmer</option>
                        <option>Worker</option>
                        <option>Entrepreneur</option>
                        <option>General</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Annual Family Income</label>
                      <select
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                      >
                        <option value="">Select income range</option>
                        <option>Below ₹2.5 Lakh</option>
                        <option>₹2.5–5 Lakh</option>
                        <option>₹5–8 Lakh</option>
                        <option>Above ₹8 Lakh</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select gender</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <button
                      className="primary-btn full-width"
                      onClick={checkEligibility}
                    >
                      Find Matching Schemes
                    </button>
                  </>
                ) : (
                  <div className="eligibility-result">
                    <div className="result-icon">✓</div>

                    <span className="result-label">
  PROFILE ANALYSIS COMPLETE
</span>

<h3>
  {recommendations.length > 0
    ? `${recommendations.length} potential matches found`
    : "No direct matches found"}
</h3>

<p>
  We analysed your profile against the available scheme
  criteria and identified potential matches.
</p>

<div className="profile-summary">

  <div className="profile-summary-header">
    <strong>Your Profile</strong>
    <span>Based on information provided</span>
  </div>

  <div className="profile-summary-grid">

    <div className="profile-summary-item">
      <span>AGE GROUP</span>
      <strong>{age}</strong>
    </div>

    <div className="profile-summary-item">
      <span>STATE / UT</span>
      <strong>{state}</strong>
    </div>

    <div className="profile-summary-item">
      <span>CATEGORY</span>
      <strong>{citizenCategory}</strong>
    </div>

    <div className="profile-summary-item">
      <span>ANNUAL INCOME</span>
      <strong>{income}</strong>
    </div>

    <div className="profile-summary-item">
      <span>GENDER</span>
      <strong>{gender}</strong>
    </div>

  </div>
</div>
                    <p>
                      Based on the information entered, these schemes
                      may be relevant to your profile.
                    </p>

                    {recommendations.length > 0 && (
                      <div className="recommendation-list">
                        {recommendations.map((scheme) => (
                          <div className="recommendation-card" key={scheme.id}>
  <div className="recommendation-main">

    <div className="recommendation-top">
      <span className="recommendation-category">
        {scheme.category}
      </span>

      <span className="match-score">
        {scheme.matchScore}% Profile Match
      </span>
    </div>

    <h4>{scheme.name}</h4>

    <p className="recommendation-benefit">
      {scheme.benefit}
    </p>

    <div className="why-match">
      <strong>Why this matches you</strong>

      {scheme.reasons?.map((reason, index) => (
        <div className="match-reason" key={index}>
          <span>✓</span>
          <p>{reason}</p>
        </div>
      ))}
    </div>

  </div>

  <button
    className="outline-btn"
    onClick={() => setSelectedScheme(scheme)}
  >
    View Details →
  </button>
</div>
                        ))}
                      </div>
                    )}

                    <button
                      className="text-btn"
                      onClick={resetEligibility}
                    >
                      ← Edit my information
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SCHEME EXPLORER */}
        <section className="section schemes-section" id="schemes">
          <div className="container">
            <div className="section-heading scheme-heading">
              <span>SCHEME EXPLORER</span>

              <h2>Explore government schemes.</h2>

              <p className="section-description">
                Search through the prototype scheme catalogue and
                understand benefits, eligibility and required
                documents.
              </p>
            </div>

            <div className="scheme-tools">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="scheme-grid">
              {filteredSchemes.map((scheme) => (
                <div className="scheme-preview" key={scheme.id}>
                  <div className="scheme-top">
                    <span>{scheme.category}</span>

                    <button
                      className={`save-btn ${
                        savedSchemes.includes(scheme.id)
                          ? "saved"
                          : ""
                      }`}
                      onClick={() =>
                        toggleSavedScheme(scheme.id)
                      }
                      aria-label="Save scheme"
                    >
                      {savedSchemes.includes(scheme.id)
                        ? "★"
                        : "☆"}
                    </button>
                  </div>

                  <h3>{scheme.name}</h3>

                  <p>{scheme.description}</p>

                  <div className="scheme-benefit">
                    <span>Key benefit</span>
                    <strong>{scheme.benefit}</strong>
                  </div>

                  <button
                    className="card-link"
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    View scheme details →
                  </button>
                </div>
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <div className="empty-state">
                <h3>No schemes found</h3>
                <p>
                  Try a different search term or category.
                </p>
              </div>
            )}
          </div>
        </section>
{/* CITIZEN DASHBOARD */}
{isLoggedIn && (
  <section className="dashboard-section" id="dashboard">
    <div className="container">

      <div className="dashboard-header">
        <div>
          <span className="section-label">CITIZEN DASHBOARD</span>

          <h2>Welcome back.</h2>

          <p>
            Manage your profile, saved schemes and application
            journey from one place.
          </p>
        </div>

        <div className="profile-status">
          <div className="profile-avatar">
            A
          </div>

          <div>
            <strong>Citizen Profile</strong>
            <span>Profile active</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card profile-card">
          <div className="dashboard-card-heading">
            <span>PROFILE</span>
            <strong>75%</strong>
          </div>

          <h3>Complete your profile</h3>

          <p>
            Add a few more details to receive more accurate
            scheme recommendations.
          </p>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <button className="card-link">
            Complete profile →
          </button>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">🎯</div>

          <span>RECOMMENDATIONS</span>

          <h3>
            {recommendations.length || 3}
          </h3>

          <p>
            Potential schemes matched to your profile.
          </p>

          <a href="#schemes" className="card-link">
            View schemes →
          </a>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">★</div>

          <span>SAVED SCHEMES</span>

          <h3>{savedSchemes.length}</h3>

          <p>
            Schemes you have saved for later.
          </p>

          <a href="#schemes" className="card-link">
            View saved schemes →
          </a>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">📄</div>

          <span>APPLICATIONS</span>

          <h3>{applications.length}</h3>

          <p>
            Applications currently being tracked.
          </p>

          <button className="card-link">
            Track applications →
          </button>
        </div>

      </div>

      <div className="dashboard-lower">

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span>YOUR JOURNEY</span>
              <h3>Application readiness</h3>
            </div>

            <strong>40%</strong>
          </div>

          <div className="journey-progress">
            <div className="journey-step completed">
              <div>✓</div>
              <span>Profile</span>
            </div>

            <div className="journey-line"></div>

            <div className="journey-step completed">
              <div>✓</div>
              <span>Eligibility</span>
            </div>

            <div className="journey-line"></div>

            <div className="journey-step">
              <div>3</div>
              <span>Documents</span>
            </div>

            <div className="journey-line"></div>

            <div className="journey-step">
              <div>4</div>
              <span>Application</span>
            </div>
          </div>
        </div>

        <div className="dashboard-panel alert-panel">
          <span>IMPORTANT</span>

          <h3>Keep your documents ready</h3>

          <p>
            Having identity, income and bank documents ready can
            make the application process easier.
          </p>

          <button className="outline-btn">
            View document checklist
          </button>
        </div>

      </div>

    </div>
  </section>
)}
      {/* APPLICATION TRACKER */}

{isLoggedIn && (
  <section
    className="applications-section"
    id="applications"
  >
    <div className="container">

      <div className="section-heading">
        <span>APPLICATION TRACKER</span>

        <h2>Track your applications.</h2>

        <p className="section-description">
          Keep track of your government scheme applications,
          their current stage and application reference number.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="application-empty">
          <div className="empty-icon">📄</div>

          <h3>No applications yet</h3>

          <p>
            Once you start an application, its status and
            reference number will appear here.
          </p>

          <a
            href="#schemes"
            className="primary-btn"
          >
            Explore Schemes
          </a>
        </div>
      ) : (
        <div className="application-list">

          {applications.map((application) => (
            <div
              className="application-card"
              key={application.id}
            >

              <div className="application-top">

                <div>
                  <span className="application-category">
                    {application.category}
                  </span>

                  <h3>{application.schemeName}</h3>

                  <p>
                    Application ID:
                    <strong> {application.id}</strong>
                  </p>
                </div>

                <div className="application-status">
                  <span></span>
                  {application.status}
                </div>

              </div>

              <div className="application-timeline">

                <div className="timeline-step completed">
                  <div className="timeline-circle">
                    ✓
                  </div>

                  <span>Application</span>
                  <small>Submitted</small>
                </div>

                <div className="timeline-line active"></div>

                <div className="timeline-step current">
                  <div className="timeline-circle">
                    2
                  </div>

                  <span>Verification</span>
                  <small>In progress</small>
                </div>

                <div className="timeline-line"></div>

                <div className="timeline-step">
                  <div className="timeline-circle">
                    3
                  </div>

                  <span>Decision</span>
                  <small>Pending</small>
                </div>

              </div>

              <div className="application-footer">

                <div>
                  <span>SUBMITTED ON</span>
                  <strong>{application.date}</strong>
                </div>

                <div>
                  <span>LAST UPDATED</span>
                  <strong>Just now</strong>
                </div>

                <button className="outline-btn">
                  View details
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  </section>
)} 
        {/* HOW IT WORKS */}
        <section className="process-section" id="how-it-works">
          <div className="container">
            <div className="section-heading center">
              <span>HOW IT WORKS</span>
              <h2>From discovery to application.</h2>

              <p className="section-description centered">
                A simple four-step journey designed around the
                citizen.
              </p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-circle">01</div>
                <h3>Enter</h3>
                <p>Provide basic profile information.</p>
              </div>

              <div className="step-line"></div>

              <div className="step">
                <div className="step-circle">02</div>
                <h3>Match</h3>
                <p>Identify schemes relevant to you.</p>
              </div>

              <div className="step-line"></div>

              <div className="step">
                <div className="step-circle">03</div>
                <h3>Understand</h3>
                <p>Review benefits and requirements.</p>
              </div>

              <div className="step-line"></div>

              <div className="step">
                <div className="step-circle">04</div>
                <h3>Apply</h3>
                <p>Proceed to the official application.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-main" id="contact">
        <div className="container footer-content">
          <div>
            <div className="footer-brand">
              <img src="/logo.jpeg" alt="" />
              <strong>Swatantra Bharat Scheme</strong>
            </div>

            <p>
              Simplifying access to government schemes through
              intelligent citizen-centric discovery.
            </p>
          </div>

          <div className="footer-links">
            <strong>Quick Links</strong>
            <a href="#home">Home</a>
            <a href="#schemes">Schemes</a>
            <a href="#eligibility">Eligibility</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          <div className="footer-note">
            <strong>Prototype Notice</strong>
            <p>
              This is a demonstration prototype developed for
              Smart India Hackathon.
            </p>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 Swatantra Bharat Scheme</span>
          <span>Designed for citizen accessibility</span>
        </div>
      </footer>

      {/* SCHEME DETAILS MODAL */}
      {selectedScheme && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedScheme(null)}
        >
          <div
            className="modal scheme-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedScheme(null)}
            >
              ×
            </button>

            <span className="modal-category">
              {selectedScheme.category}
            </span>

            <h2>{selectedScheme.name}</h2>

            <p className="modal-description">
              {selectedScheme.description}
            </p>

            <div className="modal-section">
              <span>MINISTRY / DEPARTMENT</span>
              <strong>{selectedScheme.ministry}</strong>
            </div>
            <div className="verification-box">
  <div className="verification-icon">✓</div>

  <div>
    <strong>Scheme information verified</strong>

    <p>
      Information is presented for citizen discovery.
      Please verify final eligibility and application
      requirements on the official department portal.
    </p>
  </div>
</div>

<div className="scheme-meta">
  <div>
    <span>INFORMATION SOURCE</span>
    <strong>Government Scheme Database</strong>
  </div>

  <div>
    <span>LAST REVIEWED</span>
    <strong>02 Sep 2026</strong>
  </div>
</div>

            <div className="modal-section">
              <span>KEY BENEFIT</span>
              <strong>{selectedScheme.benefit}</strong>
            </div>

            <div className="modal-section">
              <span>ELIGIBILITY</span>
              <p>{selectedScheme.eligibility}</p>
            </div>

            <div className="modal-section">
  <div className="documents-heading">
    <div>
      <span>APPLICATION READINESS</span>
      <h3>Prepare before you apply</h3>
    </div>

    <strong className="readiness-score">75%</strong>
  </div>

  <p className="readiness-text">
    Having the commonly required documents ready can make
    the application process easier.
  </p>

  <div className="readiness-bar">
    <div className="readiness-fill"></div>
  </div>

  <div className="readiness-status">
    <span>✓</span>
    Basic profile information available
  </div>

  <div className="readiness-status">
    <span>✓</span>
    Identity document
  </div>

  <div className="readiness-status pending">
    <span>!</span>
    Check scheme-specific documents
  </div>

  <div className="required-documents">
    <strong>Common documents</strong>

    <div className="document-list">
      {selectedScheme.documents.map((document) => (
        <div key={document} className="document-item">
          ✓ {document}
        </div>
      ))}
    </div>
  </div>
</div>

           <div className="modal-actions">
            <button
  className="pack-btn"
  onClick={() => setShowApplicationPack(true)}
>
  📄 Prepare Application Pack
</button>
  <button
    className="primary-btn"
    onClick={() => startApplication(selectedScheme)}
  >
    {applications.some(
      (application) =>
        application.schemeId === selectedScheme.id
    )
      ? "Application Started"
      : "Apply Now"}
  </button>

  <button
    className="secondary-btn"
    onClick={() =>
      toggleSavedScheme(selectedScheme.id)
    }
  >
    {savedSchemes.includes(selectedScheme.id)
      ? "★ Saved"
      : "☆ Save Scheme"}
  </button>
</div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="modal login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowLogin(false)}
            >
              ×
            </button>

            {!otpSent ? (
              <>
                <div className="login-icon">🔐</div>

                <h2>Sign in</h2>

                <p className="login-subtitle">
                  Enter your mobile number to continue.
                </p>

                <div className="form-row">
                  <label>Mobile Number</label>

                  <div className="mobile-input">
                    <span>+91</span>

                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        )
                      }
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>

                <button
                  className="primary-btn full-width"
                  onClick={handleSendOtp}
                  disabled={mobile.length !== 10}
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <div className="login-icon">✓</div>

                <h2>Verify Mobile Number</h2>

                <p className="login-subtitle">
                  Enter the 6-digit OTP sent to +91 {mobile}
                </p>

                <div className="form-row">
                  <label>OTP</label>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="Enter 6-digit OTP"
                  />
                </div>

                <button
                  className="primary-btn full-width"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6}
                >
                  Verify & Continue
                </button>

                <button
                  className="text-btn"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                >
                  ← Change mobile number
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {showApplicationPack && selectedScheme && (
  <div className="modal-overlay">
    <div className="application-pack-modal">

      <div className="pack-header">
        <div>
          <span className="pack-label">APPLICATION PACK</span>
          <h2>Ready to Apply</h2>
          <p>
            A personalized summary prepared for your selected scheme.
          </p>
        </div>

        <button
          className="modal-close"
          onClick={() => setShowApplicationPack(false)}
        >
          ×
        </button>
      </div>

      <div className="pack-verification">
        <span>✓</span>
        <div>
          <strong>Application guidance prepared</strong>
          <p>
            This pack helps you organize your application.
            Final eligibility and document requirements must be
            verified on the official government portal.
          </p>
        </div>
      </div>

      <div className="pack-section">
        <span>SCHEME</span>
        <h3>{selectedScheme.name}</h3>
        <p>{selectedScheme.description}</p>
      </div>

      <div className="pack-grid">

        <div className="pack-info-card">
          <span>PROFILE MATCH</span>
          <strong>
            {selectedScheme.matchScore || 90}%
          </strong>
          <p>Based on your current profile</p>
        </div>

        <div className="pack-info-card">
          <span>EXPECTED BENEFIT</span>
          <strong>{selectedScheme.benefit}</strong>
          <p>As mentioned in scheme information</p>
        </div>

      </div>

      <div className="pack-section">
        <span>ELIGIBILITY SUMMARY</span>

        <div className="pack-check">
          <span>✓</span>
          <p>Your profile has been analysed for this scheme.</p>
        </div>

        <div className="pack-check">
          <span>✓</span>
          <p>
            Your selected category and basic profile information
            are relevant to this scheme.
          </p>
        </div>

        <div className="pack-check pending">
          <span>!</span>
          <p>
            Final eligibility must be confirmed by the concerned
            government department.
          </p>
        </div>
      </div>

      <div className="pack-section">
        <span>DOCUMENT CHECKLIST</span>

        <div className="pack-document-list">
          {selectedScheme.documents.map((document) => (
            <div className="pack-document" key={document}>
              <span>✓</span>
              {document}
            </div>
          ))}
        </div>
      </div>

      <div className="pack-section">
        <span>APPLICATION STEPS</span>

        <div className="pack-step">
          <b>01</b>
          <div>
            <strong>Review eligibility</strong>
            <p>Confirm that you meet the official criteria.</p>
          </div>
        </div>

        <div className="pack-step">
          <b>02</b>
          <div>
            <strong>Prepare documents</strong>
            <p>Keep the required documents ready.</p>
          </div>
        </div>

        <div className="pack-step">
          <b>03</b>
          <div>
            <strong>Apply through official portal</strong>
            <p>Use the authorised government application channel.</p>
          </div>
        </div>
      </div>

      <div className="pack-footer">
        <p>
          🔒 <strong>Safety note:</strong> Swatantra Bharat Scheme
          does not collect application fees or guarantee approval.
          Always verify the official department website before
          submitting personal information.
        </p>
      </div>

      <div className="pack-actions">
        <button
          className="outline-btn"
          onClick={() => setShowApplicationPack(false)}
        >
          Back to Scheme
        </button>

        <button
          className="primary-btn"
          onClick={() => window.print()}
        >
          🖨 Print / Save Pack
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default App;