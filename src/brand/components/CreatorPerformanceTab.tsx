import { useState, useMemo } from "react";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import type { Platform } from "@/common/types";
import type { Project, ProjectObjective } from "@/brand/data/projects";

export type ObjectiveType = "Awareness" | "Engagement" | "Traffic" | "Lead generation" | "Sales";
export type TypeCategory = "Influencer Paid" | "Influencer Gift exchange" | "UGC";

export interface CreatorPerformanceTabProps {
  creatorName?: string;
  platform?: Platform;
  showCustomReport?: boolean;
  project?: Project;
  overrideObjective?: ObjectiveType;
  overrideTypeCategory?: TypeCategory;
}

interface ScorecardItem {
  label: string;
  value: string;
  detail: string;
  isPositive?: boolean;
}

interface DeliverableBar {
  name: string;
  valStr: string;
  pct: number; // 0 to 100
}

interface CreatorDeliverableRow {
  name: string;
  dateOrNote: string;
  platform: string;
  codeOrFormat: string;
  status: "Approved" | "Scheduled" | "Completed" | "In review";
  feeOrProduct: string;
  views: string;
  engRate: string;
  clicks: string;
  ordersOrLeads: string;
  result: string;
  resultSub?: string;
}

interface CreatorVariantData {
  creatorDisplayName: string;
  campaignName: string;
  objective: ObjectiveType;
  typeCategory: TypeCategory;
  scorecards: ScorecardItem[];
  trendTitle: string;
  trendSub: string;
  platformTitle: string;
  platformSub: string;
  platformHero: string;
  platformHeroSub: string;
  platformBars: { label: string; pct: string; sub?: string }[];
  platformDisclaimer: string;
  deliverablesChartTitle: string;
  deliverablesChartSub: string;
  deliverableBars: DeliverableBar[];
  deliverablesFooterNote: string;
  sideCardTitle: string;
  sideCardSub: string;
  sideCardStats: { label: string; value: string; detail?: string }[];
  tableHeaders: string[];
  tableRows: CreatorDeliverableRow[];
}

