import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ImportForm } from "../components/ImportForm";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export default function ImportarCocheAlemania() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Importación de coches desde Alemania | Premium German Cars"
        description="Especialistas en la importación de coches premium desde Alemania a España. Servicio llave en mano, verificación, transporte, homologación y matriculación."
        canonical="https://www.premiumgermancars.com/importar-coche-alemania"
      />

      <Navbar />

      <main className="bg-metallic-950 text-white">
        {/* HERO */}
        <section className="pt-40 pb-24">
          <div className="container mx-auto px-6 max-w-4xl text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">
              Importación de coches premium desde Alemania a España
            </h1>

            <h2 className="text-gold-400 text-xl font-serif">
              Servicio llave en mano, seguro y transparente
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              En <strong>Premium German Cars</strong> somos especialistas en la
              importación de coches desde Alemania a España. Ayudamos a clientes
              exigentes a acceder al mayor mercado europeo de vehículos premium,
              eliminando riesgos, barreras burocráticas y sobrecostes.
            </p>

            <p className="text-gray-400 text-sm">
              ✔ Kilómetros certificados · ✔ Historial verificado · ✔ Gestión
              integral · ✔ Entrega lista para circular
            </p>

            <a
              href="#form"
              className="inline-block mt-6 px-10 py-4 border border-gold-400 text-gold-400 font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-black transition"
            >
              Solicitar asesoramiento
            </a>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="py-32 bg-metallic-900">
          <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Mercado alemán
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Alemania es el mercado automotriz más potente de Europa, con un
                stock muy superior al español, mejor mantenimiento y mayor
                equipamiento en marcas premium.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Importación a la carta
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Actuamos como bróker de coches en Alemania, buscando la unidad
                exacta según marca, modelo, presupuesto, motor y equipamiento.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-4 text-gold-400">
                Compra 100% segura
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Verificamos historial, kilometraje y estado mecánico antes de
                cerrar cualquier operación para evitar fraudes.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESO */}
        <section className="py-32">
          <div className="container mx-auto px-6 max-w-4xl space-y-12">
            <h2 className="text-3xl font-serif font-bold text-center">
              ¿Cómo importar un coche desde Alemania con seguridad?
            </h2>

            <ol className="space-y-8 text-gray-300 leading-relaxed">
              <li>
                <strong>1. Búsqueda y asesoramiento personalizado.</strong>{" "}
                Analizamos tus necesidades y filtramos el mercado alemán para
                encontrar la unidad ideal.
              </li>
              <li>
                <strong>2. Verificación técnica y revisión del historial.</strong>{" "}
                Comprobamos libro de mantenimiento, accidentes y kilometraje.
              </li>
              <li>
                <strong>3. Negociación y compra segura.</strong> Gestión directa
                con proveedores contrastados.
              </li>
              <li>
                <strong>4. Transporte asegurado.</strong> Camiones
                portavehículos con seguro a todo riesgo.
              </li>
              <li>
                <strong>5. Homologación e impuestos.</strong> ITV, ficha técnica
                e impuestos gestionados.
              </li>
              <li>
                <strong>6. Matriculación y entrega.</strong> Vehículo listo para
                circular.
              </li>
            </ol>
          </div>
        </section>

        {/* COSTES */}
        <section className="py-32 bg-metallic-900">
          <div className="container mx-auto px-6 max-w-4xl space-y-8">
            <h2 className="text-3xl font-serif font-bold text-center">
              ¿Cuánto cuesta importar un coche desde Alemania?
            </h2>

            <p className="text-gray-300 leading-relaxed">
              El coste depende del precio del vehículo, tipo de factura,
              emisiones de CO₂, transporte y trámites administrativos.
            </p>

            <p className="text-gray-300 leading-relaxed">
              De forma orientativa, el coste total suele situarse entre{" "}
              <strong>2.500 € y 4.500 €</strong>, siempre con presupuesto cerrado.
            </p>
          </div>
        </section>

        {/* FORM */}
        <section id="form" className="py-32">
          <div className="container mx-auto px-6 max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-serif font-bold">
              Solicita tu presupuesto de importación a medida
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Cuéntanos qué coche quieres importar y te ayudamos sin compromiso.
            </p>

            <ImportForm />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

