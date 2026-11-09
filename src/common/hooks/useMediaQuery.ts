import { useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. Returns false during the first paint on the server-less client. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Desktop layout breakpoint (Tailwind `lg`). Sticky scroll storytelling only runs here. */
export const DESKTOP_QUERY = "(min-width: 1024px)";
