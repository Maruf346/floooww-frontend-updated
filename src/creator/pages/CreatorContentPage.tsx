import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { ROUTES } from "@/common/constants/routes";

// Assets extracted from Figma designs (552:277, 793:13612, and 793:13021)
import { CreatorShell } from "@/creator/components/CreatorShell";
const imgDot = "https://www.figma.com/api/mcp/asset/9ebb528a-1588-4521-b6ac-d077bc640ff9.svg";
const imgDot1 = "https://www.figma.com/api/mcp/asset/91e1a14d-9974-404e-9a6a-b54ec2d2a318.svg";
const imgDot2 = "https://www.figma.com/api/mcp/asset/2d3b438f-eaa6-489f-9c10-32bfd72f9c95.svg";
const imgDot3 = "https://www.figma.com/api/mcp/asset/c259a990-4b4b-4c15-af42-225e0c058e2c.svg";
const imgKreyioWordmark = "https://www.figma.com/api/mcp/asset/a5cb72f4-e4c0-48e3-af74-4b6f0a737491.svg";

const imgMedia = "https://www.figma.com/api/mcp/asset/68cedca7-52b0-416c-95de-53535f43429b.png";
const imgMedia1 = "https://www.figma.com/api/mcp/asset/0033c0aa-89d5-4d44-819c-96d7ac983e8b.png";
const imgMedia2 = "https://www.figma.com/api/mcp/asset/bdce2aee-2a5e-48c9-9175-14fba945ec9e.png";
const imgMedia3 = "https://www.figma.com/api/mcp/asset/fcbf70d9-1775-4b75-b886-8aa86c7aa11e.png";
const imgMedia4 = "https://www.figma.com/api/mcp/asset/6b6bfc90-1140-44a4-8587-9c2325aadbc2.png";
const imgMedia5 = "https://www.figma.com/api/mcp/asset/27c407d1-946f-4521-a355-cede27115cca.png";
const imgMedia6 = "https://www.figma.com/api/mcp/asset/d4aeeab2-b085-4de4-b2a9-432cb0d5d860.png";
const imgMedia7 = "https://www.figma.com/api/mcp/asset/2db90e42-6aed-4c08-8d4f-658e66696684.png";
const imgMedia8 = "https://www.figma.com/api/mcp/asset/44ed61b6-1cbf-496c-8ba9-03bb6247c151.png";

const imgIconWorkspace = "https://www.figma.com/api/mcp/asset/aec913aa-9983-4bf4-bd76-43c8fde3ada5.svg";
const imgIconOverview = "https://www.figma.com/api/mcp/asset/9acbc294-a65a-4aa0-83b7-7b1e67394361.svg";
const imgIconFind = "https://www.figma.com/api/mcp/asset/624fd790-3395-483e-8917-83f7a8d5187c.svg";
const imgIconProjects = "https://www.figma.com/api/mcp/asset/0498a943-8397-438f-94df-e37c33408bb3.svg";
const imgChevron = "https://www.figma.com/api/mcp/asset/8c4db136-728b-45bb-8671-825e498e8cd1.svg";
const imgBullet = "https://www.figma.com/api/mcp/asset/fdb69197-ae81-4fd3-b118-218768bbcd29.svg";
const imgIconContent = "https://www.figma.com/api/mcp/asset/971be24f-6f49-46c1-a3fd-46cb3a2f593b.svg";
const imgIconPerformance = "https://www.figma.com/api/mcp/asset/8b2b6b5a-5f18-41c6-977c-c62a2e64439b.svg";
const imgIconEarnings = "https://www.figma.com/api/mcp/asset/9b0e9e29-3a4e-4c11-a175-40374e899a86.svg";
const imgIconMessages = "https://www.figma.com/api/mcp/asset/53f5d3ee-c57a-41de-b7ac-728b1fe79d4c.svg";
const imgIconSettings = "https://www.figma.com/api/mcp/asset/0539eac9-280d-4579-b03e-7f9afacd5138.svg";
const imgIconHelp = "https://www.figma.com/api/mcp/asset/7f125c2f-1131-44f8-94f7-556fa5904a71.svg";
const imgIconLogout = "https://www.figma.com/api/mcp/asset/54e43bb3-1918-4d06-89eb-5c15e8d8e2dc.svg";

const imgIconSearch = "https://www.figma.com/api/mcp/asset/8b343dec-5a5e-42bc-81a5-6082b5036623.svg";
const imgIconNotifications = "https://www.figma.com/api/mcp/asset/a6ab6fe3-a873-4f44-a1d7-2371b01e7eb2.svg";
const imgIconDownload = "https://www.figma.com/api/mcp/asset/153a5cd0-abc0-47b9-9f97-2bb5867cd2db.svg";
const imgIconGridView = "https://www.figma.com/api/mcp/asset/9060fba3-509b-4b40-bfd4-f0ed5884eb9b.svg";
const imgIconListView = "https://www.figma.com/api/mcp/asset/4e849046-068d-43b8-947b-d8493e479001.svg";
const imgPlatformLogo = "https://www.figma.com/api/mcp/asset/ef3e1679-93fa-4b73-87ea-6fc5bc4403a8.svg";
const imgPlatformLogo1 = "https://www.figma.com/api/mcp/asset/534b76df-bc67-4610-a881-a7b2115dee31.svg";
const imgIconUsageRights = "https://www.figma.com/api/mcp/asset/5756f26b-0409-4814-ada1-003350673816.svg";
const imgEmptyMediaIcon = "https://www.figma.com/api/mcp/asset/374ee941-780f-4c23-aa80-4a353b5c9aeb.svg";

// Drawer specific assets (793:13021)
const imgIconClose = "https://www.figma.com/api/mcp/asset/c5418ee2-fe5a-4fde-ac3e-c439e7eedbf9.svg";
const imgEllipsePlay = "https://www.figma.com/api/mcp/asset/866edc72-5817-4ecd-9283-3401bcffc3c0.svg";
const imgPolygonPlay = "https://www.figma.com/api/mcp/asset/d9addc76-551b-4342-ac7f-4c7d8a5834b2.svg";
const imgIconOfferMoreTime = "https://www.figma.com/api/mcp/asset/737241b8-ef47-493d-b044-f204f95a98f6.svg";
const imgIconExternalLink = "https://www.figma.com/api/mcp/asset/80d9eb46-4c92-4c29-a110-75bd662037f2.svg";

const imgEllipse = "https://www.figma.com/api/mcp/asset/9479446d-6cb7-44cc-bb1c-cca598774b9b.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/1c5a8310-8637-47ce-9042-77b4151c7ac5.svg";
const imgEllipse2 = "https://www.figma.com/api/mcp/asset/a3d4896b-7f3f-4d49-b468-54691b731af8.svg";
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/a2447806-6ec7-44f8-8445-7d5e5c3bfddb.svg";
const imgEllipse4 = "https://www.figma.com/api/mcp/asset/481c9e77-5dab-48b7-a5b7-eb3807e05eb3.svg";
const imgEllipse5 = "https://www.figma.com/api/mcp/asset/55d1b66f-18fd-47ec-9c9e-a48dc36f2cde.svg";

// Dropdown options directly matching the user's uploaded spec image
const PROJECT_OPTIONS = [
  "All projects",
  "Vitamin-C Serum",
  "Glow Squad",
  "Lip Liner Collab",
  "Mist launch",
  "Summer Glow Edit",
  "Hair Oil UGC",
] as const;

const BRAND_OPTIONS = [
  "All brands",
  "Minimalist",
  "Velvet Lip Co.",
  "Dewdrop Naturals",
  "Strand Studio",
  "Kumkum Naturals",
  "Petal Theory",
] as const;

const FORMAT_OPTIONS = [
  "Any format",
  "Reel",
  "Story",
  "Short",
  "Long video",
  "UGC file",
  "Other",
] as const;

