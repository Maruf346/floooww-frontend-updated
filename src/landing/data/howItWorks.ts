import { ASSETS } from "@/common/constants/assets";

export type Audience = "brands" | "creators";

/** Inline text run; `tone` colours a highlighted phrase over the photo. */
export interface TextRun {
  text: string;
  tone?: "sky" | "amber";
}

/**
 * Building blocks of the glass cards in the media deck (Figma "Slider" slides).
 * Sizes in the renderer are the active (1×) Figma values; queued cards are scaled 0.9.
 */
export type SlideBlock =
  | { kind: "title"; text: string }
  | {
      kind: "row";
      label: string;
      value: string;
      strong?: boolean;
      tone?: "success";
      size?: "md" | "sm";
    }
  | { kind: "button"; label: string }
  | { kind: "buttons"; secondary: string; primary: string }
  | { kind: "people"; people: { name: string; meta: string; fit: string; avatar: string }[] }
  | {
      kind: "entity";
      tile: string;
      title: string;
      meta: string;
      badge?: string;
      titleSize: "md" | "sm";
    }
  | { kind: "avatarEntity"; avatar: string; title: string; meta: string }
  | { kind: "stats"; stats: { value: string; label: string }[] }
  | { kind: "success"; title: string; meta: string }
  | {
      kind: "thumb";
      image: string;
      title: string;
      meta: string;
      note?: string;
      progress?: boolean;
      compact?: boolean;
    }
  | { kind: "info"; text: string }
  | { kind: "amount"; text: string };

export interface HowItWorksStep {
  id: string;
  label: string;
  title: string;
  body: string;
  media: string;
  intro: TextRun[];
  status: string;
  slide: SlideBlock[];
}

export const HOW_IT_WORKS_COPY = {
  eyebrow: "HOW IT WORKS",
  audiences: [
    { value: "brands", label: "For brands" },
    { value: "creators", label: "For creators" },
  ] as { value: Audience; label: string }[],
};

const H = ASSETS.howItWorks;

