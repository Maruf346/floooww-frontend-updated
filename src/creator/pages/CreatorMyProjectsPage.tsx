import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, ChevronDown, MoreHorizontal } from "lucide-react";
import { creatorProjectRoute, ROUTES } from "@/common/constants/routes";
import { DateRangePicker } from "@/common/components/ui/DateRangePicker";
import CounterOfferModal from "../components/CounterOfferModal";

const imgDot = "https://www.figma.com/api/mcp/asset/706044f8-326b-4296-a42a-4ef2b9472939.svg";
const imgDot1 = "https://www.figma.com/api/mcp/asset/82a1147f-8e3e-42c3-a2cd-4dd1e0c71695.svg";
const imgTrailingIcon = "https://www.figma.com/api/mcp/asset/18c379cc-f937-40e1-a667-feaf6a31d188.svg";
const imgIcon = "https://www.figma.com/api/mcp/asset/aa6d5243-0c9b-4a6a-bd1b-ce32367db68e.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/2adb9f1f-773c-4f4b-94be-53b735cbc647.svg";
const imgKreyioWordmark = "https://www.figma.com/api/mcp/asset/c5138e3d-6adb-40e3-9423-994689d2201a.svg";
const imgRectangle = "https://www.figma.com/api/mcp/asset/adb20203-be06-4215-b0ae-a75f41407323.png";
const imgRectangle1 = "https://www.figma.com/api/mcp/asset/700ce7e7-f629-4b58-bd47-ecac2f6a8bac.png";
const imgRectangle2 = "https://www.figma.com/api/mcp/asset/6a53bae9-ca8a-4208-8acf-d4b729fc53fb.png";
const imgRectangle3 = "https://www.figma.com/api/mcp/asset/fbfc6b62-61a9-4c4e-9933-bec224755388.png";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/fa1a5135-baac-4e96-80e6-aac7add909ee.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/d3a8bb87-4e2a-4bde-bb06-3d1f35898aa3.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/fd7db476-8c21-4a58-9f1a-629770801ca3.svg";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/b0a82a10-7b9c-48ac-ba9b-04c3596fb440.svg";
const imgChevron = "https://www.figma.com/api/mcp/asset/43c95adb-bc34-41bf-a46d-ca0ed58ca5cd.svg";
const imgBullet = "https://www.figma.com/api/mcp/asset/f13e1f85-299b-4e49-951b-ffaf1aafda78.svg";
const imgBullet1 = "https://www.figma.com/api/mcp/asset/78d9df7c-435e-4fe6-8771-839a87fdf29e.svg";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/ecc202a4-f67c-4154-be09-cd247c60b500.svg";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/523c85a6-fc5a-44c1-96cf-d5361d32456c.svg";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/b1471c87-7369-4c5c-81dd-eada82e35724.svg";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/99f6523c-e157-4a9a-bab1-a7a2fe214ddc.svg";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/fbd50d59-ac26-43fb-8490-78f9301e4e6b.svg";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/a14599b5-f503-4494-8522-e1ff2d959375.svg";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/63cc65e0-6030-40f7-b2fa-718f4d36d43e.svg";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/101ba438-6ec0-487c-9021-cb9d77ddce5a.svg";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/0c313fd0-0a89-438b-bb8d-a8e31646b427.svg";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/5a010beb-1bed-4f71-94ce-5d3769490e94.svg";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/a2aecc10-cddb-40a3-80cc-fee88c9591ef.svg";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/1292af70-8a09-41ae-8eb3-6ed7878342db.svg";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/fe70dad6-b3cb-439d-bb08-85e22b15bca0.svg";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/7eccb93f-e6e6-4cda-b4f8-b16b8004ddff.svg";
const imgIcon20 = "https://www.figma.com/api/mcp/asset/4b35d801-8990-4ac2-982c-88ee5df57ea3.svg";
const imgIconSearch = "https://www.figma.com/api/mcp/asset/6382e7a5-4e91-4df4-9366-35195b98ab63.svg";
const imgPlatformLogo = "https://www.figma.com/api/mcp/asset/89f4dbf5-095f-4e31-9092-45ebe27e3f89.svg";
const imgIcon21 = "https://www.figma.com/api/mcp/asset/696f425d-358a-4083-9ee0-6a8b2dc934c0.svg";
const imgDot2 = "https://www.figma.com/api/mcp/asset/4bd7f02e-ccff-4aed-97e1-b24d790d4ab9.svg";
const imgIcon22 = "https://www.figma.com/api/mcp/asset/a5520739-0017-4709-a668-4605c1b1fce6.svg";
const imgIcon23 = "https://www.figma.com/api/mcp/asset/032d3f22-ee99-4de8-bbcf-c72da46bb62b.svg";
const imgIcon24 = "https://www.figma.com/api/mcp/asset/b0aafd01-3198-4d80-aa87-f5b82bec9c21.svg";

// Assets for Applied tab
const imgRectangleApplied0 = "https://www.figma.com/api/mcp/asset/a30cba33-e15f-493c-90bf-b5595dd01cc2.png";
const imgRectangleApplied1 = "https://www.figma.com/api/mcp/asset/c358d3f9-98f3-4ddd-a43e-809bc6c17cff.png";
const imgRectangleApplied2 = "https://www.figma.com/api/mcp/asset/32e4973d-ebac-4193-9625-885e96c48c8b.png";
const imgIcon17Applied = "https://www.figma.com/api/mcp/asset/2d97a2a3-5c5a-4528-8dff-42f0b9160a41.svg";
const imgIcon18Applied = "https://www.figma.com/api/mcp/asset/9d4d95fc-c15f-4843-82bc-54c6de8545b5.svg";
const imgIcon19Applied = "https://www.figma.com/api/mcp/asset/9d049cfb-e958-4df2-9c40-2fee5debb1d6.svg";
const imgIcon20Applied = "https://www.figma.com/api/mcp/asset/ac1488f0-f2fc-48bd-89c5-2c426cc18b86.svg";

// Assets for Live tab
const imgRectangleLive0 = "https://www.figma.com/api/mcp/asset/e82e94c0-5808-4bd5-9a2b-0d493a956ad9.png";
const imgRectangleLive1 = "https://www.figma.com/api/mcp/asset/a55b5ab7-f6eb-497f-885d-a762347efc5e.png";
const imgIcon17Live = "https://www.figma.com/api/mcp/asset/335273c6-46c7-4113-948f-5bb48d3c0a7e.svg";
const imgIcon18Live = "https://www.figma.com/api/mcp/asset/bebd8619-e8c4-41e6-a118-abff620140df.svg";
const imgIconWalletLive = "https://www.figma.com/api/mcp/asset/cb8241a2-92d1-4a4d-a759-cac0a0058abb.svg";
const imgIcon19Live = "https://www.figma.com/api/mcp/asset/d7c142c3-4333-4f2a-8745-702a2ad8eff8.svg";
const imgIcon20Live = "https://www.figma.com/api/mcp/asset/9a33ee05-8aa0-4b72-85d2-0e749f675970.svg";

