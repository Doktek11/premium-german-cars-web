import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const RouteAnalyticsTracker = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const handle = window.setTimeout(() => {
      window.gtag?.("config", "G-8KVXL3SX44", {
        page_path: pathname + search,
        page_title: document.title,
      });
    });

    return () => window.clearTimeout(handle);
  }, [pathname, search]);

  return null;
};
