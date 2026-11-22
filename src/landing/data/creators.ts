import { ASSETS } from "@/common/constants/assets";

export type Niche = "Beauty" | "Fitness" | "Lifestyle" | "Tech" | "Fashion" | "Food";
export type NicheFilter = "All niches" | Niche;

export interface CreatorItem {
  id: string;
  kind: "creator";
  name: string;
  displayName: string;
  handle: string;
  bio: string;
  tags: string[];
  photo: string;
  fit: string;
  niche: Niche;
  followers: string;
  engagement: string;
  theme: "light" | "dark" | "white";
}

export interface CampaignItem {
  id: string;
  kind: "campaign";
  name: string;
  brandMeta: string;
  brief: string;
  tags: string[];
  photo: string;
  fit: string;
  fee: string;
  posts: string;
  niche: Niche;
}

export type RunwayItem = CreatorItem | CampaignItem;

export const CREATORS_COPY = {
  eyebrow: "CREATORS & CAMPAIGNS",
  title: {
    before: "Meet the creators and campaigns on Kreyio",
    highlight: "",
    after: "",
  },
  description:
    "Vetted creators with real audience data, next to live brand campaigns open for applications.",
  views: ["Runway", "Grid view"] as const,
  browse: "Browse all creators →",
  viewProfile: "View full profile",
  applyNow: "Apply now",
  empty: "No creators or campaigns in this niche yet. New listings join every week.",
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

/**
 * Alternating Runway items from Figma "Creators runway · scroll" (1805:102187)
 * Profile → Campaign → Profile → Campaign → Profile → Campaign.
 */
export const RUNWAY_ITEMS: RunwayItem[] = [
  {
    id: "aditi",
    kind: "creator",
    theme: "light",
    name: "Aditi Sharma",
    displayName: "ADITI SHARMA",
    handle: "Beauty creator · @aditisharma",
    bio: "Honest skincare reviews and glowy tutorials that followers actually trust.",
    tags: ["Skincare", "Reviews", "Tutorials"],
    photo: C.photoAditi,
    fit: "★ 94 fit score",
    niche: "Beauty",
    followers: "4.2 L",
    engagement: "6.8%",
  },
  {
    id: "campaign-vitaminc",
    kind: "campaign",
    name: "VITAMIN-C SERUM",
    brandMeta: "Minimalist · verified brand · apply by 20 Oct",
    brief: "2 Reels and 1 Story for the festive Vitamin-C launch.",
    tags: ["Sales", "Instagram", "2 Reels · 1 Story"],
    photo: C.campaignVitaminc,
    fit: "★ 96% fit for you",
    fee: "₹12–18K",
    posts: "3 posts",
    niche: "Beauty",
  },
  {
    id: "meera",
    kind: "creator",
    theme: "dark",
    name: "Meera Iyer",
    displayName: "MEERA IYER",
    handle: "Beauty creator · Mumbai · @meerabeauty",
    bio: "Monsoon-proof skincare in Hindi and English, with real before-and-afters.",
    tags: ["Skincare", "Hindi + English", "Before / after"],
    photo: C.photoMeera,
    fit: "★ 92 fit score",
    niche: "Beauty",
    followers: "1.12 L",
    engagement: "7.2%",
  },
  {
    id: "campaign-velvet",
    kind: "campaign",
    name: "VELVET MATTE LAUNCH",
    brandMeta: "Velvet · verified brand · apply by 24 Oct",
    brief: "Show the new matte shades in an everyday look.",
    tags: ["Awareness", "Instagram · YouTube", "1 Reel · 1 Short"],
    photo: C.campaignVelvet,
    fit: "★ 91% fit for you",
    fee: "₹15–22K",
    posts: "2 posts",
    niche: "Beauty",
  },
  {
    id: "tanya",
    kind: "creator",
    theme: "white",
    name: "Tanya Bhatia",
    displayName: "TANYA BHATIA",
    handle: "Beauty creator · @tanyabhatia",
    bio: "Bold evening looks, broken down so anyone can follow along.",
    tags: ["Makeup", "Evening looks", "Tutorials"],
    photo: C.photoTanya,
    fit: "★ 92 fit score",
    niche: "Beauty",
    followers: "3.1 L",
    engagement: "6.1%",
  },
  {
    id: "campaign-dewdrop",
    kind: "campaign",
    name: "NIGHT SERUM DROP",
    brandMeta: "Dewdrop · verified brand · apply by 28 Oct",
    brief: "A night-routine Reel for the new serum drop.",
    tags: ["Product launch", "Instagram", "3 Stories · 1 Reel"],
    photo: C.campaignDewdrop,
    fit: "★ 88% fit for you",
    fee: "Gifted + ₹6,000",
    posts: "4 posts",
    niche: "Beauty",
  },
  // Niche variations for filter support:
  {
    id: "riya",
    kind: "creator",
    theme: "light",
    name: "Riya Kapoor",
    displayName: "RIYA KAPOOR",
    handle: "Fashion creator · @riyakapoor",
    bio: "Everyday outfits styled for real budgets and real weather.",
    tags: ["Styling", "Budget fashion", "Lookbooks"],
    photo: C.photoTanya,
    fit: "★ 91 fit score",
    niche: "Fashion",
    followers: "2.6 L",
    engagement: "5.4%",
  },
  {
    id: "campaign-loom",
    kind: "campaign",
    name: "FESTIVE LINEN DROP",
    brandMeta: "Loom & Weave · verified brand · apply by 22 Oct",
    brief: "2 Reels showcasing breathable festive styling for modern wardrobes.",
    tags: ["Awareness", "Instagram", "2 Reels"],
    photo: C.campaignVelvet,
    fit: "★ 93% fit for you",
    fee: "₹14–20K",
    posts: "2 posts",
    niche: "Fashion",
  },
  {
    id: "sneha",
    kind: "creator",
    theme: "light",
    name: "Sneha Iyer",
    displayName: "SNEHA IYER",
    handle: "Lifestyle creator · @snehaiyer",
    bio: "Slow mornings, small homes and the products that make them work.",
    tags: ["Home decor", "Routines", "Minimalism"],
    photo: C.photoAditi,
    fit: "★ 86 fit score",
    niche: "Lifestyle",
    followers: "1.8 L",
    engagement: "4.9%",
  },
  {
    id: "campaign-homenest",
    kind: "campaign",
    name: "MODULAR LIVING",
    brandMeta: "HomeNest · verified brand · apply by 26 Oct",
    brief: "1 Reel and 2 Stories integrating organizers into clean living spaces.",
    tags: ["Conversion", "Instagram", "1 Reel · 2 Stories"],
    photo: C.campaignDewdrop,
    fit: "★ 89% fit for you",
    fee: "₹10–16K",
    posts: "3 posts",
    niche: "Lifestyle",
  },
  {
    id: "priya",
    kind: "creator",
    theme: "light",
    name: "Priya Nair",
    displayName: "PRIYA NAIR",
    handle: "Food creator · @priyacooks",
    bio: "South Indian home cooking quick enough for a busy weeknight.",
    tags: ["Traditional recipes", "Quick meals", "Meal prep"],
    photo: C.photoMeera,
    fit: "★ 83 fit score",
    niche: "Food",
    followers: "96K",
    engagement: "8.3%",
  },
  {
    id: "campaign-spicecraft",
    kind: "campaign",
    name: "COLD-PRESSED BLENDS",
    brandMeta: "SpiceCraft · verified brand · apply by 25 Oct",
    brief: "Recipe Reel demonstrating stone-ground artisanal spices.",
    tags: ["Sales", "Instagram", "1 Reel"],
    photo: C.campaignVitaminc,
    fit: "★ 87% fit for you",
    fee: "₹12–15K",
    posts: "1 post",
    niche: "Food",
  },
  {
    id: "rohit",
    kind: "creator",
    theme: "dark",
    name: "Rohit Verma",
    displayName: "ROHIT VERMA",
    handle: "Tech reviewer · @rohitgadgets",
    bio: "Unbiased gadget breakdowns and real battery stress tests.",
    tags: ["Smartphones", "Audio", "Unboxing"],
    photo: C.photoAditi,
    fit: "★ 95 fit score",
    niche: "Tech",
    followers: "5.4 L",
    engagement: "7.8%",
  },
  {
    id: "campaign-soundpulse",
    kind: "campaign",
    name: "ANC HEADPHONES PRO",
    brandMeta: "SoundPulse · verified brand · apply by 30 Oct",
    brief: "Dedicated review video testing spatial audio and travel noise cancelling.",
    tags: ["Product review", "YouTube", "1 Dedicated video"],
    photo: C.campaignDewdrop,
    fit: "★ 94% fit for you",
    fee: "₹25–35K",
    posts: "1 video",
    niche: "Tech",
  },
  {
    id: "ananya",
    kind: "creator",
    theme: "light",
    name: "Ananya Roy",
    displayName: "ANANYA ROY",
    handle: "Fitness coach · @ananyafit",
    bio: "Strength routines, clean eating and recovery for everyday athletes.",
    tags: ["Strength", "Mobility", "Nutrition"],
    photo: C.photoTanya,
    fit: "★ 90 fit score",
    niche: "Fitness",
    followers: "2.2 L",
    engagement: "6.5%",
  },
  {
    id: "campaign-nutrifuel",
    kind: "campaign",
    name: "PLANT PROTEIN LAUNCH",
    brandMeta: "NutriFuel · verified brand · apply by 27 Oct",
    brief: "Post-workout smoothie routine highlighting clean digestion.",
    tags: ["Product launch", "Instagram", "2 Reels · 1 Story"],
    photo: C.campaignVitaminc,
    fit: "★ 91% fit for you",
    fee: "₹15–20K",
    posts: "3 posts",
    niche: "Fitness",
  },
];

export const RUNWAY = {
  width: 1440,
  height: 770,
  centerX: 720,
  centerY: 410,
  stepX: 714,
  stepY: -242.76,
  stepRotate: -4.46,
  interval: 3600,
};