const USAGE_RIGHTS_OPTIONS = [
  "Any",
  "3 months",
  "6 months",
  "1 month",
  "30 days",
  "Ending in 30 days",
  "Ended",
] as const;

const SORT_OPTIONS = [
  "Newest",
  "Most views",
  "Most orders",
  "Rights ending soon",
] as const;

type ContentStatus =
  | "all"
  | "waiting"
  | "changes_requested"
  | "approved"
  | "live"
  | "used_in_ads";

interface ContentItem {
  id: string;
  title: string;
  brand: string;
  project: string;
  campaign: string;
  platform: "Instagram" | "YouTube" | "TikTok";
  format: "Reel" | "Story" | "Video" | "Post";
  mediaUrl: string;
  avatarUrl: string;
  duration?: string;
  status: "Live" | "Changes requested" | "Approved" | "Used in ads" | "Waiting for approval";
  statusCode: ContentStatus;
  statsText: string;
  usageRightsText: string;
  usageRightsType: "organic_active" | "organic_ended" | "paid_ads";
  views?: string;
  viewsNumeric?: number;
  er?: string;
  orders?: number;
  liveDate?: string;
  linkClicks?: string;
  salesDrove?: string;
  earnings?: string;
  livePostUrl?: string;
  trackingLink?: string;
  couponCode?: string;
  fileName?: string;
}

