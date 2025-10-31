import React, { useState } from 'react';
import '../../styles/notificacionesConductor.css';

export default function NotificacionesConductor() {
  const [notificaciones] = useState([
    {
      id: 1,
      tipo: 'ruta',
      titulo: 'Nueva reserva en tu ruta',
      mensaje: 'Un pasajero ha reservado un asiento en tu ruta "Centro - Terminal"',
      tiempo: '10 min',
      leida: false
    },
    {
      id: 2,
      tipo: 'sistema',
      titulo: 'Actualización de documentos',
      mensaje: 'Tu licencia de conducir expirará en 30 días. Por favor, actualiza tus documentos.',
      tiempo: '2h',
      leida: false
    },
    {
      id: 3,
      tipo: 'pago',
      titulo: 'Pago recibido',
      mensaje: 'Has recibido un pago de $45.00 por tu último viaje',
      tiempo: '1d',
      leida: true
    }
  ]);

  const getNotificacionIcon = (tipo) => {
    switch (tipo) {
      case 'ruta':
        return '🚗';
      case 'sistema':
        return '⚙️';
      case 'pago':
        return '💰';
      default:
        return '📋';
    }
  };

  return (
    <div className="notificaciones-conductor">
      <div className="notificaciones-header">
        <h3>Notificaciones</h3>
        <button className="btn-marcar-leidas">
          Marcar todas como leídas
        </button>
      </div>

      <div className="notificaciones-lista">
        {notificaciones.map((notif) => (
          <div 
            key={notif.id} 
            className={`notificacion-card ${notif.leida ? 'leida' : ''}`}
          >
            <div className="notificacion-icon">
              {getNotificacionIcon(notif.tipo)}
            </div>
            <div className="notificacion-contenido">
              <div className="notificacion-encabezado">
                <h4>{notif.titulo}</h4>
                <span className="notificacion-tiempo">{notif.tiempo}</span>
              </div>
              <p className="notificacion-mensaje">{notif.mensaje}</p>
            </div>
            {!notif.leida && <div className="notificacion-indicador"></div>}
          </div>
        ))}
      </div>

      <div className="notificaciones-footer">
        <button className="btn-ver-todas">
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
}