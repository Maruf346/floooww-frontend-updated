import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  GitCompareArrows,
  PencilLine,
  Search,
  SearchX,
  UserRoundPlus,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { Button } from "@/common/components/ui/Button";
import {
  brandCreatorInviteRoute,
  brandCreatorProfileRoute,
  ROUTES,
} from "@/common/constants/routes";
import type { Platform } from "@/common/types";

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

type DiscoveryCreator = {
  id: string;
  name: string;
  handle: string;
  city: string;
  avatar: string;
  match: number;
  platforms: [Platform, string][];
  engagement: string;
  views: string;
  audience: string;
  summary: string;
  fee: string;
  feeNote: string;
  badge?: string;
};

const matchingCreators: DiscoveryCreator[] = [
  {
    id: "sneha",
    name: "Sneha Patil",
    handle: "@snehapatil",
    city: "Pune",
    avatar: "kavya-reddy",
    match: 94,
    platforms: [
      ["Instagram", "86K"],
      ["YouTube", "14K"],
    ],
    engagement: "5.9%",
    views: "42K",
    audience: "78%",
    summary: "Skincare, beauty · 6 brand projects on Kreyio",
    fee: "Typical fee ₹12–15K",
    feeNote: "Within your ₹12,500 fee · past brands Kumkum Naturals, Velvet Leaf",
    badge: "Top creator",
  },
  {
    id: "meera",
    name: "Meera Iyer",
    handle: "@meerabeauty",
    city: "Chennai",
    avatar: "meera-iyer",
    match: 92,
    platforms: [
      ["Instagram", "1.12 L"],
      ["YouTube", "32K"],
      ["Pinterest", "12K"],
    ],
    engagement: "4.8%",
    views: "62K",
    audience: "82%",
    summary: "Skincare, beauty · 18 brand projects · 4.8 rating",
    fee: "Typical fee ₹18–24K",
    feeNote: "Above your ₹12,500 fee · past ROAS 2.9× on sales projects",
    badge: "Top creator",
  },
  {
    id: "nisha",
    name: "Nisha Verma",
    handle: "@nishaverma",
    city: "Delhi",
    avatar: "tara-bose",
    match: 91,
    platforms: [
      ["Instagram", "1.4 L"],
      ["YouTube", "58K"],
    ],
    engagement: "4.4%",
    views: "61K",
    audience: "74%",
    summary: "Beauty, lifestyle · 9 brand projects",
    fee: "Typical fee ₹18–22K",
    feeNote: "Above your fee · strong in Delhi NCR",
    badge: "Top creator",
  },
  {
    id: "riya",
    name: "Riya Sen",
    handle: "@riyasen",
    city: "Kolkata",
    avatar: "ishita-rao",
    match: 88,
    platforms: [
      ["Instagram", "54K"],
      ["Pinterest", "8K"],
    ],
    engagement: "6.8%",
    views: "27K",
    audience: "80%",
    summary: "Skincare · 4 brand projects · replies in 2 h",
    fee: "Typical fee ₹8–10K",
    feeNote: "Below your ₹12,500 fee",
  },
  {
    id: "ishita",
    name: "Ishita Rao",
    handle: "@ishitarao",
    city: "Bengaluru",
    avatar: "ishita-rao",
    match: 86,
    platforms: [
      ["Instagram", "1.1 L"],
      ["YouTube", "21K"],
    ],
    engagement: "5.1%",
    views: "54K",
    audience: "76%",
    summary: "Skincare, festive looks · 12 brand projects",
    fee: "Typical fee ₹12–15K",
    feeNote: "Within your ₹12,500 fee · delivers within 5 days",
  },
  {
    id: "aisha",
    name: "Aisha Khan",
    handle: "@aishakhan",
    city: "Mumbai",
    avatar: "emma-clarke",
    match: 83,
    platforms: [
      ["Instagram", "96K"],
      ["YouTube", "18K"],
      ["Snapchat", "16K"],
    ],
    engagement: "4.7%",
    views: "38K",
    audience: "72%",
    summary: "Beauty, fashion · 7 brand projects",
    fee: "Typical fee ₹10–14K",
    feeNote: "Within your fee · 81% audience in India",
  },
  {
    id: "tanvi",
    name: "Tanvi Shah",
    handle: "@tanvishah",
    city: "Ahmedabad",
    avatar: "kavya-reddy",
    match: 81,
    platforms: [
      ["Instagram", "78K"],
      ["Pinterest", "22K"],
    ],
    engagement: "5.1%",
    views: "21K",
    audience: "71%",
    summary: "Wellness · 3 brand projects",
    fee: "Typical fee ₹8–12K",
    feeNote: "Within your fee",
  },
  {
    id: "emma",
    name: "Emma Clarke",
    handle: "@emmaclarke",
    city: "London",
    avatar: "emma-clarke",
    match: 78,
    platforms: [
      ["Instagram", "2.4 L"],
      ["YouTube", "40K"],
      ["Snapchat", "15K"],
    ],
    engagement: "3.9%",
    views: "58K",
    audience: "58%",
    summary: "Skincare, wellness · 18% audience in India",
    fee: "Typical fee ₹35–45K",
    feeNote: "Above your fee · mostly UK audience",
  },
];

