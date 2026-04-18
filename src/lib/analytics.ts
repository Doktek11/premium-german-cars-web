import { track } from "@vercel/analytics";
import type { LeadContext } from "./leadAttribution";

type AnalyticsPrimitive = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsPrimitive>;

type LeadEventProperties = AnalyticsProperties & {
  context?: Partial<LeadContext>;
};

function toOptionalString(value?: string) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function cleanProperties(properties: AnalyticsProperties): AnalyticsProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  );
}

function buildAttributionProperties(
  context?: Partial<LeadContext>
): AnalyticsProperties {
  if (!context) {
    return {};
  }

  return cleanProperties({
    sourcePath: toOptionalString(context.sourcePath),
    sourceQuery: toOptionalString(context.sourceQuery),
    entryPath: toOptionalString(context.entryPath),
    entryQuery: toOptionalString(context.entryQuery),
    lastPath: toOptionalString(context.lastPath),
    utmSource: toOptionalString(context.utmSource) ?? "direct",
    utmMedium: toOptionalString(context.utmMedium),
    utmCampaign: toOptionalString(context.utmCampaign),
    utmTerm: toOptionalString(context.utmTerm),
    utmContent: toOptionalString(context.utmContent),
    sessionId: toOptionalString(context.sessionId),
  });
}

export function trackEvent(
  eventName: string,
  properties: AnalyticsProperties = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    track(eventName, cleanProperties(properties));
  } catch {
    // Never block UI interactions if analytics fails.
  }
}

export function trackLeadEvent(
  eventName: string,
  properties: LeadEventProperties = {}
) {
  const { context, ...restProperties } = properties;

  trackEvent(eventName, {
    ...buildAttributionProperties(context),
    ...cleanProperties(restProperties),
  });
}
