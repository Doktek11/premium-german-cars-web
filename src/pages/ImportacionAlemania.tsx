import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export const ImportacionAlemania: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToImportForm = () => {
    navigate("/", { state: { scrollTo: "#import" } });
  };

  return (
    <>
      <SEO
        title="Importación de coches desde Alemania con garantía | Premium German Cars"
        description="Especialistas en importación de coches premium desde Alemania. Gestión integral, vehículos certificados y entrega llave en mano en España."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            Importación de coches premium desde Alemania
          </h1>

          {/* CTA PRINCIPAL */}
          <div className="mb-12">
            <button
              onClick={goToImportForm}
              className="inline-block px-10 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
            >
              Pedir información ahora
            </button>
          </div>

          {/* INTRO */}
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            En <strong>Premium German Cars</strong> somos especialistas en la
            importación de coches premium desde Alemania, ofreciendo acceso
            directo al mayor mercado europeo de vehículos de alta gama, con total
            garantía, transparencia y entrega llave en mano en España.
          </p>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            ¿Por qué importar tu coche desde Alemania?
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Alemania es el principal mercado europeo de coches premium, con
            historiales completos, revisiones oficiales y un uso mayoritario en
            autopista. Esto se traduce en vehículos mejor mantenidos y con mayor
            nivel de equipamiento.
          </p>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Nuestro proceso de importación
          </h2>

          <ul className="list-disc list-inside text-gray-300 space-y-3 mb-16">
            <li>Búsqueda personalizada en Alemania</li>
            <li>Verificación técnica y legal</li>
            <li>Negociación directa con proveedores</li>
            <li>Transporte internacional asegurado</li>
            <li>Homologación y matriculación en España</li>
            <li>Entrega final llave en mano</li>
          </ul>

          {/* CTA FINAL */}
          <div className="text-center">
            <button
              onClick={goToImportForm}
              className="inline-block px-10 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
            >
              Pedir información ahora
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
