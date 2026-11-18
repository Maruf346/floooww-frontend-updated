import { useEffect } from "react";
import { LogOut } from "lucide-react";

type CreatorLogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function CreatorLogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: CreatorLogoutModalProps) {
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
        data-node-id="795:15646"
        className="w-full max-w-[420px] rounded-[16px] bg-white p-[28px] shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.18)] flex flex-col gap-[14px] animate-in zoom-in-95 duration-150"
      >
        <h2
          id="logout-dialog-title"
          className="font-['Inter'] text-[16px] font-semibold leading-[24px] text-[#0d0d10]"
        >
          Log out of Kreyio?
        </h2>

        <p className="font-['Inter'] text-[13px] font-normal leading-[20px] text-[#0d0d10]">
          You’ll need to log in again to see your creator account. Drafts are saved.
        </p>

        <div className="flex items-center justify-end gap-[10px] w-full pt-1">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-[8px] border border-[#e3e5ec] text-[14px] font-medium leading-[20px] text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer select-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#dc2626] px-4 text-[14px] font-medium leading-[20px] text-white hover:bg-[#b91c1c] transition cursor-pointer select-none"
          >
            <LogOut className="size-4 shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatorLogoutModal;
