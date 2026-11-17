import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import CounterOfferModal from "../components/CounterOfferModal";
import { CreatorProjectDeliverablesView } from "../components/CreatorProjectDeliverablesView";
import { CreatorUploadDeliverableModal } from "../components/CreatorUploadDeliverableModal";
import { CreatorProjectPaymentsView } from "../components/CreatorProjectPaymentsView";
import { CreatorProjectReviewView } from "../components/CreatorProjectReviewView";
import { CreatorProjectPerformanceView } from "../components/CreatorProjectPerformanceView";
import { CreatorDeliverableFilterDropdown, type DeliverableFilterOption } from "../components/CreatorDeliverableFilterDropdown";
import { CreatorDateRangeDropdown } from "../components/CreatorDateRangeDropdown";
import { Upload, FileVideo, X, Check } from "lucide-react";

const imgDot = "https://www.figma.com/api/mcp/asset/fb6bd003-1496-4762-b97a-541e1bc8599d.svg";
const imgDot1 = "https://www.figma.com/api/mcp/asset/b46089d7-8af4-4182-b0b9-a54acff2d23e.svg";
const imgDot2 = "https://www.figma.com/api/mcp/asset/c29aa4bd-4dd3-476b-b277-ac21b101b083.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/81864fc6-2ee5-40f4-9bf0-6bf3d9451bdd.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/c277d5ac-a24b-47f0-98ce-b00a9f160369.svg";
const imgKreyioWordmark = "https://www.figma.com/api/mcp/asset/01ab730b-5347-4018-b0aa-1d6755d44e28.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/2415c86a-fef1-466e-b478-796bc11f8c27.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/401ea59a-d8f3-4ab8-b034-7788d1b14fe9.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/74da0260-6589-4e5e-8515-7393bf24a990.svg";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/af5cdf5e-a986-4480-a1ed-acca41c3a506.svg";
const imgChevron = "https://www.figma.com/api/mcp/asset/125326f0-5b59-4233-a54c-d7e27feeb666.svg";
const imgBullet = "https://www.figma.com/api/mcp/asset/c27f424f-56c6-4acd-b20a-5954ac6f50bb.svg";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/cf97a244-ded2-4bed-abf4-def11dbb1c0e.svg";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/212a2a7a-990d-4e48-83d1-26741c967b84.svg";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/6afebf87-3232-4fdb-9882-e7822c2fd12c.svg";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/a73cbd23-a3fc-4054-9726-f6b3b8ea1828.svg";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/7d4ca09d-90a6-4a92-9d27-868999f7f92d.svg";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/a4002418-fb73-4864-8369-e2206123378f.svg";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/f7a7db06-50f2-44c7-b01c-8e93a0493d58.svg";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/a322aeea-edef-4e66-b7b6-07f48f73629c.svg";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/c6a2298f-803c-44b0-a037-c8fa9731d8dd.svg";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/55be6dda-3ed2-4c03-931b-95afc3d64ab5.svg";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/2fe74a7f-55f7-4cfa-8f15-2b6f78b65e47.svg";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/41cdb988-d09a-4940-9fbd-aa4b1e395ae9.svg";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/a91157c3-522c-45a8-89a7-b78b049d98d0.svg";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/8b096eb2-5291-4464-b61e-3a0149cb8e73.svg";
const imgIcon20 = "https://www.figma.com/api/mcp/asset/85a33845-fe2d-4da0-9f02-a421fe623f19.svg";
const imgDot3 = "https://www.figma.com/api/mcp/asset/0461f8f9-2665-441d-8bc4-ebdfc65c0899.svg";
const imgEllipse = "https://www.figma.com/api/mcp/asset/65b03831-a5fc-4a91-aa48-ed7e5fb9f65b.svg";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/ef1773c9-ab0b-40a3-a701-d56b30525db2.svg";
const imgEllipse2 = "https://www.figma.com/api/mcp/asset/5f72db50-f647-428d-ae8f-265f8dbd30ad.svg";
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/c781e4a3-9b5b-4c57-8c0e-efea12081074.svg";
const imgEllipse4 = "https://www.figma.com/api/mcp/asset/388a52a9-a3e8-4a0c-8761-bc0772de7caa.svg";
const imgEllipse5 = "https://www.figma.com/api/mcp/asset/ffb12b6b-61e5-42d8-9a91-8da04d6e6746.svg";
const imgIcon21 = "https://www.figma.com/api/mcp/asset/6cdb25dd-1fc0-449b-a896-916a66355590.svg";
const imgIcon22 = "https://www.figma.com/api/mcp/asset/0b84c12d-0cf6-498a-a873-fa1a622f0a65.svg";
const imgIcon23 = "https://www.figma.com/api/mcp/asset/c96ce335-099f-4b07-9dff-7103e71c2920.svg";
const imgIcon24 = "https://www.figma.com/api/mcp/asset/75a13207-ecb0-4a74-a6dd-992ea66d9f3d.svg";
const imgIcon25 = "https://www.figma.com/api/mcp/asset/a50ced1e-1426-427f-9066-67c33c44922e.svg";
const imgIcon26 = "https://www.figma.com/api/mcp/asset/75c8f9a4-11aa-4e9f-be66-c226f038fc1f.svg";
const imgIcon27 = "https://www.figma.com/api/mcp/asset/5a2bcf03-0a18-4e17-9f75-efeb024eeb47.svg";

type BadgeProps = {
  className?: string;
  label?: string;
  showDot?: boolean;
  tone?: "Success" | "Warning" | "Info";
};

