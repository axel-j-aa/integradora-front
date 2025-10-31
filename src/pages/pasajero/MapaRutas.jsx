// src/pages/pasajero/MapaRutas.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pasajero/mapaRutas.css";

export default function MapaRutas() {
  const navigate = useNavigate();
  const [filtroActivo, setFiltroActivo] = useState("todas");

  const rutasEnMapa = [
    {
      id: 1,
      conductor: "Ana Martínez",
      origen: "Centro",
      destino: "Terminal",
      horario: "07:30 AM",
      precio: 40,
      asientos: 2,
      calificacion: 4.8,
      coordenadas: { x: 120, y: 80 }
    },
    {
      id: 2,
      conductor: "Roberto Díaz",
      origen: "Zona Norte",
      destino: "Universidad",
      horario: "08:15 AM",
      precio: 35,
      asientos: 3,
      calificacion: 4.9,
      coordenadas: { x: 80, y: 150 }
    },
    {
      id: 3,
      conductor: "Laura Sánchez",
      origen: "Este",
      destino: "Centro Comercial",
      horario: "09:00 AM",
      precio: 45,
      asientos: 1,
      calificacion: 4.7,
      coordenadas: { x: 200, y: 120 }
    }
  ];

  const handleRutaClick = (ruta) => {
    navigate('/pasajero/reserva', { state: { ruta } });
  };

  return (
    <div className="mapa-rutas">
      <div className="mapa-header">
        <h1>Rutas en el Mapa</h1>
        <p>Visualiza todas las rutas disponibles en tu área</p>
      </div>

      {/* Filtros rápidos */}
      <div className="filtros-rapidos">
        <button 
          className={`filtro-btn ${filtroActivo === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltroActivo('todas')}
        >
          Todas las Rutas
        </button>
        <button 
          className={`filtro-btn ${filtroActivo === 'proximas' ? 'active' : ''}`}
          onClick={() => setFiltroActivo('proximas')}
        >
          Próximas Horas
        </button>
        <button 
          className={`filtro-btn ${filtroActivo === 'economicas' ? 'active' : ''}`}
          onClick={() => setFiltroActivo('economicas')}
        >
          Más Económicas
        </button>
      </div>

      {/* Mapa interactivo */}
      <div className="mapa-container">
        <div className="mapa-placeholder-interactivo">
          <div className="puntos-referencia">
            <div className="punto centro" style={{ left: '50%', top: '50%' }}>
              <span>🏙️ Centro</span>
            </div>
            <div className="punto terminal" style={{ left: '70%', top: '30%' }}>
              <span>🚉 Terminal</span>
            </div>
            <div className="punto universidad" style={{ left: '30%', top: '70%' }}>
              <span>🎓 Universidad</span>
            </div>
            <div className="punto comercial" style={{ left: '80%', top: '70%' }}>
              <span>🛍️ Comercial</span>
            </div>
          </div>

          {/* Rutas en el mapa */}
          {rutasEnMapa.map((ruta) => (
            <div
              key={ruta.id}
              className="marcador-ruta"
              style={{ left: `${ruta.coordenadas.x}px`, top: `${ruta.coordenadas.y}px` }}
              onClick={() => handleRutaClick(ruta)}
            >
              <div className="marcador-punto"></div>
              <div className="marcador-info">
                <div className="info-header">
                  <span className="precio">${ruta.precio}</span>
                  <span className="asientos">💺 {ruta.asientos}</span>
                </div>
                <div className="info-horario">{ruta.horario}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda del mapa */}
      <div className="mapa-leyenda">
        <div className="leyenda-item">
          <div className="leyenda-color disponible"></div>
          <span>Rutas Disponibles</span>
        </div>
        <div className="leyenda-item">
          <div className="leyenda-color proxima"></div>
          <span>Salida Próxima</span>
        </div>
        <div className="leyenda-item">
          <div className="leyenda-color economica"></div>
          <span>Precio Económico</span>
        </div>
      </div>

      {/* Lista de rutas */}
      <div className="rutas-lista">
        <h3>Rutas Disponibles en el Área</h3>
        <div className="rutas-grid">
          {rutasEnMapa.map((ruta) => (
            <div key={ruta.id} className="ruta-mini-card">
              <div className="ruta-mini-header">
                <h4>{ruta.conductor}</h4>
                <span className="rating-mini">⭐ {ruta.calificacion}</span>
              </div>
              <div className="ruta-mini-ruta">
                <span className="origen-mini">📍 {ruta.origen}</span>
                <span className="destino-mini">🎯 {ruta.destino}</span>
              </div>
              <div className="ruta-mini-info">
                <span>🕒 {ruta.horario}</span>
                <span className="precio-mini">${ruta.precio}</span>
              </div>
              <button 
                className="btn-ver-detalles"
                onClick={() => handleRutaClick(ruta)}
              >
                Ver Detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}