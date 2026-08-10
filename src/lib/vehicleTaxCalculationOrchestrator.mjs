import { VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION, VEHICLE_TAX_CASE_FILE_FACT_STATUSES } from "../data/vehicleTaxCaseFileCatalogs.mjs";
import { classifyVehicleTaxOperation } from "./vehicleTaxOperationClassifier.mjs";
import { calculateRegistrationTax, getDepreciationCoefficient, getMonthsFromFirstRegistrationDate, getTerritoryFromParam } from "./registrationTax.mjs";
import { calculateTransferTax } from "./transferTax.mjs";
import { resolveIvtmMunicipalityData } from "./ivtmDataLookup.mjs";
import { calculateMunicipalVehicleTax } from "./municipalVehicleTax.mjs";
import { calculateRegistrationFee } from "./registrationFee.mjs";
import { calculateVehicleTaxSummary } from "./vehicleTaxSummary.mjs";

export const VEHICLE_TAX_CALCULATION_SCHEMA_VERSION = "vehicle_tax_calculation.v1";
export const VEHICLE_TAX_ORCHESTRATOR_REVISION = "professional-scenario-5089897";
export const VEHICLE_TAX_CALCULATION_STATUSES = Object.freeze({ EXACT: "exact", PARTIAL: "partial", ESTIMATED: "estimated", SCENARIO_REQUIRED: "scenario_required", REQUIRES_REVIEW: "requires_review", IDENTITY_CONFLICT: "identity_conflict", INVALID: "invalid" });
export const VEHICLE_TAX_ENGINE_EXECUTION_STATUSES = Object.freeze({ CALCULATED_CONFIRMED: "calculated_confirmed", CALCULATED_SCENARIO: "calculated_scenario", NOT_RUN_MISSING_INPUTS: "not_run_missing_inputs", NOT_RUN_CONFLICT: "not_run_conflict", FAILED_VALIDATION: "failed_validation", REQUIRES_REVIEW: "requires_review" });
export const VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES = Object.freeze({
  INVALID_ORCHESTRATOR_INPUT: "INVALID_ORCHESTRATOR_INPUT", INCOMPATIBLE_CASE_FILE_SCHEMA: "INCOMPATIBLE_CASE_FILE_SCHEMA", INVALID_ORCHESTRATOR_OPTIONS: "INVALID_ORCHESTRATOR_OPTIONS", VEHICLE_CANDIDATE_REQUIRED: "VEHICLE_CANDIDATE_REQUIRED", ORCHESTRATOR_IDENTITY_CONFLICT: "ORCHESTRATOR_IDENTITY_CONFLICT", ENGINE_INPUTS_MISSING: "ENGINE_INPUTS_MISSING", ENGINE_INPUTS_CONFLICT: "ENGINE_INPUTS_CONFLICT", ENGINE_EXECUTION_FAILED: "ENGINE_EXECUTION_FAILED", IVTM_LOOKUP_FAILED: "IVTM_LOOKUP_FAILED", SUMMARY_NOT_AVAILABLE: "SUMMARY_NOT_AVAILABLE", PROVISIONAL_IEDMT_RESULT: "PROVISIONAL_IEDMT_RESULT", SCENARIO_LIMIT_EXCEEDED: "SCENARIO_LIMIT_EXCEEDED", ORCHESTRATOR_SCENARIOS_TRUNCATED: "ORCHESTRATOR_SCENARIOS_TRUNCATED", UNSAFE_EVIDENCE_SOURCE: "UNSAFE_EVIDENCE_SOURCE", SCENARIO_FROM_DECLARED_DATA: "SCENARIO_FROM_DECLARED_DATA", ASSUMED_TRANSACTION_DATE: "ASSUMED_TRANSACTION_DATE", ASSUMED_PRIVATE_SALE_CONTRACT: "ASSUMED_PRIVATE_SALE_CONTRACT", ASSUMED_PROFESSIONAL_INVOICE: "ASSUMED_PROFESSIONAL_INVOICE", ASSUMED_PROFESSIONAL_REBU: "ASSUMED_PROFESSIONAL_REBU", ASSUMED_SPANISH_REGISTRATION_DATE: "ASSUMED_SPANISH_REGISTRATION_DATE", NON_SERIALIZABLE_ORCHESTRATOR_INPUT: "NON_SERIALIZABLE_ORCHESTRATOR_INPUT",
});
export const VEHICLE_TAX_ORCHESTRATOR_WARNING_MESSAGES = Object.freeze({
  INVALID_ORCHESTRATOR_INPUT: "The orchestrator input is invalid.", INCOMPATIBLE_CASE_FILE_SCHEMA: "The case file schemaVersion is not vehicle_tax_case_file.v1.", INVALID_ORCHESTRATOR_OPTIONS: "The orchestrator options are invalid.", VEHICLE_CANDIDATE_REQUIRED: "A selected vehicle candidate is required.", ORCHESTRATOR_IDENTITY_CONFLICT: "Vehicle identity is unresolved; technical facts were not mixed.", ENGINE_INPUTS_MISSING: "One or more engine inputs are missing or not confirmed.", ENGINE_INPUTS_CONFLICT: "One or more engine inputs are conflicting.", ENGINE_EXECUTION_FAILED: "A tax engine failed during isolated execution.", IVTM_LOOKUP_FAILED: "The IVTM local lookup failed.", SUMMARY_NOT_AVAILABLE: "The tax summary was not calculated because no engine produced a usable result or the summary aggregator failed.", PROVISIONAL_IEDMT_RESULT: "IEDMT returned a provisional territory result and was not treated as exact.", SCENARIO_LIMIT_EXCEEDED: "The requested scenario limit exceeds the absolute maximum.", ORCHESTRATOR_SCENARIOS_TRUNCATED: "Orchestrator scenarios were truncated deterministically.", UNSAFE_EVIDENCE_SOURCE: "A fact was not used because its evidence source is not compatible.", SCENARIO_FROM_DECLARED_DATA: "A scenario calculation uses declared or non-confirmed structured data.", ASSUMED_TRANSACTION_DATE: "A scenario calculation uses calculationDate as the assumed transaction date.", ASSUMED_PRIVATE_SALE_CONTRACT: "A scenario calculation assumes a private-sale contract for a private-to-private transfer when no contract document exists yet.", ASSUMED_PROFESSIONAL_INVOICE: "A professional invoice is assumed only for this documentary scenario.", ASSUMED_PROFESSIONAL_REBU: "A scenario calculation treats compatible REBU structured data as an orientative professional REBU hypothesis.", ASSUMED_SPANISH_REGISTRATION_DATE: "A scenario calculation uses an assumed Spanish registration date.", NON_SERIALIZABLE_ORCHESTRATOR_INPUT: "The orchestrator received non JSON-serializable input.",
});

