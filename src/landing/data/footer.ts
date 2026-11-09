import type { Platform } from "@/common/types";
import { ROUTES } from "@/common/constants/routes";
import { LANDING_SECTIONS } from "@/landing/constants/sections";
import { FAQ_COPY } from "./faq";

export interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_TAGLINE =
  "Find creators who fit your budget, and run the whole project in one place.";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "For brands", to: `${ROUTES.signup}?role=brand` },
      { label: "For creators", to: `${ROUTES.signup}?role=creator` },
      { label: "For agencies", to: `${ROUTES.signup}?role=agency` },
      { label: "How it works", to: LANDING_SECTIONS.howItWorks.path },
      { label: "MCP", to: LANDING_SECTIONS.mcp.path },
    ],
  },
  {
    title: "Workspaces",
    links: [
      { label: "Brand dashboard", to: ROUTES.brand },
      { label: "Creator dashboard", to: ROUTES.creator },
      { label: "Agency dashboard", to: ROUTES.agency },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: LANDING_SECTIONS.faq.path },
      { label: "Contact us", href: `mailto:${FAQ_COPY.contactEmail}` },
      { label: "Log in", to: ROUTES.login },
      { label: "Sign up free", to: ROUTES.signup },
    ],
  },
];

export const FOOTER_SOCIALS: { platform: Platform; href: string }[] = [
  { platform: "Instagram", href: "https://www.instagram.com/" },
  { platform: "YouTube", href: "https://www.youtube.com/" },
  { platform: "Snapchat", href: "https://www.snapchat.com/" },
  { platform: "Pinterest", href: "https://www.pinterest.com/" },
];

export const FOOTER_LEGAL = "Floooww. All rights reserved.";
