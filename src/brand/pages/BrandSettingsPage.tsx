import { useState, type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  Download,
  Mail,
  Pencil,
  Plug,
  Upload,
  UserPlus,
  X,
} from "lucide-react";
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
  const [inviteIdentity, setInviteIdentity] = useState("Meera Nair · meera@minimalist.in");
  const [inviteRole, setInviteRole] = useState("Member");
  const [inviteProjects, setInviteProjects] = useState("Vitamin-C Serum, Glow Squad (2 of 11)");
  const [inviteAccess, setInviteAccess] = useState("Approve content");

  const closeInvite = () => {
    setInviteIdentity("Meera Nair · meera@minimalist.in");
    setInviteRole("Member");
    setInviteProjects("Vitamin-C Serum, Glow Squad (2 of 11)");
    setInviteAccess("Approve content");
    setInviteOpen(false);
  };

  const sendInvite = () => {
    const email = inviteIdentity.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)?.[0] ?? "";
    if (!email) return;
    const name =
      inviteIdentity.replace(email, "").replace(/[·•]/g, "").trim() ||
      email
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
    setMembers((current) => [
      ...current,
      { name, email, role: inviteRole, lastActive: "Invitation sent", avatar: "" },
    ]);
    closeInvite();
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
        <InviteTeamMemberDialog
          identity={inviteIdentity}
          role={inviteRole}
          projects={inviteProjects}
          access={inviteAccess}
          close={closeInvite}
          send={sendInvite}
          setIdentity={setInviteIdentity}
          setRole={setInviteRole}
          setProjects={setInviteProjects}
          setAccess={setInviteAccess}
        />
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

function InviteSelect({
  label,
  value,
  hint,
  options,
  onChange,
}: {
  label: string;
  value: string;
  hint: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[12px] font-medium leading-4 text-ink">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-lg border border-line bg-white px-3 pr-9 text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-3 text-secondary"
        />
      </span>
      <span className="text-[12px] leading-4 text-tertiary">{hint}</span>
    </label>
  );
}

function InviteTeamMemberDialog({
  identity,
  role,
  projects,
  access,
  close,
  send,
  setIdentity,
  setRole,
  setProjects,
  setAccess,
}: {
  identity: string;
  role: string;
  projects: string;
  access: string;
  close: () => void;
  send: () => void;
  setIdentity: (value: string) => void;
  setRole: (value: string) => void;
  setProjects: (value: string) => void;
  setAccess: (value: string) => void;
}) {
  const inviteeName = identity.split(/[·•]/)[0]?.trim() || "This team member";
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"
      role="presentation"
      onMouseDown={close}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-team-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 8, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-[520px] rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,.12)]"
      >
        <div>
          <h2 id="invite-team-title" className="text-[18px] font-semibold leading-6 text-[#070b13]">
            Invite a team member
          </h2>
          <p className="mt-1 text-[13px] leading-5 text-[#8491a3]">
            Give access per project · you can change it any time in Team &amp; roles
          </p>
        </div>

        <div className="mt-4 space-y-4">
          <label className="grid gap-1.5">
            <span className="text-[12px] font-medium leading-4 text-ink">Name and work email</span>
            <input
              autoFocus
              value={identity}
              onChange={(event) => setIdentity(event.target.value)}
              className="h-10 rounded-lg border border-line px-3 text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <span className="text-[12px] leading-4 text-tertiary">
              They get an email with a link · expires in 7 days
            </span>
          </label>
          <InviteSelect
            label="Role"
            value={role}
            onChange={setRole}
            options={["Owner", "Admin", "Finance", "Member", "Viewer", "Agency (external)"]}
            hint="Owner · Admin · Finance · Member · Viewer · Agency (external)"
          />
          <InviteSelect
            label="Projects"
            value={projects}
            onChange={setProjects}
            options={[
              "Vitamin-C Serum, Glow Squad (2 of 11)",
              "All projects (11 of 11)",
              "Vitamin-C Serum (1 of 11)",
              "Glow Squad (1 of 11)",
            ]}
            hint="All projects of the chosen client(s), or specific ones · new projects are not added automatically"
          />
          <InviteSelect
            label="Access level"
            value={access}
            onChange={setAccess}
            options={[
              "View only",
              "Edit (brief, deliverables, creators)",
              "Approve content",
              "Approve & pay",
              "Full",
            ]}
            hint="View only · Edit (brief, deliverables, creators) · Approve content · Approve & pay (fund escrow, release payments) · Full"
          />

          <div className="rounded-[10px] bg-[#f3f5f7] px-3.5 py-3 text-[12px] leading-4 text-[#394357]">
            <p className="font-semibold">What {inviteeName} will be able to do</p>
            <div className="mt-1.5 grid gap-1">
              <p>✓ See and edit {projects.replace(/ \(.*$/, "")}</p>
              <p>
                ✓{" "}
                {access === "View only"
                  ? "View project activity and content"
                  : "Approve or request changes on content"}
              </p>
              <p>✓ Message creators</p>
              <p className="text-[#8491a3]">
                ✕ Fund escrow, release payments, see invoices, or see other projects
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="h-8 rounded-lg px-3 text-[13px] font-medium leading-[18px] text-ink hover:bg-subtle"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={send}
            disabled={!identity.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/)}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#27272a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Mail size={16} />
            Send invite
          </button>
        </div>
      </motion.div>
    </div>
  );
}

