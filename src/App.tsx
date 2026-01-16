import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// 1. IMPORTAMOS EL COMPONENTE DE VERCEL
import { Analytics } from "@vercel/analytics/react";

// Componentes Principales
import { Home } from "./Home";
import { CarPage } from "./pages/CarPage";
import { ImportacionAlemania } from "./pages/ImportacionAlemania";
import { CalculadoraImpuestos } from "./pages/CalculadoraImpuestos";
import { FAQPage } from "./pages/FAQPage"; 

// IMPORTACIONES DEL BLOG
import BlogIndex from "./pages/Blog/index";
import ArticuloModelos2026 from "./pages/Blog/ArticuloModelos2026";
import MotoresBmwMercedes2027 from "./pages/Blog/motores-bmw-en-mercedes-2027";
import BmwReestreno2026 from "./pages/Blog/bmw-reestreno-alemania-2026";
import CochesReusTarragona from "./pages/Blog/coche-segunda-mano-reus-tarragona";
import ComoImportarCocheAlemania from "./pages/Blog/como-importar-coche-alemania";
import RiesgosImportarCocheAlemania from "./pages/Blog/5-riesgos-importar-coche-alemania";
import BMWAlpinaNuevaEra from "./pages/Blog/BMWAlpinaNuevaEra";

// NUEVA IMPORTACIÓN: GUÍA CALCULADORA 13 ENERO
import GuiaCalculadora2026 from "./pages/Blog/GuiaCalculadora2026";

// IMPORTACIONES LEGALES
import AvisoLegal from "./pages/Legal/AvisoLegal";
import PoliticaPrivacidad from "./pages/Legal/PoliticaPrivacidad";

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
        <Route path="/" element={<Home />} />
        <Route path="/car/:slug" element={<CarPage />} />
        
        <Route
          path="/importacion-coches-alemania"
          element={<ImportacionAlemania />}
        />

        {/* RUTA CALCULADORA */}
        <Route 
          path="/calculadora-impuesto-matriculacion" 
          element={<CalculadoraImpuestos />} 
        />

        {/* RUTA PREGUNTAS FRECUENTES (FAQ) */}
        <Route 
          path="/preguntas-frecuentes" 
          element={<FAQPage />} 
        />

        <Route path="/blog" element={<BlogIndex />} />
        
        {/* RUTAS DEL BLOG */}
        
        {/* NUEVA RUTA: GUÍA CALCULADORA BOE 2025 */}
        <Route 
          path="/blog/guia-calculo-impuesto-matriculacion-boe-2025" 
          element={<GuiaCalculadora2026 />} 
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

        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />

        {/* REDIRECCIÓN POR DEFECTO A HOME */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* 2. ANALYTICS PARA RASTREAR EL RENDIMIENTO */}
      <Analytics />
    </BrowserRouter>
  );
}
