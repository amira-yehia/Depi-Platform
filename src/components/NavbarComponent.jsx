import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import "./Navbar.css";

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="nh-navbar">
      <Container className="nh-navbar__container">
        {/* Brand logo */}
        <Navbar.Brand as={Link} to="/" className="nh-navbar__brand">
          <svg
            className="nh-navbar__logo"
            viewBox="0 0 420 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="NextHire – Smart matches, better future"
            style={{ height: '42px', width: 'auto', display: 'block' }}
          >
            {/* ── Dot grid (top-left of icon) ── */}
            {[0, 7, 14].map((dx) =>
                [0, 7, 14].map((dy) => {
                const isOrange = (dx === 7 && dy === 0) || (dx === 14 && dy === 0) || (dx === 14 && dy === 7);
                return (
                    <circle
                    key={`${dx}-${dy}`}
                    cx={8 + dx}
                    cy={8 + dy}
                    r={2}
                    fill={isOrange ? "#f47c20" : "#3a5a80"}
                    />
                );
                })
            )}

            {/* ── Navy N body ── */}
            <path
                d="M14 30 L14 72 L26 72 L26 52 L48 72 L60 72 L60 30 L48 30 L48 50 L26 30 Z"
                fill="url(#navyGrad)"
                rx="4"
            />

            {/* ── Orange puzzle piece (overlapping right side) ── */}
            <rect x="42" y="28" width="16" height="46" rx="4" fill="#f47c20" />
            {/* Puzzle bump right */}
            <circle cx="58" cy="51" r="6" fill="#f47c20" />
            {/* Puzzle notch left (cut into N) */}
            <circle cx="42" cy="51" r="6" fill="url(#navyGrad)" />

            {/* Gradient for N */}
            <defs>
                <linearGradient id="navyGrad" x1="14" y1="28" x2="60" y2="74" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2a4a72" />
                <stop offset="100%" stopColor="#1a2e4a" />
                </linearGradient>
            </defs>

            {/* ── Divider line ── */}
            <line x1="80" y1="28" x2="80" y2="74" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

            {/* ── Wordmark: "Next" white ── */}
            <text x="94" y="63" fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="700" fill="#ffffff" letterSpacing="-0.5">Next</text>
            {/* ── Wordmark: "Hire" orange ── */}
            <text x="186" y="63" fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="700" fill="#f47c20" letterSpacing="-0.5">Hire</text>

            {/* ── Tagline ── */}
            <text x="94" y="80" fontFamily="Poppins, sans-serif" fontSize="11" fontWeight="300" fill="rgba(255,255,255,0.50)" letterSpacing="1.5">Smart matches, better future</text>
          </svg>
        </Navbar.Brand>

        {/* Mobile menu button */}
        <Navbar.Toggle aria-controls="main-navbar" className="nh-navbar__toggle" />

        <Navbar.Collapse id="main-navbar" className="nh-navbar__collapse">
          {/* Main navigation links */}
          <Nav className="nh-navbar__links">
            <Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link href="/#how-it-works">How It Works</Nav.Link>
            <Nav.Link href="/#ai-technology">AI Technology</Nav.Link>
          </Nav>

          {/* Auth actions */}
          <div className="nh-navbar__actions">
            <Link to="/login" className="nh-navbar__login">
              Log In
            </Link>

            <Link to="/signup" className="nh-navbar__signup">
              Get Started
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;