type BadgeTone = "Warning" | "Info" | "Neutral" | "Success";

type BadgeProps = {
  className?: string;
  label?: string;
  showDot?: boolean;
  tone?: BadgeTone;
};

function Badge({ className, label = "Live", showDot = true, tone = "Warning" }: BadgeProps) {
  const isInfo = tone === "Info";
  const isWarning = tone === "Warning";
  const isNeutral = tone === "Neutral";
  const isSuccess = tone === "Success";

  let bgClass = "bg-[var(--status-warning-bg,#feefce)]";
  let textClass = "text-[color:var(--status-warning-fg,#f59e0b)]";
  let dotSrc = imgDot;

  if (isInfo) {
    bgClass = "bg-[var(--status-info-bg,#f1f4ff)]";
    textClass = "text-[color:var(--status-info-fg,#3b5bff)]";
    dotSrc = imgDot1;
  } else if (isNeutral) {
    bgClass = "bg-[var(--status-neutral-bg,#f4f6fb)]";
    textClass = "text-[color:var(--status-neutral-fg,#4a4a55)]";
    dotSrc = imgDot2;
  } else if (isSuccess) {
    bgClass = "bg-[#e1fce3]";
    textClass = "text-[#16a34a]";
    dotSrc = imgDot;
  }

  return (
    <div
      className={
        className ||
        `content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] ${bgClass}`
      }
    >
      {showDot && (
        <div className="relative shrink-0 size-[6px]" data-name="Dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={dotSrc} />
        </div>
      )}
      <p className={`[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] ${textClass} whitespace-nowrap`}>
        {label}
      </p>
    </div>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex items-center overflow-clip relative rounded-[8px]"} data-node-id="9:3">
      <div className="h-[36px] relative shrink-0 w-[99.09px]" data-node-id="2193:2483" data-name="Kreyio wordmark">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgKreyioWordmark} />
      </div>
    </div>
  );
}

