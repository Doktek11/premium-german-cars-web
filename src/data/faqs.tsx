import React from 'react';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export const faqs: FAQItem[] = [
  {
    question: "1. ¿Cómo afecta la normativa del BOE 2026 a la importación de coches desde Alemania?",
    answer: "La normativa publicada en el BOE ha redefinido los tramos del Impuesto de Matriculación en 2026, ajustándolos a las emisiones reales de CO₂ (WLTP). Esto afecta directamente al coste final de importar un coche desde Alemania a España. En Premium German Cars calculamos el importe exacto según las tablas oficiales de Hacienda 2026, gestionando la liquidación del modelo 576 para que no tengas sorpresas, regularizaciones ni sobrecostes posteriores."
  },
  {
    question: "2. ¿Es posible comprar coches en Alemania sin IVA (Netto)?",
    answer: "Sí. La compra de coches Netto (sin IVA) es posible para empresas y autónomos con NIF intracomunitario (VIES) activo. El vehículo debe tener el IVA deducible (MwSt. ausweisbar). En Premium German Cars verificamos la documentación de ambas partes, asegurando una operación intracomunitaria segura y evitando cualquier riesgo de doble imposición."
  },
  {
    question: "3. ¿Qué garantía tienen los coches importados de Alemania?",
    answer: (
      <div className="space-y-2">
        <p>Todos los coches seleccionados cuentan con:</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Garantía oficial de la marca (si sigue vigente a nivel europeo).</li>
          <li>Garantía europea de 12 meses en especialistas certificados.</li>
        </ul>
        <p>Al trabajar exclusivamente con concesionarios oficiales en Alemania, la garantía es válida en la red oficial en España, ofreciendo total tranquilidad.</p>
      </div>
    )
  },
  {
    question: "4. ¿Aceptáis pagos en criptomonedas como Bitcoin o USDC?",
    answer: "Sí. Somos pioneros en facilitar la importación de coches mediante Bitcoin (BTC) y USDC. La operación se estructura bajo la normativa legal y fiscal vigente, garantizando trazabilidad completa y justificación de origen de fondos. Emitimos factura válida plenamente aceptada por Hacienda y la DGT para la matriculación del coche en España."
  },
  {
    question: "5. ¿Cuánto tiempo tarda el proceso de importación?",
    answer: "El plazo medio es de 15 a 20 días, incluyendo la inspección técnica en origen, el transporte especializado, la ITV de importación en España y la matriculación definitiva. Es un servicio integral “llave en mano”."
  },
  {
    question: "6. ¿Cómo verificáis que los kilómetros de los coches alemanes son reales?",
    answer: (
      <div className="space-y-2">
        <p>Realizamos una verificación de "tolerancia cero":</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Historial digital de mantenimiento en servicios oficiales.</li>
          <li>Informes de la TÜV (ITV alemana).</li>
          <li>Diagnosis electrónica de centralitas in situ.</li>
        </ul>
        <p>No importamos ninguna unidad con inconsistencias en su historial.</p>
      </div>
    )
  },
  {
    question: "7. ¿Puedo importar un coche con etiqueta ECO desde Alemania?",
    answer: "Sí. Los modelos Mild Hybrid (MHEV) alemanes obtienen la etiqueta ECO de la DGT. En Premium German Cars gestionamos la obtención de la ficha técnica reducida para asegurar que el distintivo ambiental se asigne correctamente, permitiéndote circular por Zonas de Bajas Emisiones (ZBE) sin restricciones."
  },
  {
    question: "8. ¿El servicio incluye el transporte del coche hasta mi domicilio?",
    answer: "Sí. Gestionamos el transporte internacional especializado con seguro a todo riesgo incluido. Puedes elegir camión abierto o cerrado, con entrega puerta a puerta en cualquier punto de la península o Baleares."
  },
  {
    question: "9. ¿Importáis versiones especiales como Alpina frente a BMW M?",
    answer: "Sí. Somos especialistas en Alpina, ofreciendo un nivel de lujo y refinamiento superior a los modelos M estándar. Estas unidades de producción limitada mantienen un valor de reventa muy superior en el mercado de ocasión premium."
  },
  {
    question: "10. ¿Es obligatorio pasar la ITV al importar un coche desde Alemania?",
    answer: "Sí. Para matricular un coche alemán es obligatoria la ITV de importación para emitir la ficha técnica española. Nosotros nos encargamos de que el vehículo cumpla con todas las homologaciones europeas exigidas antes de la cita."
  },
  {
    question: "11. ¿Cómo puedo saber el coste exacto del Impuesto de Matriculación?",
    answer: (
      <>
        El importe depende de las emisiones de CO₂ y los tramos fiscales del 2026. Para facilitarte el proceso, hemos diseñado una{" "}
        <button 
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-gold-400 font-bold hover:text-gold-300 transition-colors underline decoration-gold-500/30 underline-offset-4"
        >
          Calculadora de Importación Profesional
        </button>{" "}
        donde obtendrás tu presupuesto final “llave en mano” en segundos, adaptado a la normativa vigente.
      </>
    )
  },
  {
    question: "12. ¿Qué ocurre si el coche no supera la inspección previa en Alemania?",
    answer: "Si detectamos cualquier anomalía mecánica o estructural, descartamos la unidad inmediatamente. Tu seguridad es lo primero. Te propondremos alternativas equivalentes que sí cumplan con nuestros estándares de reestreno."
  },
  {
    question: "13. ¿Es seguro importar un coche desde Alemania sin viajar allí?",
    answer: "Absolutamente. La mayoría de nuestros clientes no viajan. Te enviamos reportes fotográficos detallados, vídeos en alta definición e informes técnicos. Tienes un asesor experto que actúa como tus ojos en Alemania durante todo el proceso."
  },
  {
    question: "14. ¿Por qué elegir Premium German Cars?",
    answer: (
      <div className="space-y-4">
        <p>Porque eliminamos el riesgo en la importación de coches desde Alemania: negociamos en alemán, verificamos la solvencia del vendedor, aseguramos el transporte y gestionamos toda la burocracia ante el BOE, Hacienda y DGT. Tú solo te encargas de disfrutarlo.</p>
        <div className="pt-4 border-t border-white/5 space-y-3">
          <p className="font-serif italic text-white">¿Hablamos de tu próximo coche?</p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors group"
            >
              <span className="group-hover:translate-x-1 transition-transform">🏎️</span> 
              <strong>Calcular presupuesto en la web</strong>
            </button>
            <a 
              href="https://wa.me/34603743608?text=Hola!%20He%20visto%20la%20web%20y%20me%20gustaría%20importar%20un%20coche%20desde%20Alemania" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors group"
            >
              <span className="group-hover:translate-x-1 transition-transform">💬</span> 
              <strong>Contactar por WhatsApp</strong>
            </a>
          </div>
        </div>
      </div>
    )
  }
];
