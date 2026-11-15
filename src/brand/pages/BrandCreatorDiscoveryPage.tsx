import { useState } from "react";
import {
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  GitCompareArrows,
  Search,
  SearchX,
  UserRoundPlus,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";

const initialFilters = [
  "Platform: Instagram",
  "Followers: 5 L+",
  "Engagement: 3%+",
  "Audience: women 18–34",
  "Location: India · metros",
  "Niche: Beauty, Skincare",
  "Language: Kannada",
  "Fee: up to ₹20K",
  "Past results",
];

const matchWeights = [
  ["Niche fit", 90],
  ["Audience fit", 85],
  ["Engagement quality", 80],
  ["Past results (ROAS)", 75],
] as const;

const shortlist = [
  ["Meera Iyer", "@meerabeauty", "meera-iyer"],
  ["Ishita Rao", "@ishitarao", "ishita-rao"],
  ["Riya Sen", "@riyasen", "kavya-reddy"],
] as const;

const recentSearches = [
  "Skincare micro-creators Bengaluru",
  "Beauty creators 50K–2 L",
  "Kannada skincare",
  "Festive GRWM Reels",
];

export function BrandCreatorDiscoveryPage() {
  const [query, setQuery] = useState("Kannada skincare creators");
  const [filters, setFilters] = useState<string[]>(initialFilters);

  const clearFilters = () => {
    setFilters([]);
    setQuery("");
  };

  return (
    <BrandShell>
      <div className="w-full pb-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-ink">
              Creator discovery
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-secondary">
              3,84,200 creators · match scores are for Vitamin-C Serum
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button kind="secondary" leadingIcon={<Bookmark size={16} />}>
              Saved lists
            </Button>
            <Button kind="secondary" leadingIcon={<GitCompareArrows size={16} />}>
              Compare (2)
            </Button>
          </div>
        </header>

        <section className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_320px]">
          <label className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3">
            <Search size={16} className="shrink-0 text-secondary" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search creators"
              className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-ink outline-none placeholder:text-tertiary"
              placeholder="Search creators"
            />
          </label>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-md border border-line bg-white px-3 text-left text-[13px] leading-5 text-ink transition hover:bg-subtle"
          >
            <span className="min-w-0 flex-1 truncate">Match for: Vitamin-C Serum</span>
            <ChevronDown size={16} className="shrink-0 text-secondary" />
          </button>
        </section>

        <div className="mt-3 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isSecondary = filter === "Language: Kannada" || filter === "Past results";
            return (
              <button
                type="button"
                key={filter}
                onClick={() => setFilters((items) => items.filter((item) => item !== filter))}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] leading-5 transition ${isSecondary ? "border-line bg-white text-ink hover:bg-subtle" : "border-primary bg-primary-subtle text-primary hover:bg-[#e7edff]"}`}
              >
                {filter}
                <X size={14} strokeWidth={2} />
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <section className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h2 className="text-[16px] font-semibold leading-6 text-ink">
                0 creators match · stats from the last 30 days
              </h2>
              <span className="hidden flex-1 xl:block" />
              <button
                type="button"
                className="text-[14px] font-medium leading-[22px] text-secondary transition hover:text-ink"
              >
                Sort: Match %
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 flex min-h-[292px] flex-col items-center justify-center rounded-xl border border-line bg-white px-5 py-12 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="grid size-[52px] place-items-center rounded-full bg-muted text-secondary"
              >
                <SearchX size={24} strokeWidth={1.75} />
              </motion.div>
              <h3 className="mt-4 text-[16px] font-semibold leading-6 text-ink">
                No creators match all your filters
              </h3>
              <p className="mt-1 max-w-[540px] text-[14px] leading-[22px] text-secondary">
                Kannada skincare creators with 5 L+ followers are rare. Try one of these:
              </p>
              <Button
                kind="secondary"
                className="mt-4"
                leadingIcon={<X size={16} />}
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            </motion.div>
          </section>

          <aside className="space-y-4 xl:sticky xl:top-6">
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-line bg-white p-5"
            >
              <h2 className="text-[16px] font-semibold leading-6 text-ink">Match settings</h2>
              <p className="text-[12px] leading-4 text-secondary">Weights for this project</p>
              <div className="mt-4 space-y-4">
                {matchWeights.map(([label, value]) => (
                  <div key={label}>
                    <div className="flex items-start gap-2">
                      <p className="min-w-0 flex-1 text-[13px] leading-5 text-ink">{label}</p>
                      <p className="text-[14px] font-medium leading-[22px] text-primary">
                        {value}%
                      </p>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <section className="rounded-xl border border-line bg-white p-5">
              <h2 className="text-[16px] font-semibold leading-6 text-ink">Saved shortlist</h2>
              <p className="text-[12px] leading-4 text-secondary">
                3 creators · for Vitamin-C Serum
              </p>
              <div className="mt-4 space-y-3">
                {shortlist.map(([name, handle, avatar]) => (
                  <div className="flex items-center gap-2.5" key={handle}>
                    <img
                      src={`/assets/creators/${avatar}.png`}
                      alt=""
                      className="size-8 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium leading-[22px] text-ink">
                        {name}
                      </p>
                      <p className="truncate text-[12px] leading-4 text-secondary">{handle}</p>
                    </div>
                    <Check size={14} className="shrink-0 text-success" strokeWidth={2.5} />
                  </div>
                ))}
              </div>
              <Button className="mt-4 w-full" leadingIcon={<UserRoundPlus size={16} />}>
                Invite all 3
              </Button>
            </section>

            <section className="rounded-xl border border-line bg-white p-5">
              <h2 className="text-[16px] font-semibold leading-6 text-ink">Recent searches</h2>
              <div className="mt-4 space-y-2">
                {recentSearches.map((search) => (
                  <button
                    type="button"
                    key={search}
                    onClick={() => setQuery(search)}
                    className="flex w-full items-center gap-2 rounded-md bg-subtle px-2.5 py-2 text-left text-[13px] leading-5 text-ink transition hover:bg-muted"
                  >
                    <Clock3 size={14} className="shrink-0 text-secondary" />
                    <span className="truncate">{search}</span>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </BrandShell>
  );
}
