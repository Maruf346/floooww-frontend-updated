import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  FolderOpen,
  Grid2X2,
  ImageIcon,
  List,
  PencilLine,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { Button } from "@/common/components/ui/Button";
import { ROUTES } from "@/common/constants/routes";
import type { Platform } from "@/common/types";

const media = {
  festive: "https://www.figma.com/api/mcp/asset/d30d7c32-3e30-48e1-bacc-f1460f731895.png",
  results: "https://www.figma.com/api/mcp/asset/6ea5ab70-24af-41c7-b672-e62a4b9ebfde.png",
  routine: "https://www.figma.com/api/mcp/asset/de7f2ede-4466-4b70-a664-fbfa0707e214.png",
  demo: "https://www.figma.com/api/mcp/asset/263f0771-5cb4-4e6a-8f3e-d7bb56fcac8d.png",
  launch: "https://www.figma.com/api/mcp/asset/1cedd9dc-2af4-4b8f-a262-ce98cff9e973.png",
  spf: "https://www.figma.com/api/mcp/asset/4ddb96b6-632b-4577-b4c7-a327f2319ca3.png",
  ingredients: "https://www.figma.com/api/mcp/asset/c32995b3-3554-45d8-b354-d8b69620b257.png",
  hindi: "https://www.figma.com/api/mcp/asset/ff59cdf1-1e18-473b-b0c1-6491ff8a7b40.png",
  lip: "https://www.figma.com/api/mcp/asset/22cf6acf-93fb-47f7-bf82-3031ca1b29ae.png",
} as const;

type ContentStatus = "To review" | "Changes requested" | "Approved" | "Live" | "Ad-ready";
type ContentItem = {
  id: string;
  title: string;
  creator: string;
  project: string;
  platform: Platform;
  format: string;
  status: ContentStatus;
  metrics: string;
  rights: string;
  warning?: boolean;
  duration?: string;
  image: string;
  avatar: string;
};

const contentItems: ContentItem[] = [
  {
    id: "festive",
    title: "Reel · festive GRWM",
    creator: "Meera Iyer",
    project: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Reel",
    status: "Live",
    metrics: "1.4 L views · 6.4% ER · 194 orders",
    rights: "Organic · until 7 Dec",
    duration: "0:41",
    image: media.festive,
    avatar: "meera-iyer",
  },
  {
    id: "results",
    title: "Reel · results after 7 days",
    creator: "Ishita Rao",
    project: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Reel",
    status: "To review",
    metrics: "Sent 26 Oct · ₹3,000 held",
    rights: "Organic · 30 days",
    duration: "0:41",
    image: media.results,
    avatar: "ishita-rao",
  },
  {
    id: "routine",
    title: "Short · routine",
    creator: "Nisha Verma",
    project: "Vitamin-C Serum",
    platform: "YouTube",
    format: "Short",
    status: "To review",
    metrics: "Sent today · ₹6,000 held",
    rights: "Organic · 30 days",
    duration: "0:52",
    image: media.routine,
    avatar: "tara-bose",
  },
  {
    id: "demo",
    title: "File · product demo",
    creator: "Riya Sen",
    project: "Lip Tint Drop",
    platform: "Instagram",
    format: "File",
    status: "Ad-ready",
    metrics: "UGC file · 1080 × 1920 · no watermark",
    rights: "Paid ads · until 14 Feb",
    duration: "0:28",
    image: media.demo,
    avatar: "kavya-reddy",
  },
  {
    id: "launch",
    title: "Story · launch day",
    creator: "Ishita Rao",
    project: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Story",
    status: "Live",
    metrics: "38K views · 27 orders",
    rights: "Organic · until 19 Nov",
    image: media.launch,
    avatar: "ishita-rao",
  },
  {
    id: "spf",
    title: "Reel · morning SPF",
    creator: "Tara Bose",
    project: "Monsoon Sunscreen",
    platform: "Instagram",
    format: "Reel",
    status: "Changes requested",
    metrics: "“Show the SPF label” · due 30 Oct",
    rights: "Organic · 30 days",
    duration: "0:33",
    image: media.spf,
    avatar: "tara-bose",
  },
  {
    id: "ingredients",
    title: "Carousel · ingredients",
    creator: "Kavya Reddy",
    project: "Vitamin-C Serum",
    platform: "Instagram",
    format: "Carousel",
    status: "Approved",
    metrics: "Goes live 30 Oct",
    rights: "Organic · 30 days",
    image: media.ingredients,
    avatar: "kavya-reddy",
  },
  {
    id: "hindi",
    title: "Video · Hindi cut",
    creator: "Sneha Patil",
    project: "Skin Quiz Leads",
    platform: "YouTube",
    format: "Video",
    status: "Ad-ready",
    metrics: "AI video · 15 s · Hindi",
    rights: "Paid ads · 90 days",
    duration: "0:15",
    image: media.hindi,
    avatar: "kavya-reddy",
  },
  {
    id: "lip",
    title: "Reel · lip swatches",
    creator: "Emma Clarke",
    project: "Lip Tint Drop",
    platform: "Instagram",
    format: "Reel",
    status: "Live",
    metrics: "62K views · 5.1% ER",
    rights: "Organic · ends in 9 days",
    warning: true,
    duration: "0:24",
    image: media.lip,
    avatar: "emma-clarke",
  },
  {
    id: "month-routine",
    title: "Reel · month 3 routine",
    creator: "Meera Iyer",
    project: "Glow Squad",
    platform: "Instagram",
    format: "Reel",
    status: "Live",
    metrics: "88K views · 41 orders",
    rights: "Organic · until 31 Jan",
    duration: "0:38",
    image: media.festive,
    avatar: "meera-iyer",
  },
  {
    id: "unboxing",
    title: "File · unboxing",
    creator: "Aisha Khan",
    project: "Lip Tint Drop",
    platform: "Instagram",
    format: "File",
    status: "Approved",
    metrics: "UGC file · ready to download",
    rights: "Paid ads · until 14 Feb",
    duration: "0:31",
    image: media.demo,
    avatar: "ishita-rao",
  },
  {
    id: "hydration",
    title: "Reel · hydration test",
    creator: "Sneha Patil",
    project: "Hydration Bundle",
    platform: "Instagram",
    format: "Reel",
    status: "Live",
    metrics: "44K views · 1,860 visits",
    rights: "Organic · until 10 Dec",
    duration: "0:29",
    image: media.results,
    avatar: "kavya-reddy",
  },
];

