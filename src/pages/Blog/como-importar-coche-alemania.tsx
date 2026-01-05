import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { SEO } from "../../components/SEO";
import { ChevronLeft, Calculator, FileText, Truck, ShieldCheck, CheckCircle2, AlertTriangle, Mail, ArrowRight } from 'lucide-react';

const ComoImportarCocheAlemania = () => {
  return (
    <>
      <SEO 
        title="Guía 2026: Importar Coche de Alemania a España | Premium German Cars"
        description="Guía completa para importar un coche de Alemania sin sorpresas fiscales en 2026. Fiscalidad, documentación y logística profesional."
      />
      <Navbar />
      
      <main className="bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* CABECERA */}
          <header className="mb-12">
            <Link to="/blog" className="text-gray-500 hover:text-gold-400 mb-8 inline-flex items-center gap-2 transition-all group tracking-widest text-xs uppercase italic">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Blog
            </Link>
            <span className="block text-gold-400 font-bold tracking-widest text-xs uppercase italic mt-6">Protocolo de Importación 2026</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              Guía 2026 para Importar un Coche de Alemania a España sin Sorpresas Fiscales
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>5 Ene, 2026</span>
            </div>
          </header>

          {/* Hero Visual PGC */}
          <div className="h-80 w-full bg-gradient-to-br from-gray-900 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
             <img src="/logoPGC.svg" className="w-48 opacity-10 brightness-0 invert" alt="PGC Logo" />
             <div className="absolute bottom-4 right-6 text-gold-400/30 font-serif italic text-6xl select-none uppercase tracking-tighter">Tax Control</div>
          </div>

          <div className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed text-justify">
            
            {/* INTRODUCCIÓN */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-12 mb-6 uppercase tracking-wider">Introducción</h2>
            <p className="mb-6 text-lg">
              Cada año en España se repite la misma historia: alguien encuentra un “chollo” en Alemania, firma la compra con ilusión… y semanas después descubre que importar ese coche le cuesta 3.000, 5.000 o incluso 8.000 euros más de lo previsto.
            </p>
            <p className="mb-6">
              En 2026, importar un coche de Alemania a España ya no va solo de encontrar buen precio en plataformas como Mobile.de o AutoScout24. Va de entender la fiscalidad real, las emisiones, la documentación correcta y la logística que hay detrás de todo el proceso.
            </p>
            <p className="mb-8">
              El mercado ha cambiado, y Hacienda también. En <strong>Premium German Cars</strong> importamos vehículos premium desde Alemania con una idea muy clara:
            </p>
            
            <blockquote className="border-l-2 border-gold-400 bg-white/5 p-6 my-10 italic font-medium text-gray-200">
              "👉 que el coche siga siendo una buena compra cuando ya está matriculado en España, no solo cuando aparece anunciado en Alemania."
            </blockquote>

            {/* BLOQUE 1 */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-16 mb-6 uppercase tracking-wider">Bloque 1: La Búsqueda Estratégica</h2>
            <h3 className="text-xl font-bold mb-4 text-white italic">¿Por qué en 2026 los coches de 2 a 3 años son la mejor opción?</h3>
            <p className="mb-8">
              Aquí es donde fallan la mayoría de comparadores online y particulares: solo miran el precio en Alemania, sin calcular lo que realmente costará ese coche una vez matriculado en España.
            </p>

            <div className="bg-gray-900/50 p-8 border border-white/10 rounded-sm mb-12">
              <h4 className="text-lg font-bold mb-6 text-white underline decoration-gold-400 underline-offset-8 italic">El concepto clave: reestreno</h4>
              <p className="mb-6">
                Los coches de 24 a 36 meses ofrecen el mejor equilibrio entre precio, estado y fiscalidad al importar un coche de Alemania en 2026. ¿Por qué?
              </p>

              <div className="space-y-8">
                <div>
                  <h5 className="text-gold-400 font-bold mb-2 italic">Depreciación según tablas oficiales (BOE)</h5>
                  <p className="text-sm">Al cumplir los 24 o 36 meses, el valor oficial que utiliza Hacienda para calcular el impuesto de matriculación cae de forma notable, aunque el coche siga estando prácticamente nuevo.</p>
                </div>
                <div>
                  <h5 className="text-gold-400 font-bold mb-2 italic">Estado real del vehículo</h5>
                  <p className="text-sm mb-4">Muchos de estos coches proceden de Renting, Leasing o Flotas de directivos o gerencia de marca con:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs uppercase tracking-widest font-bold">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold-400" /> Historial completo</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold-400" /> Mantenimiento escrupuloso</li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold-400" /> KM verificable</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-gold-400 font-bold mb-2 italic">Garantía oficial europea</h5>
                  <p className="text-sm">Programas como BMW Premium Selection, Mercedes Junge Sterne o Audi Approved permiten mantener la garantía oficial en concesionarios españoles, algo clave en vehículos premium.</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-6 text-white italic">Filtros clave al buscar un coche en Alemania</h3>
            <p className="mb-6">No busques solo por precio. Para que el coste real de importar un coche de Alemania sea rentable, debes filtrar por:</p>
            <ul className="space-y-3 mb-8 italic text-gray-200">
              <li className="flex items-center gap-3">✔ Historial de mantenimiento completo</li>
              <li className="flex items-center gap-3">✔ Kilometraje lógico para su edad</li>
              <li className="flex items-center gap-3">✔ IVA deducible (MwSt. ausweisbar), si eres autónomo o empresa</li>
            </ul>
            <p className="bg-white text-black p-6 font-bold text-center text-lg italic uppercase tracking-tighter">
              👉 Un coche más caro en Alemania puede ser mucho más barato en España si está bien elegido desde el inicio.
            </p>

            {/* BLOQUE 2 */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-20 mb-6 uppercase tracking-wider">Bloque 2: Los 3 Documentos que “Salvan” la Importación</h2>
            <p className="mb-6">La mayoría de los problemas al importar un coche desde Alemania a España no vienen del coche, sino del papel. Errores documentales provocan ITV de importación bloqueada, homologaciones individuales de más de 1.500 € y retrasos de meses.</p>
            
            <h3 className="text-xl font-bold mb-8 text-white italic">Los 3 documentos imprescindibles</h3>
            <div className="space-y-6 mb-12">
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                <h4 className="text-gold-400 font-bold mb-2 uppercase text-sm tracking-widest">1. COC (Certificado de Conformidad)</h4>
                <p className="text-sm">Es el DNI europeo del vehículo. Sin él, la matriculación se convierte en un proceso caro y lleno de incidencias.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                <h4 className="text-gold-400 font-bold mb-2 uppercase text-sm tracking-widest">2. Teil I y Teil II</h4>
                <p className="text-sm">Documentos alemanes de circulación y propiedad. Deben ser originales, nunca copias ni escaneos.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                <h4 className="text-gold-400 font-bold mb-2 uppercase text-sm tracking-widest">3. Factura o contrato de compraventa (Kaufvertrag)</h4>
                <p className="text-sm">Clave para justificar correctamente IVA o ITP y el valor real del vehículo. Un error aquí puede significar pagar dos veces o perder deducciones fiscales importantes.</p>
              </div>
            </div>

            {/* BLOQUE 3 */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-20 mb-6 uppercase tracking-wider">Bloque 3: El Nuevo Escenario de las Emisiones de CO₂ en 2026</h2>
            <p className="mb-8 text-justify">En 2026, el impuesto de matriculación en España es más exigente que nunca. Dos coches muy parecidos pueden generar una diferencia fiscal de miles de euros solo por emisiones.</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <div className="border border-white/10 p-6 rounded-sm text-center">
                <span className="block text-3xl font-serif italic text-gold-400 mb-2">0 %</span>
                <p className="text-xs uppercase tracking-widest font-bold">Por debajo de 120 g/km</p>
                <p className="text-[10px] text-gray-500 mt-2 italic">(híbridos enchufables y diésel muy eficientes)</p>
              </div>
              <div className="border border-white/10 p-6 rounded-sm text-center">
                <span className="block text-3xl font-serif italic text-gold-400 mb-2 text-red-600">14,75 %</span>
                <p className="text-xs uppercase tracking-widest font-bold">Tramo máximo</p>
                <p className="text-[10px] text-gray-500 mt-2 italic">Deportivos, SUV grandes o motorizaciones antiguas</p>
              </div>
            </div>

            <div className="bg-gold-400/5 border border-gold-400/20 p-8 rounded-lg mb-12">
              <h4 className="text-white font-bold mb-4 flex items-center gap-3">
                <ShieldCheck className="text-gold-400" /> Consejo clave de Premium German Cars
              </h4>
              <p className="text-sm italic mb-6">A veces, elegir un motor ligeramente más moderno (aunque sea más caro en Alemania) puede suponer un ahorro de 3.000 € o más simplemente por bajar un tramo de emisiones. Por eso, en Premium German Cars nunca proponemos importar un coche sin calcular previamente el Modelo 576 y el impacto fiscal real en España.</p>
              <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center gap-2 text-gold-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                Usar calculadora <ArrowRight size={14} />
              </Link>
            </div>

            {/* BLOQUE 4 */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-20 mb-6 uppercase tracking-wider">Bloque 4: Logística y Transporte</h2>
            <h3 className="text-xl font-bold mb-6 text-white italic text-center">El error más infravalorado al importar un coche de Alemania</h3>
            <p className="mb-8">Una vez comprado el coche, muchos piensan que “lo difícil ya está hecho”. En realidad, la logística es uno de los puntos donde más errores caros se cometen.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 border border-white/10 bg-gray-900/10">
                <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-[0.2em] border-b border-gold-400 pb-2 inline-block">Opción 1: Traer el coche rodando</h4>
                <p className="text-xs text-gray-400 mb-4 italic">Sobre el papel parece más barato, pero en la práctica implica:</p>
                <ul className="text-[11px] space-y-2 text-gray-500 list-disc pl-4">
                  <li>Placas temporales alemanas (Zollkennzeichen)</li>
                  <li>Seguro internacional específico</li>
                  <li>Combustible, peajes y, en muchos casos, hoteles</li>
                  <li>Riesgo de averías o daños en ruta</li>
                  <li>Kilómetros añadidos a un coche recién comprado</li>
                  <li>Responsabilidad legal fuera de España</li>
                </ul>
                <p className="text-[11px] mt-4 text-gray-400 italic font-medium">Es una experiencia atractiva para algunos, pero rara vez es la opción más eficiente ni segura.</p>
              </div>
              <div className="p-8 border border-gold-400/30 bg-gold-400/5 relative">
                <h4 className="text-gold-400 font-bold mb-4 uppercase text-xs tracking-[0.2em] border-b border-white pb-2 inline-block">Opción 2: Camión Especializado</h4>
                <p className="text-xs text-white mb-4 italic font-bold">Nuestra recomendación profesional. Ventajas reales:</p>
                <ul className="text-[11px] space-y-2 text-gray-200">
                  <li className="flex items-center gap-2">✔ Seguridad total durante todo el trayecto</li>
                  <li className="flex items-center gap-2">✔ Cero desgaste y cero kilómetros añadidos</li>
                  <li className="flex items-center gap-2">✔ Seguro profesional de transporte</li>
                  <li className="flex items-center gap-2">✔ Costes cerrados desde el inicio</li>
                  <li className="flex items-center gap-2">✔ Entrega directa en Tarragona o Reus</li>
                </ul>
              </div>
            </div>
            <p className="text-center font-bold text-gold-400 italic text-xl mb-20 uppercase tracking-tighter">👉 Es la diferencia entre una importación improvisada y una importación profesional.</p>

            {/* BLOQUE 5 */}
            <h2 className="text-2xl font-serif font-bold text-gold-400 mt-20 mb-10 uppercase tracking-wider">Bloque 5: Trámites Finales y Matriculación en España</h2>
            <div className="space-y-8 mb-20">
              <div className="flex gap-6">
                <span className="font-serif italic text-4xl text-white/20 shrink-0">I</span>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm tracking-widest mb-1">ITV de importación</h4>
                  <p className="text-sm italic text-gray-400">Verificación técnica y documental del vehículo.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-serif italic text-4xl text-white/20 shrink-0">II</span>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm tracking-widest mb-1">Liquidación del Modelo 576</h4>
                  <p className="text-sm italic text-gray-400">Aquí se define el impuesto de matriculación real. Un cálculo incorrecto puede arruinar toda la operación.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-serif italic text-4xl text-white/20 shrink-0">III</span>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm tracking-widest mb-1">Pago del Impuesto de Circulación (IVTM)</h4>
                  <p className="text-sm italic text-gray-400">En el ayuntamiento correspondiente.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-serif italic text-4xl text-white/20 shrink-0">IV</span>
                <div>
                  <h4 className="text-white font-bold uppercase text-sm tracking-widest mb-1">Matriculación definitiva en la DGT</h4>
                  <p className="text-sm italic text-gray-400">Placas españolas y permiso de circulación.</p>
                </div>
              </div>
            </div>

            {/* CONCLUSIÓN Y CTA */}
            <div className="mt-20 p-1 bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <div className="bg-black p-12 text-center">
                <h2 className="text-3xl font-serif font-bold mb-6 text-white uppercase tracking-tighter">
                  Conclusión: Importar Bien No Es Suerte
                </h2>
                <div className="text-gray-400 mb-8 space-y-4 text-sm max-w-2xl mx-auto italic leading-relaxed">
                  <p>Importar un coche de Alemania a España en 2026 sigue siendo muy rentable, pero ya no es un proceso para improvisar. La diferencia entre una buena compra y un error caro está en elegir el coche adecuado, calcular correctamente la fiscalidad, controlar la documentación y gestionar la logística de forma profesional.</p>
                  <p>En <strong>Premium German Cars</strong> nos encargamos de todo el proceso para que el coche que ves en Alemania siga siendo una gran compra cuando ya circula en España.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a href="/#import" className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-10 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300">
                    Solicitar Info <Mail size={18} />
                  </a>
                  <Link to="/calculadora-impuesto-matriculacion" className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-10 py-4 font-bold uppercase tracking-tighter hover:bg-white hover:text-black transition-all duration-300">
                    Probar Calculadora
                  </Link>
                </div>
                <p className="text-xs text-gray-600 mt-8 font-bold tracking-[0.3em] uppercase">👉 Calcular antes es la mejor forma de importar bien.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ComoImportarCocheAlemania;
