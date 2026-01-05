import React from 'react';
import { Link } from 'react-router-dom';

const ComoImportarCocheAlemania = () => {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white text-gray-900">
      {/* Encabezado Principal */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold leading-tight mb-6">
          Guía 2026 para Importar un Coche de Alemania a España sin Sorpresas Fiscales
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-black">
          <h2 className="text-xl font-bold mb-2">Introducción</h2>
          <p className="text-lg leading-relaxed">
            Cada año en España se repite la misma historia: alguien encuentra un “chollo” en Alemania, firma la compra con ilusión… y semanas después descubre que importar ese coche le cuesta 3.000, 5.000 o incluso 8.000 euros más de lo previsto.
          </p>
        </div>
      </header>

      <section className="space-y-6 text-lg leading-relaxed">
        <p>
          En 2026, importar un coche de Alemania a España ya no va solo de encontrar buen precio en plataformas como Mobile.de o AutoScout24. Va de entender la <strong>fiscalidad real, las emisiones, la documentación correcta</strong> y la logística que hay detrás de todo el proceso. El mercado ha cambiado, y Hacienda también.
        </p>

        <p className="font-semibold">
          En Premium German Cars importamos vehículos premium desde Alemania con una idea muy clara:
        </p>

        <p className="bg-yellow-50 p-4 border border-yellow-200 rounded text-xl italic">
          👉 que el coche siga siendo una buena compra cuando ya está matriculado en España, no solo cuando aparece anunciado en Alemania.
        </p>

        <hr className="my-10" />

        {/* BLOQUE 1 */}
        <h2 className="text-3xl font-bold mt-10">Bloque 1: La Búsqueda Estratégica</h2>
        <h3 className="text-2xl font-semibold text-gray-800">¿Por qué en 2026 los coches de 2 a 3 años son la mejor opción?</h3>
        
        <p>
          Aquí es donde fallan la mayoría de comparadores online y particulares: solo miran el precio en Alemania, sin calcular lo que realmente costará ese coche una vez matriculado en España.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="text-xl font-bold mb-3 underline">El concepto clave: reestreno</h4>
          <p className="mb-4">
            Los coches de <strong>24 a 36 meses</strong> ofrecen el mejor equilibrio entre precio, estado y fiscalidad al importar un coche de Alemania en 2026.
          </p>
          
          <ul className="space-y-4">
            <li>
              <strong>Depreciación según tablas oficiales (BOE):</strong> Al cumplir los 24 o 36 meses, el valor oficial que utiliza Hacienda cae de forma notable, aunque el coche siga estando prácticamente nuevo.
            </li>
            <li>
              <strong>Estado real del vehículo:</strong> Muchos de estos coches proceden de Renting, Leasing o Flotas de directivos con historial completo y mantenimiento escrupuloso.
            </li>
            <li>
              <strong>Garantía oficial europea:</strong> Programas como <em>BMW Premium Selection, Mercedes Junge Sterne o Audi Approved</em> permiten mantener la garantía oficial en concesionarios españoles.
            </li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold pt-4">Filtros clave al buscar un coche en Alemania</h3>
        <p>No busques solo por precio. Debes filtrar por:</p>
        <ul className="list-none space-y-2 pl-4">
          <li>✔ Historial de mantenimiento completo</li>
          <li>✔ Kilometraje lógico para su edad</li>
          <li>✔ IVA deducible (MwSt. ausweisbar), si eres autónomo o empresa</li>
        </ul>
        <p className="font-bold text-red-700 italic">
          👉 Un coche más caro en Alemania puede ser mucho más barato en España si está bien elegido desde el inicio.
        </p>

        {/* BLOQUE 2 */}
        <h2 className="text-3xl font-bold mt-12">Bloque 2: Los 3 Documentos que “Salvan” la Importación</h2>
        <p>
          La mayoría de los problemas no vienen del coche, sino del papel. Errores documentales provocan ITV bloqueadas o retrasos de meses.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <span className="block font-bold text-xl mb-2">1. COC</span>
            <p className="text-sm text-gray-600">Certificado de Conformidad. Sin él, la matriculación es cara y llena de incidencias.</p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <span className="block font-bold text-xl mb-2">2. Teil I y II</span>
            <p className="text-sm text-gray-600">Documentos alemanes originales. Nunca aceptes copias ni escaneos.</p>
          </div>
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <span className="block font-bold text-xl mb-2">3. Factura</span>
            <p className="text-sm text-gray-600">Clave para justificar IVA o ITP. Un error aquí significa pagar dos veces.</p>
          </div>
        </div>

        {/* BLOQUE 3 */}
        <h2 className="text-3xl font-bold mt-12">Bloque 3: El Nuevo Escenario de las Emisiones de CO₂ en 2026</h2>
        <p>
          El impuesto de matriculación es más exigente que nunca. Dos coches parecidos pueden generar una diferencia de miles de euros solo por emisiones.
        </p>
        
        <ul className="bg-red-50 p-6 rounded-lg border border-red-100">
          <li><strong>Tramo 0%:</strong> Por debajo de 120 g/km.</li>
          <li><strong>Tramo máximo 14,75%:</strong> Deportivos o motorizaciones antiguas.</li>
        </ul>

        <div className="bg-black text-white p-6 rounded-lg my-8">
          <h3 className="text-xl font-bold mb-4">Consejo clave de Premium German Cars</h3>
          <p className="mb-4">
            A veces, elegir un motor moderno puede suponer un ahorro de 3.000 € o más simplemente por bajar un tramo de emisiones.
          </p>
          <Link to="/calculadora-impuesto-matriculacion" className="inline-block bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">
            Calcular impacto fiscal real →
          </Link>
        </div>

        {/* BLOQUE 4 */}
        <h2 className="text-3xl font-bold mt-12">Bloque 4: Logística y Transporte</h2>
        <h3 className="text-2xl font-semibold">El error más infravalorado</h3>
        
        <div className="space-y-6">
          <div className="border-l-4 border-gray-200 pl-4">
            <h4 className="font-bold">Opción 1: Traer el coche rodando</h4>
            <p className="text-sm text-gray-600 italic">No recomendada: Implica placas temporales, riesgo de averías, hoteles y desgaste innecesario del vehículo.</p>
          </div>
          <div className="border-l-4 border-black pl-4">
            <h4 className="font-bold">Opción 2: Transporte en camión especializado</h4>
            <p className="text-sm">
              En Premium German Cars apostamos por el transporte profesional. Seguridad total, cero desgaste y entrega directa en tu domicilio en Tarragona, Reus o cualquier punto de España.
            </p>
          </div>
        </div>

        {/* BLOQUE 5 */}
        <h2 className="text-3xl font-bold mt-12">Bloque 5: Trámites Finales y Matriculación en España</h2>
        <ol className="list-decimal pl-6 space-y-4 font-medium">
          <li>ITV de importación (Verificación técnica).</li>
          <li>Liquidación del Modelo 576 (Impuesto de matriculación).</li>
          <li>Pago del Impuesto de Circulación (IVTM).</li>
          <li>Matriculación definitiva en la DGT.</li>
        </ol>

        {/* CONCLUSIÓN */}
        <footer className="mt-16 bg-gray-900 text-white p-10 rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Conclusión: Importar Bien No Es Suerte</h2>
          <p className="mb-8 text-gray-300">
            La diferencia entre una buena compra y un error caro está en elegir el coche adecuado y calcular correctamente la fiscalidad.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/calculadora-impuesto-matriculacion" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition">
              USAR CALCULADORA DE IMPUESTOS
            </Link>
            <Link to="/importacion-coches-alemania" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition">
              CONTACTAR CON NOSOTROS
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">👉 Calcular antes es la mejor forma de importar bien.</p>
        </footer>
      </section>
    </article>
  );
};

export default ComoImportarCocheAlemania;
