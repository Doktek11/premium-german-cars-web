import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ANALYTICS VERCEL
import { Analytics } from "@vercel/analytics/react";

// COMPONENTES PRINCIPALES
import { Home } from "./Home";
import ScrollToTop from "./components/ScrollToTop";

const CarPage = lazy(() => import("./pages/CarPage").then((m) => ({ default: m.CarPage })));
const ImportacionAlemania = lazy(() =>
  import("./pages/ImportacionAlemania").then((m) => ({ default: m.ImportacionAlemania }))
);
const CalculadoraImpuestos = lazy(() =>
  import("./pages/CalculadoraImpuestos").then((m) => ({ default: m.CalculadoraImpuestos }))
);
const FAQPage = lazy(() => import("./pages/FAQPage").then((m) => ({ default: m.FAQPage })));

// BLOG
const BlogIndex = lazy(() => import("./pages/Blog/index"));
const ArticuloModelos2026 = lazy(() => import("./pages/Blog/ArticuloModelos2026"));
const MotoresBmwMercedes2027 = lazy(() => import("./pages/Blog/motores-bmw-en-mercedes-2027"));
const BmwReestreno2026 = lazy(() => import("./pages/Blog/bmw-reestreno-alemania-2026"));
const CochesReusTarragona = lazy(() => import("./pages/Blog/coche-segunda-mano-reus-tarragona"));
const ComoImportarCocheAlemania = lazy(() => import("./pages/Blog/como-importar-coche-alemania"));
const RiesgosImportarCocheAlemania = lazy(() => import("./pages/Blog/5-riesgos-importar-coche-alemania"));
const BMWAlpinaNuevaEra = lazy(() => import("./pages/Blog/BMWAlpinaNuevaEra"));
const ImportacionAlemaniaMejorOpcion = lazy(() => import("./pages/Blog/ImportarCocheAlemanGuia"));
const GuiaCalculadora2026 = lazy(() => import("./pages/Blog/GuiaCalculadora2026"));
const CosteImportacionAlemania = lazy(() => import("./pages/Blog/CosteImportacionAlemania"));
const ProtocoloAuditoria2026 = lazy(() => import("./pages/Blog/ProtocoloAuditoria2026"));
const CertificadoConformidadCOC = lazy(() => import("./pages/Blog/certificado-de-conformidad-coc"));
const EleccionMotor2026 = lazy(() => import("./pages/Blog/EleccionMotor2026"));

// LEGALES
const AvisoLegal = lazy(() => import("./pages/Legal/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/Legal/PoliticaPrivacidad"));

function RouteLoader() {
  return (
    <main className="min-h-[40vh] bg-black text-white grid place-items-center px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Cargando contenido...</p>
    </main>
  );
}

// 404 REAL (NUEVO)
function NotFound() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>404 – Página no encontrada</h1>
      <p>La URL solicitada no existe.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense fallback={<RouteLoader />}>
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

          {/* CALCULADORA */}
          <Route
            path="/calculadora-impuesto-matriculacion"
            element={<CalculadoraImpuestos />}
          />

          {/* FAQ */}
          <Route path="/preguntas-frecuentes" element={<FAQPage />} />

          {/* BLOG */}
          <Route path="/blog" element={<BlogIndex />} />

          <Route
            path="/blog/certificado-conformidad-coc-itv-matriculacion"
            element={<CertificadoConformidadCOC />}
          />

          <Route
            path="/blog/importar-coche-aleman-guia-importacion-alemania"
            element={<ImportacionAlemaniaMejorOpcion />}
          />

          <Route
            path="/blog/revision-coche-alemania-protocolo-auditoria"
            element={<ProtocoloAuditoria2026 />}
          />

          <Route
            path="/blog/guia-calculo-impuesto-matriculacion-boe-2025"
            element={<GuiaCalculadora2026 />}
          />

          <Route
            path="/blog/cuanto-cuesta-importar-coche-alemania-2026"
            element={<CosteImportacionAlemania />}
          />

          <Route
            path="/blog/mejores-modelos-importar-alemania-2026"
            element={<ArticuloModelos2026 />}
          />

          {/* NUEVO: artículo huérfano con URL SEO-friendly */}
          <Route
            path="/blog/que-motor-elegir-importar-alemania-2026"
            element={<EleccionMotor2026 />}
          />

          <Route
            path="/blog/motores-bmw-en-mercedes-2027"
            element={<MotoresBmwMercedes2027 />}
          />

          <Route
            path="/blog/bmw-reestreno-alemania-2026"
            element={<BmwReestreno2026 />}
          />

          <Route
            path="/blog/coche-segunda-mano-reus-tarragona"
            element={<CochesReusTarragona />}
          />

          <Route
            path="/blog/como-importar-coche-alemania"
            element={<ComoImportarCocheAlemania />}
          />

          <Route
            path="/blog/5-riesgos-importar-coche-alemania"
            element={<RiesgosImportarCocheAlemania />}
          />

          <Route
            path="/blog/bmw-alpina-nueva-era-lujo-aleman"
            element={<BMWAlpinaNuevaEra />}
          />

          {/* LEGALES */}
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />

          {/* 404 REAL (CORRECCIÓN SEO) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Analytics />
    </BrowserRouter>
  );
}
