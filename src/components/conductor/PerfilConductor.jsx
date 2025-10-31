import React, { useState } from 'react';
import '../../styles/perfilConductor.css';

export default function PerfilConductor() {
  const [conductor] = useState({
    nombre: 'Juan Pérez',
    foto: '👤', // Placeholder, reemplazar con URL de imagen real
    correo: 'juan.perez@ejemplo.com',
    telefono: '123-456-7890',
    vehiculo: {
      modelo: 'Honda Civic',
      año: '2022',
      color: 'Plata',
      placas: 'ABC-123'
    },
    rating: 4.9,
    viajesCompletados: 128
  });

  return (
    <div className="perfil-conductor">
      <div className="perfil-header">
        <div className="perfil-foto">{conductor.foto}</div>
        <div className="perfil-info-principal">
          <h2>{conductor.nombre}</h2>
          <div className="perfil-rating">
            <span className="rating-valor">⭐ {conductor.rating}</span>
            <span className="viajes-completados">
              🚗 {conductor.viajesCompletados} viajes
            </span>
          </div>
        </div>
      </div>

      <div className="perfil-seccion">
        <h3>Información de Contacto</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">📧 Correo</span>
            <span className="info-valor">{conductor.correo}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📱 Teléfono</span>
            <span className="info-valor">{conductor.telefono}</span>
          </div>
        </div>
      </div>

      <div className="perfil-seccion">
        <h3>Información del Vehículo</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">🚗 Modelo</span>
            <span className="info-valor">{conductor.vehiculo.modelo}</span>
          </div>
          <div className="info-item">
            <span className="info-label">📅 Año</span>
            <span className="info-valor">{conductor.vehiculo.año}</span>
          </div>
          <div className="info-item">
            <span className="info-label">🎨 Color</span>
            <span className="info-valor">{conductor.vehiculo.color}</span>
          </div>
          <div className="info-item">
            <span className="info-label">🔢 Placas</span>
            <span className="info-valor">{conductor.vehiculo.placas}</span>
          </div>
        </div>
      </div>

      <div className="perfil-acciones">
        <button className="btn-editar">
          ✏️ Editar Perfil
        </button>
        <button className="btn-documentos">
          📄 Documentos
        </button>
      </div>
    </div>
  );
}