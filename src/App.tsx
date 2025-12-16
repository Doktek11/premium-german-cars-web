import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./Home";

// 🔹 Lazy pages → REQUIEREN export default
const CarPage = lazy(() => import("./pages/CarPage"));
const ImportacionAlemania = lazy(() => import("./pages/ImportacionAlemania"));
const ImportarCocheAlemania = lazy(() =>
  import("./pages/ImportarCocheAlemania")
);
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() =>
  import("./pages/PoliticaPrivacidad")
);

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

      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:slug" element={<CarPage />} />
          <Route
            path="/importacion-coches-alemania"
            element={<ImportacionAlemania />}
          />
          <Route
            path="/importar-coche-alemania"
            element={<ImportarCocheAlemania />}
          />
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
