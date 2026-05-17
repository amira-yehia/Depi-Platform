import { Navigate, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./components/AppLayout";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import ContractsMilestonesPage from "./pages/ContractsMilestonesPage";
import NoSidebarLayout from "./components/NoSidebarLayout";
import FindProjectsPage from "./pages/FindProjectsPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProposalsPage from "./pages/ProposalsPage";
import PageTransition from "./components/PageTransition";

function withPageTransition(page) {
  return <PageTransition>{page}</PageTransition>;
}

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={withPageTransition(<LandingPage />)} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={withPageTransition(<SignUpPage />)} />

      {/* App pages with sidebar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={withPageTransition(<DashboardPage />)} />
        <Route
          path="/contracts"
          element={withPageTransition(<ContractsMilestonesPage />)}
        />
        <Route
          path="/marketplace"
          element={withPageTransition(<MarketplacePage />)}
        />
        <Route path="/proposals" element={withPageTransition(<ProposalsPage />)} />
      </Route>

      <Route element={<NoSidebarLayout />}>
        <Route path="/projects" element={withPageTransition(<FindProjectsPage />)} />
        <Route path="/profile" element={withPageTransition(<ProfilePage />)} />
        <Route
          path="/projects/:projectId"
          element={withPageTransition(<ProjectDetailsPage />)}
        />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;