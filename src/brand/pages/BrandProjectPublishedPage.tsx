import { Check, CheckCircle2, CircleCheck, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import { useProjectFlow, type ProjectDuration, type ProjectPartnership } from "@/brand/context/ProjectFlowContext";

const standardNextSteps = [
  ["Invite creators or approve applications", "The fee is held in escrow only when you invite a creator and set deliverables."],
  ["Creator accepts within 48 hours", "If not, the money comes back to you automatically."],
  ["Send products and add tracking", "Only for deliverables that need a product."],
  ["Creator sends drafts, you approve", "Approving releases that deliverable’s payment."],
  ["Files arrive in your Content hub", "We check each file meets the brief and usage rights."],
  ["Results show in the project", "File use and ad results, shown per project."],
];

const longTermNextSteps = [...standardNextSteps.slice(0, -1), ["Results show in the project each cycle", "File use and ad results, shown per project."]];

const giftNextSteps = [
  ["Invite a creator and pick a product for each deliverable", "No payment needed. The product and deliverables go out with the invite."],
  ["Creator accepts and shares a delivery address", "The address is private to your team."],
  ["Add tracking on each deliverable", "Create a ₹0 Shopify order or type the courier and tracking number."],
  ["Creator confirms the product arrived", "The 7-day posting time starts here. If the courier says delivered, it confirms itself after 48 hours."],
  ["Creator sends files, you approve", "We remind them on day 3 and 6. Not delivered by day 7? Give more time or report it."],
  ["Results show in the project", "File use and ad results, the same as any project."],
];

const giftLongTermNextSteps = [...giftNextSteps.slice(0, -1), ["Results show in the project each cycle", "File use and ad results, the same as any project."]];

function ProjectSetup({ partnership, duration, projectType }: { partnership: ProjectPartnership; duration: ProjectDuration; projectType: string }) {
  const longTerm = duration === "Long-term";
  const gift = partnership === "Gift exchange";
  const complete = ["Type", "Partnership", "Duration", "Project details", "Creator requirements", "Deliverables", ...(partnership === "Paid" ? ["Budget", "Payment method"] : [])];

  return <aside className="h-fit rounded-xl border border-line bg-white p-5 xl:w-80">
    <h2 className="text-[16px] font-semibold leading-6 text-ink">Project setup</h2>
    <p className="text-[12px] leading-4 text-secondary">Shapes your dashboard</p>
    <dl className="mt-4 space-y-3 text-[13px] leading-5">
      <div className="flex justify-between gap-3"><dt className="text-secondary">Target</dt><dd className="text-right text-[14px] font-medium leading-[22px] text-ink">{projectType === "Influencer marketing" ? "₹6,00,000 net sales" : longTerm ? "20 usable videos a cycle" : "20 usable videos"}</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-secondary">Type</dt><dd className="text-[14px] font-medium leading-[22px] text-ink">{projectType}</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-secondary">Partnership</dt><dd className="text-[14px] font-medium leading-[22px] text-ink">{partnership}</dd></div>
      <div className="flex justify-between gap-3"><dt className="text-secondary">Duration</dt><dd className="text-right text-[14px] font-medium leading-[22px] text-ink">{longTerm ? gift ? "Long-term · 1 Dec – 28 Feb" : "Long-term · 7 Oct – 6 Jan" : gift ? "One-time · 1 Dec – 31 Dec" : "One-time · 7 Oct – 7 Nov"}</dd></div>
    </dl>
    <div className="my-4 h-px bg-line" />
    <div className="space-y-3">
      {complete.map((item) => <p className="flex items-center gap-2.5 text-[13px] leading-5 text-ink" key={item}><CheckCircle2 className="text-success" size={16} />{item}</p>)}
      <p className="flex items-center gap-2.5 text-[14px] font-medium leading-[22px] text-primary"><CircleCheck size={16} />Review &amp; publish</p>
    </div>
  </aside>;
}

export function BrandProjectPublishedPage() {
  const navigate = useNavigate();
  const { partnership, duration, projectType } = useProjectFlow();
  const longTerm = duration === "Long-term";
  const gift = partnership === "Gift exchange";
  const projectName = gift ? longTerm ? "Lip Care UGC Club" : "Winter Lip Care UGC" : longTerm ? "Monthly UGC Pack" : "Glow Edit UGC Pack";
  const nextSteps = gift ? longTerm ? giftLongTermNextSteps : giftNextSteps : longTerm ? longTermNextSteps : standardNextSteps;
  const applyBy = gift ? "20 Nov" : "12 Oct";
  const publicationMessage = gift ? `Nothing was charged, gift projects are free.${longTerm ? " The same deliverables repeat every monthly cycle." : ""}` : `Nothing is charged until you invite a creator.${longTerm ? " Fees are charged at the start of each monthly cycle." : ""}`;

  return <BrandShell><div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
    <header className="flex items-end justify-between gap-4">
      <div><p className="text-[12px] leading-4 text-tertiary">Projects&nbsp;&nbsp;/&nbsp;&nbsp;{projectName}</p><h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">Project published</h1><p className="text-[13px] leading-5 text-secondary">{projectName} · {partnership} · {duration} · published just now</p></div>
      <Button kind="ghost" leadingIcon={<X size={16} />} onClick={() => navigate(ROUTES.brand)}>Exit</Button>
    </header>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]"><motion.section animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7" initial={{ opacity: 0, y: 8 }} transition={{ duration: .24, ease: "easeOut" }}>
      <div className="flex items-center gap-3.5"><span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-success-bg text-success"><Check size={20} strokeWidth={3} /></span><div className="min-w-0"><h2 className="text-[22px] font-semibold leading-7 text-ink">{projectName} is published</h2><p className="mt-1 text-[14px] leading-[22px] text-secondary">Creators can apply until {applyBy}. {publicationMessage}</p></div></div>
      <section className="mt-5 overflow-hidden rounded-xl border border-line"><header className="px-5 pb-3 pt-4"><h3 className="text-[16px] font-semibold leading-6 text-ink">What happens next</h3><p className="mt-0.5 text-[13px] leading-5 text-secondary">Every {gift ? "gift" : "project"} runs the same way. Floooww reminds both sides at each step.</p></header>
        <ol>{nextSteps.map(([title, description], index) => <li className="flex gap-3.5 border-t border-muted px-5 py-3" key={title}><span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-primary-subtle text-[12px] font-semibold text-primary">{index + 1}</span><div><h4 className="text-[14px] font-medium leading-5 text-ink">{title}</h4><p className="mt-0.5 text-[13px] leading-5 text-secondary">{description}</p></div></li>)}</ol>
      </section>
      <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5"><Button kind="secondary" onClick={() => navigate(ROUTES.brand)}>Back to projects</Button><div className="flex-1" /><Button kind="ghost" onClick={() => navigate(ROUTES.brand)}>View project</Button><Button onClick={() => navigate(ROUTES.brand)}>Invite creators</Button></footer>
    </motion.section><ProjectSetup partnership={partnership} duration={duration} projectType={projectType} /></div>
  </div></BrandShell>;
}
