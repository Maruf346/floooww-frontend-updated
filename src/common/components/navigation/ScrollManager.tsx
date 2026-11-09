import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll on page changes. Landing section routes (e.g. /faq) manage their
 * own scrolling, so they opt out via `skipPaths`.
 */
export function ScrollManager({ skipPaths = [] }: { skipPaths?: readonly string[] }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (skipPaths.includes(pathname)) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, skipPaths]);
  return null;
}
