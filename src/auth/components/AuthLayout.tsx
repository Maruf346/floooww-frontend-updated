import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { ASSETS } from "@/common/constants/assets";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
  visual?: "auth" | "onboarding";
}

/** Shared 1440px auth/onboarding canvas. The decorative pane is hidden on smaller screens. */
export function AuthLayout({ children, className, visual = "auth" }: AuthLayoutProps) {
  return (
    <div className="min-h-dvh bg-white">
      <div className="grid min-h-dvh lg:grid-cols-2">
        <section className="relative flex min-h-dvh flex-col px-5 pb-10 pt-8 sm:px-10 lg:px-[80px] lg:pb-[40px] lg:pt-[40px]">
          <header className="flex items-center justify-between">
            <Link to={ROUTES.home} aria-label="Floooww home" className="rounded-sm"><Logo variant="nav" /></Link>
            <Link to={ROUTES.home} className="inline-flex items-center gap-1.5 text-[13px] font-medium leading-5 text-body transition-colors hover:text-ink lg:hidden">
              <ArrowLeft size={16} aria-hidden="true" /> Back to site
            </Link>
          </header>
          <main className="flex flex-1 items-center justify-center py-12 lg:py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE_OUT }} className={className ?? "w-full max-w-[440px]"}>
              {children}
            </motion.div>
          </main>
          <footer className="text-[12px] leading-4 text-tertiary">
            © 2026 Floooww Limited · <Link className="hover:text-ink" to={ROUTES.terms}>Terms</Link> · <Link className="hover:text-ink" to={ROUTES.privacy}>Privacy</Link> · <Link className="hover:text-ink" to={ROUTES.help}>Help</Link>
          </footer>
        </section>
        <AuthVisual variant={visual} />
      </div>
    </div>
  );
}

function AuthVisual({ variant }: { variant: "auth" | "onboarding" }) {
  if (variant === "onboarding") return <OnboardingVisual />;
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-[linear-gradient(128.66deg,#014ef6_14.286%,#1eb2fd_85.714%)] lg:block">
      <div className="absolute -right-[220px] -top-[120px] size-[520px] rounded-full bg-white/10" />
      <div className="absolute -bottom-[120px] -left-[160px] size-[460px] rounded-full bg-[#013cbd]/20" />
      <div className="absolute bottom-[80px] left-[42%] size-[300px] rounded-full bg-[#a7ddff]/15" />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT }} className="absolute left-[10%] top-[19.8%]">
        <h2 className="font-inter-semibold text-[36px] font-semibold leading-[44px] text-white">Find the right creators.<br />Run the whole project.</h2>
        <p className="mt-4 max-w-[500px] text-[16px] leading-6 text-white/85">Brief, approve, track and pay in one place. Every payment waits safely in escrow until the content is approved.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.22 }} className="absolute left-[10%] top-[43.8%] flex w-[340px] items-center gap-3 rounded-[18px] bg-white px-4 py-3.5 shadow-[0_20px_44px_rgba(5,15,64,.22)]">
        <img className="size-10 rounded-full object-cover" src={ASSETS.hero.avatarAditi} alt="Aditi Sharma" /><div className="min-w-0 flex-1"><p className="text-[14px] font-semibold text-ink">Aditi Sharma</p><p className="truncate text-[12px] text-[#6b7280]">Beauty · Mumbai · 4.2 L followers</p></div><span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[12px] font-semibold text-[#15803d]">96% match</span>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.4 }} className="absolute left-[48.9%] top-[54.45%] rounded-[18px] bg-white px-[18px] py-4 shadow-[0_20px_44px_rgba(5,15,64,.22)]"><div className="grid size-8 place-items-center rounded-lg bg-primary text-white"><ArrowUpRight size={16} /></div><p className="mt-1.5 text-[12px] text-[#6b7280]">Tracked net sales</p><p className="text-[24px] font-semibold text-ink">₹6,99,200</p><p className="text-[12px] font-medium text-[#16a34a]">↑ 31% vs prev. 28 days</p></motion.div>
      <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.55 }} className="absolute left-[10%] top-[73.2%] flex w-[360px] items-center gap-3 rounded-[18px] bg-white px-4 py-3.5 shadow-[0_20px_44px_rgba(5,15,64,.22)]"><span className="grid size-9 place-items-center rounded-[10px] bg-[#fef3c7] text-[16px] font-semibold text-[#b45309]">₹</span><div><p className="text-[14px] font-semibold text-ink">₹1,86,000 held in escrow</p><p className="text-[12px] text-[#6b7280]">Released 2 working days after approval</p></div></motion.div>
      <div className="absolute left-[83.33%] top-[43.8%] space-y-5">{(["Instagram", "YouTube", "Snapchat", "Pinterest"] as const).map((platform) => <motion.div key={platform} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.35 }} className="grid size-[52px] place-items-center rounded-2xl bg-white shadow-[0_20px_44px_rgba(5,15,64,.22)]"><PlatformLogo platform={platform} size={24} /></motion.div>)}</div>
    </aside>
  );
}

function OnboardingVisual() { return <aside className="relative hidden overflow-hidden bg-[linear-gradient(145deg,#7399f2,#2563eb)] lg:block"><div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,.35),transparent_26%)]" /><div className="absolute left-[12%] top-[22%] rounded-[24px] border border-white/40 bg-white/15 p-5 shadow-[0_30px_80px_rgba(2,24,92,.25)]"><div className="rounded-[18px] bg-white p-6"><p className="text-[12px] font-semibold tracking-[.12em] text-primary">SETUP</p><p className="mt-1 text-[22px] font-bold text-ink">Ready for your first project.</p></div></div></aside>; }