const ALL_CONTENT_ITEMS: ContentItem[] = [
  {
    id: "cnt-1",
    title: "Reel · Festive GRWM",
    brand: "Minimalist",
    project: "Vitamin-C Serum",
    campaign: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia,
    avatarUrl: imgEllipse,
    duration: "0:41",
    status: "Live",
    statusCode: "live",
    statsText: "3.0 L views · 6.9% ER · 214 orders",
    usageRightsText: "3 months · until 7 Dec",
    usageRightsType: "organic_active",
    views: "3.0 L",
    viewsNumeric: 300000,
    er: "6.9%",
    orders: 214,
    liveDate: "14 Oct",
    linkClicks: "5,300",
    salesDrove: "₹78,000",
    earnings: "₹12,750",
    livePostUrl: "instagram.com/reel/C8xMeera1",
    trackingLink: "flw.to/ishita-vcs",
    couponCode: "ISHITA15 · 236 orders",
    fileName: "meera_grwm.mp4 · 48 MB",
  },
  {
    id: "cnt-2",
    title: "Story · Launch day",
    brand: "Minimalist",
    project: "Vitamin-C Serum",
    campaign: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Story",
    mediaUrl: imgMedia1,
    avatarUrl: imgEllipse,
    duration: "0:38",
    status: "Live",
    statusCode: "live",
    statsText: "2.6 L views · 7.4% ER · 178 orders",
    usageRightsText: "3 months · until 7 Dec",
    usageRightsType: "organic_active",
    views: "2.6 L",
    viewsNumeric: 260000,
    er: "7.4%",
    orders: 178,
    liveDate: "15 Oct",
    linkClicks: "4,120",
    salesDrove: "₹62,000",
    earnings: "₹9,500",
    livePostUrl: "instagram.com/stories/ishita_launch",
    trackingLink: "flw.to/ishita-story1",
    couponCode: "ISHITA15 · 178 orders",
    fileName: "story_launch_day.mp4 · 32 MB",
  },
  {
    id: "cnt-3",
    title: "Results after 7 days · Reel",
    brand: "Minimalist",
    project: "Vitamin-C Serum",
    campaign: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia2,
    avatarUrl: imgEllipse,
    duration: "0:15",
    status: "Changes requested",
    statusCode: "changes_requested",
    statsText: "“Add ISHITA15 on screen” · v2 approved 21 Oct",
    usageRightsText: "30 days · until 30 Nov",
    usageRightsType: "organic_active",
    views: "—",
    viewsNumeric: 0,
    er: "—",
    orders: 0,
    liveDate: "Pending v2 review",
    linkClicks: "0",
    salesDrove: "₹0",
    earnings: "₹10,000 (escrow)",
    livePostUrl: "Draft in upload review",
    trackingLink: "flw.to/ishita-vcs-r7",
    couponCode: "ISHITA15",
    fileName: "v2_results_7days.mp4 · 24 MB",
  },
  {
    id: "cnt-4",
    title: "Reel · Glow Squad month 1",
    brand: "Minimalist",
    project: "Glow Squad",
    campaign: "Glow Squad",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia3,
    avatarUrl: imgEllipse,
    duration: "0:44",
    status: "Approved",
    statusCode: "approved",
    statsText: "Approved · goes live 1 Nov",
    usageRightsText: "3 months · until 31 Jan",
    usageRightsType: "organic_active",
    views: "Scheduled",
    viewsNumeric: 0,
    er: "—",
    orders: 0,
    liveDate: "1 Nov",
    linkClicks: "0",
    salesDrove: "₹0",
    earnings: "₹15,000",
    livePostUrl: "Scheduled for 1 Nov 2026",
    trackingLink: "flw.to/glow-squad-1",
    couponCode: "GLOWISHITA10",
    fileName: "glow_squad_m1.mp4 · 52 MB",
  },
  {
    id: "cnt-5",
    title: "Reel · serum layering",
    brand: "Minimalist",
    project: "Glow Squad",
    campaign: "Glow Squad",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia4,
    avatarUrl: imgEllipse,
    status: "Live",
    statusCode: "live",
    statsText: "1.2 L views · 6.1% ER · 88 orders",
    usageRightsText: "3 months · until 31 Jan",
    usageRightsType: "organic_active",
    views: "1.2 L",
    viewsNumeric: 120000,
    er: "6.1%",
    orders: 88,
    liveDate: "18 Sep",
    linkClicks: "2,400",
    salesDrove: "₹34,000",
    earnings: "₹8,000",
    livePostUrl: "instagram.com/reel/C7layering",
    trackingLink: "flw.to/layering-ish",
    couponCode: "GLOW10",
    fileName: "serum_layering_edit.mp4 · 41 MB",
  },
  {
    id: "cnt-6",
    title: "Story · night routine",
    brand: "Minimalist",
    project: "Glow Squad",
    campaign: "Glow Squad",
    platform: "Instagram",
    format: "Story",
    mediaUrl: imgMedia5,
    avatarUrl: imgEllipse,
    duration: "0:15",
    status: "Live",
    statusCode: "live",
    statsText: "42K views · 5.2% ER",
    usageRightsText: "3 months · until 31 Jan",
    usageRightsType: "organic_active",
    views: "42K",
    viewsNumeric: 42000,
    er: "5.2%",
    orders: 34,
    liveDate: "20 Sep",
    linkClicks: "980",
    salesDrove: "₹12,400",
    earnings: "₹4,000",
    livePostUrl: "instagram.com/stories/night_routine",
    trackingLink: "flw.to/night-ish",
    couponCode: "GLOW10",
    fileName: "night_routine.mp4 · 18 MB",
  },
  {
    id: "cnt-7",
    title: "Reel · lip liner looks",
    brand: "Velvet Lip Co.",
    project: "Lip Liner Collab",
    campaign: "Lip Liner Collab",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia6,
    avatarUrl: imgEllipse1,
    status: "Live",
    statusCode: "live",
    statsText: "1.8 L views · 58 orders",
    usageRightsText: "30 days · ended 27 Sep",
    usageRightsType: "organic_ended",
    views: "1.8 L",
    viewsNumeric: 180000,
    orders: 58,
    liveDate: "12 Aug",
    linkClicks: "1,890",
    salesDrove: "₹24,500",
    earnings: "₹7,500",
    livePostUrl: "instagram.com/reel/velvetlip1",
    trackingLink: "flw.to/velvet-ishita",
    couponCode: "VELVET15",
    fileName: "lipliner_looks.mp4 · 36 MB",
  },
  {
    id: "cnt-8",
    title: "Reel · mist routine",
    brand: "Dewdrop Naturals",
    project: "Mist launch",
    campaign: "Mist launch",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia7,
    avatarUrl: imgEllipse2,
    duration: "0:33",
    status: "Live",
    statusCode: "live",
    statsText: "96K views · 6.9% ER",
    usageRightsText: "3 months · until 12 Dec",
    usageRightsType: "organic_active",
    views: "96K",
    viewsNumeric: 96000,
    er: "6.9%",
    orders: 45,
    liveDate: "5 Oct",
    linkClicks: "1,450",
    salesDrove: "₹18,000",
    earnings: "₹6,000",
    livePostUrl: "instagram.com/reel/dewdrop_mist",
    trackingLink: "flw.to/dew-ish",
    couponCode: "DEW10",
    fileName: "mist_routine.mp4 · 29 MB",
  },
  {
    id: "cnt-9",
    title: "Video · hair oil demo",
    brand: "Strand Studio",
    project: "Hair Oil UGC",
    campaign: "Hair Oil UGC",
    platform: "Instagram",
    format: "Video",
    mediaUrl: imgMedia8,
    avatarUrl: imgEllipse3,
    duration: "0:24",
    status: "Used in ads",
    statusCode: "used_in_ads",
    statsText: "UGC file · 1080 × 1920 · in their ads",
    usageRightsText: "6 months · until 2 Nov",
    usageRightsType: "paid_ads",
    views: "4.2 L (in ads)",
    viewsNumeric: 420000,
    er: "8.1%",
    orders: 310,
    liveDate: "20 Sep",
    linkClicks: "8,900",
    salesDrove: "₹1,24,000",
    earnings: "₹22,000",
    livePostUrl: "Meta Ad Library ID #98231",
    trackingLink: "flw.to/strand-ad",
    couponCode: "STRAND20",
    fileName: "hair_oil_demo_ugc.mp4 · 65 MB",
  },
  {
    id: "cnt-10",
    title: "Reel · summer glow",
    brand: "Minimalist",
    project: "Summer Glow Edit",
    campaign: "Summer Glow Edit",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia,
    avatarUrl: imgEllipse,
    duration: "0:31",
    status: "Live",
    statusCode: "live",
    statsText: "1.1 L views · 140 orders",
    usageRightsText: "1 month · ended 29 Aug",
    usageRightsType: "organic_ended",
    views: "1.1 L",
    viewsNumeric: 110000,
    orders: 140,
    liveDate: "2 Jul",
    linkClicks: "3,100",
    salesDrove: "₹48,000",
    earnings: "₹11,000",
    livePostUrl: "instagram.com/reel/summer_glow",
    trackingLink: "flw.to/summer-ish",
    couponCode: "SUMMER15",
    fileName: "summer_glow.mp4 · 38 MB",
  },
  {
    id: "cnt-11",
    title: "Reel · ubtan glow",
    brand: "Kumkum Naturals",
    project: "Ubtan Glow Reel",
    campaign: "Ubtan Glow Reel",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia3,
    avatarUrl: imgEllipse4,
    duration: "0:27",
    status: "Live",
    statusCode: "live",
    statsText: "92K views · 64 orders",
    usageRightsText: "30 days · ended 21 Jun",
    usageRightsType: "organic_ended",
    views: "92K",
    viewsNumeric: 92000,
    orders: 64,
    liveDate: "15 May",
    linkClicks: "1,520",
    salesDrove: "₹21,000",
    earnings: "₹6,500",
    livePostUrl: "instagram.com/reel/ubtan_reel",
    trackingLink: "flw.to/ubtan-ish",
    couponCode: "KUMKUM10",
    fileName: "ubtan_glow.mp4 · 31 MB",
  },
  {
    id: "cnt-12",
    title: "Reel · rose toner",
    brand: "Petal Theory",
    project: "Rose Toner gift",
    campaign: "Rose Toner (gift)",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia1,
    avatarUrl: imgEllipse5,
    duration: "0:22",
    status: "Live",
    statusCode: "live",
    statsText: "41K views · 7.2% ER",
    usageRightsText: "1 month · until 10 Nov",
    usageRightsType: "organic_active",
    views: "41K",
    viewsNumeric: 41000,
    er: "7.2%",
    orders: 28,
    liveDate: "10 Oct",
    linkClicks: "840",
    salesDrove: "₹11,200",
    earnings: "Gifted product",
    livePostUrl: "instagram.com/reel/petal_rose",
    trackingLink: "flw.to/petal-rose",
    couponCode: "PETAL10",
    fileName: "rose_toner.mp4 · 26 MB",
  },
  // Additional items loaded when clicking "Load more" to complete 18 items
  {
    id: "cnt-13",
    title: "Story · Unboxing & First Look",
    brand: "Minimalist",
    project: "Vitamin-C Serum",
    campaign: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Story",
    mediaUrl: imgMedia5,
    avatarUrl: imgEllipse,
    duration: "0:15",
    status: "Waiting for approval",
    statusCode: "waiting",
    statsText: "Submitted 28 Oct · Brand reviewing",
    usageRightsText: "30 days · until 30 Nov",
    usageRightsType: "organic_active",
    liveDate: "Pending approval",
    views: "—",
    viewsNumeric: 0,
    er: "—",
    orders: 0,
    salesDrove: "₹0",
    earnings: "₹5,000",
    livePostUrl: "Under brand review",
    trackingLink: "flw.to/unboxing-vcs",
    couponCode: "ISHITA15",
    fileName: "unboxing_first_look.mp4 · 22 MB",
  },
  {
    id: "cnt-14",
    title: "Reel · Texture comparison",
    brand: "Minimalist",
    project: "Vitamin-C Serum",
    campaign: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia2,
    avatarUrl: imgEllipse,
    duration: "0:30",
    status: "Live",
    statusCode: "live",
    statsText: "1.4 L views · 5.8% ER · 72 orders",
    usageRightsText: "3 months · until 15 Dec",
    usageRightsType: "organic_active",
    views: "1.4 L",
    viewsNumeric: 140000,
    er: "5.8%",
    orders: 72,
    liveDate: "18 Oct",
    linkClicks: "2,100",
    salesDrove: "₹28,500",
    earnings: "₹8,500",
    livePostUrl: "instagram.com/reel/texture_comp",
    trackingLink: "flw.to/texture-vcs",
    couponCode: "ISHITA15",
    fileName: "texture_comparison.mp4 · 42 MB",
  },
  {
    id: "cnt-15",
    title: "Video · Routine breakdown",
    brand: "Dewdrop Naturals",
    project: "Mist launch",
    campaign: "Mist launch",
    platform: "Instagram",
    format: "Video",
    mediaUrl: imgMedia7,
    avatarUrl: imgEllipse2,
    duration: "0:52",
    status: "Live",
    statusCode: "live",
    statsText: "88K views · 6.1% ER",
    usageRightsText: "3 months · until 20 Dec",
    usageRightsType: "organic_active",
    views: "88K",
    viewsNumeric: 88000,
    er: "6.1%",
    orders: 38,
    liveDate: "14 Oct",
    linkClicks: "1,200",
    salesDrove: "₹15,000",
    earnings: "₹7,000",
    livePostUrl: "instagram.com/reel/dewdrop_breakdown",
    trackingLink: "flw.to/dew-breakdown",
    couponCode: "DEW10",
    fileName: "routine_breakdown.mp4 · 55 MB",
  },
  {
    id: "cnt-16",
    title: "Story · Swatch test",
    brand: "Velvet Lip Co.",
    project: "Lip Liner Collab",
    campaign: "Lip Liner Collab",
    platform: "Instagram",
    format: "Story",
    mediaUrl: imgMedia6,
    avatarUrl: imgEllipse1,
    duration: "0:15",
    status: "Live",
    statusCode: "live",
    statsText: "64K views · 42 orders",
    usageRightsText: "30 days · ended 27 Sep",
    usageRightsType: "organic_ended",
    views: "64K",
    viewsNumeric: 64000,
    orders: 42,
    liveDate: "15 Aug",
    linkClicks: "1,150",
    salesDrove: "₹16,800",
    earnings: "₹4,500",
    livePostUrl: "instagram.com/stories/velvet_swatch",
    trackingLink: "flw.to/velvet-swatch",
    couponCode: "VELVET15",
    fileName: "swatch_test.mp4 · 19 MB",
  },
  {
    id: "cnt-17",
    title: "Reel · Morning glow routine",
    brand: "Kumkum Naturals",
    project: "Ubtan Glow Reel",
    campaign: "Ubtan Glow Reel",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia4,
    avatarUrl: imgEllipse4,
    duration: "0:35",
    status: "Live",
    statusCode: "live",
    statsText: "1.1 L views · 68 orders",
    usageRightsText: "30 days · ended 21 Jun",
    usageRightsType: "organic_ended",
    views: "1.1 L",
    viewsNumeric: 110000,
    orders: 68,
    liveDate: "28 May",
    linkClicks: "2,200",
    salesDrove: "₹26,000",
    earnings: "₹8,000",
    livePostUrl: "instagram.com/reel/morning_glow",
    trackingLink: "flw.to/morning-glow",
    couponCode: "KUMKUM10",
    fileName: "morning_glow.mp4 · 46 MB",
  },
  {
    id: "cnt-18",
    title: "Reel · Floral toner test",
    brand: "Petal Theory",
    project: "Rose Toner gift",
    campaign: "Rose Toner (gift)",
    platform: "Instagram",
    format: "Reel",
    mediaUrl: imgMedia,
    avatarUrl: imgEllipse5,
    duration: "0:25",
    status: "Live",
    statusCode: "live",
    statsText: "53K views · 6.8% ER",
    usageRightsText: "1 month · until 10 Nov",
    usageRightsType: "organic_active",
    views: "53K",
    viewsNumeric: 53000,
    er: "6.8%",
    orders: 31,
    liveDate: "12 Oct",
    linkClicks: "920",
    salesDrove: "₹12,500",
    earnings: "Gifted product",
    livePostUrl: "instagram.com/reel/floral_test",
    trackingLink: "flw.to/floral-test",
    couponCode: "PETAL10",
    fileName: "floral_toner_test.mp4 · 34 MB",
  },
];