const tabCounts = {
  All: 100,
  "To review": 7,
  "Changes requested": 2,
  Approved: 9,
  Live: 58,
  "Ad-ready assets": 24,
} as const;
const contentTabs = Object.keys(tabCounts) as (keyof typeof tabCounts)[];

function join(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type FilterOption = {
  value: string;
  label: string;
};

const optionList = (options: string[]): FilterOption[] =>
  options.map((option) => ({ label: option, value: option }));

function Filter({
  label,
  value,
  options,
  other,
  open,
  onOpen,
  onClose,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  other?: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
}) {
  const selectedOption = options.find((option) => option.value === value);
  const buttonValue = value === "All" ? "All" : (selectedOption?.label ?? value);

  return (
    <div className={join("relative", open ? "z-[70]" : "z-10")}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className={join(
          "flex h-9 items-center gap-1.5 rounded-md border bg-white px-3 text-[13px] leading-5 text-ink transition",
          open ? "border-primary ring-1 ring-primary" : "border-line hover:bg-subtle",
        )}
        onClick={open ? onClose : onOpen}
        type="button"
      >
        {label + ": " + buttonValue}
        <ChevronDown
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
          size={14}
        />
      </button>
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+6px)] z-[60] min-w-[190px] rounded-lg border border-line bg-white p-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
          role="listbox"
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                aria-selected={selected}
                className={join(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[13px] leading-5",
                  selected ? "bg-primary-subtle text-primary" : "text-ink hover:bg-subtle",
                )}
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  onClose();
                }}
                role="option"
                type="button"
              >
                <Check className={selected ? "text-primary" : "opacity-0"} size={16} />
                {option.label}
              </button>
            );
          })}
          {other && (
            <div className="mt-1 border-t border-line pt-1">
              <button
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[13px] leading-5 text-primary hover:bg-subtle"
                onClick={onClose}
                type="button"
              >
                <PencilLine size={15} strokeWidth={1.8} />
                Other: type your own
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ContentStatus }) {
  const styles: Record<ContentStatus, string> = {
    Live: "bg-status-success-bg text-status-success-fg",
    "To review": "bg-status-warning-bg text-status-warning-fg",
    "Changes requested": "bg-status-danger-bg text-status-danger-fg",
    Approved: "bg-status-info-bg text-status-info-fg",
    "Ad-ready": "bg-primary-muted text-primary",
  };
  const dot: Record<ContentStatus, string> = {
    Live: "bg-status-success-fg",
    "To review": "bg-status-warning-fg",
    "Changes requested": "bg-status-danger-fg",
    Approved: "bg-status-info-fg",
    "Ad-ready": "bg-primary",
  };
  return (
    <span
      className={join(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4",
        styles[status],
      )}
    >
      <span className={join("size-1.5 rounded-full", dot[status])} />
      {status}
    </span>
  );
}

function EmptyContentState() {
  return (
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
        <Button kind="secondary" leadingIcon={<FolderOpen size={16} />} to={ROUTES.brandProjects}>
          Go to projects
        </Button>
        <Button leadingIcon={<Plus size={16} />} to={ROUTES.brandNewProject}>
          Create new project
        </Button>
      </div>
    </motion.section>
  );
}

