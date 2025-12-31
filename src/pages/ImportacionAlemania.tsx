import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export const ImportacionAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Importación de coches desde Alemania con garantía | Premium German Cars"
        description="Especialistas en importación de coches premium desde Alemania. Vehículos certificados, gestión integral y entrega llave en mano en España."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
      />

      <Navbar />

      <main className="bg-metallic-900 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <span className="text-gold-400 text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Servicios Premium
          </span>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight">
            Importación de coches <br/>
            <span className="text-gold-400 text-3xl md:text-5xl italic font-light">desde Alemania</span>
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 text-xl leading-relaxed mb-8 font-light">
              En <strong>Premium German Cars</strong> somos especialistas en la{" "}
              <strong>importación de coches premium desde Alemania</strong>,
              ofreciendo acceso directo al mayor mercado europeo de vehículos de
              alta gama.
            </p>

            <div className="bg-black/30 p-8 border-l-2 border-gold-400 mb-12">
                <p className="text-gray-300 text-lg leading-relaxed m-0">
                  Alemania es el referente europeo en automoción premium. Marcas como{" "}
                  <strong>BMW, Audi, Mercedes-Benz o Porsche</strong> ofrecen allí una
                  variedad de configuraciones y mantenimientos que garantizan una compra superior.
                </p>
            </div>

            <h2 className="text-3xl font-serif font-bold mt-16 mb-8 text-white">
              ¿Por qué importar con nosotros?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="border border-white/10 p-6 rounded-lg">
                    <h3 className="text-gold-400 font-bold mb-3 uppercase text-sm tracking-widest">Garantía Total</h3>
                    <p className="text-gray-400 text-sm">Historial de mantenimiento 100% documentado y kilometraje certificado por escrito.</p>
                </div>
                <div className="border border-white/10 p-6 rounded-lg">
                    <h3 className="text-gold-400 font-bold mb-3 uppercase text-sm tracking-widest">Exclusividad</h3>
                    <p className="text-gray-400 text-sm">Acceso a configuraciones y extras que no se encuentran en el mercado nacional.</p>
                </div>
            </div>

            <h2 className="text-3xl font-serif font-bold mt-16 mb-8 text-white">
              Nuestro proceso llave en mano
            </h2>

            <ul className="space-y-4 mb-12">
              {[
                "Búsqueda personalizada según tus requisitos",
                "Verificación técnica y legal en origen",
                "Negociación profesional con concesionarios oficiales",
                "Transporte en camión cerrado asegurado",
                "Gestión de ITV, impuestos y matriculación",
                "Entrega final en tu domicilio o nuestras instalaciones"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-300">
                  <span className="text-gold-400 font-serif font-bold">0{i+1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-20 p-12 bg-black text-center border border-gold-400/20 rounded-xl">
            <h3 className="text-2xl font-serif mb-6">¿Buscas un modelo específico?</h3>
            <p className="text-gray-400 mb-8">Cuéntanos qué coche tienes en mente y nosotros lo encontramos por ti.</p>
            <a
              href="/#import"
              className="inline-block px-10 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 shadow-xl shadow-gold-400/20"
            >
              Solicitar Presupuesto Gratis
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
