import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CircleDollarSign, ExternalLink, MessageSquare, Play, UserRoundPlus, X } from "lucide-react";
import { useLockBodyScroll } from "@/common/hooks/useLockBodyScroll";
import { ApplicantSocialStats } from "./ApplicantSocialStats";
import { ApplicantPortfolio } from "./ApplicantPortfolio";
import { ApplicantReviews } from "./ApplicantReviews";

type ApplicationStatus = "New" | "Shortlisted" | "Reviewed" | "Declined";

export type ApplicantProfile = {
  name: string;
  handle: string;
  city: string;
  avatar: string;
  match: number;
  fee: string;
  feeNote: string;
  counter: boolean;
  engagement: number;
  views: string;
  audience: string;
};

type ApplicantProfileDrawerProps = {
  applicant: ApplicantProfile | null;
  projectName: string;
  status: ApplicationStatus;
  onClose: () => void;
  onInvite: () => void;
};

const tabNames = ["Profile", "Social stats", "Portfolio", "Reviews"] as const;
type ProfileTab = (typeof tabNames)[number];

const fitItems = [
  ["Audience fit", "38 / 40", 95, "86% women · 94% aged 18–34 · 92% in India", "bg-success"],
  ["Content fit", "24 / 25", 96, "Skincare and festive GRWM Reels", "bg-success"],
  ["Engagement quality", "19 / 20", 95, "5.8% eng. rate in the last 30 days vs 3.1% median for her size", "bg-success"],
  ["Price fit", "13 / 15", 86, "20% above your fee per creator", "bg-primary"],
] as const;

function DetailCell({ value, label }: { value: string; label: string }) {
  return <div className="min-w-0 rounded-lg bg-subtle px-3 py-2.5"><p className="truncate text-[14px] font-medium leading-[22px] text-ink">{value}</p><p className="text-[12px] leading-4 text-secondary">{label}</p></div>;
}

function ProfileBody({ applicant }: { applicant: ApplicantProfile }) {
  return <div className="space-y-4 p-6">
    <section>
      <h3 className="text-[14px] font-semibold leading-5 text-ink">About</h3>
      <p className="mt-2 text-[14px] leading-[22px] text-secondary">Skincare and festive-makeup creator from {applicant.city}. Honest routines for Indian skin in Hindi and English, filmed at home in natural light. 4 years on Instagram.</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{["Skincare", "Festive looks", "GRWM", "Budget beauty"].map((niche) => <span className="rounded-full bg-subtle px-2 py-0.5 text-[12px] font-medium leading-4 text-[#394357]" key={niche}>{niche}</span>)}</div>
    </section>
    <section>
      <h3 className="text-[14px] font-semibold leading-5 text-ink">Details</h3>
      <div className="mt-3 grid grid-cols-2 gap-2"><DetailCell value="Hindi, English, Marathi" label="Languages" /><DetailCell value="Reels, Stories, Carousels" label="Formats" /><DetailCell value="within 2 hours" label="Usually replies" /><DetailCell value="Mar 2025" label="On Floooww since" /><DetailCell value="18" label="Projects completed" /><DetailCell value="96%" label="On-time delivery" /></div>
    </section>
    <section>
      <h3 className="text-[14px] font-semibold leading-5 text-ink">Brand fit</h3>
      <p className="mt-0.5 text-[12px] leading-4 text-secondary">Why she’s a {applicant.match}% match: her audience matches your target, women 18–34 in Mumbai, Pune and Delhi</p>
      <div className="mt-4 space-y-4">{fitItems.map(([title, score, progress, detail, tone], index) => <div key={title}><div className="flex items-center justify-between text-[14px] font-medium leading-[22px] text-ink"><span>{title}</span><span>{score}</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><motion.div className={`h-full rounded-full ${tone}`} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.9, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }} /></div><p className="mt-1.5 text-[12px] leading-4 text-secondary">{detail}</p></div>)}</div>
    </section>
  </div>;
}

