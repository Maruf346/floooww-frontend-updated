import { Star } from "lucide-react";
import { motion } from "motion/react";
import type { ApplicantProfile } from "./ApplicantProfileDrawer";

const ratingRows = [[5, 19], [4, 3], [3, 1], [2, 0], [1, 0]] as const;
const qualityMetrics = [["4.9", "Communication"], ["4.8", "On-time delivery"], ["4.8", "Content quality"]] as const;
const reviews = [
  ["Kumkum Naturals", "Diwali Urban Edit · Aug 2026", "Delivered two days early and the Reel became our best-selling post. Clear about what would be filmed.", 5],
  ["Velvet Leaf", "Monsoon Care · Jun 2026", "Great hooks in the first 3 seconds. Pinned our link without being asked.", 5],
  ["Sundew Labs", "Sun Safe · Apr 2026", "Good reach. Needed one round of edits on the product claims.", 4],
] as const;

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={size} strokeWidth={1.8} className={index < rating ? "fill-[#f59e0b] text-[#f59e0b]" : "text-[#d9dee7]"} />)}</span>;
}

export function ApplicantReviews({ applicant }: { applicant: ApplicantProfile }) {
  return <div className="space-y-4 p-6"><section className="grid gap-5 sm:grid-cols-[126px_minmax(0,1fr)]"><div><p className="text-[34px] font-semibold leading-10 text-ink">4.8</p><div className="mt-1"><Stars rating={5} /></div><p className="mt-1 text-[12px] leading-4 text-secondary">23 brand reviews</p></div><div className="space-y-1.5">{ratingRows.map(([rating, count], index) => <div className="grid grid-cols-[20px_minmax(0,1fr)_22px] items-center gap-2 text-[12px] leading-4" key={rating}><span className="text-secondary">{rating}<Star className="ml-0.5 inline text-secondary" size={11} fill="currentColor" /></span><span className="h-1.5 overflow-hidden rounded-full bg-[#e9edf3]"><motion.span className="block h-full rounded-full bg-[#f59e0b]" initial={{ width: 0 }} whileInView={{ width: `${count / 19 * 100}%` }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} /></span><span className="text-right text-ink">{count}</span></div>)}</div></section><div className="grid gap-2 sm:grid-cols-3">{qualityMetrics.map(([value, label], index) => <motion.div className="rounded-lg bg-subtle px-3 py-2.5" key={label} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}><p className="text-[14px] font-medium leading-[22px] text-ink">{value}</p><p className="text-[12px] leading-4 text-secondary">{label}</p></motion.div>)}</div><section><h2 className="text-[14px] font-semibold leading-5 text-ink">What brands said</h2><div className="mt-4 space-y-4">{reviews.map(([brand, project, note, rating], index) => <motion.article className="rounded-xl border border-line bg-white p-5" key={brand} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}><div className="flex items-center justify-between gap-4"><div><h3 className="text-[14px] font-medium leading-5 text-ink">{brand}</h3><p className="mt-1 text-[12px] leading-4 text-secondary">{project}</p></div><Stars rating={rating} size={13} /></div><p className="mt-2 text-[13px] leading-5 text-ink">“{note}”</p></motion.article>)}</div></section></div>;
}
