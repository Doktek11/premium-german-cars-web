const STORAGE_KEY = "pgc_lead_attribution";

export interface StoredLeadAttribution {
  sessionId: string;
  entryPath: string;
  entryQuery: string;
  firstReferrer: string;
  firstSeenAt: string;
  lastPath: string;
  lastQuery: string;
  lastSeenAt: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
}

export interface LeadContext extends StoredLeadAttribution {
  sourcePath: string;
  sourceQuery: string;
  sourceTitle: string;
}

function emptyStoredLeadAttribution(): StoredLeadAttribution {
  return {
    sessionId: "",
    entryPath: "",
    entryQuery: "",
    firstReferrer: "",
    firstSeenAt: "",
    lastPath: "",
    lastQuery: "",
    lastSeenAt: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
  };
}

function readStoredLeadAttribution(): StoredLeadAttribution {
  if (typeof window === "undefined") {
    return emptyStoredLeadAttribution();
  }

  try {
    const rawValue = window.sessionStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return emptyStoredLeadAttribution();
    }

    const parsedValue = JSON.parse(rawValue) as Partial<StoredLeadAttribution>;

    return {
      ...emptyStoredLeadAttribution(),
      ...parsedValue,
    };
  } catch {
    return emptyStoredLeadAttribution();
  }
}

function writeStoredLeadAttribution(value: StoredLeadAttribution) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

function getSearchParamValue(params: URLSearchParams, key: string) {
  return params.get(key) ?? "";
}

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `pgc-${Date.now()}`;
}

export function persistLeadAttribution(
  pathname: string,
  search: string,
  referrer: string
) {
  const currentValue = readStoredLeadAttribution();
  const params = new URLSearchParams(search);
  const now = new Date().toISOString();

  const nextValue: StoredLeadAttribution = {
    sessionId: currentValue.sessionId || createSessionId(),
    entryPath: currentValue.entryPath || pathname,
    entryQuery: currentValue.entryQuery || search,
    firstReferrer: currentValue.firstReferrer || referrer || "",
    firstSeenAt: currentValue.firstSeenAt || now,
    lastPath: pathname,
    lastQuery: search,
    lastSeenAt: now,
    utmSource: currentValue.utmSource || getSearchParamValue(params, "utm_source"),
    utmMedium: currentValue.utmMedium || getSearchParamValue(params, "utm_medium"),
    utmCampaign: currentValue.utmCampaign || getSearchParamValue(params, "utm_campaign"),
    utmTerm: currentValue.utmTerm || getSearchParamValue(params, "utm_term"),
    utmContent: currentValue.utmContent || getSearchParamValue(params, "utm_content"),
  };

  writeStoredLeadAttribution(nextValue);
}

export function getLeadContext(
  pathname: string,
  search: string,
  title: string
): LeadContext {
  const storedValue = readStoredLeadAttribution();

  return {
    ...storedValue,
    sourcePath: pathname,
    sourceQuery: search,
    sourceTitle: title,
  };
}
