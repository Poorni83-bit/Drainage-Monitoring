import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import RoleSelection from "./pages/RoleSelection.jsx";
import CitizenPortal from "./pages/CitizenPortal.jsx";
import CorporationDashboard from "./pages/CorporationDashboard.jsx";
import NdrfDashboard from "./pages/NdrfDashboard.jsx";
import QrGenerator from "./pages/QrGenerator.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/roles" element={<RoleSelection />} />
      <Route path="/dashboard" element={<DashboardRouter />} />
      <Route path="/generate-qr" element={<QrGenerator />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function DashboardRouter() {
  const role = localStorage.getItem("role");

  if (role === "citizen") return <CitizenPortal />;
  if (role === "corporation") return <CorporationDashboard />;
  if (role === "ndrf") return <NdrfDashboard />;

  return <Navigate to="/" />;
}
