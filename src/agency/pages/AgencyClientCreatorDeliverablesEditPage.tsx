import { useMemo, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Info,
  Link2,
  Lock,
  Pencil,
  Plus,
  RotateCcw,
  Send,
  Tag,
} from "lucide-react";
import { AgencyClientShell } from "@/agency/components/AgencyClientShell";
import { Button } from "@/common/components/ui/Button";
import { DeadlinePicker } from "@/common/components/ui/DeadlinePicker";
import { Dropdown } from "@/common/components/ui/Dropdown";
import {
  agencyClientInvitedCreatorRoute,
  agencyClientProjectDetailRoute,
  agencyClientProjectsRoute,
} from "@/common/constants/routes";
import { getProject } from "@/brand/data/projects";
import { getProjectRules } from "@/brand/data/projectRules";
import { getCreatorProfile } from "@/brand/pages/project-applications/creatorProfileData";

type Status = "Approved · locked" | "Posted · locked" | "Not started" | "Upcoming" | "Added · new";
type Deliverable = {
  id: string;
  type: string;
  platform: string;
  deadline: string;
  tracking: string;
  coupon: string;
  status: Status;
  fee: string;
  usage: string;
  product: string;
  shipping: string;
  brief: string;
  locked?: boolean;
  changed?: boolean;
};

const typeOptions = [
  "1 Reel · kit routine",
  "1 Story · code reminder",
  "1 Story · results check-in",
  "1 Story · code + swatch",
  "1 Short · gifting",
];
const platforms = ["Instagram", "YouTube", "Pinterest", "Snapchat"];
const usageOptions = ["Organic", "Paid social · 30 days", "Paid social · 90 days", "Perpetual"];
const productOptions = ["Glow Squad kit", "Vitamin C Glow Serum", "Festive gift set"];
const shipmentOptions = ["Delivered 4 Nov", "Glow Squad kit · BD7731045…", "Select shipments"];

const firstCycle: Deliverable[] = [
  {
    id: "cycle-1-reel",
    type: "1 Reel · kit routine",
    platform: "Instagram",
    deadline: "2026-11-10",
    tracking: "flw.to/diya-reel",
    coupon: "SQUADDIYA",
    status: "Approved · locked",
    fee: "7500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Delivered 4 Nov",
    brief: "Unbox the kit in the first 3 seconds; say the code at the end",
    locked: true,
  },
  {
    id: "cycle-1-reminder",
    type: "1 Story · code reminder",
    platform: "Instagram",
    deadline: "2026-11-15",
    tracking: "flw.to/diya-st1",
    coupon: "SQUADDIYA",
    status: "Posted · locked",
    fee: "2500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Select shipments",
    brief: "Link sticker to flw.to/diya-st1; mention 10% off",
    locked: true,
  },
  {
    id: "cycle-1-check-in",
    type: "1 Story · results check-in",
    platform: "Instagram",
    deadline: "2026-11-24",
    tracking: "flw.to/diya-st2",
    coupon: "SQUADDIYA",
    status: "Not started",
    fee: "2500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Select shipments",
    brief: "Show day-14 skin texture; remind that code expires end of cycle",
  },
];

const secondCycle: Deliverable[] = [
  {
    id: "cycle-2-routine",
    type: "1 Reel · kit routine",
    platform: "Instagram",
    deadline: "2026-12-10",
    tracking: "flw.to/diya-c2-reel",
    coupon: "SQUADDIYA2",
    status: "Upcoming",
    fee: "7500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Glow Squad kit · BD7731045…",
    brief: "Focus on one product from the kit; mention long-term result",
  },
  {
    id: "cycle-2-story",
    type: "1 Story · code + swatch",
    platform: "Instagram",
    deadline: "2026-12-17",
    tracking: "flw.to/diya-c2-st1",
    coupon: "SQUADDIYA2",
    status: "Upcoming",
    fee: "2500",
    usage: "Organic",
    product: "Glow Squad kit",
    shipping: "Select shipments",
    brief: "Quick application before leaving; code sticker on top",
    changed: true,
  },
];

function money(amount: number | string): string {
  const n = typeof amount === "string" ? Number(amount || 0) : amount;
  return "₹" + n.toLocaleString("en-IN");
}

type OneTimeRow = {
  id: string;
  type: string;
  platform: string;
  deadline: string;
  tracking: string;
  coupon: string;
  fee: string;
  usage: string;
  product: string;
  shipping: string;
  brief: string;
  status: "Draft · locked" | "Live · locked" | "Live · editable" | "Draft · editable";
  locked?: boolean;
  added?: boolean;
  dateChanged?: boolean;
};

const oneTimeRows: OneTimeRow[] = [
  {
    id: "teaser",
    type: "1 Story · Teaser",
    platform: "Instagram",
    deadline: "12 Oct 2026",
    tracking: "flw.to/diya-c",
    coupon: "DIYA10",
    fee: "0",
    usage: "Organic",
    product: "Vitamin-C Serum (30ml)",
    shipping: "Delivered 10 Oct",
    brief: "Tease launch, show unboxing",
    status: "Live · locked",
    locked: true,
  },
  {
    id: "results",
    type: "1 Story · Results",
    platform: "Instagram",
    deadline: "31 Oct 2026",
    tracking: "flw.to/diya-c",
    coupon: "DIYA10",
    fee: "0",
    usage: "Organic",
    product: "Vitamin-C Serum (30ml)",
    shipping: "Delivered 10 Oct",
    brief: "Show 3-week glow, discount reminder, sticker link to buy",
    status: "Live · editable",
    dateChanged: true,
  },
];

