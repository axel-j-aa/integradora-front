// src/components/Header.jsx
import React from "react";
import "../styles/header.css";

export default function Header({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("colibri:user"));

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="header-title">
          <img src="/colibri.png" alt="Colibrí" className="logo-img" />
          <h1>
            Plataforma <span>Colibrí</span>
          </h1>
        </div>
      </div>

      <div className="header-right">
        {user?.email && <span className="user-email">{user.email}</span>}
      </div>
    </header>
  );
}
