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
const FaqPage = lazy(() => import("./pages/Faq"));

// 🔹 BLOG (✅ RUTAS CASE-SENSITIVE CORRECTAS)
const BlogIndex = lazy(() => import("./pages/Blog/index"));
const BlogBMWReestreno2026 = lazy(() =>
  import("./pages/Blog/bmw-reestreno-alemania-2026")
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
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* COCHES */}
          <Route path="/car/:slug" element={<CarPage />} />

          {/* IMPORTACIÓN */}
          <Route
            path="/importacion-coches-alemania"
            element={<ImportacionAlemania />}
          />
          <Route
            path="/importar-coche-alemania"
            element={<ImportarCocheAlemania />}
          />

          {/* BLOG */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route
            path="/blog/bmw-reestreno-alemania-2026"
            element={<BlogBMWReestreno2026 />}
          />

          {/* LEGALES */}
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route
            path="/politica-de-privacidad"
            element={<PoliticaPrivacidad />}
          />

          {/* FAQ */}
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
