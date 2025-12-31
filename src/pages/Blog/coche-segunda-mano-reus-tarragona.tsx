import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";

export default function CochesReusTarragona() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Navbar />
      <main className="bg-metallic-950 text-white pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-12">
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">Mercado Local</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Coches de segunda mano en Reus y Tarragona</h1>
          </header>
          <div className="text-gray-300 text-lg">
            <p>Analizamos las ventajas de la importación frente al mercado local de ocasión en la provincia de Tarragona y alrededores.</p>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
