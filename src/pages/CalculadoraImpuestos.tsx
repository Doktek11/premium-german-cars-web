import { useState, useEffect } from 'react';

import { useLocation, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { getLeadContext } from "../lib/leadAttribution";
import { trackLeadEvent } from "../lib/analytics";
import {
  getInitialSliderValue,
  getInitialSpecialCase,
  getInitialStringValue,
} from "../lib/calculatorUrlPrefill";
import {
  calculateRegistrationTax,
  getTerritoryFromParam,
  parseRateParam,
  TERRITORIES,
} from "../lib/registrationTax.mjs";
import {
  calculatorFaqs,
  calculatorJsonLd,
} from "../data/corePageSchemas.mjs";
import { Navbar } from '../components/Navbar';

import { Footer } from '../components/Footer';

import { SEO } from '../components/SEO';

import { WhatsAppButton } from '../components/WhatsAppButton';
import { CalculatorLeadCapture } from "../components/CalculatorLeadCapture";
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

const formatPercent = (value: number) =>
  `${value.toLocaleString("es-ES", { maximumFractionDigits: 2 })} %`;

export const CalculadoraImpuestos = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTerritory = getTerritoryFromParam(
    getInitialStringValue(searchParams, ["territorio", "territory"])
  );
  const initialOrigin = getInitialStringValue(searchParams, ["origen", "origin"]);
  const initialUrlRate = parseRateParam(getInitialStringValue(searchParams, ["tramo"]));
  const hasPrefilledData = [
    "valor",
    "valor_boe",
    "valorBoe",
    "precio",
    "valor_fiscal",
    "valorFiscal",
    "co2",
    "emisiones",
    "emisiones_co2",
    "emisionesCO2",
    "antiguedad",
    "antiguedad_meses",
    "antiguedadMeses",
    "meses",
    "meses_antiguedad",
    "mesesAntiguedad",
  ].some((paramName) => searchParams.has(paramName));
  const isAssistantPrefill = initialOrigin.toLocaleLowerCase("es-ES") === "asistente_pgc";


  const [precio, setPrecio] = useState<number>(
    getInitialSliderValue(
      searchParams,
      ["valor", "valor_boe", "valorBoe", "precio", "valor_fiscal", "valorFiscal"],
      PRECIO_DEFAULT,
      PRECIO_MIN,
      PRECIO_MAX
    )
  );

  const [emisiones, setEmisiones] = useState<number>(
    getInitialSliderValue(
      searchParams,
      ["co2", "emisiones", "emisiones_co2", "emisionesCO2"],
      EMISIONES_DEFAULT,
      EMISIONES_MIN,
      EMISIONES_MAX
    )
  );

  const [meses, setMeses] = useState<number>(
    getInitialSliderValue(
      searchParams,
      [
        "antiguedad",
        "antiguedad_meses",
        "antiguedadMeses",
        "meses",
        "meses_antiguedad",
        "mesesAntiguedad",
      ],
      MESES_DEFAULT,
      MESES_MIN,
      MESES_MAX
    )
  );

  const [territorioId, setTerritorioId] = useState<string>(initialTerritory?.id ?? "");
  const [emisionesNoAcreditadas, setEmisionesNoAcreditadas] = useState<boolean>(
    getInitialSpecialCase(searchParams)
  );

  const [resultado, setResultado] = useState({
    matriculacion: 0,
    tramo: 0,
    needsTerritory: false,
    isProvisionalTerritory: false,
    territoryLabel: "",
    isUrlRateConsistent: true,
  });

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

  const verificationWhatsAppUrl =
    "https://wa.me/34603743608?text=Hola,%20tengo%20un%20coche%20visto%20en%20Alemania%20y%20quiero%20verificar%20impuesto,%20CO%E2%82%82,%20documentaci%C3%B3n%20y%20coste%20final%20puesto%20en%20Espa%C3%B1a.";

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

    setTerritorioId("");

    setEmisionesNoAcreditadas(false);

    setSearchParams({}, { replace: true });

  };



  useEffect(() => {

    const taxResult = calculateRegistrationTax({
      price: precio,
      emissions: emisiones,
      months: meses,
      territoryId: territorioId || null,
      noAccreditedEmissions: emisionesNoAcreditadas,
      urlRate: initialUrlRate,
    });

    setResultado({

      matriculacion: taxResult.tax,

      tramo: taxResult.rate,

      needsTerritory: taxResult.needsTerritory,

      isProvisionalTerritory: taxResult.isProvisionalTerritory,

      territoryLabel: taxResult.territoryForRate.displayName,


      isUrlRateConsistent: taxResult.isUrlRateConsistent,

    });

  }, [precio, emisiones, meses, territorioId, emisionesNoAcreditadas, initialUrlRate]);



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

    const territoryText = resultado.needsTerritory
      ? resultado.isProvisionalTerritory
        ? " Territorio pendiente de selección; tipo provisional aplicado: 14,75 %."
        : ` Territorio de matriculación: ${resultado.territoryLabel}.`
      : "";
    const message = `Hola, he usado la calculadora de impuesto de matriculación con un valor de ${precio}€, ${emisiones} g/km de CO₂ y ${meses} meses de antigüedad. El tramo estimado es ${resultado.tramo}% y el impuesto es de ${Math.round(resultado.matriculacion)}€.${territoryText} ¿Me ayudáis a verificar el impuesto y el coste final de importar este coche a España?`;

    window.open(
      `https://wa.me/34603743608?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };



  return (

    <div className="min-h-screen bg-black text-white">

      <SEO

        title="Calculadora Impuesto Matriculación 2026 | Coche Importado Alemania"

        description="Calcula el impuesto de matriculación de un coche importado de Alemania según CO₂, valor fiscal y antigüedad. Estimación orientativa antes de comprar."

        canonical="https://www.premiumgermancars.com/calculadora-impuesto-matriculacion"
        jsonLd={calculatorJsonLd}
      />

      

      <Navbar />

      

      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">

        <div className="container mx-auto max-w-5xl">

          <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="text-center md:text-left">

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-bold mb-4 uppercase tracking-tighter text-left">

                Calculadora de impuesto de matriculación para coches importados

              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-2xl text-left">
                Calcula una estimación orientativa con el valor fiscal, el CO₂ y la antigüedad. Si llegas desde el Asistente PGC, los datos aparecen cargados para revisarlos o modificarlos.
              </p>

            </div>

            <button 

              onClick={resetCalculadora}

              className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all min-h-[48px] touch-manipulation"

            >

              <RotateCcw size={14} /> Limpiar datos

            </button>

          </header>



          {hasPrefilledData && (
            <div className="mb-6 rounded-2xl border border-gold-400/20 bg-gold-400/5 p-4 text-left text-sm text-gold-100">
              Hemos cargado los datos localizados para este vehículo. Puedes revisarlos o modificarlos.
              {isAssistantPrefill && <span> Proceden del Asistente PGC.</span>}
            </div>
          )}

          <section className="mb-8 sm:mb-10 bg-gold-500/5 border border-gold-500/20 p-4 sm:p-6 rounded-2xl text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-gold-500/15 p-3 text-gold-400">
                  <Bot size={24} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white uppercase tracking-[0.15em] mb-2">
                    ¿Ya tienes un coche visto en Alemania?
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                    Pega el enlace del anuncio en nuestro asistente o indica el modelo y la fecha de matriculación. Localizará el Valor BOE y una referencia de CO₂, y abrirá esta calculadora con los datos preparados.
                  </p>
                </div>
              </div>
              <button
                onClick={abrirAsistenteIA}
                className="inline-flex items-center justify-center gap-3 bg-gold-500 text-black px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all min-h-[44px]"
              >
                Analizar coche con el asistente <ArrowRight size={14} />
              </button>
            </div>
          </section>

          <div id="calculadora-inputs" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24">

            <div className={`lg:col-span-7 space-y-10 sm:space-y-12 bg-white/[0.03] p-4 sm:p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm ${hasPrefilledData ? "order-2 lg:order-1" : "order-1"}`}>

              <div className="text-left">

                <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-8 border-b border-white/5 pb-4">

                  Datos para el cálculo

                </h3>



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

              <div className="text-left rounded-2xl border border-white/10 bg-black/20 p-5">
                <button
                  type="button"
                  className="w-full rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  onClick={() => setEmisionesNoAcreditadas(!emisionesNoAcreditadas)}
                  aria-pressed={emisionesNoAcreditadas}
                >
                  <div className="flex items-start gap-4">
                    <div className={emisionesNoAcreditadas ? "mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all bg-gold-500 border-gold-500" : "mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all border-gray-600"}>
                      {emisionesNoAcreditadas && <CheckCircle2 size={14} className="text-black" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black uppercase tracking-widest text-white mb-1">
                        Las emisiones oficiales no constan en la documentación
                      </span>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Este supuesto aplica el tramo fiscal correspondiente a emisiones no acreditadas. No lo marques si simplemente estás utilizando una referencia de CO₂ obtenida por el asistente.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {resultado.needsTerritory && (
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-left">
                  <label htmlFor="territorio-matriculacion" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                    ¿Dónde vas a matricular el coche?
                  </label>
                  <select
                    id="territorio-matriculacion"
                    value={territorioId}
                    onChange={(event) => setTerritorioId(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition-colors focus:border-gold-400 min-h-[48px]"
                  >
                    <option value="">Selecciona dónde matricularás el coche</option>
                    {TERRITORIES.map((territory) => (
                      <option key={territory.id} value={territory.id}>
                        {territory.label}
                      </option>
                    ))}
                  </select>
                  {resultado.isProvisionalTerritory && (
                    <p className="mt-3 text-xs text-gold-300 leading-relaxed">
                      Tipo provisional aplicado: 14,75 %. Selecciona el territorio de matriculación para ajustar el cálculo.
                    </p>
                  )}
                  {emisionesNoAcreditadas && !territorioId && (
                    <p className="mt-3 text-xs text-red-300 leading-relaxed">
                      Para emisiones no acreditadas conviene seleccionar el territorio antes de usar el resultado como referencia.
                    </p>
                  )}
                </div>
              )}

            </div>



            <div className={`lg:col-span-5 space-y-4 sm:space-y-6 ${hasPrefilledData ? "order-1 lg:order-2" : "order-2 lg:order-2"}`}>

              <div className="bg-gold-500 p-[1px] rounded-3xl shadow-2xl shadow-gold-500/10 text-left">

                <div className="bg-black rounded-[calc(1.5rem-1px)] p-6 sm:p-8">

                  <span className="text-xs text-gray-500 uppercase block mb-2 tracking-[0.2em] text-center">Impuesto Estimado</span>

                  <div className="text-6xl font-serif font-bold text-white mb-8 text-center tracking-tighter">

                    {Math.round(resultado.matriculacion).toLocaleString()}€

                  </div>



                  <div className="space-y-4 pt-6 border-t border-white/10 text-sm">
                    <div className="flex justify-between items-center gap-4 text-left">
                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Tipo aplicado</span>
                      <span className="text-gold-400 font-mono font-bold text-lg">{formatPercent(resultado.tramo)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 text-left">
                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">CO₂ utilizado</span>
                      <span className="text-white font-mono">{emisiones} g/km</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 text-left">
                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Antigüedad</span>
                      <span className="text-white font-mono">{meses} meses</span>
                    </div>
                    {resultado.needsTerritory && (
                      <div className="flex justify-between items-center gap-4 text-left">
                        <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Territorio</span>
                        <span className="text-white font-mono text-right">{resultado.isProvisionalTerritory ? "Pendiente de selección" : resultado.territoryLabel}</span>
                      </div>
                    )}
                    <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-gray-300">
                      {resultado.needsTerritory ? (
                        resultado.isProvisionalTerritory ? (
                          <>
                            Tipo provisional aplicado: {formatPercent(resultado.tramo)}. Selecciona el territorio de matriculación para ajustar el cálculo.
                          </>
                        ) : (
                          <>
                            Tipo aplicado: {formatPercent(resultado.tramo)}. Matriculación en {resultado.territoryLabel}.
                          </>
                        )
                      ) : (
                        <>
                          Tipo aplicado: {formatPercent(resultado.tramo)}. El territorio no modifica este tramo ordinario por CO₂.
                        </>
                      )}
                    </p>
                    {!resultado.isUrlRateConsistent && (
                      <p className="text-xs leading-relaxed text-gold-300">
                        El tramo recibido por URL no coincide con el CO₂ y el territorio. Se aplica el valor calculado por la herramienta.
                      </p>
                    )}
                    <div className="flex justify-between items-center gap-4 text-left">
                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Reducción aplicada</span>
                      <span className="text-white font-mono">{getReduccionText()}</span>
                    </div>
                  </div>

                  <CalculatorLeadCapture
                    precio={precio}
                    emisiones={emisiones}
                    meses={meses}
                    tramo={resultado.tramo}
                    impuesto={resultado.matriculacion}
                    reduccion={getReduccionText()}
                    territoryLabel={resultado.needsTerritory ? resultado.territoryLabel : ""}
                    isProvisionalTerritory={resultado.isProvisionalTerritory}
                  />

                  <button
                    onClick={handleWhatsAppVerification}
                    className="mt-4 flex items-center justify-center gap-3 w-full py-4 border border-white/20 text-white font-extrabold rounded-xl hover:bg-white hover:text-black transition-all uppercase text-[11px] tracking-[0.15em] min-h-[48px] touch-manipulation"
                  >
                    Verificar cálculo por WhatsApp <ArrowRight size={16} />
                  </button>

                </div>

              </div>

              

              <div className="bg-red-900/5 border border-red-900/20 p-6 rounded-2xl flex gap-4 text-left">

                <AlertTriangle className="text-red-700 shrink-0" size={20} />

                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-medium">

                  {emisionesNoAcreditadas

                    ? "ATENCIÓN: las emisiones oficiales no constan en la documentación. Selecciona el territorio para afinar el tipo aplicable."

                    : resultado.isProvisionalTerritory

                      ? "ATENCIÓN: falta el territorio de matriculación. Tipo provisional aplicado: 14,75 %. Selecciona el territorio de matriculación para ajustar el cálculo."

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

            <div className="mt-16">
              <SeoIntentLinks
                title="Completa el coste de importación"
                intro="El impuesto es una parte del presupuesto. Revisa también documentación, transporte y trámites antes de comprar en Alemania."
                links={seoIntentLinks.calculator}
              />
            </div>



            <section className="mt-16 border border-white/10 bg-white/[0.02] p-6 text-left sm:p-8">
              <h2 className="mb-4 font-serif text-2xl font-bold text-white">
                ¿Diésel o gasolina?
              </h2>
              <p className="max-w-3xl text-sm leading-relaxed text-gray-400">
                El impuesto de matriculación no depende directamente del combustible, sino principalmente del CO₂ oficial, el valor fiscal y la antigüedad. Si estás comparando dos motores, calcula cada unidad por separado y revisa después nuestra guía completa sobre qué motor elegir en 2026.
              </p>
              <a
                href="/blog/que-motor-elegir-importar-alemania-2026"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-400 transition-colors hover:text-white"
              >
                Ver guía diésel vs gasolina en 2026
                <ArrowRight size={16} />
              </a>
            </section>

            <section className="mt-20 pt-20 border-t border-white/10 text-left">
              <h2 className="text-3xl font-serif font-bold mb-10 flex items-center gap-3">
                <HelpCircle className="text-gold-400" size={28} />
                Preguntas frecuentes sobre la calculadora de matriculación
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
                  Antes de reservar un coche en Alemania, revisa el impuesto, el CO₂, el valor fiscal, la documentación y el coste final puesto en España.
                </p>
              </div>
              <a
                href={verificationWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-8 px-7 py-4 rounded-full bg-gold-500 hover:bg-white text-black font-black transition-all"
              >
                Verificar coche antes de comprar
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
