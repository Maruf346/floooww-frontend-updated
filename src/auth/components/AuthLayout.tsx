import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { ASSETS } from "@/common/constants/assets";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";

export type AuthPanelVariant = "brand" | "brand-onboarding" | "creator" | "agency";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
  visual?: AuthPanelVariant | "auth" | "onboarding" | "creator-onboarding";
}

function normalizeVariant(
  variant?: AuthPanelVariant | "auth" | "onboarding" | "creator-onboarding"
): AuthPanelVariant {
  if (variant === "onboarding" || variant === "brand-onboarding") return "brand-onboarding";
  if (variant === "creator-onboarding" || variant === "creator") return "creator";
  if (variant === "agency") return "agency";
  return "brand";
}

interface SidePanelContent {
  headline: {
    title: string;
    description: string;
  };
  card1: {
    avatar?: string;
    avatarText?: string;
    isShopify?: boolean;
    title: string;
    subtitle: string;
    gaugePercent: number;
    gaugeLabel?: string;
    tags: string[];
  };
  card2: {
    label: string;
    liveText: string;
    figure: string;
    deltaText: string;
  };
  card3: {
    title: string;
    subtitle: string;
    badge?: string;
    captionLeft: string;
    captionRight: string;
    completedSteps: number;
  };
}

const PANEL_DATA: Record<AuthPanelVariant, SidePanelContent> = {
  brand: {
    headline: {
      title: "Find the right creators.\nRun the whole project.",
      description:
        "Brief, approve, track and pay in one place. Every payment waits safely in escrow until the content is approved.",
    },
    card1: {
      avatar: ASSETS.hero.avatarAditi,
      title: "Aditi Sharma",
      subtitle: "Beauty · Mumbai · 4.2 L followers",
      gaugePercent: 96,
      gaugeLabel: "% match",
      tags: ["84% women", "18–34", "Hindi + English"],
    },
    card2: {
      label: "Tracked net sales",
      liveText: "Live",
      figure: "₹6,99,200",
      deltaText: "↑ 31% vs prev. 28 days",
    },
    card3: {
      title: "₹1,86,000 held in escrow",
      subtitle: "Released 2 days after approval",
      badge: "Protected",
      captionLeft: "2 of 3 posts approved",
      captionRight: "Releases on approval",
      completedSteps: 2,
    },
  },
  "brand-onboarding": {
    headline: {
      title: "Set up once. Run every\ncreator project from here.",
      description:
        "Connect your store so every creator code and link is tracked to a sale, then invite your team to approve content.",
    },
    card1: {
      isShopify: true,
      title: "Shopify connected",
      subtitle: "Orders sync every 15 minutes",
      gaugePercent: 100,
      gaugeLabel: "% synced",
      tags: ["Coupon codes", "UTM links", "Orders"],
    },
    card2: {
      label: "Tracked net sales",
      liveText: "Live",
      figure: "₹6,99,200",
      deltaText: "↑ 31% vs prev. 28 days",
    },
    card3: {
      title: "3 teammates invited",
      subtitle: "Arjun, Tanvi and Nisha can approve",
      badge: "Team",
      captionLeft: "2 of 3 have joined",
      captionRight: "1 invite pending",
      completedSteps: 2,
    },
  },
  creator: {
    headline: {
      title: "Get discovered by brands\nthat fit you.",
      description:
        "See every fee up front, apply in a tap and get paid as soon as your content is approved.",
    },
    card1: {
      avatar: ASSETS.howItWorks.avatarMeera,
      title: "Meera Iyer",
      subtitle: "Beauty · Mumbai · 1.12 L followers",
      gaugePercent: 96,
      gaugeLabel: "% fit",
      tags: ["Skincare", "Hindi + English", "Reels & Stories"],
    },
    card2: {
      label: "Paid to you",
      liveText: "Paid",
      figure: "₹25,110",
      deltaText: "HDFC ···· 4821 · 2 Nov",
    },
    card3: {
      title: "New invite from Minimalist",
      subtitle: "Monsoon Sunscreen · reply by 2 Nov",
      badge: "Invite",
      captionLeft: "Fee ₹15–20K · 3 posts",
      captionRight: "Paid on approval",
      completedSteps: 2,
    },
  },
  agency: {
    headline: {
      title: "Every client’s creator\nprojects, in one place.",
      description:
        "Switch between clients, bill your service fees and keep every creator payout safe in escrow.",
    },
    card1: {
      avatarText: "M",
      title: "Minimalist",
      subtitle: "Client · 5 live projects · 38 creators",
      gaugePercent: 86,
      gaugeLabel: "% on time",
      tags: ["Dewdrop Naturals", "Velvet Lip Co", "+ 2 clients"],
    },
    card2: {
      label: "Service fees billed",
      liveText: "Live",
      figure: "₹1,38,000",
      deltaText: "↑ 18% vs last month",
    },
    card3: {
      title: "₹2,61,900 in escrow",
      subtitle: "Creator payouts · 3 clients",
      badge: "Protected",
      captionLeft: "2 of 3 client invoices paid",
      captionRight: "Next due 1 Nov",
      completedSteps: 2,
    },
  },
};

