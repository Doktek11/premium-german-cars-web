import { SITE_URL } from "../lib/structuredData.mjs";

export const IMPORT_SERVICE_SCHEMA_INPUT = {
  id: `${SITE_URL}/importacion-coches-alemania#service`,
  url: `${SITE_URL}/importacion-coches-alemania`,
  name: "Importar coche de Alemania a España",
  description:
    "Servicio de búsqueda, verificación, compra, transporte, ITV y matriculación de coches premium importados desde Alemania a España.",
  serviceType: "Importación de coches premium desde Alemania",
};

export const AUDIT_REVIEW_SERVICE_SCHEMA_INPUT = {
  id: `${SITE_URL}/blog/revision-coche-alemania-protocolo-auditoria#service`,
  url: `${SITE_URL}/blog/revision-coche-alemania-protocolo-auditoria`,
  name: "Revisión de coche en Alemania antes de comprar",
  description:
    "Revisión previa de anuncio, vendedor, historial, documentación, CO₂ y coste real antes de importar un coche premium desde Alemania.",
  serviceType: "Revisión previa de vehículos importados",
};
