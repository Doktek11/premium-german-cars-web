import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  article?: boolean;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image = "https://www.premiumgermancars.com/og.jpg",
  article = false,
  noIndex = false,
  jsonLd,
}) => {
  const siteName = "Premium German Cars";
  const fullUrl = canonical;

  return (
    <Helmet>
      {/* Etiquetas Estándar */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <link rel="alternate" hrefLang="es-ES" href={canonical} />}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <meta
        name="googlebot"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {fullUrl && <meta property="og:url" content={fullUrl} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter (X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@premiumgermancars" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
