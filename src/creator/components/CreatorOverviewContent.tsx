import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  FileCheck2,
  Image as ImageIcon,
  MailCheck,
  MessageCircle,
  PackageCheck,
  PlaySquare,
  Send,
  Star,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CountUp } from "@/common/components/motion/CountUp";
import { RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { DURATION, EASE_OUT, scaleIn } from "@/common/constants/motion";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";

const rupee = "\u20b9";
const dot = " \u00b7 ";
const figmaImages = [
  "https://www.figma.com/api/mcp/asset/4b0e052f-669a-4c97-8e7a-b20f21651b0c.png",
  "https://www.figma.com/api/mcp/asset/f3e731e9-ba34-47a8-bf9f-1f241e18cafc.png",
  "https://www.figma.com/api/mcp/asset/06f17014-58fe-43db-b496-8a7569a9f8fc.png",
  "https://www.figma.com/api/mcp/asset/9fbe74f9-dd47-4a6b-a8bf-961318ac3991.png",
] as const;

type Tile = { label: string; value: string; note: string; Icon: LucideIcon; tone?: "ink" | "success" | "warning" | "neutral"; count?: number };
const tiles: Tile[] = [
  { label: "Live projects", value: "2", note: "1 ends 7 Nov", Icon: FileCheck2, count: 2, tone: "neutral" },
  { label: "Invitations", value: "4", note: "reply by 2 Nov", Icon: MailCheck, count: 4, tone: "warning" },
  { label: "Paid to you", value: `${rupee}12,750`, note: `${rupee}4,250 in escrow`, Icon: CircleDollarSign, tone: "success" },
  { label: "Content published", value: "5", note: `4 Reels${dot}1 Story`, Icon: PlaySquare, count: 5, tone: "neutral" },
  { label: "Total views", value: "14.2 L", note: "32% more than Sep", Icon: TrendingUp, tone: "ink" },
  { label: "On-time score", value: "98%", note: "on 42 deliverables", Icon: CheckCircle2, tone: "success" },
];
const actionItems = [
  { title: "Confirm your Lip Tint Duo arrived", body: `Vitamin-C Serum${dot}auto-confirms today at 11:40`, due: "Now", tone: "danger", Icon: PackageCheck },
  { title: "Reply to Minimalist", body: `Can you add the coupon on screen?${dot}2 h ago`, due: "Today", tone: "danger", Icon: MessageCircle },
  { title: "Upload the last-day Story", body: `Vitamin-C Serum${dot}add ISHITA15 on screen`, due: "Tomorrow", tone: "warning", Icon: Send },
  { title: "Review Glow Squad brief", body: `Cycle 1 starts 2 Nov${dot}3 deliverables`, due: "In 2 days", tone: "warning", Icon: FileCheck2 },
  { title: "Choose from 2 project offers", body: "Matte Lip Launch and Winter Lip Care", due: "This week", tone: "neutral", Icon: Star },
] as const;
const upcoming = [
  { day: "30", month: "OCT", title: "Last-day Story", detail: "Vitamin-C Serum - due tomorrow" },
  { day: "02", month: "NOV", title: "Glow Squad - cycle 1", detail: `3 deliverables start - ${rupee}27,000` },
  { day: "04", month: "NOV", title: "Reply to Matte Lip Launch", detail: `New offer - ${rupee}15,000` },
  { day: "07", month: "NOV", title: "Vitamin-C Serum ends", detail: "Final Story and results due" },
  { day: "20", month: "NOV", title: "Winter Lip Care offer", detail: "Gift collaboration - reply by 20 Nov" },
] as const;
const projects = [
  { title: "Vitamin-C Serum", brand: "Minimalist", status: "Posting", deliverables: "3 of 4", fee: `${rupee}17,000`, progress: 75, note: "Story due 30 Oct", image: figmaImages[0] },
  { title: "Glow Squad", brand: "Minimalist", status: "Cycle 1", deliverables: "0 of 3", fee: `${rupee}27,000 / mo`, progress: 17, note: "Starts 2 Nov", image: figmaImages[2] },
  { title: "Matte Lip Launch", brand: "Velvet Lip Co.", status: "New offer", deliverables: "2 Reels", fee: `${rupee}15,000`, progress: 0, note: "Reply by 2 Nov", image: figmaImages[1] },
  { title: "Winter Lip Care", brand: "Minimalist - Gift", status: "New offer", deliverables: "1 Reel", fee: `Gift - ${rupee}1,450 kit`, progress: 0, note: "Reply by 20 Nov", image: figmaImages[3] },
  { title: "Mist launch", brand: "Dewdrop Naturals - Gift + fee", status: "Completed", deliverables: "3 of 3", fee: `Gift + ${rupee}6,000`, progress: 100, note: "All approved - paid 12 Sep", image: figmaImages[3] },
] as const;
const contentItems = [
  { label: "Reel 1", project: "Vitamin-C Serum", metric: "3.0 L views - 6.9% eng.", image: figmaImages[0] },
  { label: "Reel 2", project: "Vitamin-C Serum", metric: "2.6 L views - 7.4% eng.", image: figmaImages[1] },
  { label: "Reel", project: "Glow Squad", metric: "1.2 L views - 6.1% eng.", image: figmaImages[2] },
  { label: "Story", project: "Glow Squad", metric: "42K views - 5.2% eng.", image: figmaImages[3] },
] as const;
const brands = [
  { initials: "MI", name: "Minimalist", detail: "Vitamin-C Serum - Glow Squad", value: `${rupee}1,12,850`, projects: "3 projects", color: "bg-[#3b5bff]" },
  { initials: "VL", name: "Velvet Lip Co.", detail: "Matte Lip Launch - 1 past", value: `${rupee}25,080`, projects: "2 projects", color: "bg-[#7c3aed]" },
  { initials: "DN", name: "Dewdrop Naturals", detail: "Mist launch", value: `${rupee}6,000`, projects: "1 project", color: "bg-[#0d9488]" },
  { initials: "+3", name: "Other brands", detail: "3 brands - past work", value: `${rupee}23,980`, projects: "4 projects", color: "bg-muted text-secondary" },
] as const;

function StatusPill({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "success" | "info" }) {
  const styles = { neutral: "bg-muted text-secondary", success: "bg-[#e1fce3] text-[#159947]", info: "bg-primary-subtle text-primary" };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${styles[tone]}`}><span className="size-1.5 rounded-full bg-current" />{label}</span>;
}

function AnimatedBar({ value, className = "bg-primary" }: { value: number; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <div className="h-1.5 overflow-hidden rounded-full bg-muted"><motion.div className={`h-full rounded-full ${className}`} initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true, amount: 0.6 }} transition={reduceMotion ? { duration: 0 } : { duration: DURATION.slow, ease: EASE_OUT }} /></div>;
}

function MetricTile({ tile, index }: { tile: Tile; index: number }) {
  const iconTone =
    tile.tone === "ink"
      ? "bg-[#0d0d10]"
      : tile.tone === "success"
        ? "bg-[#149d46]"
        : tile.tone === "warning"
          ? "bg-[#f29b07]"
          : "bg-[#3b5bff]";
  return <motion.article variants={scaleIn} className="min-w-0 rounded-xl border border-line/70 bg-white p-4"><span className={`grid size-9 place-items-center rounded-md text-white ${iconTone}`}><tile.Icon size={18} /></span><p className="mt-3.5 truncate text-[12px] leading-4 text-secondary">{tile.label}</p><p className="mt-0.5 text-[22px] font-semibold leading-7 tracking-[-.33px] text-ink">{tile.count !== undefined ? <CountUp to={tile.count} duration={1.8} delay={index * 0.08} /> : tile.value}</p><p className="mt-2.5 truncate text-[12px] font-medium leading-4 text-tertiary">{tile.note}</p></motion.article>;
}

function CardHeader({ title, subtitle, action, to }: { title: string; subtitle: string; action?: string; to?: string }) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-ink">{title}</h2>
        <p className="text-[12px] leading-4 text-secondary">{subtitle}</p>
      </div>
      {action && (
        to ? (
          <Link to={to} className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:underline">
            {action}
            <ArrowRight size={14} />
          </Link>
        ) : (
          <button type="button" className="inline-flex items-center gap-1 text-[12px] font-medium text-primary">
            {action}
            <ArrowRight size={14} />
          </button>
        )
      )}
    </header>
  );
}

export function CreatorOverviewContent() {
  return <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 pb-10">
    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-[26px] font-bold leading-[34px] tracking-[-.13px] text-ink">Welcome, Ishita</h1><p className="mt-1 text-[13px] leading-5 text-secondary">@ishitarao{dot}5 projects{dot}1-28 Oct 2026 compared with 3-30 Sep</p></div><div className="flex flex-wrap gap-2.5"><DateRangePicker value="1 Oct - 28 Oct 2026" /><Link to="/creator/projects" className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-[14px] font-medium text-white hover:bg-black/90"><BriefcaseBusiness size={16} />Project discovery</Link></div></section>

    <RevealGroup className="rounded-xl border border-line bg-white p-5" stagger={0.06}><div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">{tiles.map((tile, index) => <RevealItem key={tile.label} variants={scaleIn}><MetricTile tile={tile} index={index} /></RevealItem>)}</div></RevealGroup>

    <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,2fr)_360px]">
      <div className="space-y-4">
        <RevealItem variants={scaleIn}><article className="rounded-xl border border-line bg-white p-5"><CardHeader title="To do" subtitle="5 things need you" /><div className="mt-3">{actionItems.map(({ title, body, due, tone, Icon }) => <button type="button" key={title} className="flex w-full items-center gap-3 border-t border-line/70 py-3 text-left"><span className="grid size-8 shrink-0 place-items-center rounded-md bg-subtle text-secondary"><Icon size={16} /></span><span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-medium leading-[22px] text-ink">{title}</span><span className="block truncate text-[12px] leading-4 text-secondary">{body}</span></span><span className={`shrink-0 rounded-md px-2 py-[3px] text-[12px] font-medium leading-4 ${tone === "danger" ? "bg-[#fde4e3] text-[#dc2626]" : tone === "warning" ? "bg-[#feefce] text-[#d97706]" : "bg-muted text-secondary"}`}>{due}</span></button>)}</div></article></RevealItem>
        <RevealItem variants={scaleIn}><article className="rounded-xl border border-line bg-white p-5"><CardHeader title="Your projects" subtitle="Live work, offers and past collaborations" action="All projects" to="/creator/my-projects?tab=live" /><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[750px] text-left"><thead className="bg-subtle text-[12px] font-semibold leading-4 text-secondary"><tr><th className="rounded-l-md px-3 py-2.5">Project</th><th className="px-3 py-2.5">Status</th><th className="px-3 py-2.5">Deliverables</th><th className="px-3 py-2.5">Fee</th><th className="px-3 py-2.5">Progress</th><th className="rounded-r-md px-3 py-2.5" /></tr></thead><tbody>{projects.map((project) => {
          const projectLink =
            project.title === "Vitamin-C Serum"
              ? "/creator/projects/vitamin-c-serum?view=workspace"
              : project.title === "Glow Squad"
                ? "/creator/projects/glow-squad-live?view=workspace"
                : project.status === "New offer"
                  ? "/creator/my-projects?tab=invitations"
                  : "/creator/projects/mist-launch?view=workspace";

          return (
            <tr key={project.title} className="border-b border-line/70 last:border-none hover:bg-[#fafbfe] transition">
              <td className="px-3 py-3">
                <Link to={projectLink} className="flex items-center gap-2.5 group">
                  <img src={project.image} alt="" className="size-9 rounded-lg object-cover" />
                  <span>
                    <p className="text-[14px] font-medium leading-5 text-ink group-hover:text-primary transition">{project.title}</p>
                    <p className="text-[12px] leading-4 text-secondary">{project.brand}</p>
                  </span>
                </Link>
              </td>
              <td className="px-3 py-3"><StatusPill label={project.status} tone={project.status === "Posting" ? "success" : project.status === "New offer" ? "info" : "neutral"} /></td>
              <td className="px-3 py-3 text-[13px] font-medium leading-5 text-ink">{project.deliverables}</td>
              <td className="px-3 py-3 text-[13px] font-medium leading-5 text-ink">{project.fee}</td>
              <td className="w-[180px] px-3 py-3"><div className="flex justify-between gap-3 text-[12px] leading-4"><span className="font-medium text-ink">{project.progress}%</span><span className="truncate text-secondary">{project.note}</span></div><div className="mt-1.5"><AnimatedBar value={project.progress} className={project.progress === 100 ? "bg-[#16a34a]" : "bg-primary"} /></div></td>
              <td className="px-3 py-3">
                <Link to={projectLink} className="text-primary hover:text-primary-dark">
                  <ArrowRight size={16} />
                </Link>
              </td>
            </tr>
          );
        })}</tbody></table></div></article></RevealItem>
        <RevealItem variants={scaleIn}><article className="rounded-xl border border-line bg-white p-5"><CardHeader title="Your content" subtitle="Went live in the last 30 days - 5 posts" action="Content" to="/creator/content" /><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{contentItems.map((item) => <article key={item.label} className="min-w-0"><div className="relative aspect-[.8] overflow-hidden rounded-[10px] bg-subtle"><img src={item.image} alt={`${item.label} from ${item.project}`} className="size-full object-cover" /><span className="absolute left-2 top-2 inline-flex rounded bg-white/90 p-1 text-[#dd2a7b]"><ImageIcon size={13} /></span></div><p className="mt-2 text-[12px] font-medium leading-4 text-ink">{item.label}</p><p className="mt-1 truncate text-[12px] leading-4 text-tertiary">{item.project}</p><p className="mt-1 text-[13px] font-medium leading-5 text-ink">{item.metric}</p></article>)}</div></article></RevealItem>
      </div>
      <aside className="space-y-4 xl:sticky xl:top-8 xl:self-start">
        <RevealItem variants={scaleIn}><article className="rounded-xl border border-line bg-white p-5"><CardHeader title="Coming up" subtitle="Dates across your projects" /><div className="mt-3 space-y-3">{upcoming.map((item) => <div key={item.title} className="flex items-center gap-3"><span className="grid w-11 shrink-0 rounded-md bg-subtle py-1 text-center"><b className="text-[14px] leading-4 text-ink">{item.day}</b><em className="not-italic text-[10px] font-medium leading-3 text-tertiary">{item.month}</em></span><span className="min-w-0"><b className="block truncate text-[13px] font-medium leading-5 text-ink">{item.title}</b><span className="block truncate text-[12px] leading-4 text-secondary">{item.detail}</span></span></div>)}</div></article></RevealItem>
        <RevealItem variants={scaleIn}><article className="rounded-xl border border-line bg-white p-5"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-md bg-ink text-white"><WalletCards size={18} /></span><div><h2 className="text-[16px] font-semibold leading-6 text-ink">Earnings</h2><p className="text-[12px] leading-4 text-secondary">Paid to you this year</p></div></div><p className="mt-5 text-[28px] font-semibold tracking-[-.4px] text-ink">{rupee}1,67,910</p><div className="mt-5 space-y-3">{[["Paid to you", `${rupee}1,67,910`, "bg-[#16a34a]"], ["Held in escrow", `${rupee}4,250`, "bg-[#f59e0b]"], ["Approved - paying 2 Nov", `${rupee}27,000`, "bg-primary"], ["Agreed, next cycle", `${rupee}27,000`, "bg-[#94a3b8]"] as const].map(([label, value, color]) => <div key={label} className="flex items-center gap-2 text-[13px]"><span className={`size-2 rounded-full ${color}`} /><span className="flex-1 text-secondary">{label}</span><b className="font-medium text-ink">{value}</b></div>)}</div><div className="mt-5 rounded-md bg-subtle p-3"><div className="flex justify-between text-[12px] font-medium text-ink"><span>Coming to you - next 14 days</span><span>{rupee}30,000</span></div><div className="mt-2 flex justify-between text-[12px] text-secondary"><span>2 Nov - Glow Squad cycle 1</span><span>{rupee}27,000</span></div><div className="mt-2 flex justify-between text-[12px] text-secondary"><span>On approval - results Reel</span><span>{rupee}3,000</span></div></div></article></RevealItem>
        <RevealItem variants={scaleIn}><article className="rounded-xl border border-line bg-white p-5"><CardHeader title="Brands you work with" subtitle="Paid to you this year - by brand" /><div className="mt-3">{brands.map((brand, index) => <div key={brand.name} className="flex items-center gap-3 border-b border-line/70 py-3 last:border-none"><span className="w-3 text-[12px] font-medium text-tertiary">{index + 1}</span><span className={`grid size-9 place-items-center rounded-lg text-[14px] font-semibold text-white ${brand.color}`}>{brand.initials}</span><span className="min-w-0 flex-1"><b className="block truncate text-[14px] font-medium leading-5 text-ink">{brand.name}</b><span className="block truncate text-[12px] leading-4 text-secondary">{brand.detail}</span></span><span className="text-right"><b className="block text-[13px] font-medium leading-5 text-ink">{brand.value}</b><span className="block text-[12px] leading-4 text-tertiary">{brand.projects}</span></span></div>)}</div></article></RevealItem>
      </aside>
    </section>
  </div>;
}