const ENGINE_IDS = Object.freeze(["iedmt", "itp", "ivtm", "dgt_registration_fee"]);
const ALLOWED_DEPENDENCIES = Object.freeze(["classifyOperation", "calculateIedmt", "calculateItp", "lookupMunicipalData", "calculateIvtm", "calculateDgtFee", "calculateSummary"]);
const DEFAULT_DEPENDENCIES = Object.freeze({ classifyOperation: classifyVehicleTaxOperation, calculateIedmt: calculateRegistrationTax, calculateItp: calculateTransferTax, lookupMunicipalData: resolveIvtmMunicipalityData, calculateIvtm: calculateMunicipalVehicleTax, calculateDgtFee: calculateRegistrationFee, calculateSummary: calculateVehicleTaxSummary });
const OFFICIAL_SOURCE_TYPES = new Set(["official_document", "professional_document"]);
const TECHNICAL_DOCUMENT_TYPES = new Set(["coc", "german_registration_part_i", "german_registration_part_ii", "spanish_technical_card", "technical_inspection_document", "professional_report"]);
const CONTRACTUAL_SOURCE_TYPES = new Set(["contractual_document"]);
const CONTRACTUAL_DOCUMENT_TYPES = new Set(["invoice", "private_sale_contract"]);
const SCENARIO_SOURCE_TYPES = new Set(["official_document", "professional_document", "contractual_document", "vehicle_ad", "user_declaration", "derived", "other"]);
const SCENARIO_FACT_STATUSES = new Set([
  VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED,
  VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE,
  VEHICLE_TAX_CASE_FILE_FACT_STATUSES.INFERRED,
  VEHICLE_TAX_CASE_FILE_FACT_STATUSES.SCENARIO_REQUIRED,
]);
const DESTINATION_FIELDS = new Set(["taxDestination.autonomousCommunity", "taxDestination.province", "taxDestination.foralTerritory", "taxDestination.municipalityCode", "taxDestination.expectedSettlementDate"]);
const USER_DECLARED_CONFIRMED_FIELDS = new Set([...DESTINATION_FIELDS, "vehicle.condition", "transaction.intendedForResale", "parties.buyerTaxResidenceCountry"]);
const INPUT_ALLOWLIST = Object.freeze({
  iedmt: ["boeValue", "emissions", "firstRegistrationDate", "calculationDate", "territoryId", "noAccreditedEmissions", "vehicleCondition", "emissionsStandard", "otherIndirectTaxRate", "urlRate"],
  itp: ["transactionDate", "assumedTransactionDate", "buyerRegion", "buyerProvince", "sellerType", "buyerType", "documentType", "vatRegime", "purchasePrice", "officialMarketValue", "originalBoeValue", "firstRegistrationDate", "vehicleCategory", "engineDisplacement", "fiscalHorsepower", "intendedForResale", "isHistoricVehicle", "isEndOfLifeVehicle", "zeroEmissionStatus", "buyerTaxResidenceCountry", "sellerCountry", "evidence"],
  ivtm: ["municipalityCode", "taxYear", "spanishRegistrationDate", "assumedSpanishRegistrationDate", "fiscalHorsepower", "vehicleType", "zeroEmissionStatus", "isHistoricVehicle", "bonusStatus", "confirmedBonusRate", "bonusEvidence", "calculationDate"],
  dgt_registration_fee: ["procedure", "vehicleType", "feeDate", "assumedSpanishRegistrationDate", "calculationDate", "currency"],
});
const FIELD_TO_OVERRIDE = Object.freeze({ "vehicle.boeValue": "officialMarketValue", "vehicle.co2Wltp": "emissions", "vehicle.co2Nedc": "emissions", "vehicle.firstRegistrationDate": "firstRegistrationDate", "vehicle.category": "vehicleCategory", "vehicle.engineDisplacementCc": "engineDisplacement", "vehicle.fiscalHorsepower": "fiscalHorsepower", "vehicle.zeroEmissionStatus": "zeroEmissionStatus", "transaction.purchasePrice": "purchasePrice", "transaction.date": "transactionDate", "taxDestination.autonomousCommunity": "buyerRegion", "taxDestination.province": "buyerProvince", "taxDestination.foralTerritory": "buyerProvince", "parties.buyerTaxResidenceCountry": "buyerTaxResidenceCountry", "parties.sellerCountry": "sellerCountry" });
const IEDMT_TERRITORY_BY_AUTONOMOUS_COMMUNITY = Object.freeze({
  andalucia: "peninsula_general",
  aragon: "peninsula_general",
  asturias: "asturias",
  canarias: "canarias",
  cantabria: "cantabria",
  castilla_la_mancha: "peninsula_general",
  castilla_y_leon: "peninsula_general",
  cataluna: "cataluna",
  ceuta: "ceuta_melilla",
  comunitat_valenciana: "comunidad_valenciana",
  extremadura: "peninsula_general",
  galicia: "peninsula_general",
  illes_balears: "baleares",
  la_rioja: "peninsula_general",
  madrid: "peninsula_general",
  melilla: "ceuta_melilla",
  murcia: "murcia",
  navarra: "peninsula_general",
  pais_vasco: "peninsula_general",
});
const BASQUE_FORAL_TERRITORIES = new Set(["alava", "bizkaia", "gipuzkoa"]);

function isPlainObject(value) { return !!value && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value)); }
function cloneJson(value) { return value === undefined ? undefined : JSON.parse(JSON.stringify(value)); }
function safeClone(value) { try { return { ok: true, value: cloneJson(value) }; } catch { return { ok: false, value: null }; } }
function uniqueStrings(values) { return [...new Set((Array.isArray(values) ? values : []).filter((value) => typeof value === "string" && value.length > 0))].sort(); }
function codeMessages(codes) { return uniqueStrings([...codes].map((code) => VEHICLE_TAX_ORCHESTRATOR_WARNING_MESSAGES[code]).filter(Boolean)); }
function addCode(codes, code) { if (code) codes.add(code); }
function validIsoDate(value) { if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false; const date = new Date(`${value}T00:00:00.000Z`); return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value; }
function safeCaseId(value) { return typeof value === "string" && /^[A-Za-z0-9._:-]{1,120}$/.test(value) ? value : null; }
function deterministicId(prefix, payload) { const text = JSON.stringify(payload); let hash = 0x811c9dc5; for (let i = 0; i < text.length; i += 1) { hash ^= text.charCodeAt(i); hash = Math.imul(hash, 0x01000193) >>> 0; } return `${prefix}_${hash.toString(16).padStart(8, "0")}`; }
function allowInputs(engineId, input) { const out = {}; for (const key of INPUT_ALLOWLIST[engineId] ?? []) if (Object.hasOwn(input, key) && input[key] !== undefined) out[key] = cloneJson(input[key]); return out; }
function privacySummaryFrom(caseFile) { const s = isPlainObject(caseFile?.sensitiveDataSummary) ? caseFile.sensitiveDataSummary : {}; return { containsPersonalData: s.containsPersonalData === true, categories: uniqueStrings(s.categories), documentCount: Number.isInteger(s.documentCount) && s.documentCount >= 0 ? s.documentCount : 0, evidenceCount: Number.isInteger(s.evidenceCount) && s.evidenceCount >= 0 ? s.evidenceCount : 0, warnings: [] }; }

function validateOptions(options) {
  const missingFields = [];
  const warningCodes = new Set();
  if (!isPlainObject(options)) return { ok: false, missingFields: ["options"], warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_OPTIONS] };
  if (!validIsoDate(options.calculationDate)) missingFields.push("calculationDate");
  if (!Number.isInteger(options.taxYear) || options.taxYear < 1990 || options.taxYear > 2100) missingFields.push("taxYear");
  if (validIsoDate(options.calculationDate) && Number.isInteger(options.taxYear) && Number(options.calculationDate.slice(0, 4)) !== options.taxYear) missingFields.push("taxYear");
  if (options.currency !== "EUR") missingFields.push("currency");
  if (!["confirmed_only", "documentary_scenarios"].includes(options.scenarioPolicy)) missingFields.push("scenarioPolicy");
  if (!Number.isInteger(options.maxScenarios) || options.maxScenarios < 0 || options.maxScenarios > 12) {
    missingFields.push("maxScenarios");
    if (Number.isInteger(options.maxScenarios) && options.maxScenarios > 12) addCode(warningCodes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SCENARIO_LIMIT_EXCEEDED);
  }
  if (missingFields.length > 0) addCode(warningCodes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_OPTIONS);
  return { ok: missingFields.length === 0, missingFields: uniqueStrings(missingFields), warningCodes: [...warningCodes] };
}