/**
 * Reusable dropdown component matching the exact styling of the user-provided spec image:
 * Trigger has crisp dark border and chevron up/down.
 * Selected item has blue background (#f1f4ff) and checkmark on the right.
 */
interface ContentDropdownProps {
  label: string;
  value: string;
  defaultVal: string;
  options: readonly string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: string) => void;
  minWidth?: string;
}

function ContentDropdown({
  label,
  value,
  defaultVal,
  options,
  isOpen,
  onToggle,
  onSelect,
  minWidth = "w-[175px]",
}: ContentDropdownProps) {
  const isCustomSelected = value !== defaultVal;
  const displayLabel = isCustomSelected
    ? label.startsWith("Sort")
      ? `Sort: ${value}`
      : value
    : label;

  return (
    <div className={`relative inline-block text-left ${minWidth}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        className={`bg-white content-stretch flex items-center justify-between gap-[8px] h-[40px] px-[12px] py-[8px] rounded-[8px] cursor-pointer transition select-none w-full ${
          isOpen
            ? "border-2 border-[#0d0d10]"
            : isCustomSelected
            ? "border border-[#0d0d10] bg-[#f8f9fb]"
            : "border border-[#e3e5ec] hover:border-[#0d0d10]"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate font-['Inter:Regular'] font-normal text-[13px] text-[#0d0d10] leading-[20px]">
          {displayLabel}
        </span>
        <div className="shrink-0 size-[14px] flex items-center justify-center text-[#0d0d10]">
          {isOpen ? (
            <ChevronUp className="size-3.5 stroke-[2.2]" />
          ) : (
            <ChevronDown className="size-3.5 stroke-[2.2]" />
          )}
        </div>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+6px)] z-50 w-full bg-white border border-[#e3e5ec] rounded-[8px] p-[6px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] flex flex-col gap-[2px] animate-in fade-in zoom-in-95 duration-100 max-h-[350px] overflow-y-auto"
        >
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelect(option)}
                className={`w-full content-stretch flex items-center justify-between px-[12px] py-[8px] rounded-[6px] transition cursor-pointer text-left ${
                  isSelected
                    ? "bg-[#f1f4ff] text-[#0d0d10] font-['Inter:Medium'] font-medium"
                    : "text-[#0d0d10] font-['Inter:Regular'] font-normal hover:bg-[#f8f9fb]"
                }`}
              >
                <span className="text-[13px] leading-[20px] truncate">
                  {option}
                </span>
                {isSelected && (
                  <Check className="size-3.5 text-[#0d0d10] shrink-0 stroke-[2.2]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CreatorContentPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Mode: "content" (552:277) or "empty" (793:13612)
  const isInitiallyEmpty = searchParams.get("view") === "empty";
  const [isEmptyMode, setIsEmptyMode] = useState(isInitiallyEmpty);

  // Active Tab
  const [activeTab, setActiveTab] = useState<ContentStatus>("all");

  // Selection state (checkboxes)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Active Detail Panel (Figma 793:13021)
  const initialDetailId = searchParams.get("detail");
  const initialDetailItem = useMemo(() => {
    if (initialDetailId) {
      return ALL_CONTENT_ITEMS.find((i) => i.id === initialDetailId) || null;
    }
    return null;
  }, [initialDetailId]);

  const [activeDetailItem, setActiveDetailItem] = useState<ContentItem | null>(initialDetailItem);

  // Pagination / Load more
  const [itemsLimit, setItemsLimit] = useState(12);

  // View mode: "grid" or "list"
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Dropdown states: "project" | "brand" | "format" | "usageRights" | "sort" | null
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Dropdown filter values matching user spec image:
  const [filterProject, setFilterProject] = useState<string>("All projects");
  const [filterBrand, setFilterBrand] = useState<string>("All brands");
  const [filterFormat, setFilterFormat] = useState<string>("Any format");
  const [filterUsageRights, setFilterUsageRights] = useState<string>("Any");
  const [sortOption, setSortOption] = useState<string>("Newest");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Close dropdown on outside click
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut: Escape closes dropdown and detail drawer
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (openDropdown) {
          setOpenDropdown(null);
        } else if (activeDetailItem) {
          setActiveDetailItem(null);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown, activeDetailItem]);

  // Filtered & Sorted Items
  const displayedItems = useMemo(() => {
    if (isEmptyMode) return [];

    let list = ALL_CONTENT_ITEMS.filter((item) => {
      // Status Tab filter
      if (activeTab === "waiting" && item.statusCode !== "waiting") return false;
      if (activeTab === "changes_requested" && item.statusCode !== "changes_requested") return false;
      if (activeTab === "approved" && item.statusCode !== "approved") return false;
      if (activeTab === "live" && item.statusCode !== "live") return false;
      if (activeTab === "used_in_ads" && item.statusCode !== "used_in_ads") return false;

      // Project filter: ["All projects", "Vitamin-C Serum", "Glow Squad", "Lip Liner Collab", "Mist launch", "Summer Glow Edit", "Hair Oil UGC"]
      if (filterProject !== "All projects") {
        if (item.project !== filterProject && item.campaign !== filterProject) return false;
      }

      // Brand filter: ["All brands", "Minimalist", "Velvet Lip Co.", "Dewdrop Naturals", "Strand Studio", "Kumkum Naturals", "Petal Theory"]
      if (filterBrand !== "All brands") {
        if (item.brand !== filterBrand) return false;
      }

      // Format filter: ["Any format", "Reel", "Story", "Short", "Long video", "UGC file", "Other"]
      if (filterFormat !== "Any format") {
        if (filterFormat === "Reel" && item.format !== "Reel") return false;
        if (filterFormat === "Story" && item.format !== "Story") return false;
        if (filterFormat === "Short" && (item.format !== "Reel" || !item.duration)) return false;
        if (filterFormat === "Long video" && item.format !== "Video") return false;
        if (filterFormat === "UGC file" && !item.statsText.includes("UGC") && item.format !== "Video") return false;
        if (filterFormat === "Other" && item.format !== "Post") return false;
      }

      // Usage rights filter: ["Any", "3 months", "6 months", "1 month", "30 days", "Ending in 30 days", "Ended"]
      if (filterUsageRights !== "Any") {
        if (filterUsageRights === "3 months" && !item.usageRightsText.startsWith("3 months")) return false;
        if (filterUsageRights === "6 months" && !item.usageRightsText.startsWith("6 months")) return false;
        if (filterUsageRights === "1 month" && !item.usageRightsText.startsWith("1 month")) return false;
        if (filterUsageRights === "30 days" && !item.usageRightsText.startsWith("30 days")) return false;
        if (filterUsageRights === "Ending in 30 days" && !item.usageRightsText.includes("until") && !item.usageRightsText.includes("days")) return false;
        if (filterUsageRights === "Ended" && !item.usageRightsText.includes("ended")) return false;
      }

      return true;
    });

    // Sorting: ["Newest", "Most views", "Most orders", "Rights ending soon"]
    if (sortOption === "Most views") {
      list = [...list].sort((a, b) => (b.viewsNumeric || 0) - (a.viewsNumeric || 0));
    } else if (sortOption === "Most orders") {
      list = [...list].sort((a, b) => (b.orders || 0) - (a.orders || 0));
    } else if (sortOption === "Rights ending soon") {
      list = [...list].sort((a, b) => {
        const aSoon = a.usageRightsText.includes("until") || a.usageRightsText.includes("days") ? 0 : 1;
        const bSoon = b.usageRightsText.includes("until") || b.usageRightsText.includes("days") ? 0 : 1;
        return aSoon - bSoon;
      });
    }

    return list;
  }, [
    isEmptyMode,
    activeTab,
    filterProject,
    filterBrand,
    filterFormat,
    filterUsageRights,
    sortOption,
  ]);

  // Tab Counts
  const tabCounts = useMemo(() => {
    if (isEmptyMode) {
      return { all: 0, waiting: 0, changes_requested: 0, approved: 0, live: 0, used_in_ads: 0 };
    }
    return {
      all: ALL_CONTENT_ITEMS.length, // 18
      waiting: ALL_CONTENT_ITEMS.filter((i) => i.statusCode === "waiting").length, // 1
      changes_requested: ALL_CONTENT_ITEMS.filter((i) => i.statusCode === "changes_requested").length, // 1
      approved: ALL_CONTENT_ITEMS.filter((i) => i.statusCode === "approved").length, // 1
      live: ALL_CONTENT_ITEMS.filter((i) => i.statusCode === "live").length, // 14
      used_in_ads: ALL_CONTENT_ITEMS.filter((i) => i.statusCode === "used_in_ads").length, // 1
    };
  }, [isEmptyMode]);

  // Toggle Selection
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDownloadSelected = () => {
    if (selectedIds.size === 0) {
      showToast("Select one or more items to download deliverable files.");
      return;
    }
    showToast(`Downloading ${selectedIds.size} file${selectedIds.size > 1 ? "s" : ""}...`);
  };

  const hasActiveFilters =
    filterProject !== "All projects" ||
    filterBrand !== "All brands" ||
    filterFormat !== "Any format" ||
    filterUsageRights !== "Any" ||
    sortOption !== "Newest";

  const handleResetFilters = () => {
    setFilterProject("All projects");
    setFilterBrand("All brands");
    setFilterFormat("Any format");
    setFilterUsageRights("Any");
    setSortOption("Newest");
    setOpenDropdown(null);
  };

  const visibleCards = displayedItems.slice(0, itemsLimit);

  return (
    <CreatorShell>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#0d0d10] text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}


        {/* Content Body Area */}
        <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative shrink-0 w-full max-w-[1400px]">
          {/* Page header */}
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Page header">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative" data-name="Left">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Title row">
                <h1 className="font-['Inter:Bold'] font-bold leading-[34px] not-italic relative shrink-0 text-[26px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.13px] whitespace-nowrap">
                  Content
                </h1>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
                Every post and file you made for brands · with usage rights and results
              </p>
            </div>

            {/* Actions: View Mode Switcher Pill & Download selected */}
            <div className="content-stretch flex items-center gap-[12px] overflow-clip relative shrink-0" data-name="Actions">
              {/* Interactive View State Switcher for checking both states */}
              <div className="flex items-center bg-[#f4f6fb] border border-[#e3e5ec] rounded-[8px] p-[2px] text-[12px] font-medium">
                <button
                  type="button"
                  onClick={() => setIsEmptyMode(false)}
                  className={`px-[10px] py-[6px] rounded-[6px] transition cursor-pointer ${
                    !isEmptyMode ? "bg-white text-[#0d0d10] shadow-xs font-semibold" : "text-[#71717a] hover:text-[#0d0d10]"
                  }`}
                  title="View with 18 items (Figma 552:277)"
                >
                  Content view (18)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEmptyMode(true);
                    setActiveDetailItem(null);
                  }}
                  className={`px-[10px] py-[6px] rounded-[6px] transition cursor-pointer ${
                    isEmptyMode ? "bg-white text-[#0d0d10] shadow-xs font-semibold" : "text-[#71717a] hover:text-[#0d0d10]"
                  }`}
                  title="View empty state (Figma 793:13612)"
                >
                  Empty state (0)
                </button>
              </div>

              {/* Download selected Button (visible in content state or when items exist) */}
              {!isEmptyMode && (
                <button
                  type="button"
                  onClick={handleDownloadSelected}
                  className={`border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 transition cursor-pointer ${
                    selectedIds.size > 0
                      ? "bg-[#0d0d10] text-white hover:bg-[#202024]"
                      : "bg-[var(--bg-surface,white)] text-[color:var(--text-primary,#0d0d10)] hover:bg-[#f4f6fb]"
                  }`}
                  data-name="Button"
                >
                  <div className="relative shrink-0 size-[16px]">
                    <img
                      alt=""
                      className={`absolute block inset-0 max-w-none size-full ${selectedIds.size > 0 ? "brightness-0 invert" : ""}`}
                      src={imgIconDownload}
                    />
                  </div>
                  <p className="font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] whitespace-nowrap">
                    Download selected {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Status Tabs */}
          <div
            className="border-[var(--border-default,#e3e5ec)] border-b border-solid content-stretch flex gap-[24px] items-start overflow-x-auto relative shrink-0 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            data-name="Tabs"
          >
            {[
              { id: "all", label: "All", count: tabCounts.all },
              { id: "waiting", label: "Waiting for approval", count: tabCounts.waiting },
              { id: "changes_requested", label: "Changes requested", count: tabCounts.changes_requested },
              { id: "approved", label: "Approved", count: tabCounts.approved },
              { id: "live", label: "Live", count: tabCounts.live },
              { id: "used_in_ads", label: "Used in ads", count: tabCounts.used_in_ads },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ContentStatus)}
                  className={`content-stretch flex gap-[6px] items-center overflow-clip pb-[12px] relative shrink-0 cursor-pointer transition border-b-2 ${
                    isActive
                      ? "border-[var(--primary-default,#0d0d10)] text-[color:var(--primary-default,#0d0d10)] font-medium"
                      : "border-transparent text-[color:var(--text-secondary,#0d0d10)] hover:text-[#0d0d10]"
                  }`}
                  data-name={`Tab · ${tab.label}`}
                >
                  <p className="font-['Inter:Medium'] text-[14px] leading-[22px] whitespace-nowrap">
                    {tab.label}
                  </p>
                  <div
                    className={`content-stretch flex items-start overflow-clip px-[7px] py-px relative rounded-[var(--radius-full,999px)] shrink-0 ${
                      isActive ? "bg-[var(--primary-subtle,#f1f4ff)]" : "bg-[var(--bg-muted,#edeff3)]"
                    }`}
                    data-name="count"
                  >
                    <p
                      className={`font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${
                        isActive ? "text-[color:var(--primary-default,#0d0d10)]" : "text-[color:var(--text-secondary,#0d0d10)]"
                      }`}
                    >
                      {tab.count}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* VIEW: EMPTY STATE (Figma Node 793:13612) */}
          {(isEmptyMode || displayedItems.length === 0) ? (
            <div
              className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[12px] items-center overflow-clip px-[20px] py-[64px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full"
              data-node-id="793:14070"
              data-name="Card"
            >
              {/* Media Icon Circle */}
              <div
                className="bg-[var(--bg-muted,#edeff3)] content-stretch flex items-start overflow-clip p-[16px] relative rounded-[var(--radius-full,999px)] shrink-0"
                data-node-id="793:14071"
                data-name="ic"
              >
                <div className="relative shrink-0 size-[28px]" data-node-id="793:14072" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEmptyMediaIcon} />
                </div>
              </div>

              {/* Title */}
              <p
                className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap"
                data-node-id="793:14073"
              >
                No content yet
              </p>

              {/* Description */}
              <p
                className="font-['Inter:Regular'] font-normal leading-[22px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-secondary,#0d0d10)] text-center max-w-[520px]"
                data-node-id="793:14074"
              >
                When you upload a post or file in a project, it shows up here with its status, results and how long the brand may use it.
              </p>

              {/* Buttons */}
              <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 pt-2" data-node-id="793:14075" data-name="b">
                <Link
                  to={ROUTES.creatorMyProjects}
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition"
                  data-node-id="793:14076"
                  data-name="Button"
                >
                  <p className="font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    Open My projects
                  </p>
                </Link>

                <Link
                  to={ROUTES.creatorProjects}
                  className="bg-[#0d0d10] content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#202024] transition text-white"
                  data-node-id="793:14077"
                  data-name="Button"
                >
                  <p className="font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                    + Find projects
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            /* VIEW: ACTIVE CONTENT STATE (Figma Node 552:277 & 793:13021) */
            <div className="w-full flex flex-col gap-[16px]">
              {/* Toolbar with 5 Dropdowns matching the user-uploaded spec image */}
              <div
                ref={dropdownContainerRef}
                className="content-stretch flex flex-wrap gap-[10px] items-center overflow-visible relative shrink-0 w-full z-30"
                data-name="Toolbar"
              >
                {/* 1. Dropdown · Content project */}
                <ContentDropdown
                  label="Project"
                  value={filterProject}
                  defaultVal="All projects"
                  options={PROJECT_OPTIONS}
                  isOpen={openDropdown === "project"}
                  onToggle={() => setOpenDropdown(openDropdown === "project" ? null : "project")}
                  onSelect={(p) => {
                    setFilterProject(p);
                    setOpenDropdown(null);
                  }}
                  minWidth="w-[180px]"
                />

                {/* 2. Dropdown · Content brand */}
                <ContentDropdown
                  label="Brand"
                  value={filterBrand}
                  defaultVal="All brands"
                  options={BRAND_OPTIONS}
                  isOpen={openDropdown === "brand"}
                  onToggle={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
                  onSelect={(b) => {
                    setFilterBrand(b);
                    setOpenDropdown(null);
                  }}
                  minWidth="w-[180px]"
                />

                {/* 3. Dropdown · Content format */}
                <ContentDropdown
                  label="Format"
                  value={filterFormat}
                  defaultVal="Any format"
                  options={FORMAT_OPTIONS}
                  isOpen={openDropdown === "format"}
                  onToggle={() => setOpenDropdown(openDropdown === "format" ? null : "format")}
                  onSelect={(f) => {
                    setFilterFormat(f);
                    setOpenDropdown(null);
                  }}
                  minWidth="w-[160px]"
                />

                {/* 4. Dropdown · Usage rights */}
                <ContentDropdown
                  label="Usage rights"
                  value={filterUsageRights}
                  defaultVal="Any"
                  options={USAGE_RIGHTS_OPTIONS}
                  isOpen={openDropdown === "usageRights"}
                  onToggle={() => setOpenDropdown(openDropdown === "usageRights" ? null : "usageRights")}
                  onSelect={(u) => {
                    setFilterUsageRights(u);
                    setOpenDropdown(null);
                  }}
                  minWidth="w-[165px]"
                />

                {/* Reset Filters action pill */}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[12px] font-medium text-[#71717a] hover:text-[#0d0d10] underline px-2 cursor-pointer transition"
                  >
                    Reset filters
                  </button>
                )}

                <div className="flex-[1_0_0] h-[38px] min-w-px" />

                {/* 5. Dropdown · Content sort */}
                <ContentDropdown
                  label="Sort: Newest"
                  value={sortOption}
                  defaultVal="Newest"
                  options={SORT_OPTIONS}
                  isOpen={openDropdown === "sort"}
                  onToggle={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                  onSelect={(s) => {
                    setSortOption(s);
                    setOpenDropdown(null);
                  }}
                  minWidth="w-[165px]"
                />

                {/* View Mode Toggle (Grid / List) */}
                <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex gap-[2px] items-start overflow-clip p-[3px] relative rounded-[var(--radius-md,8px)] shrink-0" data-name="View">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`content-stretch flex items-start overflow-clip p-[6px] relative rounded-[var(--radius-sm,6px)] shrink-0 cursor-pointer transition ${
                      viewMode === "grid" ? "bg-[var(--bg-surface,white)] shadow-xs" : "hover:bg-black/5"
                    }`}
                    aria-label="Grid view"
                  >
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconGridView} />
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`content-stretch flex items-start overflow-clip p-[6px] relative rounded-[var(--radius-sm,6px)] shrink-0 cursor-pointer transition ${
                      viewMode === "list" ? "bg-[var(--bg-surface,white)] shadow-xs" : "hover:bg-black/5"
                    }`}
                    aria-label="List view"
                  >
                    <div className="relative shrink-0 size-[14px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconListView} />
                    </div>
                  </button>
                </div>
              </div>

              {/* CARD GRID LAYOUT (4 Columns matching Figma 552:277 & 793:13021) */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] w-full" data-name="Grid">
                  {visibleCards.map((item) => {
                    const isSelected = selectedIds.has(item.id);
                    const isDetailActive = activeDetailItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveDetailItem(item)}
                        className={`bg-[var(--bg-surface,white)] border content-stretch flex flex-col gap-[10px] items-start overflow-clip pb-[12px] relative rounded-[var(--radius-lg,12px)] transition cursor-pointer group hover:shadow-md ${
                          isDetailActive
                            ? "border-[#3b5bff] ring-2 ring-[#3b5bff]"
                            : isSelected
                            ? "border-[#0d0d10] ring-1 ring-[#0d0d10]"
                            : "border-[var(--border-default,#e3e5ec)]"
                        }`}
                        data-name={`Tile · ${item.title}`}
                      >
                        {/* Media Container */}
                        <div className="h-[300px] overflow-clip relative shrink-0 w-full bg-slate-100" data-name="Media">
                          <img
                            alt={item.title}
                            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full group-hover:scale-102 transition duration-300"
                            src={item.mediaUrl}
                          />

                          {/* Platform Logo */}
                          <div className="absolute bg-[var(--bg-surface,white)] content-stretch flex items-start left-[10px] overflow-clip p-[5px] rounded-[var(--radius-sm,6px)] top-[10px] shadow-xs" data-name="lg">
                            <div className="relative shrink-0 size-[14px]">
                              <img alt={item.platform} className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                            </div>
                          </div>

                          {/* Status Badge */}
                          {item.statusCode === "live" && (
                            <div className="absolute bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] right-[10px] rounded-[var(--radius-full,999px)] top-[10px]">
                              <div className="relative shrink-0 size-[6px]">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot} />
                              </div>
                              <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--status-success-fg,#16a34a)] whitespace-nowrap">
                                Live
                              </p>
                            </div>
                          )}

                          {item.statusCode === "changes_requested" && (
                            <div className="absolute bg-[var(--status-danger-bg,#fde4e3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] right-[10px] rounded-[var(--radius-full,999px)] top-[10px]">
                              <div className="relative shrink-0 size-[6px]">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
                              </div>
                              <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[#dc2626] whitespace-nowrap">
                                Changes requested
                              </p>
                            </div>
                          )}

                          {item.statusCode === "approved" && (
                            <div className="absolute bg-[var(--status-info-bg,#f1f4ff)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] right-[10px] rounded-[var(--radius-full,999px)] top-[10px]">
                              <div className="relative shrink-0 size-[6px]">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot2} />
                              </div>
                              <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--status-info-fg,#3b5bff)] whitespace-nowrap">
                                Approved
                              </p>
                            </div>
                          )}

                          {item.statusCode === "used_in_ads" && (
                            <div className="absolute bg-[var(--primary-muted,#e3e9ff)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] right-[10px] rounded-[var(--radius-full,999px)] top-[10px]">
                              <div className="relative shrink-0 size-[6px]">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot3} />
                              </div>
                              <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[#3b5bff] whitespace-nowrap">
                                Used in ads
                              </p>
                            </div>
                          )}

                          {item.statusCode === "waiting" && (
                            <div className="absolute bg-[#feefce] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] right-[10px] rounded-[var(--radius-full,999px)] top-[10px]">
                              <div className="relative shrink-0 size-[6px] rounded-full bg-[#f59e0b]" />
                              <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[#b45309] whitespace-nowrap">
                                Waiting for approval
                              </p>
                            </div>
                          )}

                          {/* Duration timestamp */}
                          {item.duration && (
                            <div className="absolute bg-[rgba(0,0,0,0.6)] bottom-[10px] content-stretch flex items-start overflow-clip px-[6px] py-[2px] right-[10px] rounded-[4px]" data-name="dur">
                              <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-white whitespace-nowrap">
                                {item.duration}
                              </p>
                            </div>
                          )}

                          {/* Checkbox */}
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSelect(item.id);
                            }}
                            className={`absolute left-[10px] top-[272px] rounded-[4px] size-[18px] flex items-center justify-center transition cursor-pointer border ${
                              isSelected
                                ? "bg-[#0d0d10] border-[#0d0d10] text-white"
                                : "bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] hover:border-[#0d0d10]"
                            }`}
                            data-name="chk"
                          >
                            {isSelected && <Check size={12} strokeWidth={3} className="text-white" />}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip px-[12px] relative shrink-0 w-full" data-name="Body">
                          <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap truncate w-full">
                            {item.title}
                          </p>

                          {/* Brand Info with Avatar */}
                          <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-name="cr">
                            <div className="relative shrink-0 size-[18px]">
                              <img alt="" className="absolute block inset-0 max-w-none size-full rounded-full" src={item.avatarUrl} />
                            </div>
                            <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap truncate flex-1">
                              {item.brand} · {item.campaign}
                            </p>
                          </div>

                          {/* Stats text */}
                          <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap truncate w-full">
                            {item.statsText}
                          </p>

                          {/* Usage Rights Badge */}
                          <div
                            className={`content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[3px] relative rounded-[var(--radius-full,999px)] shrink-0 ${
                              item.usageRightsType === "paid_ads" ? "bg-[#f1f4ff]" : "bg-[var(--bg-muted,#edeff3)]"
                            }`}
                            data-name="ur"
                          >
                            <div className="relative shrink-0 size-[12px]">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconUsageRights} />
                            </div>
                            <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
                              {item.usageRightsText}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* LIST VIEW ALTERNATIVE */
                <div className="w-full bg-white border border-[#e3e5ec] rounded-[12px] overflow-hidden divide-y divide-[#e3e5ec]">
                  <div className="bg-[#f4f6fb] px-4 py-3 flex items-center text-[12px] font-semibold text-[#71717a] uppercase tracking-wider">
                    <span className="w-8"></span>
                    <span className="w-16">Media</span>
                    <span className="flex-1">Title & Brand</span>
                    <span className="w-32">Format</span>
                    <span className="w-48">Stats</span>
                    <span className="w-44">Usage Rights</span>
                    <span className="w-32 text-right">Status</span>
                  </div>
                  {visibleCards.map((item) => {
                    const isSelected = selectedIds.has(item.id);
                    const isDetailActive = activeDetailItem?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveDetailItem(item)}
                        className={`px-4 py-3 flex items-center gap-3 transition cursor-pointer hover:bg-[#f9fafb] ${
                          isDetailActive ? "bg-blue-50/70 border-l-4 border-l-[#3b5bff]" : isSelected ? "bg-blue-50/40" : ""
                        }`}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelect(item.id);
                          }}
                          className={`rounded-[4px] size-[18px] flex items-center justify-center transition cursor-pointer border ${
                            isSelected
                              ? "bg-[#0d0d10] border-[#0d0d10] text-white"
                              : "bg-white border-[#e3e5ec]"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} className="text-white" />}
                        </div>
                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 relative">
                          <img src={item.mediaUrl} alt={item.title} className="size-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-[#0d0d10] truncate">{item.title}</p>
                          <p className="text-[12px] text-[#71717a] truncate">{item.brand} · {item.campaign}</p>
                        </div>
                        <div className="w-32 text-[13px] text-[#0d0d10]">{item.format} {item.duration ? `(${item.duration})` : ""}</div>
                        <div className="w-48 text-[12px] text-[#0d0d10] truncate">{item.statsText}</div>
                        <div className="w-44 text-[12px] text-[#71717a] truncate flex items-center gap-1.5">
                          <img src={imgIconUsageRights} alt="" className="size-3" />
                          <span>{item.usageRightsText}</span>
                        </div>
                        <div className="w-32 text-right">
                          <span
                            className={`inline-block text-[12px] font-medium px-2.5 py-0.5 rounded-full ${
                              item.statusCode === "live"
                                ? "bg-emerald-100 text-emerald-700"
                                : item.statusCode === "changes_requested"
                                ? "bg-rose-100 text-rose-700"
                                : item.statusCode === "approved"
                                ? "bg-blue-100 text-blue-700"
                                : item.statusCode === "used_in_ads"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Footer: Showing 12 of 18 + Load more */}
              <div className="content-stretch flex items-center justify-between overflow-clip pt-[12px] pb-[40px] relative shrink-0 w-full" data-name="Footer">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
                  Showing {visibleCards.length} of {displayedItems.length} · 2 usage rights end in the next 30 days
                </p>

                {visibleCards.length < displayedItems.length ? (
                  <button
                    type="button"
                    onClick={() => {
                      setItemsLimit(displayedItems.length);
                      showToast(`Loaded all ${displayedItems.length} items.`);
                    }}
                    className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition cursor-pointer"
                    data-name="Button"
                  >
                    <p className="font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                      Load more
                    </p>
                  </button>
                ) : (
                  <div className="text-[12px] font-medium text-[#71717a]">
                    All {displayedItems.length} items loaded
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      {/* DETAIL DRAWER / PANEL (Figma Node 793:13021) */}
      {activeDetailItem && (
        <>
          {/* Subtle dim backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 transition-opacity"
            onClick={() => setActiveDetailItem(null)}
          />

          <div
            className="fixed inset-y-0 right-0 z-50 bg-[var(--bg-surface,white)] content-stretch flex flex-col gap-[18px] h-screen items-start overflow-y-auto p-[24px] shadow-[-8px_0px_32px_0px_rgba(0,0,0,0.18)] w-[520px] max-w-[92vw] animate-in slide-in-from-right duration-250 [scrollbar-width:thin]"
            data-node-id="793:13292"
            data-name="Detail panel"
          >
            {/* Header */}
            <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="793:13293" data-name="h">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] text-[16px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  {activeDetailItem.title}
                </p>
                <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-name="m">
                  <div className="relative shrink-0 size-[16px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo1} />
                  </div>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
                    {activeDetailItem.brand} · {activeDetailItem.campaign} · live {activeDetailItem.liveDate || "14 Oct"}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              {activeDetailItem.statusCode === "live" && (
                <div className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0">
                  <div className="relative shrink-0 size-[6px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot} />
                  </div>
                  <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--status-success-fg,#16a34a)] whitespace-nowrap">
                    Live
                  </p>
                </div>
              )}
              {activeDetailItem.statusCode === "changes_requested" && (
                <div className="bg-[var(--status-danger-bg,#fde4e3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0">
                  <div className="relative shrink-0 size-[6px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
                  </div>
                  <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[#dc2626] whitespace-nowrap">
                    Changes requested
                  </p>
                </div>
              )}
              {activeDetailItem.statusCode === "approved" && (
                <div className="bg-[var(--status-info-bg,#f1f4ff)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0">
                  <div className="relative shrink-0 size-[6px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot2} />
                  </div>
                  <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--status-info-fg,#3b5bff)] whitespace-nowrap">
                    Approved
                  </p>
                </div>
              )}
              {activeDetailItem.statusCode === "used_in_ads" && (
                <div className="bg-[var(--primary-muted,#e3e9ff)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0">
                  <div className="relative shrink-0 size-[6px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot3} />
                  </div>
                  <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[#3b5bff] whitespace-nowrap">
                    Used in ads
                  </p>
                </div>
              )}
              {activeDetailItem.statusCode === "waiting" && (
                <div className="bg-[#feefce] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0">
                  <div className="relative shrink-0 size-[6px] rounded-full bg-[#f59e0b]" />
                  <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[#b45309] whitespace-nowrap">
                    Waiting for approval
                  </p>
                </div>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveDetailItem(null)}
                className="relative shrink-0 size-[24px] p-0.5 rounded hover:bg-[#f4f6fb] transition cursor-pointer flex items-center justify-center"
                data-node-id="793:13300"
                data-name="Icon"
                aria-label="Close"
              >
                <img alt="Close" className="size-[18px]" src={imgIconClose} />
              </button>
            </div>

            {/* Media Row: 170px preview + "Your results" stats */}
            <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="793:13301" data-name="Row">
              {/* Video Thumbnail (170px x 300px) */}
              <div className="h-[300px] overflow-clip relative rounded-[10px] shrink-0 w-[170px] bg-slate-900 shadow-xs" data-node-id="793:13302" data-name="Video">
                <img
                  alt={activeDetailItem.title}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full"
                  src={activeDetailItem.mediaUrl}
                />
                {/* Center Play Button Overlay */}
                <div className="absolute left-[63px] size-[44px] top-[128px]" data-name="Ellipse">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipsePlay} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img alt="Play" className="size-[16px] ml-0.5" src={imgPolygonPlay} />
                  </div>
                </div>
              </div>

              {/* Column: Your Results */}
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px not-italic overflow-clip relative" data-node-id="793:13305" data-name="Column">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  Your results
                </p>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                    Views
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    {activeDetailItem.views || "3.0 L"}
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                    Engagement rate
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    {activeDetailItem.er || "6.9%"}
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                    Link clicks
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    {activeDetailItem.linkClicks || "5,300"}
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                    Orders
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    {activeDetailItem.orders ?? 214}
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                    Sales you drove
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    {activeDetailItem.salesDrove || "₹78,000"}
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                    You were paid
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--status-success-fg,#16a34a)] whitespace-nowrap">
                    {activeDetailItem.earnings || "₹12,750"}
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Rights Box */}
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full" data-node-id="793:13325" data-name="Usage">
              <p className="font-['Inter:Medium'] font-medium leading-[22px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="793:13326">
                Usage rights
              </p>
              <div className="content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                  {activeDetailItem.brand} may use it for
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  {activeDetailItem.usageRightsText.split(" · ")[0]} usage rights (typed by brand)
                </p>
              </div>
              <div className="content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                  Duration & end date
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  {activeDetailItem.usageRightsText} · locked on invite
                </p>
              </div>
              <div className="content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                  Status
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  Locked on invite · can only be extended
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast(`Sent request to ${activeDetailItem.brand} to offer extended usage rights.`)}
                className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition cursor-pointer mt-1"
                data-name="Button"
              >
                <div className="relative shrink-0 size-[14px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconOfferMoreTime} />
                </div>
                <p className="font-['Inter:Medium'] font-medium leading-[18px] text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  Offer more time
                </p>
              </button>
            </div>

            {/* Links and files Box */}
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[8px] items-start not-italic overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full" data-node-id="793:13339" data-name="Links">
              <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                Links and files
              </p>
              <div className="content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-center leading-[20px] overflow-clip relative shrink-0 text-[13px] w-full" data-name="kv">
                <p className="flex-[1_0_0] text-[color:var(--text-secondary,#0d0d10)]">
                  Live post
                </p>
                <a
                  href={`https://${activeDetailItem.livePostUrl || "instagram.com/reel/C8xMeera1"}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[color:var(--text-link,#3b5bff)] hover:underline whitespace-nowrap"
                >
                  {activeDetailItem.livePostUrl || "instagram.com/reel/C8xMeera1"}
                </a>
              </div>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                  Tracking link
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  {activeDetailItem.trackingLink || "flw.to/ishita-vcs"}
                </p>
              </div>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                  Coupon
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  {activeDetailItem.couponCode || "ISHITA15 · 236 orders"}
                </p>
              </div>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] text-[13px] text-[color:var(--text-secondary,#0d0d10)]">
                  Original file
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  {activeDetailItem.fileName || "meera_grwm.mp4 · 48 MB"}
                </p>
              </div>
            </div>

            {/* Bottom Action Buttons: Download & Open Project */}
            <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full mt-auto pt-2" data-node-id="793:13353" data-name="btns">
              <button
                type="button"
                onClick={() => showToast(`Downloading ${activeDetailItem.fileName || "original deliverable file"}...`)}
                className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] gap-[8px] h-[40px] items-center justify-center min-w-px overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] hover:bg-[#f4f6fb] transition cursor-pointer"
                data-name="Button"
              >
                <div className="relative shrink-0 size-[16px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconDownload} />
                </div>
                <p className="font-['Inter:Medium'] font-medium leading-[20px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  Download
                </p>
              </button>
              <Link
                to="/creator/project"
                className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] gap-[8px] h-[40px] items-center justify-center min-w-px overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] hover:bg-[#f4f6fb] transition text-[#0d0d10]"
                data-name="Button"
              >
                <div className="relative shrink-0 size-[16px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconExternalLink} />
                </div>
                <p className="font-['Inter:Medium'] font-medium leading-[20px] text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                  Open project
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
    </CreatorShell>
  );
}
