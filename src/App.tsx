import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Componentes Principales
import { Home } from "./Home";
import { CarPage } from "./pages/CarPage";
import { ImportacionAlemania } from "./pages/ImportacionAlemania";

// IMPORTACIONES DEL BLOG
import BlogIndex from "./pages/Blog/index";
import MotoresBmwMercedes2027 from "./pages/Blog/motores-bmw-en-mercedes-2027";
import BmwReestreno2026 from "./pages/Blog/bmw-reestreno-alemania-2026";
import CochesReusTarragona from "./pages/Blog/coche-segunda-mano-reus-tarragona";

// IMPORTACIONES LEGALES
import AvisoLegal from "./pages/Legal/AvisoLegal";
import PoliticaPrivacidad from "./pages/Legal/PoliticaPrivacidad";

// ✅ Definimos ScrollToTop aquí dentro para evitar errores de "Could not resolve"
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
      {/* Forzamos el scroll al inicio en cada cambio de URL */}
      <ScrollToTop />
      
      <Routes>
        {/* LANDING PRINCIPAL */}
        <Route path="/" element={<Home />} />

        {/* FICHA VEHÍCULO INDIVIDUAL */}
        <Route path="/car/:slug" element={<CarPage />} />

        {/* PÁGINA DE SERVICIO DE IMPORTACIÓN */}
        <Route
          path="/importacion-coches-alemania"
          element={<ImportacionAlemania />}
        />

        {/* SECCIÓN BLOG - LISTADO */}
        <Route path="/blog" element={<BlogIndex />} />
        
        {/* ARTÍCULOS INDIVIDUALES DEL BLOG */}
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

        {/* PÁGINAS LEGALES */}
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />

      </Routes>
    </BrowserRouter>
  );
}
