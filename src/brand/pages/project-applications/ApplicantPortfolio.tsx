import { motion } from "motion/react";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import type { Platform } from "@/common/types";
import type { ApplicantProfile } from "./ApplicantProfileDrawer";

const platforms: Array<[Platform, string, string]> = [
  ["Instagram", "1.2 L", "Connected"],
  ["YouTube", "18K", "Connected"],
  ["Pinterest", "9.4K", "Connected"],
  ["Snapchat", "6.2K", "Connected"],
];

const posts = [
  ["/assets/dashboard/project-glow-squad.png", "2.1 L views", "Diwali GRWM 2025"],
  ["/assets/dashboard/project-hydration-bundle.png", "86K views", "Night routine"],
  ["/assets/dashboard/project-vitamin-c.png", "1.4 L views", "Glow in 7 days"],
  ["/assets/dashboard/project-monsoon-sunscreen.png", "58K views", "Mist hacks"],
  ["/assets/dashboard/project-hydration-bundle.png", "72K views", "Serum layering"],
  ["/assets/dashboard/project-lip-tint.png", "44K views", "Festive lips"],
] as const;

export function ApplicantPortfolio({ applicant }: { applicant: ApplicantProfile }) {
  return <div className="p-6"><header><h2 className="text-[14px] font-semibold leading-5 text-ink">Recent posts</h2><p className="mt-0.5 text-[12px] leading-4 text-secondary">Last 6 Reels · tap to open on Instagram</p></header><div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-subtle p-1 sm:grid-cols-4">{platforms.map(([platform, followers, connection], index) => <motion.div className={`flex min-w-0 items-center gap-2 rounded-lg px-2.5 py-2 ${index === 0 ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,.08)]" : ""}`} key={platform} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}><PlatformLogo platform={platform} size={16} /><span className="min-w-0"><span className="block text-[13px] font-medium leading-5 text-ink">{platform}</span><span className="block truncate text-[11px] leading-4"><span className={index === 0 ? "text-primary" : "text-secondary"}>{followers}</span><span className="text-secondary"> · </span><span className="text-success">{connection}</span></span></span></motion.div>)}</div><div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3">{posts.map(([image, views, caption], index) => <motion.a href={`https://www.instagram.com/${applicant.handle.slice(1)}`} target="_blank" rel="noreferrer" className="group min-w-0" key={caption} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}><div className="aspect-[0.84] overflow-hidden rounded-lg bg-subtle"><img src={image} alt={`${caption} by ${applicant.name}`} className="size-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]" /></div><p className="mt-2 text-[14px] font-medium leading-5 text-ink">{views}</p><p className="mt-1 truncate text-[12px] leading-4 text-secondary">{caption}</p></motion.a>)}</div></div>;
}
