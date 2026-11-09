import { ASSETS } from "@/common/constants/assets";

export type Niche = "Beauty" | "Fitness" | "Lifestyle" | "Tech" | "Fashion" | "Food";
export type NicheFilter = "All niches" | Niche;

interface CreatorBase {
  id: string;
  name: string;
  niche: Niche;
  followers: string;
  engagement: string;
}

/** Wide 860 × 420 profile with photo (Aditi, Meera, Tanya). */
export interface FeatureCreator extends CreatorBase {
  layout: "feature";
  theme: "blue" | "gradient" | "white";
  displayName: string;
  handle: string;
  blurb: string;
  photo: string;
  fit: string;
}

/** Narrow 440 × 400 quote card with byline (Riya, Sneha, Priya). */
export interface QuoteCreator extends CreatorBase {
  layout: "quote";
  theme: "white" | "blue";
  quote: string;
  byline: string;
  avatar: string;
}

export type Creator = FeatureCreator | QuoteCreator;

export const CREATORS_COPY = {
  eyebrow: "OUR TOP CREATORS",
  title: { before: "Meet the ", highlight: "creators", after: " brands trust" },
  description:
    "Vetted creators across every niche, each with real audience data and past project results.",
  views: ["Runway", "Grid view"] as const,
  browse: "Browse all creators →",
  viewProfile: "View full profile",
  empty: "No creators in this niche yet. New creators join every week.",
};

export const NICHE_FILTERS: NicheFilter[] = [
  "All niches",
  "Beauty",
  "Fitness",
  "Lifestyle",
  "Tech",
  "Fashion",
  "Food",
];

const C = ASSETS.creators;

/* Order and content from Figma "Creators runway · scroll" (1805:102187). */
export const CREATORS: Creator[] = [
  {
    id: "aditi",
    layout: "feature",
    theme: "blue",
    name: "Aditi Sharma",
    displayName: "ADITI SHARMA",
    handle: "Beauty creator · @aditisharma",
    blurb: "Honest skincare reviews and glowy tutorials that followers actually trust.",
    photo: C.photoAditi,
    fit: "★ 94 fit score",
    niche: "Beauty",
    followers: "4.2 L",
    engagement: "6.8%",
  },
  {
    id: "riya",
    layout: "quote",
    theme: "white",
    name: "Riya Kapoor",
    quote: "“Everyday outfits, styled for real budgets and real weather.”",
    byline: "Fashion creator · ★ 91",
    avatar: C.avatarRiya,
    niche: "Fashion",
    followers: "2.6 L",
    engagement: "5.4%",
  },
  {
    id: "meera",
    layout: "feature",
    theme: "gradient",
    name: "Meera Iyer",
    displayName: "MEERA IYER",
    handle: "Beauty creator · Mumbai · @meerabeauty",
    blurb: "Monsoon-proof skincare in Hindi and English, with real before-and-afters.",
    photo: C.photoMeera,
    fit: "★ 92 fit score",
    niche: "Beauty",
    followers: "1.12 L",
    engagement: "7.2%",
  },
  {
    id: "sneha",
    layout: "quote",
    theme: "blue",
    name: "Sneha Iyer",
    quote: "“Slow mornings, small homes and the products that make them work.”",
    byline: "Lifestyle creator · ★ 86",
    avatar: C.avatarSneha,
    niche: "Lifestyle",
    followers: "1.8 L",
    engagement: "4.9%",
  },
  {
    id: "tanya",
    layout: "feature",
    theme: "white",
    name: "Tanya Bhatia",
    displayName: "TANYA BHATIA",
    handle: "Beauty creator · @tanyabhatia",
    blurb: "Bold evening looks, broken down so anyone can follow along.",
    photo: C.photoTanya,
    fit: "★ 92 fit score",
    niche: "Beauty",
    followers: "3.1 L",
    engagement: "6.1%",
  },
  {
    id: "priya",
    layout: "quote",
    theme: "white",
    name: "Priya Nair",
    quote: "“South Indian home cooking, quick enough for a weeknight.”",
    byline: "Food creator · Bengaluru · ★ 83",
    avatar: C.avatarPriya,
    niche: "Food",
    followers: "96K",
    engagement: "8.3%",
  },
];

/**
 * Runway geometry: every slot steps (+714, −242.76) px along the diagonal and rotates 4.46°.
 * Slot 0 is centred at (720, 410) on the 1440 × 770 stage.
 */
export const RUNWAY = {
  width: 1440,
  height: 770,
  centerX: 720,
  centerY: 410,
  stepX: 714,
  stepY: -242.76,
  stepRotate: 4.46,
  /** Auto-advance interval (ms). */
  interval: 3600,
};
