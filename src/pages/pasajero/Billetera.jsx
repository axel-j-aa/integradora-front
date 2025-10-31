// src/pages/pasajero/Billetera.jsx
import React, { useState } from "react";
import "../../styles/pasajero/billetera.css";

export default function Billetera() {
  const [saldo, setSaldo] = useState(250.50);
  const [saldoRetenido, setSaldoRetenido] = useState(45.00);
  const [mostrarRecarga, setMostrarRecarga] = useState(false);
  const [montoRecarga, setMontoRecarga] = useState("");

  const movimientos = [
    {
      id: 1,
      tipo: "recarga",
      monto: 100.00,
      descripcion: "Recarga desde tarjeta",
      fecha: "2024-01-15 10:30",
      estado: "completado"
    },
    {
      id: 2,
      tipo: "reserva",
      monto: -45.00,
      descripcion: "Reserva ruta Centro-Terminal",
      fecha: "2024-01-15 14:20",
      estado: "retenido"
    },
    {
      id: 3,
      tipo: "liberacion",
      monto: 35.00,
      descripcion: "Viaje completado - Universidad",
      fecha: "2024-01-14 16:45",
      estado: "completado"
    }
  ];

  const handleRecargar = () => {
    if (!montoRecarga || montoRecarga <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    const monto = parseFloat(montoRecarga);
    setSaldo(prev => prev + monto);
    
    // Agregar movimiento
    movimientos.unshift({
      id: movimientos.length + 1,
      tipo: "recarga",
      monto: monto,
      descripcion: "Recarga desde tarjeta",
      fecha: new Date().toLocaleString(),
      estado: "completado"
    });

    alert(`¡Recarga exitosa de $${monto}!`);
    setMontoRecarga("");
    setMostrarRecarga(false);
  };

  const getIconoTipo = (tipo) => {
    switch(tipo) {
      case "recarga": return "💰";
      case "reserva": return "🎫";
      case "liberacion": return "✅";
      default: return "💳";
    }
  };

  const getColorMonto = (tipo, monto) => {
    if (tipo === "recarga" || monto > 0) return "positivo";
    return "negativo";
  };

  return (
    <div className="billetera">
      <div className="billetera-header">
        <h1>Mi Billetera</h1>
        <p>Gestiona tus fondos y movimientos</p>
      </div>

      {/* Saldos */}
      <div className="saldos-container">
        <div className="saldo-card disponible">
          <div className="saldo-icon">💰</div>
          <div className="saldo-info">
            <h3>Saldo Disponible</h3>
            <p className="saldo-monto">${saldo.toFixed(2)}</p>
          </div>
        </div>

        <div className="saldo-card retenido">
          <div className="saldo-icon">⏳</div>
          <div className="saldo-info">
            <h3>Saldo Retenido</h3>
            <p className="saldo-monto">${saldoRetenido.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="acciones-billetera">
        <button 
          className="btn-recargar"
          onClick={() => setMostrarRecarga(true)}
        >
          💳 Recargar Saldo
        </button>
        
        <button className="btn-historial">
          📊 Ver Historial Completo
        </button>
      </div>

      {/* Modal de recarga */}
      {mostrarRecarga && (
        <div className="modal-recarga">
          <div className="modal-content">
            <h3>Recargar Saldo</h3>
            <div className="input-group">
              <label>Monto a Recargar ($)</label>
              <input
                type="number"
                value={montoRecarga}
                onChange={(e) => setMontoRecarga(e.target.value)}
                placeholder="Ej: 100"
                min="10"
                step="10"
              />
            </div>
            
            <div className="montos-rapidos">
              <button onClick={() => setMontoRecarga("50")}>$50</button>
              <button onClick={() => setMontoRecarga("100")}>$100</button>
              <button onClick={() => setMontoRecarga("200")}>$200</button>
              <button onClick={() => setMontoRecarga("500")}>$500</button>
            </div>

            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setMostrarRecarga(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn-primary"
                onClick={handleRecargar}
              >
                Confirmar Recarga
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movimientos recientes */}
      <div className="movimientos-section">
        <h3>Movimientos Recientes</h3>
        <div className="movimientos-list">
          {movimientos.map((movimiento) => (
            <div key={movimiento.id} className="movimiento-card">
              <div className="movimiento-icon">
                {getIconoTipo(movimiento.tipo)}
              </div>
              
              <div className="movimiento-info">
                <div className="movimiento-descripcion">
                  {movimiento.descripcion}
                </div>
                <div className="movimiento-fecha">
                  {movimiento.fecha}
                </div>
              </div>

              <div className={`movimiento-monto ${getColorMonto(movimiento.tipo, movimiento.monto)}`}>
                {movimiento.monto > 0 ? '+' : ''}${movimiento.monto.toFixed(2)}
              </div>

              <div className={`movimiento-estado ${movimiento.estado}`}>
                {movimiento.estado}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información importante */}
      <div className="info-billetera">
        <h4>💡 Información Importante</h4>
        <ul>
          <li>El saldo retenido se libera automáticamente cuando completas tu viaje</li>
          <li>Si cancelas un viaje, el saldo retenido se devuelve a tu billetera</li>
          <li>Puedes recargar con tarjeta de crédito/débito o transferencia</li>
          <li>Todos los movimientos están auditados y son seguros</li>
        </ul>
      </div>
    </div>
  );
}