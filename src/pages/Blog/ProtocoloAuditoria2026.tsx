import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import {  
  Search, 
  Gauge, 
  Truck, 
  Database,  
  AlertOctagon, 
  MessageCircle,
  ArrowRight,
  CheckCircle 
} from 'lucide-react';

const ProtocoloAuditoria2026 = () => {
  return (
    <>
      <SEO 
        title="Protocolo de Auditoría Técnica en Alemania | Premium German Cars" 
        description="Revisión de coches en Alemania: nuestro protocolo incluye historial digital oficial, medición de pintura y test en Autobahn para una importación 100% segura."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-32 md:pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">Protocolo PGC</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              Más allá de la diagnosis: el protocolo de auditoría técnica de Premium German Cars para importar coches de Alemania
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>19 Ene, 2026</span>
            </div>
          </header>

          {/* Hero Visual PGC */}
          <div className="h-64 md:h-80 w-full bg-gradient-to-br from-gray-900 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
              <img src="/logoPGC.svg" className="w-48 opacity-10 brightness-0 invert" alt="PGC Logo" />
              <div className="absolute bottom-4 right-6 text-gold-400/30 font-serif italic text-4xl md:text-6xl select-none uppercase tracking-tighter">Verified</div>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light italic border-l-4 border-gold-400 pl-6 text-justify">
              «En la importación de vehículos premium, usted no paga por un coche; paga por el criterio técnico de quien lo selecciona.»
            </p>
            
            <p className="mb-8 text-base md:text-lg text-justify font-light">
              Cuando un cliente decide importar un vehículo de alta gama desde Alemania, especialmente sin verlo en persona, el miedo principal es siempre el mismo: 
              <strong> ¿estará el coche realmente como dicen las fotos y el vendedor?</strong>
            </p>

            <p className="mb-8 text-base md:text-lg text-justify font-light">
              La mayoría de los compraventas convencionales basan su confianza en una revisión visual rápida o en la garantía mecánica obligatoria por ley. En <strong>Premium German Cars</strong>, nuestra filosofía es distinta: la mejor garantía es que el coche sea <strong>mecánicamente impecable desde el origen</strong>.
            </p>

            <p className="mb-12 text-base md:text-lg text-justify font-light">
              Para lograrlo, aplicamos un protocolo de auditoría técnica en Alemania que va mucho más allá de conectar una máquina de diagnosis.
            </p>

            {/* SECCIÓN 1: HISTORIAL DIGITAL */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider flex items-center gap-3">
              <Database className="text-gold-400" size={28} /> 1. El historial digital
            </h2>
            <h3 className="text-xl font-bold mb-4 text-white italic">La verdad oculta tras el libro de revisiones sellado</h3>
            <p className="mb-6 text-justify font-light">
              Un libro de mantenimiento físico con sellos se puede manipular. Por eso, el primer paso de nuestro proceso de importación de coches desde Alemania es una <strong>auditoría digital completa</strong>.
            </p>

            <div className="bg-gray-900/50 p-8 border border-white/10 rounded-sm mb-12">
              <p className="text-gray-300 mb-6 font-light">No nos conformamos con lo que declara el vendedor. Accedemos directamente a los <strong>registros oficiales de mantenimiento del fabricante</strong> (BMW, Mercedes-Benz, Audi, Porsche), donde analizamos tres puntos críticos:</p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-gold-400 mr-4 mt-1"><CheckCircle size={20}/></span>
                  <div>
                    <strong className="text-white block mb-1">Coherencia de kilometraje</strong>
                    <p className="text-sm text-gray-400">Verificamos que los kilómetros han aumentado de forma lógica y progresiva en cada paso por taller oficial durante toda la vida del vehículo.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-400 mr-4 mt-1"><CheckCircle size={20}/></span>
                  <div>
                    <strong className="text-white block mb-1">Campañas de seguridad y llamadas a revisión</strong>
                    <p className="text-sm text-gray-400">Comprobamos si el coche tiene acciones técnicas pendientes que el fabricante no haya ejecutado.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gold-400 mr-4 mt-1"><CheckCircle size={20}/></span>
                  <div>
                    <strong className="text-white block mb-1">Historial de averías recurrentes</strong>
                    <p className="text-sm text-gray-400">Buscamos reparaciones repetitivas que puedan delatar un “coche limón”: unidades con defectos crónicos de fabricación.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-red-900/10 p-6 border-l-4 border-red-600 mb-12 italic text-gray-300">
              "Si algo no encaja, el proceso se detiene aquí. En muchos casos, esto significa decir no al cliente. Y preferimos perder una operación antes que comprometer nuestro criterio técnico."
            </div>

            {/* SECCIÓN 2: ANÁLISIS FORENSE */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-16 mb-6 uppercase tracking-wider flex items-center gap-3">
              <Search className="text-gold-400" size={28} /> 2. Análisis forense
            </h2>
            <h3 className="text-xl font-bold mb-4 text-white italic">Pintura, estructura y micro-accidentes ocultos</h3>
            <p className="mb-6 text-justify font-light">
              Un coche puede lucir espectacular en fotos y esconder un pasado estructural comprometido. Durante la auditoría física en Alemania utilizamos <strong>medidores de espesor de pintura de precisión</strong>, realizando comprobaciones en 12 puntos críticos de la carrocería.
            </p>
            <p className="mb-8 text-justify font-light">
              No buscamos únicamente saber si una puerta ha sido repintada por un daño estético. Buscamos <strong>desviaciones milimétricas</strong> que indiquen intervenciones en el chasis tras un accidente relevante.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 border border-white/10 bg-gray-900/30">
                    <h4 className="text-gold-400 font-bold mb-4 uppercase text-sm flex items-center gap-2">
                        <AlertOctagon size={18}/> Criterios de descarte inmediato
                    </h4>
                    <ul className="text-sm space-y-3 text-gray-400">
                        <li>• Presencia de soldaduras no originales.</li>
                        <li>• Uso de masilla en pilares estructurales.</li>
                        <li>• Reparaciones fuera de tolerancias del fabricante.</li>
                    </ul>
                </div>
                <div className="flex items-center italic text-gray-500 text-sm leading-relaxed">
                    Si detectamos cualquiera de estos indicios, el vehículo queda descartado automáticamente, independientemente de su precio o atractivo comercial.
                </div>
            </div>

            {/* SECCIÓN 3: PRUEBA AUTOBAHN */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-16 mb-6 uppercase tracking-wider flex items-center gap-3">
              <Gauge className="text-gold-400" size={28} /> 3. Prueba de estrés en Autobahn
            </h2>
            <h3 className="text-xl font-bold mb-4 text-white italic">La prueba de fuego de un coche premium</h3>
            <p className="mb-8 text-justify font-light">
              Una vuelta corta por un polígono industrial no revela el estado real de un motor de altas prestaciones. Por eso, nuestras auditorías incluyen una prueba de conducción en tramos de <strong>Autobahn</strong>, autopistas alemanas sin límite de velocidad. Solo bajo este tipo de exigencia aparecen los problemas reales:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 font-light text-sm tracking-wide">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/5 italic">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Vibraciones en transmisión
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/5 italic">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Comportamiento térmico de los turbocompresores
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/5 italic">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Ruidos aerodinámicos a alta velocidad
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-sm border border-white/5 italic">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Funcionamiento de suspensiones activas bajo carga
                </div>
            </div>

            {/* SECCIÓN 4: LOGÍSTICA */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gold-400 mt-16 mb-6 uppercase tracking-wider flex items-center gap-3">
              <Truck className="text-gold-400" size={28} /> 4. Logística premium y entrega llave en mano
            </h2>
            <h3 className="text-xl font-bold mb-4 text-white italic">Servicio desde Tarragona para toda España</h3>
            <p className="mb-6 text-justify font-light">
              Aunque nuestra sede y centro de operaciones se encuentra en la provincia de <strong>Tarragona (Reus / Cambrils)</strong>, nuestro servicio de importación de coches desde Alemania es nacional. Este enfoque es el mismo tanto para clientes de Tarragona y Reus como para cualquier punto de España.
            </p>
            <p className="mb-8 text-justify font-light italic">
                Trabajamos con una red de logística especializada en vehículos premium, utilizando camiones portacoches cerrados o abiertos según el modelo, totalmente <strong>asegurados por el valor real del vehículo</strong>, no por peso.
            </p>

            <div className="mb-12 border border-white/10 bg-gray-900/30 p-8 text-center rounded-sm">
                <p className="text-gray-300 mb-0 font-light leading-relaxed">
                    Realizamos entregas llave en mano en cualquier punto de la península: <strong>Madrid, Bilbao, Barcelona, Marbella o Valencia</strong>. El cliente no gestiona nada, no coordina nada y no asume riesgos intermedios. Solo recibe el resultado final: su coche matriculado, revisado y listo para disfrutar.
                </p>
            </div>

            {/* CONCLUSIÓN */}
            <section className="mt-20 border-t border-gold-400/20 pt-16">
              <h2 className="text-2xl font-serif font-bold text-gold-400 mb-8 uppercase tracking-wider text-center">Su tranquilidad es nuestra única métrica</h2>
              <div className="prose prose-invert max-w-none text-gray-300 text-justify font-light">
                  <p className="mb-6">Importar un coche de Alemania no debería ser una apuesta. Es un proceso de ingeniería, consultoría técnica y trazabilidad, que requiere método, criterio y contactos fiables en origen. En <strong>Premium German Cars</strong> priorizamos siempre la calidad del activo sobre el volumen de operaciones.</p>
                  <p className="mb-12 font-bold text-white text-center italic text-xl">Nuestro objetivo no es vender coches. Es asegurarnos de que su próxima compra sea un vehículo premium fiable, coherente y con valor a largo plazo.</p>
              </div>
            </section>

            {/* CONCLUSIÓN Y CTA */}
            <div className="mt-12 p-1 bg-gradient-to-r from-gold-600 to-gold-400">
              <div className="bg-black p-8 md:p-12 text-center">
                <p className="text-white mb-8 max-w-2xl mx-auto text-lg md:text-xl font-serif italic leading-tight">
                  "Porque en la importación de alta gama, la diferencia no está en el coche… sino en quién asume la responsabilidad de elegirlo por usted."
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="https://wa.me/34603743608?text=Hola,%20he%20visto%20vuestro%20protocolo%20de%20auditoría%20en%20el%20blog%20y%20me%20gustaría%20consultar%20un%20modelo." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-8 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300"
                  >
                    Consultar Auditoría por WhatsApp <MessageCircle size={18} />
                  </a>
                  <a 
                    href="/calculadora-impuesto-matriculacion" 
                    className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-tighter hover:bg-white/10 transition-all duration-300"
                  >
                    Calcular Impuestos <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProtocoloAuditoria2026;
