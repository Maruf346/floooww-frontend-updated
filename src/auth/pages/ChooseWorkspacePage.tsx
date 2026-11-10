import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";

const options = [
  { name: "Minimalist", detail: "Brand · Owner · 3 live projects", to: ROUTES.brand },
  { name: "Brightside Agency", detail: "Agency · Account manager · 5 clients · 9 live projects", to: ROUTES.agency },
];
export function ChooseWorkspacePage() { const navigate = useNavigate(); const [selected, setSelected] = useState(0); return <AuthLayout><div className="w-full max-w-[440px]"><h1 className="font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">Choose a workspace</h1><p className="mt-2 text-[14px] leading-[22px] text-body">Your email is part of more than one Floooww workspace.</p><div className="mt-5 space-y-3">{options.map((option, index) => <button key={option.name} type="button" onClick={() => setSelected(index)} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${selected === index ? "border-primary bg-primary-subtle" : "border-line hover:border-line-strong"}`}><span className={`grid size-5 place-items-center rounded-full border ${selected === index ? "border-primary bg-primary text-white" : "border-line-strong"}`}>{selected === index && <Check size={13} strokeWidth={3} />}</span><span><span className="block text-[15px] font-semibold text-ink">{option.name}</span><span className="mt-1 block text-[13px] leading-5 text-body">{option.detail}</span></span></button>)}</div><button type="button" className="mt-4 text-[13px] font-medium text-link hover:underline">+ Add a workspace</button><Button fullWidth className="mt-4" onClick={() => navigate(options[selected].to)} trailingIcon={<ArrowRight size={16} />}>Continue</Button></div></AuthLayout>; }
