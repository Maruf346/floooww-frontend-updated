import { useState, type ReactNode } from "react";
import { ArrowLeft, Check, FileText, Info, MessageSquareText, Paperclip, Send } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { disputes, type Dispute, type DisputeStatus } from "@/brand/pages/BrandPaymentsPage";
import { ROUTES } from "@/common/constants/routes";

type DisputeDetail = {
  deliverable: string;
  raised: string;
  briefDeadline: string;
  evidence: Array<{ title: string; meta: string; by: string }>;
  creatorReply: string;
};

const detailsById: Record<string, DisputeDetail> = {
  "dsp-0418": {
    deliverable: "2 × YouTube Short",
    raised: "26 Oct 2026",
    briefDeadline: "20 Oct",
    creatorReply: "The shoot moved due to rain; both Shorts are now live.",
    evidence: [
      { title: "Brief deadline: 20 Oct", meta: "Screenshot", by: "You" },
      { title: "YouTube live links × 2", meta: "Posted 25 Oct", by: "Rohan" },
      { title: "Message history", meta: "14 messages", by: "Auto" },
    ],
  },
  "dsp-0421": {
    deliverable: "1 × Instagram Reel",
    raised: "24 Oct 2026",
    briefDeadline: "18 Oct",
    creatorReply: "I have uploaded the revised cut and shared the live link for review.",
    evidence: [
      { title: "Brief deadline: 18 Oct", meta: "Screenshot", by: "You" },
      { title: "Instagram Reel link", meta: "Posted 23 Oct", by: "Tara" },
      { title: "Message history", meta: "9 messages", by: "Auto" },
    ],
  },
  "dsp-0377": {
    deliverable: "1 × Instagram Reel",
    raised: "19 Oct 2026",
    briefDeadline: "16 Oct",
    creatorReply:
      "The supplied product was damaged in transit. I am ready to reshoot once replaced.",
    evidence: [
      { title: "Brief deadline: 16 Oct", meta: "Screenshot", by: "You" },
      { title: "Delivery condition photos", meta: "Uploaded 18 Oct", by: "Riya" },
      { title: "Message history", meta: "11 messages", by: "Auto" },
    ],
  },
};

const statusClasses: Record<DisputeStatus, string> = {
  "Waiting for you": "bg-[#fde4e3] text-[#db231f]",
  "Under review": "bg-[#feefce] text-[#d97706]",
  Resolved: "bg-[#f4f6fb] text-[#4a4a55]",
};

