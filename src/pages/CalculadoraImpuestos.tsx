import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Gauge, Calendar, Euro, AlertTriangle, ArrowRight, Info, CheckCircle2, Car } from 'lucide-react';

export const CalculadoraImpuestos = () => {
  const [precio, setPrecio] = useState<number>(45000);
  const [emisiones, setEmisiones] = useState<number>(155);
  const [meses, setMeses] = useState<number>(36);
  const [resultado, setResultado] = useState({ matriculacion: 0, tramo: 0 });

  // Datos para la tabla FAQ
  const ejemplosImportacion = [
    { modelo: "Audi A3 Sportback 35 TFSI", valor: "21.105€", co2: "128g", impuesto: "1.002€" },
    { modelo: "VW Golf GTI (Mk8)", valor: "28.140€", co2: "163g", impuesto: "2.743€" },
    { modelo: "BMW 320d (G20)", valor: "30.820€", co2: "127g", impuesto: "1.464€" },
    { modelo: "Mercedes-Benz A 200", valor: "22.780€", co2: "134g", impuesto: "1.082€" },
    { modelo: "Audi Q5 40 TDI Quattro", valor: "37.520€", co2: "166g", impuesto: "3.658€" },
    { modelo: "VW Tiguan 2.0 TDI", valor: "25.460€", co2: "142g", impuesto: "1.209€" },
    { modelo: "BMW M4 Competition", valor: "77.050€", co2: "228g", impuesto: "11.365€" },
    { modelo: "Mercedes CLA 220d", valor: "28.810€", co2: "131g", impuesto: "1.368€" },
    { modelo: "Cupra Formentor VZ", valor: "30.820€", co2: "175g", impuesto: "3.005€" },
    { modelo: "Audi A4 Avant 40 TFSI", valor: "32.160€", co2: "148g", impuesto: "1.527€" },
  ];

  useEffect(() => {
    // 1. Determinar tramo
    let tramo = 0;
    if (emisiones <= 120) tramo = 0;
    else if (emisiones <= 159) tramo = 4.75;
    else if (emisiones <= 199) tramo = 9.75;
    else tramo = 14.75;

    // 2. Tabla de Depreciación Oficial BOE
    let coef = 1;
    if (meses <= 12) coef = 1;
    else if (meses <= 24) coef = 0.84;
    else if (meses <= 36) coef = 0.67;
    else if (meses <= 48) coef = 0.56;
    else if (meses <= 60) coef = 0.47;
    else if (meses <= 72) coef = 0.39;
    else coef = 0.30;

    const baseImponible = precio * coef;
    const impuesto = baseImponible * (tramo / 100);

    setResultado({
      matriculacion: impuesto,
      tramo: tramo
    });
  }, [precio, emisiones, meses]);

  const getReduccionText = () => {
    if (resultado.tramo === 0 || precio === 0) return "0%";
    const baseTeoricaSinDepreciacion = precio * (resultado.tramo / 100);
    const red = ((1 - (resultado.matriculacion / baseTeoricaSinDepreciacion)) * 100).toFixed(0);
    return `-${red}%`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO 
        title="Calculadora Impuesto Matriculación 2026 | Premium German Cars"
        description="Calcula gratis el impuesto de matriculación para importar tu coche de Alemania. Datos oficiales BOE 2026 actualizados por nuestro equipo experto."
      />
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 uppercase tracking-tighter">
              Calculadora <span className="text-gold-400 italic">Oficial</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Herramienta de precisión basada en los tramos de CO2 2026 y las tablas de depreciación del BOE.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            {/* PANEL DE CONTROL */}
            <div className="lg:col-span-7 space-y-12 bg-white/[0.03] p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
              
              {/* PRECIO / VALOR BOE */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 mb-1 tracking-widest">
                      <Euro size={14}/> Valor del Vehículo
                    </label>
                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                      (Valor actual en España / Tablas BOE)
                    </span>
                  </div>
                  <span className="font-mono text-2xl text-white font-bold">{precio.toLocaleString()} €</span>
                </div>
                
                <input 
                  type="range" min="5000" max="150000" step="1000"
                  value={precio} onChange={(e) => setPrecio(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />

                <div className="mt-4 p-4 bg-gold-400/5 border border-gold-400/10 rounded-xl flex gap-3 items-center">
                  <Info size={18} className="text-gold-400 shrink-0" />
                  <p className="text-[11px] text-gray-400 leading-snug italic">
                    <strong className="text-white not-italic">Nota de experto:</strong> No utilices el precio de compra en Alemania. Debes indicar el valor oficial en España (Valor Venal) para un cálculo exacto.
                  </p>
                </div>
              </div>

              {/* EMISIONES */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 tracking-widest">
                    <Gauge size={14}/> Emisiones CO2: {emisiones} g/km
                  </label>
                </div>
                <input 
                  type="range" min="0" max="350" step="1"
                  value={emisiones} onChange={(e) => setEmisiones(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>

              {/* ANTIGÜEDAD */}
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-xs font-bold uppercase text-gold-400 flex items-center gap-2 tracking-widest">
                    <Calendar size={14}/> Antigüedad: {meses} meses
                  </label>
                </div>
                <input 
                  type="range" min="1" max="120" step="1"
                  value={meses} onChange={(e) => setMeses(Number(e.target.value))}
                  className="w-full h-1.5 bg-black rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>
            </div>

            {/* BLOQUE DE RESULTADOS */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gold-500 p-[1px] rounded-3xl shadow-2xl shadow-gold-500/10">
                <div className="bg-black rounded-[calc(1.5rem-1px)] p-8">
                  <span className="text-xs text-gray-500 uppercase block mb-2 tracking-[0.2em] text-center">Impuesto Estimado</span>
                  <div className="text-6xl font-serif font-bold text-white mb-8 text-center tracking-tighter">
                    {Math.round(resultado.matriculacion).toLocaleString()}€
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Tramo Emisiones:</span>
                      <span className="text-gold-400 font-mono font-bold text-lg">{resultado.tramo}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Reducción Aplicada:</span>
                      <span className="text-white font-mono">{getReduccionText()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => window.open(`https://wa.me/34603743608?text=Hola! He usado la calculadora para un coche con ${emisiones}g/km y valor de ${precio}€. ¿Me confirmáis el valor BOE exacto?`, '_blank')}
                    className="mt-10 flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-extrabold rounded-xl hover:bg-gold-400 transition-all uppercase text-[11px] tracking-[0.15em]"
                  >
                    Verificar con un experto <ArrowRight size={16}/>
                  </button>
                </div>
              </div>
              
              <div className="bg-red-900/5 border border-red-900/20 p-6 rounded-2xl flex gap-4">
                <AlertTriangle className="text-red-700 shrink-0" size={20} />
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-medium">
                  Este cálculo es orientativo. Los residentes en Cataluña podrían estar sujetos al impuesto anual de CO2 adicional.
                </p>
              </div>
            </div>
          </div>

          {/* SECCIÓN FAQ / TABLA DE EJEMPLOS */}
          <section className="mt-32 pt-20 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
                  <CheckCircle2 className="text-gold-400" size={28} />
                  Referencias Reales <span className="text-gold-400 italic font-normal text-xl ml-2">(Coches 3 años)</span>
                </h2>
                <p className="text-gray-500 mt-2 text-sm">Ejemplos basados en las tablas oficiales del BOE y nuestra experiencia en importación.</p>
              </div>
              <div className="hidden md:block">
                <Car className="text-white/10" size={80} />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black">Modelo</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">Valor BOE (Aprox)</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold text-center">CO2</th>
                      <th className="p-5 text-[10px] uppercase tracking-[0.2em] text-gold-400 font-black text-right">Impuesto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {ejemplosImportacion.map((item, index) => (
                      <tr key={index} className="hover:bg-white/[0.03] transition-colors group">
                        <td className="p-5 font-bold text-white group-hover:text-gold-400 transition-colors">{item.modelo}</td>
                        <td className="p-5 text-center text-gray-400 font-mono text-xs">{item.valor}</td>
                        <td className="p-5 text-center text-gray-500 font-mono text-xs italic">{item.co2}</td>
                        <td className="p-5 text-right font-mono font-bold text-white bg-white/[0.01]">{item.impuesto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-8 text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">
              Premium German Cars — Gestión Integral de Impuestos y Tasas
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
