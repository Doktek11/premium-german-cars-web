import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  buildVehicleTaxCaseFromActionDto,
  VEHICLE_TAX_ACTION_FIELD_CONTRACT,
  VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
} from "./vehicleTaxActionAdapter.mjs";
import {
  VEHICLE_TAX_ACTION_MAX_STRUCTURE_DEPTH,
  VEHICLE_TAX_ACTION_MAX_STRUCTURE_NODES,
  handleVehicleTaxActionRequest,
} from "./vehicleTaxActionApi.mjs";
import {
  VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES,
  VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION,
} from "./vehicleTaxEstimateApi.mjs";
import {
  VEHICLE_TAX_CALCULATION_STATUSES,
  VEHICLE_TAX_ENGINE_EXECUTION_STATUSES,
} from "./vehicleTaxCalculationOrchestrator.mjs";
import {
  VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES,
  VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS,
  VEHICLE_TAX_CASE_FILE_SOURCE_TYPES,
  VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES,
} from "../data/vehicleTaxCaseFileCatalogs.mjs";

const OPENAPI_PATH = new URL("../../openapi/vehicle-tax-estimate-action.v1.json", import.meta.url);
const TEXT = readFileSync(OPENAPI_PATH, "utf8");
const OPENAPI = JSON.parse(TEXT);
const FORBIDDEN_TEXT = [
  "vehicle.vin",
  "vehicle.model",
  "vehicle.make",
  "municipalityName",
  "sourceExcerpt",
  "rawText",
  "ocrText",
  "documentContent",
  "base64",
  "binary",
  "dependencies",
  `local${"host"}`,
  `127${".0.0.1"}`,
  "sk-",
  "Bearer ",
  `sample${"@example"}`,
  `WBA8${"E51070A123456"}`,
  `1234${"ABC"}`,
];

function deref(ref) {
  assert.equal(typeof ref, "string");
  assert.match(ref, /^#\//);
  return ref.slice(2).split("/").reduce((node, part) => {
    assert.ok(node && Object.hasOwn(node, part), `Unresolved ref ${ref}`);
    return node[part];
  }, OPENAPI);
}

function collectRefs(value, refs = []) {
  if (!value || typeof value !== "object") return refs;
  if (typeof value.$ref === "string") refs.push(value.$ref);
  for (const child of Array.isArray(value) ? value : Object.values(value)) collectRefs(child, refs);
  return refs;
}

function refGraph() {
  const schemas = OPENAPI.components.schemas;
  return Object.fromEntries(Object.entries(schemas).map(([name, schema]) => [
    name,
    collectRefs(schema).map((ref) => ref.replace("#/components/schemas/", "")).filter((ref) => Object.hasOwn(schemas, ref)),
  ]));
}

function assertNoRefCycles() {
  const graph = refGraph();
  const visiting = new Set();
  const visited = new Set();
  function visit(name, path = []) {
    if (visiting.has(name)) throw new Error(`Circular $ref: ${[...path, name].join(" -> ")}`);
    if (visited.has(name)) return;
    visiting.add(name);
    for (const next of graph[name] ?? []) visit(next, [...path, name]);
    visiting.delete(name);
    visited.add(name);
  }
  for (const name of Object.keys(graph)) visit(name);
}

function isRealIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00.000Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isRealIsoYearMonth(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}$/.test(value)) return false;
  const month = Number(value.slice(5, 7));
  return month >= 1 && month <= 12;
}

function schemaForField(field) {
  return OPENAPI.components.schemas["Evidence_" + field.replace(/[^A-Za-z0-9]/g, "_")];
}

function actionDto(overrides = {}) {
  return {
    schemaVersion: VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION,
    caseId: "case-audit-1",
    documents: [],
    evidence: [],
    selectedVehicleCandidateId: null,
    options: {
      calculationDate: "2026-01-01",
      taxYear: 2026,
      scenarioPolicy: "confirmed_only",
      maxScenarios: 0,
      currency: "EUR",
    },
    ...overrides,
  };
}

function evidence(overrides = {}) {
  return {
    evidenceId: "ev-audit-1",
    field: "transaction.currency",
    normalizedValue: "EUR",
    valueType: "currency",
    sourceType: "user_declaration",
    extractionMethod: "manual",
    verificationStatus: "confirmed_user",
    ...overrides,
  };
}

