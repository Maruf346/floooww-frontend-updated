import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Clock,
  AlertCircle,
  FileText,
  ExternalLink,
  MessageSquare,
  Upload,
  X,
  CheckCircle2,
  Paperclip,
  Info,
} from "lucide-react";
import { CreatorShell } from "@/creator/components/CreatorShell";
import { CREATOR_DISPUTES, type CreatorDisputeItem } from "../data/disputesData";
import { ROUTES } from "@/common/constants/routes";

export function CreatorDisputeDetailPage() {
  const { disputeId } = useParams<{ disputeId: string }>();
  const navigate = useNavigate();

  const dispute =
    CREATOR_DISPUTES.find((d) => d.id.toLowerCase() === disputeId?.toLowerCase()) ||
    CREATOR_DISPUTES[0];

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // Success alert
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [replyMessage, setReplyMessage] = useState("");
  const [evidenceTitle, setEvidenceTitle] = useState("");
  const [evidenceLink, setEvidenceLink] = useState("");

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReplyOpen(false);
    setSuccessMessage("Your reply has been submitted. Velvet Lip Co. and Kreyio mediators have been notified.");
    setTimeout(() => setSuccessMessage(null), 6000);
  };

  const handleAddEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddEvidenceOpen(false);
    setSuccessMessage(`Evidence "${evidenceTitle}" has been attached to case ${dispute.id}.`);
    setTimeout(() => setSuccessMessage(null), 6000);
  };

  const handleWithdrawConfirm = () => {
    setIsWithdrawOpen(false);
    setSuccessMessage(`Dispute ${dispute.id} has been withdrawn.`);
    setTimeout(() => {
      navigate(ROUTES.creatorDisputes);
    }, 1500);
  };

  return (
    <CreatorShell>
      <div className="w-full bg-white text-[#0d0d10]" data-node-id="1664:54353" data-name="CR-08c · Dispute detail">
        <div className="w-full px-[20px] sm:px-[32px] pt-[28px] pb-[48px] flex flex-col gap-[24px]">
          {/* Breadcrumb matching Figma node 1664:54360 */}
          <nav className="flex items-center gap-2 text-[12px] text-[#8491a3] font-normal">
            <Link to={ROUTES.creatorEarnings} className="hover:text-[#3b5bff] transition">
              Earnings
            </Link>
            <span>/</span>
            <Link to={ROUTES.creatorDisputes} className="hover:text-[#3b5bff] transition">
              Disputes
            </Link>
            <span>/</span>
            <span className="text-[#0d0d10] font-medium">{dispute.id}</span>
          </nav>

          {/* Success Banner */}
          {successMessage && (
            <div className="bg-[#e1fce3] border border-[#bbf7d0] rounded-[12px] p-4 flex items-start gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="size-5 text-[#16a34a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[13px] font-medium text-[#15803d]">
                  {successMessage}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="text-[#16a34a] hover:text-[#15803d] p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#edeff3]">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <h1 className="text-[26px] font-semibold text-[#0d0d10] tracking-[-0.2px]">
                  {dispute.id} · {dispute.reason}
                </h1>
                {dispute.status === "Waiting for you" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#fde4e3] text-[#db231f]">
                    <span className="size-1.5 rounded-full bg-[#db231f]" />
                    Waiting for you
                  </span>
                ) : dispute.status === "Under review" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#eff4ff] text-[#3b5bff]">
                    <span className="size-1.5 rounded-full bg-[#3b5bff]" />
                    Under review
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#16a34a]">
                    <span className="size-1.5 rounded-full bg-[#16a34a]" />
                    Resolved
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[#6b7280]">
                Raised with {dispute.brand} on {dispute.raisedDate}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsWithdrawOpen(true)}
                className="px-4 py-2 rounded-[8px] border border-[#e5e7eb] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition shadow-2xs"
              >
                Withdraw dispute
              </button>
              <button
                type="button"
                onClick={() => setIsReplyOpen(true)}
                className="px-4 py-2 rounded-[8px] bg-[#0d0d10] text-white text-[13px] font-medium hover:bg-black/90 transition shadow-xs"
              >
                Reply
              </button>
            </div>
          </div>

          {/* 2-Column Content Layout matching Figma Node 1664:54367 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Timeline & Evidence (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Timeline Section */}
              <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-xs flex flex-col gap-5">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#0d0d10]">
                    Timeline
                  </h3>
                  <p className="text-[12px] text-[#6b7280] mt-0.5">
                    Kreyio decides within 5 working days of both replies
                  </p>
                </div>

                <div className="flex flex-col relative pl-6 border-l-2 border-[#edeff3] space-y-6 my-2">
                  {dispute.timeline.map((event, idx) => {
                    const isDone = event.status === "done";
                    const isCurrent = event.status === "current";

                    return (
                      <div key={event.id} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[31px] top-0 size-4 rounded-full border-2 flex items-center justify-center ${
                            isDone
                              ? "bg-[#0d0d10] border-[#0d0d10] text-white"
                              : isCurrent
                              ? "bg-[#db231f] border-[#db231f] text-white ring-4 ring-[#fde4e3]"
                              : "bg-white border-[#d1d5db]"
                          }`}
                        >
                          {isDone && <Check size={10} strokeWidth={3} />}
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4
                              className={`text-[13px] ${
                                isDone
                                  ? "font-semibold text-[#0d0d10]"
                                  : isCurrent
                                  ? "font-semibold text-[#db231f]"
                                  : "font-medium text-[#6b7280]"
                              }`}
                            >
                              {event.title}
                            </h4>
                            <p className="text-[12px] text-[#4a4a55] mt-0.5 leading-relaxed">
                              {event.detail}
                            </p>
                          </div>
                          <span className="text-[11px] font-medium text-[#8491a3] shrink-0">
                            {event.date}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Evidence Section */}
              <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold text-[#0d0d10]">
                    Evidence
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsAddEvidenceOpen(true)}
                    className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                  >
                    + Add evidence
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-[#edeff3]">
                  {dispute.evidence.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-4 hover:bg-[#fafbfe] rounded-[8px] px-2 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-8 rounded-md bg-[#f4f6fb] text-[#6b7280] grid place-items-center shrink-0">
                          {item.type === "link" ? (
                            <ExternalLink size={15} />
                          ) : item.type === "messages" ? (
                            <MessageSquare size={15} />
                          ) : (
                            <FileText size={15} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-[#0d0d10] truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-[#8491a3]">
                            Added by {item.by} {item.date ? `· ${item.date}` : ""}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#f1f4ff] text-[#3b5bff] shrink-0">
                        {item.by}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Summary & Outcomes (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 shadow-xs flex flex-col gap-4">
                <h3 className="text-[16px] font-semibold text-[#0d0d10] pb-2 border-b border-[#edeff3]">
                  Summary
                </h3>

                <div className="flex flex-col gap-3 text-[13px]">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#6b7280]">Brand</span>
                    <span className="font-medium text-[#0d0d10]">{dispute.brand}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#6b7280]">Project</span>
                    <span className="font-medium text-[#0d0d10]">{dispute.project}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#6b7280]">Deliverable</span>
                    <span className="font-medium text-[#0d0d10]">{dispute.deliverable}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#6b7280]">Amount frozen</span>
                    <span className="font-semibold text-[#0d0d10]">{dispute.amount}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#6b7280]">Raised</span>
                    <span className="font-medium text-[#0d0d10]">{dispute.raisedDate}</span>
                  </div>
                </div>

                {/* Possible Outcomes Box */}
                <div className="mt-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] p-4 text-[12px]">
                  <h4 className="font-semibold text-[#0d0d10] mb-1">
                    Possible outcomes
                  </h4>
                  <p className="text-[#475569] leading-relaxed">
                    {dispute.outcomesNote ||
                      "Full release · partial release + partial refund · full refund · redo by a new date. Fees on refunded amounts are returned."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reply Modal */}
        {isReplyOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(7,11,19,0.45)] backdrop-blur-xs p-4 animate-in fade-in duration-150"
            onClick={() => setIsReplyOpen(false)}
          >
            <div
              className="bg-white rounded-[16px] shadow-2xl p-6 max-w-[500px] w-full flex flex-col gap-4 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#edeff3]">
                <h3 className="text-[17px] font-semibold text-[#0d0d10]">
                  Reply to {dispute.brand}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsReplyOpen(false)}
                  className="p-1 rounded-md text-[#6b7280] hover:text-[#0d0d10]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleReplySubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[12px] font-medium text-[#0d0d10]">
                    Your message / explanation
                  </label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                    required
                    placeholder="Describe your side of the dispute clearly. Kreyio mediators review all messages."
                    className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-3 text-[13px] text-[#0d0d10] outline-none focus:border-[#3b5bff] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#edeff3]">
                  <button
                    type="button"
                    onClick={() => setIsReplyOpen(false)}
                    className="px-4 py-2 rounded-[8px] border border-[#e5e7eb] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-[8px] bg-[#0d0d10] text-white text-[13px] font-medium hover:bg-black/90"
                  >
                    Send reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Evidence Modal */}
        {isAddEvidenceOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(7,11,19,0.45)] backdrop-blur-xs p-4 animate-in fade-in duration-150"
            onClick={() => setIsAddEvidenceOpen(false)}
          >
            <div
              className="bg-white rounded-[16px] shadow-2xl p-6 max-w-[480px] w-full flex flex-col gap-4 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#edeff3]">
                <h3 className="text-[17px] font-semibold text-[#0d0d10]">
                  Attach evidence
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddEvidenceOpen(false)}
                  className="p-1 rounded-md text-[#6b7280] hover:text-[#0d0d10]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddEvidenceSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[12px] font-medium text-[#0d0d10]">
                    Evidence title
                  </label>
                  <input
                    type="text"
                    value={evidenceTitle}
                    onChange={(e) => setEvidenceTitle(e.target.value)}
                    required
                    placeholder="e.g. Screenshot of DM approval, Link to live Reel"
                    className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-2.5 text-[13px] text-[#0d0d10] outline-none focus:border-[#3b5bff]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#0d0d10]">
                    Link or URL (optional)
                  </label>
                  <input
                    type="text"
                    value={evidenceLink}
                    onChange={(e) => setEvidenceLink(e.target.value)}
                    placeholder="e.g. https://instagram.com/p/..."
                    className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-2.5 text-[13px] text-[#0d0d10] outline-none focus:border-[#3b5bff]"
                  />
                </div>

                <div className="border border-dashed border-[#d1d5db] rounded-[10px] p-4 text-center bg-[#fafbfe]">
                  <Upload size={20} className="mx-auto text-[#6b7280] mb-1" />
                  <p className="text-[12px] text-[#0d0d10] font-medium">Upload file</p>
                  <p className="text-[11px] text-[#9ca3af]">PNG, JPG, PDF or MP4 up to 50MB</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#edeff3]">
                  <button
                    type="button"
                    onClick={() => setIsAddEvidenceOpen(false)}
                    className="px-4 py-2 rounded-[8px] border border-[#e5e7eb] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-[8px] bg-[#0d0d10] text-white text-[13px] font-medium hover:bg-black/90"
                  >
                    Add evidence
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Withdraw Dispute Confirmation Modal */}
        {isWithdrawOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(7,11,19,0.45)] backdrop-blur-xs p-4 animate-in fade-in duration-150"
            onClick={() => setIsWithdrawOpen(false)}
          >
            <div
              className="bg-white rounded-[16px] shadow-2xl p-6 max-w-[420px] w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="size-11 rounded-full bg-[#fef2f2] text-[#ef4444] grid place-items-center mb-3">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-[17px] font-semibold text-[#0d0d10]">
                Withdraw dispute?
              </h3>
              <p className="text-[13px] text-[#6b7280] mt-1 leading-relaxed">
                Withdrawing case {dispute.id} will release escrowed funds according to standard contract terms and close the dispute.
              </p>
              <div className="flex items-center gap-3 w-full mt-6">
                <button
                  type="button"
                  onClick={() => setIsWithdrawOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-[8px] border border-[#e5e7eb] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb]"
                >
                  Keep dispute open
                </button>
                <button
                  type="button"
                  onClick={handleWithdrawConfirm}
                  className="flex-1 px-4 py-2.5 rounded-[8px] bg-[#ef4444] text-white text-[13px] font-medium hover:bg-[#dc2626]"
                >
                  Yes, withdraw
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CreatorShell>
  );
}

export default CreatorDisputeDetailPage;
