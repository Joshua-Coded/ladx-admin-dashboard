import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

// src/App.tsx

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default route for the root path */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />

        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
