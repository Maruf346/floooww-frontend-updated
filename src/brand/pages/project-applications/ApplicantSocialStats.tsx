import { useState } from "react";
import { motion } from "motion/react";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import type { Platform } from "@/common/types";
import type { ApplicantProfile } from "./ApplicantProfileDrawer";

type SocialPlatform = "Instagram" | "YouTube" | "Pinterest" | "Snapchat";

const platformDetails: Record<SocialPlatform, { audience: string; followers: string; metrics: Array<[string, string]> }> = {
  Instagram: { audience: "1.2 L · Connected", followers: "1.2 L followers", metrics: [["5.8%", "Eng. rate"], ["64K", "Avg. views"], ["4.1%", "Save + share rate"]] },
  YouTube: { audience: "18K · Connected", followers: "18K subscribers", metrics: [["6.4%", "Eng. rate"], ["41K", "Avg. views"], ["58%", "Avg. watch time"]] },
  Pinterest: { audience: "9.4K · Connected", followers: "9.4K followers", metrics: [["4.9%", "Eng. rate"], ["33K", "Monthly views"], ["3.4%", "Save rate"]] },
  Snapchat: { audience: "6.2K · Connected", followers: "6.2K followers", metrics: [["7.1%", "Eng. rate"], ["24K", "Avg. views"], ["82%", "Completion rate"]] },
};

const land = ["M47 58l17-20 47-10 35 10 10 20-18 15-17 1-10 19-24 5-19-16-25-4-6-19z", "M138 125l22 8 20 34-12 61-16 21-13-37 4-35-15-23z", "M249 48l47-19 56 5 34 21-5 24-27 7-17 19-44-3-9-22-35-9z", "M293 101l39 7 31 31-11 61-26 34-27-23-13-51z", "M374 52l43-8 54 19 34 34-13 26-28-8-27 15-31-6-26-31z", "M434 151l24 10 20 36-17 47-25-26-4-34z", "M484 196l29-10 31 12 5 27-33 17-28-19z"];

function MetricCard({ title, platform, rows }: { title: string; platform: Platform; rows: Array<[string, string]> }) {
  return <section className="rounded-xl border border-line bg-white p-5"><div className="flex items-center gap-2"><PlatformLogo platform={platform} size={18} /><h3 className="text-[14px] font-medium leading-[22px] text-ink">{title}</h3><span className="h-px flex-1 bg-line" /></div><div className="mt-2.5 grid grid-cols-3 divide-x divide-line rounded-lg bg-subtle">{rows.map(([value, label], index) => <motion.div className="min-w-0 px-3 py-2.5" key={label} initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}><p className="truncate text-[14px] font-medium leading-[22px] text-ink">{value}</p><p className="truncate text-[12px] leading-4 text-secondary">{label}</p></motion.div>)}</div></section>;
}

function ReachActivityCard({ platform, rows }: { platform: Platform; rows: Array<[string, string]> }) {
  return <section className="rounded-xl border border-line bg-white p-5"><div className="flex items-center gap-2"><PlatformLogo platform={platform} size={18} /><h3 className="text-[14px] font-medium leading-[22px] text-ink">{platform} reach and activity · last 30 days</h3><span className="h-px flex-1 bg-line" /></div><div className="mt-2.5 grid gap-2">{[rows.slice(0, 3), rows.slice(3)].map((group, row) => <div className="grid grid-cols-3 divide-x divide-line rounded-lg bg-subtle" key={row}>{group.map(([value, label], index) => <motion.div className="min-w-0 px-3 py-2.5" key={label} initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: (row * 3 + index) * 0.08, ease: [0.22, 1, 0.36, 1] }}><p className="truncate text-[14px] font-medium leading-[22px] text-ink">{value}</p><p className="truncate text-[12px] leading-4 text-secondary">{label}</p></motion.div>)}</div>)}</div></section>;
}

function TinyWorldMap() {
  return <motion.svg viewBox="0 0 560 275" className="h-[147px] w-full max-w-[336px]" role="img" aria-label="Dotted world map showing Diya Kapoor's audience countries" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.75 }}><defs><pattern id="applicant-audience-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2" fill="#d6def1" /></pattern><clipPath id="applicant-audience-land">{land.map((path) => <path key={path} d={path} />)}</clipPath></defs><rect width="560" height="275" fill="url(#applicant-audience-dots)" clipPath="url(#applicant-audience-land)" /><g fill="#7186f2"><circle cx="106" cy="68" r="4" /><circle cx="114" cy="68" r="4" /><circle cx="122" cy="68" r="4" /><circle cx="130" cy="60" r="4" /><circle cx="138" cy="60" r="4" /><circle cx="146" cy="52" r="4" /><circle cx="306" cy="59" r="4" /><circle cx="314" cy="59" r="4" /><circle cx="322" cy="59" r="4" /></g><motion.g fill="#3f57e8" initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>{[[341, 97], [349, 97], [357, 97], [333, 105], [341, 105], [349, 105], [357, 105], [365, 105], [341, 113], [349, 113], [357, 113], [349, 121]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />)}</motion.g></motion.svg>;
}

