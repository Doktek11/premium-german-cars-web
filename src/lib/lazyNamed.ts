import { lazy, type ComponentType } from "react";

export const lazyNamed = <T extends ComponentType<unknown>>(
  load: () => Promise<Record<string, T>>,
  name: string
) => lazy(() => load().then((m) => ({ default: m[name] })));
