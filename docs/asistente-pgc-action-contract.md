# Contrato operativo - GPT Action fiscal PGC v1

## Finalidad

La Action `estimateVehicleImportTax` permite que el Asistente PGC envie un expediente fiscal reducido y saneado al endpoint server-side de PGC para estimar impuestos de importacion de vehiculos. La Action no recibe documentos, OCR, texto bruto, VIN, matriculas, PII ni secretos.

## Flujo tecnico

1. El GPT prepara un DTO `vehicle_tax_action_request.v1` con evidencias fiscales estructuradas.
2. `api/vehicle-tax-estimate-action.js` recibe la llamada autenticada.
3. `handleVehicleTaxActionRequest()` valida auth, metodo, Content-Type, tamano, privacidad, complejidad y JSON canonico.
4. `buildVehicleTaxCaseFromActionDto()` adapta el DTO reducido al `VehicleTaxCaseFile` interno.
5. `buildVehicleTaxCaseFile()` normaliza y resuelve hechos documentales.
6. `calculateVehicleTaxCase()` ejecuta clasificador, IEDMT, ITP, IVTM, DGT y resumen fiscal.
7. La respuesta vuelve como `vehicle_tax_estimate_response.v1`.

## Endpoint

- Server: `https://www.premiumgermancars.com`
- Path: `POST /api/vehicle-tax-estimate-action`
- OperationId: `estimateVehicleImportTax`
- Content-Type: `application/json`
- Limite runtime de body: 256 KiB

## Autenticacion

La autenticacion es Bearer y se configura fuera del schema, en la Action del GPT, usando el valor de `VEHICLE_TAX_ESTIMATE_API_KEY` desplegado en PGC/Vercel.

Nunca debe pegarse el secreto dentro del OpenAPI, instrucciones, documentacion, chat, ejemplos o logs. OpenAPI no necesita una API externa de OpenAI ni de Anthropic: ChatGPT llama al endpoint de PGC.

## DTO raiz admitido

| Campo | Requerido | Null | Descripcion |
| --- | --- | --- | --- |
| `schemaVersion` | si | no | Debe ser `vehicle_tax_action_request.v1`. |
| `caseId` | si | no | ID opaco `case-*`. |
| `documents` | si | no | Array de documentos estructurados. |
| `evidence` | si | no | Array de evidencias estructuradas. |
| `selectedVehicleCandidateId` | no | si | ID `candidate-*` existente, omitido o `null`. |
| `options` | si | no | Opciones fiscales cerradas. |

No se admiten claves extra como `dependencies`, `facts`, `readiness`, `conflicts`, `scenarios`, resultados fiscales, texto bruto, OCR, binarios, URL de descarga ni campos derivados.

## IDs opacos

| Tipo | Patron | Uso |
| --- | --- | --- |
| Case | `case-*` | Identifica el expediente. |
| Documento | `doc-*` | Identifica un documento abstracto, no un archivo real. |
| Evidencia | `ev-*` | Identifica una evidencia estructurada. |
| Candidato | `candidate-*` | Identifica una unidad/candidato de vehiculo. |

Los IDs no deben contener nombres, emails, telefono, direccion, DNI/NIF/CIF, IBAN, VIN, matricula, URL, ruta local ni texto documental.

## Tabla field/valueType

