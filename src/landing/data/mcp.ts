import { ASSETS } from "@/common/constants/assets";

export const MCP_COPY = {
  title: { before: "Run Kreyio from ", highlight: "your AI assistant" },
  description: "Connect, create, collaborate",
  assistants: "Claude, ChatGPT, Claude Code, Cursor",
  featureTitle: "Ask your AI. Kreyio does the work.",
  featureBody:
    "Add Kreyio as a connector, then find creators, check approvals and pull reports from your real data. Invites and payments always ask first.",
  steps: ["Add the Kreyio connector", "Sign in to your workspace", "Ask in plain words"],
  docs: "Read the MCP docs →",
};

const M = ASSETS.mcp;

/* Figma "Assistant app · Claude-style chat (dark)" (2050:2492). */
export const MCP_CHAT = {
  nav: [
    { label: "New chat", icon: M.iconNew, active: true },
    { label: "Search", icon: M.iconSearch },
    { label: "Projects", icon: M.iconProjects },
    { label: "Artifacts", icon: M.iconArtifacts },
    { label: "Scheduled", icon: M.iconScheduled, dot: true },
    { label: "Customize", icon: M.iconCustomize },
  ],
  recents: [
    "Diwali launch shortlist",
    "Vitamin-C Serum approvals",
    "October ROI by creator",
    "Pay Meera for Reel 2",
    "Lip Care gift exchange",
  ],
  user: { initial: "A", name: "Ananya", org: "· Minimalist" },
  chatTitle: "Diwali launch shortlist",
  prompt:
    "Find 3 skincare creators in Mumbai under ₹40K who’ve sold before, and invite them to Vitamin-C Serum.",
  tool: "search_creators",
  answer: "These three fit best. Each has sold skincare through Kreyio before:",
  columns: ["Creator", "Audience", "Past sales", "Fee", "Match"],
  rows: [
    {
      name: "Meera Iyer",
      photo: M.creatorMeera,
      audience: "1.12 L · Mumbai",
      sales: "₹1.4 L",
      fee: "₹30K",
      match: "96%",
    },
    {
      name: "Ishita Rao",
      photo: M.creatorIshita,
      audience: "64K · Mumbai",
      sales: "₹62K",
      fee: "₹18K",
      match: "92%",
    },
    {
      name: "Kavya Reddy",
      photo: M.creatorKavya,
      audience: "2.4 L · Thane",
      sales: "₹98K",
      fee: "₹38K",
      match: "89%",
    },
  ],
  summary: "₹86,000 in total, held in escrow until you approve each post. Send the invites?",
  permission: "Allow Kreyio to use invite_creators?",
  deny: "Deny",
  allow: "Allow once",
  composer: "Reply…",
  project: "Project: Diwali launch ⌄",
  connected: "Connected to Kreyio",
};
