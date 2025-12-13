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

          {/* H1 SEO */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-10 leading-tight">
            Importación de coches premium desde Alemania
          </h1>

          {/* Intro */}
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            En <strong>Premium German Cars</strong> somos especialistas en la
            importación de coches premium desde Alemania, ofreciendo acceso
            directo al mayor mercado europeo de vehículos de alta gama, con
            total garantía, transparencia y entrega llave en mano en España.
          </p>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            ¿Por qué importar tu coche desde Alemania?
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Alemania es el principal mercado europeo de coches premium. La
            mayoría de vehículos cuentan con historiales completos, revisiones
            oficiales en concesionarios y un uso mayoritariamente en autopista.
            Esto se traduce en mejores estados mecánicos y niveles de
            equipamiento superiores a los habituales en España.
          </p>

          <p className="text-gray-300 leading-relaxed mb-6">
            Importar un coche desde Alemania permite acceder a marcas como
            BMW, Audi, Mercedes-Benz o Porsche con configuraciones exclusivas,
            kilometrajes certificados y precios más competitivos.
          </p>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Nuestro proceso de importación paso a paso
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Nos encargamos de todo el proceso de importación para que no tengas
            que preocuparte por nada. Desde la búsqueda personalizada del
            vehículo hasta la entrega final en España.
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-3 mb-10">
            <li>Búsqueda personalizada en el mercado alemán</li>
            <li>Verificación técnica y legal del vehículo</li>
            <li>Negociación directa con proveedores de confianza</li>
            <li>Transporte internacional asegurado</li>
            <li>Homologación y matriculación en España</li>
            <li>Entrega final llave en mano</li>
          </ul>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Coches alemanes certificados y con garantía
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Todos los vehículos importados pasan por un proceso de verificación
            exhaustivo. Solo trabajamos con proveedores de confianza y
            garantizamos que cada coche cumple con los estándares de calidad,
            seguridad y legalidad exigidos en España.
          </p>

          <p className="text-gray-300 leading-relaxed mb-10">
            Nuestro servicio está diseñado para quienes buscan importar un
            coche premium desde Alemania con total tranquilidad, transparencia
            y un trato profesional.
          </p>

          {/* CTA */}
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