| Field | valueType |
| --- | --- |
| `vehicle.category` | `enum` |
| `vehicle.fuelType` | `enum` |
| `vehicle.engineDisplacementCc` | `number` |
| `vehicle.fiscalHorsepower` | `number` |
| `vehicle.firstRegistrationDate` | `date` |
| `vehicle.spanishRegistrationDate` | `date` |
| `vehicle.condition` | `enum` |
| `vehicle.co2Wltp` | `number` |
| `vehicle.co2Nedc` | `number` |
| `vehicle.emissionsStandard` | `enum` |
| `vehicle.zeroEmissionStatus` | `enum` |
| `vehicle.boeValue` | `money` |
| `vehicle.boeValueYear` | `year` |
| `vehicle.isHistoricVehicle` | `boolean` |
| `vehicle.isEndOfLifeVehicle` | `boolean` |
| `transaction.date` | `date` |
| `transaction.purchasePrice` | `money` |
| `transaction.currency` | `currency` |
| `transaction.purchaseCountry` | `country` |
| `transaction.documentType` | `enum` |
| `transaction.sellerType` | `enum` |
| `transaction.buyerType` | `enum` |
| `transaction.vatRegime` | `enum` |
| `transaction.vatItemizedStatus` | `enum` |
| `transaction.rebuStatus` | `enum` |
| `transaction.intendedForResale` | `boolean` |
| `parties.sellerCountry` | `country` |
| `parties.buyerTaxResidenceCountry` | `country` |
| `taxDestination.autonomousCommunity` | `enum` |
| `taxDestination.province` | `enum` |
| `taxDestination.municipalityCode` | `ine_code` |
| `taxDestination.foralTerritory` | `enum` |
| `taxDestination.expectedSettlementDate` | `date` |

Campos no admitidos: `vehicle.vin`, `vehicle.model`, `vehicle.make`, variantes comerciales, `taxDestination.municipalityName`, `sourceExcerpt`, `rawText`, `ocrText`, `documentContent`, `base64`, `binary`, `signature` y equivalentes normalizados.

## Opciones

| Campo | Contrato |
| --- | --- |
| `calculationDate` | Fecha real del calendario en ISO `YYYY-MM-DD`; su ano debe coincidir con `taxYear`. |
| `taxYear` | Entero 1990-2100; debe coincidir con el ano de `calculationDate`; el runtime aplica la validacion semantica autoritativa. |
| `scenarioPolicy` | `confirmed_only` mantiene evidencia estricta; `documentary_scenarios` permite estimacion orientativa con datos saneados declarados/no confirmados. |
| `maxScenarios` | Entero 0-12. |
| `currency` | Solo `EUR`. |

No incluir `dependencies` en la request HTTP.

## Statuses principales

| Status | Interpretacion |
| --- | --- |
| `exact` | Hay total exacto para las partidas ejecutadas y cerradas. |
| `partial` | Hay subtotal confirmado, pero falta alguna partida o resumen completo. |
| `estimated` | El resumen contiene estimacion/rango, no total exacto. |
| `scenario_required` | Hay escenarios fiscales abiertos. |
| `requires_review` | Una o varias partidas requieren revision. |
| `identity_conflict` | No se puede mezclar evidencia de candidatos/identidad. |
| `invalid` | El expediente no es procesable; el endpoint lo mapea a 422. |

## Interpretacion de totales

- `taxSummary.confirmedSubtotal`: subtotal de partidas confirmadas; no suma resultados `calculated_scenario`.
- `taxSummary.exactTotal`: total exacto solo cuando existe y no esta bloqueado.
- `taxSummary.exactTotalBlockedBy`: motores o partidas que impiden exactitud.
- `estimatedSummary`: resumen orientativo separado con `estimatedTotal`, `minimumTotal`, `maximumTotal` y `prudentBudget`; nunca equivale a `exactTotal`.
- `engineExecutions.*.confidenceLevel`: `confirmed`, `mixed` o `declared` segun las fuentes usadas.
- `probable`, `minimum`, `maximum` y `prudent` deben explicarse como estimacion/rango/presupuesto si el motor los devuelve.
- No convertir `null`, no ejecutado, missing, outdated, scenario o review en cero.
- Una cuota cero solo es real si viene devuelta por un motor como resultado fiscal confirmado/no sujeto/exento, segun contrato.

## Codigos HTTP reales

