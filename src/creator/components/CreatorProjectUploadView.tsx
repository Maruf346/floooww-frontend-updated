import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, Check, ChevronDown, CheckCircle2, FileVideo, Globe, X, AlertCircle } from "lucide-react";

const imgPlatformInstagram = "https://www.figma.com/api/mcp/asset/07da9569-cb43-4b91-bcb2-7a7810a8ee25.svg";
const imgBottleThumbnail = "https://www.figma.com/api/mcp/asset/81ab4576-5d51-4c15-a9ff-85571a54ccee.png";

export type DeliverableOption = {
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

export const DELIVERABLES_LIST: DeliverableOption[] = [
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

type CreatorProjectUploadViewProps = {
  onSuccessSubmit?: (fileName: string) => void;
};

export function CreatorProjectUploadView({ onSuccessSubmit }: CreatorProjectUploadViewProps) {
  const [selectedDeliverableId, setSelectedDeliverableId] = useState<number>(3);
  const [isDeliverableDropdownOpen, setIsDeliverableDropdownOpen] = useState(false);
  const [mode, setMode] = useState<"upload" | "link">("upload");

  // Upload file state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    sizeText: string;
    durationText: string;
    resolutionText: string;
  } | null>({
    name: "meera_story_v2.mp4",
    sizeText: "32.4 MB",
    durationText: "0:24",
    resolutionText: "1080 × 1920",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live Post Link state
  const [postLink, setPostLink] = useState("instagram.com/stories/meerabeauty/3471209982");
  const [postedOnDate, setPostedOnDate] = useState("5 Nov 2026");
  const [postedOnTime, setPostedOnTime] = useState("18:30");
  const [instagramNote, setInstagramNote] = useState("Went live at 18:30 with the link sticker on frame 2.");

  // General details
  const [caption, setCaption] = useState(
    "Day-7 glow check with the Minimalist Vitamin-C Serum. Use ISHITA15 for 15% off. #MinimalistDiwali #ad"
  );
  const [note, setNote] = useState("Added ISHITA15 on screen from 0:19 to 0:22.");

  // Submitted success banner
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
    setIsSuccessModalOpen(true);
  };

  const handleConfirmApproval = () => {
    setIsSuccessModalOpen(false);
    setIsSubmitted(true);
    onSuccessSubmit?.(mode === "upload" ? fileDetails?.name || "meera_story_v2.mp4" : postLink);
  };

  return (
    <div className="w-full flex flex-col gap-6" data-name="CreatorProjectUploadView">
      {/* Header bar / status */}
      <div className="bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-semibold text-[#0d0d10] tracking-[-0.2px]">
            Upload deliverable
          </h2>
          <p className="text-[13px] text-[#6b7280] mt-1">
            Send your content to Minimalist for review. Check it meets the brief requirements before submitting.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#16a34a]">
            <span className="size-1.5 rounded-full bg-[#16a34a]" />
            Active workspace
          </span>
        </div>
      </div>

      {isSubmitted && (
        <div className="bg-[#e1fce3] border border-[#bbf7d0] rounded-[12px] p-4 flex items-start gap-3 animate-in fade-in duration-200">
          <CheckCircle2 className="size-5 text-[#16a34a] shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-[14px] font-semibold text-[#16a34a]">
              Sent for approval!
            </h4>
            <p className="text-[13px] text-[#15803d] mt-0.5">
              Minimalist has been notified. They usually review deliverables within 24 to 48 hours. You will receive an email and notification once reviewed.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-[#16a34a] hover:text-[#15803d] p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Steps & Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col gap-6">
          {/* Step 1: Deliverable picker */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-[#0d0d10] text-[12px] font-semibold text-white">
                1
              </span>
              <label className="text-[14px] font-semibold text-[#0d0d10]">
                Select deliverable
              </label>
            </div>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => setIsDeliverableDropdownOpen((prev) => !prev)}
                className="w-full flex items-center justify-between border border-[#e5e7eb] rounded-[10px] p-3 text-left hover:border-[#3b5bff] transition bg-white"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={imgPlatformInstagram} alt="" className="size-5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-[#0d0d10] truncate">
                      {currentDeliverable.title}
                    </p>
                    <p className="text-[12px] text-[#6b7280] truncate">
                      {currentDeliverable.subtitle} · Due {currentDeliverable.dueDate}
                    </p>
                  </div>
                </div>
                <ChevronDown size={16} className="text-[#8491a3] shrink-0 ml-2" />
              </button>

              {isDeliverableDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-white border border-[#e5e7eb] rounded-[10px] shadow-lg overflow-hidden py-1">
                  {DELIVERABLES_LIST.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setSelectedDeliverableId(d.id);
                        setIsDeliverableDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-[#f4f6fb] transition ${
                        selectedDeliverableId === d.id ? "bg-[#f1f4ff]" : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <p className={`text-[13px] ${selectedDeliverableId === d.id ? "font-semibold text-[#3b5bff]" : "font-medium text-[#0d0d10]"}`}>
                          {d.title}
                        </p>
                        <p className="text-[11px] text-[#6b7280]">
                          {d.subtitle} · Due {d.dueDate}
                        </p>
                      </div>
                      {selectedDeliverableId === d.id && (
                        <Check size={14} className="text-[#3b5bff] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Mode & Upload */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-[#0d0d10] text-[12px] font-semibold text-white">
                  2
                </span>
                <label className="text-[14px] font-semibold text-[#0d0d10]">
                  Content upload
                </label>
              </div>
              <div className="flex items-center gap-1 bg-[#f4f6fb] p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setMode("upload")}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition ${
                    mode === "upload"
                      ? "bg-white text-[#0d0d10] shadow-xs"
                      : "text-[#6b7280] hover:text-[#0d0d10]"
                  }`}
                >
                  Upload file
                </button>
                <button
                  type="button"
                  onClick={() => setMode("link")}
                  className={`px-3 py-1 rounded-md text-[12px] font-medium transition ${
                    mode === "link"
                      ? "bg-white text-[#0d0d10] shadow-xs"
                      : "text-[#6b7280] hover:text-[#0d0d10]"
                  }`}
                >
                  Live post link
                </button>
              </div>
            </div>

            {mode === "upload" ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                className={`mt-2 border-2 border-dashed rounded-[12px] p-6 text-center transition flex flex-col items-center justify-center ${
                  isDragging
                    ? "border-[#3b5bff] bg-[#f1f4ff]"
                    : "border-[#e5e7eb] hover:border-[#cbd5e1] bg-[#fafbfe]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelected(e.target.files[0]);
                    }
                  }}
                />

                {fileDetails ? (
                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className="size-12 rounded-full bg-[#f1f4ff] text-[#3b5bff] grid place-items-center">
                      <FileVideo size={24} />
                    </div>
                    <div className="text-center">
                      <p className="text-[14px] font-semibold text-[#0d0d10]">
                        {fileDetails.name}
                      </p>
                      <p className="text-[12px] text-[#6b7280] mt-0.5">
                        {fileDetails.sizeText} · {fileDetails.durationText} · {fileDetails.resolutionText}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-md border border-[#e5e7eb] text-[12px] font-medium text-[#0d0d10] hover:bg-white"
                      >
                        Replace file
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setFileDetails(null);
                        }}
                        className="px-3 py-1.5 rounded-md text-[12px] font-medium text-[#ef4444] hover:bg-[#fef2f2]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="size-12 rounded-full bg-[#f1f4ff] text-[#3b5bff] grid place-items-center mb-1">
                      <Upload size={22} />
                    </div>
                    <p className="text-[14px] font-semibold text-[#0d0d10]">
                      Drag and drop your video or photos here
                    </p>
                    <p className="text-[12px] text-[#8491a3]">or</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-md bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black/90 transition"
                    >
                      Browse files
                    </button>
                    <p className="text-[11px] text-[#9ca3af] mt-2">
                      MP4, MOV, JPG or PNG · up to 1 GB · 1080 × 1920 (9:16)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-3 p-4 bg-[#fafbfe] border border-[#e5e7eb] rounded-[12px]">
                <div>
                  <label className="text-[12px] font-medium text-[#0d0d10]">
                    Instagram post / Story link
                  </label>
                  <div className="mt-1 flex items-center border border-[#e5e7eb] rounded-[8px] bg-white px-3 py-2">
                    <Globe size={16} className="text-[#8491a3] shrink-0 mr-2" />
                    <input
                      type="text"
                      value={postLink}
                      onChange={(e) => setPostLink(e.target.value)}
                      placeholder="e.g. instagram.com/stories/..."
                      className="w-full text-[13px] text-[#0d0d10] outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-medium text-[#0d0d10]">
                      Date posted
                    </label>
                    <input
                      type="text"
                      value={postedOnDate}
                      onChange={(e) => setPostedOnDate(e.target.value)}
                      className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] bg-white px-3 py-2 text-[13px] text-[#0d0d10] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-[#0d0d10]">
                      Time posted
                    </label>
                    <input
                      type="text"
                      value={postedOnTime}
                      onChange={(e) => setPostedOnTime(e.target.value)}
                      className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] bg-white px-3 py-2 text-[13px] text-[#0d0d10] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[12px] font-medium text-[#0d0d10]">
                    Note on live post
                  </label>
                  <input
                    type="text"
                    value={instagramNote}
                    onChange={(e) => setInstagramNote(e.target.value)}
                    className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] bg-white px-3 py-2 text-[13px] text-[#0d0d10] outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Caption & Notes */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-[#0d0d10] text-[12px] font-semibold text-white">
                3
              </span>
              <label className="text-[14px] font-semibold text-[#0d0d10]">
                Caption &amp; notes
              </label>
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#0d0d10]">
                Caption
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-3 text-[13px] text-[#0d0d10] outline-none focus:border-[#3b5bff] transition resize-none"
                placeholder="Enter caption to be posted with this deliverable..."
              />
            </div>

            <div>
              <label className="text-[12px] font-medium text-[#0d0d10]">
                Note for Minimalist (optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 w-full border border-[#e5e7eb] rounded-[8px] p-3 text-[13px] text-[#0d0d10] outline-none focus:border-[#3b5bff] transition"
                placeholder="e.g. Added ISHITA15 on screen from 0:19 to 0:22."
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-[#f1f3f7] flex items-center justify-between">
            <p className="text-[12px] text-[#6b7280]">
              {mode === "upload" && !fileDetails
                ? "Add a file to continue"
                : "Ready to send to Minimalist"}
            </p>
            <button
              type="button"
              onClick={handleSendForApproval}
              disabled={mode === "upload" && !fileDetails}
              className={`px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition ${
                mode === "upload" && !fileDetails
                  ? "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
                  : "bg-[#0d0d10] text-white hover:bg-black/90 cursor-pointer shadow-sm"
              }`}
            >
              Send for approval
            </button>
          </div>
        </div>

        {/* Right column: Deliverable Brief & Checklist (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#e5e7eb] rounded-[14px] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-[#0d0d10]">
              Brief for this deliverable
            </h3>
            <span className="text-[12px] font-medium text-[#3b5bff] bg-[#f1f4ff] px-2.5 py-0.5 rounded-full">
              {currentDeliverable.version}
            </span>
          </div>

          {/* Product thumbnail */}
          <div className="flex items-center gap-3 p-3 bg-[#fafbfe] border border-[#e5e7eb] rounded-[10px]">
            <img
              src={imgBottleThumbnail}
              alt="Vitamin-C Serum"
              className="size-12 rounded-lg object-cover bg-white"
            />
            <div>
              <p className="text-[13px] font-semibold text-[#0d0d10]">
                Vitamin-C Serum 10%
              </p>
              <p className="text-[11px] text-[#6b7280]">
                Minimalist · 7 Oct – 7 Nov 2026
              </p>
            </div>
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-2 text-[12px] border-y border-[#f1f3f7] py-3">
            <div>
              <span className="text-[#8491a3]">Format</span>
              <p className="font-medium text-[#0d0d10] mt-0.5">{currentDeliverable.format}</p>
            </div>
            <div>
              <span className="text-[#8491a3]">Length</span>
              <p className="font-medium text-[#0d0d10] mt-0.5">{currentDeliverable.length}</p>
            </div>
            <div className="mt-2">
              <span className="text-[#8491a3]">Channel</span>
              <p className="font-medium text-[#0d0d10] mt-0.5">{currentDeliverable.channel}</p>
            </div>
            <div className="mt-2">
              <span className="text-[#8491a3]">Due date</span>
              <p className="font-medium text-[#0d0d10] mt-0.5">{currentDeliverable.dueDate}</p>
            </div>
          </div>

          {/* MUST INCLUDE checklist */}
          <div>
            <h4 className="text-[12px] font-semibold tracking-wider text-[#8491a3] uppercase">
              Must include
            </h4>
            <div className="mt-2.5 flex flex-col gap-2">
              {currentDeliverable.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-[13px] text-[#0d0d10]">
                  <span className="grid size-4 place-items-center rounded-full bg-[#e1fce3] text-[#16a34a] shrink-0">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What brand asked (if version 2 or feedback exists) */}
          {currentDeliverable.feedbackNote && (
            <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-[10px] p-3 text-[12px]">
              <div className="flex items-center gap-1.5 text-[#d97706] font-semibold mb-1">
                <AlertCircle size={14} />
                <span>What Minimalist asked · 28 Oct</span>
              </div>
              <p className="text-[#92400e] italic">
                {currentDeliverable.feedbackNote}
              </p>
            </div>
          )}

          {/* Tips */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[10px] p-3 text-[12px]">
            <p className="font-semibold text-[#334155]">Tips</p>
            <p className="text-[#64748b] mt-0.5">
              Good light, steady camera, no heavy filters. Minimalist usually replies within 24 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(7,11,19,0.45)] backdrop-blur-xs p-4 animate-in fade-in duration-150"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            className="bg-white rounded-[16px] shadow-2xl p-6 max-w-[440px] w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="size-12 rounded-full bg-[#e1fce3] text-[#16a34a] grid place-items-center mb-4">
              <Check size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-[18px] font-semibold text-[#0d0d10]">
              Ready to submit?
            </h3>
            <p className="text-[13px] text-[#6b7280] mt-1.5 leading-relaxed">
              Your {currentDeliverable.title} will be sent to Minimalist for review. You can track status under the Deliverables tab.
            </p>
            <div className="flex items-center gap-3 w-full mt-6">
              <button
                type="button"
                onClick={() => setIsSuccessModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-[#e5e7eb] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition"
              >
                Back to edit
              </button>
              <button
                type="button"
                onClick={handleConfirmApproval}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black/90 transition shadow-sm"
              >
                Confirm submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
