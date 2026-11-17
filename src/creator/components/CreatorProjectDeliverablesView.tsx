import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Upload, Link2, Clock, Flag, MoreHorizontal, Check, X } from "lucide-react";

const imgDot1 = "https://www.figma.com/api/mcp/asset/649212b9-66f6-4f20-85bb-9d5364d794d8.svg";
const imgPlatformInstagramStyleColor = "https://www.figma.com/api/mcp/asset/624c17aa-a5df-4e44-9245-16c3532a8557.svg";
const imgRectangleDeliv0 = "https://www.figma.com/api/mcp/asset/638c8599-d68d-4dac-8a1f-bb083ee6bee8.png";
const imgRectangleDeliv1 = "https://www.figma.com/api/mcp/asset/0eb670b0-7448-4e1a-8e52-3ed3c35fbd1c.png";
const imgRectangleDeliv2 = "https://www.figma.com/api/mcp/asset/1520c31c-0a6f-4106-886d-0f4b0afc18f2.png";

type BadgeProps = {
  className?: string;
  label?: string;
  showDot?: boolean;
  tone?: "Success" | "Warning" | "Neutral";
};

function Badge({ className, label = "Live", showDot = true, tone = "Success" }: BadgeProps) {
  const isNeutral = tone === "Neutral";
  const isSuccess = tone === "Success";
  const isWarning = tone === "Warning";
  return (
    <div
      className={
        className ||
        `content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] ${isNeutral
          ? "bg-[var(--status-neutral-bg,#f4f6fb)]"
          : isWarning
            ? "bg-[var(--status-warning-bg,#feefce)]"
            : "bg-[var(--status-success-bg,#e1fce3)]"
        }`
      }
    >
      {isSuccess && showDot && (
        <div className="relative shrink-0 size-[6px]" data-name="Dot">
          <div className="size-full rounded-full bg-[#16a34a]" />
        </div>
      )}
      {isSuccess && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)] whitespace-nowrap">
          {label}
        </p>
      )}
      {isWarning && showDot && (
        <div className="relative shrink-0 size-[6px]" data-name="Dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
        </div>
      )}
      {isWarning && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-warning-fg,#f59e0b)] whitespace-nowrap">
          {label}
        </p>
      )}
      {isNeutral && showDot && (
        <div className="relative shrink-0 size-[6px]" data-name="Dot">
          <div className="size-full rounded-full bg-[#4a4a55]" />
        </div>
      )}
      {isNeutral && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-neutral-fg,#4a4a55)] whitespace-nowrap">
          {label}
        </p>
      )}
    </div>
  );
}

function PlatformLogo({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"}>
      <img alt="Instagram" className="absolute block inset-0 max-w-none size-full" src={imgPlatformInstagramStyleColor} />
    </div>
  );
}

function DeliverableActionsMenu({
  deliverableTitle,
  onViewContent,
  onUploadVersion,
  onAddLivePostLink,
  onCounterOfferTime,
  onReportProblem,
  onClose,
}: {
  deliverableTitle: string;
  onViewContent: () => void;
  onUploadVersion: () => void;
  onAddLivePostLink: () => void;
  onCounterOfferTime: () => void;
  onReportProblem: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col items-start overflow-clip p-[6px] relative rounded-[var(--radius-md,8px)] shadow-[0px_12px_32px_0px_rgba(0,0,0,0.18)] shrink-0 w-[210px] animate-in fade-in zoom-in-95 duration-100"
      data-node-id="747:9495"
      data-name="Menu"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onViewContent();
          onClose();
        }}
        className="content-stretch flex gap-[10px] items-center overflow-clip px-[10px] py-[8px] relative rounded-[var(--radius-sm,6px)] shrink-0 w-full hover:bg-[#f4f6fb] transition text-left cursor-pointer"
        data-node-id="747:9522"
        data-name="Option"
      >
        <div className="relative shrink-0 size-[14px]" data-node-id="747:9523" data-name="Icon">
          <Eye size={14} className="text-[#0d0d10]" />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="747:9524">
          View content
        </p>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onUploadVersion();
          onClose();
        }}
        className="content-stretch flex gap-[10px] items-center overflow-clip px-[10px] py-[8px] relative rounded-[var(--radius-sm,6px)] shrink-0 w-full hover:bg-[#f4f6fb] transition text-left cursor-pointer"
        data-node-id="747:9527"
        data-name="Option"
      >
        <div className="relative shrink-0 size-[14px]" data-node-id="747:9528" data-name="Icon">
          <Upload size={14} className="text-[#0d0d10]" />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="747:9529">
          Upload new version
        </p>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAddLivePostLink();
          onClose();
        }}
        className="content-stretch flex gap-[10px] items-center overflow-clip px-[10px] py-[8px] relative rounded-[var(--radius-sm,6px)] shrink-0 w-full hover:bg-[#f4f6fb] transition text-left cursor-pointer"
        data-node-id="747:9532"
        data-name="Option"
      >
        <div className="relative shrink-0 size-[14px]" data-node-id="747:9533" data-name="Icon">
          <Link2 size={14} className="text-[#0d0d10]" />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="747:9534">
          Add live post link
        </p>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onCounterOfferTime();
          onClose();
        }}
        className="content-stretch flex gap-[10px] items-center overflow-clip px-[10px] py-[8px] relative rounded-[var(--radius-sm,6px)] shrink-0 w-full hover:bg-[#f4f6fb] transition text-left cursor-pointer"
        data-node-id="747:9537"
        data-name="Option"
      >
        <div className="relative shrink-0 size-[14px]" data-node-id="747:9538" data-name="Icon">
          <Clock size={14} className="text-[#0d0d10]" />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="747:9539">
          Counter offer time
        </p>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onReportProblem();
          onClose();
        }}
        className="content-stretch flex gap-[10px] items-center overflow-clip px-[10px] py-[8px] relative rounded-[var(--radius-sm,6px)] shrink-0 w-full hover:bg-[#fef2f2] transition text-left cursor-pointer"
        data-node-id="747:9542"
        data-name="Option"
      >
        <div className="relative shrink-0 size-[14px]" data-node-id="747:9543" data-name="Icon">
          <Flag size={14} className="text-[#dc2626]" />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--status-danger-fg,#dc2626)]" data-node-id="747:9544">
          Report a product problem
        </p>
      </button>
    </div>
  );
}