type IntegrationState = "connected" | "action-needed" | "not-connected";
type Integration = {
  id: string;
  name: string;
  description: string;
  state: IntegrationState;
  mark:
    | "shopify"
    | "woocommerce"
    | "razorpay"
    | "instagram"
    | "youtube"
    | "pinterest"
    | "snapchat"
    | "openai"
    | "claude"
    | "gemini"
    | "slack"
    | "zapier"
    | "custom";
};

const integrationGroups: { title: string; description: string; items: Integration[] }[] = [
  {
    title: "Store",
    description: "Orders and sales from creator codes and links",
    items: [
      {
        id: "shopify",
        name: "Shopify",
        description:
          "Net sales and orders from creator codes and links. Last sync 26 Oct, token expired.",
        state: "action-needed",
        mark: "shopify",
      },
      {
        id: "woocommerce",
        name: "WooCommerce",
        description: "Orders from WordPress stores.",
        state: "not-connected",
        mark: "woocommerce",
      },
    ],
  },
  {
    title: "Social channels",
    description: "Check posts, tags and collab posts on your brand accounts",
    items: [
      {
        id: "instagram",
        name: "Instagram (brand account)",
        description: "Tag checks and collab posts.",
        state: "connected",
        mark: "instagram",
      },
      {
        id: "youtube",
        name: "YouTube",
        description: "Read creators’ video stats.",
        state: "connected",
        mark: "youtube",
      },
      {
        id: "pinterest",
        name: "Pinterest",
        description: "Track pins creators make for your projects.",
        state: "not-connected",
        mark: "pinterest",
      },
      {
        id: "snapchat",
        name: "Snapchat",
        description: "Read story views from creator Snaps.",
        state: "not-connected",
        mark: "snapchat",
      },
    ],
  },
  {
    title: "Payments",
    description: "How money moves into escrow",
    items: [
      {
        id: "razorpay",
        name: "Razorpay",
        description: "Card and net-banking payments into escrow.",
        state: "connected",
        mark: "razorpay",
      },
    ],
  },
  {
    title: "AI assistants",
    description:
      "Bring your own model key. Used for brief drafting, creator matching notes and report summaries; your data is never used for training.",
    items: [
      {
        id: "openai",
        name: "OpenAI",
        description: "Use your OpenAI key (GPT) for brief drafting and report summaries.",
        state: "not-connected",
        mark: "openai",
      },
      {
        id: "claude",
        name: "Claude",
        description: "Use your Anthropic key for long briefs and contract review.",
        state: "not-connected",
        mark: "claude",
      },
      {
        id: "gemini",
        name: "Gemini",
        description: "Use your Google AI key; pairs with GA4 and Google Ads data.",
        state: "not-connected",
        mark: "gemini",
      },
    ],
  },
  {
    title: "Other platforms",
    description: "Send Kreyio updates to the tools your team uses",
    items: [
      {
        id: "slack",
        name: "Slack",
        description: "Approvals, late posts and payments in a channel.",
        state: "not-connected",
        mark: "slack",
      },
      {
        id: "zapier",
        name: "Zapier",
        description: "Send project events to 6,000+ apps.",
        state: "not-connected",
        mark: "zapier",
      },
    ],
  },
];

function IntegrationMark({ mark }: { mark: Integration["mark"] }) {
  const assets = {
    shopify: "https://www.figma.com/api/mcp/asset/4e42e8af-c274-4231-b185-0a5f03ab22fb.svg",
    razorpay: "https://www.figma.com/api/mcp/asset/3f705b5a-391c-4643-92a7-dc19ce98b676.svg",
    instagram: "https://www.figma.com/api/mcp/asset/b1f4a237-77a1-427b-afd5-efe546d22885.svg",
    youtube: "https://www.figma.com/api/mcp/asset/372bc02f-5252-4d28-9a6f-8e6b956e5022.svg",
    snapchat: "https://www.figma.com/api/mcp/asset/7b3f7b9b-9214-44b6-9a3c-19866abb9356.svg",
    pinterest: "https://www.figma.com/api/mcp/asset/003a1496-758d-4dfa-9692-5933916da7ca.svg",
  } as const;
  if (mark in assets)
    return <img src={assets[mark as keyof typeof assets]} alt="" className="size-6" />;
  const marks = {
    woocommerce: ["W", "bg-[#7f54b3]"],
    openai: ["◎", "bg-[#070b13]"],
    claude: ["A", "bg-[#c96442]"],
    gemini: ["G", "bg-[#1a73e8]"],
    slack: ["#", "bg-[#4a154b]"],
    zapier: ["Z", "bg-[#ff4f00]"],
    custom: ["↗", "bg-primary"],
  } as const;
  const [label, color] = marks[mark as keyof typeof marks];
  return (
    <span
      className={`grid size-6 place-items-center rounded-lg ${color} text-[11px] font-bold text-white`}
    >
      {label}
    </span>
  );
}

