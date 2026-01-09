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
// IMPORTACIÓN: GUÍA 2026
import ComoImportarCocheAlemania from "./pages/Blog/como-importar-coche-alemania";
// ARTÍCULO RIESGOS 7 ENERO
import RiesgosImportarCocheAlemania from "./pages/Blog/5-riesgos-importar-coche-alemania";
// NUEVA IMPORTACIÓN: ARTÍCULO BMW ALPINA 9 ENERO
import BMWAlpinaNuevaEra from "./pages/Blog/BMWAlpinaNuevaEra";

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
        {/* RUTA: 5 RIESGOS IMPORTACIÓN */}
        <Route 
          path="/blog/5-riesgos-importar-coche-alemania" 
          element={<RiesgosImportarCocheAlemania />} 
        />
        {/* NUEVA RUTA: BMW ALPINA 2026 */}
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
