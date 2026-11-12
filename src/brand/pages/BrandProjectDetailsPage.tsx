import { useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileImage,
  FileText,
  Landmark,
  Megaphone,
  Package,
  Upload,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";
import { MultiDropdown } from "@/common/components/ui/Dropdown";
import { ROUTES } from "@/common/constants/routes";
import {
  getProjectDurationLabel,
  getProjectSteps,
  getProjectTarget,
  useProjectFlow,
  type ProjectPartnership,
} from "@/brand/context/ProjectFlowContext";

const field =
  "w-full rounded-md border border-line bg-white px-3 py-2 text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
const platformLogos: Record<string, string> = {
  Instagram: "/assets/platform-instagram.svg",
  YouTube: "/assets/platform-youtube.svg",
  Snapchat: "/assets/platform-snapchat.svg",
  Pinterest: "/assets/platform-pinterest.svg",
};
const platformOptions = Object.keys(platformLogos);

export function BrandProjectDetailsPage() {
  const navigate = useNavigate();
  const { partnership, projectType } = useProjectFlow();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(
    projectType === "Influencer marketing" ? "Vitamin-C Serum" : "Glow Edit UGC Pack",
  );
  const [brief, setBrief] = useState(
    projectType === "Influencer marketing"
      ? "Show your glow using the Vitamin C Glow Serum, a 3-step routine before getting ready. Mention your code in the caption and pin the link in your story."
      : "Make three short videos and a photo set of the Vitamin C Glow Serum in a 3-step routine. You send raw files; nothing is posted on your channel.",
  );
  const [languages, setLanguages] = useState(["English", "Hindi"]);
  const [customLanguages, setCustomLanguages] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState(["Instagram", "YouTube"]);
  const [startDate, setStartDate] = useState("2026-10-07");
  const [endDate, setEndDate] = useState("2026-11-07");
  const [applicationDeadline, setApplicationDeadline] = useState("2026-10-12");
  const [banner, setBanner] = useState({
    url: "/assets/project-details-banner.png",
    name: "vitamin-c-serum-banner.jpg",
    size: "2.1 MB",
  });
  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("image/"))
      setBanner({
        url: URL.createObjectURL(file),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      });
  };
  return (
    <BrandShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] leading-4 text-tertiary">
              Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project
            </p>
            <h1 className="mt-1 text-[26px] font-bold leading-[34px] tracking-[-.02em]">
              Create new project
            </h1>
            <p className="text-[13px] leading-5 text-secondary">
              {saved ? "Draft saved just now" : "Saved as a draft automatically"}
            </p>
          </div>
          <Button kind="ghost" onClick={() => navigate(ROUTES.brand)} leadingIcon={<X size={16} />}>
            Exit
          </Button>
        </header>
        <Stepper partnership={partnership} />
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26 }}
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
            }}
            className="rounded-xl border border-line bg-white px-5 py-6 sm:px-8 sm:py-7"
          >
            <div>
              <p className="text-[12px] font-semibold leading-4 tracking-[.06em] text-primary">
                STEP 4 OF 9
              </p>
              <h2 className="mt-1.5 text-[26px] font-bold leading-[34px] tracking-[-.02em]">
                Project details
              </h2>
              <p className="mt-1.5 text-[14px] leading-[22px] text-secondary">
                Creators see this on the project page before they apply.
              </p>
            </div>
            <img
              src={banner.url}
              alt="Project banner preview"
              className="mt-5 h-40 w-full rounded-xl object-cover"
            />
            <label className="mt-4 flex cursor-pointer items-center gap-2.5 rounded-xl border border-line-strong p-5 hover:bg-subtle">
              <FileImage size={18} className="text-secondary" />
              <span className="min-w-0 flex-1 truncate text-[14px] font-medium leading-[22px]">
                {banner.name}
              </span>
              <span className="text-[12px] text-secondary">{banner.size}</span>
              <Upload size={16} className="text-secondary" />
              <input type="file" accept="image/*" className="sr-only" onChange={upload} />
            </label>
            <div className="mt-5 space-y-4">
              <Field label="Project name" required>
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={field}
                />
              </Field>
              <Field label="Brief">
                <textarea
                  value={brief}
                  maxLength={1000}
                  onChange={(event) => setBrief(event.target.value)}
                  className={`${field} h-28 resize-y`}
                />
                <div className="flex justify-between text-[12px] leading-4 text-tertiary">
                  <span>Say what to show and what to mention. No medical claims.</span>
                  <span>{brief.length} / 1,000</span>
                </div>
              </Field>
              {projectType === "Influencer marketing" && (
                <PlatformSelector platforms={platforms} onChange={setPlatforms} />
              )}
              <Field label="Content language">
                <MultiDropdown
                  ariaLabel="Content language"
                  values={languages}
                  onChange={setLanguages}
                  options={[
                    "English",
                    "Hindi",
                    "Tamil",
                    "Telugu",
                    "Kannada",
                    "Marathi",
                    "Bengali",
                    ...customLanguages,
                  ]}
                  removableValues={customLanguages}
                  onRemoveOption={(language) => {
                    setCustomLanguages((current) => current.filter((item) => item !== language));
                    setLanguages((current) => current.filter((item) => item !== language));
                  }}
                  otherLabel="Other: type a language"
                  onOther={(language) => {
                    if (
                      ![
                        "English",
                        "Hindi",
                        "Tamil",
                        "Telugu",
                        "Kannada",
                        "Marathi",
                        "Bengali",
                        ...customLanguages,
                      ].includes(language)
                    )
                      setCustomLanguages((current) => [...current, language]);
                    if (!languages.includes(language))
                      setLanguages((current) => [...current, language]);
                  }}
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-3">
                <ProjectDate
                  label="Start date"
                  value={startDate}
                  onChange={setStartDate}
                  required
                />
                <ProjectDate label="End date" value={endDate} onChange={setEndDate} required />
                <ProjectDate
                  label="Application deadline"
                  value={applicationDeadline}
                  onChange={setApplicationDeadline}
                />
              </div>
            </div>
            <footer className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Button
                kind="secondary"
                onClick={() => navigate(ROUTES.brandNewProjectDuration)}
                leadingIcon={<ArrowLeft size={16} />}
              >
                Back
              </Button>
              <div className="flex-1" />
              <Button kind="ghost" onClick={() => setSaved(true)}>
                Save draft
              </Button>
              <Button
                type="button"
                onClick={() => navigate(ROUTES.brandNewProjectCreators)}
                trailingIcon={<ArrowRight size={16} />}
              >
                Continue
              </Button>
            </footer>
          </motion.form>
          <Summary />
        </div>
      </div>
    </BrandShell>
  );
}
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex text-[12px] font-medium leading-4">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </span>
      {children}
    </label>
  );
}
function PlatformSelector({
  platforms,
  onChange,
}: {
  platforms: string[];
  onChange: (platforms: string[]) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-medium leading-4 text-ink">
        Platforms <span className="text-danger">*</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {platformOptions.map((platform) => {
          const selected = platforms.includes(platform);
          return (
            <button
              aria-pressed={selected}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] leading-5 transition ${selected ? "border-primary bg-primary-subtle text-primary" : "border-line bg-white text-body hover:border-line-strong"}`}
              key={platform}
              onClick={() =>
                onChange(
                  selected
                    ? platforms.filter((item) => item !== platform)
                    : [...platforms, platform],
                )
              }
              type="button"
            >
              <img alt="" className="size-4" src={platformLogos[platform]} />
              {platform}
            </button>
          );
        })}
      </div>
    </div>
  );
}
function displayDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function ProjectDate({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const selected = new Date(`${value}T00:00:00`);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const blankDays = (first.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array<undefined>(blankDays),
    ...Array.from(
      { length: days },
      (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1),
    ),
  ];
  const choose = (date: Date) => {
    onChange(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    );
    setOpen(false);
  };
  return (
    <div className="relative z-10 min-w-0">
      <p className="mb-1.5 flex text-[12px] font-medium leading-4 text-ink">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </p>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-[1.5px] border-primary" : "border-line"}`}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <CalendarDays size={16} className="shrink-0 text-secondary" />
        <span className="min-w-0 flex-1 truncate">{displayDate(value)}</span>
      </button>
      {open && (
        <div
          aria-label={`${label} calendar`}
          className="absolute left-0 top-[calc(100%+6px)] z-40 w-[284px] rounded-xl border border-line bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          role="dialog"
        >
          <div className="flex h-6 items-center justify-between">
            <button
              aria-label="Previous month"
              className="flex size-6 items-center justify-center rounded hover:bg-subtle"
              onClick={() =>
                setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
              }
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-[14px] font-medium leading-[22px] text-ink">
              {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <button
              aria-label="Next month"
              className="flex size-6 items-center justify-center rounded hover:bg-subtle"
              onClick={() =>
                setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
              }
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mt-2 grid grid-cols-7">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <span
                className="flex h-[30px] items-center justify-center text-[12px] leading-4 text-tertiary"
                key={day}
              >
                {day}
              </span>
            ))}
            {cells.map((date, index) =>
              date ? (
                <button
                  className="flex h-[30px] items-center justify-center rounded-full text-[13px] leading-5 text-ink hover:bg-primary-subtle"
                  key={date.toISOString()}
                  onClick={() => choose(date)}
                  type="button"
                >
                  <span
                    className={
                      date.toDateString() === selected.toDateString()
                        ? "flex size-[30px] items-center justify-center rounded-full bg-primary text-[12px] font-medium leading-4 text-white"
                        : undefined
                    }
                  >
                    {date.getDate()}
                  </span>
                </button>
              ) : (
                <span className="h-[30px]" key={`blank-${index}`} />
              ),
            )}
          </div>
          <p className="mt-2 text-[12px] leading-4 text-secondary">
            Past dates can’t be picked. Projects need at least 5 days between the application
            deadline and start date.
          </p>
        </div>
      )}
    </div>
  );
}
function Stepper({ partnership }: { partnership: ProjectPartnership }) {
  const steps = getProjectSteps(partnership);
  return (
    <section className="overflow-x-auto rounded-xl border border-line bg-white px-5 py-4">
      <div className="flex min-w-[760px]">
        {steps.map((step, index) => (
          <div className="flex flex-1 flex-col items-center gap-1.5" key={step}>
            {index < 3 ? (
              <span className="flex size-7 items-center justify-center rounded-full bg-success text-white">
                <Check size={14} />
              </span>
            ) : (
              <span
                className={
                  index === 3
                    ? "flex size-7 items-center justify-center rounded-full bg-primary text-[12px] text-white"
                    : "flex size-7 items-center justify-center rounded-full border border-line-strong text-[12px] text-tertiary"
                }
              >
                {index + 1}
              </span>
            )}
            <span
              className={
                index === 3
                  ? "text-[12px] font-medium text-primary"
                  : index < 3
                    ? "text-[12px] text-secondary"
                    : "text-[12px] text-tertiary"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
function Summary() {
  const { projectType, partnership, duration } = useProjectFlow();
  const rows = [
    ["Target", getProjectTarget(projectType, partnership, duration)],
    ["Type", projectType],
    ["Partnership", partnership],
    ["Duration", getProjectDurationLabel(partnership, duration)],
  ];
  const upcoming = [
    ["Creator requirements", Users],
    ["Deliverables", Megaphone],
    ...(partnership === "Paid"
      ? [
          ["Budget", WalletCards],
          ["Payment method", Landmark],
        ]
      : []),
    ["Review & publish", CheckCircle2],
  ];
  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-semibold leading-6">Project setup</h2>
      <p className="text-[12px] text-secondary">Shapes your dashboard</p>
      <div className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <div className="flex justify-between gap-3 text-[13px]" key={label}>
            <span className="text-secondary">{label}</span>
            <span className="text-right text-[14px] font-medium">{value}</span>
          </div>
        ))}
      </div>
      <div className="my-4 h-px bg-line" />
      <div className="space-y-3">
        {["Type", "Partnership", "Duration"].map((item) => (
          <div className="flex gap-2.5 text-[13px]" key={item}>
            <CheckCircle2 size={16} className="text-success" />
            {item}
          </div>
        ))}
        <div className="flex gap-2.5 text-[14px] font-medium text-primary">
          <FileText size={16} />
          Project details
        </div>
        {upcoming.map(([item, Icon]) => {
          const I = Icon as typeof Package;
          return (
            <div className="flex gap-2.5 text-[13px] text-tertiary" key={item}>
              <I size={16} />
              {item}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
