import React, { useState } from "react";

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      setOtp("123456");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6 && name.trim() && category) {
      onLoginSuccess({
        mobile,
        name: name.trim(),
        category,
        annualIncome: "₹3,20,000",
      });

      onClose();
    }
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-x" onClick={onClose}>
          ✕
        </button>

        <div className="auth-modal-header">
  <div className="auth-icon-lock">
    {otpSent ? "👤" : "🔐"}
  </div>

  <h3>
    {otpSent ? "Tell Us About Yourself" : "Verify Your Mobile Number"}
  </h3>

  <p>
    {otpSent
      ? "Enter your details to personalize your scheme recommendations."
      : "Enter your mobile number to securely access the Citizen Portal."}
  </p>
</div>
        {!otpSent ? (
          <div className="auth-form-body">
            <div className="form-group">
              <label>10-Digit Mobile Number</label>

              <div className="phone-input-wrap">
                <span className="country-code">+91</span>

                <input
                  type="tel"
                  className="phone-input-field"
                  placeholder="Enter 10-digit mobile"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                />
              </div>
            </div>

            <button
              className="auth-primary-btn"
              disabled={mobile.length !== 10}
              onClick={handleSendOtp}
            >
              Send Verification OTP →
            </button>

            <small className="demo-hint-text">
              Demo Mode: Enter any 10-digit mobile number
            </small>
          </div>
        ) : (
          <div className="auth-form-body">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                className="phone-input-field"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Social Category</label>

              <select
                className="phone-input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
               <option value="">Select your category</option>
<option value="Scheduled Caste">Scheduled Caste (SC)</option>
<option value="Scheduled Tribe">Scheduled Tribe (ST)</option>
<option value="Other Backward Class">Other Backward Class (OBC)</option>
<option value="General">General</option>
<option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Enter 6-Digit OTP</label>

              <input
                type="text"
                className="otp-input-field"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
              />

              <span className="otp-sent-hint">
                ✓ OTP sent to +91 {mobile} (Demo: 123456)
              </span>
            </div>

            <button
              className="auth-primary-btn"
              disabled={
                otp.length !== 6 ||
                !name.trim() ||
                !category
              }
              onClick={handleVerifyOtp}
            >
              Verify & Enter Dashboard
            </button>

            <button
              className="auth-secondary-btn"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
            >
              ← Edit mobile number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;