type TestWebhookRequest = {
  method?: string;
};

type TestWebhookResponse = {
  status: (code: number) => TestWebhookResponse;
  json: (body: unknown) => TestWebhookResponse;
};

declare const process: {
  env: Record<string, string | undefined>;
};

export default async function handler(_req: TestWebhookRequest, res: TestWebhookResponse) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ error: "LEADS_WEBHOOK_URL not set" });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@premiumgermancars.com",
        marca: "TEST",
        modelo: "DEBUG",
        source: "test-endpoint",
        fecha: new Date().toISOString(),
      }),
    });

    const text = await response.text();
    return res.status(200).json({
      ok: response.ok,
      status: response.status,
      webhookResponse: text,
      webhookUrl: webhookUrl.substring(0, 40) + "...",
    });
  } catch (error) {
    return res.status(500).json({ error: String(error) });
  }
}
