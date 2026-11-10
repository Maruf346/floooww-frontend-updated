import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { TextField } from "@/common/components/ui/TextField";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";

export function ForgotPasswordPage() {
  const navigate = useNavigate(); const [email, setEmail] = useState(""); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); if (!email.includes("@")) { setError("Enter the email linked to your account."); return; } setSent(true); };
  return <AuthLayout><div className="w-full max-w-[440px]">{sent ? <><div className="grid size-12 place-items-center rounded-xl bg-primary-subtle text-primary"><Mail size={22} /></div><h1 className="mt-4 font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">Check your inbox</h1><p className="mt-2 text-[15px] leading-[22px] text-[#6b7280]">We sent a reset link to {email}. It expires in 30 minutes.</p><Button fullWidth className="mt-5 rounded-[8px]" onClick={() => navigate(ROUTES.resetPassword)}>Open email app</Button><div className="mt-4 rounded-xl border border-primary-muted bg-primary-tint p-[14px] text-[13px] leading-5 text-body"><p className="font-semibold text-ink">Not in your inbox?</p><p className="mt-1">Check spam or promotions, or ask your IT team to allow emails from floooww.com.</p></div><button type="button" className="mt-4 text-[13px] font-semibold text-link hover:underline" onClick={() => setSent(false)}>Use a different email</button></> : <form onSubmit={submit} noValidate><h1 className="font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">Reset your password</h1><p className="mt-2 text-[15px] leading-[22px] text-[#6b7280]">Enter the email you use for Floooww and we’ll send you a link to set a new password.</p><div className="mt-5"><TextField label="Email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ananya@glowlyskincare.in" error={error} /></div><Button type="submit" fullWidth className="mt-4 rounded-[8px]">Send reset link</Button><Link className="mt-4 inline-block text-[13px] font-semibold text-link hover:underline" to={ROUTES.login}>Back to login</Link></form>}</div></AuthLayout>;
}
