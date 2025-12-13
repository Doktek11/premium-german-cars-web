import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

export const ImportacionAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* ================= H1 SEO ================= */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-10 leading-tight">
            Importación de coches premium desde Alemania
          </h1>

          {/* ================= INTRO ================= */}
          <p className="text-gray-300 text-lg leading-relaxed mb-12">
            En <strong>Premium German Cars</strong> somos especialistas en la
            importación de coches premium desde Alemania. Accede al mayor mercado
            europeo de vehículos de alta gama con total garantía, transparencia
            y entrega llave en mano en España.
          </p>

          {/* ================= BLOQUE 1 ================= */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            ¿Por qué importar un coche desde Alemania?
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Alemania es el principal mercado europeo de vehículos premium.
            La mayoría de coches cuentan con historiales completos,
            revisiones oficiales y un uso mayoritario en autopista,
            lo que se traduce en un mejor estado mecánico general.
          </p>

          <p className="text-gray-300 leading-relaxed mb-6">
            Importar un coche desde Alemania permite acceder a modelos de
            <strong> BMW, Audi, Mercedes-Benz o Porsche</strong> con
            configuraciones exclusivas, menor kilometraje y precios
            más competitivos que en el mercado español.
          </p>

          {/* ================= BLOQUE 2 ================= */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Proceso de importación paso a paso
          </h2>

          <p className="text-gray-300 leading-relaxed mb-8">
            Nos encargamos de todo el proceso de importación para que
            no tengas que preocuparte por trámites, gestiones ni riesgos.
            Tú eliges el coche, nosotros hacemos el resto.
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-3 mb-12">
            <li>Búsqueda personalizada en el mercado alemán</li>
            <li>Verificación técnica, mecánica y legal</li>
            <li>Negociación directa con proveedores certificados</li>
            <li>Transporte internacional totalmente asegurado</li>
            <li>Homologación y matriculación en España</li>
            <li>Entrega final llave en mano</li>
          </ul>

          {/* ================= BLOQUE 3 ================= */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Coches alemanes certificados y con garantía
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Todos los vehículos pasan por un proceso de verificación exhaustivo.
            Solo trabajamos con concesionarios oficiales y proveedores
            de confianza, garantizando la legalidad, el estado real y el
            historial completo del vehículo.
          </p>

          <p className="text-gray-300 leading-relaxed mb-12">
            Nuestro servicio está diseñado para clientes que buscan
            importar un coche premium desde Alemania con
            <strong> máxima seguridad, transparencia y trato profesional</strong>.
          </p>

          {/* ================= CTA ================= */}
          <div className="mt-20 text-center">
            <a
              href="/#import"
              className="inline-block px-10 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
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

