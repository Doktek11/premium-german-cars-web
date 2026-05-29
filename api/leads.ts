type LeadPayload = {
  email: string;
  marca?: string;
  modelo?: string;
  source?: string;
};

type LeadsRequest = {
  method?: string;
  body?: unknown;
};

type LeadsResponse = {
  status: (code: number) => LeadsResponse;
  json: (body: unknown) => LeadsResponse;
  end: () => LeadsResponse;
};

declare const process: {
  env: Record<string, string | undefined>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseBody(body: unknown): Record<string, unknown> {
  if (isRecord(body)) {
    return body;
  }

  if (typeof body === "string") {
    try {
      const parsedBody: unknown = JSON.parse(body);
      return isRecord(parsedBody) ? parsedBody : {};
    } catch {
      return {};
    }
  }

  return {};
}

function getLeadPayload(body: unknown): LeadPayload | null {
  const parsedBody = parseBody(body);
  const email = readString(parsedBody.email);

  if (!email || !email.includes("@")) {
    return null;
  }

  return {
    email,
    marca: readString(parsedBody.marca) || undefined,
    modelo: readString(parsedBody.modelo) || undefined,
    source: readString(parsedBody.source) || "calculadora",
  };
}

export default async function handler(req: LeadsRequest, res: LeadsResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const payload = getLeadPayload(req.body);

  if (!payload) {
    return res.status(400).json({ error: "Email invalido" });
  }

  const webhookUrl =
    process.env.LEADS_WEBHOOK_URL ||
    process.env.LEAD_WEBHOOK_URL ||
    process.env.CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: "LEADS_WEBHOOK_URL no configurada" });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email,
        marca: payload.marca ?? "No especificada",
        modelo: payload.modelo ?? "No especificado",
        source: payload.source,
        fecha: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      return res.status(502).json({ error: "Webhook no disponible" });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: "No se pudo enviar el lead" });
  }
}
