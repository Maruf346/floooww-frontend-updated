export interface WhyFeature {
  id: string;
  number: string;
  kicker: string;
  title: string;
  body: string;
  metric: string;
  cta: string;
}

export const WHY_COPY = {
  eyebrow: "WHY FLOOOWW",
  title: { before: "Everything you need to run", highlight: " better projects" },
  description: "Find the creators who fit, then run every project with them in one place.",
};

/* Figma "Why Floooww · scroll (sticky)" Feature=1…4 (1845:612, 869:1388, 869:1487, 869:1586). */
export const WHY_FEATURES: WhyFeature[] = [
  {
    id: "matching",
    number: "01",
    kicker: "Intelligent matching",
    title: "AI Creator Matching",
    body: "Floooww ranks creators by how well their audience fits your goal. Then it shows you why, so you’re never guessing.",
    metric: "94.8% match accuracy",
    cta: "Explore feature →",
  },
  {
    id: "workflow",
    number: "02",
    kicker: "Workflow engine",
    title: "End-to-End Project Flow",
    body: "Every step of the project lives in one place, so nothing gets lost in a spreadsheet or a WhatsApp thread.",
    metric: "Zero spreadsheets",
    cta: "Explore feature →",
  },
  {
    id: "escrow",
    number: "03",
    kicker: "Escrow protection",
    title: "Long-Term Partnerships",
    body: "Work with the same creators month after month. Each payment waits in escrow until you approve the work, so both sides feel safe.",
    metric: "100% funds protected",
    cta: "Explore feature →",
  },
  {
    id: "analytics",
    number: "04",
    kicker: "Real-time reporting",
    title: "Project & Performance Analytics",
    body: "Every sale traces back to the creator and the post behind it. So next month’s budget goes to what actually worked.",
    metric: "3.8× average ROI",
    cta: "Explore feature →",
  },
];

/* Scene content, verbatim from the Figma card panels. */
export const WHY_SCENES = {
  matching: {
    live: "3 new creators matched today",
    name: "Meera Iyer",
    handle: "@meerabeauty · Mumbai · 1.12 L",
    score: "96%",
    scoreLabel: "match",
    reasonsTitle: "WHY MEERA FITS",
    reasons: [
      "84% of followers are women, 18–34",
      "Skincare posts sold 4.8× their fee",
      "Posts in Hindi and English",
    ],
  },
  workflow: {
    live: "Meera Iyer accepted · just now",
    title: "Vitamin-C Serum",
    subtitle: "Brief · sales & conversions",
    status: "Draft",
    rows: [
      { label: "Posts", value: "2 Reels · 1 Story" },
      { label: "Creators", value: "16 · 10K – 5 L" },
      { label: "Content due", value: "28 Oct" },
    ],
    toggle: "Approve drafts before they go live",
    cta: "Publish brief",
  },
  escrow: {
    live: "Auto-renewed for January",
    title: "Meera Iyer × Minimalist",
    subtitle: "Monthly partnership · Month 3 of 6",
    months: [
      { label: "Oct", state: "done" },
      { label: "Nov", state: "done" },
      { label: "Dec", state: "current" },
      { label: "Jan", state: "upcoming" },
      { label: "Feb", state: "upcoming" },
      { label: "Mar", state: "upcoming" },
    ] as { label: string; state: "done" | "current" | "upcoming" }[],
    escrowTitle: "₹30,000 held in escrow",
    escrowBody: "Released when you approve December’s reel",
  },
  analytics: {
    live: "+28 orders in the last hour",
    label: "NET SALES · VITAMIN-C SERUM",
    value: "₹4,12,800",
    delta: "↑ 3.8× ROI",
    /** Bar heights (px) in the 91.4 px chart; the last bar is the highlight. */
    bars: [
      17.772, 22.85, 20.311, 30.466, 27.927, 38.083, 35.544, 48.238, 45.699, 58.394, 66.01, 81.244,
    ],
    orders: "392 orders",
    attribution: "code MEERA36 · Meera Iyer",
  },
};
