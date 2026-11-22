import { type ReactNode, useState, useMemo } from "react";
import {
  Download,
  MoreHorizontal,
  Share2,
  Users,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { getProject, type ProjectObjective, type Project } from "@/brand/data/projects";
import { Button } from "@/common/components/ui/Button";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { ROUTES } from "@/common/constants/routes";

// --- Types for the 15 Performance Variants ---
export type ObjectiveType = "Awareness" | "Engagement" | "Traffic" | "Lead generation" | "Sales";
export type TypeCategory = "Influencer Paid" | "Influencer Gift exchange" | "UGC";

export interface ScorecardItem {
  label: string;
  value: string;
  detail: string;
  isPositive?: boolean;
}

export interface CreatorRowItem {
  name: string;
  handle: string;
  deliverables: string;
  warning?: string;
  col2: string; // Platform, Product, or Format
  col2Sub?: string;
  status: "Completed" | "Behind" | "In review" | "Posting";
  feeOrProduct: string;
  m1: string;
  m2: string;
  m3: string;
  m4: string;
  m5: string;
  m5Sub?: string;
}

export interface ByCreatorBar {
  name: string;
  value: number; // 0 to 100 for width
  label: string;
  isAboveTarget: boolean;
}

export interface VariantData {
  campaignName: string;
  objective: ObjectiveType;
  projectType: "Influencer" | "UGC";
  partnership: "Paid" | "Gift exchange";
  duration: "One-time" | "Long-term";
  periodText: string;
  scorecards: ScorecardItem[];
  trendTitle: string;
  trendSub: string;
  platformTitle: string;
  platformSub: string;
  platformHero: string;
  platformHeroSub: string;
  platformBars: { label: string; pct: string; sub?: string }[];
  platformDisclaimer: string;
  creatorChartTitle: string;
  creatorChartSub: string;
  targetLineLabel: string;
  creatorBars: ByCreatorBar[];
  sideCardTitle: string;
  sideCardSub: string;
  sideCardStats: { label: string; value: string; detail?: string }[];
  tableHeaders: string[];
  tableRows: CreatorRowItem[];
}

// Complete data dictionary for all 15 variants
export const PERFORMANCE_VARIANTS: Record<string, VariantData> = {
  // 1. Awareness · Influencer Paid
  "Awareness_Influencer Paid": {
    campaignName: "Glow Squad",
    objective: "Awareness",
    projectType: "Influencer",
    partnership: "Paid",
    duration: "Long-term",
    periodText: "Month 3 of 6 · 7 Oct 2026 – 6 Jan 2027",
    scorecards: [
      { label: "Reach", value: "41.2 L", detail: "▲ 22% vs prev.", isPositive: true },
      { label: "Impressions", value: "96.8 L", detail: "▲ 18% vs prev.", isPositive: true },
      { label: "Video views", value: "32.5 L", detail: "▲ 25% vs prev.", isPositive: true },
      { label: "Frequency", value: "2.3×", detail: "healthy · 2–3× is ideal" },
      { label: "Engagement rate", value: "6.1%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹3,10,000", detail: "Estimate · not a cost" },
    ],
    trendTitle: "Reach over time",
    trendSub: "All 6 creators · cumulative reach vs the 45 L target",
    platformTitle: "By platform",
    platformSub: "Share of reach · reach per creator",
    platformHero: "78%",
    platformHeroSub: "of reach came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "62%" },
      { label: "Instagram Stories", pct: "16%" },
      { label: "YouTube Shorts", pct: "22%" },
    ],
    platformDisclaimer: "Reels drove 62% of all awareness; Shorts had 1.8x higher average duration.",
    creatorChartTitle: "Reach by creator",
    creatorChartSub: "Bar = reach · dashed line = 7.5 L target per creator",
    targetLineLabel: "┆ Target 7.5 L per creator · 45 L total",
    creatorBars: [
      { name: "Riya Sen", value: 100, label: "9.8 L · 22%", isAboveTarget: true },
      { name: "Meera Iyer", value: 88, label: "8.6 L · 21%", isAboveTarget: true },
      { name: "Nisha Verma", value: 76, label: "7.4 L · 18%", isAboveTarget: false },
      { name: "Diya Kapoor", value: 62, label: "6.1 L · 15%", isAboveTarget: false },
      { name: "Aditi Joshi", value: 53, label: "5.2 L · 13%", isAboveTarget: false },
    ],
    sideCardTitle: "Reach",
    sideCardSub: "Reach quality and unique viewer volume",
    sideCardStats: [
      { label: "Unique viewers", value: "41.2 L", detail: "92% of target" },
      { label: "Impressions", value: "96.8 L", detail: "2.3x frequency" },
      { label: "CPM", value: "₹55", detail: "per 1,000 reached" },
      { label: "Target reach", value: "45.0 L", detail: "3.8 L remaining" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "FEE", "REACH ↓", "IMPR.", "VIEWS", "FREQ.", "CPM"],
    tableRows: [
      {
        name: "Riya Sen",
        handle: "@riyasen.glow",
        deliverables: "3 of 3 delivered",
        col2: "Instagram · YouTube",
        col2Sub: "3 posts · month 3",
        status: "Completed",
        feeOrProduct: "₹15,000/mo",
        m1: "9.8 L",
        m2: "22.1 L",
        m3: "7.6 L",
        m4: "2.3×",
        m5: "₹46",
        m5Sub: "₹45,000 ÷ 9.8 L",
      },
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "3 of 3 delivered",
        col2: "Instagram",
        col2Sub: "3 posts · month 3",
        status: "Completed",
        feeOrProduct: "₹15,000/mo",
        m1: "8.6 L",
        m2: "19.4 L",
        m3: "6.9 L",
        m4: "2.3×",
        m5: "₹52",
        m5Sub: "₹45,000 ÷ 8.6 L",
      },
      {
        name: "Nisha Verma",
        handle: "@nishaverma",
        deliverables: "3 of 3 delivered",
        col2: "Instagram",
        col2Sub: "3 posts · month 3",
        status: "Completed",
        feeOrProduct: "₹12,000/mo",
        m1: "7.4 L",
        m2: "17.0 L",
        m3: "5.8 L",
        m4: "2.3×",
        m5: "₹49",
        m5Sub: "₹36,000 ÷ 7.4 L",
      },
      {
        name: "Kavya Reddy",
        handle: "@kavyareddy",
        deliverables: "2 of 3 delivered",
        warning: "1 post due 30 Oct",
        col2: "Instagram",
        col2Sub: "3 posts · month 3",
        status: "Behind",
        feeOrProduct: "₹10,000/mo",
        m1: "4.1 L",
        m2: "9.0 L",
        m3: "3.2 L",
        m4: "2.2×",
        m5: "₹73",
      },
    ],
  },

  // 2. Awareness · Influencer Gift exchange
  "Awareness_Influencer Gift exchange": {
    campaignName: "SPF Mini Kit Seeding",
    objective: "Awareness",
    projectType: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    periodText: "8 Oct – 8 Nov 2026 · 11 days left",
    scorecards: [
      { label: "Reach", value: "14.6 L", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Impressions", value: "31.2 L", detail: "▲ 7% vs prev.", isPositive: true },
      { label: "Video views", value: "11.8 L", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Frequency", value: "2.1×", detail: "healthy · 2–3× is ideal" },
      { label: "Engagement rate", value: "6.8%", detail: "▲ 0.5 pt vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹1,10,000", detail: "Estimate · not a cost" },
    ],
    trendTitle: "Reach over time",
    trendSub: "All 12 creators · cumulative reach vs the 15 L target",
    platformTitle: "By platform",
    platformSub: "Share of reach · reach per creator",
    platformHero: "82%",
    platformHeroSub: "of reach came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "68%" },
      { label: "Instagram Stories", pct: "14%" },
      { label: "YouTube Shorts", pct: "18%" },
    ],
    platformDisclaimer: "Unboxing stories drove fast organic views; Reels had highest repeat reach.",
    creatorChartTitle: "Reach by creator",
    creatorChartSub: "Bar = reach · dashed line = 1.25 L target per creator",
    targetLineLabel: "┆ Target 1.25 L per creator · 15 L total",
    creatorBars: [
      { name: "Riya Sen", value: 100, label: "2.4 L · 16%", isAboveTarget: true },
      { name: "Meera Iyer", value: 85, label: "2.0 L · 14%", isAboveTarget: true },
      { name: "Nisha Verma", value: 72, label: "1.7 L · 12%", isAboveTarget: true },
      { name: "Diya Kapoor", value: 50, label: "1.2 L · 8%", isAboveTarget: false },
      { name: "Aditi Joshi", value: 42, label: "1.0 L · 7%", isAboveTarget: false },
    ],
    sideCardTitle: "Reach",
    sideCardSub: "Organic seeding reach and reach per kit sent",
    sideCardStats: [
      { label: "Kits shipped", value: "12", detail: "100% delivered" },
      { label: "Posted rate", value: "83%", detail: "10 of 12 posted" },
      { label: "Cost per reached", value: "₹0.04", detail: "product value ÷ reach" },
      { label: "Target reach", value: "15.0 L", detail: "97% achieved" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "PRODUCT", "REACH ↓", "IMPR.", "VIEWS", "FREQ.", "CPM"],
    tableRows: [
      {
        name: "Riya Sen",
        handle: "@riyasen.glow",
        deliverables: "1 Reel · 1 Story",
        col2: "Instagram",
        col2Sub: "SPF Kit · 1 unit",
        status: "Completed",
        feeOrProduct: "SPF Kit",
        m1: "2.4 L",
        m2: "5.1 L",
        m3: "1.9 L",
        m4: "2.1×",
        m5: "₹21",
      },
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "1 Reel",
        col2: "Instagram",
        col2Sub: "SPF Kit · 1 unit",
        status: "Completed",
        feeOrProduct: "SPF Kit",
        m1: "2.0 L",
        m2: "4.3 L",
        m3: "1.6 L",
        m4: "2.2×",
        m5: "₹25",
      },
    ],
  },

  // 3. Awareness · UGC
  "Awareness_UGC": {
    campaignName: "Sunscreen UGC Pack",
    objective: "Awareness",
    projectType: "UGC",
    partnership: "Paid",
    duration: "One-time",
    periodText: "5 Oct – 5 Nov 2026 · 8 days left",
    scorecards: [
      { label: "Usable videos", value: "16 of 18", detail: "89% of target" },
      { label: "Approval rate", value: "84%", detail: "▲ 6 pt vs prev.", isPositive: true },
      { label: "Revisions", value: "3", detail: "1 open with Tanvi Shah" },
      { label: "Avg. turnaround", value: "4.2 days", detail: "▼ 0.8 days vs prev.", isPositive: true },
      { label: "Files delivered", value: "19", detail: "16 approved · 3 in review" },
      { label: "Cost per usable video", value: "₹3,750", detail: "₹60,000 in fees ÷ 16" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "All 6 creators · approved files vs the 18-video target",
    platformTitle: "By platform",
    platformSub: "Where the approved files are made for",
    platformHero: "12 of 16",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "62%", sub: "10 files" },
      { label: "Instagram · Feed 4:5", pct: "13%", sub: "2 files" },
      { label: "YouTube · Shorts 9:16", pct: "25%", sub: "4 files" },
    ],
    platformDisclaimer: "All approved high-res source files are synced to your Content hub with full rights.",
    creatorChartTitle: "Usable videos by creator",
    creatorChartSub: "Approved files per creator · dashed line = 3 videos each",
    targetLineLabel: "┆ Target 3 per creator · 18 total",
    creatorBars: [
      { name: "Aditi Joshi", value: 100, label: "4 of 4 · 100%", isAboveTarget: true },
      { name: "Prachi Das", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Neha Gupta", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Tanvi Shah", value: 67, label: "2 of 3 · 1 in fix", isAboveTarget: false },
      { name: "Sneha Pai", value: 67, label: "2 of 3 · 1 in review", isAboveTarget: false },
    ],
    sideCardTitle: "Content library",
    sideCardSub: "UGC production pace and delivery status",
    sideCardStats: [
      { label: "Usable files", value: "16", detail: "of 18 contracted" },
      { label: "Approved rate", value: "84%", detail: "target >80%" },
      { label: "Avg. review time", value: "1.4 d", detail: "within 48 h SLA" },
      { label: "Raw files archived", value: "19", detail: "ready for ads" },
    ],
    tableHeaders: ["CREATOR", "FORMAT", "STATUS", "FEE", "FILES ↓", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Aditi Joshi",
        handle: "@aditiglow",
        deliverables: "4 of 4 delivered",
        col2: "Video files",
        col2Sub: "3 videos · 1 photo set",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "4",
        m2: "4",
        m3: "0",
        m4: "3 days",
        m5: "₹2,500",
        m5Sub: "₹10,000 ÷ 4",
      },
      {
        name: "Prachi Das",
        handle: "@prachidas",
        deliverables: "3 of 3 delivered",
        col2: "Video files",
        col2Sub: "3 videos",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "3",
        m2: "3",
        m3: "1",
        m4: "4 days",
        m5: "₹3,333",
        m5Sub: "₹10,000 ÷ 3",
      },
      {
        name: "Tanvi Shah",
        handle: "@tanvishah",
        deliverables: "3 of 3 delivered",
        col2: "Video files",
        col2Sub: "3 videos",
        status: "In review",
        feeOrProduct: "₹10,000",
        m1: "3",
        m2: "2",
        m3: "1 open",
        m4: "5 days",
        m5: "₹5,000",
        m5Sub: "₹10,000 ÷ 2",
      },
      {
        name: "Kritika Sharma",
        handle: "@kritikaskincare",
        deliverables: "1 of 3 delivered",
        warning: "2 videos due 30 Oct",
        col2: "Video files",
        col2Sub: "3 videos",
        status: "Behind",
        feeOrProduct: "₹10,000",
        m1: "—",
        m2: "—",
        m3: "—",
        m4: "—",
        m5: "—",
      },
    ],
  },

  // 4. Engagement · Influencer Paid
  "Engagement_Influencer Paid": {
    campaignName: "Niacinamide Serum",
    objective: "Engagement",
    projectType: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    periodText: "5 Oct – 5 Nov 2026 · 8 days left",
    scorecards: [
      { label: "Total Engagement", value: "1.46 L", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.8%", detail: "▲ 1.3 pt vs 4.5% target", isPositive: true },
      { label: "Saves", value: "12.4K", detail: "▲ 21% vs prev.", isPositive: true },
      { label: "Shares", value: "6,850", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Comments", value: "9,320", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Views", value: "25.2 L", detail: "▲ 10% vs prev.", isPositive: true },
    ],
    trendTitle: "Engagements over time",
    trendSub: "All 8 creators · daily engagements with the engagement-rate line",
    platformTitle: "By platform",
    platformSub: "Share of engagements · engagement rate",
    platformHero: "84%",
    platformHeroSub: "of engagements came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "62%", sub: "6.4% ER" },
      { label: "Instagram Stories", pct: "22%", sub: "4.1% ER" },
      { label: "YouTube Shorts", pct: "16%", sub: "5.2% ER" },
    ],
    platformDisclaimer: "Saves & shares represent 22% of interactions, signaling high intent save-for-later value.",
    creatorChartTitle: "Engagement rate by creator",
    creatorChartSub: "Who drove engagement · bar = engagement rate, dashed line = 4.5% target",
    targetLineLabel: "┆ Target 4.5% · category avg. 3.1%",
    creatorBars: [
      { name: "Nisha Verma", value: 100, label: "7.4% · 42.3K", isAboveTarget: true },
      { name: "Riya Sen", value: 93, label: "6.9% · 36.8K", isAboveTarget: true },
      { name: "Meera Iyer", value: 76, label: "5.6% · 28.4K", isAboveTarget: true },
      { name: "Diya Kapoor", value: 69, label: "5.1% · 22.6K", isAboveTarget: true },
      { name: "Aditi Joshi", value: 57, label: "4.2% · 15.9K", isAboveTarget: false },
    ],
    sideCardTitle: "Engagement quality",
    sideCardSub: "High-intent interaction analysis",
    sideCardStats: [
      { label: "Save & share rate", value: "22%", detail: "industry benchmark 12%" },
      { label: "Cost per engagement", value: "₹0.37", detail: "▼ ₹0.05 vs prev." },
      { label: "Positive comment ratio", value: "94%", detail: "sentiment check" },
      { label: "Target ER", value: "4.5%", detail: "currently 5.8% (+1.3 pt)" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "FEE", "ENGAGE. ↓", "ENG. RATE", "SAVES", "POSTS", "COST / ENG."],
    tableRows: [
      {
        name: "Nisha Verma",
        handle: "@nishaverma",
        deliverables: "2 of 2 posted",
        col2: "Instagram",
        col2Sub: "1 Reel · 1 Story",
        status: "Completed",
        feeOrProduct: "₹14,000",
        m1: "42,300",
        m2: "7.4%",
        m3: "3,900",
        m4: "2 of 2",
        m5: "₹0.33",
        m5Sub: "fee ÷ eng.",
      },
      {
        name: "Riya Sen",
        handle: "@riyasen.glow",
        deliverables: "2 of 2 posted",
        col2: "Instagram",
        col2Sub: "1 Reel · 1 Story",
        status: "Completed",
        feeOrProduct: "₹14,000",
        m1: "36,800",
        m2: "6.9%",
        m3: "3,120",
        m4: "2 of 2",
        m5: "₹0.38",
        m5Sub: "fee ÷ eng.",
      },
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "2 of 2 posted",
        col2: "Instagram",
        col2Sub: "1 Reel · 1 Story",
        status: "Completed",
        feeOrProduct: "₹14,000",
        m1: "28,400",
        m2: "5.6%",
        m3: "2,410",
        m4: "2 of 2",
        m5: "₹0.49",
        m5Sub: "fee ÷ eng.",
      },
      {
        name: "Ishita Rao",
        handle: "@ishitarao",
        deliverables: "1 of 2 posted",
        warning: "Reel due 30 Oct",
        col2: "Instagram",
        col2Sub: "1 Reel · 1 Story",
        status: "Behind",
        feeOrProduct: "₹14,000",
        m1: "—",
        m2: "—",
        m3: "—",
        m4: "—",
        m5: "—",
      },
    ],
  },

  // 5. Engagement · Influencer Gift exchange
  "Engagement_Influencer Gift exchange": {
    campaignName: "Hydration Bundle",
    objective: "Engagement",
    projectType: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    periodText: "1 Oct – 31 Oct 2026 · 3 days left",
    scorecards: [
      { label: "Total Engagement", value: "1.46 L", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.8%", detail: "▲ 1.3 pt vs 4.5% target", isPositive: true },
      { label: "Saves", value: "12.4K", detail: "▲ 21% vs prev.", isPositive: true },
      { label: "Shares", value: "6,850", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Comments", value: "9,320", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Views", value: "25.2 L", detail: "▲ 10% vs prev.", isPositive: true },
    ],
    trendTitle: "Engagements over time",
    trendSub: "All 8 creators · daily engagements with the engagement-rate line",
    platformTitle: "By platform",
    platformSub: "Share of engagements · engagement rate",
    platformHero: "84%",
    platformHeroSub: "of engagements came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "62%", sub: "6.4% ER" },
      { label: "Instagram Stories", pct: "22%", sub: "4.1% ER" },
      { label: "YouTube Shorts", pct: "16%", sub: "5.2% ER" },
    ],
    platformDisclaimer: "Gifted creators posted authentic routine reviews with 42% higher comment engagement.",
    creatorChartTitle: "Engagement rate by creator",
    creatorChartSub: "Who drove engagement · bar = engagement rate, dashed line = 4.5% target",
    targetLineLabel: "┆ Target 4.5% · category avg. 3.1%",
    creatorBars: [
      { name: "Nisha Verma", value: 100, label: "7.4% · 42.3K", isAboveTarget: true },
      { name: "Riya Sen", value: 93, label: "6.9% · 36.8K", isAboveTarget: true },
      { name: "Meera Iyer", value: 76, label: "5.6% · 28.4K", isAboveTarget: true },
      { name: "Diya Kapoor", value: 69, label: "5.1% · 22.6K", isAboveTarget: true },
      { name: "Aditi Joshi", value: 57, label: "4.2% · 15.9K", isAboveTarget: false },
    ],
    sideCardTitle: "Engagement quality",
    sideCardSub: "High-intent interaction analysis for gifted seeding",
    sideCardStats: [
      { label: "Save & share rate", value: "22%", detail: "industry benchmark 12%" },
      { label: "Cost per engagement", value: "₹0.36", detail: "product value ÷ eng." },
      { label: "Positive comment ratio", value: "96%", detail: "routine authenticity" },
      { label: "Target ER", value: "4.5%", detail: "currently 5.8% (+1.3 pt)" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "PRODUCT", "ENGAGE. ↓", "ENG. RATE", "SAVES", "ON TIME", "COST / ENG."],
    tableRows: [
      {
        name: "Nisha Verma",
        handle: "@nishaverma",
        deliverables: "2 of 2 posted",
        col2: "Instagram",
        col2Sub: "Bundle Box · 1 unit",
        status: "Completed",
        feeOrProduct: "Hydration Box",
        m1: "42,300",
        m2: "7.4%",
        m3: "3,900",
        m4: "Yes",
        m5: "₹0.31",
      },
      {
        name: "Riya Sen",
        handle: "@riyasen.glow",
        deliverables: "2 of 2 posted",
        col2: "Instagram",
        col2Sub: "Bundle Box · 1 unit",
        status: "Completed",
        feeOrProduct: "Hydration Box",
        m1: "36,800",
        m2: "6.9%",
        m3: "3,120",
        m4: "Yes",
        m5: "₹0.35",
      },
    ],
  },

  // 6. Engagement · UGC
  "Engagement_UGC": {
    campaignName: "Hydration Mist UGC",
    objective: "Engagement",
    projectType: "UGC",
    partnership: "Paid",
    duration: "One-time",
    periodText: "5 Oct – 5 Nov 2026 · 8 days left",
    scorecards: [
      { label: "Usable videos", value: "16 of 18", detail: "89% of target" },
      { label: "Approval rate", value: "84%", detail: "▲ 6 pt vs prev.", isPositive: true },
      { label: "Revisions", value: "3", detail: "1 open with Tanvi Shah" },
      { label: "Avg. turnaround", value: "4.2 days", detail: "▼ 0.8 days vs prev.", isPositive: true },
      { label: "Files delivered", value: "19", detail: "16 approved · 3 in review" },
      { label: "Cost per usable video", value: "₹3,750", detail: "₹60,000 in fees ÷ 16" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "All 6 creators · approved files vs the 18-video target",
    platformTitle: "By platform",
    platformSub: "Where the approved files are made for",
    platformHero: "12 of 16",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "62%", sub: "10 files" },
      { label: "Instagram · Feed 4:5", pct: "13%", sub: "2 files" },
      { label: "YouTube · Shorts 9:16", pct: "25%", sub: "4 files" },
    ],
    platformDisclaimer: "Files optimized for social ad engagement hooks and user-interaction overlays.",
    creatorChartTitle: "Usable videos by creator",
    creatorChartSub: "Approved files per creator · dashed line = 3 videos each",
    targetLineLabel: "┆ Target 3 per creator · 18 total",
    creatorBars: [
      { name: "Aditi Joshi", value: 100, label: "4 of 4 · 100%", isAboveTarget: true },
      { name: "Prachi Das", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Neha Gupta", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Tanvi Shah", value: 67, label: "2 of 3 · 1 in fix", isAboveTarget: false },
      { name: "Sneha Pai", value: 67, label: "2 of 3 · 1 in review", isAboveTarget: false },
    ],
    sideCardTitle: "Content library",
    sideCardSub: "UGC production pace and delivery status",
    sideCardStats: [
      { label: "Usable files", value: "16", detail: "of 18 contracted" },
      { label: "Approved rate", value: "84%", detail: "target >80%" },
      { label: "Avg. review time", value: "1.4 d", detail: "within 48 h SLA" },
      { label: "Raw files archived", value: "19", detail: "ready for ads" },
    ],
    tableHeaders: ["CREATOR", "FORMAT", "STATUS", "FEE", "FILES ↓", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Aditi Joshi",
        handle: "@aditiglow",
        deliverables: "4 of 4 delivered",
        col2: "Video files",
        col2Sub: "3 videos · 1 photo set",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "4",
        m2: "4",
        m3: "0",
        m4: "3 days",
        m5: "₹2,500",
        m5Sub: "₹10,000 ÷ 4",
      },
      {
        name: "Prachi Das",
        handle: "@prachidas",
        deliverables: "3 of 3 delivered",
        col2: "Video files",
        col2Sub: "3 videos",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "3",
        m2: "3",
        m3: "1",
        m4: "4 days",
        m5: "₹3,333",
        m5Sub: "₹10,000 ÷ 3",
      },
    ],
  },

  // 7. Traffic · Influencer Paid
  "Traffic_Influencer Paid": {
    campaignName: "Sunscreen Stick Launch",
    objective: "Traffic",
    projectType: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    periodText: "10 Oct – 10 Nov 2026 · 13 days left",
    scorecards: [
      { label: "Link clicks", value: "25,400", detail: "▲ 31% vs prev.", isPositive: true },
      { label: "CTR", value: "1.6%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
      { label: "Page views", value: "19,800", detail: "78% of clicks" },
      { label: "Avg. time on site", value: "1m 12s", detail: "▲ 8s vs prev.", isPositive: true },
      { label: "Views", value: "15.9 L", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "4.9%", detail: "▲ 0.2 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Link clicks over time",
    trendSub: "All 10 creators · daily clicks with the CTR line",
    platformTitle: "By platform",
    platformSub: "Share of link clicks · CTR",
    platformHero: "71%",
    platformHeroSub: "of clicks came from Instagram Stories links",
    platformBars: [
      { label: "Instagram Stories · link sticker", pct: "71%", sub: "2.1% CTR" },
      { label: "Instagram Reels · bio link", pct: "11%", sub: "0.8% CTR" },
      { label: "YouTube · description link", pct: "18%", sub: "1.4% CTR" },
    ],
    platformDisclaimer: "Story link stickers had 2.6x higher click volume than bio links with 1m 12s on-site dwell.",
    creatorChartTitle: "Link clicks by creator",
    creatorChartSub: "Clicks per creator · dashed line = 2,500 each",
    targetLineLabel: "┆ Target 2,500 per creator · 25,000 total",
    creatorBars: [
      { name: "Riya Sen", value: 100, label: "6,900 · 2.1% CTR", isAboveTarget: true },
      { name: "Meera Iyer", value: 84, label: "5,800 · 1.8% CTR", isAboveTarget: true },
      { name: "Nisha Verma", value: 59, label: "4,100 · 1.5% CTR", isAboveTarget: true },
      { name: "Aditi Joshi", value: 46, label: "3,200 · 1.4% CTR", isAboveTarget: true },
      { name: "Kavya Reddy", value: 33, label: "2,300 · 1.2% CTR", isAboveTarget: false },
    ],
    sideCardTitle: "Traffic",
    sideCardSub: "Visitor acquisition and on-site behavior",
    sideCardStats: [
      { label: "Landing page views", value: "19,800", detail: "78% click-to-load" },
      { label: "Bounce rate", value: "38%", detail: "▼ 4 pt vs prev." },
      { label: "Cost per click (CPC)", value: "₹3.15", detail: "▼ ₹0.30 vs prev." },
      { label: "Target clicks", value: "25,000", detail: "101.6% achieved" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "FEE", "CLICKS ↓", "CTR", "LANDING", "BOUNCE", "CPC"],
    tableRows: [
      {
        name: "Riya Sen",
        handle: "@riyasen.glow",
        deliverables: "3 of 3 delivered",
        col2: "Instagram",
        col2Sub: "1 link · story sticker",
        status: "Completed",
        feeOrProduct: "₹18,000",
        m1: "6,900",
        m2: "2.1%",
        m3: "5,520",
        m4: "34%",
        m5: "₹2.61",
        m5Sub: "₹18,000 ÷ 6,900",
      },
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "3 of 3 delivered",
        col2: "Instagram · YouTube",
        col2Sub: "2 links",
        status: "Completed",
        feeOrProduct: "₹20,000",
        m1: "5,800",
        m2: "1.8%",
        m3: "4,410",
        m4: "36%",
        m5: "₹3.45",
        m5Sub: "₹20,000 ÷ 5,800",
      },
      {
        name: "Nisha Verma",
        handle: "@nishaverma",
        deliverables: "3 of 3 delivered",
        col2: "Instagram",
        col2Sub: "1 link",
        status: "Completed",
        feeOrProduct: "₹15,000",
        m1: "4,100",
        m2: "1.5%",
        m3: "3,200",
        m4: "41%",
        m5: "₹3.66",
        m5Sub: "₹15,000 ÷ 4,100",
      },
      {
        name: "Diya Kapoor",
        handle: "@diyakapoor",
        deliverables: "1 of 3 delivered",
        warning: "2 posts due 2 Nov",
        col2: "Instagram",
        col2Sub: "1 link",
        status: "Behind",
        feeOrProduct: "₹12,000",
        m1: "—",
        m2: "—",
        m3: "—",
        m4: "—",
        m5: "—",
      },
    ],
  },

  // 8. Traffic · Influencer Gift exchange
  "Traffic_Influencer Gift exchange": {
    campaignName: "Lip Balm Seeding",
    objective: "Traffic",
    projectType: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    periodText: "9 Oct – 9 Nov 2026 · 12 days left",
    scorecards: [
      { label: "Link clicks", value: "6,850", detail: "▲ 18% vs prev.", isPositive: true },
      { label: "CTR", value: "1.9%", detail: "▲ 0.2 pt vs prev.", isPositive: true },
      { label: "Landing page views", value: "5,480", detail: "80% of clicks" },
      { label: "Avg. time on site", value: "58s", detail: "▲ 5s vs prev.", isPositive: true },
      { label: "Views", value: "3.6 L", detail: "▲ 10% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "6.2%", detail: "▲ 0.4 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Link clicks over time",
    trendSub: "All 10 creators · daily clicks with the CTR line",
    platformTitle: "By platform",
    platformSub: "Share of link clicks · CTR",
    platformHero: "71%",
    platformHeroSub: "of clicks came from Instagram Stories links",
    platformBars: [
      { label: "Instagram Stories · link", pct: "71%", sub: "1.9% CTR" },
      { label: "Instagram Bio link", pct: "14%", sub: "0.9% CTR" },
      { label: "YouTube Shorts link", pct: "15%", sub: "1.2% CTR" },
    ],
    platformDisclaimer: "Seeded creators tagged product links in morning routine stories.",
    creatorChartTitle: "Link clicks by creator",
    creatorChartSub: "Clicks per creator · dashed line = 650 each",
    targetLineLabel: "┆ Target 650 per creator · 6,500 total",
    creatorBars: [
      { name: "Riya Sen", value: 100, label: "1,900 · 2.1% CTR", isAboveTarget: true },
      { name: "Meera Iyer", value: 78, label: "1,480 · 1.9% CTR", isAboveTarget: true },
      { name: "Nisha Verma", value: 63, label: "1,200 · 1.7% CTR", isAboveTarget: true },
      { name: "Diya Kapoor", value: 44, label: "840 · 1.5% CTR", isAboveTarget: true },
      { name: "Aditi Joshi", value: 31, label: "600 · 1.3% CTR", isAboveTarget: false },
    ],
    sideCardTitle: "Traffic",
    sideCardSub: "Organic link clicks from seeded product gifting",
    sideCardStats: [
      { label: "Landing page views", value: "5,480", detail: "80% of clicks" },
      { label: "Bounce rate", value: "42%", detail: "organic intent" },
      { label: "Est. value / click", value: "₹2.20", detail: "vs paid ads ₹4.50" },
      { label: "Target clicks", value: "6,500", detail: "105% achieved" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "PRODUCT", "CLICKS ↓", "CTR", "LANDING", "BOUNCE", "CPC"],
    tableRows: [
      {
        name: "Riya Sen",
        handle: "@riyasen.glow",
        deliverables: "1 Story link",
        col2: "Instagram",
        col2Sub: "Balm Box · 1 unit",
        status: "Completed",
        feeOrProduct: "Lip Balm Box",
        m1: "1,900",
        m2: "2.1%",
        m3: "1,520",
        m4: "38%",
        m5: "₹1.80",
      },
    ],
  },

  // 9. Traffic · UGC
  "Traffic_UGC": {
    campaignName: "Lip Tint Drop",
    objective: "Traffic",
    projectType: "UGC",
    partnership: "Paid",
    duration: "One-time",
    periodText: "5 Oct – 5 Nov 2026 · 8 days left",
    scorecards: [
      { label: "Usable videos", value: "16 of 18", detail: "89% of target" },
      { label: "Approval rate", value: "84%", detail: "▲ 6 pt vs prev.", isPositive: true },
      { label: "Revisions", value: "3", detail: "1 open with Tanvi Shah" },
      { label: "Avg. turnaround", value: "4.2 days", detail: "▼ 0.8 days vs prev.", isPositive: true },
      { label: "Files delivered", value: "19", detail: "16 approved · 3 in review" },
      { label: "Cost per usable video", value: "₹3,750", detail: "₹60,000 in fees ÷ 16" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "All 6 creators · approved files vs the 18-video target",
    platformTitle: "By platform",
    platformSub: "Where the approved files are made for",
    platformHero: "12 of 16",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "62%", sub: "10 files" },
      { label: "Instagram · Feed 4:5", pct: "13%", sub: "2 files" },
      { label: "YouTube · Shorts 9:16", pct: "25%", sub: "4 files" },
    ],
    platformDisclaimer: "Content produced specifically for ad click-through optimizations and landing swipes.",
    creatorChartTitle: "Usable videos by creator",
    creatorChartSub: "Approved files per creator · dashed line = 3 videos each",
    targetLineLabel: "┆ Target 3 per creator · 18 total",
    creatorBars: [
      { name: "Aditi Joshi", value: 100, label: "4 of 4 · 100%", isAboveTarget: true },
      { name: "Prachi Das", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Neha Gupta", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Tanvi Shah", value: 67, label: "2 of 3 · 1 in fix", isAboveTarget: false },
      { name: "Sneha Pai", value: 67, label: "2 of 3 · 1 in review", isAboveTarget: false },
    ],
    sideCardTitle: "Content library",
    sideCardSub: "Traffic ad asset production and review turnaround",
    sideCardStats: [
      { label: "Usable files", value: "16", detail: "of 18 contracted" },
      { label: "Approved rate", value: "84%", detail: "target >80%" },
      { label: "Avg. review time", value: "1.4 d", detail: "within 48 h SLA" },
      { label: "Raw files archived", value: "19", detail: "ready for ads" },
    ],
    tableHeaders: ["CREATOR", "FORMAT", "STATUS", "FEE", "FILES ↓", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Aditi Joshi",
        handle: "@aditiglow",
        deliverables: "4 of 4 delivered",
        col2: "Video files",
        col2Sub: "3 videos · 1 photo set",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "4",
        m2: "4",
        m3: "0",
        m4: "3 days",
        m5: "₹2,500",
        m5Sub: "₹10,000 ÷ 4",
      },
      {
        name: "Prachi Das",
        handle: "@prachidas",
        deliverables: "3 of 3 delivered",
        col2: "Video files",
        col2Sub: "3 videos",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "3",
        m2: "3",
        m3: "1",
        m4: "4 days",
        m5: "₹3,333",
        m5Sub: "₹10,000 ÷ 3",
      },
    ],
  },

  // 10. Lead generation · Influencer Paid
  "Lead generation_Influencer Paid": {
    campaignName: "Skin Type Quiz",
    objective: "Lead generation",
    projectType: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    periodText: "12 Oct – 12 Nov 2026 · 15 days left",
    scorecards: [
      { label: "Leads", value: "3,240", detail: "▲ 24% vs prev.", isPositive: true },
      { label: "Sign-up rate", value: "18.6%", detail: "of link clicks" },
      { label: "Link clicks", value: "17,400", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Qualified leads", value: "2,110", detail: "65% of leads" },
      { label: "Views", value: "12.6 L", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.1%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Leads over time",
    trendSub: "All 8 creators · daily quiz sign-ups",
    platformTitle: "By platform",
    platformSub: "Share of leads · sign-up rate",
    platformHero: "82%",
    platformHeroSub: "of leads came from Instagram",
    platformBars: [
      { label: "Instagram Stories · quiz link", pct: "58%", sub: "21% sign-up" },
      { label: "Instagram Reels · code NISHA10", pct: "24%", sub: "16% sign-up" },
      { label: "YouTube · description link", pct: "18%", sub: "15% sign-up" },
    ],
    platformDisclaimer: "Interactive quiz stories achieved 21% completion rate with verified phone/email capture.",
    creatorChartTitle: "Leads by creator",
    creatorChartSub: "Sign-ups per creator · dashed line = 375 each",
    targetLineLabel: "┆ Target 375 per creator · 3,000 total",
    creatorBars: [
      { name: "Meera Iyer", value: 100, label: "980 · 21% sign-up", isAboveTarget: true },
      { name: "Nisha Verma", value: 73, label: "720 · 18% sign-up", isAboveTarget: true },
      { name: "Riya Sen", value: 57, label: "560 · 18% sign-up", isAboveTarget: true },
      { name: "Kavya Reddy", value: 43, label: "420 · 17% sign-up", isAboveTarget: true },
      { name: "Diya Kapoor", value: 34, label: "330 · 15% sign-up", isAboveTarget: false },
    ],
    sideCardTitle: "Leads",
    sideCardSub: "Lead qualification and acquisition economics",
    sideCardStats: [
      { label: "Total sign-ups", value: "3,240", detail: "108% of target" },
      { label: "Qualified rate", value: "65%", detail: "passed skin quiz" },
      { label: "Cost per lead (CPL)", value: "₹37.04", detail: "▼ ₹4.20 vs prev." },
      { label: "Target leads", value: "3,000", detail: "+240 above goal" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "FEE", "CLICKS", "LEADS ↓", "SIGN-UP", "QUALIFIED", "CPL"],
    tableRows: [
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "2 of 2 delivered",
        col2: "Instagram",
        col2Sub: "1 quiz link",
        status: "Completed",
        feeOrProduct: "₹18,000",
        m1: "4,600",
        m2: "980",
        m3: "21%",
        m4: "690",
        m5: "₹18",
        m5Sub: "₹18,000 ÷ 980",
      },
      {
        name: "Nisha Verma",
        handle: "@nishaverma",
        deliverables: "2 of 2 delivered",
        col2: "Instagram · YouTube",
        col2Sub: "2 links · NISHA10",
        status: "Completed",
        feeOrProduct: "₹16,000",
        m1: "3,900",
        m2: "720",
        m3: "18%",
        m4: "470",
        m5: "₹22",
        m5Sub: "₹16,000 ÷ 720",
      },
      {
        name: "Riya Sen",
        handle: "@riyasen.glow",
        deliverables: "2 of 2 delivered",
        col2: "Instagram",
        col2Sub: "1 quiz link",
        status: "Completed",
        feeOrProduct: "₹15,000",
        m1: "3,100",
        m2: "560",
        m3: "18%",
        m4: "350",
        m5: "₹27",
        m5Sub: "₹15,000 ÷ 560",
      },
      {
        name: "Aditi Joshi",
        handle: "@aditiglow",
        deliverables: "0 of 2 delivered",
        warning: "Draft in review",
        col2: "Instagram",
        col2Sub: "1 quiz link",
        status: "Behind",
        feeOrProduct: "₹12,000",
        m1: "—",
        m2: "—",
        m3: "—",
        m4: "—",
        m5: "—",
      },
    ],
  },

  // 11. Lead generation · Influencer Gift exchange
  "Lead generation_Influencer Gift exchange": {
    campaignName: "Skin Quiz Seeding",
    objective: "Lead generation",
    projectType: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    periodText: "11 Oct – 11 Nov 2026 · 14 days left",
    scorecards: [
      { label: "Leads", value: "920", detail: "▲ 16% vs prev.", isPositive: true },
      { label: "Sign-up rate", value: "17.2%", detail: "of link clicks" },
      { label: "Link clicks", value: "5,350", detail: "▲ 11% vs prev.", isPositive: true },
      { label: "Qualified leads", value: "590", detail: "64% of leads" },
      { label: "Views", value: "3.1 L", detail: "▲ 8% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.9%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Leads over time",
    trendSub: "All 8 creators · daily quiz sign-ups",
    platformTitle: "By platform",
    platformSub: "Share of leads · sign-up rate",
    platformHero: "82%",
    platformHeroSub: "of leads came from Instagram",
    platformBars: [
      { label: "Instagram Stories · link", pct: "64%", sub: "18% sign-up" },
      { label: "Instagram Bio link", pct: "18%", sub: "14% sign-up" },
      { label: "YouTube Shorts", pct: "18%", sub: "15% sign-up" },
    ],
    platformDisclaimer: "Gifted creators took the skin quiz on video and shared personalized routine results.",
    creatorChartTitle: "Leads by creator",
    creatorChartSub: "Sign-ups per creator · dashed line = 110 each",
    targetLineLabel: "┆ Target 110 per creator · 880 total",
    creatorBars: [
      { name: "Meera Iyer", value: 100, label: "290 · 19% sign-up", isAboveTarget: true },
      { name: "Nisha Verma", value: 76, label: "220 · 17% sign-up", isAboveTarget: true },
      { name: "Riya Sen", value: 62, label: "180 · 17% sign-up", isAboveTarget: true },
      { name: "Kavya Reddy", value: 41, label: "120 · 16% sign-up", isAboveTarget: true },
      { name: "Diya Kapoor", value: 31, label: "90 · 14% sign-up", isAboveTarget: false },
    ],
    sideCardTitle: "Leads",
    sideCardSub: "Organic product seeding lead acquisition",
    sideCardStats: [
      { label: "Total sign-ups", value: "920", detail: "104% of goal" },
      { label: "Qualified rate", value: "64%", detail: "verified profile" },
      { label: "Estimated CPL", value: "₹18.50", detail: "gift cost ÷ leads" },
      { label: "Target leads", value: "880", detail: "achieved" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM", "STATUS", "PRODUCT", "CLICKS", "LEADS ↓", "SIGN-UP", "QUALIFIED", "CPL"],
    tableRows: [
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "1 quiz story",
        col2: "Instagram",
        col2Sub: "Quiz Kit · 1 unit",
        status: "Completed",
        feeOrProduct: "Quiz Kit",
        m1: "1,520",
        m2: "290",
        m3: "19%",
        m4: "195",
        m5: "₹17",
      },
    ],
  },

  // 12. Lead generation · UGC
  "Lead generation_UGC": {
    campaignName: "Quiz Explainer UGC",
    objective: "Lead generation",
    projectType: "UGC",
    partnership: "Paid",
    duration: "One-time",
    periodText: "5 Oct – 5 Nov 2026 · 8 days left",
    scorecards: [
      { label: "Usable videos", value: "16 of 18", detail: "89% of target" },
      { label: "Approval rate", value: "84%", detail: "▲ 6 pt vs prev.", isPositive: true },
      { label: "Revisions", value: "3", detail: "1 open with Tanvi Shah" },
      { label: "Avg. turnaround", value: "4.2 days", detail: "▼ 0.8 days vs prev.", isPositive: true },
      { label: "Files delivered", value: "19", detail: "16 approved · 3 in review" },
      { label: "Cost per usable video", value: "₹3,750", detail: "₹60,000 in fees ÷ 16" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "All 6 creators · approved files vs the 18-video target",
    platformTitle: "By platform",
    platformSub: "Where the approved files are made for",
    platformHero: "12 of 16",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "62%", sub: "10 files" },
      { label: "Instagram · Feed 4:5", pct: "13%", sub: "2 files" },
      { label: "YouTube · Shorts 9:16", pct: "25%", sub: "4 files" },
    ],
    platformDisclaimer: "Explainer creatives showing quiz walkthrough with dynamic lead hooks.",
    creatorChartTitle: "Usable videos by creator",
    creatorChartSub: "Approved files per creator · dashed line = 3 videos each",
    targetLineLabel: "┆ Target 3 per creator · 18 total",
    creatorBars: [
      { name: "Aditi Joshi", value: 100, label: "4 of 4 · 100%", isAboveTarget: true },
      { name: "Prachi Das", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Neha Gupta", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Tanvi Shah", value: 67, label: "2 of 3 · 1 in fix", isAboveTarget: false },
      { name: "Sneha Pai", value: 67, label: "2 of 3 · 1 in review", isAboveTarget: false },
    ],
    sideCardTitle: "Content library",
    sideCardSub: "Lead generation UGC creative production",
    sideCardStats: [
      { label: "Usable files", value: "16", detail: "of 18 contracted" },
      { label: "Approved rate", value: "84%", detail: "target >80%" },
      { label: "Avg. review time", value: "1.4 d", detail: "within 48 h SLA" },
      { label: "Raw files archived", value: "19", detail: "ready for ads" },
    ],
    tableHeaders: ["CREATOR", "FORMAT", "STATUS", "FEE", "FILES ↓", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Aditi Joshi",
        handle: "@aditiglow",
        deliverables: "4 of 4 delivered",
        col2: "Video files",
        col2Sub: "3 videos · 1 photo set",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "4",
        m2: "4",
        m3: "0",
        m4: "3 days",
        m5: "₹2,500",
        m5Sub: "₹10,000 ÷ 4",
      },
      {
        name: "Prachi Das",
        handle: "@prachidas",
        deliverables: "3 of 3 delivered",
        col2: "Video files",
        col2Sub: "3 videos",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "3",
        m2: "3",
        m3: "1",
        m4: "4 days",
        m5: "₹3,333",
        m5Sub: "₹10,000 ÷ 3",
      },
    ],
  },

  // 13. Sales · Influencer Paid
  "Sales_Influencer Paid": {
    campaignName: "Vitamin-C Serum",
    objective: "Sales",
    projectType: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    periodText: "7 Oct – 7 Nov 2026 · 10 days left",
    scorecards: [
      { label: "Net sales", value: "₹5,42,000", detail: "▲ 18% vs prev.", isPositive: true },
      { label: "Orders", value: "1,315", detail: "▲ 14% vs prev.", isPositive: true },
      { label: "Link clicks", value: "14,800", detail: "▲ 9% vs prev. · CTR 0.8%", isPositive: true },
      { label: "Engagement rate", value: "5.4%", detail: "▲ 0.4 pt vs prev.", isPositive: true },
      { label: "Views", value: "18.4 L", detail: "▲ 19% vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹2,28,000", detail: "Estimate · not in ROAS" },
    ],
    trendTitle: "Net sales over time",
    trendSub: "All 16 creators · Shopify codes and links",
    platformTitle: "By platform",
    platformSub: "Share of net sales · orders",
    platformHero: "74%",
    platformHeroSub: "of net sales came from Instagram",
    platformBars: [
      { label: "Instagram Reels · code", pct: "52%", sub: "410 orders" },
      { label: "Instagram Stories · link", pct: "22%", sub: "184 orders" },
      { label: "YouTube · description link", pct: "26%", sub: "318 orders" },
    ],
    platformDisclaimer: "Codes in Reels drove highest order volume; YouTube links generated highest average basket.",
    creatorChartTitle: "Net sales by creator",
    creatorChartSub: "Net sales per creator · dashed line = ₹50,000 each",
    targetLineLabel: "┆ Target ₹50,000 per creator · ₹8 L total",
    creatorBars: [
      { name: "Meera Iyer", value: 100, label: "₹1,68,000 · 7.6×", isAboveTarget: true },
      { name: "Ishita Rao", value: 72, label: "₹1,21,400 · 7.1×", isAboveTarget: true },
      { name: "Emma Clarke", value: 45, label: "₹76,000 · 5.1×", isAboveTarget: true },
      { name: "Riya Sen", value: 32, label: "₹54,000 · 4.2×", isAboveTarget: true },
      { name: "Nisha Verma", value: 24, label: "₹41,000 · 3.4×", isAboveTarget: false },
    ],
    sideCardTitle: "Revenue",
    sideCardSub: "Gross to net sales · Shopify attribution",
    sideCardStats: [
      { label: "Gross sales", value: "₹5,96,000", detail: "total checkout" },
      { label: "Returns", value: "− ₹54,000", detail: "9.1% return rate" },
      { label: "Net sales", value: "₹5,42,000", detail: "68% of ₹8 L target" },
      { label: "ROAS", value: "3.8×", detail: "net sales ÷ fees" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM · CODE", "STATUS", "FEE", "VIEWS ↓", "ENG. RATE", "CLICKS", "ORDERS", "NET SALES"],
    tableRows: [
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "4 of 4 delivered",
        col2: "Instagram",
        col2Sub: "MEERA15 · 1 link",
        status: "Completed",
        feeOrProduct: "₹22,000",
        m1: "5.2 L",
        m2: "5.9%",
        m3: "6,240",
        m4: "410",
        m5: "₹1,68,000",
        m5Sub: "ROAS 7.6×",
      },
      {
        name: "Ishita Rao",
        handle: "@ishitarao",
        deliverables: "3 of 4 delivered",
        col2: "Instagram · YouTube",
        col2Sub: "ISHITA15 · 2 links",
        status: "Completed",
        feeOrProduct: "₹22,000",
        m1: "4.1 L",
        m2: "6.8%",
        m3: "2,040",
        m4: "318",
        m5: "₹1,21,400",
        m5Sub: "ROAS 7.1×",
      },
      {
        name: "Emma Clarke",
        handle: "@emmaclarke",
        deliverables: "3 of 4 delivered",
        col2: "Instagram",
        col2Sub: "EMMA15 · 1 link",
        status: "Completed",
        feeOrProduct: "₹15,000",
        m1: "2.6 L",
        m2: "4.6%",
        m3: "1,320",
        m4: "184",
        m5: "₹76,000",
        m5Sub: "ROAS 5.1×",
      },
      {
        name: "Kavya Reddy",
        handle: "@kavyareddy",
        deliverables: "3 of 4 delivered",
        warning: "1 deliverable overdue",
        col2: "Instagram",
        col2Sub: "KAVYA15 · 1 link",
        status: "Behind",
        feeOrProduct: "₹12,000",
        m1: "—",
        m2: "—",
        m3: "—",
        m4: "—",
        m5: "—",
      },
    ],
  },

  // 14. Sales · Influencer Gift exchange
  "Sales_Influencer Gift exchange": {
    campaignName: "Vitamin-C Gifting",
    objective: "Sales",
    projectType: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    periodText: "6 Oct – 6 Nov 2026 · 9 days left",
    scorecards: [
      { label: "Net sales", value: "₹1,24,000", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Orders", value: "301", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Link clicks", value: "3,900", detail: "▲ 7% vs prev. · CTR 1.1%", isPositive: true },
      { label: "Engagement rate", value: "6.0%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
      { label: "Views", value: "3.5 L", detail: "▲ 11% vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹62,000", detail: "Estimate · not in return" },
    ],
    trendTitle: "Net sales over time",
    trendSub: "All 10 creators · Shopify codes and links",
    platformTitle: "By platform",
    platformSub: "Share of net sales · orders",
    platformHero: "74%",
    platformHeroSub: "of net sales came from Instagram",
    platformBars: [
      { label: "Instagram Reels · code", pct: "55%", sub: "165 orders" },
      { label: "Instagram Stories · link", pct: "25%", sub: "75 orders" },
      { label: "YouTube Shorts · link", pct: "20%", sub: "61 orders" },
    ],
    platformDisclaimer: "Seeded creators shared affiliate codes with zero upfront creator fees.",
    creatorChartTitle: "Net sales by creator",
    creatorChartSub: "Net sales per creator · dashed line = ₹15,000 each",
    targetLineLabel: "┆ Target ₹15,000 per creator · ₹1.5 L total",
    creatorBars: [
      { name: "Meera Iyer", value: 100, label: "₹38,000 · 31%", isAboveTarget: true },
      { name: "Ishita Rao", value: 76, label: "₹29,000 · 23%", isAboveTarget: true },
      { name: "Emma Clarke", value: 50, label: "₹19,000 · 15%", isAboveTarget: true },
      { name: "Riya Sen", value: 37, label: "₹14,000 · 11%", isAboveTarget: false },
      { name: "Nisha Verma", value: 29, label: "₹11,000 · 9%", isAboveTarget: false },
    ],
    sideCardTitle: "Revenue",
    sideCardSub: "Affiliate gift conversions via Shopify",
    sideCardStats: [
      { label: "Gross sales", value: "₹1,36,000", detail: "301 orders" },
      { label: "Returns", value: "− ₹12,000", detail: "8.8% return rate" },
      { label: "Net sales", value: "₹1,24,000", detail: "82% of target" },
      { label: "Avg order value", value: "₹412", detail: "healthy cart size" },
    ],
    tableHeaders: ["CREATOR", "PLATFORM · CODE", "STATUS", "PRODUCT", "VIEWS ↓", "ENG. RATE", "CLICKS", "ORDERS", "NET SALES"],
    tableRows: [
      {
        name: "Meera Iyer",
        handle: "@meerabeauty",
        deliverables: "1 Reel · 1 Story",
        col2: "Instagram",
        col2Sub: "MEERA15 · 1 link",
        status: "Completed",
        feeOrProduct: "Serum Bottle",
        m1: "1.2 L",
        m2: "6.2%",
        m3: "1,240",
        m4: "92",
        m5: "₹38,000",
      },
    ],
  },

  // 15. Sales · UGC
  "Sales_UGC": {
    campaignName: "Serum Ad Creatives UGC",
    objective: "Sales",
    projectType: "UGC",
    partnership: "Paid",
    duration: "One-time",
    periodText: "5 Oct – 5 Nov 2026 · 8 days left",
    scorecards: [
      { label: "Usable videos", value: "16 of 18", detail: "89% of target" },
      { label: "Approval rate", value: "84%", detail: "▲ 6 pt vs prev.", isPositive: true },
      { label: "Revisions", value: "3", detail: "1 open with Tanvi Shah" },
      { label: "Avg. turnaround", value: "4.2 days", detail: "▼ 0.8 days vs prev.", isPositive: true },
      { label: "Files delivered", value: "19", detail: "16 approved · 3 in review" },
      { label: "Cost per usable video", value: "₹3,750", detail: "₹60,000 in fees ÷ 16" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "All 6 creators · approved files vs the 18-video target",
    platformTitle: "By platform",
    platformSub: "Where the approved files are made for",
    platformHero: "12 of 16",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "62%", sub: "10 files" },
      { label: "Instagram · Feed 4:5", pct: "13%", sub: "2 files" },
      { label: "YouTube · Shorts 9:16", pct: "25%", sub: "4 files" },
    ],
    platformDisclaimer: "Direct conversion ad UGC videos featuring problem-solution & before-after formats.",
    creatorChartTitle: "Usable videos by creator",
    creatorChartSub: "Approved files per creator · dashed line = 3 videos each",
    targetLineLabel: "┆ Target 3 per creator · 18 total",
    creatorBars: [
      { name: "Aditi Joshi", value: 100, label: "4 of 4 · 100%", isAboveTarget: true },
      { name: "Prachi Das", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Neha Gupta", value: 100, label: "3 of 3 · 100%", isAboveTarget: true },
      { name: "Tanvi Shah", value: 67, label: "2 of 3 · 1 in fix", isAboveTarget: false },
      { name: "Sneha Pai", value: 67, label: "2 of 3 · 1 in review", isAboveTarget: false },
    ],
    sideCardTitle: "Content library",
    sideCardSub: "Direct response sales UGC production pipeline",
    sideCardStats: [
      { label: "Usable files", value: "16", detail: "of 18 contracted" },
      { label: "Approved rate", value: "84%", detail: "target >80%" },
      { label: "Avg. review time", value: "1.4 d", detail: "within 48 h SLA" },
      { label: "Raw files archived", value: "19", detail: "ready for Meta ads" },
    ],
    tableHeaders: ["CREATOR", "FORMAT", "STATUS", "FEE", "FILES ↓", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Aditi Joshi",
        handle: "@aditiglow",
        deliverables: "4 of 4 delivered",
        col2: "Video files",
        col2Sub: "3 videos · 1 photo set",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "4",
        m2: "4",
        m3: "0",
        m4: "3 days",
        m5: "₹2,500",
        m5Sub: "₹10,000 ÷ 4",
      },
      {
        name: "Prachi Das",
        handle: "@prachidas",
        deliverables: "3 of 3 delivered",
        col2: "Video files",
        col2Sub: "3 videos",
        status: "Completed",
        feeOrProduct: "₹10,000",
        m1: "3",
        m2: "3",
        m3: "1",
        m4: "4 days",
        m5: "₹3,333",
        m5Sub: "₹10,000 ÷ 3",
      },
    ],
  },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CustomReportCard({ onMakeReport }: { onMakeReport?: () => void }) {
  return null; // Legacy report builder card removed per requirements
}

interface PerformanceReportBlocksProps {
  project?: Project;
  overrideObjective?: ObjectiveType;
  overrideTypeCategory?: TypeCategory;
  focusMetric?: string;
  scopeLabel?: string;
  selectedCreators?: string[];
}

export function PerformanceReportBlocks({
  project,
  overrideObjective,
  overrideTypeCategory,
}: PerformanceReportBlocksProps) {
  // Determine initial objective & type from project, with state for live switcher
  const initialObjective: ObjectiveType = useMemo(() => {
    if (overrideObjective) return overrideObjective;
    if (project?.objective) {
      if (project.objective === "Awareness") return "Awareness";
      if (project.objective === "Engagement") return "Engagement";
      if (project.objective === "Traffic") return "Traffic";
      if (project.objective === "Lead generation") return "Lead generation";
      if (project.objective === "Sales") return "Sales";
    }
    return "Sales";
  }, [project, overrideObjective]);

  const initialTypeCategory: TypeCategory = useMemo(() => {
    if (overrideTypeCategory) return overrideTypeCategory;
    if (project?.projectType === "UGC") return "UGC";
    if (project?.partnership?.toLowerCase().includes("gift")) return "Influencer Gift exchange";
    return "Influencer Paid";
  }, [project, overrideTypeCategory]);

  const [activeObjective, setActiveObjective] = useState<ObjectiveType>(initialObjective);
  const [activeTypeCategory, setActiveTypeCategory] = useState<TypeCategory>(initialTypeCategory);

  const variantKey = `${activeObjective}_${activeTypeCategory}`;
  const data = PERFORMANCE_VARIANTS[variantKey] || PERFORMANCE_VARIANTS["Sales_Influencer Paid"];

  return (
    <div className="space-y-6">
      {/* 15-Version Interactive Switcher Bar (For testing & review) */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-3.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Objective:
            </span>
            <div className="flex flex-wrap gap-1">
              {(["Awareness", "Engagement", "Traffic", "Lead generation", "Sales"] as ObjectiveType[]).map(
                (obj) => (
                  <button
                    key={obj}
                    type="button"
                    onClick={() => setActiveObjective(obj)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      activeObjective === obj
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    {obj}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Type:
            </span>
            <div className="flex flex-wrap gap-1">
              {(
                [
                  "Influencer Paid",
                  "Influencer Gift exchange",
                  "UGC",
                ] as TypeCategory[]
              ).map((typeCat) => (
                <button
                  key={typeCat}
                  type="button"
                  onClick={() => setActiveTypeCategory(typeCat)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    activeTypeCategory === typeCat
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {typeCat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scorecards Row (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {data.scorecards.map((sc, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-neutral-300 transition-colors"
          >
            <div className="text-xs font-medium text-neutral-500">{sc.label}</div>
            <div className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
              {sc.value}
            </div>
            <div
              className={`mt-1 text-xs font-medium ${
                sc.isPositive ? "text-emerald-600" : "text-neutral-500"
              }`}
            >
              {sc.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Row 1 · Trend & Platform */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Card */}
        <div className="lg:col-span-2 rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">{data.trendTitle}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{data.trendSub}</p>
            </div>
          </div>

          {/* Line Chart (SVG) */}
          <div className="mt-6 h-56 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 680 180">
              <defs>
                <linearGradient id="projTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B5BFF" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#3B5BFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="30" x2="680" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="75" x2="680" y2="75" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="120" x2="680" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="165" x2="680" y2="165" stroke="#f1f5f9" strokeWidth="1" />

              <path
                d="M 20 150 C 90 140, 160 125, 230 110 C 300 95, 370 70, 440 55 C 510 40, 580 32, 670 25 L 670 165 L 20 165 Z"
                fill="url(#projTrendGrad)"
              />
              <path
                d="M 20 150 C 90 140, 160 125, 230 110 C 300 95, 370 70, 440 55 C 510 40, 580 32, 670 25"
                fill="none"
                stroke="#3B5BFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="440" cy="55" r="4.5" fill="#3B5BFF" stroke="#fff" strokeWidth="2" />
              <circle cx="670" cy="25" r="4.5" fill="#3B5BFF" stroke="#fff" strokeWidth="2" />
            </svg>

            <div className="flex justify-between text-[11px] text-neutral-400 mt-2 px-1">
              <span>14 Oct</span>
              <span>17 Oct</span>
              <span>20 Oct</span>
              <span>23 Oct</span>
              <span>26 Oct</span>
              <span>29 Oct</span>
              <span>1 Nov</span>
              <span>4 Nov</span>
            </div>
          </div>
        </div>

        {/* By Platform Card */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">{data.platformTitle}</h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.platformSub}</p>

            <div className="mt-5">
              <div className="text-3xl font-extrabold tracking-tight text-neutral-950">
                {data.platformHero}
              </div>
              <div className="text-xs text-neutral-600 mt-0.5 font-medium">
                {data.platformHeroSub}
              </div>
            </div>

            <div className="mt-6 space-y-3.5">
              {data.platformBars.map((bar, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                    <span>{bar.label}</span>
                    <span className="font-semibold text-neutral-900">
                      {bar.pct} {bar.sub ? ` · ${bar.sub}` : ""}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0 ? "bg-neutral-900" : idx === 1 ? "bg-neutral-700" : "bg-neutral-400"
                      }`}
                      style={{ width: bar.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500 leading-normal">
            {data.platformDisclaimer}
          </div>
        </div>
      </div>

      {/* Row 2 · By Creator Bar Chart & Objective Details (NO FUNNELS!) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: By Creator Bar Chart */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">{data.creatorChartTitle}</h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.creatorChartSub}</p>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500" />
                Above target
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-neutral-400" />
                Below target
              </span>
              <span className="text-neutral-400">{data.targetLineLabel}</span>
            </div>

            {/* Bars List */}
            <div className="mt-5 space-y-3.5">
              {data.creatorBars.map((c, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-neutral-900">{c.name}</span>
                    <span
                      className={`font-semibold ${
                        c.isAboveTarget ? "text-emerald-600" : "text-neutral-600"
                      }`}
                    >
                      {c.label}
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        c.isAboveTarget ? "bg-emerald-500" : "bg-neutral-700"
                      }`}
                      style={{ width: `${Math.min(100, Math.max(10, c.value))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
            {data.targetLineLabel}
          </div>
        </div>

        {/* Right: Objective Breakdown Card */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">{data.sideCardTitle}</h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.sideCardSub}</p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {data.sideCardStats.map((st, idx) => (
                <div key={idx} className="rounded-lg bg-neutral-50/80 p-3.5 border border-neutral-100">
                  <div className="text-xs text-neutral-500">{st.label}</div>
                  <div className="text-xl font-bold text-neutral-950 mt-1">{st.value}</div>
                  {st.detail && (
                    <div className="text-[11px] text-neutral-600 mt-0.5 font-medium">
                      {st.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
            Performance tracks approved content deliverables for {activeObjective.toLowerCase()}.
          </div>
        </div>
      </div>

      {/* Row 3 · Creator Breakdown Table */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-neutral-200">
          <h3 className="text-base font-semibold text-neutral-900">Creator breakdown</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Deliverables and performance metrics per creator
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-200">
              <tr>
                {data.tableHeaders.map((head, idx) => (
                  <th
                    key={idx}
                    className={`py-3 px-4 ${
                      idx === 0
                        ? "text-left"
                        : idx === 1 || idx === 2
                          ? "text-left"
                          : "text-right"
                    }`}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {data.tableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-neutral-900">{row.name}</div>
                    <div className="text-[11px] text-neutral-500">
                      {row.handle} · {row.deliverables}
                    </div>
                    {row.warning && (
                      <div className="text-[11px] text-amber-600 font-medium">{row.warning}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-neutral-900">{row.col2}</div>
                    {row.col2Sub && (
                      <div className="text-[11px] text-neutral-500">{row.col2Sub}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        row.status === "Completed"
                          ? "bg-neutral-100 text-neutral-700"
                          : row.status === "In review"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          row.status === "Completed"
                            ? "bg-neutral-500"
                            : row.status === "In review"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                        }`}
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-neutral-900">
                    {row.feeOrProduct}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-neutral-900">
                    {row.m1}
                  </td>
                  <td className="py-3.5 px-4 text-right text-neutral-800">{row.m2}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-800">{row.m3}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-800">{row.m4}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-semibold text-neutral-900">{row.m5}</div>
                    {row.m5Sub && (
                      <div className="text-[11px] text-neutral-500 font-medium">{row.m5Sub}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function BrandProjectPerformancePage() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = Number(params.projectId) || 1;
  const project = getProject(projectId);

  // Compute breadcrumb segments: Projects / Campaign / Objective / Type / Partnership / Duration
  const objective: ObjectiveType = useMemo(() => {
    if (project?.objective) {
      if (project.objective === "Awareness") return "Awareness";
      if (project.objective === "Engagement") return "Engagement";
      if (project.objective === "Traffic") return "Traffic";
      if (project.objective === "Lead generation") return "Lead generation";
      if (project.objective === "Sales") return "Sales";
    }
    return "Sales";
  }, [project]);

  const typeCategory: TypeCategory = useMemo(() => {
    if (project?.projectType === "UGC") return "UGC";
    if (project?.partnership?.toLowerCase().includes("gift")) return "Influencer Gift exchange";
    return "Influencer Paid";
  }, [project]);

  const projectTypeLabel = project.projectType === "UGC" ? "UGC" : "Influencer";
  const partnershipLabel = project.partnership?.toLowerCase().includes("gift")
    ? "Gift exchange"
    : "Paid";
  const durationLabel =
    project.duration?.toLowerCase().includes("long") || project.duration?.toLowerCase().includes("month")
      ? "Long-term"
      : "One-time";

  const tabs = [
    "Overview",
    "Applications",
    "Invited creators",
    "Content",
    "Payments",
    "Performance",
    "Brief",
  ];

  return (
    <BrandShell>
      <div className="w-full pb-16 bg-white min-h-screen text-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          {/* Header with full breadcrumb: Projects / Campaign / Objective / Type / Partnership / Duration */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between border-b border-neutral-200 pb-5">
            <div>
              {/* Breadcrumb row */}
              <nav className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 mb-2">
                <Link
                  to="/brand/projects"
                  className="hover:text-neutral-900 transition-colors font-medium text-[#3B5BFF]"
                >
                  Projects
                </Link>
                <span>/</span>
                <Link
                  to={`/brand/projects/${project.id}`}
                  className="hover:text-neutral-900 transition-colors font-medium text-neutral-800"
                >
                  {project.name}
                </Link>
                <span>/</span>
                <span className="text-neutral-600">{objective}</span>
                <span>/</span>
                <span className="text-neutral-600">{projectTypeLabel}</span>
                <span>/</span>
                <span className="text-neutral-600">{partnershipLabel}</span>
                <span>/</span>
                <span className="text-neutral-600">{durationLabel}</span>
              </nav>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                {project.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
                <span className="text-xs text-neutral-500">
                  {project.duration || "7 Oct – 7 Nov 2026 · 10 days left"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <DateRangePicker value="14 Oct – 4 Nov" showCompare={false} />
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 shadow-xs hover:bg-neutral-50 transition-colors"
              >
                <Share2 size={14} className="text-neutral-500" />
                Share
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-2 text-xs font-medium text-white shadow-xs hover:bg-neutral-800 transition-colors"
              >
                <Users size={14} />
                Invite creators
              </button>
              <button
                type="button"
                aria-label="More actions"
                className="grid size-8 place-items-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Project Tabs */}
          <div className="border-b border-neutral-200">
            <nav className="flex space-x-6 overflow-x-auto">
              {tabs.map((tab) => {
                const isSelected = tab === "Performance";
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      if (tab !== "Performance") {
                        navigate(`/brand/projects/${project.id}?tab=${encodeURIComponent(tab)}`);
                      }
                    }}
                    className={`py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      isSelected
                        ? "border-[#3B5BFF] text-[#3B5BFF]"
                        : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Performance Tab Content */}
          <PerformanceReportBlocks
            project={project}
            overrideObjective={objective}
            overrideTypeCategory={typeCategory}
          />
        </div>
      </div>
    </BrandShell>
  );
}
