import { ASSETS } from "@/common/constants/assets";

export const HERO_COPY = {
  rating: { stars: "★★★★★", score: "Rated 4.8", trust: "· Trusted by 2,800+ brand projects" },
  headline: "Find creators who fit",
  /** Typed one letter at a time, in this order, forever. */
  rotatingWords: ["your budget.", "your audience.", "your goal.", "your next launch."],
  subheadline:
    "Floooww runs the whole project in one place, from the first brief to the final payout.",
  searchPlaceholder: "Search projects, creators, or categories…",
  searchCta: "Search",
  popularLabel: "Popular:",
  popular: ["Beauty", "Skincare", "Fashion", "Lifestyle", "Fitness", "Food", "Tech"],
  checks: ["No credit card required", "Free to get started", "Creator access always free"],
} as const;

/* Network backdrop, in 1440 × 760 frame coordinates (Figma 895:2524). */
export interface HeroLine {
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  length: number;
  src: string;
}

const L = ASSETS.hero.lines;
export const HERO_LINES: HeroLine[] = [
  { left: 0, top: 90, width: 300, height: 37, rotate: -7.03, length: 302.273, src: L[0] },
  { left: 21, top: 0, width: 129, height: 420, rotate: 72.93, length: 439.364, src: L[1] },
  { left: 300, top: 90, width: 220, height: 130, rotate: 30.58, length: 255.539, src: L[2] },
  { left: 153, top: 0, width: 616, height: 430, rotate: -34.92, length: 751.236, src: L[3] },
  { left: 150, top: 420, width: 659, height: 357, rotate: 28.45, length: 749.487, src: L[4] },
  { left: 57, top: 420, width: 93, height: 340, rotate: 105.3, length: 352.49, src: L[5] },
  { left: 1120, top: 85, width: 345, height: 95, rotate: 164.6, length: 357.841, src: L[6] },
  { left: 1300, top: -20, width: 73, height: 440, rotate: 99.42, length: 446.015, src: L[7] },
  { left: 930, top: 180, width: 190, height: 60, rotate: 162.47, length: 199.249, src: L[8] },
  { left: 972, top: -11, width: 338, height: 431, rotate: 51.9, length: 547.727, src: L[9] },
  { left: 668, top: -11, width: 262, height: 251, rotate: -136.23, length: 362.829, src: L[10] },
  { left: 730, top: 420, width: 570, height: 340, rotate: 149.18, length: 663.702, src: L[11] },
  { left: 1300, top: 420, width: 60, height: 300, rotate: 78.69, length: 305.941, src: L[12] },
  { left: 1019, top: 589, width: 345, height: 130, rotate: 20.65, length: 368.68, src: L[13] },
];

export const HERO_DOTS: { left: number; top: number }[] = [
  { left: 57, top: 117 },
  { left: 297, top: 87 },
  { left: 517, top: 217 },
  { left: 147, top: 417 },
  { left: 417, top: 557 },
  { left: 57, top: 745 },
  { left: 1377, top: 107 },
  { left: 1117, top: 177 },
  { left: 927, top: 237 },
  { left: 1297, top: 417 },
  { left: 1047, top: 597 },
  { left: 1357, top: 717 },
  { left: 717, top: 37 },
  { left: 697, top: 777 },
];

/* Floating cards, positioned in the same 1440 × 760 frame. Rotated cards sit centred in their Figma bounding box. */
interface FloatBase {
  id: string;
  left: number;
  top: number;
  /** Bounding box of rotated cards; the card is centred inside it. */
  box?: { width: number; height: number };
  rotate: number;
  /** Pointer-parallax depth, 0 = static. */
  depth: number;
  /** Idle float loop length in seconds. */
  period: number;
}

export type HeroFloat =
  | (FloatBase & { kind: "match"; label: string; score: string })
  | (FloatBase & { kind: "creator"; name: string; meta: string; score: string; avatar: string })
  | (FloatBase & { kind: "growth"; label: string; value: string; delta: string })
  | (FloatBase & { kind: "platform"; name: string; icon: string });

export const HERO_FLOATS: HeroFloat[] = [
  {
    kind: "match",
    id: "match",
    left: 199.32,
    top: 51,
    box: { width: 184.653, height: 42.205 },
    rotate: 1,
    depth: 14,
    period: 7,
    label: "Match Score",
    score: "95.10%",
  },
  {
    kind: "platform",
    id: "instagram",
    left: 1313,
    top: 88,
    rotate: 0,
    depth: 22,
    period: 8,
    name: "Instagram",
    icon: ASSETS.hero.platformInstagram,
  },
  {
    kind: "creator",
    id: "aditi",
    left: 26.05,
    top: 232,
    box: { width: 204.831, height: 63.05 },
    rotate: 2,
    depth: 18,
    period: 8.5,
    name: "Aditi Sharma",
    meta: "Beauty · 4.2 L",
    score: "95.10%",
    avatar: ASSETS.hero.avatarAditi,
  },
  {
    kind: "platform",
    id: "youtube",
    left: 1177,
    top: 241,
    rotate: 0,
    depth: 12,
    period: 6.5,
    name: "YouTube",
    icon: ASSETS.hero.platformYouTube,
  },
  {
    kind: "platform",
    id: "snapchat",
    left: 110,
    top: 399,
    rotate: 0,
    depth: 24,
    period: 7.5,
    name: "Snapchat",
    icon: ASSETS.hero.platformSnapchat,
  },
  {
    kind: "creator",
    id: "kavya",
    left: 1191,
    top: 386.99,
    box: { width: 208.828, height: 63.19 },
    rotate: -2,
    depth: 16,
    period: 9,
    name: "Kavya Menon",
    meta: "Lifestyle · 2.1 L",
    score: "90.12%",
    avatar: ASSETS.hero.avatarKavya,
  },
  {
    kind: "growth",
    id: "growth",
    left: 201,
    top: 494.81,
    box: { width: 124.497, height: 100.16 },
    rotate: -1.5,
    depth: 20,
    period: 8,
    label: "GROWTH SCORE",
    value: "4,812",
    delta: "↗ +12%",
  },
  {
    kind: "platform",
    id: "pinterest",
    left: 1321,
    top: 665,
    rotate: 0,
    depth: 26,
    period: 7,
    name: "Pinterest",
    icon: ASSETS.hero.platformPinterest,
  },
];

/** Compact placement for the platform chips below the xl breakpoint (where the full scene would crowd the copy). */
export const HERO_COMPACT_PLATFORMS: { id: string; className: string }[] = [
  { id: "snapchat", className: "left-3 top-4 sm:left-8 sm:top-8" },
  { id: "instagram", className: "right-3 top-4 sm:right-8 sm:top-8" },
  { id: "youtube", className: "bottom-5 left-3 sm:bottom-8 sm:left-10" },
  { id: "pinterest", className: "bottom-5 right-3 sm:bottom-8 sm:right-10" },
];
