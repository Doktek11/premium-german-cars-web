import { useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, Bot, Calendar, Car, CheckCircle2, Euro, Gauge, HelpCircle, RotateCcw, Sparkles } from "lucide-react";
import { getLeadContext } from "../lib/leadAttribution";
import { getCalculatorActionState } from "../lib/calculatorActionState";
import { trackLeadEvent } from "../lib/analytics";
import { getInitialEmissionsStandard, getInitialIntegerParam, getInitialNumberInputValue, getInitialNumberParam, getInitialRateParam, getInitialSpecialCase, getInitialStringValue, getInitialVehicleCondition, parseCalculatorNumberInput } from "../lib/calculatorUrlPrefill";
import { calculateRegistrationTax, getTerritoryFromParam, TERRITORIES, VEHICLE_CONDITIONS } from "../lib/registrationTax.mjs";
import type { EmissionsStandard, RegistrationTaxResult, VehicleCondition } from "../lib/registrationTax.mjs";
import { calculatorFaqs, calculatorJsonLd } from "../data/corePageSchemas.mjs";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { CalculatorLeadCapture } from "../components/CalculatorLeadCapture";
import { SeoIntentLinks, seoIntentLinks } from "../components/SeoIntentLinks";

const PRECIO_DEFAULT = 45000;
const EMISIONES_DEFAULT = 155;
const MESES_DEFAULT = 36;
const MONTH_PARAM_NAMES = ["antiguedad", "antiguedad_meses", "antiguedadMeses", "meses", "meses_antiguedad", "mesesAntiguedad"];
const DATE_PARAM_NAMES = ["fecha_primera_matriculacion", "firstRegistrationDate", "first_registration_date"];
const euro = (value: number | null | undefined) => typeof value === "number" && Number.isFinite(value) ? `${Math.round(value).toLocaleString("es-ES")} EUR` : "No disponible";
const euroExact = (value: number | null | undefined) => typeof value === "number" && Number.isFinite(value) ? `${value.toLocaleString("es-ES", { maximumFractionDigits: 2 })} EUR` : "No disponible";
const percent = (value: number | null | undefined) => typeof value === "number" && Number.isFinite(value) ? `${(value * 100).toLocaleString("es-ES", { maximumFractionDigits: 2 })} %` : "No disponible";
const warningCodes = (warnings: string[]) => warnings.map((warning) => warning.slice(0, 48)).join("|");
const firstPresentParamValue = (params: URLSearchParams, names: string[]) => {
  for (const name of names) {
    if (params.has(name)) {
      return params.get(name) ?? "";
    }
  }

  return null;
};

const getInitialDate = (params: URLSearchParams, boeValue: number, emissions: number, territoryId: string, urlRate: number | null, condition: VehicleCondition, standard: EmissionsStandard, noAccredited: boolean, months: number | null) => {
  const canonicalDate = firstPresentParamValue(params, DATE_PARAM_NAMES);
  if (canonicalDate !== null) return canonicalDate.trim();
  if (months === null) return "";
  return calculateRegistrationTax({ boeValue, emissions, months, territoryId: territoryId || null, urlRate, vehicleCondition: condition, emissionsStandard: standard, noAccreditedEmissions: noAccredited }).firstRegistrationDate ?? "";
};

