import { useState } from "react";
import "./App.css";

const schemes = [
  {
    id: 1,
    name: "Education Assistance Scheme",
    category: "Education",
    description:
      "Educational support for eligible students to help reduce financial barriers to higher education.",
    eligibility:
      "Students meeting the applicable age, category and educational requirements.",
    benefits: [
      "Educational financial assistance",
      "Support for eligible students",
      "Simple digital application process",
    ],
  },
  {
    id: 2,
    name: "Student Skill Development Programme",
    category: "Skill Development",
    description:
      "Skill development opportunities designed to help young citizens build employment-ready skills.",
    eligibility:
      "Young citizens who meet the applicable programme requirements.",
    benefits: [
      "Skill development training",
      "Career-oriented learning",
      "Access to development opportunities",
    ],
  },
  {
    id: 3,
    name: "Farmer Support Scheme",
    category: "Agriculture",
    description:
      "Support services designed for eligible citizens involved in agriculture and allied activities.",
    eligibility:
      "Eligible farmers meeting the applicable scheme requirements.",
    benefits: [
      "Agricultural support",
      "Access to relevant services",
      "Digital application assistance",
    ],
  },
  {
    id: 4,
    name: "Worker Welfare Scheme",
    category: "Employment",
    description:
      "Welfare and support services for eligible workers.",
    eligibility:
      "Workers meeting the applicable employment and welfare criteria.",
    benefits: [
      "Worker welfare support",
      "Access to relevant benefits",
      "Application assistance",
    ],
  },
  {
    id: 5,
    name: "Entrepreneurship Support Scheme",
    category: "Business",
    description:
      "Support for citizens interested in starting or developing an entrepreneurial venture.",
    eligibility:
      "Applicants meeting the applicable entrepreneurship programme criteria.",
    benefits: [
      "Entrepreneurship support",
      "Business development assistance",
      "Access to relevant opportunities",
    ],
  },
  {
    id: 6,
    name: "Senior Citizen Welfare Scheme",
    category: "Social Welfare",
    description:
      "Support services and welfare benefits for eligible senior citizens.",
    eligibility:
      "Senior citizens meeting the applicable welfare criteria.",
    benefits: [
      "Social welfare support",
      "Citizen assistance",
      "Access to relevant services",
    ],
  },
];

