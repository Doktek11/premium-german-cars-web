const RECIPIENT_EMAIL = process.env.IMPORT_FORM_TO || "info@premiumgermancars.com";
const CRM_WEBHOOK_URL =
  process.env.LEAD_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL || "";
const CRM_WEBHOOK_TOKEN = process.env.CRM_WEBHOOK_TOKEN || "";
const CRM_WEBHOOK_SECRET = process.env.CRM_WEBHOOK_SECRET || "";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(payload, attribution) {
  const safePayload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, escapeHtml(value)])
  );
  const safeAttribution = Object.fromEntries(
    Object.entries(attribution).map(([key, value]) => [key, escapeHtml(value)])
  );
  const attributionRows = Object.entries(safeAttribution)
    .filter(([, value]) => value)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;"><strong>${key}</strong></td><td style="padding:6px 0;">${value}</td></tr>`
    )
    .join("");
  const calculationRows = [
    ["name", safePayload.name],
    ["calculatorPrice", safePayload.calculatorPrice],
    ["calculatorEmissions", safePayload.calculatorEmissions],
    ["calculatorMonths", safePayload.calculatorMonths],
    ["calculatorRate", safePayload.calculatorRate],
    ["calculatorTax", safePayload.calculatorTax],
    ["calculatorReduction", safePayload.calculatorReduction],
  ]
    .filter(([, value]) => value || value === 0)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;"><strong>${key}</strong></td><td style="padding:6px 0;">${value}</td></tr>`
    )
    .join("");

  return `
    <h2>Nueva solicitud de importacion</h2>
    <p><strong>Tipo de lead:</strong> ${safePayload.leadType || "busqueda-personalizada"}</p>
    <p><strong>Vehiculo:</strong> ${safePayload.brand} ${safePayload.model}</p>
    <p><strong>Presupuesto maximo:</strong> ${safePayload.budget} EUR</p>
    <h3>Datos de contacto</h3>
    <p><strong>Email:</strong> ${safePayload.email}</p>
    <p><strong>Telefono:</strong> ${safePayload.phone}</p>
    <h3>Detalles especificos</h3>
    <p>${safePayload.details || "Sin detalles adicionales"}</p>
    ${calculationRows ? `<h3>Datos de calculadora</h3><table>${calculationRows}</table>` : ""}
    <h3>Contexto del lead</h3>
    <table>${attributionRows || "<tr><td>Sin datos adicionales</td></tr>"}</table>
  `;
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
    calculatorEmissions = "",
    calculatorMonths = "",
    calculatorRate = "",
    calculatorTax = "",
    calculatorReduction = "",
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
  } = req.body || {};

  const trimmedEmail = String(email || "").trim();
  const trimmedPhone = String(phone || "").trim();
  const isCalculatorLead = leadType === "calculadora-impuestos";
  const isCustomSearchLead = leadType === "busqueda-personalizada";

  if (isCustomSearchLead && (!brand || !model || !budget || !trimmedEmail || !trimmedPhone)) {
    return res.status(400).json({
      error: "Missing required fields for busqueda-personalizada",
    });
  }

  if (isCalculatorLead && (!budget || (!trimmedEmail && !trimmedPhone))) {
    return res.status(400).json({
      error: "Missing required fields for calculadora-impuestos",
    });
  }

  if (!isCustomSearchLead && !isCalculatorLead && !budget) {
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

  const leadRecord = {
    submittedAt: new Date().toISOString(),
    leadType,
    contact: {
      name,
      brand,
      model,
      budget,
      email: trimmedEmail,
      phone: trimmedPhone,
      details,
      calculatorPrice,
      calculatorEmissions,
      calculatorMonths,
      calculatorRate,
      calculatorTax,
      calculatorReduction,
    },
    attribution,
  };

  let emailSent = false;
  let webhookSent = false;
  const warnings = [];

  if (process.env.RESEND_API_KEY) {
    try {
      const subject = isCalculatorLead
        ? `Nuevo Lead Calculadora: ${budget} EUR / ${calculatorEmissions || "N/A"} g/km`
        : `Nueva Solicitud: ${brand} ${model}`;
      const emailPayload = {
        name,
        brand,
        model,
        budget,
        email: trimmedEmail,
        phone: trimmedPhone,
        details,
        leadType,
        calculatorPrice,
        calculatorEmissions,
        calculatorMonths,
        calculatorRate,
        calculatorTax,
        calculatorReduction,
      };
      const resendBody = {
        from:
          process.env.IMPORT_FORM_FROM ||
          "Premium German Cars <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject,
        html: buildHtml(emailPayload, attribution),
      };

      if (trimmedEmail) {
        resendBody.reply_to = trimmedEmail;
      }

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resendBody),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        throw new Error(`Email provider error: ${errorText}`);
      }

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
    emailSent,
    webhookSent,
    warnings,
  });
}
