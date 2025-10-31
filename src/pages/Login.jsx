// src/pages/Login.js
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
    
    // 🔐 Credenciales hardcodeadas para desarrollo
    if (email === "pasajero@colibri.com" && password === "123456") {
      const userData = {
        success: true,
        name: "Ana García",
        email: "pasajero@colibri.com",
        role: "Pasajero",
        id: 1
      };
      localStorage.setItem("colibri:user", JSON.stringify(userData));
      navigate("/pasajero");
      return;
    }
    
    if (email === "conductor@colibri.com" && password === "123456") {
      const userData = {
        success: true,
        name: "Juan Pérez",
        email: "conductor@colibri.com", 
        role: "Conductor",
        id: 2
      };
      localStorage.setItem("colibri:user", JSON.stringify(userData));
      navigate("/conductor");
      return;
    }

    // Si no son las credenciales de prueba, intentar con el backend
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("colibri:user", JSON.stringify(data));
          if (data.role === "Conductor") navigate("/conductor");
          else if (data.role === "Pasajero") navigate("/pasajero");
        } else {
          setMessage(data.message || "Error en el login");
        }
      } else {
        setMessage("Error del servidor. Usando modo desarrollo...");
        // Fallback a credenciales de desarrollo
        if (email.includes("pasajero") && password === "123456") {
          const userData = {
            success: true,
            name: "Usuario Pasajero",
            email: email,
            role: "Pasajero",
            id: Date.now()
          };
          localStorage.setItem("colibri:user", JSON.stringify(userData));
          navigate("/pasajero");
        } else if (email.includes("conductor") && password === "123456") {
          const userData = {
            success: true,
            name: "Usuario Conductor", 
            email: email,
            role: "Conductor",
            id: Date.now()
          };
          localStorage.setItem("colibri:user", JSON.stringify(userData));
          navigate("/conductor");
        } else {
          setMessage("Credenciales incorrectas. Usa: pasajero@colibri.com / 123456");
        }
      }
    } catch (error) {
      console.log("Error de conexión, usando modo desarrollo...");
      // Modo desarrollo - credenciales básicas
      if (password === "123456") {
        const userData = {
          success: true,
          name: email.includes("pasajero") ? "Usuario Pasajero" : "Usuario Conductor",
          email: email,
          role: email.includes("pasajero") ? "Pasajero" : "Conductor",
          id: Date.now()
        };
        localStorage.setItem("colibri:user", JSON.stringify(userData));
        
        if (email.includes("pasajero")) {
          navigate("/pasajero");
        } else {
          navigate("/conductor");
        }
      } else {
        setMessage("Error de conexión. Usa contraseña: 123456");
      }
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

        {/* Información de credenciales de prueba */}
        <div className="dev-credentials">
          <h4>Credenciales de Prueba:</h4>
          <div className="credential-item">
            <strong>Pasajero:</strong> pasajero@colibri.com / 123456
          </div>
          <div className="credential-item">
            <strong>Conductor:</strong> conductor@colibri.com / 123456
          </div>
          <div className="credential-item">
            <strong>Cualquier email</strong> con contraseña: 123456
          </div>
        </div>
      </div>
    </div>
  );
}