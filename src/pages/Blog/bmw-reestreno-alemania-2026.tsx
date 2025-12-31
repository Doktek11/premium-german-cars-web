import { useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { WhatsAppButton } from "../../components/WhatsAppButton";

export default function BmwReestreno2026() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Navbar />
      <main className="bg-metallic-950 text-white pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-12">
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">Guías de Importación</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">BMW de Reestreno: La guía definitiva para 2026</h1>
          </header>
          <div className="text-gray-300 text-lg">
            <p>Descubre cómo conseguir tu BMW semi-nuevo directamente desde Alemania con las mejores condiciones de Premium German Cars.</p>
          </div>
        </article>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
