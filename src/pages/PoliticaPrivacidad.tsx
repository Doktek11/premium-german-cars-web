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
          <h1 className="text-4xl font-serif font-bold mb-16">
            Política de Privacidad
          </h1>

          {/* CONTENIDO */}
          <div className="space-y-12 text-sm md:text-base text-gray-300 leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                1. Responsable del tratamiento
              </h2>
              <p className="mb-4">
                En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679
                (RGPD), se informa de que:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Responsable:</strong> Premium German Cars
                </li>
                <li>
                  <strong>NIF / CIF:</strong> B39923112
                </li>
                <li>
                  <strong>Correo electrónico:</strong>{" "}
                  info@premiumgermancars.com
                </li>
              </ul>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                2. Datos personales tratados
              </h2>
              <p className="mb-4">
                A través del presente sitio web se recogen únicamente los datos
                personales que el usuario facilita de forma voluntaria mediante:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Formularios de contacto</li>
                <li>Formularios de solicitud de importación o presupuesto</li>
                <li>
                  Comunicaciones por correo electrónico, teléfono o WhatsApp
                </li>
              </ul>
              <p className="mb-2">Los datos tratados pueden incluir:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Información relacionada con el vehículo solicitado</li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                3. Finalidad del tratamiento
              </h2>
              <p className="mb-4">
                Los datos personales facilitados por el usuario serán tratados
                con las siguientes finalidades:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Gestionar solicitudes de información</li>
                <li>
                  Atender encargos de importación de vehículos desde Alemania
                </li>
                <li>Elaborar presupuestos personalizados</li>
                <li>
                  Mantener comunicaciones comerciales relacionadas con los
                  servicios solicitados
                </li>
              </ul>
              <p className="mt-4">
                En ningún caso los datos serán utilizados para finalidades
                distintas de las aquí descritas.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                4. Base legal para el tratamiento
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  El consentimiento expreso del usuario otorgado al enviar
                  formularios o contactar voluntariamente
                </li>
                <li>
                  La ejecución de medidas precontractuales o contractuales
                </li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                5. Conservación de los datos
              </h2>
              <p>
                Los datos personales se conservarán durante el tiempo necesario
                para cumplir con la finalidad para la que fueron recabados y,
                posteriormente, durante los plazos legalmente exigidos.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                6. Destinatarios de los datos
              </h2>
              <p>
                Los datos personales no serán cedidos a terceros, salvo obligación
                legal o cuando sea necesario para la correcta prestación del
                servicio (gestorías, transporte, trámites administrativos).
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                7. Derechos del usuario
              </h2>
              <p className="mb-4">
                El usuario puede ejercer los siguientes derechos:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Acceso</li>
                <li>Rectificación</li>
                <li>Supresión</li>
                <li>Oposición</li>
                <li>Limitación del tratamiento</li>
                <li>Portabilidad</li>
              </ul>
              <p>
                Para ejercerlos, deberá enviar una solicitud a{" "}
                <strong className="text-white">
                  info@premiumgermancars.com
                </strong>
                .
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                8. Medidas de seguridad
              </h2>
              <p>
                El Responsable adopta las medidas técnicas y organizativas
                necesarias para garantizar la seguridad y confidencialidad de
                los datos personales.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                9. Uso de cookies
              </h2>
              <p>
                Este sitio web no utiliza cookies propias ni de terceros. En caso
                de incorporarse en el futuro, se informará debidamente al
                usuario.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                10. Cambios en la política de privacidad
              </h2>
              <p>
                El Responsable se reserva el derecho a modificar la presente
                Política de Privacidad para adaptarla a novedades legislativas o
                cambios en el sitio web.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-4">
                11. Autoridad de control
              </h2>
              <p>
                El usuario puede presentar una reclamación ante la Agencia
                Española de Protección de Datos (AEPD) a través de{" "}
                <span className="underline">www.aepd.es</span>.
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
