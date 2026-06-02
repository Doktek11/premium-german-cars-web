import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { SEO } from "../../components/SEO";
import { ArrowRight, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { SeoIntentLinks, seoIntentLinks } from "../../components/SeoIntentLinks";

export const CosteImportacionAlemania: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Coste real de importar coche de Alemania en 2026 | PGC"
        description="Transporte, impuestos, fiscalidad y ejemplos reales. Descubre el coste total antes de comprar y evita sorpresas."
        canonical="https://www.premiumgermancars.com/blog/cuanto-cuesta-importar-coche-alemania-2026"
        article={true}
        image="/logoPGC.svg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "¿Cuánto cuesta realmente importar un coche de Alemania en 2026? (La verdad que nadie te cuenta)",
          description:
            "Coste real de importar un coche de Alemania en 2026: transporte, impuestos, fiscalidad en Cataluña, pegatina ambiental y verificación técnica.",
          image: ["https://www.premiumgermancars.com/logoPGC.svg"],
          datePublished: "2026-03-19",
          dateModified: "2026-03-19",
          author: {
            "@type": "Organization",
            name: "Premium German Cars",
          },
          publisher: {
            "@type": "Organization",
            name: "Premium German Cars",
            logo: {
              "@type": "ImageObject",
              url: "https://www.premiumgermancars.com/logoPGC.svg",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id":
              "https://www.premiumgermancars.com/blog/cuanto-cuesta-importar-coche-alemania-2026",
          },
        }}
      />

      <Navbar />

      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <section className="container mx-auto px-4 sm:px-6 max-w-4xl text-center mb-14 sm:mb-18 md:mb-22">
          <span className="text-gold-400 text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            Costes reales 2026
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            ¿Cuánto cuesta realmente importar un coche de Alemania en 2026? (La verdad que nadie te cuenta)
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Importar un coche de Alemania en 2026 puede parecer una gran oportunidad… pero en muchos casos acaba costando mucho más de lo esperado.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/calculadora-impuesto-matriculacion"
              className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
            >
              Calcular coste real <Calculator size={16} />
            </Link>
            <a
              href="https://wa.me/34603743608?text=Hola,%20quiero%20calcular%20el%20coste%20real%20de%20importar%20un%20coche."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
            >
              Hablar por WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            La pregunta clave no es cuánto cuesta el coche, sino cuánto cuesta realmente traerlo y matricularlo en España.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Cada mes, muchos compradores encuentran ofertas atractivas en portales como Mobile.de. Sin embargo, en la mayoría de los casos, el supuesto ahorro desaparece cuando aparecen los costes reales de importación.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Porque el precio del anuncio es solo el principio.</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Importar correctamente implica entender logística, fiscalidad y normativa técnica. Y en comunidades como Cataluña, una mala gestión puede suponer miles de euros extra.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Antes de lanzarte a comprar, hay algo más importante que el precio: saber dónde se gana —y dónde se pierde— el dinero de verdad.
          </p>
        </section>

        <section className="bg-metallic-900 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">1. Transporte: el coste oculto que muchos subestiman</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              El transporte es uno de los puntos donde más dinero se pierde sin darse cuenta. No se trata solo de traer el coche, sino de hacerlo con garantías: seguro, plazos y responsabilidad.
            </p>
            <h3 className="text-xl font-bold mb-3">Coste real del transporte en 2026</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Entre 700€ y 1.500€, según origen y tipo de servicio.
            </p>
            <h3 className="text-xl font-bold mb-3">Elegir opciones baratas suele acabar en</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>Retrasos de varias semanas</li>
              <li>Falta de cobertura ante daños</li>
              <li>Costes imprevistos</li>
            </ul>
            <h3 className="text-xl font-bold mb-3">En Premium German Cars gestionamos transporte profesional</h3>
            <ul className="space-y-2 text-sm">
              <li>Seguro total sin intermediarios</li>
              <li>Seguimiento 24/7</li>
              <li>Rutas optimizadas para reducir costes</li>
            </ul>
            <p className="text-gray-300 text-lg leading-relaxed mt-6">
              Aquí no está el ahorro fácil… pero sí uno de los mayores riesgos económicos.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">2. Elegir bien el coche: impacto directo en impuestos</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            No todos los coches cuestan lo mismo al importarlos, aunque el precio de compra sea similar. Actualmente hay una tendencia clara: los familiares premium están resultando más eficientes que muchos SUV.
          </p>
          <h3 className="text-xl font-bold mb-3">Muchos SUV tienen</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>Mayores emisiones de CO₂</li>
            <li>Impuestos de matriculación más altos</li>
            <li>Coste fiscal total superior</li>
          </ul>
          <h3 className="text-xl font-bold mb-3">En cambio, modelos como un BMW Serie 3 Touring suelen ofrecer</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>Menor carga fiscal</li>
            <li>Mejor eficiencia</li>
            <li>Mismo nivel de confort</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed">
            Elegir bien el modelo puede suponer un ahorro de miles de euros.
          </p>
        </section>

        <section className="bg-metallic-950 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">3. Fiscalidad en Cataluña: donde se cometen los errores más caros</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Si importas un coche a Cataluña (Barcelona, Tarragona, Reus…), este es el punto más crítico. Aquí es donde más dinero se pierde por desconocimiento.
            </p>
            <h3 className="text-xl font-bold mb-3">Impuestos clave</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>ITP (Impuesto de Transmisiones Patrimoniales)</li>
              <li>Impuesto de matriculación</li>
            </ul>
            <h3 className="text-xl font-bold mb-3">En la práctica</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>El ITP suele situarse alrededor del 5% en Cataluña, aunque puede variar según el tipo de operación</li>
              <li>El impuesto de matriculación depende principalmente de las emisiones de CO₂ del vehículo</li>
            </ul>
            <h3 className="text-xl font-bold mb-3">Riesgo importante</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Un error en la documentación técnica (CoC) o en la clasificación del vehículo puede provocar cálculo incorrecto de emisiones, aumento del impuesto y sobrecostes innecesarios.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Ejemplo real: un coche que debería pagar 1.200€ puede acabar pagando más de 2.500€ por una mala gestión.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Aquí no hay margen de error. La diferencia es directamente económica.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">4. Pegatina ambiental: clave en 2026</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            En 2026, el distintivo ambiental ya no es un detalle: es determinante. Para evitar problemas, es clave importar vehículos que cumplan normativas recientes de emisiones (como Euro 6) y que puedan acceder a distintivos ambientales favorables.
          </p>
          <h3 className="text-xl font-bold mb-3">En general</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>Vehículos gasolina modernos → etiqueta C</li>
            <li>Vehículos diésel Euro 6 → etiqueta C</li>
            <li>Híbridos → etiqueta ECO (según homologación)</li>
          </ul>
          <h3 className="text-xl font-bold mb-3">Esto permite</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>Acceso a Zonas de Bajas Emisiones (ZBE)</li>
            <li>Evitar restricciones en ciudades como Barcelona</li>
            <li>Mantener el valor de reventa</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed">
            Un coche sin etiqueta adecuada pierde valor y puede quedar limitado en uso. No es solo normativa, es una decisión estratégica.
          </p>
        </section>

        <section className="bg-metallic-900 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">5. Auditoría técnica: el mayor ahorro está en evitar errores</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Uno de los errores más comunes es confiar únicamente en la apariencia del coche. Muchos vehículos esconden fallos electrónicos, historial manipulado y problemas estructurales.
            </p>
            <h3 className="text-xl font-bold mb-3">En Premium German Cars, este análisis forma parte del proceso</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>Diagnosis avanzada</li>
              <li>Verificación de historial oficial</li>
              <li>Inspección mecánica completa</li>
            </ul>
            <p className="text-gray-300 text-lg leading-relaxed">
              Evitar un mal coche no es cuestión de suerte, sino de método.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Ejemplo real de coste total al importar un coche</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Precio en Alemania: 18.000€</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Transporte: 1.000€</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Impuestos (ITP + matriculación): 2.200€</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Gestión y trámites: 500€</p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Coste total en España: 21.700€. El coche termina costando casi 4.000€ más que el precio inicial.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mt-6">
            El precio puede aumentar entre un 15% y un 25%.
          </p>
        </section>

        <section className="bg-metallic-950 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Costes principales al importar un coche</h2>
            <ul className="space-y-2 text-sm mb-6">
              <li>Transporte: 700€ – 1.500€</li>
              <li>Impuestos: aprox. 5% + matriculación según emisiones</li>
              <li>Gestión: 300€ – 800€</li>
              <li>Revisión técnica: variable</li>
            </ul>
            <p className="text-gray-300 text-lg leading-relaxed">
              El precio del anuncio es solo una parte del coste total.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Preguntas frecuentes sobre importar coches de Alemania</h2>
          <h3 className="text-xl font-bold mb-3">¿Es rentable importar un coche en 2026?</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Sí, pero solo si se controlan todos los costes. Sin una buena gestión, el ahorro desaparece.
          </p>
          <h3 className="text-xl font-bold mb-3">¿Cuánto tarda el proceso?</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Entre 2 y 5 semanas, dependiendo de transporte y trámites.
          </p>
          <h3 className="text-xl font-bold mb-3">¿Qué coches no merece la pena importar?</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Vehículos con altas emisiones, modelos con bajo valor de mercado y coches sin historial claro.
          </p>
          <h3 className="text-xl font-bold mb-3">¿Se puede financiar un coche importado?</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Sí, dependiendo de la entidad financiera y del estado del vehículo.
          </p>
          <h3 className="text-xl font-bold mb-3">¿Qué pasa si el coche tiene un problema después de importarlo?</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            El coste de reparación puede ser elevado y difícil de reclamar si no se ha verificado correctamente en origen.
          </p>
        </section>

        <SeoIntentLinks
          title="Completa el presupuesto antes de comprar"
          intro="El coste total se entiende mejor cuando se cruza con la calculadora, el proceso de importación y los riesgos previos al pago."
          links={seoIntentLinks.cost}
        />

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Conclusión: importar bien o pagar el error</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Importar un coche de Alemania puede ser una excelente decisión… o un error costoso. La diferencia no está en encontrar un buen precio, sino en controlar todo el proceso: fiscalidad, transporte y verificación técnica.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Cuando todo está optimizado, el ahorro es real. Cuando no, el coste se multiplica.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            ¿Estás pensando en importar un coche? Antes de tomar una decisión, es clave saber el coste real de tu caso concreto.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            En Premium German Cars analizamos cada vehículo, sus impuestos y su viabilidad antes de comprarlo, para que sepas exactamente cuánto vas a pagar —sin sorpresas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/calculadora-impuesto-matriculacion"
              className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
            >
              Calcular coste real <Calculator size={16} />
            </Link>
            <a
              href="https://wa.me/34603743608?text=Hola,%20quiero%20analizar%20el%20coste%20real%20de%20importar%20un%20coche%20desde%20Alemania."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 text-white px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white hover:text-black transition-colors min-h-[48px]"
            >
              Solicitar análisis por WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default CosteImportacionAlemania;

