import { Navigate, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import AppLayout from "./components/AppLayout";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import ContractsMilestonesPage from "./pages/ContractsMilestonesPage";
import NoSidebarLayout from "./components/NoSidebarLayout";
import FindProjectsPage from "./pages/FindProjectsPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import ProposalsPage from "./pages/ProposalsPage";
function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* App pages with sidebar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contracts" element={<ContractsMilestonesPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/proposals" element={<ProposalsPage />} />
      </Route>
      <Route element={<NoSidebarLayout />}>
              <Route path="/projects" element={<FindProjectsPage />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
</Route>
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;