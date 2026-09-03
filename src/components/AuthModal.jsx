import React, { useState } from "react";

export function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [mobile, setMobile] = useState("9876543210");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      setOtp("123456"); // Pre-fill mock OTP for smooth judge demo!
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      onLoginSuccess({
        mobile,
        name: "Aarya Sharma",
        category: "Scheduled Caste",
        annualIncome: "₹3,20,000",
      });
      onClose();
    }
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-x" onClick={onClose}>
          ✕
        </button>

        <div className="auth-modal-header">
          <div className="auth-icon-lock">🔐</div>
          <h3>Citizen Portal Sign In</h3>
          <p>Access your saved schemes, profile analysis, and application roadmap.</p>
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
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
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
              <label>Enter 6-Digit OTP</label>
              <input
                type="text"
                className="otp-input-field"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
              <span className="otp-sent-hint">
                ✓ OTP sent to +91 {mobile} (Demo: 123456)
              </span>
            </div>

            <button
              className="auth-primary-btn"
              disabled={otp.length !== 6}
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