// Filter dropdown mirroring Brand All Projects
function FilterDropdown({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSelected = value !== "All";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`content-stretch flex gap-[6px] items-center overflow-clip px-[12px] py-[6px] relative rounded-[var(--radius-full,999px)] border transition cursor-pointer ${isSelected
            ? "bg-[#eff4ff] border-[#3b5bff] text-[#3b5bff] font-semibold"
            : "bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] text-[color:var(--text-primary,#0d0d10)] hover:bg-[#f9fafb]"
          }`}
      >
        <span className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic text-[12px] whitespace-nowrap">
          {isSelected ? `${label}: ${value}` : label}
        </span>
        <div className="relative shrink-0 size-[14px]">
          <img
            alt=""
            className={`block size-full transition-transform ${open ? "rotate-180" : ""}`}
            src={imgTrailingIcon}
          />
        </div>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-30 min-w-[170px] rounded-[10px] border border-[#e5e7eb] bg-white p-[6px] shadow-[0px_10px_24px_rgba(0,0,0,0.08)]">
          {["All", ...values].map((opt) => {
            const active = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-[6px] px-[12px] py-[7px] text-left text-[13px] transition cursor-pointer ${active
                    ? "bg-[#eff4ff] font-medium text-[#0d0d10]"
                    : "text-[#374151] hover:bg-[#f9fafb]"
                  }`}
              >
                <span>{opt}</span>
                {active && <Check size={15} className="text-[#0d0d10]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

type TabKey = "invitations" | "applied" | "live" | "completed" | "declined";

type ProjectRowData = {
  id: string;
  name: string;
  brand: string;
  type: "Influencer" | "UGC";
  partnership: "Paid" | "Gift exchange";
  duration: "One-time" | "Long-term";
  platform: "Instagram" | "YouTube" | "Pinterest" | "Snapchat";
  status: string;
  badgeTone: BadgeTone;
  posts: number | string;
  match: number | string;
  fee: string;
  feeNote: string;
  replyBy: string;
  replyNote: string;
  replyNoteRed?: boolean;
  received: string;
  image: string;
  tab: TabKey;
  progressPercent?: number;
};

const ALL_PROJECTS: ProjectRowData[] = [
  // Invitations & offers (4)
  {
    id: "matte-lip-launch",
    name: "Matte Lip Launch",
    brand: "Velvet Lip Co.",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "New offer",
    badgeTone: "Info",
    posts: 2,
    match: 91,
    fee: "₹15,000",
    feeNote: "you get ₹13,230",
    replyBy: "2 Nov",
    replyNote: "5 days left",
    replyNoteRed: true,
    received: "26 Oct",
    image: imgRectangle,
    tab: "invitations",
  },
  {
    id: "monsoon-sunscreen",
    name: "Monsoon Sunscreen",
    brand: "Minimalist",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "New offer",
    badgeTone: "Info",
    posts: 3,
    match: 96,
    fee: "₹18,000",
    feeNote: "in Minimalist’s range",
    replyBy: "2 Nov",
    replyNote: "5 days left",
    replyNoteRed: true,
    received: "27 Oct",
    image: imgRectangle1,
    tab: "invitations",
  },
  {
    id: "night-repair",
    name: "Night Repair Range",
    brand: "Dewdrop Naturals",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Asked more",
    badgeTone: "Warning",
    posts: 2,
    match: 88,
    fee: "₹9,000 + kit",
    feeNote: "offer was ₹6,000",
    replyBy: "5 Nov",
    replyNote: "Shortlisted by Minimalist",
    received: "25 Oct",
    image: imgRectangle2,
    tab: "invitations",
  },
  {
    id: "winter-lip-care",
    name: "Winter Lip Care",
    brand: "Minimalist",
    type: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    platform: "Instagram",
    status: "Gift offer",
    badgeTone: "Neutral",
    posts: 2,
    match: 82,
    fee: "Gift exchange",
    feeNote: "kit worth ₹1,450",
    replyBy: "20 Nov",
    replyNote: "23 days left",
    received: "24 Oct",
    image: imgRectangle3,
    tab: "invitations",
  },

  // Applied (3)
  {
    id: "clean-beauty-collective",
    name: "Clean Beauty Collective",
    brand: "Petal & Pine",
    type: "Influencer",
    partnership: "Paid",
    duration: "Long-term",
    platform: "Instagram",
    status: "Shortlisted",
    badgeTone: "Success",
    posts: "6/mo",
    match: 86,
    fee: "₹20,000 / mo",
    feeNote: "in range",
    replyBy: "by 15 Nov",
    replyNote: "brand is reviewing",
    received: "29 Oct",
    image: imgRectangleApplied0,
    tab: "applied",
  },
  {
    id: "festive-haircare-tutorials",
    name: "Festive Haircare Tutorials",
    brand: "Strand Studio",
    type: "UGC",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "In review",
    badgeTone: "Info",
    posts: 3,
    match: 84,
    fee: "₹8,000 / video",
    feeNote: "in range",
    replyBy: "by 8 Nov",
    replyNote: "opened your profile",
    received: "28 Oct",
    image: imgRectangleApplied1,
    tab: "applied",
  },
  {
    id: "hydration-bundle",
    name: "Hydration Bundle",
    brand: "Minimalist",
    type: "Influencer",
    partnership: "Gift exchange",
    duration: "One-time",
    platform: "Instagram",
    status: "Applied",
    badgeTone: "Neutral",
    posts: 2,
    match: 77,
    fee: "Gift exchange",
    feeNote: "kit worth ₹6,500",
    replyBy: "by 4 Nov",
    replyNote: "not opened yet",
    received: "27 Oct",
    image: imgRectangleApplied2,
    tab: "applied",
  },

  // Live (2)
  {
    id: "vitamin-c-serum-live",
    name: "Vitamin-C Serum",
    brand: "Minimalist",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "On track",
    badgeTone: "Success",
    posts: "3 of 4",
    match: 2,
    fee: "₹17,000",
    feeNote: "₹4,250 in escrow",
    progressPercent: 75,
    replyBy: "75%",
    replyNote: "2 of 4 approved · 1 waiting",
    received: "Last-day Story · 30 Oct",
    image: imgRectangleLive0,
    tab: "live",
  },
  {
    id: "glow-squad-live",
    name: "Glow Squad",
    brand: "Minimalist",
    type: "Influencer",
    partnership: "Paid",
    duration: "Long-term",
    platform: "Instagram",
    status: "On track",
    badgeTone: "Success",
    posts: "1 of 6",
    match: 3,
    fee: "₹27,000 / mo",
    feeNote: "cycle 2 from 2 Nov",
    progressPercent: 17,
    replyBy: "17%",
    replyNote: "cycle 1 approved",
    received: "Payout ₹27,000 · 2 Nov",
    image: imgRectangleLive1,
    tab: "live",
  },

  // Completed (7)
  {
    id: "summer-hydration",
    name: "Summer Hydration Routine",
    brand: "Minimalist",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Completed",
    badgeTone: "Success",
    posts: 3,
    match: 95,
    fee: "₹18,000",
    feeNote: "Paid to bank",
    replyBy: "28 Sep",
    replyNote: "Closed successfully",
    received: "1 Sep",
    image: imgRectangle1,
    tab: "completed",
  },
  {
    id: "autumn-lip",
    name: "Autumn Lip Stain",
    brand: "Velvet Lip Co.",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Completed",
    badgeTone: "Success",
    posts: 2,
    match: 90,
    fee: "₹14,000",
    feeNote: "Paid to bank",
    replyBy: "15 Sep",
    replyNote: "Closed successfully",
    received: "20 Aug",
    image: imgRectangle,
    tab: "completed",
  },
  {
    id: "hair-mask",
    name: "Festive Styling Reel",
    brand: "Strand Studio",
    type: "UGC",
    partnership: "Paid",
    duration: "One-time",
    platform: "YouTube",
    status: "Completed",
    badgeTone: "Success",
    posts: 1,
    match: 85,
    fee: "₹10,000",
    feeNote: "Paid to bank",
    replyBy: "1 Sep",
    replyNote: "Closed successfully",
    received: "10 Aug",
    image: "/assets/creator/projects/festive-haircare-tutorials.png",
    tab: "completed",
  },
  {
    id: "dew-routine",
    name: "Morning Dew Routine",
    brand: "Dewdrop Naturals",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Completed",
    badgeTone: "Success",
    posts: 2,
    match: 88,
    fee: "₹12,000",
    feeNote: "Paid to bank",
    replyBy: "20 Aug",
    replyNote: "Closed successfully",
    received: "25 Jul",
    image: imgRectangle2,
    tab: "completed",
  },
  {
    id: "spf-mist",
    name: "SPF Daily Protection",
    brand: "Minimalist",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Completed",
    badgeTone: "Success",
    posts: 2,
    match: 92,
    fee: "₹15,000",
    feeNote: "Paid to bank",
    replyBy: "22 Jul",
    replyNote: "Closed successfully",
    received: "2 Jul",
    image: imgRectangle1,
    tab: "completed",
  },
  {
    id: "tint-launch",
    name: "Hydra Dew Tint",
    brand: "Velvet Lip Co.",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Completed",
    badgeTone: "Success",
    posts: 2,
    match: 89,
    fee: "₹12,000",
    feeNote: "Paid to bank",
    replyBy: "8 Jul",
    replyNote: "Closed successfully",
    received: "15 Jun",
    image: imgRectangle,
    tab: "completed",
  },
  {
    id: "clay-glow",
    name: "Pure Clay Mask",
    brand: "Petal & Pine",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Completed",
    badgeTone: "Success",
    posts: 1,
    match: 83,
    fee: "₹8,000",
    feeNote: "Paid to bank",
    replyBy: "18 Jun",
    replyNote: "Closed successfully",
    received: "1 Jun",
    image: "/assets/creator/projects/clean-beauty-ambassadors.png",
    tab: "completed",
  },

  // Declined (3)
  {
    id: "chemical-peel",
    name: "Chemical Peel Launch",
    brand: "Acid Glow",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Instagram",
    status: "Declined",
    badgeTone: "Warning",
    posts: 1,
    match: 62,
    fee: "₹6,000",
    feeNote: "fee too low",
    replyBy: "22 Oct",
    replyNote: "Declined by you",
    received: "20 Oct",
    image: imgRectangle,
    tab: "declined",
  },
  {
    id: "hair-growth-oil",
    name: "Hair Growth Oil",
    brand: "Root Revival",
    type: "UGC",
    partnership: "Gift exchange",
    duration: "One-time",
    platform: "Instagram",
    status: "Declined",
    badgeTone: "Warning",
    posts: 2,
    match: 58,
    fee: "Gift exchange",
    feeNote: "product only",
    replyBy: "18 Oct",
    replyNote: "Declined by you",
    received: "16 Oct",
    image: imgRectangle2,
    tab: "declined",
  },
  {
    id: "quick-lash",
    name: "Quick Lash Kit",
    brand: "Blink Beauty",
    type: "Influencer",
    partnership: "Paid",
    duration: "One-time",
    platform: "Snapchat",
    status: "Declined",
    badgeTone: "Warning",
    posts: 1,
    match: 54,
    fee: "₹5,000",
    feeNote: "outside niche",
    replyBy: "10 Oct",
    replyNote: "Declined by you",
    received: "8 Oct",
    image: imgRectangle3,
    tab: "declined",
  },
];

export function CreatorMyProjectsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state
  const rawTab = (searchParams.get("tab") || "invitations").toLowerCase();
  const activeTab: TabKey =
    rawTab === "applied"
      ? "applied"
      : rawTab === "live" || rawTab === "active"
        ? "live"
        : rawTab === "completed"
          ? "completed"
          : rawTab === "declined"
            ? "declined"
            : "invitations";

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [partnershipFilter, setPartnershipFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [feeFilter, setFeeFilter] = useState("All");
  const [dateRange, setDateRange] = useState("1 Oct – 28 Oct 2026");

  // Counter offer and row actions
  const [openActionRowId, setOpenActionRowId] = useState<string | null>(null);
  const [counterOfferTargetRow, setCounterOfferTargetRow] = useState<ProjectRowData | null>(null);

  useEffect(() => {
    function handleClickOutside() {
      setOpenActionRowId(null);
    }
    if (openActionRowId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openActionRowId]);

  const setTab = (tab: TabKey) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", tab);
      return next;
    });
  };

  // Filtered rows
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      if (p.tab !== activeTab) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.status.toLowerCase().includes(query);
        if (!matches) return false;
      }

      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (partnershipFilter !== "All" && p.partnership !== partnershipFilter) return false;
      if (durationFilter !== "All" && p.duration !== durationFilter) return false;
      if (platformFilter !== "All" && p.platform !== platformFilter) return false;

      if (feeFilter !== "All") {
        if (feeFilter === "Gift only" && p.partnership !== "Gift exchange") return false;
        if (feeFilter === "Under ₹10,000") {
          const num = parseInt(p.fee.replace(/[^0-9]/g, ""), 10) || 0;
          if (num > 10000 || p.partnership === "Gift exchange") return false;
        }
        if (feeFilter === "₹10,000–₹20,000") {
          const num = parseInt(p.fee.replace(/[^0-9]/g, ""), 10) || 0;
          if (num < 10000 || num > 20000) return false;
        }
        if (feeFilter === "Over ₹20,000") {
          const num = parseInt(p.fee.replace(/[^0-9]/g, ""), 10) || 0;
          if (num < 20000) return false;
        }
      }

      return true;
    });
  }, [
    activeTab,
    searchQuery,
    typeFilter,
    partnershipFilter,
    durationFilter,
    platformFilter,
    feeFilter,
  ]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      invitations: ALL_PROJECTS.filter((p) => p.tab === "invitations").length,
      applied: ALL_PROJECTS.filter((p) => p.tab === "applied").length,
      live: ALL_PROJECTS.filter((p) => p.tab === "live").length,
      completed: ALL_PROJECTS.filter((p) => p.tab === "completed").length,
      declined: ALL_PROJECTS.filter((p) => p.tab === "declined").length,
    };
  }, []);

  // Dynamic KPI Tiles according to active tab
  const kpiTiles = useMemo(() => {
    switch (activeTab) {
      case "applied":
        return [
          {
            title: "Applications",
            value: "3",
            sub: "1 shortlisted",
            bg: "bg-[#3b5bff]",
            icon: imgIcon17Applied,
          },
          {
            title: "Shortlisted",
            value: "1",
            sub: "Clean Beauty Collective",
            bg: "bg-[#149d46]",
            icon: imgIcon18Applied,
          },
          {
            title: "Brand reply time",
            value: "2 days",
            sub: "average for these brands",
            bg: "bg-[var(--primary-default,#0d0d10)]",
            icon: imgIcon19Applied,
          },
          {
            title: "Success rate",
            value: "62%",
            sub: "8 of 13 applications this year",
            bg: "bg-[var(--bg-inverse,#0d0d10)]",
            icon: imgIcon20Applied,
          },
        ];
      case "live":
        return [
          {
            title: "Live projects",
            value: "2",
            sub: "1 ends 7 Nov",
            bg: "bg-[#3b5bff]",
            icon: imgIcon17Live,
          },
          {
            title: "In escrow",
            value: "₹3,000",
            sub: "Vitamin-C Serum · Story",
            bg: "bg-[var(--bg-inverse,#0d0d10)]",
            icon: imgIcon18Live,
          },
          {
            title: "Next payout",
            value: "₹12,750",
            sub: "2 Nov · HDFC ···· 4821",
            bg: "bg-[var(--status-success-fg,#16a34a)]",
            icon: imgIconWalletLive,
          },
          {
            title: "On-time score",
            value: "98%",
            sub: "90%+ unlocks gift projects",
            bg: "bg-[var(--status-success-fg,#16a34a)]",
            icon: imgIcon19Live,
          },
        ];
      case "completed":
        return [
          {
            title: "Completed projects",
            value: "7",
            sub: "all approved",
            bg: "bg-[#3b5bff]",
            icon: imgIcon17,
          },
          {
            title: "Total earnings",
            value: "₹89,000",
            sub: "100% paid to bank",
            bg: "bg-[var(--bg-inverse,#0d0d10)]",
            icon: imgIcon18,
          },
          {
            title: "Brand rating",
            value: "4.9 / 5",
            sub: "7 positive reviews",
            bg: "bg-[var(--status-success-fg,#16a34a)]",
            icon: imgIcon19,
          },
          {
            title: "Repeat collaborations",
            value: "4 brands",
            sub: "worked together 2+ times",
            bg: "bg-[#3b5bff]",
            icon: imgIcon20,
          },
        ];
      case "declined":
        return [
          {
            title: "Declined offers",
            value: "3",
            sub: "in last 30 days",
            bg: "bg-[#3b5bff]",
            icon: imgIcon17,
          },
          {
            title: "Declined value",
            value: "₹11,000",
            sub: "below minimum floor",
            bg: "bg-[var(--bg-inverse,#0d0d10)]",
            icon: imgIcon18,
          },
          {
            title: "Primary reason",
            value: "Fee rate",
            sub: "counter offers preferred",
            bg: "bg-[var(--status-success-fg,#16a34a)]",
            icon: imgIcon19,
          },
          {
            title: "Profile standing",
            value: "Good",
            sub: "0% penalty for declines",
            bg: "bg-[#3b5bff]",
            icon: imgIcon20,
          },
        ];
      case "invitations":
      default:
        return [
          {
            title: "Offers waiting",
            value: "4",
            sub: "2 expire this week",
            bg: "bg-[#3b5bff]",
            icon: imgIcon17,
          },
          {
            title: "Offer value",
            value: "₹39,000",
            sub: "+ product kits worth ₹3,850",
            bg: "bg-[var(--bg-inverse,#0d0d10)]",
            icon: imgIcon18,
          },
          {
            title: "Average match",
            value: "89%",
            sub: "across 4 offers",
            bg: "bg-[var(--status-success-fg,#16a34a)]",
            icon: imgIcon19,
          },
          {
            title: "Your reply time",
            value: "3 h",
            sub: "brands see this on your profile",
            bg: "bg-[#3b5bff]",
            icon: imgIcon20,
          },
        ];
    }
  }, [activeTab]);

  return (
    <div className="bg-[var(--bg-page,white)] content-stretch flex items-start relative size-full min-h-screen" data-name="Creator · My projects">
      {/* Sidebar */}
      <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-r border-solid content-stretch flex flex-col gap-[2px] h-full items-start overflow-clip pb-[16px] pt-[20px] px-[16px] relative shrink-0 w-[260px] min-h-screen" data-name="Sidebar / Creator">
        <Logo className="content-stretch flex items-center overflow-clip relative rounded-[9.778px] shrink-0" />
        <div className="h-[16px] relative shrink-0 w-[10px]" data-name="gap" />

        {/* Workspace switcher */}
        <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[10px] items-center overflow-clip p-[10px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[228px]" data-name="Workspace switcher">
          <div className="bg-[var(--primary-default,#0d0d10)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[32px]" data-name="Initials">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-on-primary,white)] whitespace-nowrap">
              IR
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="Text">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]">
              Ishita Rao
            </p>
            <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]">
              Creator · @ishitarao
            </p>
          </div>
          <div className="relative shrink-0 size-[16px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
        </div>

        {/* Section MAIN */}
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-name="Section · MAIN">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap">
            MAIN
          </p>
        </div>

        {/* Overview */}
        <Link
          to={ROUTES.creator}
          className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] hover:bg-[#f4f6fb] transition"
          data-name="Home"
        >
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Overview
          </p>
        </Link>

        {/* Find projects */}
        <Link
          to={ROUTES.creatorProjects}
          className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] hover:bg-[#f4f6fb] transition"
          data-name="Find projects"
        >
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Project discovery
          </p>
        </Link>

        {/* My projects (Active Header) */}
        <div
          className="bg-[var(--primary-subtle,#f1f4ff)] content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]"
          data-name="My projects"
        >
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon5} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold'] font-semibold leading-[20px] min-w-px not-italic relative text-[14px] text-[color:var(--primary-default,#0d0d10)]">
            My projects
          </p>
          <div className="relative shrink-0 size-[14px]" data-name="Chevron">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevron} />
          </div>
        </div>

        {/* Sub-item: Invitations & offers */}
        <button
          type="button"
          onClick={() => setTab("invitations")}
          className={`content-stretch cursor-pointer flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] transition ${activeTab === "invitations" ? "bg-[#f1f4ff]" : "hover:bg-[#f4f6fb]"
            }`}
          data-name="Invitations & offers"
        >
          <div className="relative shrink-0 size-[4px]" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={activeTab === "invitations" ? imgBullet : imgBullet1} />
          </div>
          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[20px] min-w-px not-italic relative text-[13px] text-left ${activeTab === "invitations" ? "text-[color:var(--primary-default,#0d0d10)]" : "text-[color:var(--text-secondary,#0d0d10)]"}`}>
            Invitations &amp; offers
          </p>
          <div className={`${activeTab === "invitations" ? "bg-[var(--primary-muted,#e3e9ff)]" : "bg-[var(--bg-muted,#edeff3)]"} content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0`} data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap">
              {tabCounts.invitations}
            </p>
          </div>
        </button>

        {/* Sub-item: Applied */}
        <button
          type="button"
          onClick={() => setTab("applied")}
          className={`content-stretch cursor-pointer flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] transition ${activeTab === "applied" ? "bg-[#f1f4ff]" : "hover:bg-[#f4f6fb]"
            }`}
          data-name="Applied"
        >
          <div className="relative shrink-0 size-[4px]" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={activeTab === "applied" ? imgBullet : imgBullet1} />
          </div>
          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-left ${activeTab === "applied" ? "text-[color:var(--primary-default,#0d0d10)] font-medium" : "text-[color:var(--text-secondary,#0d0d10)]"}`}>
            Applied
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              {tabCounts.applied}
            </p>
          </div>
        </button>

        {/* Sub-item: Live / Active */}
        <button
          type="button"
          onClick={() => setTab("live")}
          className={`content-stretch cursor-pointer flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] transition ${activeTab === "live" ? "bg-[#f1f4ff]" : "hover:bg-[#f4f6fb]"
            }`}
          data-name="Active"
        >
          <div className="relative shrink-0 size-[4px]" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={activeTab === "live" ? imgBullet : imgBullet1} />
          </div>
          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-left ${activeTab === "live" ? "text-[color:var(--primary-default,#0d0d10)] font-medium" : "text-[color:var(--text-secondary,#0d0d10)]"}`}>
            Live
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              {tabCounts.live}
            </p>
          </div>
        </button>

        {/* Sub-item: Completed */}
        <button
          type="button"
          onClick={() => setTab("completed")}
          className={`content-stretch cursor-pointer flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] transition ${activeTab === "completed" ? "bg-[#f1f4ff]" : "hover:bg-[#f4f6fb]"
            }`}
          data-name="Completed"
        >
          <div className="relative shrink-0 size-[4px]" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={activeTab === "completed" ? imgBullet : imgBullet1} />
          </div>
          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-left ${activeTab === "completed" ? "text-[color:var(--primary-default,#0d0d10)] font-medium" : "text-[color:var(--text-secondary,#0d0d10)]"}`}>
            Completed
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              {tabCounts.completed}
            </p>
          </div>
        </button>

        {/* Sub-item: Declined */}
        <button
          type="button"
          onClick={() => setTab("declined")}
          className={`content-stretch cursor-pointer flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px] transition ${activeTab === "declined" ? "bg-[#f1f4ff]" : "hover:bg-[#f4f6fb]"
            }`}
          data-name="Declined"
        >
          <div className="relative shrink-0 size-[4px]" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={activeTab === "declined" ? imgBullet : imgBullet1} />
          </div>
          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-left ${activeTab === "declined" ? "text-[color:var(--primary-default,#0d0d10)] font-medium" : "text-[color:var(--text-secondary,#0d0d10)]"}`}>
            Declined
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              {tabCounts.declined}
            </p>
          </div>
        </button>

        {/* Sub-item: Content */}
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-name="Content">
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon6} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Content
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              2
            </p>
          </div>
        </div>

        {/* CONTENT & DATA */}
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-name="Section · CONTENT & DATA">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap">
            CONTENT &amp; DATA
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-name="Performance">
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon7} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Performance
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-name="Earnings">
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon8} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Earnings
          </p>
        </div>

        {/* ACCOUNT */}
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-name="Section · ACCOUNT">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap">
            ACCOUNT
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-name="Messages">
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
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-name="Settings">
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon10} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Settings
          </p>
        </div>

        <div className="mt-auto h-[32px] relative shrink-0 w-px" />
        <div className="bg-[var(--border-default,#e3e5ec)] h-px relative shrink-0 w-[228px]" data-name="Divider" />
        <div className="h-[8px] relative shrink-0 w-[10px]" data-name="gap" />

        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-name="Help Center">
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon11} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Help centre
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-name="Logout">
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon12} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]">
            Logout
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-[var(--bg-page,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative min-h-screen" data-name="Main">
        {/* Top bar */}
        <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-b border-solid content-stretch flex gap-[12px] h-[64px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-name="Top bar">
          <div className="bg-[var(--bg-subtle,#f4f6fb)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[380px]" data-name="Search">
            <div className="relative shrink-0 size-[16px]" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon13} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-tertiary,#a3a3ac)]">
              Search projects, creators, content…
            </p>
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip px-[6px] py-px relative rounded-[4px] shrink-0" data-name="Kbd">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] whitespace-nowrap">
                ⌘K
              </p>
            </div>
          </div>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-name="Spacer" />
          <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-name="Notifications">
            <div className="relative shrink-0 size-[18px]" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon14} />
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Account">
            <div className="bg-[var(--primary-muted,#e3e9ff)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-full,999px)] shrink-0 size-[32px]" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap">
                IR
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-name="Name">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]">
                Ishita Rao
              </p>
              <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]">
                Creator · @ishitarao
              </p>
            </div>
            <div className="relative shrink-0 size-[14px]" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon15} />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="content-stretch flex flex-col gap-[24px] items-start pb-[40px] pt-[28px] px-[32px] relative shrink-0 w-full" data-name="Content">
          {/* Page header */}
          <div className="content-stretch flex gap-[16px] items-end relative shrink-0 w-full" data-name="Page header">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip relative" data-name="Left">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Title row">
                <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[34px] not-italic relative shrink-0 text-[26px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.13px] whitespace-nowrap">
                  My projects
                </p>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
                {activeTab === "applied"
                  ? "Ishita Rao · 3 applications · brands usually reply in 2 days"
                  : activeTab === "invitations"
                    ? `Ishita Rao · 19 projects · ${tabCounts.invitations} offers waiting for your reply`
                    : activeTab === "live"
                      ? "Ishita Rao · 2 live projects · next payout ₹27,000 on 2 Nov"
                      : activeTab === "completed"
                        ? `Ishita Rao · ${tabCounts.completed} completed collaborations · 100% on time`
                        : `Ishita Rao · ${tabCounts.declined} declined offers · no standing impact`}
              </p>
            </div>

            {/* Actions: DateRange & Project Discovery */}
            <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Actions">
              <DateRangePicker value="1 Oct - 28 Oct 2026" />

              <Link
                to={ROUTES.creatorProjects}
                className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] hover:bg-black/90 transition"
                data-name="Button"
              >
                <div className="relative shrink-0 size-[16px]" data-name="Icon">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon16} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap">
                  Project discovery
                </p>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-[var(--border-default,#e3e5ec)] border-b border-solid content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-name="Tabs">
            <button
              type="button"
              onClick={() => setTab("invitations")}
              className={`content-stretch flex gap-[6px] items-center overflow-clip pb-[12px] relative shrink-0 transition cursor-pointer ${activeTab === "invitations"
                  ? "border-[var(--primary-default,#0d0d10)] border-b-2 border-solid"
                  : "border-b-2 border-transparent hover:opacity-80"
                }`}
            >
              <p className={`[word-break:break-word] font-['Inter:Medium'] leading-[22px] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${activeTab === "invitations"
                  ? "font-medium text-[color:var(--primary-default,#0d0d10)]"
                  : "font-normal text-[color:var(--text-secondary,#0d0d10)]"
                }`}>
                Invitations &amp; offers
              </p>
              <div className={`${activeTab === "invitations" ? "bg-[var(--primary-subtle,#f1f4ff)]" : "bg-[var(--bg-muted,#edeff3)]"} content-stretch flex items-start overflow-clip px-[7px] py-px relative rounded-[var(--radius-full,999px)] shrink-0`}>
                <p className={`[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${activeTab === "invitations"
                    ? "text-[color:var(--primary-default,#0d0d10)]"
                    : "text-[color:var(--text-secondary,#0d0d10)]"
                  }`}>
                  {tabCounts.invitations}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTab("applied")}
              className={`content-stretch flex gap-[6px] items-center overflow-clip pb-[12px] relative shrink-0 transition cursor-pointer ${activeTab === "applied"
                  ? "border-[var(--primary-default,#0d0d10)] border-b-2 border-solid"
                  : "border-b-2 border-transparent hover:opacity-80"
                }`}
            >
              <p className={`[word-break:break-word] font-['Inter:Regular'] leading-[22px] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${activeTab === "applied"
                  ? "font-medium text-[color:var(--primary-default,#0d0d10)]"
                  : "font-normal text-[color:var(--text-secondary,#0d0d10)]"
                }`}>
                Applied
              </p>
              <div className={`${activeTab === "applied" ? "bg-[var(--primary-subtle,#f1f4ff)]" : "bg-[var(--bg-muted,#edeff3)]"} content-stretch flex items-start overflow-clip px-[7px] py-px relative rounded-[var(--radius-full,999px)] shrink-0`}>
                <p className={`[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${activeTab === "applied"
                    ? "text-[color:var(--primary-default,#0d0d10)]"
                    : "text-[color:var(--text-secondary,#0d0d10)]"
                  }`}>
                  {tabCounts.applied}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTab("live")}
              className={`content-stretch flex gap-[6px] items-center overflow-clip pb-[12px] relative shrink-0 transition cursor-pointer ${activeTab === "live"
                  ? "border-[var(--primary-default,#0d0d10)] border-b-2 border-solid"
                  : "border-b-2 border-transparent hover:opacity-80"
                }`}
            >
              <p className={`[word-break:break-word] font-['Inter:Regular'] leading-[22px] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${activeTab === "live"
                  ? "font-medium text-[color:var(--primary-default,#0d0d10)]"
                  : "font-normal text-[color:var(--text-secondary,#0d0d10)]"
                }`}>
                Live
              </p>
              <div className={`${activeTab === "live" ? "bg-[var(--primary-subtle,#f1f4ff)]" : "bg-[var(--bg-muted,#edeff3)]"} content-stretch flex items-start overflow-clip px-[7px] py-px relative rounded-[var(--radius-full,999px)] shrink-0`}>
                <p className={`[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${activeTab === "live"
                    ? "text-[color:var(--primary-default,#0d0d10)]"
                    : "text-[color:var(--text-secondary,#0d0d10)]"
                  }`}>
                  {tabCounts.live}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTab("completed")}
              className={`content-stretch flex gap-[6px] items-center overflow-clip pb-[12px] relative shrink-0 transition cursor-pointer ${activeTab === "completed"
                  ? "border-[var(--primary-default,#0d0d10)] border-b-2 border-solid"
                  : "border-b-2 border-transparent hover:opacity-80"
                }`}
            >
              <p className={`[word-break:break-word] font-['Inter:Regular'] leading-[22px] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${activeTab === "completed"
                  ? "font-medium text-[color:var(--primary-default,#0d0d10)]"
                  : "font-normal text-[color:var(--text-secondary,#0d0d10)]"
                }`}>
                Completed
              </p>
              <div className={`${activeTab === "completed" ? "bg-[var(--primary-subtle,#f1f4ff)]" : "bg-[var(--bg-muted,#edeff3)]"} content-stretch flex items-start overflow-clip px-[7px] py-px relative rounded-[var(--radius-full,999px)] shrink-0`}>
                <p className={`[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${activeTab === "completed"
                    ? "text-[color:var(--primary-default,#0d0d10)]"
                    : "text-[color:var(--text-secondary,#0d0d10)]"
                  }`}>
                  {tabCounts.completed}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTab("declined")}
              className={`content-stretch flex gap-[6px] items-center overflow-clip pb-[12px] relative shrink-0 transition cursor-pointer ${activeTab === "declined"
                  ? "border-[var(--primary-default,#0d0d10)] border-b-2 border-solid"
                  : "border-b-2 border-transparent hover:opacity-80"
                }`}
            >
              <p className={`[word-break:break-word] font-['Inter:Regular'] leading-[22px] not-italic relative shrink-0 text-[14px] whitespace-nowrap ${activeTab === "declined"
                  ? "font-medium text-[color:var(--primary-default,#0d0d10)]"
                  : "font-normal text-[color:var(--text-secondary,#0d0d10)]"
                }`}>
                Declined
              </p>
              <div className={`${activeTab === "declined" ? "bg-[var(--primary-subtle,#f1f4ff)]" : "bg-[var(--bg-muted,#edeff3)]"} content-stretch flex items-start overflow-clip px-[7px] py-px relative rounded-[var(--radius-full,999px)] shrink-0`}>
                <p className={`[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${activeTab === "declined"
                    ? "text-[color:var(--primary-default,#0d0d10)]"
                    : "text-[color:var(--text-secondary,#0d0d10)]"
                  }`}>
                  {tabCounts.declined}
                </p>
              </div>
            </button>
          </div>

          {/* KPI Tiles */}
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[12px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-name="KPI tiles">
            {kpiTiles.map((tile, i) => (
              <div key={i} className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip p-[16px] relative rounded-[var(--radius-lg,12px)]">
                <div className={`${tile.bg} content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]`}>
                  <div className="relative shrink-0 size-[18px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={tile.icon} />
                  </div>
                </div>
                <div className="h-[14px] relative shrink-0 w-px" />
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
                  {tile.title}
                </p>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[28px] min-w-full not-italic relative shrink-0 text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px]">
                  {tile.value}
                </p>
                <div className="h-[10px] relative shrink-0 w-px" />
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]">
                  {tile.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Search + Filter Dropdowns (mirrors brand All Projects) */}
          <div className="content-stretch flex gap-[8px] items-center overflow-visible relative shrink-0 w-full" data-name="Row">
            <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-[280px]" data-name="Field">
              <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[40px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-full focus-within:border-[#0d0d10]">
                <div className="relative shrink-0 size-[16px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconSearch} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects or brands…"
                  className="flex-[1_0_0] bg-transparent text-[13px] leading-[20px] text-[color:var(--text-primary,#0d0d10)] outline-none placeholder:text-[#a3a3ac]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-[12px] text-[#6b7280] hover:text-[#0d0d10]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Filter Dropdowns mirroring brand All projects */}
            <FilterDropdown
              label="Type"
              value={typeFilter}
              values={["Influencer", "UGC"]}
              onChange={setTypeFilter}
            />
            <FilterDropdown
              label="Partnership"
              value={partnershipFilter}
              values={["Paid", "Gift exchange"]}
              onChange={setPartnershipFilter}
            />
            <FilterDropdown
              label="Duration"
              value={durationFilter}
              values={["One-time", "Long-term"]}
              onChange={setDurationFilter}
            />
            <FilterDropdown
              label="Platform"
              value={platformFilter}
              values={["Instagram", "YouTube", "Pinterest", "Snapchat"]}
              onChange={setPlatformFilter}
            />
            <FilterDropdown
              label="Fee"
              value={feeFilter}
              values={["Under ₹10,000", "₹10,000–₹20,000", "Over ₹20,000", "Gift only"]}
              onChange={setFeeFilter}
            />

            {(typeFilter !== "All" ||
              partnershipFilter !== "All" ||
              durationFilter !== "All" ||
              platformFilter !== "All" ||
              feeFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setTypeFilter("All");
                    setPartnershipFilter("All");
                    setDurationFilter("All");
                    setPlatformFilter("All");
                    setFeeFilter("All");
                  }}
                  className="text-[12px] font-medium text-[#3b5bff] hover:underline ml-2"
                >
                  Reset filters
                </button>
              )}
          </div>

          {/* Table */}
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-name="Table">
            {/* Table Header */}
            <div className="bg-[var(--bg-subtle,#f4f6fb)] content-stretch flex gap-[12px] items-center overflow-clip px-[20px] py-[12px] relative shrink-0 w-full" data-name="Header">
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  PROJECT
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[76px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  PLATFORM
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[100px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  STATUS
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[44px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  {activeTab === "live" ? "DELIVERED" : "POSTS"}
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[74px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  {activeTab === "live" ? "LIVE" : "MATCH"}
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[130px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  {activeTab === "applied" ? "YOUR FEE" : "FEE"}
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[136px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  {activeTab === "live"
                    ? "PROGRESS"
                    : activeTab === "applied"
                    ? "BRAND DECIDES"
                    : activeTab === "completed"
                    ? "COMPLETED"
                    : "REPLY BY"}
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[72px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  {activeTab === "live" ? "NEXT STEP" : activeTab === "applied" ? "APPLIED" : "RECEIVED"}
                </p>
              </div>
              <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[96px]" data-name="Cell">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] tracking-[0.72px] whitespace-nowrap">
                  ACTIONS
                </p>
              </div>
            </div>

            {/* Rows */}
            {filteredProjects.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center w-full text-center">
                <p className="text-[14px] font-medium text-[color:var(--text-primary,#0d0d10)]">
                  No projects found
                </p>
                <p className="text-[12px] text-[color:var(--text-secondary,#6b7280)] mt-1">
                  Try adjusting your search query or reset the filters.
                </p>
              </div>
            ) : (
              filteredProjects.map((row) => (
                <div
                  key={row.id}
                  className="border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip px-[20px] py-[14px] relative shrink-0 w-full hover:bg-[#fafbfe] transition"
                  data-name="Row"
                >
                  {/* Name cell */}
                  <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-name="Cell">
                    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-name="Name">
                      <div className="relative rounded-[8px] shrink-0 size-[44px] overflow-hidden bg-gray-100" data-name="Rectangle">
                        <img
                          alt=""
                          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full"
                          src={row.image}
                          onError={(e) => {
                            e.currentTarget.src = "/assets/creator/projects/monsoon-sunscreen.png";
                          }}
                        />
                      </div>
                      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-name="t">
                        <Link
                          to={creatorProjectRoute(row.id)}
                          className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] hover:underline"
                        >
                          {row.name}
                        </Link>
                        <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
                          {row.brand}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Platform cell */}
                  <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[76px]" data-name="Cell">
                    <div className="content-stretch flex items-start overflow-clip relative shrink-0" data-name="p">
                      <div className="relative shrink-0 size-[20px]" data-name="Platform logo">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                      </div>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[100px]" data-name="Cell">
                    <Badge
                      label={row.status}
                      tone={row.badgeTone}
                      showDot={row.badgeTone !== "Warning"}
                    />
                  </div>

                  {/* Posts cell */}
                  <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[44px]" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                      {row.posts}
                    </p>
                  </div>

                  {/* Match cell */}
                  <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[74px]" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                      {row.match}{activeTab === "live" ? "" : "%"}
                    </p>
                  </div>

                  {/* Fee cell */}
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start not-italic overflow-clip relative shrink-0 w-[130px] whitespace-nowrap" data-name="Cell">
                    <p className="font-['Inter:Medium'] font-medium leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]">
                      {row.fee}
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
                      {row.feeNote}
                    </p>
                  </div>

                  {/* Reply By / Progress / Deadline */}
                  {activeTab === "live" ? (
                    <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-[136px]" data-name="Cell">
                      <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-name="pp">
                        <div className="h-[6px] overflow-clip relative rounded-[3px] shrink-0 w-[72px]" data-name="Bar">
                          <div className="absolute bg-[var(--bg-muted,#edeff3)] h-[6px] left-0 rounded-[3px] top-0 w-[72px]" data-name="Rectangle" />
                          <div
                            className="absolute bg-[#3b5bff] h-[6px] left-0 rounded-[3px] top-0"
                            style={{ width: `${Math.round(72 * ((row.progressPercent || 0) / 100))}px` }}
                            data-name="Rectangle"
                          />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap">
                          {row.progressPercent}%
                        </p>
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[#8491a3] text-[12px] whitespace-nowrap">
                        {row.replyNote}
                      </p>
                    </div>
                  ) : (
                    <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-[136px]" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap">
                        {row.replyBy}
                      </p>
                      <p className={`[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${row.replyNoteRed ? "text-[#db231f]" : "text-[#8491a3]"
                        }`}>
                        {row.replyNote}
                      </p>
                    </div>
                  )}

                  {/* Received cell */}
                  <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[72px]" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
                      {row.received}
                    </p>
                  </div>

                  {/* Actions cell */}
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-[96px]" data-name="Cell">
                    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="a">
                      <Link
                        to={creatorProjectRoute(row.id)}
                        className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[6px] h-[32px] items-center justify-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] hover:bg-[#f4f6fb] transition"
                        data-name="Button"
                      >
                        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[18px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                          {activeTab === "live" ? "Open" : "View"}
                        </p>
                      </Link>
                      <div className="relative">
                        <button
                          type="button"
                          aria-label="More options"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionRowId((prev) => (prev === row.id ? null : row.id));
                          }}
                          className="relative shrink-0 size-[28px] rounded-md flex items-center justify-center text-[#6b7280] hover:text-[#0d0d10] hover:bg-black/5 cursor-pointer transition"
                          data-name="Icon"
                        >
                          <img alt="" className="size-[16px]" src={imgIcon21} />
                        </button>
                        {openActionRowId === row.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1.5 z-40 w-44 rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-lg text-[13px] text-[#0d0d10] animate-in fade-in zoom-in-95 duration-100"
                          >
                            <Link
                              to={creatorProjectRoute(row.id)}
                              className="flex w-full items-center px-2.5 py-1.5 rounded-md hover:bg-[#f4f6fb] text-[#0d0d10] font-medium"
                              onClick={() => setOpenActionRowId(null)}
                            >
                              View details
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setCounterOfferTargetRow(row);
                                setOpenActionRowId(null);
                              }}
                              className="flex w-full items-center px-2.5 py-1.5 rounded-md hover:bg-[#f4f6fb] text-[#0d0d10] font-medium text-left cursor-pointer"
                            >
                              Counter offer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-name="Pagination">
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              Showing {filteredProjects.length} of {filteredProjects.length} projects
            </p>
            <div className="flex-[1_0_0] h-px min-w-px relative" data-name="Spacer" />
            <button
              type="button"
              className="relative shrink-0 size-[16px] cursor-pointer opacity-70 hover:opacity-100"
              aria-label="Previous page"
            >
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon22} />
            </button>
            <div className="bg-[var(--primary-default,#0d0d10)] content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[28px] cursor-pointer" data-name="p1">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-on-primary,white)] whitespace-nowrap">
                1
              </p>
            </div>
            <button
              type="button"
              className="relative shrink-0 size-[16px] cursor-pointer opacity-70 hover:opacity-100"
              aria-label="Next page"
            >
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon23} />
            </button>
            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap">
              Rows per page
            </p>
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[4px] items-center overflow-clip px-[8px] py-[4px] relative rounded-[6px] shrink-0" data-name="Rows">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap">
                8
              </p>
              <div className="relative shrink-0 size-[12px]" data-name="Icon">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {counterOfferTargetRow && (
        <CounterOfferModal
          isOpen={Boolean(counterOfferTargetRow)}
          onClose={() => setCounterOfferTargetRow(null)}
          brandName={counterOfferTargetRow.brand}
          rangeText={`${counterOfferTargetRow.brand}'s range is ₹15,000 – ₹20,000 for ${counterOfferTargetRow.posts} posts`}
          postsText={`all ${counterOfferTargetRow.posts} posts`}
          initialFee={24000}
          quickPicks={[22000, 25000]}
          maxRange={20000}
          defaultNote={`My ${counterOfferTargetRow.brand} Reels averaged 2.8 L views and drove 392 orders in Vitamin-C Serum.`}
        />
      )}
    </div>
  );
}

export default CreatorMyProjectsPage;
export { CreatorMyProjectsPage as Cr04MyProjectsInvitationsOffers };
export { CreatorMyProjectsPage as Cr04MyProjectsApplied };
export { CreatorMyProjectsPage as Cr04MyProjectsLive };
