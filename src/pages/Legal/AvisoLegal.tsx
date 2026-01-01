import React from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { FileText, Scale } from "lucide-react";

const AvisoLegal = () => {
  return (
    <>
      <SEO 
        title="Aviso Legal | Premium German Cars"
        description="Información legal y condiciones de uso de Premium German Cars."
        noIndex={true} 
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20 font-sans">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Título más discreto */}
          <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6">
            <Scale className="text-gold-400 opacity-50" size={24} />
            <h1 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">Aviso Legal</h1>
          </div>

          {/* Letra más pequeña (text-sm) para que parezca información de relleno */}
          <div className="text-sm text-gray-400 leading-relaxed text-justify space-y-8">
            
            {/* 1. Datos Identificativos */}
            <section className="bg-white/5 p-6 rounded-sm border border-white/5">
              <h2 className="text-xs font-bold text-gold-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <FileText size={14} /> 1. Datos Identificativos
              </h2>
              <p className="mb-4 text-xs italic">
                En cumplimiento con la Ley 34/2002 (LSSI-CE), se informa de los datos del titular:
              </p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <p><span className="text-gray-500 font-semibold w-24 inline-block uppercase tracking-tighter">Titular:</span> Premium German Cars</p>
                <p><span className="text-gray-500 font-semibold w-24 inline-block uppercase tracking-tighter">NIF / CIF:</span> B39923112</p>
                <p><span className="text-gray-500 font-semibold w-24 inline-block uppercase tracking-tighter">Domicilio:</span> Cambrils 43850, Tarragona</p>
                <p><span className="text-gray-500 font-semibold w-24 inline-block uppercase tracking-tighter">Email:</span> info@premiumgermancars.com</p>
                <p><span className="text-gray-500 font-semibold w-24 inline-block uppercase tracking-tighter">Teléfono:</span> 603743608</p>
              </div>
            </section>

            {/* 2. Objeto */}
            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">2. Objeto del sitio web</h2>
              <p>
                Este sitio web tiene como finalidad la comercialización de vehículos, la captación de encargos personalizados de importación desde Alemania a España y la atención de solicitudes de información. La información ofrecida es meramente orientativa y no constituye una oferta contractual vinculante.
              </p>
            </section>

            {/* 3. Condiciones de uso */}
            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">3. Condiciones de uso</h2>
              <p>
                El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de estas condiciones. El usuario se compromete a no utilizar el sitio con fines ilícitos o lesivos para el Titular o terceros.
              </p>
            </section>

            {/* 4. Propiedad Intelectual */}
            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">4. Propiedad intelectual e industrial</h2>
              <p>
                Textos, imágenes, logotipos y código fuente son titularidad de <strong>Premium German Cars</strong>. Queda prohibida cualquier reproducción o distribución sin el consentimiento previo por escrito del titular.
              </p>
            </section>

            {/* 5. Responsabilidad */}
            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">5. Responsabilidad</h2>
              <p>
                El Titular no se responsabiliza de interrupciones del servicio, errores en contenidos de terceros vinculados mediante enlaces o mal uso del portal por parte del usuario.
              </p>
            </section>

            {/* 8. Cookies */}
            <section className="border-t border-white/5 pt-6">
              <h2 className="text-xs font-bold text-white mb-2 uppercase">8. Uso de cookies</h2>
              <p className="italic opacity-70 font-light">
                Este sitio web no utiliza cookies propias ni de terceros para la recogida de datos personales.
              </p>
            </section>

            {/* 9. Legislación */}
            <section>
              <h2 className="text-xs font-bold text-white mb-3 uppercase">9. Legislación aplicable</h2>
              <p>
                La relación se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales del domicilio del usuario, según permita la normativa vigente.
              </p>
            </section>

            {/* Footer Legal */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center opacity-40">
              <p className="text-[10px] uppercase tracking-[0.2em]">Premium German Cars &copy; 2026</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AvisoLegal;
