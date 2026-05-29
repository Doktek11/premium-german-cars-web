import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-8KVXL3SX44";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const RouteAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.gtag =
      window.gtag ??
      ((...args: unknown[]) => {
        window.dataLayer?.push(args);
      });

    const handle = window.setTimeout(() => {
      window.gtag?.("config", GA_MEASUREMENT_ID, {
        page_path: `${location.pathname}${location.search}`,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);

    return () => window.clearTimeout(handle);
  }, [location.pathname, location.search]);

  return null;
};