/** Shared 1440px auth/onboarding canvas with Figma-identical near-black side panel (node 814:7345). */
export function AuthLayout({ children, className, visual = "brand" }: AuthLayoutProps) {
  const panelVariant = normalizeVariant(visual);

  return (
    <div className="min-h-dvh bg-white">
      <div className="grid min-h-dvh lg:grid-cols-2">
        <section className="relative flex min-h-dvh flex-col px-5 pb-10 pt-8 sm:px-10 lg:px-[80px] lg:pb-[40px] lg:pt-[40px]">
          <header className="flex items-center justify-between">
            <Link to={ROUTES.home} aria-label="Kreyio home" className="rounded-sm">
              <Logo variant="nav" />
            </Link>
            <Link
              to={ROUTES.home}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium leading-5 text-body transition-colors hover:text-ink lg:hidden"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back to site
            </Link>
          </header>
          <main className="flex flex-1 items-center justify-center py-12 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className={className ?? "w-full max-w-[440px]"}
            >
              {children}
            </motion.div>
          </main>
          <footer className="text-[12px] leading-4 text-tertiary">
            © 2026 Kreyio Limited ·{" "}
            <Link className="hover:text-ink" to={ROUTES.terms}>
              Terms
            </Link>{" "}
            ·{" "}
            <Link className="hover:text-ink" to={ROUTES.privacy}>
              Privacy
            </Link>{" "}
            ·{" "}
            <Link className="hover:text-ink" to={ROUTES.help}>
              Help
            </Link>
          </footer>
        </section>
        <AuthSidePanel variant={panelVariant} />
      </div>
    </div>
  );
}

function RingGauge({ percentage, label = "% match" }: { percentage: number; label?: string }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="relative flex size-[52px] items-center justify-center">
        <svg className="size-full -rotate-90" viewBox="0 0 52 52">
          <circle
            cx="26"
            cy="26"
            r={radius}
            strokeWidth="3.5"
            stroke="#f1f3f7"
            fill="none"
          />
          <circle
            cx="26"
            cy="26"
            r={radius}
            strokeWidth="3.5"
            stroke="#10b981"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-inter-bold text-[15px] font-bold text-[#070b13]">
          {percentage}
        </span>
      </div>
      <span className="font-inter-medium text-[11px] font-medium text-[#576070] mt-0.5">
        {label}
      </span>
    </div>
  );
}

