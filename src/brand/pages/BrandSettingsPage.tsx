import { useState, type ReactNode } from "react";
import { Check, ChevronDown, Mail, Upload, UserPlus, X } from "lucide-react";
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

type TeamMember = {
  name: string;
  email: string;
  role: string;
  lastActive: string;
  avatar: string;
};

const initialMembers: TeamMember[] = [
  {
    name: "Ananya Mehta",
    email: "ananya@minimalist.in",
    role: "Owner",
    lastActive: "Now",
    avatar: "https://www.figma.com/api/mcp/asset/cd94711a-7546-42ce-bf04-2fd00c0150c3.png",
  },
  {
    name: "Rahul Shah",
    email: "rahul@minimalist.in",
    role: "Admin",
    lastActive: "2 h ago",
    avatar: "https://www.figma.com/api/mcp/asset/67d50c9d-0127-4cd5-95da-2d7fe7ea1865.png",
  },
  {
    name: "Tanvi Shah",
    email: "finance@minimalist.in",
    role: "Finance",
    lastActive: "Yesterday",
    avatar: "https://www.figma.com/api/mcp/asset/d6209ea7-5f59-4c7c-83db-5ebf73168e1b.png",
  },
  {
    name: "Pooja Menon",
    email: "pooja@minimalist.in",
    role: "Member",
    lastActive: "3 d ago",
    avatar: "https://www.figma.com/api/mcp/asset/fd3cf38d-c198-428c-8e99-af9a883a6f43.png",
  },
  {
    name: "Kabir Malhotra",
    email: "kabir@creocollective.in",
    role: "Agency · Admin",
    lastActive: "1 h ago",
    avatar: "https://www.figma.com/api/mcp/asset/0eb70fb5-cfdc-4b76-8c04-bd53d5f51141.png",
  },
];

const permissionRows = [
  ["Create & edit projects", [true, true, false, true, false]],
  ["Invite creators & approve content", [true, true, false, true, false]],
  ["Fund escrow & see invoices", [true, false, true, false, false]],
  ["Manage team & billing", [true, true, false, false, false]],
  ["View dashboards", [true, true, true, true, true]],
] as const;

function TeamSettings() {
  const [members, setMembers] = useState(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [manageMember, setManageMember] = useState<TeamMember | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

  const sendInvite = () => {
    const email = inviteEmail.trim();
    if (!email) return;
    const name = email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
    setMembers((current) => [
      ...current,
      { name, email, role: inviteRole, lastActive: "Invitation sent", avatar: "" },
    ]);
    setInviteEmail("");
    setInviteRole("Member");
    setInviteOpen(false);
  };
  const updateRole = (role: string) => {
    if (!manageMember) return;
    setMembers((current) =>
      current.map((member) => (member.email === manageMember.email ? { ...member, role } : member)),
    );
    setManageMember(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-[16px] font-semibold leading-6 text-ink">{members.length} members</h2>
        <div className="min-w-4 flex-1" />
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#27272a]"
        >
          <UserPlus size={16} />
          Invite member
        </button>
      </div>
      <section className="overflow-x-auto rounded-xl border border-line bg-white">
        <div className="min-w-[620px]">
          <div className="grid grid-cols-[minmax(230px,1fr)_150px_120px_100px] gap-3 bg-subtle px-4 py-2.5 text-[12px] font-semibold leading-4 text-secondary">
            <span>Member</span>
            <span>Role</span>
            <span>Last active</span>
            <span />
          </div>
          {members.map((member) => (
            <div
              key={member.email}
              className="grid grid-cols-[minmax(230px,1fr)_150px_120px_100px] items-center gap-3 border-t border-subtle px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-subtle text-[11px] font-semibold text-primary">
                  {member.avatar ? (
                    <img src={member.avatar} alt="" className="size-full object-cover" />
                  ) : (
                    member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-medium leading-[22px] text-ink">
                    {member.name}
                  </p>
                  <p className="truncate text-[12px] leading-4 text-secondary">{member.email}</p>
                </div>
              </div>
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${member.role === "Owner" ? "bg-primary-subtle text-primary" : "bg-subtle text-[#4a4a55]"}`}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {member.role}
              </span>
              <span className="text-[13px] leading-5 text-ink">{member.lastActive}</span>
              <button
                type="button"
                onClick={() => setManageMember(member)}
                className="h-8 rounded-lg px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle"
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-xl border border-line bg-white p-5">
        <h2 className="text-[16px] font-semibold leading-6 text-ink">What each role can do</h2>
        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[650px] overflow-hidden rounded-lg border border-line">
            <div className="grid grid-cols-[minmax(240px,1fr)_repeat(5,80px)] gap-3 bg-subtle px-4 py-2.5 text-[12px] font-semibold leading-4 text-secondary">
              <span>Permission</span>
              <span>Owner</span>
              <span>Admin</span>
              <span>Finance</span>
              <span>Member</span>
              <span>Viewer</span>
            </div>
            {permissionRows.map(([label, permissions]) => (
              <div
                key={label}
                className="grid grid-cols-[minmax(240px,1fr)_repeat(5,80px)] gap-3 border-t border-subtle px-4 py-3 text-[13px] leading-5 text-ink"
              >
                <span className="text-[14px] font-medium leading-[22px]">{label}</span>
                {permissions.map((allowed, index) => (
                  <span
                    key={`${label}-${index}`}
                    className={allowed ? "font-medium text-ink" : "text-tertiary"}
                  >
                    {allowed ? "✓" : "–"}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      {inviteOpen && (
        <TeamDialog
          title="Invite member"
          subtitle="They will receive an email invitation."
          close={() => setInviteOpen(false)}
        >
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Work email
            <input
              autoFocus
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              placeholder="name@company.com"
              className="h-10 rounded-lg border border-line px-3 text-[13px] font-normal outline-none placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
          <label className="mt-3 grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Role
            <span className="relative">
              <select
                value={inviteRole}
                onChange={(event) => setInviteRole(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-line bg-white px-3 pr-9 text-[13px] font-normal outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option>Admin</option>
                <option>Finance</option>
                <option>Member</option>
                <option>Viewer</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3 text-secondary"
              />
            </span>
          </label>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setInviteOpen(false)}
              className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={sendInvite}
              disabled={!inviteEmail.trim()}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Mail size={16} />
              Send invite
            </button>
          </div>
        </TeamDialog>
      )}
      {manageMember && (
        <TeamDialog
          title={`Manage ${manageMember.name}`}
          subtitle="Change this member’s access role."
          close={() => setManageMember(null)}
        >
          <div className="grid gap-2">
            {["Admin", "Finance", "Member", "Viewer"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => updateRole(role)}
                className={`flex h-10 items-center justify-between rounded-lg px-3 text-left text-[13px] font-medium ${manageMember.role === role ? "bg-primary-subtle text-primary" : "text-ink hover:bg-subtle"}`}
              >
                {role}
                {manageMember.role === role && <Check size={16} />}
              </button>
            ))}
          </div>
        </TeamDialog>
      )}
    </motion.div>
  );
}

function TeamDialog({
  title,
  subtitle,
  close,
  children,
}: {
  title: string;
  subtitle: string;
  close: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"
      role="presentation"
      onMouseDown={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-line bg-white p-5 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="team-dialog-title" className="text-[16px] font-semibold leading-6 text-ink">
              {title}
            </h2>
            <p className="mt-0.5 text-[12px] leading-4 text-secondary">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid size-8 place-items-center rounded-lg text-secondary hover:bg-subtle"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
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
            ) : activeTab === "Team & roles" ? (
              <TeamSettings />
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
