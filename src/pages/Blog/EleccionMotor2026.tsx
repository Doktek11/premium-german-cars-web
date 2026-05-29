import React, { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { SEO } from "../../components/SEO";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const EleccionMotor2026: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Diésel o Gasolina en 2026: Qué Motor Conviene Según Tu Uso | Guía PGC"
        description="Guía comparativa 2026 de diésel vs gasolina: cuándo conviene cada motor, costes fiscales y cómo decidir según tu uso real."
        canonical="https://www.premiumgermancars.com/blog/que-motor-elegir-importar-alemania-2026"
        article={true}
        image="/logoPGC.svg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Diésel o Gasolina en 2026: Qué Motor Conviene Según Tu Uso",
          description:
            "Guía comparativa 2026 de diésel vs gasolina: cuándo conviene cada motor, costes fiscales y cómo decidir según tu uso real.",
          image: ["https://www.premiumgermancars.com/logoPGC.svg"],
          datePublished: "2026-03-27",
          dateModified: "2026-04-08",
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
            "@id": "https://www.premiumgermancars.com/blog/que-motor-elegir-importar-alemania-2026",
          },
        }}
      />

      <Navbar />

      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <section className="container mx-auto px-4 sm:px-6 max-w-4xl text-center mb-14 sm:mb-18 md:mb-22">
          <span className="text-gold-400 text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            Guía 2026
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Diésel o Gasolina en 2026: qué motor conviene según tu uso
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Guía práctica para decidir entre diésel o gasolina en 2026 con foco en uso real, fiscalidad y valor futuro del vehículo.
          </p>
          <p className="text-sm text-gray-400 mt-5">
            Si quieres el cálculo exacto, usa la{" "}
            <Link to="/calculadora-impuesto-matriculacion" className="text-gold-400 hover:text-white transition-colors">
              calculadora de impuesto diésel o gasolina
            </Link>.
          </p>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Con las Zonas de Bajas Emisiones (ZBE) activas en la mayoría de ciudades, elegir mal el motor puede significar restricciones de circulación, pérdida de valor del coche y pagar más impuestos de los necesarios.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Elegir mal el motor no es solo una cuestión técnica, es una decisión económica.
          </p>
        </section>

        <section className="bg-metallic-900 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">¿Qué motor es mejor en 2026: diésel, gasolina o híbrido?</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">La respuesta correcta depende de una sola cosa: tu uso real del coche.</p>
            <p className="text-gray-300 text-lg leading-relaxed">El mejor motor no es el más potente ni el más moderno, es el que mejor encaja con tu uso diario.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">¿Qué motor elegir en 2026 según tu uso?</h2>
          <ul className="space-y-2 text-sm mb-6">
            <li>Uso urbano diario → híbrido o MHEV (Etiqueta ECO o 0).</li>
            <li>Uso mixto (ciudad + carretera) → MHEV (mejor equilibrio).</li>
            <li>Más de 20.000 km/año → diésel moderno.</li>
            <li>Uso diario con posibilidad de carga → híbrido enchufable (PHEV).</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Elegir correctamente el motor según tu uso puede ahorrarte miles de euros a medio plazo.</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Antes de decidir qué motor elegir en 2026, es clave entender el impacto real en impuestos, consumo y coste de importación.</p>
          <Link
            to="/calculadora-impuesto-matriculacion"
            className="inline-flex items-center gap-2 text-gold-400 font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
          >
            Calcular impuesto diésel o gasolina <ArrowRight size={16} />
          </Link>
        </section>

        <section className="bg-metallic-950 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-8">Comparativa de motores en 2026: diésel vs gasolina vs híbrido</h2>
            <div className="overflow-x-auto border border-white/10">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-300">
                  <tr>
                    <th className="py-3 px-4">Motor</th>
                    <th className="py-3 px-4">Mejor uso</th>
                    <th className="py-3 px-4">Etiqueta</th>
                    <th className="py-3 px-4">Coste fiscal</th>
                    <th className="py-3 px-4">Recomendación</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Diésel", "Autopista / muchos km", "C", "Bajo-medio", "Ideal para largos recorridos"],
                    ["MHEV", "Uso mixto", "ECO", "Medio", "Mejor equilibrio general"],
                    ["PHEV", "Ciudad + carga", "0", "Muy bajo", "Máximo ahorro si se usa bien"],
                    ["Gasolina", "Uso ocasional", "C", "Alto", "Opción emocional"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-white/10">
                      {row.map((cell) => (
                        <td key={cell} className="py-3 px-4 text-gray-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-8">Tipos de motor en 2026: cuál elegir según tu caso</h2>
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-bold mb-3">1. Diésel moderno: el rey de la autopista</h3>
              <p className="text-gray-300 text-base mb-4">El mercado alemán sigue siendo el mejor lugar para encontrar diésel Euro 6d en excelente estado.</p>
              <h4 className="text-base font-bold mb-2">Cuándo elegir diésel en 2026</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>Viajes largos frecuentes.</li>
                <li>Más de 20.000 km al año.</li>
                <li>Uso principalmente en carretera.</li>
              </ul>
              <h4 className="text-base font-bold mb-2">Características</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>Etiqueta DGT: C.</li>
                <li>Impuesto de matriculación: ~4,75%.</li>
              </ul>
              <p className="text-gray-300 text-base">Es la opción más eficiente para hacer kilómetros, pero no para ciudad.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">2. Mild Hybrid (MHEV): el equilibrio más inteligente</h3>
              <p className="text-gray-300 text-base mb-4">Es, en la práctica, la mejor opción para la mayoría de conductores.</p>
              <h4 className="text-base font-bold mb-2">Ventajas</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>Etiqueta ECO.</li>
                <li>Acceso a ZBE.</li>
                <li>Menor consumo en uso real.</li>
              </ul>
              <p className="text-gray-300 text-base">Es el punto medio ideal entre coste, uso diario y valor futuro.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">3. Híbrido enchufable (PHEV): el mayor ahorro fiscal</h3>
              <p className="text-gray-300 text-base mb-4">Si puedes cargarlo con frecuencia, es el motor más eficiente económicamente.</p>
              <h4 className="text-base font-bold mb-2">Ventajas</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>Impuesto de matriculación: 0%.</li>
                <li>Etiqueta 0 emisiones.</li>
                <li>Acceso total a ciudades.</li>
              </ul>
              <p className="text-gray-300 text-base mb-4">Solo tiene sentido si se carga regularmente.</p>
              <p className="text-gray-300 text-base">Bien utilizado, es el motor con mayor ahorro total.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">4. Gasolina en 2026: sensaciones con mayor coste</h3>
              <p className="text-gray-300 text-base mb-4">El motor gasolina sigue teniendo su espacio, especialmente en vehículos más exclusivos.</p>
              <h4 className="text-base font-bold mb-2">Ventajas</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>Conducción más refinada.</li>
                <li>Menor complejidad técnica.</li>
              </ul>
              <h4 className="text-base font-bold mb-2">Inconvenientes</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>Impuesto más alto (9,75% – 14,75%).</li>
                <li>Mayor consumo.</li>
              </ul>
              <p className="text-gray-300 text-base">Es una elección más emocional, con impacto económico mayor.</p>
            </div>
          </div>
        </section>

        <section className="bg-metallic-900 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">El error más común al elegir motor en 2026</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">Elegir sin tener en cuenta el uso real del coche.</p>
            <ul className="space-y-2 text-sm mb-6">
              <li>Comprar diésel para ciudad.</li>
              <li>Elegir gasolina sin valorar impuestos.</li>
              <li>Ignorar la etiqueta ambiental.</li>
            </ul>
            <p className="text-gray-300 text-lg leading-relaxed">Estos errores pueden suponer miles de euros en costes adicionales.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Cuánto cuesta elegir mal el motor en 2026</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Una mala decisión puede provocar:</p>
          <ul className="space-y-2 text-sm mb-6">
            <li>Hasta un 10% más en impuestos.</li>
            <li>Restricciones en ciudades con ZBE.</li>
            <li>Menor valor de reventa.</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Ejemplo real: un cliente que hacía unos 12.000 km anuales en ciudad eligió diésel por precio. En menos de 2 años tuvo problemas con el filtro de partículas y perdió valor en reventa.</p>
          <p className="text-gray-300 text-lg leading-relaxed">Elegir mal el motor se paga durante años.</p>
        </section>

        <section className="bg-metallic-950 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Qué motor mantiene mejor el valor en España</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">Actualmente, los motores que mejor conservan su valor son:</p>
            <ul className="space-y-2 text-sm mb-6">
              <li>Híbridos (HEV y PHEV).</li>
              <li>MHEV con etiqueta ECO.</li>
            </ul>
            <p className="text-gray-300 text-lg leading-relaxed">Porque combinan acceso a ciudad, menor presión fiscal y mayor demanda futura.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Cómo elegimos el motor adecuado en Premium German Cars</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">En Premium German Cars analizamos cada operación teniendo en cuenta:</p>
          <ul className="space-y-2 text-sm mb-6">
            <li>Uso real del cliente.</li>
            <li>Kilómetros anuales.</li>
            <li>Fiscalidad en España.</li>
            <li>Etiqueta ambiental.</li>
            <li>Coste total de importación.</li>
          </ul>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">No recomendamos coches. Recomendamos decisiones correctas.</p>
          <p className="text-gray-300 text-lg leading-relaxed">
            También puedes ver qué coches son mejores para importar de Alemania en 2026 según su motor y valor de reventa.
          </p>
        </section>

        <section className="bg-metallic-900 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Preguntas frecuentes sobre qué motor elegir en 2026</h2>
            <h3 className="text-xl font-bold mb-3">¿Qué motor elegir en 2026: diésel o híbrido?</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">Depende del uso. Para ciudad, híbrido. Para carretera, diésel.</p>
            <h3 className="text-xl font-bold mb-3">¿Qué motor es más rentable en 2026?</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">En la mayoría de casos, MHEV o híbrido por su equilibrio entre coste, consumo y fiscalidad.</p>
            <h3 className="text-xl font-bold mb-3">¿Compensa un híbrido enchufable?</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">Sí, si puedes cargarlo a diario. Si no, pierde gran parte de su ventaja.</p>
            <h3 className="text-xl font-bold mb-3">¿Los motores gasolina van a desaparecer?</h3>
            <p className="text-gray-300 text-lg leading-relaxed">No a corto plazo, pero tienen mayor presión fiscal y menor eficiencia.</p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">Conclusión: elegir motor en 2026 es elegir coste futuro</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Elegir qué motor comprar en 2026 no es una cuestión de gustos, sino de estrategia.</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">Una buena elección significa menos impuestos, mayor libertad de uso y mejor valor de reventa. Una mala elección se paga durante años.</p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Analizamos tu caso (uso, kilómetros, ciudad) y te recomendamos el motor y el coche exactos que mejor encajan contigo. Solicita asesoramiento personalizado antes de comprar y evita errores caros desde el principio.
          </p>
          <a
            href="https://wa.me/34603743608?text=Hola,%20quiero%20asesoramiento%20para%20elegir%20el%20motor%20adecuado%20en%202026."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-400 text-black px-6 py-4 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-white transition-colors min-h-[48px]"
          >
            Solicitar asesoramiento por WhatsApp <ArrowRight size={16} />
          </a>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default EleccionMotor2026;
