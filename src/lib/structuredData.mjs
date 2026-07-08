export const SITE_URL = "https://www.premiumgermancars.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const LOGO_ID = `${SITE_URL}/#logo`;
export const PRIMARY_IMAGE_ID = `${SITE_URL}/#primaryimage`;

const DEFAULT_AREA_SERVED = ["España", "Cambrils", "Tarragona", "Cataluña"];

export const organizationReference = () => ({
  "@id": ORGANIZATION_ID,
});

export const createOrganizationSchema = () => ({
  "@type": ["Organization", "AutoDealer"],
  "@id": ORGANIZATION_ID,
  name: "Premium German Cars",
  url: `${SITE_URL}/`,
  description:
    "Importación de coches premium desde Alemania con búsqueda, verificación, transporte, ITV, matriculación y entrega llave en mano en España.",
  logo: {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${SITE_URL}/logoPGC.svg`,
    contentUrl: `${SITE_URL}/logoPGC.svg`,
    caption: "Premium German Cars",
  },
  image: {
    "@type": "ImageObject",
    "@id": PRIMARY_IMAGE_ID,
    url: `${SITE_URL}/amggtr-mobile.webp`,
    contentUrl: `${SITE_URL}/amggtr-mobile.webp`,
  },
  telephone: "+34603743608",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cambrils",
    addressRegion: "Tarragona",
    addressCountry: "ES",
  },
  areaServed: DEFAULT_AREA_SERVED,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+34603743608",
    contactType: "sales",
    availableLanguage: ["es"],
  },
  inLanguage: "es-ES",
});

export const createGraph = (nodes) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export const createBreadcrumbSchema = ({ url, items }) => ({
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const createFaqSchema = ({ url, faqs }) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const createWebPageSchema = ({
  type = "WebPage",
  url,
  name,
  description,
  datePublished,
  dateModified,
  breadcrumbId,
  mainEntityId,
  hasPartIds,
}) => ({
  "@type": type,
  "@id": `${url}#webpage`,
  url,
  name,
  description,
  inLanguage: "es-ES",
  publisher: organizationReference(),
  ...(datePublished ? { datePublished } : {}),
  ...(dateModified ? { dateModified } : {}),
  ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  ...(hasPartIds?.length
    ? { hasPart: hasPartIds.map((id) => ({ "@id": id })) }
    : {}),
});

export const createBlogPostingSchema = ({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  keywords,
  about,
}) => ({
  "@type": "BlogPosting",
  "@id": `${url}#article`,
  headline,
  description,
  image: Array.isArray(image) ? image : [image],
  datePublished,
  dateModified,
  inLanguage: "es-ES",
  author: organizationReference(),
  publisher: organizationReference(),
  mainEntityOfPage: { "@id": `${url}#webpage` },
  ...(keywords?.length ? { keywords } : {}),
  ...(about?.length ? { about } : {}),
});

export const createBlogPostingGraph = ({
  url,
  title,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  breadcrumbName = headline,
  keywords,
  about,
  faqs = [],
  additionalNodes = [],
}) => {
  const breadcrumbId = `${url}#breadcrumb`;
  const articleId = `${url}#article`;
  const faqId = `${url}#faq`;

  return createGraph([
    createWebPageSchema({
      url,
      name: title,
      description,
      datePublished,
      dateModified,
      breadcrumbId,
      mainEntityId: articleId,
      hasPartIds: faqs.length ? [faqId] : [],
    }),
    createBreadcrumbSchema({
      url,
      items: [
        { name: "Inicio", url: `${SITE_URL}/` },
        { name: "Blog", url: `${SITE_URL}/blog` },
        { name: breadcrumbName, url },
      ],
    }),
    createBlogPostingSchema({
      url,
      headline,
      description,
      image,
      datePublished,
      dateModified,
      keywords,
      about,
    }),
    ...(faqs.length ? [createFaqSchema({ url, faqs })] : []),
    ...additionalNodes,
  ]);
};

export const createServiceSchema = ({
  id,
  url,
  name,
  description,
  serviceType,
  areaServed = DEFAULT_AREA_SERVED,
}) => ({
  "@type": "Service",
  "@id": id,
  url,
  name,
  description,
  serviceType,
  areaServed,
  provider: organizationReference(),
});

export const createProductSchema = ({
  id,
  url,
  name,
  description,
  image,
  brand,
  sku,
  price,
  availability,
  itemCondition = "https://schema.org/UsedCondition",
}) => ({
  "@type": "Product",
  "@id": id,
  url,
  name,
  description,
  image: Array.isArray(image) ? image : [image],
  brand: {
    "@type": "Brand",
    name: brand,
  },
  ...(sku ? { sku } : {}),
  itemCondition,
  seller: organizationReference(),
  offers: {
    "@type": "Offer",
    url,
    price,
    priceCurrency: "EUR",
    availability,
    itemCondition,
    seller: organizationReference(),
  },
});

export const createCarProductSchema = ({
  id,
  url,
  name,
  description,
  image,
  brand,
  model,
  year,
  mileage,
  engine,
  price,
  availability,
}) => ({
  ...createProductSchema({
    id,
    url,
    name,
    description,
    image,
    brand,
    price,
    availability,
  }),
  "@type": ["Product", "Car"],
  model,
  vehicleModelDate: String(year),
  mileageFromOdometer: {
    "@type": "QuantitativeValue",
    value: mileage,
    unitCode: "KMT",
  },
  vehicleEngine: {
    "@type": "EngineSpecification",
    name: engine,
  },
  mainEntityOfPage: { "@id": `${url}#webpage` },
});

export const createCarProductGraph = ({
  url,
  title,
  description,
  productDescription = description,
  name,
  image,
  brand,
  model,
  year,
  mileage,
  engine,
  price,
  availability,
}) => {
  const breadcrumbId = `${url}#breadcrumb`;
  const productId = `${url}#product`;

  return createGraph([
    createWebPageSchema({
      url,
      name: title,
      description,
      breadcrumbId,
      mainEntityId: productId,
    }),
    createBreadcrumbSchema({
      url,
      items: [
        { name: "Inicio", url: `${SITE_URL}/` },
        { name, url },
      ],
    }),
    createCarProductSchema({
      id: productId,
      url,
      name,
      description: productDescription,
      image,
      brand,
      model,
      year,
      mileage,
      engine,
      price,
      availability,
    }),
  ]);
};
