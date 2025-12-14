import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export const PoliticaPrivacidad: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 🚫 NOINDEX TOTAL */}
      <SEO
        title="Política de Privacidad"
        description="Política de privacidad y protección de datos."
        noindex
      />

      <Navbar />

      <main className="bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl text-gray-300 leading-relaxed space-y-10">
          <h1 className="text-4xl font-serif font-bold text-white">
            Política de Privacidad
          </h1>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              1. Responsable del tratamiento
            </h2>
            <ul className="list-disc list-inside">
              <li><strong>Responsable:</strong> Premium German Cars</li>
              <li><strong>NIF / CIF:</strong> B39923112</li>
              <li><strong>Email:</strong> info@premiumgermancars.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              2. Datos personales
            </h2>
            <p>
              Se recogen los datos personales facilitados voluntariamente por el
              usuario a través de formularios o medios de contacto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              3. Finalidad del tratamiento
            </h2>
            <p>
              Gestionar solicitudes de información y encargos relacionados con
              la importación de vehículos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-white mb-3">
              4. Derechos del usuario
            </h2>
            <p>
              El usuario puede ejercer sus derechos escribiendo a{" "}
              <strong>info@premiumgermancars.com</strong>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

