import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { Shield, Lock } from "lucide-react";

const PoliticaPrivacidad = () => {
  return (
    <>
      <SEO
        title="Política de Privacidad | Premium German Cars"
        description="Información sobre tratamiento de datos personales, Asistente PGC y GPT Action."
        canonical="https://www.premiumgermancars.com/politica-privacidad"
        noIndex={true}
      />
      <Navbar />

      <main className="bg-black text-white pt-40 pb-20 font-sans">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
            <Lock className="text-gold-400 opacity-50" size={24} />
            <h1 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Política de Privacidad</h1>
          </div>

          <div className="text-sm text-gray-400 leading-relaxed text-justify space-y-8">
            <section className="bg-white/5 p-6 rounded-sm border border-white/5">
              <h2 className="text-xs font-bold text-gold-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} /> Responsable del tratamiento
              </h2>
              <div className="text-xs space-y-1">
                <p><span className="text-gray-500 font-semibold w-24 inline-block">ENTIDAD:</span> Premium German Cars</p>
                <p><span className="text-gray-500 font-semibold w-24 inline-block">NIF:</span> B39923112</p>
                <p><span className="text-gray-500 font-semibold w-24 inline-block">DIRECCIÓN:</span> Cambrils 43850, Tarragona</p>
                <p><span className="text-gray-500 font-semibold w-24 inline-block">CONTACTO:</span> info@premiumgermancars.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">1. Finalidad del tratamiento</h2>
              <p>
                Los datos personales facilitados a través de formularios de contacto, correos electrónicos, WhatsApp u otros canales de comunicación se tratan para gestionar solicitudes de información, asesoramiento técnico, presupuestos personalizados y servicios relacionados con la importación, revisión, fiscalidad y matriculación de vehículos.
              </p>
              <p className="mt-4">
                Premium German Cars no toma decisiones automatizadas con efectos jurídicos sobre el usuario. Las estimaciones fiscales son orientativas y pueden requerir revisión profesional, documentación adicional o confirmación por la administración competente.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">2. Asistente PGC y GPT Action fiscal</h2>
              <p>
                El Asistente PGC puede ayudar a preparar una estimación fiscal reducida para vehículos mediante una GPT Action conectada al endpoint <strong>/api/vehicle-tax-estimate-action</strong>. Esta Action solo necesita datos estructurados y mínimos del expediente fiscal, no documentos completos.
              </p>
              <p className="mt-4">
                Las categorías de datos previstas para esa estimación son datos técnicos y fiscales del vehículo, operación y destino: categoría, combustible, cilindrada, potencia fiscal, fechas de primera matriculación y matriculación en España, estado del vehículo, CO2, normativa de emisiones, condición de cero emisiones, valor fiscal BOE y año, fecha y precio de operación, divisa, país de compra, tipo documental, tipo de vendedor y comprador, régimen de IVA, REBU, destino autonómico/provincial/municipal, territorio foral y fecha prevista de liquidación.
              </p>
              <p className="mt-4">
                La Action debe usar identificadores opacos y no debe enviar nombres, apellidos, DNI, NIE, NIF, CIF, correo electrónico, teléfono, dirección postal, IBAN, firma, VIN completo, matrícula, documentos, binarios, OCR, texto bruto, fragmentos documentales, rutas locales, URLs privadas, credenciales ni secretos.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">3. Base jurídica</h2>
              <p>
                La base legal para atender solicitudes es el consentimiento del interesado al contactar con nosotros o remitir información, así como la aplicación de medidas precontractuales solicitadas por el usuario. Cuando sea necesario, Premium German Cars también podrá tratar datos para cumplir obligaciones legales o por interés legítimo en mantener la seguridad del servicio, prevenir abusos y conservar trazabilidad técnica razonable.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">4. Conservación</h2>
              <p>
                Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que se recabaron y para atender posibles responsabilidades legales, fiscales, contractuales o de seguridad. La GPT Action fiscal no está diseñada para guardar deliberadamente el cuerpo estructurado de la solicitud en una base de datos de Premium German Cars, aunque los proveedores tecnológicos pueden tratar metadatos técnicos o registros operativos conforme a sus propias políticas y contratos aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">5. Destinatarios y proveedores</h2>
              <p>
                No se cederán datos a terceros ajenos a Premium German Cars salvo obligación legal o cuando sea necesario para prestar el servicio solicitado. En procesos de importación y matriculación pueden comunicarse solo los datos necesarios a gestorías, transportistas, ITV, administraciones u organismos competentes.
              </p>
              <p className="mt-4">
                Para el Asistente PGC y la GPT Action pueden intervenir proveedores tecnológicos como OpenAI, cuando el usuario conversa con ChatGPT o autoriza una Action, y Vercel, como infraestructura de alojamiento, funciones serverless y servicios técnicos del sitio. Estos proveedores tratan la información conforme a sus propias condiciones, políticas y acuerdos aplicables.
              </p>
              <p className="mt-4">
                OpenAI/ChatGPT procesa la conversación conforme a sus propias políticas y controles. Premium German Cars recibe únicamente el DTO fiscal estructurado que la GPT Action transmite al endpoint de PGC, y no controla toda la conservación interna de las conversaciones o datos dentro de ChatGPT/OpenAI. Para consultar, gestionar o solicitar la supresión de datos conservados exclusivamente por OpenAI, el usuario debe utilizar los controles y canales oficiales de OpenAI, sin que esta política anticipe un resultado concreto de esas solicitudes: <a href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">política de privacidad de OpenAI</a> y <a href="https://privacy.openai.com/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">portal de privacidad de OpenAI</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">6. Transferencias internacionales</h2>
              <p>
                En función de la configuración del servicio y de los proveedores tecnológicos utilizados, ciertos datos o metadatos técnicos pueden ser tratados fuera del Espacio Económico Europeo. Cuando resulte aplicable, dicho tratamiento deberá apoyarse en garantías reconocidas por la normativa de protección de datos, como decisiones de adecuación, cláusulas contractuales tipo u otros mecanismos válidos.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">7. Derechos del usuario</h2>
              <p className="mb-4">
                Usted puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad y, cuando proceda, a no ser objeto de decisiones individuales automatizadas. También puede presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 underline underline-offset-4">Agencia Española de Protección de Datos (AEPD)</a> si considera que el tratamiento no se ajusta a la normativa.
              </p>
              <p className="bg-white/5 p-4 italic text-xs">
                Para ejercer estos derechos, puede enviar un correo electrónico a <strong>info@premiumgermancars.com</strong>. Premium German Cars podrá solicitar información adicional estrictamente necesaria para verificar su identidad antes de atender la solicitud.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">8. Seguridad y minimización</h2>
              <p>
                Premium German Cars aplica medidas técnicas y organizativas orientadas a evitar pérdida, uso indebido, alteración o acceso no autorizado a los datos personales. En la GPT Action fiscal se aplica un criterio de minimización: enviar solo los campos estructurados necesarios para calcular u orientar la fiscalidad del vehículo, sin incluir documentos ni identificadores personales.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-white/10 text-center opacity-40">
              <p className="text-[10px] uppercase tracking-[0.2em]">Última actualización: 2 de agosto de 2026</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PoliticaPrivacidad;
