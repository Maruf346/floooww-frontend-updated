import { useEffect, useState, useId } from "react";
import { Archive, Check, Pause, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/common/components/ui/Button";
import { useLockBodyScroll } from "@/common/hooks/useLockBodyScroll";
import type { Project } from "@/brand/data/projects";

export type ProjectConfirmAction = "Pause" | "Archive" | "Delete";

interface ProjectConfirmModalProps {
  action: ProjectConfirmAction | null;
  project: Pick<Project, "id" | "name" | "creatorCount" | "budgetNote"> & {
    creators?: number;
    budget?: string;
  };
  isOpen: boolean;
  onConfirm: (action: ProjectConfirmAction, note?: string) => void;
  onCancel: () => void;
}

export function ProjectConfirmModal({
  action,
  project,
  isOpen,
  onConfirm,
  onCancel,
}: ProjectConfirmModalProps) {
  const [note, setNote] = useState("");
  const inputId = useId();
  useLockBodyScroll(isOpen && Boolean(action));

  // Reset note when modal action changes
  useEffect(() => {
    setNote("");
  }, [action, isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen || !action) return null;

  const creatorCount = project.creatorCount ?? project.creators ?? 16;
  const escrowLabel = project.budgetNote?.includes("escrow")
    ? project.budgetNote
    : "₹57,200 stays in escrow";

  const config = {
    Pause: {
      title: `Pause ${project.name}?`,
      description:
        "Pausing stops the project until you resume it. Nothing is cancelled and no money moves.",
      iconBg: "bg-[#fff3da] text-[#c77900]",
      icon: <Pause size={20} className="fill-[#c77900]" />,
      points: [
        "Creators can’t post new content; posts already live stay up",
        `Tracking links and the ${creatorCount} creator codes are switched off`,
        `${escrowLabel.startsWith("₹") ? escrowLabel : "₹57,200 stays in escrow"} · nothing is released or refunded`,
        "Deadlines move by the number of days paused",
        `All ${creatorCount} creators get a message in Messages`,
      ],
      field: {
        label: "Message to creators (optional)",
        placeholder: "e.g. Waiting on restock from factory, back in 10 days",
      },
      confirmButtonText: "Pause project",
      confirmButtonIcon: <Pause size={16} className="fill-current" />,
      confirmButtonClass: "bg-[#c77900] hover:bg-[#a36300] text-white",
    },
    Archive: {
      title: `Archive ${project.name}?`,
      description:
        "Only completed projects can be archived. It moves to Archived and becomes read-only.",
      iconBg: "bg-muted text-secondary",
      icon: <Archive size={20} />,
      points: [
        "Results, content and invoices stay available",
        "No creator can post or be paid from it",
        "Restore any time from Archived",
      ],
      field: null,
      confirmButtonText: "Archive project",
      confirmButtonIcon: <Archive size={16} />,
      confirmButtonClass: "bg-ink hover:bg-ink/90 text-white",
    },
    Delete: {
      title: `Delete ${project.name}?`,
      description:
        "The project moves to Deleted. You can restore it for 30 days; after that it’s removed for good.",
      iconBg: "bg-[#fde4e3] text-[#db231f]",
      icon: <Trash2 size={20} />,
      points: [
        "Live projects can’t be deleted: pause or wait until it ends",
        "Money in escrow is refunded before deleting",
        "Payments and GST invoices stay in Payments",
      ],
      field: {
        label: "Reason for deleting (optional)",
        placeholder: "e.g. Campaign cancelled, created by mistake",
      },
      confirmButtonText: "Delete project",
      confirmButtonIcon: <Trash2 size={16} />,
      confirmButtonClass: "bg-[#db231f] hover:bg-[#b91c1c] text-white",
    },
  }[action];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        {/* Scrim / Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onCancel}
          className="fixed inset-0 bg-ink/40 backdrop-blur-[2px]"
          aria-hidden="true"
        />

        {/* Modal Dialog */}
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${inputId}-title`}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-[520px] rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_rgba(8,10,20,0.18)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
              >
                {config.icon}
              </span>
              <h2
                id={`${inputId}-title`}
                className="truncate text-[18px] font-semibold leading-6 text-ink sm:text-[20px]"
              >
                {config.title}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onCancel}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-tertiary transition hover:bg-subtle hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <X size={18} />
            </button>
          </header>

          {/* Description */}
          <p className="mt-3.5 text-[14px] leading-[22px] text-secondary">{config.description}</p>

          {/* Points list */}
          <div className="mt-4 rounded-xl border border-line bg-subtle p-3.5 space-y-2">
            {config.points.map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-[13px] leading-5 text-ink">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center text-secondary">
                  <Check size={14} />
                </span>
                <span className="flex-1">{point}</span>
              </div>
            ))}
          </div>

          {/* Optional Field */}
          {config.field && (
            <div className="mt-4 flex flex-col gap-1.5">
              <label
                htmlFor={inputId}
                className="font-inter-medium text-[12px] font-medium leading-4 text-ink"
              >
                {config.field.label}
              </label>
              <input
                id={inputId}
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={config.field.placeholder}
                className="h-10 w-full rounded-md border border-line bg-white px-3 text-[13px] leading-5 text-ink outline-none transition placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Action buttons */}
          <footer className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Button
              kind="secondary"
              onClick={onCancel}
              className="h-10 min-w-[81px] px-4 font-medium"
            >
              Cancel
            </Button>
            <Button
              kind={action === "Delete" ? "danger" : undefined}
              leadingIcon={config.confirmButtonIcon}
              onClick={() => onConfirm(action, note)}
              className={`h-10 min-w-[148px] px-4 font-medium shadow-sm transition active:scale-[0.98] ${config.confirmButtonClass}`}
            >
              {config.confirmButtonText}
            </Button>
          </footer>
        </motion.section>
      </div>
    </AnimatePresence>
  );
}
