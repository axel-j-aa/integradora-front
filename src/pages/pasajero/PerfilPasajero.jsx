// src/pages/pasajero/PerfilPasajero.jsx
import React, { useState } from "react";
import "../../styles/pasajero/perfilPasajero.css";

export default function PerfilPasajero() {
  const [perfil, setPerfil] = useState({
    nombre: "Ana García",
    email: "ana.garcia@email.com",
    telefono: "+52 55 1234 5678",
    foto: null,
    documentoVerificado: true,
    selfieVerificada: true
  });

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...perfil });

  const estadisticas = {
    viajesCompletados: 12,
    ratingPromedio: 4.8,
    miembroDesde: "Ene 2024",
    viajesCancelados: 1
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = () => {
    setPerfil(formData);
    setEditando(false);
    alert("Perfil actualizado correctamente");
  };

  const handleCancelar = () => {
    setFormData(perfil);
    setEditando(false);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          foto: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="perfil-pasajero">
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
        <p>Gestiona tu información personal y preferencias</p>
      </div>

      <div className="perfil-content">
        {/* Información principal */}
        <div className="perfil-section">
          <div className="section-header">
            <h2>Información Personal</h2>
            {!editando && (
              <button 
                className="btn-editar"
                onClick={() => setEditando(true)}
              >
                ✏️ Editar Perfil
              </button>
            )}
          </div>

          <div className="perfil-info">
            <div className="foto-perfil">
              <div className="foto-container">
                {formData.foto ? (
                  <img src={formData.foto} alt="Foto de perfil" />
                ) : (
                  <div className="foto-placeholder">
                    {perfil.nombre.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                {editando && (
                  <label className="btn-cambiar-foto">
                    📷 Cambiar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
              
              <div className="verificaciones">
                {perfil.documentoVerificado && (
                  <div className="verificacion-badge">
                    ✅ Documento Verificado
                  </div>
                )}
                {perfil.selfieVerificada && (
                  <div className="verificacion-badge">
                    📸 Selfie Verificada
                  </div>
                )}
              </div>
            </div>

            <div className="info-form">
              {editando ? (
                <>
                  <div className="input-group">
                    <label>Nombre Completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="input-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-actions">
                    <button className="btn-guardar" onClick={handleGuardar}>
                      💾 Guardar Cambios
                    </button>
                    <button className="btn-cancelar" onClick={handleCancelar}>
                      ❌ Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    <label>Nombre:</label>
                    <span>{perfil.nombre}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{perfil.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Teléfono:</label>
                    <span>{perfil.telefono}</span>
                  </div>
                  <div className="info-item">
                    <label>Estado:</label>
                    <span className="estado-activo">✅ Activo</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="perfil-section">
          <h2>Mis Estadísticas</h2>
          <div className="estadisticas-grid">
            <div className="estadistica-card">
              <div className="estadistica-icon">🚗</div>
              <div className="estadistica-info">
                <h3>Viajes Completados</h3>
                <p>{estadisticas.viajesCompletados}</p>
              </div>
            </div>
            
            <div className="estadistica-card">
              <div className="estadistica-icon">⭐</div>
              <div className="estadistica-info">
                <h3>Rating Promedio</h3>
                <p>{estadisticas.ratingPromedio}</p>
              </div>
            </div>
            
            <div className="estadistica-card">
              <div className="estadistica-icon">📅</div>
              <div className="estadistica-info">
                <h3>Miembro Desde</h3>
                <p>{estadisticas.miembroDesde}</p>
              </div>
            </div>
            
            <div className="estadistica-card">
              <div className="estadistica-icon">⏹️</div>
              <div className="estadistica-info">
                <h3>Viajes Cancelados</h3>
                <p>{estadisticas.viajesCancelados}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferencias */}
        <div className="perfil-section">
          <h2>Preferencias de Viaje</h2>
          <div className="preferencias-grid">
            <div className="preferencia-item">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
              <span>Recibir notificaciones de nuevas rutas</span>
            </div>
            
            <div className="preferencia-item">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
              <span>Mostrar mi nombre completo a conductores</span>
            </div>
            
            <div className="preferencia-item">
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <span>Compartir mi ubicación en tiempo real</span>
            </div>
            
            <div className="preferencia-item">
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
              <span>Recordatorios de viajes programados</span>
            </div>
          </div>
        </div>

        {/* Acciones de cuenta */}
        <div className="perfil-section">
          <h2>Acciones de Cuenta</h2>
          <div className="acciones-cuenta">
            <button className="btn-accion">
              🔒 Cambiar Contraseña
            </button>
            <button className="btn-accion">
              📋 Ver Términos y Condiciones
            </button>
            <button className="btn-accion">
              🛡️ Política de Privacidad
            </button>
            <button className="btn-accion peligro">
              🚫 Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}