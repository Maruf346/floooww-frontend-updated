import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  MessageSquare,
  Plus,
  Search,
  Send,
  X,
} from "lucide-react";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { DURATION, EASE_OUT } from "@/common/constants/motion";

type Platform = "Instagram" | "YouTube";

type Project = {
  id: string;
  name: string;
  brand: string;
  meta: string;
  initials: string;
  logoClass: string;
  banner: string;
  platform: Platform;
  platformLabel: string;
  badge?: { label: string; tone: "paid" | "info" | "neutral" };
  fee: string;
  deliverables: string;
  deadline: string;
  deadlineLabel?: string;
  descriptor: string;
  feeTitle: string;
  feeNote: string;
  match: number;
};

const projects: Project[] = [
  { id: "monsoon-sunscreen", name: "Monsoon Sunscreen", brand: "Minimalist", meta: "worked with you 3×", initials: "MI", logoClass: "bg-[#3b5bff]", banner: "/assets/creator/projects/monsoon-sunscreen.png", platform: "Instagram", platformLabel: "Reels & Stories", badge: { label: "Paid", tone: "paid" }, fee: "₹15–20K", deliverables: "3 posts", deadline: "2 Nov", descriptor: "Influencer · 1 Reel + 2 Stories", feeTitle: "Brand fee ₹15–20K", feeNote: "Above your usual ₹12–18K · always paid on time", match: 96 },
  { id: "matte-lip-launch", name: "Matte Lip Launch", brand: "Velvet Lip Co.", meta: "Mumbai", initials: "VL", logoClass: "bg-[#7c3aed]", banner: "/assets/creator/projects/matte-lip-launch.png", platform: "Instagram", platformLabel: "Reels", badge: { label: "Invited", tone: "info" }, fee: "₹15,000", deliverables: "2 Reels", deadline: "2 Nov", deadlineLabel: "Reply by", descriptor: "Influencer · code + link tracked", feeTitle: "Offer ₹15,000", feeNote: "Velvet invited you on 26 Oct · you get ₹13,230 after platform & service fee", match: 91 },
  { id: "night-repair", name: "Night Repair Range", brand: "Dewdrop Naturals", meta: "Chennai", initials: "DN", logoClass: "bg-[#0d9488]", banner: "/assets/creator/projects/night-repair-range.png", platform: "Instagram", platformLabel: "Reel & Story", badge: { label: "Gift + fee", tone: "neutral" }, fee: "₹6K + kit", deliverables: "2 posts", deadline: "5 Nov", descriptor: "Influencer · night-time routine", feeTitle: "Brand fee ₹6,000 + kit", feeNote: "Below your usual fee · kit worth ₹2,400 included", match: 88 },
  { id: "clean-beauty", name: "Clean Beauty Collective", brand: "Petal & Pine", meta: "Bengaluru", initials: "PP", logoClass: "bg-[#149d46]", banner: "/assets/creator/projects/clean-beauty-ambassadors.png", platform: "Instagram", platformLabel: "Reels & Stories", fee: "₹20K / mo", deliverables: "6 / month", deadline: "10 Nov", descriptor: "6 months", feeTitle: "Brand fee ₹20,000 / month", feeNote: "₹1,20,000 over 6 months · funded into escrow monthly", match: 86 },
  { id: "festive-haircare", name: "Festive Haircare Tutorials", brand: "Strand Studio", meta: "Delhi", initials: "SS", logoClass: "bg-[#db2777]", banner: "/assets/creator/projects/festive-haircare-tutorials.png", platform: "YouTube", platformLabel: "Files only · brand posts", fee: "₹8K / video", deliverables: "3 videos", deadline: "6 Nov", descriptor: "UGC · no posting on your page", feeTitle: "Brand fee ₹8,000 per video", feeNote: "Within your usual fee · usage rights 6 months", match: 84 },
  { id: "rose-lip-oil", name: "Rose Lip Oil", brand: "Petal & Pine", meta: "Bengaluru", initials: "PP", logoClass: "bg-[#149d46]", banner: "/assets/creator/projects/rose-lip-oil.png", platform: "Instagram", platformLabel: "Reel & Story", fee: "₹10–14K", deliverables: "2 posts", deadline: "8 Nov", descriptor: "Influencer · 1 Reel + 1 Story", feeTitle: "Brand fee ₹10–14K", feeNote: "Within your usual fee · brand replies in 3 h", match: 82 },
  { id: "weekend-vlog", name: "Weekend Skincare Vlog", brand: "Dewdrop Naturals", meta: "Chennai", initials: "DN", logoClass: "bg-[#0d9488]", banner: "/assets/creator/projects/weekend-skincare-vlog.png", platform: "YouTube", platformLabel: "Video", fee: "₹25–30K", deliverables: "1 video", deadline: "12 Nov", descriptor: "Influencer · 8–12 min video", feeTitle: "Brand fee ₹25–30K", feeNote: "Above your usual fee · YouTube is 12% of your reach", match: 78 },
  { id: "hydration-bundle", name: "Hydration Bundle", brand: "Minimalist", meta: "gift partnership", initials: "MI", logoClass: "bg-[#3b5bff]", banner: "/assets/creator/projects/hydration-bundle.png", platform: "Instagram", platformLabel: "Reel", badge: { label: "Gift", tone: "neutral" }, fee: "Kit + ₹4K", deliverables: "1 Reel", deadline: "14 Nov", descriptor: "Influencer · hydration routine", feeTitle: "Brand fee ₹4,000 + kit", feeNote: "Product kit worth ₹3,000 · delivery included", match: 76 },
];

