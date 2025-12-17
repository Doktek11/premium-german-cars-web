import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { SEO } from "../components/SEO";

export default function AvisoLegal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* 🚫 NOINDEX */}
      <SEO
        title="Aviso Legal"
        description="Aviso legal del sitio web Premium German Cars."
        noindex
      />

      <Navbar />

      <main className="min-h-screen bg-metallic-950 text-white pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* TÍTULO */}
          <h1 className="text-4xl font-serif font-bold mb-12">
            Aviso Legal
          </h1>

          {/* CONTENIDO */}
          <div className="text-gray-300 text-sm leading-relaxed space-y-10">
            {/* 1 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                1. Datos identificativos
              </h2>
              <p className="mb-4">
                En cumplimiento con lo dispuesto en la Ley 34/2002, de Servicios
                de la Sociedad de la Información y del Comercio Electrónico
                (LSSI-CE), se informa que el presente sitio web es titularidad de:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Titular:</strong> Premium German Cars
                </li>
                <li>
                  <strong>NIF / CIF:</strong> B39923112
                </li>
                <li>
                  <strong>Domicilio social:</strong> 43850 Cambrils, España
                </li>
                <li>
                  <strong>Correo electrónico:</strong>{" "}
                  info@premiumgermancars.com
                </li>
                <li>
                  <strong>Teléfono:</strong> +34 603 743 608
                </li>
              </ul>
              <p className="mt-4">(en adelante, el Titular)</p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                2. Objeto del sitio web
              </h2>
              <p className="mb-3">
                El presente sitio web tiene como finalidad:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>La comercialización de vehículos</li>
                <li>
                  La captación de encargos personalizados de vehículos importados
                  desde Alemania a España
                </li>
                <li>
                  La atención de solicitudes de información relacionadas con
                  dichos servicios
                </li>
              </ul>
              <p className="mt-4">
                La información ofrecida es meramente orientativa y no constituye
                una oferta contractual vinculante hasta la formalización expresa
                del encargo o contrato correspondiente.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                3. Condiciones de uso
              </h2>
              <p className="mb-3">
                El acceso y uso de este sitio web atribuye la condición de
                usuario, implicando la aceptación plena y sin reservas de las
                presentes condiciones.
              </p>
              <p className="mb-3">El usuario se compromete a:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Hacer un uso adecuado del sitio web y de sus contenidos
                </li>
                <li>
                  No utilizar el sitio con fines ilícitos o contrarios a la buena
                  fe
                </li>
                <li>
                  No causar daños en los sistemas del Titular o de terceros
                </li>
              </ul>
              <p className="mt-4">
                El Titular se reserva el derecho a modificar en cualquier momento
                y sin previo aviso la información contenida en el sitio web.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                4. Propiedad intelectual e industrial
              </h2>
              <p className="mb-3">
                Todos los contenidos del sitio web, incluyendo a título
                enunciativo:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Textos</li>
                <li>Imágenes</li>
                <li>Diseños</li>
                <li>Logotipos</li>
                <li>Código fuente</li>
                <li>Estructura del sitio</li>
              </ul>
              <p className="mt-4">
                son titularidad del Titular o de terceros autorizados, quedando
                prohibida su reproducción, distribución o comunicación pública
                sin autorización expresa.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                5. Responsabilidad
              </h2>
              <p className="mb-3">
                El Titular no se hace responsable de:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>El mal uso del sitio web por parte de los usuarios</li>
                <li>
                  La interrupción o mal funcionamiento del sitio web
                </li>
                <li>Errores u omisiones en los contenidos</li>
                <li>
                  Enlaces externos a terceros sobre los que no tiene control
                </li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                6. Enlaces externos
              </h2>
              <p>
                Este sitio web puede contener enlaces a páginas de terceros. El
                Titular no se responsabiliza del contenido, políticas o prácticas
                de dichos sitios externos.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                7. Protección de datos personales
              </h2>
              <p>
                El tratamiento de los datos personales del usuario se rige por
                lo dispuesto en la Política de Privacidad, conforme al
                Reglamento (UE) 2016/679 (RGPD) y demás normativa aplicable.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                8. Uso de cookies
              </h2>
              <p>
                Este sitio web no utiliza cookies propias ni de terceros. Para
                más información, el usuario puede consultar la Política de
                Cookies.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                9. Legislación aplicable y jurisdicción
              </h2>
              <p>
                La relación entre el usuario y el Titular se regirá por la
                legislación española vigente. En caso de controversia, ambas
                partes se someterán a los Juzgados y Tribunales del domicilio del
                usuario, siempre que la normativa aplicable así lo permita.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-lg font-serif font-bold text-white mb-3">
                10. Contacto
              </h2>
              <p>
                Para cualquier duda o consulta relacionada con el presente Aviso
                Legal, el usuario puede contactar a través de:
              </p>
              <p className="mt-2">
                📧 <strong>info@premiumgermancars.com</strong>
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
