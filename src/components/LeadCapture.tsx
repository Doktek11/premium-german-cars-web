import { useState, type FormEvent } from "react";

interface LeadCaptureProps {
  marca?: string;
  modelo?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function LeadCapture({ marca, modelo }: LeadCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          marca,
          modelo,
          source: "calculadora",
        }),
      });

      if (!response.ok) {
        throw new Error("Lead request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 text-center">
        <p className="text-sm text-gray-300">
          Te avisaremos cuando encontremos una oportunidad real en Alemania.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
      <p className="mb-1 text-sm font-medium text-white">
        ¿Quieres que te avisemos cuando haya
        {marca && modelo
          ? ` un ${marca} ${modelo}`
          : " coches similares"}{" "}
        disponibles en Alemania?
      </p>
      <p className="mb-4 text-xs text-gray-500">
        Sin spam. Solo oportunidades reales del mercado alemán.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => {
            setStatus("idle");
            setEmail(event.target.value);
          }}
          placeholder="tu@email.com"
          className="min-h-[44px] flex-1 rounded-lg border border-white/20 bg-black px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-[44px] rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-100 disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Avisar"}
        </button>
      </div>

      {status === "error" && (
        <p className="mt-3 text-xs text-red-400" aria-live="polite">
          Revisa el email o inténtalo de nuevo en unos segundos.
        </p>
      )}

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="mb-2 text-xs text-gray-500">¿Prefieres que lo gestionemos todo?</p>
        <a
          href="/importacion-coches-alemania"
          className="text-sm text-white underline underline-offset-2 hover:text-gray-300"
        >
          Ver servicio de importación completo
        </a>
      </div>
    </form>
  );
}