function CreatorMatchRing({ score }: { score: number }) {
  return (
    <div
      aria-label={`${score}% match`}
      className="grid size-14 shrink-0 place-items-center rounded-full"
      style={{ background: `conic-gradient(#2563eb ${score}%, #edeff3 0)` }}
    >
      <span className="grid size-11 place-items-center rounded-full bg-white text-[14px] font-medium leading-[22px] text-ink">
        {score}%
      </span>
    </div>
  );
}

function DiscoveryCreatorCard({
  creator,
  shortlisted,
  invited,
  onShortlist,
  onInvite,
  onMessage,
  onViewProfile,
}: {
  creator: DiscoveryCreator;
  shortlisted: boolean;
  invited: boolean;
  onShortlist: () => void;
  onInvite: () => void;
  onMessage: () => void;
  onViewProfile: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-w-0 flex-col gap-3.5 rounded-xl border border-line bg-white p-5"
    >
      <div className="flex h-14 items-center gap-3">
        <img
          src={`/assets/creators/${creator.avatar}.png`}
          alt=""
          className="size-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium leading-[22px] text-ink">{creator.name}</p>
          <p className="truncate text-[12px] leading-4 text-secondary">
            {creator.handle} · {creator.city}
          </p>
        </div>
        <CreatorMatchRing score={creator.match} />
      </div>

      <div className="flex min-h-5 items-center gap-1.5">
        <div className="flex min-w-0 items-center gap-2.5">
          {creator.platforms.map(([platform, followers]) => (
            <span
              className="inline-flex items-center gap-1 text-[13px] leading-5 text-ink"
              key={platform}
            >
              <PlatformLogo platform={platform} size={16} />
              {followers}
            </span>
          ))}
        </div>
        <span className="min-w-0 flex-1" />
        {creator.badge && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-muted px-2 py-0.5 text-[12px] font-medium leading-4 text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {creator.badge}
          </span>
        )}
      </div>

      <p className="text-[11px] leading-4 text-tertiary">Instagram · last 30 days</p>
      <div className="grid grid-cols-3 gap-2">
        {[
          [creator.engagement, "Eng. rate"],
          [creator.views, "Avg. views"],
          [creator.audience, "Women 18–34"],
        ].map(([value, label]) => (
          <div className="min-w-0 rounded-lg bg-subtle px-2.5 py-2" key={label}>
            <p className="truncate text-[14px] font-medium leading-[22px] text-ink">{value}</p>
            <p className="truncate text-[12px] leading-4 text-secondary">{label}</p>
          </div>
        ))}
      </div>
      <p className="min-h-5 text-[13px] leading-5 text-secondary">{creator.summary}</p>
      <div className="rounded-md bg-subtle px-3 py-2.5">
        <p className="text-[14px] font-medium leading-[22px] text-ink">{creator.fee}</p>
        <p className="mt-1 text-[12px] leading-4 text-secondary">{creator.feeNote}</p>
      </div>
      <div className="mt-auto space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button kind="secondary" size="s" fullWidth onClick={onMessage}>
            Message
          </Button>
          <Button kind="secondary" size="s" fullWidth onClick={onViewProfile}>
            View profile
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button kind="secondary" size="s" fullWidth onClick={onShortlist}>
            {shortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
          <Button size="s" fullWidth onClick={onInvite} disabled={invited}>
            {invited ? "Invited" : "Invite to project"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

type DiscoveryDropdownProps = {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  activeId: string | null;
  onToggle: (id: string | null) => void;
  onSelect: (value: string) => void;
  className?: string;
};

function DiscoveryDropdown({
  id,
  label,
  value,
  options,
  activeId,
  onToggle,
  onSelect,
  className,
}: DiscoveryDropdownProps) {
  const isOpen = activeId === id;

  return (
    <div className={`relative ${isOpen ? "z-[70]" : "z-40"} ${className ?? "w-full"}`}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] leading-5 text-ink transition ${isOpen ? "border-primary ring-1 ring-primary" : "border-line hover:bg-subtle"}`}
        onClick={() => onToggle(isOpen ? null : id)}
        type="button"
      >
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`shrink-0 text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={16}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-[60] min-w-full overflow-hidden rounded-md border border-line bg-white p-1 shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
          role="listbox"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <button
                aria-selected={selected}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[14px] leading-5 transition ${selected ? "bg-primary-subtle text-ink" : "text-ink hover:bg-subtle"}`}
                key={option}
                onClick={() => {
                  onSelect(option);
                  onToggle(null);
                }}
                role="option"
                type="button"
              >
                <span className="min-w-0 flex-1 whitespace-nowrap">{option}</span>
                {selected && (
                  <Check aria-hidden="true" className="shrink-0 text-primary" size={16} />
                )}
              </button>
            );
          })}
          <div className="mt-1 border-t border-line pt-1">
            <button
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[14px] leading-5 text-primary transition hover:bg-subtle"
              onClick={() => onToggle(null)}
              type="button"
            >
              <PencilLine aria-hidden="true" size={15} />
              Other: type your own
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function BrandCreatorDiscoveryPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("Kannada skincare creators");
  const [filters, setFilters] = useState<string[]>(initialFilters);
  const [showResults, setShowResults] = useState(false);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [invited, setInvited] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [projectMatch, setProjectMatch] = useState("Vitamin-C Serum · Live");
  const [platform, setPlatform] = useState("Instagram");
  const [niche, setNiche] = useState("Skincare");
  const [fee, setFee] = useState("Up to ₹20K");
  const [sort, setSort] = useState("Match %");
  const matchedProjectId = projectMatch.startsWith("Glow") ? 3 : projectMatch.startsWith("Skin") ? 6 : 1;

  const updateFilter = (prefix: string, nextValue: string | null) => {
    setFilters((items) => [
      ...items.filter((item) => !item.startsWith(prefix)),
      ...(nextValue ? [`${prefix}${nextValue}`] : []),
    ]);
  };

  const removeFilter = (filter: string) => {
    setFilters((items) => items.filter((item) => item !== filter));
    if (filter.startsWith("Platform:")) setPlatform("Any platform");
    if (filter.startsWith("Niche:")) setNiche("Beauty");
    if (filter.startsWith("Fee:")) setFee("Any fee");
  };

  const clearFilters = () => {
    setFilters([]);
    setQuery("");
    setShowResults(true);
    setProjectMatch("No project · browse only");
    setPlatform("Any platform");
    setNiche("Beauty");
    setFee("Any fee");
    setSort("Match %");
  };
  const visibleCreators = matchingCreators.filter((creator) => {
    const needle = query.trim().toLowerCase();
    return (
      !needle || `${creator.name} ${creator.handle} ${creator.city}`.toLowerCase().includes(needle)
    );
  });

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
          <DiscoveryDropdown
            activeId={activeDropdown}
            id="project"
            label={`Match for: ${projectMatch.replace(/ · (Live|Upcoming)$/, "")}`}
            onSelect={setProjectMatch}
            onToggle={setActiveDropdown}
            options={[
              "Vitamin-C Serum · Live",
              "Glow Squad · Live",
              "Skin Quiz Leads · Upcoming",
              "No project · browse only",
            ]}
            value={projectMatch}
          />
        </section>

        <div className="mt-3 flex flex-wrap gap-2">
          <DiscoveryDropdown
            activeId={activeDropdown}
            className="w-full sm:w-[220px]"
            id="platform"
            label={`Platform: ${platform}`}
            onSelect={(value) => {
              setPlatform(value);
              updateFilter("Platform: ", value === "Any platform" ? null : value);
            }}
            onToggle={setActiveDropdown}
            options={["Any platform", "Instagram", "YouTube", "Pinterest", "Snapchat"]}
            value={platform}
          />
          <DiscoveryDropdown
            activeId={activeDropdown}
            className="w-full sm:w-[236px]"
            id="niche"
            label={`Niche: ${niche === "Skincare" ? "Beauty, Skincare" : niche}`}
            onSelect={(value) => {
              setNiche(value);
              updateFilter(
                "Niche: ",
                value === "Beauty" ? null : value === "Skincare" ? "Beauty, Skincare" : value,
              );
            }}
            onToggle={setActiveDropdown}
            options={["Beauty", "Skincare", "Lifestyle", "Wellness", "Fashion", "Men’s grooming"]}
            value={niche}
          />
          <DiscoveryDropdown
            activeId={activeDropdown}
            className="w-full sm:w-[196px]"
            id="fee"
            label={`Fee: ${fee === "Up to ₹20K" ? "up to ₹20K" : fee}`}
            onSelect={(value) => {
              setFee(value);
              updateFilter(
                "Fee: ",
                value === "Any fee" ? null : value === "Up to ₹20K" ? "up to ₹20K" : value,
              );
            }}
            onToggle={setActiveDropdown}
            options={["Any fee", "Up to ₹10K", "Up to ₹20K", "₹20K – ₹50K", "₹50K +"]}
            value={fee}
          />
          <DiscoveryDropdown
            activeId={activeDropdown}
            className="w-full sm:w-[190px]"
            id="sort"
            label={`Sort: ${sort}`}
            onSelect={setSort}
            onToggle={setActiveDropdown}
            options={[
              "Match %",
              "Followers",
              "Engagement rate",
              "Typical fee: low to high",
              "Recently active",
            ]}
            value={sort}
          />

          {filters
            .filter(
              (filter) =>
                !filter.startsWith("Platform:") &&
                !filter.startsWith("Niche:") &&
                !filter.startsWith("Fee:"),
            )
            .map((filter) => {
              const isSecondary = filter === "Language: Kannada" || filter === "Past results";
              return (
                <button
                  type="button"
                  key={filter}
                  onClick={() => removeFilter(filter)}
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
                {showResults
                  ? `${visibleCreators.length ? "214" : "0"} creators match`
                  : "0 creators match"}{" "}
                · stats from the last 30 days
              </h2>
              <span className="hidden flex-1 xl:block" />
              <p className="text-[14px] font-medium leading-[22px] text-secondary">Sort: {sort}</p>
            </div>

            {showResults && visibleCreators.length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {visibleCreators.map((creator) => (
                  <DiscoveryCreatorCard
                    creator={creator}
                    invited={invited.includes(creator.id)}
                    key={creator.id}
                    onInvite={() => {
                      setInvited((items) => [...items, creator.id]);
                      navigate(brandCreatorInviteRoute(matchedProjectId, creator.id));
                    }}
                    onMessage={() => {
                      navigate(
                        `${ROUTES.brandMessages}?thread=${creator.id}&name=${encodeURIComponent(creator.name)}`,
                      );
                    }}
                    onShortlist={() =>
                      setShortlisted((items) =>
                        items.includes(creator.id)
                          ? items.filter((id) => id !== creator.id)
                          : [...items, creator.id],
                      )
                    }
                    onViewProfile={() =>
                      navigate(brandCreatorProfileRoute(matchedProjectId, creator.id))
                    }
                    shortlisted={shortlisted.includes(creator.id)}
                  />
                ))}
              </div>
            ) : (
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
            )}
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
              <Button
                className="mt-4 w-full"
                leadingIcon={<UserRoundPlus size={16} />}
                onClick={() => {
                  navigate(brandCreatorInviteRoute(matchedProjectId, "meera"));
                }}
              >
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
