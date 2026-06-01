type LeadPayload = {
  email: string;
  marca: string;
  modelo: string;
  source: string;
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
    marca: readString(parsedBody.marca),
    modelo: readString(parsedBody.modelo),
    source: readString(parsedBody.source),
  };
}

export default async function handler(req: LeadsRequest, res: LeadsResponse) {
  console.log(
    "[leads] received:",
    req.body,
    process.env.LEADS_WEBHOOK_URL ? process.env.LEADS_WEBHOOK_URL.substring(0, 30) : ""
  );

  if (!process.env.LEADS_WEBHOOK_URL) {
    console.error("[leads] ERROR: LEADS_WEBHOOK_URL no está definida");
    return res.status(500).json({ error: "Webhook URL not configured" });
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const payload = getLeadPayload(req.body);

  if (!payload) {
    return res.status(400).json({ error: "Email invalido" });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email,
        marca: payload.marca,
        modelo: payload.modelo,
        source: payload.source,
        fecha: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      const webhookText = await webhookResponse.text();
      console.error("[leads] webhook error:", webhookResponse.status, webhookText);
      return res.status(500).json({ error: "Webhook no disponible" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[leads] fetch failed:", error);
    return res.status(500).json({ error: "No se pudo enviar el lead" });
  }
}
