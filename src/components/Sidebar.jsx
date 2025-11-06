import React, { useEffect, useState } from "react";
import "../styles/sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ onSelect, sidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // ✅ Cargar usuario o redirigir al login si no existe
  useEffect(() => {
    const stored = localStorage.getItem("colibri:user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // 🧠 Determinar tipo de usuario
  let userType = "desconocido";
  if (user?.role === "Usuario" || user?.role === 1) userType = "pasajero";
  else if (user?.role === "Conductor" || user?.role === 3) userType = "conductor";

  // 🚫 Evitar acceso a rutas no permitidas
  useEffect(() => {
    if (!userType || userType === "desconocido") return;

    const path = location.pathname;

    const isPasajeroRoute = path.startsWith("/pasajero");
    const isConductorRoute = path.startsWith("/conductor");

    if (userType === "pasajero" && !isPasajeroRoute) {
      navigate("/pasajero/busqueda", { replace: true });
    } else if (userType === "conductor" && !isConductorRoute) {
      navigate("/conductor", { replace: true });
    }
  }, [userType, location.pathname, navigate]);

  // === Opciones por rol ===
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

  const opciones =
    userType === "conductor"
      ? opcionesConductor
      : userType === "pasajero"
      ? opcionesPasajero
      : [];

  // === Cerrar sesión ===
  const handleLogout = () => {
    localStorage.removeItem("colibri:user");
    localStorage.removeItem("colibri:access_token");
    localStorage.removeItem("colibri:refresh_token");
    navigate("/", { replace: true });
  };

  // === Navegación ===
  const handleNavigation = (op) => {
    if (userType === "conductor") {
      navigate(op.path, { state: { section: op.section } });
    } else {
      navigate(op.path);
    }
    onSelect?.();
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      {user && (
        <div className="conductor-profile">
          <div className="profile-image">
            <span className="profile-icon">👤</span>
          </div>
          <div className="profile-info">
            <h3>{user.full_name || "Usuario"}</h3>
            <p className="email">{user.email}</p>
            <span className="status online">{userType}</span>
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

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Cerrar sesión
          </button>
        </div>
      </nav>
    </aside>
  );
}
