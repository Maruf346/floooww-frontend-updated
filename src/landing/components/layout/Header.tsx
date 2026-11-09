import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { EASE_OUT } from "@/common/constants/motion";
import { ROUTES } from "@/common/constants/routes";
import { useScrolled } from "@/common/hooks/useScrolled";
import { cn } from "@/common/utils/cn";
import { AUTH_NAV, PRIMARY_NAV } from "@/landing/data/navigation";
import { useActiveSection } from "@/landing/hooks/useActiveSection";
import { MobileNav } from "./MobileNav";

const SECTION_IDS = PRIMARY_NAV.flatMap((item) => (item.sectionId ? [item.sectionId] : []));

/** Figma "Nav" (840:3859): white, 1 px #EDEFF3 bottom border, 100 px gutters, 18 px vertical padding. */
export function Header() {
  const scrolled = useScrolled(4);
  const activeSection = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line-subtle bg-white transition-shadow duration-500 ease-out",
        scrolled && "shadow-[0_10px_30px_-18px_rgba(8,10,20,0.18)]",
      )}
    >
      <motion.div
        className="mx-auto flex w-full max-w-[1440px] items-center px-5 py-[18px] sm:px-8 lg:px-12 xl:px-[100px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
      >
        <Link to={ROUTES.home} aria-label="Floooww home" className="shrink-0 rounded-sm">
          <Logo variant="nav" />
        </Link>

        <div className="min-w-px flex-1" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-start gap-9">
            {PRIMARY_NAV.map((item) => {
              const active = Boolean(item.sectionId) && item.sectionId === activeSection;
              return (
                <li key={item.label} className="relative">
                  <Link
                    to={item.to}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "font-inter-medium text-[14px] font-medium leading-[22px] whitespace-nowrap transition-colors duration-300",
                      active ? "text-ink" : "text-body hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-px flex-1" />

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            to={AUTH_NAV.login.to}
            className="font-inter-medium text-[14px] font-medium leading-[22px] whitespace-nowrap text-body transition-colors duration-300 hover:text-ink"
          >
            {AUTH_NAV.login.label}
          </Link>
          <Link
            to={AUTH_NAV.signup.to}
            className="rounded-full bg-primary px-5 py-2.5 font-inter-medium text-[14px] font-medium leading-5 whitespace-nowrap text-white transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-primary-hover hover:shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] active:scale-[0.98]"
          >
            {AUTH_NAV.signup.label}
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 flex size-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-subtle lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <motion.span
            key={menuOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.25 }}
          >
            {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </motion.span>
        </button>
      </motion.div>

      <MobileNav open={menuOpen} activeSection={activeSection} onClose={closeMenu} />
    </header>
  );
}