function adapterAccepts(dto) {
  try {
    buildVehicleTaxCaseFromActionDto(dto);
    return true;
  } catch {
    return false;
  }
}

function assertAdapterError(dto, code) {
  assert.throws(
    () => buildVehicleTaxCaseFromActionDto(dto),
    (error) => error?.code === code,
  );
}

function dtoForId(kind, value) {
  if (kind === "caseId") return actionDto({ caseId: value });
  if (kind === "documentId") return actionDto({ documents: [{ documentId: value, documentType: "user_declaration" }] });
  if (kind === "evidenceId") return actionDto({ evidence: [evidence({ evidenceId: value })] });
  if (kind === "candidateId") return actionDto({ evidence: [evidence({ candidateId: value })], selectedVehicleCandidateId: value });
  throw new Error("Unknown id kind " + kind);
}

function validate(schema, value, path = "$") {
  if (schema === true) return;
  if (schema.$ref) return validate(deref(schema.$ref), value, path);
  if (schema.const !== undefined) assert.deepEqual(value, schema.const, `${path} const`);
  if (schema.enum) assert.ok(schema.enum.some((item) => Object.is(item, value)), `${path} enum`);
  if (schema.anyOf) {
    const ok = schema.anyOf.some((item) => {
      try { validate(item, value, path); return true; } catch { return false; }
    });
    assert.ok(ok, `${path} anyOf`);
    return;
  }
  if (schema.oneOf) {
    const count = schema.oneOf.filter((item) => {
      try { validate(item, value, path); return true; } catch { return false; }
    }).length;
    assert.equal(count, 1, `${path} oneOf`);
    return;
  }
  if (schema.allOf) for (const item of schema.allOf) validate(item, value, path);
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const ok = types.some((type) => {
      if (type === "null") return value === null;
      if (type === "array") return Array.isArray(value);
      if (type === "integer") return Number.isInteger(value);
      if (type === "number") return typeof value === "number" && Number.isFinite(value);
      if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
      return typeof value === type;
    });
    assert.ok(ok, `${path} type ${types.join("|")}`);
  }
  if (typeof value === "string") {
    if (schema.pattern) assert.match(value, new RegExp(schema.pattern), `${path} pattern`);
    if (schema.minLength !== undefined) assert.ok(value.length >= schema.minLength, `${path} minLength`);
    if (schema.maxLength !== undefined) assert.ok(value.length <= schema.maxLength, `${path} maxLength`);
  }
  if (typeof value === "number") {
    if (schema.minimum !== undefined) assert.ok(value >= schema.minimum, `${path} minimum`);
    if (schema.maximum !== undefined) assert.ok(value <= schema.maximum, `${path} maximum`);
  }
  if (Array.isArray(value) && schema.items) value.forEach((item, index) => validate(schema.items, item, `${path}[${index}]`));
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const properties = schema.properties ?? {};
    for (const key of schema.required ?? []) assert.ok(Object.hasOwn(value, key), `${path}.${key} required`);
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) assert.ok(Object.hasOwn(properties, key), `${path}.${key} additional`);
    }
    for (const [key, childSchema] of Object.entries(properties)) if (Object.hasOwn(value, key)) validate(childSchema, value[key], `${path}.${key}`);
  }
}

function responseCodesFromRuntimeProbe() {
  return new Set([200, 400, 401, 403, 405, 413, 415, 422, 500, 503].map(String));
}

test("OpenAPI JSON valido, deterministicamente parseable y metadata exacta", () => {
  assert.deepEqual(JSON.parse(JSON.stringify(OPENAPI)), OPENAPI);
  assert.equal(TEXT.endsWith("\n"), true);
  assert.equal(OPENAPI.openapi, "3.1.0");
  assert.equal(OPENAPI.servers[0].url, "https://www.premiumgermancars.com");
  assert.ok(OPENAPI.info.title.includes("Vehicle Import Tax"));
  assert.match(OPENAPI.info.description, /256 KiB/);
  assert.match(OPENAPI.info.description, new RegExp(String(VEHICLE_TAX_ESTIMATE_MAX_BODY_BYTES / 1024)));
  assert.ok(OPENAPI.paths["/api/vehicle-tax-estimate-action"].post.description.length < 1000);
});

