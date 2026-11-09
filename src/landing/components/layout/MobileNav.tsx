import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { EASE_OUT } from "@/common/constants/motion";
import { useLockBodyScroll } from "@/common/hooks/useLockBodyScroll";
import { cn } from "@/common/utils/cn";
import { AUTH_NAV, PRIMARY_NAV } from "@/landing/data/navigation";

interface MobileNavProps {
  open: boolean;
  activeSection: string | null;
  onClose: () => void;
}

export function MobileNav({ open, activeSection, onClose }: MobileNavProps) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            aria-hidden="true"
            className="fixed inset-x-0 bottom-0 top-[75px] z-40 bg-ink/20 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.nav
            key="panel"
            id="mobile-nav"
            aria-label="Main"
            className="absolute inset-x-0 top-full z-50 origin-top border-b border-line-subtle bg-white px-5 pb-6 pt-2 shadow-lg sm:px-8 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <motion.ul
              className="flex flex-col"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              {PRIMARY_NAV.map((item) => (
                <motion.li
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: -6 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between border-b border-line-subtle py-3.5 font-inter-medium text-[16px] font-medium leading-[22px] transition-colors",
                      item.sectionId && item.sectionId === activeSection
                        ? "text-primary"
                        : "text-ink",
                    )}
                  >
                    {item.label}
                    <ArrowRight
                      size={18}
                      strokeWidth={2}
                      className="text-icon-muted"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button to={AUTH_NAV.login.to} kind="secondary" fullWidth onClick={onClose}>
                {AUTH_NAV.login.label}
              </Button>
              <Button
                to={AUTH_NAV.signup.to}
                kind="primary"
                shape="pill"
                fullWidth
                onClick={onClose}
              >
                {AUTH_NAV.signup.label}
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
