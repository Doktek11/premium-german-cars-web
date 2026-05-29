import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";
import { ArrowRight, CheckCircle2, Calculator, Search } from "lucide-react";
import { Link } from "react-router-dom";

export const ImportacionAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Importación de coches desde Alemania en Cambrils (Tarragona) | Premium German Cars"
        description="Especialistas en importación de coches premium desde Alemania para clientes en Cambrils, Tarragona y toda Cataluña. Proceso verificado, gestión integral y entrega final."
        canonical="https://www.premiumgermancars.com/importacion-coches-alemania"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name:
            "Importación de coches desde Alemania en Cambrils (Tarragona) | Premium German Cars",
          url: "https://www.premiumgermancars.com/importacion-coches-alemania",
          description:
            "Especialistas en importación de coches premium desde Alemania para clientes en Cambrils, Tarragona y toda Cataluña.",
          inLanguage: "es-ES",
          publisher: {
            "@type": "Organization",
            name: "Premium German Cars",
            logo: {
              "@type": "ImageObject",
              url: "https://www.premiumgermancars.com/logoPGC.svg",
            },
          },
          mainEntity: {
            "@type": "Service",
            name: "Importación de coches premium desde Alemania",
            areaServed: [
              { "@type": "City", name: "Cambrils" },
              { "@type": "City", name: "Tarragona" },
              { "@type": "City", name: "Reus" },
              { "@type": "City", name: "Barcelona" },
              { "@type": "AdministrativeArea", name: "Cataluña" },
            ],
            provider: {
              "@type": "Organization",
              name: "Premium German Cars",
            },
            serviceType: "Importación de coches desde Alemania",
          },
        }}
      />

      <Navbar />

      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <section className="container mx-auto px-4 sm:px-6 max-w-5xl text-center mb-16 sm:mb-20 md:mb-24">
          <span className="text-gold-400 text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            Cambrils (Tarragona) · Cataluña
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 leading-tight">
            Importación de coches desde Alemania en Cambrils (Tarragona) | Premium German Cars
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed">
            Especialistas en importación de coches premium desde Alemania para clientes en Cambrils, Tarragona y toda Cataluña.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/calculadora-impuesto-matriculacion"
              className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
            >
              Calcular coste de importación <Calculator size={16} />
            </Link>
            <a
              href="https://wa.me/34603743608?text=Hola,%20quiero%20solicitar%20una%20b%C3%BAsqueda%20personalizada%20de%20coche%20en%20Alemania."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
            >
              Solicitar búsqueda personalizada <Search size={16} />
            </a>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
            Importación de coches desde Alemania con proceso verificado
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Accede al mercado alemán con un proceso profesional que elimina riesgos fiscales, técnicos y legales antes de tomar cualquier decisión.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Trabajamos con clientes que buscan algo más que un coche: buscan seguridad, criterio y una compra bien hecha.
          </p>
          <ul className="space-y-3 text-sm">
            {[
              "Historial verificado",
              "Selección profesional de unidades",
              "Gestión integral hasta entrega final",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-gold-400" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-metallic-900 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
              Calcula el coste real antes de decidir
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Calcula el coste real de importar un coche desde Alemania en menos de 30 segundos:
            </p>
            <ul className="space-y-2 text-sm mb-8">
              <li>Impuestos de matriculación</li>
              <li>Transporte</li>
              <li>Costes administrativos</li>
              <li>Impacto por emisiones (CO₂)</li>
            </ul>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Evita decisiones a ciegas y entiende el precio final antes de comprar.
            </p>
            <Link
              to="/calculadora-impuesto-matriculacion"
              className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
            >
              Calcular coste de importación <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">¿Buscas un coche concreto?</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Si ya tienes una unidad vista o quieres acceder a opciones que no existen en España:
          </p>
          <a
            href="https://wa.me/34603743608?text=Hola,%20quiero%20solicitar%20una%20b%C3%BAsqueda%20personalizada%20de%20coche%20en%20Alemania."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
          >
            Solicitar búsqueda personalizada <Search size={16} />
          </a>
        </section>

        <section className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Nuestro enfoque: lo que NO hacemos</h2>
          <ul className="space-y-2 text-sm mb-8">
            <li>No trabajamos con stock genérico.</li>
            <li>No perseguimos «gangas».</li>
            <li>No improvisamos.</li>
          </ul>
          <h3 className="text-xl font-bold mb-4">Seleccionamos activos mecánicos, no coches</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Nuestro enfoque es claro: no se trata solo de traer vehículos desde Alemania, sino de seleccionar activos mecánicos con valor real a medio y largo plazo.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Trabajamos para clientes que:</p>
          <ul className="space-y-2 text-sm mb-8">
            <li>Quieren evitar errores costosos</li>
            <li>Valoran la trazabilidad</li>
            <li>Buscan unidades bien mantenidas y configuradas</li>
            <li>Entienden que una buena compra empieza antes de pagar</li>
          </ul>
          <p className="text-gold-400 font-serif text-2xl italic">
            “Importar bien no es cuestión de suerte, sino de criterio.”
          </p>
        </section>

        <section className="bg-metallic-950 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">¿Por qué Alemania en 2026?</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Alemania sigue siendo el mercado más sólido de Europa para vehículos premium.
            </p>
            <ul className="space-y-2 text-sm mb-8">
              <li>Vehículos con mantenimientos más estrictos</li>
              <li>Registros completos y verificables</li>
              <li>Mayor variedad de configuraciones</li>
              <li>Rotación alta de unidades</li>
              <li>Mejor base para mantener valor de reventa</li>
            </ul>
            <p className="text-gray-300 text-lg leading-relaxed">
              Pero hay una diferencia clave: no es lo mismo importar que saber elegir. El mercado es bueno, el problema aparece cuando se compra sin verificar.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-5xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-8">Qué nos diferencia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Verificación y trazabilidad total</h3>
              <p className="text-gray-300 text-base">
                Analizamos historial, kilometraje y documentación antes de validar cualquier unidad. Si no es transparente, no se trabaja.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Selección real de mercado</h3>
              <p className="text-gray-300 text-base">
                Accedemos a miles de vehículos, pero solo proponemos aquellos que cumplen criterios técnicos y de valor.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Reducción de riesgos</h3>
              <p className="text-gray-300 text-base">
                Eliminamos problemas fiscales, errores documentales y riesgos técnicos antes de la compra.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold">Enfoque profesional</h3>
              <p className="text-gray-300 text-base">
                No intermediamos operaciones: las filtramos y validamos.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-metallic-900 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Cómo trabajamos (Proceso llave en mano)</h2>
            <ol className="space-y-3 text-sm list-decimal list-inside">
              <li>Consultoría inicial: definimos modelo, presupuesto y tipo de uso.</li>
              <li>Búsqueda y selección: filtrado real de mercado según criterios técnicos y de valor.</li>
              <li>Verificación en origen: auditoría mecánica, electrónica y legal del vehículo.</li>
              <li>Negociación profesional: defensa de intereses y optimización de condiciones.</li>
              <li>Transporte asegurado: logística profesional con seguro a todo riesgo hasta Cambrils o cualquier punto de Cataluña.</li>
              <li>Gestión completa: ITV, ficha técnica, impuestos y matriculación.</li>
              <li>Entrega final: vehículo listo para circular, sin gestiones pendientes.</li>
            </ol>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">¿Es buena idea importar un coche de Alemania?</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">En la mayoría de los casos, sí.</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Especialmente para quienes buscan:</p>
          <ul className="space-y-2 text-sm mb-6">
            <li>Configuraciones específicas</li>
            <li>Vehículos mejor equipados</li>
            <li>Unidades bien mantenidas</li>
            <li>Acceso a mercado más amplio</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed">
            Pero hay un factor clave: la diferencia está en lo que se verifica antes de pagar.
          </p>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">¿Cuánto cuesta importar un coche desde Alemania?</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Depende de varios factores:</p>
          <ul className="space-y-2 text-sm mb-8">
            <li>Precio del vehículo</li>
            <li>Emisiones (CO₂)</li>
            <li>Transporte</li>
            <li>Impuestos</li>
            <li>Costes administrativos</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Por eso es fundamental calcular el coste completo antes de iniciar la operación.
          </p>
          <Link
            to="/calculadora-impuesto-matriculacion"
            className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
          >
            Calcular coste de importación ahora <ArrowRight size={16} />
          </Link>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">¿Trabajáis en Cambrils y Tarragona?</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Sí. Trabajamos con clientes en:</p>
          <ul className="space-y-2 text-sm mb-6">
            <li>Cambrils</li>
            <li>Tarragona</li>
            <li>Reus</li>
            <li>Barcelona</li>
            <li>Toda Cataluña</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed">
            Gestionamos todo el proceso de importación y entregamos el vehículo listo para circular.
          </p>
        </section>

        <section className="bg-metallic-950 py-14 sm:py-18 md:py-22 mb-16 sm:mb-20 md:mb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Solicita tu presupuesto personalizado</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              No te limites al stock local. El mercado alemán ofrece miles de opciones, pero solo unas pocas merecen la pena.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Si quieres hacer una compra segura y bien analizada:
            </p>
            <a
              href="https://wa.me/34603743608?text=Hola,%20quiero%20solicitar%20un%20presupuesto%20personalizado%20para%20importar%20un%20coche%20desde%20Alemania."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
            >
              Solicitar presupuesto personalizado <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">O si ya tienes una unidad vista</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Antes de tomar una decisión:</p>
          <Link
            to="/calculadora-impuesto-matriculacion"
            className="inline-flex items-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
          >
            Calcula el coste real de importación <Calculator size={16} />
          </Link>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Cierre</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Cuando se trata de una inversión importante, la diferencia no está en el coche. Está en cómo se elige.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Premium German Cars. Importación profesional desde Alemania con criterio, método y sin improvisaciones.
          </p>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
