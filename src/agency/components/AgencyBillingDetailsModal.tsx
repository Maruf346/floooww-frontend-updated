import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Check } from "lucide-react";

export interface BillingDetailsData {
  legalName: string;
  gstin: string;
  address: string;
  placeOfSupply: string;
  settlementAccount: string;
}

interface AgencyBillingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: BillingDetailsData) => void;
  initialDetails: BillingDetailsData;
}

export function AgencyBillingDetailsModal({
  isOpen,
  onClose,
  onSave,
  initialDetails,
}: AgencyBillingDetailsModalProps) {
  const [legalName, setLegalName] = useState(initialDetails.legalName);
  const [gstin, setGstin] = useState(initialDetails.gstin);
  const [address, setAddress] = useState(initialDetails.address);
  const [placeOfSupply, setPlaceOfSupply] = useState(initialDetails.placeOfSupply);
  const [settlementAccount, setSettlementAccount] = useState(initialDetails.settlementAccount);

  useEffect(() => {
    if (initialDetails) {
      setLegalName(initialDetails.legalName);
      setGstin(initialDetails.gstin);
      setAddress(initialDetails.address);
      setPlaceOfSupply(initialDetails.placeOfSupply);
      setSettlementAccount(initialDetails.settlementAccount);
    }
  }, [initialDetails, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      legalName,
      gstin,
      address,
      placeOfSupply,
      settlementAccount,
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
        className="relative w-full max-w-[520px] rounded-[16px] bg-white p-6 shadow-2xl flex flex-col gap-5 border border-[#e3e5ec]"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold text-[#0d0d10]">
              Edit billing &amp; tax details
            </h2>
            <p className="text-[13px] text-[#71717a]">
              Printed on every service-fee invoice you send to clients
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
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              Legal entity name
            </label>
            <input
              type="text"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#0d0d10]">
                GSTIN
              </label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#0d0d10]">
                Place of supply
              </label>
              <input
                type="text"
                value={placeOfSupply}
                onChange={(e) => setPlaceOfSupply(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              Registered address
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-[8px] border border-[#e3e5ec] bg-white p-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              Settlement account
            </label>
            <input
              type="text"
              value={settlementAccount}
              onChange={(e) => setSettlementAccount(e.target.value)}
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
            />
            <p className="text-[11px] text-[#8c94a0]">
              Bank account where client fee payouts are credited every Monday
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
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
            <span>Save changes</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
