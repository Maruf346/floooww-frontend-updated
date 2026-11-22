import type { ReactNode } from "react";
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
  variant?: AuthPanelVariant | "auth" | "onboarding" | "creator-onboarding",
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
    subtext: string;
    bars: number[];
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
      subtext: "↑ 31% vs prev. 28 days",
      bars: [30, 42, 38, 55, 48, 70, 92],
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
      subtext: "↑ 31% vs prev. 28 days",
      bars: [25, 38, 45, 60, 58, 80, 95],
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
      avatarText: "MI",
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
      subtext: "HDFC ···· 4821 · 2 Nov",
      bars: [28, 35, 42, 50, 65, 78, 90],
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
      subtext: "↑ 18% vs last month",
      bars: [35, 48, 52, 65, 60, 82, 98],
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

/** Shared 1440px auth/onboarding canvas with responsive near-black side panel. */
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

function RingGauge({ percentage, label }: { percentage: number; label?: string }) {
  const radius = 17;
  const circumference = 2 * Math.PI * radius; // ~106.81
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex shrink-0 items-center gap-2">
      <div className="relative flex size-12 items-center justify-center">
        <svg className="size-full -rotate-90" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r={radius}
            strokeWidth="3.5"
            stroke="#f1f3f7"
            fill="none"
          />
          <circle
            cx="21"
            cy="21"
            r={radius}
            strokeWidth="3.5"
            stroke="#10b981"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[12px] font-bold text-ink">
          {percentage}%
        </span>
      </div>
      {label && (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
          {label}
        </span>
      )}
    </div>
  );
}

function MiniBarChart({ bars }: { bars: number[] }) {
  return (
    <div className="flex h-9 items-end gap-1.5 shrink-0">
      {bars.map((height, idx) => (
        <div
          key={idx}
          style={{ height: `${height}%` }}
          className={`w-2 rounded-t-sm transition-all duration-300 ${idx === bars.length - 1 ? "bg-primary" : "bg-primary/25"
            }`}
        />
      ))}
    </div>
  );
}

function ThreePartProgressBar({
  steps,
  completedCount = 2,
}: {
  steps: [string, string, string];
  completedCount?: number;
}) {
  return (
    <div className="mt-3.5 space-y-2">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`h-2 flex-1 rounded-full ${idx < completedCount ? "bg-emerald-500" : "bg-[#e5e7eb]"
              }`}
          />
        ))}
      </div>
      <div className="flex justify-between text-[11px] leading-4 text-secondary">
        <span className="font-medium text-ink">{steps[0]}</span>
        <span className="text-center font-medium text-ink">{steps[1]}</span>
        <span className="text-right text-tertiary">{steps[2]}</span>
      </div>
    </div>
  );
}

