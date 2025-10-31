// src/components/Sidebar.jsx
import React from "react";
import "../styles/sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ onSelect, sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.pathname.includes('/conductor') ? 'conductor' : 'pasajero';

  const opcionesPasajero = [
    { icon: "🔍", label: "Buscar Rutas", path: "/pasajero/busqueda" },
    { icon: "🗺️", label: "Ver Mapa", path: "/pasajero/mapa" },
    { icon: "🚗", label: "Solicitar Viaje", path: "/pasajero/solicitar-viaje" },
    { icon: "📋", label: "Historial", path: "/pasajero/historial" },
    { icon: "💰", label: "Billetera", path: "/pasajero/billetera" },
    { icon: "👤", label: "Mi Perfil", path: "/pasajero/perfil" },
  ];

  const opcionesConductor = [
    { icon: "🚗", label: "Mis Rutas", path: "/conductor", section: "rutas" },
    { icon: "📋", label: "Historial", path: "/conductor", section: "historial" },
    { icon: "🔔", label: "Notificaciones", path: "/conductor", section: "notificaciones" },
    { icon: "👤", label: "Mi Perfil", path: "/conductor", section: "perfil" },
  ];

  const opciones = userType === 'conductor' ? opcionesConductor : opcionesPasajero;

  const handleLogout = () => {
    localStorage.removeItem("colibri:user");
    navigate("/", { replace: true });
  };

  const handleNavigation = (op) => {
    if (userType === 'conductor') {
      navigate(op.path, { state: { section: op.section } });
    } else {
      navigate(op.path);
    }
    onSelect?.();
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      {userType === 'conductor' && (
        <div className="conductor-profile">
          <div className="profile-image">
            <span className="profile-icon">👤</span>
          </div>
          <div className="profile-info">
            <h3>Miguel Contreras</h3>
            <div className="rating">
              <span className="star">⭐</span>
              <span>4.9</span>
            </div>
            <span className="status online">En línea</span>
          </div>
        </div>
      )}

      <nav className="sidebar-menu">
        {opciones.map((op) => (
          <button
            key={op.path}
            className={`sidebar-item ${
              location.pathname === op.path ? "active" : ""
            }`}
            onClick={() => handleNavigation(op)}
          >
            <span className="icon">{op.icon}</span>
            {op.label}
          </button>
        ))}

        {/* Botón de cerrar sesión */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Cerrar sesión
          </button>
        </div>
      </nav>
    </aside>
  );
}