export function AgencyClientCreatorDeliverablesEditPage({
  activeClientId,
}: {
  activeClientId?: string;
} = {}) {
  const { projectId = "1", creatorId = "diya", clientId: paramClientId } = useParams();
  const navigate = useNavigate();
  const clientId = activeClientId || paramClientId || "minimalist";

  const project = getProject(Number(projectId));
  const creatorProfile = getCreatorProfile(creatorId);
  const creator = {
    name: creatorProfile.name,
    handle: `@${creatorProfile.handle}`,
    avatar: creatorProfile.avatar,
  };

  const projectsUrl = agencyClientProjectsRoute(clientId);
  const projectUrl = agencyClientProjectDetailRoute(clientId, projectId);
  const invitedUrl = `${agencyClientProjectDetailRoute(clientId, projectId)}?tab=Invited creators`;
  const creatorProfileUrl = agencyClientInvitedCreatorRoute(clientId, projectId, creatorId);

  const [rows, setRows] = useState(oneTimeRows);
  const [editingId, setEditingId] = useState<string | null>("results");
  const [notice, setNotice] = useState<string | null>(null);

  const firstName = creator.name.split(" ")[0];

  const handleSave = () => {
    setNotice("Deliverable changes saved successfully");
    setTimeout(() => {
      navigate(creatorProfileUrl);
    }, 1200);
  };

  return (
    <AgencyClientShell activeClientId={clientId}>
      <div className="w-full pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-[12px] leading-4 text-secondary">
          <Link to={projectsUrl} className="hover:underline">Projects</Link>
          <span>/</span>
          <Link to={projectUrl} className="hover:underline">{project.name}</Link>
          <span>/</span>
          <Link to={invitedUrl} className="hover:underline">Invited creators</Link>
          <span>/</span>
          <Link to={creatorProfileUrl} className="hover:underline">
            {creator.name}
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">Edit deliverables</span>
        </nav>

        <header className="mt-4">
          <div className="flex items-center gap-2">
            <img
              src={creator.avatar.startsWith("http") ? creator.avatar : `/assets/creators/${creator.avatar}.png`}
              alt=""
              className="size-9 rounded-full object-cover"
            />
            <h1 className="!m-0 text-[26px] font-bold leading-[34px] tracking-[-.02em] text-ink">
              Edit {firstName}’s deliverables · {project.name}
            </h1>
          </div>
          <p className="mt-1 text-[13px] leading-5 text-secondary">
            Project deliverables workspace for {creator.name} ({creator.handle})
          </p>
        </header>

        <main className="mt-5 overflow-hidden rounded-xl border border-line bg-white shadow-sm">
          <div className="space-y-4 p-6">
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-subtle px-4 py-3.5">
              <div>
                <h2 className="text-[14px] font-semibold text-ink">{project.name}</h2>
                <p className="mt-0.5 text-[12px] text-secondary">{project.type} · Paid</p>
              </div>
              <span className="h-fit rounded-full bg-success-bg px-2.5 py-0.5 text-[12px] font-medium text-success">
                • Active
              </span>
            </section>

            <section className="overflow-hidden rounded-lg border border-line">
              <header className="flex flex-wrap items-center justify-between gap-3 bg-subtle px-4 py-3">
                <div className="flex items-start gap-2">
                  <RotateCcw size={16} className="mt-0.5 text-secondary" />
                  <div>
                    <h2 className="text-[14px] font-semibold text-ink">Deliverables list</h2>
                    <p className="mt-0.5 text-[12px] text-secondary">
                      Completed deliverables are locked; upcoming ones can be edited.
                    </p>
                  </div>
                </div>
              </header>

              <div className="divide-y divide-line">
                {rows.map((row) => (
                  <div key={row.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold text-ink">{row.type}</span>
                        {row.locked && (
                          <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-secondary">
                            <Lock size={12} /> Locked
                          </span>
                        )}
                        {row.dateChanged && (
                          <span className="inline-flex items-center gap-1 rounded bg-primary-subtle px-2 py-0.5 text-[11px] font-medium text-primary">
                            Revised deadline
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[12px] text-secondary">
                        Platform: {row.platform} · Deadline: {row.deadline} · Product: {row.product}
                      </p>
                      <p className="mt-0.5 text-[12px] text-tertiary">
                        Brief: {row.brief}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      {!row.locked && (
                        <button
                          type="button"
                          onClick={() => setEditingId(editingId === row.id ? null : row.id)}
                          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-[12px] font-medium text-ink hover:bg-subtle transition-colors"
                        >
                          <Pencil size={13} />
                          {editingId === row.id ? "Done" : "Edit"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line bg-subtle px-6 py-4">
            <p className="text-[13px] text-secondary">
              Changes will be updated in {firstName}’s contract and messages.
            </p>
            <div className="flex items-center gap-2">
              <Button kind="secondary" onClick={() => navigate(creatorProfileUrl)}>
                Cancel
              </Button>
              <Button onClick={handleSave} leadingIcon={<Send size={16} />}>
                Save changes
              </Button>
            </div>
          </footer>
        </main>

        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-lg bg-ink px-4 py-3 text-[13px] font-medium text-white shadow-lg"
          >
            {notice}
          </motion.div>
        )}
      </div>
    </AgencyClientShell>
  );
}
