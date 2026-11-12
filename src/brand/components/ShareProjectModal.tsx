import { useState, useEffect } from "react";
import { Check, Link2, Mail, MoreHorizontal, QrCode, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/common/components/ui/Button";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { useLockBodyScroll } from "@/common/hooks/useLockBodyScroll";
import type { Project } from "@/brand/data/projects";

interface ShareProjectModalProps {
  project: Pick<Project, "id" | "name" | "platform" | "duration"> & {
    image?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function ShareProjectModal({ project, isOpen, onClose }: ShareProjectModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const shareUrl = `floooww.com/p/minimalist/${slug}`;
  const fullUrl = `https://${shareUrl}`;

  const [postText, setPostText] = useState(
    `We’re working with skincare creators on our ${project.name}. Paid collab on ${project.platform || "Instagram and YouTube"}. See it on Floooww.`,
  );

  useLockBodyScroll(isOpen);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
      }
    } catch {
      // fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareChannel = (channel: string) => {
    const text = encodeURIComponent(postText);
    const url = encodeURIComponent(fullUrl);

    switch (channel) {
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
        break;
      case "instagram":
        handleCopy();
        window.open("https://www.instagram.com/", "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(project.name)}&body=${text}%0A%0A${url}`;
        break;
      case "qrcode":
        setShowQr((prev) => !prev);
        break;
      case "more":
        if (navigator.share) {
          navigator.share({ title: project.name, text: postText, url: fullUrl }).catch(() => {});
        } else {
          handleCopy();
        }
        break;
    }
  };

  const projectImage = project.image || "/assets/dashboard/project-vitamin-c.png";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        {/* Scrim / Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/40 backdrop-blur-[2px]"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-project-title"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 flex w-full max-w-[520px] flex-col gap-[18px] rounded-[16px] border border-line bg-white p-[24px] shadow-[0px_16px_40px_0px_rgba(0,0,0,0.18)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex w-full items-start justify-between gap-[8px]">
            <div className="flex flex-1 flex-col gap-[4px]">
              <h2
                id="share-project-title"
                className="font-inter-semibold text-[20px] font-semibold text-[#070b13]"
              >
                Share {project.name}
              </h2>
              <p className="text-[13px] text-[#8491a3]">
                Post it anywhere. People who open the link see the project page on Floooww.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex size-[24px] shrink-0 items-center justify-center rounded-md text-tertiary transition hover:bg-subtle hover:text-ink focus:outline-none"
            >
              <X size={18} />
            </button>
          </div>

          {/* Project Preview Card */}
          <div className="flex w-full items-center gap-[14px] rounded-[12px] border border-[#e5e7eb] bg-white p-[12px]">
            <div className="size-[72px] shrink-0 overflow-hidden rounded-[8px] bg-subtle">
              <img
                src={projectImage}
                alt={project.name}
                className="size-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/dashboard/project-vitamin-c.png";
                }}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <p className="truncate text-[14px] font-semibold text-[#070b13]">
                Minimalist · {project.name}
              </p>
              <p className="truncate text-[12px] text-[#8491a3]">
                Paid collab · {project.platform || "Instagram, YouTube"} ·{" "}
                {project.duration || "7 Oct – 7 Nov"}
              </p>
              <p className="truncate text-[12px] font-medium text-[#2563eb]">{shareUrl}</p>
            </div>
          </div>

          {/* Link Input + Copy Button */}
          <div className="flex w-full items-center gap-[8px]">
            <div className="flex h-[40px] min-w-0 flex-1 items-center gap-[8px] rounded-[8px] border border-[#e5e7eb] bg-[#f3f5f7] px-[12px]">
              <Link2 size={14} className="shrink-0 text-secondary" />
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="min-w-0 flex-1 bg-transparent text-[14px] text-[#070b13] outline-none select-all"
              />
            </div>
            <Button
              kind="primary"
              onClick={handleCopy}
              className="h-[40px] shrink-0 rounded-[8px] px-[16px] text-[14px] font-medium"
            >
              {copied ? (
                <span className="flex items-center gap-1.5">
                  <Check size={14} />
                  Copied
                </span>
              ) : (
                "Copy link"
              )}
            </Button>
          </div>

          {/* Share to Section */}
          <div className="flex w-full flex-col gap-[12px]">
            <p className="text-[13px] font-medium text-[#394357]">Share to</p>

            <div className="flex w-full flex-col gap-[12px]">
              {/* Row 1 */}
              <div className="grid grid-cols-4 gap-[12px] w-full">
                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("whatsapp")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#25d366] text-white">
                    <span className="text-[15px] font-bold leading-none">✆</span>
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">WhatsApp</span>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("instagram")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] border border-[#e5e7eb] bg-white">
                    <PlatformLogo platform="Instagram" size={16} />
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">Instagram</span>
                </button>

                {/* LinkedIn */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("linkedin")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#0a66c2] text-white">
                    <span className="text-[13px] font-bold leading-none">in</span>
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">LinkedIn</span>
                </button>

                {/* X (Twitter) */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("twitter")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#070b13] text-white">
                    <span className="text-[13px] font-bold leading-none">X</span>
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">X (Twitter)</span>
                </button>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-4 gap-[12px] w-full">
                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("facebook")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#1877f2] text-white">
                    <span className="text-[15px] font-bold leading-none">f</span>
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">Facebook</span>
                </button>

                {/* Email */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("email")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#f3f5f7] text-[#555]">
                    <Mail size={16} />
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">Email</span>
                </button>

                {/* QR Code */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("qrcode")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#f3f5f7] text-[#555]">
                    <QrCode size={16} />
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">QR code</span>
                </button>

                {/* More Apps */}
                <button
                  type="button"
                  onClick={() => handleShareChannel("more")}
                  className="flex flex-col items-center gap-[6px] rounded-[10px] border border-[#e5e7eb] py-[12px] transition hover:bg-subtle focus:outline-none"
                >
                  <div className="flex size-[36px] shrink-0 items-center justify-center rounded-[10px] bg-[#f3f5f7] text-[#555]">
                    <MoreHorizontal size={16} />
                  </div>
                  <span className="text-[12px] font-medium text-[#070b13]">More apps</span>
                </button>
              </div>
            </div>

            {/* Inline QR Code display toggle */}
            {showQr && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-line bg-subtle p-4">
                <div className="flex size-36 items-center justify-center rounded-lg border border-line bg-white p-2 shadow-sm">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(fullUrl)}`}
                    alt="Project QR code"
                    className="size-full"
                  />
                </div>
                <p className="text-[12px] text-secondary">Scan with camera to open project</p>
              </div>
            )}
          </div>

          {/* Post Text Field */}
          <div className="flex w-full flex-col gap-[6px]">
            <label className="text-[12px] font-medium text-[#070b13]">Post text</label>
            <input
              type="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="h-[40px] w-full rounded-[8px] border border-[#e5e7eb] bg-white px-[12px] text-[13px] text-[#070b13] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <p className="text-[12px] text-[#a2a7b3]">
              Added to WhatsApp, LinkedIn, X and Facebook posts. You can edit it.
            </p>
          </div>

          {/* Disclaimer Note */}
          <p className="text-[12px] leading-5 text-[#8491a3]">
            Applications for {project.name} closed on 12 Oct. Turn this on to reopen them. Fees and
            creator names are never shown.
          </p>

          {/* Footer */}
          <div className="flex w-full items-center justify-end">
            <Button
              kind="secondary"
              onClick={onClose}
              className="h-[40px] rounded-[8px] border border-[#e5e7eb] bg-white px-[16px] text-[14px] font-medium text-[#070b13] hover:bg-subtle"
            >
              Done
            </Button>
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
}
