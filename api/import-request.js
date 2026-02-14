const RECIPIENT_EMAIL = process.env.IMPORT_FORM_TO || 'info@premiumgermancars.com';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildHtml(payload) {
  const safe = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, escapeHtml(v)])
  );

  return `
    <h2>Nueva solicitud de importación</h2>
    <p><strong>Vehículo:</strong> ${safe.brand} ${safe.model}</p>
    <p><strong>Presupuesto máximo:</strong> ${safe.budget} €</p>
    <h3>Datos de contacto</h3>
    <p><strong>Email:</strong> ${safe.email}</p>
    <p><strong>Teléfono:</strong> ${safe.phone}</p>
    <h3>Detalles específicos</h3>
    <p>${safe.details || 'Sin detalles adicionales'}</p>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { brand, model, budget, email, phone, details = '' } = req.body || {};

  if (!brand || !model || !budget || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'RESEND_API_KEY is not configured' });
  }

  const subject = `Nueva Solicitud: ${brand} ${model}`;

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.IMPORT_FORM_FROM || 'Premium German Cars <onboarding@resend.dev>',
      to: [RECIPIENT_EMAIL],
      reply_to: email,
      subject,
      html: buildHtml({ brand, model, budget, email, phone, details })
    })
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    return res.status(502).json({ error: 'Email provider error', details: errorText });
  }

  return res.status(200).json({ ok: true });
}
