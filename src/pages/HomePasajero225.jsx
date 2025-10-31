// src/pages/HomePasajero.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapaPlaceholder from "../components/MapaPlaceholder";
import "../styles/pasajero/homePasajero.css";

export default function HomePasajero() {
  const navigate = useNavigate();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  const handleBuscarRutas = () => {
    if (!origen || !destino) {
      alert("Por favor completa ambos campos.");
      return;
    }
    navigate('/pasajero/busqueda', { 
      state: { origen, destino } 
    });
  };

  const handleDestinoRapido = (destinoSeleccionado) => {
    setDestino(destinoSeleccionado);
    if (origen) {
      handleBuscarRutas();
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-body">
        <main className="main-content">
          <div className="pasajero-home">
            
            {/* Header Principal */}
            <div className="main-header">
              <h1>¿A dónde vamos hoy?</h1>
              <p>Encuentra tu viaje ideal con nuestra comunidad de conductores</p>
            </div>

            {/* Sección de Búsqueda Principal */}
            <div className="search-section">
              <div className="search-card">
                <h3>Buscar Viaje</h3>
                <div className="search-inputs">
                  <div className="input-wrapper">
                    <span className="input-icon">📍</span>
                    <input
                      type="text"
                      placeholder="¿Dónde estás?"
                      value={origen}
                      onChange={(e) => setOrigen(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="input-wrapper">
                    <span className="input-icon">🎯</span>
                    <input
                      type="text"
                      placeholder="¿A dónde vas?"
                      value={destino}
                      onChange={(e) => setDestino(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
                <div className="search-actions">
                  <button className="btn-search" onClick={handleBuscarRutas}>
                    🔍 Buscar Rutas
                  </button>
                  <button className="btn-map" onClick={() => navigate('/pasajero/mapa')}>
                    🗺️ Ver Mapa
                  </button>
                </div>
              </div>
            </div>

            {/* Destinos Rápidos */}
            <div className="quick-destinations">
              <h3>Destinos Populares</h3>
              <div className="destinations-grid">
                <button className="destination-btn" onClick={() => handleDestinoRapido("Terminal Central")}>
                  🚉 Terminal
                </button>
                <button className="destination-btn" onClick={() => handleDestinoRapido("Plaza Principal")}>
                  🏛️ Plaza
                </button>
                <button className="destination-btn" onClick={() => handleDestinoRapido("Centro Comercial")}>
                  🛍️ Comercial
                </button>
                <button className="destination-btn" onClick={() => handleDestinoRapido("Universidad")}>
                  🎓 Universidad
                </button>
                <button className="destination-btn" onClick={() => handleDestinoRapido("Zona Hospitalaria")}>
                  🏥 Hospital
                </button>
                <button className="destination-btn" onClick={() => handleDestinoRapido("Aeropuerto")}>
                  ✈️ Aeropuerto
                </button>
              </div>
            </div>

            {/* Mapa */}
            <div className="map-section">
              <div className="section-header">
                <h3>Rutas en tu Zona</h3>
                <button className="btn-view-all" onClick={() => navigate('/pasajero/mapa')}>
                  Ver todas
                </button>
              </div>
              <MapaPlaceholder />
            </div>

            {/* Opciones de Viaje */}
            <div className="travel-options">
              <h3>Opciones de Viaje</h3>
              <div className="options-grid">
                <div className="option-card" onClick={() => navigate('/pasajero/solicitar-viaje')}>
                  <div className="option-icon">🚗</div>
                  <div className="option-content">
                    <h4>Viaje Solicitado</h4>
                    <p>Solicita un viaje personalizado</p>
                  </div>
                  <span className="option-badge new">Nuevo</span>
                </div>
                
                <div className="option-card" onClick={() => navigate('/pasajero/busqueda')}>
                  <div className="option-icon">👥</div>
                  <div className="option-content">
                    <h4>Ruta Compartida</h4>
                    <p>Únete a rutas existentes</p>
                  </div>
                </div>
                
                <div className="option-card">
                  <div className="option-icon">📅</div>
                  <div className="option-content">
                    <h4>Chofer por Día</h4>
                    <p>Servicio completo por día</p>
                  </div>
                  <span className="option-badge soon">Próximo</span>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}