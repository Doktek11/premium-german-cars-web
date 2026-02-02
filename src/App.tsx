import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

// ANALYTICS VERCEL
import { Analytics } from "@vercel/analytics/react";

// COMPONENTES PRINCIPALES
import { Home } from "./Home";
import { CarPage } from "./pages/CarPage";
import { ImportacionAlemania } from "./pages/ImportacionAlemania";
import { CalculadoraImpuestos } from "./pages/CalculadoraImpuestos";
import { FAQPage } from "./pages/FAQPage";

// BLOG
import BlogIndex from "./pages/Blog/index";
import ArticuloModelos2026 from "./pages/Blog/ArticuloModelos2026";
import MotoresBmwMercedes2027 from "./pages/Blog/motores-bmw-en-mercedes-2027";
import BmwReestreno2026 from "./pages/Blog/bmw-reestreno-alemania-2026";
import CochesReusTarragona from "./pages/Blog/coche-segunda-mano-reus-tarragona";
import ComoImportarCocheAlemania from "./pages/Blog/como-importar-coche-alemania";
import RiesgosImportarCocheAlemania from "./pages/Blog/5-riesgos-importar-coche-alemania";
import BMWAlpinaNuevaEra from "./pages/Blog/BMWAlpinaNuevaEra";

import ImportacionAlemaniaMejorOpcion from "./pages/Blog/ImportarCocheAlemanGuia";
import GuiaCalculadora2026 from "./pages/Blog/GuiaCalculadora2026";
import CosteImportacionAlemania from "./pages/Blog/CosteImportacionAlemania";
import ProtocoloAuditoria2026 from "./pages/Blog/ProtocoloAuditoria2026";
import CertificadoConformidadCOC from "./pages/Blog/certificado-de-conformidad-coc";

// LEGALES
import AvisoLegal from "./pages/Legal/AvisoLegal";
import PoliticaPrivacidad from "./pages/Legal/PoliticaPrivacidad";

// 404 REAL (NUEVO)
function NotFound() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>404 – Página no encontrada</h1>
      <p>La URL solicitada no existe.</p>
    </main>
  );
}

// SCROLL TO TOP
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

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

      <Analytics />
    </BrowserRouter>
  );
}
