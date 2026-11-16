import { useState } from "react";
import { Check, ChevronDown, Upload } from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";

const settingsTabs = [
  ["Account", "Brand name, logo, website"],
  ["Team & roles", "Members and permissions"],
  ["Integrations", "Shopify, GA4, Meta"],
  ["Billing & tax", "Cards, GST, invoices"],
  ["Notifications", "Email, WhatsApp, in-app"],
  ["Security", "Password, 2-step, devices"],
] as const;

type AccountForm = {
  brandName: string;
  website: string;
  category: string;
  gstin: string;
  instagram: string;
  youtube: string;
  pinterest: string;
  snapchat: string;
  about: string;
};

const defaultForm: AccountForm = {
  brandName: "Minimalist",
  website: "https://minimalist.in",
  category: "Beauty & skincare",
  gstin: "27AABCG1234M1Z5",
  instagram: "instagram.com/minimalist",
  youtube: "youtube.com/@minimalist",
  pinterest: "pinterest.com/minimalist",
  snapchat: "",
  about: "Clean, dermatologist-tested skincare made in India for humid weather.",
};

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  select = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  select?: boolean;
}) {
  return (
    <label className="grid min-w-0 gap-1.5 text-[12px] font-medium leading-4 text-ink">
      {label}
      {select ? (
        <span className="relative">
          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="h-10 w-full appearance-none rounded-lg border border-line bg-white px-3 pr-9 text-[13px] font-normal leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option>Beauty & skincare</option>
            <option>Wellness</option>
            <option>Fashion</option>
            <option>Food & beverage</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-3 text-secondary"
          />
        </span>
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-line bg-white px-3 text-[13px] font-normal leading-5 text-ink outline-none placeholder:text-tertiary transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
      )}
    </label>
  );
}

function AccountSettings() {
  const [form, setForm] = useState(defaultForm);
  const [logo, setLogo] = useState("");
  const [saved, setSaved] = useState(false);
  const update = (key: keyof AccountForm) => (value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };
  const selectLogo = (file?: File) => {
    if (!file) return;
    setLogo(URL.createObjectURL(file));
    setSaved(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-xl border border-line bg-white p-5"
    >
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-ink">Brand profile</h2>
        <p className="mt-0.5 text-[12px] leading-4 text-secondary">
          Shown to creators on your projects
        </p>
      </div>
      <div className="mt-4 flex items-center gap-3.5">
        <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary-subtle text-[16px] font-semibold text-primary">
          {logo ? (
            <img src={logo} alt="Brand logo preview" className="size-full object-cover" />
          ) : (
            "MI"
          )}
        </div>
        <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle">
          <Upload size={16} />
          Upload logo
          <input
            type="file"
            accept="image/png,image/jpeg"
            className="sr-only"
            onChange={(event) => selectLogo(event.target.files?.[0])}
          />
        </label>
      </div>
      <p className="mt-3 text-[12px] leading-4 text-tertiary">
        Square, at least 400 × 400 px, JPG or PNG. Shown next to your brand name on project pages
        and in creator invites.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Brand name" value={form.brandName} onChange={update("brandName")} />
        <Field label="Website URL" value={form.website} onChange={update("website")} />
        <Field label="Category" value={form.category} onChange={update("category")} select />
        <Field label="GSTIN" value={form.gstin} onChange={update("gstin")} />
        <Field label="Instagram" value={form.instagram} onChange={update("instagram")} />
        <Field label="YouTube" value={form.youtube} onChange={update("youtube")} />
        <Field label="Pinterest" value={form.pinterest} onChange={update("pinterest")} />
        <Field
          label="Snapchat"
          value={form.snapchat}
          onChange={update("snapchat")}
          placeholder="Add a link (optional)"
        />
      </div>

      <label className="mt-4 grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
        About the brand
        <textarea
          value={form.about}
          maxLength={300}
          onChange={(event) => update("about")(event.target.value)}
          className="min-h-28 w-full resize-y rounded-lg border border-line bg-white px-3 py-2.5 text-[13px] font-normal leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <span className="flex justify-between gap-4 text-[12px] font-normal leading-4 text-tertiary">
          <span>Shown to creators on every project page</span>
          <span className="shrink-0">{form.about.length} / 300</span>
        </span>
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-[#27272a]"
        >
          {saved && <Check size={16} />}Save changes
        </button>
        {saved && (
          <span className="text-[12px] font-medium leading-4 text-[#16a34a]">Changes saved</span>
        )}
      </div>
    </motion.section>
  );
}

export function BrandSettingsPage() {
  const [activeTab, setActiveTab] = useState<(typeof settingsTabs)[number][0]>("Account");
  return (
    <BrandShell>
      <div className="mx-auto w-full max-w-[1440px] space-y-6 pb-10">
        <header>
          <h1 className="text-[26px] font-bold leading-[34px] tracking-[-.01em] text-ink">
            Settings
          </h1>
        </header>
        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav
            className="rounded-xl border border-line bg-white p-2"
            aria-label="Settings sections"
          >
            {settingsTabs.map(([name, description]) => (
              <button
                key={name}
                type="button"
                onClick={() => setActiveTab(name)}
                className={`flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition ${activeTab === name ? "bg-primary-subtle" : "hover:bg-subtle"}`}
              >
                <span className="text-[14px] font-medium leading-5 text-ink">{name}</span>
                <span className="text-[12px] leading-4 text-tertiary">{description}</span>
              </button>
            ))}
          </nav>
          <div className="min-w-0">
            {activeTab === "Account" ? (
              <AccountSettings />
            ) : (
              <section className="rounded-xl border border-line bg-white p-5">
                <h2 className="text-[16px] font-semibold leading-6 text-ink">{activeTab}</h2>
                <p className="mt-1 text-[13px] leading-5 text-secondary">
                  This settings section is ready for its dedicated configuration screen.
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </BrandShell>
  );
}