function validateDependencies(dependencies) {
  if (dependencies === undefined || dependencies === null) return { ok: true, value: DEFAULT_DEPENDENCIES, missingFields: [], warningCodes: [] };
  if (!isPlainObject(dependencies)) return { ok: false, value: null, missingFields: ["dependencies"], warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_OPTIONS] };
  const keys = Object.keys(dependencies);
  const unknown = keys.filter((key) => !ALLOWED_DEPENDENCIES.includes(key));
  const invalid = keys.filter((key) => ALLOWED_DEPENDENCIES.includes(key) && typeof dependencies[key] !== "function");
  if (unknown.length > 0 || invalid.length > 0) return { ok: false, value: null, missingFields: [...unknown, ...invalid].map((key) => `dependencies.${key}`), warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_OPTIONS] };
  return { ok: true, value: Object.freeze({ ...DEFAULT_DEPENDENCIES, ...dependencies }), missingFields: [], warningCodes: [] };
}

function validateCaseFile(caseFile) {
  if (!isPlainObject(caseFile)) return { ok: false, missingFields: ["caseFile"], warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_INPUT] };
  if (caseFile.schemaVersion !== VEHICLE_TAX_CASE_FILE_SCHEMA_VERSION) return { ok: false, missingFields: ["schemaVersion"], warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INCOMPATIBLE_CASE_FILE_SCHEMA] };
  if (!isPlainObject(caseFile.facts) || !Array.isArray(caseFile.evidence) || !Array.isArray(caseFile.vehicleCandidates)) return { ok: false, missingFields: ["caseFile.shape"], warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_INPUT] };
  return { ok: true, missingFields: [], warningCodes: [] };
}

function engineExecution({ engineId, status, inputStatus, inputsUsed = {}, evidenceIds = [], result = null, assumptions = [], warnings = [], warningCodes = [], missingFields = [], confidenceLevel = "confirmed" }) {
  return cloneJson({ engineId, status, inputStatus, confidenceLevel, inputsUsed: allowInputs(engineId, inputsUsed), evidenceIds: uniqueStrings(evidenceIds), result: result === undefined ? null : result, assumptions: uniqueStrings(assumptions), warnings: uniqueStrings(warnings), warningCodes: uniqueStrings(warningCodes), missingFields: uniqueStrings(missingFields) });
}

function notRun(engineId, status, inputsUsed = {}, evidenceIds = [], missingFields = [], extraCode = null) {
  const conflict = status === VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT;
  const codes = [conflict ? VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ENGINE_INPUTS_CONFLICT : VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ENGINE_INPUTS_MISSING, extraCode].filter(Boolean);
  return engineExecution({ engineId, status, inputStatus: conflict ? "conflict" : "missing", inputsUsed, evidenceIds, warningCodes: codes, warnings: codeMessages(codes), missingFields });
}

function failed(engineId, inputsUsed = {}, evidenceIds = [], code = VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ENGINE_EXECUTION_FAILED) {
  return engineExecution({ engineId, status: VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.FAILED_VALIDATION, inputStatus: "invalid", inputsUsed, evidenceIds, warningCodes: [code], warnings: codeMessages([code]) });
}

function engineStatus(engineId, result, scenario) {
  if (scenario) return VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_SCENARIO;
  if (!isPlainObject(result)) return VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.FAILED_VALIDATION;
  if (engineId === "iedmt") return result.supportedCalculation === true && result.tax !== null && result.isProvisionalTerritory !== true ? VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED : VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.REQUIRES_REVIEW;
  if (engineId === "itp") return ["scenario_required", "review_required"].includes(result.applicability) ? VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.REQUIRES_REVIEW : VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED;
  if (engineId === "ivtm") return result.supportedCalculation === true && result.dataStatus === "verified_municipal" ? VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED : VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.REQUIRES_REVIEW;
  if (engineId === "dgt_registration_fee") return result.status === "confirmed" ? VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED : VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.REQUIRES_REVIEW;
  return VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.REQUIRES_REVIEW;
}

function scenarioAdjustedResultAssumptions(engineId, input, result, scenario) {
  if (!Array.isArray(result?.assumptions)) return null;
  if (!scenario || engineId !== "itp" || input?.sellerType !== "professional" || result?.applicability !== "not_subject") return result.assumptions;
  return result.assumptions.map((assumption) => (
    typeof assumption === "string" && /vendedor profesional confirmado/i.test(assumption)
      ? "A professional seller is assumed from declared data only for this documentary scenario."
      : assumption
  ));
}

function calculated(engineId, input, evidenceIds, result, scenario = false, prepared = null) {
  const status = engineStatus(engineId, result, scenario);
  const codes = [...(prepared?.warningCodes ?? [])];
  const assumptions = [...(prepared?.assumptions ?? [])];
  if (scenario && (prepared?.scenarioFields ?? 0) > 0) {
    codes.push(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SCENARIO_FROM_DECLARED_DATA);
    assumptions.push("Calculo orientativo: usa datos estructurados declarados o no verificados y no constituye evidencia oficial.");
  }
  if (engineId === "iedmt" && result?.isProvisionalTerritory === true) codes.push(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.PROVISIONAL_IEDMT_RESULT);
  const resultAssumptions = scenarioAdjustedResultAssumptions(engineId, input, result, scenario);
  const adjustedResult = resultAssumptions && resultAssumptions !== result.assumptions ? { ...result, assumptions: resultAssumptions } : result;
  return engineExecution({ engineId, status, inputStatus: scenario ? "scenario" : "confirmed", confidenceLevel: confidenceLevel(prepared ?? emptyPrepared(), scenario), inputsUsed: input, evidenceIds, result: adjustedResult, assumptions: [...(resultAssumptions ?? []), ...assumptions], warnings: [...(result?.warnings ?? []), ...codeMessages(codes)], warningCodes: uniqueStrings([...(result?.warningCodes ?? []), ...codes]), missingFields: result?.missingFields ?? [] });
}

function emptyExecutions(status = VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS) { return Object.fromEntries(ENGINE_IDS.map((engineId) => [engineId, notRun(engineId, status)])); }

function readinessFrom(engineExecutions, classification, taxSummary) {
  const readiness = {};
  for (const engineId of ENGINE_IDS) {
    const execution = engineExecutions?.[engineId] ?? notRun(engineId, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS);
    readiness[engineId] = { status: execution.status, inputStatus: execution.inputStatus, missingInputs: cloneJson(execution.missingFields), warningCodes: cloneJson(execution.warningCodes) };
  }
  readiness.classification = { status: classification?.status ?? "invalid", warningCodes: cloneJson(classification?.warningCodes ?? []) };
  readiness.tax_summary = taxSummary ? { status: taxSummary.status, exactTotalBlockedBy: cloneJson(taxSummary.exactTotalBlockedBy ?? []) } : { status: "not_available", exactTotalBlockedBy: cloneJson(ENGINE_IDS) };
  return readiness;
}

function output({ caseFile = null, options = {}, status = VEHICLE_TAX_CALCULATION_STATUSES.INVALID, classification = null, engineExecutions = emptyExecutions(), taxSummary = null, estimatedSummary = null, scenarios = [], warningCodes = [], missingFields = [], assumptions = [] }) {
  const codes = new Set(warningCodes);
  return cloneJson({ schemaVersion: VEHICLE_TAX_CALCULATION_SCHEMA_VERSION, caseId: safeCaseId(caseFile?.caseId), status, calculationDate: validIsoDate(options.calculationDate) ? options.calculationDate : null, taxYear: Number.isInteger(options.taxYear) ? options.taxYear : null, currency: options.currency === "EUR" ? "EUR" : null, classification, engineExecutions, taxSummary, estimatedSummary, scenarios, readiness: readinessFrom(engineExecutions, classification, taxSummary), assumptions: uniqueStrings(assumptions), warnings: codeMessages(codes), warningCodes: uniqueStrings([...codes]), missingFields: uniqueStrings(missingFields), privacySummary: privacySummaryFrom(caseFile) });
}

