export interface FaqDocSection {
  id: string;
  title: string;
  questions: { question: string; answer: string }[];
}

export const FAQ_DOC_SECTIONS: FaqDocSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    questions: [
      {
        question: "Who is Floooww for?",
        answer:
          "Brands and agencies that work with influencers and UGC creators, and creators in India who want paid brand work.",
      },
      {
        question: "How long does it take to set up?",
        answer:
          "About 10 minutes. Create your workspace, connect your accounts, write a brief and invite creators the same day.",
      },
      {
        question: "Which platforms are supported?",
        answer: "Instagram, YouTube, Snapchat and Pinterest.",
      },
      {
        question: "Do creators need an account?",
        answer: "Yes, to accept briefs, upload content and get paid. Joining is free.",
      },
      {
        question: "Can I bring creators I already work with?",
        answer: "Yes. Invite them by handle or email into the same project.",
      },
    ],
  },
  {
    id: "fees",
    title: "Fees",
    questions: [
      {
        question: "Is Floooww free for brands and agencies?",
        answer:
          "Yes. There is no subscription, seat fee or platform fee. You pay only the creator fee agreed in the project.",
      },
      {
        question: "How do creators pay for Floooww?",
        answer:
          "Creators pay a platform & service fee, plus applicable GST, on each transaction. It is deducted from each payment when it is released, and the amount you will receive is shown on every offer before you accept.",
      },
      {
        question: "Are gift projects charged?",
        answer: "No. Gift projects carry no fee for anyone.",
      },
      {
        question: "Do I get invoices?",
        answer:
          "Yes. Every payment has an invoice in Payments, and creators get a GST invoice for the fee in Payouts.",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects & briefs",
    questions: [
      {
        question: "What kinds of projects can I run?",
        answer:
          "Influencer marketing or UGC content; paid or gift exchange; one-time or long-term (monthly).",
      },
      {
        question: "What goes into a brief?",
        answer:
          "Platforms, a target such as net sales, orders or views, creator requirements, deliverables by platform and format, budget, usage rights and payment method.",
      },
      {
        question: "Can I edit a project after publishing?",
        answer:
          "You can edit deliverables for individual creators at any time. Changes are sent to the creator to accept.",
      },
      {
        question: "Can I pause a project?",
        answer: "Yes. Projects can be live, upcoming, paused, completed, archived or deleted.",
      },
    ],
  },
  {
    id: "creators",
    title: "Finding creators",
    questions: [
      {
        question: "How do match scores work?",
        answer:
          "Each creator is scored against your project on audience, niche, engagement, location and fee. The reason is shown with every score.",
      },
      {
        question: "Are follower numbers verified?",
        answer: "Statistics come from creators’ connected accounts rather than screenshots.",
      },
      {
        question: "Can I message a creator before inviting them?",
        answer: "Yes. Message them from their profile or from discovery.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & escrow",
    questions: [
      {
        question: "When is a brand charged?",
        answer:
          "When a creator accepts, the fee for their deliverables is held in escrow. Long-term projects are charged at the start of each cycle.",
      },
      {
        question: "When do creators get paid?",
        answer:
          "When the brand approves the deliverable. Payouts usually reach a bank account or UPI within two working days.",
      },
      {
        question: "What if a creator does not deliver?",
        answer:
          "The money held in escrow is refunded to the brand, usually within 5–7 working days.",
      },
      {
        question: "Can I pay outside Floooww?",
        answer: "No. Paying outside removes escrow protection and breaks our terms.",
      },
    ],
  },
  {
    id: "content",
    title: "Content & usage rights",
    questions: [
      {
        question: "What do the upload checks look for?",
        answer: "Format, length, discount code and tags, before the brand reviews the draft.",
      },
      {
        question: "Who owns the content?",
        answer:
          "Creators do. Brands get a licence for the channels, duration and territory in the brief.",
      },
      {
        question: "Can a brand use content longer than agreed?",
        answer:
          "Only by sending a rights request that the creator accepts, with any extra fee paid through escrow.",
      },
    ],
  },
  {
    id: "reports",
    title: "Tracking & reports",
    questions: [
      {
        question: "How are sales tracked?",
        answer:
          "Each deliverable gets a tracking link and discount code. Connect Shopify to count orders and revenue automatically.",
      },
      {
        question: "What is the attribution window?",
        answer: "30 days from the click or code use.",
      },
      {
        question: "Can I export reports?",
        answer: "Yes. Share a link or download any custom report.",
      },
    ],
  },
  {
    id: "agencies",
    title: "Agencies",
    questions: [
      {
        question: "Can I manage several brands?",
        answer: "Yes. Each client gets its own workspace, all from one agency login.",
      },
      {
        question: "Can clients approve content?",
        answer:
          "Yes. Client contacts join as guests with the role you choose and see only their own brand.",
      },
      {
        question: "Can I charge my own fee?",
        answer:
          "Yes. Set an agency fee per client; it is collected with creator fees and you invoice your client.",
      },
    ],
  },
  {
    id: "safety",
    title: "Disputes & safety",
    questions: [
      {
        question: "How are disputes handled?",
        answer:
          "Raise a dispute on the deliverable. The money stays in escrow while both sides add evidence, and Floooww aims to decide within five working days.",
      },
      {
        question: "How do you deal with fake followers?",
        answer:
          "We check connected-account data for unusual activity and review flagged profiles manually.",
      },
      {
        question: "How do I report a problem?",
        answer: "Contact us and choose the topic that fits. We reply within one working day.",
      },
    ],
  },
];