function Badge({ className, label = "Live", showDot = true, tone = "Success" }: BadgeProps) {
  const isInfo = tone === "Info";
  const isSuccess = tone === "Success";
  const isWarning = tone === "Warning";
  return (
    <div className={className || `content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] ${isInfo ? "bg-[var(--status-info-bg,#f1f4ff)]" : isWarning ? "bg-[var(--status-warning-bg,#feefce)]" : "bg-[var(--status-success-bg,#e1fce3)]"}`} id={isInfo ? "node-5_114" : isWarning ? "node-5_106" : "node-5_102"}>
      {isSuccess && showDot && (
        <div className="relative shrink-0 size-[6px]" data-node-id="5:103" data-name="Dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot} />
        </div>
      )}
      {isSuccess && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)] whitespace-nowrap" data-node-id="5:104">
          {label}
        </p>
      )}
      {isWarning && showDot && (
        <div className="relative shrink-0 size-[6px]" data-node-id="5:107" data-name="Dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
        </div>
      )}
      {isWarning && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-warning-fg,#f59e0b)] whitespace-nowrap" data-node-id="5:108">
          {label}
        </p>
      )}
      {isInfo && showDot && (
        <div className="relative shrink-0 size-[6px]" data-node-id="5:115" data-name="Dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot2} />
        </div>
      )}
      {isInfo && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-info-fg,#3b5bff)] whitespace-nowrap" data-node-id="5:116">
          {label}
        </p>
      )}
    </div>
  );
}

type DateRangeProps = {
  className?: string;
  range?: string;
  showCompare?: boolean;
  state?: "Default";
};

function DateRange({ className, range = "7 Oct – 7 Nov 2026", showCompare = false }: DateRangeProps) {
  return (
    <DateRangePicker value={range} showCompare={showCompare} />
  );
}

type LogoProps = {
  className?: string;
  theme?: "On light";
};

function Logo({ className, theme = "On light" }: LogoProps) {
  return (
    <div className={className || "content-stretch flex items-center overflow-clip relative rounded-[8px]"} data-node-id="9:3">
      <div className="h-[36px] relative shrink-0 w-[99.09px]" data-node-id="2193:2483" data-name="Kreyio wordmark">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgKreyioWordmark} />
      </div>
    </div>
  );
}

export function CreatorLiveProjectDetailPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"overview" | "deliverables" | "payments" | "review" | "performance">(() => {
    if (tabParam === "deliverables" || tabParam === "payments" || tabParam === "review" || tabParam === "performance") {
      return tabParam;
    }
    return "overview";
  });

  const handleTabChange = (tab: "overview" | "deliverables" | "payments" | "review" | "performance") => {
    setActiveTab(tab);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (tab === "overview") {
        next.delete("tab");
      } else {
        next.set("tab", tab);
      }
      return next;
    });
  };

  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [productReceived, setProductReceived] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadNote, setUploadNote] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [storyV2Uploaded, setStoryV2Uploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [deliverableFilter, setDeliverableFilter] = useState<DeliverableFilterOption>("All deliverables");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmitStory = () => {
    if (!selectedFile) return;
    setUploadedFileName(selectedFile.name);
    setStoryV2Uploaded(true);
    setIsUploadOpen(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("ISHITA15");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText("https://flw.to/ishita-vcs");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-[var(--bg-page,white)] flex min-h-screen items-start relative w-full" data-node-id="551:747" data-name="Creator · Vitamin-C Serum: 1 Overview">
      <aside className="sticky top-0 h-screen shrink-0 w-[260px] flex flex-col gap-[2px] items-start overflow-y-auto border-r border-[#e3e5ec] bg-white px-[16px] pt-[20px] pb-[16px] z-30 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" data-node-id="551:748" data-name="Sidebar / Creator">
        <Logo className="content-stretch flex items-center overflow-clip relative rounded-[9.778px] shrink-0" />
        <div className="h-[16px] relative shrink-0 w-[10px]" data-node-id="I551:748;9:488" data-name="gap" />
        <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[10px] items-center overflow-clip p-[10px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[228px]" data-node-id="I551:748;9:489" data-name="Workspace switcher">
          <div className="bg-[var(--primary-default,#0d0d10)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[32px]" data-node-id="I551:748;9:489;9:61" data-name="Initials">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-on-primary,white)] whitespace-nowrap" data-node-id="I551:748;9:489;9:62">
              IR
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="I551:748;9:489;9:63" data-name="Text">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:489;9:64">
              Ishita Rao
            </p>
            <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I551:748;9:489;9:65">
              Creator · @ishitarao
            </p>
          </div>
          <div className="relative shrink-0 size-[16px]" data-node-id="I551:748;9:489;9:66" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I551:748;9:497" data-name="Section · MAIN">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I551:748;9:498">
            MAIN
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:499" data-name="Home">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:499;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:499;9:11">
            Overview
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:510" data-name="Find projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:510;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:510;9:11">
            Project discovery
          </p>
        </div>
        <div className="bg-[var(--primary-subtle,#f1f4ff)] content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:521" data-name="My projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:521;9:18" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon5} />
          </div>
          <a className="[word-break:break-word] block cursor-pointer flex-[1_0_0] font-['Inter:Semi_Bold'] font-semibold leading-[0] min-w-px not-italic relative text-[14px] text-[color:var(--primary-default,#0d0d10)]" data-node-id="I551:748;9:521;9:21">
            <p className="leading-[20px]">My projects</p>
          </a>
          <div className="relative shrink-0 size-[14px]" data-node-id="I551:748;9:521;9:24" data-name="Chevron">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevron} />
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:531" data-name="Invitations & offers">
          <div className="relative shrink-0 size-[4px]" data-node-id="I551:748;9:531;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I551:748;9:531;9:29">{`Invitations & offers`}</p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I551:748;9:531;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I551:748;9:531;9:31">
              4
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:538" data-name="Applied">
          <div className="relative shrink-0 size-[4px]" data-node-id="I551:748;9:538;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I551:748;9:538;9:29">
            Applied
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I551:748;9:538;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I551:748;9:538;9:31">
              3
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:545" data-name="Active">
          <div className="relative shrink-0 size-[4px]" data-node-id="I551:748;9:545;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I551:748;9:545;9:29">
            Live
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I551:748;9:545;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I551:748;9:545;9:31">
              2
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:552" data-name="Completed">
          <div className="relative shrink-0 size-[4px]" data-node-id="I551:748;9:552;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I551:748;9:552;9:29">
            Completed
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I551:748;9:552;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I551:748;9:552;9:31">
              7
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;778:13550" data-name="Declined">
          <div className="relative shrink-0 size-[4px]" data-node-id="I551:748;778:13550;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I551:748;778:13550;9:29">
            Declined
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I551:748;778:13550;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I551:748;778:13550;9:31">
              3
            </p>
          </div>
        </div>
        <Link
          to={ROUTES.creatorContent}
          className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] hover:bg-[#f4f6fb] transition"
          data-node-id="I551:748;9:559"
          data-name="Content"
        >
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:559;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon6} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:559;9:11">
            Content
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I551:748;9:559;9:12" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I551:748;9:559;9:13">
              18
            </p>
          </div>
        </Link>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I551:748;9:571" data-name="Section · CONTENT & DATA">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I551:748;9:572">{`CONTENT & DATA`}</p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:573" data-name="Performance">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:573;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon7} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:573;9:11">
            Performance
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:584" data-name="Earnings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:584;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon8} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:584;9:11">
            Earnings
          </p>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I551:748;9:596" data-name="Section · ACCOUNT">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I551:748;9:597">
            ACCOUNT
          </p>
        </div>
        <Link to="/brand/messages" className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] hover:bg-[#f4f6fb] transition" data-name="Messages">
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon9} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Messages
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              1
            </p>
          </div>
        </Link>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:619" data-name="Settings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:619;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon10} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:619;9:11">
            Settings
          </p>
        </div>
        <div className="flex-1 min-h-[16px] w-full" data-name="Spacer" />
        <div className="bg-[var(--border-default,#e3e5ec)] h-px relative shrink-0 w-full" data-node-id="I551:748;9:631" data-name="Divider" />
        <div className="h-[8px] relative shrink-0 w-[10px]" data-node-id="I551:748;9:632" data-name="gap" />
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:633" data-name="Help Center">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:633;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon11} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:633;9:11">
            Help centre
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I551:748;9:645" data-name="Logout">
          <div className="relative shrink-0 size-[18px]" data-node-id="I551:748;9:645;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon12} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:748;9:645;9:11">
            Logout
          </p>
        </div>
      </aside>
      <div className="bg-[var(--bg-page,white)] flex-1 min-w-0 flex flex-col items-start relative min-h-screen" data-node-id="551:888" data-name="Main">
        <div className="bg-[var(--bg-surface,white)]/95 backdrop-blur-xs border-[var(--border-default,#e3e5ec)] border-b border-solid content-stretch flex gap-[12px] h-[64px] items-center px-[32px] sticky top-0 z-20 w-full" data-node-id="551:889" data-name="Top bar">
          <div className="bg-[var(--bg-subtle,#f4f6fb)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[380px]" data-node-id="I551:889;10:343" data-name="Search">
            <div className="relative shrink-0 size-[16px]" data-node-id="I551:889;10:344" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon13} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I551:889;10:347">
              Search projects, creators, content…
            </p>
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip px-[6px] py-px relative rounded-[4px] shrink-0" data-node-id="I551:889;10:348" data-name="Kbd">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] whitespace-nowrap" data-node-id="I551:889;10:349">
                ⌘K
              </p>
            </div>
          </div>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="I551:889;10:350" data-name="Spacer" />
          <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I551:889;72:2241" data-name="Notifications">
            <div className="relative shrink-0 size-[18px]" data-node-id="I551:889;72:2242" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon14} />
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="I551:889;10:355" data-name="Account">
            <div className="bg-[var(--primary-muted,#e3e9ff)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-full,999px)] shrink-0 size-[32px]" data-node-id="I551:889;10:356" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="I551:889;10:357">
                IR
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="I551:889;10:358" data-name="Name">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I551:889;10:359">
                Ishita Rao
              </p>
              <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I551:889;10:360">
                Creator · @ishitarao
              </p>
            </div>
            <div className="relative shrink-0 size-[14px]" data-node-id="I551:889;10:361" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon15} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start pb-[40px] pt-[28px] px-[32px] relative shrink-0 w-full" data-node-id="551:913" data-name="Content">
          <div className="content-stretch flex gap-[16px] items-end overflow-clip relative shrink-0 w-full" data-node-id="551:914" data-name="Page header">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative" data-node-id="551:915" data-name="Left">
              <Link to="/creator/my-projects?tab=live" className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] hover:text-[#3b5bff] transition whitespace-nowrap" data-node-id="551:916">
                <p className="leading-[16px] whitespace-pre">{`My projects  /  Active`}</p>
              </Link>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="551:917" data-name="Title row">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[34px] not-italic relative shrink-0 text-[28px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.14px] whitespace-nowrap" data-node-id="551:918">
                  Vitamin-C Serum
                </p>
                <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" />
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="551:922">
                Minimalist · 7 Oct – 7 Nov 2026 · fee ₹17,000
              </p>
            </div>
            <div className="content-stretch flex items-center gap-[10px] overflow-clip relative shrink-0" data-node-id="551:923" data-name="Actions">
              <Link to="/brand/messages" className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition" data-node-id="551:924" data-name="Button">
                <div className="relative shrink-0 size-[16px]" data-node-id="I551:924;5:30" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon16} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I551:924;5:33">
                  Message brand
                </p>
              </Link>
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="bg-[var(--prim-gray-900,#0d0d10)] cursor-pointer hover:bg-black/80 content-stretch flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 transition"
                data-name="Button"
              >
                <Upload className="size-4 text-white" />
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white text-left whitespace-nowrap">
                  {storyV2Uploaded ? "Story v2 Uploaded" : "Upload Story v2"}
                </p>
              </button>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full z-30" data-node-id="789:11646" data-name="Tab row">
            <div className="flex flex-[1_0_0] flex-row items-end self-stretch" data-node-id="714:2957">
              <div className="border-[#e5e7eb] border-b border-solid content-stretch flex flex-[1_0_0] gap-[28px] h-full items-start min-w-px overflow-clip relative" data-name="Tabs">
                <button type="button" onClick={() => handleTabChange("overview")} className="content-stretch cursor-pointer flex flex-col gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="714:2958" data-name="Tab · Overview">
                  <p className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[14px] whitespace-nowrap transition ${activeTab === "overview" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#0d0d10]"}`} data-node-id="714:2959">
                    Overview
                  </p>
                  <div className={`h-[2px] relative shrink-0 w-full transition ${activeTab === "overview" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="714:2960" data-name="Rectangle" />
                </button>
                <button type="button" onClick={() => handleTabChange("deliverables")} className="content-stretch cursor-pointer flex flex-col gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="714:2961" data-name="Tab · Deliverables">
                  <p className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[14px] text-left whitespace-nowrap transition ${activeTab === "deliverables" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#0d0d10]"}`} data-node-id="714:2962">
                    Deliverables
                  </p>
                  <div className={`h-[2px] relative shrink-0 w-full transition ${activeTab === "deliverables" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="714:2963" data-name="Rectangle" />
                </button>
                <button type="button" onClick={() => handleTabChange("payments")} className="content-stretch cursor-pointer flex flex-col gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="714:2964" data-name="Tab · Payments">
                  <p className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[14px] text-left whitespace-nowrap transition ${activeTab === "payments" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#0d0d10]"}`} data-node-id="714:2965">
                    Payments
                  </p>
                  <div className={`h-[2px] relative shrink-0 w-full transition ${activeTab === "payments" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="714:2966" data-name="Rectangle" />
                </button>
                <button type="button" onClick={() => handleTabChange("review")} className="content-stretch cursor-pointer flex flex-col gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="714:2967" data-name="Tab · Review">
                  <p className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[14px] text-left whitespace-nowrap transition ${activeTab === "review" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#0d0d10]"}`} data-node-id="714:2968">
                    Review
                  </p>
                  <div className={`h-[2px] relative shrink-0 w-full transition ${activeTab === "review" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="714:2969" data-name="Rectangle" />
                </button>
                <button type="button" onClick={() => handleTabChange("performance")} className="content-stretch cursor-pointer flex flex-col gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="714:2970" data-name="Tab · Performance">
                  <p className={`[word-break:break-word] leading-[normal] not-italic relative shrink-0 text-[14px] whitespace-nowrap transition ${activeTab === "performance" ? "font-['Inter:Semi_Bold'] font-semibold text-[#3b5bff]" : "font-['Inter:Medium'] font-medium text-[#8491a3] hover:text-[#0d0d10]"}`} data-node-id="714:2971">
                    Performance
                  </p>
                  <div className={`h-[2px] relative shrink-0 w-full transition ${activeTab === "performance" ? "bg-[#3b5bff]" : "bg-white opacity-0"}`} data-node-id="714:2972" data-name="Rectangle" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-[10px] shrink-0 relative z-30">
              <CreatorDeliverableFilterDropdown
                value={deliverableFilter}
                onChange={setDeliverableFilter}
              />
              <CreatorDateRangeDropdown />
            </div>
          </div>
          {activeTab === "deliverables" ? (
            <CreatorProjectDeliverablesView
              onOpenUploadModal={() => setIsUploadOpen(true)}
              storyV2Uploaded={storyV2Uploaded}
              uploadedFileName={uploadedFileName}
              productReceived={productReceived}
              onConfirmProduct={() => setProductReceived(true)}
              onCounterOfferTime={(_deliverableTitle) => setIsCounterOfferOpen(true)}
              deliverableFilter={deliverableFilter}
              onDeliverableFilterChange={setDeliverableFilter}
            />
          ) : activeTab === "payments" ? (
            <CreatorProjectPaymentsView />
          ) : activeTab === "review" ? (
            <CreatorProjectReviewView />
          ) : activeTab === "performance" ? (
            <CreatorProjectPerformanceView />
          ) : (
            <>
          <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex gap-[12px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="551:949" data-name="KPI tiles">
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[var(--radius-lg,12px)]" data-node-id="551:950" data-name="KPI tile">
              <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I551:950;104:371" data-name="Icon chip">
                <div className="relative shrink-0 size-[18px]" data-node-id="I551:950;104:372" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon17} />
                </div>
              </div>
              <div className="h-[14px] relative shrink-0 w-px" data-node-id="I551:950;104:376" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] w-[min-content]" data-node-id="I551:950;104:377">
                Sales
              </p>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[28px] min-w-full not-italic relative shrink-0 text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px] w-[min-content]" data-node-id="I551:950;104:378">
                ₹1,42,800
              </p>
              <div className="h-[10px] relative shrink-0 w-px" data-node-id="I551:950;104:379" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)] w-[min-content]" data-node-id="I551:950;104:380">
                392 orders
              </p>
            </div>
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[var(--radius-lg,12px)]" data-node-id="551:967" data-name="KPI tile">
              <div className="bg-[#3b5bff] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I551:967;104:327" data-name="Icon chip">
                <div className="relative shrink-0 size-[18px]" data-node-id="I551:967;104:328" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon18} />
                </div>
              </div>
              <div className="h-[14px] relative shrink-0 w-px" data-node-id="I551:967;104:331" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] w-[min-content]" data-node-id="I551:967;104:332">
                Views
              </p>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[28px] min-w-full not-italic relative shrink-0 text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px] w-[min-content]" data-node-id="I551:967;104:333">
                5.6 L
              </p>
              <div className="h-[10px] relative shrink-0 w-px" data-node-id="I551:967;104:334" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] w-[min-content]" data-node-id="I551:967;104:335">
                2 Reels live
              </p>
            </div>
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[var(--radius-lg,12px)]" data-node-id="551:981" data-name="KPI tile">
              <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I551:981;104:371" data-name="Icon chip">
                <div className="relative shrink-0 size-[18px]" data-node-id="I551:981;104:372" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                </div>
              </div>
              <div className="h-[14px] relative shrink-0 w-px" data-node-id="I551:981;104:376" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] w-[min-content]" data-node-id="I551:981;104:377">
                ROAS for the brand
              </p>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[28px] min-w-full not-italic relative shrink-0 text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px] w-[min-content]" data-node-id="I551:981;104:378">
                4.8×
              </p>
              <div className="h-[10px] relative shrink-0 w-px" data-node-id="I551:981;104:379" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)] w-[min-content]" data-node-id="I551:981;104:380">
                top in project
              </p>
            </div>
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[var(--radius-lg,12px)]" data-node-id="551:995" data-name="KPI tile">
              <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I551:995;104:395" data-name="Icon chip">
                <div className="relative shrink-0 size-[18px]" data-node-id="I551:995;104:396" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                </div>
              </div>
              <div className="h-[14px] relative shrink-0 w-px" data-node-id="I551:995;104:400" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] w-[min-content]" data-node-id="I551:995;104:401">
                Paid to you
              </p>
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[28px] min-w-full not-italic relative shrink-0 text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px] w-[min-content]" data-node-id="I551:995;104:402">
                ₹12,750
              </p>
              <div className="h-[10px] relative shrink-0 w-px" data-node-id="I551:995;104:403" data-name="Gap" />
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] w-[min-content]" data-node-id="I551:995;104:404">
                ₹4,250 in escrow
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="610:3316" data-name="Collaboration status">
            <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3317" data-name="Card head">
              <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px overflow-clip relative" data-node-id="610:3318" data-name="t">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[16px] whitespace-nowrap" data-node-id="610:3319">
                  Status
                </p>
                <div className="bg-[#e1fce3] content-stretch flex items-start overflow-clip px-[8px] py-[2px] relative rounded-[999px] shrink-0" data-node-id="610:3320" data-name="Live">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#149d46] text-[12px] whitespace-nowrap" data-node-id="610:3321">
                    ● Live
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="610:3322">
                Updated 2 min ago
              </p>
            </div>
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="610:3323" data-name="Steps">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="610:3324" data-name="Step · Invited">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3325" data-name="Dot row">
                  <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[20px]" data-node-id="610:3326" data-name="Dot">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="610:3327">
                      ✓
                    </p>
                  </div>
                  <div className="bg-[#149d46] flex-[1_0_0] h-[2px] min-w-px relative" data-node-id="610:3328" data-name="Line" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[12px] w-full" data-node-id="610:3329">
                  Invited
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] w-full" data-node-id="610:3330">
                  7 Oct · ₹17,000 held for you
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="610:3331" data-name="Step · Accepted">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3332" data-name="Dot row">
                  <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[20px]" data-node-id="610:3333" data-name="Dot">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="610:3334">
                      ✓
                    </p>
                  </div>
                  <div className="bg-[#149d46] flex-[1_0_0] h-[2px] min-w-px relative" data-node-id="610:3335" data-name="Line" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[12px] w-full" data-node-id="610:3336">
                  Accepted
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] w-full" data-node-id="610:3337">
                  8 Oct
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="610:3338" data-name="Step · Product sent">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3339" data-name="Dot row">
                  <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[20px]" data-node-id="610:3340" data-name="Dot">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="610:3341">
                      ✓
                    </p>
                  </div>
                  <div className="bg-[#149d46] flex-[1_0_0] h-[2px] min-w-px relative" data-node-id="610:3342" data-name="Line" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[12px] w-full" data-node-id="610:3343">
                  Product sent
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] w-full" data-node-id="610:3344">
                  9 Oct · Delhivery
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="610:3345" data-name="Step · Delivered">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3346" data-name="Dot row">
                  <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[10px] shrink-0 size-[20px]" data-node-id="610:3347" data-name="Dot">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap" data-node-id="610:3348">
                      ✓
                    </p>
                  </div>
                  <div className="bg-[#149d46] flex-[1_0_0] h-[2px] min-w-px relative" data-node-id="610:3349" data-name="Line" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[12px] w-full" data-node-id="610:3350">
                  Delivered
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] w-full" data-node-id="610:3351">
                  10 Oct · you confirmed
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="610:3352" data-name="Step · In progress">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3353" data-name="Dot row">
                  <div className="relative shrink-0 size-[20px]" data-node-id="610:3354" data-name="Dot">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot3} />
                  </div>
                  <div className="bg-[#e5e7eb] flex-[1_0_0] h-[2px] min-w-px relative" data-node-id="610:3356" data-name="Line" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[12px] w-full" data-node-id="610:3357">
                  In progress
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[11px] w-full" data-node-id="610:3358">
                  2 Reels live · Story changes asked
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="610:3359" data-name="Step · Next delivery">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3360" data-name="Dot row">
                  <div className="bg-white border-[#d4d7df] border-[1.5px] border-solid relative rounded-[10px] shrink-0 size-[20px]" data-node-id="610:3361" data-name="Dot" />
                  <div className="bg-[#e5e7eb] flex-[1_0_0] h-[2px] min-w-px relative" data-node-id="610:3362" data-name="Line" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="610:3363">
                  Next delivery
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] w-full" data-node-id="610:3364">
                  Last-day reminder Story by 30 Oct
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="610:3365" data-name="Step · Next payment">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="610:3366" data-name="Dot row">
                  <div className="bg-white border-[#d4d7df] border-[1.5px] border-solid relative rounded-[10px] shrink-0 size-[20px]" data-node-id="610:3367" data-name="Dot" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="610:3368">
                  Next payment
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[11px] w-full" data-node-id="610:3369">
                  ₹3,000 when the results Reel is approved
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="714:3053" data-name="Row">
            <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px] self-stretch" data-node-id="714:2973" data-name="Deliverable progress">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="714:2974" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="714:2975" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[16px]" data-node-id="714:2976">
                    Deliverable progress
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px]" data-node-id="714:2977">
                    Vitamin-C Serum
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full" data-node-id="714:2978" data-name="p">
                <div className="overflow-clip relative shrink-0 size-[96px]" data-node-id="714:2979" data-name="Donut">
                  <div className="absolute left-0 size-[96px] top-0" data-node-id="714:2980" data-name="Ellipse">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
                  </div>
                  <div className="absolute left-0 size-[96px] top-0" data-node-id="714:2981" data-name="Ellipse">
                    <div className="absolute inset-[0_0_0_7.47%]">
                      <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                    </div>
                  </div>
                  <div className="absolute left-0 size-[96px] top-0" data-node-id="714:2982" data-name="Ellipse">
                    <div className="absolute bottom-1/4 left-0 right-[51.08%] top-0">
                      <img alt="" className="block max-w-none size-full" src={imgEllipse2} />
                    </div>
                  </div>
                  <div className="absolute content-stretch flex flex-col items-center left-[32px] overflow-clip top-[39px]" data-node-id="714:2983" data-name="Center">
                    <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[15px] text-center whitespace-nowrap" data-node-id="714:2984">
                      75%
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="714:2985" data-name="l">
                  <div className="content-stretch flex gap-[10px] items-center overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="714:2986" data-name="Legend">
                    <div className="relative shrink-0 size-[10px]" data-node-id="714:2987" data-name="Ellipse">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
                    </div>
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#394357] text-[13px]" data-node-id="714:2988">
                      Approved · paid
                    </p>
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="714:2989">
                      2
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="714:2990" data-name="Legend">
                    <div className="relative shrink-0 size-[10px]" data-node-id="714:2991" data-name="Ellipse">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse4} />
                    </div>
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#394357] text-[13px]" data-node-id="714:2992">
                      Changes requested
                    </p>
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="714:2993">
                      1
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center overflow-clip py-[8px] relative shrink-0 w-full" data-node-id="714:2994" data-name="Legend">
                    <div className="relative shrink-0 size-[10px]" data-node-id="714:2995" data-name="Ellipse">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse5} />
                    </div>
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#394357] text-[13px]" data-node-id="714:2996">
                      Not started
                    </p>
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="714:2997">
                      0
                    </p>
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="714:2998">
                3 of 4 done
              </p>
            </div>
            <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px] self-stretch" data-node-id="714:2999" data-name="Key dates">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="714:3000" data-name="Card head">
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="714:3001" data-name="t">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[16px] whitespace-nowrap" data-node-id="714:3002">
                    Key dates
                  </p>
                </div>
              </div>
              <div className="[word-break:break-word] border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="714:3003" data-name="kv">
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[130px]" data-node-id="714:3004">
                  Project start
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="714:3005">
                  7 Oct 2026
                </p>
              </div>
              <div className="[word-break:break-word] border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="714:3006" data-name="kv">
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[130px]" data-node-id="714:3007">
                  Last-day Story due
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="714:3008">
                  30 Oct
                </p>
              </div>
              <div className="[word-break:break-word] border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="714:3009" data-name="kv">
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[130px]" data-node-id="714:3010">
                  Story goes live
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="714:3011">
                  5 Nov
                </p>
              </div>
              <div className="[word-break:break-word] border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="714:3012" data-name="kv">
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[130px]" data-node-id="714:3013">
                  Project ends
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="714:3014">
                  7 Nov 2026
                </p>
              </div>
              <div className="[word-break:break-word] border-[#edeff3] border-solid border-t content-stretch flex gap-[12px] items-center leading-[normal] not-italic overflow-clip py-[10px] relative shrink-0 text-[13px] w-full" data-node-id="714:3015" data-name="kv">
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] w-[130px]" data-node-id="714:3016">
                  Usage rights end
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium min-w-px relative text-[#070b13]" data-node-id="714:3017">
                  7 Dec 2026
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px] self-stretch" data-node-id="714:3018" data-name="Quick actions">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="714:3019" data-name="Card head">
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="714:3020" data-name="t">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#070b13] text-[16px] whitespace-nowrap" data-node-id="714:3021">
                    Quick actions
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setIsUploadOpen(true)} className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full hover:bg-[#1a1a24] transition" data-node-id="714:3022" data-name="Button">
                <div className="relative shrink-0 size-[16px]" data-node-id="I714:3022;5:6" data-name="Icon">
                  {storyV2Uploaded ? (
                    <Check size={16} className="text-[#16a34a]" />
                  ) : (
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon21} />
                  )}
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap" data-node-id="I714:3022;5:9">
                  {storyV2Uploaded ? "Story v2 submitted ✓" : "Upload Story v2"}
                </p>
              </button>
              <a href="#brief-section" className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full hover:bg-[#f4f6fb] transition" data-node-id="714:3030" data-name="Button">
                <div className="relative shrink-0 size-[16px]" data-node-id="I714:3030;5:30" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon22} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="I714:3030;5:33">
                  View brief
                </p>
              </a>
              <Link to="/brand/messages" className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full hover:bg-[#f4f6fb] transition" data-node-id="714:3039" data-name="Button">
                <div className="relative shrink-0 size-[16px]" data-node-id="I714:3039;5:30" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon16} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I714:3039;5:33">
                  Message brand
                </p>
              </Link>
              <button type="button" onClick={() => setIsCounterOfferOpen(true)} className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full hover:bg-[#f4f6fb] transition" data-node-id="714:3045" data-name="Button">
                <div className="relative shrink-0 size-[16px]" data-node-id="I714:3045;5:30" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon23} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="I714:3045;5:33">
                  Counter offer time
                </p>
              </button>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="714:3052">
                {storyV2Uploaded ? `Story v2 (${uploadedFileName}) submitted · in review by Minimalist.` : "Minimalist approves the Story to release ₹3,000 to you."}
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="551:1009" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-w-px overflow-clip relative" data-node-id="551:1010" data-name="Column">
              <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="551:1011" data-name="Deliverables">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="551:1012" data-name="Card head">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="551:1013" data-name="t">
                    <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="551:1014">
                      Deliverables
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="551:1015">
                      4 posts · fee ₹17,000
                    </p>
                  </div>
                </div>
                <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="551:1034" data-name="Table">
                  <div className="bg-[var(--bg-subtle,#f4f6fb)] content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[10px] relative shrink-0 w-full" data-node-id="551:1035" data-name="Header">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="551:1037" data-name="Cell">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[16px] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="551:1036">
                        DELIVERABLE
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[121px]" data-node-id="551:1039" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="551:1038">
                        DATES
                      </p>
                    </div>
                    <div className="content-stretch flex items-center justify-end relative shrink-0 w-[64px]" data-node-id="551:1041" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="551:1040">
                        FEE
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[100px]" data-node-id="551:1043" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="551:1042">
                        CONTENT
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[107px]" data-node-id="551:1045" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="551:1044">
                        PAYMENT
                      </p>
                    </div>
                  </div>
                  <div className="border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="551:1046" data-name="Row">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="551:1048" data-name="Cell">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="551:1047">
                        Festive GRWM · Reel
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[121px]" data-node-id="551:1050" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="551:1049">
                        Live 18 Oct
                      </p>
                    </div>
                    <div className="content-stretch flex items-center justify-end relative shrink-0 w-[64px]" data-node-id="551:1052" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1051">
                        ₹8,500
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[100px]" data-node-id="551:1053" data-name="Cell">
                      <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" />
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[107px]" data-node-id="551:1054" data-name="Cell">
                      <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Paid ₹8,500 · 19 Oct" />
                    </div>
                  </div>
                  <div className="border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="551:1055" data-name="Row">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="551:1057" data-name="Cell">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="551:1056">
                        Launch day · Story
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[121px]" data-node-id="551:1059" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="551:1058">
                        Live 20 Oct
                      </p>
                    </div>
                    <div className="content-stretch flex items-center justify-end relative shrink-0 w-[64px]" data-node-id="551:1061" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1060">
                        ₹4,250
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[100px]" data-node-id="551:1062" data-name="Cell">
                      <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" />
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[107px]" data-node-id="551:1063" data-name="Cell">
                      <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Paid ₹4,250 · 21 Oct" />
                    </div>
                  </div>
                  <div className="border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="551:1064" data-name="Row">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="551:1066" data-name="Cell">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="551:1065">
                        Results after 7 days · Reel
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[121px]" data-node-id="551:1068" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="551:1067">
                        Sent 26 Oct · waiting for approval
                      </p>
                    </div>
                    <div className="content-stretch flex items-center justify-end relative shrink-0 w-[64px]" data-node-id="551:1070" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1069">
                        ₹3,000
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[100px]" data-node-id="551:1071" data-name="Cell">
                      <div className="bg-[#ffedd5] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="551:1028" data-name="Badge">
                        <div className="relative shrink-0 size-[6px]" data-node-id="I551:1028;5:107" data-name="Dot">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#c2410c] text-[12px] whitespace-nowrap" data-node-id="I551:1028;5:108">
                          Waiting for approval
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[107px]" data-node-id="551:1072" data-name="Cell">
                      <Badge className="bg-[var(--status-info-bg,#f1f4ff)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="₹3,000 in escrow" tone="Info" />
                    </div>
                  </div>
                  <div className="border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip px-[16px] py-[12px] relative shrink-0 w-full" data-node-id="1663:36" data-name="Row">
                    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-node-id="1663:37" data-name="Cell">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1663:38">
                        Last-day reminder · Story
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[121px]" data-node-id="1663:39" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="1663:40">
                        Due 30 Oct
                      </p>
                    </div>
                    <div className="content-stretch flex items-center justify-end relative shrink-0 w-[64px]" data-node-id="1663:41" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="1663:42">
                        ₹1,250
                      </p>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[100px]" data-node-id="1663:43" data-name="Cell">
                      <div className="bg-[#edeff3] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="1663:44" data-name="Badge">
                        <div className="relative shrink-0 size-[6px]" data-node-id="I1663:44;5:107" data-name="Dot">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[#394357] text-[12px] whitespace-nowrap" data-node-id="I1663:44;5:108">
                          Not started
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center relative shrink-0 w-[107px]" data-node-id="1663:45" data-name="Cell">
                      <Badge className="bg-[var(--status-info-bg,#f1f4ff)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="₹1,250 in escrow" tone="Info" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="600:2860" data-name="Products for your deliverables">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="600:2861" data-name="Card head">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[16px]" data-node-id="600:2862">
                    Products for your deliverables
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[12px]" data-node-id="600:2863">
                    Posting time for a deliverable starts when its product arrives
                  </p>
                </div>
                <div className="border border-[#e5e7eb] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="600:2864" data-name="List">
                  <div className="content-stretch flex flex-col items-start overflow-clip px-[14px] py-[12px] relative shrink-0 w-full" data-node-id="600:2865" data-name="Row 1">
                    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="600:2866" data-name="r">
                      <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-[190px] whitespace-nowrap" data-node-id="600:2867" data-name="Deliverable">
                        <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px]" data-node-id="600:2868">
                          Festive GRWM · Reel
                        </p>
                        <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#394357] text-[12px]" data-node-id="600:2869">
                          Vitamin-C Serum × 1
                        </p>
                      </div>
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="600:2870">
                        Delhivery · delivered 11 Oct · you confirmed
                      </p>
                      <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Received" />
                    </div>
                  </div>
                  <div className="border-[#edeff3] border-solid border-t content-stretch flex flex-col items-start overflow-clip px-[14px] py-[12px] relative shrink-0 w-full" data-node-id="600:2873" data-name="Row 2">
                    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="600:2874" data-name="r">
                      <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-[190px] whitespace-nowrap" data-node-id="600:2875" data-name="Deliverable">
                        <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px]" data-node-id="600:2876">
                          Launch day · Story
                        </p>
                        <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#394357] text-[12px]" data-node-id="600:2877">
                          Vitamin-C Serum · launch kit × 1
                        </p>
                      </div>
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="600:2878">
                        Blue Dart · delivered 18 Oct · you confirmed
                      </p>
                      <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Received" />
                    </div>
                  </div>
                  <div className="bg-[#fffaf0] border-[#edeff3] border-solid border-t content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[14px] py-[12px] relative shrink-0 w-full" data-node-id="600:2881" data-name="Row 3">
                    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="600:2882" data-name="r">
                      <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-[190px] whitespace-nowrap" data-node-id="600:2883" data-name="Deliverable">
                        <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#070b13] text-[13px]" data-node-id="600:2884">
                          Results after 7 days · Reel
                        </p>
                        <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#394357] text-[12px]" data-node-id="600:2885">
                          Vitamin-C Serum · refill × 1
                        </p>
                      </div>
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[normal] min-w-px not-italic relative text-[#8491a3] text-[12px]" data-node-id="600:2886">
                        {productReceived ? "Delhivery delivered 26 Oct · you confirmed" : "Delhivery marked it delivered 26 Oct, 11:40"}
                      </p>
                      <Badge className={`content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0 ${productReceived ? "bg-[var(--status-success-bg,#e1fce3)]" : "bg-[var(--status-warning-bg,#feefce)]"}`} label={productReceived ? "Received" : "Confirm"} tone={productReceived ? "Success" : "Warning"} />
                    </div>
                    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-full" data-node-id="600:2889" data-name="Actions">
                      {!productReceived ? (
                        <button type="button" onClick={() => setProductReceived(true)} className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#1a1a24] transition" data-node-id="600:2890" data-name="Button">
                          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-on-primary,white)] whitespace-nowrap" data-node-id="I600:2890;5:21">
                            Yes, I received it
                          </p>
                        </button>
                      ) : (
                        <div className="bg-[#e1fce3] text-[#16a34a] font-['Inter:Medium'] text-[12px] px-[10px] py-[4px] rounded-[6px]">
                          ✓ Confirmed by you
                        </div>
                      )}
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[13px] whitespace-nowrap" data-node-id="600:2895">
                        Report a problem
                      </p>
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#3b5bff] text-[13px] whitespace-nowrap" data-node-id="600:2896">
                        Track ↗
                      </p>
                      <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="600:2897" data-name="Frame" />
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#f29b07] text-[12px] whitespace-nowrap" data-node-id="600:2898">
                        Auto-confirms today at 11:40 if you don’t
                      </p>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap" data-node-id="600:2899">
                  Your address goes only to Minimalist. Wrong item or damaged? Report it and the deadline pauses.
                </p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-[360px]" data-node-id="551:1100" data-name="Column">
              <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="551:1101" data-name="Your link and code">
                <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="551:1102" data-name="Card head">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="551:1103" data-name="t">
                    <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="551:1104">
                      Your link and code
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="551:1105">
                      Use these in every post
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="551:1106" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="551:1107">
                    Code
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1108">
                    ISHITA15 · 15% off
                  </p>
                </div>
                <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="551:1109" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="551:1110">
                    Link
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1111">
                    flw.to/ishita-vcs
                  </p>
                </div>
                <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="551:1112" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="551:1113">
                    Orders from code
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1114">
                    236
                  </p>
                </div>
                <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="551:1115" data-name="kv">
                  <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="551:1116">
                    Orders from link
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1117">
                    156
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="551:1118" data-name="b">
                  <button type="button" onClick={handleCopyCode} className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition" data-node-id="551:1119" data-name="Button">
                    <div className="relative shrink-0 size-[16px]" data-node-id="I551:1119;5:42" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon24} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="I551:1119;5:45">
                      {copiedCode ? "Copied!" : "Copy code"}
                    </p>
                  </button>
                  <button type="button" onClick={handleCopyLink} className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f4f6fb] transition" data-node-id="551:1126" data-name="Button">
                    <div className="relative shrink-0 size-[16px]" data-node-id="I551:1126;5:42" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon25} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="I551:1126;5:45">
                      {copiedLink ? "Copied!" : "Copy link"}
                    </p>
                  </button>
                </div>
              </div>
              <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[6px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="551:1157" id="brief-section" data-name="Brief">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="551:1158" data-name="Card head">
                  <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="551:1159" data-name="t">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[24px] not-italic relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1160">
                      Brief
                    </p>
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-link,#3b5bff)] whitespace-nowrap" data-node-id="551:1161">
                    Open brief
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] w-full" data-node-id="551:1162">
                  Show the Diwali Glow kit in your festive routine. Mention 15% off with your code. Post by the dates above.
                </p>
              </div>
              <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="551:1073" data-name="Latest from Minimalist">
                <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="551:1074" data-name="Card head">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="551:1075" data-name="t">
                    <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="551:1076">
                      Latest from Minimalist
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="551:1077">
                      Messages
                    </p>
                  </div>
                  <a className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[12px] text-[color:var(--text-link,#3b5bff)]" data-node-id="551:1078">
                    <p className="leading-[16px]">Open messages</p>
                  </a>
                </div>
                <div className="border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip py-[12px] relative shrink-0 w-full" data-node-id="551:1086" data-name="r">
                  <div className="bg-[var(--primary-subtle,#f1f4ff)] content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[36px]" data-node-id="551:1087" data-name="i">
                    <div className="relative shrink-0 size-[16px]" data-node-id="551:1088" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon26} />
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative" data-node-id="551:1090" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1091">
                      Ananya Mehta · 2 h ago
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] min-w-full relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] w-[min-content]" data-node-id="551:1092">
                      “Can you add the coupon on screen in the Story? Rest looks great.”
                    </p>
                  </div>
                  <a className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="551:1079" data-name="Button">
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I551:1079;5:45">
                      Reply
                    </p>
                  </a>
                </div>
                <div className="border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip py-[12px] relative shrink-0 w-full" data-node-id="551:1093" data-name="r">
                  <div className="bg-[var(--primary-subtle,#f1f4ff)] content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[36px]" data-node-id="551:1094" data-name="i">
                    <div className="relative shrink-0 size-[16px]" data-node-id="551:1095" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon27} />
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative" data-node-id="551:1097" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="551:1098">
                      Launch day Story approved · 21 Oct
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] min-w-full relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] w-[min-content]" data-node-id="551:1099">
                      ₹4,250 sent to your bank on 21 Oct
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          )}
        </div>
      </div>

      {/* Counter Offer Modal */}
      <CounterOfferModal
        isOpen={isCounterOfferOpen}
        onClose={() => setIsCounterOfferOpen(false)}
        projectTitle="Vitamin-C Serum"
        brandName="Minimalist"
        currentFee="₹17,000"
        onOfferSent={(offer) => {
          setIsCounterOfferOpen(false);
          alert(`Counter offer sent: ${offer.customFee ? "₹" + offer.customFee : "Custom scope"}!`);
        }}
      />

      {/* Upload Deliverable Modal (Figma node 716:3499 empty, 716:3863 file added) */}
      <CreatorUploadDeliverableModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        initialDeliverableId={3}
        onSubmit={({ fileName }) => {
          setStoryV2Uploaded(true);
          setUploadedFileName(fileName);
          setIsUploadOpen(false);
        }}
      />
    </div>
  );
}

export default CreatorLiveProjectDetailPage;