type Props = {
  onOpenUploadModal: () => void;
  storyV2Uploaded?: boolean;
  uploadedFileName?: string;
  productReceived?: boolean;
  onConfirmProduct?: () => void;
  onCounterOfferTime?: (deliverableTitle: string) => void;
};

export function CreatorProjectDeliverablesView({
  onOpenUploadModal,
  storyV2Uploaded = false,
  uploadedFileName = "",
  productReceived = false,
  onConfirmProduct,
  onCounterOfferTime,
}: Props) {
  const [selectedId, setSelectedId] = useState<number>(3);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [panelTab, setPanelTab] = useState<"content" | "comments" | "history">("history");
  const [openMenuRowId, setOpenMenuRowId] = useState<number | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setOpenMenuRowId(null);
      }
    };
    if (openMenuRowId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuRowId]);

  const [livePostModal, setLivePostModal] = useState<{ open: boolean; id: number; title: string; currentLink: string }>({
    open: false,
    id: 0,
    title: "",
    currentLink: "",
  });
  const [reportModal, setReportModal] = useState<{ open: boolean; id: number; title: string }>({
    open: false,
    id: 0,
    title: "",
  });
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const [deliverableLinks, setDeliverableLinks] = useState<{ [key: number]: string }>({
    1: "https://www.instagram.com/reel/DBQF32xM8_g/",
    2: "https://www.instagram.com/stories/highlights/1799283719/",
  });

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Array<{ author: string; initials: string; time: string; text: string; isBrand?: boolean }>>([
    {
      author: "Ananya Mehta",
      initials: "AM",
      time: "28 Oct, 09:15",
      text: "Love it. Please add ISHITA15 on screen for the last 3 seconds.",
      isBrand: true,
    },
    {
      author: "You",
      initials: "MI",
      time: "28 Oct, 09:40",
      text: "Sure! I’ll send version 2 tonight with the code at 0:19.",
      isBrand: false,
    },
    {
      author: "Ananya Mehta",
      initials: "AM",
      time: "28 Oct, 09:52",
      text: "Perfect, thank you. Keep the link sticker as it is.",
      isBrand: true,
    },
  ]);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        author: "You",
        initials: "MI",
        time: "Just now",
        text: newComment.trim(),
        isBrand: false,
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-node-id="715:3643" data-name="Row">
      {/* Left Column: Deliverables table + Products list (Sticky) */}
      <div
        className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px relative sticky top-[80px] self-start"
        data-node-id="715:3417"
        data-name="Left"
      >
        {/* Deliverables (4) Card */}
        <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="715:3418" data-name="Deliverables (3)">
          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3419" data-name="Card head">
            <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="715:3420" data-name="t">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[16px]" data-node-id="715:3421">
                Deliverables (4)
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px]" data-node-id="715:3422">
                Track each deliverable from brief to live post. Minimalist sees the same status.
              </p>
            </div>
          </div>

          <div className="border border-[#e5e7eb] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full" data-node-id="715:3477" data-name="Table">
            {/* Table Header */}
            <div className="bg-[#f3f5f7] content-stretch flex gap-[12px] items-center px-[14px] py-[9px] relative shrink-0 w-full rounded-t-[10px]" data-node-id="715:3478" data-name="Header">
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[20px]" data-node-id="715:3479" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="715:3480">
                  #
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="715:3481" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="715:3482">
                  DELIVERABLE
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[138px]" data-node-id="715:3483" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="715:3484">
                  STATUS
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[84px]" data-node-id="715:3485" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="715:3486">
                  LIVE POST
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-[100px]" data-node-id="715:3487" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="715:3488">
                  ACTIONS
                </p>
              </div>
            </div>

            {/* Row 1: Festive GRWM */}
            <div
              onClick={() => {
                setSelectedId(1);
                setIsPanelOpen(true);
              }}
              className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                selectedId === 1 && isPanelOpen ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
              }`}
              data-node-id="715:3489"
              data-name="Row"
            >
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[20px]" data-node-id="715:3490" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:3491">
                  1
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="715:3492" data-name="Cell">
                <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[170px]" data-node-id="715:3423" data-name="d">
                  <div className="relative rounded-[8px] shrink-0 size-[44px]" data-node-id="715:3424" data-name="Rectangle">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangleDeliv0} />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="715:3425" data-name="t">
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[#070b13] text-[14px] w-[min-content]" data-node-id="715:3426">
                      Festive GRWM
                    </p>
                    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0 w-[112px]" data-node-id="715:3427" data-name="s">
                      <PlatformLogo className="relative shrink-0 size-[14px]" />
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="715:3429">
                        Reel · live 18 Oct
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[138px]" data-node-id="715:3493" data-name="Cell">
                <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Approved · paid" />
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[84px]" data-node-id="715:3494" data-name="Cell">
                <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-node-id="715:3430" data-name="l">
                  <PlatformLogo className="relative shrink-0 size-[14px]" />
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:3432">
                    18 Oct
                  </p>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[12px] whitespace-nowrap" data-node-id="715:3433">
                    ↗
                  </p>
                </div>
              </div>
              <div className="content-stretch flex items-center gap-[6px] relative shrink-0 w-[100px]" data-node-id="715:3495" data-name="Cell">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(1);
                    setIsPanelOpen(true);
                  }}
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[10px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition cursor-pointer"
                  data-name="Button"
                >
                  <p className="font-['Inter:Medium'] font-medium leading-[18px] text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    View
                  </p>
                </button>
                <div className={`relative ${openMenuRowId === 1 ? "z-50" : "z-10"}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuRowId(openMenuRowId === 1 ? null : 1);
                    }}
                    className={`size-[32px] rounded-[var(--radius-md,8px)] border flex items-center justify-center transition cursor-pointer ${
                      openMenuRowId === 1
                        ? "bg-[#0d0d10] text-white border-[#0d0d10]"
                        : "bg-white text-[#0d0d10] border-[#e3e5ec] hover:bg-[#f4f6fb]"
                    }`}
                    title="Deliverable actions"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                  {openMenuRowId === 1 && (
                    <div ref={menuContainerRef} className="absolute right-0 top-[36px] z-50">
                      <DeliverableActionsMenu
                        deliverableTitle="Festive GRWM · Reel"
                        onViewContent={() => {
                          setSelectedId(1);
                          setIsPanelOpen(true);
                          setPanelTab("content");
                        }}
                        onUploadVersion={onOpenUploadModal}
                        onAddLivePostLink={() => {
                          setLivePostModal({
                            open: true,
                            id: 1,
                            title: "Festive GRWM · Reel",
                            currentLink: deliverableLinks[1] || "",
                          });
                        }}
                        onCounterOfferTime={() => {
                          if (onCounterOfferTime) {
                            onCounterOfferTime("Festive GRWM · Reel");
                          } else {
                            showToast('Counter offer time requested for "Festive GRWM · Reel"');
                          }
                        }}
                        onReportProblem={() => {
                          setReportModal({
                            open: true,
                            id: 1,
                            title: "Festive GRWM · Reel",
                          });
                        }}
                        onClose={() => setOpenMenuRowId(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Launch day */}
            <div
              onClick={() => {
                setSelectedId(2);
                setIsPanelOpen(true);
              }}
              className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                selectedId === 2 && isPanelOpen ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
              }`}
              data-node-id="715:3496"
              data-name="Row"
            >
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[20px]" data-node-id="715:3497" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:3498">
                  2
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="715:3499" data-name="Cell">
                <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[170px]" data-node-id="715:3442" data-name="d">
                  <div className="relative rounded-[8px] shrink-0 size-[44px]" data-node-id="715:3443" data-name="Rectangle">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangleDeliv1} />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="715:3444" data-name="t">
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[#070b13] text-[14px] w-[min-content]" data-node-id="715:3445">
                      Launch day
                    </p>
                    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0 w-[120px]" data-node-id="715:3446" data-name="s">
                      <PlatformLogo className="relative shrink-0 size-[14px]" />
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="715:3448">
                        Story · live 20 Oct
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[138px]" data-node-id="715:3500" data-name="Cell">
                <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Approved · paid" />
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[84px]" data-node-id="715:3501" data-name="Cell">
                <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0" data-node-id="715:3449" data-name="l">
                  <PlatformLogo className="relative shrink-0 size-[14px]" />
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:3451">
                    20 Oct
                  </p>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[12px] whitespace-nowrap" data-node-id="715:3452">
                    ↗
                  </p>
                </div>
              </div>
              <div className="content-stretch flex items-center gap-[6px] relative shrink-0 w-[100px]" data-node-id="715:3502" data-name="Cell">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(2);
                    setIsPanelOpen(true);
                  }}
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[10px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition cursor-pointer"
                  data-name="Button"
                >
                  <p className="font-['Inter:Medium'] font-medium leading-[18px] text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                    View
                  </p>
                </button>
                <div className={`relative ${openMenuRowId === 2 ? "z-50" : "z-10"}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuRowId(openMenuRowId === 2 ? null : 2);
                    }}
                    className={`size-[32px] rounded-[var(--radius-md,8px)] border flex items-center justify-center transition cursor-pointer ${
                      openMenuRowId === 2
                        ? "bg-[#0d0d10] text-white border-[#0d0d10]"
                        : "bg-white text-[#0d0d10] border-[#e3e5ec] hover:bg-[#f4f6fb]"
                    }`}
                    title="Deliverable actions"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                  {openMenuRowId === 2 && (
                    <div ref={menuContainerRef} className="absolute right-0 top-[36px] z-50">
                      <DeliverableActionsMenu
                        deliverableTitle="Launch day · Story"
                        onViewContent={() => {
                          setSelectedId(2);
                          setIsPanelOpen(true);
                          setPanelTab("content");
                        }}
                        onUploadVersion={onOpenUploadModal}
                        onAddLivePostLink={() => {
                          setLivePostModal({
                            open: true,
                            id: 2,
                            title: "Launch day · Story",
                            currentLink: deliverableLinks[2] || "",
                          });
                        }}
                        onCounterOfferTime={() => {
                          if (onCounterOfferTime) {
                            onCounterOfferTime("Launch day · Story");
                          } else {
                            showToast('Counter offer time requested for "Launch day · Story"');
                          }
                        }}
                        onReportProblem={() => {
                          setReportModal({
                            open: true,
                            id: 2,
                            title: "Launch day · Story",
                          });
                        }}
                        onClose={() => setOpenMenuRowId(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 3: Results after 7 days (Selected by default) */}
            <div
              onClick={() => {
                setSelectedId(3);
                setIsPanelOpen(true);
              }}
              className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                selectedId === 3 && isPanelOpen ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
              }`}
              data-node-id="715:3503"
              data-name="Row"
            >
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[20px]" data-node-id="715:3504" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:3505">
                  3
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="715:3506" data-name="Cell">
                <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[196px]" data-node-id="715:3461" data-name="d">
                  <div className="relative rounded-[8px] shrink-0 size-[44px]" data-node-id="715:3462" data-name="Rectangle">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangleDeliv2} />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="715:3463" data-name="t">
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[#070b13] text-[14px] w-[min-content]" data-node-id="715:3464">
                      Results after 7 days
                    </p>
                    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0 w-[140px]" data-node-id="715:3465" data-name="s">
                      <PlatformLogo className="relative shrink-0 size-[14px]" />
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="715:3467">
                        Reel · sent 26 Oct · waiting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[138px]" data-node-id="715:3507" data-name="Cell">
                <Badge
                  className="bg-[var(--status-warning-bg,#feefce)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0"
                  label={storyV2Uploaded ? "V2 in review" : "Changes asked"}
                  tone="Warning"
                />
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[84px]" data-node-id="715:3508" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[13px] whitespace-nowrap" data-node-id="715:3468">
                  Not live yet
                </p>
              </div>
              <div className="content-stretch flex items-center gap-[6px] relative shrink-0 w-[100px]" data-node-id="715:3509" data-name="Cell">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(3);
                    setIsPanelOpen(true);
                  }}
                  className="bg-[#3b5bff] content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[10px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#2f4acc] transition cursor-pointer shadow-xs"
                  data-name="Button"
                >
                  <p className="font-['Inter:Medium'] font-medium leading-[18px] text-[13px] text-white whitespace-nowrap">
                    View
                  </p>
                </button>
                <div className={`relative ${openMenuRowId === 3 ? "z-50" : "z-10"}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuRowId(openMenuRowId === 3 ? null : 3);
                    }}
                    className={`size-[32px] rounded-[var(--radius-md,8px)] border flex items-center justify-center transition cursor-pointer ${
                      openMenuRowId === 3
                        ? "bg-[#0d0d10] text-white border-[#0d0d10]"
                        : "bg-white text-[#0d0d10] border-[#e3e5ec] hover:bg-[#f4f6fb]"
                    }`}
                    title="Deliverable actions"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                  {openMenuRowId === 3 && (
                    <div ref={menuContainerRef} className="absolute right-0 top-[36px] z-50">
                      <DeliverableActionsMenu
                        deliverableTitle="Results after 7 days · Reel"
                        onViewContent={() => {
                          setSelectedId(3);
                          setIsPanelOpen(true);
                          setPanelTab("content");
                        }}
                        onUploadVersion={onOpenUploadModal}
                        onAddLivePostLink={() => {
                          setLivePostModal({
                            open: true,
                            id: 3,
                            title: "Results after 7 days · Reel",
                            currentLink: deliverableLinks[3] || "",
                          });
                        }}
                        onCounterOfferTime={() => {
                          if (onCounterOfferTime) {
                            onCounterOfferTime("Results after 7 days · Reel");
                          } else {
                            showToast('Counter offer time requested for "Results after 7 days · Reel"');
                          }
                        }}
                        onReportProblem={() => {
                          setReportModal({
                            open: true,
                            id: 3,
                            title: "Results after 7 days · Reel",
                          });
                        }}
                        onClose={() => setOpenMenuRowId(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Row 4: Last-day reminder */}
            <div
              onClick={() => {
                setSelectedId(4);
                setIsPanelOpen(true);
              }}
              className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                selectedId === 4 && isPanelOpen ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
              }`}
              data-node-id="1663:78"
              data-name="Row"
            >
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[20px]" data-node-id="1663:79" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="1663:80">
                  4
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="1663:81" data-name="Cell">
                <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-[170px]" data-node-id="1663:71" data-name="d">
                  <div className="bg-[#f3f5f7] border border-[#e5e7eb] flex items-center justify-center relative rounded-[8px] shrink-0 size-[44px]">
                    <span className="text-[11px] font-medium text-[#8491a3]">#4</span>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="1663:72" data-name="t">
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] min-w-full not-italic relative shrink-0 text-[#070b13] text-[14px] w-[min-content]" data-node-id="1663:73">
                      Last-day reminder
                    </p>
                    <div className="content-stretch flex gap-[4px] items-start overflow-clip relative shrink-0 w-[120px]" data-node-id="1663:74" data-name="s">
                      <PlatformLogo className="relative shrink-0 size-[14px]" />
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="1663:76">
                        Story · due 30 Oct
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[138px]" data-node-id="1663:83" data-name="Cell">
                <div className="bg-[#edeff3] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="1663:84" data-name="Badge">
                  <div className="relative shrink-0 size-[6px]" data-node-id="I1663:84;5:107" data-name="Dot">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#394357] text-[12px] whitespace-nowrap" data-node-id="I1663:84;5:108">
                    Not started
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[84px]" data-node-id="1663:85" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#394357] text-[13px] whitespace-nowrap" data-node-id="1663:86">
                  Not started
                </p>
              </div>
              <div className="content-stretch flex items-center gap-[6px] relative shrink-0 w-[100px]" data-node-id="1663:87" data-name="Cell">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenUploadModal();
                  }}
                  className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[10px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#1a1a24] transition cursor-pointer"
                  data-name="Button"
                >
                  <p className="font-['Inter:Medium'] font-medium leading-[18px] text-[13px] text-white whitespace-nowrap">
                    Upload
                  </p>
                </button>
                <div className={`relative ${openMenuRowId === 4 ? "z-50" : "z-10"}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuRowId(openMenuRowId === 4 ? null : 4);
                    }}
                    className={`size-[32px] rounded-[var(--radius-md,8px)] border flex items-center justify-center transition cursor-pointer ${
                      openMenuRowId === 4
                        ? "bg-[#0d0d10] text-white border-[#0d0d10]"
                        : "bg-white text-[#0d0d10] border-[#e3e5ec] hover:bg-[#f4f6fb]"
                    }`}
                    title="Deliverable actions"
                  >
                    <MoreHorizontal size={15} />
                  </button>
                  {openMenuRowId === 4 && (
                    <div ref={menuContainerRef} className="absolute right-0 top-[36px] z-50">
                      <DeliverableActionsMenu
                        deliverableTitle="Last-day reminder · Story"
                        onViewContent={() => {
                          setSelectedId(4);
                          setIsPanelOpen(true);
                          setPanelTab("content");
                        }}
                        onUploadVersion={onOpenUploadModal}
                        onAddLivePostLink={() => {
                          setLivePostModal({
                            open: true,
                            id: 4,
                            title: "Last-day reminder · Story",
                            currentLink: deliverableLinks[4] || "",
                          });
                        }}
                        onCounterOfferTime={() => {
                          if (onCounterOfferTime) {
                            onCounterOfferTime("Last-day reminder · Story");
                          } else {
                            showToast('Counter offer time requested for "Last-day reminder · Story"');
                          }
                        }}
                        onReportProblem={() => {
                          setReportModal({
                            open: true,
                            id: 4,
                            title: "Last-day reminder · Story",
                          });
                        }}
                        onClose={() => setOpenMenuRowId(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products for your deliverables */}
        <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="715:3510" data-name="Products for your deliverables">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="715:3511" data-name="Card head">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[16px]" data-node-id="715:3512">
              Products for your deliverables
            </p>
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px]" data-node-id="715:3513">
              Posting time for a deliverable starts when its product arrives
            </p>
          </div>
          <div className="border border-[#e5e7eb] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="715:3514" data-name="List">
            {/* Product Row 1 */}
            <div className="content-stretch flex flex-col items-start overflow-clip px-[14px] py-[12px] relative shrink-0 w-full" data-node-id="715:3515" data-name="Row 1">
              <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3516" data-name="r">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-[190px] whitespace-nowrap" data-node-id="715:3517" data-name="Deliverable">
                  <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px]" data-node-id="715:3518">
                    Festive GRWM · Reel
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#394357] text-[12px]" data-node-id="715:3519">
                    Vitamin-C Serum × 1
                  </p>
                </div>
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="715:3520">
                  Delhivery · delivered 11 Oct · you confirmed
                </p>
                <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Received" />
              </div>
            </div>

            {/* Product Row 2 */}
            <div className="border-[#edeff3] border-solid border-t content-stretch flex flex-col items-start overflow-clip px-[14px] py-[12px] relative shrink-0 w-full" data-node-id="715:3523" data-name="Row 2">
              <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3524" data-name="r">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-[190px] whitespace-nowrap" data-node-id="715:3525" data-name="Deliverable">
                  <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px]" data-node-id="715:3526">
                    Launch day · Story
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#394357] text-[12px]" data-node-id="715:3527">
                    Vitamin-C Serum · launch kit × 1
                  </p>
                </div>
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="715:3528">
                  Blue Dart · delivered 18 Oct · you confirmed
                </p>
                <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Received" />
              </div>
            </div>

            {/* Product Row 3 */}
            <div className="bg-[#fffaf0] border-[#edeff3] border-solid border-t content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[14px] py-[12px] relative shrink-0 w-full" data-node-id="715:3531" data-name="Row 3">
              <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3532" data-name="r">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-[190px] whitespace-nowrap" data-node-id="715:3533" data-name="Deliverable">
                  <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px]" data-node-id="715:3534">
                    Results after 7 days · Reel
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#394357] text-[12px]" data-node-id="715:3535">
                    Vitamin-C Serum · refill × 1
                  </p>
                </div>
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="715:3536">
                  {productReceived ? "Delhivery delivered 26 Oct · you confirmed" : "Delhivery marked it delivered 26 Oct, 11:40"}
                </p>
                <Badge
                  className={`content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0 ${productReceived ? "bg-[var(--status-success-bg,#e1fce3)]" : "bg-[var(--status-warning-bg,#feefce)]"
                    }`}
                  label={productReceived ? "Received" : "Confirm"}
                  tone={productReceived ? "Success" : "Warning"}
                />
              </div>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3539" data-name="Actions">
                {!productReceived ? (
                  <button
                    type="button"
                    onClick={onConfirmProduct}
                    className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#1a1a24] transition cursor-pointer"
                    data-node-id="715:3540"
                    data-name="Button"
                  >
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-on-primary,white)] whitespace-nowrap" data-node-id="I715:3540;5:21">
                      Yes, I received it
                    </p>
                  </button>
                ) : (
                  <div className="bg-[#e1fce3] text-[#16a34a] font-['Inter:Medium'] text-[12px] px-[10px] py-[4px] rounded-[6px]">
                    ✓ Confirmed by you
                  </div>
                )}
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[13px] whitespace-nowrap cursor-pointer hover:underline" data-node-id="715:3541">
                  Report a problem
                </p>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[13px] whitespace-nowrap cursor-pointer hover:underline" data-node-id="715:3542">
                  Track ↗
                </p>
                <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="715:3543" data-name="Frame" />
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f29b07] text-[12px] whitespace-nowrap" data-node-id="715:3544">
                  Auto-confirms today at 11:40 if you don’t
                </p>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="715:3545">
            Your address goes only to Minimalist. Wrong item or damaged? Report it and the deadline pauses.
          </p>
        </div>
      </div>

      {/* Right Column: Deliverable panel (440px) */}
      {isPanelOpen && (
          <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-[440px] animate-in fade-in slide-in-from-right-4 duration-150" data-node-id="715:3547" data-name="Deliverable panel">
            <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3548" data-name="Card head">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="715:3549" data-name="t">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[16px] whitespace-nowrap" data-node-id="715:3550">
                  {selectedId === 1
                    ? "Festive GRWM · Reel"
                    : selectedId === 2
                      ? "Launch day · Story"
                      : selectedId === 3
                        ? "Results after 7 days · Reel"
                        : "Last-day reminder · Story"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPanelOpen(false)}
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] hover:text-[#070b13] text-[14px] whitespace-nowrap cursor-pointer p-1 rounded-md transition"
                data-node-id="715:3546"
                title="Close panel"
              >
                ✕
              </button>
            </div>

            <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3551" data-name="sub">
              <PlatformLogo className="relative shrink-0 size-[14px]" />
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="715:3553">
                Instagram · {selectedId === 2 || selectedId === 4 ? "Story" : "Reel"} · deliverable {selectedId} of 4
              </p>
              <Badge
                className={
                  selectedId === 1 || selectedId === 2
                    ? "bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0"
                    : selectedId === 3
                      ? "bg-[var(--status-warning-bg,#feefce)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0"
                      : "bg-[#edeff3] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0"
                }
                label={
                  selectedId === 1 || selectedId === 2
                    ? "Live"
                    : selectedId === 3
                      ? storyV2Uploaded
                        ? "V2 in review"
                        : "Changes requested"
                      : "Not started"
                }
                tone={selectedId === 1 || selectedId === 2 ? "Success" : selectedId === 3 ? "Warning" : "Neutral"}
              />
            </div>

            {/* Panel Tabs */}
            <div className="border-[#e5e7eb] border-b border-solid content-stretch flex gap-[22px] items-start overflow-clip relative shrink-0 w-full" data-node-id="715:4240" data-name="Panel tabs">
              <button
                type="button"
                onClick={() => setPanelTab("content")}
                className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start overflow-clip relative shrink-0"
                data-node-id="715:4241"
                data-name="t"
              >
                <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-node-id="715:4242" data-name="r">
                  <p
                    className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[13px] text-left whitespace-nowrap transition ${
                      panelTab === "content" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#070b13]"
                    }`}
                    data-node-id="715:4243"
                  >
                    Content
                  </p>
                </div>
                <div className={`h-[2px] relative shrink-0 w-full transition ${panelTab === "content" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="715:4244" data-name="Rectangle" />
              </button>
              <button
                type="button"
                onClick={() => setPanelTab("comments")}
                className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start overflow-clip relative shrink-0"
                data-node-id="715:4245"
                data-name="t"
              >
                <div className="content-stretch flex gap-[6px] items-start overflow-clip relative shrink-0" data-node-id="715:4246" data-name="r">
                  <p
                    className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[13px] whitespace-nowrap transition ${
                      panelTab === "comments" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#070b13]"
                    }`}
                    data-node-id="715:4247"
                  >
                    Comments
                  </p>
                  <Badge
                    className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0"
                    label={String(comments.length)}
                    showDot={false}
                    tone="Neutral"
                  />
                </div>
                <div className={`h-[2px] relative shrink-0 w-full transition ${panelTab === "comments" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="715:4250" data-name="Rectangle" />
              </button>
              <button
                type="button"
                onClick={() => setPanelTab("history")}
                className="content-stretch cursor-pointer flex flex-col gap-[8px] items-start overflow-clip relative shrink-0"
                data-node-id="715:4251"
                data-name="t"
              >
                <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-node-id="715:4252" data-name="r">
                  <p
                    className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[13px] text-left whitespace-nowrap transition ${
                      panelTab === "history" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#070b13]"
                    }`}
                    data-node-id="715:4253"
                  >
                    History
                  </p>
                </div>
                <div className={`h-[2px] relative shrink-0 w-full transition ${panelTab === "history" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="715:4254" data-name="Rectangle" />
              </button>
            </div>

            {/* Panel Tab: Content */}
            {panelTab === "content" && (
              <>
                {/* Request card (for changes requested) */}
                {selectedId === 3 && (
                  <div className="bg-[#fffaf0] border border-[#f59e0b] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[14px] relative rounded-[10px] shrink-0 w-full" data-node-id="715:3569" data-name="Request">
                    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3570" data-name="h">
                      <Badge className="bg-[var(--status-warning-bg,#feefce)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Minimalist asked for a change" tone="Warning" />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="715:3573">
                      Send version 2 by 30 Oct. Your ₹3,000 stays in escrow until it’s approved.
                    </p>
                    <div className="bg-white border border-[#edeff3] border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-full" data-node-id="715:3574" data-name="t">
                      <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3575" data-name="r">
                        <div className="bg-[#070b13] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-full,999px)] shrink-0 size-[20px]" data-node-id="715:3576" data-name="Avatar">
                          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap" data-node-id="715:3577">
                            AM
                          </p>
                        </div>
                        <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[normal] min-w-px not-italic relative text-[#070b13] text-[12px]" data-node-id="715:3578">
                          Ananya Mehta · Minimalist
                        </p>
                        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:3579">
                          28 Oct, 09:15
                        </p>
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[12px] w-full" data-node-id="715:3580">
                        “Love it. Please add ISHITA15 on screen for the last 3 seconds.”
                      </p>
                    </div>
                  </div>
                )}

                {/* Version Card */}
                <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[14px] relative rounded-[10px] shrink-0 w-full" data-node-id="715:3581" data-name="Version">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="715:3582" data-name="h">
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold'] font-semibold leading-[normal] min-w-px not-italic relative text-[#070b13] text-[13px]" data-node-id="715:3583">
                      Version
                    </p>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="715:3584">
                      {storyV2Uploaded ? "2 · uploaded just now" : "1 · sent 27 Oct, 21:10"}
                    </p>
                  </div>
                  <div className="border border-[#e5e7eb] border-solid content-stretch flex flex-col items-start overflow-clip px-[12px] py-[8px] relative rounded-[8px] shrink-0 w-full" data-node-id="715:3585" data-name="File details">
                    <div className="border-[#edeff3] border-solid content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[6px] relative shrink-0 text-[12px] w-full" data-node-id="715:3586" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[90px]" data-node-id="715:3587">
                        File
                      </p>
                      <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13] truncate" data-node-id="715:3588">
                        {storyV2Uploaded ? uploadedFileName : "ishita_story_v1.mp4"}
                      </p>
                    </div>
                    <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[6px] relative shrink-0 text-[12px] w-full" data-node-id="715:3589" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[90px]" data-node-id="715:3590">
                        Size
                      </p>
                      <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3591">
                        {storyV2Uploaded ? "14.2 MB" : "18.6 MB"}
                      </p>
                    </div>
                    <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[6px] relative shrink-0 text-[12px] w-full" data-node-id="715:3592" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[90px]" data-node-id="715:3593">
                        Format
                      </p>
                      <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3594">
                        MP4 · 9:16
                      </p>
                    </div>
                    <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[6px] relative shrink-0 text-[12px] w-full" data-node-id="715:3595" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[90px]" data-node-id="715:3596">
                        Length
                      </p>
                      <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3597">
                        0:22
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full" data-node-id="715:3598" data-name="Caption">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:3599">
                      Caption
                    </p>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[12px] w-full" data-node-id="715:3600">
                      Day-7 glow check with the Minimalist Vitamin-C Serum. Use ISHITA15 for 15% off. #MinimalistDiwali #ad
                    </p>
                  </div>
                </div>

                {/* Your deliverable · set by Minimalist (Specs) */}
                <div className="border border-[#e5e7eb] border-solid content-stretch flex flex-col items-start overflow-clip px-[14px] py-[10px] relative rounded-[10px] shrink-0 w-full" data-node-id="715:3601" data-name="Your deliverable">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic pb-[6px] relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:3602">
                    Your deliverable · set by Minimalist
                  </p>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3603" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3604">
                      Deliverable
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3605">
                      Story · 3–4 frames
                    </p>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3606" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3607">
                      Platform
                    </p>
                    <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="715:3608" data-name="r">
                      <PlatformLogo className="relative shrink-0 size-[14px]" />
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[normal] min-w-px not-italic relative text-[#070b13] text-[13px]" data-node-id="715:3610">
                        Instagram
                      </p>
                    </div>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3611" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3612">
                      Goes live by
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3613">
                      5 Nov
                    </p>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3614" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3615">
                      Tracking link
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3616">
                      flw.to/ishita-vcs
                    </p>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3617" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3618">
                      Coupon code
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3619">
                      ISHITA15 · 15% off
                    </p>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3620" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3621">
                      Fee
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3622">
                      ₹3,000 · you get ₹3,000
                    </p>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3623" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3624">
                      Usage
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3625">
                      30 days organic
                    </p>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3626" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3627">
                      Shipping
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3628">
                      Lip Tint Duo · Delhivery
                    </p>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="715:3629" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="715:3630">
                      Note
                    </p>
                    <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="715:3631">
                      Show the code on screen
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Panel Tab: Comments (matches Figma node 715:3658) */}
            {panelTab === "comments" && (
              <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full" data-node-id="715:4255_wrapper">
                {/* Title & subtitle */}
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="715:4255" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="715:4256">
                    Comments on this deliverable
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px]" data-node-id="715:4257">
                    Minimalist sees these too · also in Messages
                  </p>
                </div>

                {/* Comment bubbles */}
                <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                  {comments.map((comment, index) => {
                    const isUser = !comment.isBrand;
                    return (
                      <div
                        key={index}
                        className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full"
                        data-node-id={isUser ? "715:4266" : "715:4258"}
                        data-name="Comment"
                      >
                        <div
                          className="bg-[#3b5bff] content-stretch flex items-center justify-center overflow-clip relative rounded-[15px] shrink-0 size-[30px]"
                          data-node-id={isUser ? "715:4267" : "715:4259"}
                          data-name="Avatar"
                        >
                          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap">
                            {comment.initials}
                          </p>
                        </div>
                        <div
                          className={`[word-break:break-word] ${
                            isUser ? "bg-[#f1f4ff]" : "bg-[#f8f9fb]"
                          } content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic p-[12px] relative rounded-[10px]`}
                          data-node-id={isUser ? "715:4269" : "715:4261"}
                          data-name="Bubble"
                        >
                          <div className="content-stretch flex gap-[6px] items-start relative shrink-0 whitespace-nowrap" data-name="h">
                            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[12px]">
                              {comment.author}
                            </p>
                            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[11px]">
                              {comment.time}
                            </p>
                          </div>
                          <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#394357] text-[13px] w-[min-content] [word-break:break-word]">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Input form */}
                <form
                  onSubmit={handleSendComment}
                  className="bg-white border border-[#e5e7eb] border-solid content-stretch flex gap-[8px] items-center p-[6px] pl-[12px] relative rounded-[10px] shrink-0 w-full"
                  data-node-id="715:4282"
                  data-name="Input"
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment… mention a time, e.g. 0:19"
                    className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#070b13] placeholder:text-[#8491a3] text-[13px] bg-transparent outline-none border-none py-1"
                    data-node-id="715:4283"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className={`bg-[var(--prim-gray-900,#0d0d10)] content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 transition cursor-pointer ${
                      !newComment.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1a1a24]"
                    }`}
                    data-node-id="715:4284"
                    data-name="Button"
                  >
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-on-primary,white)] whitespace-nowrap" data-node-id="I715:4284;5:21">
                      Send
                    </p>
                  </button>
                </form>
              </div>
            )}

            {/* Panel Tab: History (matches Figma node 715:4304) */}
            {panelTab === "history" && (
              <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="715:4901_wrapper">
                {/* Title and subtitle */}
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap mb-1" data-node-id="715:4901" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="715:4902">
                    History
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px]" data-node-id="715:4903">
                    Every change to this deliverable, newest first
                  </p>
                </div>

                {/* Event timeline */}
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full divide-y divide-transparent">
                  {/* Dynamic: Version 2 submitted if uploaded */}
                  {storyV2Uploaded && (
                    <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full">
                      <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]">
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#149d46] text-[12px] whitespace-nowrap">
                          ✓
                        </p>
                      </div>
                      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative">
                        <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap">
                          Version 2 submitted
                        </p>
                        <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]">
                          {uploadedFileName || "ishita_story_v2.mp4"} · 14.2 MB · v2
                        </p>
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap">
                        Just now
                      </p>
                    </div>
                  )}

                  {/* Event 1: Send version 2 */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4904" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4905" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#c2410c] text-[12px] whitespace-nowrap" data-node-id="715:4906">
                        !
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4907" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4908">
                        Send version 2
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4909">
                        Due 30 Oct · goes live by 5 Nov
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4910">
                      Now
                    </p>
                  </div>

                  {/* Event 2: Changes asked */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4911" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4912" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#c2410c] text-[12px] whitespace-nowrap" data-node-id="715:4913">
                        ↺
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4914" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4915">
                        Changes asked by Ananya Mehta
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4916">
                        “Please add ISHITA15 on screen for the last 3 seconds.”
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4917">
                      28 Oct, 09:15
                    </p>
                  </div>

                  {/* Event 3: Draft sent */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4918" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4919" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[12px] whitespace-nowrap" data-node-id="715:4920">
                        ↑
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4921" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4922">
                        Draft sent for review
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4923">
                        ishita_story_v1.mp4 · 18.6 MB · v1
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4924">
                      27 Oct, 21:10
                    </p>
                  </div>

                  {/* Event 4: Lip Tint Duo delivered */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4925" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4926" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#149d46] text-[12px] whitespace-nowrap" data-node-id="715:4927">
                        ✓
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4928" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4929">
                        Lip Tint Duo delivered
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4930">
                        Delhivery · confirm by 28 Oct, 11:40 or it confirms itself
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4931">
                      26 Oct, 11:40
                    </p>
                  </div>

                  {/* Event 5: Product shipped */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4932" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4933" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[12px] whitespace-nowrap" data-node-id="715:4934">
                        →
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4935" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4936">
                        Product shipped
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4937">
                        Delhivery · 1490 2283 7710 58
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4938">
                      24 Oct, 16:30
                    </p>
                  </div>

                  {/* Event 6: Tracking link & coupon created */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4939" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4940" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[12px] whitespace-nowrap" data-node-id="715:4941">
                        ∞
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4942" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4943">
                        Tracking link and coupon created
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4944">
                        flw.to/ishita-vcs · ISHITA15
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4945">
                      8 Oct, 09:40
                    </p>
                  </div>

                  {/* Event 7: Escrow held */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4946" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4947" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#149d46] text-[12px] whitespace-nowrap" data-node-id="715:4948">
                        ₹
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4949" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4950">
                        ₹3,000 held in escrow
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4951">
                        Part of ₹17,000 Minimalist paid when inviting you
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4952">
                      7 Oct, 10:12
                    </p>
                  </div>

                  {/* Event 8: Deliverable set */}
                  <div className="content-stretch flex gap-[12px] items-start overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="715:4953" data-name="Event">
                    <div className="bg-[#f3f5f7] content-stretch flex items-center justify-center overflow-clip relative rounded-[13px] shrink-0 size-[26px]" data-node-id="715:4954" data-name="Frame">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#394357] text-[12px] whitespace-nowrap" data-node-id="715:4955">
                        +
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative" data-node-id="715:4956" data-name="t">
                      <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="715:4957">
                        Deliverable set by Ananya Mehta
                      </p>
                      <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#8491a3] text-[12px] w-[min-content]" data-node-id="715:4958">
                        1 Story · goes live by 5 Nov · ₹3,000 · 30 days organic
                      </p>
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] whitespace-nowrap" data-node-id="715:4959">
                      7 Oct, 10:12
                    </p>
                  </div>
                </div>

                {/* Bottom Full-Width Action Button for History (Figma node 715:4960) */}
                <button
                  type="button"
                  onClick={onOpenUploadModal}
                  className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full hover:bg-[#1a1a24] transition mt-2"
                  data-node-id="715:4960"
                  data-name="Button"
                >
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap" data-node-id="I715:4960;5:9">
                    {storyV2Uploaded ? "Upload new version" : "Upload version 2"}
                  </p>
                </button>
              </div>
            )}

            {/* Panel Actions (shown only when Content tab is active) */}
            {panelTab === "content" && (
              <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full pt-1" data-node-id="715:3632" data-name="Actions">
                <button
                  type="button"
                  onClick={onOpenUploadModal}
                  className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch flex flex-[1_0_0] gap-[8px] h-[40px] items-center justify-center min-w-px overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] hover:bg-[#1a1a24] transition cursor-pointer"
                  data-node-id="715:3633"
                  data-name="Button"
                >
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap" data-node-id="I715:3633;5:9">
                    {storyV2Uploaded ? "Upload new version" : "Upload version 2"}
                  </p>
                </button>
                <Link
                  to="/brand/messages"
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] gap-[8px] h-[40px] items-center justify-center min-w-px overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] hover:bg-[#f4f6fb] transition cursor-pointer"
                  data-node-id="715:3638"
                  data-name="Button"
                >
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I715:3638;5:33">
                    Message brand
                  </p>
                </Link>
              </div>
            )}
          </div>
      )}

      {/* Live Post Link Modal */}
      {livePostModal.open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setLivePostModal({ open: false, id: 0, title: "", currentLink: "" })}
        >
          <div
            className="w-full max-w-[440px] rounded-[16px] bg-white p-6 shadow-2xl border border-[#e5e7eb] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-['Inter:Semi_Bold'] text-[17px] font-semibold text-[#0d0d10]">
                  Add Live Post Link
                </h3>
                <p className="mt-1 text-[13px] text-[#6b7280]">
                  {livePostModal.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLivePostModal({ open: false, id: 0, title: "", currentLink: "" })}
                className="text-[#9ca3af] hover:text-[#111827] p-1 rounded-md transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-[12px] font-medium text-[#374151] mb-1.5">
                Instagram URL
              </label>
              <div className="flex items-center gap-2 rounded-[8px] border border-[#e3e5ec] px-3 py-2 focus-within:border-[#3b5bff]">
                <Link2 size={16} className="text-[#9ca3af] shrink-0" />
                <input
                  type="url"
                  value={livePostModal.currentLink}
                  onChange={(e) =>
                    setLivePostModal((prev) => ({ ...prev, currentLink: e.target.value }))
                  }
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full text-[13px] text-[#0d0d10] placeholder:text-[#9ca3af] focus:outline-none"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-[#8491a3] mt-1.5">
                Paste the public Instagram Reel or Story link so Minimalist can verify live engagement.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setLivePostModal({ open: false, id: 0, title: "", currentLink: "" })}
                className="px-3.5 py-2 text-[13px] font-medium text-[#4b5563] hover:text-[#111827] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (livePostModal.currentLink.trim()) {
                    setDeliverableLinks((prev) => ({
                      ...prev,
                      [livePostModal.id]: livePostModal.currentLink.trim(),
                    }));
                    showToast(`Live post link saved for "${livePostModal.title}"`);
                  }
                  setLivePostModal({ open: false, id: 0, title: "", currentLink: "" });
                }}
                className="rounded-[8px] bg-[#0d0d10] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#1a1a24] transition cursor-pointer"
              >
                Save link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report a Product Problem Modal */}
      {reportModal.open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setReportModal({ open: false, id: 0, title: "" })}
        >
          <div
            className="w-full max-w-[460px] rounded-[16px] bg-white p-6 shadow-2xl border border-[#e5e7eb] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-[#fef2f2] flex items-center justify-center text-[#dc2626]">
                    <Flag size={14} />
                  </div>
                  <h3 className="font-['Inter:Semi_Bold'] text-[17px] font-semibold text-[#0d0d10]">
                    Report a Product Problem
                  </h3>
                </div>
                <p className="mt-1.5 text-[13px] text-[#6b7280]">
                  Reporting an issue with {reportModal.title} pauses delivery deadlines until resolved.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReportModal({ open: false, id: 0, title: "" })}
                className="text-[#9ca3af] hover:text-[#111827] p-1 rounded-md transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-[#374151] mb-1">
                  Issue type
                </label>
                <select className="w-full rounded-[8px] border border-[#e3e5ec] p-2 text-[13px] text-[#0d0d10] focus:border-[#3b5bff] focus:outline-none">
                  <option>Damaged in transit</option>
                  <option>Wrong product received</option>
                  <option>Missing kit accessories</option>
                  <option>Courier marked delivered but not received</option>
                  <option>Product expired or defective</option>
                  <option>Other issue</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#374151] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the issue in detail so Minimalist support can send a replacement quickly..."
                  className="w-full rounded-[8px] border border-[#e3e5ec] p-2.5 text-[13px] text-[#0d0d10] placeholder:text-[#9ca3af] focus:border-[#3b5bff] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setReportModal({ open: false, id: 0, title: "" })}
                className="px-3.5 py-2 text-[13px] font-medium text-[#4b5563] hover:text-[#111827] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Problem reported for "${reportModal.title}". Deadline paused.`);
                  setReportModal({ open: false, id: 0, title: "" });
                }}
                className="rounded-[8px] bg-[#dc2626] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#b91c1c] transition cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Success Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-2.5 rounded-[10px] bg-[#0d0d10] text-white px-4 py-3 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="size-5 rounded-full bg-[#16a34a] flex items-center justify-center text-white shrink-0">
            <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-[13px] font-medium">{successToast}</span>
        </div>
      )}
    </div>
  );
}

export default CreatorProjectDeliverablesView;
