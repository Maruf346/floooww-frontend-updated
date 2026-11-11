import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleCheck, Info, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { Dropdown, MultiDropdown } from "@/common/components/ui/Dropdown";
import { ROUTES } from "@/common/constants/routes";
import { getProjectSteps, useProjectFlow, type ProjectPartnership } from "@/brand/context/ProjectFlowContext";

const niches = ["Beauty", "Skincare", "Fashion", "Lifestyle", "Wellness", "Fitness", "Other"];
const audienceGenderOptions = [
  { value: "Any", description: "All creators, whatever their audience" },
  { value: "Women", description: "100% or more of the audience is female" },
  { value: "Men", description: "100% or more of the audience is male" },
  { value: "Balanced", description: "Between 50% and 50% either way" },
];
const audienceAgeOptions = [
  { value: "13–17", description: "Not allowed for some products" },
  { value: "18–24" }, { value: "25–34" }, { value: "35–44" }, { value: "45–54" }, { value: "55+" },
];
const audienceLocationOptions = ["Bengaluru", "Mumbai", "Delhi", "Andra Pradesh", "Tamil Nadu", "Goa"];

export function BrandProjectCreatorsPage() {
  const navigate = useNavigate();
  const { partnership } = useProjectFlow();
  const [saved, setSaved] = useState(false);
  const [selectedNiches, setSelectedNiches] = useState(["Beauty", "Skincare"]);
  const [minimum, setMinimum] = useState(3);
  const [maximum, setMaximum] = useState(10);
  const [turnaround, setTurnaround] = useState("Within 5 days");
  const [customTurnarounds, setCustomTurnarounds] = useState<string[]>([]);
  const [audienceGender, setAudienceGender] = useState("Women");
  const [customGenderSplits, setCustomGenderSplits] = useState<string[]>([]);
  const [audienceAges, setAudienceAges] = useState(["18–24", "25–34"]);
  const [customAudienceAges, setCustomAudienceAges] = useState<string[]>([]);
  const [audienceLocation, setAudienceLocation] = useState("Bengaluru");
  const [customAudienceLocations, setCustomAudienceLocations] = useState<string[]>([]);
  const start = ((minimum - 1) / 19) * 100;
  const end = ((maximum - 1) / 19) * 100;
  const toggleNiche = (niche: string) => setSelectedNiches((current) => current.includes(niche) ? current.filter((item) => item !== niche) : [...current, niche]);

  return <BrandShell><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
    <header className="flex items-end justify-between gap-4"><div><p className="text-[12px] leading-4 text-tertiary">Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project</p><h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Creator requirements</h1><p className="text-[13px] leading-5 text-secondary">{saved ? "Draft saved just now" : "Saved as a draft automatically"}</p></div><Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>Exit</Button></header>
    <Stepper partnership={partnership} />
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .26 }} onSubmit={(event) => { event.preventDefault(); setSaved(true); }} className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7">
        <div><p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">STEP 5 OF 9</p><h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Creator requirements</h2><p className="mt-1.5 text-[14px] leading-[22px] text-secondary">We use this to rank creators by match score. Only “required” fields hide creators.</p></div>
        <section className="mt-5" aria-label="Portfolio range"><div className="flex items-center justify-between gap-4 text-[12px] font-medium leading-4"><span className="text-ink">Portfolio</span><span className="whitespace-nowrap text-secondary">{minimum} – {maximum} UGC videos</span></div><div className="relative mt-2 h-4"><div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-muted" /><div className="absolute top-1/2 h-1 -translate-y-1/2 bg-primary" style={{ left: `${start}%`, right: `${100 - end}%` }} /><Range label="Minimum portfolio videos" value={minimum} onChange={(value) => setMinimum(Math.min(value, maximum))} /><Range label="Maximum portfolio videos" value={maximum} onChange={(value) => setMaximum(Math.max(value, minimum))} /></div><div className="mt-2 flex justify-between text-[12px] leading-4 text-tertiary"><span>1</span><span>3</span><span>5</span><span>10</span><span>20+</span></div></section>
        <div className="relative z-10 mt-5"><label className="mb-1.5 block text-[12px] font-medium leading-4 text-ink" htmlFor="turnaround">Turnaround</label><Dropdown ariaLabel="Turnaround" className="w-full" onChange={setTurnaround} onOther={(value) => setCustomTurnarounds((current) => current.includes(value) ? current : [...current, value])} options={["Within 2 days", "Within 3 days", "Within 4 days", "Within 5 days", "Within 7 days", "Within 10 days", ...customTurnarounds]} otherLabel="Other, type your own days" otherPlaceholder="For example, within 6 days" value={turnaround} /><p className="mt-1.5 text-[12px] leading-4 text-tertiary">Median for beauty UGC creators: 4 days</p></div>
        <section className="mt-5"><p className="text-[12px] font-medium leading-4 text-ink">Niche <span className="text-danger">*</span></p><div className="mt-2 flex flex-wrap gap-2">{niches.map((niche) => { const active = selectedNiches.includes(niche); return <button key={niche} type="button" aria-pressed={active} onClick={() => toggleNiche(niche)} className={active ? "inline-flex h-9 items-center gap-1.5 rounded-full border border-primary bg-primary-subtle px-3.5 text-[13px] leading-5 text-primary" : "inline-flex h-9 items-center rounded-full border border-line bg-white px-3.5 text-[13px] leading-5 text-ink transition hover:bg-subtle"}>{active && <Check size={14} strokeWidth={2.5} />}{niche}</button>; })}</div></section>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="relative z-10 focus-within:z-20"><p className="mb-1.5 text-[12px] font-medium leading-4 text-ink">Audience gender</p><Dropdown ariaLabel="Audience gender" className="w-full" onChange={setAudienceGender} onOther={(value) => setCustomGenderSplits((current) => current.includes(value) ? current : [...current, value])} options={[...audienceGenderOptions, ...customGenderSplits.map((value) => ({ value }))]} otherLabel="Other: set your own split" otherPlaceholder="For example, 70% women" value={audienceGender} /></div><div className="relative z-10 focus-within:z-20"><p className="mb-1.5 text-[12px] font-medium leading-4 text-ink">Audience age</p><MultiDropdown ariaLabel="Audience age" className="w-full" hint="Pick one or more" onChange={setAudienceAges} onOther={(value) => { if (!audienceAges.includes(value)) setAudienceAges((current) => [...current, value]); setCustomAudienceAges((current) => current.includes(value) ? current : [...current, value]); }} onRemoveOption={(value) => { setCustomAudienceAges((current) => current.filter((item) => item !== value)); setAudienceAges((current) => current.filter((item) => item !== value)); }} options={[...audienceAgeOptions, ...customAudienceAges.map((value) => ({ value }))]} otherLabel="Other, type your own range" otherPlaceholder="For example, 26–30" removableValues={customAudienceAges} values={audienceAges} /></div></div><div className="relative z-10 mt-4 focus-within:z-20"><p className="mb-1.5 text-[12px] font-medium leading-4 text-ink">Audience location</p><Dropdown ariaLabel="Audience location" className="w-full" onChange={setAudienceLocation} onOther={(value) => setCustomAudienceLocations((current) => current.includes(value) ? current : [...current, value])} options={[...audienceLocationOptions, ...customAudienceLocations]} otherLabel="Other, type your own" otherPlaceholder="Type a location" value={audienceLocation} /></div>
        <div className="mt-5 flex gap-2.5 rounded-md bg-primary-subtle px-3.5 py-3 text-[14px] font-medium leading-[22px] text-ink"><Info size={18} className="mt-0.5 shrink-0 text-primary" /><span>214 creators match · stats from the last 30 days</span></div>
        <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5"><Button kind="secondary" onClick={() => navigate(ROUTES.brandNewProjectDetails)} leadingIcon={<ArrowLeft size={16} />}>Back</Button><div className="flex-1" /><Button kind="ghost" onClick={() => setSaved(true)}>Save draft</Button><Button type="button" onClick={() => navigate(ROUTES.brandNewProjectDeliverables)} trailingIcon={<ArrowRight size={16} />}>Continue</Button></footer>
      </motion.form>
      <ProjectSetup />
    </div>
  </div></BrandShell>;
}

