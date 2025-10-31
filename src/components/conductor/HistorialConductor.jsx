import React, { useState } from 'react';
import '../../styles/historialConductor.css';

export default function HistorialConductor() {
  const [historial] = useState([
    {
      id: 1,
      ruta: 'Centro - Terminal',
      fecha: '30 Oct 2025',
      horario: '7:00 AM',
      pasajeros: 3,
      ganancias: 135,
      estado: 'completado'
    },
    {
      id: 2,
      ruta: 'Ruta Universidad',
      fecha: '29 Oct 2025',
      horario: '2:00 PM',
      pasajeros: 2,
      ganancias: 70,
      estado: 'completado'
    },
    {
      id: 3,
      ruta: 'Ruta Nocturna',
      fecha: '28 Oct 2025',
      horario: '8:00 PM',
      pasajeros: 4,
      ganancias: 200,
      estado: 'cancelado'
    }
  ]);

  const [filtroActivo, setFiltroActivo] = useState('todos');

  const filtrarViajes = (viajes) => {
    switch (filtroActivo) {
      case 'completados':
        return viajes.filter(viaje => viaje.estado === 'completado');
      case 'cancelados':
        return viajes.filter(viaje => viaje.estado === 'cancelado');
      default:
        return viajes;
    }
  };

  return (
    <div className="historial-conductor">
      <div className="historial-header">
        <h3>Historial de Viajes</h3>
        <div className="filtros-historial">
          <button 
            className={`filtro-btn ${filtroActivo === 'todos' ? 'activo' : ''}`}
            onClick={() => setFiltroActivo('todos')}
          >
            Todos
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'completados' ? 'activo' : ''}`}
            onClick={() => setFiltroActivo('completados')}
          >
            Completados
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'cancelados' ? 'activo' : ''}`}
            onClick={() => setFiltroActivo('cancelados')}
          >
            Cancelados
          </button>
        </div>
      </div>

      <div className="historial-lista">
        {filtrarViajes(historial).map((viaje) => (
          <div 
            key={viaje.id} 
            className={`historial-card ${viaje.estado}`}
          >
            <div className="historial-info-principal">
              <h4>{viaje.ruta}</h4>
              <div className="historial-detalles">
                <span className="detalle-item">📅 {viaje.fecha}</span>
                <span className="detalle-item">⏰ {viaje.horario}</span>
              </div>
            </div>

            <div className="historial-stats">
              <div className="stat-item">
                <span className="stat-label">👥 Pasajeros</span>
                <span className="stat-valor">{viaje.pasajeros}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">💰 Ganancias</span>
                <span className="stat-valor">${viaje.ganancias}</span>
              </div>
            </div>

            <div className="historial-estado">
              <span className={`estado-badge ${viaje.estado}`}>
                {viaje.estado === 'completado' ? '✅ Completado' : '❌ Cancelado'}
              </span>
            </div>

            <button className="btn-detalles">
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}