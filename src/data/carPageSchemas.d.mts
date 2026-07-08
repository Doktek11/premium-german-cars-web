import type { JsonLdNode } from "../lib/structuredData.mjs";

export type CarPageMetadata = {
  slug: string;
  path: string;
  url: string;
  make: string;
  model: string;
  year: number;
  price: number;
  km: number;
  engine: string;
  status: "Disponible" | "Vendido";
  image: string;
  gallery: string[];
  title: string;
  seoDescription: string;
  productDescription: string;
};

export const CAR_PAGE_METADATA: CarPageMetadata[];
export function getCarPageMetadata(slug: string): CarPageMetadata;
export function getCarPageJsonLd(slug: string): JsonLdNode;
