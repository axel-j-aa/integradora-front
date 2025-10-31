// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="dashboard-body">
        <Sidebar
          sidebarOpen={sidebarOpen}
          onSelect={() => setSidebarOpen(false)}
        />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
