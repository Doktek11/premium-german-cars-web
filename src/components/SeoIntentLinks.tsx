export type SeoIntentLink = {
  href: string;
  label: string;
  description: string;
};

type SeoIntentLinksProps = {
  title?: string;
  intro?: string;
  links: SeoIntentLink[];
};

export const seoIntentLinks = {
  calculator: [
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "cuánto cuesta importar un coche de Alemania",
      description: "Desglose completo de transporte, impuestos y trámites.",
    },
    {
      href: "/blog/como-importar-coche-alemania",
      label: "guía para importar un coche de Alemania",
      description: "Proceso paso a paso antes de reservar una unidad.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos al importar de Alemania",
      description: "Errores técnicos, fiscales y documentales que conviene evitar.",
    },
    {
      href: "/preguntas-frecuentes",
      label: "preguntas frecuentes sobre importación",
      description: "Respuestas rápidas sobre plazos, documentos y costes.",
    },
  ],
  importacion: [
    {
      href: "/",
      label: "Premium German Cars en Cambrils",
      description: "Servicio de importación premium para Tarragona, Reus y Cataluña.",
    },
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calculadora de impuesto de matriculación",
      description: "Estima el coste fiscal antes de valorar una unidad alemana.",
    },
    {
      href: "/blog/coche-segunda-mano-reus-tarragona",
      label: "coches de segunda mano en Reus y Tarragona",
      description: "Alternativa local al mercado nacional de ocasión.",
    },
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "coste real de importar desde Alemania",
      description: "Costes habituales, fiscalidad y ejemplos prácticos.",
    },
  ],
  cost: [
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calcular impuesto de matriculación",
      description: "Pasa del coste orientativo a una estimación con valor, CO2 y antigüedad.",
    },
    {
      href: "/blog/como-importar-coche-alemania",
      label: "cómo importar un coche de Alemania",
      description: "Pasos clave para comprar, transportar y matricular sin improvisar.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos de importar un coche de Alemania",
      description: "Los costes ocultos suelen empezar antes de pagar la reserva.",
    },
    {
      href: "/importacion-coches-alemania",
      label: "servicio de importación en Cambrils y Tarragona",
      description: "Acompañamiento completo desde la selección hasta la entrega.",
    },
  ],
  risks: [
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calcular el coste antes de pagar",
      description: "Comprueba si la operación sigue teniendo sentido con impuestos incluidos.",
    },
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "costes reales de importación",
      description: "Transporte, fiscalidad y trámites que afectan al presupuesto final.",
    },
    {
      href: "/blog/como-importar-coche-alemania",
      label: "guía de importación segura",
      description: "Método completo para evitar errores en origen y matriculación.",
    },
    {
      href: "/preguntas-frecuentes",
      label: "FAQ de importación",
      description: "Dudas habituales antes de transferir dinero o reservar una unidad.",
    },
  ],
  guide: [
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "cuánto cuesta importar un coche",
      description: "Completa la guía con un presupuesto realista de la operación.",
    },
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calculadora fiscal 2026",
      description: "Comprueba el impacto del CO2 y la antigüedad en el Modelo 576.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos antes de pagar",
      description: "Verificaciones que deben cerrarse antes de enviar dinero.",
    },
    {
      href: "/importacion-coches-alemania",
      label: "importación llave en mano",
      description: "Servicio para clientes de Cambrils, Tarragona, Reus y Cataluña.",
    },
  ],
  models: [
    {
      href: "/blog/que-motor-elegir-importar-alemania-2026",
      label: "qué motor elegir en 2026",
      description: "Decide por uso real, fiscalidad, etiqueta y valor futuro.",
    },
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "coste total de importación",
      description: "Calcula si el modelo sigue siendo rentable al llegar a España.",
    },
    {
      href: "/blog/bmw-reestreno-alemania-2026",
      label: "BMW de reestreno en Alemania",
      description: "Criterios específicos para unidades BMW recientes.",
    },
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "impuesto por CO2",
      description: "Comprueba el tramo fiscal antes de cerrar una compra.",
    },
  ],
  motor: [
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calcular impuesto por CO2",
      description: "Convierte la elección de motor en una estimación fiscal concreta.",
    },
    {
      href: "/blog/mejores-modelos-importar-alemania-2026",
      label: "mejores modelos para importar",
      description: "Cruza motor, demanda y depreciación antes de decidir.",
    },
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "coste de importar desde Alemania",
      description: "Presupuesto completo más allá del motor elegido.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos técnicos y documentales",
      description: "Problemas habituales con emisiones, historial y homologación.",
    },
  ],
  bmw: [
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calcular impuestos de un BMW importado",
      description: "Valora CO2, edad y base fiscal antes de buscar unidad.",
    },
    {
      href: "/blog/mejores-modelos-importar-alemania-2026",
      label: "modelos rentables para importar",
      description: "Compara BMW Serie 1, compactos premium y SUV equilibrados.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos en BMW de reestreno",
      description: "Flotas, historial, garantía y documentación antes de comprar.",
    },
    {
      href: "/car/bmw-serie-1-116i",
      label: "BMW Serie 1 116i disponible",
      description: "Ejemplo de unidad premium con enfoque de reestreno.",
    },
  ],
  alpina: [
    {
      href: "/blog/bmw-reestreno-alemania-2026",
      label: "BMW de reestreno en Alemania",
      description: "Base útil para entender garantía, origen y selección BMW.",
    },
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "impuesto de matriculación para Alpina",
      description: "Las emisiones pueden cambiar por completo la viabilidad.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos al importar coches exclusivos",
      description: "Trazabilidad, vendedor y documentación son críticos.",
    },
    {
      href: "/importacion-coches-alemania",
      label: "importación premium desde Alemania",
      description: "Proceso llave en mano para unidades de alta gama.",
    },
  ],
  local: [
    {
      href: "/importacion-coches-alemania",
      label: "importación de coches desde Alemania en Cambrils",
      description: "Servicio local para Reus, Tarragona y Costa Daurada.",
    },
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calculadora de coste real",
      description: "Estima impuestos antes de comparar con stock local.",
    },
    {
      href: "/blog/bmw-reestreno-alemania-2026",
      label: "BMW de reestreno importado",
      description: "Una de las búsquedas más habituales en clientes locales.",
    },
    {
      href: "/preguntas-frecuentes",
      label: "preguntas frecuentes",
      description: "Plazos, documentos, garantías y entrega en España.",
    },
  ],
  faq: [
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calculadora de impuesto de matriculación",
      description: "La duda fiscal más frecuente antes de importar.",
    },
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "coste real de importar un coche",
      description: "Resumen completo de transporte, impuestos y gestión.",
    },
    {
      href: "/blog/como-importar-coche-alemania",
      label: "guía para importar desde Alemania",
      description: "Proceso ordenado de búsqueda, compra y matriculación.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos que conviene revisar",
      description: "Checklist previo a cualquier pago o reserva.",
    },
  ],
  car: [
    {
      href: "/blog/bmw-reestreno-alemania-2026",
      label: "BMW de reestreno en Alemania",
      description: "Criterios para encontrar unidades similares con garantía y trazabilidad.",
    },
    {
      href: "/calculadora-impuesto-matriculacion",
      label: "calcular impuesto de matriculación",
      description: "Estima el coste fiscal de una unidad equivalente.",
    },
    {
      href: "/blog/cuanto-cuesta-importar-coche-alemania-2026",
      label: "coste total de importar un coche",
      description: "Transporte, impuestos y gestión antes de decidir.",
    },
    {
      href: "/blog/5-riesgos-importar-coche-alemania",
      label: "riesgos al comprar en Alemania",
      description: "Qué verificar antes de pagar un BMW usado o de reestreno.",
    },
  ],
} satisfies Record<string, SeoIntentLink[]>;

export const SeoIntentLinks = ({
  title = "También puede ayudarte",
  intro,
  links,
}: SeoIntentLinksProps) => (
  <section className="container mx-auto px-4 sm:px-6 max-w-4xl mb-12 sm:mb-16 md:mb-20">
    <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <p className="text-gold-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-3">
        Enlaces relacionados
      </p>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
        {title}
      </h2>
      {intro ? <p className="text-gray-300 text-base mb-6">{intro}</p> : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block border border-white/10 bg-black/30 p-4 hover:border-gold-400/50 transition-colors"
          >
            <span className="text-gold-400 font-bold text-sm">
              {link.label}
            </span>
            <span className="block text-gray-400 text-sm mt-2">
              {link.description}
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);