function RankedBars({ rows, labelWidth = "w-[84px]" }: { rows: Array<[string, number]>; labelWidth?: string }) {
  return <div className="space-y-2.5">{rows.map(([label, value], index) => <div className="flex items-center gap-2 text-[12px] leading-4" key={label}><span className={`shrink-0 text-secondary ${labelWidth}`}>{label}</span><span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#edf0f7]"><motion.span className="block h-full rounded-full bg-[#4f61e8]" initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }} /></span><b className="w-7 text-right font-medium text-ink">{value}%</b></div>)}</div>;
}

function AudienceCards() {
  const age = [["13–17", 2], ["18–24", 44], ["25–34", 50], ["35–44", 3], ["45+", 1]] as Array<[string, number]>;
  const cities = [["Mumbai", 28], ["Pune", 12], ["Delhi", 9], ["Bengaluru", 8], ["Ahmedabad", 6]] as Array<[string, number]>;
  return <div className="grid gap-3 sm:grid-cols-2"><section className="rounded-xl border border-line bg-white p-5"><h3 className="text-[14px] font-medium leading-[22px] text-ink">Audience age</h3><div className="mt-3"><RankedBars rows={age} labelWidth="w-10" /></div></section><section className="rounded-xl border border-line bg-white p-5"><h3 className="text-[14px] font-medium leading-[22px] text-ink">Top cities in India</h3><div className="mt-3"><RankedBars rows={cities} /></div></section></div>;
}

function GenderCard() {
  const slices = [["Women 86%", "#4f61e8", 86], ["Men 12%", "#9eaff8", 12], ["Other or not specified 2%", "#dde4ff", 2]] as const;
  return <section className="min-h-[110px] rounded-xl border border-line bg-white p-5"><h3 className="text-[14px] font-medium leading-[22px] text-ink">Audience gender</h3><div className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[12px] leading-4 text-secondary">{slices.map(([label]) => <span key={label}>{label}</span>)}</div><div className="mt-3 flex h-2 overflow-hidden rounded-full bg-[#edf0f7]">{slices.map(([label, color, share], index) => <motion.span key={label} className="h-full first:rounded-l-full last:rounded-r-full" style={{ backgroundColor: color }} initial={{ width: 0 }} whileInView={{ width: `${share}%` }} viewport={{ once: true }} transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }} />)}</div></section>;
}

function FollowerGrowth() {
  const values = [["1.15 L", "28 Sep", 70], ["1.16 L", "4 Oct", 80], ["1.17 L", "10 Oct", 90], ["1.18 L", "16 Oct", 100], ["1.19 L", "22 Oct", 110], ["1.20 L", "28 Oct", 120]] as const;
  return <section className="rounded-xl border border-line bg-white p-5"><h3 className="text-[14px] font-medium leading-[22px] text-ink">Instagram followers, last 30 days</h3><div className="mt-3 flex h-40 items-end justify-between border-b border-line px-1">{values.map(([value, date, height], index) => <div className="flex h-full min-w-0 flex-1 flex-col justify-end text-center" key={date}><motion.p className="mb-1 text-[11px] leading-4 text-secondary" initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + index * 0.08 }}>{value}</motion.p><motion.span className="mx-auto block w-[56px] max-w-[78%] origin-bottom rounded-t-[4px] bg-[#8da2f7]" initial={{ height: 0 }} whileInView={{ height }} viewport={{ once: true }} transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }} /><p className="mt-1 text-[11px] leading-4 text-secondary">{date}</p></div>)}</div></section>;
}

export function ApplicantSocialStats({ applicant }: { applicant: ApplicantProfile }) {
  const [platform, setPlatform] = useState<SocialPlatform>("Instagram");
  const selected = platformDetails[platform];
  const reachRows: Array<[string, string]> = [["38%", "Reach from non-followers"], ["48K", "Avg. reach per post"], ["14K", "Avg. Story views"], ["0:14", "Avg. Reel watch time"], ["4 a week", "Posts"], ["₹0.23", "Cost per view at her ask"]];
  const countries = [["India", 92], ["UAE", 3], ["United States", 2], ["United Kingdom", 1], ["Singapore", 1], ["Other", 1]] as Array<[string, number]>;
  return <div className="space-y-4 p-6"><div><h2 className="text-[14px] font-semibold leading-5 text-ink">Social stats</h2><p className="mt-0.5 text-[12px] leading-4 text-secondary">Last 30 days</p></div><div className="grid grid-cols-2 gap-1 rounded-xl bg-subtle p-1 sm:grid-cols-4">{(Object.keys(platformDetails) as SocialPlatform[]).map((name) => <button type="button" onClick={() => setPlatform(name)} className={`flex min-w-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left transition ${platform === name ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,.08)]" : "text-secondary hover:bg-white/60"}`} key={name}><PlatformLogo platform={name as Platform} size={16} /><span className="min-w-0"><span className="block truncate text-[13px] font-medium leading-5 text-ink">{name}</span><span className="block truncate text-[11px] leading-4 text-secondary">{platformDetails[name].audience}</span></span></button>)}</div><motion.div key={platform} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="space-y-4"><MetricCard title={selected.followers} platform={platform as Platform} rows={selected.metrics} /><ReachActivityCard platform={platform as Platform} rows={reachRows} /></motion.div><section className="rounded-xl border border-line bg-white p-5"><h3 className="text-[14px] font-medium leading-5 text-ink">Top countries</h3><p className="mt-0.5 text-[12px] leading-4 text-secondary">Instagram audience by country · last 30 days</p><div className="mt-4 flex min-h-[200px] flex-col gap-5 sm:h-[200px] sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 justify-center"><TinyWorldMap /></div><div className="w-full shrink-0 sm:w-[190px]"><RankedBars rows={countries} labelWidth="w-auto flex-1" /></div></div></section><AudienceCards /><GenderCard /><FollowerGrowth /></div>;
}
