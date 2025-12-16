import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { ScrollToTop } from "./components/ScrollToTop";

// ✅ HOME (puede quedarse normal o lazy, ahora lo explico)
import { Home } from "./Home";

// 🔹 LAZY LOAD DE PÁGINAS PESADAS
const CarPage = lazy(() => import("./pages/CarPage"));
const ImportacionAlemania = lazy(() => import("./pages/ImportacionAlemania"));
const ImportarCocheAlemania = lazy(
  () => import("./pages/ImportarCocheAlemania")
);
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(
  () => import("./pages/PoliticaPrivacidad")
);

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Scroll arriba en navegación */}
      <ScrollToTop />

      {/* ⏳ Suspense global (fallback nulo = sin layout shift) */}
      <Suspense fallback={null}>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* FICHA VEHÍCULO */}
          <Route path="/car/:slug" element={<CarPage />} />

          {/* IMPORTACIÓN */}
          <Route
            path="/importacion-coches-alemania"
            element={<ImportacionAlemania />}
          />

          {/* LANDING SEO / ADS */}
          <Route
            path="/importar-coche-alemania"
            element={<ImportarCocheAlemania />}
          />

          {/* LEGALES */}
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route
            path="/politica-de-privacidad"
            element={<PoliticaPrivacidad />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