function IntegrationBadge({ state }: { state: IntegrationState }) {
  const tones =
    state === "connected"
      ? "bg-[#e1fce3] text-[#16a34a]"
      : state === "action-needed"
        ? "bg-[#fde4e3] text-[#dc2626]"
        : "bg-subtle text-[#4a4a55]";
  const labels =
    state === "connected"
      ? "Connected"
      : state === "action-needed"
        ? "Action needed"
        : "Not connected";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${tones}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {labels}
    </span>
  );
}

function IntegrationCard({
  item,
  onAction,
}: {
  item: Integration;
  onAction: (item: Integration) => void;
}) {
  const action =
    item.state === "connected"
      ? "Manage"
      : item.state === "action-needed"
        ? "Reconnect"
        : "Connect";
  return (
    <article className="flex min-h-[178px] flex-col gap-3 rounded-xl border border-line bg-white p-5">
      <div className="flex items-center gap-2.5">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-subtle">
          <IntegrationMark mark={item.mark} />
        </div>
        <h3 className="min-w-0 flex-1 text-[14px] font-semibold leading-5 text-ink">{item.name}</h3>
        <IntegrationBadge state={item.state} />
      </div>
      <p className="text-[13px] leading-5 text-secondary">{item.description}</p>
      <button
        type="button"
        onClick={() => onAction(item)}
        className={`mt-auto h-8 w-fit rounded-lg px-3 text-[13px] font-medium leading-[18px] transition ${item.state === "action-needed" ? "bg-[#0d0d10] text-white hover:bg-[#27272a]" : "border border-line bg-white text-ink hover:bg-subtle"}`}
      >
        {action}
      </button>
    </article>
  );
}

function IntegrationsSettings() {
  const [states, setStates] = useState<Record<string, IntegrationState>>({});
  const [notice, setNotice] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [toolName, setToolName] = useState("");
  const [customTools, setCustomTools] = useState<Integration[]>([]);
  const withState = (item: Integration) => ({ ...item, state: states[item.id] ?? item.state });
  const action = (item: Integration) => {
    if (item.state !== "connected") {
      setStates((current) => ({ ...current, [item.id]: "connected" }));
      setNotice(`${item.name} connected successfully.`);
    } else setNotice(`${item.name} settings are up to date.`);
  };
  const addTool = () => {
    const name = toolName.trim();
    if (!name) return;
    setCustomTools((current) => [
      ...current,
      {
        id: `custom-${name.toLowerCase().replace(/\s+/g, "-")}`,
        name,
        description: "Custom integration connected with your workspace.",
        state: "connected",
        mark: "custom",
      },
    ]);
    setToolName("");
    setAddOpen(false);
    setNotice(`${name} added to your integrations.`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-7"
    >
      {notice && (
        <p
          className="rounded-lg bg-[#e1fce3] px-3 py-2 text-[12px] font-medium leading-4 text-[#16a34a]"
          role="status"
        >
          {notice}
        </p>
      )}
      {integrationGroups.map((group) => (
        <section key={group.title}>
          <div className="mb-3">
            <h2 className="text-[16px] font-semibold leading-6 text-ink">{group.title}</h2>
            <p className="text-[12px] leading-4 text-tertiary">{group.description}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <IntegrationCard key={item.id} item={withState(item)} onAction={action} />
            ))}
          </div>
        </section>
      ))}
      {/* <section>
        <div className="mb-3">
          <h2 className="text-[16px] font-semibold leading-6 text-ink">Your integrations</h2>
          <p className="text-[12px] leading-4 text-tertiary">
            Tools you connected yourself with a webhook or API key
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {customTools.map((item) => (
            <IntegrationCard key={item.id} item={item} onAction={action} />
          ))}
          <article className="flex min-h-[139px] flex-col gap-2 rounded-xl border border-dashed border-[#d4d7df] bg-[#fafafa] p-5">
            <h3 className="text-[14px] font-semibold leading-5 text-ink">Add any tool</h3>
            <p className="text-[13px] leading-5 text-tertiary">
              Search 100+ apps, or connect your own tool with a webhook or API key.
            </p>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="mt-auto inline-flex h-8 w-fit items-center gap-1.5 rounded-lg bg-[#0d0d10] px-3 text-[13px] font-medium leading-[18px] text-white hover:bg-[#27272a]"
            >
              <Plug size={14} />
              Add integration
            </button>
          </article>
        </div>
      </section> */}
      {addOpen && (
        <TeamDialog
          title="Add integration"
          subtitle="Connect a tool with a webhook or API key."
          close={() => setAddOpen(false)}
        >
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Integration name
            <input
              autoFocus
              value={toolName}
              onChange={(event) => setToolName(event.target.value)}
              placeholder="e.g. Google Analytics"
              className="h-10 rounded-lg border border-line px-3 text-[13px] font-normal outline-none placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addTool}
              disabled={!toolName.trim()}
              className="h-10 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white disabled:opacity-40"
            >
              Add integration
            </button>
          </div>
        </TeamDialog>
      )}
    </motion.div>
  );
}

