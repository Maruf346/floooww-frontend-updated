import { useEffect, useState } from "react";

/** Current `window.innerHeight`, kept in sync on resize. */
export function useViewportHeight() {
  const [height, setHeight] = useState(() =>
    typeof window === "undefined" ? 900 : window.innerHeight,
  );
  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return height;
}
