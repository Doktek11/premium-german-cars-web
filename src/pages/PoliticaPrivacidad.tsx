import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export const AvisoLegal: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Aviso Legal | Premium German Cars"
        description="Aviso legal del sitio web Premium German Cars."
        noindex
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl text-gray-300 leading-relaxed space-y-8">
          <h1 className="text-4xl font-serif font-bold text-white">
            Aviso Legal
          </h1>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              1. Datos identificativos
            </h2>
            <p>
              En cumplimiento con la Ley 34/2002, de Servicios de la Sociedad de la
              Información y del Comercio Electrónico (LSSI-CE), se informa que
              este sitio web es titularidad de:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li><strong>Titular:</strong> PremiumGermanCars</li>
              <li><strong>NIF / CIF:</strong> B39923112</li>
              <li><strong>Domicilio social:</strong> 43850</li>
              <li><strong>Email:</strong> info@premiumgermancars.com</li>
              <li><strong>Teléfono:</strong> 603743608</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              2. Objeto del sitio web
            </h2>
            <p>
              El presente sitio web tiene como finalidad la comercialización de
              vehículos, la captación de encargos personalizados de vehículos
              importados desde Alemania a España y la atención de solicitudes de
              información relacionadas con dichos servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              3. Condiciones de uso
            </h2>
            <p>
              El acceso y uso del sitio web atribuye la condición de usuario,
              implicando la aceptación plena de las presentes condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              4. Propiedad intelectual e industrial
            </h2>
            <p>
              Todos los contenidos del sitio web son titularidad del Titular o de
              terceros autorizados, quedando prohibida su reproducción sin
              autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              5. Responsabilidad
            </h2>
            <p>
              El Titular no se hace responsable del mal uso del sitio web ni de
              posibles errores u omisiones en los contenidos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              6. Legislación aplicable
            </h2>
            <p>
              La relación entre el usuario y el Titular se regirá por la
              legislación española vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-2">
              7. Contacto
            </h2>
            <p>
              Para cualquier duda o consulta puede contactar en{" "}
              <strong>info@premiumgermancars.com</strong>
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
