export interface BlogPost {
  id: string;
  category: string;
  title: string;
  description?: string;
  date: string;
  image: string;
}

export const BLOG_COPY = {
  eyebrow: "INSIGHTS",
  title: "Latest from the blog",
} as const;

/** Exported from the Blog frame in Figma. */
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "ai-matching",
    category: "CREATOR MARKETING",
    title: "How AI matching is changing creator projects in 2026",
    description:
      "AI-powered matching is replacing spreadsheet shortlists. Here’s how brands find better-fit creators in under two hours.",
    date: "12 Aug 2026",
    image: "https://www.figma.com/api/mcp/asset/2aa36347-f15e-49ed-942b-2750706ea061.png",
  },
  {
    id: "partnerships",
    category: "BRAND PARTNERSHIPS",
    title: "Why long-term creator partnerships outperform one-off projects",
    date: "5 Aug 2026",
    image: "https://www.figma.com/api/mcp/asset/10289b8b-680b-4d40-bdc3-4979a3723768.png",
  },
  {
    id: "ugc",
    category: "CREATOR ECONOMY",
    title: "UGC vs influencer content: what actually converts in 2026",
    date: "28 Jul 2026",
    image: "https://www.figma.com/api/mcp/asset/d49e6fe9-4803-4816-aab2-432df4c38787.png",
  },
];

export const CTA_COPY = {
  title: "Ready to run smarter creator projects?",
  body: "Join brands and creators using Floooww to discover the right partners, manage projects end-to-end, and build lasting creator relationships.",
  glow: "https://www.figma.com/api/mcp/asset/756881d4-d927-428e-9969-e41669c906cd.svg",
} as const;
