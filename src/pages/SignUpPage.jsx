import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";

const API_URL = "http://depiplatform.runasp.net/api/Auth/register";

const roles = [
  {
    id: "freelancer",
    title: "Freelancer",
    subtitle: "Find jobs and grow your career",
    icon: "fa-solid fa-briefcase",
  },
  {
    id: "client",
    title: "Client",
    subtitle: "Hire talented freelancers",
    icon: "fa-solid fa-bullseye",
  },
];

const benefits = [
  "AI-powered job matching",
  "Profile analytics",
  "Secure payments",
  "24/7 support",
];

function SignUpPage() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("freelancer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const names = formData.fullName.trim().split(" ");
      const firstName = names[0];
      const lastName = names.slice(1).join(" ") || "User";

      const requestBody = {
        email: formData.email.trim(),
        password: formData.password,
        firstName: firstName,
        lastName: lastName,
        userType: selectedRole === "client" ? 1 : 0,
        gender: 0,
        dateOfBirth: `${formData.dateOfBirth}T00:00:00.000Z`,
        phoneNumber: formData.phoneNumber.trim(),
        countryId: 1,
      };

      const response = await axios.post(API_URL, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Register Error:", error);

      if (error.response) {
        alert(
          error.response.data?.detail ||
            error.response.data?.message ||
            "Registration failed",
        );
      } else {
        alert("Network error. Please check backend connection or CORS.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="signupPage">
      <Link to="/" className="signupPage__topButton">
        Get Started
      </Link>

      <div className="signupPage__logoWrap">
        <Link to="/">
          <img
            src="/logo.png"
            alt="NextHire logo"
            className="signupPage__logo"
          />
        </Link>
      </div>

      <section className="signupCard" aria-labelledby="signup-title">
        <header className="signupCard__header">
          <h1 id="signup-title">Create your account</h1>
          <p>Join thousands using AI-powered freelancing.</p>
        </header>

        <form className="signupForm" onSubmit={handleSubmit}>
          <div>
            <p className="signupForm__label">Choose your role</p>

            <div className="signupRoleGrid">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  className={`signupRoleCard ${selectedRole === role.id ? "is-active" : ""}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <span className="signupRoleCard__icon">
                    <i className={role.icon} aria-hidden="true" />
                  </span>
                  <strong>{role.title}</strong>
                  <small>{role.subtitle}</small>
                </button>
              ))}
            </div>
          </div>

          <label className="signupField">
            <span>Full Name</span>
            <div className="signupField__control">
              <i className="fa-regular fa-user" />
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="signupField">
            <span>Email Address</span>
            <div className="signupField__control">
              <i className="fa-regular fa-envelope" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="signupField">
            <span>Phone Number</span>
            <div className="signupField__control">
              <i className="fa-solid fa-phone" />
              <input
                type="text"
                name="phoneNumber"
                placeholder="01012345678"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="signupField">
            <span>Date of Birth</span>
            <div className="signupField__control">
              <i className="fa-regular fa-calendar" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="signupField">
            <span>Password</span>
            <div className="signupField__control">
              <i className="fa-solid fa-lock" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="signupField__toggle"
                onClick={() => setShowPassword((current) => !current)}
              >
                <i
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                />
              </button>
            </div>
          </label>

          <label className="signupTerms">
            <input type="checkbox" required />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button type="submit" className="signupSubmit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="signupBenefits">
          <h2>What you'll get:</h2>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <i className="fa-regular fa-circle-check" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <p className="signupCard__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default SignUpPage;