function selectedCandidate(caseFile) { return caseFile.vehicleCandidates.find((candidate) => candidate.vehicleCandidateId === caseFile.selectedVehicleCandidateId) ?? null; }
function identityConflict(caseFile, candidate) { return caseFile.vehicleCandidates.length > 1 && !candidate || candidate?.status === "identity_conflict" || (caseFile.conflicts ?? []).some((item) => item?.type === "identity_conflict" || item?.severity === "critical_identity") || (candidate?.conflicts ?? []).some((item) => item?.type === "identity_conflict"); }
function evidenceMap(caseFile) { return new Map(caseFile.evidence.filter((item) => typeof item?.evidenceId === "string").map((item) => [item.evidenceId, item])); }
function factFor(caseFile, candidate, field) { return field.startsWith("vehicle.") ? candidate?.facts?.[field] ?? null : caseFile.facts?.[field] ?? null; }
function evidenceKindOk(field, kind, evidenceIds, map) {
  if (kind === "any" || DESTINATION_FIELDS.has(field)) return true;
  if (evidenceIds.length === 0) return false;
  return evidenceIds.some((id) => { const ev = map.get(id); if (!ev) return false; if (kind === "technical") return OFFICIAL_SOURCE_TYPES.has(ev.sourceType) && TECHNICAL_DOCUMENT_TYPES.has(ev.documentType); if (kind === "contractual") return CONTRACTUAL_SOURCE_TYPES.has(ev.sourceType) && CONTRACTUAL_DOCUMENT_TYPES.has(ev.documentType); if (kind === "official") return OFFICIAL_SOURCE_TYPES.has(ev.sourceType); return false; });
}
function confirmedFact(caseFile, candidate, field, map, kind = "any") {
  const fact = factFor(caseFile, candidate, field);
  if (!fact) return { ok: false, reason: "missing", evidenceIds: [] };
  const evidenceIds = uniqueStrings(fact.selectedEvidenceId ? [fact.selectedEvidenceId] : fact.evidenceIds);
  if (fact.status === "conflict" || fact.status === "scenario_required") return { ok: false, reason: "conflict", evidenceIds };
  if (!evidenceKindOk(field, kind, evidenceIds, map)) return { ok: false, reason: "unsafe", evidenceIds };
  const acceptedUserDeclaration = fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.PROBABLE && USER_DECLARED_CONFIRMED_FIELDS.has(field) && evidenceIds.some((id) => map.get(id)?.verificationStatus === "confirmed_user");
  if (fact.status !== VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED && !acceptedUserDeclaration) return { ok: false, reason: fact.status, evidenceIds };
  return { ok: true, value: fact.normalizedValue, evidenceIds, fact, confirmed: fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED };
}
function scenarioEvidenceKindOk(kind, evidenceIds, map) {
  if (kind === "any") return true;
  if (evidenceIds.length === 0) return false;
  return evidenceIds.some((id) => {
    const ev = map.get(id);
    return ev && ev.verificationStatus !== "rejected" && SCENARIO_SOURCE_TYPES.has(ev.sourceType);
  });
}
function scenarioFact(caseFile, candidate, field, map, kind = "any") {
  const fact = factFor(caseFile, candidate, field);
  if (!fact) return { ok: false, reason: "missing", evidenceIds: [] };
  const evidenceIds = uniqueStrings(fact.selectedEvidenceId ? [fact.selectedEvidenceId] : fact.evidenceIds);
  if (fact.status === "conflict") return { ok: false, reason: "conflict", evidenceIds };
  if (!scenarioEvidenceKindOk(kind, evidenceIds, map)) return { ok: false, reason: "unsafe", evidenceIds };
  if (!SCENARIO_FACT_STATUSES.has(fact.status)) return { ok: false, reason: fact.status, evidenceIds };
  return { ok: true, value: fact.normalizedValue, evidenceIds, fact, confirmed: fact.status === VEHICLE_TAX_CASE_FILE_FACT_STATUSES.CONFIRMED && evidenceKindOk(field, kind, evidenceIds, map) };
}
function readFact(caseFile, candidate, field, map, kind, mode) {
  return mode === "scenario" ? scenarioFact(caseFile, candidate, field, map, kind) : confirmedFact(caseFile, candidate, field, map, kind);
}
function markPreparedConfidence(prepared, item) {
  if (item.confirmed) prepared.confirmedFields += 1;
  else prepared.scenarioFields += 1;
}
function addPreparedValue(prepared, caseFile, candidate, field, key, map, kind, mode = "confirmed") {
  const item = readFact(caseFile, candidate, field, map, kind, mode);
  if (item.ok) {
    prepared.input[key] = item.value;
    prepared.evidenceIds.push(...item.evidenceIds);
    markPreparedConfidence(prepared, item);
    return item.value;
  }
  if (item.reason === "conflict") prepared.conflicts.push(field); else prepared.missing.push(field);
  if (item.reason === "unsafe") prepared.unsafe = true;
  prepared.evidenceIds.push(...item.evidenceIds);
  return null;
}
function removeMissing(prepared, field) { prepared.missing = prepared.missing.filter((item) => item !== field); }
function scenarioAssumption(prepared, text, code) { prepared.assumptions.push(text); prepared.warningCodes.push(code); prepared.scenarioFields += 1; }
function hasBlockingOperationIssue(classification) {
  if (["conflict", "identity_conflict", "invalid"].includes(classification?.status)) return true;
  return (classification?.warningCodes ?? []).includes("INTERMEDIARY_SELLER_UNRESOLVED");
}
function hasSingleVehicleCandidate(caseFile) {
  return Array.isArray(caseFile?.vehicleCandidates) && caseFile.vehicleCandidates.length <= 1;
}
function canAssumePrivateSaleContract(caseFile, classification, prepared) {
  if (!hasSingleVehicleCandidate(caseFile)) return false;
  if (prepared.input.sellerType !== "private" || prepared.input.buyerType !== "private") return false;
  if (prepared.input.documentType && prepared.input.documentType !== "unknown") return false;
  if (prepared.input.vatRegime && prepared.input.vatRegime !== "unknown") return false;
  if (hasBlockingOperationIssue(classification)) return false;
  return true;
}

function canUseProfessionalNotSubjectScenario(caseFile, classification, prepared) {
  if (!hasSingleVehicleCandidate(caseFile)) return false;
  if (prepared.input.sellerType !== "professional") return false;
  if (prepared.input.buyerType !== "private" && prepared.input.buyerType !== "professional") return false;
  if (prepared.input.documentType && prepared.input.documentType !== "unknown") return false;
  if (prepared.input.vatRegime && !["unknown", "rebu", "general_vat"].includes(prepared.input.vatRegime)) return false;
  if (classification?.vatRegimeStatus === "conflict" || classification?.rebuStatusCertainty === "conflict") return false;
  if (hasBlockingOperationIssue(classification)) return false;
  return true;
}
function shouldUseDocumentaryItpScenario(caseFile, classification, prepared, options) {
  return options?.scenarioPolicy === "documentary_scenarios" && canUseProfessionalNotSubjectScenario(caseFile, classification, prepared);
}
function confidenceLevel(prepared, scenario) {
  if (!scenario) return "confirmed";
  if (prepared.scenarioFields > 0 && prepared.confirmedFields > 0) return "mixed";
  return prepared.scenarioFields > 0 ? "declared" : "confirmed";
}
function emptyPrepared(input = {}) { return { input, evidenceIds: [], missing: [], conflicts: [], unsafe: false, assumptions: [], warningCodes: [], confirmedFields: 0, scenarioFields: 0 }; }
function cleanPrepared(prepared) { prepared.evidenceIds = uniqueStrings(prepared.evidenceIds); prepared.missing = uniqueStrings(prepared.missing); prepared.conflicts = uniqueStrings(prepared.conflicts); prepared.assumptions = uniqueStrings(prepared.assumptions); prepared.warningCodes = uniqueStrings(prepared.warningCodes); return prepared; }
function vehicleTypeFromCategory(value) { return ["passenger_car", "turismo", "suv"].includes(value) ? "passenger_car" : null; }
function roundMoney(value) { return Math.round((value + Number.EPSILON) * 100) / 100; }
function registrationTaxTerritoryFromAutonomousCommunity(value) {
  const mapped = typeof value === "string" ? IEDMT_TERRITORY_BY_AUTONOMOUS_COMMUNITY[value] : null;
  if (mapped) return getTerritoryFromParam(mapped);
  return getTerritoryFromParam(value);
}
function depreciatedOfficialMarketValue({ originalBoeValue, firstRegistrationDate, transactionDate }) {
  if (typeof originalBoeValue !== "number" || !Number.isFinite(originalBoeValue)) return null;
  if (typeof firstRegistrationDate !== "string" || typeof transactionDate !== "string") return null;
  const months = getMonthsFromFirstRegistrationDate(firstRegistrationDate, transactionDate);
  const coefficient = getDepreciationCoefficient(months);
  return coefficient === null ? null : roundMoney(originalBoeValue * coefficient);
}

