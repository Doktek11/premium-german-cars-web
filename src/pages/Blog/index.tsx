import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";
import { SEO } from "../../components/SEO";
import { Calendar, ArrowRight } from "lucide-react";
import { blogIndexJsonLd } from "../../data/structuralPageSchemas.mjs";

const blogPosts = [
  // ✅ NUEVO ARTÍCULO AÑADIDO (coincide con la ruta SEO-friendly en App.tsx)
  {
    id: 13,
    title: "Diésel o gasolina en 2026: qué motor conviene e impuesto",
    excerpt:
      "Compara diésel, gasolina, MHEV y PHEV según uso real, CO₂, impuesto de matriculación y coste final al importar desde Alemania.",
    date: "4 Jul, 2026",
    slug: "que-motor-elegir-importar-alemania-2026",
    category: "Guía de Compra",
  },
  {
    id: 12,
    title:
      "Certificado de Conformidad (COC): Guía para una matriculación sin errores",
    excerpt:
      "Evite la homologación individual y retrasos en la ITV. Todo lo que necesita saber sobre el COC al importar su vehículo desde Alemania.",
    date: "29 Ene, 2026",
    slug: "certificado-conformidad-coc-itv-matriculacion",
    category: "Normativa",
  },
  {
    id: 11,
    title:
      "Importación de Alemania: ¿Por qué es la mejor forma de comprar tu coche premium en 2026?",
    excerpt:
      "Analizamos el mercado actual: por qué la demanda de importación desde Alemania ha crecido un 900% y cómo acceder a unidades de reestreno con garantía oficial en España.",
    date: "27 Ene, 2026",
    slug: "importar-coche-aleman-guia-importacion-alemania",
    category: "Estrategia",
  },
  {
    id: 10,
    title: "Protocolo de Auditoría 2026: Transparencia Total en cada Importación",
    excerpt:
      "Conozca nuestro riguroso proceso de verificación técnica. Desde la revisión de historial en BMW hasta el control de calidad en destino. Seguridad absoluta para su inversión.",
    date: "21 Ene, 2026",
    slug: "revision-coche-alemania-protocolo-auditoria",
    category: "Seguridad",
  },
  {
    id: 9,
    title: "¿Cuánto cuesta realmente importar un coche de Alemania en 2026?",
    excerpt:
      "Descubre los costes reales, impuestos y el impacto del ITP del 16% en Cataluña. Evite errores administrativos y optimice su inversión.",
    date: "19 Ene, 2026",
    slug: "cuanto-cuesta-importar-coche-alemania-2026",
    category: "Guía Fiscal",
  },
  {
    id: 8,
    title: "Guía definitiva: Cómo calcular el impuesto de matriculación BOE 2025",
    excerpt:
      "Utilice nuestra calculadora con IA para obtener valores BOE exactos y calcular la depreciación real mes a mes. Sin errores, sin sorpresas fiscales.",
    date: "13 Ene, 2026",
    slug: "guia-calculo-impuesto-matriculacion-boe-2025",
    category: "Herramientas",
  },
  {
    id: 7,
    title:
      "BMW y Alpina: El nacimiento de una nueva era en el lujo automotriz alemán",
    excerpt:
      "Analizamos la integración de Alpina en BMW Group. ¿Qué significa para los coleccionistas y por qué las unidades artesanalas son la inversión clave de 2026?",
    date: "09 Ene, 2026",
    slug: "bmw-alpina-nueva-era-lujo-aleman",
    category: "Actualidad",
  },
  {
    id: 6,
    title:
      "Los 5 Riesgos Más Comunes al Importar un Coche de Alemania (y Cómo Evitarlos)",
    excerpt:
      "Evite estafas, problemas de IVA y vicios ocultos. Conozca nuestro protocolo de verificación de tolerancia cero para una importación segura en 2026.",
    date: "07 Ene, 2026",
    slug: "5-riesgos-importar-coche-alemania",
    category: "Seguridad",
  },
  {
    id: 5,
    title: "Guía 2026: Importar un Coche de Alemania sin Sorpresas Fiscales",
    excerpt:
      "Protocolo completo 2026. Entienda la fiscalidad de las emisiones de CO₂, la documentación necesaria y cómo evitar los errores más comunes en la logística profesional.",
    date: "05 Ene, 2026",
    slug: "como-importar-coche-alemania",
    category: "Protocolo PGC",
  },
  {
    id: 4,
    title: "Los 5 modelos más inteligentes para importar de Alemania en 2026",
    excerpt:
      "Calidad real, historial transparente y valor de reventa. Descubre por qué la trazabilidad certificada es la clave para una importación segura.",
    date: "02 Ene, 2026",
    slug: "mejores-modelos-importar-alemania-2026",
    category: "Guías",
  },
  {
    id: 1,
    title: "¿Corazón BMW en un Mercedes? El posible pacto de motores para 2027",
    excerpt:
      "Analizamos los rumores sobre la colaboración entre Mercedes-Benz y BMW para el uso de motores de 4 cilindros.",
    date: "17 Dic, 2025",
    slug: "motores-bmw-en-mercedes-2027",
    category: "Actualidad",
  },
  {
    id: 2,
    title: "BMW de Reestreno: La guía definitiva para 2026",
    excerpt:
      "Todo lo que necesitas saber para importar tu próximo BMW desde Alemania con las mejores garantías.",
    date: "15 Dic, 2025",
    slug: "bmw-reestreno-alemania-2026",
    category: "Guías",
  },
  {
    id: 3,
    title: "Coches de segunda mano en Reus y Tarragona",
    excerpt:
      "¿Vale la pena comprar local o importar? Comparamos el mercado de ocasión frente a la importación directa.",
    date: "10 Dic, 2025",
    slug: "coche-segunda-mano-reus-tarragona",
    category: "Mercado",
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Blog Premium German Cars | Importación de coches desde Alemania"
        description="Actualidad, protocolos de importación y análisis estratégico del mercado automotriz alemán para clientes de Premium German Cars."
        canonical="https://www.premiumgermancars.com/blog"
        jsonLd={blogIndexJsonLd}
      />
      <Navbar />

      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <header className="max-w-3xl mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Blog <span className="text-gold-400">Premium</span>
            </h1>
            <p className="text-gray-400 text-lg italic leading-relaxed">
              Actualidad, protocolos de importación y análisis estratégico del
              mercado automotriz alemán para clientes de{" "}
              <span className="text-white font-semibold italic">
                Premium German Cars
              </span>
              .
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col group hover:border-gold-400/30 transition-all duration-500 shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#111] to-black flex items-center justify-center">
                  <img
                    src="/logoPGC.svg"
                    alt={`Artículo sobre ${post.title}`}
                    loading="lazy"
                    className="w-32 h-auto opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 brightness-0 invert"
                  />

                  <div className="absolute top-6 left-6">
                    <span className="bg-gold-400 text-black text-[9px] font-black px-4 py-1.5 uppercase tracking-[0.2em] shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-grow text-white">
                  <div className="flex items-center gap-2 text-gray-500 text-[10px] mb-6 uppercase tracking-[0.2em] font-bold">
                    <Calendar size={12} className="text-gold-400" />
                    {post.date}
                  </div>

                  <h2 className="text-2xl font-serif font-bold mb-4 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2 leading-[1.2]">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 mb-8 flex-grow line-clamp-3 text-sm leading-relaxed italic text-justify">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-white font-bold uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 group/link mt-auto border-t border-white/5 pt-6 group-hover:text-gold-400 transition-colors"
                  >
                    Leer artículo completo
                    <ArrowRight
                      size={14}
                      className="group-hover/link:translate-x-2 transition-transform duration-300 text-gold-400"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
