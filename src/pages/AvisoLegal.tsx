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
      {/* 🚫 NOINDEX TOTAL */}
      <SEO
        title="Aviso Legal"
        description="Aviso legal del sitio web Premium German Cars."
        noindex
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl text-gray-300 leading-relaxed space-y-10">
          <h1 className="text-4xl font-serif font-bold text-white">
            Aviso Legal
          </h1>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              1. Datos identificativos
            </h2>
            <ul className="list-disc list-inside">
              <li><strong>Titular:</strong> Premium German Cars</li>
              <li><strong>NIF / CIF:</strong> B39923112</li>
              <li><strong>Domicilio social:</strong> 43850 Cambrils, España</li>
              <li><strong>Email:</strong> info@premiumgermancars.com</li>
              <li><strong>Teléfono:</strong> +34 603 743 608</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              2. Objeto del sitio web
            </h2>
            <p>
              El presente sitio web tiene como finalidad la comercialización de
              vehículos, la captación de encargos personalizados de importación
              de vehículos desde Alemania a España y la atención de solicitudes
              de información relacionadas con dichos servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              3. Condiciones de uso
            </h2>
            <p>
              El acceso y uso del sitio web atribuye la condición de usuario,
              implicando la aceptación plena y sin reservas de las presentes
              condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              4. Propiedad intelectual
            </h2>
            <p>
              Todos los contenidos del sitio web son titularidad del Titular o de
              terceros autorizados, quedando prohibida su reproducción sin
              autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              5. Legislación aplicable
            </h2>
            <p>
              La relación entre el usuario y el Titular se regirá por la
              legislación española vigente.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};
