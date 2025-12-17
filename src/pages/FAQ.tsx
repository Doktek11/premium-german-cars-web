import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto cuesta importar un coche desde Alemania?",
    answer:
      "El coste de importar un coche desde Alemania depende del precio del vehículo, impuestos aplicables, transporte, homologación e ITV. De forma orientativa, el coste total suele situarse entre 2.500 € y 4.500 €, aunque cada caso es diferente. En Premium German Cars ofrecemos presupuestos cerrados y sin sorpresas.",
  },
  {
    question: "¿Es seguro importar un coche desde Alemania?",
    answer:
      "Sí, siempre que el proceso se realice correctamente. Alemania cuenta con uno de los mercados de vehículos más fiables de Europa. El riesgo aparece cuando no se revisa el vehículo o se compra sin intermediación profesional. Nosotros realizamos verificaciones, revisiones técnicas y compra segura.",
  },
  {
    question: "¿Cuánto tarda el proceso completo?",
    answer:
      "El proceso completo de importación suele tardar entre 15 y 20 días desde la confirmación de la compra hasta la matriculación definitiva en España, dependiendo de la disponibilidad del vehículo y los plazos administrativos.",
  },
  {
    question: "¿Qué impuestos hay que pagar al importar un coche?",
    answer:
      "Los impuestos pueden incluir IVA, Impuesto de Matriculación y Impuesto de Circulación. El importe depende de si el comprador es particular o empresa, del tipo de factura y de las emisiones del vehículo. Te asesoramos para aplicar la opción fiscal más favorable.",
  },
  {
    question: "¿Puedo importar un coche desde Alemania siendo particular?",
    answer:
      "Sí, los particulares pueden importar vehículos desde Alemania sin problema. En estos casos, el precio suele incluir IVA alemán o aplicarse el régimen REBU. Nosotros nos encargamos de todo el proceso para evitar errores o sobrecostes.",
  },
  {
    question: "¿El precio que ofrecéis es final?",
    answer:
      "Sí. Nuestros presupuestos incluyen todos los costes necesarios para que el coche esté matriculado y a tu nombre en España. Sin gastos ocultos ni sorpresas posteriores.",
  },
  {
    question: "¿Qué pasa si el coche tiene algún problema?",
    answer:
      "Antes de la compra realizamos revisiones técnicas, comprobación de historial y estado real del vehículo. Además, trabajamos solo con proveedores fiables. Nuestro objetivo es minimizar cualquier riesgo antes de cerrar la operación.",
  },
  {
    question: "¿Importáis coches a toda España?",
    answer:
      "Sí, ofrecemos servicio de importación de vehículos a cualquier punto de España, incluyendo transporte asegurado y gestión completa de la documentación.",
  },
  {
    question: "¿Qué marcas recomendáis importar desde Alemania?",
    answer:
      "Alemania es especialmente interesante para marcas como BMW, Audi, Mercedes-Benz, Porsche y Volkswagen, por su mantenimiento, equipamiento y procedencia. No obstante, trabajamos con cualquier marca bajo demanda.",
  },
  {
    question: "¿Existe riesgo de estafa al importar un coche?",
    answer:
      "El riesgo existe cuando se compra sin verificar el vehículo o sin intermediación profesional. Por eso es clave contar con una empresa especializada que revise, negocie y gestione la compra de forma segura.",
  },
  {
    question: "¿Puedo encargar un coche concreto que no esté en stock?",
    answer:
      "Sí. Ofrecemos un servicio de importación a la carta, donde buscamos el vehículo exacto según tus requisitos de marca, modelo, motor, presupuesto y equipamiento.",
  },
  {
    question: "¿Ofrecéis garantía en los vehículos importados?",
    answer:
      "Dependiendo del vehículo y del proveedor, los coches pueden contar con garantía legal o comercial. Te informamos de todas las opciones disponibles antes de formalizar la compra.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-metallic-950 text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
          Preguntas Frecuentes sobre la Importación de Coches desde Alemania
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center py-5 text-left hover:text-gold-400 transition-colors"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
