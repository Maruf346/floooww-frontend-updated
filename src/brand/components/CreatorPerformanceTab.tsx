import { useState, useMemo } from "react";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import type { Platform } from "@/common/types";
import type { Project } from "@/brand/data/projects";

export type ObjectiveType = "Awareness" | "Engagement" | "Traffic" | "Lead generation" | "Sales";
export type TypeCategory = "Influencer Paid" | "Influencer Gift exchange" | "UGC";

export interface CreatorPerformanceTabProps {
  creatorName?: string;
  platform?: Platform;
  showCustomReport?: boolean;
  project?: Project;
  overrideObjective?: ObjectiveType;
  overrideTypeCategory?: TypeCategory;
  perspective?: "brand" | "creator";
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
  status: "Approved" | "Scheduled" | "Completed" | "In review" | "Not started";
  feeOrProduct: string;
  views: string;
  engRate: string;
  clicks: string;
  ordersOrLeads: string;
  result: string;
  resultSub?: string;
}

export interface FeeBreakdownItem {
  label: string;
  desc: string;
  amount: string;
  pct: string;
}

export interface FeeData {
  title: string;
  subtitle: string;
  totalAmount: string;
  unitLabel?: string;
  breakdown: FeeBreakdownItem[];
  escrow?: FeeBreakdownItem;
  notFunded?: FeeBreakdownItem;
}

export interface CostResultItem {
  label: string;
  acronym: string;
  value: string;
  benchmark: string;
  diff: string;
}

export interface ValueData {
  title: string;
  metricTitle: string;
  heroValue: string;
  trendBadge?: string;
  trendDesc?: string;
  costResultsTitle?: string;
  costs: CostResultItem[];
  footerNote?: string;
}

export interface EngagementData {
  viewsTotal: string;
  followersVal: string;
  nonFollowersVal: string;
  breakdownTitle: string;
  breakdownSub: string;
  interactions: { label: string; val: string }[];
  totalInteractions: string;
  saveShareRate: string;
  formatTitle: string;
  formatBars: { label: string; pct: string }[];
  formatNote: string;
}

export interface AudienceData {
  countriesTitle: string;
  countriesSub: string;
  countries: { label: string; pct: string }[];
  citiesTitle: string;
  citiesSub: string;
  cities: { label: string; pct: string }[];
  ageGenderTitle: string;
  ageGenderSub: string;
  womenPct: string;
  menPct: string;
  ageBrackets: { age: string; femalePct: string; malePct: string }[];
}

export interface CreatorVariantData {
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
  feeData: FeeData;
  valueData: ValueData;
  engagementData?: EngagementData;
  audienceData?: AudienceData;
}

