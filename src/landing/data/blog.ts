import { asset } from "@/common/utils/asset";

export interface ArticleSection {
  id: string;
  title: string;
  leadParagraph?: string;
  paragraphs: string[];
  cards?: {
    num?: number;
    title: string;
    description: string;
  }[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  bannerImage?: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags?: string[];
  keyTakeaways?: string[];
  sections?: ArticleSection[];
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

const DEFAULT_AUTHOR = {
  name: "Ananya Mehta",
  role: "Writes about creator marketing and measurement for the Kreyio blog.",
  avatar: asset("blog/author-ananya.png"),
};

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
  bannerImage: asset("blog/article-banner.png"),
  featured: true,
  author: DEFAULT_AUTHOR,
  tags: ["Matching", "Creator discovery", "Guides"],
  keyTakeaways: [
    "Fit beats follower count every time.",
    "Every match score comes with the reason behind it.",
    "Keep one or two newer creators in every project.",
  ],
  sections: [
    {
      id: "the-shift",
      title: "The shift",
      leadParagraph:
        "For years, brands picked creators by follower count. In 2026 that is changing fast. The brands getting the best results now look at fit: who the creator’s audience is, what they usually post, and what happened the last time they worked with a brand like yours.",
      paragraphs: [
        "The old way rewarded reach. A large audience looked safe, even when most of it had little to do with the product. Fit asks a sharper question: will the people watching this creator actually want what you sell?",
      ],
    },
    {
      id: "what-a-match-score-looks-at",
      title: "What a match score looks at",
      leadParagraph:
        "A match score is not a popularity contest. It compares your brief with each creator on four things:",
      paragraphs: [],
      cards: [
        {
          num: 1,
          title: "Audience",
          description: "Age, gender and city against the people you want to reach.",
        },
        {
          num: 2,
          title: "Niche",
          description: "How often the creator posts about your category.",
        },
        {
          num: 3,
          title: "Results",
          description: "Engagement, clicks and sales from past projects on Kreyio.",
        },
        {
          num: 4,
          title: "Reliability",
          description: "On-time delivery and brand reviews.",
        },
      ],
    },
    {
      id: "watch-match-scores",
      title: "Watch: match scores in 2 minutes",
      paragraphs: [
        "A two-minute walkthrough of match scores inside Kreyio: filters, reasons and shortlisting.",
      ],
    },
    {
      id: "what-the-numbers-show",
      title: "What the numbers show",
      paragraphs: [
        "When brands shortlist on fit, they usually end up with a mix: a few established creators and several smaller ones whose audiences match the product closely. The smaller creators often cost less and convert better.",
      ],
      quote: {
        text: "Our best seller had a fifth of the followers of our first pick, and sold three times as much.",
        author: "Sample quote: replace with a real customer before publishing",
      },
    },
    {
      id: "what-this-means-for-you",
      title: "What this means for you",
      paragraphs: [
        "Start with a clear brief, then shortlist on match score, not follower count. Check the reason shown under each score, and keep one or two newer creators in every project so you can find your next breakout.",
      ],
    },
  ],
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
    bannerImage: asset("blog/brand-partnerships.png"),
    author: DEFAULT_AUTHOR,
    tags: ["Brand partnerships", "Ambassadors", "Strategy"],
    keyTakeaways: [
      "Repeat creator mentions outperform single transactional posts by up to 2.8x.",
      "Long-term agreements allow creators to deeply understand your brand tone and product nuances.",
      "Retainer contracts protect your marketing budget from sudden festive price spikes.",
    ],
    sections: [
      {
        id: "one-off-fatigue",
        title: "The one-off post fatigue",
        leadParagraph:
          "Single-post sponsorships feel transactional to audiences and stressful to brand managers. Viewers spot a one-off paid promo from a mile away, and creators have little incentive to optimize for conversions after the 24-hour cycle closes.",
        paragraphs: [
          "When a creator recommends a skincare routine or a fintech app once, followers register mild curiosity. When the same creator naturally incorporates it over four months, that curiosity turns into high-intent purchasing behavior.",
        ],
      },
      {
        id: "compounding-trust",
        title: "Compounding audience trust",
        leadParagraph:
          "Audience trust takes time to transfer. In multi-month partnerships, creators can showcase real progression, unboxings, long-term wear tests, and honest customer FAQs that a single 60-second reel could never pack in.",
        paragraphs: [
          "Data across Kreyio shows that conversions per post peak during months 2 and 3 of an ambassador contract, not in month 1.",
        ],
      },
      {
        id: "commercial-efficiency",
        title: "Predictable budgets and retainer pricing",
        leadParagraph:
          "Negotiating standalone briefs twelve times a year drains operational bandwidth and leads to fluctuating rate cards.",
        paragraphs: [
          "A quarterly or biannual commitment offers creators income predictability. In exchange, brands regularly secure 20% to 35% better rates alongside bundled usage rights and whitelist permissions.",
        ],
      },
      {
        id: "getting-started",
        title: "How to structure your first retainer",
        leadParagraph:
          "Start by testing 5-8 creators on single deliverables. Identify the top 20% who delivered on-time assets with strong engagement, then transition them to 3-month contracts with milestone-based payouts.",
        paragraphs: [
          "Floooww's project escrow automates monthly milestone releases upon review, ensuring seamless retainers for both brands and creators.",
        ],
      },
    ],
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
    bannerImage: asset("blog/creator-economy.png"),
    author: DEFAULT_AUTHOR,
    tags: ["Creator economy", "UGC", "Performance ads"],
    keyTakeaways: [
      "UGC shines for paid media ads with direct-response hooks and product demos.",
      "Influencer posts dominate brand prestige, social proof, and organic community reach.",
      "The highest-converting brands use creators as production studios to feed their Meta and Google ad pipelines.",
    ],
    sections: [
      {
        id: "defining-the-difference",
        title: "Defining the difference",
        leadParagraph:
          "User-Generated Content (UGC) is created for the brand to distribute through its own channels and paid ad accounts. Influencer marketing relies on the creator distributing the message to their own following.",
        paragraphs: [
          "Understanding this distinction prevents brands from overpaying for distribution when what they really need is high-converting creative assets for performance marketing.",
        ],
      },
      {
        id: "cost-breakdown",
        title: "Reach, cost, and sales comparison",
        leadParagraph:
          "While an influencer post costs anywhere from ₹25,000 to ₹3,00,000 depending on follower count, pure UGC video production often sits between ₹5,000 and ₹20,000 per asset.",
        paragraphs: [
          "When whitelisted through performance ad campaigns, authentic UGC consistently drives 30-50% lower Cost Per Acquisition (CPA) compared to high-gloss studio commercials.",
        ],
      },
      {
        id: "the-hybrid-model",
        title: "The hybrid model that wins",
        leadParagraph:
          "Rather than choosing one over the other, leading direct-to-consumer brands combine both:",
        paragraphs: [
          "Cast creators with strong on-camera presence to produce 3-4 creative variations (different hooks and call-to-actions), publish one organically, and run the top-performing cuts as dark ads.",
        ],
      },
    ],
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
    author: DEFAULT_AUTHOR,
    tags: ["Payments", "Escrow", "Trust"],
    keyTakeaways: [
      "Creators start work with peace of mind knowing the project budget is 100% funded upfront.",
      "Brands protect capital because escrow releases only after approved deliverables.",
      "Automated 48-hour inspection windows prevent delayed approvals and ghosting.",
    ],
    sections: [
      {
        id: "the-trust-deficit",
        title: "The creator payment problem in India",
        leadParagraph:
          "68% of creators in India cite payment delays as their number one friction point with brands. Conversely, brands constantly worry about paying advances and receiving subpar or missed deliverables.",
        paragraphs: [
          "This mutual lack of trust causes endless back-and-forth negotiations, delayed timelines, and strained relationships.",
        ],
      },
      {
        id: "how-escrow-solves-it",
        title: "How Kreyio Escrow solves both sides",
        leadParagraph:
          "Escrow creates neutral, programmatic trust: brand deposits funds when sending an invitation or accepting an offer. The creator sees the verified funded status immediately.",
        paragraphs: [
          "Once the creator submits deliverables, the brand has a clear inspection period to request revisions or approve. Upon approval, payment is instantly released to the creator's verified account with full GST compliance.",
        ],
      },
    ],
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
    author: DEFAULT_AUTHOR,
    tags: ["Reports", "Attribution", "Analytics"],
    keyTakeaways: [
      "Promo codes see 3.5x higher redemption rates on Instagram Stories compared to link stickers.",
      "Combine UTM query parameters with personalized creator voucher codes for robust tracking.",
      "Real-time sales attribution allows brands to reward top creators with performance kickers.",
    ],
    sections: [
      {
        id: "beyond-vanity",
        title: "Beyond likes and vanity metrics",
        leadParagraph:
          "Impressions and likes don't pay the bills. Modern brand marketers need to report on Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and gross merchandise value generated by every creator tier.",
        paragraphs: [
          "Setting up the right attribution infrastructure before launching any campaign makes the difference between guessing ROI and scaling predictable revenue.",
        ],
      },
      {
        id: "links-vs-codes",
        title: "Tracking links vs exclusive discount codes",
        leadParagraph:
          "In India's mobile-first commerce landscape, in-app browsers often drop cookie attribution across checkout steps.",
        paragraphs: [
          "Coupling unique promo codes (e.g. ISHITA15) with dedicated short URLs provides a dual-safety net that catches orders even when shoppers switch from Instagram to a desktop or shopping app.",
        ],
      },
    ],
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
    author: DEFAULT_AUTHOR,
    tags: ["Festive season", "Diwali", "Campaign planning"],
    keyTakeaways: [
      "Lock creator rosters by early September before rates surge by 40% to 70%.",
      "Account for festive courier delays by shipping samples 3 weeks ahead of scheduled live dates.",
      "Reserve 25% of the total budget for whitelisting and boosting the highest-performing festive reels.",
    ],
    sections: [
      {
        id: "the-festive-window",
        title: "The festive shopping frenzy",
        leadParagraph:
          "Diwali is the single biggest revenue driver for e-commerce, beauty, fashion, and consumer tech in India. Over 45% of annual creator budgets are spent during this 6-week window.",
        paragraphs: [
          "Waiting until late September leads to creator unavailability, inflated fees, and logistical bottlenecks.",
        ],
      },
      {
        id: "six-week-plan",
        title: "The 6-week execution breakdown",
        leadParagraph:
          "Follow this structured roadmap to launch smoothly without midnight fires:",
        paragraphs: [
          "Week 1: Finalize brief, campaign objective, and match scores. Send invitations with locked deliverables.",
          "Week 2-3: Ship product packages and collect initial video concepts.",
          "Week 4: Review drafts, confirm promo codes, and lock schedule.",
          "Week 5-6: Deliverables go live across Dhanteras and Diwali peaks; scale ad spend on winners.",
        ],
      },
    ],
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
    author: DEFAULT_AUTHOR,
    tags: ["Guides", "Pricing", "Creator fees"],
    keyTakeaways: [
      "A transparent 11% creator fee ensures zero payment delays and guaranteed milestone payouts.",
      "Pricing is shifting toward performance-aligned retainers and commercial usage rights.",
      "Engagement rate and niche match matter far more than follower tiers in determining ROI.",
    ],
    sections: [
      {
        id: "pricing-landscape",
        title: "The 2026 creator fee landscape in India",
        leadParagraph:
          "Creator rate cards are maturing rapidly in India. Brands are no longer paying blind retainers based on static follower counts, and creators are pricing based on production effort and usage duration.",
        paragraphs: [
          "Understanding standard benchmarks across nano (5k-25k), micro (25k-100k), macro (100k-500k), and top-tier creators helps you set realistic campaign budgets.",
        ],
      },
      {
        id: "usage-and-whitelisting",
        title: "Standard usage rights vs ad whitelisting",
        leadParagraph:
          "A standard post typically includes 30-day organic feed presence. If your brand wants to run paid ad boosting or whitelisting, creators will quote an additional 30% to 50% for 3 months of usage.",
        paragraphs: [
          "Floooww's invite builder allows brands to explicitly specify usage duration (e.g., '3 months') upfront so rate expectations are locked before production begins.",
        ],
      },
    ],
  },
];

export const CTA_COPY = {
  title: "Ready to run smarter creator projects?",
  body: "Join brands and creators using Kreyio to discover the right partners, manage projects end-to-end, and build lasting creator relationships.",
  glow: asset("blog/cta-glow.svg"),
} as const;
