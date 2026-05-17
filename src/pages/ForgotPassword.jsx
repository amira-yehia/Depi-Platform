import { useEffect, useState } from "react";
import "./ForgotPassword.css";

const FORGOT_PASSWORD_URL = "http://depiplatform.runasp.net/api/Auth/forgot-password";

function getApiErrorMessage(responseData) {
  if (!responseData) {
    return "Failed to send reset link.";
  }

  const validationErrors = responseData.errors;
  if (validationErrors && typeof validationErrors === "object") {
    const firstError = Object.values(validationErrors).flat()[0];
    if (firstError) {
      return firstError;
    }
  }

  return (
    responseData.error ||
    responseData.message ||
    responseData.title ||
    responseData.detail ||
    (typeof responseData === "string"
      ? responseData
      : "Failed to send reset link.")
  );
}

function forgotPasswordWithAjax(payload) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", FORGOT_PASSWORD_URL, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        return;
      }

      const responseText = xhr.responseText || "";
      let responseData = null;

      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseData = null;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(responseData);
        return;
      }

      reject(new Error(getApiErrorMessage(responseData)));
    };

    xhr.onerror = () => {
      reject(new Error("Network error. Please try again."));
    };

    xhr.send(JSON.stringify(payload));
  });
}

function IconMail() {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function ForgotPassword({ isOpen, onClose, initialEmail = "" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setEmail((initialEmail || localStorage.getItem("authEmail") || "").trim());
  }, [isOpen, initialEmail]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      await forgotPasswordWithAjax({ email: normalizedEmail });
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fp-overlay" onClick={handleClose} />

      <div className="fp-modal">
        <div className="fp-header">
          <div>
            <h2>Forgot Password</h2>
            <p>We will send password reset instructions to your email.</p>
          </div>

          <button type="button" className="fp-closeBtn" onClick={handleClose}>
            x
          </button>
        </div>

        {success ? (
          <div className="fp-successBox">
            <div className="fp-successIcon">✓</div>
            <h3>Reset Email Sent</h3>
            <p>Please check your inbox for the reset link.</p>
            <button type="button" className="fp-actionBtn" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="fp-form" onSubmit={handleSubmit}>
            <div className="fp-field">
              <label htmlFor="forgot-email">Email</label>
              <div className="fp-inputWrap">
                <span className="fp-icon">
                  <IconMail />
                </span>

                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {error ? <div className="fp-errorBox">{error}</div> : null}

            <div className="fp-actions">
              <button type="button" className="fp-cancelBtn" onClick={handleClose}>
                Cancel
              </button>

              <button type="submit" className="fp-submitBtn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