// 15 distinct variants for a creator inside a project workspace
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
    trendSub: "Your deliverables · Glow Squad",
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
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "5.0 L · 50%", pct: 95 },
      { name: "Reel · review", valStr: "3.3 L · 33%", pct: 66 },
      { name: "Story · link sticker", valStr: "1.6 L · 17%", pct: 33 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Reels drove 83% of your reach; the final reminder story goes live 30 Oct.",
    sideCardTitle: "Reach",
    sideCardSub: "Reach vs the target · your posts",
    sideCardStats: [
      { label: "Total reach", value: "9.9 L", detail: "22% of campaign total" },
      { label: "Total impressions", value: "23.2 L", detail: "2.3× frequency" },
      { label: "Effective CPM", value: "₹45", detail: "per 1,000 reached" },
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
        feeOrProduct: "₹22,500",
        views: "5.0 L",
        engRate: "6.4%",
        clicks: "11.6 L",
        ordersOrLeads: "2.3×",
        result: "₹45 CPM",
      },
      {
        name: "Reel · review",
        dateOrNote: "Posted 16 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "₹15,000",
        views: "3.3 L",
        engRate: "5.8%",
        clicks: "7.7 L",
        ordersOrLeads: "2.3×",
        result: "₹45 CPM",
      },
      {
        name: "Story · link sticker",
        dateOrNote: "Posted 20 Oct",
        platform: "Instagram",
        codeOrFormat: "Story 9:16",
        status: "Approved",
        feeOrProduct: "₹7,500",
        views: "1.6 L",
        engRate: "5.9%",
        clicks: "3.9 L",
        ordersOrLeads: "2.4×",
        result: "₹47 CPM",
      },
      {
        name: "Story · reminder",
        dateOrNote: "Due 30 Oct",
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
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹45,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹30,000", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹15,000", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per 1,000 reached (CPM)",
      heroValue: "₹55",
      trendBadge: "▼ ₹6 vs previous period",
      trendDesc: "₹55 in fees for every 1,000 people reached",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per 1,000 impressions", acronym: "CPM", value: "₹23", benchmark: "vs ₹28", diff: "−18%" },
        { label: "Cost per reach", acronym: "CPR", value: "₹55", benchmark: "vs ₹61", diff: "−10%" },
        { label: "Cost per video view", acronym: "CPV", value: "₹0.06", benchmark: "vs ₹0.08", diff: "−25%" },
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.85", benchmark: "vs ₹1.05", diff: "−19%" },
      ],
      footerNote: "For costs, lower is better. Project average covers the 6 live creators in Glow Squad.",
    },
    engagementData: {
      viewsTotal: "7.8 L",
      followersVal: "2.5 L · 32%",
      nonFollowersVal: "5.3 L · 68%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 6.1% engagement rate is made of · 2,51,000",
      interactions: [
        { label: "Likes", val: "43,680 · 72%" },
        { label: "Comments", val: "3,360 · 6%" },
        { label: "Saves", val: "7,680 · 13%" },
        { label: "Shares", val: "5,520 · 9%" },
      ],
      totalInteractions: "60,240",
      saveShareRate: "22%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
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
    trendSub: "Your deliverables · SPF Mini Kit Seeding",
    platformTitle: "By platform",
    platformSub: "Share of reach · reach per creator",
    platformHero: "78%",
    platformHeroSub: "of reach came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "64%" },
      { label: "Instagram Stories", pct: "18%" },
      { label: "YouTube Shorts", pct: "18%" },
    ],
    platformDisclaimer: "Seeding kit drove 2.3 L organic reach across social followers.",
    deliverablesChartTitle: "Reach by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "1.1 L · 50%", pct: 90 },
      { name: "Reel · review", valStr: "76,667 · 33%", pct: 60 },
      { name: "Story · link sticker", valStr: "38,333 · 17%", pct: 30 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Reels drove 83% of your reach result; final story posts 30 Oct.",
    sideCardTitle: "Reach",
    sideCardSub: "Reach vs the 15 L target · your posts",
    sideCardStats: [
      { label: "Total reach", value: "2.3 L", detail: "Organic reach" },
      { label: "Impressions", value: "5.0 L", detail: "2.1× repeat" },
      { label: "Product value", value: "₹1,350", detail: "Kit retail value" },
      { label: "Est. CPM", value: "₹11", detail: "Based on product" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "REACH", "IMPR.", "VIEWS", "FREQ.", "CPM"],
    tableRows: [
      {
        name: "Reel · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "Mini Kit × 1",
        views: "1.1 L",
        engRate: "6.8%",
        clicks: "2.5 L",
        ordersOrLeads: "2.1×",
        result: "₹11 CPM",
      },
    ],
    feeData: {
      title: "Product & shipping",
      subtitle: "Gift exchange · no fee · products you received",
      totalAmount: "₹1,350",
      unitLabel: "total",
      breakdown: [
        { label: "Kit delivered", desc: "arrived 9 Oct · posting started", amount: "₹1,350", pct: "100%" },
      ],
      escrow: { label: "In transit", desc: "nothing on the way", amount: "₹0", pct: "0%" },
      notFunded: { label: "Not shipped yet", desc: "—", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per 1,000 reached (kit + shipping)",
      heroValue: "₹11",
      trendBadge: "▼ ₹2 vs previous period",
      trendDesc: "₹11 of product and shipping for every 1,000 people reached",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per 1,000 impressions", acronym: "CPM", value: "₹5.80", benchmark: "vs ₹6.90", diff: "−16%" },
        { label: "Cost per reach", acronym: "CPR", value: "₹11.00", benchmark: "vs ₹13.00", diff: "−15%" },
        { label: "Cost per view", acronym: "CPV", value: "₹0.01", benchmark: "vs ₹0.02", diff: "−50%" },
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.16", benchmark: "vs ₹0.21", diff: "−24%" },
      ],
      footerNote: "For costs, lower is better. Compared with the previous period of the same length.",
    },
    engagementData: {
      viewsTotal: "1.9 L",
      followersVal: "72,000 · 38%",
      nonFollowersVal: "1.18 L · 62%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 6.8% engagement rate is made of · 12,920",
      interactions: [
        { label: "Likes", val: "8,914 · 69%" },
        { label: "Comments", val: "1,162 · 9%" },
        { label: "Saves", val: "1,808 · 14%" },
        { label: "Shares", val: "1,036 · 8%" },
      ],
      totalInteractions: "12,920",
      saveShareRate: "22%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "64%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 3. Awareness · UGC
  "Awareness_UGC": {
    creatorDisplayName: "Sunscreen UGC",
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
    trendSub: "Your files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "3 of 4",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram Reels · 9:16", pct: "75%", sub: "3 files" },
      { label: "YouTube Shorts · 9:16", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "All delivered files conform to vertical video specifications.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in your brief",
    deliverableBars: [
      { name: "Video · product demo", valStr: "Approved · 3 days", pct: 100 },
      { name: "Video · unboxing", valStr: "Approved · 2 days", pct: 100 },
      { name: "Video · how-to", valStr: "Approved · 4 days", pct: 100 },
      { name: "Photo set (5)", valStr: "Approved · 2 days", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 deliverables approved; rights cleared for paid advertising.",
    sideCardTitle: "Content library",
    sideCardSub: "Your files in Minimalist’s Content hub",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% of brief" },
      { label: "Approval rate", value: "100%", detail: "first attempt" },
      { label: "Avg. turnaround", value: "3 days", detail: "within deadline" },
      { label: "Usage license", value: "1 year", detail: "digital rights" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Video · product demo",
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
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹10,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹7,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹2,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per usable video",
      heroValue: "₹3,750",
      trendBadge: "▼ ₹450 vs previous period",
      trendDesc: "₹3,750 in fees for every video you can use",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per file delivered", acronym: "CPF", value: "₹2,500", benchmark: "fixed rate", diff: "0%" },
        { label: "Cost per usable video", acronym: "CPUV", value: "₹2,500", benchmark: "vs ₹2,950", diff: "−15%" },
        { label: "Turnaround time", acronym: "TAT", value: "3 days", benchmark: "vs 4.2 d", diff: "−28%" },
        { label: "Revision rate", acronym: "REV", value: "0%", benchmark: "vs 18%", diff: "−100%" },
      ],
      footerNote: "All 4 videos delivered within SLA and approved on first pass.",
    },
  },

  // 4. Engagement · Influencer Paid
  "Engagement_Influencer Paid": {
    creatorDisplayName: "Tanvi Shah",
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
    trendSub: "Your deliverables · Niacinamide Serum",
    platformTitle: "By platform",
    platformSub: "Share of engagements · total interactions",
    platformHero: "84%",
    platformHeroSub: "of engagements came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "68%", sub: "28,791" },
      { label: "Instagram Stories", pct: "16%", sub: "6,774" },
      { label: "YouTube Shorts", pct: "16%", sub: "6,775" },
    ],
    platformDisclaimer: "Reels delivered 3.6K saves demonstrating high product interest.",
    deliverablesChartTitle: "Total Engagement by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "21,170 · 50%", pct: 95 },
      { name: "Reel · review", valStr: "14,113 · 33%", pct: 65 },
      { name: "Story · link sticker", valStr: "7,057 · 17%", pct: 35 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Reel routine generated 21K+ interactions with 5.8% avg engagement rate.",
    sideCardTitle: "Engagement quality",
    sideCardSub: "How people engaged · saves and shares count most",
    sideCardStats: [
      { label: "Total interactions", value: "42,340", detail: "Across 3 posts" },
      { label: "Save rate", value: "8.5%", detail: "High buying intent" },
      { label: "Share rate", value: "4.7%", detail: "Strong viral loop" },
      { label: "Cost per eng.", value: "₹0.68", detail: "Fee ÷ total eng." },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "FEE", "VIEWS", "ENG. RATE", "LIKES", "SAVES", "RESULT"],
    tableRows: [
      {
        name: "Reel · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "₹7,000",
        views: "3.7 L",
        engRate: "5.8%",
        clicks: "16.9K",
        ordersOrLeads: "1.8K",
        result: "21,170 eng.",
      },
    ],
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹14,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹10,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹3,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per engagement (fees)",
      heroValue: "₹0.68",
      trendBadge: "▼ ₹0.09 vs previous period",
      trendDesc: "₹0.68 in fees for every engagement",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.68", benchmark: "vs ₹0.77", diff: "−12%" },
        { label: "Cost per save", acronym: "CPS", value: "₹3.88", benchmark: "vs ₹4.60", diff: "−16%" },
        { label: "Cost per share", acronym: "CPSH", value: "₹7.05", benchmark: "vs ₹8.20", diff: "−14%" },
        { label: "Cost per comment", acronym: "CPC", value: "₹5.18", benchmark: "vs ₹6.00", diff: "−14%" },
      ],
      footerNote: "For costs, lower is better. Project average covers the live creators in Niacinamide Serum.",
    },
    engagementData: {
      viewsTotal: "7.3 L",
      followersVal: "2.8 L · 38%",
      nonFollowersVal: "4.5 L · 62%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 5.8% engagement rate is made of · 42,340",
      interactions: [
        { label: "Likes", val: "33,872 · 80%" },
        { label: "Comments", val: "2,703 · 6%" },
        { label: "Saves", val: "3,600 · 9%" },
        { label: "Shares", val: "1,986 · 5%" },
      ],
      totalInteractions: "42,340",
      saveShareRate: "14%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 5. Engagement · Influencer Gift exchange
  "Engagement_Influencer Gift exchange": {
    creatorDisplayName: "Tanvi Shah",
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
    trendSub: "Your deliverables · Hydration Bundle",
    platformTitle: "By platform",
    platformSub: "Share of engagements · total interactions",
    platformHero: "84%",
    platformHeroSub: "of engagements came from Instagram",
    platformBars: [
      { label: "Instagram Reels", pct: "68%", sub: "28,791" },
      { label: "Instagram Stories", pct: "16%", sub: "6,774" },
      { label: "YouTube Shorts", pct: "16%", sub: "6,775" },
    ],
    platformDisclaimer: "Seeding kit generated organic save rate 8.5% across beauty followers.",
    deliverablesChartTitle: "Total Engagement by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "21,170 · 50%", pct: 95 },
      { name: "Reel · review", valStr: "14,113 · 33%", pct: 65 },
      { name: "Story · link sticker", valStr: "7,057 · 17%", pct: 35 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Reels drove 83% of engagement result; reminder story scheduled 30 Oct.",
    sideCardTitle: "Engagement quality",
    sideCardSub: "How people engaged · saves and shares count most",
    sideCardStats: [
      { label: "Total interactions", value: "42,340", detail: "Organic response" },
      { label: "Save rate", value: "8.5%", detail: "High benchmark" },
      { label: "Share rate", value: "4.7%", detail: "Strong referral" },
      { label: "Cost per eng.", value: "₹0.37", detail: "Kit ÷ total eng." },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "VIEWS", "ENG. RATE", "LIKES", "SAVES", "RESULT"],
    tableRows: [
      {
        name: "Reel · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "Reel 9:16",
        status: "Approved",
        feeOrProduct: "Hydration Kit",
        views: "3.7 L",
        engRate: "5.8%",
        clicks: "16.9K",
        ordersOrLeads: "1.8K",
        result: "21,170 eng.",
      },
    ],
    feeData: {
      title: "Product & shipping",
      subtitle: "Gift exchange · no fee · products you received",
      totalAmount: "₹6,680",
      unitLabel: "total",
      breakdown: [
        { label: "Kit delivered", desc: "arrived 9 Oct · posting started", amount: "₹6,680", pct: "100%" },
      ],
      escrow: { label: "In transit", desc: "nothing on the way", amount: "₹0", pct: "0%" },
      notFunded: { label: "Not shipped yet", desc: "—", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per engagement (product + shipping)",
      heroValue: "₹0.37",
      trendBadge: "▼ ₹0.05 vs previous period",
      trendDesc: "₹0.37 of product and shipping for every engagement",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.37", benchmark: "vs ₹0.42", diff: "−12%" },
        { label: "Cost per save", acronym: "CPS", value: "₹1.85", benchmark: "vs ₹2.20", diff: "−16%" },
        { label: "Cost per share", acronym: "CPSH", value: "₹3.36", benchmark: "vs ₹3.90", diff: "−14%" },
        { label: "Cost per comment", acronym: "CPC", value: "₹2.47", benchmark: "vs ₹2.90", diff: "−15%" },
      ],
      footerNote: "For costs, lower is better. Compared with the previous period of the same length.",
    },
    engagementData: {
      viewsTotal: "7.3 L",
      followersVal: "2.8 L · 38%",
      nonFollowersVal: "4.5 L · 62%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 5.8% engagement rate is made of · 42,340",
      interactions: [
        { label: "Likes", val: "33,872 · 80%" },
        { label: "Comments", val: "2,703 · 6%" },
        { label: "Saves", val: "3,600 · 9%" },
        { label: "Shares", val: "1,986 · 5%" },
      ],
      totalInteractions: "42,340",
      saveShareRate: "14%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 6. Engagement · UGC
  "Engagement_UGC": {
    creatorDisplayName: "Hydration UGC",
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
    trendSub: "Your files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "3 of 4",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram Reels · 9:16", pct: "75%", sub: "3 files" },
      { label: "Instagram Feed · 4:5", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "All assets tailored for maximum engagement in paid community ads.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in your brief",
    deliverableBars: [
      { name: "Video · product demo", valStr: "Approved · 3 days", pct: 100 },
      { name: "Video · unboxing", valStr: "Approved · 2 days", pct: 100 },
      { name: "Video · how-to", valStr: "Approved · 4 days", pct: 100 },
      { name: "Photo set (5)", valStr: "Approved · 2 days", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 videos approved on first pass; ready for Meta Ads Manager import.",
    sideCardTitle: "Content library",
    sideCardSub: "Your files in Minimalist’s Content hub",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "fast approval" },
      { label: "Cost per video", value: "₹2,500", detail: "fixed contract rate" },
      { label: "Whitelisted", value: "Yes", detail: "commercial license" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Video · product demo",
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
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹10,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹7,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹2,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per usable video",
      heroValue: "₹3,750",
      trendBadge: "▼ ₹450 vs previous period",
      trendDesc: "₹3,750 in fees for every video you can use",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per file delivered", acronym: "CPF", value: "₹2,500", benchmark: "fixed rate", diff: "0%" },
        { label: "Cost per usable video", acronym: "CPUV", value: "₹2,500", benchmark: "vs ₹2,950", diff: "−15%" },
        { label: "Turnaround time", acronym: "TAT", value: "3 days", benchmark: "vs 4.2 d", diff: "−28%" },
        { label: "Revision rate", acronym: "REV", value: "0%", benchmark: "vs 18%", diff: "−100%" },
      ],
      footerNote: "All 4 videos delivered within SLA and approved on first pass.",
    },
  },

  // 7. Traffic · Influencer Paid
  "Traffic_Influencer Paid": {
    creatorDisplayName: "Karan Verma",
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
    trendSub: "Your deliverables · Sunscreen Stick Launch",
    platformTitle: "By platform",
    platformSub: "Share of clicks · direct traffic",
    platformHero: "71%",
    platformHeroSub: "of clicks came from Instagram Stories links",
    platformBars: [
      { label: "Instagram Stories · link sticker", pct: "71%", sub: "4,869 clicks" },
      { label: "YouTube · description link", pct: "19%", sub: "1,303 clicks" },
      { label: "Instagram Bio · link in bio", pct: "10%", sub: "686 clicks" },
    ],
    platformDisclaimer: "Story link stickers with custom UTM delivered highest click-through rate.",
    deliverablesChartTitle: "Link clicks by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "3,429 · 50%", pct: 95 },
      { name: "Reel · review", valStr: "2,286 · 33%", pct: 65 },
      { name: "Story · link sticker", valStr: "1,143 · 17%", pct: 35 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Story link stickers delivered 71% of total site traffic.",
    sideCardTitle: "Traffic",
    sideCardSub: "Visits from your links · GA4 · your posts",
    sideCardStats: [
      { label: "Total link clicks", value: "6,858", detail: "Verified GA4 sessions" },
      { label: "Bounce rate", value: "42%", detail: "Healthy landing" },
      { label: "Avg. session", value: "1m 12s", detail: "Deep site exploration" },
      { label: "Cost per click", value: "₹5.91", detail: "Total fee ÷ clicks" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "FEE", "VIEWS", "CTR", "CLICKS", "SESSIONS", "RESULT"],
    tableRows: [
      {
        name: "Story · link sticker",
        dateOrNote: "Posted 14 Oct",
        platform: "Instagram",
        codeOrFormat: "flw.to/stick-karan",
        status: "Approved",
        feeOrProduct: "₹6,000",
        views: "1.4 L",
        engRate: "3.2%",
        clicks: "4,869",
        ordersOrLeads: "3,895",
        result: "₹5.91 CPC",
      },
    ],
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹18,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹13,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹4,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per link click (CPC)",
      heroValue: "₹5.91",
      trendBadge: "▼ ₹0.80 vs previous period",
      trendDesc: "₹5.91 in fees for every click to your site",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per link click", acronym: "CPC", value: "₹5.91", benchmark: "vs ₹6.71", diff: "−12%" },
        { label: "Cost per landing page view", acronym: "CPLV", value: "₹7.58", benchmark: "vs ₹8.90", diff: "−15%" },
        { label: "Cost per 1,000 views", acronym: "CPM", value: "₹41.80", benchmark: "vs ₹49.00", diff: "−15%" },
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.85", benchmark: "vs ₹1.05", diff: "−19%" },
      ],
      footerNote: "For costs, lower is better. Project average covers the live creators in Sunscreen Stick Launch.",
    },
    engagementData: {
      viewsTotal: "4.3 L",
      followersVal: "1.7 L · 40%",
      nonFollowersVal: "2.6 L · 60%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 4.9% engagement rate is made of · 77,900",
      interactions: [
        { label: "Likes", val: "14,040 · 67%" },
        { label: "Comments", val: "1,647 · 8%" },
        { label: "Saves", val: "3,132 · 15%" },
        { label: "Shares", val: "2,214 · 10%" },
      ],
      totalInteractions: "21,033",
      saveShareRate: "25%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 8. Traffic · Influencer Gift exchange
  "Traffic_Influencer Gift exchange": {
    creatorDisplayName: "Karan Verma",
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
    trendSub: "Your deliverables · Lip Balm Seeding",
    platformTitle: "By platform",
    platformSub: "Share of clicks · direct traffic",
    platformHero: "71%",
    platformHeroSub: "of clicks came from Instagram Stories links",
    platformBars: [
      { label: "Instagram Stories · link sticker", pct: "71%", sub: "1,362 clicks" },
      { label: "YouTube · description link", pct: "19%", sub: "364 clicks" },
      { label: "Instagram Bio · link in bio", pct: "10%", sub: "192 clicks" },
    ],
    platformDisclaimer: "Seeding pack generated 1,918 clicks without paid advertising fee.",
    deliverablesChartTitle: "Link clicks by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "959 · 50%", pct: 90 },
      { name: "Reel · review", valStr: "639 · 33%", pct: 60 },
      { name: "Story · link sticker", valStr: "320 · 17%", pct: 30 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Link sticker in Story drove 71% of website referral sessions.",
    sideCardTitle: "Traffic",
    sideCardSub: "Visits from your links · GA4 · your posts",
    sideCardStats: [
      { label: "Total link clicks", value: "1,918", detail: "Direct organic visits" },
      { label: "Landing page views", value: "1,534", detail: "80% retention" },
      { label: "Product value", value: "₹699", detail: "Gifted item" },
      { label: "Cost per click", value: "₹1.02", detail: "Product ÷ clicks" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "VIEWS", "CTR", "CLICKS", "SESSIONS", "RESULT"],
    tableRows: [
      {
        name: "Story · link sticker",
        dateOrNote: "Posted 14 Oct",
        platform: "Instagram",
        codeOrFormat: "flw.to/balm-karan",
        status: "Approved",
        feeOrProduct: "Lip Balm Kit",
        views: "42,000",
        engRate: "3.6%",
        clicks: "1,362",
        ordersOrLeads: "1,090",
        result: "₹1.02 CPC",
      },
    ],
    feeData: {
      title: "Product & shipping",
      subtitle: "Gift exchange · no fee · products you received",
      totalAmount: "₹699",
      unitLabel: "total",
      breakdown: [
        { label: "Kit delivered", desc: "arrived 9 Oct · posting started", amount: "₹699", pct: "100%" },
      ],
      escrow: { label: "In transit", desc: "nothing on the way", amount: "₹0", pct: "0%" },
      notFunded: { label: "Not shipped yet", desc: "—", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per link click (kit + shipping)",
      heroValue: "₹1.02",
      trendBadge: "▼ ₹0.15 vs previous period",
      trendDesc: "₹1.02 of product and shipping for every click",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per link click", acronym: "CPC", value: "₹1.02", benchmark: "vs ₹1.17", diff: "−13%" },
        { label: "Cost per landing page view", acronym: "CPLV", value: "₹1.27", benchmark: "vs ₹1.48", diff: "−14%" },
        { label: "Cost per 1,000 views", acronym: "CPM", value: "₹7.00", benchmark: "vs ₹8.20", diff: "−15%" },
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.18", benchmark: "vs ₹0.22", diff: "−18%" },
      ],
      footerNote: "For costs, lower is better. Compared with the previous period of the same length.",
    },
    engagementData: {
      viewsTotal: "1.0 L",
      followersVal: "40,000 · 40%",
      nonFollowersVal: "60,000 · 60%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 6.2% engagement rate is made of · 6,200",
      interactions: [
        { label: "Likes", val: "4,154 · 67%" },
        { label: "Comments", val: "496 · 8%" },
        { label: "Saves", val: "930 · 15%" },
        { label: "Shares", val: "620 · 10%" },
      ],
      totalInteractions: "6,200",
      saveShareRate: "25%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 9. Traffic · UGC
  "Traffic_UGC": {
    creatorDisplayName: "Lip Tint UGC",
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
    trendSub: "Your files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "3 of 4",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram Reels · 9:16", pct: "75%", sub: "3 files" },
      { label: "YouTube Shorts · 9:16", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "All clips designed with direct CTA banners driving to product page.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in your brief",
    deliverableBars: [
      { name: "Video · product demo", valStr: "Approved · 3 days", pct: 100 },
      { name: "Video · unboxing", valStr: "Approved · 2 days", pct: 100 },
      { name: "Video · how-to", valStr: "Approved · 4 days", pct: 100 },
      { name: "Photo set (5)", valStr: "Approved · 2 days", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 videos approved on first pass; ready for Meta Ads Manager import.",
    sideCardTitle: "Content library",
    sideCardSub: "Your files in Minimalist’s Content hub",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "fast approval" },
      { label: "Cost per video", value: "₹2,500", detail: "fixed contract rate" },
      { label: "Whitelisted", value: "Yes", detail: "commercial license" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Video · product demo",
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
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹10,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹7,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹2,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per usable video",
      heroValue: "₹3,750",
      trendBadge: "▼ ₹450 vs previous period",
      trendDesc: "₹3,750 in fees for every video you can use",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per file delivered", acronym: "CPF", value: "₹2,500", benchmark: "fixed rate", diff: "0%" },
        { label: "Cost per usable video", acronym: "CPUV", value: "₹2,500", benchmark: "vs ₹2,950", diff: "−15%" },
        { label: "Turnaround time", acronym: "TAT", value: "3 days", benchmark: "vs 4.2 d", diff: "−28%" },
        { label: "Revision rate", acronym: "REV", value: "0%", benchmark: "vs 18%", diff: "−100%" },
      ],
      footerNote: "All 4 videos delivered within SLA and approved on first pass.",
    },
  },

  // 10. Lead generation · Influencer Paid
  "Lead generation_Influencer Paid": {
    creatorDisplayName: "Priya Nair",
    campaignName: "Skin Type Quiz",
    objective: "Lead generation",
    typeCategory: "Influencer Paid",
    scorecards: [
      { label: "Leads", value: "972", detail: "▲ 24% vs prev.", isPositive: true },
      { label: "Sign-up rate", value: "18.6%", detail: "of link clicks", isPositive: true },
      { label: "Link clicks", value: "5,220", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Qualified leads", value: "633", detail: "65% of leads" },
      { label: "Views", value: "3.8 L", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.1%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Leads over time",
    trendSub: "Your deliverables · Skin Type Quiz",
    platformTitle: "By platform",
    platformSub: "Share of leads · sign-up source",
    platformHero: "82%",
    platformHeroSub: "of leads came from Instagram",
    platformBars: [
      { label: "Instagram Stories · quiz sticker", pct: "58%", sub: "564 leads" },
      { label: "Instagram Reels · link in bio", pct: "24%", sub: "233 leads" },
      { label: "YouTube · card overlay", pct: "18%", sub: "175 leads" },
    ],
    platformDisclaimer: "Interactive quiz sticker stories converted at 21.4% lead capture rate.",
    deliverablesChartTitle: "Leads by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "486 · 50%", pct: 95 },
      { name: "Reel · review", valStr: "321 · 33%", pct: 65 },
      { name: "Story · link sticker", valStr: "165 · 17%", pct: 35 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Stories drove 75% of high-intent skin type quiz submissions.",
    sideCardTitle: "Leads",
    sideCardSub: "Sign-ups from your links and codes · your posts",
    sideCardStats: [
      { label: "Total leads", value: "972", detail: "Form submissions" },
      { label: "Qualified", value: "633", detail: "Valid email & phone" },
      { label: "Conversion rate", value: "18.6%", detail: "Clicks to lead" },
      { label: "Cost per lead", value: "₹37", detail: "₹18,000 ÷ 972" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "FEE", "VIEWS", "CLICKS", "LEADS", "QUALIFIED", "RESULT"],
    tableRows: [
      {
        name: "Story · quiz sticker",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "QUIZ-PRIYA",
        status: "Approved",
        feeOrProduct: "₹6,000",
        views: "1.2 L",
        engRate: "4.8%",
        clicks: "2,635",
        ordersOrLeads: "564",
        result: "₹37 CPL",
      },
    ],
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹18,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹13,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹4,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per lead (CPL)",
      heroValue: "₹37",
      trendBadge: "▼ ₹6 vs previous period",
      trendDesc: "₹37 in fees for every sign-up",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per lead", acronym: "CPL", value: "₹37", benchmark: "vs ₹43", diff: "−14%" },
        { label: "Cost per qualified lead", acronym: "CPQL", value: "₹56", benchmark: "vs ₹67", diff: "−16%" },
        { label: "Cost per click", acronym: "CPC", value: "₹6.89", benchmark: "vs ₹7.90", diff: "−13%" },
        { label: "Cost per 1,000 views", acronym: "CPM", value: "₹47.30", benchmark: "vs ₹55.00", diff: "−14%" },
      ],
      footerNote: "For costs, lower is better. Project average covers the live creators in Skin Type Quiz.",
    },
    engagementData: {
      viewsTotal: "3.8 L",
      followersVal: "1.6 L · 42%",
      nonFollowersVal: "2.2 L · 58%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 5.1% engagement rate is made of · 64,300",
      interactions: [
        { label: "Likes", val: "13,200 · 68%" },
        { label: "Comments", val: "1,740 · 9%" },
        { label: "Saves", val: "2,730 · 14%" },
        { label: "Shares", val: "1,620 · 8%" },
      ],
      totalInteractions: "19,290",
      saveShareRate: "23%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 11. Lead generation · Influencer Gift exchange
  "Lead generation_Influencer Gift exchange": {
    creatorDisplayName: "Priya Nair",
    campaignName: "Skin Quiz Seeding",
    objective: "Lead generation",
    typeCategory: "Influencer Gift exchange",
    scorecards: [
      { label: "Leads", value: "920", detail: "▲ 16% vs prev.", isPositive: true },
      { label: "Sign-up rate", value: "17.2%", detail: "of link clicks", isPositive: true },
      { label: "Link clicks", value: "1,498", detail: "▲ 11% vs prev.", isPositive: true },
      { label: "Qualified leads", value: "590", detail: "64% of leads" },
      { label: "Views", value: "86,800", detail: "▲ 8% vs prev.", isPositive: true },
      { label: "Engagement rate", value: "5.9%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
    ],
    trendTitle: "Leads over time",
    trendSub: "Your deliverables · Skin Quiz Seeding",
    platformTitle: "By platform",
    platformSub: "Share of leads · sign-up source",
    platformHero: "82%",
    platformHeroSub: "of leads came from Instagram",
    platformBars: [
      { label: "Instagram Stories · quiz sticker", pct: "60%", sub: "552 leads" },
      { label: "Instagram Reels · link in bio", pct: "25%", sub: "230 leads" },
      { label: "YouTube · card overlay", pct: "15%", sub: "138 leads" },
    ],
    platformDisclaimer: "Seeding kit generated 920 qualified skin consultations.",
    deliverablesChartTitle: "Leads by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "460 · 50%", pct: 90 },
      { name: "Reel · review", valStr: "304 · 33%", pct: 60 },
      { name: "Story · link sticker", valStr: "156 · 17%", pct: 30 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Quiz link sticker delivered 60% of all sign-ups.",
    sideCardTitle: "Leads",
    sideCardSub: "Sign-ups from your links and codes · your posts",
    sideCardStats: [
      { label: "Total leads", value: "920", detail: "Organic quiz takers" },
      { label: "Qualified", value: "590", detail: "Verified contacts" },
      { label: "Sign-up rate", value: "17.2%", detail: "From visits" },
      { label: "Cost per lead", value: "₹9.10", detail: "Kit ÷ leads" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM", "STATUS", "PRODUCT", "VIEWS", "CLICKS", "LEADS", "QUALIFIED", "RESULT"],
    tableRows: [
      {
        name: "Story · quiz sticker",
        dateOrNote: "Posted 15 Oct",
        platform: "Instagram",
        codeOrFormat: "QUIZ-PRIYA",
        status: "Approved",
        feeOrProduct: "Trial Kit × 1",
        views: "42,000",
        engRate: "5.2%",
        clicks: "898",
        ordersOrLeads: "552",
        result: "₹9.10 CPL",
      },
    ],
    feeData: {
      title: "Product & shipping",
      subtitle: "Gift exchange · no fee · products you received",
      totalAmount: "₹1,049",
      unitLabel: "total",
      breakdown: [
        { label: "Kit delivered", desc: "arrived 9 Oct · posting started", amount: "₹1,049", pct: "100%" },
      ],
      escrow: { label: "In transit", desc: "nothing on the way", amount: "₹0", pct: "0%" },
      notFunded: { label: "Not shipped yet", desc: "—", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per lead (kit + shipping)",
      heroValue: "₹9.10",
      trendBadge: "▼ ₹1.20 vs previous period",
      trendDesc: "₹9.10 of product and shipping for every sign-up",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per lead", acronym: "CPL", value: "₹9.10", benchmark: "vs ₹10.30", diff: "−12%" },
        { label: "Cost per qualified lead", acronym: "CPQL", value: "₹14.20", benchmark: "vs ₹16.50", diff: "−14%" },
        { label: "Cost per click", acronym: "CPC", value: "₹1.56", benchmark: "vs ₹1.80", diff: "−13%" },
        { label: "Cost per 1,000 views", acronym: "CPM", value: "₹12.00", benchmark: "vs ₹14.00", diff: "−14%" },
      ],
      footerNote: "For costs, lower is better. Compared with the previous period of the same length.",
    },
    engagementData: {
      viewsTotal: "86,800",
      followersVal: "36,456 · 42%",
      nonFollowersVal: "50,344 · 58%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 5.9% engagement rate is made of · 5,120",
      interactions: [
        { label: "Likes", val: "3,480 · 68%" },
        { label: "Comments", val: "460 · 9%" },
        { label: "Saves", val: "716 · 14%" },
        { label: "Shares", val: "464 · 9%" },
      ],
      totalInteractions: "5,120",
      saveShareRate: "23%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 12. Lead generation · UGC
  "Lead generation_UGC": {
    creatorDisplayName: "Quiz UGC",
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
    trendSub: "Your files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "3 of 4",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram Reels · 9:16", pct: "75%", sub: "3 files" },
      { label: "YouTube Shorts · 9:16", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "Interactive screen-record explainers crafted for Meta Lead Generation Ads.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in your brief",
    deliverableBars: [
      { name: "Video · product demo", valStr: "Approved · 3 days", pct: 100 },
      { name: "Video · unboxing", valStr: "Approved · 2 days", pct: 100 },
      { name: "Video · how-to", valStr: "Approved · 4 days", pct: 100 },
      { name: "Photo set (5)", valStr: "Approved · 2 days", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 videos approved on first pass; ready for Meta Ads Manager import.",
    sideCardTitle: "Content library",
    sideCardSub: "Your files in Minimalist’s Content hub",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "fast approval" },
      { label: "Cost per video", value: "₹2,500", detail: "fixed contract rate" },
      { label: "Whitelisted", value: "Yes", detail: "commercial license" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Video · product demo",
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
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹10,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹7,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹2,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per usable video",
      heroValue: "₹3,750",
      trendBadge: "▼ ₹450 vs previous period",
      trendDesc: "₹3,750 in fees for every video you can use",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per file delivered", acronym: "CPF", value: "₹2,500", benchmark: "fixed rate", diff: "0%" },
        { label: "Cost per usable video", acronym: "CPUV", value: "₹2,500", benchmark: "vs ₹2,950", diff: "−15%" },
        { label: "Turnaround time", acronym: "TAT", value: "3 days", benchmark: "vs 4.2 d", diff: "−28%" },
        { label: "Revision rate", acronym: "REV", value: "0%", benchmark: "vs 18%", diff: "−100%" },
      ],
      footerNote: "All 4 videos delivered within SLA and approved on first pass.",
    },
  },

  // 13. Sales · Influencer Paid (Reference screen: CR-05 · Vitamin-C Serum: 6 Performance)
  "Sales_Influencer Paid": {
    creatorDisplayName: "Ishita Rao",
    campaignName: "Vitamin-C Serum",
    objective: "Sales",
    typeCategory: "Influencer Paid",
    scorecards: [
      { label: "Net sales", value: "₹1,21,400", detail: "▲ 15% vs prev.", isPositive: true },
      { label: "Orders", value: "318", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Link clicks", value: "2,040", detail: "▲ 13% vs prev. · CTR 0.5%", isPositive: true },
      { label: "Engagement rate", value: "6.8%", detail: "▲ 0.6 pt vs prev.", isPositive: true },
      { label: "Views", value: "4.1 L", detail: "▲ 19% vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹51,250", detail: "Estimate · not in ROAS" },
    ],
    trendTitle: "Net sales over time",
    trendSub: "Your 4 deliverables · Vitamin-C Serum",
    platformTitle: "By platform",
    platformSub: "Share of net sales · orders",
    platformHero: "74%",
    platformHeroSub: "of net sales came from Instagram",
    platformBars: [
      { label: "Instagram Reels · code", pct: "52%", sub: "165 orders" },
      { label: "Instagram Stories · link", pct: "22%", sub: "70 orders" },
      { label: "YouTube · description link", pct: "26%", sub: "83 orders" },
    ],
    platformDisclaimer: "Codes in Reels drove highest order volume; YouTube description links had highest AOV.",
    deliverablesChartTitle: "Net sales by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Festive GRWM · Reel", valStr: "₹50,400 · 42%", pct: 84 },
      { name: "Launch day · Story", valStr: "₹41,200 · 34%", pct: 68 },
      { name: "Results after 7 days · Reel", valStr: "₹29,800 · 25%", pct: 50 },
      { name: "Last-day reminder · Story", valStr: "due 30 Oct", pct: 8 },
    ],
    deliverablesFooterNote: "Festive GRWM drove 42% of your net sales; the reminder Story is due 30 Oct.",
    sideCardTitle: "Revenue",
    sideCardSub: "Gross to net sales · Minimalist’s Shopify",
    sideCardStats: [
      { label: "Gross sales", value: "₹1,34,800", detail: "318 orders" },
      { label: "Returns", value: "− ₹13,400", detail: "9.9% return rate" },
      { label: "Net sales", value: "₹1,21,400", detail: "attributed to you" },
      { label: "Net sales ÷ your fee", value: "7.1×", detail: "₹1,21,400 ÷ ₹17,000" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM · CODE", "STATUS", "FEE", "VIEWS ↓", "ENG. RATE", "CLICKS", "ORDERS", "NET SALES"],
    tableRows: [
      {
        name: "Festive GRWM · Reel",
        dateOrNote: "Live 18 Oct",
        platform: "Instagram",
        codeOrFormat: "ISHITA15 · 1 link",
        status: "Approved",
        feeOrProduct: "₹8,500",
        views: "1.6 L",
        engRate: "7.1%",
        clicks: "820",
        ordersOrLeads: "132",
        result: "₹50,400",
        resultSub: "ROAS 5.9×",
      },
      {
        name: "Launch day · Story",
        dateOrNote: "Live 20 Oct",
        platform: "Instagram",
        codeOrFormat: "ISHITA15 · 1 link",
        status: "Approved",
        feeOrProduct: "₹4,250",
        views: "1.4 L",
        engRate: "6.9%",
        clicks: "710",
        ordersOrLeads: "108",
        result: "₹41,200",
        resultSub: "ROAS 9.7×",
      },
      {
        name: "Results after 7 days · Reel",
        dateOrNote: "Sent 26 Oct",
        platform: "Instagram",
        codeOrFormat: "ISHITA15 · 1 link",
        status: "In review",
        feeOrProduct: "₹3,000",
        views: "1.1 L",
        engRate: "6.2%",
        clicks: "510",
        ordersOrLeads: "78",
        result: "₹29,800",
        resultSub: "ROAS 9.9×",
      },
      {
        name: "Last-day reminder · Story",
        dateOrNote: "Due 30 Oct",
        platform: "Instagram",
        codeOrFormat: "ISHITA15 · 1 link",
        status: "Not started",
        feeOrProduct: "₹1,250",
        views: "—",
        engRate: "—",
        clicks: "—",
        ordersOrLeads: "—",
        result: "Due 30 Oct",
      },
    ],
    feeData: {
      title: "Your fee",
      subtitle: "One-time collab · Minimalist · your fee ₹17,000",
      totalAmount: "₹17,000",
      unitLabel: "fee",
      breakdown: [
        { label: "Paid to you", desc: "released after Minimalist approved content", amount: "₹12,750", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "₹3,000 on Reel approval · ₹1,250 on the last Story", amount: "₹4,250", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Net sales per ₹1 of your fee",
      heroValue: "7.1×",
      trendBadge: "▲ 61% above the project average 4.4×",
      trendDesc: "₹7.10 in Minimalist’s net sales for every ₹1 of your fee",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per order", acronym: "CPA", value: "₹53", benchmark: "vs ₹97", diff: "−45%" },
        { label: "Cost per link click", acronym: "CPC", value: "₹8.33", benchmark: "vs ₹13.60", diff: "−39%" },
        { label: "Cost per 1,000 views", acronym: "CPM", value: "₹41", benchmark: "vs ₹67", diff: "−39%" },
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.61", benchmark: "vs ₹1.02", diff: "−40%" },
      ],
      footerNote: "For costs, lower is better. Project average covers the 6 live creators in Vitamin-C Serum.",
    },
    engagementData: {
      viewsTotal: "4.1 L",
      followersVal: "1.6 L · 39%",
      nonFollowersVal: "2.5 L · 61%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 6.8% engagement rate is made of · 27,900",
      interactions: [
        { label: "Likes", val: "8,400 · 30%" },
        { label: "Comments", val: "2,200 · 8%" },
        { label: "Saves", val: "10,500 · 38%" },
        { label: "Shares", val: "6,800 · 24%" },
      ],
      totalInteractions: "27,900",
      saveShareRate: "4.2%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 14. Sales · Influencer Gift exchange
  "Sales_Influencer Gift exchange": {
    creatorDisplayName: "Ishita Rao",
    campaignName: "Vitamin-C Gifting",
    objective: "Sales",
    typeCategory: "Influencer Gift exchange",
    scorecards: [
      { label: "Net sales", value: "₹33,480", detail: "▲ 12% vs prev.", isPositive: true },
      { label: "Orders", value: "301", detail: "▲ 9% vs prev.", isPositive: true },
      { label: "Link clicks", value: "1,053", detail: "▲ 7% vs prev. · CTR 1.1%", isPositive: true },
      { label: "Engagement rate", value: "6.0%", detail: "▲ 0.3 pt vs prev.", isPositive: true },
      { label: "Views", value: "94,500", detail: "▲ 11% vs prev.", isPositive: true },
      { label: "Earned media value", value: "₹16,740", detail: "Estimate · not in return" },
    ],
    trendTitle: "Net sales over time",
    trendSub: "Your deliverables · Vitamin-C Gifting",
    platformTitle: "By platform",
    platformSub: "Share of net sales · orders",
    platformHero: "74%",
    platformHeroSub: "of net sales came from Instagram",
    platformBars: [
      { label: "Instagram Reels · code", pct: "50%", sub: "150 orders" },
      { label: "Instagram Stories · link", pct: "25%", sub: "75 orders" },
      { label: "YouTube · description link", pct: "25%", sub: "76 orders" },
    ],
    platformDisclaimer: "Seeding kit delivered ₹33,480 in Shopify net sales with 11.8× return.",
    deliverablesChartTitle: "Net sales by deliverable",
    deliverablesChartSub: "Which of your posts drove the result",
    deliverableBars: [
      { name: "Reel · routine", valStr: "₹16,740 · 50%", pct: 90 },
      { name: "Reel · review", valStr: "₹11,160 · 33%", pct: 60 },
      { name: "Story · link sticker", valStr: "₹5,580 · 17%", pct: 30 },
      { name: "Story · reminder", valStr: "due 30 Oct", pct: 10 },
    ],
    deliverablesFooterNote: "Reels drove 83% of the sales result; final reminder story posts by 30 Oct.",
    sideCardTitle: "Revenue",
    sideCardSub: "Gross to net sales · Shopify · your posts",
    sideCardStats: [
      { label: "Gross sales", value: "₹36,800", detail: "301 orders" },
      { label: "Returns", value: "− ₹3,320", detail: "9.0% return rate" },
      { label: "Net sales", value: "₹33,480", detail: "Gift exchange result" },
      { label: "Return multiple", value: "11.8×", detail: "Sales ÷ product cost" },
    ],
    tableHeaders: ["DELIVERABLE", "PLATFORM · CODE", "STATUS", "PRODUCT", "VIEWS", "ENG. RATE", "CLICKS", "ORDERS", "NET SALES"],
    tableRows: [
      {
        name: "Reel · routine",
        dateOrNote: "Posted 12 Oct",
        platform: "Instagram",
        codeOrFormat: "ISHITA15 · 1 link",
        status: "Approved",
        feeOrProduct: "Vitamin-C Kit",
        views: "48,000",
        engRate: "6.2%",
        clicks: "526",
        ordersOrLeads: "150",
        result: "₹16,740",
      },
    ],
    feeData: {
      title: "Product & shipping",
      subtitle: "Gift exchange · no fee · products you received",
      totalAmount: "₹1,049",
      unitLabel: "total",
      breakdown: [
        { label: "Kit delivered", desc: "arrived 9 Oct · posting started", amount: "₹1,049", pct: "100%" },
      ],
      escrow: { label: "In transit", desc: "nothing on the way", amount: "₹0", pct: "0%" },
      notFunded: { label: "Not shipped yet", desc: "—", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Return on product cost",
      heroValue: "11.8×",
      trendBadge: "▲ 1.6× vs previous period",
      trendDesc: "₹11.80 in net sales for every ₹1 of product and shipping",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per order", acronym: "CPA", value: "₹35", benchmark: "vs ₹41 prev.", diff: "−15%" },
        { label: "Cost per link click", acronym: "CPC", value: "₹2.69", benchmark: "vs ₹3.05 prev.", diff: "−12%" },
        { label: "Cost per 1,000 views", acronym: "CPM", value: "₹30", benchmark: "vs ₹33 prev.", diff: "−9%" },
        { label: "Cost per engagement", acronym: "CPE", value: "₹0.50", benchmark: "vs ₹0.56 prev.", diff: "−11%" },
      ],
      footerNote: "For costs, lower is better. Compared with the previous period of the same length.",
    },
    engagementData: {
      viewsTotal: "94,500",
      followersVal: "38,745 · 41%",
      nonFollowersVal: "55,755 · 59%",
      breakdownTitle: "Engagement breakdown",
      breakdownSub: "What the 6.0% engagement rate is made of · 5,670",
      interactions: [
        { label: "Likes", val: "3,856 · 68%" },
        { label: "Comments", val: "510 · 9%" },
        { label: "Saves", val: "794 · 14%" },
        { label: "Shares", val: "510 · 9%" },
      ],
      totalInteractions: "5,670",
      saveShareRate: "23%",
      formatTitle: "By format",
      formatBars: [
        { label: "Reels", pct: "63%" },
        { label: "Shorts", pct: "58%" },
        { label: "Stories", pct: "41%" },
      ],
      formatNote: "Reels reach the most new people. On YouTube: not subscribed.",
    },
    audienceData: {
      countriesTitle: "Countries",
      countriesSub: "Where your followers live · Instagram + YouTube insights",
      countries: [
        { label: "India", pct: "78%" },
        { label: "UAE", pct: "6%" },
        { label: "United States", pct: "5%" },
        { label: "United Kingdom", pct: "4%" },
        { label: "Singapore", pct: "3%" },
      ],
      citiesTitle: "Cities",
      citiesSub: "Top cities of your followers · Instagram + YouTube insights",
      cities: [
        { label: "Bengaluru", pct: "21%" },
        { label: "Mumbai", pct: "17%" },
        { label: "Delhi NCR", pct: "12%" },
        { label: "Chennai", pct: "8%" },
        { label: "Hyderabad", pct: "7%" },
        { label: "Pune", pct: "6%" },
        { label: "Other cities", pct: "29%" },
      ],
      ageGenderTitle: "Age and gender",
      ageGenderSub: "Share of your followers · Instagram + YouTube insights",
      womenPct: "86%",
      menPct: "14%",
      ageBrackets: [
        { age: "13–17", femalePct: "3%", malePct: "0%" },
        { age: "18–24", femalePct: "30%", malePct: "4%" },
        { age: "25–34", femalePct: "41%", malePct: "5%" },
        { age: "35–44", femalePct: "9%", malePct: "3%" },
        { age: "45+", femalePct: "3%", malePct: "2%" },
      ],
    },
  },

  // 15. Sales · UGC
  "Sales_UGC": {
    creatorDisplayName: "Serum UGC",
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
    trendSub: "Your files delivered vs 4 in the brief",
    platformTitle: "By platform",
    platformSub: "Where this creator’s files are made for",
    platformHero: "3 of 4",
    platformHeroSub: "approved files are made for Instagram",
    platformBars: [
      { label: "Instagram Reels · 9:16", pct: "75%", sub: "3 files" },
      { label: "Instagram Feed · 4:5", pct: "25%", sub: "1 file" },
    ],
    platformDisclaimer: "Direct response videos crafted for Meta & YouTube conversion ad campaigns.",
    deliverablesChartTitle: "Files by deliverable",
    deliverablesChartSub: "Each file in your brief",
    deliverableBars: [
      { name: "Video · product demo", valStr: "Approved · 3 days", pct: 100 },
      { name: "Video · unboxing", valStr: "Approved · 2 days", pct: 100 },
      { name: "Video · how-to", valStr: "Approved · 4 days", pct: 100 },
      { name: "Photo set (5)", valStr: "Approved · 2 days", pct: 100 },
    ],
    deliverablesFooterNote: "All 4 videos approved on first pass; ready for Meta Ads Manager import.",
    sideCardTitle: "Content library",
    sideCardSub: "Your files in Minimalist’s Content hub",
    sideCardStats: [
      { label: "Delivered files", value: "4", detail: "100% complete" },
      { label: "Avg. review time", value: "1.2 d", detail: "fast approval" },
      { label: "Cost per video", value: "₹2,500", detail: "fixed contract rate" },
      { label: "Whitelisted", value: "Yes", detail: "commercial license" },
    ],
    tableHeaders: ["DELIVERABLE", "FORMAT", "STATUS", "FEE", "FILES", "APPROVED", "FIXES", "TIME", "COST / VIDEO"],
    tableRows: [
      {
        name: "Video 1 · Unboxing & glow",
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
        name: "Video 2 · Dark spot proof",
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
    feeData: {
      title: "Your fee",
      subtitle: "Your fee · 4 deliverables",
      totalAmount: "₹10,000",
      unitLabel: "total",
      breakdown: [
        { label: "Paid to you", desc: "3 approved deliverables", amount: "₹7,500", pct: "75%" },
      ],
      escrow: { label: "Held in escrow", desc: "releases when the last one is approved", amount: "₹2,500", pct: "25%" },
      notFunded: { label: "Not funded yet", desc: "fully funded", amount: "₹0", pct: "0%" },
    },
    valueData: {
      title: "Value you delivered",
      metricTitle: "Cost per usable video",
      heroValue: "₹3,750",
      trendBadge: "▼ ₹450 vs previous period",
      trendDesc: "₹3,750 in fees for every video you can use",
      costResultsTitle: "Minimalist’s cost per result",
      costs: [
        { label: "Cost per file delivered", acronym: "CPF", value: "₹2,500", benchmark: "fixed rate", diff: "0%" },
        { label: "Cost per usable video", acronym: "CPUV", value: "₹2,500", benchmark: "vs ₹2,950", diff: "−15%" },
        { label: "Turnaround time", acronym: "TAT", value: "3 days", benchmark: "vs 4.2 d", diff: "−28%" },
        { label: "Revision rate", acronym: "REV", value: "0%", benchmark: "vs 18%", diff: "−100%" },
      ],
      footerNote: "All 4 videos delivered within SLA and approved on first pass.",
    },
  },
};

export function CreatorPerformanceTab({
  creatorName,
  platform,
  showCustomReport,
  project,
  overrideObjective,
  overrideTypeCategory,
  perspective = "creator",
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
  const isCreatorView = perspective === "creator";

  return (
    <div className="space-y-6 mt-4">
      {/* 15-Version Interactive Switcher Bar (Same grid as campaign page: 5 Objectives × 3 Types) */}
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
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
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
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
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
                {isCreatorView ? data.trendSub : `${effectiveCreatorName} · all deliverables · ${data.campaignName}`}
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

      {/* Row 2 · Deliverables Bar Chart & Side Card (NO FUNNELS!) */}
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
                            : row.status === "Not started"
                              ? "bg-neutral-100 text-neutral-600"
                              : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          row.status === "Approved" || row.status === "Completed"
                            ? "bg-neutral-500"
                            : row.status === "Scheduled"
                              ? "bg-amber-500"
                              : row.status === "Not started"
                                ? "bg-neutral-400"
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

      {/* Row 4 · Engagement & Views (Influencer only) */}
      {data.engagementData && activeTypeCategory !== "UGC" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Views Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">Views</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Followers vs non-followers (new audience reach)
              </p>
              <div className="mt-4">
                <div className="text-2xl font-bold text-neutral-950">
                  {data.engagementData.viewsTotal} <span className="text-xs font-normal text-neutral-500">views</span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-neutral-700 mb-1">
                    <span>Followers</span>
                    <span className="font-semibold text-neutral-900">{data.engagementData.followersVal}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#3B5BFF]" style={{ width: "39%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-neutral-700 mb-1">
                    <span>Non-followers</span>
                    <span className="font-semibold text-neutral-900">{data.engagementData.nonFollowersVal}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className="h-full rounded-full bg-neutral-800" style={{ width: "61%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
              High percentage of non-followers indicates effective algorithmic reach.
            </div>
          </div>

          {/* Engagement Breakdown Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">{data.engagementData.breakdownTitle}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{data.engagementData.breakdownSub}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {data.engagementData.interactions.map((item, idx) => (
                  <div key={idx} className="bg-neutral-50 rounded-lg p-2.5 border border-neutral-100">
                    <div className="text-[11px] text-neutral-500">{item.label}</div>
                    <div className="text-sm font-bold text-neutral-900 mt-0.5">{item.val}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                <div>
                  <div className="text-[11px] text-neutral-500">Total interactions</div>
                  <div className="text-base font-bold text-neutral-900">{data.engagementData.totalInteractions}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-neutral-500">Save and share rate</div>
                  <div className="text-base font-bold text-emerald-600">{data.engagementData.saveShareRate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* By Format Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">{data.engagementData.formatTitle}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Share of views from people who don’t follow you</p>

              <div className="mt-5 space-y-3.5">
                {data.engagementData.formatBars.map((bar, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                      <span>{bar.label}</span>
                      <span className="font-semibold text-neutral-900">{bar.pct}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-neutral-900"
                        style={{ width: bar.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
              {data.engagementData.formatNote}
            </div>
          </div>
        </div>
      )}

      {/* Row 5 · Audience Countries & Distribution (Influencer only) */}
      {data.audienceData && activeTypeCategory !== "UGC" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Countries Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
            <h3 className="text-base font-semibold text-neutral-900">{data.audienceData.countriesTitle}</h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.audienceData.countriesSub}</p>

            <div className="mt-5 space-y-3">
              {data.audienceData.countries.map((c, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                    <span>{c.label}</span>
                    <span className="font-semibold text-neutral-900">{c.pct}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${idx === 0 ? "bg-neutral-900" : "bg-neutral-500"}`}
                      style={{ width: c.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top countries / Share of your followers */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">Top countries</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Share of your followers · Instagram + YouTube insights
              </p>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[...data.audienceData.countries, { label: "Other", pct: "4%" }].map((item, idx) => (
                  <div key={idx} className="bg-neutral-50 rounded-lg p-3 border border-neutral-100">
                    <div className="text-xs text-neutral-500">{item.label}</div>
                    <div className="text-lg font-bold text-neutral-900 mt-1">{item.pct}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
              Audience geo-demographics synced from Meta Graph API & YouTube Data API.
            </div>
          </div>
        </div>
      )}

      {/* Row 6 · Cities & Age (Influencer only) */}
      {data.audienceData && activeTypeCategory !== "UGC" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cities Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
            <h3 className="text-base font-semibold text-neutral-900">{data.audienceData.citiesTitle}</h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.audienceData.citiesSub}</p>

            <div className="mt-5 space-y-2.5">
              {data.audienceData.cities.map((city, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                    <span>{city.label}</span>
                    <span className="font-semibold text-neutral-900">{city.pct}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${idx === 0 ? "bg-neutral-900" : "bg-neutral-600"}`}
                      style={{ width: city.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age and gender Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{data.audienceData.ageGenderTitle}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{data.audienceData.ageGenderSub}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-[#3B5BFF]">Women {data.audienceData.womenPct}</span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-neutral-700">Men {data.audienceData.menPct}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {data.audienceData.ageBrackets.map((bracket, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-neutral-500 font-medium shrink-0">{bracket.age}</span>
                    <div className="flex-1 flex items-center gap-1.5 h-3">
                      <div
                        className="bg-[#3B5BFF] h-full rounded-sm"
                        style={{ width: bracket.femalePct }}
                        title={`Women: ${bracket.femalePct}`}
                      />
                      <div
                        className="bg-neutral-400 h-full rounded-sm"
                        style={{ width: bracket.malePct }}
                        title={`Men: ${bracket.malePct}`}
                      />
                    </div>
                    <span className="w-16 text-right font-semibold text-neutral-800 shrink-0">
                      {bracket.femalePct} / {bracket.malePct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-xs bg-[#3B5BFF]" /> Women
                <span className="size-2 rounded-xs bg-neutral-400 ml-2" /> Men
              </span>
              <span>Primary demographic: 18–34 years (71%)</span>
            </div>
          </div>
        </div>
      )}

      {/* Row 7 · Delivery & Budget / Fee & Value Delivered */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Your Fee or Product & Shipping */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">{data.feeData.title}</h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.feeData.subtitle}</p>

            <div className="mt-4">
              <div className="text-3xl font-extrabold tracking-tight text-neutral-950">
                {data.feeData.totalAmount}{" "}
                <span className="text-xs font-medium text-neutral-500">
                  {data.feeData.unitLabel || "total"}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {data.feeData.breakdown.map((item, idx) => (
                <div key={idx} className="bg-neutral-50/80 rounded-lg p-3 border border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-neutral-900">{item.label}</span>
                    <span className="text-xs font-bold text-neutral-950">{item.amount} · {item.pct}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{item.desc}</div>
                </div>
              ))}

              {data.feeData.escrow && (
                <div className="bg-neutral-50/80 rounded-lg p-3 border border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-neutral-900">{data.feeData.escrow.label}</span>
                    <span className="text-xs font-bold text-neutral-950">
                      {data.feeData.escrow.amount} · {data.feeData.escrow.pct}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{data.feeData.escrow.desc}</div>
                </div>
              )}

              {data.feeData.notFunded && (
                <div className="bg-neutral-50/80 rounded-lg p-3 border border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-neutral-900">{data.feeData.notFunded.label}</span>
                    <span className="text-xs font-bold text-neutral-950">
                      {data.feeData.notFunded.amount} · {data.feeData.notFunded.pct}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{data.feeData.notFunded.desc}</div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500 flex justify-between items-center">
            <span>Total fee: {data.feeData.totalAmount}</span>
            <span className="text-emerald-600 font-medium">Escrow protected</span>
          </div>
        </div>

        {/* Right: Value You Delivered */}
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">{data.valueData.title}</h3>
            <p className="text-xs text-neutral-500 mt-0.5">{data.valueData.metricTitle}</p>

            <div className="mt-4 flex items-baseline gap-3">
              <div className="text-3xl font-extrabold tracking-tight text-neutral-950">
                {data.valueData.heroValue}
              </div>
              {data.valueData.trendBadge && (
                <div className="text-xs font-semibold text-emerald-600">
                  {data.valueData.trendBadge}
                </div>
              )}
            </div>

            {data.valueData.trendDesc && (
              <div className="text-xs text-neutral-600 mt-1 font-medium">
                {data.valueData.trendDesc}
              </div>
            )}

            <div className="mt-5">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">
                {data.valueData.costResultsTitle || "Minimalist’s cost per result"}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data.valueData.costs.map((cost, idx) => (
                  <div key={idx} className="bg-neutral-50/80 rounded-lg p-3 border border-neutral-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-600 font-medium truncate">{cost.label}</span>
                      <span className="font-bold text-neutral-900 text-[10px] bg-neutral-200/80 px-1.5 py-0.5 rounded">
                        {cost.acronym}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-base font-bold text-neutral-950">{cost.value}</span>
                      <span className="text-[11px] text-neutral-500">{cost.benchmark}</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                      {cost.diff}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-neutral-100 pt-3 text-[11px] text-neutral-500">
            {data.valueData.footerNote || "For costs, lower is better. Project average covers active creators."}
          </div>
        </div>
      </div>
    </div>
  );
}