function buildIedmtInput(caseFile, candidate, map, options, mode = "confirmed") {
  const prepared = emptyPrepared({ calculationDate: options.calculationDate });
  addPreparedValue(prepared, caseFile, candidate, "vehicle.boeValue", "boeValue", map, "technical", mode);
  addPreparedValue(prepared, caseFile, candidate, "vehicle.firstRegistrationDate", "firstRegistrationDate", map, "technical", mode);
  addPreparedValue(prepared, caseFile, candidate, "vehicle.condition", "vehicleCondition", map, "any", mode);
  const territory = readFact(caseFile, candidate, "taxDestination.autonomousCommunity", map, "any", mode);
  if (territory.ok) {
    const resolvedTerritory = registrationTaxTerritoryFromAutonomousCommunity(territory.value);
    if (resolvedTerritory?.id) prepared.input.territoryId = resolvedTerritory.id; else prepared.missing.push("taxDestination.autonomousCommunity");
    prepared.evidenceIds.push(...territory.evidenceIds);
  } else if (territory.reason === "conflict") prepared.conflicts.push("taxDestination.autonomousCommunity"); else prepared.missing.push("taxDestination.autonomousCommunity");

  const standard = readFact(caseFile, candidate, "vehicle.emissionsStandard", map, "technical", mode);
  const wltp = readFact(caseFile, candidate, "vehicle.co2Wltp", map, "technical", mode);
  const nedc = readFact(caseFile, candidate, "vehicle.co2Nedc", map, "technical", mode);
  prepared.evidenceIds.push(...standard.evidenceIds, ...wltp.evidenceIds, ...nedc.evidenceIds);
  if (standard.reason === "conflict" || wltp.reason === "conflict" || nedc.reason === "conflict") prepared.conflicts.push("vehicle.emissions");
  if (standard.ok && standard.value === "wltp" && wltp.ok) {
    prepared.input.emissionsStandard = "wltp";
    prepared.input.emissions = wltp.value;
    prepared.input.noAccreditedEmissions = false;
  } else if (standard.ok && standard.value === "nedc" && nedc.ok) {
    prepared.input.emissionsStandard = "nedc";
    prepared.input.emissions = nedc.value;
    prepared.input.noAccreditedEmissions = false;
  } else if (!standard.ok && wltp.ok && !nedc.ok) {
    prepared.input.emissionsStandard = "wltp";
    prepared.input.emissions = wltp.value;
    prepared.input.noAccreditedEmissions = false;
  } else if (!standard.ok && nedc.ok && !wltp.ok) {
    prepared.input.emissionsStandard = "nedc";
    prepared.input.emissions = nedc.value;
    prepared.input.noAccreditedEmissions = false;
  } else if (wltp.ok && nedc.ok) {
    prepared.conflicts.push("vehicle.co2Wltp", "vehicle.co2Nedc");
  } else {
    prepared.missing.push("vehicle.emissions");
    if (wltp.reason === "unsafe" || nedc.reason === "unsafe" || standard.reason === "unsafe") prepared.unsafe = true;
  }
  return cleanPrepared(prepared);
}

function buildItpInput(caseFile, candidate, map, classification, overridePatch = null, scenarioEvidenceIds = [], options = null, mode = "confirmed") {
  const patch = { ...(classification?.transferTaxClassification ?? {}), ...(overridePatch ?? {}) };
  const prepared = emptyPrepared({
    sellerType: patch.sellerType,
    buyerType: patch.buyerType,
    documentType: patch.documentType,
    vatRegime: patch.vatRegime,
    intendedForResale: patch.intendedForResale,
    buyerTaxResidenceCountry: patch.buyerTaxResidenceCountry,
    sellerCountry: patch.sellerCountry,
    evidence: { evidenceIds: uniqueStrings([...(classification?.evidenceIds ?? []), ...scenarioEvidenceIds]) },
  });
  for (const [field, key, kind] of [
    ["transaction.date", "transactionDate", "contractual"],
    ["taxDestination.autonomousCommunity", "buyerRegion", "any"],
    ["transaction.purchasePrice", "purchasePrice", "contractual"],
    ["vehicle.boeValue", "originalBoeValue", "technical"],
    ["vehicle.firstRegistrationDate", "firstRegistrationDate", "technical"],
    ["vehicle.category", "vehicleCategory", "technical"],
    ["vehicle.engineDisplacementCc", "engineDisplacement", "technical"],
    ["vehicle.fiscalHorsepower", "fiscalHorsepower", "technical"],
    ["vehicle.zeroEmissionStatus", "zeroEmissionStatus", "technical"],
    ["vehicle.isHistoricVehicle", "isHistoricVehicle", "technical"],
    ["vehicle.isEndOfLifeVehicle", "isEndOfLifeVehicle", "technical"],
    ["parties.buyerTaxResidenceCountry", "buyerTaxResidenceCountry", "any"],
    ["parties.sellerCountry", "sellerCountry", "any"],
  ]) {
    if (prepared.input[key] === undefined || key === "officialMarketValue" || key === "originalBoeValue") addPreparedValue(prepared, caseFile, candidate, field, key, map, kind, mode);
  }
  if (mode === "scenario") {
    for (const [field, key] of [
      ["transaction.documentType", "documentType"],
      ["transaction.sellerType", "sellerType"],
      ["transaction.buyerType", "buyerType"],
      ["transaction.vatRegime", "vatRegime"],
    ]) {
      if (prepared.input[key] === undefined || prepared.input[key] === "unknown") addPreparedValue(prepared, caseFile, candidate, field, key, map, "contractual", mode);
    }
  }
  if (mode === "scenario" && prepared.input.transactionDate === undefined && validIsoDate(options?.calculationDate)) {
    prepared.input.transactionDate = options.calculationDate;
    prepared.input.assumedTransactionDate = options.calculationDate;
    removeMissing(prepared, "transaction.date");
    scenarioAssumption(prepared, "Se usa calculationDate como assumedTransactionDate porque no consta transaction.date contractual; no documenta fecha de contrato.", VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ASSUMED_TRANSACTION_DATE);
  }
  if (mode === "scenario" && canAssumePrivateSaleContract(caseFile, classification, prepared)) {
    prepared.input.documentType = "private_sale_contract";
    prepared.input.vatRegime = "not_applicable_private_sale";
    removeMissing(prepared, "transaction.documentType");
    removeMissing(prepared, "transaction.vatRegime");
    removeMissing(prepared, "classification.documentType");
    removeMissing(prepared, "classification.vatRegime");
    scenarioAssumption(prepared, "Se asume internamente private_sale_contract para una transmision particular a particular sin contrato existente; no crea documento ni evidencia contractual.", VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ASSUMED_PRIVATE_SALE_CONTRACT);
  }

  const foralTerritory = readFact(caseFile, candidate, "taxDestination.foralTerritory", map, "any", mode);
  if (foralTerritory.ok && BASQUE_FORAL_TERRITORIES.has(foralTerritory.value)) {
    prepared.input.buyerProvince = foralTerritory.value;
    prepared.evidenceIds.push(...foralTerritory.evidenceIds);
  } else if (prepared.input.buyerRegion === "pais_vasco") {
    addPreparedValue(prepared, caseFile, candidate, "taxDestination.province", "buyerProvince", map, "any", mode);
  }
  const officialMarketValue = depreciatedOfficialMarketValue(prepared.input);
  if (officialMarketValue !== null) prepared.input.officialMarketValue = officialMarketValue;
  else if (prepared.input.originalBoeValue !== undefined && prepared.input.transactionDate !== undefined && prepared.input.firstRegistrationDate !== undefined) prepared.missing.push("officialMarketValue");
  for (const key of ["sellerType", "buyerType", "documentType", "vatRegime"]) if (!prepared.input[key] || prepared.input[key] === "unknown") prepared.missing.push(`classification.${key}`);
  if (mode === "scenario" && canUseProfessionalNotSubjectScenario(caseFile, classification, prepared)) {
    removeMissing(prepared, "transaction.documentType");
    removeMissing(prepared, "transaction.vatRegime");
    removeMissing(prepared, "classification.documentType");
    removeMissing(prepared, "classification.vatRegime");
    prepared.assumptions.push("Se evalua venta profesional declarada como hipotesis documental no sujeta; no crea factura, documento ni evidencia fiscal.");
    prepared.scenarioFields += 1;
  }
  if (prepared.input.intendedForResale === undefined) prepared.input.intendedForResale = null;
  if (prepared.input.buyerTaxResidenceCountry === undefined) prepared.missing.push("classification.buyerTaxResidenceCountry");
  if (prepared.input.sellerCountry === undefined) prepared.missing.push("classification.sellerCountry");
  prepared.evidenceIds.push(...(classification?.evidenceIds ?? []), ...scenarioEvidenceIds);
  prepared.input.evidence = { evidenceIds: uniqueStrings([...prepared.input.evidence.evidenceIds, ...prepared.evidenceIds]) };
  return cleanPrepared(prepared);
}

