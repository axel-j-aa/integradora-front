import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🧹 Siempre eliminar sesión anterior al entrar
  useEffect(() => {
    localStorage.removeItem("colibri:user");
    localStorage.removeItem("colibri:access_token");
    localStorage.removeItem("colibri:refresh_token");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 🧭 Mapeo según role_id de BD
        let roleName = "";
        if (data.user.role === 1) roleName = "Usuario";
        else if (data.user.role === 3) roleName = "Conductor";
        else roleName = "Desconocido";

        const userData = { ...data.user, role: roleName };
        localStorage.setItem("colibri:user", JSON.stringify(userData));
        localStorage.setItem("colibri:access_token", data.access_token);
        localStorage.setItem("colibri:refresh_token", data.refresh_token);

        // 🚀 Redirección según rol
        if (data.user.role === 3) navigate("/conductor");
        else if (data.user.role === 1) navigate("/pasajero");
        else navigate("/");
      } else {
        setMessage(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
          <h1>Bienvenido</h1>
          <p>Ingresa a tu cuenta para continuar tu viaje</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email" className="input-label">Correo electrónico</label>
          <div className="input-group">
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="password" className="input-label">Contraseña</label>
          <div className="input-group">
            <input
              id="password"
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
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>

          <p className="register-text">
            ¿No tienes cuenta? <a href="/rol">Regístrate aquí</a>
          </p>
        </form>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}
