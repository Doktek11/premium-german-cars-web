import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { CarPage } from "./pages/CarPage";
import { ImportacionAlemania } from "./pages/ImportacionAlemania";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* FICHA VEHÍCULO */}
        <Route path="/car/:slug" element={<CarPage />} />

        {/* PÁGINA SEO */}
        <Route
          path="/importacion-coches-alemania"
          element={<ImportacionAlemania />}
        />
      </Routes>
    </BrowserRouter>
  );
}
