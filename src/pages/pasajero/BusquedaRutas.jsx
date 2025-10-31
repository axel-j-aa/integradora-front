// src/pages/pasajero/BusquedaRutas.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/pasajero/busquedaRutas.css";

export default function BusquedaRutas() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rutas, setRutas] = useState([]);
  const [filtros, setFiltros] = useState({
    precioMax: 100,
    calificacionMin: 4.0,
    asientos: 1
  });
  const [cargando, setCargando] = useState(false);

  // Datos de ejemplo basados en los requerimientos
  const rutasEjemplo = [
    {
      id: 1,
      conductor: "Juan Pérez",
      calificacion: 4.8,
      vehiculo: "Toyota Corolla 2020",
      asientosDisponibles: 3,
      precio: 45,
      horarioSalida: "07:00 AM",
      paradas: ["Centro", "Plaza Principal", "Terminal Central"],
      origen: "Centro",
      destino: "Terminal Central",
      tiempoEstimado: "25 min",
      distancia: "12 km"
    },
    {
      id: 2,
      conductor: "María García",
      calificacion: 4.9,
      vehiculo: "Honda Civic 2021",
      asientosDisponibles: 2,
      precio: 35,
      horarioSalida: "02:00 PM",
      paradas: ["Terminal", "Universidad", "Centro Comercial"],
      origen: "Terminal",
      destino: "Centro Comercial",
      tiempoEstimado: "20 min",
      distancia: "8 km"
    },
    {
      id: 3,
      conductor: "Carlos López",
      calificacion: 4.7,
      vehiculo: "Nissan Sentra 2019",
      asientosDisponibles: 4,
      precio: 50,
      horarioSalida: "08:00 PM",
      paradas: ["Centro", "Zona Turística", "Terminal"],
      origen: "Centro",
      destino: "Terminal",
      tiempoEstimado: "30 min",
      distancia: "15 km"
    }
  ];

  useEffect(() => {
    setCargando(true);
    // Simular búsqueda de rutas
    setTimeout(() => {
      const origen = location.state?.origen || "";
      const destino = location.state?.destino || "";
      
      let rutasFiltradas = rutasEjemplo;
      
      if (origen || destino) {
        rutasFiltradas = rutasEjemplo.filter(ruta => 
          (!origen || ruta.paradas.some(parada => parada.toLowerCase().includes(origen.toLowerCase()))) &&
          (!destino || ruta.paradas.some(parada => parada.toLowerCase().includes(destino.toLowerCase())))
        );
      }
      
      setRutas(rutasFiltradas);
      setCargando(false);
    }, 1000);
  }, [location]);

  const handleReservar = (ruta) => {
    navigate('/pasajero/reserva', { state: { ruta } });
  };

  const aplicarFiltros = () => {
    setCargando(true);
    setTimeout(() => {
      const rutasFiltradas = rutasEjemplo.filter(ruta => 
        ruta.precio <= filtros.precioMax &&
        ruta.calificacion >= filtros.calificacionMin &&
        ruta.asientosDisponibles >= filtros.asientos
      );
      setRutas(rutasFiltradas);
      setCargando(false);
    }, 500);
  };

  return (
    <div className="busqueda-rutas">
      <div className="busqueda-header">
        <h1>Rutas Disponibles</h1>
        <p>Encuentra el viaje perfecto para ti</p>
      </div>

      {/* Filtros */}
      <div className="filtros-section">
        <h3>Filtrar Rutas</h3>
        <div className="filtros-grid">
          <div className="filtro-group">
            <label>Precio Máximo: ${filtros.precioMax}</label>
            <input
              type="range"
              min="20"
              max="200"
              value={filtros.precioMax}
              onChange={(e) => setFiltros({...filtros, precioMax: e.target.value})}
            />
          </div>
          
          <div className="filtro-group">
            <label>Calificación Mínima: {filtros.calificacionMin}+</label>
            <input
              type="range"
              min="3"
              max="5"
              step="0.1"
              value={filtros.calificacionMin}
              onChange={(e) => setFiltros({...filtros, calificacionMin: e.target.value})}
            />
          </div>
          
          <div className="filtro-group">
            <label>Asientos: {filtros.asientos}</label>
            <input
              type="number"
              min="1"
              max="6"
              value={filtros.asientos}
              onChange={(e) => setFiltros({...filtros, asientos: parseInt(e.target.value)})}
            />
          </div>
          
          <button className="btn-aplicar" onClick={aplicarFiltros}>
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="resultados-section">
        {cargando ? (
          <div className="cargando">Buscando rutas disponibles...</div>
        ) : rutas.length === 0 ? (
          <div className="sin-resultados">
            <h3>No se encontraron rutas</h3>
            <p>Intenta ajustar tus filtros o busca en el mapa</p>
            <button className="btn-primary" onClick={() => navigate('/pasajero/mapa')}>
              Ver en Mapa
            </button>
          </div>
        ) : (
          <div className="rutas-grid">
            {rutas.map((ruta) => (
              <div key={ruta.id} className="ruta-card">
                <div className="ruta-header">
                  <div className="conductor-info">
                    <div className="avatar">{ruta.conductor[0]}</div>
                    <div>
                      <h4>{ruta.conductor}</h4>
                      <div className="rating">
                        ⭐ {ruta.calificacion} • {ruta.vehiculo}
                      </div>
                    </div>
                  </div>
                  <div className="precio">${ruta.precio}</div>
                </div>

                <div className="ruta-detalles">
                  <div className="horario">
                    🕒 {ruta.horarioSalida} • ⏱️ {ruta.tiempoEstimado}
                  </div>
                  <div className="ruta-paradas">
                    <div className="parada origen">
                      <span className="parada-punto"></span>
                      <span>{ruta.origen}</span>
                    </div>
                    <div className="parada-linea"></div>
                    <div className="parada destino">
                      <span className="parada-punto"></span>
                      <span>{ruta.destino}</span>
                    </div>
                  </div>
                  <div className="paradas-intermedias">
                    <small>Paradas: {ruta.paradas.slice(1, -1).join(" → ")}</small>
                  </div>
                </div>

                <div className="ruta-footer">
                  <div className="asientos">
                    💺 {ruta.asientosDisponibles} asientos disponibles
                  </div>
                  <button 
                    className="btn-reservar"
                    onClick={() => handleReservar(ruta)}
                  >
                    Reservar Asiento
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}