function buildIvtmInput(caseFile, candidate, map, options, mode = "confirmed") {
  const prepared = emptyPrepared({ taxYear: options.taxYear, calculationDate: options.calculationDate, bonusStatus: "unknown" });
  addPreparedValue(prepared, caseFile, candidate, "taxDestination.municipalityCode", "municipalityCode", map, "any", mode);
  addPreparedValue(prepared, caseFile, candidate, "vehicle.spanishRegistrationDate", "spanishRegistrationDate", map, "technical", mode);
  if (mode === "scenario" && prepared.input.spanishRegistrationDate === undefined) {
    const expected = readFact(caseFile, candidate, "taxDestination.expectedSettlementDate", map, "any", mode);
    if (expected.ok) {
      prepared.input.spanishRegistrationDate = expected.value;
      prepared.input.assumedSpanishRegistrationDate = expected.value;
      prepared.evidenceIds.push(...expected.evidenceIds);
      markPreparedConfidence(prepared, expected);
      removeMissing(prepared, "vehicle.spanishRegistrationDate");
      scenarioAssumption(prepared, "Se usa taxDestination.expectedSettlementDate como assumedSpanishRegistrationDate para estimar el alta IVTM; no confirma matriculacion espanola.", VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ASSUMED_SPANISH_REGISTRATION_DATE);
    } else if (validIsoDate(options.calculationDate)) {
      prepared.input.spanishRegistrationDate = options.calculationDate;
      prepared.input.assumedSpanishRegistrationDate = options.calculationDate;
      removeMissing(prepared, "vehicle.spanishRegistrationDate");
      scenarioAssumption(prepared, "Se usa calculationDate como assumedSpanishRegistrationDate bajo la hipotesis explicita de matricular hoy; no confirma matriculacion espanola.", VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ASSUMED_SPANISH_REGISTRATION_DATE);
    }
  }
  addPreparedValue(prepared, caseFile, candidate, "vehicle.fiscalHorsepower", "fiscalHorsepower", map, "technical", mode);
  const category = readFact(caseFile, candidate, "vehicle.category", map, "technical", mode);
  if (category.ok) {
    const type = vehicleTypeFromCategory(category.value);
    if (type) prepared.input.vehicleType = type; else prepared.missing.push("vehicle.category");
    prepared.evidenceIds.push(...category.evidenceIds);
  } else if (category.reason === "conflict") prepared.conflicts.push("vehicle.category"); else prepared.missing.push("vehicle.category");
  for (const [field, key] of [["vehicle.zeroEmissionStatus", "zeroEmissionStatus"], ["vehicle.isHistoricVehicle", "isHistoricVehicle"]]) {
    const fact = readFact(caseFile, candidate, field, map, "technical", mode);
    if (fact.ok) { prepared.input[key] = fact.value; prepared.evidenceIds.push(...fact.evidenceIds); }
  }
  if (typeof prepared.input.municipalityCode === "string" && !/^\d{5}$/.test(prepared.input.municipalityCode)) prepared.conflicts.push("taxDestination.municipalityCode");
  return cleanPrepared(prepared);
}

function buildDgtInput(caseFile, candidate, map, options, mode = "confirmed") {
  const prepared = emptyPrepared({ procedure: "ordinary_vehicle_registration", calculationDate: options.calculationDate, currency: options.currency });
  const category = readFact(caseFile, candidate, "vehicle.category", map, "technical", mode);
  if (category.ok) {
    const type = vehicleTypeFromCategory(category.value);
    if (type) prepared.input.vehicleType = type; else prepared.missing.push("vehicle.category");
    prepared.evidenceIds.push(...category.evidenceIds);
  } else if (category.reason === "conflict") prepared.conflicts.push("vehicle.category"); else prepared.missing.push("vehicle.category");
  addPreparedValue(prepared, caseFile, candidate, "taxDestination.expectedSettlementDate", "feeDate", map, "any", mode);
  if (mode === "scenario" && prepared.input.feeDate !== undefined && prepared.input.assumedSpanishRegistrationDate === undefined) {
    prepared.input.assumedSpanishRegistrationDate = prepared.input.feeDate;
    scenarioAssumption(prepared, "Se usa taxDestination.expectedSettlementDate como fecha prevista de tasa DGT; no confirma matriculacion espanola.", VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ASSUMED_SPANISH_REGISTRATION_DATE);
  }
  if (mode === "scenario" && prepared.input.feeDate === undefined && validIsoDate(options.calculationDate)) {
    prepared.input.feeDate = options.calculationDate;
    prepared.input.assumedSpanishRegistrationDate = options.calculationDate;
    removeMissing(prepared, "taxDestination.expectedSettlementDate");
    scenarioAssumption(prepared, "Se usa calculationDate como fecha de tasa DGT bajo la hipotesis explicita de matricular hoy; no confirma matriculacion espanola.", VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ASSUMED_SPANISH_REGISTRATION_DATE);
  }
  return cleanPrepared(prepared);
}

function executionFromPrepared(engineId, prepared, run, scenario = false) {
  if (prepared.conflicts.length > 0) return notRun(engineId, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT, prepared.input, prepared.evidenceIds, prepared.conflicts);
  if (prepared.missing.length > 0) return notRun(engineId, VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS, prepared.input, prepared.evidenceIds, prepared.missing, prepared.unsafe ? VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.UNSAFE_EVIDENCE_SOURCE : null);
  try {
    const result = run(prepared.input);
    return calculated(engineId, prepared.input, prepared.evidenceIds, result, scenario, prepared);
  } catch {
    return failed(engineId, prepared.input, prepared.evidenceIds);
  }
}

