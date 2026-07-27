const RECIPIENT_EMAIL = process.env.IMPORT_FORM_TO || "info@premiumgermancars.com";
const CRM_WEBHOOK_URL =
  process.env.LEADS_WEBHOOK_URL ||
  process.env.LEAD_WEBHOOK_URL ||
  process.env.CRM_WEBHOOK_URL ||
  "";
const CRM_WEBHOOK_TOKEN = process.env.CRM_WEBHOOK_TOKEN || "";
const CRM_WEBHOOK_SECRET = process.env.CRM_WEBHOOK_SECRET || "";
const RESEND_FROM =
  process.env.IMPORT_FORM_FROM ||
  "Premium German Cars <onboarding@resend.dev>";

function createRevisionReference(date = new Date()) {
  const suffix = String(date.getTime()).slice(-6);
  return `REV-${date.getFullYear()}-${suffix}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function toBoolean(value) {
  return value === true || value === "true";
}

function formatEuro(value = "") {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return hasValue(value) ? `${escapeHtml(value)} EUR` : "No disponible";
  }

  return `${new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
  }).format(numericValue)} EUR`;
}

function formatNumber(value = "", suffix = "") {
  if (!hasValue(value)) {
    return "No disponible";
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return `${escapeHtml(value)}${suffix}`;
  }

  return `${new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 4,
  }).format(numericValue)}${suffix}`;
}

function formatPercent(value = "") {
  return formatNumber(value, "%");
}

function buildRows(rows) {
  return rows
    .filter(([, value]) => hasValue(value))
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;"><strong>${escapeHtml(key)}</strong></td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
}

function getCalculatorStatus(payload) {
  return toBoolean(payload.calculatorSupportedCalculation)
    ? "Calculo automatico soportado"
    : "Revision fiscal individual";
}

function getCalculatorCalculationRows(payload) {
  const supported = toBoolean(payload.calculatorSupportedCalculation);

  return [
    ["Estado", getCalculatorStatus(payload)],
    ["Alcance", payload.calculatorScope],
    ["Valor BOE nuevo", formatEuro(payload.calculatorBoeValue || payload.calculatorPrice || payload.budget)],
    ["Emisiones CO2", hasValue(payload.calculatorEmissions) ? `${escapeHtml(payload.calculatorEmissions)} g/km` : ""],
    ["Primera matriculacion", payload.calculatorFirstRegistrationDate],
    ["Condicion", payload.calculatorVehicleCondition],
    ["Norma emisiones", payload.calculatorEmissionsStandard],
    ["Antiguedad", hasValue(payload.calculatorMonths) ? `${escapeHtml(payload.calculatorMonths)} meses` : ""],
    ["Coeficiente antiguedad", formatNumber(payload.calculatorDepreciationCoefficient)],
    ["Valor mercado", formatEuro(payload.calculatorMarketValue)],
    ["Territorio", payload.calculatorTerritory],
    ["Territorio provisional", hasValue(payload.calculatorTerritoryIsProvisional) ? String(payload.calculatorTerritoryIsProvisional) : ""],
    ["Impuesto indirecto residual", payload.calculatorIndirectTaxName],
    ["Tipo impuesto indirecto residual", formatPercent(payload.calculatorIndirectTaxRate)],
    ["Tipo IEDMT residual", formatPercent(payload.calculatorResidualRegistrationTaxRate)],
    ["Otros impuestos indirectos residuales", formatPercent(payload.calculatorOtherIndirectTaxRate)],
    ["Base imponible", supported ? formatEuro(payload.calculatorTaxableBase) : ""],
    ["Tipo IEDMT actual", supported ? formatPercent(payload.calculatorCurrentRegistrationTaxRate || payload.calculatorRate) : ""],
    ["Cuota estimada", supported ? formatEuro(payload.calculatorTax) : "Revision individual"],
    ["Motivo de exclusion", payload.calculatorExclusionReason],
    ["Supuestos", payload.calculatorAssumptions],
    ["Advertencias", payload.calculatorWarnings],
    ["Codigos advertencia", payload.calculatorWarningCodes],
  ];
}

function buildHtml(payload, attribution) {
  const isRevisionUnitLead = payload.leadType === "revision-unidad-alemania";
  const safePayload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, escapeHtml(value)])
  );
  const safeAttribution = Object.fromEntries(
    Object.entries(attribution).map(([key, value]) => [key, escapeHtml(value)])
  );
  const attributionRows = buildRows(Object.entries(safeAttribution));
  const revisionRows = buildRows([
    ["Referencia o lead_id", safePayload.lead_id || safePayload.leadId || safePayload.reference],
    ["Estado", safePayload.requestStatus],
    ["Importe previsto", safePayload.servicePrice ? `${safePayload.servicePrice} EUR IVA incluido` : ""],
    ["Metodos de pago disponibles despues de aceptar", safePayload.paymentMethods],
    ["Enlace del anuncio", safePayload.announcementUrl],
    ["Lugar de matriculacion", safePayload.registrationPlace],
  ]);
  const calculationRows = buildRows(getCalculatorCalculationRows(payload));

  const heading = isRevisionUnitLead
    ? "Nueva solicitud de revision de unidad"
    : "Nueva solicitud de importacion";
  const vehicleSummary = isRevisionUnitLead
    ? safePayload.announcementUrl || "Unidad pendiente de revisar"
    : `${safePayload.brand} ${safePayload.model}`;
  const budgetSummary = isRevisionUnitLead
    ? "79 EUR IVA incluido"
    : `${safePayload.budget} EUR`;

  return `
    <h2>${heading}</h2>
    <p><strong>Tipo de lead:</strong> ${safePayload.leadType || "busqueda-personalizada"}</p>
    <p><strong>Servicio:</strong> ${safePayload.service_type || ""}</p>
    <p><strong>Vehiculo:</strong> ${vehicleSummary}</p>
    <p><strong>Presupuesto maximo / importe previsto:</strong> ${budgetSummary}</p>
    <h3>Datos de contacto</h3>
    <p><strong>Email:</strong> ${safePayload.email}</p>
    <p><strong>Telefono:</strong> ${safePayload.phone}</p>
    <h3>Detalles especificos</h3>
    <p>${safePayload.details || "Sin detalles adicionales"}</p>
    ${revisionRows ? `<h3>Datos de revision de unidad</h3><table>${revisionRows}</table>` : ""}
    ${calculationRows ? `<h3>Datos de calculadora</h3><table>${calculationRows}</table>` : ""}
    <h3>Contexto del lead</h3>
    <table>${attributionRows || "<tr><td>Sin datos adicionales</td></tr>"}</table>
  `;
}

function buildClientCalculatorRows(payload) {
  const supported = toBoolean(payload.calculatorSupportedCalculation);
  const rows = getCalculatorCalculationRows(payload).filter(([label]) => {
    if (supported) {
      return label !== "Motivo de exclusion";
    }
    return !["Base imponible", "Tipo IEDMT actual"].includes(label);
  });

  return rows
    .filter(([, value]) => hasValue(value))
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 16px;border-bottom:1px solid #ececec;color:#666;">${escapeHtml(label)}</td><td style="padding:10px 16px;border-bottom:1px solid #ececec;font-weight:700;color:#111;">${escapeHtml(value)}</td></tr>`
    )
    .join("");
}

