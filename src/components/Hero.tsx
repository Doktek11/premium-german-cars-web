import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const goToImportForm = () => {
    navigate("/", { state: { scrollTo: "#import" } });
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#000",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background image */}
      <img
        src="/amggtr-mobile.webp"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          color: "#fff",
          padding: "0 24px",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "block",
            color: "#d4af37",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Excelencia Alemana
        </span>

        <h1
          style={{
            fontSize: "32px",
            lineHeight: 1.2,
            fontWeight: 700,
            marginBottom: "24px",
            fontFamily: "Playfair Display, serif",
          }}
        >
          Importación de Coches Premium desde Alemania
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#e5e5e5",
            marginBottom: "32px",
          }}
        >
          Tú lo sueñas. Nosotros lo traemos.
        </p>

        <button
          onClick={goToImportForm}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 28px",
            backgroundColor: "#d4af37",
            color: "#000",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "14px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Comenzar pedido
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
