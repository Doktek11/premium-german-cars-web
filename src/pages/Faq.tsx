import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export default function Faq() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Preguntas frecuentes sobre importar coches de Alemania"
        description="Resolvemos las dudas más comunes sobre importar coches de Alemania a España: IVA, impuestos, plazos, garantías y proceso completo."
      />

      <Navbar />

      <main className="min-h-screen bg-metallic-950 pt-32 pb-32 text-white">
        <div className="container mx-auto px-6 max-w-4xl space-y-16">

          <header>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Preguntas frecuentes sobre importar coches de Alemania
            </h1>
            <p className="text-white/80 leading-relaxed">
              En esta sección resolvemos las dudas más habituales de nuestros
              clientes antes de importar un coche desde Alemania a España.
            </p>
          </header>

          <section className="space-y-10 text-white/90 leading-relaxed text-sm">
            <article>
              <h2 className="text-xl font-serif font-bold text-white mb-3">
                ¿Es seguro importar un coche desde Alemania?
              </h2>
              <p>
                Sí, siempre que el proceso se realice con profesionales.
                Alemania cuenta con uno de los mercados más transparentes y
                regulados de Europa. En Premium German Cars verificamos historial,
                kilometraje, estado mecánico y documentación antes de cualquier
                compra.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-serif font-bold text-white mb-3">
                ¿Tengo que pagar IVA en España?
              </h2>
              <p>
                Depende del tipo de vehículo y del comprador. Para particulares,
                el IVA suele estar incluido en el precio alemán o bajo régimen
                REBU. Para empresas y autónomos, en determinados casos es posible
                adquirir el vehículo sin IVA intracomunitario.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-serif font-bold text-white mb-3">
                ¿Cuánto tarda el proceso completo?
              </h2>
              <p>
                El plazo medio suele estar entre 15 y 20 días desde la reserva
                del vehículo hasta su matriculación definitiva en España,
                dependiendo de la logística y la documentación.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-serif font-bold text-white mb-3">
                ¿Qué incluye el servicio de importación?
              </h2>
              <p>
                Incluye búsqueda personalizada, negociación, revisión técnica,
                contrato de compraventa, transporte asegurado, ITV, impuestos,
                matriculación y entrega del vehículo listo para circular.
              </p>
            </article>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
