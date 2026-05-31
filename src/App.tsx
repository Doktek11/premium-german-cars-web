import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import { LeadAttributionTracker } from "./components/LeadAttributionTracker";
import { RouteAnalyticsTracker } from "./components/RouteAnalyticsTracker";
import { lazyNamed } from "./lib/lazyNamed";

const Analytics = lazyNamed(() => import("@vercel/analytics/react"), "Analytics");

const Home = lazyNamed(() => import("./Home"), "Home");
const CarPage = lazyNamed(() => import("./pages/CarPage"), "CarPage");
const ImportacionAlemania = lazyNamed(
  () => import("./pages/ImportacionAlemania"),
  "ImportacionAlemania"
);
const CalculadoraImpuestos = lazyNamed(
  () => import("./pages/CalculadoraImpuestos"),
  "CalculadoraImpuestos"
);
const FAQPage = lazyNamed(() => import("./pages/FAQPage"), "FAQPage");

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

const AvisoLegal = lazy(() => import("./pages/Legal/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/Legal/PoliticaPrivacidad"));
const ThankYouPage = lazyNamed(() => import("./pages/ThankYouPage"), "ThankYouPage");
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteLoader = () => (
  <main className="min-h-[40vh] bg-black text-white grid place-items-center px-4 sm:px-6">
    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Cargando contenido...</p>
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LeadAttributionTracker />
      <RouteAnalyticsTracker />

      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:slug" element={<CarPage />} />
          <Route path="/importacion-coches-alemania" element={<ImportacionAlemania />} />
          <Route path="/calculadora-impuesto-matriculacion" element={<CalculadoraImpuestos />} />
          <Route path="/preguntas-frecuentes" element={<FAQPage />} />
          <Route path="/gracias" element={<ThankYouPage />} />
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
          <Route path="/blog/como-importar-coche-alemania" element={<ComoImportarCocheAlemania />} />
          <Route
            path="/blog/5-riesgos-importar-coche-alemania"
            element={<RiesgosImportarCocheAlemania />}
          />
          <Route
            path="/blog/bmw-alpina-nueva-era-lujo-aleman"
            element={<BMWAlpinaNuevaEra />}
          />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </BrowserRouter>
  );
}
