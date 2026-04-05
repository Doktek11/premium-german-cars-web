import { useState, useEffect } from 'react';

import { Navbar } from '../components/Navbar';

import { Footer } from '../components/Footer';

import { SEO } from '../components/SEO';

import { WhatsAppButton } from '../components/WhatsAppButton';

import { 

  Gauge, 

  Calendar, 

  Euro, 

  AlertTriangle, 

  ArrowRight, 

  Info, 

  CheckCircle2, 

  Car, 

  ShieldCheck, 

  FileText, 

  Globe, 

  RotateCcw, 

  Bot, 

  Search,

  HelpCircle 

} from 'lucide-react';



export const CalculadoraImpuestos = () => {

  const [precio, setPrecio] = useState<number>(45000);

  const [emisiones, setEmisiones] = useState<number>(155);

  const [meses, setMeses] = useState<number>(36);

  const [esComunidadIncrementada, setEsComunidadIncrementada] = useState<boolean>(false);

  const [resultado, setResultado] = useState({ matriculacion: 0, tramo: 0 });



  const ejemplosImportacion = [

    { modelo: "Audi A3 Sportback 35 TFSI", valor: "21.105€", co2: "128g", impuesto: "1.002€" },

    { modelo: "VW Golf GTI (Mk8)", valor: "28.140€", co2: "163g", impuesto: "2.743€" },

    { modelo: "BMW 320d (G20)", valor: "30.820€", co2: "127g", impuesto: "1.464€" },

    { modelo: "Mercedes-Benz A 200", valor: "22.780€", co2: "134g", impuesto: "1.082€" },

    { modelo: "Audi Q5 40 TDI Quattro", valor: "37.520€", co2: "166g", impuesto: "3.658€" },

    { modelo: "VW Tiguan 2.0 TDI", valor: "25.460€", co2: "142g", impuesto: "1.209€" },

    { modelo: "BMW M4 Competition", valor: "77.050€", co2: "228g", impuesto: "11.365€" },

    { modelo: "Mercedes CLA 220d", valor: "28.810€", co2: "131g", impuesto: "1.368€" },

    { modelo: "Cupra Formentor VZ", valor: "30.820€", co2: "175g", impuesto: "3.005€" },

    { modelo: "Audi A4 Avant 40 TFSI", valor: "32.160€", co2: "148g", impuesto: "1.527€" },

  ];

  const ultimaActualizacionBoe = '5 abril 2026';

  const calculadoraJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Calculadora de impuesto de matriculación de coche importado",
        url: "https://www.premiumgermancars.com/calculadora-impuesto-matriculacion",
        description: "Calcula en segundos el impuesto de matriculación de un coche importado desde Alemania según CO2, antigüedad y tablas BOE.",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: "es-ES",
        isAccessibleForFree: true,
        dateModified: "2026-04-05",
        featureList: [
          "Cálculo por tramos de emisiones CO2",
          "Aplicación de depreciación BOE por meses",
          "Estimación del impuesto de matriculación en España"
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR"
        },
        provider: {
          "@type": "Organization",
          name: "Premium German Cars",
          url: "https://www.premiumgermancars.com"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Diésel o gasolina paga más impuesto de matriculación?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Depende del CO2 homologado. El impuesto no discrimina por combustible; paga más el coche que emite más."
            }
          },
          {
            "@type": "Question",
            name: "¿Cómo calcular el impuesto según CO2?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Se aplica el tramo de emisiones CO2 y la depreciación BOE sobre el valor venal del vehículo."
            }
          }
        ]
      }
    ]
  };



  const abrirAsistenteIA = () => {

    const url = "https://chatgpt.com/g/g-69622c5453908191bd59a9c9a7586e21-pgc-asistente-de-valoracion-oficial";

    const esMovil = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);



    if (esMovil) {

      window.open(url, '_blank');

    } else {

      const ancho = 480;

      const alto = window.screen.height * 0.85;

      const izquierda = window.screen.width - ancho - 40;

      const tope = 60;

      

      window.open(

        url, 

        'AsistentePGC', 

        `width=${ancho},height=${alto},top=${tope},left=${izquierda},toolbar=no,menubar=no,status=no,location=no`

      );

    }

  };



  const resetCalculadora = () => {

    setPrecio(0);

    setEmisiones(0);

    setMeses(1);

    setEsComunidadIncrementada(false);

  };



  useEffect(() => {

    let tramo = 0;

    if (emisiones <= 120) tramo = 0;

    else if (emisiones <= 159) tramo = 4.75;

    else if (emisiones <= 199) tramo = 9.75;

    else {

      tramo = esComunidadIncrementada ? 16 : 14.75;

    }



    let coef = 1;

    if (meses <= 12) coef = 1;

    else if (meses <= 24) coef = 0.84;

    else if (meses <= 36) coef = 0.67;

    else if (meses <= 48) coef = 0.56;

    else if (meses <= 60) coef = 0.47;

    else if (meses <= 72) coef = 0.39;

    else coef = 0.30;



    const baseImponible = precio * coef;

    const impuesto = baseImponible * (tramo / 100);



    setResultado({

      matriculacion: impuesto,

      tramo: tramo

    });

  }, [precio, emisiones, meses, esComunidadIncrementada]);



  const getReduccionText = () => {

    if (resultado.tramo === 0 || precio === 0) return "0%";

    const baseTeoricaSinDepreciacion = precio * (resultado.tramo / 100);

    const red = ((1 - (resultado.matriculacion / baseTeoricaSinDepreciacion)) * 100).toFixed(0);

    return `-${red}%`;

  };



  return (

    <div className="min-h-screen bg-black text-white">

      <SEO

        title="Impuesto de matriculación diésel o gasolina | Calculadora IA"

        description="Calcula en segundos qué paga más: diésel o gasolina. Impuesto de matriculación según CO₂ y coste real de importar tu coche."

        canonical="https://www.premiumgermancars.com/calculadora-impuesto-matriculacion"
        jsonLd={calculadoraJsonLd}
      />

      

      <Navbar />

      

      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">

        <div className="container mx-auto max-w-5xl">

          <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="text-center md:text-left">

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-bold mb-4 uppercase tracking-tighter text-left">

                Impuesto <span className="text-gold-400 italic">Diésel o Gasolina:</span> <br/>

                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">¿Cuánto cuesta matricularlo?</span>

              </h1>

              <p className="text-gray-400 text-lg max-w-2xl text-left">
                Herramienta de precisión basada en los tramos de CO2 2026 y las tablas de depreciación del BOE para vehículos de importación.
              </p>

            </div>

            <button 

              onClick={resetCalculadora}

              className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all min-h-[48px] touch-manipulation"

            >

              <RotateCcw size={14} /> Limpiar Datos

            </button>

          </header>



          <div className="mb-8 sm:mb-10 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl text-left">

            <p className="text-sm text-gray-300">

              Resumen rápido: el impuesto no depende del combustible, sino del CO₂. En igualdad de precio, paga más el coche con más emisiones.

            </p>

          </div>

          <section className="mb-8 sm:mb-10 bg-white/[0.02] border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl text-left">
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.15em] mb-4">
              Cómo calcula esta herramienta
            </h2>
            <ol className="space-y-3 text-sm text-gray-300">
              <li>1. Determina el tramo de impuesto por emisiones de CO2: 0%, 4,75%, 9,75% o 14,75% (16% en supuestos autonómicos o sin emisiones acreditadas).</li>
              <li>2. Aplica el coeficiente de depreciación BOE según antigüedad en meses para obtener la base imponible.</li>
              <li>3. Calcula el impuesto estimado: base imponible x tramo aplicable.</li>
            </ol>
          </section>

          <section className="mb-8 sm:mb-10 bg-gold-500/5 border border-gold-500/20 p-4 sm:p-6 rounded-2xl text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gold-400 mb-2">
              Última actualización BOE
            </h3>
            <p className="text-sm text-gray-300">
              Revisado el {ultimaActualizacionBoe}. Cálculo alineado con tramos de CO2 y tablas de depreciación BOE vigentes para importación de vehículos.
            </p>
          </section>



          <div className="mb-8 sm:mb-10 bg-gradient-to-r from-gold-900/10 to-transparent border border-gold-500/20 p-4 sm:p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm text-left">

            <div className="flex gap-5 items-start">

              <div className="bg-gold-500/20 p-3 rounded-2xl">

                <Bot className="text-gold-400" size={32} />

              </div>

              <div>

                <h2 className="text-gold-400 font-bold uppercase text-xs tracking-[0.2em] mb-2 flex items-center gap-2 text-left">

                  <Search size={14}/> Paso 1: Averigua los datos del coche

                </h2>

                <p className="text-gray-300 text-sm leading-relaxed max-w-xl text-left">

                  ¿No conoces el valor inicial o el CO2 exacto? Consulta a nuestro <strong>Asistente IA</strong> especializado en el BOE para obtener los valores antes de calcular.

                </p>

              </div>

            </div>

            <button 

              onClick={abrirAsistenteIA}

              className="whitespace-nowrap px-8 py-4 bg-gold-500 text-black font-black rounded-xl hover:bg-white transition-all uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-xl shadow-gold-500/10 min-h-[48px] touch-manipulation"

            >

              Conocer Valor BOE <ArrowRight size={16}/>

            </button>

          </div>



          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">

            <div className="lg:col-span-7 space-y-10 sm:space-y-12 bg-white/[0.03] p-4 sm:p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">

              <div className="text-left">

                <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-8 border-b border-white/5 pb-4">

                  Paso 2: Introduce los valores obtenidos

                </h3>



                <div 

                  className={`mb-10 p-5 rounded-2xl border transition-all cursor-pointer ${esComunidadIncrementada ? 'bg-gold-500/10 border-gold-500' : 'bg-white/5 border-white/10 hover:border-white/30'}`}

                  onClick={() => setEsComunidadIncrementada(!esComunidadIncrementada)}

                >

                  <div className="flex items-start gap-4">

                    <div className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${esComunidadIncrementada ? 'bg-gold-500 border-gold-500' : 'border-gray-600'}`}>

                      {esComunidadIncrementada && <CheckCircle2 size={16} className="text-black" />}

                    </div>

                    <div className="flex flex-col">

                      <span className="text-[11px] font-black uppercase tracking-widest text-white mb-1">

                        ¿Coche antiguo o sin emisiones acreditadas?

                      </span>

                      <p className="text-[10px] text-gray-400 leading-tight uppercase font-medium">

                        Selecciona esta casilla si el vehículo <strong className="text-gold-400">no declara emisiones de CO2</strong>, no cumple normativas Euronorma o resides en CCAA con tipo incrementado al <strong className="text-white">16%</strong> (Cataluña, Andalucía, Asturias, Cantabria o Baleares).

                      </p>

                    </div>

                  </div>

                </div>



                <div className="flex justify-between items-end mb-4">

                  <div className="flex flex-col">

                    <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 mb-1 tracking-widest">

                      <Euro size={14}/> Valor del Vehículo

                    </label>

                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">

                      (Valor Venal BOE exacto)

                    </span>

                  </div>

                  <div className="flex items-center border-b-2 border-gold-500 pb-1 focus-within:border-white transition-colors">

                    <input 

                      type="number"

                      value={precio}

                      onChange={(e) => setPrecio(Number(e.target.value))}

                      className="bg-transparent text-2xl text-white font-mono font-bold text-right outline-none w-32 min-h-[44px] text-base touch-manipulation"

                    />

                    <span className="text-2xl font-bold ml-1 text-white">€</span>

                  </div>

                </div>

                

                <input 

                  type="range" min="0" max="150000" step="100"

                  value={precio} onChange={(e) => setPrecio(Number(e.target.value))}

                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"

                />



                <div className="mt-4 p-4 bg-gold-400/5 border border-gold-400/10 rounded-xl flex gap-3 items-center text-left">

                  <Info size={18} className="text-gold-400 shrink-0" />

                  <p className="text-[11px] text-gray-400 leading-snug italic">

                    <strong className="text-white not-italic">Uso profesional:</strong> Si el coche no figura con CO2 en ficha técnica, el impuesto se calcula obligatoriamente sobre el tramo máximo.

                  </p>

                </div>

              </div>



              <div className="text-left">

                <div className="flex justify-between mb-4">

                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 tracking-widest">

                    <Gauge size={14}/> Emisiones CO2: {emisiones} g/km

                  </label>

                </div>

                <input 

                  type="range" min="0" max="350" step="1"

                  value={emisiones} onChange={(e) => setEmisiones(Number(e.target.value))}

                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"

                />

              </div>



              <div className="text-left">

                <div className="flex justify-between mb-4">

                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 tracking-widest">

                    <Calendar size={14}/> Antigüedad: {meses} meses

                  </label>

                </div>

                <input 

                  type="range" min="1" max="120" step="1"

                  value={meses} onChange={(e) => setMeses(Number(e.target.value))}

                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"

                />

              </div>

            </div>



            <div className="lg:col-span-5 space-y-4 sm:space-y-6">

              <div className="bg-gold-500 p-[1px] rounded-3xl shadow-2xl shadow-gold-500/10 text-left">

                <div className="bg-black rounded-[calc(1.5rem-1px)] p-6 sm:p-8">

                  <span className="text-xs text-gray-500 uppercase block mb-2 tracking-[0.2em] text-center">Impuesto Estimado</span>

                  <div className="text-6xl font-serif font-bold text-white mb-8 text-center tracking-tighter">

                    {Math.round(resultado.matriculacion).toLocaleString()}€

                  </div>



                  <div className="space-y-4 pt-6 border-t border-white/10 text-sm">

                    <div className="flex justify-between items-center text-left">

                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Tramo Aplicado:</span>

                      <span className="text-gold-400 font-mono font-bold text-lg">{resultado.tramo}%</span>

                    </div>

                    <div className="flex justify-between items-center text-left">

                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Reducción Aplicada:</span>

                      <span className="text-white font-mono">{getReduccionText()}</span>

                    </div>

                  </div>



                  <button 

                    onClick={() => window.open(`https://wa.me/34603743608?text=Hola! He usado la calculadora para un coche con ${emisiones}g/km y valor de ${precio}€. ¿Me confirmáis el valor BOE exacto?`, '_blank')}

                    className="mt-10 flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-extrabold rounded-xl hover:bg-gold-400 transition-all uppercase text-[11px] tracking-[0.15em] min-h-[48px] touch-manipulation"

                  >

                    Verificar con un experto <ArrowRight size={16}/>

                  </button>

                </div>

              </div>

              

              <div className="bg-red-900/5 border border-red-900/20 p-6 rounded-2xl flex gap-4 text-left">

                <AlertTriangle className="text-red-700 shrink-0" size={20} />

                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-medium">

                  {esComunidadIncrementada 

                    ? "ATENCIÓN: Se está aplicando el tipo del 16% (Tramo 4) por falta de acreditación de emisiones o normativa autonómica incrementada."

                    : "Este cálculo es orientativo. Los residentes en Cataluña podrían estar sujetos al impuesto anual de CO2 adicional o al tipo del 16% si no acreditan emisiones."}

                </p>

              </div>

            </div>

          </div>



          {/* SECCIÓN INFORMATIVA DETALLADA (SOLUCIÓN SEMRUSH LONG-FORM) */}

          <section className="mb-16 sm:mb-20 md:mb-24 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/[0.02] border border-white/5 rounded-3xl text-left">

            <h2 className="text-3xl font-serif font-bold mb-6 italic text-gold-400">

              Impuesto de matriculación: ¿Diésel o Gasolina?

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 leading-relaxed">

              <div className="space-y-4">

                <p>

                  A la hora de importar un coche de Alemania, la duda entre <strong>diésel o gasolina</strong> es crucial para el presupuesto final. El impuesto de matriculación en España no discrimina por el tipo de combustible de forma directa, sino por las <strong>emisiones de CO2 homologadas (WLTP)</strong>.

                </p>

                <p>

                  Los motores <strong>diésel modernos</strong> suelen ofrecer cifras de CO2 más ajustadas que sus homólogos de gasolina de igual potencia. Esto puede significar que un vehículo diésel se mantenga en el tramo del <strong>4,75%</strong>, mientras que la versión de gasolina salte al <strong>9,75%</strong>, duplicando el coste del impuesto.

                </p>

              </div>

              <div className="space-y-4">

                <p>

                  Por otro lado, los vehículos de <strong>gasolina</strong> suelen tener un mantenimiento menos complejo a largo plazo y etiquetas ambientales que pueden ser más favorables en ciertas zonas de bajas emisiones, compensando el posible pago extra inicial. 

                </p>

                <p>

                  En <strong>Premium German Cars</strong> recomendamos siempre verificar la cifra exacta de CO2 en el Certificado de Conformidad (COC). Si el coche emite menos de 120g/km, el impuesto será de <strong>0€</strong>, independientemente de si es diésel o gasolina.

                </p>

              </div>

            </div>

          </section>



          {/* FAQ SECCIÓN PARA SEO */}

          <section className="mb-24 pt-20 border-t border-white/10 text-left">

            <h2 className="text-3xl font-serif font-bold mb-10 flex items-center gap-3 italic">

              <HelpCircle className="text-gold-400" size={28} /> Preguntas frecuentes sobre Importación

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              <div className="space-y-4">

                <h3 className="text-white font-bold uppercase text-sm tracking-widest">¿Cuánto cuesta matricular un coche de Alemania?</h3>

                <p className="text-gray-400 text-sm leading-relaxed">El coste depende del <strong>valor venal BOE</strong> y las emisiones de CO2. Para un coche premium de 3 años, el impuesto suele rondar el 4.75% o 9.75% de su valor tablas, más unos 600€ de gestión e ITV.</p>

              </div>

              <div className="space-y-4">

                <h3 className="text-white font-bold uppercase text-sm tracking-widest">¿Qué documentos necesito para el Modelo 576?</h3>

                <p className="text-gray-400 text-sm leading-relaxed">Necesitarás la ficha técnica alemana (Teil I y Teil II), la factura de compra o contrato traducido y el <strong>Certificado de Conformidad (COC)</strong> para acreditar las emisiones exactas.</p>

              </div>

            </div>

          </section>



          <section className="mt-32 pt-20 border-t border-white/10">

            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">

              <div className="text-left">

                <h2 className="text-3xl font-serif font-bold flex items-center gap-3 text-left">

                  <CheckCircle2 className="text-gold-400" size={28} />

                  Referencia Reales <span className="text-gold-400 italic font-normal text-xl ml-2">(Coches 3 años)</span>

                </h2>

                <p className="text-gray-500 mt-2 text-sm text-left">Ejemplos basados en las tablas oficiales del BOE y nuestra experiencia en importación.</p>

              </div>

              <div className="hidden md:block">

                <Car className="text-white/10" size={80} />

              </div>

            </div>



            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] mb-12 sm:mb-16">

              <div className="overflow-x-auto -mx-4 sm:mx-0">

                <table className="w-full text-left border-collapse min-w-[600px]">

                  <thead>

                    <tr className="bg-white/5">

                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black">Modelo</th>

                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">Valor BOE (Aprox)</th>

                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">CO2</th>

                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black text-right">Impuesto</th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-white/5">

                    {ejemplosImportacion.map((item, index) => (

                      <tr key={index} className="hover:bg-white/[0.03] transition-colors group">

                        <td className="p-5 font-bold text-white group-hover:text-gold-400 transition-colors text-left">{item.modelo}</td>

                        <td className="p-5 text-center text-gray-400 font-mono text-xs">{item.valor}</td>

                        <td className="p-5 text-center text-gray-500 font-mono text-xs italic">{item.co2}</td>

                        <td className="p-5 text-right font-mono font-bold text-white bg-white/[0.01]">{item.impuesto}</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 text-gray-400 border-t border-white/5 pt-20">

              <div className="space-y-4 text-left">

                <div className="flex items-center gap-3 text-white mb-2">

                  <FileText className="text-gold-400" size={20} />

                  <h3 className="font-bold uppercase text-xs tracking-widest text-left">Matriculación con Asistente de IA</h3>

                </div>

                <p className="text-sm leading-relaxed text-left">

                  Muchos usuarios buscan <strong>cómo calcular el impuesto de matriculación</strong> sin errores. Nuestra herramienta pionera incluye un <strong>asistente de IA</strong> que consulta las tablas del <strong>BOE 2026</strong> por ti, ahorrándote trámites tediosos.

                </p>

              </div>



              <div className="space-y-4 text-left">

                <div className="flex items-center gap-3 text-white mb-2">

                  <Globe className="text-gold-400" size={20} />

                  <h3 className="font-bold uppercase text-xs tracking-widest text-left">Importar de Alemania ahora es más fácil</h3>

                </div>

                <p className="text-sm leading-relaxed text-left">

                  Calcular <strong>cuánto cuesta matricular un coche alemán en España</strong> ya no es un misterio. Con la tecnología de <strong>Premium German Cars</strong>, obtienes el desglose exacto del Modelo 576 y gastos de gestión en segundos.

                </p>

              </div>



              <div className="space-y-4 text-left">

                <div className="flex items-center gap-3 text-white mb-2">

                  <ShieldCheck className="text-gold-400" size={20} />

                  <h3 className="font-bold uppercase text-xs tracking-widest text-left">Seguridad en tu inversión Premium</h3>

                </div>

                <p className="text-sm leading-relaxed text-left">

                  No te la juegues con los <strong>costes de importar un coche</strong>. Nuestra calculadora puntera analiza emisiones y antigüedad para que tu presupuesto sea 100% real. Confía en la asesoría líder de <strong>premiumgermancars.com</strong>.

                </p>

              </div>

            </div>



            <p className="mt-20 text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">

              Premium German Cars — Gestión Integral de Impuestos y Tasas

            </p>

          </section>

        </div>

      </main>



      <Footer />

      <WhatsAppButton />

    </div>

  );

};


