function SparklineChart() {
  return (
    <svg
      width="88"
      height="34"
      viewBox="0 0 89 36"
      fill="none"
      className="shrink-0 overflow-visible"
    >
      <defs>
        <linearGradient
          id="chartGradient"
          x1="43"
          y1="4"
          x2="43"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#16a34a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M1 28L15 24L29 26L43 16L57 19L71 8L85 4V36H1V28Z"
        fill="url(#chartGradient)"
      />
      <path
        d="M1 28L15 24L29 26L43 16L57 19L71 8L85 4"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="85" cy="4" r="3" fill="#16a34a" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function ConnectorLine() {
  return (
    <svg
      width="2"
      height="22"
      viewBox="0 0 2 22"
      fill="none"
      className="shrink-0 block"
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="22"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="2.5 3"
      />
    </svg>
  );
}

/**
 * Side panel matching Figma node 814:7345 (symbol 2413:740) 100%:
 * - Near-black background: #0d0d10
 * - 3 clean geometric wireframe circles (520px top-right, 460px bottom-left, 300px bottom-right)
 * - Headline & Subtitle
 * - Card 1 (400px wide, creator match / shopify sync)
 * - Connector 1 (dashed line at x=388px)
 * - Card 2 (270px wide, tracked sales / paid figure with sparkline)
 * - Connector 2 (dashed line at x=388px)
 * - Card 3 (400px wide, escrow protection / invite status)
 * - Platform rail (4 white square cards on the right for Instagram, YouTube, Snapchat, Pinterest)
 */
function AuthSidePanel({ variant }: { variant: AuthPanelVariant }) {
  const data = PANEL_DATA[variant];
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Proportional responsive scaling to fit viewports cleanly
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const sX = width / 720;
      const sY = height / 900;
      const fitted = Math.min(sX, sY);
      setScale(Math.max(0.65, Math.min(1.05, fitted)));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      ref={containerRef}
      className="relative hidden min-h-dvh overflow-hidden border-l border-[#26262b] bg-[#0d0d10] lg:flex lg:items-center lg:justify-center select-none"
    >
      {/* 720 × 900 Canvas matching Figma node 2413:740 exactly */}
      <div
        className="relative w-[720px] h-[900px] shrink-0 origin-center"
        style={{ transform: `scale(${scale})` }}
      >
        {/* 1. Wireframe Ellipse 1 (Top-right: 520x520 at x=420, y=-120) */}
        <svg
          className="pointer-events-none absolute left-[420px] -top-[120px] size-[520px] overflow-visible"
          viewBox="0 0 520 520"
          fill="none"
        >
          <circle
            cx="260"
            cy="260"
            r="259.25"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            opacity="0.5"
          />
        </svg>

        {/* 2. Wireframe Ellipse 2 (Bottom-left: 460x460 at x=-160, y=560) */}
        <svg
          className="pointer-events-none absolute -left-[160px] top-[560px] size-[460px] overflow-visible"
          viewBox="0 0 460 460"
          fill="none"
        >
          <circle
            cx="230"
            cy="230"
            r="229.25"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.24"
            opacity="0.5"
          />
        </svg>

        {/* 3. Wireframe Ellipse 3 (Bottom-right: 300x300 at x=300, y=520) */}
        <svg
          className="pointer-events-none absolute left-[300px] top-[520px] size-[300px] overflow-visible"
          viewBox="0 0 300 300"
          fill="none"
        >
          <circle
            cx="150"
            cy="150"
            r="149.25"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.21"
            opacity="0.5"
          />
        </svg>

        {/* Headline (x=72, y=96) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`headline-${variant}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="absolute left-[72px] top-[96px] w-[560px] z-10"
          >
            <h2 className="font-inter-semibold text-[36px] font-semibold leading-[44px] text-white tracking-[-0.02em] whitespace-pre-line">
              {data.headline.title}
            </h2>
            <p className="mt-[14px] font-inter-regular text-[16px] font-normal leading-[24px] text-white/85 max-w-[500px]">
              {data.headline.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Card 1: Creator Match / Shopify Sync (x=72, y=290, w=400) */}
        <motion.div
          key={`card1-${variant}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 }}
          className="absolute left-[72px] top-[290px] w-[400px] rounded-[20px] bg-white p-[18px] drop-shadow-[0px_18px_24px_rgba(0,0,0,0.4)] flex flex-col gap-[14px] z-20"
        >
          <div className="flex items-center gap-[14px] w-full">
            {data.card1.avatar && (
              <img
                src={data.card1.avatar}
                alt={data.card1.title}
                className="size-[48px] rounded-full object-cover shrink-0"
              />
            )}
            {data.card1.avatarText && (
              <div className="size-[48px] rounded-[12px] bg-[#0d0d10] flex items-center justify-center font-inter-bold text-[16px] font-bold text-white shrink-0">
                {data.card1.avatarText}
              </div>
            )}
            {data.card1.isShopify && (
              <div className="size-[48px] rounded-[14px] bg-[#f0f9f1] border border-[#d2edd5] flex items-center justify-center shrink-0 p-2.5">
                <img
                  src={ASSETS.integration.Shopify}
                  alt="Shopify"
                  className="size-[28px] object-contain"
                />
              </div>
            )}
            <div className="flex flex-col gap-[3px] min-w-0 flex-1">
              <p className="font-inter-semibold text-[16px] font-semibold text-[#070b13] truncate">
                {data.card1.title}
              </p>
              <p className="font-inter-regular text-[13px] text-[#576070] truncate">
                {data.card1.subtitle}
              </p>
            </div>
            <RingGauge
              percentage={data.card1.gaugePercent}
              label={data.card1.gaugeLabel}
            />
          </div>

          <div className="bg-[#eceef2] h-px w-full" />

          <div className="flex flex-wrap items-center gap-[8px]">
            {data.card1.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#f5f5f7] px-[10px] py-[5px] rounded-full font-inter-medium text-[12px] font-medium text-[#576070]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Connector Line 1: between Card 1 and Card 2 (x=388, y=453, h=22) */}
        <div className="absolute left-[388px] top-[453px] z-10 pointer-events-none">
          <ConnectorLine />
        </div>

        {/* Card 2: Tracked Net Sales / Paid to You (x=302, y=479, w=270) */}
        <motion.div
          key={`card2-${variant}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
          className="absolute left-[302px] top-[479px] w-[270px] rounded-[20px] bg-white p-[18px] drop-shadow-[0px_18px_24px_rgba(0,0,0,0.4)] flex flex-col gap-[12px] z-20"
        >
          <div className="flex items-center gap-[10px] w-full">
            <div className="size-[32px] rounded-[8px] bg-[#0d0d10] flex items-center justify-center font-inter-semibold text-[16px] text-white shrink-0">
              ↗
            </div>
            <p className="font-inter-regular text-[13px] text-[#576070] truncate">
              {data.card2.label}
            </p>
            <div className="flex-1" />
            <div className="flex items-center gap-[6px] shrink-0">
              <span className="size-[7px] rounded-full bg-[#16a34a] animate-pulse" />
              <span className="font-inter-medium text-[12px] font-medium text-[#576070]">
                {data.card2.liveText}
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-[8px] w-full">
            <p className="font-inter-bold text-[28px] font-bold leading-none text-[#070b13]">
              {data.card2.figure}
            </p>
            <SparklineChart />
          </div>

          <div className="self-start bg-[#dcfce7] px-[10px] py-[5px] rounded-full font-inter-medium text-[12px] font-medium text-[#15803d]">
            {data.card2.deltaText}
          </div>
        </motion.div>

        {/* Connector Line 2: between Card 2 and Card 3 (x=388, y=634, h=22) */}
        <div className="absolute left-[388px] top-[634px] z-10 pointer-events-none">
          <ConnectorLine />
        </div>

        {/* Card 3: Escrow / Invite Status (x=72, y=660, w=400) */}
        <motion.div
          key={`card3-${variant}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
          className="absolute left-[72px] top-[660px] w-[400px] rounded-[20px] bg-white p-[18px] drop-shadow-[0px_18px_24px_rgba(0,0,0,0.4)] flex flex-col gap-[14px] z-20"
        >
          <div className="flex items-center justify-between gap-[14px] w-full">
            <div className="flex flex-col gap-[3px] min-w-0 flex-1">
              <p className="font-inter-semibold text-[16px] font-semibold text-[#070b13] truncate">
                {data.card3.title}
              </p>
              <p className="font-inter-regular text-[13px] text-[#576070] truncate">
                {data.card3.subtitle}
              </p>
            </div>
            {data.card3.badge && (
              <span className="shrink-0 bg-[#f5f5f7] px-[10px] py-[5px] rounded-full font-inter-medium text-[12px] font-medium text-[#576070]">
                {data.card3.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-[6px] w-full">
            {[0, 1, 2].map((idx) => (
              <div
                key={idx}
                className={`h-[6px] rounded-[3px] flex-1 ${
                  idx < data.card3.completedSteps ? "bg-[#0d0d10]" : "bg-[#e2e5eb]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between font-inter-medium text-[12px] font-medium text-[#576070] w-full">
            <span>{data.card3.captionLeft}</span>
            <span>{data.card3.captionRight}</span>
          </div>
        </motion.div>

        {/* Right Platform Rail: x=600, top=290, 362, 434, 506 */}
        <div className="absolute left-[600px] top-[290px] flex flex-col gap-[20px] z-20">
          {(["Instagram", "YouTube", "Snapchat", "Pinterest"] as const).map(
            (platform) => (
              <motion.div
                key={platform}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="size-[52px] rounded-[14px] bg-white flex items-center justify-center drop-shadow-[0px_18px_24px_rgba(0,0,0,0.4)]"
                title={platform}
              >
                <PlatformLogo platform={platform} size={26} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </aside>
  );
}
