import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { CheckCircle, ShieldCheck, Euro, MapPin, ArrowRight } from "lucide-react";

const CochesReusTarragona = () => {
  return (
    <>
      <SEO
        title="Coches de segunda mano en Reus y Tarragona | Premium German Cars"
        description="¿Buscas un coche de ocasión en Tarragona o Reus? Descubre por qué la importación de reestreno premium en Cambrils es tu mejor opción. Ahorro y garantía oficial."
        canonical="https://www.premiumgermancars.com/blog/coche-segunda-mano-reus-tarragona"
      />
      <Navbar />

      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Cabecera */}
          <div className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase">
              Especialistas en la Provincia de Tarragona
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              ¿Buscas un coche de segunda mano en Reus o Tarragona? Descubre por
              qué somos tu mejor opción
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Por Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>10 Dic, 2025</span>
            </div>
          </div>

          {/* Imagen Destacada */}
          <div className="h-96 w-full bg-gradient-to-br from-metallic-800 to-black border border-white/10 flex items-center justify-center mb-16 overflow-hidden relative">
            <img
              src="/amggtr-mobile.webp"
              className="w-full h-full object-cover opacity-40"
              alt="Coche Premium en Tarragona"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/logoPGC.svg"
                className="w-48 brightness-0 invert"
                alt="Logo PGC"
              />
            </div>
          </div>

          {/* Cuerpo del Artículo */}
          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            <p className="text-xl mb-8 font-light">
              Comprar un coche de segunda mano no debería ser un salto al vacío.
              Si vives en <strong>Tarragona, Reus, Salou, Valls</strong> o
              alrededores, seguramente te has encontrado con el mismo dilema:
              comprar a un particular asumiendo riesgos o acudir a un
              concesionario multimarca donde no siempre conoces el historial
              real.
            </p>

            <p className="mb-8">
              En <strong>Premium German Cars</strong> hemos redefinido la compra
              de coches de ocasión en la provincia de Tarragona. Nos alejamos
              del concepto tradicional de compraventa para ofrecerte un servicio
              boutique de importación: acercamos la excelencia automovilística
              alemana a la <strong>Costa Daurada</strong>.
            </p>

            <h2 className="text-3xl font-serif font-bold text-gold-400 mt-12 mb-6 text-white">
              La diferencia entre un coche usado y un Reestreno Premium
            </h2>
            <p className="mb-6">
              Muchos clientes llegan a nuestra sede en <strong>Cambrils</strong>{" "}
              después de visitar decenas de anuncios con kilometrajes dudosos o
              mantenimientos poco claros en naves de Les Gavarres o Reus.
              Nosotros nos especializamos en:
            </p>

            {/* Bloques de valor */}
            <div className="grid md:grid-cols-1 gap-6 mb-12">
              <div className="bg-metallic-900 p-8 border border-white/5 rounded-sm">
                <div className="flex items-center gap-4 mb-4">
                  <Euro className="text-gold-400" size={32} />
                  <h3 className="text-xl font-bold text-white">
                    1. Transparencia total y ahorro real
                  </h3>
                </div>
                <p className="font-light">
                  Mostramos la factura original de compra para que compruebes el
                  ahorro frente a su precio nuevo.
                  <span className="block mt-2 text-gold-400 font-medium italic">
                    Ejemplo real: en un BMW Serie 1 reciente, el ahorro superaba
                    los 9.400 € respecto a su precio de estreno.
                  </span>
                </p>
              </div>

              <div className="bg-metallic-900 p-8 border border-white/5 rounded-sm">
                <div className="flex items-center gap-4 mb-4">
                  <ShieldCheck className="text-gold-400" size={32} />
                  <h3 className="text-xl font-bold text-white">
                    2. Garantía oficial de fábrica
                  </h3>
                </div>
                <p className="font-light">
                  Trabajamos exclusivamente con vehículos que mantienen la{" "}
                  <strong>garantía oficial del fabricante</strong>. Tienes la
                  misma tranquilidad que un concesionario oficial en Tarragona
                  capital, pero con un precio mucho más competitivo.
                </p>
              </div>

              <div className="bg-metallic-900 p-8 border border-white/5 rounded-sm">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="text-gold-400" size={32} />
                  <h3 className="text-xl font-bold text-white">
                    3. Equipamiento superior: Unidades "Full Equip"
                  </h3>
                </div>
                <p className="font-light mb-4">
                  Seleccionamos unidades cargadas de extras que son difíciles de
                  encontrar en el mercado nacional de ocasión:
                </p>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    • Live Cockpit Professional
                  </li>
                  <li className="flex items-center gap-2">• Paquetes M / S-Line</li>
                  <li className="flex items-center gap-2">
                    • Asistentes avanzados
                  </li>
                  <li className="flex items-center gap-2">
                    • Tecnología de última generación
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-serif font-bold text-gold-400 mt-12 mb-6 text-white">
              ¿Por qué Premium German Cars es diferente?
            </h2>
            <div className="space-y-6 mb-12">
              <div className="flex gap-4">
                <MapPin className="text-gold-400 shrink-0" />
                <p>
                  <strong>Ubicación estratégica:</strong> Estamos en Cambrils, a
                  pocos minutos de Reus y Tarragona. Un espacio cómodo para ver
                  y probar nuestras unidades sin compromiso.
                </p>
              </div>
              <div className="flex gap-4">
                <ShieldCheck className="text-gold-400 shrink-0" />
                <p>
                  <strong>Inspección rigurosa:</strong> Cada vehículo pasa un
                  control de calidad exhaustivo bajo estándares alemanes antes de
                  cruzar la frontera.
                </p>
              </div>
            </div>

            <blockquote className="border-l-4 border-gold-400 pl-6 py-6 italic text-gray-300 bg-white/5 mb-10 text-lg">
              "No tenemos cientos de vehículos; tenemos los mejores.
              Seleccionamos cada unidad como si fuera para nosotros mismos."
            </blockquote>
          </div>

          {/* CTA Final */}
          <div className="mt-20 p-12 bg-gradient-to-r from-metallic-900 to-black border border-gold-400/30 text-center">
            <h3 className="text-3xl font-serif font-bold mb-6 italic text-white">
              ¿Listo para tu reestreno Premium?
            </h3>
            <p className="text-gray-400 mb-10 text-lg">
              Reserva tu visita en Cambrils o solicita información sobre unidades
              disponibles en la zona de Tarragona y Reus.
            </p>
            <div className="flex justify-center">
              <a
                href="https://wa.me/34603743608?text=Hola,%20estoy%20en%20la%20zona%20de%20Tarragona/Reus%20y%20me%20gustaría%20solicitar%20información%20sobre%20vuestros%20coches%20de%20reestreno."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-12 py-5 font-bold uppercase tracking-widest hover:bg-gold-500 transition-all"
              >
                Contactar por WhatsApp <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CochesReusTarragona;
