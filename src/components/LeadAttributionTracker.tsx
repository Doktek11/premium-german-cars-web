import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { persistLeadAttribution } from "../lib/leadAttribution";

export const LeadAttributionTracker = () => {
  const location = useLocation();

  useEffect(() => {
    persistLeadAttribution(
      location.pathname,
      location.search,
      document.referrer
    );
  }, [location.pathname, location.search]);

  return null;
};
