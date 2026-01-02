import React from 'react';
import { CheckCircle, AlertTriangle, Info, Mail } from 'lucide-react';

const ArticuloModelos2026 = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white text-gray-800 leading-relaxed">
      
      {/* CABECERA: H1 */}
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          Los 5 modelos más inteligentes para importar de Alemania en 2026
        </h1>
        <p className="text-xl text-slate-600 font-medium italic">
          Calidad real, historial transparente y valor de reventa.
        </p>
      </header>

      {/* INTRODUCCIÓN */}
      <section className="prose prose-lg max-w-none mb-12">
        <p>
          Importar un coche de Alemania en 2026 puede ser una de las decisiones más inteligentes si lo haces con criterio —o un error costoso si no lo haces con rigor. El mercado alemán ofrece una ventaja clara sobre el mercado nacional: <strong>mejor mantenimiento, equipamiento superior y un historial de conservación más estricto.</strong>
        </p>
        <p>
          Pero no todos los coches alemanes son iguales. Lo que marca la diferencia es saber qué buscar, qué evitar y cómo valorar cada detalle del vehículo, desde su origen hasta su <strong>historial de mantenimiento certificado.</strong>
        </p>
        <blockquote className="border-l-4 border-blue-600 bg-blue-50 p-4 my-6 italic font-semibold text-blue-900">
          "Importar no es solo traer un coche: es seleccionar un activo que conserve su valor en el tiempo."
        </blockquote>
      </section>

      {/* SECCIÓN 1: H2 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Por qué importar desde Alemania sigue teniendo sentido en 2026
        </h2>
        <p className="mb-4">
          Alemania es un mercado con una cultura de mantenimiento superior, registros más completos y vehículos que han pasado por estrictos programas de revisión en entornos de marca o flotas corporativas con servicios de mantenimiento rigurosos.
        </p>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <CheckCircle className="text-green-600 mr-2" /> Beneficios concretos para ti:
          </h3>
          <ul className="space-y-3 list-none">
            <li className="flex items-start">
              <span className="mr-2">•</span> Historial de mantenimiento más completo que la mayoría del mercado español.
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Posibilidad de encontrar unidades con equipamiento premium de fábrica.
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Mayor probabilidad de que el coche mantenga un alto valor de reventa.
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Riesgo mínimo de sorpresas mecánicas o estructurales gracias a la trazabilidad.
            </li>
          </ul>
        </div>

        <div className="mt-6 flex items-center bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-900">
          <AlertTriangle className="mr-3 flex-shrink-0" />
          <p className="text-sm font-medium">
            <strong>Nota:</strong> La transparencia del historial y el mantenimiento certificado no es algo que se encuentre en todas las ofertas de importación. El filtro previo es la clave.
          </p>
        </div>
      </section>

      {/* SECCIÓN 2: H2 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Transparencia absoluta: el verdadero lujo
        </h2>
        <p className="mb-6">
          En <strong>Premium German Cars</strong> no importamos cualquier coche: solo seleccionamos unidades con trazabilidad 100% documentada.
        </p>
        
        <h3 className="text-xl font-bold mb-4">¿Qué entendemos por trazabilidad?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="bg-white border p-4 rounded-lg shadow-sm italic">"Procedencia clara (Matriz de marca, flotas premium, puntos certificados)."</li>
          <li className="bg-white border p-4 rounded-lg shadow-sm italic">"Historial completo de propietarios anteriores."</li>
          <li className="bg-white border p-4 rounded-lg shadow-sm italic">"Mantenimientos sellados según los estándares del fabricante."</li>
          <li className="bg-white border p-4 rounded-lg shadow-sm italic">"Kilometraje coherente y totalmente verificable."</li>
        </ul>
      </section>

      {/* SECCIÓN 3: LOS MODELOS (H2 + H3) */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Nuestra selección inteligente para 2026
        </h2>

        {/* Modelo 1 */}
        <div className="mb-10 p-6 border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">1. BMW Serie 1 (F40) — El compacto premium</h3>
          <p className="mb-2"><strong>Por qué es una oportunidad:</strong> La puerta de entrada más racional al ecosistema BMW: consumo contenido y tecnología actual.</p>
          <p className="mb-2"><strong>Qué buscar:</strong> Versiones 116i o 118i con mantenimiento certificado y un solo propietario.</p>
          <p className="text-slate-600 italic font-medium">Valor para ti: Equilibrio entre coste operativo y excelente salida en el mercado de usados.</p>
        </div>

        {/* Modelo 2 */}
        <div className="mb-10 p-6 border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">2. Volkswagen Golf — La referencia constante</h3>
          <p className="mb-2"><strong>Por qué destaca:</strong> Unidades alemanas con asistentes (IQ.Drive, ACC) que en España eran extras costosos.</p>
          <p className="mb-2"><strong>Qué buscar:</strong> Historial de servicio impecable y estado estructural verificado.</p>
          <p className="text-slate-600 italic font-medium">Valor para ti: Un coche versátil que retiene su valor mejor que cualquier competidor.</p>
        </div>

        {/* Modelo 3, 4, 5 seguirían la misma estructura de H3 */}
        {/* ... (Se repite estructura para Audi A3, Clase A y BMW X1) */}
      </section>

      {/* FAQ: H2 */}
      <section className="mb-12 bg-slate-900 text-white p-8 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8">FAQ — Lo que necesitas saber</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-blue-400 mb-2">¿Por qué no basta con comprar el más barato de Alemania?</h4>
            <p className="text-slate-300">Porque sin historial completo, el riesgo de averías ocultas y depreciación es masivo.</p>
          </div>
          <div>
            <h4 className="font-bold text-blue-400 mb-2">¿Cuánto ahorro respecto a España?</h4>
            <p className="text-slate-300">El ahorro real está en obtener mucho más equipamiento y mejor vida por el mismo dinero.</p>
          </div>
        </div>
      </section>

      {/* CONCLUSIÓN Y CTA */}
      <footer className="bg-blue-600 text-white p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">No se trata solo de importar... sino de elegir bien</h2>
        <p className="mb-6">En <strong>Premium German Cars</strong> analizamos cada vehículo como una inversión personal.</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors flex items-center mx-auto">
          <Mail className="mr-2" /> Contáctanos hoy mismo
        </button>
      </footer>

    </article>
  );
};

export default ArticuloModelos2026;
