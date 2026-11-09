import { ROUTES } from "@/common/constants/routes";

/**
 * Landing sections that can be deep-linked. Each one has a clean route
 * (no hash) - visiting the route scrolls smoothly to the section.
 */
export const LANDING_SECTIONS = {
  howItWorks: { id: "how-it-works", path: ROUTES.howItWorks },
  mcp: { id: "mcp", path: ROUTES.mcp },
  faq: { id: "faq", path: ROUTES.faq },
} as const;

export type LandingSectionKey = keyof typeof LANDING_SECTIONS;

export const LANDING_PATHS: readonly string[] = [
  ROUTES.home,
  ...Object.values(LANDING_SECTIONS).map((section) => section.path),
];

export function sectionForPath(pathname: string) {
  return Object.values(LANDING_SECTIONS).find((section) => section.path === pathname) ?? null;
}
