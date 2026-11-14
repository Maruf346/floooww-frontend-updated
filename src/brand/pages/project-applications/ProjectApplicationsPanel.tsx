import { useMemo, useState } from "react";
import { Check, ChevronDown, ExternalLink, MessageCircle, Search, Share2, X } from "lucide-react";
import { motion } from "motion/react";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { Button } from "@/common/components/ui/Button";
import { Dropdown } from "@/common/components/ui/Dropdown";
import type { Platform } from "@/common/types";
import { ApplicantProfileDrawer } from "./ApplicantProfileDrawer";

type ApplicationStatus = "New" | "Shortlisted" | "Reviewed" | "Declined";
type Applicant = {
  id: string;
  name: string;
  handle: string;
  city: string;
  avatar: string;
  match: number;
  platforms: Array<[Platform, string]>;
  engagement: number;
  views: string;
  audience: string;
  note: string;
  fee: string;
  feeNote: string;
  counter: boolean;
  followers: number;
  status: ApplicationStatus;
};

const applicants: Applicant[] = [
  { id: "diya", name: "Diya Kapoor", handle: "@diyaglows", city: "Mumbai", avatar: "meera-iyer", match: 94, platforms: [["Instagram", "1.2 L"], ["YouTube", "18K"], ["Snapchat", "6.2K"], ["Pinterest", "9.4K"]], engagement: 5.8, views: "64K", audience: "81%", note: "Did a Diwali skincare series last year, 3 Reels, 2.1 L views. Can post by 4 Nov.", fee: "Counter offer ₹15,000", feeNote: "₹2,500 above your ₹12,500 fee", counter: true, followers: 120000, status: "New" },
  { id: "shruti", name: "Shruti Nair", handle: "@shrutiskin", city: "Kochi", avatar: "ishita-rao", match: 93, platforms: [["Instagram", "86K"], ["YouTube", "12K"]], engagement: 6.4, views: "41K", audience: "79%", note: "Dry-skin routines are my niche. Happy to add code GLOW15 to my bio link.", fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, followers: 98000, status: "New" },
  { id: "aditi", name: "Aditi Joshi", handle: "@aditiglow", city: "Pune", avatar: "kavya-reddy", match: 92, platforms: [["Instagram", "64K"], ["Pinterest", "15K"]], engagement: 7.1, views: "33K", audience: "83%", note: "Already use the Glow serum. Can film a 7-day before/after Reel.", fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, followers: 79000, status: "Shortlisted" },
  { id: "prachi", name: "Prachi Das", handle: "@prachidas", city: "Kolkata", avatar: "tara-bose", match: 91, platforms: [["YouTube", "2.1 L"], ["Instagram", "40K"]], engagement: 4.9, views: "88K", audience: "72%", note: "Festive GRWM video planned for 2 Nov, can feature the Vitamin C Glow Serum.", fee: "Counter offer ₹22,000", feeNote: "₹9,500 above your ₹12,500 fee · A YouTube video takes 3 days to shoot and edit", counter: true, followers: 250000, status: "New" },
  { id: "kritika", name: "Kritika Sharma", handle: "@kritikaskincare", city: "Delhi", avatar: "meera-iyer", match: 89, platforms: [["Instagram", "1.6 L"], ["YouTube", "30K"], ["Snapchat", "18K"]], engagement: 4.6, views: "72K", audience: "76%", note: "Ingredient-first reviews. Audience is mostly 22–30 in Delhi NCR.", fee: "Counter offer ₹18,000", feeNote: "₹5,500 above your ₹12,500 fee · Adds an ingredient breakdown carousel", counter: true, followers: 208000, status: "Reviewed" },
  { id: "neha", name: "Neha Gupta", handle: "@nehagupta.reviews", city: "Bengaluru", avatar: "ishita-rao", match: 87, platforms: [["Instagram", "92K"], ["YouTube", "9K"]], engagement: 5.9, views: "47K", audience: "74%", note: "Focused on practical routines and honest skincare reviews for young professionals.", fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, followers: 101000, status: "Declined" },
  { id: "ritu", name: "Ritu Chawla", handle: "@rituchawla", city: "Delhi", avatar: "kavya-reddy", match: 86, platforms: [["Instagram", "1.1 L"], ["Pinterest", "9K"]], engagement: 6.9, views: "24K", audience: "80%", note: "Small but loyal audience, my last skincare Reel drove 140 code orders.", fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, followers: 119000, status: "Shortlisted" },
  { id: "lavanya", name: "Lavanya Iyer", handle: "@lavanyaiyer", city: "Chennai", avatar: "tara-bose", match: 85, platforms: [["Instagram", "78K"], ["Pinterest", "31K"]], engagement: 5.5, views: "35K", audience: "77%", note: "Tamil and English captions. Big reach in Chennai and Coimbatore.", fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, followers: 109000, status: "New" },
  { id: "zoya", name: "Zoya Ahmed", handle: "@zoyaahmed", city: "Hyderabad", avatar: "meera-iyer", match: 82, platforms: [["Instagram", "2.4 L"], ["YouTube", "1.1 L"]], engagement: 3.8, views: "96K", audience: "69%", note: "Bridal and festive looks. Can add a Story link sticker for 24 hours.", fee: "Counter offer ₹28,000", feeNote: "₹15,500 above your ₹12,500 fee · Includes a 24-hour Story link sticker", counter: true, followers: 350000, status: "Reviewed" },
  { id: "arjun", name: "Arjun Pillai", handle: "@arjunpillai", city: "Bengaluru", avatar: "ishita-rao", match: 79, platforms: [["Instagram", "61K"]], engagement: 4.4, views: "28K", audience: "58%", note: "Men’s grooming: Vitamin C Glow Serum as a gift idea for Diwali.", fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, followers: 61000, status: "New" },
  { id: "mehak", name: "Mehak Sethi", handle: "@mehaksethi", city: "Chandigarh", avatar: "kavya-reddy", match: 68, platforms: [["Instagram", "3.1 L"], ["YouTube", "85K"], ["Snapchat", "40K"]], engagement: 2.4, views: "1.1 L", audience: "52%", note: "Lifestyle and travel. 41% of my audience is outside India.", fee: "Counter offer ₹40,000", feeNote: "₹27,500 above your ₹12,500 fee · My standard rate for a Reel", counter: true, followers: 535000, status: "Shortlisted" },
  { id: "simran", name: "Simran Kaur", handle: "@simrankaur", city: "Amritsar", avatar: "tara-bose", match: 64, platforms: [["Instagram", "38K"]], engagement: 3.1, views: "12K", audience: "61%", note: "New to skincare content, mostly fashion so far.", fee: "Accepts your fee · ₹12,500", feeNote: "Same as your ₹12,500 fee · no extra ask", counter: false, followers: 38000, status: "Declined" },
];

