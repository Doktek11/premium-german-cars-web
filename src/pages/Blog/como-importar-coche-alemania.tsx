import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ChevronLeft, Calculator, FileText, Truck, ShieldCheck } from 'lucide-react';

const ComoImportarCocheAlemania = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-black text-white py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="text-gray-400 hover:text-white mb-6 inline-flex items-center gap-2 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Volver al Blog
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Guía 2026 para Importar un Coche de Alemania a España sin Sorpresas Fiscales
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-gray-800">
        
        {/* INTRODUCCIÓN */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Introducción</h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              Cada año en España se repite la misma historia: alguien encuentra un “chollo” en Alemania, firma la compra con ilusión… y semanas después descubre que importar ese coche le cuesta 3.000, 5.000 o incluso 8.000 euros más de lo previsto.
            </p>
            <p>
              En 2026, importar un coche de Alemania a España ya no va solo de encontrar buen precio en plataformas como Mobile.de o AutoScout24. Va de entender la fiscalidad real, las emisiones, la documentación correcta y la logística que hay detrás de todo el proceso.
            </p>
            <p>
              El mercado ha cambiado, y Hacienda también. En <strong>Premium German Cars</strong> importamos vehículos premium desde Alemania con una idea muy clara:
            </p>
            <p className="text-2xl font-semibold italic border-l-4 border-black pl-6 my-8">
              👉 que el coche siga siendo una buena compra cuando ya está matriculado en España, no solo cuando aparece anunciado en Alemania.
            </p>
          </div>
        </div>

        {/* BLOQUE 1 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Bloque 1: La Búsqueda Estratégica</h2>
          <h3 className="text-2xl font-bold mb-4 text-gray-700">¿Por qué en 2026 los coches de 2 a 3 años son la mejor opción?</h3>
          <div className="prose prose-lg max-w-none space-y-4">
            <p>
              Aquí es donde fallan la mayoría de comparadores online y particulares: solo miran el precio en Alemania, sin calcular lo que realmente costará ese coche una vez matriculado en España.
            </p>
            
            <h4 className="text-xl font-bold mt-6 underline">El concepto clave: reestreno</h4>
            <p>
              Los coches de 24 a 36 meses ofrecen el mejor equilibrio entre precio, estado y fiscalidad al importar un coche de Alemania en 2026. ¿Por qué?
            </p>

            <ul className="space-y-4">
              <li><strong>Depreciación según tablas oficiales (BOE):</strong> Al cumplir los 24 o 36 meses, el valor oficial que utiliza Hacienda para calcular el impuesto de matriculación cae de forma notable, aunque el coche siga estando prácticamente nuevo.</li>
              <li><strong>Estado real del vehículo:</strong> Muchos de estos coches proceden de Renting, Leasing o Flotas de directivos o gerencia de marca con historial completo, mantenimiento escrupuloso y kilometraje coherente y verificable.</li>
              <li><strong>Garantía oficial europea:</strong> Programas como BMW Premium Selection, Mercedes Junge Sterne o Audi Approved permiten mantener la garantía oficial en concesionarios españoles, algo clave en vehículos premium.</li>
            </ul>

            <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-700">Filtros clave al buscar un coche en Alemania</h3>
            <p>No busques solo por precio. Para que el coste real de importar un coche de Alemania sea rentable, debes filtrar por:</p>
            <ul className="list-none space-y-2">
              <li>✔ Historial de mantenimiento completo</li>
              <li>✔ Kilometraje lógico para su edad</li>
              <li>✔ IVA deducible (MwSt. ausweisbar), si eres autónomo o empresa</li>
            </ul>
            <p className="bg-gray-900 text-white p-4 font-bold rounded-lg text-center">
              👉 Un coche más caro en Alemania puede ser mucho más barato en España si está bien elegido desde el inicio.
            </p>
          </div>
        </section>

        {/* BLOQUE 2 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Bloque 2: Los 3 Documentos que “Salvan” la Importación</h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              La mayoría de los problemas al importar un coche desde Alemania a España no vienen del coche, sino del papel. Errores documentales provocan ITV de importación bloqueada, homologaciones individuales de más de 1.500 € y retrasos de meses.
            </p>
            <h3 className="text-2xl font-bold">Los 3 documentos imprescindibles</h3>
            <div className="grid md:grid-cols-1 gap-4">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <p><strong>1. COC (Certificado de Conformidad):</strong> Es el DNI europeo del vehículo. Sin él, la matriculación se convierte en un proceso caro y lleno de incidencias.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <p><strong>2. Teil I y Teil II:</strong> Documentos alemanes de circulación y propiedad. Deben ser originales, nunca copias ni escaneos.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <p><strong>3. Factura o contrato de compraventa (Kaufvertrag):</strong> Clave para justificar correctamente IVA o ITP y el valor real del vehículo. Un error aquí puede significar pagar dos veces o perder deducciones fiscales importantes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 3 */}
        <section className="mb-16 bg-gray-50 p-8 rounded-3xl border border-gray-200">
          <h2 className="text-3xl font-bold mb-6">Bloque 3: El Nuevo Escenario de las Emisiones de CO₂ en 2026</h2>
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p>
              En 2026, el impuesto de matriculación en España es más exigente que nunca. Dos coches muy parecidos pueden generar una diferencia fiscal de miles de euros solo por emisiones.
            </p>
            <h3 className="text-xl font-bold">Tramos actuales del impuesto de matriculación:</h3>
            <ul className="list-disc pl-6">
              <li><strong>0 %:</strong> Vehículos por debajo de 120 g/km (híbridos enchufables y diésel muy eficientes).</li>
              <li><strong>Tramo máximo: 14,75 %:</strong> Deportivos, SUV grandes o motorizaciones antiguas.</li>
            </ul>
            <div className="bg-black text-white p-6 rounded-xl mt-8">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" /> Consejo clave de Premium German Cars
              </h4>
              <p className="mb-6 text-gray-300">
                A veces, elegir un motor ligeramente más moderno (aunque sea más caro en Alemania) puede suponer un ahorro de 3.000 € o más simplemente por bajar un tramo de emisiones. Por eso, nunca proponemos importar sin calcular previamente el impacto fiscal real.
              </p>
              <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-all">
                <Calculator className="w-5 h-5" /> Ir a la calculadora de impuestos
              </Link>
            </div>
          </div>
        </section>

        {/* BLOQUE 4 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Truck className="w-8 h-8" /> Bloque 4: Logística y Transporte
          </h2>
          <h3 className="text-2xl font-bold mb-4 text-gray-700">El error más infravalorado al importar un coche de Alemania</h3>
          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              Una vez comprado el coche, muchos piensan que “lo difícil ya está hecho”. En realidad, la logística es uno de los puntos donde más errores caros se cometen.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-2 underline">Opción 1: Traer el coche rodando</h4>
                <p className="text-sm text-gray-600 italic">
                  Implica placas temporales, seguros específicos, combustible, peajes, hoteles y riesgo de averías. Es una experiencia atractiva para algunos, pero rara vez es la opción más eficiente ni segura.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 underline text-red-700 italic">Opción 2: Transporte en camión especializado</h4>
                <p className="text-sm">
                  Nuestra recomendación. Seguridad total, cero desgaste, cero kilómetros añadidos, seguro profesional y entrega directa en tu domicilio en <strong>Tarragona, Reus</strong> o cualquier punto de España.
                </p>
              </div>
            </div>
            <p className="font-bold text-center mt-6">👉 Es la diferencia entre una importación improvisada y una importación profesional.</p>
          </div>
        </section>

        {/* BLOQUE 5 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Bloque 5: Trámites Finales y Matriculación en España</h2>
          <div className="prose prose-lg max-w-none">
            <p>Una vez el coche está en España, el proceso debe ser rápido y preciso:</p>
            <ul className="space-y-4">
              <li><strong>ITV de importación:</strong> Verificación técnica y documental del vehículo.</li>
              <li><strong>Liquidación del Modelo 576:</strong> Aquí se define el impuesto de matriculación real. Un cálculo incorrecto puede arruinar la operación.</li>
              <li><strong>Pago del Impuesto de Circulación (IVTM):</strong> En el ayuntamiento correspondiente.</li>
              <li><strong>Matriculación definitiva en la DGT:</strong> Placas españolas y permiso de circulación.</li>
            </ul>
          </div>
        </section>

        {/* CONCLUSIÓN */}
        <div className="bg-black text-white p-10 rounded-3xl text-center space-y-6">
          <h2 className="text-4xl font-bold">Conclusión: Importar Bien No Es Suerte</h2>
          <p className="text-xl text-gray-400">
            Importar un coche en 2026 sigue siendo muy rentable, pero ya no es un proceso para improvisar. En <strong>Premium German Cars</strong> nos encargamos de todo el proceso.
          </p>
          <p className="text-lg">
            Si quieres saber el coste real de matriculación antes de comprar, te invitamos a utilizar nuestra calculadora.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <Link to="/calculadora-impuesto-matriculacion" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition">
              CALCULAR AHORA
            </Link>
            <Link to="/importacion-coches-alemania" className="border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition">
              CONTACTAR
            </Link>
          </div>
          <p className="text-sm text-gray-500">👉 Calcular antes es la mejor forma de importar bien.</p>
        </div>

      </article>

      <Footer />
    </div>
  );
};

export default ComoImportarCocheAlemania;

export default ComoImportarCocheAlemania;
