import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { Shield, Lock } from "lucide-react";

const PoliticaPrivacidad = () => {
  return (
    <>
      <SEO 
        title="Política de Privacidad | Premium German Cars"
        description="Información sobre el tratamiento de datos personales."
        noIndex={true} 
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20 font-sans">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Título Discreto */}
          <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
            <Lock className="text-gold-400 opacity-50" size={24} />
            <h1 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Política de Privacidad</h1>
          </div>

          {/* Cuerpo de texto reducido (text-sm) */}
          <div className="text-sm text-gray-400 leading-relaxed text-justify space-y-8">
            
            <section className="bg-white/5 p-6 rounded-sm border border-white/5">
              <h2 className="text-xs font-bold text-gold-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} /> Responsable del Tratamiento
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
                Los datos personales facilitados a través de formularios de contacto, correos electrónicos o WhatsApp serán tratados con la única finalidad de gestionar su solicitud de información, asesoramiento técnico o presupuesto personalizado de importación de vehículos desde Alemania. No se elaborarán perfiles automatizados con sus datos.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">2. Legitimación</h2>
              <p>
                La base legal para el tratamiento de sus datos es el <strong>consentimiento expreso</strong> del interesado al contactar con nosotros o enviar sus datos de contacto, así como la ejecución de medidas precontractuales a petición del usuario.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">3. Plazo de conservación</h2>
              <p>
                Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">4. Destinatarios de los datos</h2>
              <p>
                No se cederán datos a terceros ajenos a <strong>Premium German Cars</strong>, salvo obligación legal. En procesos de importación, solo se compartirán los datos estrictamente necesarios con gestorías y organismos oficiales para la matriculación del vehículo.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">5. Derechos del usuario</h2>
              <p className="mb-4">
                Usted tiene derecho a ejercer sus derechos de acceso, rectificación, supresión, limitación y oposición al tratamiento. 
              </p>
              <p className="bg-white/5 p-4 italic text-xs">
                Para ejercer estos derechos, puede enviar un correo electrónico a <strong>info@premiumgermancars.com</strong> adjuntando copia de su DNI o documento equivalente para verificar su identidad.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">6. Seguridad de los datos</h2>
              <p>
                Premium German Cars aplica las medidas de seguridad técnicas y organizativas necesarias para evitar la pérdida, mal uso, alteración o acceso no autorizado a sus datos personales, teniendo en cuenta el estado de la tecnología.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-white/10 text-center opacity-40">
              <p className="text-[10px] uppercase tracking-[0.2em]">Última actualización: Enero 2026</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PoliticaPrivacidad;
