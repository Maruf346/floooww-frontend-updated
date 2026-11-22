import { asset } from "@/common/utils/asset";

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const BLOG_COPY = {
  eyebrow: "INSIGHTS",
  title: "Latest from the blog",
} as const;

export const BLOG_CATEGORIES = [
  "All",
  "Guides",
  "Brand partnerships",
  "Creator economy",
  "Payments",
  "Reports",
  "Festive season",
] as const;

export const FEATURED_POST: BlogPost = {
  id: "match-scores-2026",
  slug: "match-scores-2026",
  category: "Matching",
  title: "How match scores are changing creator projects in 2026",
  description:
    "Why brands are moving from follower counts to fit: audience, niche and past results.",
  date: "8 Oct 2026",
  readTime: "6 min read",
  image: asset("blog/featured-matching.png"),
  featured: true,
  author: {
    name: "Ananya Mehta",
    role: "Writes about creator marketing and measurement for the Kreyio blog.",
    avatar: asset("blog/author-ananya.png"),
  },
};

/** All articles from Figma WEB-03 and WEB-03b */
export const BLOG_POSTS: BlogPost[] = [
  FEATURED_POST,
  {
    id: "brand-partnerships",
    slug: "brand-partnerships",
    category: "Brand partnerships",
    title: "Why long-term creator partnerships beat one-off posts",
    description: "Why ambassador programmes tend to deliver steadier results.",
    date: "2 Oct 2026",
    readTime: "5 min read",
    image: asset("blog/card-partnerships.png"),
  },
  {
    id: "ugc-vs-influencer",
    slug: "ugc-vs-influencer",
    category: "Creator economy",
    title: "UGC against influencer content: what actually converts",
    description: "A side-by-side look at reach, cost and sales.",
    date: "25 Sep 2026",
    readTime: "7 min read",
    image: asset("blog/card-ugc.png"),
  },
  {
    id: "escrow-payments",
    slug: "escrow-payments",
    category: "Payments",
    title: "How escrow makes creator payments fair for both sides",
    description: "Fund on acceptance, release on approval, refund if not delivered.",
    date: "18 Sep 2026",
    readTime: "4 min read",
    image: asset("blog/card-escrow.png"),
  },
  {
    id: "tracking-links-codes",
    slug: "tracking-links-codes",
    category: "Reports",
    title: "Tracking links and codes: measuring what each creator sold",
    description: "Set up links and codes so every order is credited to the right creator.",
    date: "11 Sep 2026",
    readTime: "6 min read",
    image: asset("blog/card-reports.png"),
  },
  {
    id: "diwali-timeline",
    slug: "diwali-timeline",
    category: "Festive season",
    title: "Planning a Diwali creator project: a 6-week timeline",
    description: "From brief to last post, with the dates that matter.",
    date: "4 Sep 2026",
    readTime: "8 min read",
    image: asset("blog/card-diwali.png"),
  },
  {
    id: "creator-fees-india",
    slug: "creator-fees-india",
    category: "Guides",
    title: "Creator fees in India: what to expect in 2026",
    description: "How fees vary by tier, platform and format.",
    date: "28 Aug 2026",
    readTime: "6 min read",
    image: asset("blog/card-fees.png"),
  },
];

export const CTA_COPY = {
  title: "Ready to run smarter creator projects?",
  body: "Join brands and creators using Kreyio to discover the right partners, manage projects end-to-end, and build lasting creator relationships.",
  glow: asset("blog/cta-glow.svg"),
} as const;
