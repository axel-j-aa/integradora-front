import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/registro.css";

export default function Registro() {
  const navigate = useNavigate();
  const location = useLocation();
  const rolSeleccionado = location.state?.rol || "Cliente";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmar) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
          date_birth: dateBirth,
          role: rolSeleccionado === "Conductor" ? "DRIVER" : "USER",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
        navigate("/");
      } else {
        setMessage(data.message || "Error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setMessage("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-circle">
            <img src="/colibri.png" alt="Logo Colibrí" className="logo-img" />
          </div>

          <h1>Registro de {rolSeleccionado}</h1>
          <p>Completa tus datos para comenzar tu viaje</p>
        </div>

        <form onSubmit={handleRegistro} className="login-form">
          <label className="input-label">Nombre completo</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Tu nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <label className="input-label">Correo electrónico</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label className="input-label">Fecha de nacimiento</label>
          <div className="input-group">
            <input
              type="date"
              value={dateBirth}
              onChange={(e) => setDateBirth(e.target.value)}
              required
            />
          </div>

          <label className="input-label">Contraseña</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Ver"}
            </button>
          </div>

          <label className="input-label">Confirmar contraseña</label>
          <div className="input-group">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Repite tu contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Ocultar" : "Ver"}
            </button>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>

          <p className="register-text">
            ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
          </p>
        </form>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}