function TabBody({ tab, applicant }: { tab: ProfileTab; applicant: ApplicantProfile }) {
  if (tab === "Profile") return <ProfileBody applicant={applicant} />;
  if (tab === "Social stats") return <div className="space-y-4 p-6"><h3 className="text-[14px] font-semibold leading-5 text-ink">Social stats</h3><div className="grid grid-cols-3 gap-2"><DetailCell value={`${applicant.engagement}%`} label="Eng. rate" /><DetailCell value={applicant.views} label="Avg. views" /><DetailCell value={applicant.audience} label="Women 18–34" /></div><div className="rounded-lg bg-subtle p-3"><p className="text-[14px] font-medium text-ink">Insights verified</p><p className="mt-1 text-[12px] leading-4 text-secondary">Live platform data from the last 30 days.</p></div></div>;
  if (tab === "Portfolio") return <div className="space-y-3 p-6"><h3 className="text-[14px] font-semibold leading-5 text-ink">Portfolio</h3>{["Vitamin C routine", "Festive look", "Ingredient-first review"].map((title, index) => <div className="flex items-center gap-3 rounded-lg bg-subtle p-2.5" key={title}><div className="grid h-[63px] w-[112px] shrink-0 place-items-center overflow-hidden rounded-md bg-gradient-to-br from-[#f4c9ab] via-[#e7ad8a] to-[#815739] text-white"><Play size={18} fill="currentColor" /></div><div><p className="text-[14px] font-medium leading-[22px] text-ink">{title}</p><p className="text-[13px] leading-5 text-secondary">{42 + index * 9}-sec video</p></div></div>)}</div>;
  return <div className="space-y-3 p-6"><h3 className="text-[14px] font-semibold leading-5 text-ink">Reviews</h3><div className="rounded-lg bg-subtle p-3"><p className="text-[14px] font-medium leading-[22px] text-ink">Reliable and easy to work with</p><p className="mt-1 text-[12px] leading-4 text-secondary">“Clear communication and content delivered on time.”</p><p className="mt-2 text-[12px] text-secondary">Previous brand · Oct 2026</p></div></div>;
}