/* Figma 844:1170 → 844:1391 (Audience=Brands, Step=1…5). */
const BRAND_STEPS: HowItWorksStep[] = [
  {
    id: "brief",
    label: "Brief it",
    title: "Brief it in two minutes.",
    body: "Pick a goal, a budget and the posts you need. Floooww turns it into a brief creators actually understand.",
    media: H.brandMedia[0],
    intro: [
      { text: "Launch our monsoon SPF with " },
      { text: "16 creators", tone: "sky" },
      { text: ", a " },
      { text: "₹2 L budget", tone: "amber" },
      { text: " and " },
      { text: "every sale tracked", tone: "sky" },
      { text: " to a code." },
    ],
    status: "Draft saved",
    slide: [
      { kind: "title", text: "New project brief" },
      { kind: "row", label: "Project", value: "Vitamin-C Serum" },
      { kind: "row", label: "Objective", value: "Sales & conversions" },
      { kind: "row", label: "Budget", value: "₹2,00,000" },
      { kind: "row", label: "Posts", value: "2 Reels · 1 Story" },
      { kind: "row", label: "Creators", value: "16 · 10K – 5 L followers" },
      { kind: "button", label: "Publish project →" },
    ],
  },
  {
    id: "find",
    label: "Find the right creators",
    title: "Creators who fit, not just creators who are big.",
    body: "Every applicant arrives with a fit score and real stats from their connected accounts.",
    media: H.brandMedia[1],
    intro: [
      { text: "Meera Iyer · " },
      { text: "96% fit", tone: "sky" },
      { text: " · audience " },
      { text: "84% women", tone: "amber" },
      { text: ", 18–34, mostly Mumbai and Chennai." },
    ],
    status: "16 applicants",
    slide: [
      { kind: "title", text: "Applicants · Vitamin-C Serum" },
      {
        kind: "people",
        people: [
          { name: "Meera Iyer", meta: "Beauty · 1.12 L", fit: "96% fit", avatar: H.avatarMeera },
          { name: "Aditi Sharma", meta: "Beauty · 4.2 L", fit: "94% fit", avatar: H.avatarAditi },
          { name: "Ishita Rao", meta: "Skincare · 64K", fit: "88% fit", avatar: H.avatarIshita },
        ],
      },
    ],
  },
  {
    id: "approve",
    label: "Approve every post",
    title: "Nothing goes live until you say so.",
    body: "Approve every draft, or ask for changes with a note on the exact moment.",
    media: H.brandMedia[2],
    intro: [
      { text: "Reel 2 looks great, just add " },
      { text: "MEERA36", tone: "sky" },
      { text: " on screen at " },
      { text: "0:12", tone: "amber" },
      { text: " before it goes live." },
    ],
    status: "1 change asked",
    slide: [
      {
        kind: "thumb",
        image: H.reelThumb,
        title: "Reel 2 · gifting edit",
        meta: "Meera Iyer · sent for approval",
        note: "“Add MEERA36 on screen at 0:12”",
      },
      { kind: "buttons", secondary: "Ask for changes", primary: "Approve ✓" },
    ],
  },
  {
    id: "pay",
    label: "Pay on approval",
    title: "Nobody chases money.",
    body: "The fee sits in escrow before work starts and is released the moment you approve.",
    media: H.brandMedia[3],
    intro: [
      { text: "₹30,000 " },
      { text: "held safely", tone: "sky" },
      { text: " since 7 Oct. Released the day you " },
      { text: "tap approve", tone: "amber" },
      { text: "." },
    ],
    status: "Escrow · released",
    slide: [
      { kind: "title", text: "Payment · Vitamin-C Serum" },
      { kind: "row", label: "Held in escrow since 7 Oct", value: "₹30,000", size: "sm" },
      { kind: "row", label: "Reel 2 approved", value: "28 Oct", size: "sm" },
      {
        kind: "success",
        title: "Released to Meera Iyer",
        meta: "HDFC ···· 4821 · arrives in 2 working days",
      },
    ],
  },
  {
    id: "results",
    label: "See who sold",
    title: "Know who actually sold.",
    body: "Every order is traced to the creator, the post and the code that brought it.",
    media: H.brandMedia[4],
    intro: [
      { text: "392 orders", tone: "sky" },
      { text: " from one creator. Code MEERA36 and one link. " },
      { text: "₹1,42,800", tone: "amber" },
      { text: " in sales." },
    ],
    status: "392 orders",
    slide: [
      { kind: "title", text: "Results · Vitamin-C Serum" },
      {
        kind: "stats",
        stats: [
          { value: "₹4,12,800", label: "Net sales" },
          { value: "2.1×", label: "Return" },
          { value: "1,124", label: "Orders" },
        ],
      },
      {
        kind: "row",
        label: "Top creator · Meera Iyer",
        value: "₹1,42,800",
        strong: true,
        size: "sm",
      },
      { kind: "row", label: "Code MEERA36", value: "236 orders", size: "sm" },
      { kind: "row", label: "flw.to/meera-diwali", value: "156 orders", size: "sm" },
    ],
  },
];

