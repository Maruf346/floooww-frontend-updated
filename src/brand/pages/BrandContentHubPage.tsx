import { useState } from "react";
import { FolderOpen, ImageIcon, Plus } from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { ROUTES } from "@/common/constants/routes";
import { Button } from "@/common/components/ui/Button";

const contentTabs = [
  "All",
  "To review",
  "Changes requested",
  "Approved",
  "Live",
  "Ad-ready assets",
] as const;

export function BrandContentHubPage() {
  const [activeTab, setActiveTab] = useState<(typeof contentTabs)[number]>("All");

  return (
    <BrandShell>
      <div className="w-full pb-10">
        <header>
          <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-ink">
            Content hub
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            Every post, file and video from all your projects · with usage rights and results
          </p>
        </header>

        <nav
          aria-label="Content status"
          className="mt-4 flex gap-6 overflow-x-auto border-b border-line [scrollbar-width:none]"
        >
          {contentTabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                className={`relative flex shrink-0 items-center gap-1.5 pb-3 text-[14px] leading-[22px] transition ${active ? "font-medium text-primary" : "text-secondary hover:text-ink"}`}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
                <span
                  className={`rounded-full px-[7px] py-px text-[12px] font-medium leading-4 ${active ? "bg-primary-subtle text-primary" : "bg-muted text-secondary"}`}
                >
                  0
                </span>
                {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
              </button>
            );
          })}
        </nav>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex min-h-[332px] flex-col items-center justify-center rounded-xl border border-line bg-white px-5 py-16 text-center"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="grid size-[60px] place-items-center rounded-full bg-muted text-secondary"
            initial={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageIcon size={28} strokeWidth={1.7} />
          </motion.div>
          <h2 className="mt-3 text-[16px] font-semibold leading-6 text-ink">No content yet</h2>
          <p className="mt-1 max-w-[520px] text-[14px] leading-[22px] text-secondary">
            Posts and UGC files from all your projects land here once creators send them, with their
            usage rights and results.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button
              kind="secondary"
              leadingIcon={<FolderOpen size={16} />}
              to={ROUTES.brandProjects}
            >
              Go to projects
            </Button>
            <Button leadingIcon={<Plus size={16} />} to={ROUTES.brandNewProject}>
              Create new project
            </Button>
          </div>
        </motion.section>
      </div>
    </BrandShell>
  );
}
