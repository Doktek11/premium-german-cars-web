import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ChevronLeft, Calculator, FileText, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ComoImportarCocheAlemania = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-16 md:py-24 px-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="text-gray-400 hover:text-white mb-6 inline-flex items-center gap-2 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Volver al Blog
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Guía 2026 para Importar un Coche de Alemania a España sin Sorpresas Fiscales
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        {/* INTRODUCCIÓN */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-200 uppercase tracking-widest">Introducción</h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Cada año en España se repite la misma historia: alguien encuentra un “chollo” en Alemania, firma la compra con ilusión… y semanas después descubre que importar ese coche le cuesta 3.000, 5.000 o incluso 8.000 euros más de lo previsto.
            </p>
            <p>
              En 2026, importar un coche de Alemania a España ya no va solo de encontrar buen precio en plataformas como Mobile.de o AutoScout24. Va de entender la fiscalidad real, las emisiones, la documentación correcta y la logística que hay detrás de todo el proceso.
            </p>
            <p>
              El mercado ha cambiado, y Hacienda también. En <strong className="text-white">Premium German Cars</strong> importamos vehículos premium desde Alemania con una idea muy clara:
            </p>
            <p className="text-2xl md:text-3xl font-semibold italic border-l-4 border-red-600 pl-6 my-10 text-white">
              👉 que el coche siga siendo una buena compra cuando ya está matriculado en España, no solo cuando aparece anunciado en Alemania.
            </p>
          </div>
        </div>

        {/* BLOQUE 1 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <CheckCircle2 className="text-red-600" /> Bloque 1: La Búsqueda Estratégica
          </h2>
          <h3 className="text-2xl font-bold mb-6 text-gray-100">¿Por qué en 2026 los coches de 2 a 3 años son la mejor opción?</h3>
          <div className="space-y-6 text-gray-300 text-lg">
            <p>
              Aquí es donde fallan la mayoría de comparadores online y particulares: solo miran el precio en Alemania, sin calcular lo que realmente costará ese coche una vez matriculado en España.
            </p>
            
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 my-8">
              <h4 className="text-xl font-bold mb-4 text-white underline decoration-red-600 underline-offset-8">El concepto clave: reestreno</h4>
              <p className="mb-6">
                Los coches de 24 a 36 meses ofrecen el mejor equilibrio entre precio, estado y fiscalidad al importar un coche de Alemania en 2026. ¿Por qué?
              </p>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-red-600 font-bold">01.</span>
                  <span><strong className="text-white">Depreciación según tablas oficiales (BOE):</strong> El valor oficial cae notablemente al cumplir los 2 o 3 años, reduciendo el impuesto de matriculación de forma drástica.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-600 font-bold">02.</span>
                  <span><strong className="text-white">Estado real del vehículo:</strong> Proceden de Renting o Leasing con historial completo y mantenimiento escrupuloso en concesionario oficial.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-600 font-bold">03.</span>
                  <span><strong className="text-white">Garantía oficial europea:</strong> Programas como BMW Premium Selection o Mercedes Junge Sterne son válidos en España.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6 text-gray-100">Filtros clave al buscar un coche en Alemania</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center">✔ Historial Completo</div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center">✔ KM Verificables</div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center">✔ IVA Deducible</div>
            </div>
            <p className="bg-white text-black p-6 font-bold rounded-xl text-center text-xl">
              👉 Un coche más caro en Alemania puede ser mucho más barato en España si está bien elegido.
            </p>
          </div>
        </section>

        {/* BLOQUE 2 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <FileText className="text-red-600" /> Bloque 2: Los 3 Documentos que “Salvan” la Importación
          </h2>
          <div className="space-y-6 text-gray-300 text-lg">
            <p>
              La mayoría de los problemas no vienen del coche, sino del papel. Errores documentales provocan bloqueos en la ITV o gastos extra de más de 1.500 €.
            </p>
            <div className="space-y-4">
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                <h4 className="font-bold text-white mb-2 italic">1. COC (Certificado de Conformidad)</h4>
                <p className="text-sm">El DNI europeo del vehículo. Imprescindible para una matriculación fluida.</p>
              </div>
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                <h4 className="font-bold text-white mb-2 italic">2. Teil I y Teil II</h4>
                <p className="text-sm">Documentos originales alemanes de propiedad. Nunca aceptes copias.</p>
              </div>
              <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                <h4 className="font-bold text-white mb-2 italic">3. Factura o Kaufvertrag</h4>
                <p className="text-sm">Fundamental para Hacienda. Un error aquí puede suponer pagar impuestos dos veces.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 3 */}
        <section className="mb-20 bg-gradient-to-br from-red-900/20 to-black p-8 md:p-12 rounded-3xl border border-red-900/30">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Bloque 3: Emisiones de CO₂ en 2026</h2>
          <div className="space-y-6 text-gray-300 text-lg">
            <p className="text-center max-w-2xl mx-auto">
              El impuesto de matriculación es más exigente que nunca. La diferencia entre tramos puede suponer miles de euros.
            </p>
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-black/50 p-6 rounded-xl border border-gray-800">
                <span className="text-red-600 font-bold text-2xl">0 %</span>
                <p className="mt-2 font-bold text-white italic">Híbridos enchufables y diésel eficientes (&lt;120 g/km).</p>
              </div>
              <div className="bg-black/50 p-6 rounded-xl border border-gray-800">
                <span className="text-red-600 font-bold text-2xl">14,75 %</span>
                <p className="mt-2 font-bold text-white italic">SUV grandes, deportivos o motores antiguos.</p>
              </div>
            </div>
            <div className="bg-white text-black p-8 rounded-2xl text-center">
              <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-red-600" />
              <h4 className="text-2xl font-bold mb-2">Consejo Premium German Cars</h4>
              <p className="mb-6 font-medium">Elegir un motor moderno puede ahorrarte 3.000 € en impuestos.</p>
              <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all uppercase tracking-tighter">
                <Calculator className="w-5 h-5" /> Abrir Calculadora
              </Link>
            </div>
          </div>
        </section>

        {/* BLOQUE 4 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
            <Truck className="w-8 h-8 text-red-600" /> Bloque 4: Logística y Transporte
          </h2>
          <div className="space-y-8 text-gray-300 text-lg">
            <p>Muchos subestiman este paso, pero es donde más errores caros se cometen.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-gray-800 p-6 rounded-2xl">
                <h4 className="font-bold text-white mb-4 text-xl italic underline decoration-gray-700">Traer el coche rodando</h4>
                <p className="text-sm leading-relaxed">
                  Gastos en placas, seguros, hoteles y el riesgo constante de averías o incidentes en ruta. Desgaste innecesario para un coche premium.
                </p>
              </div>
              <div className="border border-red-900/50 bg-red-900/10 p-6 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.1)]">
                <h4 className="font-bold text-white mb-4 text-xl italic underline decoration-red-600">Transporte en camión</h4>
                <p className="text-sm leading-relaxed">
                  Nuestra recomendación: seguridad total, cero desgaste y entrega directa en tu domicilio en <strong className="text-white">Tarragona o Reus</strong>.
                </p>
              </div>
            </div>
            <p className="text-center font-bold text-white text-xl">👉 Importación profesional vs. Improvisación.</p>
          </div>
        </section>

        {/* BLOQUE 5 */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-white">Bloque 5: Trámites en España</h2>
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
            <ul className="space-y-6">
              <li className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold shrink-0">1</div>
                <p>ITV de Importación: Verificación técnica.</p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold shrink-0">2</div>
                <p>Modelo 576: Liquidación del Impuesto de Matriculación.</p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold shrink-0">3</div>
                <p>IVTM e Impuestos Locales.</p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0">4</div>
                <p className="font-bold text-white">Matriculación Definitiva DGT.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* CONCLUSIÓN */}
        <div className="bg-white text-black p-10 md:p-16 rounded-[3rem] text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Importar Bien No Es Suerte</h2>
          <p className="text-xl font-medium max-w-2xl mx-auto">
            En <strong className="text-red-600 uppercase">Premium German Cars</strong> gestionamos todo el proceso para que tu única preocupación sea disfrutar de tu nuevo coche.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/calculadora-impuesto-matriculacion" className="bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-gray-800 transition shadow-xl uppercase">
              Probar Calculadora
            </Link>
            <Link to="/importacion-coches-alemania" className="bg-red-600 text-white px-10 py-5 rounded-full font-bold hover:bg-red-700 transition shadow-xl uppercase">
              Contactar Ahora
            </Link>
          </div>
          <p className="text-sm font-bold opacity-60">© 2026 PREMIUM GERMAN CARS - TU IMPORTADOR DE CONFIANZA</p>
        </div>

      </article>

      <Footer />
    </div>
  );
};

export default ComoImportarCocheAlemania;
