import { SEO } from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 | Pagina no encontrada"
        description="La URL solicitada no existe."
        noIndex={true}
      />
      <main style={{ padding: "2rem" }}>
        <h1>404 - Pagina no encontrada</h1>
        <p>La URL solicitada no existe.</p>
      </main>
    </>
  );
}