function App() {
  const [showEligibility, setShowEligibility] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const openEligibility = () => {
    setShowEligibility(true);

    setTimeout(() => {
      document
        .getElementById("eligibility")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleApplication = () => {
    setApplicationSubmitted(true);
  };

  return (
    <div className="app">

      {/* TOP GOVERNMENT BAR */}

      <div className="top-bar">
        <div className="container top-content">

          <span>Government of India</span>

          <div className="top-links">
            <span>Skip to Main Content</span>
            <span>|</span>
            <span>English</span>
            <span>|</span>
            <span>हिन्दी</span>
          </div>

        </div>
      </div>


      {/* HEADER */}

      <header className="header">

        <div className="container header-content">

          <a href="#home" className="brand">

            <img
              src="/logo.jpeg"
              alt="Swatantra Bharat Scheme Logo"
              className="logo"
            />

            <div className="brand-text">

              <h1>Swatantra Bharat Scheme</h1>

              <p>
                Citizen Welfare &amp; Government Services
              </p>

            </div>

          </a>

          <button className="login-btn">
            Login
          </button>

        </div>

      </header>


      {/* NAVIGATION */}

      <nav className="navbar">

        <div className="container nav-content">

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <a href="#eligibility">Eligibility</a>

          <a href="#schemes">Schemes</a>

          <a href="#process">How It Works</a>

          <a href="#contact">Contact</a>

        </div>

      </nav>


      <main>


        {/* HERO */}

        <section className="hero" id="home">

          <div className="container hero-content">

            <div className="hero-text">

              <div className="scheme-tag">
                GOVERNMENT CITIZEN SERVICES
              </div>

              <h2>
                Empowering Citizens.
                <br />
                Strengthening India.
              </h2>

              <p>
                A simple digital platform to discover government
                schemes, check eligibility and access benefits
                relevant to you.
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-btn"
                  onClick={openEligibility}
                >
                  Check Eligibility
                </button>

                <a
                  href="#about"
                  className="secondary-btn"
                >
                  Learn More
                </a>

              </div>

            </div>


            <div className="hero-info">

              <div className="info-header">
                Scheme Information
              </div>

              <div className="info-row">
                <span>Platform</span>
                <strong>Citizen Services</strong>
              </div>

              <div className="info-row">
                <span>Access</span>
                <strong>Online</strong>
              </div>

              <div className="info-row">
                <span>Eligibility</span>
                <strong>Profile Based</strong>
              </div>

              <div className="info-row">
                <span>Status</span>
                <strong className="active">
                  Active
                </strong>
              </div>

            </div>

          </div>

        </section>


        {/* ABOUT */}

        <section className="section" id="about">

          <div className="container">

            <div className="section-heading">

              <span>ABOUT</span>

              <h2>
                One platform. Relevant government support.
              </h2>

            </div>

            <p className="section-description">
              Swatantra Bharat Scheme brings important citizen
              welfare information together in one place. Citizens
              can understand available benefits, check their
              eligibility and begin the application process through
              a clear and accessible digital interface.
            </p>


            <div className="feature-grid">

              <div className="feature">

                <div className="feature-number">
                  01
                </div>

                <h3>
                  Discover
                </h3>

                <p>
                  Find schemes and government support relevant
                  to your profile.
                </p>

              </div>


              <div className="feature">

                <div className="feature-number">
                  02
                </div>

                <h3>
                  Check
                </h3>

                <p>
                  Understand your eligibility before beginning
                  an application.
                </p>

              </div>


              <div className="feature">

                <div className="feature-number">
                  03
                </div>

                <h3>
                  Apply
                </h3>

                <p>
                  Access the next steps required to apply for
                  a relevant benefit.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ELIGIBILITY */}

        {showEligibility && (

          <section
            className="eligibility-section"
            id="eligibility"
          >

            <div className="container eligibility-content">

              <div className="eligibility-intro">

                <span className="section-label">
                  ELIGIBILITY CHECK
                </span>

                <h2>
                  Find benefits relevant to you.
                </h2>

                <p>
                  Enter a few basic details. The prototype will
                  identify schemes that may be relevant to your
                  profile.
                </p>

              </div>


              <EligibilityForm
                onSelectScheme={setSelectedScheme}
              />

            </div>

          </section>

        )}


        {/* SCHEMES */}

        <section className="section schemes-section" id="schemes">

          <div className="container">

            <div className="section-heading">

              <span>SCHEMES</span>

              <h2>
                Explore available support
              </h2>

            </div>

            <p className="section-description">
              Explore different categories of government support
              available through the platform.
            </p>


            <div className="scheme-grid">

              {schemes.map((scheme) => (

                <div
                  className="scheme-preview"
                  key={scheme.id}
                >

                  <span className="scheme-category">
                    {scheme.category}
                  </span>

                  <h3>
                    {scheme.name}
                  </h3>

                  <p>
                    {scheme.description}
                  </p>

                  <button
                    className="text-btn"
                    onClick={() =>
                      setSelectedScheme(scheme)
                    }
                  >
                    View Details →
                  </button>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* HOW IT WORKS */}

        <section
          className="process-section"
          id="process"
        >

          <div className="container">

            <div className="section-heading center">

              <span>PROCESS</span>

              <h2>
                Simple. Clear. Accessible.
              </h2>

            </div>


            <div className="steps">

              <div className="step">

                <div className="step-circle">
                  1
                </div>

                <h3>
                  Enter Details
                </h3>

                <p>
                  Provide basic citizen information.
                </p>

              </div>


              <div className="step-line"></div>


              <div className="step">

                <div className="step-circle">
                  2
                </div>

                <h3>
                  Check
                </h3>

                <p>
                  Identify relevant schemes.
                </p>

              </div>


              <div className="step-line"></div>


              <div className="step">

                <div className="step-circle">
                  3
                </div>

                <h3>
                  Apply
                </h3>

                <p>
                  Begin the application process.
                </p>

              </div>


              <div className="step-line"></div>


              <div className="step">

                <div className="step-circle">
                  4
                </div>

                <h3>
                  Track
                </h3>

                <p>
                  Monitor your application status.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* FOOTER */}

      <footer id="contact">

        <div className="footer-main">

          <div className="container footer-content">

            <div>

              <h2>
                Swatantra Bharat Scheme
              </h2>

              <p>
                A citizen-focused digital platform for
                discovering and accessing government support.
              </p>

            </div>


            <div>

              <h3>
                Quick Links
              </h3>

              <a href="#home">
                Home
              </a>

              <a href="#about">
                About
              </a>

              <a href="#schemes">
                Schemes
              </a>

              <a href="#process">
                How It Works
              </a>

            </div>


            <div>

              <h3>
                Support
              </h3>

              <p>
                Citizen Support
              </p>

              <p>
                Frequently Asked Questions
              </p>

              <p>
                Contact Us
              </p>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <div className="container footer-bottom-content">

            <span>
              © 2026 Swatantra Bharat Scheme
            </span>

            <span>
              Government of India
            </span>

          </div>

        </div>

      </footer>


      {/* SCHEME DETAILS MODAL */}

      {selectedScheme && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedScheme(null)}
        >

          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-btn"
              onClick={() =>
                setSelectedScheme(null)
              }
            >
              ×
            </button>


            {!applicationSubmitted ? (

              <>

                <span className="scheme-category">
                  {selectedScheme.category}
                </span>

                <h2>
                  {selectedScheme.name}
                </h2>

                <p className="modal-description">
                  {selectedScheme.description}
                </p>


                <div className="modal-block">

                  <h3>
                    Eligibility
                  </h3>

                  <p>
                    {selectedScheme.eligibility}
                  </p>

                </div>


                <div className="modal-block">

                  <h3>
                    Key Benefits
                  </h3>

                  <ul>

                    {selectedScheme.benefits.map(
                      (benefit, index) => (

                        <li key={index}>
                          {benefit}
                        </li>

                      )
                    )}

                  </ul>

                </div>


                <button
                  className="primary-btn modal-apply"
                  onClick={handleApplication}
                >
                  Apply Now →
                </button>

              </>

            ) : (

              <div className="application-success">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Application Started
                </h2>

                <p>
                  Your application has been initiated
                  successfully in this prototype.
                </p>

                <div className="status-box">

                  <span>
                    Application Status
                  </span>

                  <strong>
                    Initiated
                  </strong>

                </div>

                <button
                  className="secondary-btn"
                  onClick={() => {
                    setApplicationSubmitted(false);
                    setSelectedScheme(null);
                  }}
                >
                  Close
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}


function EligibilityForm({ onSelectScheme }) {

  const [formData, setFormData] = useState({
    age: "",
    state: "",
    category: "",
  });

  const [result, setResult] = useState(null);


  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };


  const checkEligibility = (event) => {

    event.preventDefault();

    if (
      !formData.age ||
      !formData.state ||
      !formData.category
    ) {

      setResult({
        type: "error",
        message:
          "Please select all the details before continuing.",
      });

      return;
    }


    let matchedSchemes = [];


    if (formData.category === "Student") {

      matchedSchemes = schemes.filter(
        (scheme) =>
          scheme.category === "Education" ||
          scheme.category === "Skill Development"
      );

    } else if (formData.category === "Farmer") {

      matchedSchemes = schemes.filter(
        (scheme) =>
          scheme.category === "Agriculture"
      );

    } else if (formData.category === "Worker") {

      matchedSchemes = schemes.filter(
        (scheme) =>
          scheme.category === "Employment"
      );

    } else if (formData.category === "Entrepreneur") {

      matchedSchemes = schemes.filter(
        (scheme) =>
          scheme.category === "Business"
      );

    } else if (formData.category === "Senior Citizen") {

      matchedSchemes = schemes.filter(
        (scheme) =>
          scheme.category === "Social Welfare"
      );

    }


    setResult({
      type: "success",
      schemes: matchedSchemes,
    });

  };


  if (result?.type === "success") {

    return (

      <div className="eligibility-box">

        <div className="eligibility-result">

          <div className="result-icon">
            ✓
          </div>

          <h3>
            {result.schemes.length} Scheme
            {result.schemes.length !== 1 ? "s" : ""} Found
          </h3>

          <p>
            These schemes may be relevant to the
            information you provided.
          </p>


          <div className="scheme-results">

            {result.schemes.map((scheme) => (

              <div
                className="scheme-card"
                key={scheme.id}
              >

                <span className="scheme-category">
                  {scheme.category}
                </span>

                <h4>
                  {scheme.name}
                </h4>

                <p>
                  {scheme.description}
                </p>

                <button
                  className="scheme-btn"
                  onClick={() =>
                    onSelectScheme(scheme)
                  }
                >
                  View Details →
                </button>

              </div>

            ))}

          </div>


          <button
            className="secondary-btn"
            onClick={() => setResult(null)}
          >
            ← Check Again
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="eligibility-box">

      <form onSubmit={checkEligibility}>

        <div className="form-row">

          <label>
            Age Group
          </label>

          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
          >

            <option value="">
              Select age group
            </option>

            <option value="18-25">
              18–25
            </option>

            <option value="26-40">
              26–40
            </option>

            <option value="41-60">
              41–60
            </option>

            <option value="60+">
              60+
            </option>

          </select>

        </div>


        <div className="form-row">

          <label>
            State / UT
          </label>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >

            <option value="">
              Select State / UT
            </option>

            <option value="Rajasthan">
              Rajasthan
            </option>

            <option value="Delhi">
              Delhi
            </option>

            <option value="Maharashtra">
              Maharashtra
            </option>

            <option value="Gujarat">
              Gujarat
            </option>

            <option value="Uttar Pradesh">
              Uttar Pradesh
            </option>

          </select>

        </div>


        <div className="form-row">

          <label>
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >

            <option value="">
              Select category
            </option>

            <option value="Student">
              Student
            </option>

            <option value="Farmer">
              Farmer
            </option>

            <option value="Worker">
              Worker
            </option>

            <option value="Entrepreneur">
              Entrepreneur
            </option>

            <option value="Senior Citizen">
              Senior Citizen
            </option>

          </select>

        </div>


        <button
          className="primary-btn"
          type="submit"
        >
          Check My Eligibility →
        </button>

      </form>

    </div>

  );
}


export default App;