import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, Check, ChevronDown, CheckCircle2 } from "lucide-react";

const imgPlatformInstagram = "https://www.figma.com/api/mcp/asset/07da9569-cb43-4b91-bcb2-7a7810a8ee25.svg";
const imgBottleThumbnail = "https://www.figma.com/api/mcp/asset/81ab4576-5d51-4c15-a9ff-85571a54ccee.png";
const imgVideoThumbnail = "https://www.figma.com/api/mcp/asset/1520c31c-0a6f-4106-886d-0f4b0afc18f2.png";

type DeliverableOption = {
  id: number;
  title: string;
  subtitle: string;
  version: string;
  format: string;
  length: string;
  dueDate: string;
  channel: string;
  requirements: string[];
  feedbackNote?: string;
};

const DELIVERABLES_LIST: DeliverableOption[] = [
  {
    id: 3,
    title: "Results after 7 days · Reel",
    subtitle: "Version 2 · Minimalist asked for a change",
    version: "Version 2",
    format: "Vertical 9:16",
    length: "15–30 seconds",
    dueDate: "5 Nov",
    channel: "Your Instagram Story",
    requirements: [
      "ISHITA15 on screen and in the caption",
      "Link sticker · flw.to/ishita-vcs",
      "Tag @minimalist",
      "Lip Tint Duo in use",
      "Paid partnership label on",
    ],
    feedbackNote: "“Please add ISHITA15 on screen for the last 3 seconds.”",
  },
  {
    id: 1,
    title: "Festive GRWM · Reel",
    subtitle: "Version 1 · Approved",
    version: "Version 1",
    format: "Vertical 9:16",
    length: "30–60 seconds",
    dueDate: "18 Oct",
    channel: "Your Instagram Reel",
    requirements: [
      "Show Vitamin-C serum texture",
      "Tag @minimalist in caption",
      "Paid partnership label on",
    ],
  },
  {
    id: 2,
    title: "Launch day · Story",
    subtitle: "Version 1 · Approved",
    version: "Version 1",
    format: "Vertical 9:16",
    length: "15–30 seconds",
    dueDate: "20 Oct",
    channel: "Your Instagram Story",
    requirements: [
      "Unboxing launch kit",
      "Swipe-up / link sticker",
      "Tag @minimalist",
    ],
  },
  {
    id: 4,
    title: "Last-day reminder · Story",
    subtitle: "Version 1 · Not started",
    version: "Version 1",
    format: "Vertical 9:16",
    length: "15–30 seconds",
    dueDate: "30 Oct",
    channel: "Your Instagram Story",
    requirements: [
      "Remind about last 24h sale",
      "Coupon ISHITA15",
      "Direct link sticker",
    ],
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    deliverableId: number;
    deliverableTitle: string;
    file: File | null;
    fileName: string;
    caption: string;
    note: string;
    mode: "upload" | "link";
  }) => void;
  initialDeliverableId?: number;
  initialMode?: "upload" | "link";
};

