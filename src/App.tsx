import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Home";
import { CarPage } from "./pages/CarPage";
import { ImportacionAlemania } from "./pages/ImportacionAlemania";
import { ImportarCocheAlemania } from "./pages/ImportarCocheAlemania";
import { AvisoLegal } from "./pages/AvisoLegal";
import { PoliticaPrivacidad } from "./pages/PoliticaPrivacidad";

import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Fuerza scroll arriba en cada navegación y en F5 */}
      <ScrollToTop />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* FICHA VEHÍCULO */}
        <Route path="/car/:slug" element={<CarPage />} />

        {/* IMPORTACIÓN (PÁGINA GENERAL) */}
        <Route
          path="/importacion-coches-alemania"
          element={<ImportacionAlemania />}
        />

        {/* LANDING PARA ADS / SEO */}
        <Route
          path="/importar-coche-alemania"
          element={<ImportarCocheAlemania />}
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