function ApplicantCard({ applicant, status, onStatus }: { applicant: Applicant; status: ApplicationStatus; onStatus: (status: ApplicationStatus) => void }) {
  const profileUrl = `https://www.instagram.com/${applicant.handle.slice(1)}`;
  const decisionButtons = applicant.counter
    ? [["Accept offer", "Reviewed"], ["Counter", "Shortlisted"], ["Decline", "Declined"]] as const
    : [[status === "Shortlisted" ? "Move to review" : "Shortlist", status === "Shortlisted" ? "Reviewed" : "Shortlisted"], ["Decline", "Declined"]] as const;
  return <article className="relative h-[461px] overflow-hidden rounded-xl border border-line bg-white">
    <div className="absolute left-5 right-5 top-5 flex h-14 items-center gap-3"><img src={`/assets/creators/${applicant.avatar}.png`} alt="" className="size-11 rounded-full object-cover" /><div className="min-w-0 flex-1"><h2 className="truncate text-[14px] font-semibold leading-[22px] text-ink">{applicant.name}</h2><p className="truncate text-[12px] leading-4 text-secondary">{applicant.handle} · {applicant.city}</p></div><motion.div className="grid size-14 place-items-center rounded-full" style={{ background: `conic-gradient(#2563eb ${applicant.match}%, #e5e7eb 0)` }} initial={{ opacity: 0, scale: .72, rotate: -45 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}><span className="grid size-[46px] place-items-center rounded-full bg-white text-[14px] font-semibold leading-5 text-ink">{applicant.match}%</span></motion.div></div>
    <div className="absolute left-5 right-5 top-[91px] flex h-5 items-center gap-1.5"><div className="flex min-w-0 gap-2">{applicant.platforms.map(([platform, followers]) => <span className="flex items-center gap-1 text-[12px] leading-5 text-ink" key={platform}><PlatformLogo platform={platform} size={16} /><span>{followers}</span></span>)}</div><span className="h-px min-w-2 flex-1 bg-line" /><span className="inline-flex h-5 items-center gap-1 rounded-full bg-success-bg px-2 text-[11px] font-medium text-success"><Check size={11} strokeWidth={3} />Verified</span></div>
    <p className="absolute left-5 top-[125px] text-[10px] leading-[13px] text-tertiary">Creator stats · last 30 days</p>
    <div className="absolute left-5 right-5 top-[152px] grid h-14 grid-cols-3 divide-x divide-line rounded-lg bg-subtle"><div className="px-2.5 pt-2"><p className="text-[14px] font-semibold leading-[22px] text-ink">{applicant.engagement}%</p><p className="text-[11px] leading-4 text-secondary">Eng. rate</p></div><div className="px-2.5 pt-2"><p className="text-[14px] font-semibold leading-[22px] text-ink">{applicant.views}</p><p className="text-[11px] leading-4 text-secondary">Avg. views</p></div><div className="px-2.5 pt-2"><p className="text-[14px] font-semibold leading-[22px] text-ink">{applicant.audience}</p><p className="text-[11px] leading-4 text-secondary">Women 18–34</p></div></div>
    <p className="absolute left-5 right-5 top-[222px] h-10 overflow-hidden text-[12px] leading-5 text-secondary">“{applicant.note}”</p>
    <div className={`absolute left-5 right-5 top-[276px] h-[78px] rounded-lg px-3 py-2.5 ${applicant.counter ? "bg-[#fff7e8]" : "bg-subtle"}`}><p className={`flex items-center gap-1.5 text-[13px] font-medium leading-[22px] ${applicant.counter ? "text-[#a65d00]" : "text-ink"}`}>{applicant.counter ? <span className="size-2 rounded-full bg-[#f29b07]" /> : <Check size={16} className="text-success" strokeWidth={2.5} />}{applicant.fee}</p><p className="mt-1 text-[11px] leading-4 text-secondary">{applicant.feeNote}</p></div>
    <div className="absolute left-5 right-5 top-[368px] space-y-2"><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => window.open(profileUrl, "_blank", "noopener,noreferrer")} className="flex h-8 items-center justify-center gap-1.5 rounded-md border border-line text-[12px] font-medium text-ink transition hover:bg-subtle"><ExternalLink size={14} />View profile</button><a href={`mailto:?subject=${encodeURIComponent(`Vitamin-C Serum collaboration — ${applicant.name}`)}`} className="flex h-8 items-center justify-center gap-1.5 rounded-md border border-line text-[12px] font-medium text-ink transition hover:bg-subtle"><MessageCircle size={14} />Message</a></div><div className={`grid gap-2 ${decisionButtons.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>{decisionButtons.map(([label, next]) => <button type="button" onClick={() => onStatus(next)} key={label} className={`h-8 rounded-md text-[12px] font-medium transition ${label === "Decline" ? "border border-line text-secondary hover:bg-[#fde4e3] hover:text-[#db231f]" : label === "Accept offer" ? "bg-success text-white hover:bg-[#10843c]" : "bg-primary text-white hover:bg-[#1d4ed8]"}`}>{label}</button>)}</div></div>
  </article>;
}

export function ProjectApplicationsPanel({ projectName, hasApplications, onOpenShare }: { projectName: string; hasApplications: boolean; onOpenShare: () => void }) {
  const [status, setStatus] = useState("All");
  const [platform, setPlatform] = useState("Platform");
  const [followers, setFollowers] = useState("Followers");
  const [engagement, setEngagement] = useState("Eng. rate");
  const [fee, setFee] = useState("Fee");
  const [city, setCity] = useState("City");
  const [sort, setSort] = useState("Match");
  const [statuses, setStatuses] = useState<Record<string, ApplicationStatus>>(() => Object.fromEntries(applicants.map((applicant) => [applicant.id, applicant.status])));
  const counts = useMemo(() => Object.values(statuses).reduce<Record<string, number>>((summary, item) => ({ ...summary, [item]: (summary[item] ?? 0) + 1 }), { All: applicants.length }), [statuses]);
  const visible = useMemo(() => applicants.filter((applicant) => {
    const current = statuses[applicant.id];
    if (status !== "All" && current !== status) return false;
    if (platform !== "Platform" && !applicant.platforms.some(([item]) => item === platform)) return false;
    if (city !== "City" && applicant.city !== city) return false;
    if (engagement !== "Eng. rate" && applicant.engagement < Number(engagement.replace("%+", ""))) return false;
    if (followers === "Under 10K" && applicant.followers >= 10000) return false;
    if (followers === "10K–50K" && (applicant.followers < 10000 || applicant.followers > 50000)) return false;
    if (followers === "50K–100K" && (applicant.followers < 50000 || applicant.followers > 100000)) return false;
    if (followers === "100K+" && applicant.followers < 100000) return false;
    if (fee === "Accepts your fee" && applicant.counter) return false;
    if (fee === "Counter offer" && !applicant.counter) return false;
    return true;
  }).sort((a, b) => sort === "Match" ? b.match - a.match : a.name.localeCompare(b.name)), [city, engagement, fee, followers, platform, sort, status, statuses]);
  const updateStatus = (id: string, next: ApplicationStatus) => setStatuses((current) => ({ ...current, [id]: next }));
  const segments = ["All", "New", "Shortlisted", "Reviewed", "Declined"] as const;
  if (!hasApplications) return <section className="mt-6"><div className="flex flex-wrap items-center gap-2"><div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">{segments.map((item) => <button type="button" key={item} onClick={() => setStatus(item)} className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${status === item ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}><span>{item}</span><span className="text-[12px] leading-4 text-secondary">0</span></button>)}</div><span className="hidden h-px flex-1 bg-line xl:block" /><div className="flex min-w-0 flex-1 flex-wrap justify-end gap-2 xl:flex-none"><Dropdown compact ariaLabel="Filter by platform" value={platform} onChange={setPlatform} options={["Platform", "Instagram", "TikTok", "YouTube"]} className="w-[96px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by followers" value={followers} onChange={setFollowers} options={["Followers", "Under 10K", "10K–50K", "50K–100K", "100K+"]} className="w-[103px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by engagement rate" value={engagement} onChange={setEngagement} options={["Eng. rate", "2%+", "4%+", "6%+"]} className="w-[99px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by fee" value={fee} onChange={setFee} options={["Fee", "Accepts your fee", "Counter offer"]} className="w-[67px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by city" value={city} onChange={setCity} options={["City", "Bengaluru", "Mumbai", "Delhi", "Pune", "Chennai"]} className="w-[69px] [&>button]:h-[38px]" /></div><button type="button" onClick={() => setSort((value) => value === "Match" ? "Name" : "Match")} className="ml-auto flex h-9 items-center gap-1.5 px-2 text-[13px] text-secondary transition hover:text-ink">Sort: {sort} <ChevronDown size={14} /></button></div><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-5 flex min-h-[294px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-12 text-center"><motion.div initial={{ opacity: 0, scale: 0.76 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="grid size-14 place-items-center rounded-[28px] bg-subtle text-secondary"><Search size={26} strokeWidth={1.7} /></motion.div><h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">No applications yet</h2><p className="mt-1 max-w-[520px] text-[13px] leading-5 text-secondary">{projectName} is live. Creators who match it can apply from the marketplace; you’ll see them here with their match score and fee. Share the project link or invite creators yourself.</p><div className="mt-4 flex flex-wrap justify-center gap-2"><Button kind="secondary" leadingIcon={<Share2 size={16} />} onClick={onOpenShare}>Copy project link</Button><Button leadingIcon={<Search size={16} />}>Find creators</Button></div></motion.div></section>;
  return <section className="mt-6"><div className="flex flex-wrap items-center gap-2"><div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">{segments.map((item) => <button type="button" key={item} onClick={() => setStatus(item)} className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${status === item ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}><span>{item}</span><span className="text-[12px] leading-4 text-secondary">{counts[item] ?? 0}</span></button>)}</div><span className="hidden h-px flex-1 bg-line xl:block" /><div className="flex min-w-0 flex-1 flex-wrap justify-end gap-2 xl:flex-none"><Dropdown compact ariaLabel="Filter by platform" value={platform} onChange={setPlatform} options={["Platform", "Instagram", "TikTok", "YouTube", "Snapchat", "Pinterest"]} className="w-[96px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by followers" value={followers} onChange={setFollowers} options={["Followers", "Under 10K", "10K–50K", "50K–100K", "100K+"]} className="w-[103px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by engagement rate" value={engagement} onChange={setEngagement} options={["Eng. rate", "2%+", "4%+", "6%+"]} className="w-[99px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by fee" value={fee} onChange={setFee} options={["Fee", "Accepts your fee", "Counter offer"]} className="w-[67px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by city" value={city} onChange={setCity} options={["City", "Bengaluru", "Mumbai", "Delhi", "Pune", "Chennai", "Hyderabad"]} className="w-[69px] [&>button]:h-[38px]" /></div><button type="button" onClick={() => setSort((value) => value === "Match" ? "Name" : "Match")} className="ml-auto flex h-9 items-center gap-1.5 px-2 text-[13px] text-secondary transition hover:text-ink">Sort: {sort} <ChevronDown size={14} /></button></div><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((applicant) => <ApplicantCard applicant={applicant} status={statuses[applicant.id]} onStatus={(next) => updateStatus(applicant.id, next)} key={applicant.id} />)}</div>{!visible.length && <div className="mt-5 rounded-xl border border-line bg-white px-6 py-12 text-center text-[13px] text-secondary">No applications match these filters.</div>}<p className="mt-5 text-[12px] leading-5 text-secondary">Showing {visible.length} of {applicants.length} applications · applications close 1 Nov · creator stats from the last 30 days</p></section>;
}

type ProjectApplicationsViewProps = {
  projectName: string;
  applicationCount: number;
  hasApplications: boolean;
  objective: string;
  projectType: string;
  partnership: string;
  duration: string;
  onOpenShare: () => void;
};

function ContextApplicantCard({ applicant, index, type, partnership, duration, objective, status, onStatus }: { applicant: Applicant; index: number; type: string; partnership: string; duration: string; objective: string; status: ApplicationStatus; onStatus: (status: ApplicationStatus) => void }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const isUgc = /ugc/i.test(type);
  const isAi = /ai/i.test(type);
  const videoProject = isUgc || isAi;
  const isGift = /gift/i.test(partnership);
  const isLongTerm = /long/i.test(partnership) || /long/i.test(duration);
  const objectiveOffset: Record<string, number> = { Sales: 0, Awareness: -1, Engagement: 1, Traffic: -2, Leads: -3 };
  const match = Math.max(58, Math.min(98, applicant.match + (objectiveOffset[objective] ?? 0)));
  const stats = isUgc
    ? [[`${Math.max(32, Math.round(applicant.engagement * 11))}%`, "Hook rate"], [`${8 + index}`, "Videos made"], [`${2 + (index % 3)} days`, "Turnaround"]]
    : isAi
      ? [[`${Math.max(72, match)}%`, "Completion"], [`${12 + index}`, "Videos made"], [`${1 + (index % 3)} days`, "Turnaround"]]
      : [[`${applicant.engagement}%`, "Eng. rate"], [applicant.views, "Avg. views"], [applicant.audience, "Women 18–34"]];
  const channel = videoProject
    ? isAi ? `${9 + index} AI videos · English, Hindi` : `${4 + index} UGC videos · Skincare portfolio`
    : null;
  const rate = 15000 + index * 1800;
  const unit = isLongTerm ? " / month" : "";
  const feeTitle = isGift
    ? applicant.counter ? `Asks ₹${rate.toLocaleString("en-IN")} + kit` : "Accepts the gift · ₹12,500 kit"
    : applicant.counter ? `Asked ₹${rate.toLocaleString("en-IN")}${unit}` : `Accepts your fee · ₹12,500${unit}`;
  const feeNote = isGift
    ? applicant.counter ? "Would like their standard creator fee alongside the product kit" : "Product kit accepted · no additional cash ask"
    : applicant.counter ? `₹${Math.max(0, rate - 12500).toLocaleString("en-IN")} above your ₹12,500 fee${unit}` : `Same as your ₹12,500 fee${unit} · no extra ask`;
  return <article onClickCapture={(event) => { const button = (event.target as HTMLElement).closest("button"); if (button?.textContent === "View profile") { event.preventDefault(); event.stopPropagation(); setProfileOpen(true); } }} className="relative h-[461px] overflow-hidden rounded-xl border border-line bg-white">{profileOpen && <ApplicantProfileDrawer applicant={applicant} projectName="Vitamin-C Serum" status={status} onClose={() => setProfileOpen(false)} onInvite={() => { onStatus("Reviewed"); setProfileOpen(false); }} />}
    <div className="absolute left-5 right-5 top-5 flex h-14 items-center gap-3"><img src={`/assets/creators/${applicant.avatar}.png`} alt="" className="size-11 rounded-full object-cover" /><div className="min-w-0 flex-1"><h2 className="truncate text-[14px] font-semibold leading-[22px] text-ink">{applicant.name}</h2><p className="truncate text-[12px] leading-4 text-secondary">{applicant.handle} · {applicant.city}</p></div><motion.div className="grid size-14 place-items-center rounded-full" style={{ background: `conic-gradient(#2563eb ${match}%, #e5e7eb 0)` }} initial={{ opacity: 0, scale: .72, rotate: -45 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .75, ease: [0.22, 1, 0.36, 1] }}><span className="grid size-[46px] place-items-center rounded-full bg-white text-[14px] font-semibold leading-5 text-ink">{match}%</span></motion.div></div>
    <div className="absolute left-5 right-5 top-[91px] flex h-5 items-center gap-1.5">{channel ? <p className="min-w-0 truncate text-[12px] leading-5 text-ink">{channel}</p> : <div className="flex min-w-0 gap-2">{applicant.platforms.map(([platform, followers]) => <span className="flex items-center gap-1 text-[12px] leading-5 text-ink" key={platform}><PlatformLogo platform={platform} size={16} /><span>{followers}</span></span>)}</div>}<span className="h-px min-w-2 flex-1 bg-line" /><span className="inline-flex h-5 items-center gap-1 rounded-full bg-success-bg px-2 text-[11px] font-medium text-success"><Check size={11} strokeWidth={3} />Verified</span></div>
    <p className="absolute left-5 top-[125px] text-[10px] leading-[13px] text-tertiary">{videoProject ? "Portfolio reviewed · last 30 days" : "Creator stats · last 30 days"}</p>
    <div className="absolute left-5 right-5 top-[152px] grid h-14 grid-cols-3 divide-x divide-line rounded-lg bg-subtle">{stats.map(([value, label]) => <div className="px-2.5 pt-2" key={label}><p className="truncate text-[14px] font-semibold leading-[22px] text-ink">{value}</p><p className="truncate text-[11px] leading-4 text-secondary">{label}</p></div>)}</div>
    <p className="absolute left-5 right-5 top-[222px] h-10 overflow-hidden text-[12px] leading-5 text-secondary">“{applicant.note}”</p>
    <div className={`absolute left-5 right-5 top-[276px] h-[78px] rounded-lg px-3 py-2.5 ${applicant.counter ? "bg-[#fff7e8]" : "bg-subtle"}`}><p className={`flex items-center gap-1.5 text-[13px] font-medium leading-[22px] ${applicant.counter ? "text-[#a65d00]" : "text-ink"}`}>{applicant.counter ? <span className="size-2 rounded-full bg-[#f29b07]" /> : <Check size={16} className="text-success" strokeWidth={2.5} />}{feeTitle}</p><p className="mt-1 text-[11px] leading-4 text-secondary">{feeNote}</p></div>
    <div className="absolute left-5 right-5 top-[368px] space-y-2"><div className="grid grid-cols-2 gap-2"><a href={`mailto:?subject=${encodeURIComponent(`${objective} collaboration — ${applicant.name}`)}`} className="flex h-8 items-center justify-center rounded-md border border-line text-[12px] font-medium text-ink transition hover:bg-subtle">Message</a><button type="button" onClick={() => window.open(`https://www.instagram.com/${applicant.handle.slice(1)}`, "_blank", "noopener,noreferrer")} className="flex h-8 items-center justify-center rounded-md border border-line text-[12px] font-medium text-ink transition hover:bg-subtle">View profile</button></div>{status === "Declined" ? <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => onStatus("New")} className="h-8 rounded-md border border-line text-[12px] font-medium text-ink transition hover:bg-subtle">Undo decline</button><button type="button" onClick={() => onStatus("Shortlisted")} className="h-8 rounded-md bg-primary text-[12px] font-medium text-white transition hover:bg-[#1d4ed8]">Shortlist</button></div> : status === "Shortlisted" ? <div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => onStatus("New")} className="h-8 rounded-md bg-transparent text-[12px] font-medium text-ink transition hover:bg-subtle">Remove</button><button type="button" onClick={() => onStatus("Reviewed")} className="h-8 rounded-md bg-primary text-[12px] font-medium text-white transition hover:bg-[#1d4ed8]">Invite</button></div> : <div className="grid grid-cols-3 gap-2"><button type="button" onClick={() => onStatus("Declined")} className="h-8 rounded-md border border-line text-[12px] font-medium text-ink transition hover:bg-subtle">Decline</button><button type="button" onClick={() => onStatus("Shortlisted")} className="h-8 rounded-md border border-line text-[12px] font-medium text-ink transition hover:bg-subtle">Shortlist</button><button type="button" onClick={() => onStatus("Reviewed")} className="h-8 rounded-md bg-primary text-[12px] font-medium text-white transition hover:bg-[#1d4ed8]">Invite</button></div>}</div>
  </article>;
}

