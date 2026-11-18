import { useState } from "react";
import { motion } from "motion/react";
import { X, Check, Copy, KeyRound, ShieldAlert } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    setError(null);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[440px] rounded-[16px] bg-white p-6 shadow-2xl flex flex-col gap-5 border border-[#e3e5ec]"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold text-[#0d0d10]">
              Change password
            </h2>
            <p className="text-[13px] text-[#71717a]">
              Choose a strong password with at least 8 characters
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {error && (
            <div className="rounded-[8px] bg-[#fef2f2] p-2.5 text-[12px] text-[#dc2626] font-medium flex items-center gap-2">
              <ShieldAlert size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              Current password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#0d0d10]">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#0d0d10] hover:text-[#71717a] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-[#0d0d10] px-4 text-[13px] font-medium text-white transition hover:bg-black cursor-pointer shadow-xs"
            >
              <KeyRound size={15} />
              <span>Update password</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

interface BackupCodesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopied: () => void;
}

const BACKUP_CODES = [
  "8472-9102",
  "3941-8402",
  "5810-3948",
  "1029-4820",
  "9381-0294",
  "4729-1029",
  "6193-8401",
  "2039-4819",
];

export function BackupCodesModal({
  isOpen,
  onClose,
  onCopied,
}: BackupCodesModalProps) {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(BACKUP_CODES.join("\n"));
    onCopied();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[440px] rounded-[16px] bg-white p-6 shadow-2xl flex flex-col gap-5 border border-[#e3e5ec]"
      >
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold text-[#0d0d10]">
              Two-step backup codes
            </h2>
            <p className="text-[13px] text-[#71717a]">
              Keep these in a safe place. Each code can only be used once.
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

        {/* Codes grid */}
        <div className="grid grid-cols-2 gap-2 rounded-[10px] bg-[#f8f9fc] p-4 border border-[#e3e5ec] font-mono text-[13px] text-[#0d0d10]">
          {BACKUP_CODES.map((code, index) => (
            <div key={index} className="flex items-center gap-2 py-1">
              <span className="text-[#a3a3ac] text-[11px] w-4">{index + 1}.</span>
              <span className="font-medium tracking-wide">{code}</span>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-[#8c94a0] leading-normal">
          8 of 10 codes remaining. If you run out of backup codes, you can generate a new set anytime.
        </p>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-[#e3e5ec] bg-white px-3.5 text-[13px] font-medium text-[#0d0d10] hover:border-[#0d0d10] transition-colors cursor-pointer"
          >
            <Copy size={15} />
            <span>Copy all</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 items-center rounded-[8px] bg-[#0d0d10] px-4 text-[13px] font-medium text-white transition hover:bg-black cursor-pointer shadow-xs"
          >
            <span>Done</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
