import React, { useState } from "react";

export function ApplicationGuidance({
  isOpen,
  onClose,
  selectedScheme,
  selectedPartner,
  userProfile,
}) {
  if (!isOpen) return null;

  const [checkedDocs, setCheckedDocs] = useState({
    identity: true,
    income: true,
    caste: true,
    bank: true,
    project: false,
    education: false,
  });

  const toggleDoc = (key) => {
    setCheckedDocs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistStages = [
    {
      num: "01",
      title: "Check Eligibility Criteria",
      desc: "Confirm that your annual family income is under ₹5,00,000 and you hold a valid Scheduled Caste certificate.",
      done: true,
    },
    {
      num: "02",
      title: "Select Suitable Scheme",
      desc: `Selected: ${selectedScheme?.name || "Micro Finance Scheme"} with 90% project financing.`,
      done: true,
    },
    {
      num: "03",
      title: "Prepare Required Documents",
      desc: "Assemble your identity, caste certificate, income proof, and simple project outline or fee structure.",
      done: false,
    },
    {
      num: "04",
      title: "Locate Authorized Channel Partner",
      desc: `Designated Partner: ${selectedPartner?.name || "State Channelizing Agency (SCA) / Nodal Bank"}.`,
      done: true,
    },
    {
      num: "05",
      title: "Contact or Visit Partner Desk",
      desc: "Meet the designated Concessional Credit Nodal Officer for physical document verification.",
      done: false,
    },
    {
      num: "06",
      title: "Submit Application Through Prescribed Channel",
      desc: "Submit the standardized government concessional loan form without paying any intermediary fees.",
      done: false,
    },
  ];

  const docChecklist = [
    {
      id: "identity",
      title: "Identity Proof",
      desc: "Aadhaar Card, Voter ID, or PAN Card of the applicant",
      tag: "Mandatory",
    },
    {
      id: "caste",
      title: "Caste / Community Certificate",
      desc: "Official SC certificate issued by Tehsildar or District Magistrate",
      tag: "Mandatory",
    },
    {
      id: "income",
      title: "Family Income Certificate",
      desc: "Valid income certificate proving annual family income under ₹5,00,000",
      tag: "Mandatory",
    },
    {
      id: "bank",
      title: "Bank Account Details",
      desc: "Aadhaar-seeded bank account passbook copy with IFSC & account number",
      tag: "Mandatory",
    },
    {
      id: "project",
      title: "Project / Business Proposal",
      desc: "Simple project proposal with machinery/goods quotation (for business credit)",
      tag: "For Business",
    },
    {
      id: "education",
      title: "Educational Admission Proof",
      desc: "Admission letter, fee structure schedule & previous marksheets (for education loan)",
      tag: "For Students",
    },
  ];

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="guidance-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="guidance-header">
          <div>
            <span className="guidance-tag">OFFICIAL BENEFICIARY ONBOARDING</span>
            <h2>Application & Document Checklist Guidance</h2>
            <p>
              Your step-by-step roadmap to access concessional financing without middlemen or hidden fees.
            </p>
          </div>
          <button className="modal-close-x" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* SUMMARY STRIP */}
        <div className="guidance-summary-strip">
          <div className="strip-item">
            <small>TARGET SCHEME</small>
            <strong>{selectedScheme?.name || "Micro Finance Scheme"}</strong>
          </div>
          <div className="strip-item">
            <small>MAXIMUM COVERAGE</small>
            <strong>Up to 90% Concessional Credit</strong>
          </div>
          <div className="strip-item">
            <small>AUTHORIZED PARTNER</small>
            <strong>{selectedPartner?.name || "State Channelizing Agency (SCA)"}</strong>
          </div>
        </div>

        {/* 6-STEP PROCESS ROADMAP */}
        <div className="guidance-section">
          <h3>The 6-Step Application Journey:</h3>
          <div className="steps-flow-grid">
            {checklistStages.map((st) => (
              <div key={st.num} className={`step-flow-box ${st.done ? "step-done" : ""}`}>
                <div className="step-flow-top">
                  <span className="flow-num">{st.num}</span>
                  {st.done ? (
                    <span className="done-pill">✓ Verified</span>
                  ) : (
                    <span className="pending-pill">Action Item</span>
                  )}
                </div>
                <strong>{st.title}</strong>
                <p>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE DOCUMENT CHECKLIST */}
        <div className="guidance-section">
          <div className="doc-section-head">
            <h3>Document Preparation Checklist:</h3>
            <small>Tick the documents you have ready in hand</small>
          </div>

          <div className="doc-items-grid">
            {docChecklist.map((doc) => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <div
                  key={doc.id}
                  className={`doc-check-row ${isChecked ? "doc-ready" : ""}`}
                  onClick={() => toggleDoc(doc.id)}
                >
                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDoc(doc.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="doc-texts">
                    <strong>{doc.title}</strong>
                    <p>{doc.desc}</p>
                  </div>
                  <span className={`doc-tag-badge ${doc.tag.toLowerCase().replace(" ", "-")}`}>
                    {doc.tag}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="guidance-disclaimer-note">
            <span className="info-icon">ℹ</span>
            <p>
              <strong>Important Notice:</strong> Document requirements may vary by scheme and channel partner.
              This platform provides guidance only and does not submit financial loan applications or charge fees.
            </p>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="guidance-footer-actions">
          <button className="secondary-close-btn" onClick={onClose}>
            Back to Platform
          </button>
          <button
            className="print-pack-btn"
            onClick={() => window.print()}
          >
            🖨 Print / Save Beneficiary Pack
          </button>
        </div>
      </div>
    </div>
  );
}
