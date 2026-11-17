import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronUp, Check, Send } from "lucide-react";

export const COUNTER_OFFER_REASONS = [
  "My usual rate is higher",
  "Extra work (longer Reel, more frames)",
  "Usage rights or paid ads",
  "Short deadline",
  "Other",
] as const;

export type CounterOfferReason = (typeof COUNTER_OFFER_REASONS)[number];

export interface CounterOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
  rangeText?: string;
  postsText?: string;
  initialFee?: number;
  quickPicks?: number[];
  maxRange?: number;
  defaultNote?: string;
  onSend?: (offer: { fee: number; reason: string; note: string }) => void;
}

export function CounterOfferModal({
  isOpen,
  onClose,
  brandName = "Minimalist",
  rangeText = "Minimalist's range is ₹15,000 – ₹20,000 for 3 posts",
  postsText = "all 3 posts",
  initialFee = 24000,
  quickPicks = [22000, 25000],
  maxRange = 20000,
  defaultNote = "My Minimalist Reels averaged 2.8 L views and drove 392 orders in Vitamin-C Serum.",
  onSend,
}: CounterOfferModalProps) {
  const [fee, setFee] = useState<number>(initialFee);
  const [feeInput, setFeeInput] = useState<string>(`₹${initialFee.toLocaleString("en-IN")}`);
  const [selectedQuickPick, setSelectedQuickPick] = useState<number | "other">("other");
  const [reason, setReason] = useState<CounterOfferReason>("My usual rate is higher");
  const [reasonDropdownOpen, setReasonDropdownOpen] = useState(false);
  const [note, setNote] = useState<string>(defaultNote);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setReasonDropdownOpen(false);
      }
    }
    if (reasonDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [reasonDropdownOpen]);

  // Sync fee when initialFee changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setFee(initialFee);
      setFeeInput(`₹${initialFee.toLocaleString("en-IN")}`);
      if (quickPicks.includes(initialFee)) {
        setSelectedQuickPick(initialFee);
      } else {
        setSelectedQuickPick("other");
      }
      setNote(defaultNote);
      setIsSubmitted(false);
      setReasonDropdownOpen(false);
    }
  }, [isOpen, initialFee, defaultNote]);

  if (!isOpen) return null;

  const handleQuickPick = (amount: number) => {
    setSelectedQuickPick(amount);
    setFee(amount);
    setFeeInput(`₹${amount.toLocaleString("en-IN")}`);
  };

  const handleOtherClick = () => {
    setSelectedQuickPick("other");
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    const numericVal = rawVal ? parseInt(rawVal, 10) : 0;
    setFee(numericVal);
    setFeeInput(numericVal > 0 ? `₹${numericVal.toLocaleString("en-IN")}` : "");
    if (quickPicks.includes(numericVal)) {
      setSelectedQuickPick(numericVal);
    } else {
      setSelectedQuickPick("other");
    }
  };

  // 11.8% platform and service fee
  const receivedAmount = Math.round(fee * (1 - 0.118));
  const diffFromRange = fee - maxRange;

  let feeComparisonText = "";
  if (diffFromRange > 0) {
    feeComparisonText = `₹${diffFromRange.toLocaleString("en-IN")} above ${brandName}'s range`;
  } else if (diffFromRange < 0) {
    feeComparisonText = `₹${Math.abs(diffFromRange).toLocaleString("en-IN")} below ${brandName}'s range`;
  } else {
    feeComparisonText = `Within ${brandName}'s range`;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSend) {
      onSend({ fee, reason, note });
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[460px] rounded-[16px] bg-white p-[22px] shadow-[0px_20px_48px_-12px_rgba(13,13,16,0.18)] border border-[var(--border-default,#e3e5ec)]"
        onClick={(e) => e.stopPropagation()}
      >
        {isSubmitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="size-12 rounded-full bg-[#e1fce3] text-[#16a34a] flex items-center justify-center mb-4">
              <Check size={26} strokeWidth={2.5} />
            </div>
            <h3 className="font-['Inter:Bold'] font-bold text-[18px] text-[#0d0d10]">
              Counter offer sent!
            </h3>
            <p className="mt-1 text-[13px] text-[#6b7280]">
              Sent to {brandName} for ₹{fee.toLocaleString("en-IN")}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-['Inter:Bold'] font-bold text-[18px] leading-[24px] text-[color:var(--text-primary,#0d0d10)]">
                  Counter offer
                </h3>
                <p className="mt-[2px] font-['Inter:Regular'] font-normal text-[13px] leading-[18px] text-[color:var(--text-secondary,#6b7280)]">
                  {rangeText}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-[#6b7280] transition hover:bg-[#f3f4f6] hover:text-[#0d0d10]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick pick */}
            <div>
              <p className="font-['Inter:Medium'] font-medium text-[13px] text-[color:var(--text-primary,#0d0d10)]">
                Quick pick
              </p>
              <div className="mt-[8px] flex items-center gap-[8px]">
                {quickPicks.map((amount) => {
                  const isSelected = selectedQuickPick === amount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickPick(amount)}
                      className={`h-[34px] rounded-full px-[14px] text-[13px] font-medium transition cursor-pointer ${
                        isSelected
                          ? "border-2 border-[#0d0d10] text-[#0d0d10] bg-white font-semibold"
                          : "border border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
                      }`}
                    >
                      ₹{amount.toLocaleString("en-IN")}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={handleOtherClick}
                  className={`h-[34px] rounded-full px-[14px] text-[13px] font-medium transition cursor-pointer ${
                    selectedQuickPick === "other"
                      ? "border-2 border-[#0d0d10] text-[#0d0d10] bg-white font-semibold"
                      : "border border-[#d1d5db] text-[#374151] hover:bg-[#f9fafb]"
                  }`}
                >
                  Other amount
                </button>
              </div>
            </div>

            {/* Fee input */}
            <div>
              <label
                htmlFor="fee-input"
                className="block font-['Inter:Medium'] font-medium text-[13px] text-[color:var(--text-primary,#0d0d10)]"
              >
                Your fee for {postsText} <span className="text-[#ef4444]">*</span>
              </label>
              <div className="mt-[6px]">
                <input
                  id="fee-input"
                  type="text"
                  value={feeInput}
                  onChange={handleFeeChange}
                  className="h-[44px] w-full rounded-[8px] border-2 border-[#6366f1] bg-white px-[14px] text-[15px] font-medium text-[color:var(--text-primary,#0d0d10)] outline-none shadow-sm focus:border-[#4f46e5]"
                />
              </div>
              <p className="mt-[6px] text-[12px] leading-[16px] text-[color:var(--text-secondary,#6b7280)]">
                {feeComparisonText} · you receive ₹{receivedAmount.toLocaleString("en-IN")} after platform & service fee
              </p>
            </div>

            {/* Reason dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label className="block font-['Inter:Medium'] font-medium text-[13px] text-[color:var(--text-primary,#0d0d10)]">
                Reason <span className="text-[#ef4444]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setReasonDropdownOpen((prev) => !prev)}
                className={`mt-[6px] flex h-[42px] w-full items-center justify-between rounded-[8px] bg-white px-[14px] text-left text-[14px] transition cursor-pointer ${
                  reasonDropdownOpen
                    ? "border-2 border-[#0d0d10] text-[#0d0d10]"
                    : "border border-[#d1d5db] text-[#0d0d10] hover:border-[#9ca3af]"
                }`}
              >
                <span className="truncate">{reason}</span>
                {reasonDropdownOpen ? (
                  <ChevronUp size={16} className="text-[#0d0d10] shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-[#6b7280] shrink-0" />
                )}
              </button>

              {/* Dropdown menu */}
              {reasonDropdownOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-[10px] border border-[#e5e7eb] bg-white p-[6px] shadow-[0px_10px_24px_rgba(0,0,0,0.08)]">
                  {COUNTER_OFFER_REASONS.map((opt) => {
                    const isSelected = reason === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setReason(opt);
                          setReasonDropdownOpen(false);
                        }}
                        className={`flex min-h-[38px] w-full items-center justify-between rounded-[6px] px-[12px] py-[8px] text-left text-[13px] transition cursor-pointer ${
                          isSelected
                            ? "bg-[#eff4ff] font-medium text-[#0d0d10]"
                            : "text-[#374151] hover:bg-[#f9fafb]"
                        }`}
                      >
                        <span className="truncate">{opt}</span>
                        {isSelected && <Check size={16} className="text-[#0d0d10] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Note to brand */}
            <div>
              <label
                htmlFor="note-input"
                className="block font-['Inter:Medium'] font-medium text-[13px] text-[color:var(--text-primary,#0d0d10)]"
              >
                Note to {brandName} (optional)
              </label>
              <div className="mt-[6px]">
                <textarea
                  id="note-input"
                  maxLength={300}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="h-[84px] w-full resize-none rounded-[8px] border border-[#d1d5db] p-[12px] text-[13px] leading-[19px] text-[color:var(--text-primary,#0d0d10)] outline-none transition focus:border-[#0d0d10] focus:ring-0"
                />
              </div>
              <p className="mt-[4px] text-[12px] text-[#9ca3af]">
                {note.length} / 300
              </p>
            </div>

            {/* Disclaimer box */}
            <div className="rounded-[8px] bg-[var(--bg-subtle,#f4f6fb)] p-[12px] text-[12px] leading-[18px] text-[#4b5563]">
              {brandName} can accept, suggest another fee or reply in Messages. Nothing is charged to you.
            </div>

            {/* Action buttons */}
            <div className="mt-[2px] flex items-center justify-end gap-[10px]">
              <button
                type="button"
                onClick={onClose}
                className="h-[40px] rounded-[8px] border border-[#e5e7eb] px-[18px] text-[14px] font-medium text-[color:var(--text-primary,#0d0d10)] transition hover:bg-[#f9fafb] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex h-[40px] items-center gap-[8px] rounded-[8px] bg-[#0d0d10] px-[18px] text-[14px] font-medium text-white transition hover:bg-[#0d0d10]/90 cursor-pointer shadow-sm"
              >
                <Send size={14} className="shrink-0 -rotate-12" />
                Send counter offer · ₹{fee.toLocaleString("en-IN")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CounterOfferModal;
