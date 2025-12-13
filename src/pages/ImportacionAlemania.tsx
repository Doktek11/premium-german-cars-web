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

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* H1 SEO */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-10 leading-tight">
            Importación de coches premium desde Alemania
          </h1>

          {/* Intro */}
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            En <strong>Premium German Cars</strong> somos especialistas en la{" "}
            <strong>importación de coches premium desde Alemania</strong>,
            ofreciendo acceso directo al mayor mercado europeo de vehículos de
            alta gama. Nuestro servicio está pensado para clientes que buscan
            seguridad, transparencia y una entrega llave en mano en España.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-12">
            Alemania es el referente europeo en automoción premium. Marcas como{" "}
            <strong>BMW, Audi, Mercedes-Benz o Porsche</strong> ofrecen allí una
            variedad de configuraciones, motorizaciones y equipamientos muy
            superior a la disponible en el mercado español. Nosotros convertimos
            ese acceso en una compra segura y sin riesgos.
          </p>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            ¿Por qué importar tu coche desde Alemania?
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Importar un coche desde Alemania supone una ventaja clara frente a la
            compra tradicional en España. El mercado alemán destaca por su
            rigurosidad en el mantenimiento, la trazabilidad de los vehículos y
            la profesionalidad de los proveedores.
          </p>

          <p className="text-gray-300 leading-relaxed mb-6">
            La mayoría de los coches cuentan con historiales completos,
            revisiones oficiales en concesionarios de la marca y un uso
            mayoritariamente en autopista, lo que se traduce en un menor desgaste
            mecánico y un mejor estado general.
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-3 mb-10">
            <li>Historial de mantenimiento documentado</li>
            <li>Kilometraje certificado y verificable</li>
            <li>Mayor nivel de equipamiento</li>
            <li>Configuraciones exclusivas</li>
            <li>Mejor relación calidad-precio en coches premium</li>
          </ul>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Importación de coches alemanes con total garantía
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            En Premium German Cars solo trabajamos con proveedores de confianza y
            vehículos que superan un proceso exhaustivo de verificación técnica
            y legal. Cada coche importado cumple con la normativa española y
            europea.
          </p>

          <p className="text-gray-300 leading-relaxed mb-10">
            Nuestro objetivo es que disfrutes de tu coche premium sin
            preocuparte por trámites, papeleos o gestiones complejas. Nos
            encargamos de absolutamente todo el proceso.
          </p>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mt-16 mb-6">
            Nuestro proceso de importación paso a paso
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Nuestro método de trabajo está diseñado para ofrecer máxima
            transparencia y control en cada fase del proceso de importación.
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-3 mb-12">
            <li>Búsqueda personalizada del vehículo en Alemania</li>
            <li>Verificación técnica, mecánica y legal</li>
            <li>Negociación directa con proveedores profesionales</li>
            <li>Transporte internacional asegurado</li>
            <li>Homologación y matriculación en España</li>
            <li>Entrega final llave en mano</li>
          </ul>

          {/* CTA */}
          <div className="mt-20 text-center">
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
