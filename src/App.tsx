import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { CarPage } from "./pages/CarPage";
import { ImportacionAlemania } from "./pages/ImportacionAlemania";
import { AvisoLegal } from "./pages/AvisoLegal";
import { PoliticaPrivacidad } from "./pages/PoliticaPrivacidad";

import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Fuerza scroll arriba en cada ruta y en F5 */}
      <ScrollToTop />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* FICHA VEHÍCULO */}
        <Route path="/car/:slug" element={<CarPage />} />

        {/* IMPORTACIÓN ALEMANIA */}
        <Route
          path="/importacion-coches-alemania"
          element={<ImportacionAlemania />}
        />

        {/* LEGALES (NOINDEX) */}
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route
          path="/politica-de-privacidad"
          element={<PoliticaPrivacidad />}
        />
      </Routes>
    </BrowserRouter>
  );
}