| HTTP | Origen real |
| --- | --- |
| 200 | Resultado canonico `ok: true`. |
| 400 | JSON invalido, body vacio, contrato invalido, privacidad, complejidad o error DTO. |
| 401 | Falta Bearer. |
| 403 | Token de autenticacion incorrecto. |
| 405 | Metodo distinto de POST. |
| 413 | Body superior a 256 KiB. |
| 415 | Content-Type no `application/json`. |
| 422 | Resultado `invalid` del orquestador. |
| 500 | Error interno, adapter, calculo, privacidad de salida o respuesta invalida. |
| 503 | Auth no configurada o timeout de calculo. |

No se documentan 429, 504, cancelacion real ni CORS porque no existen en el runtime actual.

## Privacidad

No enviar ni reflejar:

- nombres, apellidos, email, telefono, direccion;
- DNI, NIE, NIF, CIF, IBAN;
- firma, VIN completo, matricula;
- documentos, binarios, base64, OCR, texto bruto, `sourceExcerpt`;
- rutas locales, URLs de descarga, callbacks, webhooks;
- instrucciones, prompts, comandos, credenciales o secretos.

## Fuera de alcance Action v1

- `im Kundenauftrag` estructurado: representar como `sellerType: unknown` y pedir revision.
- Bonificaciones IVTM estructuradas: no se admiten en Action v1.
- Valor BOE inventado o derivado del precio de anuncio.
- Transporte, ITV, placas, seguro, reparaciones, peritaje, COC y honorarios PGC dentro del total fiscal.
- Configuracion real del GPT, OpenAPI publicado, pegado de la politica en el configurador del GPT, Vercel y cualquier publicacion real fuera de esta subfase.

## Configuracion posterior en GPT

1. Copiar `openapi/vehicle-tax-estimate-action.v1.json` en el editor de Actions.
2. Configurar autenticacion Bearer en el configurador del GPT con la clave real, sin pegarla en el schema.
3. Pegar las instrucciones versionadas desde `docs/asistente-pgc-instructions.md`.
4. Mantener knowledge file `b61ebb0C.txt` para Valor BOE.
5. Mantener navegacion web activa para CO2 y referencias tecnicas.
6. No crear iniciadores salvo decision posterior.
7. Usar como URL de privacidad prevista `https://www.premiumgermancars.com/politica-privacidad`; no considerarla operativa para publicar el GPT hasta que el cambio este committeado, desplegado y verificado con HTTP 200.
8. Probar con casos sin PII antes de activar para usuarios.

## Checklist previo a publicacion

- OpenAPI parsea como JSON sin transformacion.
- `operationId` es `estimateVehicleImportTax`.
- Endpoint apunta a `https://www.premiumgermancars.com`.
- Autenticacion Bearer, configurada fuera del schema.
- No hay secretos en OpenAPI ni instrucciones.
- Politica de privacidad publica definida en `https://www.premiumgermancars.com/politica-privacidad`, pendiente de commit, despliegue y verificacion HTTP 200 antes de configurar/publicar el GPT.
- Action no envia PII ni texto bruto.
- Tests locales y post-configuracion pasan.

## Checklist post-configuracion

- Sin auth: 401 `AUTH_REQUIRED`.
- Token incorrecto: 403 `AUTH_FORBIDDEN`.
- Token correcto: no 401/403/503.
- Caso parcial: devuelve `partial` o bloqueos esperados sin total ficticio.
- Caso suficiente: ejecuta motores esperados.
- Caso IVTM 28079/2025: confirma acceso a datos municipales si hay inputs completos.
- Caso `sellerType: unknown`: conserva escenarios y no fuerza ITP.
- Caso con `sourceExcerpt` o PII: se rechaza antes de calcular.

## Rotacion de API key

Si la clave se expone:

1. Revocar o sustituir inmediatamente `VEHICLE_TAX_ESTIMATE_API_KEY` en Vercel.
2. Actualizar la autenticacion Bearer en la Action del GPT sin publicar el valor.
3. Redeploy si el entorno lo requiere para leer la nueva variable.
4. Repetir pruebas 401/403/200.
5. Eliminar cualquier log, captura o mensaje que contenga el secreto.
