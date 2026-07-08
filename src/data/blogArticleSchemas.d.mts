import type { FaqItem, JsonLdNode } from "../lib/structuredData.mjs";

export type BlogArticleMetadata = {
  path: string;
  url: string;
  title: string;
  description: string;
  schemaDescription?: string;
  headline: string;
  datePublished: string;
  dateModified: string;
  image: string;
  faqs?: FaqItem[];
  keywords?: string[];
  about?: JsonLdNode[];
  service?: {
    id: string;
    url: string;
    name: string;
    description: string;
    serviceType: string;
  };
};

export const BLOG_ARTICLES: BlogArticleMetadata[];
export function getBlogArticleMetadata(path: string): BlogArticleMetadata;
export function getBlogArticleJsonLd(path: string): JsonLdNode;
