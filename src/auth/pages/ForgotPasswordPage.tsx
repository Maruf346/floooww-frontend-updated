import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { TextField } from "@/common/components/ui/TextField";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";

export function ForgotPasswordPage() {
  const navigate = useNavigate(); const [email, setEmail] = useState(""); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); if (!email.includes("@")) { setError("Enter the email linked to your account."); return; } setSent(true); };
  return <AuthLayout><div className="w-full max-w-[440px]">{sent ? <><div className="grid size-12 place-items-center rounded-xl bg-primary-subtle text-primary"><Mail size={22} /></div><h1 className="mt-4 font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">Check your inbox</h1><p className="mt-2 text-[14px] leading-[22px] text-body">We sent a reset link to {email}. It expires in 30 minutes.</p><div className="mt-5 rounded-xl border border-primary-muted bg-primary-tint p-4 text-[13px] leading-5 text-body"><p className="font-semibold text-ink">Can’t find the email?</p><p className="mt-1">Check spam or promotions, then try sending a fresh link.</p></div><Button fullWidth className="mt-4" onClick={() => navigate(ROUTES.resetPassword)}>I have my reset code <ArrowRight size={16} /></Button><button type="button" className="mt-4 text-[13px] font-medium text-link hover:underline" onClick={() => setSent(false)}>Use a different email</button></> : <form onSubmit={submit} noValidate><Link to={ROUTES.login} className="inline-flex items-center gap-1 text-[13px] font-medium text-link hover:underline"><ArrowLeft size={15} />Back to login</Link><h1 className="mt-4 font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">Forgot password?</h1><p className="mt-2 text-[14px] leading-[22px] text-body">Enter your email and we’ll send a link to reset your password.</p><div className="mt-5"><TextField label="Email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" error={error} /></div><Button type="submit" fullWidth className="mt-4" trailingIcon={<ArrowRight size={16} />}>Send reset link</Button></form>}</div></AuthLayout>;
}
