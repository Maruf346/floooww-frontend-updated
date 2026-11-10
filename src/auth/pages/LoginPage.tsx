import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, CircleUserRound } from "lucide-react";
import type { UserRole } from "@/common/types";
import { Button } from "@/common/components/ui/Button";
import { TextField } from "@/common/components/ui/TextField";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";
import { ROLE_HOME, parseRole } from "@/auth/data/roles";

const roles: { value: UserRole; label: string }[] = [
  { value: "brand", label: "Brand" }, { value: "creator", label: "Creator" }, { value: "agency", label: "Agency" },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [role, setRole] = useState<UserRole>(parseRole(params.get("role")) ?? "brand");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<"email" | "password", string>>>({});
  const onSubmit = (event: FormEvent) => {
    event.preventDefault(); const next: typeof errors = {};
    if (!email.includes("@")) next.email = "Enter the email you signed up with.";
    if (!password) next.password = "Enter your password.";
    setErrors(next); if (!Object.keys(next).length) navigate(ROLE_HOME[role]);
  };
  return <AuthLayout><form noValidate onSubmit={onSubmit} className="w-full max-w-[440px]">
    <h1 className="font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">Log in</h1>
    <p className="mt-2 text-[14px] leading-[22px] text-body">Welcome back. Use the email you signed up with.</p>
    <div className="mt-4 grid grid-cols-3 rounded-xl bg-subtle p-1" role="tablist" aria-label="Workspace type">
      {roles.map((item) => <button key={item.value} type="button" role="tab" aria-selected={role === item.value} onClick={() => setRole(item.value)} className={`h-[34px] rounded-lg text-[13px] font-medium transition-all ${role === item.value ? "bg-white text-ink shadow-sm" : "text-secondary hover:text-ink"}`}>{item.label}</button>)}
    </div>
    <Button type="button" kind="secondary" fullWidth className="mt-4" leadingIcon={<CircleUserRound size={17} />}>Continue with Google</Button>
    <Divider />
    <div className="space-y-3.5"><TextField label="Email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" error={errors.email} /><TextField label="Password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} error={errors.password} /></div>
    <div className="mt-4 flex items-center justify-between"><button type="button" onClick={() => setKeepLoggedIn((value) => !value)} className="flex items-center gap-2 text-[13px] text-body"><span className={`grid size-[18px] place-items-center rounded-[5px] border transition-colors ${keepLoggedIn ? "border-ink bg-ink text-white" : "border-line-strong bg-white"}`}>{keepLoggedIn && <Check size={13} strokeWidth={3} />}</span>Keep me logged in</button><Link className="text-[13px] font-medium text-link hover:underline" to={ROUTES.forgotPassword}>Forgot password?</Link></div>
    <Button type="submit" fullWidth className="mt-4" trailingIcon={<ArrowRight size={16} />}>Log in</Button>
    <p className="mt-4 text-center text-[13px] leading-5 text-body">New to Floooww? <Link to={ROUTES.signup} className="font-medium text-link hover:underline">Sign up free</Link></p>
  </form></AuthLayout>;
}

export function Divider() { return <div className="my-4 flex items-center gap-2.5 text-[12px] text-tertiary"><span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" /></div>; }
