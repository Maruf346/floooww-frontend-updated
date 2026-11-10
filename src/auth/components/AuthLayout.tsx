import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
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
  return (
    <aside className="relative hidden overflow-hidden bg-[linear-gradient(145deg,#7399f2_0%,#2563eb_62%,#164ec4_100%)] lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_13%,rgba(255,255,255,.34),transparent_26%),radial-gradient(circle_at_12%_90%,rgba(0,27,113,.22),transparent_38%)]" />
      <motion.div initial={{ opacity: 0, y: 28, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }} className="absolute left-[12%] top-[18%] w-[440px] rounded-[24px] border border-white/40 bg-white/13 p-5 shadow-[0_30px_80px_rgba(2,24,92,.25)] backdrop-blur-sm">
        <div className="rounded-[18px] bg-white p-6 shadow-[0_16px_36px_rgba(14,37,93,.17)]">
          <div className="flex items-center justify-between"><div><p className="text-[12px] font-semibold tracking-[.12em] text-primary">{variant === "auth" ? "ONE FLOW" : "SETUP"}</p><p className="mt-1 text-[22px] font-bold tracking-[-.04em] text-ink">{variant === "auth" ? "Creator work, sorted." : "Ready for your first project."}</p></div><div className="grid size-11 place-items-center rounded-xl bg-primary-subtle text-primary"><Sparkles size={21} /></div></div>
          <div className="mt-6 space-y-3">{["Find the right partners", "Keep every deliverable moving", "Track results in one place"].map((item, index) => <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.42 + index * 0.12, duration: 0.45, ease: EASE_OUT }} className="flex items-center gap-3 rounded-xl bg-[#f6f8ff] px-3 py-3 text-[14px] font-medium text-body"><CheckCircle2 size={18} className="shrink-0 text-primary" />{item}</motion.div>)}</div>
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[13%] right-[10%] rounded-2xl border border-white/60 bg-white px-5 py-4 shadow-[0_16px_36px_rgba(14,37,93,.2)]"><p className="text-[12px] font-medium text-secondary">Project flow</p><p className="mt-1 text-[17px] font-bold text-ink">Everything in sync</p></motion.div>
    </aside>
  );
}
