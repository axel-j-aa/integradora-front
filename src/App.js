// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import HomePasajero from "./pages/HomePasajero225";
import HomeConductor from "./pages/HomeConductor";
import BusquedaRutas from "./pages/pasajero/BusquedaRutas";
import MapaRutas from "./pages/pasajero/MapaRutas";
import HistorialViajes from "./pages/pasajero/HistorialViajes";
import PerfilPasajero from "./pages/pasajero/PerfilPasajero";
import Billetera from "./pages/pasajero/Billetera";
import SolicitarViaje from "./pages/pasajero/SolicitarViaje";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio (login) */}
        <Route path="/" element={<Login />} />

        {/* Rutas del pasajero */}
        <Route
          path="/pasajero"
          element={
            <DashboardLayout>
              <HomePasajero />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/pasajero/busqueda"
          element={
            <DashboardLayout>
              <BusquedaRutas />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/pasajero/mapa"
          element={
            <DashboardLayout>
              <MapaRutas />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/pasajero/solicitar-viaje"
          element={
            <DashboardLayout>
              <SolicitarViaje />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/pasajero/historial"
          element={
            <DashboardLayout>
              <HistorialViajes />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/pasajero/billetera"
          element={
            <DashboardLayout>
              <Billetera />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/pasajero/perfil"
          element={
            <DashboardLayout>
              <PerfilPasajero />
            </DashboardLayout>
          }
        />

        {/* Ruta del conductor */}
        <Route path="/conductor" element={<HomeConductor />} />
      </Routes>
    </Router>
  );
}