type Invoice = { date: string; invoice: string; project: string; cycle?: string; amount: string };
const invoices: Invoice[] = [
  { date: "26 Oct", invoice: "FLW-2610-0412", project: "Monsoon Sunscreen", amount: "₹2,950" },
  { date: "6 Oct", invoice: "FLW-0610-0388", project: "Vitamin-C Serum", amount: "₹11,800" },
  {
    date: "2 Oct",
    invoice: "FLW-0210-0371",
    project: "Glow Squad",
    cycle: "month 3",
    amount: "₹4,425",
  },
  {
    date: "12 Sep",
    invoice: "FLW-1209-0322",
    project: "Monsoon Sunscreen",
    cycle: "–",
    amount: "₹6,638",
  },
];

function BillingSettings() {
  const [methods, setMethods] = useState([
    {
      name: "UPI AutoPay · minimalist@okhdfcbank",
      detail: "Mandate up to ₹16,000 a cycle · for repeating projects",
      default: true,
    },
    { name: "Visa •••• 4242", detail: "Expires 08/28 · Ananya Mehta", default: false },
  ]);
  const [billing, setBilling] = useState({
    legalName: "Minimalist Pvt Ltd",
    gstin: "27AABCG1234M1Z5",
    address: "4th floor, Kamala Mills, Lower Parel, Mumbai 400013",
    supply: "Maharashtra",
    invoicesTo: "finance@minimalist.in",
  });
  const [editor, setEditor] = useState<"method" | "billing" | null>(null);
  const [notice, setNotice] = useState("");
  const downloadPdf = async (list: Invoice[]) => {
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      list.forEach((entry, index) => {
        if (index) pdf.addPage();
        pdf.setFontSize(22);
        pdf.text("Kreyio GST invoice", 54, 70);
        pdf.setFontSize(12);
        pdf.text(`Invoice: ${entry.invoice}`, 54, 112);
        pdf.text(`Date: ${entry.date} 2026`, 54, 134);
        pdf.text(`Project: ${entry.project}`, 54, 156);
        pdf.text(`Amount paid: ${entry.amount}`, 54, 178);
        pdf.text(`Billed to: ${billing.legalName}`, 54, 220);
        pdf.text(`GSTIN: ${billing.gstin}`, 54, 242);
      });
      pdf.save(list.length === 1 ? `${list[0].invoice}.pdf` : "Kreyio-invoices.pdf");
      setNotice(
        list.length === 1 ? `Downloaded ${list[0].invoice}.` : "Downloaded all GST invoices.",
      );
    } catch {
      setNotice("Couldn’t create the invoice PDF. Please try again.");
    }
  };
  const addMethod = () => {
    setMethods((current) => [
      ...current,
      { name: "Mastercard •••• 9001", detail: "Expires 11/29 · Ananya Mehta", default: false },
    ]);
    setEditor(null);
    setNotice("Payment method added.");
  };
  const saveBilling = () => {
    setEditor(null);
    setNotice("Billing details saved.");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-6"
    >
      {notice && (
        <p
          role="status"
          className="rounded-lg bg-[#e1fce3] px-3 py-2 text-[12px] font-medium leading-4 text-[#16a34a]"
        >
          {notice}
        </p>
      )}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <h2 className="text-[16px] font-semibold leading-6 text-ink">Payment methods</h2>
              <p className="text-[12px] leading-4 text-tertiary">Used for escrow and GST</p>
            </div>
            <button
              type="button"
              onClick={() => setEditor("method")}
              className="h-8 rounded-lg border border-line px-3 text-[13px] font-medium leading-[18px] text-ink hover:bg-subtle"
            >
              Add method
            </button>
          </div>
          <div className="mt-3">
            {methods.map((method) => (
              <div
                key={method.name}
                className="flex items-center gap-3 border-t border-subtle py-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-medium leading-5 text-ink">{method.name}</p>
                    {method.default && (
                      <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-[12px] font-medium leading-4 text-primary">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] leading-4 text-tertiary">{method.detail}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotice(`${method.name} is ready to edit.`)}
                  className="text-[13px] font-medium leading-[18px] text-primary"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <h2 className="text-[16px] font-semibold leading-6 text-ink">Billing details</h2>
              <p className="text-[12px] leading-4 text-tertiary">Printed on every GST invoice</p>
            </div>
            <button
              type="button"
              onClick={() => setEditor("billing")}
              className="h-8 rounded-lg border border-line px-3 text-[13px] font-medium leading-[18px] text-ink hover:bg-subtle"
            >
              Edit
            </button>
          </div>
          <div className="mt-3">
            {[
              ["Legal name", billing.legalName],
              ["GSTIN", billing.gstin],
              ["Address", billing.address],
              ["Place of supply", billing.supply],
              ["Invoices to", billing.invoicesTo],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex gap-3 border-t border-subtle py-2.5 text-[13px] leading-5"
              >
                <span className="w-[110px] shrink-0 text-tertiary">{label}</span>
                <span className="font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex-1">
            <h2 className="text-[16px] font-semibold leading-6 text-ink">Invoices</h2>
            <p className="text-[12px] leading-4 text-tertiary">
              One GST invoice per payment · Kreyio charges brands nothing
            </p>
          </div>
          <button
            type="button"
            onClick={() => downloadPdf(invoices)}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-3 text-[13px] font-medium leading-[18px] text-ink hover:bg-subtle"
          >
            <Download size={14} />
            Download all
          </button>
        </div>
        <div className="mt-3 overflow-x-auto rounded-[10px] border border-[#e5e7eb]">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[90px_150px_minmax(160px,1fr)_110px_110px_80px] gap-3 bg-[#f3f5f7] px-3.5 py-2.5 text-[12px] font-medium leading-4 text-tertiary">
              <span>DATE</span>
              <span>INVOICE</span>
              <span>PROJECT</span>
              <span>AMOUNT</span>
              <span>STATUS</span>
              <span />
            </div>
            {invoices.map((entry) => (
              <div
                key={entry.invoice}
                className="grid grid-cols-[90px_150px_minmax(160px,1fr)_110px_110px_80px] items-center gap-3 border-t border-subtle px-3.5 py-3 text-[13px] leading-5 text-ink"
              >
                <span className="font-medium">{entry.date}</span>
                <span>{entry.invoice}</span>
                <span>
                  <span className="block">{entry.project}</span>
                  {entry.cycle && (
                    <span className="block text-[12px] leading-4 text-tertiary">{entry.cycle}</span>
                  )}
                </span>
                <span>{entry.amount}</span>
                <span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium leading-4 text-[#149d46]">
                    <span className="size-1.5 rounded-full bg-current" />
                    Paid
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => downloadPdf([entry])}
                  className="text-left text-[13px] font-medium leading-[18px] text-primary"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {editor === "method" && (
        <TeamDialog
          title="Add payment method"
          subtitle="Used for escrow and GST payments."
          close={() => setEditor(null)}
        >
          <div className="rounded-lg border border-line bg-subtle px-3 py-2 text-[13px] leading-5 text-secondary">
            A new Mastercard ending in 9001 will be added to this workspace.
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditor(null)}
              className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addMethod}
              className="h-10 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white"
            >
              Add method
            </button>
          </div>
        </TeamDialog>
      )}
      {editor === "billing" && (
        <TeamDialog
          title="Edit billing details"
          subtitle="These details appear on every GST invoice."
          close={() => setEditor(null)}
        >
          <div className="grid gap-3">
            <Field
              label="Legal name"
              value={billing.legalName}
              onChange={(legalName) => setBilling((value) => ({ ...value, legalName }))}
            />
            <Field
              label="GSTIN"
              value={billing.gstin}
              onChange={(gstin) => setBilling((value) => ({ ...value, gstin }))}
            />
            <Field
              label="Address"
              value={billing.address}
              onChange={(address) => setBilling((value) => ({ ...value, address }))}
            />
            <Field
              label="Place of supply"
              value={billing.supply}
              onChange={(supply) => setBilling((value) => ({ ...value, supply }))}
            />
            <Field
              label="Invoices to"
              value={billing.invoicesTo}
              onChange={(invoicesTo) => setBilling((value) => ({ ...value, invoicesTo }))}
            />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditor(null)}
              className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveBilling}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white"
            >
              <Pencil size={14} />
              Save details
            </button>
          </div>
        </TeamDialog>
      )}
    </motion.div>
  );
}

type NotificationPreference = {
  id: string;
  label: string;
  description: string;
  email: boolean | null;
  inApp: boolean;
};

const notificationGroups: Array<{
  label: string;
  events: NotificationPreference[];
}> = [
  {
    label: "Applications and invites",
    events: [
      {
        id: "new-application",
        label: "New application",
        description: "A creator applies to a project",
        email: false,
        inApp: true,
      },
      {
        id: "invite-response",
        label: "Invite accepted or declined",
        description: "Including counter-offers on fee",
        email: true,
        inApp: true,
      },
    ],
  },
  {
    label: "Content",
    events: [
      {
        id: "content-for-approval",
        label: "Content sent for approval",
        description: "Drafts and files waiting for you",
        email: true,
        inApp: true,
      },
      {
        id: "post-live",
        label: "Post went live",
        description: "We checked the link works",
        email: false,
        inApp: true,
      },
      {
        id: "deliverable-late",
        label: "Deliverable is late",
        description: "Not posted by the date you set",
        email: true,
        inApp: true,
      },
    ],
  },
  {
    label: "Shipping",
    events: [
      {
        id: "product-delivered",
        label: "Product delivered",
        description: "Courier or creator confirmed it",
        email: false,
        inApp: true,
      },
      {
        id: "delivery-problem",
        label: "Delivery problem",
        description: "Returned, damaged or wrong item",
        email: null,
        inApp: true,
      },
    ],
  },
  {
    label: "Payments",
    events: [
      {
        id: "payment-charged",
        label: "Payment charged",
        description: "Into escrow or GST",
        email: false,
        inApp: true,
      },
      {
        id: "payment-released",
        label: "Payment released to a creator",
        description: "After you approve",
        email: false,
        inApp: true,
      },
      {
        id: "refund-dispute",
        label: "Refund or dispute",
        description: "Any change to your money",
        email: true,
        inApp: true,
      },
    ],
  },
  {
    label: "Reports",
    events: [
      {
        id: "weekly-results",
        label: "Weekly results",
        description: "Every Monday at 9 am",
        email: false,
        inApp: false,
      },
    ],
  },
];

function NotificationCheckbox({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={checked}
      onClick={onClick}
      className={`grid size-4 place-items-center rounded-[4px] border transition focus:outline-none focus:ring-2 focus:ring-primary/25 ${
        checked
          ? "border-primary bg-primary text-white"
          : "border-[#cbd2dc] bg-white text-transparent hover:border-primary"
      }`}
    >
      <Check size={12} strokeWidth={3} aria-hidden="true" />
    </button>
  );
}

function NotificationsSettings() {
  const [preferences, setPreferences] = useState(() =>
    Object.fromEntries(
      notificationGroups.flatMap((group) =>
        group.events.map((event) => [event.id, { email: event.email, inApp: event.inApp }]),
      ),
    ),
  );

  const togglePreference = (eventId: string, channel: "email" | "inApp") => {
    setPreferences((current) => ({
      ...current,
      [eventId]: {
        ...current[eventId],
        [channel]: !current[eventId][channel],
      },
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-xl border border-[#e5e7eb] bg-white p-5"
    >
      <div>
        <h2 className="text-[16px] font-semibold leading-6 text-[#070b13]">Notifications</h2>
        <p className="text-[12px] leading-4 text-[#8491a3]">Choose how you hear about each event</p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#e5e7eb]">
        <div className="min-w-[460px]">
          <div className="grid grid-cols-[minmax(0,1fr)_90px_90px] gap-3 bg-[#f3f5f7] px-3.5 py-[9px] text-[12px] font-medium leading-4 text-[#8491a3]">
            <span>EVENT</span>
            <span className="text-center">EMAIL</span>
            <span className="text-center">IN APP</span>
          </div>

          {notificationGroups.map((group) => (
            <div key={group.label}>
              <p className="border-t border-[#edeff3] px-3.5 pb-1 pt-2.5 text-[13px] font-semibold leading-4 text-[#070b13]">
                {group.label}
              </p>
              {group.events.map((event) => {
                const preference = preferences[event.id];
                return (
                  <div
                    key={event.id}
                    className="grid grid-cols-[minmax(0,1fr)_90px_90px] items-center gap-3 px-3.5 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium leading-4 text-[#070b13]">
                        {event.label}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      {preference.email !== null && (
                        <NotificationCheckbox
                          checked={preference.email}
                          label={`${event.label}: email notifications`}
                          onClick={() => togglePreference(event.id, "email")}
                        />
                      )}
                    </div>
                    <div className="flex justify-center">
                      <NotificationCheckbox
                        checked={preference.inApp}
                        label={`${event.label}: in-app notifications`}
                        onClick={() => togglePreference(event.id, "inApp")}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SecurityToggle({
  enabled,
  label,
  onChange,
}: {
  enabled: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onChange}
      className="flex items-center gap-2.5 text-left focus:outline-none"
    >
      <span
        className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition ${
          enabled ? "justify-end bg-primary" : "justify-start bg-[#cbd2dc]"
        }`}
      >
        <span className="size-4 rounded-full bg-white shadow-[0_1px_2px_rgba(8,10,20,.2)]" />
      </span>
      <span className="text-[13px] leading-5 text-[#070b13]">{label}</span>
    </button>
  );
}

function SecuritySettings() {
  const [email, setEmail] = useState("ananya@minimalist.in");
  const [googleConnected, setGoogleConnected] = useState(true);
  const [requireTwoStep, setRequireTwoStep] = useState(true);
  const [paymentTwoStep, setPaymentTwoStep] = useState(true);
  const [paymentDelay, setPaymentDelay] = useState(true);
  const [signInAlerts, setSignInAlerts] = useState(true);
  const [passwords, setPasswords] = useState({ current: "", next: "" });
  const [sessions, setSessions] = useState([
    {
      id: "macbook",
      device: "MacBook Pro · Chrome",
      subline: "This device",
      location: "Mumbai, IN",
      active: "Now",
      current: true,
    },
    {
      id: "iphone",
      device: "iPhone 15 · Kreyio app",
      location: "Mumbai, IN",
      active: "2 h ago",
      current: false,
    },
    {
      id: "windows",
      device: "Windows · Edge",
      location: "Pune, IN",
      active: "3 days ago",
      current: false,
    },
  ]);
  const [dialog, setDialog] = useState<"email" | "password" | "two-step" | "codes" | null>(null);
  const [notice, setNotice] = useState("");
  const [showAllActivity, setShowAllActivity] = useState(false);

  const closeDialog = () => setDialog(null);
  const signOut = (id: string) => {
    setSessions((current) => current.filter((session) => session.id !== id));
    setNotice("Device signed out.");
  };
  const signOutAllOthers = () => {
    setSessions((current) => current.filter((session) => session.current));
    setNotice("All other devices have been signed out.");
  };

  const securityRows = [
    ["Email", email, () => setDialog("email")],
    ["Password", "Last changed 14 Aug 2026", () => setDialog("password")],
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-4"
    >
      {notice && (
        <p
          role="status"
          className="rounded-lg bg-[#e1fce3] px-3 py-2 text-[12px] font-medium leading-4 text-[#149d46]"
        >
          {notice}
        </p>
      )}
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-5">
          <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <div>
              <h2 className="text-[16px] font-semibold leading-6 text-[#070b13]">Sign in</h2>
              <p className="text-[12px] leading-4 text-[#8491a3]">How you get into Kreyio</p>
            </div>
            <div className="mt-3.5">
              {securityRows.map(([label, value, action]) => (
                <div
                  key={label}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#edeff3] py-2.5 text-[13px] leading-5"
                >
                  <span className="w-[150px] shrink-0 text-[#8491a3]">{label}</span>
                  <span className="min-w-0 flex-1 font-medium text-[#070b13]">{value}</span>
                  <button
                    type="button"
                    onClick={action}
                    className="font-medium text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>
              ))}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#edeff3] py-2.5 text-[13px] leading-5">
                <span className="w-[150px] shrink-0 text-[#8491a3]">Google sign-in</span>
                <span className="min-w-0 flex-1 font-medium text-[#070b13]">
                  {googleConnected ? `Connected · ${email}` : "Not connected"}
                </span>
                {googleConnected && (
                  <button
                    type="button"
                    onClick={() => {
                      setGoogleConnected(false);
                      setNotice("Google sign-in removed.");
                    }}
                    className="font-medium text-primary hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-semibold leading-6 text-[#070b13]">
                  Two-step verification
                </h2>
                <p className="text-[12px] leading-4 text-[#8491a3]">
                  A code from your phone each time you sign in
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium leading-4 text-[#149d46]">
                <span className="size-1.5 rounded-full bg-current" />
                On
              </span>
            </div>
            <div className="mt-3.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#edeff3] py-2.5 text-[13px] leading-5">
                <span className="w-[150px] shrink-0 text-[#8491a3]">Method</span>
                <span className="min-w-0 flex-1 font-medium text-[#070b13]">
                  Authenticator app · set up 12 Mar 2026
                </span>
                <button
                  type="button"
                  onClick={() => setDialog("two-step")}
                  className="font-medium text-primary hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#edeff3] py-2.5 text-[13px] leading-5">
                <span className="w-[150px] shrink-0 text-[#8491a3]">Backup codes</span>
                <span className="min-w-0 flex-1 font-medium text-[#070b13]">8 of 10 left</span>
                <button
                  type="button"
                  onClick={() => setDialog("codes")}
                  className="font-medium text-primary hover:underline"
                >
                  View codes
                </button>
              </div>
            </div>
            <div className="mt-3.5 border-t border-[#edeff3] pt-3.5">
              <SecurityToggle
                enabled={requireTwoStep}
                onChange={() => setRequireTwoStep((value) => !value)}
                label="Require two-step for everyone in this workspace"
              />
            </div>
          </section>

          <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <div className="flex flex-wrap items-start gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-semibold leading-6 text-[#070b13]">
                  Where you’re signed in
                </h2>
                <p className="text-[12px] leading-4 text-[#8491a3]">
                  Sign out anything you don’t recognise
                </p>
              </div>
              <button
                type="button"
                onClick={signOutAllOthers}
                disabled={sessions.length === 1}
                className="h-8 rounded-lg border border-line px-3 text-[13px] font-medium leading-[18px] text-ink hover:bg-subtle disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sign out all others
              </button>
            </div>
            <div className="mt-3.5 overflow-x-auto rounded-[10px] border border-[#e5e7eb]">
              <div className="min-w-[610px]">
                <div className="grid grid-cols-[minmax(190px,1fr)_140px_120px_80px] gap-3 bg-[#f3f5f7] px-3.5 py-[9px] text-[12px] font-medium leading-4 text-[#8491a3]">
                  <span>DEVICE</span>
                  <span>LOCATION</span>
                  <span>LAST ACTIVE</span>
                  <span />
                </div>
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="grid grid-cols-[minmax(190px,1fr)_140px_120px_80px] items-center gap-3 border-t border-[#edeff3] px-3.5 py-3 text-[13px] leading-4 text-[#070b13]"
                  >
                    <div>
                      <p>{session.device}</p>
                      {session.subline && (
                        <p className="mt-0.5 text-[12px] leading-4 text-[#8491a3]">
                          {session.subline}
                        </p>
                      )}
                    </div>
                    <span>{session.location}</span>
                    <span>{session.active}</span>
                    {!session.current && (
                      <button
                        type="button"
                        onClick={() => signOut(session.id)}
                        className="text-left font-medium leading-5 text-primary hover:underline"
                      >
                        Sign out
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <h2 className="text-[16px] font-semibold leading-6 text-[#070b13]">Payment safety</h2>
            <p className="text-[12px] leading-4 text-[#8491a3]">Extra checks before money moves</p>
            <div className="mt-3.5 space-y-3.5">
              <SecurityToggle
                enabled={paymentTwoStep}
                onChange={() => setPaymentTwoStep((value) => !value)}
                label="Ask for a two-step code on payments over ₹50,000"
              />
              <SecurityToggle
                enabled={paymentDelay}
                onChange={() => setPaymentDelay((value) => !value)}
                label="New payment methods wait 24 h before first use"
              />
            </div>
            <p className="mt-3.5 text-[12px] leading-4 text-[#8491a3]">
              Works with Spend controls in Billing.
            </p>
          </section>

          <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <h2 className="text-[16px] font-semibold leading-6 text-[#070b13]">Sign-in alerts</h2>
            <p className="text-[12px] leading-4 text-[#8491a3]">Know when someone signs in</p>
            <div className="mt-3.5">
              <SecurityToggle
                enabled={signInAlerts}
                onChange={() => setSignInAlerts((value) => !value)}
                label="Email me about sign-ins from a new device"
              />
            </div>
          </section>

          <section className="rounded-xl border border-[#e5e7eb] bg-white p-5">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-[16px] font-semibold leading-6 text-[#070b13]">
                  Recent activity
                </h2>
                <p className="text-[12px] leading-4 text-[#8491a3]">
                  Last 7 days in this workspace
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllActivity((value) => !value)}
                className="shrink-0 text-[12px] font-medium leading-4 text-primary hover:underline"
              >
                {showAllActivity ? "Show less" : "View all"}
              </button>
            </div>
            <div className="mt-3.5">
              {[
                ["28 Oct, 10:12", "Ananya added Visa •••• 4242"],
                ["27 Oct, 18:40", "Ananya changed billing address"],
                ["26 Oct, 09:05", "New sign-in · iPhone 15 · Mumbai"],
                ...(showAllActivity
                  ? [["23 Oct, 14:30", "Ananya updated notification settings"]]
                  : []),
              ].map(([date, event]) => (
                <div
                  key={`${date}-${event}`}
                  className="flex gap-3 border-t border-[#edeff3] py-2.5 text-[13px] leading-5"
                >
                  <span className="w-[100px] shrink-0 text-[#8491a3]">{date}</span>
                  <span className="font-medium text-[#070b13]">{event}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {dialog === "email" && (
        <TeamDialog
          title="Change email"
          subtitle="We’ll use this address for sign-in and account notices."
          close={closeDialog}
        >
          <Field label="Email address" value={email} onChange={setEmail} />
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeDialog}
              className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                closeDialog();
                setNotice("Email address updated.");
              }}
              className="h-10 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white"
            >
              Save email
            </button>
          </div>
        </TeamDialog>
      )}
      {dialog === "password" && (
        <TeamDialog
          title="Change password"
          subtitle="Use a unique password you do not use elsewhere."
          close={closeDialog}
        >
          <div className="grid gap-3">
            <Field
              label="Current password"
              value={passwords.current}
              placeholder="Enter current password"
              onChange={(current) => setPasswords((value) => ({ ...value, current }))}
            />
            <Field
              label="New password"
              value={passwords.next}
              placeholder="At least 12 characters"
              onChange={(next) => setPasswords((value) => ({ ...value, next }))}
            />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeDialog}
              className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium text-ink hover:bg-subtle"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                closeDialog();
                setNotice("Password updated.");
              }}
              className="h-10 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white"
            >
              Update password
            </button>
          </div>
        </TeamDialog>
      )}
      {dialog === "two-step" && (
        <TeamDialog
          title="Change two-step method"
          subtitle="Use an authenticator app for the most secure sign-in."
          close={closeDialog}
        >
          <button
            type="button"
            onClick={() => {
              closeDialog();
              setNotice("Authenticator app remains your two-step method.");
            }}
            className="flex w-full items-center justify-between rounded-lg bg-primary-subtle px-3 py-3 text-left text-[13px] font-medium text-primary"
          >
            Authenticator app
            <Check size={16} />
          </button>
        </TeamDialog>
      )}
      {dialog === "codes" && (
        <TeamDialog
          title="Backup codes"
          subtitle="Store these one-time codes somewhere secure."
          close={closeDialog}
        >
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-subtle p-3 font-mono text-[13px] text-ink">
            {[
              "FLW-8241",
              "FLW-1193",
              "FLW-4572",
              "FLW-9031",
              "FLW-2648",
              "FLW-7359",
              "FLW-3184",
              "FLW-6620",
            ].map((code) => (
              <span key={code}>{code}</span>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => {
                closeDialog();
                setNotice("New backup codes generated.");
              }}
              className="h-10 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white"
            >
              Generate new codes
            </button>
          </div>
        </TeamDialog>
      )}
    </motion.div>
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
            ) : activeTab === "Integrations" ? (
              <IntegrationsSettings />
            ) : activeTab === "Billing & tax" ? (
              <BillingSettings />
            ) : activeTab === "Notifications" ? (
              <NotificationsSettings />
            ) : activeTab === "Security" ? (
              <SecuritySettings />
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