export function ApplicantProfileDrawer({ applicant, projectName, status, onClose, onInvite }: ApplicantProfileDrawerProps) {
  const [tab, setTab] = useState<ProfileTab>("Profile");
  const isOpen = Boolean(applicant);
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => setTab("Profile"), [applicant?.handle]);

  return <AnimatePresence>{applicant && <div className="fixed inset-0 z-[10000] flex justify-end" role="presentation"><motion.button type="button" aria-label="Close creator profile" className="absolute inset-0 cursor-default bg-ink/25 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose} /><motion.aside role="dialog" aria-modal="true" aria-labelledby="applicant-profile-title" className="relative flex h-[100dvh] w-full max-w-[640px] flex-col bg-white shadow-[-8px_0px_32px_rgba(0,0,0,0.18)]" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}><div className="min-h-0 flex-1 overflow-y-auto">
    <header className="px-4 pb-4 pt-5 sm:px-6"><div className="flex items-center justify-between"><p className="truncate text-[12px] leading-4 text-secondary">Application · {projectName}</p><button type="button" aria-label="Close" onClick={onClose} className="grid size-7 place-items-center rounded-md border border-line text-secondary transition hover:bg-subtle hover:text-ink"><X size={16} /></button></div><div className="mt-4 flex items-center gap-3.5"><img src={`/assets/creators/${applicant.avatar}.png`} alt="" className="size-16 shrink-0 rounded-full object-cover" /><div className="min-w-0 flex-1"><h2 id="applicant-profile-title" className="truncate text-[16px] font-semibold leading-6 text-ink">{applicant.name}</h2><p className="truncate text-[13px] leading-5 text-secondary">{applicant.handle} · {applicant.city} · applied 2 days ago</p><div className="mt-1 flex flex-wrap items-center gap-1.5"><span className="rounded-full bg-info-bg px-2 py-0.5 text-[12px] font-medium leading-4 text-primary">{status}</span><span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium leading-4 text-success"><span className="size-1.5 rounded-full bg-success" />Insights verified</span></div></div><div className="flex shrink-0 flex-col items-center gap-1"><motion.div className="grid size-[72px] place-items-center rounded-full" style={{ background: `conic-gradient(#2563eb ${applicant.match}%, #e5e7eb 0)` }} initial={{ opacity: 0, scale: 0.7, rotate: -36 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}><span className="grid size-[60px] place-items-center rounded-full bg-white text-[14px] font-semibold leading-5 text-ink">{applicant.match}%</span></motion.div><p className="text-[12px] leading-4 text-secondary">Great match</p></div></div><div className="mt-4 rounded-lg bg-subtle px-3 py-2.5"><div className="flex items-center gap-1.5 text-[14px] font-medium leading-[22px] text-ink"><CircleDollarSign size={16} className={applicant.counter ? "text-[#f29b07]" : "text-success"} />{applicant.fee}</div><p className="mt-1 text-[12px] leading-4 text-secondary">{applicant.feeNote}</p></div><div className="mt-3 flex items-center gap-3 rounded-lg bg-subtle p-2.5"><div className="relative grid h-[63px] w-[112px] shrink-0 place-items-center overflow-hidden rounded-md bg-gradient-to-br from-[#edc2a8] via-[#ba7854] to-[#65412c] text-white"><span className="grid size-[26px] place-items-center rounded-full bg-white/80 text-ink"><Play size={10} fill="currentColor" /></span></div><div className="min-w-0 flex-1"><p className="text-[14px] font-medium leading-[22px] text-ink">Intro video · 0:42</p><p className="text-[13px] leading-5 text-secondary">42-Sec Video</p></div><button type="button" className="h-8 rounded-md border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-[#fafafa]">Play</button></div></header>
    <div className="flex shrink-0 gap-6 overflow-x-auto border-b border-line px-4 sm:px-6" role="tablist" aria-label="Applicant profile sections">{tabNames.map((name) => <button type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`shrink-0 border-b-2 py-2.5 text-[14px] leading-[22px] transition ${tab === name ? "border-primary text-primary" : "border-transparent text-secondary hover:text-ink"}`} key={name}>{name}</button>)}</div>
    <div><AnimatePresence mode="wait"><motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>{tab === "Social stats" ? <ApplicantSocialStats applicant={applicant} /> : tab === "Portfolio" ? <ApplicantPortfolio applicant={applicant} /> : tab === "Reviews" ? <ApplicantReviews applicant={applicant} /> : <TabBody tab={tab} applicant={applicant} />}</motion.div></AnimatePresence></div></div>
    <footer className="flex shrink-0 flex-wrap gap-2 border-t border-line px-4 py-4 sm:h-[102px] sm:flex-nowrap sm:items-center sm:px-6"><button type="button" onClick={() => window.open(`https://www.instagram.com/${applicant.handle.slice(1)}`, "_blank", "noopener,noreferrer")} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-[14px] font-medium leading-5 text-ink transition hover:bg-subtle sm:flex-none sm:w-[162px]"><ExternalLink size={16} />View full profile</button><a href={`mailto:?subject=${encodeURIComponent(`${projectName} collaboration — ${applicant.name}`)}`} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 text-[14px] font-medium leading-5 text-ink transition hover:bg-subtle sm:flex-none sm:w-[119px]"><MessageSquare size={16} />Message</a><button type="button" onClick={onInvite} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#1d4ed8] sm:flex-none sm:w-[93px]"><UserRoundPlus size={16} />Invite</button></footer>
  </motion.aside></div>}</AnimatePresence>;
}
