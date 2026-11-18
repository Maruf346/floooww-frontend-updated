import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Trash2, Check } from "lucide-react";

export interface FeeRuleData {
  id: string;
  clientId: string | null; // null = default
  clientName: string;
  isDefault: boolean;
  percent: number;
  retainer: number;
  effectiveFrom: string;
  subtitle?: string;
}

interface AgencyFeeRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: FeeRuleData) => void;
  onDelete?: (ruleId: string) => void;
  initialRule?: FeeRuleData | null;
}

const CLIENT_OPTIONS = [
  { id: "all", name: "Default (all clients without a custom rule)" },
  { id: "minimalist", name: "Minimalist" },
  { id: "velvet", name: "Velvet Lip Co." },
  { id: "dewdrop", name: "Dewdrop Naturals" },
  { id: "strand", name: "Strand Studio" },
  { id: "petal", name: "Petal & Pine" },
];

export function AgencyFeeRuleModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialRule,
}: AgencyFeeRuleModalProps) {
  const isEditing = Boolean(initialRule);

  const [clientSelection, setClientSelection] = useState("all");
  const [percent, setPercent] = useState<number>(12);
  const [retainer, setRetainer] = useState<string>("0");
  const [effectiveFrom, setEffectiveFrom] = useState("Jan 2026");

  useEffect(() => {
    if (initialRule) {
      setClientSelection(initialRule.isDefault ? "all" : initialRule.clientId || "minimalist");
      setPercent(initialRule.percent);
      setRetainer(initialRule.retainer ? String(initialRule.retainer) : "0");
      setEffectiveFrom(initialRule.effectiveFrom || "Jan 2026");
    } else {
      setClientSelection("dewdrop");
      setPercent(10);
      setRetainer("15000");
      setEffectiveFrom("Feb 2026");
    }
  }, [initialRule, isOpen]);

  if (!isOpen) return null;

  const isDefaultRule = clientSelection === "all" || initialRule?.isDefault;

  const handleSave = () => {
    const selectedClientObj = CLIENT_OPTIONS.find((c) => c.id === clientSelection);
    const clientName = clientSelection === "all" ? "Default fee" : selectedClientObj?.name || "Client";
    const retainerNum = parseFloat(retainer.replace(/[^0-9]/g, "")) || 0;

    let sub = `Applied to every client project unless a client has its own rule`;
    if (clientSelection !== "all") {
      sub = `Client-specific rule · agreed ${effectiveFrom}`;
    }

    onSave({
      id: initialRule?.id || String(Date.now()),
      clientId: clientSelection === "all" ? null : clientSelection,
      clientName,
      isDefault: clientSelection === "all",
      percent,
      retainer: retainerNum,
      effectiveFrom,
      subtitle: sub,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[500px] rounded-[16px] bg-white p-6 shadow-2xl flex flex-col gap-5 border border-[#e3e5ec]"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold text-[#0d0d10]">
              {isEditing ? "Edit agency fee rule" : "Add agency fee rule"}
            </h2>
            <p className="text-[13px] text-[#71717a]">
              How you invoice clients for running campaigns on Kreyio
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#71717a] hover:bg-[#f4f6fb] hover:text-[#0d0d10] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {/* Client Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              Applies to
            </label>
            <select
              value={clientSelection}
              disabled={initialRule?.isDefault}
              onChange={(e) => setClientSelection(e.target.value)}
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none disabled:bg-[#f4f6fb] disabled:cursor-not-allowed cursor-pointer"
            >
              {CLIENT_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="text-[12px] text-[#8c94a0]">
              {isDefaultRule
                ? "This rule applies across all client projects unless overridden"
                : "This custom rule will override the agency default for this client"}
            </p>
          </div>

          {/* Grid: Percent of creator fees & Retainer amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#0d0d10]">
                Percent of creator fees (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={percent}
                  onChange={(e) => setPercent(parseFloat(e.target.value) || 0)}
                  className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 pr-8 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-[13px] text-[#71717a]">
                  %
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#0d0d10]">
                Monthly retainer (₹)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={retainer}
                  onChange={(e) => setRetainer(e.target.value)}
                  placeholder="0"
                  className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 pl-7 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                />
                <span className="absolute left-3 top-2.5 text-[13px] text-[#71717a]">
                  ₹
                </span>
              </div>
            </div>
          </div>

          {/* Effective From */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              Effective from
            </label>
            <input
              type="text"
              value={effectiveFrom}
              onChange={(e) => setEffectiveFrom(e.target.value)}
              placeholder="e.g. Jan 2026"
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          {isEditing && onDelete && !initialRule?.isDefault ? (
            <button
              type="button"
              onClick={() => {
                if (initialRule?.id) onDelete(initialRule.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-rose-600 hover:text-rose-700 transition cursor-pointer"
            >
              <Trash2 size={15} />
              <span>Delete rule</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#0d0d10] hover:text-[#71717a] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-[#0d0d10] px-4 text-[13px] font-medium text-white transition hover:bg-black cursor-pointer shadow-xs"
            >
              <Check size={15} />
              <span>{isEditing ? "Save changes" : "Add rule"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