function Range({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <input aria-label={label} type="range" min="1" max="20" value={value} onChange={(event) => onChange(Number(event.target.value))} className="absolute inset-0 h-4 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white" />; }
function Stepper({ partnership }: { partnership: ProjectPartnership }) { const steps = getProjectSteps(partnership); return <section className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4"><div className="flex min-w-[760px]">{steps.map((step, index) => <div className="flex flex-1 flex-col items-center gap-1.5" key={step}>{index < 4 ? <span className="flex size-7 items-center justify-center rounded-full bg-success text-white"><Check size={14} strokeWidth={2.5} /></span> : <span className={index === 4 ? "flex size-7 items-center justify-center rounded-full bg-primary text-[12px] font-medium text-white" : "flex size-7 items-center justify-center rounded-full border border-line-strong text-[12px] font-medium text-tertiary"}>{index + 1}</span>}<span className={index === 4 ? "text-[12px] font-medium leading-4 text-primary" : index < 4 ? "text-[12px] leading-4 text-secondary" : "text-[12px] leading-4 text-tertiary"}>{step}</span></div>)}</div></section>; }
function ProjectSetup() { const details = [["Target", "20 usable videos"], ["Type", "UGC"], ["Partnership", "Paid"], ["Duration", "One-time · 7 Oct – 7 Nov"]]; const upcoming = ["Deliverables", "Budget", "Payment method", "Review & publish"]; return <aside className="rounded-xl border border-line bg-white p-5"><h2 className="text-[16px] font-semibold leading-6 text-ink">Project setup</h2><p className="text-[12px] leading-4 text-secondary">Shapes your dashboard</p><div className="mt-4 space-y-3">{details.map(([label, value]) => <div className="flex items-center gap-2 text-[13px] leading-5" key={label}><span className="flex-1 text-secondary">{label}</span><span className="text-right text-[14px] font-medium leading-[22px] text-ink">{value}</span></div>)}</div><div className="my-4 h-px bg-line" /><div className="space-y-3"><Completed label="Type" /><Completed label="Partnership" /><Completed label="Duration" /><Completed label="Project details" /><div className="flex items-center gap-2.5 text-[14px] font-medium leading-[22px] text-primary"><CircleCheck size={16} />Creator requirements</div>{upcoming.map((label, index) => <div className="flex items-center gap-2.5 text-[13px] leading-5 text-tertiary" key={label}><span className="flex size-4 items-center justify-center rounded-full border border-line-strong text-[10px]">{index + 6}</span>{label}</div>)}</div></aside>; }
function Completed({ label }: { label: string }) { return <div className="flex items-center gap-2.5 text-[13px] leading-5 text-ink"><CheckCircle2 size={16} className="text-success" />{label}</div>; }