function buildCalculatorSummaryHtml(payload) {
  const safeName = escapeHtml(payload.name || "");
  const safeDetails = escapeHtml(payload.details || "");
  const supported = toBoolean(payload.calculatorSupportedCalculation);
  const rows = buildClientCalculatorRows(payload);
  const intro = supported
    ? "Hemos recibido tu calculo. Este es el resumen orientativo para valorar si la importacion compensa antes de avanzar con una unidad concreta."
    : "Hemos recibido tus datos. Este supuesto requiere revision fiscal individual antes de mostrar una cuota numerica fiable.";

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;background:#f6f6f6;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e8e8e8;">
        <div style="background:#050505;color:#fff;padding:24px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#d6b15f;">Premium German Cars</p>
          <h1 style="margin:0;font-size:24px;line-height:1.25;">Tu desglose de impuesto de matriculacion</h1>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 16px;">${safeName ? `Hola ${safeName},` : "Hola,"}</p>
          <p style="margin:0 0 20px;">${intro}</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;border:1px solid #ececec;">
            ${rows}
          </table>
          ${safeDetails ? `<p style="margin:20px 0;"><strong>Notas:</strong> ${safeDetails}</p>` : ""}
          <p style="margin:20px 0;">Para validar el coste real final, necesitamos revisar ficha tecnica, emisiones homologadas, pais de origen, historial y documentacion del vehiculo.</p>
          <p style="margin:24px 0 0;">
            <a href="https://wa.me/34603743608" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 18px;font-weight:700;">Enviar ficha por WhatsApp</a>
          </p>
        </div>
        <div style="padding:18px 24px;background:#fafafa;color:#777;font-size:12px;">
          Este calculo es orientativo y no sustituye la validacion documental previa a la compra.
        </div>
      </div>
    </div>
  `;
}

async function sendResendEmail(emailPayload) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY no configurada");
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    throw new Error(`Email provider error: ${errorText}`);
  }
}

async function sendLeadToWebhook(leadRecord) {
  if (!CRM_WEBHOOK_URL) {
    return { skipped: true };
  }

  const headers = {
    "Content-Type": "application/json",
  };

  if (CRM_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${CRM_WEBHOOK_TOKEN}`;
  }

  if (CRM_WEBHOOK_SECRET) {
    headers["x-pgc-webhook-secret"] = CRM_WEBHOOK_SECRET;
  }

  const webhookResponse = await fetch(CRM_WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(leadRecord),
  });

  if (!webhookResponse.ok) {
    const errorText = await webhookResponse.text();
    throw new Error(`Webhook error: ${errorText}`);
  }

  return { skipped: false };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    brand,
    model,
    budget,
    email,
    phone,
    details = "",
    leadType = "busqueda-personalizada",
    name = "",
    calculatorPrice = "",
    calculatorBoeValue = "",
    calculatorEmissions = "",
    calculatorFirstRegistrationDate = "",
    calculatorVehicleCondition = "",
    calculatorEmissionsStandard = "",
    calculatorMonths = "",
    calculatorDepreciationCoefficient = "",
    calculatorMarketValue = "",
    calculatorTerritory = "",
    calculatorTerritoryId = "",
    calculatorTerritoryIsProvisional = "",
    calculatorIndirectTaxName = "",
    calculatorIndirectTaxRate = "",
    calculatorResidualRegistrationTaxRate = "",
    calculatorOtherIndirectTaxRate = "",
    calculatorTaxableBase = "",
    calculatorCurrentRegistrationTaxRate = "",
    calculatorRate = "",
    calculatorTax = "",
    calculatorReduction = "",
    calculatorSupportedCalculation = false,
    calculatorScope = "",
    calculatorAssumptions = "",
    calculatorWarnings = "",
    calculatorWarningCodes = "",
    calculatorExclusionReason = "",
    sourcePath = "",
    sourceQuery = "",
    sourceTitle = "",
    entryPath = "",
    entryQuery = "",
    firstReferrer = "",
    firstSeenAt = "",
    lastPath = "",
    lastQuery = "",
    lastSeenAt = "",
    utmSource = "",
    utmMedium = "",
    utmCampaign = "",
    utmTerm = "",
    utmContent = "",
    sessionId = "",
    announcementUrl = "",
    registrationPlace = "",
    service_type = "",
    servicePrice = "",
    servicePriceCurrency = "",
    serviceVatIncluded = false,
    requestStatus = "",
    paymentMethods = "",
    paymentStatus = "",
  } = req.body || {};

  const trimmedEmail = String(email || "").trim();
  const trimmedPhone = String(phone || "").trim();
  const hasValidEmail = trimmedEmail.includes("@");
  const isCalculatorLead = leadType === "calculadora-impuestos";
  const isRevisionUnitLead = leadType === "revision-unidad-alemania";
  const isCustomSearchLead = leadType === "busqueda-personalizada";

  if (isCustomSearchLead && (!brand || !model || !budget || !trimmedEmail || !trimmedPhone)) {
    return res.status(400).json({
      error: "Missing required fields for busqueda-personalizada",
    });
  }

  if (isCalculatorLead && (!budget || !hasValidEmail)) {
    return res.status(400).json({
      error: "Missing required fields for calculadora-impuestos",
    });
  }

  if (
    isRevisionUnitLead &&
    (!announcementUrl || !registrationPlace || !name || !hasValidEmail || !trimmedPhone)
  ) {
    return res.status(400).json({
      error: "Missing required fields for revision-unidad-alemania",
    });
  }

  if (!isCustomSearchLead && !isCalculatorLead && !isRevisionUnitLead && !budget) {
    return res.status(400).json({
      error: "Missing required budget",
    });
  }

  const attribution = {
    sourcePath,
    sourceQuery,
    sourceTitle,
    entryPath,
    entryQuery,
    firstReferrer,
    firstSeenAt,
    lastPath,
    lastQuery,
    lastSeenAt,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    sessionId,
  };

  const calculatorFields = {
    calculatorPrice,
    calculatorBoeValue,
    calculatorEmissions,
    calculatorFirstRegistrationDate,
    calculatorVehicleCondition,
    calculatorEmissionsStandard,
    calculatorMonths,
    calculatorDepreciationCoefficient,
    calculatorMarketValue,
    calculatorTerritory,
    calculatorTerritoryId,
    calculatorTerritoryIsProvisional,
    calculatorIndirectTaxName,
    calculatorIndirectTaxRate,
    calculatorResidualRegistrationTaxRate,
    calculatorOtherIndirectTaxRate,
    calculatorTaxableBase,
    calculatorCurrentRegistrationTaxRate,
    calculatorRate,
    calculatorTax,
    calculatorReduction,
    calculatorSupportedCalculation,
    calculatorScope,
    calculatorAssumptions,
    calculatorWarnings,
    calculatorWarningCodes,
    calculatorExclusionReason,
  };

  const submittedAt = new Date().toISOString();
  const revisionReference = isRevisionUnitLead ? createRevisionReference(new Date(submittedAt)) : "";
  const leadRecord = {
    submittedAt,
    fecha: submittedAt,
    leadType,
    source: leadType,
    name,
    brand,
    model,
    marca: brand,
    modelo: model,
    budget,
    email: trimmedEmail,
    phone: trimmedPhone,
    details,
    ...calculatorFields,
    lead_id: revisionReference,
    leadId: revisionReference,
    reference: revisionReference,
    service_type,
    requestStatus,
    paymentMethods,
    announcementUrl,
    registrationPlace,
    servicePrice,
    servicePriceCurrency,
    serviceVatIncluded,
    contact: {
      name,
      brand,
      model,
      budget,
      email: trimmedEmail,
      phone: trimmedPhone,
      details,
      ...calculatorFields,
      lead_id: revisionReference,
      leadId: revisionReference,
      reference: revisionReference,
      service_type,
      requestStatus,
      paymentMethods,
      announcementUrl,
      registrationPlace,
      servicePrice,
      servicePriceCurrency,
      serviceVatIncluded,
    },
    attribution,
  };

  let emailSent = false;
  let clientEmailSent = false;
  let adminEmailSent = false;
  let webhookSent = false;
  const warnings = [];
  const emailPayload = {
    name,
    brand,
    model,
    budget,
    email: trimmedEmail,
    phone: trimmedPhone,
    details,
    leadType,
    ...calculatorFields,
    lead_id: revisionReference,
    leadId: revisionReference,
    reference: revisionReference,
    service_type,
    requestStatus,
    paymentMethods,
    announcementUrl,
    registrationPlace,
    servicePrice,
    servicePriceCurrency,
    serviceVatIncluded,
  };

  if (isCalculatorLead) {
    try {
      await sendResendEmail({
        from: RESEND_FROM,
        to: [trimmedEmail],
        subject: "Tu desglose de impuesto de matriculacion | Premium German Cars",
        html: buildCalculatorSummaryHtml(emailPayload),
        reply_to: RECIPIENT_EMAIL,
      });

      clientEmailSent = true;
      emailSent = true;
    } catch (error) {
      warnings.push(
        error instanceof Error ? error.message : "Unknown client email error"
      );
    }
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const calculatorStatus = toBoolean(calculatorSupportedCalculation)
        ? `${budget} EUR / ${calculatorEmissions || "N/A"} g/km`
        : `revision individual / ${calculatorEmissions || "N/A"} g/km`;
      const subject = isCalculatorLead
        ? `Nuevo Lead Calculadora: ${calculatorStatus}`
        : isRevisionUnitLead
          ? `Nueva solicitud de revision de unidad: ${revisionReference || registrationPlace || "sin ubicacion"}`
          : `Nueva Solicitud: ${brand} ${model}`;
      const resendBody = {
        from: RESEND_FROM,
        to: [RECIPIENT_EMAIL],
        subject,
        html: buildHtml(emailPayload, attribution),
      };

      if (trimmedEmail) {
        resendBody.reply_to = trimmedEmail;
      }

      await sendResendEmail(resendBody);

      adminEmailSent = true;
      emailSent = true;
    } catch (error) {
      warnings.push(
        error instanceof Error ? error.message : "Unknown email error"
      );
    }
  }

  try {
    const webhookResult = await sendLeadToWebhook(leadRecord);
    webhookSent = !webhookResult.skipped;
  } catch (error) {
    warnings.push(
      error instanceof Error ? error.message : "Unknown webhook error"
    );
  }

  if (isCalculatorLead && !clientEmailSent) {
    return res.status(process.env.RESEND_API_KEY ? 502 : 500).json({
      error: "Calculator email delivery failed",
      details: warnings,
      webhookSent,
    });
  }

  if (!emailSent && !webhookSent) {
    if (!process.env.RESEND_API_KEY && !CRM_WEBHOOK_URL) {
      return res.status(500).json({
        error: "No lead destination configured",
        details: "Configure RESEND_API_KEY or CRM_WEBHOOK_URL",
      });
    }

    return res.status(502).json({
      error: "Lead delivery failed",
      details: warnings,
    });
  }

  return res.status(200).json({
    ok: true,
    leadId: revisionReference || undefined,
    reference: revisionReference || undefined,
    emailSent,
    clientEmailSent,
    adminEmailSent,
    webhookSent,
    warnings,
  });
}
