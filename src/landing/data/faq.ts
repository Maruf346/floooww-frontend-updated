export type FaqCategory = "All" | "Brands" | "Creators" | "Agencies" | "Payments";

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, "All">;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = ["All", "Brands", "Creators", "Agencies", "Payments"];

export const FAQ_COPY = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  description:
    "Everything you need to know about running creator projects on Floooww. Can’t find what you’re looking for? Our team replies within a working day.",
  contactTitle: "Still have questions?",
  contactBody: "Talk to a real person about your next project.",
  contactCta: "Contact us",
  contactEmail: "hello@floooww.com",
} as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-floooww",
    category: "Brands",
    question: "What is Floooww?",
    answer:
      "Floooww runs the whole creator project in one place, from the first brief to the final payout. You set a goal and a budget, we match creators who fit, and you approve every post and pay only on approval.",
  },
  {
    id: "brief-time",
    category: "Brands",
    question: "How long does it take to launch a project?",
    answer:
      "Most briefs take about two minutes. Pick a goal, a budget and the posts you need, and Floooww turns it into a brief creators actually understand. Matched creators usually start accepting within a day.",
  },
  {
    id: "matching",
    category: "Brands",
    question: "How does creator matching work?",
    answer:
      "Every creator gets a Match Score based on audience fit, past performance in your category and your budget. You see the reasons behind every score, and you always make the final call.",
  },
  {
    id: "track-sales",
    category: "Brands",
    question: "Can I track sales from each creator?",
    answer:
      "Yes. Each creator gets their own code and link, so every sale is tracked back to the post that drove it. Results update in real time in your project dashboard.",
  },
  {
    id: "creator-cost",
    category: "Creators",
    question: "Is Floooww free for creators?",
    answer:
      "Always. Creators never pay to join, apply or get paid. Build your profile once and get matched to brand projects that fit your niche and audience.",
  },
  {
    id: "creator-payouts",
    category: "Creators",
    question: "When do creators get paid?",
    answer:
      "As soon as the brand approves your post, the payout is released to your bank account. You can follow every payment, from approval to transfer, in your creator workspace.",
  },
  {
    id: "agencies",
    category: "Agencies",
    question: "Can agencies manage multiple brands?",
    answer:
      "Yes. Agency workspaces let you run projects for many brands side by side, share shortlists with clients, collect approvals and report results, all from one login.",
  },
  {
    id: "agency-roles",
    category: "Agencies",
    question: "Can I invite my team and my clients?",
    answer:
      "Invite teammates with the right role for each person, and give clients view-only or approval access so they only see what they need.",
  },
  {
    id: "payment-safety",
    category: "Payments",
    question: "How are payments kept safe?",
    answer:
      "Budgets are held securely and only released when you approve the work. If a deliverable is missed, the money stays with you. Every transaction comes with a GST-ready invoice.",
  },
  {
    id: "pricing",
    category: "Payments",
    question: "Do I need a credit card to start?",
    answer:
      "No. Signing up is free and no credit card is required. You only add payment details when you are ready to publish your first project.",
  },
];
