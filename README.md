<div align="center">
  <img width="1200" height="475" alt="Premium German Cars" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Premium German Cars Web

Web corporativa de **Premium German Cars** desarrollada con **React + Vite + TypeScript + TailwindCSS**.

---

## Stack tecnico

- React 18
- React Router DOM 6
- Vite 5
- TypeScript 5
- TailwindCSS
- react-helmet-async (SEO dinamico por pagina)
- @vercel/analytics

---

## Requisitos

- Node.js 18+ (recomendado)
- npm 9+

---

## Instalacion

```bash
npm install
```

## Variables de entorno

Para activar el nuevo flujo de leads puedes configurar uno o ambos destinos:

```bash
RESEND_API_KEY=tu_api_key
IMPORT_FORM_TO=info@premiumgermancars.com
IMPORT_FORM_FROM=Premium German Cars <noreply@tudominio.com>

CRM_WEBHOOK_URL=https://tu-webhook-o-automatizacion
CRM_WEBHOOK_TOKEN=token_opcional
CRM_WEBHOOK_SECRET=secret_opcional
```

Notas:

- Si `RESEND_API_KEY` esta configurada, el lead se envia por email.
- Si `LEADS_WEBHOOK_URL`, `LEAD_WEBHOOK_URL` o `CRM_WEBHOOK_URL` esta configurada, el lead tambien se reenvia al CRM o webhook.
- El formulario funciona si al menos uno de los dos destinos esta operativo.