export function BrandContentHubPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof tabCounts>("All");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [project, setProject] = useState("All");
  const [creator, setCreator] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [format, setFormat] = useState("All");
  const [rights, setRights] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<string[]>([]);

  const visibleItems = useMemo(() => {
    const items = contentItems.filter((item) => {
      const tabMatches = activeTab === "All" || item.status === activeTab;
      return (
        tabMatches &&
        (project === "All" || item.project === project) &&
        (creator === "All" || item.creator === creator) &&
        (platform === "All" || item.platform === platform) &&
        (format === "All" || item.format === format) &&
        (rights === "All" ||
          (rights === "Organic" && item.rights.startsWith("Organic")) ||
          (rights === "Paid ads" && item.rights.startsWith("Paid ads")) ||
          (rights === "Ends in 30 days" && item.warning) ||
          (rights === "Expired" && item.rights.includes("Expired")))
      );
    });

    const rankBySort: Record<string, string[]> = {
      "Most views": ["festive", "month-routine", "lip", "hydration", "launch", "routine"],
      "Most orders": ["festive", "month-routine", "launch", "lip", "hydration"],
      "Highest ER": ["festive", "lip", "month-routine", "hydration", "spf"],
      "Rights ending soonest": ["lip", "launch", "spf", "results", "routine", "hydration"],
    };
    const ranks = rankBySort[sort];
    return ranks
      ? [...items].sort((left, right) => {
          const leftRank = ranks.indexOf(left.id);
          const rightRank = ranks.indexOf(right.id);
          return (
            (leftRank === -1 ? Number.MAX_SAFE_INTEGER : leftRank) -
            (rightRank === -1 ? Number.MAX_SAFE_INTEGER : rightRank)
          );
        })
      : items;
  }, [activeTab, creator, format, platform, project, rights, sort]);

  const toggleSelected = (id: string) => {
    setSelected((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  return (
    <BrandShell>
      <div className="w-full pb-10">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-ink">
              Content hub
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-secondary">
              Every post, file and video from all your projects · with usage rights and results
            </p>
          </div>
          <Button
            disabled={selected.length === 0}
            kind="secondary"
            leadingIcon={<FolderOpen size={16} />}
          >
            Download selected
          </Button>
        </header>

        <nav
          aria-label="Content status"
          className="mt-4 flex gap-6 overflow-x-auto border-b border-line [scrollbar-width:none]"
        >
          {contentTabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                className={join(
                  "relative flex shrink-0 items-center gap-1.5 pb-3 text-[14px] leading-[22px] transition",
                  active ? "font-medium text-primary" : "text-secondary hover:text-ink",
                )}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
                <span
                  className={join(
                    "rounded-full px-[7px] py-px text-[12px] font-medium leading-4",
                    active ? "bg-primary-subtle text-primary" : "bg-muted text-secondary",
                  )}
                >
                  {tabCounts[tab]}
                </span>
                {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Filter
            label="Project"
            value={project}
            options={[
              { label: "All projects", value: "All" },
              ...optionList([
                "Vitamin-C Serum",
                "Glow Squad",
                "Monsoon Sunscreen",
                "Lip Tint Drop",
                "Hydration Bundle",
                "Skin Quiz Leads",
              ]),
            ]}
            open={openFilter === "project"}
            onOpen={() => setOpenFilter("project")}
            onClose={() => setOpenFilter(null)}
            onChange={setProject}
          />
          <Filter
            label="Creator"
            value={creator}
            options={optionList([
              "All",
              "Meera Iyer",
              "Ishita Rao",
              "Nisha Verma",
              "Riya Sen",
              "Sneha Patil",
            ])}
            open={openFilter === "creator"}
            onOpen={() => setOpenFilter("creator")}
            onClose={() => setOpenFilter(null)}
            onChange={setCreator}
          />
          <Filter
            label="Platform"
            value={platform}
            options={optionList(["All", "Instagram", "YouTube", "Pinterest", "Snapchat"])}
            open={openFilter === "platform"}
            onOpen={() => setOpenFilter("platform")}
            onClose={() => setOpenFilter(null)}
            onChange={setPlatform}
          />
          <Filter
            label="Format"
            value={format}
            options={[
              { label: "All formats", value: "All" },
              { label: "Reels", value: "Reel" },
              { label: "Stories", value: "Story" },
              { label: "Shorts", value: "Short" },
              { label: "Carousels", value: "Carousel" },
              { label: "UGC files", value: "File" },
            ]}
            other
            open={openFilter === "format"}
            onOpen={() => setOpenFilter("format")}
            onClose={() => setOpenFilter(null)}
            onChange={setFormat}
          />
          <Filter
            label="Usage rights"
            value={rights}
            options={[
              { label: "All", value: "All" },
              { label: "Organic only", value: "Organic" },
              { label: "Paid ads allowed", value: "Paid ads" },
              { label: "Ends in 30 days", value: "Ends in 30 days" },
              { label: "Expired", value: "Expired" },
            ]}
            other
            open={openFilter === "rights"}
            onOpen={() => setOpenFilter("rights")}
            onClose={() => setOpenFilter(null)}
            onChange={setRights}
          />
          <span className="hidden min-w-4 flex-1 lg:block" />
          <Filter
            label="Sort"
            value={sort}
            options={optionList([
              "Newest",
              "Most views",
              "Most orders",
              "Highest ER",
              "Rights ending soonest",
            ])}
            open={openFilter === "sort"}
            onOpen={() => setOpenFilter("sort")}
            onClose={() => setOpenFilter(null)}
            onChange={setSort}
          />
          <div className="inline-flex rounded-md bg-muted p-[3px]">
            <button
              aria-label="Grid view"
              className={join(
                "grid size-[26px] place-items-center rounded-sm",
                view === "grid" ? "bg-white text-ink shadow-sm" : "text-secondary",
              )}
              onClick={() => setView("grid")}
              type="button"
            >
              <Grid2X2 size={14} />
            </button>
            <button
              aria-label="List view"
              className={join(
                "grid size-[26px] place-items-center rounded-sm",
                view === "list" ? "bg-white text-ink shadow-sm" : "text-secondary",
              )}
              onClick={() => setView("list")}
              type="button"
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {visibleItems.length === 0 ? (
          <EmptyContentState />
        ) : (
          <>
            <div
              className={join(
                "mt-4 grid gap-4",
                view === "grid" ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2",
              )}
            >
              {visibleItems.map((item, index) => {
                const checked = selected.includes(item.id);
                return (
                  <motion.article
                    animate={{ opacity: 1, y: 0 }}
                    className={join(
                      "overflow-hidden rounded-xl border border-line bg-white",
                      view === "list" && "flex min-h-[180px]",
                    )}
                    initial={{ opacity: 0, y: 12 }}
                    key={item.id}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.035, 0.22),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div
                      className={join(
                        "relative shrink-0 overflow-hidden",
                        view === "list" ? "w-[180px]" : "h-[300px] w-full",
                      )}
                    >
                      <img alt="" className="size-full object-cover" src={item.image} />
                      <span className="absolute left-2.5 top-2.5 grid size-6 place-items-center rounded-md bg-white">
                        <PlatformLogo platform={item.platform} size={14} />
                      </span>
                      <span className="absolute right-2.5 top-2.5">
                        <StatusBadge status={item.status} />
                      </span>
                      {item.duration && (
                        <span className="absolute bottom-2.5 right-2.5 rounded bg-black/60 px-1.5 py-0.5 text-[12px] leading-4 text-white">
                          {item.duration}
                        </span>
                      )}
                      <button
                        aria-label={"Select " + item.title}
                        className={join(
                          "absolute bottom-2.5 left-2.5 grid size-[18px] place-items-center rounded border",
                          checked
                            ? "border-primary bg-primary text-white"
                            : "border-line bg-white text-transparent",
                        )}
                        onClick={() => toggleSelected(item.id)}
                        type="button"
                      >
                        <Check size={12} strokeWidth={3} />
                      </button>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-3 pb-3 pt-2.5">
                      <h2 className="truncate text-[14px] font-medium leading-[22px] text-ink">
                        {item.title}
                      </h2>
                      <p className="flex min-w-0 items-center gap-1.5 truncate text-[12px] leading-4 text-secondary">
                        <img
                          alt=""
                          className="size-[18px] rounded-full object-cover"
                          src={"/assets/creators/" + item.avatar + ".png"}
                        />
                        <span className="truncate">
                          {item.creator} · {item.project}
                        </span>
                      </p>
                      <p className="truncate text-[12px] leading-4 text-ink">{item.metrics}</p>
                      <span
                        className={join(
                          "mt-0.5 inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-[3px] text-[12px] leading-4",
                          item.warning
                            ? "bg-status-warning-bg text-status-warning-fg"
                            : "bg-muted text-secondary",
                        )}
                      >
                        <span
                          className={join(
                            "size-1.5 rounded-full",
                            item.warning ? "bg-status-warning-fg" : "bg-secondary",
                          )}
                        />
                        {item.rights}
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="min-w-0 flex-1 text-[12px] leading-4 text-secondary">
                Showing {visibleItems.length} of {tabCounts[activeTab]} · 5 usage rights end in the
                next 30 days
              </p>
              <Button kind="secondary" size="s">
                Load more
              </Button>
            </div>
          </>
        )}
      </div>
    </BrandShell>
  );
}
