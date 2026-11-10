import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";

const brandOptions = [
  { name: "Minimalist", detail: "Owner · 6 projects · 11 creators live", to: ROUTES.brand },
  { name: "Minimalist: Export", detail: "Admin · 1 project", to: ROUTES.brand },
];
const agencyOptions = [
  { name: "Brightside Agency", detail: "Agency · Account manager · 5 clients · 9 live projects", to: ROUTES.agency },
  { name: "Minimalist (client)", detail: "Client workspace · Approve & pay", to: ROUTES.brand },
];
export function ChooseWorkspacePage() { const navigate = useNavigate(); const [params] = useSearchParams(); const isAgency = params.get("role") === "agency"; const options = isAgency ? agencyOptions : brandOptions; const [selected, setSelected] = useState(0); return <AuthLayout><div className="w-full max-w-[440px]"><h1 className="font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">Choose a workspace</h1><p className="mt-2 text-[15px] leading-[22px] text-[#6b7280]">Your email is part of more than one Floooww workspace.</p><div className="mt-4 space-y-3">{options.map((option, index) => <button key={option.name} type="button" onClick={() => setSelected(index)} className={`flex w-full items-center gap-[14px] rounded-xl border p-[18px] text-left transition ${selected === index ? "border-2 border-primary bg-[#f0f6ff]" : "border-line bg-white hover:border-line-strong"}`}><span className={`grid size-5 place-items-center rounded-full border ${selected === index ? "border-[6px] border-primary" : "border-[1.5px] border-[#d1d5db]"}`}>{selected === index && <Check className="hidden" size={1} />}</span><span><span className="block text-[16px] font-semibold text-ink">{option.name}</span><span className="mt-1 block text-[13px] leading-5 text-[#6b7280]">{option.detail}</span></span></button>)}</div><button type="button" className="mt-4 text-[14px] font-semibold text-link hover:underline">{isAgency ? "+ Add a client" : "+ Create a new brand workspace"}</button><Button fullWidth className="mt-4 rounded-[8px]" onClick={() => navigate(options[selected].to)} trailingIcon={<ArrowRight size={16} />}>Open workspace</Button></div></AuthLayout>; }
