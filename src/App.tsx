import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Componentes Principales
import { Home } from "./Home";
import { CarPage } from "./pages/CarPage";
import { ImportacionAlemania } from "./pages/ImportacionAlemania";
import { CalculadoraImpuestos } from "./pages/CalculadoraImpuestos"; // <-- Nueva importación

// IMPORTACIONES DEL BLOG
import BlogIndex from "./pages/Blog/index";
import ArticuloModelos2026 from "./pages/Blog/ArticuloModelos2026";
import MotoresBmwMercedes2027 from "./pages/Blog/motores-bmw-en-mercedes-2027";
import BmwReestreno2026 from "./pages/Blog/bmw-reestreno-alemania-2026";
import CochesReusTarragona from "./pages/Blog/coche-segunda-mano-reus-tarragona";

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

        {/* NUEVA RUTA CALCULADORA */}
        <Route 
          path="/calculadora-impuesto-matriculacion" 
          element={<CalculadoraImpuestos />} 
        />

        <Route path="/blog" element={<BlogIndex />} />
        
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

        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
