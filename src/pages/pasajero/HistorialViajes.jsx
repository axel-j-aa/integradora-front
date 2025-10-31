// src/pages/pasajero/HistorialViajes.jsx
import React, { useState } from "react";
import "../../styles/pasajero/historialViajes.css";

export default function HistorialViajes() {
  const [filtro, setFiltro] = useState("todos");

  const viajes = [
    {
      id: 1,
      conductor: "Juan Pérez",
      origen: "Centro",
      destino: "Terminal Central",
      fecha: "2024-01-15",
      hora: "07:30 AM",
      precio: 45.00,
      estado: "completado",
      calificacion: 5,
      vehiculo: "Toyota Corolla 2020",
      codigoViaje: "COL123"
    },
    {
      id: 2,
      conductor: "María García",
      origen: "Terminal",
      destino: "Universidad",
      fecha: "2024-01-14",
      hora: "02:15 PM",
      precio: 35.00,
      estado: "completado",
      calificacion: 4,
      vehiculo: "Honda Civic 2021",
      codigoViaje: "COL124"
    },
    {
      id: 3,
      conductor: "Carlos López",
      origen: "Centro",
      destino: "Zona Turística",
      fecha: "2024-01-13",
      hora: "08:00 PM",
      precio: 50.00,
      estado: "cancelado",
      calificacion: null,
      vehiculo: "Nissan Sentra 2019",
      codigoViaje: "COL125"
    },
    {
      id: 4,
      conductor: "Ana Martínez",
      origen: "Zona Norte",
      destino: "Centro Comercial",
      fecha: "2024-01-12",
      hora: "09:30 AM",
      precio: 40.00,
      estado: "completado",
      calificacion: 5,
      vehiculo: "Volkswagen Jetta 2022",
      codigoViaje: "COL126"
    }
  ];

  const viajesFiltrados = filtro === "todos" 
    ? viajes 
    : viajes.filter(viaje => viaje.estado === filtro);

  const getEstadoInfo = (estado) => {
    switch(estado) {
      case "completado": return { clase: "completado", texto: "Completado", icono: "✅" };
      case "cancelado": return { clase: "cancelado", texto: "Cancelado", icono: "❌" };
      case "pendiente": return { clase: "pendiente", texto: "Pendiente", icono: "⏳" };
      default: return { clase: "", texto: estado, icono: "❓" };
    }
  };

  const renderEstrellas = (calificacion) => {
    if (!calificacion) return "Sin calificar";
    
    return "⭐".repeat(calificacion) + "☆".repeat(5 - calificacion);
  };

  return (
    <div className="historial-viajes">
      <div className="historial-header">
        <h1>Mi Historial de Viajes</h1>
        <p>Revisa todos tus viajes anteriores</p>
      </div>

      {/* Filtros */}
      <div className="filtros-historial">
        <button 
          className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`}
          onClick={() => setFiltro('todos')}
        >
          Todos los Viajes
        </button>
        <button 
          className={`filtro-btn ${filtro === 'completado' ? 'active' : ''}`}
          onClick={() => setFiltro('completado')}
        >
          Completados
        </button>
        <button 
          className={`filtro-btn ${filtro === 'cancelado' ? 'active' : ''}`}
          onClick={() => setFiltro('cancelado')}
        >
          Cancelados
        </button>
      </div>

      {/* Estadísticas */}
      <div className="estadisticas-historial">
        <div className="estadistica-card">
          <div className="estadistica-icon">🚗</div>
          <div className="estadistica-info">
            <h3>Total de Viajes</h3>
            <p>{viajes.filter(v => v.estado === "completado").length}</p>
          </div>
        </div>
        
        <div className="estadistica-card">
          <div className="estadistica-icon">💰</div>
          <div className="estadistica-info">
            <h3>Total Gastado</h3>
            <p>${viajes.filter(v => v.estado === "completado").reduce((sum, v) => sum + v.precio, 0)}</p>
          </div>
        </div>
        
        <div className="estadistica-card">
          <div className="estadistica-icon">⭐</div>
          <div className="estadistica-info">
            <h3>Rating Promedio</h3>
            <p>{
              (viajes.filter(v => v.calificacion).reduce((sum, v) => sum + v.calificacion, 0) / 
              viajes.filter(v => v.calificacion).length || 0).toFixed(1)
            }</p>
          </div>
        </div>
      </div>

      {/* Lista de viajes */}
      <div className="viajes-lista">
        {viajesFiltrados.length === 0 ? (
          <div className="sin-viajes">
            <h3>No hay viajes {filtro !== "todos" ? filtro : ""}</h3>
            <p>Cuando realices viajes, aparecerán aquí</p>
          </div>
        ) : (
          viajesFiltrados.map((viaje) => {
            const estadoInfo = getEstadoInfo(viaje.estado);
            
            return (
              <div key={viaje.id} className="viaje-card">
                <div className="viaje-header">
                  <div className="conductor-info">
                    <div className="avatar">{viaje.conductor[0]}</div>
                    <div>
                      <h4>{viaje.conductor}</h4>
                      <p className="vehiculo">{viaje.vehiculo}</p>
                    </div>
                  </div>
                  <div className={`estado-badge ${estadoInfo.clase}`}>
                    {estadoInfo.icono} {estadoInfo.texto}
                  </div>
                </div>

                <div className="viaje-ruta">
                  <div className="ruta-item">
                    <span className="ruta-punto origen"></span>
                    <div>
                      <strong>Origen:</strong> {viaje.origen}
                    </div>
                  </div>
                  <div className="ruta-linea"></div>
                  <div className="ruta-item">
                    <span className="ruta-punto destino"></span>
                    <div>
                      <strong>Destino:</strong> {viaje.destino}
                    </div>
                  </div>
                </div>

                <div className="viaje-detalles">
                  <div className="detalle-item">
                    <span>📅 Fecha:</span>
                    <span>{viaje.fecha} a las {viaje.hora}</span>
                  </div>
                  <div className="detalle-item">
                    <span>💰 Precio:</span>
                    <span>${viaje.precio}</span>
                  </div>
                  {viaje.codigoViaje && (
                    <div className="detalle-item">
                      <span>🎫 Código:</span>
                      <span>{viaje.codigoViaje}</span>
                    </div>
                  )}
                </div>

                {viaje.estado === "completado" && (
                  <div className="viaje-calificacion">
                    <div className="calificacion-info">
                      <span>Tu calificación:</span>
                      <span className="estrellas">
                        {renderEstrellas(viaje.calificacion)}
                      </span>
                    </div>
                    {!viaje.calificacion && (
                      <button className="btn-calificar">
                        Calificar Viaje
                      </button>
                    )}
                  </div>
                )}

                <div className="viaje-acciones">
                  <button className="btn-detalles">
                    Ver Detalles Completos
                  </button>
                  <button className="btn-repetir">
                    Repetir Viaje
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}