export const CalculadoraImpuestos = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTerritory = getTerritoryFromParam(getInitialStringValue(searchParams, ["territorio", "territory"]));
  const initialUrlRateParam = getInitialRateParam(searchParams, ["tramo"]);
  const initialUrlRate = initialUrlRateParam.status === "valid" ? initialUrlRateParam.value : null;
  const initialCondition = getInitialVehicleCondition(searchParams) as VehicleCondition;
  const initialStandard = getInitialEmissionsStandard(searchParams) as EmissionsStandard;
  const initialBoeValueParam = getInitialNumberParam(searchParams, ["valor", "valor_boe", "valorBoe", "precio", "valor_fiscal", "valorFiscal"], PRECIO_DEFAULT);
  const initialEmissionsParam = getInitialNumberParam(searchParams, ["co2", "emisiones", "emisiones_co2", "emisionesCO2"], EMISIONES_DEFAULT);
  const initialMonthsParam = getInitialIntegerParam(searchParams, MONTH_PARAM_NAMES, MESES_DEFAULT);
  const initialBoeValueForDate = initialBoeValueParam.status === "invalid" ? PRECIO_DEFAULT : initialBoeValueParam.value;
  const initialEmissionsForDate = initialEmissionsParam.status === "invalid" ? EMISIONES_DEFAULT : initialEmissionsParam.value;
  const initialMonthsForDate = initialMonthsParam.status === "invalid" ? null : initialMonthsParam.value;
  const initialNoAccredited = getInitialSpecialCase(searchParams);
  const hasCanonicalDateParam = DATE_PARAM_NAMES.some((name) => searchParams.has(name));
  const hasPrefilledData = ["valor_boe", "valor", "precio", "co2", "emisiones", "antiguedad", "antiguedad_meses", "fecha_primera_matriculacion", "tramo"].some((name) => searchParams.has(name));
  const isAssistantPrefill = getInitialStringValue(searchParams, ["origen", "origin"]).toLocaleLowerCase("es-ES") === "asistente_pgc";

  const [boeValueInput, setBoeValueInput] = useState(() => getInitialNumberInputValue(initialBoeValueParam));
  const [emissionsInput, setEmissionsInput] = useState(() => getInitialNumberInputValue(initialEmissionsParam));
  const [firstRegistrationDate, setFirstRegistrationDate] = useState(() => getInitialDate(searchParams, initialBoeValueForDate, initialEmissionsForDate, initialTerritory?.id ?? "", initialUrlRate, initialCondition, initialStandard, initialNoAccredited, initialMonthsForDate));
  const [territoryId, setTerritoryId] = useState(initialTerritory?.id ?? "");
  const [vehicleCondition, setVehicleCondition] = useState<VehicleCondition>(initialCondition);
  const [emissionsStandard, setEmissionsStandard] = useState<EmissionsStandard>(initialStandard);
  const [noAccreditedEmissions, setNoAccreditedEmissions] = useState(initialNoAccredited);

  const boeValue = parseCalculatorNumberInput(boeValueInput);
  const emissions = parseCalculatorNumberInput(emissionsInput);
  const hasInvalidBoeValue = boeValue === null;
  const hasInvalidEmissions = emissions === null;
  const isUsingLegacyMonths = !firstRegistrationDate.trim() && !hasCanonicalDateParam;
  const hasInvalidLegacyMonths = isUsingLegacyMonths && initialMonthsParam.status === "invalid";

  const result = useMemo<RegistrationTaxResult>(() => calculateRegistrationTax({ boeValue: boeValue ?? Number.NaN, emissions: emissions ?? Number.NaN, firstRegistrationDate: firstRegistrationDate || null, territoryId: territoryId || null, noAccreditedEmissions, vehicleCondition, emissionsStandard, urlRate: initialUrlRate }), [boeValue, emissions, firstRegistrationDate, territoryId, noAccreditedEmissions, vehicleCondition, emissionsStandard, initialUrlRate]);
  const hasInvalidFirstRegistrationDate = Boolean(firstRegistrationDate.trim()) && result.firstRegistrationDate === null && result.warningCodes.includes("INVALID_INPUT");
  const hasIncompatibleLegacyMonths = hasCanonicalDateParam && initialMonthsParam.status === "valid" && result.months !== null && result.months !== initialMonthsParam.value;
  const urlParameterWarnings = [
    initialUrlRateParam.status === "invalid" ? "El tramo recibido por URL no es valido. No se usa como tramo validado ni altera la cuota calculada." : "",
    hasIncompatibleLegacyMonths ? "La URL incluye fecha de primera matriculacion y antiguedad_meses incompatibles. Se conserva la fecha canonica." : "",
  ].filter(Boolean);
  const urlParameterWarningCodes = [
    initialUrlRateParam.status === "invalid" ? "INVALID_URL_RATE_PARAM" : "",
    hasIncompatibleLegacyMonths ? "INCOMPATIBLE_LEGACY_MONTHS_PARAM" : "",
  ].filter(Boolean);
  const calculatorActionState = getCalculatorActionState({ hasInvalidBoeValue, hasInvalidEmissions, hasInvalidLegacyMonths, hasInvalidFirstRegistrationDate, supportedCalculation: result.supportedCalculation });
  const isCalculatorActionBlocked = calculatorActionState.blocked;
  const leadContext = useMemo(() => getLeadContext(location.pathname, location.search, typeof document !== "undefined" ? document.title : ""), [location.pathname, location.search]);
  const commonAnalytics = { calculationSupported: result.supportedCalculation, calculationScope: result.scope, territoryId: result.territoryForRate.id, provisionalTerritory: result.isProvisionalTerritory, vehicleCondition, emissionsStandard, warningCodes: [warningCodes(result.warnings), urlParameterWarningCodes.join("|")].filter(Boolean).join("|") };

  const resetCalculadora = () => { setBoeValueInput(""); setEmissionsInput(""); setFirstRegistrationDate(""); setTerritoryId(""); setVehicleCondition(VEHICLE_CONDITIONS.USED_IMPORTED); setEmissionsStandard("unknown"); setNoAccreditedEmissions(false); setSearchParams({}, { replace: true }); };
  const abrirAsistenteIA = () => { trackLeadEvent("lead_followup_click", { leadType: "calculadora-impuestos", channel: "assistant", pagePath: location.pathname, cta: "calculator_ai_assistant", ...commonAnalytics, context: leadContext }); window.open("https://chatgpt.com/g/g-6a1be090eecc8191861cf1da04ae2a44-pgc-asistente-de-valoracion-oficial", "_blank"); };
  const handleWhatsAppVerification = () => {
    if (isCalculatorActionBlocked) {
      return;
    }

    trackLeadEvent("lead_followup_click", { leadType: "calculadora-impuestos", channel: "whatsapp", pagePath: location.pathname, cta: "calculator_verify_whatsapp", ...commonAnalytics, ...(result.supportedCalculation ? { calculatorTax: Math.round(result.tax ?? 0) } : {}), context: leadContext });
    const statusText = result.supportedCalculation ? `Calculo estimado disponible: cuota ${euro(result.tax)}, base imponible ${euro(result.taxableBase)}.` : `Caso que requiere revision individual: ${result.exclusionReason || "faltan datos fiscales suficientes"}.`;
    const message = `Hola, he usado la calculadora. Valor BOE nuevo: ${boeValueInput || "pendiente"} EUR, primera matriculacion: ${firstRegistrationDate || "pendiente"}, CO2: ${emissionsInput || "pendiente"} g/km, territorio: ${result.territoryForRate.displayName}. ${statusText} Me ayudais a verificar el impuesto y el coste final?`;
    window.open(`https://wa.me/34603743608?text=${encodeURIComponent(message)}`, "_blank");
  };

  const blockedButtonClass = isCalculatorActionBlocked ? " disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-white" : "";
  const examples = [
    { model: "BMW 320d (G20)", boeValue: 30820, firstRegistrationDate: "2023-07", emissions: 127 },
    { model: "VW Golf GTI (Mk8)", boeValue: 28140, firstRegistrationDate: "2022-07", emissions: 163 },
    { model: "Audi Q5 40 TDI Quattro", boeValue: 37520, firstRegistrationDate: "2021-08-15", emissions: 166 },
  ].map((item) => ({ ...item, result: calculateRegistrationTax({ ...item, calculationDate: "2026-07-01", territoryId: "peninsula_general", vehicleCondition: VEHICLE_CONDITIONS.USED_IMPORTED }) }));

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO title="Calculadora Impuesto Matriculacion 2026 | Coche Importado Alemania" description="Calcula el impuesto de matriculacion de un coche usado importado segun Valor BOE, primera matriculacion, CO2, territorio y base imponible fiscal." canonical="https://www.premiumgermancars.com/calculadora-impuesto-matriculacion" jsonLd={calculatorJsonLd} />
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif font-bold mb-4 uppercase tracking-tighter">Calculadora de impuesto de matriculacion para coches importados</h1>
              <p className="text-gray-400 text-base sm:text-lg max-w-2xl">Estimacion para vehiculos usados previamente matriculados en el extranjero y primera matriculacion definitiva en Espana.</p>
            </div>
            <button onClick={resetCalculadora} className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all min-h-[48px]"><RotateCcw size={14} /> Limpiar datos</button>
          </header>

          <button
            type="button"
            onClick={abrirAsistenteIA}
            aria-label="Probar el Asistente PGC: Prueba nuestra nueva calculadora mejorada. Calcula IEDMT, ITP/TPO, IVTM y tasa DGT con ayuda del Asistente PGC."
            className="pgc-assistant-promo group mb-6 w-full max-w-full overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-r from-white/[0.07] via-gold-500/10 to-white/[0.03] p-4 text-left shadow-2xl shadow-gold-500/10 transition-all hover:border-gold-400/60 hover:bg-gold-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:p-5"
          >
            <span className="flex min-w-0 flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <span className="flex min-w-0 items-start gap-3 sm:gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold-400/25 bg-gold-500/15 text-gold-300">
                  <Sparkles size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="mb-2 inline-flex rounded-full border border-gold-400/25 bg-black/30 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-gold-300">NUEVO</span>
                  <span className="block text-base font-serif font-bold leading-tight text-white sm:text-xl">Prueba nuestra nueva calculadora mejorada</span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-gray-300">Calcula IEDMT, ITP/TPO, IVTM y tasa DGT con ayuda del Asistente PGC.</span>
                </span>
              </span>
              <span className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-black transition-all group-hover:bg-white sm:w-auto">
                Probar el Asistente PGC <ArrowRight size={14} aria-hidden="true" />
              </span>
            </span>
          </button>

          {hasPrefilledData && <div className="mb-6 rounded-2xl border border-gold-400/20 bg-gold-400/5 p-4 text-left text-sm text-gold-100">Hemos cargado los datos localizados para este vehiculo. Puedes revisarlos o modificarlos.{isAssistantPrefill && <span> Proceden del Asistente PGC.</span>}</div>}

          <section className="mb-8 bg-gold-500/5 border border-gold-500/20 p-4 sm:p-6 rounded-2xl text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-start gap-4"><div className="rounded-2xl bg-gold-500/15 p-3 text-gold-400"><Bot size={24} /></div><div><h2 className="text-base font-bold text-white uppercase tracking-[0.15em] mb-2">Ya tienes un coche visto?</h2><p className="text-sm text-gray-300 leading-relaxed max-w-2xl">Pega el anuncio en el asistente. Localizara el Valor BOE y una referencia de CO2 para preparar la revision fiscal.</p></div></div>
              <button onClick={abrirAsistenteIA} className="inline-flex items-center justify-center gap-3 bg-gold-500 text-black px-5 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all min-h-[44px]">Analizar coche <ArrowRight size={14} /></button>
            </div>
          </section>

          <div id="calculadora-inputs" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16">
            <div className="lg:col-span-7 space-y-8 bg-white/[0.03] p-4 sm:p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl">
              <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] border-b border-white/5 pb-4 text-left">Datos para el calculo</h3>
              <div className="text-left"><label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 mb-1 tracking-widest"><Euro size={14} /> Valor BOE del vehiculo nuevo</label><p className="text-[11px] text-gray-500 mb-4">Introduce el valor publicado en las tablas oficiales. La calculadora aplicara la antiguedad y estimara la base imponible.</p><input type="text" inputMode="decimal" value={boeValueInput} onChange={(event) => setBoeValueInput(event.target.value)} className="w-full max-w-xs rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold-400" />{hasInvalidBoeValue && <p className="mt-3 text-xs text-red-200">Valor BOE no valido. Corrige este campo para calcular sin usar valores predeterminados.</p>}</div>
              <div className="text-left"><label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 mb-3 tracking-widest"><Car size={14} /> Condicion fiscal del vehiculo</label><select value={vehicleCondition} onChange={(event) => setVehicleCondition(event.target.value as VehicleCondition)} className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold-400"><option value={VEHICLE_CONDITIONS.USED_IMPORTED}>Usado y previamente matriculado en el extranjero</option><option value={VEHICLE_CONDITIONS.NEW_OR_NOT_PREVIOUSLY_REGISTERED}>Nuevo o no matriculado previamente</option><option value={VEHICLE_CONDITIONS.UNKNOWN}>No estoy seguro</option></select></div>
              <div className="grid gap-6 md:grid-cols-2"><div className="text-left"><label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 mb-3 tracking-widest"><Calendar size={14} /> Primera matriculacion</label><input type="text" inputMode="numeric" placeholder="2021-08-15 o 2021-08" value={firstRegistrationDate} onChange={(event) => setFirstRegistrationDate(event.target.value)} className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold-400" />{result.isDerivedFirstRegistrationDate && <p className="mt-3 text-xs text-gold-300">Fecha estimada desde antiguedad_meses. Confirmala o corrigela.</p>}{hasInvalidLegacyMonths && <p className="mt-3 text-xs text-red-200">antiguedad_meses recibido por URL no es valido. Corrige la fecha para calcular sin usar valores predeterminados.</p>}{hasInvalidFirstRegistrationDate && <p className="mt-3 text-xs text-red-200">Fecha de primera matriculacion no valida. Corrige este campo para calcular.</p>}</div><div className="text-left"><label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 mb-3 tracking-widest"><Gauge size={14} /> Emisiones CO2</label><input type="text" inputMode="decimal" value={emissionsInput} onChange={(event) => setEmissionsInput(event.target.value)} className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold-400" />{hasInvalidEmissions && <p className="mt-3 text-xs text-red-200">CO2 no valido. Corrige este campo para calcular sin usar valores predeterminados.</p>}</div></div>
              <div className="grid gap-6 md:grid-cols-2"><div className="text-left"><label className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-gold-400">Territorio de matriculacion</label><select value={territoryId} onChange={(event) => setTerritoryId(event.target.value)} className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold-400"><option value="">Selecciona territorio</option>{TERRITORIES.map((territory) => <option key={territory.id} value={territory.id}>{territory.label}</option>)}</select></div><div className="text-left"><label className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-gold-400">Norma de emisiones</label><select value={emissionsStandard} onChange={(event) => setEmissionsStandard(event.target.value as EmissionsStandard)} className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-gold-400"><option value="unknown">No consta / revisar documentacion</option><option value="wltp">WLTP</option><option value="nedc">NEDC</option></select></div></div>
              <button type="button" onClick={() => setNoAccreditedEmissions(!noAccreditedEmissions)} aria-pressed={noAccreditedEmissions} className="w-full rounded-2xl border border-white/10 bg-black/20 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"><div className="flex items-start gap-4"><div className={noAccreditedEmissions ? "mt-1 w-5 h-5 rounded border-2 flex items-center justify-center bg-gold-500 border-gold-500" : "mt-1 w-5 h-5 rounded border-2 flex items-center justify-center border-gray-600"}>{noAccreditedEmissions && <CheckCircle2 size={14} className="text-black" />}</div><div><span className="text-[11px] font-black uppercase tracking-widest text-white">Las emisiones oficiales no constan</span><p className="text-xs text-gray-400 leading-relaxed mt-1">No lo marques si solo usas una referencia aproximada del asistente. Este supuesto requiere revision individual.</p></div></div></button>
            </div>
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="bg-gold-500 p-[1px] rounded-3xl shadow-2xl shadow-gold-500/10 text-left"><div className="bg-black rounded-[calc(1.5rem-1px)] p-6 sm:p-8"><span className="text-xs text-gray-500 uppercase block mb-2 tracking-[0.2em] text-center">{result.supportedCalculation ? "Cuota estimada" : "Resultado"}</span><div className="text-5xl font-serif font-bold text-white mb-8 text-center tracking-tighter">{result.supportedCalculation ? euro(result.tax) : "Revision necesaria"}</div>
                {result.supportedCalculation ? <div className="space-y-3 pt-6 border-t border-white/10 text-sm">{[["Valor BOE nuevo", euro(result.boeValue)], ["Antiguedad", `${result.months ?? "-"} meses`], ["Coeficiente", result.depreciationCoefficient?.toLocaleString("es-ES") ?? "No disponible"], ["Valor de mercado", euro(result.marketValue)], [`Impuesto indirecto residual (${result.indirectTaxName})`, percent(result.indirectTaxRate)], ["Tipo IEDMT residual", percent(result.residualRegistrationTaxRate)], ["Base imponible estimada", euroExact(result.taxableBase)], ["Tipo IEDMT actual", percent(result.currentRegistrationTaxRate)]].map(([label, value]) => <div key={label} className="flex justify-between items-center gap-4"><span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">{label}</span><span className="text-white font-mono text-right">{value}</span></div>)}<p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-gray-300">La base imponible no coincide necesariamente con el Valor BOE depreciado. En vehiculos usados previamente matriculados en el extranjero se minora, cuando corresponde, el importe residual de los impuestos indirectos incluido en el valor de mercado.</p></div> : <div className="space-y-3 pt-6 border-t border-white/10 text-sm"><p className="rounded-xl border border-red-900/30 bg-red-900/10 p-3 text-xs leading-relaxed text-red-100">{result.exclusionReason || "Este supuesto requiere un calculo diferente o una revision individual."}</p><p className="text-xs text-gray-400">No mostramos una cuota numerica para evitar una estimacion fiscal no respaldada con los datos actuales.</p></div>}
                {result.warnings.length > 0 && <div className="mt-5 space-y-2">{result.warnings.map((warning) => <p key={warning} className="rounded-xl border border-gold-400/20 bg-gold-400/5 p-3 text-xs leading-relaxed text-gold-100">{warning}</p>)}</div>}
                {urlParameterWarnings.length > 0 && <div className="mt-5 space-y-2">{urlParameterWarnings.map((warning) => <p key={warning} className="rounded-xl border border-gold-400/20 bg-gold-400/5 p-3 text-xs leading-relaxed text-gold-100">{warning}</p>)}</div>}
                {!result.isUrlRateConsistent && <p className="mt-4 text-xs leading-relaxed text-gold-300">El tramo recibido por URL no coincide con el CO2 y el territorio. Se aplica el valor calculado por la herramienta.</p>}
                {isCalculatorActionBlocked ? <p className="mt-6 rounded-xl border border-red-900/30 bg-red-900/10 p-3 text-xs leading-relaxed text-red-100">Corrige los datos marcados antes de enviar el desglose o verificar el calculo. No se usan valores predeterminados cuando la URL trae un dato invalido o fuera del alcance soportado.</p> : <CalculatorLeadCapture boeValue={boeValue as number} emissions={emissions as number} firstRegistrationDate={firstRegistrationDate} vehicleCondition={vehicleCondition} emissionsStandard={emissionsStandard} result={result} externalWarnings={urlParameterWarnings} externalWarningCodes={urlParameterWarningCodes} />}
                <button onClick={handleWhatsAppVerification} disabled={isCalculatorActionBlocked} aria-disabled={isCalculatorActionBlocked} className={`mt-4 flex items-center justify-center gap-3 w-full py-4 border border-white/20 text-white font-extrabold rounded-xl hover:bg-white hover:text-black transition-all uppercase text-[11px] tracking-[0.15em] min-h-[48px]${blockedButtonClass}`}>Verificar calculo por WhatsApp <ArrowRight size={16} /></button>
              </div></div>
              <div className="bg-red-900/5 border border-red-900/20 p-6 rounded-2xl flex gap-4 text-left"><AlertTriangle className="text-red-700 shrink-0" size={20} /><p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-medium">Este calculo es orientativo. La liquidacion final puede variar segun COC, documentacion tecnica, valor fiscal aplicable, territorio y situacion concreta del vehiculo.</p></div>
            </div>
          </div>

          <section className="mb-8 bg-white/[0.02] border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl text-left"><h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.15em] mb-4">Como calcula esta herramienta</h2><ol className="space-y-3 text-sm text-gray-300 mb-5"><li>1. Identifica el alcance fiscal.</li><li>2. Aplica el porcentaje de antiguedad.</li><li>3. Obtiene el valor de mercado.</li><li>4. Minora los impuestos indirectos residuales.</li><li>5. Obtiene la base imponible.</li><li>6. Aplica el tipo actual.</li><li>7. Muestra supuestos y advertencias.</li></ol><p className="text-xs text-gray-500">Si solo conoces mes y ano, la calculadora mantiene compatibilidad con ese dato; julio de 2021 requiere dia exacto por cambio normativo.</p></section>
          <section className="mb-8 bg-gold-500/5 border border-gold-500/20 p-4 sm:p-6 rounded-2xl text-left"><h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gold-400 mb-2">Ultima actualizacion BOE</h3><p className="text-sm text-gray-300">Revisado el 27 julio 2026. Formula alineada con Ley 38/1992, articulo 69, Orden HAC/1501/2025 y ventana temporal CO2 de Ley 11/2021 para vehiculos usados previamente matriculados en el extranjero.</p></section>

          <section className="mt-24 pt-16 border-t border-white/10"><div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6"><div className="text-left"><h2 className="text-3xl font-serif font-bold flex items-center gap-3"><CheckCircle2 className="text-gold-400" size={28} /> Ejemplos orientativos</h2><p className="text-gray-500 mt-2 text-sm">Calculados con la funcion fiscal central y datos completos de ejemplo.</p></div><Car className="hidden md:block text-white/10" size={80} /></div><div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] mb-12"><div className="overflow-x-auto -mx-4 sm:mx-0"><table className="w-full text-left border-collapse min-w-[720px]"><thead><tr className="bg-white/5"><th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black">Modelo</th><th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">Valor BOE nuevo</th><th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">Primera matriculacion</th><th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">CO2</th><th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black text-right">Cuota</th></tr></thead><tbody className="divide-y divide-white/5">{examples.map((item) => <tr key={item.model} className="hover:bg-white/[0.03] transition-colors"><td className="p-5 font-bold text-white text-left">{item.model}</td><td className="p-5 text-center text-gray-400 font-mono text-xs">{euro(item.boeValue)}</td><td className="p-5 text-center text-gray-400 font-mono text-xs">{item.firstRegistrationDate}</td><td className="p-5 text-center text-gray-500 font-mono text-xs italic">{item.emissions} g/km</td><td className="p-5 text-right font-mono font-bold text-white bg-white/[0.01]">{item.result.supportedCalculation ? euro(item.result.tax) : "Revision"}</td></tr>)}</tbody></table></div></div>
            <SeoIntentLinks title="Completa el coste de importacion" intro="El impuesto es una parte del presupuesto. Revisa tambien documentacion, transporte y tramites antes de comprar en Alemania." links={seoIntentLinks.calculator} />
            <section className="mt-20 pt-20 border-t border-white/10 text-left"><h2 className="text-3xl font-serif font-bold mb-10 flex items-center gap-3"><HelpCircle className="text-gold-400" size={28} /> Preguntas frecuentes sobre la calculadora</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-5">{calculatorFaqs.map((faq) => <article key={faq.question} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"><h3 className="font-bold text-white mb-3">{faq.question}</h3><p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p></article>)}</div></section>
            <section className="mt-20 pt-20 border-t border-white/10 text-left"><h2 className="text-3xl font-serif font-bold mb-6 italic text-gold-400">Calcula antes de reservar</h2><p className="max-w-4xl text-gray-400 leading-relaxed">Antes de reservar un coche en Alemania, revisa el impuesto, el CO2, el Valor BOE, la base imponible, la documentacion y el coste final puesto en Espana.</p><button onClick={handleWhatsAppVerification} disabled={isCalculatorActionBlocked} aria-disabled={isCalculatorActionBlocked} className={`inline-flex items-center justify-center gap-2 mt-8 px-7 py-4 rounded-full bg-gold-500 hover:bg-white text-black font-black transition-all disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gold-500 disabled:hover:text-black`}>Verificar coche antes de comprar <ArrowRight size={18} /></button></section>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};