export function CreatorUploadDeliverableModal({
  isOpen,
  onClose,
  onSubmit,
  initialDeliverableId = 3,
  initialMode = "upload",
}: Props) {
  const [selectedDeliverableId, setSelectedDeliverableId] = useState<number>(initialDeliverableId);
  const [isDeliverableDropdownOpen, setIsDeliverableDropdownOpen] = useState(false);
  const [mode, setMode] = useState<"upload" | "link">(initialMode);

  // Upload file state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    sizeText: string;
    durationText: string;
    resolutionText: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Instagram Live Post Link state (Figma node 716:4242)
  const [postLink, setPostLink] = useState("instagram.com/stories/meerabeauty/3471209982");
  const [postedOnDate, setPostedOnDate] = useState("5 Nov 2026");
  const [postedOnTime, setPostedOnTime] = useState("18:30");
  const [instagramNote, setInstagramNote] = useState("Went live at 18:30 with the link sticker on frame 2.");

  // General details
  const [caption, setCaption] = useState(
    "Day-7 glow check with the Minimalist Vitamin-C Serum. Use ISHITA15 for 15% off. #MinimalistDiwali #ad"
  );
  const [note, setNote] = useState("Added ISHITA15 on screen from 0:19 to 0:22.");

  // Success Confirmation Modal (Figma node 716:4610)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  if (!isOpen) return null;

  const currentDeliverable =
    DELIVERABLES_LIST.find((d) => d.id === selectedDeliverableId) || DELIVERABLES_LIST[0];

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    setFileDetails({
      name: file.name,
      sizeText: `${sizeMb} MB`,
      durationText: "0:24",
      resolutionText: "1080 × 1920",
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleSendForApproval = (e: React.FormEvent) => {
    e.preventDefault();
    // Show Figma node 716:4610 confirmation modal
    setIsSuccessModalOpen(true);
  };

  const handleFinalSuccessClose = () => {
    setIsSuccessModalOpen(false);
    onSubmit({
      deliverableId: currentDeliverable.id,
      deliverableTitle: currentDeliverable.title,
      file: selectedFile,
      fileName:
        mode === "upload"
          ? fileDetails?.name || "meera_story_v2.mp4"
          : postLink,
      caption: mode === "upload" ? caption : "",
      note: mode === "upload" ? note : instagramNote,
      mode,
    });
    onClose();
  };

  return (
    <>
      {/* Main Upload / Add live post Modal */}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(7,11,19,0.45)] backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150"
        onClick={onClose}
      >
        <div
          className="relative bg-white content-stretch flex flex-col items-start overflow-hidden rounded-[16px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.18)] w-full max-w-[1000px] my-8 animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
          data-node-id={mode === "upload" ? "716:3739" : "716:4482"}
          data-name="Modal · Upload deliverable"
        >
          {/* Header */}
          <div
            className="border-[#edeff3] border-b border-solid content-stretch flex gap-[12px] items-start p-[24px] relative shrink-0 w-full"
            data-node-id={mode === "upload" ? "716:3740" : "716:4483"}
            data-name="Header"
          >
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
              <h2
                className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[20px] leading-tight"
                data-node-id={mode === "upload" ? "716:3742" : "716:4485"}
              >
                {mode === "upload" ? "Upload deliverable" : "Add your live post"}
              </h2>
              <p
                className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[13px] leading-normal"
                data-node-id={mode === "upload" ? "716:3743" : "716:4486"}
              >
                {mode === "upload"
                  ? "Send your content to Minimalist for approval. Check it meets the brief first."
                  : "Share the link to the post that went live. Minimalist approves it to release your payment."}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-['Inter:Regular'] text-[#8491a3] hover:text-[#070b13] text-[18px] p-1 rounded-md transition cursor-pointer"
              data-node-id={mode === "upload" ? "716:3744" : "716:4487"}
            >
              ✕
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/webm,image/png,image/jpeg"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelected(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {/* Body */}
          <div
            className="content-stretch flex gap-[24px] items-start p-[24px] relative shrink-0 w-full max-h-[calc(85vh-160px)] overflow-y-auto"
            data-node-id={mode === "upload" ? "716:3745" : "716:4488"}
            data-name="Body"
          >
            {/* Left Column: 3 Steps */}
            <div
              className="content-stretch flex flex-[1_0_0] flex-col gap-[22px] items-start min-w-px relative"
              data-node-id={mode === "upload" ? "716:3746" : "716:4489"}
              data-name="Steps"
            >
              {/* Step 1: Deliverable select */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Step 1">
                <div className="bg-[#3b5bff] content-stretch flex items-center justify-center rounded-[14px] shrink-0 size-[28px]">
                  <p className="font-['Inter:Semi_Bold'] font-semibold text-[13px] text-white">1</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start">
                  <p className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[15px]">Deliverable</p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[13px]">The one you’re sending</p>
                </div>
              </div>

              {/* Deliverable Selector Box */}
              <div className="relative w-full">
                <div
                  onClick={() => setIsDeliverableDropdownOpen(!isDeliverableDropdownOpen)}
                  className="bg-white border border-[#e5e7eb] border-solid content-stretch flex gap-[12px] items-center p-[14px] relative rounded-[10px] shrink-0 w-full cursor-pointer hover:border-[#3b5bff] transition"
                  data-node-id={mode === "upload" ? "716:3753" : "716:4496"}
                >
                  <div className="relative size-[36px] shrink-0 flex items-center justify-center">
                    <img alt="Instagram" className="size-full object-contain" src={imgPlatformInstagram} />
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-0">
                    <p className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[14px] truncate w-full">
                      {currentDeliverable.title}
                    </p>
                    <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px] truncate w-full">
                      {mode === "upload"
                        ? currentDeliverable.subtitle
                        : "Approved 1 Nov · ready to post"}
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-[#8491a3] shrink-0" />
                </div>

                {isDeliverableDropdownOpen && (
                  <div className="absolute top-[105%] left-0 right-0 z-30 bg-white border border-[#e5e7eb] rounded-[10px] shadow-lg overflow-hidden py-1">
                    {DELIVERABLES_LIST.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => {
                          setSelectedDeliverableId(d.id);
                          setIsDeliverableDropdownOpen(false);
                        }}
                        className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition ${
                          d.id === selectedDeliverableId ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
                        }`}
                      >
                        <div>
                          <p className="font-['Inter:Medium'] text-[13px] text-[#070b13]">{d.title}</p>
                          <p className="font-['Inter:Regular'] text-[11px] text-[#8491a3]">{d.subtitle}</p>
                        </div>
                        {d.id === selectedDeliverableId && (
                          <Check size={14} className="text-[#3b5bff]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Add your content */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Step 2">
                <div className="bg-[#3b5bff] content-stretch flex items-center justify-center rounded-[14px] shrink-0 size-[28px]">
                  <p className="font-['Inter:Semi_Bold'] font-semibold text-[13px] text-white">2</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start">
                  <p className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[15px]">Add your content</p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[13px]">
                    {mode === "upload"
                      ? "Upload a file, or add an Instagram link once it’s live"
                      : "Paste the link to your live Story"}
                  </p>
                </div>
              </div>

              {/* Mode switch (Upload file / Instagram link) */}
              <div
                className="bg-[#f3f5f7] content-stretch flex gap-[4px] items-start p-[4px] relative rounded-[10px] shrink-0 w-full"
                data-node-id={mode === "upload" ? "716:3766" : "716:4509"}
              >
                <button
                  type="button"
                  onClick={() => setMode("upload")}
                  className={`content-stretch flex flex-[1_0_0] items-center justify-center py-[9px] relative rounded-[8px] cursor-pointer transition ${
                    mode === "upload"
                      ? "bg-white border border-[#dbe4ff] shadow-xs text-[#3b5bff] font-semibold"
                      : "text-[#394357] font-medium hover:text-[#070b13]"
                  }`}
                >
                  <p className="font-['Inter:Medium'] text-[13px]">Upload file</p>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("link")}
                  className={`content-stretch flex flex-[1_0_0] items-center justify-center py-[9px] relative rounded-[8px] cursor-pointer transition ${
                    mode === "link"
                      ? "bg-white border border-[#dbe4ff] shadow-xs text-[#3b5bff] font-semibold"
                      : "text-[#394357] font-medium hover:text-[#070b13]"
                  }`}
                >
                  <p className="font-['Inter:Medium'] text-[13px]">Instagram link</p>
                </button>
              </div>

              {/* Upload file mode content */}
              {mode === "upload" ? (
                !selectedFile ? (
                  /* EMPTY DROPZONE STATE (Figma node 716:3771) */
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border border-dashed content-stretch flex flex-col gap-[10px] items-center justify-center p-[28px] relative rounded-[12px] shrink-0 w-full transition ${
                      isDragging
                        ? "bg-[#eef3ff] border-[#3b5bff]"
                        : "bg-[#f8fafe] border-[#93b4ff]"
                    }`}
                    data-node-id="716:3771"
                    data-name="Dropzone"
                  >
                    <div
                      className="bg-[#eef3ff] content-stretch flex items-center justify-center p-[14px] rounded-[99px] shrink-0 size-[48px]"
                      data-node-id="716:3772"
                    >
                      <Upload size={22} className="text-[#3b5bff]" />
                    </div>
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[14px]"
                      data-node-id="716:3777"
                    >
                      Drag and drop your video or photos here
                    </p>
                    <p
                      className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                      data-node-id="716:3778"
                    >
                      or
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition cursor-pointer shadow-xs"
                      data-node-id="716:3779"
                    >
                      <p className="font-['Inter:Medium'] font-medium text-[14px] text-[color:var(--text-primary,#0d0d10)]">
                        Choose file
                      </p>
                    </button>
                    <p
                      className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                      data-node-id="716:3784"
                    >
                      MP4, MOV, JPG or PNG · up to 1 GB · 1080 × 1920 (9:16)
                    </p>
                  </div>
                ) : (
                  /* FILE ADDED STATE (Figma node 716:3863 / 716:4135) */
                  <div className="flex flex-col gap-[14px] w-full animate-in fade-in duration-150">
                    <div
                      className="bg-white border border-[#e5e7eb] border-solid content-stretch flex gap-[12px] items-center p-[12px] relative rounded-[10px] shrink-0 w-full"
                      data-node-id="716:4135"
                      data-name="File"
                    >
                      <div
                        className="h-[64px] relative rounded-[6px] shrink-0 w-[48px] overflow-hidden bg-[#0d0d10]"
                        data-node-id="716:4136"
                      >
                        <img
                          alt="Thumbnail"
                          className="size-full object-cover rounded-[6px]"
                          src={imgVideoThumbnail}
                        />
                      </div>
                      <div
                        className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative"
                        data-node-id="716:4137"
                      >
                        <p
                          className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[13px] truncate w-full"
                          data-node-id="716:4138"
                        >
                          {fileDetails?.name || "meera_story_v2.mp4"}
                        </p>
                        <p
                          className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                          data-node-id="716:4139"
                        >
                          {fileDetails?.sizeText || "21.4 MB"} · {fileDetails?.durationText || "0:24"} ·{" "}
                          {fileDetails?.resolutionText || "1080 × 1920"}
                        </p>
                        <div
                          className="bg-[#edeff3] h-[6px] overflow-hidden relative rounded-[3px] shrink-0 w-full"
                          data-node-id="716:4140"
                        >
                          <div
                            className="bg-[#149d46] h-[6px] left-0 rounded-[3px] w-full"
                            data-node-id="716:4141"
                          />
                        </div>
                      </div>

                      <div className="bg-[#e1fce3] px-[8px] py-[2px] rounded-full shrink-0">
                        <p className="font-['Inter:Medium'] font-medium text-[12px] text-[#16a34a]">
                          Uploaded
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-[#e3e5ec] hover:bg-[#f4f6fb] flex items-center justify-center h-[32px] px-[12px] rounded-[var(--radius-md,8px)] shrink-0 transition cursor-pointer text-[#0d0d10] font-['Inter:Medium'] text-[13px]"
                        data-node-id="716:4144"
                      >
                        Replace
                      </button>
                    </div>

                    {/* We Checked Your File Checklist (Figma node 716:4149) */}
                    <div
                      className="bg-[#f8f9fb] content-stretch flex flex-col gap-[8px] items-start p-[14px] relative rounded-[10px] shrink-0 w-full"
                      data-node-id="716:4149"
                      data-name="Checks"
                    >
                      <p
                        className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[13px]"
                        data-node-id="716:4150"
                      >
                        We checked your file
                      </p>

                      <div className="flex gap-[8px] items-center w-full" data-node-id="716:4151">
                        <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                        <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                          Vertical 9:16
                        </p>
                      </div>

                      <div className="flex gap-[8px] items-center w-full" data-node-id="716:4154">
                        <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                        <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                          0:24 long · brief asks 15–30 s
                        </p>
                      </div>

                      <div className="flex gap-[8px] items-center w-full" data-node-id="716:4157">
                        <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                        <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                          ISHITA15 seen on screen at 0:19
                        </p>
                      </div>

                      <div className="flex gap-[8px] items-center w-full" data-node-id="716:4160">
                        <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                        <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                          @minimalist in the caption
                        </p>
                      </div>

                      <div className="flex gap-[8px] items-center w-full" data-node-id="716:4163">
                        <div className="size-4 rounded-full bg-[#f1f4ff] text-[#3b5bff] flex items-center justify-center font-['Inter:Semi_Bold'] text-[11px] shrink-0">
                          i
                        </div>
                        <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                          Turn on the Paid partnership label when you post
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* INSTAGRAM LINK TAB (Figma node 716:4242 & 716:4514) */
                <div className="flex flex-col gap-[14px] w-full animate-in fade-in duration-150">
                  {/* Post link field */}
                  <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-node-id="716:4514">
                    <label className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                      Post link
                    </label>
                    <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex items-center p-[12px] relative rounded-[10px] shrink-0 w-full focus-within:border-[#3b5bff]">
                      <input
                        type="text"
                        value={postLink}
                        onChange={(e) => setPostLink(e.target.value)}
                        className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px] w-full focus:outline-none"
                        data-node-id="716:4516"
                      />
                    </div>
                  </div>

                  {/* Two fields row: Posted on and Time */}
                  <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="716:4518">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
                      <label className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                        Posted on
                      </label>
                      <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex items-center p-[12px] relative rounded-[10px] shrink-0 w-full focus-within:border-[#3b5bff]">
                        <input
                          type="text"
                          value={postedOnDate}
                          onChange={(e) => setPostedOnDate(e.target.value)}
                          className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px] w-full focus:outline-none"
                          data-node-id="716:4521"
                        />
                      </div>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative">
                      <label className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                        Time
                      </label>
                      <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex items-center p-[12px] relative rounded-[10px] shrink-0 w-full focus-within:border-[#3b5bff]">
                        <input
                          type="text"
                          value={postedOnTime}
                          onChange={(e) => setPostedOnTime(e.target.value)}
                          className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px] w-full focus:outline-none"
                          data-node-id="716:4525"
                        />
                      </div>
                    </div>
                  </div>

                  {/* We checked your post Checklist (Figma node 716:4527) */}
                  <div
                    className="bg-[#f8f9fb] content-stretch flex flex-col gap-[8px] items-start p-[14px] relative rounded-[10px] shrink-0 w-full"
                    data-node-id="716:4527"
                    data-name="Checks"
                  >
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[13px]"
                      data-node-id="716:4528"
                    >
                      We checked your post
                    </p>

                    <div className="flex gap-[8px] items-center w-full" data-node-id="716:4529">
                      <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                      <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                        Link sticker goes to flw.to/ishita-vcs
                      </p>
                    </div>

                    <div className="flex gap-[8px] items-center w-full" data-node-id="716:4532">
                      <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                      <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                        ISHITA15 visible
                      </p>
                    </div>

                    <div className="flex gap-[8px] items-center w-full" data-node-id="716:4535">
                      <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                      <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                        Paid partnership label on
                      </p>
                    </div>

                    <div className="flex gap-[8px] items-start w-full" data-node-id="716:4538">
                      <div className="size-4 rounded-full bg-[#f1f4ff] text-[#3b5bff] flex items-center justify-center font-['Inter:Semi_Bold'] text-[11px] shrink-0 mt-0.5">
                        i
                      </div>
                      <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[13px] leading-snug">
                        Stories disappear after 24 h. We save a copy and track the link for 30 days.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Add details */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Step 3">
                <div className="bg-[#3b5bff] content-stretch flex items-center justify-center rounded-[14px] shrink-0 size-[28px]">
                  <p className="font-['Inter:Semi_Bold'] font-semibold text-[13px] text-white">3</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start">
                  <p className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[15px]">Add details</p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[13px]">
                    Minimalist sees these with your content
                  </p>
                </div>
              </div>

              {/* Mode-specific Fields */}
              {mode === "upload" ? (
                <>
                  {/* Caption Input */}
                  <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Field">
                    <label className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                      Caption
                    </label>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write the caption you’ll use…"
                      rows={3}
                      className="w-full bg-white border border-[#e5e7eb] rounded-[10px] p-[12px] text-[13px] text-[#070b13] placeholder:text-[#8491a3] focus:border-[#3b5bff] focus:outline-none resize-none leading-normal"
                      data-node-id="716:3793"
                    />
                  </div>

                  {/* Note Input */}
                  <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Field">
                    <label className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                      Note for Minimalist (optional)
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Anything Minimalist should know"
                      className="w-full bg-white border border-[#e5e7eb] rounded-[10px] p-[12px] text-[13px] text-[#070b13] placeholder:text-[#8491a3] focus:border-[#3b5bff] focus:outline-none"
                      data-node-id="716:3797"
                    />
                  </div>
                </>
              ) : (
                /* Instagram Mode Note field (Figma node 716:4547) */
                <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Field">
                  <label className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    Note for Minimalist (optional)
                  </label>
                  <input
                    type="text"
                    value={instagramNote}
                    onChange={(e) => setInstagramNote(e.target.value)}
                    placeholder="Anything Minimalist should know"
                    className="w-full bg-white border border-[#e5e7eb] rounded-[10px] p-[12px] text-[13px] text-[#070b13] placeholder:text-[#8491a3] focus:border-[#3b5bff] focus:outline-none"
                    data-node-id="716:4549"
                  />
                </div>
              )}
            </div>

            {/* Right Column: Brief for this deliverable (380px) */}
            <div
              className="bg-[#f8f9fb] border border-[#edeff3] border-solid content-stretch flex flex-col gap-[14px] items-start p-[18px] relative rounded-[12px] shrink-0 w-[380px]"
              data-node-id={mode === "upload" ? "716:3799" : "716:4551"}
              data-name="Brief"
            >
              <p
                className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[15px]"
                data-node-id={mode === "upload" ? "716:3800" : "716:4552"}
              >
                Brief for this deliverable
              </p>

              {/* Project Mini Card */}
              <div
                className="bg-white content-stretch flex gap-[12px] items-center p-[12px] relative rounded-[10px] shrink-0 w-full shadow-2xs border border-[#edf0f5]"
                data-node-id={mode === "upload" ? "716:3801" : "716:4553"}
                data-name="Project"
              >
                <div className="relative rounded-[8px] shrink-0 size-[52px] overflow-hidden bg-[#f4f6fb]">
                  <img alt="Vitamin-C Serum" className="size-full object-cover" src={imgBottleThumbnail} />
                </div>
                <div className="content-stretch flex flex-col gap-[2px] items-start overflow-hidden">
                  <p className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[14px] truncate">
                    Vitamin-C Serum
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Minimalist
                  </p>
                  <div className="flex gap-[4px] items-center">
                    <img alt="Instagram" className="size-[14px]" src={imgPlatformInstagram} />
                    <p className="font-['Inter:Regular'] font-normal text-[#394357] text-[12px]">
                      Instagram
                    </p>
                  </div>
                </div>
              </div>

              {/* Deliverable Meta Key-Values */}
              <div
                className="bg-white content-stretch flex flex-col items-start px-[12px] relative rounded-[10px] shrink-0 text-[13px] w-full border border-[#edf0f5]"
                data-node-id={mode === "upload" ? "716:3810" : "716:4562"}
                data-name="kv"
              >
                <div className="flex gap-[12px] items-center py-[10px] relative shrink-0 w-full">
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[100px]">Deliverable</p>
                  <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13] truncate">
                    {currentDeliverable.channel.includes("Story") ? "Story · 3–4 frames" : "Reel · 30–60s"}
                  </p>
                </div>
                <div className="border-[#edeff3] border-t flex gap-[12px] items-center py-[10px] relative shrink-0 w-full">
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[100px]">Format</p>
                  <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13]">
                    {currentDeliverable.format}
                  </p>
                </div>
                <div className="border-[#edeff3] border-t flex gap-[12px] items-center py-[10px] relative shrink-0 w-full">
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[100px]">Length</p>
                  <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13]">
                    {currentDeliverable.length}
                  </p>
                </div>
                <div className="border-[#edeff3] border-t flex gap-[12px] items-center py-[10px] relative shrink-0 w-full">
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[100px]">Goes live by</p>
                  <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13]">
                    {currentDeliverable.dueDate}
                  </p>
                </div>
                <div className="border-[#edeff3] border-t flex gap-[12px] items-center py-[10px] relative shrink-0 w-full">
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[100px]">Post on</p>
                  <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13] truncate">
                    {currentDeliverable.channel}
                  </p>
                </div>
              </div>

              {/* Must Include Checklist */}
              <p
                className="font-['Inter:Semi_Bold'] font-semibold text-[#8491a3] text-[11px] tracking-wider uppercase pt-1"
                data-node-id={mode === "upload" ? "716:3826" : "716:4575"}
              >
                MUST INCLUDE
              </p>

              <div className="flex flex-col gap-[6px] w-full">
                {currentDeliverable.requirements.map((req, i) => (
                  <div key={i} className="flex gap-[8px] items-center w-full">
                    <p className="font-['Inter:Semi_Bold'] font-semibold text-[#149d46] text-[12px]">✓</p>
                    <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal text-[#394357] text-[13px]">
                      {req}
                    </p>
                  </div>
                ))}
              </div>

              {/* What Minimalist asked (if changes asked) */}
              {currentDeliverable.feedbackNote && (
                <div
                  className="bg-[#fff7ed] border border-[#fed7aa] border-solid content-stretch flex flex-col gap-[4px] items-start p-[12px] rounded-[10px] shrink-0 text-[#7a3410] text-[12px] w-full"
                  data-node-id="716:3842"
                  data-name="Asked"
                >
                  <p className="font-['Inter:Semi_Bold'] font-semibold">
                    What Minimalist asked · 28 Oct
                  </p>
                  <p className="font-['Inter:Regular'] font-normal">
                    {currentDeliverable.feedbackNote}
                  </p>
                </div>
              )}

              {/* Tips Card */}
              <div
                className="bg-[#f1f4ff] content-stretch flex flex-col gap-[4px] items-start p-[12px] rounded-[10px] shrink-0 text-[#24407a] text-[12px] w-full"
                data-node-id="716:3845"
                data-name="Tip"
              >
                <p className="font-['Inter:Semi_Bold'] font-semibold">Tips</p>
                <p className="font-['Inter:Regular'] font-normal">
                  Good light, steady camera, no heavy filters. Minimalist usually replies within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="border-[#edeff3] border-solid border-t content-stretch flex gap-[8px] items-center px-[24px] py-[20px] relative shrink-0 w-full bg-white"
            data-node-id={mode === "upload" ? "716:3848" : "716:4597"}
            data-name="Footer"
          >
            <button
              type="button"
              onClick={onClose}
              className="flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[var(--radius-md,8px)] hover:bg-[#f4f6fb] transition cursor-pointer font-['Inter:Medium'] font-medium text-[14px] text-[color:var(--text-primary,#0d0d10)]"
              data-node-id={mode === "upload" ? "716:3849" : "716:4598"}
            >
              Cancel
            </button>
            <div className="flex-[1_0_0] h-px relative" />

            {/* Note before submit */}
            {mode === "upload" ? (
              !selectedFile ? (
                <p
                  className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                  data-node-id="716:3857"
                >
                  Add a file to continue
                </p>
              ) : (
                <p
                  className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                  data-node-id="716:4236"
                >
                  Minimalist replies within 24 hours
                </p>
              )
            ) : (
              <p
                className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                data-node-id="716:4604"
              >
                Approval releases ₹3,000 to you
              </p>
            )}

            {/* Action button */}
            {mode === "upload" ? (
              !selectedFile ? (
                <button
                  type="button"
                  disabled
                  className="bg-[var(--prim-gray-900,#0d0d10)] flex gap-[8px] h-[40px] items-center justify-center opacity-45 px-[16px] rounded-[var(--radius-md,8px)] shrink-0 cursor-not-allowed font-['Inter:Medium'] font-medium text-[14px] text-white"
                  data-node-id="716:3858"
                >
                  Send for approval
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendForApproval}
                  className="bg-[var(--prim-gray-900,#0d0d10)] hover:bg-[#1a1a24] flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[var(--radius-md,8px)] shrink-0 transition cursor-pointer font-['Inter:Medium'] font-medium text-[14px] text-white shadow-xs"
                  data-node-id="716:4237"
                >
                  Send for approval
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={handleSendForApproval}
                className="bg-[var(--prim-gray-900,#0d0d10)] hover:bg-[#1a1a24] flex gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[var(--radius-md,8px)] shrink-0 transition cursor-pointer font-['Inter:Medium'] font-medium text-[14px] text-white shadow-xs"
                data-node-id="716:4605"
              >
                Send live post
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Sent (Figma node 716:4610 & 716:4850) */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[rgba(7,11,19,0.45)] backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={handleFinalSuccessClose}
        >
          <div
            className="relative bg-white content-stretch flex flex-col gap-[14px] items-center overflow-hidden p-[32px] rounded-[16px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.18)] w-full max-w-[480px] animate-in zoom-in-95 duration-150 text-center"
            onClick={(e) => e.stopPropagation()}
            data-node-id="716:4850"
            data-name="Modal · Sent"
          >
            {/* Green Check Circle */}
            <div
              className="bg-[#e1fce3] content-stretch flex items-center justify-center p-[16px] rounded-[99px] shrink-0 size-[56px]"
              data-node-id="716:4851"
            >
              <Check className="size-7 text-[#149d46] stroke-[3]" />
            </div>

            {/* Title */}
            <h3
              className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[20px] leading-tight"
              data-node-id="716:4853"
            >
              Version 2 sent to Minimalist
            </h3>

            {/* Subtitle */}
            <p
              className="font-['Inter:Regular'] font-normal text-[#394357] text-[14px] leading-normal"
              data-node-id="716:4854"
            >
              Ananya usually replies within 24 hours. We’ll tell you on WhatsApp and email.
            </p>

            {/* Status card */}
            <div
              className="bg-[#f8f9fb] content-stretch flex flex-col items-start p-[14px] relative rounded-[10px] shrink-0 text-[13px] w-full mt-1 border border-[#edeff3]"
              data-node-id="716:4855"
              data-name="Status"
            >
              <div className="flex gap-[12px] items-center py-[9px] relative shrink-0 w-full text-left">
                <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[150px] shrink-0" data-node-id="716:4857">
                  {currentDeliverable.title}
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13]" data-node-id="716:4858">
                  Waiting for approval
                </p>
              </div>
              <div className="border-[#edeff3] border-t flex gap-[12px] items-center py-[9px] relative shrink-0 w-full text-left">
                <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[150px] shrink-0" data-node-id="716:4860">
                  Goes live by
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13]" data-node-id="716:4861">
                  {currentDeliverable.dueDate}
                </p>
              </div>
              <div className="border-[#edeff3] border-t flex gap-[12px] items-center py-[9px] relative shrink-0 w-full text-left">
                <p className="font-['Inter:Regular'] font-normal text-[#8491a3] w-[150px] shrink-0" data-node-id="716:4863">
                  Your payment
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium text-[#070b13]" data-node-id="716:4864">
                  ₹3,000 · stays in escrow until approved
                </p>
              </div>
            </div>

            {/* Buttons Row */}
            <div
              className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full mt-3"
              data-node-id="716:4865"
              data-name="b"
            >
              <button
                type="button"
                onClick={handleFinalSuccessClose}
                className="bg-[var(--prim-gray-900,#0d0d10)] hover:bg-[#1a1a24] content-stretch flex flex-[1_0_0] gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[var(--radius-md,8px)] transition cursor-pointer font-['Inter:Medium'] font-medium text-[14px] text-white"
                data-node-id="716:4866"
              >
                Back to deliverables
              </button>
              <Link
                to="/brand/messages"
                onClick={handleFinalSuccessClose}
                className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] gap-[8px] h-[40px] items-center justify-center px-[16px] rounded-[var(--radius-md,8px)] hover:bg-[#f4f6fb] transition cursor-pointer font-['Inter:Medium'] font-medium text-[14px] text-[color:var(--text-primary,#0d0d10)]"
                data-node-id="716:4871"
              >
                Message brand
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatorUploadDeliverableModal;