test("operationId, path, security y HTTP codes coinciden con runtime", async () => {
  const paths = OPENAPI.paths;
  assert.deepEqual(Object.keys(paths), ["/api/vehicle-tax-estimate-action"]);
  const operation = paths["/api/vehicle-tax-estimate-action"].post;
  const operationIds = JSON.stringify(OPENAPI).match(/"operationId"/g) ?? [];
  assert.equal(operation.operationId, "estimateVehicleImportTax");
  assert.equal(operationIds.length, 1);
  assert.deepEqual(operation.security, [{ bearerAuth: [] }]);
  assert.deepEqual(OPENAPI.components.securitySchemes.bearerAuth, { type: "http", scheme: "bearer", bearerFormat: "opaque", description: OPENAPI.components.securitySchemes.bearerAuth.description });
  assert.equal(operation.requestBody.content["application/json"].schema.$ref, "#/components/schemas/ActionRequest");
  assert.deepEqual(new Set(Object.keys(operation.responses)), responseCodesFromRuntimeProbe());
  assert.equal((await handleVehicleTaxActionRequest({ method: "OPTIONS", headers: {}, body: {} }, { apiKey: "test" })).statusCode, 405);
});

test("refs resolubles y sin ciclos problematicos", () => {
  const refs = collectRefs(OPENAPI);
  assert.ok(refs.length > 0);
  for (const ref of refs) deref(ref);
  assertNoRefCycles();
});

test("contrato raiz, required optional null y additionalProperties", () => {
  const schema = OPENAPI.components.schemas.ActionRequest;
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(schema.required, ["schemaVersion", "caseId", "documents", "evidence", "options"]);
  assert.deepEqual(Object.keys(schema.properties), ["schemaVersion", "caseId", "documents", "evidence", "selectedVehicleCandidateId", "options"]);
  assert.equal(schema.properties.schemaVersion.const, VEHICLE_TAX_ACTION_REQUEST_SCHEMA_VERSION);
  assert.deepEqual(schema.properties.selectedVehicleCandidateId.anyOf, [{ $ref: "#/components/schemas/CandidateId" }, { type: "null" }]);
  for (const closed of ["ActionRequest", "Options", "Document", "SuccessBody", "ErrorBody", "EngineExecution", "EngineExecutions", "CalculationData"]) {
    assert.equal(OPENAPI.components.schemas[closed].additionalProperties, false, closed);
  }
});

test("field/valueType, enums y patrones derivan de runtime", () => {
  const schemas = OPENAPI.components.schemas;
  assert.deepEqual(schemas.FieldPath.enum, Object.keys(VEHICLE_TAX_ACTION_FIELD_CONTRACT));
  assert.deepEqual(schemas.ValueType.enum, [...new Set(Object.values(VEHICLE_TAX_ACTION_FIELD_CONTRACT).map((item) => item.valueType))].sort());
  assert.deepEqual(schemas.DocumentType.enum, VEHICLE_TAX_CASE_FILE_DOCUMENT_TYPE_VALUES);
  assert.deepEqual(schemas.SourceType.enum, Object.values(VEHICLE_TAX_CASE_FILE_SOURCE_TYPES));
  assert.deepEqual(schemas.ExtractionMethod.enum, Object.values(VEHICLE_TAX_CASE_FILE_EXTRACTION_METHODS));
  assert.deepEqual(schemas.VerificationStatus.enum, Object.values(VEHICLE_TAX_CASE_FILE_VERIFICATION_STATUSES));
  for (const schemaName of ["CaseId", "DocumentId", "EvidenceId", "CandidateId"]) {
    assert.equal(typeof schemas[schemaName].pattern, "string", schemaName);
  }
  for (const [field, meta] of Object.entries(VEHICLE_TAX_ACTION_FIELD_CONTRACT)) {
    const variant = schemas[`Evidence_${field.replace(/[^A-Za-z0-9]/g, "_")}`];
    assert.equal(variant.additionalProperties, false);
    assert.equal(variant.properties.field.const, field);
    assert.equal(variant.properties.valueType.const, meta.valueType);
    if (meta.enumValues) assert.deepEqual(variant.properties.normalizedValue.enum, meta.enumValues);
    if (meta.min !== undefined) assert.equal(variant.properties.normalizedValue.minimum, meta.min);
    if (meta.max !== undefined) assert.equal(variant.properties.normalizedValue.maximum, meta.max);
  }
});

