import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Lock,
  Clock,
  ArrowRight,
  Plus,
  X,
  CheckCircle2,
  Paperclip,
  Building2,
  FolderKanban,
  FileText,
} from "lucide-react";
import { CREATOR_DISPUTES, type CreatorDisputeItem, type DisputeStatus } from "../data/disputesData";
import { creatorDisputeRoute } from "@/common/constants/routes";

function StatusBadge({ status }: { status: DisputeStatus }) {
  if (status === "Waiting for you") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#fde4e3] text-[#db231f]">
        <span className="size-1.5 rounded-full bg-[#db231f]" />
        Waiting for you
      </span>
    );
  }
  if (status === "Under review") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#eff4ff] text-[#3b5bff]">
        <span className="size-1.5 rounded-full bg-[#3b5bff]" />
        Under review
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#16a34a]">
      <span className="size-1.5 rounded-full bg-[#16a34a]" />
      Resolved
    </span>
  );
}

export function CreatorDisputesListContent() {
  const navigate = useNavigate();
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [raisedSuccess, setRaisedSuccess] = useState(false);

  // Raise dispute form state
  const [selectedProject, setSelectedProject] = useState("Vitamin-C Serum");
  const [selectedReason, setSelectedReason] = useState("Payment held unfairly");
  const [disputeAmount, setDisputeAmount] = useState("₹4,250");
  const [disputeNote, setDisputeNote] = useState("");

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRaiseModalOpen(false);
    setRaisedSuccess(true);
    setTimeout(() => setRaisedSuccess(false), 5000);
  };

  return (
    <div className="w-full flex flex-col gap-6" data-name="CreatorDisputesListContent">
      {raisedSuccess && (
        <div className="bg-[#e1fce3] border border-[#bbf7d0] rounded-[12px] p-4 flex items-start gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="size-5 text-[#16a34a] shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-[14px] font-semibold text-[#16a34a]">
              Dispute raised successfully
            </h4>
            <p className="text-[13px] text-[#15803d] mt-0.5">
              Case DSP-0428 has been logged. The brand has 5 days to respond, after which Kreyio mediation will make a binding decision.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRaisedSuccess(false)}
            className="text-[#16a34a] hover:text-[#15803d] p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 3 KPI Tiles matching Figma Node 1664:53828 */}
      <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Tile 1: Open */}
          <div className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col justify-between hover:border-[#cbd5e1] transition">
            <div className="flex items-center justify-between">
              <div className="size-9 rounded-[8px] bg-[#fde4e3] flex items-center justify-center text-[#db231f]">
                <AlertTriangle className="size-4.5 stroke-[2.2]" />
              </div>
            </div>
            <div className="mt-3.5">
              <p className="text-[12px] text-[#4a4a55] font-normal leading-4">
                Open
              </p>
              <p className="text-[22px] font-semibold text-[#0d0d10] tracking-[-0.33px] leading-7 mt-0.5">
                2
              </p>
            </div>
            <p className="mt-2 text-[12px] font-medium text-[#db231f] leading-4">
              1 needs your reply
            </p>
          </div>

          {/* Tile 2: Money frozen */}
          <div className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col justify-between hover:border-[#cbd5e1] transition">
            <div className="flex items-center justify-between">
              <div className="size-9 rounded-[8px] bg-[#feefce] flex items-center justify-center text-[#d97706]">
                <Lock className="size-4.5 stroke-[2.2]" />
              </div>
            </div>
            <div className="mt-3.5">
              <p className="text-[12px] text-[#4a4a55] font-normal leading-4">
                Money frozen
              </p>
              <p className="text-[22px] font-semibold text-[#0d0d10] tracking-[-0.33px] leading-7 mt-0.5">
                ₹15,000
              </p>
            </div>
            <p className="mt-2 text-[12px] font-medium text-[#6b7280] leading-4">
              held until decided
            </p>
          </div>

          {/* Tile 3: Avg days to resolve */}
          <div className="bg-white border border-[#edeff3] rounded-[12px] p-4 flex flex-col justify-between hover:border-[#cbd5e1] transition">
            <div className="flex items-center justify-between">
              <div className="size-9 rounded-[8px] bg-[#f1f4ff] flex items-center justify-center text-[#3b5bff]">
                <Clock className="size-4.5 stroke-[2.2]" />
              </div>
            </div>
            <div className="mt-3.5">
              <p className="text-[12px] text-[#4a4a55] font-normal leading-4">
                Avg days to resolve
              </p>
              <p className="text-[22px] font-semibold text-[#0d0d10] tracking-[-0.33px] leading-7 mt-0.5">
                4.2
              </p>
            </div>
            <p className="mt-2 text-[12px] font-medium text-[#6b7280] leading-4">
              last 90 days
            </p>
          </div>
        </div>
      </div>

      {/* Disputes Table matching Figma Node 1664:53832 */}
      <div className="bg-white border border-[#e5e7eb] rounded-[14px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fafbfe] border-b border-[#edeff3] text-[12px] font-semibold text-[#6b7280] tracking-wider uppercase">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Next</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edeff3] text-[13px] text-[#0d0d10]">
              {CREATOR_DISPUTES.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => navigate(creatorDisputeRoute(row.id))}
                  className="hover:bg-[#f8f9fb] transition cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-semibold text-[#0d0d10] group-hover:text-[#3b5bff] transition whitespace-nowrap">
                    {row.id}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`size-6 rounded-md ${row.brandColor} text-white text-[10px] font-semibold grid place-items-center`}>
                        {row.brandCode}
                      </span>
                      <span className="font-medium text-[#0d0d10]">{row.brand}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#4a4a55] whitespace-nowrap font-medium">
                    {row.project}
                  </td>
                  <td className="py-3.5 px-4 text-[#4a4a55] whitespace-nowrap">
                    {row.reason}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#0d0d10] whitespace-nowrap">
                    {row.amount}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3.5 px-4 text-[#6b7280] whitespace-nowrap">
                    <span className={row.status === "Waiting for you" ? "text-[#db231f] font-medium" : ""}>
                      {row.next}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <Link
                      to={creatorDisputeRoute(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-[6px] border border-[#e5e7eb] bg-white text-[12px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] hover:border-[#cbd5e1] transition shadow-2xs"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raise a Dispute Modal */}
      {isRaiseModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(7,11,19,0.45)] backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setIsRaiseModalOpen(false)}
        >
          <div
            className="bg-white rounded-[16px] shadow-2xl p-6 max-w-[520px] w-full flex flex-col gap-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#edeff3]">
              <div>
                <h3 className="text-[18px] font-semibold text-[#0d0d10]">
                  Raise a dispute
                </h3>
                <p className="text-[12px] text-[#6b7280] mt-0.5">
                  Escrowed funds will be frozen until resolved by mutual agreement or Kreyio mediation.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRaiseModalOpen(false)}
                className="p-1 rounded-md text-[#6b7280] hover:text-[#0d0d10] hover:bg-[#f4f6fb]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRaiseSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-[12px] font-medium text-[#0d0d10]">
                  Select project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-2.5 text-[13px] text-[#0d0d10] outline-none bg-white focus:border-[#3b5bff]"
                >
                  <option value="Vitamin-C Serum">Vitamin-C Serum (Minimalist)</option>
                  <option value="Glow Squad">Glow Squad (Minimalist)</option>
                  <option value="Lip Liner Collab">Lip Liner Collab (Velvet Lip Co.)</option>
                  <option value="Mist launch">Mist launch (Dewdrop Naturals)</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#0d0d10]">
                  Dispute reason
                </label>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-2.5 text-[13px] text-[#0d0d10] outline-none bg-white focus:border-[#3b5bff]"
                >
                  <option value="Payment held unfairly">Payment held unfairly after deliverables approved</option>
                  <option value="Unreasonable revision request">Unreasonable revision request outside brief</option>
                  <option value="Brand unresponsive">Brand unresponsive for more than 5 days</option>
                  <option value="Escrow discrepancy">Escrow balance discrepancy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#0d0d10]">
                  Disputed amount
                </label>
                <input
                  type="text"
                  value={disputeAmount}
                  onChange={(e) => setDisputeAmount(e.target.value)}
                  className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-2.5 text-[13px] text-[#0d0d10] outline-none focus:border-[#3b5bff]"
                  placeholder="e.g. ₹7,500"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#0d0d10]">
                  Details &amp; evidence explanation
                </label>
                <textarea
                  value={disputeNote}
                  onChange={(e) => setDisputeNote(e.target.value)}
                  rows={3}
                  required
                  className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-2.5 text-[13px] text-[#0d0d10] outline-none focus:border-[#3b5bff] resize-none"
                  placeholder="Explain clearly what happened and reference specific dates or deliverables..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#edeff3]">
                <button
                  type="button"
                  onClick={() => setIsRaiseModalOpen(false)}
                  className="px-4 py-2 rounded-[8px] border border-[#e5e7eb] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black/90 transition shadow-sm"
                >
                  Submit dispute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
