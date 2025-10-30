import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🧠 Si ya hay sesión, redirige automáticamente
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("colibri:user"));
    if (user) {
      if (user.role === "Conductor") navigate("/conductor");
      else if (user.role === "Pasajero") navigate("/pasajero");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("colibri:user", JSON.stringify(data));
      if (data.role === "Conductor") navigate("/conductor");
      else if (data.role === "Pasajero") navigate("/pasajero");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🕊️ Plataforma Colibrí</h1>
        <p className="subtitle">Agencia de Movilidad</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}
