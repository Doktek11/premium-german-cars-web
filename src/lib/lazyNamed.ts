import { lazy, type ComponentType } from "react";

export const lazyNamed = (
  load: () => Promise<Record<string, unknown>>,
  name: string
) =>
  lazy(() =>
    load().then((m) => ({ default: m[name] as ComponentType<any> }))
  );
