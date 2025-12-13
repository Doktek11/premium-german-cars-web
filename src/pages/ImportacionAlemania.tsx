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
        description="Especialistas en importación de coches premium desde Alemania. Gestión integral, vehículos certificados y entrega llave en mano en España."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-10 leading-tight">
            Importación de coches premium desde Alemania
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            En <strong>Premium German Cars</strong> somos especialistas en la
            importación de coches premium desde Alemania, ofreciendo acceso
            directo al mayor mercado europeo de vehículos de alta gama, con total
            garantía, transparencia y entrega llave en mano en España.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            ¿Por qué importar tu coche desde Alemania?
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Alemania es el principal mercado europeo de coches premium, con
            historiales completos, revisiones oficiales y un uso mayoritario en
            autopista. Esto se traduce en vehículos mejor mantenidos y con mayor
            nivel de equipamiento.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Nuestro proceso de importación
          </h2>

          <ul className="list-disc list-inside text-gray-300 space-y-3 mb-10">
            <li>Búsqueda personalizada en Alemania</li>
            <li>Verificación técnica y legal</li>
            <li>Negociación directa con proveedores</li>
            <li>Transporte asegurado</li>
            <li>Homologación y matriculación</li>
            <li>Entrega llave en mano</li>
          </ul>

          <div className="mt-16 text-center">
            <a
              href="/#import"
              className="inline-block px-10 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
            >
              Solicitar importación personalizada
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