export function ProjectApplicationsView({ projectName, applicationCount, hasApplications, objective, projectType, partnership, duration, onOpenShare }: ProjectApplicationsViewProps) {
  const isVideoProject = /ugc|ai/i.test(projectType);
  const isGift = /gift/i.test(partnership);
  const isLongTerm = /long/i.test(partnership) || /long/i.test(duration);
  const [status, setStatus] = useState("All");
  const [platform, setPlatform] = useState("Platform");
  const [audienceFilter, setAudienceFilter] = useState(isVideoProject ? "Portfolio" : "Followers");
  const [qualityFilter, setQualityFilter] = useState(isVideoProject ? "Turnaround" : "Eng. rate");
  const [feeFilter, setFeeFilter] = useState(isGift ? "Asks" : "Fee");
  const [city, setCity] = useState("City");
  const [sort, setSort] = useState("Match");
  const [statuses, setStatuses] = useState<Record<string, ApplicationStatus>>(() => Object.fromEntries(applicants.map((applicant) => [applicant.id, applicant.status])));
  const segments = ["All", "New", "Shortlisted", "Reviewed", "Declined"] as const;
  const counts = useMemo(() => {
    if (!hasApplications) return { All: 0, New: 0, Shortlisted: 0, Reviewed: 0, Declined: 0 };
    const newCount = Math.round(applicationCount * 5 / 12);
    const shortlistedCount = Math.round(applicationCount * 3 / 12);
    const reviewedCount = Math.round(applicationCount * 2 / 12);
    return { All: applicationCount, New: newCount, Shortlisted: shortlistedCount, Reviewed: reviewedCount, Declined: Math.max(0, applicationCount - newCount - shortlistedCount - reviewedCount) };
  }, [applicationCount, hasApplications]);
  const visible = useMemo(() => applicants.filter((applicant) => {
    if (status !== "All" && statuses[applicant.id] !== status) return false;
    if (platform !== "Platform" && !applicant.platforms.some(([item]) => item === platform)) return false;
    if (city !== "City" && applicant.city !== city) return false;
    if (!isVideoProject && qualityFilter !== "Eng. rate" && applicant.engagement < Number(qualityFilter.replace("%+", ""))) return false;
    if (!isVideoProject && audienceFilter === "Under 10K" && applicant.followers >= 10000) return false;
    if (!isVideoProject && audienceFilter === "10K–50K" && (applicant.followers < 10000 || applicant.followers > 50000)) return false;
    if (!isVideoProject && audienceFilter === "50K–100K" && (applicant.followers < 50000 || applicant.followers > 100000)) return false;
    if (!isVideoProject && audienceFilter === "100K+" && applicant.followers < 100000) return false;
    if (feeFilter === "Accepts your fee" && applicant.counter) return false;
    if (feeFilter === "Counter offer" && !applicant.counter) return false;
    if (feeFilter === "Accepts gift" && applicant.counter) return false;
    if (feeFilter === "Asks cash + kit" && !applicant.counter) return false;
    return true;
  }).sort((a, b) => sort === "Match" ? b.match - a.match : a.name.localeCompare(b.name)), [audienceFilter, city, feeFilter, isVideoProject, platform, qualityFilter, sort, status, statuses]);
  const toolbar = <div className="flex flex-wrap items-center gap-2"><div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-[10px] bg-subtle p-1">{segments.map((item) => <button type="button" key={item} onClick={() => setStatus(item)} className={`flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] leading-5 transition ${status === item ? "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:text-ink"}`}><span>{item}</span><span className="text-[12px] leading-4 text-secondary">{hasApplications ? counts[item] ?? 0 : 0}</span></button>)}</div><span className="hidden h-px flex-1 bg-line xl:block" /><div className="flex min-w-0 flex-1 flex-wrap justify-end gap-2 xl:flex-none"><Dropdown compact ariaLabel="Filter by platform" value={platform} onChange={setPlatform} options={["Platform", "Instagram", "TikTok", "YouTube", "Snapchat", "Pinterest"]} className="w-[96px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel={isVideoProject ? "Filter by portfolio" : "Filter by followers"} value={audienceFilter} onChange={setAudienceFilter} options={isVideoProject ? ["Portfolio", "Beauty", "Skincare", "Lifestyle"] : ["Followers", "Under 10K", "10K–50K", "50K–100K", "100K+"]} className="w-[103px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel={isVideoProject ? "Filter by turnaround" : "Filter by engagement rate"} value={qualityFilter} onChange={setQualityFilter} options={isVideoProject ? ["Turnaround", "1–3 days", "4–7 days", "8+ days"] : ["Eng. rate", "2%+", "4%+", "6%+"]} className="w-[99px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel={isGift ? "Filter by asks" : "Filter by fee"} value={feeFilter} onChange={setFeeFilter} options={isGift ? ["Asks", "Accepts gift", "Asks cash + kit"] : ["Fee", "Accepts your fee", "Counter offer"]} className="w-[67px] [&>button]:h-[38px]" /><Dropdown compact ariaLabel="Filter by city" value={city} onChange={setCity} options={["City", "Bengaluru", "Mumbai", "Delhi", "Pune", "Chennai", "Hyderabad"]} className="w-[69px] [&>button]:h-[38px]" /></div><button type="button" onClick={() => setSort((value) => value === "Match" ? "Name" : "Match")} className="ml-auto flex h-9 items-center gap-1.5 px-2 text-[13px] text-secondary transition hover:text-ink">Sort: {sort} <ChevronDown size={14} /></button></div>;
  if (!hasApplications) return <section className="mt-6">{toolbar}<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-5 flex min-h-[294px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-12 text-center"><motion.div initial={{ opacity: 0, scale: 0.76 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="grid size-14 place-items-center rounded-[28px] bg-subtle text-secondary"><Search size={26} strokeWidth={1.7} /></motion.div><h2 className="mt-3 text-[14px] font-semibold leading-5 text-ink">No applications yet</h2><p className="mt-1 max-w-[520px] text-[13px] leading-5 text-secondary">{projectName} is live. Creators who match it can apply from the marketplace; you’ll see them here with their match score and fee. Share the project link or invite creators yourself.</p><div className="mt-4 flex flex-wrap justify-center gap-2"><Button kind="secondary" leadingIcon={<Share2 size={16} />} onClick={onOpenShare}>Copy project link</Button><Button leadingIcon={<Search size={16} />}>Find creators</Button></div></motion.div></section>;
  return <section className="mt-6">{toolbar}<div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((applicant, index) => <ContextApplicantCard applicant={applicant} index={index} type={projectType} partnership={partnership} duration={duration} objective={objective} status={statuses[applicant.id]} onStatus={(next) => setStatuses((current) => ({ ...current, [applicant.id]: next }))} key={applicant.id} />)}</div>{!visible.length && <div className="mt-5 rounded-xl border border-line bg-white px-6 py-12 text-center text-[13px] text-secondary">No applications match these filters.</div>}<p className="mt-5 text-[12px] leading-5 text-secondary">Showing {visible.length} of {applicationCount} applications · {isLongTerm ? "open until 1 Nov" : "applications close 1 Nov"} · creator stats from the last 30 days</p></section>;
}
