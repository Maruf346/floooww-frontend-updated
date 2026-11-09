import { ROUTES } from "@/common/constants/routes";
import { LANDING_SECTIONS } from "@/landing/constants/sections";

export interface NavLinkItem {
  label: string;
  to: string;
  /** Landing section id used to highlight the link while the section is on screen. */
  sectionId?: string;
}

export const PRIMARY_NAV: NavLinkItem[] = [
  { label: "For brands", to: `${ROUTES.signup}?role=brand` },
  { label: "For creators", to: `${ROUTES.signup}?role=creator` },
  { label: "For agencies", to: `${ROUTES.signup}?role=agency` },
  {
    label: "How it works",
    to: LANDING_SECTIONS.howItWorks.path,
    sectionId: LANDING_SECTIONS.howItWorks.id,
  },
  { label: "MCP", to: LANDING_SECTIONS.mcp.path, sectionId: LANDING_SECTIONS.mcp.id },
];

export const AUTH_NAV = {
  login: { label: "Log in", to: ROUTES.login },
  signup: { label: "Sign up free", to: ROUTES.signup },
} as const;
