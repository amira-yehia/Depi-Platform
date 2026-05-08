import { Link } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";
import FeatureCard from "../components/FeatureCard";
import FeatureSection from "../components/FeatureSection";

import "./LandingPage.css";

const freelancerSteps = [
  {
    title: "Register",
    subtitle: "Create your account",
    icon: "fa-regular fa-user",
  },
  {
    title: "Build Profile",
    subtitle: "Showcase your skills",
    icon: "fa-regular fa-file-lines",
  },
  {
    title: "Get AI Score",
    subtitle: "Receive match rating",
    icon: "fa-solid fa-bullseye",
  },
  {
    title: "Apply",
    subtitle: "Submit proposals",
    icon: "fa-regular fa-paper-plane",
  },
  {
    title: "Get Paid",
    subtitle: "Secure payments",
    icon: "fa-solid fa-dollar-sign",
  },
];

const clientSteps = [
  {
    title: "Post Job",
    subtitle: "Describe your needs",
    icon: "fa-regular fa-briefcase",
  },
  {
    title: "AI Matches",
    subtitle: "Instant recommendations",
    icon: "fa-solid fa-bullseye",
  },
  {
    title: "Review",
    subtitle: "Check candidates",
    icon: "fa-solid fa-users",
  },
  {
    title: "Hire",
    subtitle: "Select the best fit",
    icon: "fa-solid fa-check",
  },
  {
    title: "Pay",
    subtitle: "Secure milestone",
    icon: "fa-solid fa-dollar-sign",
  },
];

function StepColumn({ title, icon, steps, variant }) {
  return (
    <div className="howColumn">
      <div className={`howColumn__badge howColumn__badge--${variant}`}>
        <i className={icon} aria-hidden="true" />
        <span>{title}</span>
      </div>

      <div className="howColumn__steps">
        {steps.map((step, index) => (
          <div className="howStep" key={step.title}>
            <div className="howStep__icon">
              <i className={step.icon} aria-hidden="true" />
            </div>

            <span className="howStep__number">{index + 1}</span>

            <div>
              <h4>{step.title}</h4>
              <p>{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="landingPage">
      <NavbarComponent />

      {/* Hero section */}
      <section className="landingHero">
        <div className="landingHero__content">
          <h1>
            Find Work Smarter,
            <span> Not Harder</span>
          </h1>

          <p>
            Smart matches, better future. Let AI connect you with the perfect
            opportunities.
          </p>

          <div className="landingHero__actions">
            <Link to="/signup" className="nh-btn nh-btn--orange">
              Get Started
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>

            <Link to="/dashboard" className="nh-btn nh-btn--outline">
              Explore Jobs
            </Link>
          </div>

          <div className="landingHero__orbit" aria-label="AI matching flow">
            <div className="orbitCircle orbitCircle--left">Talent</div>
            <div className="orbitCircle orbitCircle--center">AI Match</div>
            <div className="orbitCircle orbitCircle--right">Jobs</div>
          </div>
        </div>
      </section>

      {/* Why choose section */}
      <section id="features" className="landingSection">
        <div className="landingSection__header">
          <h2>
            Why Choose <span>NextHire?</span>
          </h2>

          <p>
            Powered by cutting-edge AI technology to revolutionize freelancing.
          </p>
        </div>

        <FeatureSection>
          <FeatureCard icon="fa-solid fa-brain" title="AI Matching System">
            Our intelligent algorithm analyzes skills, experience, and
            preferences to connect you with perfect opportunities.
          </FeatureCard>

          <FeatureCard
            icon="fa-solid fa-arrow-trend-up"
            title="Smart Profile Score"
          >
            Get real-time feedback on your profile strength and personalized
            tips to boost your visibility.
          </FeatureCard>

          <FeatureCard icon="fa-solid fa-bolt" title="Fast Hiring for Clients">
            Post a job and get matched with pre-vetted talent in minutes, not
            days.
          </FeatureCard>
        </FeatureSection>

        <div id="ai-technology" className="careerCard">
          <div className="careerCard__icon">
            <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
          </div>

          <div>
            <h3>Career Path</h3>
            <p>
              Access curated learning resources to upskill and unlock better
              opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="landingSection landingHow">
        <div className="landingSection__header">
          <h2>
            How It <span>Works</span>
          </h2>

          <p>Simple steps to success for freelancers and clients.</p>
        </div>

        <div className="landingHow__grid">
          <StepColumn
            title="For Freelancer"
            icon="fa-regular fa-user"
            steps={freelancerSteps}
            variant="orange"
          />

          <StepColumn
            title="For Clients"
            icon="fa-regular fa-briefcase"
            steps={clientSteps}
            variant="blue"
          />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
