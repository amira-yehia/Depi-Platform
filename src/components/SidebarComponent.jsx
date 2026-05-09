import { NavLink } from "react-router-dom";

import "./Sidebar.css";

const sidebarLinks = [
  {
    label: "Dashboard",
    icon: "fa-solid fa-chart-pie",
    to: "/dashboard",
  },
  {
    label: "Marketplace",
    icon: "fa-solid fa-bag-shopping",
    to: null,
  },
  {
    label: "Proposal",
    icon: "fa-solid fa-file-lines",
    to: null,
  },
  {
    label: "Contracts",
    icon: "fa-solid fa-file-contract",
    to: "/contracts",
  },
  {
    label: "Wallet",
    icon: "fa-solid fa-wallet",
    to: null,
  },
  {
    label: "Messages",
    icon: "fa-solid fa-envelope",
    to: null,
  },
  {
    label: "Profile",
    icon: "fa-solid fa-user",
    to: null,
  },
];

function SidebarComponent() {
  return (
    <aside className="sidebar">
      {/* Sidebar logo */}
      <div className="sidebar-header">
        <NavLink to="/dashboard" aria-label="Go to dashboard" style={{ display: 'inline-block' }}>
          <svg
            className="sidebar-logo"
            viewBox="0 0 420 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="NextHire – Smart matches, better future"
            style={{ width: '180px', height: 'auto', display: 'block' }}
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
        </NavLink>
      </div>

      {/* Sidebar navigation */}
      <nav className="sidebar-content" aria-label="Dashboard navigation">
        <div className="sidebar-nav">
          {sidebarLinks.map((item) =>
            item.to ? (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? "active" : ""}`
                }
              >
                <i className={item.icon} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            ) : (
              <a
                key={item.label}
                href="#!"
                className="sidebar-nav-link sidebar-nav-link--disabled"
                aria-disabled="true"
              >
                <i className={item.icon} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            )
          )}
        </div>
      </nav>

      {/* Logout link */}
      <div className="sidebar-footer">
        <NavLink to="/" className="sidebar-nav-link">
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true" />
          <span>Log Out</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default SidebarComponent;