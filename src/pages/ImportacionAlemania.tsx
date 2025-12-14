import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

/* ✅ SCHEMA SERVICE */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Importación de coches premium desde Alemania",
  "description":
    "Servicio profesional de importación de coches premium desde Alemania con garantía, historial certificado y entrega llave en mano en toda España.",
  "provider": {
    "@type": "AutoDealer",
    "name": "Premium German Cars",
    "url": "https://www.premiumgermancars.com",
    "logo": "https://www.premiumgermancars.com/favicon.svg"
  },
  "areaServed": {
    "@type": "Country",
    "name": "ES"
  },
  "serviceType": "Importación de vehículos",
  "offers": {
    "@type": "Offer",
    "url": "https://www.premiumgermancars.com/importacion-coches-alemania",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
};

/* ✅ SCHEMA FAQ */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta importar un coche desde Alemania?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "El coste de importar un coche desde Alemania depende del modelo, transporte, impuestos y matriculación. En Premium German Cars ofrecemos presupuestos cerrados con entrega llave en mano en España."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tarda la importación de un coche desde Alemania?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "El proceso de importación suele tardar entre 3 y 5 semanas, incluyendo transporte, homologación y matriculación en España."
      }
    },
    {
      "@type": "Question",
      "name": "¿Los coches importados desde Alemania tienen garantía?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Sí, todos los coches importados pasan revisiones técnicas completas y cuentan con garantía, además de historial y kilometraje verificados."
      }
    }
  ]
};

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
        description="Importación de coches premium desde Alemania con gestión integral. Vehículos certificados, historial verificado y entrega llave en mano en España."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
        schema={[serviceSchema, faqSchema]}
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-10 leading-tight">
            Importación de coches premium desde Alemania
          </h1>

          {/* TEXTO INTRO SEO */}
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            En <strong>Premium German Cars</strong> somos especialistas en la
            importación de coches premium desde Alemania, ofreciendo un servicio
            exclusivo y totalmente transparente para clientes que buscan
            vehículos de alta gama con las máximas garantías.
          </p>

          <p className="text-gray-300 leading-relaxed mb-8">
            Alemania es el mayor mercado europeo de vehículos premium, con una
            oferta incomparable de marcas como BMW, Audi, Mercedes-Benz y
            Porsche. Gracias a un mantenimiento riguroso, historiales completos
            y un uso mayoritario en autopista, los coches procedentes de Alemania
            destacan por su excelente estado mecánico, mayor nivel de
            equipamiento y una relación calidad-precio superior.
          </p>

          <p className="text-gray-300 leading-relaxed mb-12">
            Nuestro servicio de importación está diseñado para que no tengas que
            preocuparte de nada. Nos encargamos de todo el proceso, desde la
            búsqueda personalizada del vehículo hasta la entrega final en
            España, con total seguridad legal, técnica y administrativa.
          </p>

          {/* CTA ÚNICO */}
          <div className="mb-20">
            <button
              onClick={goToImportForm}
              className="inline-block px-10 py-5 bg-gold-400 text-black font-bold uppercase tracking-widest text-sm hover:bg-gold-500 transition-all duration-300"
            >
              Pedir información ahora
            </button>
          </div>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mb-6">
            ¿Por qué importar tu coche desde Alemania?
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            Importar un coche desde Alemania permite acceder a un mercado mucho
            más amplio y especializado que el español. Los vehículos suelen
            contar con más extras, mejores motorizaciones y un mantenimiento
            documentado en concesionarios oficiales.
          </p>

          <p className="text-gray-300 leading-relaxed mb-12">
            Además, los estándares de calidad alemanes garantizan revisiones
            periódicas, kilometrajes certificados y un uso responsable del
            vehículo, lo que se traduce en una mayor fiabilidad a largo plazo.
          </p>

          {/* H2 */}
          <h2 className="text-2xl font-serif font-bold mb-6">
            Nuestro proceso de importación de coches
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            En Premium German Cars seguimos un proceso claro, seguro y
            completamente transparente para garantizar que cada importación sea
            un éxito:
          </p>

          <ul className="list-disc list-inside text-gray-300 space-y-3 mb-12">
            <li>Búsqueda personalizada del vehículo en Alemania</li>
            <li>Verificación técnica, mecánica y legal</li>
            <li>Comprobación de historial y kilometraje</li>
            <li>Negociación directa con proveedores certificados</li>
            <li>Transporte internacional asegurado</li>
            <li>Homologación y matriculación en España</li>
            <li>Entrega final llave en mano</li>
          </ul>

          <p className="text-gray-300 leading-relaxed">
            Nuestro objetivo es que disfrutes de tu coche premium importado con
            total tranquilidad, sabiendo que cada paso del proceso ha sido
            gestionado por profesionales especializados.
          </p>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

