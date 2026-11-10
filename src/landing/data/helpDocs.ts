export interface HelpDocSection {
  id: string;
  title: string;
  guides: { title: string; body: string }[];
}

export const HELP_DOC_SECTIONS: HelpDocSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    guides: [
      {
        title: "Create your workspace",
        body: "Sign up as a brand, agency or creator, verify your email and add your business or profile details.",
      },
      {
        title: "Invite your team",
        body: "Settings › Team, then Invite member. Choose a role and, for agencies, the clients or projects they can access.",
      },
      {
        title: "Connect your accounts",
        body: "Settings › Connections. Creators connect Instagram, YouTube, Snapchat or Pinterest; brands can connect Shopify.",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects & briefs",
    guides: [
      {
        title: "Create a project",
        body: "Projects › Create new project and follow the nine steps: type, partnership, duration, details, creator requirements, deliverables, budget, payment method, review & publish. Drafts save automatically.",
      },
      {
        title: "Set usage rights",
        body: "In Deliverables, choose channels, duration and territory for each piece of content.",
      },
      {
        title: "Pause, complete or archive",
        body: "Open the project, then use the menu at the top right.",
      },
    ],
  },
  {
    id: "creators",
    title: "Finding creators",
    guides: [
      {
        title: "Search and filter",
        body: "Creator discovery, then choose the project you are casting for so match scores reflect it. Filter by platform, followers, engagement, audience, location, niche, language and fee.",
      },
      {
        title: "Save and invite",
        body: "Save creators to a list, or select Invite to project to send the brief, deliverables and fee.",
      },
    ],
  },
  {
    id: "content",
    title: "Content & approvals",
    guides: [
      {
        title: "Review a draft",
        body: "Content hub › To review. Open the draft, check the upload checks, then Approve or Request changes with a note.",
      },
      {
        title: "Usage rights alerts",
        body: "Assets with rights ending in the next 30 days are flagged in the content hub.",
      },
      {
        title: "Review a creator",
        body: "After the project ends, open the creator in the project and rate them on eight criteria.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & escrow",
    guides: [
      {
        title: "See what is held and released",
        body: "Payments › Overview shows held amounts, upcoming releases and holds, and spend by month.",
      },
      {
        title: "Refunds",
        body: "Refunds happen automatically and appear in Payments › Refunds with the reason.",
      },
      {
        title: "Raise a dispute",
        body: "Open the deliverable, choose Raise a dispute, pick a reason and add evidence. Money stays frozen until Floooww decides.",
      },
    ],
  },
  {
    id: "payouts",
    title: "For creators: payouts",
    guides: [
      {
        title: "Add your payout details",
        body: "Settings › Payouts & tax. Add your bank account or UPI ID and PAN, and complete verification before your first payout.",
      },
      {
        title: "How the fee works",
        body: "Creators pay a platform & service fee, plus applicable GST, on each transaction. It is deducted from each payment when it is released, and the amount you will receive is shown on every offer before you accept.",
      },
      {
        title: "When payouts arrive",
        body: "Usually within two working days of the brand approving your deliverable.",
      },
    ],
  },
  {
    id: "reports",
    title: "Tracking & reports",
    guides: [
      {
        title: "Links and codes",
        body: "Created automatically for every deliverable when a creator accepts.",
      },
      {
        title: "Connect Shopify",
        body: "Settings › Connections › Shopify, then sign in to your store.",
      },
      {
        title: "Build a custom report",
        body: "Custom reports › New report. Set filters once, add blocks, then save, share or download.",
      },
    ],
  },
  {
    id: "agencies",
    title: "Agencies",
    guides: [
      {
        title: "Add a client",
        body: "Clients › Add client: about the client, store, and team & access.",
      },
      { title: "Set your agency fee", body: "Settings › Billing & tax › Fee rules, per client." },
    ],
  },
  {
    id: "security",
    title: "Account & security",
    guides: [
      { title: "Turn on two-step sign-in", body: "Settings › Security › Two-step sign-in." },
      {
        title: "Close your account",
        body: "Settings › Account › Close account, once open projects are finished.",
      },
    ],
  },
  {
    id: "need-help",
    title: "Still need help?",
    guides: [
      { title: "Chat with us", body: "In the app, Monday to Saturday, 9 am to 9 pm IST." },
      {
        title: "Contact us",
        body: "Choose a topic and tell us what happened. We reply within one working day.",
      },
    ],
  },
];
