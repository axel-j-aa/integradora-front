// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Pasajero from "./pages/Pasajero";
// import Notificaciones from "./pages/Notificaciones";
// import Historial from "./pages/Historial";
// import Configuracion from "./pages/Configuracion";

// 🔐 Componente de protección de rutas
function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("colibri:user"));
  return user ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio (login) */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/pasajero"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Pasajero />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}
