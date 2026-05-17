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
    to: "/marketplace",
  },
  {
    label: "Proposal",
    icon: "fa-solid fa-file-lines",
    to: "/proposals",
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
    to: "/profile",
  },
  {
    label: "Find Projects",
    icon: "fa-solid fa-magnifying-glass",
    to: "/projects",
  }
];

function SidebarComponent() {
  return (
    <aside className="sidebar">
      {/* Sidebar logo */}
      <div className="sidebar-header">
        <NavLink to="/dashboard" aria-label="Go to dashboard">
          <img src="/images/logo.png" alt="NextHire logo" className="sidebar-logo" />
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