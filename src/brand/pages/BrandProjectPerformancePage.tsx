import { useState } from "react";
import { Download, MoreHorizontal, Share2, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { getProject } from "@/brand/data/projects";
import { Button } from "@/common/components/ui/Button";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { brandProjectPerformanceRoute, brandProjectRoute } from "@/common/constants/routes";

const scorecards = [
  ["Net sales", "₹5,42,000", "▲ 18% vs prev."],
  ["Orders", "1,315", "▲ 14% vs prev."],
  ["Link clicks", "14,800", "▲ 9% vs prev. · CTR 0.8%"],
  ["Engagement rate", "5.4%", "▲ 0.4 pt vs prev."],
  ["Views", "18.4 L", "▲ 19% vs prev."],
  ["Earned media value", "₹2,28,000", "Estimate · not in ROAS"],
] as const;

const creatorRows = [
  ["Meera Iyer", "@meerabeauty · 4 of 4 delivered", "Meera", "Instagram", "Completed", "₹22,000", "5.2 L", "5.9%", "3,820", "414", "₹1,71,000"],
  ["Ishita Rao", "@ishitarao · 4 of 4 delivered", "Ishita", "Instagram", "Completed", "₹18,000", "4.8 L", "5.6%", "3,110", "352", "₹1,45,000"],
  ["Emma Clarke", "@emmaclarke · 3 of 4 delivered", "Emma", "TikTok", "Posting", "₹16,000", "3.6 L", "5.2%", "2,842", "276", "₹1,10,000"],
  ["Kavya Reddy", "@kavyareddy · 2 of 4 delivered", "Kavya", "Instagram", "Review", "₹14,000", "2.9 L", "4.8%", "2,108", "181", "₹72,000"],
] as const;

function ProjectTabs({ projectId }: { projectId: number }) {
  const navigate = useNavigate();
  const tabs = [
    ["Overview", () => navigate(brandProjectRoute(projectId))],
    ["Applications", () => navigate(brandProjectRoute(projectId)), "12"],
    ["Invited creators", () => navigate(brandProjectRoute(projectId)), "16"],
    ["Content", () => navigate(brandProjectRoute(projectId)), "22"],
    ["Payments", () => navigate(brandProjectRoute(projectId))],
    ["Performance", () => navigate(brandProjectPerformanceRoute(projectId))],
    ["Brief", () => navigate(brandProjectRoute(projectId))],
  ] as const;
  const [platform, setPlatform] = useState("All platforms");
  return <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line">
    <div className="flex max-w-full gap-6 overflow-x-auto">
      {tabs.map(([label, onClick, count]) => <button type="button" onClick={onClick} className={`relative h-9 shrink-0 border-0 bg-transparent text-[13px] ${label === "Performance" ? "font-semibold text-primary" : "text-secondary hover:text-ink"}`} key={label}>{label}{count && <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[11px] text-secondary">{count}</span>}{label === "Performance" && <i className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}</button>)}
    </div>
    <div className="mb-1 flex items-center gap-2"><span className="text-[12px] text-tertiary">View by platform</span><Dropdown ariaLabel="View by platform" value={platform} onChange={setPlatform} options={["All platforms", "Instagram", "TikTok", "YouTube"]} /><button type="button" aria-label="Download report" className="grid size-8 place-items-center rounded-md border border-line bg-white text-secondary"><Download size={16} /></button></div>
  </div>;
}

function SalesTrend() {
  const values = [120, 178, 170, 240, 312, 353, 444, 542];
  const x = (index: number) => 40 + index * (1000 / 7);
  const y = (value: number) => 204 - value / 600 * 184;
  const line = values.map((value, index) => `${index ? "L" : "M"}${x(index)} ${y(value)}`).join(" ");
  const area = `${line} L1040 204 L40 204 Z`;
  return <section className="rounded-xl border border-line bg-white p-5"><h2 className="text-[15px] font-semibold leading-5 text-ink">Net sales over time</h2><p className="mt-1 text-[12px] leading-4 text-secondary">All 16 creators · Shopify codes and links</p><div className="mt-4 overflow-x-auto"><svg viewBox="0 0 1080 238" className="block min-w-[620px] w-full" role="img" aria-label="Net sales growing from fourteen October to four November">{[0, 150, 300, 450, 600].map((tick) => <g key={tick}><line x1="40" x2="1040" y1={y(tick)} y2={y(tick)} stroke="#e5e7eb"/><text x="30" y={y(tick) + 4} textAnchor="end" fill="#8491a3" fontSize="11">₹{tick ? `${tick / 100}L` : "0"}</text></g>)}{values.map((_, index) => <line key={index} x1={x(index)} x2={x(index)} y1="20" y2="204" stroke="#edf0f4"/>)}<path d={area} fill="url(#sales-fill)"/><path d={line} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#2563eb" stopOpacity=".18"/><stop offset="1" stopColor="#2563eb" stopOpacity="0"/></linearGradient></defs>{values.map((value, index) => <circle key={index} cx={x(index)} cy={y(value)} r="2.7" fill="#2563eb"/>)}{["14 Oct", "17 Oct", "20 Oct", "23 Oct", "26 Oct", "29 Oct", "1 Nov", "4 Nov"].map((label, index) => <text key={label} x={x(index)} y="232" textAnchor={index === 0 ? "start" : index === 7 ? "end" : "middle"} fill="#8491a3" fontSize="11">{label}</text>)}</svg></div></section>;
}

function Funnel() {
  const rows = [["Views 18.4 L", "", "100%"], ["Link clicks 14,800", "CTR 0.8%", "81%"], ["Add to cart 3,400", "Add-to-cart rate 23%", "64%"], ["Checkouts initiated 1,910", "Checkout rate 56%", "51%"], ["Orders 1,315", "Purchase rate 69% · Conversion rate 8.9%", "40%"]] as const;
  return <section className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold text-ink">Conversion funnel</h2><p className="mt-1 text-[12px] text-secondary">From views to orders · conversion rate at each step</p><div className="mt-5 space-y-2.5">{rows.map(([label, rate, width]) => <div className="grid grid-cols-[minmax(220px,1fr)_180px] items-center gap-4 max-sm:grid-cols-1" key={label}><div className="mx-auto flex h-[42px] items-center justify-center rounded-md bg-primary-muted text-[12px] font-medium text-ink" style={{ width, minWidth: 170 }}>{label}</div><span className="text-[12px] text-secondary">{rate}</span></div>)}</div></section>;
}

function Revenue() {
  const rows = [["Orders · coupon code", "824"], ["Orders · UTM link", "491"], ["Average order value (AOV)", "₹412"], ["ROAS (net sales ÷ fees)", "3.8×"]] as const;
  return <section className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold text-ink">Revenue</h2><p className="mt-1 text-[12px] text-secondary">Gross to net sales · Shopify · all creators</p><div className="mt-5 flex h-[180px] items-end justify-around border-b border-line"><div className="flex h-full w-20 flex-col justify-end text-center"><b className="mb-2 text-[12px]">₹5,96,000</b><i className="h-[120px] rounded-t-md bg-primary"/><span className="mt-2 text-[11px] text-secondary">Gross sales</span></div><div className="flex h-full w-20 flex-col justify-end text-center"><b className="mb-2 text-[12px]">− ₹54,000</b><i className="h-[10px] rounded-t-md bg-danger"/><span className="mt-2 text-[11px] text-secondary">Returns</span></div><div className="flex h-full w-20 flex-col justify-end text-center"><b className="mb-2 text-[12px]">₹5,42,000</b><i className="h-[110px] rounded-t-md bg-success"/><span className="mt-2 text-[11px] text-secondary">Net sales</span></div></div><dl className="mt-5 space-y-3">{rows.map(([label, value]) => <div className="flex justify-between gap-4 text-[12px]" key={label}><dt className="text-secondary">{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl></section>;
}

function CreatorTable() {
  return <section className="overflow-hidden rounded-xl border border-line bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[1116px] table-fixed text-left"><thead className="border-b border-line bg-subtle text-[10px] tracking-[.06em] text-secondary"><tr>{["CREATOR", "PLATFORM · CODE", "STATUS", "FEE", "VIEWS ↓", "ENG. RATE", "CLICKS", "ORDERS", "NET SALES"].map((label) => <th className="px-3 py-3 text-right font-semibold first:w-[244px] first:text-left" key={label}>{label}</th>)}</tr></thead><tbody>{creatorRows.map(([name, detail, imageName, platform, status, fee, views, rate, clicks, orders, sales]) => <tr className="border-b border-line-subtle last:border-0" key={name}><td className="px-3 py-3"><div className="flex items-center gap-3"><img src={`/assets/creators/${imageName.toLowerCase()}.png`} alt="" className="h-[52px] w-10 rounded-md object-cover"/><span><b className="block text-[13px] font-medium">{name}</b><small className="mt-1 block text-[11px] text-secondary">{detail}</small></span></div></td><td className="px-3 py-3 text-[12px]"><span>{platform}</span><small className="mt-1 block text-secondary">Coupon · UTM link</small></td><td className="px-3 py-3 text-right"><span className={`rounded-full px-2 py-1 text-[11px] font-medium ${status === "Completed" ? "bg-success-bg text-success" : status === "Posting" ? "bg-primary-subtle text-primary" : "bg-warning-bg text-warning"}`}>{status}</span></td>{[fee, views, rate, clicks, orders, sales].map((value) => <td className="px-3 py-3 text-right text-[12px] font-medium" key={value}>{value}</td>)}</tr>)}</tbody></table></div></section>;
}

export function BrandProjectPerformancePage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = getProject(Number(projectId));
  return <BrandShell><div className="mx-auto w-full max-w-[1116px] pb-10"><header className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><button type="button" className="text-[12px] text-secondary hover:text-primary" onClick={() => navigate("/brand/projects")}>Projects / {project.name}</button><h1 className="mt-1 text-[28px] font-bold leading-[34px] tracking-[-.02em] text-ink">{project.name}</h1><span className="mt-1 inline-flex rounded-full bg-success-bg px-2 py-0.5 text-[11px] font-medium text-success">Live</span><p className="mt-1 text-[13px] text-secondary">7 Oct – 7 Nov 2026 · 10 days left</p></div><div className="flex flex-wrap items-center gap-2"><Button kind="secondary">14 Oct – 4 Nov</Button><Button kind="secondary" leadingIcon={<Share2 size={16} />}>Share</Button><Button leadingIcon={<Users size={16} />}>Invite creators</Button><button type="button" aria-label="More actions" className="grid size-10 place-items-center rounded-md border border-line bg-white"><MoreHorizontal size={18}/></button></div></header><ProjectTabs projectId={project.id}/><div className="mt-6 space-y-6"><section className="grid overflow-hidden rounded-xl border border-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{scorecards.map(([label, value, note], index) => <article className="relative min-h-[108px] border-b border-line bg-white px-[18px] py-4 xl:border-b-0 xl:border-r last:border-0" key={label}><p className="text-[12px] text-secondary">{label}</p><b className="mt-2 block text-[20px] font-semibold leading-6">{value}</b><small className={`mt-2 block text-[11px] ${index === 5 ? "text-secondary" : "text-success"}`}>{note}</small>{index === 0 && <i className="absolute inset-x-[18px] bottom-0 h-[3px] bg-primary"/>}</article>)}</section><SalesTrend/><div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_420px]"><Funnel/><Revenue/></div><CreatorTable/></div></div></BrandShell>;
}
