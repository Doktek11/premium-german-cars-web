import { useState, useEffect } from 'react';

import { useLocation, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";
import { Navbar } from '../components/Navbar';

import { Footer } from '../components/Footer';

import { SEO } from '../components/SEO';

import { WhatsAppButton } from '../components/WhatsAppButton';
import { CalculatorLeadCapture } from "../components/CalculatorLeadCapture";
import { LeadCapture } from "../components/LeadCapture";
import { SeoIntentLinks, seoIntentLinks } from "../components/SeoIntentLinks";

import { 

  Gauge, 

  Calendar, 

  Euro, 

  AlertTriangle, 

  ArrowRight, 

  Info, 

  CheckCircle2, 

  Car, 

  RotateCcw, 

  Bot, 

  Search,

  HelpCircle 

} from 'lucide-react';



const PRECIO_MIN = 0;
const PRECIO_MAX = 150000;
const PRECIO_DEFAULT = 45000;
const EMISIONES_MIN = 0;
const EMISIONES_MAX = 350;
const EMISIONES_DEFAULT = 155;
const MESES_MIN = 1;
const MESES_MAX = 120;
const MESES_DEFAULT = 36;

const getInitialSliderValue = (
  searchParams: URLSearchParams,
  paramName: string,
  defaultValue: number,
  min: number,
  max: number
) => {
  const paramValue = searchParams.get(paramName);

  if (paramValue === null) return defaultValue;

  const numericValue = Number(paramValue);

  if (!Number.isFinite(numericValue)) return defaultValue;

  return Math.min(max, Math.max(min, Math.trunc(numericValue)));
};

export const CalculadoraImpuestos = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [precio, setPrecio] = useState<number>(
    getInitialSliderValue(searchParams, "valor", PRECIO_DEFAULT, PRECIO_MIN, PRECIO_MAX)
  );

  const [emisiones, setEmisiones] = useState<number>(
    getInitialSliderValue(searchParams, "co2", EMISIONES_DEFAULT, EMISIONES_MIN, EMISIONES_MAX)
  );

  const [meses, setMeses] = useState<number>(
    getInitialSliderValue(searchParams, "antiguedad", MESES_DEFAULT, MESES_MIN, MESES_MAX)
  );

  const [esComunidadIncrementada, setEsComunidadIncrementada] = useState<boolean>(false);

  const [resultado, setResultado] = useState({ matriculacion: 0, tramo: 0 });

  const leadContext = useMemo(
    () =>
      getLeadContext(
        location.pathname,
        location.search,
        typeof document !== "undefined" ? document.title : ""
      ),
    [location.pathname, location.search]
  );



  const ejemplosImportacion = [

    { modelo: "Audi A3 Sportback 35 TFSI", valor: "21.105€", co2: "128g", impuesto: "1.002€" },

    { modelo: "VW Golf GTI (Mk8)", valor: "28.140€", co2: "163g", impuesto: "2.743€" },

    { modelo: "BMW 320d (G20)", valor: "30.820€", co2: "127g", impuesto: "1.464€" },

    { modelo: "Mercedes-Benz A 200", valor: "22.780€", co2: "134g", impuesto: "1.082€" },

    { modelo: "Audi Q5 40 TDI Quattro", valor: "37.520€", co2: "166g", impuesto: "3.658€" },

    { modelo: "VW Tiguan 2.0 TDI", valor: "25.460€", co2: "142g", impuesto: "1.209€" },

  ];

  const ultimaActualizacionBoe = '5 abril 2026';

  const comparisonWhatsAppUrl =
    "https://wa.me/34603743608?text=Hola,%20tengo%20un%20di%C3%A9sel%20y%20un%20gasolina%20vistos%20en%20Alemania%20y%20quiero%20comparar%20impuesto,%20CO2,%20documentaci%C3%B3n%20y%20coste%20final%20puesto%20en%20Espa%C3%B1a.";

  const calculatorFaqs = [
    {
      question: "¿Paga más impuesto de matriculación un diésel o un gasolina?",
      answer:
        "No depende directamente del combustible. El impuesto se calcula principalmente según las emisiones oficiales de CO₂, el valor del vehículo y su antigüedad. Por eso puede pagar más un gasolina, un diésel o incluso dos versiones distintas del mismo modelo según sus datos concretos.",
    },
    {
      question: "¿Qué cuesta más importar de Alemania, un diésel o un gasolina?",
      answer:
        "Depende de la unidad. Un diésel moderno puede pagar menos impuesto si emite menos CO₂, pero un gasolina puede compensar si tiene mejor precio de compra, menos kilómetros, mejor estado o más demanda futura.",
    },
    {
      question: "¿Cómo comparo el impuesto entre dos versiones del mismo coche?",
      answer:
        "Introduce en la calculadora los datos de la versión diésel y anota el resultado. Después haz lo mismo con la versión gasolina. La diferencia entre ambos resultados te dará una referencia clara del impacto fiscal.",
    },
    {
      question: "¿El CO₂ que aparece en Mobile.de sirve para calcular el impuesto?",
      answer:
        "Puede servir como orientación, pero no debería ser la única referencia. Antes de comprar conviene comprobar el CO₂ con documentación técnica, ficha oficial o Certificado de Conformidad.",
    },
    {
      question: "¿Qué pasa si el coche no acredita emisiones de CO₂?",
      answer:
        "Si las emisiones no se acreditan correctamente, el cálculo puede ser menos favorable. Por eso es importante revisar la documentación antes de pagar una reserva o cerrar la compra.",
    },
    {
      question: "¿Un diésel moderno suele pagar menos impuesto?",
      answer:
        "Puede ocurrir, sobre todo en modelos premium donde la versión diésel tiene menos CO₂ que la gasolina equivalente. Pero no es una regla absoluta. Hay que calcular cada unidad.",
    },
    {
      question: "¿Merece la pena importar un gasolina aunque pague más impuesto?",
      answer:
        "Sí, puede merecer la pena si el precio en Alemania, el estado del coche, el equipamiento, el kilometraje o la futura reventa compensan la diferencia fiscal.",
    },
    {
      question: "¿Premium German Cars puede revisar una unidad antes de comprarla?",
      answer:
        "Sí. Podemos revisar anuncio, vendedor, documentación, CO₂, valor fiscal aproximado, impuesto, transporte, ITV y viabilidad de importación antes de que reserves el coche.",
    },
  ];

  const calculadoraJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Calculadora diésel vs gasolina: impuesto de matriculación",
        url: "https://www.premiumgermancars.com/calculadora-impuesto-matriculacion",
        description: "Herramienta para estimar si paga más impuesto un coche diésel o gasolina al importarlo de Alemania según CO₂, valor BOE y antigüedad.",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: "es-ES",
        isAccessibleForFree: true,
        dateModified: "2026-04-05",
        featureList: [
          "Comparación orientativa entre diésel y gasolina",
          "Cálculo por tramos de emisiones CO2",
          "Aplicación de depreciación orientativa por antigüedad",
          "Estimación del impuesto de matriculación en España"
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR"
        },
        author: {
          "@type": "Organization",
          name: "Premium German Cars",
          url: "https://www.premiumgermancars.com"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: calculatorFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        }))
      }
    ]
  };



  const abrirAsistenteIA = () => {
    trackLeadEvent("lead_followup_click", {
      leadType: "calculadora-impuestos",
      channel: "assistant",
      pagePath: location.pathname,
      cta: "calculator_ai_assistant",
      context: leadContext,
    });

    const url = "https://chatgpt.com/g/g-6a1be090eecc8191861cf1da04ae2a44-pgc-asistente-de-valoracion-oficial";

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

  const handleWhatsAppVerification = () => {
    trackLeadEvent("lead_followup_click", {
      leadType: "calculadora-impuestos",
      channel: "whatsapp",
      pagePath: location.pathname,
      cta: "calculator_verify_whatsapp",
      calculatorRate: resultado.tramo,
      calculatorTax: Math.round(resultado.matriculacion),
      context: leadContext,
    });

    const message = `Hola, estoy comparando un coche diésel y uno gasolina de Alemania. He usado la calculadora con un valor de ${precio}€, ${emisiones} g/km de CO₂ y ${meses} meses de antigüedad. ¿Me ayudáis a verificar el impuesto y el coste final puesto en España?`;

    window.open(
      `https://wa.me/34603743608?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };



  return (

    <div className="min-h-screen bg-black text-white">

      <SEO

        title="Diésel o gasolina: impuesto al importar un coche | PGC"

        description="Calcula si paga más impuesto un coche diésel o gasolina al importarlo de Alemania. Usa CO₂, valor BOE y antigüedad para estimarlo."

        canonical="https://www.premiumgermancars.com/calculadora-impuesto-matriculacion"
        jsonLd={calculadoraJsonLd}
      />

      

      <Navbar />

      

      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">

        <div className="container mx-auto max-w-5xl">

          <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="text-center md:text-left">

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-bold mb-4 uppercase tracking-tighter text-left">

                Diésel o gasolina: calcula cuál paga más impuesto al importar

              </h1>

              <div className="space-y-3 text-gray-400 text-base sm:text-lg max-w-2xl text-left">
                <p>
                  ¿Estás comparando un coche diésel y uno gasolina para importar de Alemania? Antes de decidir solo por consumo, etiqueta ambiental o precio de compra, conviene revisar un punto clave: el impuesto de matriculación.
                </p>
                <p>
                  En España, el impuesto de matriculación no se calcula por el tipo de combustible de forma directa. Un coche no paga más simplemente por ser diésel o gasolina. Lo que realmente determina el impuesto son tres datos: emisiones oficiales de CO₂, valor fiscal del vehículo y antigüedad.
                </p>
                <p>
                  Por eso, dos versiones del mismo modelo pueden tener un coste final muy distinto al matricularlas en España. La clave no es elegir “diésel o gasolina” de forma genérica, sino calcular cada unidad concreta.
                </p>
              </div>

            </div>

            <button 

              onClick={resetCalculadora}

              className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all min-h-[48px] touch-manipulation"

            >

              <RotateCcw size={14} /> Limpiar datos

            </button>

          </header>



          <div className="mb-8 sm:mb-10 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl text-left">

            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gold-400 mb-3">
              Resumen rápido
            </p>

            <p className="text-sm text-gray-300">

              El impuesto no depende directamente del combustible. Paga más el coche que emite más CO₂, teniendo en cuenta también el valor fiscal y la antigüedad. En muchos modelos premium, una versión diésel moderna puede quedar en un tramo inferior al gasolina equivalente, pero no siempre compensa. Hay que valorar el coste final puesto en España.

            </p>
            <p className="text-xs text-gray-400 mt-3">
              Si además quieres valorar uso, mantenimiento, etiqueta y reventa, consulta nuestra{" "}
              <a href="/blog/que-motor-elegir-importar-alemania-2026" className="text-gold-400 hover:text-white transition-colors">
                guía completa de diésel vs gasolina en 2026
              </a>.
            </p>

          </div>

          <section className="mb-8 sm:mb-10 bg-white/[0.02] border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl text-left">
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.15em] mb-4">
              Cómo usar la calculadora
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              Para calcular el impuesto de matriculación necesitas dos datos clave: el valor fiscal del coche cuando era nuevo y sus emisiones oficiales de CO₂. Si ya tienes esos datos, puedes introducirlos directamente. Si no los sabes, que es lo más habitual al valorar un coche de Alemania, puedes usar primero el asistente de IA.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border border-white/10 bg-black/30 p-5 rounded-2xl">
                <h3 className="text-white font-bold uppercase text-xs tracking-[0.18em] mb-3">
                  No sé el valor BOE ni el CO₂
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Es el caso más habitual. Si tienes una unidad vista en Alemania pero no conoces el valor fiscal del coche nuevo ni sus emisiones oficiales, entra primero en el asistente de IA.
                </p>
                <ol className="space-y-2 text-xs text-gray-400 mb-5">
                  <li>1. Introduce marca, modelo, versión y año del coche.</li>
                  <li>2. El asistente te dará una referencia de valor y emisiones.</li>
                  <li>3. Recibirás un enlace a esta calculadora con los datos ya introducidos.</li>
                  <li>4. Revisa el resultado y, si quieres, solicita el reporte para que podamos verificarlo.</li>
                </ol>
                <button
                  onClick={abrirAsistenteIA}
                  className="inline-flex items-center justify-center gap-3 bg-gold-500 text-black px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all min-h-[44px]"
                >
                  Buscar valores con el asistente IA <ArrowRight size={14} />
                </button>
              </div>
              <div className="border border-white/10 bg-black/30 p-5 rounded-2xl">
                <h3 className="text-white font-bold uppercase text-xs tracking-[0.18em] mb-3">
                  Ya sé el valor del coche y el CO₂
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Si ya conoces el valor fiscal aproximado del vehículo y sus emisiones oficiales de CO₂, puedes introducir los datos directamente en la calculadora.
                </p>
                <ol className="space-y-2 text-xs text-gray-400 mb-5">
                  <li>1. Introduce el valor del vehículo.</li>
                  <li>2. Añade las emisiones de CO₂.</li>
                  <li>3. Indica la antigüedad en meses.</li>
                  <li>4. La calculadora estimará el impuesto de matriculación.</li>
                </ol>
                <a
                  href="#calculadora-inputs"
                  className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all min-h-[44px]"
                >
                  Introducir datos manualmente <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>

          <SeoIntentLinks
            title="Antes de decidir una unidad"
            intro="La cifra del impuesto es solo una parte del presupuesto. Estos enlaces completan el contexto fiscal, técnico y comercial antes de comprar en Alemania."
            links={seoIntentLinks.calculator}
          />



          <div className="mb-8 sm:mb-10 bg-gradient-to-r from-gold-900/10 to-transparent border border-gold-500/20 p-4 sm:p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm text-left">

            <div className="flex gap-5 items-start">

              <div className="bg-gold-500/20 p-3 rounded-2xl">

                <Bot className="text-gold-400" size={32} />

              </div>

              <div>

                <h2 className="text-gold-400 font-bold uppercase text-xs tracking-[0.2em] mb-2 flex items-center gap-2 text-left">

                  <Search size={14}/> Paso 1: averigua los datos del coche

                </h2>

                <p className="text-gray-300 text-sm leading-relaxed max-w-xl text-left">

                  ¿No conoces el valor BOE o el CO₂ exacto de la unidad? Consulta nuestro asistente de valoración para obtener una referencia antes de calcular. Recuerda que el resultado debe verificarse siempre con documentación oficial, COC y datos fiscales vigentes.

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



          <div id="calculadora-inputs" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">

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

                        ¿Coche sin emisiones acreditadas o caso fiscal especial?

                      </span>

                      <p className="text-[10px] text-gray-400 leading-tight uppercase font-medium">

                        Marca esta opción si el vehículo no declara emisiones de CO₂, no permite acreditar el dato técnico con claridad o requiere aplicar un supuesto fiscal incrementado. Antes de comprar, conviene revisar documentación, COC y comunidad autónoma aplicable.

                      </p>

                    </div>

                  </div>

                </div>



                <div className="flex justify-between items-end mb-4">

                  <div className="flex flex-col">

                    <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 mb-1 tracking-widest">

                      <Euro size={14}/> Valor del vehículo

                    </label>

                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">

                      Valor fiscal/BOE aproximado

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

                  type="range" min={PRECIO_MIN} max={PRECIO_MAX} step="100"

                  value={precio} onChange={(e) => setPrecio(Number(e.target.value))}

                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"

                />



                <div className="mt-4 p-4 bg-gold-400/5 border border-gold-400/10 rounded-xl flex gap-3 items-center text-left">

                  <Info size={18} className="text-gold-400 shrink-0" />

                  <p className="text-[11px] text-gray-400 leading-snug italic">

                    <strong className="text-white not-italic">Uso profesional:</strong> si el coche no acredita correctamente las emisiones en documentación técnica, el cálculo puede ser menos favorable. Verifica siempre el COC antes de reservar.

                  </p>

                </div>

              </div>



              <div className="text-left">

                <div className="flex justify-between mb-4">

                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 tracking-widest">

                    <Gauge size={14}/> Emisiones CO₂: {emisiones} g/km

                  </label>

                </div>

                <input 

                  type="range" min={EMISIONES_MIN} max={EMISIONES_MAX} step="1"

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

                  type="range" min={MESES_MIN} max={MESES_MAX} step="1"

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

                  <LeadCapture />



                  <CalculatorLeadCapture
                    precio={precio}
                    emisiones={emisiones}
                    meses={meses}
                    tramo={resultado.tramo}
                    impuesto={resultado.matriculacion}
                    reduccion={getReduccionText()}
                  />

                  <button
                    onClick={handleWhatsAppVerification}
                    className="mt-4 flex items-center justify-center gap-3 w-full py-4 border border-white/20 text-white font-extrabold rounded-xl hover:bg-white hover:text-black transition-all uppercase text-[11px] tracking-[0.15em] min-h-[48px] touch-manipulation"
                  >
                    Comparar por WhatsApp <ArrowRight size={16} />
                  </button>

                </div>

              </div>

              

              <div className="bg-red-900/5 border border-red-900/20 p-6 rounded-2xl flex gap-4 text-left">

                <AlertTriangle className="text-red-700 shrink-0" size={20} />

                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-medium">

                  {esComunidadIncrementada 

                    ? "ATENCIÓN: se está aplicando un supuesto incrementado o especial por falta de acreditación de emisiones o por criterio fiscal aplicable. Conviene revisar documentación antes de comprar."

                    : "Este cálculo es orientativo. El resultado final puede variar según COC, documentación técnica, valor fiscal aplicable, comunidad autónoma y situación concreta del vehículo."}

                </p>

              </div>

            </div>

          </div>


          <section className="mb-8 sm:mb-10 bg-white/[0.02] border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl text-left">
            <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.15em] mb-4">
              Cómo calcula esta herramienta
            </h2>
            <p className="text-sm text-gray-300 mb-5">
              La calculadora estima el impuesto de matriculación a partir de tres variables: CO₂, valor del vehículo y antigüedad. Es una aproximación útil para comparar unidades antes de comprar, pero no sustituye una revisión fiscal individual.
            </p>
            <ol className="space-y-3 text-sm text-gray-300 mb-5">
              <li>1. Determina el tramo de impuesto por emisiones oficiales de CO₂.</li>
              <li>2. Aplica una depreciación orientativa según la antigüedad del vehículo.</li>
              <li>3. Calcula el impuesto estimado sobre la base resultante.</li>
            </ol>
            <p className="text-xs text-gray-500">
              Para cerrar el coste real de importación hay que revisar documentación alemana, COC, ITV, valor fiscal aplicable y gastos de matriculación.
            </p>
          </section>

          <section className="mb-8 sm:mb-10 bg-gold-500/5 border border-gold-500/20 p-4 sm:p-6 rounded-2xl text-left">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gold-400 mb-2">
              Última actualización BOE
            </h3>
            <p className="text-sm text-gray-300">
              Revisado el {ultimaActualizacionBoe}. Cálculo orientativo alineado con tramos de CO₂ y criterios fiscales usados habitualmente en importación de vehículos. Verificar siempre con normativa vigente antes de liquidar el impuesto.
            </p>
          </section>

          <section className="mb-16 sm:mb-20 md:mb-24 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/[0.02] border border-white/5 rounded-3xl text-left">
            <h2 className="text-3xl font-serif font-bold mb-6 italic text-gold-400">
              Ejemplo práctico: mismo coche, distinto motor
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Imagina dos versiones de un mismo modelo premium importado desde Alemania. Si ambas tienen un valor fiscal similar, la diferencia de CO₂ puede hacer que una caiga en un tramo inferior y pague menos impuesto.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/30 mb-8">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black">Versión</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">Valor fiscal estimado</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">CO₂</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">Antigüedad</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">Tramo orientativo</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black text-right">Impuesto estimado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-5 font-bold text-white">Diésel moderno</td>
                      <td className="p-5 text-center text-gray-400 font-mono text-xs">30.000€</td>
                      <td className="p-5 text-center text-gray-500 font-mono text-xs italic">135 g/km</td>
                      <td className="p-5 text-center text-gray-500 font-mono text-xs">36 meses</td>
                      <td className="p-5 text-center text-gold-400 font-mono text-xs">4,75%</td>
                      <td className="p-5 text-right font-mono font-bold text-white bg-white/[0.01]">955€ aprox.</td>
                    </tr>
                    <tr>
                      <td className="p-5 font-bold text-white">Gasolina equivalente</td>
                      <td className="p-5 text-center text-gray-400 font-mono text-xs">30.000€</td>
                      <td className="p-5 text-center text-gray-500 font-mono text-xs italic">168 g/km</td>
                      <td className="p-5 text-center text-gray-500 font-mono text-xs">36 meses</td>
                      <td className="p-5 text-center text-gold-400 font-mono text-xs">9,75%</td>
                      <td className="p-5 text-right font-mono font-bold text-white bg-white/[0.01]">1.960€ aprox.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              En este caso, el gasolina pagaría alrededor de 1.000€ más de impuesto de matriculación. Pero esto no significa que siempre convenga el diésel. Si la unidad gasolina está mucho mejor de precio, tiene mejor historial, menos kilómetros o mejor equipamiento, puede seguir siendo una compra más interesante.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4 font-semibold">
              La decisión correcta debe hacerse con el coste total puesto en España, no solo con el impuesto.
            </p>
          </section>


          <section className="mb-16 sm:mb-20 md:mb-24 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/[0.02] border border-white/5 rounded-3xl text-left">
            <h2 className="text-3xl font-serif font-bold mb-6 italic text-gold-400">
              Por qué el CO₂ pesa más que el combustible
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 leading-relaxed">
              <div className="space-y-4">
                <p>
                  El impuesto de matriculación se basa en las emisiones oficiales, no en si el coche es diésel o gasolina. Por eso, un diésel eficiente puede pagar menos que un gasolina potente, pero un gasolina híbrido o mild hybrid también puede resultar competitivo si sus emisiones homologadas son bajas.
                </p>
                <p>
                  Esto es especialmente importante en coches premium, SUV grandes, versiones deportivas o unidades con configuraciones poco habituales. Un Audi Q5 TFSI, un BMW M Performance, un Mercedes AMG o un Porsche gasolina pueden tener un impuesto sensiblemente superior si entran en un tramo alto.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Antes de comprar, no basta con mirar el consumo anunciado. Para calcular el impuesto necesitas la cifra de CO₂ válida para matriculación en España, normalmente a través del COC o documentación técnica.
                </p>
                <p>
                  Si además quieres completar el presupuesto, revisa <a href="/blog/cuanto-cuesta-importar-coche-alemania-2026" className="text-gold-400 hover:text-white transition-colors">cuánto cuesta importar un coche de Alemania</a> y los <a href="/blog/5-riesgos-importar-coche-alemania" className="text-gold-400 hover:text-white transition-colors">riesgos de comprar un coche en Alemania sin revisión previa</a>.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 sm:mb-20 md:mb-24 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/[0.02] border border-white/5 rounded-3xl text-left">
            <h2 className="text-3xl font-serif font-bold mb-8 italic text-gold-400">
              Qué datos necesitas antes de comprar en Alemania
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400 leading-relaxed">
              <div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">CO₂ homologado</h3>
                <p className="text-sm">Es el dato más importante para comparar diésel y gasolina. No uses solo una ficha comercial genérica. Lo ideal es verificar las emisiones en documentación oficial o COC.</p>
              </div>
              <div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Valor fiscal o valor BOE</h3>
                <p className="text-sm">El impuesto no siempre se calcula sobre el precio exacto que pagas al vendedor alemán. En muchos casos se toma como referencia un valor fiscal, aplicando después la depreciación correspondiente.</p>
              </div>
              <div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Fecha de primera matriculación</h3>
                <p className="text-sm">La antigüedad cambia la base de cálculo. Dos coches con el mismo CO₂ pueden pagar distinto si uno tiene 18 meses y otro 48 meses.</p>
              </div>
              <div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Documentación alemana</h3>
                <p className="text-sm">Antes de comprar, conviene revisar Teil I, Teil II, factura o contrato, historial, número de bastidor y coherencia documental.</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Certificado de Conformidad</h3>
                <p className="text-sm">El COC es especialmente importante cuando hay dudas sobre emisiones, homologación o configuración técnica del vehículo. También puedes consultar <a href="/blog/guia-calculo-impuesto-matriculacion-boe-2025" className="text-gold-400 hover:text-white transition-colors">cómo calcular el impuesto de matriculación con tablas BOE</a>.</p>
              </div>
            </div>
          </section>

          <section className="mb-16 sm:mb-20 md:mb-24 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/[0.02] border border-white/5 rounded-3xl text-left">
            <h2 className="text-3xl font-serif font-bold mb-8 italic text-gold-400">
              Diésel o gasolina: cuándo puede interesar cada uno
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400 leading-relaxed">
              <div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Cuándo puede interesar importar un diésel</h3>
                <p className="text-sm">Un diésel puede tener sentido si haces muchos kilómetros, buscas consumos bajos y el modelo concreto tiene emisiones de CO₂ contenidas. En coches como BMW 320d, Audi A4 TDI, Mercedes Clase C diésel o SUV premium con motor TDI, el impuesto puede ser competitivo si el CO₂ queda en un tramo bajo.</p>
              </div>
              <div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Cuándo puede interesar importar un gasolina</h3>
                <p className="text-sm">Un gasolina puede ser más interesante si buscas menor complejidad mecánica en determinados usos, mejor tacto de conducción, versiones deportivas o una unidad concreta con buen precio en Alemania. Aunque pague algo más de impuesto, el coste final puede seguir siendo bueno.</p>
              </div>
              <div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-3">Cuándo hay que tener especial cuidado</h3>
                <p className="text-sm">Hay que prestar atención en coches potentes, SUV grandes, versiones deportivas o unidades sin CO₂ claro. En estos casos, calcular antes de reservar puede evitar sorpresas.</p>
              </div>
            </div>
          </section>



          <section className="mt-32 pt-20 border-t border-white/10">

            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">

              <div className="text-left">

                <h2 className="text-3xl font-serif font-bold flex items-center gap-3 text-left">

                  <CheckCircle2 className="text-gold-400" size={28} />

                  Ejemplos orientativos en coches premium

                </h2>

                <p className="text-gray-500 mt-2 text-sm text-left">Valores aproximados para visualizar cómo influyen CO₂, valor fiscal y antigüedad en el impuesto de matriculación.</p>

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

                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">CO₂</th>

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

            <p className="text-xs text-gray-500 text-left">
              Valores orientativos. El cálculo final puede variar según COC, documentación técnica, tablas vigentes, comunidad autónoma y situación fiscal concreta.
            </p>



            <div className="mt-20 border-t border-white/5 pt-20 text-left">
              <h2 className="text-3xl font-serif font-bold mb-6 italic text-gold-400">
                Error habitual: decidir solo por el precio de Alemania
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed max-w-4xl">
                <p>
                  Uno de los errores más frecuentes al importar es comparar dos coches únicamente por el precio anunciado. Un gasolina puede ser más barato en Alemania, pero pagar más impuesto. Un diésel puede pagar menos impuesto, pero tener más kilómetros o peor historial. Sin calcular el coste final, es fácil tomar una decisión equivocada.
                </p>
                <p>
                  En Premium German Cars revisamos la operación completa: precio, vendedor, historial, documentación, CO₂, impuesto, transporte, ITV y coste final estimado puesto en España.
                </p>
                <p>
                  Antes de reservar, también puedes ver cómo trabajamos para <a href="/blog/revision-coche-alemania-protocolo-auditoria" className="text-gold-400 hover:text-white transition-colors">revisar un coche en Alemania antes de comprarlo</a>.
                </p>
              </div>
              <a
                href={comparisonWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-bold transition-colors"
              >
                Comparar dos unidades antes de comprar
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-16 p-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-3xl text-left">
              <div className="bg-black p-8 md:p-12 rounded-[calc(1.5rem-1px)]">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-5">
                  ¿Tienes un diésel y un gasolina vistos en Alemania?
                </h2>
                <p className="text-gray-300 leading-relaxed max-w-3xl mb-8">
                  Si ya tienes dos unidades localizadas, podemos ayudarte a compararlas antes de que reserves. Envíanos los enlaces de los coches y revisamos si el vendedor es fiable, si el precio tiene sentido, si el CO₂ está correctamente identificado, qué impuesto podría pagar cada unidad y cuál tiene mejor coste final puesta en España.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                    <span>Revisión del anuncio y vendedor.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                    <span>Comprobación de CO₂ y documentación.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                    <span>Estimación de impuesto de matriculación.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                    <span>Transporte, ITV y coste final.</span>
                  </li>
                  <li className="flex items-start gap-3 md:col-span-2">
                    <CheckCircle2 className="text-gold-400 shrink-0 mt-0.5" size={18} />
                    <span>Recomendación sobre qué unidad compensa más.</span>
                  </li>
                </ul>
                <a
                  href={comparisonWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gold-500 hover:bg-white text-black font-black transition-all"
                >
                  Enviar unidades para valoración
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <section className="mt-20 pt-20 border-t border-white/10 text-left">
              <h2 className="text-3xl font-serif font-bold mb-10 flex items-center gap-3">
                <HelpCircle className="text-gold-400" size={28} />
                Preguntas frecuentes sobre diésel, gasolina e impuesto de matriculación
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {calculatorFaqs.map((faq) => (
                  <article key={faq.question} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h3 className="font-bold text-white mb-3">{faq.question}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-20 pt-20 border-t border-white/10 text-left">
              <h2 className="text-3xl font-serif font-bold mb-6 italic text-gold-400">
                Calcula antes de reservar
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed max-w-4xl">
                <p>
                  Importar un coche premium de Alemania puede ser una buena oportunidad, pero solo si el coste final está bien calculado antes de comprar. La diferencia entre un diésel y un gasolina no está solo en el consumo o en la etiqueta. También puede estar en el CO₂, el impuesto de matriculación, el valor fiscal, la documentación y los gastos de puesta en España.
                </p>
                <p>
                  En Premium German Cars te ayudamos a revisar la unidad antes de tomar una decisión: anuncio, vendedor, historial, documentación, emisiones, impuesto, transporte, ITV y matriculación.
                </p>
                <p>
                  ¿Tienes un Audi, BMW, Mercedes, Porsche o Volkswagen localizado en Alemania? Envíanos el enlace y te ayudamos a valorar si realmente compensa importarlo.
                </p>
              </div>
              <a
                href={comparisonWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-8 px-7 py-4 rounded-full bg-gold-500 hover:bg-white text-black font-black transition-all"
              >
                Enviar coche para valoración
                <ArrowRight size={18} />
              </a>
            </section>

            <p className="mt-20 text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">
              Premium German Cars - Gestión Integral de Impuestos y Tasas
            </p>

          </section>

        </div>

      </main>



      <Footer />

      <WhatsAppButton />

    </div>

  );

};
