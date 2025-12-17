import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export default function PoliticaPrivacidad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 🚫 NOINDEX */}
      <SEO
        title="Política de Privacidad"
        description="Política de privacidad del sitio web Premium German Cars."
        noindex
      />

      <Navbar />

      <main className="min-h-screen bg-metallic-950 pt-32 pb-32 text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* TÍTULO */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-16">
            Política de Privacidad
          </h1>

          {/* CONTENIDO */}
          <div className="space-y-12 text-white leading-relaxed">
            <section>
              <h2 className="text-xl font-serif font-bold mb-4">
                1. Responsable del tratamiento
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Responsable:</strong> Premium German Cars
                </li>
                <li>
                  <strong>NIF / CIF:</strong> B39923112
                </li>
                <li>
                  <strong>Email:</strong> info@premiumgermancars.com
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold mb-4">
                2. Datos personales
              </h2>
              <p className="text-white/90">
                Se recogen únicamente los datos personales facilitados de forma
                voluntaria por el usuario a través de los formularios o medios de
                contacto disponibles en el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold mb-4">
                3. Finalidad del tratamiento
              </h2>
              <p className="text-white/90">
                Los datos personales se utilizan exclusivamente para gestionar
                solicitudes de información y encargos relacionados con la
                importación de vehículos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-bold mb-4">
                4. Derechos del usuario
              </h2>
              <p className="text-white/90">
                El usuario puede ejercer sus derechos de acceso, rectificación,
                supresión, oposición, limitación y portabilidad enviando una
                solicitud a{" "}
                <strong className="text-white">
                  info@premiumgermancars.com
                </strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

