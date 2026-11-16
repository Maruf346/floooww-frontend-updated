import { useState } from "react";
import { ChevronDown, ChevronRight, FileBarChart, FilePenLine, Info, Search } from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";

const sortOptions = ["Last modified (newest)", "Last modified (oldest)", "Name (A–Z)"];

export function BrandCustomReportsPage() {
  const [sort, setSort] = useState(sortOptions[0]);
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <BrandShell>
      <div className="w-full pb-10">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-ink">
            Reports
          </h1>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            Create, manage and reopen your custom influencer marketing reports.
          </p>
        </motion.header>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="mt-7"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.42, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[16px] font-semibold leading-6 text-ink">Start a new report</h2>
          <p className="mt-3 flex items-center gap-1.5 text-[13px] leading-5 text-secondary">
            <Info size={14} strokeWidth={1.8} />
            Your reports save automatically as you build them.
          </p>

          <button
            className="mt-3 flex w-full items-center gap-3.5 rounded-xl border border-line bg-white px-5 py-[18px] text-left transition hover:border-primary/35 hover:bg-primary-subtle/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            type="button"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-subtle text-primary">
              <FilePenLine size={18} strokeWidth={1.9} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium leading-[22px] text-ink">
                Blank report
              </span>
              <span className="block text-[12px] leading-4 text-secondary">
                Create a new custom report from scratch.
              </span>
            </span>
            <ChevronRight aria-hidden="true" className="shrink-0 text-secondary" size={16} />
          </button>
        </motion.section>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="mt-7"
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.44, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="text-[16px] font-semibold leading-6 text-ink">Saved reports</h2>
              <p className="mt-1 text-[13px] leading-5 text-secondary">
                Reopen and manage your saved reports.
              </p>
            </div>

            <label className="flex h-10 w-full items-center gap-2 rounded-md border border-line bg-white px-3 text-secondary sm:w-[240px]">
              <Search size={16} strokeWidth={1.8} />
              <input
                aria-label="Search reports"
                className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-ink outline-none placeholder:text-tertiary"
                placeholder="Search reports…"
                type="search"
              />
            </label>

            <div className="relative w-full sm:w-[220px]">
              <button
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
                className="flex h-10 w-full items-center gap-2 rounded-md border border-line bg-white px-3 text-left text-[13px] leading-5 text-ink transition hover:bg-subtle"
                onClick={() => setSortOpen((open) => !open)}
                type="button"
              >
                <span className="min-w-0 flex-1 truncate">{sort}</span>
                <ChevronDown
                  className={sortOpen ? "rotate-180 transition-transform" : "transition-transform"}
                  size={16}
                />
              </button>
              {sortOpen && (
                <div
                  className="absolute right-0 top-[calc(100%+6px)] z-[60] w-full rounded-lg border border-line bg-white p-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
                  role="listbox"
                >
                  {sortOptions.map((option) => (
                    <button
                      aria-selected={option === sort}
                      className={
                        "w-full rounded-md px-2.5 py-2 text-left text-[13px] leading-5 " +
                        (option === sort
                          ? "bg-primary-subtle text-primary"
                          : "text-ink hover:bg-subtle")
                      }
                      key={option}
                      onClick={() => {
                        setSort(option);
                        setSortOpen(false);
                      }}
                      role="option"
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex min-h-[188px] flex-col items-center justify-center rounded-xl border border-line bg-white px-6 py-12 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-subtle text-secondary">
              <FileBarChart size={22} strokeWidth={1.7} />
            </span>
            <h3 className="mt-2.5 text-[14px] font-semibold leading-5 text-ink">
              No saved reports yet
            </h3>
            <p className="mt-1 text-[13px] leading-5 text-secondary">
              Start a blank report above. It appears here as soon as you pick something.
            </p>
          </div>
        </motion.section>
      </div>
    </BrandShell>
  );
}