const selectedFilters = ["Type: Paid or gift", "Platform: Instagram", "Fee: ₹10K+", "Niche: Beauty, Skincare", "Apply by: next 14 days", "Location: India"];
const availableFilters = ["Long-term", "Language", "Verified brands"];
const paidGiftOptions = ["Any", "Paid", "Gift (product only)", "Gift + fee"];
const sortOptions = ["Best fit", "Newest first", "Fee, high to low", "Apply by, soonest", "Closest to you"];
const nicheOptions = ["Beauty", "Skincare", "Fashion", "Wellness", "Food and drink", "Other"];
type DiscoveryDropdown = "paidGift" | "sort" | "niche" | null;

function MatchRing({ match }: { match: number }) {
  return <motion.div className="grid size-14 shrink-0 place-items-center rounded-full" initial={{ opacity: 0, rotate: -70, scale: 0.78 }} whileInView={{ opacity: 1, rotate: 0, scale: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.66, ease: EASE_OUT }} style={{ background: `conic-gradient(#0d0d10 ${match}%, #e9ecf1 0)` }}><span className="grid size-[46px] place-items-center rounded-full bg-white text-[14px] font-medium leading-[22px] text-ink">{match}%</span></motion.div>;
}

function ProjectBadge({ badge }: { badge: NonNullable<Project["badge"]> }) {
  const style = badge.tone === "paid" ? "bg-primary-muted text-ink" : badge.tone === "info" ? "bg-info-bg text-info" : "bg-neutral-bg text-neutral";
  return <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${style}`}><i className="size-1.5 rounded-full bg-current" />{badge.label}</span>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="min-w-0 rounded-lg bg-subtle px-2.5 py-2"><p className="truncate text-[14px] font-medium leading-[22px] text-ink">{value}</p><p className="mt-0.5 truncate text-[12px] leading-4 text-secondary">{label}</p></div>;
}

function ProjectCard({ project, saved, applied, onSave, onApply, onMessage }: { project: Project; saved: boolean; applied: boolean; onSave: () => void; onApply: () => void; onMessage: () => void }) {
  return <article className="flex h-full min-w-0 flex-col gap-3.5 rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(13,13,16,0.02)]">
    <img src={project.banner} alt="" className="h-[132px] w-full rounded-lg object-cover" />
    <div className="flex min-w-0 items-center gap-3"><span className={`grid size-11 shrink-0 place-items-center rounded-[9px] text-[16px] font-semibold text-white ${project.logoClass}`}>{project.initials}</span><div className="min-w-0 flex-1"><h2 className="truncate text-[14px] font-medium leading-[22px] text-ink">{project.name}</h2><p className="truncate text-[12px] leading-4 text-secondary">{project.brand} · {project.meta}</p></div><MatchRing match={project.match} /></div>
    <div className="flex min-w-0 items-center gap-1.5"><PlatformLogo platform={project.platform} size={16} /><p className="truncate text-[13px] leading-5 text-ink">{project.platform} · {project.platformLabel}</p><span className="flex-1" />{project.badge && <ProjectBadge badge={project.badge} />}</div>
    <div className="grid grid-cols-3 gap-2"><Stat value={project.fee} label="Fee" /><Stat value={project.deliverables} label="Deliverables" /><Stat value={project.deadline} label={project.deadlineLabel ?? "Apply by"} /></div>
    <p className="text-[13px] leading-5 text-secondary">{project.descriptor}</p>
    <div className="rounded-md bg-subtle px-3 py-2.5"><p className="flex items-center gap-1.5 text-[14px] font-medium leading-[22px] text-ink"><CircleDollarSign size={14} className="text-secondary" />{project.feeTitle}</p><p className="mt-1 text-[12px] leading-4 text-secondary">{project.feeNote}</p></div>
    <div className="mt-auto grid grid-cols-2 gap-2"><button type="button" onClick={onMessage} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle"><MessageSquare size={14} />Message brand</button><button type="button" onClick={onSave} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle"><Bookmark size={14} className={saved ? "fill-current" : ""} />{saved ? "Saved" : "Save"}</button><button type="button" onClick={onMessage} className="h-8 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle">Counter offer</button><button type="button" disabled={applied} onClick={onApply} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-ink px-3 text-[13px] font-medium leading-[18px] text-white transition hover:bg-ink/85 disabled:bg-success"><Send size={14} />{applied ? "Applied" : "Apply"}</button></div>
  </article>;
}

function FilterChip({ label, selected, onClick }: { label: string; selected?: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`inline-flex h-7 items-center gap-1.5 rounded-full border px-3 text-[12px] font-medium leading-4 transition ${selected ? "border-ink bg-primary-subtle text-ink" : "border-line bg-white text-ink hover:bg-subtle"}`}>{label}{selected ? <X size={14} /> : <Plus size={14} />}</button>;
}

function DiscoveryFilterDropdown({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="relative z-40">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={onToggle} className="inline-flex h-7 items-center gap-1.5 rounded-full border border-ink bg-primary-subtle px-3 text-[12px] font-medium leading-4 text-ink transition hover:bg-primary-muted">
        {label}
        <ChevronDown size={14} className={open ? "rotate-180 transition" : "transition"} />
      </button>
      {open && <div className="absolute left-0 top-9 z-[100] w-[216px] rounded-md border border-line bg-white p-1.5 shadow-[0_12px_28px_rgba(13,13,16,0.14)]">{children}</div>}
    </div>
  );
}

function DropdownOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" role="option" aria-selected={selected} onClick={onClick} className={selected ? "flex min-h-8 w-full items-center gap-2 rounded bg-primary-subtle px-2 py-1.5 text-left text-[13px] leading-5 text-ink transition" : "flex min-h-8 w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[13px] leading-5 text-ink transition hover:bg-subtle"}>
      <span className="flex-1">{label}</span>
      {selected && <Check size={15} className="text-ink" />}
    </button>
  );
}

function MatchSettings() {
  const metrics = [["Niche match", 95], ["Audience match", 88], ["Fee in your range", 80], ["Platform match", 100], ["Brand rating", 90]] as const;
  return <section className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold leading-6 text-ink">Why projects match you</h2><p className="mt-0.5 text-[12px] leading-4 text-secondary">How your match is worked out</p><div className="mt-4 space-y-3.5">{metrics.map(([label, value]) => <div key={label}><div className="flex items-center justify-between gap-3 text-[13px] leading-5 text-ink"><span>{label}</span><span className="text-[14px] font-medium leading-[22px]">{value}%</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-ink" initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: DURATION.slow, ease: EASE_OUT }} /></div></div>)}</div></section>;
}

function SavedProjects() {
  const items = [["MI", "bg-[#3b5bff]", "Monsoon Sunscreen", "Minimalist · apply by 2 Nov"], ["MI", "bg-[#3b5bff]", "Hydration Bundle", "Minimalist · gift · apply by 3 Nov"], ["PP", "bg-[#149d46]", "Clean Beauty Collective", "Petal & Pine · apply by 10 Nov"]] as const;
  return <section className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold leading-6 text-ink">Saved projects</h2><p className="mt-0.5 text-[12px] leading-4 text-secondary">6 saved · 2 close this week</p><div className="mt-4 space-y-3">{items.map(([initials, color, title, detail]) => <button type="button" key={title} className="flex w-full items-center gap-2.5 text-left"><span className={`grid size-8 shrink-0 place-items-center rounded-md text-[12px] font-semibold text-white ${color}`}>{initials}</span><span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-medium leading-[22px] text-ink">{title}</span><span className="block truncate text-[12px] leading-4 text-secondary">{detail}</span></span><ChevronRight size={14} className="shrink-0 text-secondary" /></button>)}</div><button type="button" className="mt-4 h-10 w-full rounded-md bg-ink px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-ink/85">View all saved</button></section>;
}

function RecentSearches() {
  const searches = ["Skincare Reels ₹10K+", "Gift projects · beauty", "Long-term · 6 months", "Festive skincare campaigns"];
  return <section className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold leading-6 text-ink">Recent searches</h2><div className="mt-4 space-y-2">{searches.map((search) => <button type="button" key={search} className="flex w-full items-center gap-2 rounded-md bg-subtle px-2.5 py-2 text-left text-[13px] leading-5 text-ink transition hover:bg-muted"><Search size={14} className="text-secondary" />{search}</button>)}</div></section>;
}

export function CreatorProjectDiscoveryContent() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(selectedFilters);
  const [openDropdown, setOpenDropdown] = useState<DiscoveryDropdown>(null);
  const [paidGift, setPaidGift] = useState("Any");
  const [sort, setSort] = useState("Best fit");
  const [niches, setNiches] = useState<string[]>(["Beauty", "Skincare"]);
  const [saved, setSaved] = useState<string[]>(["matte-lip-launch"]);
  const [applied, setApplied] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [matchMenuOpen, setMatchMenuOpen] = useState(false);
  const [matchAccount, setMatchAccount] = useState("Instagram · @ishitarao");
  const visibleProjects = useMemo(() => {
    const matching = projects.filter((project) => `${project.name} ${project.brand} ${project.descriptor}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "Newest first") return [...matching].reverse();
    if (sort === "Fee, high to low") return [...matching].sort((a, b) => b.match - a.match);
    if (sort === "Apply by, soonest") return [...matching].sort((a, b) => Number.parseInt(a.deadline, 10) - Number.parseInt(b.deadline, 10));
    return matching;
  }, [query, sort]);
  const toggleFilter = (label: string) => setFilters((current) => current.includes(label) ? current.filter((value) => value !== label) : [...current, label]);
  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const toggleNiche = (niche: string) => setNiches((current) => current.includes(niche) ? current.filter((value) => value !== niche) : [...current, niche]);
  const apply = (project: Project) => { if (!applied.includes(project.id)) { setApplied((current) => [...current, project.id]); setNotice(`Application sent to ${project.brand} for ${project.name}.`); } };
  return <div className="mx-auto w-full max-w-[1440px] pb-10">
    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-[26px] font-bold leading-[34px] tracking-[-.13px] text-ink">Project discovery</h1><p className="mt-1 text-[13px] leading-5 text-secondary">214 open projects · match is based on your profile</p></div><button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-[14px] font-medium leading-5 text-ink transition hover:bg-subtle"><Bookmark size={16} />Saved projects (6)</button></section>
    <section className="mt-6 flex flex-col gap-2 sm:flex-row"><label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-white px-3 focus-within:border-ink"><Search size={16} className="shrink-0 text-secondary" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search brands, products or niches…" className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-ink outline-none placeholder:text-secondary" /></label><div className="relative sm:w-80"><button type="button" onClick={() => setMatchMenuOpen((open) => !open)} className="flex h-10 w-full items-center gap-2 rounded-md border border-line bg-white px-3 text-left text-[13px] leading-5 text-ink transition hover:bg-subtle"><span className="flex-1 truncate">Match for: {matchAccount}</span><ChevronDown size={16} className="text-secondary" /></button>{matchMenuOpen && <div className="absolute right-0 z-30 mt-1 w-full overflow-hidden rounded-md border border-line bg-white p-1 shadow-lg"><button type="button" onClick={() => { setMatchAccount("Instagram · @ishitarao"); setMatchMenuOpen(false); }} className="flex w-full rounded px-2 py-2 text-left text-[13px] hover:bg-subtle">Instagram · @ishitarao</button><button type="button" onClick={() => { setMatchAccount("YouTube · @ishitarao"); setMatchMenuOpen(false); }} className="flex w-full rounded px-2 py-2 text-left text-[13px] hover:bg-subtle">YouTube · @ishitarao</button></div>}</div></section>
    <div className="mt-4 flex flex-wrap gap-2">
      <DiscoveryFilterDropdown label={`Type: ${paidGift === "Any" ? "Paid or gift" : paidGift}`} open={openDropdown === "paidGift"} onToggle={() => setOpenDropdown((current) => current === "paidGift" ? null : "paidGift")}>
        {paidGiftOptions.map((option) => <DropdownOption key={option} label={option} selected={paidGift === option} onClick={() => { setPaidGift(option); setOpenDropdown(null); }} />)}
      </DiscoveryFilterDropdown>
      <FilterChip label="Platform: Instagram" selected={filters.includes("Platform: Instagram")} onClick={() => toggleFilter("Platform: Instagram")} />
      <FilterChip label="Fee: ₹10K+" selected={filters.includes("Fee: ₹10K+")} onClick={() => toggleFilter("Fee: ₹10K+")} />
      <DiscoveryFilterDropdown label={`Niche: ${niches.length ? niches.join(", ") : "Any"}`} open={openDropdown === "niche"} onToggle={() => setOpenDropdown((current) => current === "niche" ? null : "niche")}>
        {nicheOptions.map((option) => <DropdownOption key={option} label={option} selected={niches.includes(option)} onClick={() => toggleNiche(option)} />)}
      </DiscoveryFilterDropdown>
      <FilterChip label="Apply by: next 14 days" selected={filters.includes("Apply by: next 14 days")} onClick={() => toggleFilter("Apply by: next 14 days")} />
      <FilterChip label="Location: India" selected={filters.includes("Location: India")} onClick={() => toggleFilter("Location: India")} />
      {availableFilters.map((filter) => <FilterChip key={filter} label={filter} selected={filters.includes(filter)} onClick={() => toggleFilter(filter)} />)}
    </div>
    {notice && <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 rounded-md border border-success/25 bg-success-bg px-3 py-2 text-[13px] leading-5 text-success"><Check size={15} />{notice}</motion.div>}
    <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start"><div><div className="mb-4 flex items-center gap-2"><h2 className="text-[16px] font-semibold leading-6 text-ink">214 projects match</h2><span className="flex-1" /><DiscoveryFilterDropdown label={`Sort: ${sort === "Best fit" ? "Best match" : sort}`} open={openDropdown === "sort"} onToggle={() => setOpenDropdown((current) => current === "sort" ? null : "sort")}>{sortOptions.map((option) => <DropdownOption key={option} label={option} selected={sort === option} onClick={() => { setSort(option); setOpenDropdown(null); }} />)}</DiscoveryFilterDropdown></div>{visibleProjects.length ? <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.055}>{visibleProjects.map((project) => <RevealItem key={project.id}><ProjectCard project={project} saved={saved.includes(project.id)} applied={applied.includes(project.id)} onSave={() => toggleSaved(project.id)} onApply={() => apply(project)} onMessage={() => setNotice(`Message composer opened for ${project.brand}.`)} /></RevealItem>)}</RevealGroup> : <div className="rounded-xl border border-line bg-white px-6 py-16 text-center"><Search className="mx-auto text-secondary" size={28} /><h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">No projects match your search</h2><p className="mt-1 text-[13px] leading-5 text-secondary">Try a brand, product, or niche instead.</p></div>}<div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] leading-4 text-secondary"><span>Showing 1–8 of 214</span><span className="flex-1" /><button type="button" className="grid size-7 place-items-center rounded-md hover:bg-subtle"><ChevronLeft size={16} /></button><button type="button" className="grid size-7 place-items-center rounded-md bg-ink font-medium text-white">1</button><button type="button" className="grid size-7 place-items-center rounded-md hover:bg-subtle">2</button><button type="button" className="grid size-7 place-items-center rounded-md hover:bg-subtle">3</button><span className="grid size-7 place-items-center">…</span><button type="button" className="grid size-7 place-items-center rounded-md hover:bg-subtle">6</button><button type="button" className="grid size-7 place-items-center rounded-md hover:bg-subtle"><ChevronRight size={16} /></button><span className="ml-2">Rows</span><button type="button" className="inline-flex h-7 items-center gap-1 rounded-md border border-line px-2 font-medium text-ink">8<ChevronDown size={12} /></button></div></div><aside className="space-y-4 xl:sticky xl:top-6"><MatchSettings /><SavedProjects /><RecentSearches /></aside></div>
  </div>;
}
