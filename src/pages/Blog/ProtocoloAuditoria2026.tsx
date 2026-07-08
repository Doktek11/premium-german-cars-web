import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import {
  AlertOctagon,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { getBlogArticleJsonLd } from "../../data/blogArticleSchemas.mjs";

const whatsappReviewUrl =
  "https://wa.me/34603743608?text=Hola,%20he%20visto%20un%20coche%20en%20Alemania%20y%20me%20gustar%C3%ADa%20que%20me%20ayudarais%20a%20revisar%20si%20merece%20la%20pena%20antes%20de%20pagar%20una%20se%C3%B1al.";

const warningSignals = [
  "El coche está anunciado a un precio más bajo de lo habitual.",
  "El vendedor pide una señal rápida.",
  "El historial de mantenimiento no está claro.",
  "El vehículo ha tenido varios propietarios.",
  "Faltan datos técnicos o documentación.",
  "Las emisiones de CO₂ no aparecen con claridad.",
  "El coche procede de renting, flota o empresa.",
  "No sabes cuánto costará matricularlo en España.",
  "Quieres comprar sin viajar a Alemania.",
];

const historyChecks = [
  "Intervalos de mantenimiento razonables.",
  "Kilometraje progresivo.",
  "Revisiones en servicio oficial o talleres reconocidos.",
  "Posibles lagunas en el historial.",
  "Cambios de propietario.",
  "Uso anterior como renting, empresa o flota.",
  "Reparaciones repetidas.",
  "Mantenimiento pendiente o incompleto.",
];

const paintAlerts = [
  "Diferencias anómalas de espesor.",
  "Reparaciones mal ejecutadas.",
  "Uso de masilla en zonas sensibles.",
  "Soldaduras no originales.",
  "Piezas desalineadas.",
  "Indicios de accidente estructural.",
  "Reparaciones que no encajan con lo declarado.",
];

const documentChecks = [
  "Documentación alemana del vehículo.",
  "Factura o contrato de compra.",
  "Datos técnicos.",
  "Emisiones de CO₂.",
  "Certificado de conformidad COC si aplica.",
  "Viabilidad para pasar ITV en España.",
  "Posibles diferencias entre ficha, anuncio y documentación.",
  "Datos necesarios para calcular el impuesto de matriculación.",
];

const costItems = [
  "Precio de compra.",
  "Transporte hasta España.",
  "ITV.",
  "Tasas.",
  "Gestoría.",
  "Posible impuesto de matriculación.",
  "Documentación.",
  "Matriculación definitiva.",
  "Margen de seguridad para imprevistos.",
];

const mobileChecks = [
  "Si el vendedor está correctamente identificado.",
  "Si las fotos son coherentes.",
  "Si la descripción coincide con el equipamiento real.",
  "Si el precio tiene sentido.",
  "Si el kilometraje encaja con el historial.",
  "Si el coche tiene documentación completa.",
  "Si se puede emitir factura correctamente.",
  "Si hay información suficiente sobre CO₂.",
  "Si el vendedor permite comprobaciones previas.",
  "Si la forma de pago es segura.",
];

const decisionSummary = [
  "Si el coche encaja con su objetivo.",
  "Si el vendedor es fiable.",
  "Si el historial es coherente.",
  "Si la documentación parece correcta.",
  "Si el coste total tiene sentido.",
  "Qué riesgos existen.",
  "Qué habría que confirmar antes de pagar.",
  "Si conviene seguir, negociar o descartar.",
];

const processSteps = [
  {
    title: "1. Recibimos la unidad o definimos el coche objetivo",
    text: "Puede ser un coche que ya has visto en Mobile.de, AutoScout24 o en un concesionario alemán. También podemos partir de una búsqueda personalizada si todavía no tienes una unidad concreta.",
  },
  {
    title: "2. Analizamos anuncio, vendedor y precio",
    text: "Revisamos si el coche tiene sentido en relación con el mercado, el vendedor, el kilometraje, el equipamiento y la información disponible.",
  },
  {
    title: "3. Revisamos historial y documentación",
    text: "Comprobamos si la unidad ofrece suficientes garantías documentales antes de avanzar.",
  },
  {
    title: "4. Estimamos coste real de importación",
    text: "Valoramos transporte, ITV, tasas, matriculación, impuesto si aplica y posibles costes asociados.",
  },
  {
    title: "5. Decidimos si avanzar o descartar",
    text: "Si la operación no es clara, se descarta. Si tiene sentido, se continúa con más comprobaciones, negociación, compra, transporte y matriculación.",
  },
];

const rejectReasons = [
  "Vendedor poco transparente.",
  "Documentación incompleta.",
  "Historial incoherente.",
  "Precio demasiado bajo sin explicación.",
  "Señales de reparación estructural.",
  "Emisiones que disparan el coste de matriculación.",
  "Falta de información técnica.",
  "Imposibilidad de verificar mantenimiento.",
  "Presión para pagar rápido.",
  "Dudas sobre IVA, factura o contrato.",
];

const faqItems = [
  {
    question: "¿Puede Premium German Cars revisar un coche anunciado en Mobile.de?",
    answer:
      "Sí. Podemos ayudarte a valorar una unidad concreta antes de pagar una señal, revisando anuncio, vendedor, historial disponible, documentación, precio, CO₂ y viabilidad de importación a España.",
  },
  {
    question: "¿Qué datos necesito enviar para revisar una unidad?",
    answer:
      "Lo ideal es enviar el enlace del anuncio, modelo, año, kilometraje, precio, vendedor y cualquier documentación o información adicional que tengas. Con eso se puede hacer una primera valoración.",
  },
  {
    question: "¿La revisión incluye el cálculo del coste de importación?",
    answer:
      "La revisión puede incluir una estimación del coste total, teniendo en cuenta transporte, ITV, tasas, matriculación e impuesto de matriculación si aplica. Para una referencia inicial, también puedes usar la calculadora de impuesto de matriculación.",
  },
  {
    question: "¿Cómo sé si un vendedor alemán es fiable?",
    answer:
      "Hay que valorar si el vendedor está correctamente identificado, si facilita documentación, si responde con claridad, si el precio es coherente y si permite verificar la unidad antes de reservar.",
  },
  {
    question: "¿Qué pasa si la unidad no merece la pena?",
    answer:
      "En ese caso, la recomendación es no comprar. Descartar una unidad dudosa forma parte del proceso. El objetivo no es cerrar cualquier operación, sino evitar errores caros.",
  },
  {
    question: "¿Puedo comprar un coche en Alemania sin viajar?",
    answer:
      "Sí, pero conviene hacerlo con una revisión previa seria y una gestión documental correcta. Comprar sin viajar puede ser viable, siempre que el vendedor, la documentación y el proceso estén bien controlados.",
  },
  {
    question: "¿Qué riesgos hay al comprar un coche en Alemania sin asesoramiento?",
    answer:
      "Los principales riesgos son kilometraje incoherente, historial incompleto, documentación insuficiente, daños no declarados, problemas de IVA, cálculo incorrecto del impuesto y costes finales superiores a lo previsto.",
  },
  {
    question: "¿Premium German Cars solo trabaja en Tarragona?",
    answer:
      "No. Premium German Cars está en Cambrils, Tarragona, pero ofrece servicio de importación de coches desde Alemania para clientes de toda España.",
  },
];

const articleJsonLd = getBlogArticleJsonLd(
  "/blog/revision-coche-alemania-protocolo-auditoria"
);

const CheckList = ({ items }: { items: string[] }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
    {items.map((item) => (
      <li
        key={item}
        className="flex items-start gap-3 border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300"
      >
        <CheckCircle className="mt-0.5 shrink-0 text-gold-400" size={18} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ProtocoloAuditoria2026 = () => {
  return (
    <>
      <SEO
        title="Revisar coche en Alemania antes de comprar | Evita riesgos"
        description="¿Has visto un coche en Mobile.de? Revisamos vendedor, historial, CO₂, documentos y coste real antes de pagar una señal."
        canonical="https://www.premiumgermancars.com/blog/revision-coche-alemania-protocolo-auditoria"
        article={true}
        jsonLd={articleJsonLd}
      />
      <Navbar />

      <main className="bg-black text-white pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <header className="mb-12">
            <span className="text-gold-400 font-bold tracking-widest text-xs uppercase italic">
              Revisión en origen
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold mt-4 mb-6 leading-tight">
              Revisar un coche en Alemania antes de comprarlo
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm italic">
              <span>Premium German Cars</span>
              <span className="w-1 h-1 bg-gold-400 rounded-full"></span>
              <span>Actualizado: 5 Jun, 2026</span>
            </div>
          </header>

          <div className="h-64 md:h-80 w-full bg-gradient-to-br from-gray-900 to-black border border-white/5 flex items-center justify-center mb-16 relative overflow-hidden">
            <img
              src="/logoPGC.svg"
              className="w-48 opacity-10 brightness-0 invert"
              alt="Premium German Cars"
            />
            <div className="absolute bottom-4 right-6 text-gold-400/30 font-serif italic text-4xl md:text-6xl select-none uppercase tracking-tighter">
              PRE-CHECK
            </div>
          </div>

          <article className="prose prose-invert prose-gold max-w-none text-gray-300 leading-relaxed">
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light italic border-l-4 border-gold-400 pl-6 text-justify">
              Comprar un coche en Alemania puede ser una gran oportunidad,
              especialmente si buscas un vehículo premium con buena
              configuración, historial claro y mejor oferta que en el mercado
              español. Pero también puede convertirse en una operación arriesgada
              si tomas la decisión solo por las fotos, el precio o la descripción
              del anuncio.
            </p>

            <p>
              El momento crítico no es cuando el coche llega a España. El
              momento crítico es antes de pagar una señal.
            </p>

            <p>
              En Premium German Cars ayudamos a clientes que han visto un coche
              en Alemania, en Mobile.de, AutoScout24, concesionarios oficiales o
              compraventas especializados, y necesitan saber si esa unidad
              realmente merece la pena antes de avanzar.
            </p>

            <p>
              Nuestro trabajo no consiste en decirte que todos los coches
              alemanes son buenos. Consiste en revisar cada operación con
              criterio: anuncio, vendedor, historial, kilometraje,
              documentación, CO₂, coste estimado de importación, ITV,
              matriculación y posibles riesgos.
            </p>

            <p>
              Porque en la importación de vehículos premium, no compras solo un
              coche. Compras una decisión bien tomada.
            </p>

            <div className="my-10 border border-gold-400/30 bg-gold-400/10 p-6 md:p-8">
              <p className="m-0 text-lg font-serif italic text-white">
                Antes de pagar una reserva en Alemania, conviene saber tres
                cosas: si el coche es fiable, si el vendedor es serio y si el
                coste total puesto en España tiene sentido.
              </p>
            </div>

            <div className="not-prose my-10 border border-white/10 bg-gray-900/50 p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <p className="m-0 text-base md:text-lg font-serif italic leading-snug text-white">
                  ¿Tienes ya un coche visto en Alemania? Envíanos el enlace de
                  Mobile.de o AutoScout24 y revisamos si merece la pena antes de
                  que pagues una señal.
                </p>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                  <a
                    href={whatsappReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 px-5 py-3 text-sm font-bold uppercase tracking-tighter text-black transition-all duration-300 hover:bg-white"
                  >
                    Revisar unidad por WhatsApp <MessageCircle size={18} />
                  </a>
                  <a
                    href="/calculadora-impuesto-matriculacion"
                    className="inline-flex items-center justify-center gap-3 border border-white/20 px-5 py-3 text-sm font-bold uppercase tracking-tighter text-white transition-all duration-300 hover:bg-white/10"
                  >
                    Calcular impuesto <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>

            <h2>¿Cuándo conviene revisar un coche en Alemania antes de comprar?</h2>
            <p>
              Conviene revisar una unidad antes de comprar cuando ya has
              encontrado un coche que encaja en precio, modelo, kilometraje o
              equipamiento, pero no tienes certeza de que la operación sea
              segura.
            </p>
            <p>
              Esto ocurre con frecuencia en modelos como BMW Serie 3 Touring,
              BMW X3, Audi Q5, Mercedes-Benz GLC, Porsche Macan, Volkswagen Golf
              GTI o berlinas premium de reestreno. Son coches atractivos, con
              mucha demanda y donde una mala decisión puede costar miles de
              euros.
            </p>
            <CheckList items={warningSignals} />
            <p>
              En estos casos, el error habitual es fijarse solo en el precio del
              anuncio. Pero el precio del anuncio no es el coste real del coche
              puesto en España.
            </p>

            <h2>Qué revisamos antes de recomendar una unidad alemana</h2>
            <p>
              Una revisión seria no empieza conectando una máquina de diagnosis.
              Empieza mucho antes: analizando si la operación tiene coherencia.
            </p>
            <p>
              En Premium German Cars revisamos la unidad desde varios ángulos.
              No buscamos justificar una compra. Buscamos detectar motivos para
              descartarla antes de que el cliente asuma un riesgo innecesario.
            </p>

            <h3>Anuncio, precio y coherencia de mercado</h3>
            <p>
              El primer paso es analizar el anuncio. Revisamos el precio, la
              descripción, las fotografías, el equipamiento declarado, el
              kilometraje, el año, la motorización, las emisiones y el tipo de
              vendedor.
            </p>
            <p>
              Un coche puede parecer una oportunidad, pero si el precio está muy
              por debajo de mercado, hay que entender por qué.
            </p>
            <p>
              No todos los descuentos son una buena noticia. A veces responden a
              un historial incompleto, daños previos, falta de documentación,
              configuración poco demandada, impuestos elevados o una futura
              matriculación más cara de lo esperado.
            </p>

            <h3>Vendedor: concesionario, compraventa o particular</h3>
            <p>
              No es lo mismo comprar a un concesionario oficial, a un compraventa
              independiente o a un particular.
            </p>
            <p>
              Cada caso tiene implicaciones diferentes en factura, garantías,
              documentación, forma de pago, IVA, reserva y seguridad de la
              operación.
            </p>
            <p>
              Antes de recomendar una unidad, revisamos quién vende el coche,
              cómo presenta la operación y qué nivel de confianza ofrece. También
              valoramos si el vendedor facilita información técnica, historial,
              documentación y respuestas claras.
            </p>

            <h3>Historial, kilometraje y mantenimiento</h3>
            <p>
              Uno de los grandes riesgos al comprar un coche en Alemania es
              confiar demasiado en un libro de mantenimiento, una descripción
              genérica o una frase del anuncio.
            </p>
            <p>Por eso revisamos la coherencia del historial disponible.</p>
            <CheckList items={historyChecks} />
            <p>
              En coches premium, el historial importa tanto como el equipamiento.
              Un BMW X3, un Audi Q5 o un Porsche Macan pueden parecer impecables
              en fotos, pero si el mantenimiento no está bien documentado, el
              riesgo aumenta.
            </p>

            <h2>Revisión física: pintura, carrocería y posibles accidentes</h2>
            <p>
              Las fotos de un anuncio no siempre cuentan la verdad completa.
            </p>
            <p>
              Un coche puede estar limpio, bien iluminado y parecer perfecto,
              pero haber tenido reparaciones importantes. Por eso, cuando la
              operación lo requiere, se realiza una revisión física con atención
              a carrocería, pintura, estructura y señales de reparación.
            </p>
            <p>
              Uno de los controles más útiles es la medición de espesores de
              pintura en diferentes zonas de la carrocería. No se trata de
              descartar automáticamente un coche por una pieza repintada. Una
              puerta o un paragolpes pueden haber sido reparados por un daño
              estético menor.
            </p>
            <p>Lo importante es detectar señales más serias.</p>

            <div className="my-8 border border-red-500/30 bg-red-950/10 p-6 md:p-8">
              <h3 className="mt-0 flex items-center gap-3 text-white">
                <AlertOctagon className="text-red-500" size={24} />
                Criterios de alerta
              </h3>
              <CheckList items={paintAlerts} />
            </div>

            <p>
              Si aparecen señales que comprometen la seguridad, el valor futuro
              o la trazabilidad del coche, la recomendación es clara: no avanzar.
            </p>
            <p>A veces, la mejor operación es la que se descarta a tiempo.</p>

            <h2>Documentación alemana, COC, ITV y matriculación en España</h2>
            <p>
              Una unidad puede estar en buen estado y aun así generar problemas
              al matricularla en España si la documentación no está clara.
            </p>
            <p>
              Antes de comprar, conviene revisar que la documentación alemana
              esté disponible y que los datos técnicos necesarios para ITV y
              matriculación sean coherentes.
            </p>
            <CheckList items={documentChecks} />
            <p>
              Este punto es clave porque muchos errores aparecen tarde. El
              comprador paga la señal, organiza la compra y solo después descubre
              que falta documentación, que las emisiones no estaban claras o que
              el coste fiscal no era el esperado.
            </p>
            <p>
              Por eso revisamos también el impacto de{" "}
              <a href="/blog/certificado-conformidad-coc-itv-matriculacion">
                COC, ITV y matriculación
              </a>{" "}
              antes de recomendar avanzar.
            </p>

            <h2>CO₂, impuesto de matriculación y coste real de importación</h2>
            <p>
              Uno de los errores más habituales al comprar un coche en Alemania
              es calcular la operación solo con el precio del anuncio.
            </p>
            <p>El coste real de importar un coche incluye más elementos.</p>
            <CheckList items={costItems} />
            <p>
              El CO₂ puede cambiar mucho el presupuesto final. Dos coches con
              precio parecido pueden tener costes de matriculación diferentes si
              sus emisiones no son iguales.
            </p>
            <p>
              Por eso, antes de reservar una unidad, es importante estimar el
              coste total puesto en España. También puedes usar la herramienta
              para{" "}
              <a href="/calculadora-impuesto-matriculacion">
                calcular impuesto de matriculación
              </a>{" "}
              como referencia inicial.
            </p>
            <p>
              No se trata de prometer que importar siempre sale más barato. Se
              trata de saber si esa unidad concreta, con ese precio, ese motor,
              ese CO₂ y esa documentación, realmente merece la pena.
            </p>

            <div className="my-10 border border-white/10 bg-gray-900/40 p-6 md:p-8 text-center">
              <p className="mb-6 text-lg font-serif italic text-white">
                Antes de reservar, comprueba cómo puede afectar el CO₂ al coste
                fiscal de la operación.
              </p>
              <a
                href="/calculadora-impuesto-matriculacion"
                className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-8 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300 no-underline"
              >
                Calcular impuesto de matriculación <ArrowRight size={18} />
              </a>
            </div>

            <h2>Comprar en Mobile.de desde España: qué revisar antes de pagar una señal</h2>
            <p>
              Mobile.de es una de las plataformas más utilizadas para encontrar
              coches en Alemania, pero no todos los anuncios tienen el mismo
              nivel de fiabilidad.
            </p>
            <p>Antes de pagar una reserva, conviene revisar:</p>
            <CheckList items={mobileChecks} />
            <p>
              El objetivo no es desconfiar de todo. El objetivo es no comprar
              con los ojos cerrados.
            </p>
            <p>
              Una operación buena debe poder explicarse con claridad. Si el
              vendedor presiona, evita preguntas o no facilita información
              básica, lo prudente es detener el proceso.
            </p>
            <p>
              Esta revisión conecta directamente con los{" "}
              <a href="/blog/5-riesgos-importar-coche-alemania">
                riesgos de comprar un coche en Alemania
              </a>{" "}
              sin asesoramiento previo.
            </p>

            <h2>Qué recibe el cliente antes de decidir</h2>
            <p>
              La revisión previa debe servir para tomar una decisión, no solo
              para acumular información.
            </p>
            <p>
              Antes de recomendar avanzar con una unidad, el cliente debe tener
              una visión clara de:
            </p>
            <CheckList items={decisionSummary} />
            <p>
              En Premium German Cars no recomendamos coches solo porque sean
              atractivos. Recomendamos operaciones completas cuando tienen
              sentido para el cliente.
            </p>
            <p>
              Si una unidad no encaja, lo decimos. Aunque tenga buen precio.
              Aunque sea el modelo deseado. Aunque parezca una oportunidad.
            </p>
            <p>La tranquilidad del cliente empieza antes de comprar.</p>

            <h2>Cómo trabaja Premium German Cars la revisión de una unidad en Alemania</h2>
            <p>
              Nuestro enfoque combina criterio comercial, análisis técnico y
              experiencia en importación.
            </p>
            <p>
              No trabajamos con una lógica de volumen. No buscamos cerrar
              cualquier operación. Nuestro objetivo es ayudarte a comprar bien.
            </p>

            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {processSteps.map((step) => (
                <div
                  key={step.title}
                  className="border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="mt-0 text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mb-0 text-sm text-gray-400">{step.text}</p>
                </div>
              ))}
            </div>

            <h2>Cuándo no recomendamos comprar</h2>
            <p>
              Hay situaciones en las que nuestra recomendación será no comprar.
            </p>
            <CheckList items={rejectReasons} />
            <p>
              En importación premium, saber decir "no" es parte del trabajo.
            </p>
            <p>
              Un coche descartado a tiempo puede evitar pérdidas, retrasos y
              problemas legales o fiscales posteriores.
            </p>

            <h2>Revisión, transporte y entrega llave en mano</h2>
            <p>
              Aunque la revisión previa es una fase clave, Premium German Cars
              puede gestionar también el proceso completo de importación.
            </p>
            <p>
              Esto incluye búsqueda, validación de la unidad, coordinación de
              compra, transporte, ITV, trámites de matriculación y entrega final
              en España.
            </p>
            <p>
              Nuestra sede está en Cambrils, Tarragona, pero trabajamos con
              clientes de toda España. Podemos ayudar a compradores de Cataluña,
              Madrid, Valencia, Bilbao, Marbella, Zaragoza, Baleares u otras
              zonas que buscan importar un coche premium desde Alemania con una
              gestión profesional.
            </p>
            <p>
              El objetivo es que el cliente no tenga que improvisar con
              trámites, documentos, llamadas, transporte o matriculación. Primero
              se revisa. Después se decide. Y solo si la operación tiene sentido,
              se avanza con el{" "}
              <a href="/importacion-coches-alemania">
                servicio de importación desde Alemania
              </a>
              .
            </p>

            <h2>Preguntas frecuentes sobre revisar un coche en Alemania antes de comprar</h2>
            <div className="not-prose my-10 space-y-4">
              {faqItems.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {faq.question}
                  </h3>
                  <p className="m-0 text-sm leading-relaxed text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <section className="mt-20 border-t border-gold-400/20 pt-16">
              <h2>Revisar antes de comprar es más barato que corregir después</h2>
              <p>Importar un coche de Alemania no debería ser una apuesta.</p>
              <p>
                La diferencia entre una buena compra y una mala operación no
                suele estar en encontrar el anuncio más barato. Está en saber
                interpretar lo que no se ve a simple vista: historial, vendedor,
                documentación, costes, CO₂, ITV, estado real y valor futuro.
              </p>
              <p>
                En Premium German Cars revisamos cada unidad con una idea clara:
                proteger la decisión del cliente antes de que el dinero esté
                comprometido.
              </p>
              <p>
                Si has visto un coche en Alemania y no sabes si avanzar, podemos
                ayudarte a valorarlo antes de pagar una señal. También puedes
                revisar{" "}
                <a href="/blog/cuanto-cuesta-importar-coche-alemania-2026">
                  cuánto cuesta importar un coche de Alemania
                </a>{" "}
                para entender mejor el presupuesto real.
              </p>
            </section>

            <div className="not-prose mt-12 p-1 bg-gradient-to-r from-gold-600 to-gold-400">
              <div className="bg-black p-8 md:p-12 text-center">
                <p className="text-white mb-8 max-w-2xl mx-auto text-lg md:text-xl font-serif italic leading-tight">
                  ¿Has visto una unidad en Alemania? Revisamos anuncio, vendedor,
                  historial, documentación y coste real antes de que pagues una
                  señal.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a
                    href={whatsappReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 text-black px-8 py-4 font-bold uppercase tracking-tighter hover:bg-white transition-all duration-300"
                  >
                    Revisar una unidad que he visto en Mobile.de{" "}
                    <MessageCircle size={18} />
                  </a>
                  <a
                    href="/calculadora-impuesto-matriculacion"
                    className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-tighter hover:bg-white/10 transition-all duration-300"
                  >
                    Calcular impuesto de matriculación <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProtocoloAuditoria2026;
