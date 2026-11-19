import { useEffect } from "react";
import { LogOut } from "lucide-react";

type AgencyLogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clientName?: string;
};

export function AgencyLogoutModal({
  isOpen,
  onClose,
  onConfirm,
  clientName,
}: AgencyLogoutModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#070b13]/40 p-4 animate-in fade-in duration-150"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        onClick={(e) => e.stopPropagation()}
        data-name="Modal · Log out"
        className="w-full max-w-[420px] rounded-2xl bg-white p-7 shadow-[0_12px_32px_rgba(0,0,0,.12)] animate-in zoom-in-95 duration-150"
      >
        <h2
          id="logout-dialog-title"
          className="text-[16px] font-semibold leading-6 text-ink"
        >
          Log out of Brightside Agency?
        </h2>

        <p className="mt-3 text-[13px] leading-5 text-secondary">
          {clientName
            ? `You’ll need to log in again to see ${clientName} and the agency workspace. Drafts are saved.`
            : "You’ll need to log in again to access the agency workspace and all client dashboards. Drafts are saved."}
        </p>

        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg border border-line px-4 text-[14px] font-medium leading-5 text-ink hover:bg-subtle transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#dc2626] px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#b91c1c] cursor-pointer"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