/* Figma 846:1186 → 846:1469 (Audience=Creators, Step=1…5). */
const CREATOR_STEPS: HowItWorksStep[] = [
  {
    id: "find",
    label: "Find your projects",
    title: "Projects that fit you find you.",
    body: "Every project shows your fit, the fee range and what you’d post, before you apply.",
    media: H.creatorMedia[0],
    intro: [{ text: "Minimalist wants a monsoon routine: your audience is a 96% fit." }],
    status: "Matched to you",
    slide: [
      {
        kind: "entity",
        tile: "GS",
        title: "Monsoon Sunscreen",
        meta: "Minimalist · Awareness",
        badge: "96% fit",
        titleSize: "md",
      },
      { kind: "row", label: "Fee range", value: "₹15,000 – ₹20,000" },
      { kind: "row", label: "You’d post", value: "1 Reel + 2 Stories" },
      { kind: "row", label: "Apply by", value: "2 Nov" },
      { kind: "button", label: "Apply" },
    ],
  },
  {
    id: "fee",
    label: "Know your fee",
    title: "Know the money before you say yes.",
    body: "Every offer shows what you’ll receive. Accept it, or ask for more with one tap.",
    media: H.creatorMedia[1],
    intro: [
      { text: "Velvet offers ₹15,000. You’ll receive " },
      { text: "₹13,950", tone: "sky" },
      { text: ", or " },
      { text: "ask for more", tone: "amber" },
      { text: "." },
    ],
    status: "Offer · 2 days left",
    slide: [
      {
        kind: "entity",
        tile: "VL",
        title: "Offer · Matte Lip Launch",
        meta: "Velvet Lip Co. · reply by 2 Nov",
        titleSize: "sm",
      },
      { kind: "row", label: "Offer", value: "₹15,000", size: "sm" },
      {
        kind: "row",
        label: "You’ll receive",
        value: "₹13,950",
        strong: true,
        tone: "success",
        size: "sm",
      },
      { kind: "row", label: "Posts", value: "2 Reels", size: "sm" },
      { kind: "buttons", secondary: "Ask for more", primary: "Accept offer" },
    ],
  },
  {
    id: "drafts",
    label: "Share your drafts",
    title: "Send it once. Get one clear answer.",
    body: "Upload your draft, get feedback on the exact second, and know when it’s approved.",
    media: H.creatorMedia[2],
    intro: [{ text: "Story v2 uploaded. Minimalist usually replies within 3 hours." }],
    status: "Waiting for approval",
    slide: [
      {
        kind: "thumb",
        image: H.reelThumb,
        title: "Story · last-minute look",
        meta: "story_v2.mp4 · 24 MB",
        progress: true,
        compact: true,
      },
      { kind: "info", text: "Sent for approval · Minimalist replies within 3 h" },
    ],
  },
  {
    id: "paid",
    label: "Get paid",
    title: "Paid two days after approval. Every time.",
    body: "The brand’s money is in escrow before you start. No invoices, no reminders.",
    media: H.creatorMedia[3],
    intro: [
      { text: "₹25,110", tone: "sky" },
      { text: " on its way to your bank. " },
      { text: "No invoice", tone: "amber" },
      { text: ", no reminder." },
    ],
    status: "Payout sent",
    slide: [
      { kind: "title", text: "Payout" },
      { kind: "amount", text: "₹25,110" },
      { kind: "row", label: "Glow Squad · cycle 1", value: "approved 31 Oct", size: "sm" },
      { kind: "success", title: "Sent to HDFC ···· 4821", meta: "2 Nov · no invoice needed" },
    ],
  },
  {
    id: "pitch",
    label: "Grow your next pitch",
    title: "Your results become your next pitch.",
    body: "Every project adds verified numbers to your media kit for the next brand to see.",
    media: H.creatorMedia[4],
    intro: [
      { text: "12 projects. " },
      { text: "4.9 rating", tone: "sky" },
      { text: ". " },
      { text: "4.8×", tone: "amber" },
      { text: " best return. Your next pitch writes itself." },
    ],
    status: "Profile 92% complete",
    slide: [
      {
        kind: "avatarEntity",
        avatar: H.avatarMeeraKit,
        title: "Meera Iyer · media kit",
        meta: "@meerabeauty · Insights verified",
      },
      {
        kind: "stats",
        stats: [
          { value: "4.9", label: "Brand rating" },
          { value: "12", label: "Projects" },
          { value: "4.8×", label: "Best ROAS" },
        ],
      },
      { kind: "button", label: "Share media kit" },
    ],
  },
];

export const HOW_IT_WORKS_STEPS: Record<Audience, HowItWorksStep[]> = {
  brands: BRAND_STEPS,
  creators: CREATOR_STEPS,
};

export const HOW_IT_WORKS_STEP_COUNT = 5;