async function ivtmExecution(prepared, deps, scenario = false) {
  if (prepared.conflicts.length > 0) return notRun("ivtm", VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT, prepared.input, prepared.evidenceIds, prepared.conflicts);
  if (prepared.missing.length > 0) return notRun("ivtm", VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS, prepared.input, prepared.evidenceIds, prepared.missing, prepared.unsafe ? VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.UNSAFE_EVIDENCE_SOURCE : null);
  try {
    const municipalData = await deps.lookupMunicipalData(prepared.input.municipalityCode, { taxYear: prepared.input.taxYear });
    const result = deps.calculateIvtm(prepared.input, municipalData);
    return calculated("ivtm", prepared.input, prepared.evidenceIds, result, scenario, prepared);
  } catch {
    return failed("ivtm", prepared.input, prepared.evidenceIds, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.IVTM_LOOKUP_FAILED);
  }
}
function resultAmount(engineId, result) {
  if (!isPlainObject(result)) return null;
  if (engineId === "iedmt") return typeof result.tax === "number" ? result.tax : null;
  if (engineId === "itp") return typeof result.taxAmount === "number" ? result.taxAmount : typeof result.prudentBudget === "number" ? result.prudentBudget : null;
  if (engineId === "ivtm") return typeof result.taxAmount === "number" ? result.taxAmount : typeof result.proratedTax === "number" ? result.proratedTax : typeof result.referenceProratedTax === "number" ? result.referenceProratedTax : typeof result.prudentBudget === "number" ? result.prudentBudget : null;
  if (engineId === "dgt_registration_fee") return typeof result.amount === "number" ? result.amount : typeof result.prudentAmount === "number" ? result.prudentAmount : null;
  return null;
}
function resultRangeAmount(engineId, result, field, fallback = null) {
  if (!isPlainObject(result)) return fallback;
  const key = engineId === "dgt_registration_fee" && field === "prudentBudget" ? "prudentAmount" : field;
  if (typeof result[key] === "number") return result[key];
  if (field === "minimumAmount" && typeof result.minimumAmount === "number") return result.minimumAmount;
  if (field === "maximumAmount" && typeof result.maximumAmount === "number") return result.maximumAmount;
  return fallback;
}
function sumNullable(values) { return values.every((value) => typeof value === "number") ? roundMoney(values.reduce((total, value) => total + value, 0)) : null; }
function estimatedLineItem(engineId, execution) {
  const amount = resultAmount(engineId, execution?.result);
  const minimumAmount = resultRangeAmount(engineId, execution?.result, "minimumAmount", amount);
  const maximumAmount = resultRangeAmount(engineId, execution?.result, "maximumAmount", amount);
  const prudentAmount = resultRangeAmount(engineId, execution?.result, "prudentBudget", amount);
  return cloneJson({
    id: engineId,
    status: execution?.status ?? VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS,
    inputStatus: execution?.inputStatus ?? "missing",
    confidenceLevel: execution?.confidenceLevel ?? "confirmed",
    amount,
    minimumAmount,
    maximumAmount,
    prudentAmount,
    evidenceIds: execution?.evidenceIds ?? [],
    assumptions: execution?.assumptions ?? [],
    warnings: execution?.warnings ?? [],
    warningCodes: execution?.warningCodes ?? [],
    missingFields: execution?.missingFields ?? [],
  });
}
function estimatedSummaryFrom(executions, taxSummary, options) {
  const lineItems = ENGINE_IDS.map((engineId) => estimatedLineItem(engineId, executions[engineId])).filter((item) => item.amount !== null || item.minimumAmount !== null || item.maximumAmount !== null || item.prudentAmount !== null);
  if (lineItems.length === 0) return null;
  return cloneJson({
    status: "estimated",
    currency: options.currency === "EUR" ? "EUR" : null,
    exactTotal: null,
    confirmedSubtotal: taxSummary?.confirmedSubtotal ?? null,
    estimatedTotal: sumNullable(lineItems.map((item) => item.amount)),
    minimumTotal: sumNullable(lineItems.map((item) => item.minimumAmount)),
    maximumTotal: sumNullable(lineItems.map((item) => item.maximumAmount)),
    prudentBudget: sumNullable(lineItems.map((item) => item.prudentAmount)),
    lineItems,
    assumptions: uniqueStrings(lineItems.flatMap((item) => item.assumptions)),
    warnings: uniqueStrings(lineItems.flatMap((item) => item.warnings)),
    warningCodes: uniqueStrings(lineItems.flatMap((item) => item.warningCodes)),
    missingFields: uniqueStrings(lineItems.flatMap((item) => item.missingFields.map((field) => `${item.id}.${field}`))),
    exactTotalBlockedBy: ENGINE_IDS.filter((engineId) => executions[engineId]?.status !== VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED),
  });
}
function taxSummaryExecutions(executions) {
  return Object.fromEntries(ENGINE_IDS.map((engineId) => {
    const execution = executions[engineId];
    return [engineId, execution?.status === VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_SCENARIO ? { ...execution, result: null } : execution];
  }));
}
function mergeScenarioExecutions(strictExecutions, scenarioExecutions) {
  return Object.fromEntries(ENGINE_IDS.map((engineId) => {
    const strict = strictExecutions[engineId];
    const scenario = scenarioExecutions[engineId];
    return [engineId, strict?.status === VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_CONFIRMED ? strict : scenario?.status === VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_SCENARIO ? scenario : strict];
  }));
}
async function buildScenarioExecutions(caseFile, candidate, map, classification, deps, options, effectiveItp = null) {
  const iedmt = executionFromPrepared("iedmt", buildIedmtInput(caseFile, candidate, map, options, "scenario"), deps.calculateIedmt, true);
  const itpPrepared = buildItpInput(caseFile, candidate, map, classification, null, [], options, "scenario");
  const itpBlocked = ["conflict", "identity_conflict", "invalid"].includes(classification.status);
  const itp = effectiveItp?.status === VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_SCENARIO
    ? effectiveItp
    : itpBlocked
      ? notRun("itp", VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT, itpPrepared.input, itpPrepared.evidenceIds, ["classification"])
      : executionFromPrepared("itp", itpPrepared, deps.calculateItp, true);
  const ivtm = await ivtmExecution(buildIvtmInput(caseFile, candidate, map, options, "scenario"), deps, true);
  const dgt = executionFromPrepared("dgt_registration_fee", buildDgtInput(caseFile, candidate, map, options, "scenario"), deps.calculateDgtFee, true);
  return { iedmt, itp, ivtm, dgt_registration_fee: dgt };
}
function itpExecutionFromEffectiveClassification(caseFile, candidate, map, classification, deps, options) {
  const itpPrepared = buildItpInput(caseFile, candidate, map, classification);
  if (shouldUseDocumentaryItpScenario(caseFile, classification, itpPrepared, options)) {
    const scenarioPrepared = buildItpInput(caseFile, candidate, map, classification, null, [], options, "scenario");
    return executionFromPrepared("itp", scenarioPrepared, deps.calculateItp, true);
  }
  const itpBlocked = ["conflict", "scenario_required", "identity_conflict", "invalid"].includes(classification.status);
  return itpBlocked
    ? notRun("itp", VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT, itpPrepared.input, itpPrepared.evidenceIds, ["classification"])
    : executionFromPrepared("itp", itpPrepared, deps.calculateItp);
}
function summaryFrom(executions, deps, options, codes) {
  const results = {
    registrationTaxResult: executions.iedmt.result ?? null,
    transferTaxResult: executions.itp.result ?? null,
    municipalVehicleTaxResult: executions.ivtm.result ?? null,
    registrationFeeResult: executions.dgt_registration_fee.result ?? null,
    calculationDate: options.calculationDate,
    currency: options.currency,
  };
  const engineResults = [results.registrationTaxResult, results.transferTaxResult, results.municipalVehicleTaxResult, results.registrationFeeResult];
  if (engineResults.every((item) => item === null)) {
    addCode(codes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SUMMARY_NOT_AVAILABLE);
    return null;
  }
  try {
    const summary = deps.calculateSummary(results);
    if (!isPlainObject(summary) || !Array.isArray(summary.lineItems) || !Array.isArray(summary.exactTotalBlockedBy)) {
      addCode(codes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SUMMARY_NOT_AVAILABLE);
      return null;
    }
    return summary;
  } catch {
    addCode(codes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SUMMARY_NOT_AVAILABLE);
    return null;
  }
}

