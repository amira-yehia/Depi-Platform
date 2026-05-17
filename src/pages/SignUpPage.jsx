import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

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
  const [selectedRole, setSelectedRole] = useState("freelancer");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Selected role:", selectedRole);
  }

  return (
    <main className="signupPage">
      <div className="signupPage__logoWrap">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="NextHire logo"
            className="signupPage__logo"
          />
        </Link>
      </div>

      <section className="signupCard" aria-labelledby="signup-title">
        <header className="signupCard__header">
          <h1 id="signup-title">Create your account</h1>
          <p>Join thousands using AI-powered freelancing</p>
        </header>

        <form className="signupForm" onSubmit={handleSubmit}>
          <div>
            <p className="signupForm__label">Choose your role</p>

            <div className="signupRoleGrid">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  className={`signupRoleCard ${
                    selectedRole === role.id ? "is-active" : ""
                  }`}
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
            <span>Full name</span>
            <div className="signupField__control">
              <i className="fa-regular fa-user" aria-hidden="true" />
              <input type="text" placeholder="John Doe" required />
            </div>
          </label>

          <label className="signupField">
            <span>Email address</span>
            <div className="signupField__control">
              <i className="fa-regular fa-envelope" aria-hidden="true" />
              <input type="email" placeholder="you@example.com" required />
            </div>
          </label>

          <label className="signupField">
            <span>Password</span>
            <div className="signupField__control">
              <i className="fa-solid fa-lock" aria-hidden="true" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                required
              />

              <button
                type="button"
                className="signupField__toggle"
                onClick={() => setShowPassword((c) => !c)}
                aria-label="Toggle password visibility"
              >
                <i
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                  aria-hidden="true"
                />
              </button>
            </div>
          </label>

          <label className="signupTerms">
            <input type="checkbox" required />
            <span>
              I agree to the <a href="#terms">Terms of Service</a> and{" "}
              <a href="#privacy">Privacy Policy</a>
            </span>
          </label>

          <button type="submit" className="signupSubmit">
            Create Account
          </button>
        </form>

        <div className="signupBenefits">
          <h2>What you'll get:</h2>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <i className="fa-regular fa-circle-check" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="signupDivider" />

        <p className="signupCard__footer">
          Already have an account? <a href="#signin">Sign in</a>
        </p>
      </section>
    </main>
  );
}

export default SignUpPage;