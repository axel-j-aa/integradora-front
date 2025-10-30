// src/pages/HomePasajero.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MapaPlaceholder from "../components/MapaPlaceholder";
import NotificacionCard from "../components/NotificacionCard";
import "../styles/homePasajero.css";

export default function HomePasajero() {
  const user = JSON.parse(localStorage.getItem("colibri:user"));
  const [view, setView] = useState("viaje");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [notificaciones] = useState([
    { id: 1, mensaje: "🚗 Conductor Juan Pérez publicó una nueva ruta." },
    { id: 2, mensaje: "🕒 Viaje a Plaza Principal disponible a las 5:00 p.m." },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("colibri:user");
    window.location.href = "/";
  };

  return (
    <div className="home-wrapper">
      <Navbar
        user={user}
        onLogout={handleLogout}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Fondo semitransparente al abrir sidebar */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="home-body">
        <Sidebar
          onSelect={(v) => {
            setView(v);
            setSidebarOpen(false);
          }}
          sidebarOpen={sidebarOpen}
        />

        <main className="main-content">
          {view === "viaje" && (
            <div className="viaje-section">
              <h2>¿A dónde vamos?</h2>
              <input placeholder="Punto de partida" />
              <input placeholder="Destino" />
              <button>Solicitar viaje</button>
              <MapaPlaceholder />
            </div>
          )}

          {view === "notificaciones" && (
            <div>
              <h2>Notificaciones</h2>
              {notificaciones.map((n) => (
                <NotificacionCard key={n.id} mensaje={n.mensaje} />
              ))}
            </div>
          )}

          {view === "historial" && <h2>Historial de viajes (en desarrollo)</h2>}
          {view === "config" && <h2>Configuración (en desarrollo)</h2>}
        </main>
      </div>
    </div>
  );
}
