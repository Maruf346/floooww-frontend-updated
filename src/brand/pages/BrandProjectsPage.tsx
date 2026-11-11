import { useMemo, useState } from "react";
import { ChevronDown, CircleDollarSign, Eye, FileCheck2, Gift, MoreHorizontal, Plus, Search, UserCheck } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import { ROUTES } from "@/common/constants/routes";
import { asset } from "@/common/utils/asset";

type Status = "Live" | "Upcoming" | "Completed" | "Drafts" | "Paused" | "Archived" | "Deleted";
type Project = {
  id: number; name: string; type: string; platform: string; status: Status;
  apps: number; approved: number; budget: string; budgetNote: string;
  progress: number; updated: string; image?: string; accent: string;
  cycle?: string; showPace?: boolean; rowHeight: number;
};

const projects: Project[] = [
  { id: 1, name: "Vitamin-C Serum", type: "Influencer · Paid · One-time", platform: "Instagram · YouTube", status: "Live", apps: 28, approved: 16, budget: "₹2,00,000", budgetNote: "29% in escrow", progress: 69, updated: "2 h ago", image: asset("dashboard/project-vitamin-c.png"), accent: "bg-amber-100", rowHeight: 73 },
  { id: 2, name: "Lip Tint Drop", type: "UGC · Paid · One-time", platform: "Instagram", status: "Live", apps: 10, approved: 6, budget: "₹80,000", budgetNote: "19% in escrow", progress: 108, updated: "Yesterday", image: asset("dashboard/project-lip-tint.png"), accent: "bg-rose-100", showPace: true, rowHeight: 73 },
  { id: 3, name: "Glow Squad", type: "Influencer · Paid · Long-term", platform: "Instagram · YouTube", status: "Live", apps: 14, approved: 6, budget: "₹75,000 / month", budgetNote: "₹4,50,000 total", progress: 95, updated: "3 d ago", image: asset("dashboard/project-glow-squad.png"), accent: "bg-violet-100", cycle: "M3/6", rowHeight: 93 },
  { id: 4, name: "Monsoon Sunscreen", type: "Influencer · Paid · One-time", platform: "Instagram · YouTube", status: "Live", apps: 19, approved: 12, budget: "₹1,50,000", budgetNote: "16% in escrow", progress: 85, updated: "1 d ago", image: asset("dashboard/project-monsoon-sunscreen.png"), accent: "bg-sky-100", rowHeight: 73 },
  { id: 5, name: "Hydration Bundle", type: "Influencer · Gift exchange · One-time", platform: "Instagram", status: "Live", apps: 8, approved: 8, budget: "₹52,000", budgetNote: "product, no fee", progress: 69, updated: "4 d ago", image: asset("dashboard/project-hydration-bundle.png"), accent: "bg-emerald-100", showPace: true, rowHeight: 86 },
  { id: 6, name: "Skin Quiz Leads", type: "UGC · Paid · One-time", platform: "Instagram · YouTube", status: "Upcoming", apps: 7, approved: 3, budget: "₹1,20,000", budgetNote: "₹63,540 to fund", progress: 0, updated: "5 d ago", image: asset("dashboard/project-skin-quiz.png"), accent: "bg-teal-100", rowHeight: 73 },
  { id: 7, name: "Holi Colour Care", type: "Influencer · Paid · One-time", platform: "Instagram", status: "Drafts", apps: 0, approved: 0, budget: "₹1,60,000", budgetNote: "not funded", progress: 0, updated: "Today", accent: "bg-orange-100", rowHeight: 73 },
  { id: 8, name: "Winter Lip Care", type: "Influencer · Gift exchange · One-time", platform: "Instagram", status: "Drafts", apps: 0, approved: 0, budget: "Gift", budgetNote: "not funded", progress: 0, updated: "2 w ago", accent: "bg-pink-100", rowHeight: 86 },
];

const tabs: Array<Status | "All"> = ["All", "Live", "Upcoming", "Completed", "Drafts", "Paused", "Archived", "Deleted"];
const tabCounts: Record<(typeof tabs)[number], number> = { All: 11, Live: 5, Upcoming: 1, Completed: 3, Drafts: 2, Paused: 0, Archived: 2, Deleted: 1 };
const kpis = [
  { icon: CircleDollarSign, label: "Active projects", value: "5", detail: "1 starting 4 Nov" },
  { icon: UserCheck, label: "Creators accepted", value: "38", detail: "Across 6 projects" },
  { icon: FileCheck2, label: "Deliverables due this week", value: "14", detail: "3 overdue" },
  { icon: Gift, label: "Shipments in transit", value: "4", detail: "2 delivered this week" },
];

