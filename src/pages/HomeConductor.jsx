import React, { useState, useEffect } from "react";
import "../styles/homeConductor.css";
import DashboardLayout from "../layouts/DashboardLayout";
import PerfilConductor from "../components/conductor/PerfilConductor";
import NotificacionesConductor from "../components/conductor/NotificacionesConductor";
import HistorialConductor from "../components/conductor/HistorialConductor";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomeConductor() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isOnline, setIsOnline] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [activeSection, setActiveSection] = useState('rutas');
  
  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section);
      // Reset view when changing sections
      if (location.state.section === 'rutas') {
        setCurrentView('home');
      }
    }
  }, [location]);

  const [stats] = useState({
    earnings: 340,
    trips: 8,
    rating: 4.9
  });

  const [rutas] = useState([
    {
      id: 1,
      nombre: "Ruta Centro - Terminal",
      horario: "7:00 AM",
      paradas: ["Centro", "Plaza Principal", "Terminal"],
      asientosDisponibles: 3,
      precio: 45
    },
    {
      id: 2,
      nombre: "Ruta Universidad",
      horario: "2:00 PM",
      paradas: ["Terminal", "Universidad", "Centro Comercial"],
      asientosDisponibles: 2,
      precio: 35
    },
    {
      id: 3,
      nombre: "Ruta Nocturna",
      horario: "8:00 PM",
      paradas: ["Centro", "Zona Turística", "Terminal"],
      asientosDisponibles: 4,
      precio: 50
    }
  ]);

  const [activeRuta, setActiveRuta] = useState(null);
  
  const handleAcceptRide = (ruta) => {
    setActiveRuta(ruta);
    setCurrentView('ride-details');
  };

  const handleStartRide = () => {
    setCurrentView('in-progress');
  };

  const handleCompleteRide = () => {
    setCurrentView('completed');
    setActiveRuta(null);
  };

  const handleNewRide = () => {
    setCurrentView('home');
    setIsOnline(true);
  };

  return (
    <DashboardLayout>
      <div className="home-conductor">
        <div className="seccion-tabs">
          <button
            className={`tab-btn ${activeSection === 'rutas' ? 'active' : ''}`}
            onClick={() => navigate('/conductor', { state: { section: 'rutas' } })}
          >
            🚗 Mis Rutas
          </button>
          <button
            className={`tab-btn ${activeSection === 'historial' ? 'active' : ''}`}
            onClick={() => navigate('/conductor', { state: { section: 'historial' } })}
          >
            📋 Historial
          </button>
          <button
            className={`tab-btn ${activeSection === 'notificaciones' ? 'active' : ''}`}
            onClick={() => navigate('/conductor', { state: { section: 'notificaciones' } })}
          >
            🔔 Notificaciones
          </button>
          <button
            className={`tab-btn ${activeSection === 'perfil' ? 'active' : ''}`}
            onClick={() => navigate('/conductor', { state: { section: 'perfil' } })}
          >
            👤 Perfil
          </button>
        </div>

      {activeSection === 'rutas' && (
        <>
        {currentView === 'home' && (
        <div className="conductor-home">
          {/* Estado en línea */}
          <div className={`status-card ${isOnline ? 'online' : ''}`}>
            <div className="status-info">
              <div className="status-indicator"></div>
              <div>
                <p>{isOnline ? 'En línea' : 'Desconectado'}</p>
                <p className="status-subtitle">
                  {isOnline ? 'Listo para recibir viajes' : 'Activa para comenzar'}
                </p>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Estadísticas */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">💰</span>
              <p className="stat-label">Hoy</p>
              <p className="stat-value">${stats.earnings}</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🚗</span>
              <p className="stat-label">Viajes</p>
              <p className="stat-value">{stats.trips}</p>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <p className="stat-label">Rating</p>
              <p className="stat-value">{stats.rating}</p>
            </div>
          </div>

          {/* Rutas */}
          {isOnline && (
            <div className="rutas-container">
              <h3>Mis Rutas</h3>
              {rutas.map((ruta) => (
                <div key={ruta.id} className="ruta-card">
                  <div className="ruta-header">
                    <div>
                      <h4>{ruta.nombre}</h4>
                      <p className="ruta-horario">{ruta.horario}</p>
                    </div>
                    <span className="status-badge activa">Activa</span>
                  </div>

                  <div className="ruta-paradas">
                    {ruta.paradas.map((parada, index) => (
                      <div key={index} className="parada-item">
                        <span className="parada-icon">📍</span>
                        <span>{parada}</span>
                        {index < ruta.paradas.length - 1 && (
                          <div className="parada-linea"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="ruta-info">
                    <span className="info-badge">💺 {ruta.asientosDisponibles} asientos</span>
                    <span className="info-badge">� ${ruta.precio}</span>
                  </div>

                  <button 
                    className="btn-primary"
                    onClick={() => handleAcceptRide(ruta)}
                  >
                    Iniciar Ruta
                  </button>
                </div>
              ))}
            </div>
          )}

          {!isOnline && (
            <p className="offline-message">
              Activa tu estado para comenzar a recibir solicitudes de viajes
            </p>
          )}
        </div>
      )}

      {activeSection === 'rutas' && currentView === 'ride-details' && activeRuta && (
        <div className="ruta-details">
          <div className="ruta-card">
            <div className="ruta-header">
              <div>
                <h4>{activeRuta.nombre}</h4>
                <p className="ruta-horario">{activeRuta.horario}</p>
              </div>
              <span className="status-badge activa">Por iniciar</span>
            </div>

            <div className="ruta-paradas">
              {activeRuta.paradas.map((parada, index) => (
                <div key={index} className="parada-item">
                  <span className="parada-icon">📍</span>
                  <span>{parada}</span>
                  {index < activeRuta.paradas.length - 1 && (
                    <div className="parada-linea"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="ruta-info">
              <span className="info-badge">💺 {activeRuta.asientosDisponibles} asientos</span>
              <span className="info-badge">💰 ${activeRuta.precio}</span>
            </div>

            <button className="btn-primary" onClick={handleStartRide}>
              Comenzar Ruta
            </button>
          </div>
        </div>
      )}

      {activeSection === 'rutas' && currentView === 'in-progress' && activeRuta && (
        <div className="ruta-in-progress">
          <div className="ruta-card">
            <div className="ruta-header">
              <div>
                <h4>{activeRuta.nombre}</h4>
                <p className="ruta-horario">{activeRuta.horario}</p>
              </div>
              <span className="status-badge activa">En progreso</span>
            </div>

            <div className="ruta-paradas">
              {activeRuta.paradas.map((parada, index) => (
                <div key={index} className="parada-item">
                  <span className="parada-icon">📍</span>
                  <span>{parada}</span>
                  {index < activeRuta.paradas.length - 1 && (
                    <div className="parada-linea"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="ruta-info">
              <span className="info-badge">🕒 En curso</span>
              <span className="info-badge">👥 {activeRuta.asientosDisponibles} pasajeros</span>
            </div>

            <button className="btn-primary" onClick={handleCompleteRide}>
              Finalizar Ruta
            </button>
          </div>
        </div>
      )}

      {activeSection === 'rutas' && currentView === 'completed' && (
        <div className="ruta-completed">
          <div className="ruta-card">
            <div className="ruta-header">
              <div>
                <h4>¡Ruta completada!</h4>
                <p className="ruta-horario">Buen trabajo</p>
              </div>
              <span className="status-badge inactiva">Finalizada</span>
            </div>

            <div className="ruta-info">
              <span className="info-badge">✅ Completada</span>
              <span className="info-badge">⭐ ¡Excelente servicio!</span>
            </div>

            <button className="btn-primary" onClick={handleNewRide}>
              Volver a mis rutas
            </button>
          </div>
        </div>
      )}
      
      {activeSection === 'historial' && (
        <HistorialConductor />
      )}

      {activeSection === 'notificaciones' && (
        <NotificacionesConductor />
      )}

      {activeSection === 'perfil' && (
        <PerfilConductor />
      )}
        </>
      )}

      {activeSection === 'historial' && (
        <HistorialConductor />
      )}

      {activeSection === 'notificaciones' && (
        <NotificacionesConductor />
      )}

      {activeSection === 'perfil' && (
        <PerfilConductor />
      )}
    </div>
    </DashboardLayout>
  );
}
