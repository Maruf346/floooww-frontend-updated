import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, CircleUserRound } from "lucide-react";
import type { UserRole } from "@/common/types";
import { Button } from "@/common/components/ui/Button";
import { TextField } from "@/common/components/ui/TextField";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";
import { parseRole } from "@/auth/data/roles";
import { Divider } from "./LoginPage";

const roleCopy: Record<UserRole, { option: string; description: string; title: string; subtitle: string }> = {
  brand: { option: "I’m a brand", description: "Find creators, run paid or gift projects, track sales and pay safely through escrow. Needs a work email.", title: "Create your brand account", subtitle: "Use your work email so your team can join the same workspace." },
  creator: { option: "I’m a creator", description: "Find projects that fit you and get paid through escrow. A 10% fee + GST comes off only completed orders. Any email works.", title: "Join as a creator", subtitle: "Free to join. Brands pay you through escrow; a 10% fee + GST comes off only completed orders." },
  agency: { option: "I’m an agency", description: "Run creator projects for several brands from one login. Add each client, invite your team and report across all of them.", title: "Create your agency account", subtitle: "Use your agency work email. You’ll add client brands and invite your team in the next steps." },
};

export function SignupPage() {
  const navigate = useNavigate(); const [params] = useSearchParams();
  const queryRole = parseRole(params.get("role"));
  const [step, setStep] = useState(queryRole ? 2 : 1);
  const [role, setRole] = useState<UserRole | null>(queryRole);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const choose = (next: UserRole) => { setRole(next); setError(""); };
  const submit = (event: FormEvent) => { event.preventDefault(); if (!name || !email.includes("@") || password.length < 8 || !accepted || !role) { setError("Complete each field and agree to the terms to continue."); return; } navigate(`${ROUTES.verifyEmail}?role=${role}&email=${encodeURIComponent(email)}`); };
  return <AuthLayout><div className="w-full max-w-[440px]">
    <Progress step={step} />
    {step === 1 ? <><p className="mt-3 text-[12px] font-semibold tracking-[.06em] text-primary">SIGN UP · STEP 1 OF 3</p><h1 className="mt-3 font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">How will you use Floooww?</h1><p className="mt-2 text-[14px] leading-[22px] text-body">Pick one. You can add another account type later from Settings.</p><div className="mt-4 space-y-3">{(Object.keys(roleCopy) as UserRole[]).map((item) => <button key={item} type="button" onClick={() => choose(item)} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all hover:border-primary ${role === item ? "border-primary bg-primary-subtle shadow-sm" : "border-line bg-white"}`}><span className={`grid size-5 shrink-0 place-items-center rounded-full border ${role === item ? "border-primary bg-primary text-white" : "border-line-strong"}`}>{role === item && <Check size={13} strokeWidth={3} />}</span><span><span className="block text-[15px] font-semibold text-ink">{roleCopy[item].option}</span><span className="mt-1 block text-[13px] leading-5 text-body">{roleCopy[item].description}</span></span></button>)}</div><Button disabled={!role} type="button" fullWidth className="mt-4" onClick={() => setStep(2)} trailingIcon={<ArrowRight size={16} />}>Continue</Button><p className="mt-4 text-center text-[13px] text-body">Already have an account? <Link className="font-medium text-link hover:underline" to={ROUTES.login}>Log in</Link></p></> : <form noValidate onSubmit={submit}>
      <p className="mt-3 text-[12px] font-semibold tracking-[.06em] text-primary">SIGN UP · STEP 2 OF 3</p><h1 className="mt-3 font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">{roleCopy[role!].title}</h1><p className="mt-2 text-[14px] leading-[22px] text-body">{roleCopy[role!].subtitle}</p>
      <Button type="button" kind="secondary" fullWidth className="mt-4" leadingIcon={<CircleUserRound size={17} />}>Continue with Google</Button><Divider />
      <div className="space-y-3.5"><TextField label="Full name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Ananya Mehta" /><TextField label={role === "creator" ? "Email" : "Work email"} required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" /><TextField label="Password" required type="password" value={password} onChange={(event) => setPassword(event.target.value)} helper="At least 8 characters." /></div>
      <button type="button" onClick={() => setAccepted((value) => !value)} className="mt-4 flex items-start gap-2 text-left text-[13px] leading-5 text-body"><span className={`mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[5px] border ${accepted ? "border-ink bg-ink text-white" : "border-line-strong"}`}>{accepted && <Check size={13} strokeWidth={3} />}</span>I agree to the <Link onClick={(event) => event.stopPropagation()} to={ROUTES.terms} className="text-link hover:underline">Terms of Service</Link> and <Link onClick={(event) => event.stopPropagation()} to={ROUTES.privacy} className="text-link hover:underline">Privacy Policy</Link>.</button>
      {error && <p role="alert" className="mt-2 text-[12px] text-danger">{error}</p>}<div className="mt-4 flex gap-3"><Button type="button" kind="secondary" onClick={() => setStep(1)} leadingIcon={<ArrowLeft size={16} />}>Back</Button><Button type="submit" fullWidth trailingIcon={<ArrowRight size={16} />}>Create free account</Button></div><p className="mt-4 text-center text-[13px] text-body">Already have an account? <Link className="font-medium text-link hover:underline" to={ROUTES.login}>Log in</Link></p>
    </form>}
  </div></AuthLayout>;
}

export function Progress({ step }: { step: number }) { return <div className="grid grid-cols-3 gap-[6px]" aria-label={`Step ${step} of 3`}>{[1, 2, 3].map((item) => <span key={item} className={`h-1 rounded-full ${item <= step ? "bg-primary" : "bg-line"}`} />)}</div>; }
