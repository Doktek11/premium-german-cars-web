import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;      // Nueva prop para imagen personalizada
  article?: boolean;    // Nueva prop para indicar si es un artículo de blog
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image = "/og-image-default.jpg", // Imagen por defecto de tu marca
  article = false,
}) => {
  const siteName = "Premium German Cars";
  const fullUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Etiquetas Estándar */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content="index, follow" />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />

      {/* Twitter (X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@premiumgermancars" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Meta para móviles y tema */}
      <meta name="theme-color" content="#000000" />
    </Helmet>
  );
};