function AuthSidePanel({ variant }: { variant: AuthPanelVariant }) {
  const data = PANEL_DATA[variant];

  return (
    <aside className="relative hidden min-h-dvh overflow-hidden border-l border-white/10 bg-[#0d0d10] lg:flex lg:flex-col lg:justify-between px-10 py-10 xl:px-14 xl:py-12">
      {/* Background ambient lighting ellipses from Figma (2413:740) */}
      <div className="pointer-events-none absolute -right-[80px] -top-[120px] size-[520px] rounded-full bg-[#3b5bff]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-[160px] top-[500px] size-[460px] rounded-full bg-[#10b981]/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-[280px] top-[480px] size-[300px] rounded-full bg-[#3b5bff]/10 blur-[100px]" />

      {/* Top Headline & Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={variant}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="relative z-10 max-w-[500px]"
        >
          <h2 className="whitespace-pre-line text-[32px] font-bold leading-[42px] tracking-[-0.02em] text-white xl:text-[36px] xl:leading-[46px]">
            {data.headline.title}
          </h2>
          <p className="mt-3.5 text-[15px] leading-6 text-white/70">
            {data.headline.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Center 3 Redesigned Cards linked by Dotted Lines */}
      <div className="relative my-auto flex flex-col py-6">
        {/* Right floating rail of platform icons matching Figma 2413:740 */}
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-4 z-20">
          {(["Instagram", "YouTube", "Snapchat", "Pinterest"] as const).map((platform) => (
            <div
              key={platform}
              className="grid size-12 place-items-center rounded-[14px] bg-white shadow-[0_18px_24px_rgba(0,0,0,0.4)] transition-transform hover:scale-105"
              title={platform}
            >
              <PlatformLogo platform={platform} size={24} />
            </div>
          ))}
        </div>

        {/* Card 1: Ring Gauge and Tags */}
        <motion.div
          key={`card1-${variant}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 }}
          className="relative z-10 w-full max-w-[410px] rounded-[18px] border border-white/15 bg-white p-4 shadow-[0_20px_44px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              {data.card1.avatar && (
                <img
                  className="size-11 shrink-0 rounded-full object-cover"
                  src={data.card1.avatar}
                  alt={data.card1.title}
                />
              )}
              {data.card1.avatarText && (
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f4f6fb] text-[15px] font-bold text-[#070b13]">
                  {data.card1.avatarText}
                </div>
              )}
              {data.card1.isShopify && (
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e1fce3] text-[#16a34a] font-bold text-[18px]">
                  S
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-ink">
                  {data.card1.title}
                </p>
                <p className="truncate text-[12px] text-[#6b7280]">
                  {data.card1.subtitle}
                </p>
              </div>
            </div>
            <RingGauge
              percentage={data.card1.gaugePercent}
              label={data.card1.gaugeLabel}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-line-subtle pt-2.5">
            {data.card1.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-subtle px-2 py-0.5 text-[11px] font-medium text-body"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dotted Line linking Card 1 to Card 2 */}
        <div className="relative -my-1 ml-12 flex h-8 items-center">
          <div className="h-full border-l-2 border-dashed border-white/25" />
        </div>

        {/* Card 2: Bold figure with small chart and Live dot */}
        <motion.div
          key={`card2-${variant}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.28 }}
          className="relative z-10 ml-auto w-full max-w-[360px] rounded-[18px] border border-white/15 bg-white p-4 shadow-[0_20px_44px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-[#6b7280]">
              {data.card2.label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {data.card2.liveText}
            </span>
          </div>
          <div className="mt-2.5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[26px] font-bold tracking-tight text-ink">
                {data.card2.figure}
              </p>
              <p className="mt-0.5 text-[12px] font-medium text-emerald-600">
                {data.card2.subtext}
              </p>
            </div>
            <MiniBarChart bars={data.card2.bars} />
          </div>
        </motion.div>

        {/* Dotted Line linking Card 2 to Card 3 */}
        <div className="relative -my-1 mr-12 flex h-8 justify-end items-center">
          <div className="h-full border-r-2 border-dashed border-white/25" />
        </div>

        {/* Card 3: Status and Progress matching Figma */}
        <motion.div
          key={`card3-${variant}`}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.4 }}
          className="relative z-10 w-full max-w-[410px] rounded-[18px] border border-white/15 bg-white p-4 shadow-[0_20px_44px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-ink">
                {data.card3.title}
              </p>
              <p className="text-[12px] text-[#6b7280]">
                {data.card3.subtitle}
              </p>
            </div>
            {data.card3.badge && (
              <span className="shrink-0 rounded-full bg-[#f5f5f7] px-2.5 py-0.5 text-[11px] font-medium text-[#576070]">
                {data.card3.badge}
              </span>
            )}
          </div>
          <div className="mt-3.5 space-y-2">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full ${
                    idx < data.card3.completedSteps ? "bg-[#0d0d10]" : "bg-[#e2e5eb]"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[11px] font-medium leading-4 text-[#576070]">
              <span>{data.card3.captionLeft}</span>
              <span>{data.card3.captionRight}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Platform Badges Strip */}
      <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-white/10">
        <span className="text-[12px] text-white/50">Supported channels:</span>
        <div className="flex items-center gap-2">
          {(["Instagram", "YouTube", "Snapchat", "Pinterest"] as const).map((platform) => (
            <div
              key={platform}
              className="grid size-8 place-items-center rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
              title={platform}
            >
              <PlatformLogo platform={platform} size={16} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
