import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./Home";

// 🔹 Lazy pages (DEBEN tener export default)
const CarPage = lazy(() => import("./pages/CarPage"));
const ImportacionAlemania = lazy(() => import("./pages/ImportacionAlemania"));
const ImportarCocheAlemania = lazy(
  () => import("./pages/ImportarCocheAlemania")
);
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(
  () => import("./pages/PoliticaPrivacidad")
);

// ✅ Fallback visible (CLAVE para no tener pantalla negra)
function PageFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
      }}
    >
      Cargando…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* ⛔ NUNCA fallback={null} mientras depuras */}
      <Suspense fallback={<PageFallback />}>
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

          {/* LANDING */}
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
