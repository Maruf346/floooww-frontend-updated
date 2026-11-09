import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { Button } from "@/common/components/ui/Button";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";

interface DashboardPlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Temporary shell for role dashboards until their Figma screens are implemented. */
export function DashboardPlaceholder({
  title,
  description,
  icon: Icon,
}: DashboardPlaceholderProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-subtle">
      <header className="border-b border-line-subtle bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-[18px] sm:px-8">
          <Link to={ROUTES.home} aria-label="Floooww home" className="rounded-sm">
            <Logo variant="nav" />
          </Link>
          <Button
            to={ROUTES.home}
            kind="ghost"
            size="s"
            leadingIcon={<ArrowLeft size={16} strokeWidth={2} />}
          >
            Back to site
          </Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <motion.div
          className="flex max-w-[440px] flex-col items-center rounded-xl border border-line bg-white px-8 py-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <span className="flex size-12 items-center justify-center rounded-lg bg-primary-subtle text-primary">
            <Icon size={20} strokeWidth={2} aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-inter-bold text-[26px] font-bold leading-[34px] text-ink">
            {title}
          </h1>
          <p className="mt-2 text-[14px] leading-[22px] text-body">{description}</p>
        </motion.div>
      </main>
    </div>
  );
}