function FilterSelect({ label, value, values, width, onChange }: { label: string; value: string; values: string[]; width: number; onChange: (value: string) => void }) {
  return <label className="relative mt-[5px] block h-[30px] shrink-0" style={{ width }}>
    <span className="pointer-events-none absolute inset-0 flex items-center justify-between rounded-full border border-line bg-white pl-3 pr-2 text-[13px] leading-5 text-body">
      {value === "All" ? label : value}<ChevronDown size={14} className="text-secondary" />
    </span>
    <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className="absolute inset-0 cursor-pointer opacity-0">
      <option value="All">{label}</option>{values.map((item) => <option key={item}>{item}</option>)}
    </select>
  </label>;
}

function PlatformLogos({ platform }: { platform: string }) {
  return <div className="flex items-center gap-1.5">
    {platform.includes("Instagram") && <img src="/assets/platform-instagram.svg" alt="Instagram" className="size-5" />}
    {platform.includes("YouTube") && <img src="/assets/platform-youtube.svg" alt="YouTube" className="size-5" />}
  </div>;
}

export function BrandProjectsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const requestedStatus = params.get("status");
  const [active, setActive] = useState<Status | "All">(requestedStatus && tabs.includes(requestedStatus as Status) ? requestedStatus as Status : "All");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [partnership, setPartnership] = useState("All");
  const [duration, setDuration] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => projects.filter((project) =>
    (active === "All" || project.status === active) &&
    (type === "All" || project.type.startsWith(type)) &&
    (partnership === "All" || project.type.includes(partnership)) &&
    (duration === "All" || project.type.includes(duration)) &&
    (platform === "All" || project.platform.includes(platform)) &&
    `${project.name} ${project.type}`.toLowerCase().includes(search.toLowerCase())
  ), [active, duration, partnership, platform, search, type]);

  const allSelected = filtered.length > 0 && filtered.every((project) => selected.includes(project.id));
  const toggle = (id: number) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  const clearFilters = () => { setType("All"); setPartnership("All"); setDuration("All"); setPlatform("All"); };

  return <BrandShell><div className="-mt-1 mx-auto w-full max-w-[1440px]">
    <header className="flex h-[58px] items-end justify-between gap-4">
      <div><h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.5px] text-ink">All projects</h1><p className="mt-1 text-[13px] leading-5 text-secondary">Minimalist · 11 projects · plus 2 archived</p></div>
      <div className="flex h-10 items-center gap-[10px]"><DateRangePicker value="1 Oct - 28 Oct 2026" /><Button className="w-[184px]" onClick={() => navigate(ROUTES.brandNewProject)} leadingIcon={<Plus size={16} />}>Create new project</Button></div>
    </header>

    <nav className="mt-6 flex h-[37px] gap-6 overflow-x-auto border-b border-line" aria-label="Project status">
      {tabs.map((tab) => <button key={tab} type="button" onClick={() => { setActive(tab); setPage(1); }} className={`flex h-9 shrink-0 items-start gap-1.5 border-b-2 text-[14px] leading-[22px] ${active === tab ? "border-primary font-medium text-primary" : "border-transparent text-secondary hover:text-ink"}`}>
        {tab}<span className={`mt-0.5 min-w-[20px] rounded-full px-[7px] text-center text-[12px] leading-[18px] ${active === tab ? "bg-primary-subtle text-primary" : "bg-muted text-secondary"}`}>{tabCounts[tab]}</span>
      </button>)}
    </nav>

    <section className="mt-6 grid h-[196px] grid-cols-4 gap-3 rounded-xl border border-line bg-white p-5" aria-label="Project metrics">
      {kpis.map(({ icon: Icon, label, value, detail }) => <article key={label} className="flex h-[154px] min-w-0 flex-col rounded-xl border border-line-subtle bg-white p-4">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary-subtle text-primary"><Icon size={18} /></span>
        <p className="mt-3 truncate text-[12px] leading-4 text-secondary">{label}</p><p className="mt-1 text-[22px] font-semibold leading-7 text-ink">{value}</p><p className="mt-auto text-[12px] leading-4 text-tertiary">{detail}</p>
      </article>)}
    </section>

    <div className="mt-6 flex h-10 items-start gap-2">
      <label className="flex h-10 w-[280px] shrink-0 items-center gap-2 rounded-md border border-line bg-white px-3"><Search size={16} className="text-tertiary" /><input className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-ink outline-none placeholder:text-tertiary" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects" /></label>
      <FilterSelect label="Type" value={type} values={["Influencer", "UGC"]} width={75} onChange={setType} />
      <FilterSelect label="Partnership" value={partnership} values={["Paid", "Gift exchange"]} width={113} onChange={setPartnership} />
      <FilterSelect label="Duration" value={duration} values={["One-time", "Long-term"]} width={96} onChange={setDuration} />
      <FilterSelect label="Platform" value={platform} values={["Instagram", "YouTube"]} width={95} onChange={setPlatform} />
      <button type="button" onClick={clearFilters} className="mt-[5px] h-[30px] w-[88px] shrink-0 rounded-full border border-line bg-white text-[13px] leading-5 text-body">Clear all</button>
    </div>

    {selected.length > 0 && <div className="absolute z-10 mt-2 flex items-center gap-3 rounded-md bg-primary-subtle px-3 py-2 text-[13px] text-primary"><span>{selected.length} selected</span><button type="button" onClick={() => setSelected([])} className="font-medium">Clear selection</button></div>}

    <section className="mt-6 h-[674px] overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full min-w-[1114px] table-fixed border-collapse text-left">
        <colgroup><col className="w-[51px]" /><col className="w-[234px]" /><col className="w-[88px]" /><col className="w-[108px]" /><col className="w-[56px]" /><col className="w-[86px]" /><col className="w-[142px]" /><col className="w-[148px]" /><col className="w-[84px]" /><col className="w-[116px]" /></colgroup>
        <thead className="bg-subtle text-[11px] font-semibold leading-4 tracking-[0.06em] text-secondary"><tr className="h-[42px]">
          <th className="pl-5"><input aria-label="Select all visible projects" checked={allSelected} onChange={() => setSelected(allSelected ? [] : filtered.map((project) => project.id))} type="checkbox" className="size-[18px] rounded border-line" /></th>
          {["PROJECT", "PLATFORM", "STATUS", "APPS", "APPROVED", "BUDGET", "PROGRESS", "UPDATED", "ACTIONS"].map((heading) => <th className="pr-2" key={heading}>{heading}</th>)}
        </tr></thead>
        <tbody>{filtered.map((project) => <tr style={{ height: project.rowHeight }} className="border-t border-line-subtle text-[13px] leading-5 hover:bg-subtle/60" key={project.id}>
          <td className="pl-5"><input aria-label={`Select ${project.name}`} checked={selected.includes(project.id)} onChange={() => toggle(project.id)} type="checkbox" className="size-[18px] rounded border-line" /></td>
          <td className="pr-3"><div className="flex items-center gap-3">{project.image ? <img src={project.image} alt="" className="size-11 shrink-0 rounded-lg object-cover" /> : <span className={`size-11 shrink-0 rounded-lg ${project.accent}`} />}<div className="min-w-0"><p className="truncate text-[14px] font-medium leading-[22px] text-ink">{project.name}</p><p className="text-[12px] leading-4 text-secondary">{project.type}</p>{project.cycle && <span className="mt-[3px] inline-flex h-5 items-center rounded-full bg-muted px-2 text-[12px] leading-4 text-secondary">{project.cycle}</span>}</div></div></td>
          <td><PlatformLogos platform={project.platform} /></td>
          <td><span className={`inline-flex h-5 items-center rounded-full px-2 text-[12px] font-medium leading-4 ${project.status === "Live" ? "bg-success-bg text-success" : project.status === "Drafts" ? "bg-muted text-secondary" : "bg-primary-subtle text-primary"}`}>{project.status}</span></td>
          <td className="text-ink">{project.apps}</td><td className="text-ink">{project.approved}</td>
          <td><p className="font-medium text-ink">{project.budget}</p><p className="text-[12px] leading-4 text-secondary">{project.budgetNote}</p></td>
          <td><div className="flex items-center gap-2"><span className="h-1.5 w-[72px] overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-primary" style={{ width: `${Math.min(project.progress, 100)}%` }} /></span><span className="text-[13px] text-ink">{project.progress}%</span></div>{project.showPace && <p className="mt-1 text-[12px] leading-4 text-success">Pace</p>}</td>
          <td className="text-[12px] leading-4 text-secondary">{project.updated}</td>
          <td><div className="flex items-center gap-[10px]"><button onClick={() => navigate(ROUTES.brandProjectPublished)} type="button" className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[12px] font-medium text-ink"><Eye size={14} />View</button><button type="button" aria-label={`More actions for ${project.name}`} className="text-secondary hover:text-ink"><MoreHorizontal size={18} /></button></div></td>
        </tr>)}</tbody>
      </table>
      {filtered.length === 0 && <p className="-mt-[632px] px-5 py-12 text-center text-[14px] text-secondary">No projects match these filters.</p>}
    </section>

    <footer className="mt-6 flex h-7 w-[720px] items-center justify-between text-[13px] leading-5 text-secondary">
      <span>{page === 1 ? "Showing 1–8 of 11 projects" : "Showing 9–11 of 11 projects"}</span><div className="flex h-7 items-center gap-2"><Button kind="secondary" size="s" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>Previous</Button><button type="button" onClick={() => setPage(1)} className={`size-7 rounded-md text-[12px] font-medium ${page === 1 ? "bg-primary text-white" : "text-secondary hover:bg-muted"}`}>1</button><button type="button" onClick={() => setPage(2)} className={`size-7 rounded-md text-[12px] font-medium ${page === 2 ? "bg-primary text-white" : "text-secondary hover:bg-muted"}`}>2</button><Button kind="secondary" size="s" disabled={page === 2} onClick={() => setPage((value) => Math.min(2, value + 1))}>Next</Button></div>
    </footer>
  </div></BrandShell>;
}
