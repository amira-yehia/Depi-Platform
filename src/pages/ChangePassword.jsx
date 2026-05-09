import { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

function IconLock() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconEye({ open }) {
  return open ? (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function PwField({
  id,
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  autoComplete,
}) {
  return (
    <div className="pw-field">
      <label htmlFor={id}>{label}</label>

      <div className="pw-input-wrap">
        <span className="lock-icon">
          <IconLock />
        </span>

        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />

        <button type="button" onClick={onToggle} className="eye-btn">
          <IconEye open={show} />
        </button>
      </div>
    </div>
  );
}

export default function ChangePassword({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setError("");
    setSuccess(false);

    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      await axios.post(
        "http://depiplatform.runasp.net/api/Auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to change password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="cp-overlay" onClick={handleClose} />

      {/* Modal */}
      <div className="cp-modal">
        {/* Header */}
        <div className="cp-header">
          <div>
            <h2>Change Password</h2>

            <p>Keep your account secure</p>
          </div>

          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        {/* Success */}
        {success ? (
          <div className="success-box">
            <div className="success-icon">✓</div>

            <h3>Password Updated!</h3>

            <p>Closing in a moment...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="cp-form">
            <PwField
              id="current-password"
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              show={showCurrent}
              onToggle={() => setShowCurrent((v) => !v)}
              placeholder="Enter current password"
              autoComplete="current-password"
            />

            <PwField
              id="new-password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              placeholder="Enter new password"
              autoComplete="new-password"
            />

            <PwField
              id="confirm-password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              show={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />

            {error && <div className="error-box">{error}</div>}

            <div className="cp-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button type="submit" className="update-btn" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
