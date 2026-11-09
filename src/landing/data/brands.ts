import { ASSETS } from "@/common/constants/assets";

export type BrandLogo =
  | { kind: "image"; name: string; src: string; width: number; height: number }
  | { kind: "text"; name: string; text: string; className: string };

export const BRANDS_HEADING = "TRUSTED BY TEAMS AT LEADING BRANDS";

/* Exact order and sizes from Figma "Logo marquee" (895:2639). */
export const BRAND_LOGOS: BrandLogo[] = [
  { kind: "image", name: "Nykaa", src: ASSETS.brands.nykaa, width: 84, height: 25 },
  { kind: "image", name: "Mamaearth", src: ASSETS.brands.mamaearth, width: 138, height: 18 },
  {
    kind: "text",
    name: "boAt",
    text: "boAt",
    className: "font-inter-black text-[25px] font-black tracking-[-1px]",
  },
  { kind: "image", name: "Sugar", src: ASSETS.brands.sugar, width: 86, height: 25 },
  { kind: "image", name: "mCaffeine", src: ASSETS.brands.mcaffeine, width: 83, height: 28 },
  { kind: "image", name: "Lenskart", src: ASSETS.brands.lenskart, width: 153, height: 21 },
  { kind: "image", name: "Myntra", src: ASSETS.brands.myntra, width: 87, height: 26 },
  { kind: "image", name: "AJIO", src: ASSETS.brands.ajio, width: 73, height: 21 },
  {
    kind: "text",
    name: "The Derma Co.",
    text: "THE DERMA CO.",
    className: "font-inter-semibold text-[15px] font-semibold tracking-[2.4px]",
  },
  { kind: "image", name: "Gap", src: ASSETS.brands.gap, width: 34, height: 25 },
  { kind: "image", name: "Flow", src: ASSETS.brands.flow, width: 56, height: 23 },
];
