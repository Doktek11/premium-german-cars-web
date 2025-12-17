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
              <span className="block text-gold-400 mt-4">
                Servicio llave en mano, seguro y transparente
              </span>
            </h1>

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
                encontrar la unidad ideal (BMW, Audi, Mercedes-Benz, Porsche,
                Volkswagen, entre otras).
              </li>

              <li>
                <strong>2. Verificación técnica y revisión del historial.</strong>{" "}
                Comprobamos libro de mantenimiento, accidentes, propietarios y
                kilometraje real antes de cualquier pago.
              </li>

              <li>
                <strong>3. Negociación y gestión de compra segura.</strong>{" "}
                Negociamos directamente con concesionarios oficiales o
                proveedores contrastados, asegurando documentación correcta
                para exportación.
              </li>

              <li>
                <strong>4. Transporte profesional asegurado.</strong>{" "}
                Organizamos el transporte mediante camiones portavehículos con
                seguro a todo riesgo hasta España.
              </li>

              <li>
                <strong>5. Homologación, ITV e impuestos.</strong>{" "}
                Gestionamos ficha técnica reducida, ITV de matriculación e
                impuestos como el Impuesto de Matriculación y el IEDMT.
              </li>

              <li>
                <strong>6. Matriculación y entrega final.</strong>{" "}
                Entregamos el vehículo matriculado, con placas españolas
                definitivas y toda la documentación a tu nombre.
              </li>
            </ol>

            <div className="text-center pt-10">
              <a
                href="#form"
                className="inline-block px-8 py-3 border border-gold-400 text-gold-400 text-sm font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-black transition"
              >
                Quiero importar mi coche
              </a>
            </div>
          </div>
        </section>

        {/* COSTES */}
        <section className="py-32 bg-metallic-900">
          <div className="container mx-auto px-6 max-w-4xl space-y-8">
            <h2 className="text-3xl font-serif font-bold text-center">
              ¿Cuánto cuesta importar un coche desde Alemania?
            </h2>

            <p className="text-gray-300 leading-relaxed">
              El coste de importar un coche desde Alemania depende de varios
              factores como el precio del vehículo, el tipo de factura (IVA o
              REBU), las emisiones de CO₂, el transporte y los trámites
              administrativos.
            </p>

            <p className="text-gray-300 leading-relaxed">
              De forma orientativa, el coste total del servicio de importación
              suele situarse entre <strong>2.500 € y 4.500 €</strong>, dependiendo
              de la complejidad del expediente. En Premium German Cars trabajamos
              siempre con presupuestos cerrados y sin gastos ocultos.
            </p>
          </div>
        </section>

        {/* FORMULARIO */}
        <section id="form" className="py-32">
          <div className="container mx-auto px-6 max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-serif font-bold">
              Solicita tu presupuesto de importación a medida
            </h2>

            <p className="text-gray-300 leading-relaxed">
              ¿Tienes en mente un modelo concreto o buscas asesoramiento?
              Cuéntanos qué coche quieres importar y te ayudamos sin
              compromiso.
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
