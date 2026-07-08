export type JsonLdNode = Record<string, unknown>;

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const SITE_URL: string;
export const ORGANIZATION_ID: string;
export const LOGO_ID: string;
export const PRIMARY_IMAGE_ID: string;

export function organizationReference(): { "@id": string };
export function createOrganizationSchema(): JsonLdNode;
export function createGraph(nodes: JsonLdNode[]): JsonLdNode;
export function createBreadcrumbSchema(input: {
  url: string;
  items: BreadcrumbItem[];
}): JsonLdNode;
export function createFaqSchema(input: {
  url: string;
  faqs: FaqItem[];
}): JsonLdNode;
export function createWebPageSchema(input: {
  type?: "WebPage" | "CollectionPage";
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbId?: string;
  mainEntityId?: string;
  hasPartIds?: string[];
}): JsonLdNode;
export function createBlogPostingSchema(input: {
  url: string;
  headline: string;
  description: string;
  image: string | string[];
  datePublished: string;
  dateModified: string;
  keywords?: string[];
  about?: JsonLdNode[];
}): JsonLdNode;
export function createBlogPostingGraph(input: {
  url: string;
  title: string;
  headline: string;
  description: string;
  image: string | string[];
  datePublished: string;
  dateModified: string;
  breadcrumbName?: string;
  keywords?: string[];
  about?: JsonLdNode[];
  faqs?: FaqItem[];
  additionalNodes?: JsonLdNode[];
}): JsonLdNode;
export function createServiceSchema(input: {
  id: string;
  url: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
}): JsonLdNode;
export function createProductSchema(input: {
  id: string;
  url: string;
  name: string;
  description: string;
  image: string | string[];
  brand: string;
  sku?: string;
  price: number | string;
  availability: string;
  itemCondition?: string;
}): JsonLdNode;
export function createCarProductSchema(input: {
  id: string;
  url: string;
  name: string;
  description: string;
  image: string | string[];
  brand: string;
  model: string;
  year: number;
  mileage: number;
  engine: string;
  price: number | string;
  availability: string;
}): JsonLdNode;
export function createCarProductGraph(input: {
  url: string;
  title: string;
  description: string;
  productDescription?: string;
  name: string;
  image: string | string[];
  brand: string;
  model: string;
  year: number;
  mileage: number;
  engine: string;
  price: number | string;
  availability: string;
}): JsonLdNode;
