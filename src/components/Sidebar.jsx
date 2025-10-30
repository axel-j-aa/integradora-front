import React from "react";
import "../styles/sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ onSelect, sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const opciones = [
    { icon: "📍", label: "Solicitar viaje", path: "/pasajero" },
    { icon: "🔔", label: "Notificaciones", path: "/notificaciones" },
    { icon: "🕒", label: "Historial", path: "/historial" },
    { icon: "⚙️", label: "Configuración", path: "/configuracion" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("colibri:user");
    navigate("/", { replace: true });
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <nav className="sidebar-menu">
        {opciones.map((op) => (
          <button
            key={op.path}
            className={`sidebar-item ${
              location.pathname === op.path ? "active" : ""
            }`}
            onClick={() => {
              navigate(op.path);
              onSelect?.();
            }}
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