function StatusPill({ status }: { status: DisputeStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${statusClasses[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function TimelineItem({
  title,
  description,
  date,
  tone = "done",
  last = false,
  children,
}: {
  title: string;
  description: string;
  date: string;
  tone?: "done" | "current" | "future";
  last?: boolean;
  children?: ReactNode;
}) {
  const dot =
    tone === "done"
      ? "border-[#0d0d10] bg-[#0d0d10] text-white"
      : tone === "current"
        ? "border-[#db231f] bg-[#fde4e3] text-[#db231f]"
        : "border-[#e3e5ec] bg-[#f4f6fb] text-[#94a3b8]";

  return (
    <div className="relative grid grid-cols-[28px_minmax(0,1fr)_auto] gap-x-3 pb-5 last:pb-0">
      {!last && <span className="absolute left-[13px] top-7 h-[calc(100%-18px)] w-px bg-line" />}
      <span className={`z-[1] mt-0.5 grid size-7 place-items-center rounded-full border ${dot}`}>
        {tone === "done" ? (
          <Check size={14} strokeWidth={2.5} />
        ) : (
          <span className="size-1.5 rounded-full bg-current" />
        )}
      </span>
      <div className="min-w-0">
        <h3 className="text-[14px] font-semibold leading-5 text-ink">{title}</h3>
        <p className="mt-0.5 text-[12px] leading-4 text-secondary">{description}</p>
        {children}
      </div>
      <p className="pt-1 text-right text-[12px] leading-4 text-secondary">{date}</p>
    </div>
  );
}

function EvidenceRow({ title, meta, by }: { title: string; meta: string; by: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line px-3 py-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-subtle text-secondary">
        <FileText size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium leading-5 text-ink">{title}</p>
        <p className="text-[12px] leading-4 text-secondary">{meta}</p>
      </div>
      <span className="shrink-0 text-[12px] leading-4 text-secondary">{by}</span>
    </div>
  );
}

function DetailSummary({ dispute, detail }: { dispute: Dispute; detail: DisputeDetail }) {
  return (
    <aside className="space-y-4 xl:sticky xl:top-5">
      <section className="rounded-xl border border-line bg-white p-5">
        <h2 className="text-[16px] font-semibold leading-6 text-ink">Dispute summary</h2>
        <dl className="mt-4 space-y-3">
          {[
            ["Creator", dispute.creator],
            ["Project", dispute.project],
            ["Deliverable", detail.deliverable],
            ["Amount frozen", dispute.amount],
            ["Raised", detail.raised],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 text-[13px] leading-5"
            >
              <dt className="text-secondary">{label}</dt>
              <dd className="text-right font-medium text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="rounded-xl border border-[#dce4ff] bg-[#f1f4ff] p-4">
        <div className="flex items-center gap-2 text-ink">
          <Info size={16} className="text-primary" />
          <h2 className="text-[14px] font-semibold leading-5">Possible outcomes</h2>
        </div>
        <p className="mt-2 text-[12px] leading-5 text-secondary">
          Full release · partial release + partial refund · full refund · redo by a new date. Fees
          on refunded amounts are returned.
        </p>
      </section>
    </aside>
  );
}

export function BrandPaymentDisputeDetailPage() {
  const navigate = useNavigate();
  const { disputeId } = useParams();
  const dispute =
    disputes.find((item) => item.id.toLowerCase() === disputeId?.toLowerCase()) ?? disputes[0];
  const detail = detailsById[dispute.id.toLowerCase()] ?? detailsById["dsp-0418"];
  const [status, setStatus] = useState<DisputeStatus>(dispute.status);
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [evidenceName, setEvidenceName] = useState("");

  const submitReply = () => {
    if (!reply.trim()) return;
    setReply("");
    setIsReplying(false);
    setStatus("Under review");
  };

  return (
    <BrandShell>
      <main className="mx-auto w-full max-w-[1440px] space-y-6 pb-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[12px] leading-4 text-tertiary">
              Payments&nbsp; / &nbsp;Disputes&nbsp; / &nbsp;{dispute.id}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <h1 className="text-[26px] font-bold leading-[34px] tracking-[-.01em] text-ink">
                {dispute.id} · {dispute.reason}
              </h1>
              <StatusPill status={status} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setStatus("Resolved")}
              className="inline-flex h-10 items-center rounded-lg border border-line bg-white px-4 text-[14px] font-medium text-ink transition hover:bg-subtle"
            >
              Withdraw dispute
            </button>
            <button
              type="button"
              onClick={() => setIsReplying(true)}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-[#27272a]"
            >
              <MessageSquareText size={16} />
              Reply
            </button>
          </div>
        </header>

        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-4">
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="rounded-xl border border-line bg-white p-5"
            >
              <h2 className="text-[16px] font-semibold leading-6 text-ink">Timeline</h2>
              <p className="mt-0.5 text-[12px] leading-4 text-secondary">
                Floooww decides within 5 working days of both replies.
              </p>
              <div className="mt-5">
                <TimelineItem
                  title="You raised the dispute"
                  description={`Reason: ${dispute.reason.toLowerCase()} · ${dispute.amount} frozen in escrow`}
                  date="26 Oct"
                />
                <TimelineItem
                  title={`${dispute.creator.split(" ")[0]} replied`}
                  description={`“${detail.creatorReply}”`}
                  date="27 Oct"
                />
                <TimelineItem
                  title="Your reply"
                  description="Accept the delivery or add evidence"
                  date="By 30 Oct"
                  tone="current"
                >
                  {isReplying && (
                    <div className="mt-3 rounded-lg border border-primary/30 bg-[#f8faff] p-3">
                      <textarea
                        autoFocus
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                        placeholder="Write your reply…"
                        className="min-h-20 w-full resize-y bg-transparent text-[13px] leading-5 text-ink outline-none placeholder:text-tertiary"
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsReplying(false)}
                          className="h-8 rounded-md px-3 text-[12px] font-medium text-secondary hover:bg-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={submitReply}
                          disabled={!reply.trim()}
                          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-[12px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Send size={13} />
                          Send reply
                        </button>
                      </div>
                    </div>
                  )}
                </TimelineItem>
                <TimelineItem
                  title="Floooww decision"
                  description="Release, partial release, refund or redo"
                  date="By 6 Nov"
                  tone="future"
                  last
                />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.08, ease: "easeOut" }}
              className="rounded-xl border border-line bg-white p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-semibold leading-6 text-ink">Evidence</h2>
                  <p className="mt-0.5 text-[12px] leading-4 text-secondary">
                    Files and records included with this case.
                  </p>
                </div>
                <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-primary transition hover:bg-[#f1f4ff]">
                  <Paperclip size={15} />
                  Add evidence
                  <input
                    type="file"
                    className="sr-only"
                    onChange={(event) => setEvidenceName(event.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>
              <div className="mt-4 space-y-2">
                {detail.evidence.map((evidence) => (
                  <EvidenceRow key={evidence.title} {...evidence} />
                ))}
                {evidenceName && (
                  <EvidenceRow title={evidenceName} meta="Added just now" by="You" />
                )}
              </div>
            </motion.section>
          </div>
          <DetailSummary dispute={dispute} detail={detail} />
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTES.brandPayments)}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-ink transition hover:bg-subtle"
        >
          <ArrowLeft size={16} />
          Back to payments
        </button>
      </main>
    </BrandShell>
  );
}