test("fechas estructurales en OpenAPI y validacion semantica runtime", () => {
  const { Options } = OPENAPI.components.schemas;
  assert.equal(Options.properties.calculationDate.format, "date");
  assert.match(Options.properties.calculationDate.description, /year must match taxYear/);

  for (const field of ["vehicle.spanishRegistrationDate", "transaction.date", "taxDestination.expectedSettlementDate"]) {
    const normalizedValue = schemaForField(field).properties.normalizedValue;
    assert.equal(normalizedValue.format, "date", field);
    assert.match(normalizedValue.description, /Real calendar date/);
  }

  const firstRegistrationDate = schemaForField("vehicle.firstRegistrationDate").properties.normalizedValue;
  assert.equal(firstRegistrationDate.anyOf.length, 2);
  assert.equal(firstRegistrationDate.anyOf[0].pattern, "^\\d{4}-\\d{2}$");
  assert.equal(firstRegistrationDate.anyOf[1].format, "date");

  assert.equal(new RegExp(schemaForField("vehicle.spanishRegistrationDate").properties.normalizedValue.pattern).test("2026-99-99"), true);
  assertAdapterError(actionDto({ evidence: [evidence({ field: "vehicle.spanishRegistrationDate", normalizedValue: "2026-99-99", valueType: "date" })] }), "ACTION_VALUE_INVALID");
  assertAdapterError(actionDto({ options: { calculationDate: "2026-99-99", taxYear: 2026, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" } }), "ACTION_OPTIONS_INVALID");
  assertAdapterError(actionDto({ options: { calculationDate: "2025-01-01", taxYear: 2026, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" } }), "ACTION_OPTIONS_INVALID");
  assert.equal(adapterAccepts(actionDto({ options: { calculationDate: "2026-01-01", taxYear: 2026, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" } })), true);
  assert.equal(adapterAccepts(actionDto({ options: { calculationDate: "2024-02-29", taxYear: 2024, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" }, evidence: [evidence({ field: "vehicle.spanishRegistrationDate", normalizedValue: "2024-02-29", valueType: "date" })] })), true);
  assertAdapterError(actionDto({ options: { calculationDate: "2023-02-28", taxYear: 2023, scenarioPolicy: "confirmed_only", maxScenarios: 0, currency: "EUR" }, evidence: [evidence({ field: "vehicle.spanishRegistrationDate", normalizedValue: "2023-02-29", valueType: "date" })] }), "ACTION_VALUE_INVALID");
});

test("patrones de ids OpenAPI mantienen paridad case-insensitive y privacidad del runtime", () => {
  const configs = [
    { schemaName: "CaseId", kind: "caseId", prefix: "case" },
    { schemaName: "DocumentId", kind: "documentId", prefix: "doc" },
    { schemaName: "EvidenceId", kind: "evidenceId", prefix: "ev" },
    { schemaName: "CandidateId", kind: "candidateId", prefix: "candidate" },
  ];
  const plate = "1234" + "ABC";
  const vin = "WBA8" + "E51070A123456";
  const nif = "12345678" + "Z";
  const iban = "ES91" + "21000418450200051332";

  for (const { schemaName, kind, prefix } of configs) {
    const pattern = new RegExp(OPENAPI.components.schemas[schemaName].pattern);
    const positives = [prefix + "-abc", prefix + "-ABC", prefix.toUpperCase() + "-AbC"];
    for (const value of positives) {
      assert.equal(pattern.test(value), true, "OpenAPI accepts " + value);
      assert.equal(adapterAccepts(dtoForId(kind, value)), true, "runtime accepts " + value);
    }
    for (const suffix of ["abc def", "abc--def", "abc_123", plate, vin, nif, iban]) {
      const value = prefix + "-" + suffix;
      assert.equal(pattern.test(value), false, "OpenAPI rejects " + value);
      assert.equal(adapterAccepts(dtoForId(kind, value)), false, "runtime rejects " + value);
    }
    const wrongPrefix = "wrong-abc";
    assert.equal(pattern.test(wrongPrefix), false, "OpenAPI rejects " + wrongPrefix);
    assert.equal(adapterAccepts(dtoForId(kind, wrongPrefix)), false, "runtime rejects " + wrongPrefix);
  }
});

test("campos prohibidos, secretos y endpoints ajenos ausentes", () => {
  for (const needle of FORBIDDEN_TEXT) assert.equal(TEXT.includes(needle), false, needle);
  assert.equal(/sk-[A-Za-z0-9]/.test(TEXT), false);
  assert.equal(/Bearer\s+[A-Za-z0-9._-]{8,}/.test(TEXT), false);
  assert.equal(TEXT.includes(`Access-Control${"-Allow-Origin"}`), false);
  assert.equal(TEXT.includes("429"), false);
  assert.equal(TEXT.includes("504"), false);
  assert.equal(TEXT.includes(`OpenAI${" API"}`), false);
  assert.equal(TEXT.includes("Anthropic"), false);
  assert.equal(TEXT.includes("VEHICLE_TAX_ESTIMATE_API_KEY"), false);
  assert.match(TEXT, /estimateVehicleImportTax/);
});

test("ejemplos de request compatibles con schema y sin PII", () => {
  const examples = OPENAPI.paths["/api/vehicle-tax-estimate-action"].post.requestBody.content["application/json"].examples;
  for (const [name, example] of Object.entries(examples)) {
    validate(OPENAPI.components.schemas.ActionRequest, example.value, name);
    assert.doesNotThrow(() => buildVehicleTaxCaseFromActionDto(example.value));
    assert.equal(isRealIsoDate(example.value.options.calculationDate), true, name + ":calculationDate");
    assert.equal(Number(example.value.options.calculationDate.slice(0, 4)), example.value.options.taxYear, name + ":taxYear");
    for (const item of example.value.evidence) {
      if (item.valueType !== "date") continue;
      if (item.field === "vehicle.firstRegistrationDate" && item.normalizedValue.length === 7) assert.equal(isRealIsoYearMonth(item.normalizedValue), true, name + ":" + item.field);
      else assert.equal(isRealIsoDate(item.normalizedValue), true, name + ":" + item.field);
    }
    const text = JSON.stringify(example.value);
    for (const forbidden of ["sourceExcerpt", "rawText", "ocrText", "vehicle.vin", "vehicle.model", `sample${"@example"}`, `1234${"ABC"}`]) assert.equal(text.includes(forbidden), false, `${name}:${forbidden}`);
  }
  validate(OPENAPI.components.schemas.ErrorBody, OPENAPI.paths["/api/vehicle-tax-estimate-action"].post.responses[400].content["application/json"].examples.contractualError.value, "errorExample");
});

test("success schema permite interpretar totales, escenarios y warnings clave", () => {
  const data = OPENAPI.components.schemas.CalculationData.properties;
  assert.deepEqual(data.status.enum, Object.values(VEHICLE_TAX_CALCULATION_STATUSES));
  assert.equal(data.engineExecutions.$ref, "#/components/schemas/EngineExecutions");
  const execution = OPENAPI.components.schemas.EngineExecution;
  assert.deepEqual(execution.properties.status.enum, Object.values(VEHICLE_TAX_ENGINE_EXECUTION_STATUSES));
  const taxSummary = OPENAPI.components.schemas.TaxSummary;
  for (const key of ["status", "confirmedSubtotal", "exactTotal", "probableTotal", "minimumTotal", "maximumTotal", "prudentBudget", "exactTotalBlockedBy"]) assert.ok(Object.hasOwn(taxSummary.properties, key), key);
  for (const key of ["scenarios", "missingFields", "warningCodes", "warnings", "requestId"]) assert.match(TEXT, new RegExp(`"${key}"`));
  assert.equal(OPENAPI.components.schemas.SuccessBody.properties.schemaVersion.const, VEHICLE_TAX_ESTIMATE_RESPONSE_SCHEMA_VERSION);
});

test("limites de complejidad documentados desde constantes runtime", () => {
  assert.match(TEXT, /256 KiB/);
  assert.equal(VEHICLE_TAX_ACTION_MAX_STRUCTURE_DEPTH, 64);
  assert.equal(VEHICLE_TAX_ACTION_MAX_STRUCTURE_NODES, 20000);
});