function statusFrom(executions, classification, taxSummary, estimatedSummary, scenarios, codes) {
  const statuses = Object.values(executions).map((item) => item.status);
  if (classification?.status === "identity_conflict" || codes.has(VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ORCHESTRATOR_IDENTITY_CONFLICT)) return VEHICLE_TAX_CALCULATION_STATUSES.IDENTITY_CONFLICT;
  if (statuses.includes(VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.FAILED_VALIDATION)) return VEHICLE_TAX_CALCULATION_STATUSES.REQUIRES_REVIEW;
  if (statuses.includes(VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT) || classification?.status === "conflict") return VEHICLE_TAX_CALCULATION_STATUSES.SCENARIO_REQUIRED;
  if (classification?.status === "scenario_required" || scenarios.length > 0) return VEHICLE_TAX_CALCULATION_STATUSES.SCENARIO_REQUIRED;
  if (statuses.includes(VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.REQUIRES_REVIEW) || taxSummary?.status === "requires_review") return VEHICLE_TAX_CALCULATION_STATUSES.REQUIRES_REVIEW;
  if (statuses.includes(VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.CALCULATED_SCENARIO) && estimatedSummary) return VEHICLE_TAX_CALCULATION_STATUSES.ESTIMATED;
  if (statuses.includes(VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS) || taxSummary === null) return VEHICLE_TAX_CALCULATION_STATUSES.PARTIAL;
  return taxSummary?.status === "exact" ? VEHICLE_TAX_CALCULATION_STATUSES.EXACT : VEHICLE_TAX_CALCULATION_STATUSES.PARTIAL;
}

function scenarioPatches(classification, maxScenarios, codes) {
  const scenarios = Array.isArray(classification?.scenarios) ? classification.scenarios : [];
  const sorted = scenarios
    .filter((item) => isPlainObject(item?.classificationPatch))
    .sort((left, right) => String(left.scenarioId).localeCompare(String(right.scenarioId)));
  if (sorted.length > maxScenarios) addCode(codes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ORCHESTRATOR_SCENARIOS_TRUNCATED);
  return sorted.slice(0, maxScenarios);
}

function cloneOptionsInput(optionsInput) {
  if (!isPlainObject(optionsInput)) return safeClone(optionsInput);
  const optionsWithoutDependencies = { ...optionsInput };
  delete optionsWithoutDependencies.dependencies;
  const cloned = safeClone(optionsWithoutDependencies);
  if (cloned.ok) cloned.value.dependencies = optionsInput.dependencies;
  return cloned;
}

function scenarioOutput(classificationScenario, itpExecution, index) {
  return cloneJson({
    scenarioId: deterministicId("calculation_scenario", { source: classificationScenario.scenarioId, index }),
    sourceScenarioId: classificationScenario.scenarioId,
    label: classificationScenario.label ?? "Documentary fiscal scenario",
    classificationPatch: classificationScenario.classificationPatch,
    engineExecutions: {
      iedmt: notRun("iedmt", VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS),
      itp: itpExecution,
      ivtm: notRun("ivtm", VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS),
      dgt_registration_fee: notRun("dgt_registration_fee", VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_MISSING_INPUTS),
    },
    taxSummary: null,
    warningCodes: uniqueStrings([...(classificationScenario.warningCodes ?? []), ...itpExecution.warningCodes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.SUMMARY_NOT_AVAILABLE]),
    assumptions: uniqueStrings(classificationScenario.assumptions),
  });
}

export async function calculateVehicleTaxCase(caseFileInput, optionsInput = {}) {
  const clonedCaseFile = safeClone(caseFileInput);
  const clonedOptions = cloneOptionsInput(optionsInput);
  if (!clonedCaseFile.ok || !clonedOptions.ok) {
    return output({ caseFile: null, options: {}, status: VEHICLE_TAX_CALCULATION_STATUSES.INVALID, warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.NON_SERIALIZABLE_ORCHESTRATOR_INPUT], missingFields: ["caseFile"] });
  }
  const caseFile = clonedCaseFile.value;
  const options = clonedOptions.value;
  const optionsValidation = validateOptions(options);
  const dependencyValidation = validateDependencies(options.dependencies);
  const caseFileValidation = validateCaseFile(caseFile);
  if (!optionsValidation.ok || !dependencyValidation.ok || !caseFileValidation.ok) {
    return output({ caseFile, options, status: VEHICLE_TAX_CALCULATION_STATUSES.INVALID, warningCodes: [...optionsValidation.warningCodes, ...dependencyValidation.warningCodes, ...caseFileValidation.warningCodes], missingFields: [...optionsValidation.missingFields, ...dependencyValidation.missingFields, ...caseFileValidation.missingFields] });
  }
  const deps = dependencyValidation.value;
  let classification;
  try {
    classification = deps.classifyOperation(caseFile);
  } catch {
    return output({ caseFile, options, status: VEHICLE_TAX_CALCULATION_STATUSES.INVALID, warningCodes: [VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.INVALID_ORCHESTRATOR_INPUT], missingFields: ["classification"] });
  }
  const candidate = selectedCandidate(caseFile);
  const map = evidenceMap(caseFile);
  const codes = new Set(classification.warningCodes ?? []);
  if (!candidate) addCode(codes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.VEHICLE_CANDIDATE_REQUIRED);
  if (identityConflict(caseFile, candidate)) {
    addCode(codes, VEHICLE_TAX_ORCHESTRATOR_WARNING_CODES.ORCHESTRATOR_IDENTITY_CONFLICT);
    const engineExecutions = emptyExecutions(VEHICLE_TAX_ENGINE_EXECUTION_STATUSES.NOT_RUN_CONFLICT);
    return output({ caseFile, options, status: VEHICLE_TAX_CALCULATION_STATUSES.IDENTITY_CONFLICT, classification, engineExecutions, taxSummary: null, scenarios: [], warningCodes: [...codes], missingFields: ["selectedVehicleCandidateId"] });
  }

  const iedmt = executionFromPrepared("iedmt", buildIedmtInput(caseFile, candidate, map, options), deps.calculateIedmt);
  const itp = itpExecutionFromEffectiveClassification(caseFile, candidate, map, classification, deps, options);
  const ivtm = await ivtmExecution(buildIvtmInput(caseFile, candidate, map, options), deps);
  const dgt = executionFromPrepared("dgt_registration_fee", buildDgtInput(caseFile, candidate, map, options), deps.calculateDgtFee);
  const strictEngineExecutions = { iedmt, itp, ivtm, dgt_registration_fee: dgt };
  const taxSummary = summaryFrom(taxSummaryExecutions(strictEngineExecutions), deps, options, codes);
  let engineExecutions = strictEngineExecutions;
  let estimatedSummary = null;
  if (options.scenarioPolicy === "documentary_scenarios") {
    const scenarioExecutions = await buildScenarioExecutions(caseFile, candidate, map, classification, deps, options, itp);
    engineExecutions = mergeScenarioExecutions(strictEngineExecutions, scenarioExecutions);
    estimatedSummary = estimatedSummaryFrom(engineExecutions, taxSummary, options);
  }
  const scenarios = [];
  if (options.scenarioPolicy === "documentary_scenarios" && options.maxScenarios > 0) {
    for (const [index, scenario] of scenarioPatches(classification, options.maxScenarios, codes).entries()) {
      const prepared = buildItpInput(caseFile, candidate, map, classification, scenario.classificationPatch, scenario.evidenceIds, options, "scenario");
      const execution = executionFromPrepared("itp", prepared, deps.calculateItp, true);
      scenarios.push(scenarioOutput(scenario, execution, index));
    }
  }
  for (const execution of Object.values(engineExecutions)) for (const code of execution.warningCodes) addCode(codes, code);
  const status = statusFrom(engineExecutions, classification, taxSummary, estimatedSummary, scenarios, codes);
  return output({ caseFile, options, status, classification, engineExecutions, taxSummary, estimatedSummary, scenarios, warningCodes: [...codes] });
}
