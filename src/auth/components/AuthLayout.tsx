import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-b from-subtle to-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-[18px] sm:px-8 lg:px-12 xl:px-[100px]">
        <Link to={ROUTES.home} aria-label="Floooww home" className="rounded-sm">
          <Logo variant="nav" />
        </Link>
        <Link
          to={ROUTES.home}
          className="inline-flex items-center gap-1.5 font-inter-medium text-[14px] font-medium leading-[22px] text-body transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          Back to site
        </Link>
      </div>

      <main className="flex flex-1 items-start justify-center px-5 pb-16 pt-6 sm:items-center sm:pt-0">
        <motion.div
          className="w-full max-w-[420px] rounded-xl border border-line bg-white p-6 shadow-lg sm:p-8"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <h1 className="font-inter-bold text-[26px] font-bold leading-[34px] text-ink">{title}</h1>
          <p className="mt-1.5 text-[14px] leading-[22px] text-body">{subtitle}</p>
          <div className="mt-6">{children}</div>
          <div className="mt-6 border-t border-line-subtle pt-5 text-center text-[13px] leading-5 text-body">
            {footer}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
