import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import { scrollToElement, scrollToTop } from "@/common/utils/scroll";
import { sectionForPath } from "@/landing/constants/sections";

/**
 * Clean-URL section navigation: /faq, /how-it-works, /mcp render the landing page
 * and glide to their section. Re-clicking the same link scrolls again (new location key).
 */
export function useLandingSectionRouting() {
  const location = useLocation();
  const isFirstRun = useRef(true);

  useEffect(() => {
    const firstRun = isFirstRun.current;
    isFirstRun.current = false;
    const section = sectionForPath(location.pathname);

    if (!section) {
      if (location.pathname === ROUTES.home) scrollToTop(firstRun ? "auto" : "smooth");
      return;
    }

    let frame = 0;
    let attempts = 0;
    const tryScroll = () => {
      const element = document.getElementById(section.id);
      if (element) scrollToElement(element, "smooth");
      else if (attempts++ < 30) frame = requestAnimationFrame(tryScroll);
    };
    // Give the first paint a beat so the entrance and the glide don't fight.
    const timer = window.setTimeout(tryScroll, firstRun ? 250 : 0);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [location.key, location.pathname]);
}