// 15 distinct variants for a single creator inside a project
export const CREATOR_PERFORMANCE_VARIANTS: Record<string, CreatorVariantData> = {
  // 1. Awareness · Influencer Paid
  "Awareness_Influencer Paid": {
    creatorDisplayName: "Riya Sen",
    campaignName: "Glow Squad",
    objective: "Awareness",
    typeCategory: "Influencer Paid",
    scorecards: [
      { label: "Reach", value: "9.9 L", detail: "▲ 22% vs prev.", isPositive: true },
      { label: "Impressions", value: "23.2 L", detail: "▲ 18% vs prev.", isPositive: true },
      { label: "Video views", value: "7.8 L", detail: "▲ 25% vs prev.", isPositive: true },
      { label: "Frequency", value: "2.3×", detail: "healthy · 2–3× is ideal" },
      { label: "Engagement rate", value: "6.1%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹74,400", detail: "Estimate · not a cost" },
    ],
    trendTitle: "Reach over time",
    trendSub: "Riya Sen · all deliverables · Glow Squad",
    platformTitle: "By platform",
    platformSub: "Share of reach · reach per creator",
    platformHero: "78%",
    platformHeroSub: "of reach came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "62%" },
      { label: "Instagram Stories", pct: "16%" },
      { label: "YouTube Shorts", pct: "22%" },
    ],
    platformDisclaimer: "Reels reached 6.1 L new non-followers with 2.3× average repeat exposure.",
    deliverablesChartTitle: "Reach by deliverable",
    deliverablesChartSub: "Which posts drove Riya Sen’s result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "4.8 L · 48%", pct: 96 },
      { name: "Reel · review", valStr: "3.2 L · 32%", pct: 64 },
      { name: "Story · routine", valStr: "1.9 L · 20%", pct: 38 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Reels drove 80% of Riya Sen's reach; the final reminder story goes live 30 Oct.",
    sideCardTitle: "Reach",
    sideCardSub: "Audience discovery and viewer quality",
    sideCardStats: [
      { label: "Total reach", value: "9.9 L", detail: "22% of campaign total" },
      { label: "Total impressions", value: "23.2 L", detail: "2.3x frequency" },
      { label: "Effective CPM", value: "₹46", detail: "per 1,000 reached" },
      { label: "Target reach", value: "7.5 L", detail: "+32% above goal" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "FEE", "REACH", "IMPR.", "VIEWS", "FREQ.", "CPM"],
    tableRows: [
      {
        name: "Reel · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "₹15,000/mo",
        views: "4.8 L",
        engRate: "6.2%",
        clicks: "11.2 L",
        ordersOrLeads: "3.8 L",
        result: "₹42 CPM",
      },
      {
        name: "Reel · review",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "Included",
        views: "3.2 L",
        engRate: "6.0%",
        clicks: "7.4 L",
        ordersOrLeads: "2.5 L",
        result: "₹48 CPM",
      },
      {
        name: "Story · routine",
        dateOrNote: "Posted 18 Oct",
        platform: "Instagram",
        codeOrFormat: "Story 9:16",
        status: "Approved",
        feeOrProduct: "Included",
        views: "1.9 L",
        engRate: "5.8%",
        clicks: "4.6 L",
        ordersOrLeads: "1.5 L",
        result: "₹52 CPM",
      },
      {
        name: "Story · reminder",
        dateOrNote: "Not posted yet",
        platform: "Instagram",
        codeOrFormat: "Story 9:16",
        status: "Scheduled",
        feeOrProduct: "Included",
        views: "—",
        engRate: "—",
        clicks: "—",
        ordersOrLeads: "—",
        result: "Due 30 Oct",
      },
    ],
  },

  // 2. Awareness · Influencer Gift exchange
  "Awareness_Influencer Gift exchange": {
    creatorDisplayName: "Riya Sen",
    campaignName: "SPF Mini Kit Seeding",
    objective: "Awareness",
    typeCategory: "Influencer Gift exchange",
    scorecards: [
      { label: "Reach", value: "2.3 L", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Impressions", value: "5.0 L", detail: "▲ 7% vs prev.", isPositive: true },
      { label: "Video views", value: "1.9 L", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Frequency", value: "2.1×", detail: "healthy · 2–3× is ideal" },
      { label: "Engagement rate", value: "6.8%", detail: "▲ 0.5 pt vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹17,600", detail: "Estimate · not a cost" },
    ],
    trendTitle: "Reach over time",
    trendSub: "Riya Sen · all deliverables · SPF Mini Kit Seeding",
    platformTitle: "By platform",
    platformSub: "Share of reach · reach per creator",
    platformHero: "82%",
    platformHeroSub: "of reach came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "68%" },
      { label: "Instagram Stories", pct: "14%" },
      { label: "YouTube Shorts", pct: "18%" },
    ],
    platformDisclaimer: "Gifted unboxing video drove high reach with 94% authentic organic feedback.",
    deliverablesChartTitle: "Reach by deliverable",
    deliverablesChartSub: "Which posts drove Riya Sen’s result",
    deliverableBars: [
      { name: "Reel · unboxing", valStr: "1.4 L · 61%", pct: 85 },
      { name: "Story · first impression", valStr: "0.9 L · 39%", pct: 55 },
    ],
    deliverablesFooterNote: "All gifted deliverables posted on time with verified brand mentions.",
    sideCardTitle: "Reach",
    sideCardSub: "Organic product seeding reach",
    sideCardStats: [
      { label: "Total reach", value: "2.3 L", detail: "16% of seeding campaign" },
      { label: "Impressions", value: "5.0 L", detail: "2.1x frequency" },
      { label: "Est. CPM", value: "₹21", detail: "product value ÷ reach" },
      { label: "Target reach", value: "1.25 L", detail: "+84% above target" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "REACH", "IMPR.", "VIEWS", "FREQ.", "CPM"],
    tableRows: [
      {
        name: "Reel · unboxing",
        dateOrNote: "Posted 14 Oct",
        platform: "Instagram",
        codeOrFormat: "SPF Kit · 1 unit",
        status: "Approved",
        feeOrProduct: "SPF Kit",
        views: "1.4 L",
        engRate: "7.1%",
        clicks: "3.1 L",
        ordersOrLeads: "1.1 L",
        result: "₹19 CPM",
      },
      {
        name: "Story · first impression",
        dateOrNote: "Posted 16 Oct",
        platform: "Instagram",
        codeOrFormat: "SPF Kit · 1 unit",
        status: "Approved",
        feeOrProduct: "SPF Kit",
        views: "0.9 L",
        engRate: "6.4%",
        clicks: "1.9 L",
        ordersOrLeads: "0.8 L",
        result: "₹24 CPM",
      },
    ],
  },

  // 3. Awareness · UGC
  "Awareness_UGC": {
    creatorDisplayName: "Aditi Joshi",
    campaignName: "Sunscreen UGC Pack",
    objective: "Awareness",
    typeCategory: "UGC",
    scorecards: [
      { label: "Usable videos", value: "4 of 4", detail: "100% of the brief" },
      { label: "Approval rate", value: "100%", detail: "approved first time", isPositive: true },
      { label: "Revisions", value: "0", detail: "none needed", isPositive: true },
      { label: "Turnaround", value: "3 days", detail: "▼ 1.2 days vs average", isPositive: true },
      { label: "Files delivered", value: "4", detail: "4 approved · 0 in review" },
      { label: "Cost per usable video", value: "₹2,500", detail: "₹10,000 fee ÷ 4" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "Aditi Joshi · files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "4 of 4",
    platformHeroSub: "files delivered on first submission",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "75%", sub: "3 files" },
      { label: "Instagram · Feed 4:5", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "All raw and color-graded source files archived in Content hub.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in Aditi Joshi’s brief",
    deliverableBars: [
      { name: "Video 1 · Problem hook", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 2 · Routine demo", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 3 · Texture closeup", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 4 · Daily wear", valStr: "Approved · 4:5", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 files approved on initial review; 0 revision requests required.",
    sideCardTitle: "Content library",
    sideCardSub: "Production pace and quality metrics",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% of contract" },
      { label: "Avg. turnaround", value: "3.0 d", detail: "48 h ahead of SLA" },
      { label: "Cost per video", value: "₹2,500", detail: "fixed contract rate" },
      { label: "Ad ready", value: "4 of 4", detail: "whitelisted rights" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Problem hook video",
        dateOrNote: "Delivered 12 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
      {
        name: "Routine demo video",
        dateOrNote: "Delivered 14 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
      {
        name: "Texture closeup video",
        dateOrNote: "Delivered 16 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
      {
        name: "Daily wear feed video",
        dateOrNote: "Delivered 18 Oct",
        platform: "Video 4:5",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
    ],
  },

  // 4. Engagement · Influencer Paid
  "Engagement_Influencer Paid": {
    creatorDisplayName: "Nisha Verma",
    campaignName: "Niacinamide Serum",
    objective: "Engagement",
    typeCategory: "Influencer Paid",
    scorecards: [
      { label: "Total Engagement", value: "42,340", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.8%", detail: "▲ 1.3 pt vs 4.5% target", isPositive: true },
      { label: "Saves", value: "3.6K", detail: "▲ 21% vs prev.", isPositive: true },
      { label: "Shares", value: "1,986", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Comments", value: "2,703", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Views", value: "7.3 L", detail: "▲ 10% vs prev.", isPositive: true },
    ],
    trendTitle: "Engagements over time",
    trendSub: "Nisha Verma · all deliverables · Niacinamide Serum",
    platformTitle: "By platform",
    platformSub: "Share of engagements · engagement rate",
    platformHero: "84%",
    platformHeroSub: "of engagements came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "62%", sub: "6.4% ER" },
      { label: "Instagram Stories", pct: "22%", sub: "4.1% ER" },
      { label: "YouTube Shorts", pct: "16%", sub: "5.2% ER" },
    ],
    platformDisclaimer: "Saves & shares represent 24% of interactions, signaling high intent save-for-later value.",
    deliverablesChartTitle: "Total Engagement by deliverable",
    deliverablesChartSub: "Which posts drove Nisha Verma’s result",
    deliverableBars: [
      { name: "Reel · texture test", valStr: "24,120 · 57%", pct: 95 },
      { name: "Reel · 7-day routine", valStr: "12,840 · 30%", pct: 52 },
      { name: "Story · Q&A sticker", valStr: "5,380 · 13%", pct: 24 },
    ],
    deliverablesFooterNote: "Texture test Reel generated 2,100 saves, highest in campaign.",
    sideCardTitle: "Engagement quality",
    sideCardSub: "High-intent interaction analysis",
    sideCardStats: [
      { label: "Save & share rate", value: "24%", detail: "benchmark 12%" },
      { label: "Cost per engagement", value: "₹0.33", detail: "₹14,000 ÷ 42,340" },
      { label: "Positive comment ratio", value: "96%", detail: "verified sentiment" },
      { label: "Target ER", value: "4.5%", detail: "currently 5.8% (+1.3 pt)" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "FEE", "ENGAGE.", "ENG. RATE", "SAVES", "POSTS", "COST / ENG."],
    tableRows: [
      {
        name: "Reel · texture test",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "₹7,000",
        views: "24,120",
        engRate: "7.6%",
        clicks: "2,100",
        ordersOrLeads: "1",
        result: "₹0.29",
      },
      {
        name: "Reel · 7-day routine",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "₹7,000",
        views: "12,840",
        engRate: "6.8%",
        clicks: "1,120",
        ordersOrLeads: "1",
        result: "₹0.38",
      },
      {
        name: "Story · Q&A sticker",
        dateOrNote: "Posted 18 Oct",
        platform: "Instagram",
        codeOrFormat: "Story 9:16",
        status: "Approved",
        feeOrProduct: "Included",
        views: "5,380",
        engRate: "4.2%",
        clicks: "380",
        ordersOrLeads: "1",
        result: "₹0.42",
      },
    ],
  },

  // 5. Engagement · Influencer Gift exchange
  "Engagement_Influencer Gift exchange": {
    creatorDisplayName: "Nisha Verma",
    campaignName: "Hydration Bundle",
    objective: "Engagement",
    typeCategory: "Influencer Gift exchange",
    scorecards: [
      { label: "Total Engagement", value: "42,340", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.8%", detail: "▲ 1.3 pt vs 4.5% target", isPositive: true },
      { label: "Saves", value: "3.6K", detail: "▲ 21% vs prev.", isPositive: true },
      { label: "Shares", value: "1,986", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Comments", value: "2,703", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Views", value: "7.3 L", detail: "▲ 10% vs prev.", isPositive: true },
    ],
    trendTitle: "Engagements over time",
    trendSub: "Nisha Verma · all deliverables · Hydration Bundle",
    platformTitle: "By platform",
    platformSub: "Share of engagements · engagement rate",
    platformHero: "84%",
    platformHeroSub: "of engagements came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "62%", sub: "6.4% ER" },
      { label: "Instagram Stories", pct: "22%", sub: "4.1% ER" },
      { label: "YouTube Shorts", pct: "16%", sub: "5.2% ER" },
    ],
    platformDisclaimer: "Gifted unboxing routine generated high save rates across skincare enthusiasts.",
    deliverablesChartTitle: "Total Engagement by deliverable",
    deliverablesChartSub: "Which posts drove Nisha Verma’s result",
    deliverableBars: [
      { name: "Reel · routine walkthrough", valStr: "25,400 · 60%", pct: 95 },
      { name: "Story · routine", valStr: "16,940 · 40%", pct: 65 },
    ],
    deliverablesFooterNote: "All gifted deliverables posted on time with verified brand tags.",
    sideCardTitle: "Engagement quality",
    sideCardSub: "Organic interaction metrics for gifted box",
    sideCardStats: [
      { label: "Total interactions", value: "42,340", detail: "29% of campaign" },
      { label: "Save rate", value: "8.5%", detail: "high purchase intent" },
      { label: "Est. cost / eng.", value: "₹0.31", detail: "product value ÷ eng." },
      { label: "Target ER", value: "4.5%", detail: "exceeded by +1.3 pt" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "ENGAGE.", "ENG. RATE", "SAVES", "ON TIME", "COST / ENG."],
    tableRows: [
      {
        name: "Reel · routine walkthrough",
        dateOrNote: "Posted 10 Oct",
        platform: "Instagram",
        codeOrFormat: "Hydration Box",
        status: "Approved",
        feeOrProduct: "Hydration Box",
        views: "25,400",
        engRate: "7.4%",
        clicks: "2,200",
        ordersOrLeads: "Yes",
        result: "₹0.28",
      },
      {
        name: "Story · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "Hydration Box",
        status: "Approved",
        feeOrProduct: "Hydration Box",
        views: "16,940",
        engRate: "5.8%",
        clicks: "1,400",
        ordersOrLeads: "Yes",
        result: "₹0.35",
      },
    ],
  },

  // 6. Engagement · UGC
  "Engagement_UGC": {
    creatorDisplayName: "Aditi Joshi",
    campaignName: "Hydration Mist UGC",
    objective: "Engagement",
    typeCategory: "UGC",
    scorecards: [
      { label: "Usable videos", value: "4 of 4", detail: "100% of the brief" },
      { label: "Approval rate", value: "100%", detail: "approved first time", isPositive: true },
      { label: "Revisions", value: "0", detail: "none needed", isPositive: true },
      { label: "Turnaround", value: "3 days", detail: "▼ 1.2 days vs average", isPositive: true },
      { label: "Files delivered", value: "4", detail: "4 approved · 0 in review" },
      { label: "Cost per usable video", value: "₹2,500", detail: "₹10,000 fee ÷ 4" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "Aditi Joshi · files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "4 of 4",
    platformHeroSub: "approved files for ad creatives",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "75%", sub: "3 files" },
      { label: "Instagram · Feed 4:5", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "Hook-optimized UGC files designed for high video watch-time and comment interactions.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in Aditi Joshi’s brief",
    deliverableBars: [
      { name: "Video 1 · Hydration test", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 2 · Mist application", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 3 · Desk routine", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 4 · Evening glow", valStr: "Approved · 4:5", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 files ready for ad boosting with zero revision cycles.",
    sideCardTitle: "Content library",
    sideCardSub: "UGC deliverable approval pipeline",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "within SLA" },
      { label: "Cost per video", value: "₹2,500", detail: "standard rate" },
      { label: "Ad ready", value: "4 of 4", detail: "commercial license" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Hydration test video",
        dateOrNote: "Delivered 10 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
    ],
  },

  // 7. Traffic · Influencer Paid
  "Traffic_Influencer Paid": {
    creatorDisplayName: "Riya Sen",
    campaignName: "Sunscreen Stick Launch",
    objective: "Traffic",
    typeCategory: "Influencer Paid",
    scorecards: [
      { label: "Link clicks", value: "6,858", detail: "▲ 31% vs prev.", isPositive: true },
      { label: "CTR", value: "1.6%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
      { label: "Page views", value: "5,346", detail: "78% of clicks" },
      { label: "Avg. time on site", value: "1m 12s", detail: "▲ 8s vs prev.", isPositive: true },
      { label: "Views", value: "4.3 L", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "4.9%", detail: "▲ 0.2 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Link clicks over time",
    trendSub: "Riya Sen · all deliverables · Sunscreen Stick Launch",
    platformTitle: "By platform",
    platformSub: "Share of link clicks · CTR",
    platformHero: "71%",
    platformHeroSub: "of clicks came from Instagram Stories links",
    platformBars: [
      { label: "Instagram Stories · link sticker", pct: "71%", sub: "2.1% CTR" },
      { label: "Instagram Reels · bio link", pct: "17%", sub: "0.9% CTR" },
      { label: "YouTube · description link", pct: "12%", sub: "1.4% CTR" },
    ],
    platformDisclaimer: "Story link stickers drove 71% of all clicks with highest click-to-load conversion.",
    deliverablesChartTitle: "Link clicks by deliverable",
    deliverablesChartSub: "Which posts drove Riya Sen’s result",
    deliverableBars: [
      { name: "Story · link sticker", valStr: "4,870 · 71%", pct: 95 },
      { name: "Reel · bio link", valStr: "1,180 · 17%", pct: 28 },
      { name: "YouTube Shorts link", valStr: "808 · 12%", pct: 18 },
    ],
    deliverablesFooterNote: "Story link stickers generated 71% of Riya Sen's clicks with 34% low bounce rate.",
    sideCardTitle: "Traffic",
    sideCardSub: "Visitor acquisition and on-site behavior",
    sideCardStats: [
      { label: "Total link clicks", value: "6,858", detail: "27% of campaign" },
      { label: "Landing views", value: "5,346", detail: "78% click-to-load" },
      { label: "Cost per click (CPC)", value: "₹2.62", detail: "fee ÷ clicks" },
      { label: "Avg time on site", value: "1m 12s", detail: "+8s vs avg" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "FEE", "CLICKS", "CTR", "LANDING", "BOUNCE", "CPC"],
    tableRows: [
      {
        name: "Story · link sticker",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "1 link",
        status: "Approved",
        feeOrProduct: "₹18,000",
        views: "4,870",
        engRate: "2.1%",
        clicks: "3,896",
        ordersOrLeads: "34%",
        result: "₹2.45",
      },
      {
        name: "Reel · bio link",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "1 link",
        status: "Approved",
        feeOrProduct: "Included",
        views: "1,180",
        engRate: "1.4%",
        clicks: "920",
        ordersOrLeads: "38%",
        result: "₹3.10",
      },
    ],
  },

  // 8. Traffic · Influencer Gift exchange
  "Traffic_Influencer Gift exchange": {
    creatorDisplayName: "Riya Sen",
    campaignName: "Lip Balm Seeding",
    objective: "Traffic",
    typeCategory: "Influencer Gift exchange",
    scorecards: [
      { label: "Link clicks", value: "1,918", detail: "▲ 18% vs prev.", isPositive: true },
      { label: "CTR", value: "1.9%", detail: "▲ 0.2 pt vs prev.", isPositive: true },
      { label: "Landing page views", value: "1,534", detail: "80% of clicks" },
      { label: "Avg. time on site", value: "58s", detail: "▲ 5s vs prev.", isPositive: true },
      { label: "Views", value: "1.0 L", detail: "▲ 10% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "6.2%", detail: "▲ 0.4 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Link clicks over time",
    trendSub: "Riya Sen · all deliverables · Lip Balm Seeding",
    platformTitle: "By platform",
    platformSub: "Share of link clicks · CTR",
    platformHero: "71%",
    platformHeroSub: "of clicks came from Instagram Stories links",
    platformBars: [
      { label: "Instagram Stories · link", pct: "71%", sub: "1.9% CTR" },
      { label: "Instagram Bio link", pct: "29%", sub: "1.1% CTR" },
    ],
    platformDisclaimer: "Seeded balm review drove 1,918 organic clicks with zero ad spend.",
    deliverablesChartTitle: "Link clicks by deliverable",
    deliverablesChartSub: "Which posts drove Riya Sen’s result",
    deliverableBars: [
      { name: "Story · sticker link", valStr: "1,360 · 71%", pct: 85 },
      { name: "Bio link", valStr: "558 · 29%", pct: 40 },
    ],
    deliverablesFooterNote: "High CTR routine sticker drove 1,360 clicks within first 24 hours.",
    sideCardTitle: "Traffic",
    sideCardSub: "Organic product seeding clicks",
    sideCardStats: [
      { label: "Total link clicks", value: "1,918", detail: "28% of campaign" },
      { label: "Landing page views", value: "1,534", detail: "80% load rate" },
      { label: "Est. value / click", value: "₹2.20", detail: "vs paid ad ₹4.50" },
      { label: "Bounce rate", value: "38%", detail: "strong intent" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "CLICKS", "CTR", "LANDING", "BOUNCE", "CPC"],
    tableRows: [
      {
        name: "Story · sticker link",
        dateOrNote: "Posted 11 Oct",
        platform: "Instagram",
        codeOrFormat: "Balm Box",
        status: "Approved",
        feeOrProduct: "Balm Box",
        views: "1,360",
        engRate: "2.1%",
        clicks: "1,088",
        ordersOrLeads: "36%",
        result: "₹1.80",
      },
    ],
  },

  // 9. Traffic · UGC
  "Traffic_UGC": {
    creatorDisplayName: "Aditi Joshi",
    campaignName: "Lip Tint Drop",
    objective: "Traffic",
    typeCategory: "UGC",
    scorecards: [
      { label: "Usable videos", value: "4 of 4", detail: "100% of the brief" },
      { label: "Approval rate", value: "100%", detail: "approved first time", isPositive: true },
      { label: "Revisions", value: "0", detail: "none needed", isPositive: true },
      { label: "Turnaround", value: "3 days", detail: "▼ 1.2 days vs average", isPositive: true },
      { label: "Files delivered", value: "4", detail: "4 approved · 0 in review" },
      { label: "Cost per usable video", value: "₹2,500", detail: "₹10,000 fee ÷ 4" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "Aditi Joshi · files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "4 of 4",
    platformHeroSub: "approved traffic ad creatives",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "75%", sub: "3 files" },
      { label: "Instagram · Feed 4:5", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "Content formatted for swipe-up and landing page video backgrounds.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in Aditi Joshi’s brief",
    deliverableBars: [
      { name: "Video 1 · Color swatch", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 2 · Lip application", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 3 · Wear test", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 4 · Shades preview", valStr: "Approved · 4:5", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 files delivered within 3 days and approved on first pass.",
    sideCardTitle: "Content library",
    sideCardSub: "Production pace and review metrics",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "fast approval" },
      { label: "Cost per video", value: "₹2,500", detail: "standard rate" },
      { label: "Whitelisted", value: "Yes", detail: "full ad rights" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Color swatch video",
        dateOrNote: "Delivered 11 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
    ],
  },

  // 10. Lead generation · Influencer Paid
  "Lead generation_Influencer Paid": {
    creatorDisplayName: "Meera Iyer",
    campaignName: "Skin Type Quiz",
    objective: "Lead generation",
    typeCategory: "Influencer Paid",
    scorecards: [
      { label: "Leads", value: "972", detail: "▲ 24% vs prev.", isPositive: true },
      { label: "Sign-up rate", value: "18.6%", detail: "of link clicks" },
      { label: "Link clicks", value: "5,220", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Qualified leads", value: "633", detail: "65% of leads" },
      { label: "Views", value: "3.8 L", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.1%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Leads over time",
    trendSub: "Meera Iyer · all deliverables · Skin Type Quiz",
    platformTitle: "By platform",
    platformSub: "Share of leads · sign-up rate",
    platformHero: "82%",
    platformHeroSub: "of leads came from Instagram",
    platformBars: [
      { label: "Instagram Stories · quiz link", pct: "58%", sub: "21% sign-up" },
      { label: "Instagram Reels · code", pct: "24%", sub: "16% sign-up" },
      { label: "YouTube · description link", pct: "18%", sub: "15% sign-up" },
    ],
    platformDisclaimer: "Stories with interactive quiz stickers converted 21% of link clicks to leads.",
    deliverablesChartTitle: "Leads by deliverable",
    deliverablesChartSub: "Which posts drove Meera Iyer’s result",
    deliverableBars: [
      { name: "Story · quiz sticker", valStr: "564 · 58%", pct: 95 },
      { name: "Reel · routine walkthrough", valStr: "233 · 24%", pct: 45 },
      { name: "YouTube link", valStr: "175 · 18%", pct: 32 },
    ],
    deliverablesFooterNote: "Quiz link sticker delivered 564 leads at an exceptional ₹18 CPL.",
    sideCardTitle: "Leads",
    sideCardSub: "Lead qualification and acquisition economics",
    sideCardStats: [
      { label: "Total sign-ups", value: "972", detail: "30% of campaign" },
      { label: "Qualified rate", value: "65%", detail: "verified skin profile" },
      { label: "Cost per lead (CPL)", value: "₹18.51", detail: "₹18,000 ÷ 972" },
      { label: "Target leads", value: "375", detail: "+159% over goal" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "FEE", "CLICKS", "LEADS", "SIGN-UP", "QUALIFIED", "CPL"],
    tableRows: [
      {
        name: "Story · quiz sticker",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "1 quiz link",
        status: "Approved",
        feeOrProduct: "₹18,000",
        views: "2,680",
        engRate: "564",
        clicks: "21%",
        ordersOrLeads: "395",
        result: "₹18",
      },
      {
        name: "Reel · routine walkthrough",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "1 quiz link",
        status: "Approved",
        feeOrProduct: "Included",
        views: "1,520",
        engRate: "233",
        clicks: "16%",
        ordersOrLeads: "152",
        result: "₹22",
      },
    ],
  },

  // 11. Lead generation · Influencer Gift exchange
  "Lead generation_Influencer Gift exchange": {
    creatorDisplayName: "Meera Iyer",
    campaignName: "Skin Quiz Seeding",
    objective: "Lead generation",
    typeCategory: "Influencer Gift exchange",
    scorecards: [
      { label: "Leads", value: "920", detail: "▲ 16% vs prev.", isPositive: true },
      { label: "Sign-up rate", value: "17.2%", detail: "of link clicks" },
      { label: "Link clicks", value: "1,498", detail: "▲ 11% vs prev.", isPositive: true },
      { label: "Qualified leads", value: "590", detail: "64% of leads" },
      { label: "Views", value: "86,800", detail: "▲ 8% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.9%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Leads over time",
    trendSub: "Meera Iyer · all deliverables · Skin Quiz Seeding",
    platformTitle: "By platform",
    platformSub: "Share of leads · sign-up rate",
    platformHero: "82%",
    platformHeroSub: "of leads came from Instagram",
    platformBars: [
      { label: "Instagram Stories · link", pct: "64%", sub: "18% sign-up" },
      { label: "Instagram Bio link", pct: "18%", sub: "14% sign-up" },
      { label: "YouTube Shorts", pct: "18%", sub: "15% sign-up" },
    ],
    platformDisclaimer: "Gifted creators took quiz live on stories and recommended viewers get their score.",
    deliverablesChartTitle: "Leads by deliverable",
    deliverablesChartSub: "Which posts drove Meera Iyer’s result",
    deliverableBars: [
      { name: "Story · live quiz", valStr: "588 · 64%", pct: 90 },
      { name: "Bio link", valStr: "332 · 36%", pct: 50 },
    ],
    deliverablesFooterNote: "Live quiz demonstration generated 588 leads with zero ad cost.",
    sideCardTitle: "Leads",
    sideCardSub: "Organic product seeding lead acquisition",
    sideCardStats: [
      { label: "Total sign-ups", value: "920", detail: "100% organic" },
      { label: "Qualified rate", value: "64%", detail: "accurate survey" },
      { label: "Estimated CPL", value: "₹17.00", detail: "gift cost ÷ leads" },
      { label: "Target leads", value: "880", detail: "target achieved" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "CLICKS", "LEADS", "SIGN-UP", "QUALIFIED", "CPL"],
    tableRows: [
      {
        name: "Story · live quiz",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "Quiz Kit",
        status: "Approved",
        feeOrProduct: "Quiz Kit",
        views: "980",
        engRate: "588",
        clicks: "19%",
        ordersOrLeads: "390",
        result: "₹17",
      },
    ],
  },

  // 12. Lead generation · UGC
  "Lead generation_UGC": {
    creatorDisplayName: "Aditi Joshi",
    campaignName: "Quiz Explainer UGC",
    objective: "Lead generation",
    typeCategory: "UGC",
    scorecards: [
      { label: "Usable videos", value: "4 of 4", detail: "100% of the brief" },
      { label: "Approval rate", value: "100%", detail: "approved first time", isPositive: true },
      { label: "Revisions", value: "0", detail: "none needed", isPositive: true },
      { label: "Turnaround", value: "3 days", detail: "▼ 1.2 days vs average", isPositive: true },
      { label: "Files delivered", value: "4", detail: "4 approved · 0 in review" },
      { label: "Cost per usable video", value: "₹2,500", detail: "₹10,000 fee ÷ 4" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "Aditi Joshi · files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "4 of 4",
    platformHeroSub: "approved lead gen ad videos",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "75%", sub: "3 files" },
      { label: "Instagram · Feed 4:5", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "Interactive screen-recording and face-to-camera quiz reviews.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in Aditi Joshi’s brief",
    deliverableBars: [
      { name: "Video 1 · Quiz walkthrough", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 2 · Skin result reveal", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 3 · Recommendation hook", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 4 · Feed testimonial", valStr: "Approved · 4:5", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 videos approved without revision; ready for lead generation ad funnels.",
    sideCardTitle: "Content library",
    sideCardSub: "Lead generation creative assets",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "within SLA" },
      { label: "Cost per video", value: "₹2,500", detail: "fixed contract rate" },
      { label: "Ad ready", value: "4 of 4", detail: "whitelisted" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Quiz walkthrough video",
        dateOrNote: "Delivered 12 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
    ],
  },

  // 13. Sales · Influencer Paid
  "Sales_Influencer Paid": {
    creatorDisplayName: "Meera Iyer",
    campaignName: "Vitamin-C Serum",
    objective: "Sales",
    typeCategory: "Influencer Paid",
    scorecards: [
      { label: "Net sales", value: "₹1,68,020", detail: "▲ 18% vs prev.", isPositive: true },
      { label: "Orders", value: "408", detail: "▲ 14% vs prev.", isPositive: true },
      { label: "Link clicks", value: "4,588", detail: "▲ 9% vs prev. · CTR 0.8%", isPositive: true },
      { label: "Engagement rate", value: "5.4%", detail: "▲ 0.4 pt vs prev.", isPositive: true },
      { label: "Views", value: "5.7 L", detail: "▲ 19% vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹70,680", detail: "Estimate · not in ROAS" },
    ],
    trendTitle: "Net sales over time",
    trendSub: "Meera Iyer · all deliverables · Vitamin-C Serum",
    platformTitle: "By platform",
    platformSub: "Share of net sales · orders",
    platformHero: "74%",
    platformHeroSub: "of net sales came from Instagram",
    platformBars: [
      { label: "Instagram Reels · code", pct: "52%", sub: "212 orders" },
      { label: "Instagram Stories · link", pct: "22%", sub: "90 orders" },
      { label: "YouTube · description link", pct: "26%", sub: "106 orders" },
    ],
    platformDisclaimer: "Codes in Reels drove highest order volume; YouTube description links had highest AOV.",
    deliverablesChartTitle: "Net sales by deliverable",
    deliverablesChartSub: "Which posts drove Meera Iyer’s result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "₹84,010 · 50%", pct: 95 },
      { name: "Reel · review", valStr: "₹56,007 · 33%", pct: 65 },
      { name: "Story · link sticker", valStr: "₹28,003 · 17%", pct: 35 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Reels drove 83% of the sales result; final reminder story posts by 30 Oct.",
    sideCardTitle: "Revenue",
    sideCardSub: "Gross to net sales · Shopify attribution",
    sideCardStats: [
      { label: "Gross sales", value: "₹1,84,760", detail: "408 orders" },
      { label: "Returns", value: "− ₹16,740", detail: "9.0% return rate" },
      { label: "Net sales", value: "₹1,68,020", detail: "31% of campaign sales" },
      { label: "ROAS", value: "7.6×", detail: "₹1,68,020 ÷ ₹22,000" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM · CODE", "STATUS", "FEE", "VIEWS", "ENG. RATE", "CLICKS", "ORDERS", "NET SALES"],
    tableRows: [
      {
        name: "Reel · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "MEERA15 · 1 link",
        status: "Approved",
        feeOrProduct: "₹11,000",
        views: "2.6 L",
        engRate: "5.9%",
        clicks: "3,120",
        ordersOrLeads: "212",
        result: "₹84,010",
        resultSub: "ROAS 7.6×",
      },
      {
        name: "Reel · review",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "MEERA15 · 1 link",
        status: "Approved",
        feeOrProduct: "₹7,333",
        views: "1.7 L",
        engRate: "5.9%",
        clicks: "2,080",
        ordersOrLeads: "140",
        result: "₹56,007",
        resultSub: "ROAS 7.6×",
      },
      {
        name: "Story · link sticker",
        dateOrNote: "Posted 18 Oct",
        platform: "Instagram",
        codeOrFormat: "MEERA15 · 1 link",
        status: "Approved",
        feeOrProduct: "₹3,667",
        views: "86,667",
        engRate: "5.9%",
        clicks: "1,040",
        ordersOrLeads: "56",
        result: "₹28,003",
        resultSub: "ROAS 7.6×",
      },
      {
        name: "Story · reminder",
        dateOrNote: "Not posted yet",
        platform: "Instagram",
        codeOrFormat: "MEERA15 · 1 link",
        status: "Scheduled",
        feeOrProduct: "Included",
        views: "—",
        engRate: "—",
        clicks: "—",
        ordersOrLeads: "—",
        result: "Due 30 Oct",
      },
    ],
  },

  // 14. Sales · Influencer Gift exchange
  "Sales_Influencer Gift exchange": {
    creatorDisplayName: "Meera Iyer",
    campaignName: "Vitamin-C Gifting",
    objective: "Sales",
    typeCategory: "Influencer Gift exchange",
    scorecards: [
      { label: "Net sales", value: "₹33,480", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Orders", value: "82", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Link clicks", value: "1,053", detail: "▲ 7% vs prev. · CTR 1.1%", isPositive: true },
      { label: "Engagement rate", value: "6.0%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
      { label: "Views", value: "94,500", detail: "▲ 11% vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹16,740", detail: "Estimate · not in return" },
    ],
    trendTitle: "Net sales over time",
    trendSub: "Meera Iyer · all deliverables · Vitamin-C Gifting",
    platformTitle: "By platform",
    platformSub: "Share of net sales · orders",
    platformHero: "74%",
    platformHeroSub: "of net sales came from Instagram",
    platformBars: [
      { label: "Instagram Reels · code", pct: "60%", sub: "49 orders" },
      { label: "Instagram Stories · link", pct: "40%", sub: "33 orders" },
    ],
    platformDisclaimer: "Gifted affiliate code MEERA15 drove ₹33,480 in sales with zero creator fee.",
    deliverablesChartTitle: "Net sales by deliverable",
    deliverablesChartSub: "Which posts drove Meera Iyer’s result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "₹20,088 · 60%", pct: 90 },
      { name: "Story · routine", valStr: "₹13,392 · 40%", pct: 60 },
    ],
    deliverablesFooterNote: "Reel routine drove 60% of total revenue with verified affiliate cookie tracking.",
    sideCardTitle: "Revenue",
    sideCardSub: "Affiliate gift conversions via Shopify",
    sideCardStats: [
      { label: "Gross sales", value: "₹36,700", detail: "82 orders" },
      { label: "Returns", value: "− ₹3,220", detail: "8.7% return rate" },
      { label: "Net sales", value: "₹33,480", detail: "27% of gifted campaign" },
      { label: "AOV", value: "₹408", detail: "average order value" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM · CODE", "STATUS", "PRODUCT", "VIEWS", "ENG. RATE", "CLICKS", "ORDERS", "NET SALES"],
    tableRows: [
      {
        name: "Reel · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "MEERA15",
        status: "Approved",
        feeOrProduct: "Serum Bottle",
        views: "58,000",
        engRate: "6.2%",
        clicks: "640",
        ordersOrLeads: "49",
        result: "₹20,088",
      },
      {
        name: "Story · routine",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "MEERA15",
        status: "Approved",
        feeOrProduct: "Serum Bottle",
        views: "36,500",
        engRate: "5.8%",
        clicks: "413",
        ordersOrLeads: "33",
        result: "₹13,392",
      },
    ],
  },

  // 15. Sales · UGC
  "Sales_UGC": {
    creatorDisplayName: "Aditi Joshi",
    campaignName: "Serum Ad Creatives UGC",
    objective: "Sales",
    typeCategory: "UGC",
    scorecards: [
      { label: "Usable videos", value: "4 of 4", detail: "100% of the brief" },
      { label: "Approval rate", value: "100%", detail: "approved first time", isPositive: true },
      { label: "Revisions", value: "0", detail: "none needed", isPositive: true },
      { label: "Turnaround", value: "3 days", detail: "▼ 1.2 days vs average", isPositive: true },
      { label: "Files delivered", value: "4", detail: "4 approved · 0 in review" },
      { label: "Cost per usable video", value: "₹2,500", detail: "₹10,000 fee ÷ 4" },
    ],
    trendTitle: "Files delivered over time",
    trendSub: "Aditi Joshi · files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "4 of 4",
    platformHeroSub: "direct response ad videos",
    platformBars: [
      { label: "Instagram · Reels 9:16", pct: "75%", sub: "3 files" },
      { label: "Instagram · Feed 4:5", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "Direct response videos crafted for Meta & YouTube conversion ad campaigns.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in Aditi Joshi’s brief",
    deliverableBars: [
      { name: "Video 1 · Unboxing & glow", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 2 · Dark spot before/after", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 3 · Why I switched", valStr: "Approved · 9:16", pct: 100 },
      { name: "Video 4 · 30-day proof", valStr: "Approved · 4:5", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 videos approved on first pass; ready for Meta Ads Manager import.",
    sideCardTitle: "Content library",
    sideCardSub: "Direct response UGC asset pipeline",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "fast approval" },
      { label: "Cost per video", value: "₹2,500", detail: "fixed contract rate" },
      { label: "Whitelisted", value: "Yes", detail: "commercial license" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Unboxing & glow video",
        dateOrNote: "Delivered 12 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
      {
        name: "Dark spot before/after",
        dateOrNote: "Delivered 14 Oct",
        platform: "Video 9:16",
        codeOrFormat: "4K · MP4",
        status: "Approved",
        feeOrProduct: "₹2,500",
        views: "1",
        engRate: "1",
        clicks: "0",
        ordersOrLeads: "3 days",
        result: "₹2,500",
      },
    ],
  },
};

export function CreatorPerformanceTab({
  creatorName,
  platform,
  project,
  overrideObjective,
  overrideTypeCategory,
}: CreatorPerformanceTabProps) {
  // Determine initial objective & type from project or override
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
  const data =
    CREATOR_PERFORMANCE_VARIANTS[variantKey] ||
    CREATOR_PERFORMANCE_VARIANTS["Sales_Influencer Paid"];

  const effectiveCreatorName = creatorName || data.creatorDisplayName;

  return (
    <div className="space-y-6 mt-4">
      {/* 15-Version Interactive Switcher Bar (Same grid as campaign page) */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-3.5 shadow-xs">
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
              <p className="text-xs text-neutral-500 mt-0.5">
                {effectiveCreatorName} · all deliverables · {data.campaignName}
              </p>
            </div>
          </div>

          {/* Line Chart (SVG) */}
          <div className="mt-6 h-56 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 680 180">
              <defs>
                <linearGradient id="creatorTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B5BFF" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#3B5BFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="0" y1="30" x2="680" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="75" x2="680" y2="75" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="120" x2="680" y2="120" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="165" x2="680" y2="165" stroke="#f1f5f9" strokeWidth="1" />

              <path
                d="M 20 148 C 90 138, 160 122, 230 108 C 300 92, 370 68, 440 52 C 510 38, 580 30, 670 24 L 670 165 L 20 165 Z"
                fill="url(#creatorTrendGrad)"
              />
              <path
                d="M 20 148 C 90 138, 160 122, 230 108 C 300 92, 370 68, 440 52 C 510 38, 580 30, 670 24"
                fill="none"
                stroke="#3B5BFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="440" cy="52" r="4.5" fill="#3B5BFF" stroke="#fff" strokeWidth="2" />
              <circle cx="670" cy="24" r="4.5" fill="#3B5BFF" stroke="#fff" strokeWidth="2" />
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

      {/* Row 2 · Deliverables Bar Chart & Objective Details (NO FUNNELS!) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Deliverables Bar Chart */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              {data.deliverablesChartTitle}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.deliverablesChartSub}</p>

            {/* Bars List */}
            <div className="mt-6 space-y-4">
              {data.deliverableBars.map((b, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-neutral-900">{b.name}</span>
                    <span className="font-semibold text-neutral-950">{b.valStr}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0 ? "bg-neutral-900" : idx === 1 ? "bg-neutral-700" : "bg-neutral-500"
                      }`}
                      style={{ width: `${Math.min(100, Math.max(8, b.pct))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
            {data.deliverablesFooterNote}
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
            Metrics reflect verified deliverable tracking for {effectiveCreatorName}.
          </div>
        </div>
      </div>

      {/* Row 3 · Deliverables Breakdown Table */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-neutral-200">
          <h3 className="text-base font-semibold text-neutral-900">Deliverables performance</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Individual deliverable status and tracking metrics
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
                    <div className="text-[11px] text-neutral-500">{row.dateOrNote}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-neutral-900">{row.platform}</div>
                    <div className="text-[11px] text-neutral-500">{row.codeOrFormat}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        row.status === "Approved" || row.status === "Completed"
                          ? "bg-neutral-100 text-neutral-700"
                          : row.status === "Scheduled"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          row.status === "Approved" || row.status === "Completed"
                            ? "bg-neutral-500"
                            : row.status === "Scheduled"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-neutral-900">
                    {row.feeOrProduct}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-neutral-900">
                    {row.views}
                  </td>
                  <td className="py-3.5 px-4 text-right text-neutral-800">{row.engRate}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-800">{row.clicks}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-800">{row.ordersOrLeads}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-semibold text-neutral-900">{row.result}</div>
                    {row.resultSub && (
                      <div className="text-[11px] text-neutral-500 font-medium">
                        {row.resultSub}
                      </div>
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
