import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  Info,
  Play,
  Pencil,
  Eye,
  Check,
  X,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Bell,
  CreditCard,
  Building2,
  Lock,
  Globe,
  Upload,
  ArrowRight,
  Sparkles,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { CreatorShell } from "@/creator/components/CreatorShell";

// Assets
const avatarImg = "/assets/creator/settings/avatar.png";
const videoThumbImg = "/assets/creator/settings/video-thumb.png";
const media1 = "/assets/creator/settings/media-1.png";
const media2 = "/assets/creator/settings/media-2.png";
const media3 = "/assets/creator/settings/media-3.png";
const media4 = "/assets/creator/settings/media-4.png";
const media5 = "/assets/creator/settings/media-5.png";

type TabKey = "account" | "connected" | "payouts" | "notifications" | "security";

export default function CreatorSettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabKey) || "account";
  const [activeTab, setActiveTabState] = useState<TabKey>(
    ["account", "connected", "payouts", "notifications", "security"].includes(initialTab)
      ? initialTab
      : "account"
  );

  const setActiveTab = (tab: TabKey) => {
    setActiveTabState(tab);
    setSearchParams(tab === "account" ? {} : { tab });
  };

  // Profile editable states
  const [name, setName] = useState("Ishita Rao");
  const [handle, setHandle] = useState("@ishitarao");
  const [niche, setNiche] = useState("Beauty & skincare creator");
  const [location, setLocation] = useState("Chennai, India");
  const [languages, setLanguages] = useState("English, Hindi, Tamil");
  const [aboutMe, setAboutMe] = useState(
    "Beauty and skincare creator. Honest routines, festive looks and GRWMs for Indian skin. I film on natural light, test every product for two weeks before posting, and reply to brands within a few hours."
  );
  const [niches, setNiches] = useState(["Skincare", "Make-up", "GRWM", "Festive looks"]);

  // Rates state
  const [rates, setRates] = useState([
    { platform: "Instagram", format: "Reel", price: "₹12,000 – 15,000" },
    { platform: "Instagram", format: "Story", price: "₹3,000" },
    { platform: "YouTube", format: "YouTube Short", price: "₹8,000" },
    { platform: "YouTube", format: "Long video", price: "₹25,000" },
    { platform: "Other", format: "UGC video · brand posts it", price: "₹8,000" },
  ]);

  // Working metrics
  const [workingMetrics, setWorkingMetrics] = useState({
    avgResponse: "within 3 hours",
    acceptedFee: "10 of 12 projects",
    roundsOfEdits: "1 on average",
    usageRights: "30 days included",
  });

  // Modals state
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isEditAboutModalOpen, setIsEditAboutModalOpen] = useState(false);
  const [isEditRatesModalOpen, setIsEditRatesModalOpen] = useState(false);
  const [isManagePinsModalOpen, setIsManagePinsModalOpen] = useState(false);
  const [isBrandPreviewModalOpen, setIsBrandPreviewModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedManageChannel, setSelectedManageChannel] = useState<{
    platform: string;
    handle: string;
    status: string;
    synced: string;
  } | null>(null);
  const [selectedConnectChannel, setSelectedConnectChannel] = useState<string | null>(null);
  const [isAddToolModalOpen, setIsAddToolModalOpen] = useState(false);

  // Payouts & tax state
  const [bankAccount, setBankAccount] = useState({
    bankName: "HDFC Bank",
    accountNumberMasked: "···· 4821",
    accountNumber: "50100482194821",
    accountHolder: "Ishita Rao",
    accountType: "savings",
    verifiedDate: "verified 4 Jan 2025",
    isDefault: true,
  });

  const [upiDetails, setUpiDetails] = useState({
    upiId: "ishita@okhdfcbank",
    note: "Backup if a bank transfer fails",
  });

  const [taxDetails, setTaxDetails] = useState({
    legalName: "Ishita Rao",
    gstin: "Not registered · under ₹20 L a year",
    address: "Chennai, Tamil Nadu",
    placeOfSupply: "Tamil Nadu",
    invoicesTo: "ishita@ishitarao.in",
  });

  const [payoutsList] = useState([
    {
      id: "1",
      date: "21 Oct",
      invoiceId: "FLW-P-2110-1043",
      project: "Vitamin-C Serum · Reel 2",
      subtitle: "",
      amount: "₹12,750",
      status: "Paid",
    },
    {
      id: "2",
      date: "16 Oct",
      invoiceId: "FLW-P-1610-0997",
      project: "Vitamin-C Serum · Reel 1",
      subtitle: "",
      amount: "₹12,750",
      status: "Paid",
    },
    {
      id: "3",
      date: "14 Sep",
      invoiceId: "FLW-P-1409-0856",
      project: "Mist launch",
      subtitle: "gift + fee",
      amount: "₹5,340",
      status: "Paid",
    },
    {
      id: "4",
      date: "2 Sep",
      invoiceId: "FLW-P-0209-0811",
      project: "Lip Liner Collab",
      subtitle: "2 Reels",
      amount: "₹22,320",
      status: "Paid",
    },
  ]);

  const [isAddPaymentMethodModalOpen, setIsAddPaymentMethodModalOpen] = useState(false);
  const [isEditBankModalOpen, setIsEditBankModalOpen] = useState(false);
  const [isEditUpiModalOpen, setIsEditUpiModalOpen] = useState(false);
  const [isEditTaxModalOpen, setIsEditTaxModalOpen] = useState(false);

  const handleDownloadInvoice = (invoiceId: string) => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        `INVOICE: ${invoiceId}\nLegal Name: ${taxDetails.legalName}\nDate: ${new Date().toLocaleDateString()}\nStatus: Paid\n\nThank you for collaborating through Floooww / Kreyio!`,
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${invoiceId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Downloaded invoice ${invoiceId}`);
  };

  const handleDownloadAllPayouts = () => {
    const content = payoutsList
      .map(
        (p) =>
          `${p.date} | Invoice: ${p.invoiceId} | Project: ${p.project}${
            p.subtitle ? ` (${p.subtitle})` : ""
          } | Net: ${p.amount} | Status: ${p.status}`
      )
      .join("\n");
    const file = new Blob(
      [
        `ALL PAYOUTS STATEMENT\nCreator: ${taxDetails.legalName} (${taxDetails.invoicesTo})\nGenerated: ${new Date().toLocaleDateString()}\n\n${content}`,
      ],
      { type: "text/plain" }
    );
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `Payouts_Statement_${new Date().getFullYear()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast("Downloaded all payouts statement.");
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <CreatorShell>
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d0d10] text-white text-[13px] font-medium px-4 py-2.5 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      <div className="w-full bg-white text-[#0d0d10] min-h-[calc(100vh-64px)]">
        <div className="w-full px-5 sm:px-8 pt-7 pb-12 flex flex-col gap-6 max-w-[1400px]">
          {/* 1. Page Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10] leading-8.5">
              Settings
            </h1>
            <p className="text-[13px] text-[#0d0d10] leading-5">
              {name} · creator account
            </p>
          </div>

          {/* 2. Tabs */}
          <div className="border-b border-[#e5e7eb] flex gap-7 items-center overflow-x-auto scrollbar-none">
            {[
              { id: "account", label: "Account" },
              { id: "connected", label: "Connected accounts" },
              { id: "payouts", label: "Payouts & tax" },
              { id: "notifications", label: "Notifications" },
              { id: "security", label: "Security" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`pb-3 font-['Inter:Medium'] text-[14px] leading-5 whitespace-nowrap cursor-pointer transition relative ${
                    isActive
                      ? "text-[#3b5bff] font-semibold"
                      : "text-[#8491a3] hover:text-[#0d0d10]"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3b5bff] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 3. Tab Content: Account */}
          {activeTab === "account" && (
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
              {/* Left Column (Main Information Cards) */}
              <div className="flex flex-col gap-4 min-w-0">
                {/* 1. Context Banner */}
                <div className="bg-[#f4f6fb] flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] w-full">
                  <Info className="size-4 text-[#4a4a55] shrink-0" />
                  <p className="text-[13px] text-[#0d0d10] leading-5">
                    This is your profile exactly as brands see it · 80% complete, edit any section with its button; stats, audience, past work and reviews update automatically
                  </p>
                </div>

                {/* 2. Intro Video Card */}
                <div className="bg-[#f3f5f7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2.5 rounded-[8px] border border-[#e5e7eb]/60">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => setIsVideoModalOpen(true)}
                      className="relative h-[63px] w-[112px] rounded-[6px] overflow-hidden shrink-0 cursor-pointer group shadow-xs"
                    >
                      <img
                        src={videoThumbImg}
                        alt="Intro video thumbnail"
                        className="size-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <div className="size-[26px] rounded-full bg-white/90 flex items-center justify-center shadow-md">
                          <Play className="size-3 text-[#0d0d10] fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[14px] font-medium text-[#070b13] leading-5.5">
                        Intro video · 0:45
                      </p>
                      <p className="text-[13px] text-[#8491a3] leading-5">
                        A 45-second hello from {name.split(" ")[0]} · up to 60 s, vertical or square, MP4 or MOV
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Opening video uploader...")}
                    className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer whitespace-nowrap self-end sm:self-center"
                  >
                    Replace video
                  </button>
                </div>

                {/* 3. About Me Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-3.5 shadow-2xs">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        About me
                      </h3>
                      <p className="text-[14px] text-[#0d0d10] leading-5.5 mt-1">
                        {aboutMe}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditAboutModalOpen(true)}
                      className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <p className="text-[12px] font-medium text-[#0d0d10] leading-4">
                      Skills &amp; niches
                    </p>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {niches.map((n) => (
                        <span
                          key={n}
                          className="bg-[#f4f6fb] px-2 py-0.5 rounded-full text-[12px] font-medium text-[#4a4a55] leading-4"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Services & Rates Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-2.5 shadow-2xs">
                  <div className="flex items-start justify-between gap-4 pb-1">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        Services &amp; rates
                      </h3>
                      <p className="text-[12px] text-[#71717a] leading-4">
                        A guide for brands · each project sets its own fee
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditRatesModalOpen(true)}
                      className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
                    >
                      Edit rates
                    </button>
                  </div>

                  {/* Rates list */}
                  <div className="flex flex-col divide-y divide-[#f4f6fb]">
                    {rates.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2.5">
                        <div className="flex items-center gap-2">
                          {item.platform === "Instagram" && (
                            <img
                              src="/assets/platform-instagram.svg"
                              alt="Instagram"
                              className="size-4 shrink-0"
                            />
                          )}
                          {item.platform === "YouTube" && (
                            <img
                              src="/assets/platform-youtube.svg"
                              alt="YouTube"
                              className="size-4 shrink-0"
                            />
                          )}
                          {item.platform === "Other" && (
                            <div className="size-4 rounded-full bg-[#f4f6fb] flex items-center justify-center text-[10px] text-[#71717a] font-bold">
                              •
                            </div>
                          )}
                          <span className="text-[13px] text-[#0d0d10] leading-5">
                            {item.format}
                          </span>
                        </div>
                        <span className="text-[14px] font-medium text-[#0d0d10] leading-5.5">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[12px] text-[#71717a] leading-4 pt-1">
                    Brands see these as a guide. Each project has its own fee range, you pick inside it or ask for more.
                  </p>

                  <div className="pt-2 border-t border-[#f4f6fb] flex flex-col gap-2">
                    <p className="text-[12px] text-[#71717a] font-medium leading-4">
                      How you work with brands
                    </p>
                    <div className="flex justify-between items-center text-[13px] leading-5">
                      <span className="text-[#71717a]">Usually replies</span>
                      <span className="text-[#0d0d10]">{workingMetrics.avgResponse}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] leading-5">
                      <span className="text-[#71717a]">Accepted the brand’s fee</span>
                      <span className="text-[#0d0d10]">{workingMetrics.acceptedFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] leading-5">
                      <span className="text-[#71717a]">Rounds of edits</span>
                      <span className="text-[#0d0d10]">{workingMetrics.roundsOfEdits}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] leading-5">
                      <span className="text-[#71717a]">Usage rights</span>
                      <span className="text-[#0d0d10]">{workingMetrics.usageRights}</span>
                    </div>
                  </div>
                </div>

                {/* 5. Portfolio Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-3.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        Portfolio
                      </h3>
                      <p className="text-[12px] text-[#71717a] leading-4 mt-0.5">
                        Pinned posts brands see first
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsManagePinsModalOpen(true)}
                      className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
                    >
                      Manage pins
                    </button>
                  </div>

                  {/* 6 Post Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
                    {[
                      {
                        img: videoThumbImg,
                        platform: "ig",
                        views: "3.0 L views",
                        title: "Festive GRWM · Minimalist",
                      },
                      {
                        img: media1,
                        platform: "ig",
                        views: "2.6 L views",
                        title: "Launch day · Minimalist",
                      },
                      {
                        img: media2,
                        platform: "yt",
                        views: "21K views",
                        title: "Festive look tutorial",
                      },
                      {
                        img: media3,
                        platform: "ig",
                        views: "1.8 L views",
                        title: "Lip liner looks · Velvet",
                      },
                      {
                        img: media4,
                        platform: "ig",
                        views: "1.2 L views",
                        title: "Serum layering · Glow Squad",
                      },
                      {
                        img: media5,
                        platform: "ig",
                        views: "96K views",
                        title: "Mist routine · Dewdrop",
                      },
                    ].map((post, idx) => (
                      <div key={idx} className="flex flex-col gap-1.5 min-w-0">
                        <div className="relative h-[214px] w-full rounded-[10px] overflow-hidden bg-[#f4f6fb] shadow-2xs group cursor-pointer">
                          <img
                            src={post.img}
                            alt={post.title}
                            className="size-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute top-2 left-2 size-5 rounded-full bg-white/90 p-0.5 shadow-xs flex items-center justify-center">
                            {post.platform === "ig" ? (
                              <img
                                src="/assets/platform-instagram.svg"
                                alt="Instagram"
                                className="size-3.5"
                              />
                            ) : (
                              <img
                                src="/assets/platform-youtube.svg"
                                alt="YouTube"
                                className="size-3.5"
                              />
                            )}
                          </div>
                        </div>
                        <p className="text-[14px] font-medium text-[#0d0d10] leading-5.5 truncate">
                          {post.views}
                        </p>
                        <p className="text-[12px] text-[#71717a] leading-4 truncate">
                          {post.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Past brand work on Kreyio Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-2 shadow-2xs">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                      Past brand work on Kreyio
                    </h3>
                    <p className="text-[12px] text-[#71717a] leading-4 mt-0.5">
                      12 projects · 98% delivered on time
                    </p>
                  </div>

                  <div className="flex flex-col divide-y divide-[#e3e5ec] mt-1">
                    {[
                      {
                        initials: "MI",
                        brand: "Minimalist · Vitamin-C Serum",
                        sub: "Instagram · Oct 2026 · Influencer · Paid · One-time",
                        orders: "318 orders",
                        reach: "4.1 L views · 6.8% engagement",
                      },
                      {
                        initials: "VL",
                        brand: "Velvet Lip Co. · Lip Liner Collab",
                        sub: "Instagram · Aug 2026 · Influencer · Paid · One-time",
                        orders: "58 orders",
                        reach: "₹21,400 net sales · 1.8 L views",
                      },
                      {
                        initials: "MI",
                        brand: "Minimalist · Summer Glow Edit",
                        sub: "Instagram · Jul 2026 · Influencer · Paid · One-time",
                        orders: "140 orders",
                        reach: "₹51,200 net sales · 2.4 L views",
                      },
                      {
                        initials: "DN",
                        brand: "Dewdrop Naturals · Mist launch",
                        sub: "Instagram · Sep 2026 · Influencer · Gift + fee",
                        orders: "96K views",
                        reach: "6.9% engagement · 840 link clicks",
                      },
                      {
                        initials: "KN",
                        brand: "Kumkum Naturals · Ubtan Glow Reel",
                        sub: "Instagram · May 2026 · Influencer · Paid · One-time",
                        orders: "64 orders",
                        reach: "₹19,800 net sales · 92K views",
                      },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="py-2.5 flex items-center justify-between gap-3 hover:bg-[#fafbfc] px-1 rounded-md transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-9 rounded-[7.5px] bg-[#3b5bff] text-white font-semibold text-[13.5px] flex items-center justify-center shrink-0">
                            {row.initials}
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="text-[14px] font-semibold text-[#070b13] leading-5.5 truncate">
                              {row.brand}
                            </p>
                            <p className="text-[12px] text-[#8491a3] leading-4 truncate">
                              {row.sub}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col gap-0.5 shrink-0">
                          <p className="text-[14px] font-semibold text-[#070b13] leading-5">
                            {row.orders}
                          </p>
                          <p className="text-[12px] text-[#8491a3] leading-4">
                            {row.reach}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. Reviews Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-3.5 shadow-2xs">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        Reviews
                      </h3>
                      <p className="text-[12px] text-[#71717a] leading-4 mt-0.5">
                        4.9 from 12 brand reviews · Communication 4.9 · On-time 5.0 · Content 4.8
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Viewing all 12 reviews...")}
                      className="text-[13px] font-medium text-[#0d0d10] hover:underline cursor-pointer whitespace-nowrap"
                    >
                      See all 12
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-[#f4f6fb] p-3.5 rounded-[8px] flex flex-col gap-1.5 justify-between">
                      <div>
                        <p className="text-[13px] text-[#f59e0b] tracking-wider font-semibold">
                          ★★★★★
                        </p>
                        <p className="text-[13px] text-[#0d0d10] leading-5 mt-1">
                          “Delivered early and the GRWM Reel became our best-selling post.”
                        </p>
                      </div>
                      <p className="text-[12px] text-[#71717a] leading-4 mt-2">
                        Minimalist · Vitamin-C Serum · Oct 2026
                      </p>
                    </div>

                    <div className="bg-[#f4f6fb] p-3.5 rounded-[8px] flex flex-col gap-1.5 justify-between">
                      <div>
                        <p className="text-[13px] text-[#f59e0b] tracking-wider font-semibold">
                          ★★★★★
                        </p>
                        <p className="text-[13px] text-[#0d0d10] leading-5 mt-1">
                          “Great hooks in the first 3 seconds. Pinned our link without being asked.”
                        </p>
                      </div>
                      <p className="text-[12px] text-[#71717a] leading-4 mt-2">
                        Velvet Lip Co. · Lip Liner Collab · Aug 2026
                      </p>
                    </div>

                    <div className="bg-[#f4f6fb] p-3.5 rounded-[8px] flex flex-col gap-1.5 justify-between">
                      <div>
                        <p className="text-[13px] text-[#f59e0b] tracking-wider font-semibold">
                          ★★★★☆
                        </p>
                        <p className="text-[13px] text-[#0d0d10] leading-5 mt-1">
                          “Good reach. One quick round of edits on the product claims.”
                        </p>
                      </div>
                      <p className="text-[12px] text-[#71717a] leading-4 mt-2">
                        Dewdrop Naturals · Mist launch · Sep 2026
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Profile Summary & Demographics) */}
              <div className="flex flex-col gap-4 w-full lg:w-[340px] shrink-0">
                {/* 1. Main Profile Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col items-center gap-3 shadow-2xs text-center">
                  <div className="relative size-24 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={avatarImg}
                      alt={name}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <h2 className="text-[26px] font-bold text-[#0d0d10] tracking-[-0.13px] leading-8.5">
                      {name}
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#16a34a] whitespace-nowrap">
                      <span className="size-1.5 rounded-full bg-[#16a34a]" />
                      Insights verified
                    </span>
                  </div>

                  <p className="text-[13px] text-[#71717a] leading-5">
                    {handle} · {niche}
                  </p>
                  <p className="text-[14px] font-medium text-[#0d0d10] leading-5.5 whitespace-pre">
                    ★ 4.9 · 12 reviews · Top creator
                  </p>

                  <div className="flex flex-col gap-2 w-full pt-1">
                    <button
                      type="button"
                      onClick={() => setIsEditProfileModalOpen(true)}
                      className="w-full h-10 px-4 rounded-[8px] border border-[#e3e5ec] bg-white text-[14px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Pencil className="size-4" />
                      <span>Edit name &amp; photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBrandPreviewModalOpen(true)}
                      className="w-full h-10 px-4 rounded-[8px] bg-[#0d0d10] text-[14px] font-medium text-white hover:bg-black transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Eye className="size-4" />
                      <span>Preview as a brand</span>
                    </button>
                  </div>

                  <div className="w-full h-px bg-[#edeff3] my-1" />

                  {/* 4 KPI Numbers */}
                  <div className="w-full grid grid-cols-4 divide-x divide-[#f4f6fb] py-1 text-center">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        1.5 L
                      </span>
                      <span className="text-[12px] text-[#a3a3ac] leading-4">
                        Followers
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        6.1%
                      </span>
                      <span className="text-[12px] text-[#a3a3ac] leading-4">
                        Eng. rate
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        12
                      </span>
                      <span className="text-[12px] text-[#a3a3ac] leading-4">
                        Projects
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        98%
                      </span>
                      <span className="text-[12px] text-[#a3a3ac] leading-4">
                        On time
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-[#edeff3] my-1" />

                  {/* Key-Value Details */}
                  <div className="w-full flex flex-col gap-2.5 text-[13px] leading-5 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717a]">From</span>
                      <span className="text-[#0d0d10] font-medium">{location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717a]">Member since</span>
                      <span className="text-[#0d0d10] font-medium">Jan 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717a]">Avg. response time</span>
                      <span className="text-[#0d0d10] font-medium">3 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717a]">Last delivery</span>
                      <span className="text-[#0d0d10] font-medium">26 Oct 2026</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#71717a]">Languages</span>
                      <span className="text-[#0d0d10] font-medium text-right max-w-[180px] truncate">
                        {languages}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Linked Accounts Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-2.5 shadow-2xs">
                  <div className="flex items-start justify-between gap-2 pb-1">
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                        Linked accounts
                      </h3>
                      <p className="text-[12px] text-[#a3a3ac] leading-4 mt-0.5">
                        Read from your connected accounts every day, brands know they’re real.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("connected")}
                      className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer shrink-0"
                    >
                      Manage
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[13px] leading-5 py-1">
                    <span className="text-[#71717a]">Instagram · @ishitarao</span>
                    <span className="text-[#0d0d10] font-medium">1.12 L followers</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] leading-5 py-1">
                    <span className="text-[#71717a]">YouTube · Ishita Rao</span>
                    <span className="text-[#0d0d10] font-medium">38K subscribers</span>
                  </div>
                </div>

                {/* 3. Audience Card */}
                <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-3 shadow-2xs">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#0d0d10] leading-5">
                      Audience
                    </h3>
                    <p className="text-[12px] text-[#71717a] leading-4 mt-0.5">
                      All platforms combined
                    </p>
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex justify-between items-center text-[14px] font-medium text-[#0d0d10]">
                      <span>Women 78%</span>
                      <span className="text-[#71717a]">Men 22%</span>
                    </div>
                    <div className="h-2 w-full bg-[#edeff3] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0d0d10] rounded-full w-[78%]" />
                    </div>
                  </div>

                  {/* Age Breakdown */}
                  <div className="flex flex-col gap-2 pt-2">
                    <p className="text-[12px] font-medium text-[#71717a] leading-4">
                      Age
                    </p>
                    {[
                      { age: "13–17", pct: "2%", width: "w-[2%]" },
                      { age: "18–24", pct: "38%", width: "w-[38%]" },
                      { age: "25–34", pct: "41%", width: "w-[41%]" },
                      { age: "35–44", pct: "14%", width: "w-[14%]" },
                      { age: "45+", pct: "5%", width: "w-[5%]" },
                    ].map((row) => (
                      <div key={row.age} className="flex items-center gap-2 text-[12px]">
                        <span className="w-11 text-[#71717a]">{row.age}</span>
                        <div className="flex-1 h-1.5 bg-[#edeff3] rounded-full overflow-hidden">
                          <div className={`h-full bg-[#0d0d10] rounded-full ${row.width}`} />
                        </div>
                        <span className="w-8 text-right text-[#0d0d10] font-medium">
                          {row.pct}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Top Cities */}
                  <div className="flex flex-col gap-2 pt-2">
                    <p className="text-[12px] font-medium text-[#71717a] leading-4">
                      Top cities · 93% in India
                    </p>
                    {[
                      { city: "Mumbai", pct: "28%", width: "w-[75%]" },
                      { city: "Delhi NCR", pct: "19%", width: "w-[50%]" },
                      { city: "Bengaluru", pct: "14%", width: "w-[36%]" },
                      { city: "Pune", pct: "9%", width: "w-[24%]" },
                    ].map((row) => (
                      <div key={row.city} className="flex items-center gap-2 text-[12px]">
                        <span className="w-16 text-[#71717a] truncate">{row.city}</span>
                        <div className="flex-1 h-1.5 bg-[#edeff3] rounded-full overflow-hidden">
                          <div className={`h-full bg-[#0d0d10] rounded-full ${row.width}`} />
                        </div>
                        <span className="w-8 text-right text-[#0d0d10] font-medium">
                          {row.pct}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Tab Content: Connected Accounts */}
          {activeTab === "connected" && (
            <div className="flex flex-col gap-7 w-full max-w-[1200px]" data-node-id="795:14178">
              {/* Group 1: Social accounts */}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-[16px] font-semibold text-[#070b13] leading-5">
                    Social accounts
                  </h2>
                  <p className="text-[12px] text-[#8491a3] leading-4">
                    We read your stats here, so brands see real numbers · connect more for full reach
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-start w-full">
                  {/* Card 1: Instagram */}
                  <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 w-full sm:w-[361px] flex flex-col gap-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 w-full">
                      <div className="size-10 rounded-[8px] bg-[#f4f6fb] flex items-center justify-center shrink-0">
                        <img
                          src="/assets/platform-instagram.svg"
                          alt="Instagram"
                          className="size-6 shrink-0"
                        />
                      </div>
                      <p className="flex-1 font-semibold text-[14px] text-[#0d0d10] leading-5 truncate">
                        Instagram · @ishitarao
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#16a34a] whitespace-nowrap">
                        <span className="size-1.5 rounded-full bg-[#16a34a]" />
                        Connected
                      </span>
                    </div>
                    <p className="text-[13px] text-[#0d0d10] leading-5">
                      Followers, reach and post stats · synced today
                    </p>
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => setSelectedManageChannel({ platform: "Instagram", handle: "@ishitarao", status: "Connected", synced: "Synced today" })}
                        className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
                      >
                        Manage
                      </button>
                    </div>
                  </div>

                  {/* Card 2: YouTube */}
                  <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 w-full sm:w-[361px] flex flex-col gap-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 w-full">
                      <div className="size-10 rounded-[8px] bg-[#f4f6fb] flex items-center justify-center shrink-0">
                        <img
                          src="/assets/platform-youtube.svg"
                          alt="YouTube"
                          className="size-6 shrink-0"
                        />
                      </div>
                      <p className="flex-1 font-semibold text-[14px] text-[#0d0d10] leading-5 truncate">
                        YouTube · @ishitarao
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#16a34a] whitespace-nowrap">
                        <span className="size-1.5 rounded-full bg-[#16a34a]" />
                        Connected
                      </span>
                    </div>
                    <p className="text-[13px] text-[#0d0d10] leading-5">
                      Subscribers and video stats · synced today
                    </p>
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => setSelectedManageChannel({ platform: "YouTube", handle: "@ishitarao", status: "Connected", synced: "Synced today" })}
                        className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
                      >
                        Manage
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Pinterest */}
                  <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 w-full sm:w-[361px] flex flex-col gap-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 w-full">
                      <div className="size-10 rounded-[8px] bg-[#f3f5f7] flex items-center justify-center shrink-0">
                        <img
                          src="/assets/platform-pinterest.svg"
                          alt="Pinterest"
                          className="size-5 shrink-0"
                        />
                      </div>
                      <p className="flex-1 font-semibold text-[14px] text-[#0d0d10] leading-5 truncate">
                        Pinterest
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#f4f6fb] text-[#4a4a55] whitespace-nowrap">
                        <span className="size-1.5 rounded-full bg-[#71717a]" />
                        Not connected
                      </span>
                    </div>
                    <p className="text-[13px] text-[#0d0d10] leading-5">
                      Pins and saves.
                    </p>
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => setSelectedConnectChannel("Pinterest")}
                        className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
                      >
                        Connect
                      </button>
                    </div>
                  </div>

                  {/* Card 4: Snapchat */}
                  <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 w-full sm:w-[361px] flex flex-col gap-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 w-full">
                      <div className="size-10 rounded-[8px] bg-[#f3f5f7] flex items-center justify-center shrink-0">
                        <img
                          src="/assets/platform-snapchat.svg"
                          alt="Snapchat"
                          className="size-5 shrink-0"
                        />
                      </div>
                      <p className="flex-1 font-semibold text-[14px] text-[#0d0d10] leading-5 truncate">
                        Snapchat
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#f4f6fb] text-[#4a4a55] whitespace-nowrap">
                        <span className="size-1.5 rounded-full bg-[#71717a]" />
                        Not connected
                      </span>
                    </div>
                    <p className="text-[13px] text-[#0d0d10] leading-5">
                      Story views and Spotlight.
                    </p>
                    <div className="pt-0.5">
                      <button
                        type="button"
                        onClick={() => setSelectedConnectChannel("Snapchat")}
                        className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 2: Your tools */}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-[16px] font-semibold text-[#070b13] leading-5">
                    Your tools
                  </h2>
                  <p className="text-[12px] text-[#8491a3] leading-4">
                    Anything else you connected
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-start w-full">
                  <div className="bg-[#fafafa] border border-[#d4d7df] border-dashed rounded-[12px] p-5 w-full sm:w-[361px] flex flex-col gap-2">
                    <p className="font-semibold text-[14px] text-[#070b13] leading-5">
                      Add any tool
                    </p>
                    <p className="text-[13px] text-[#8491a3] leading-5">
                      Search 100+ apps, or connect your own tool with a webhook or API key.
                    </p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setIsAddToolModalOpen(true)}
                        className="h-8 px-3 rounded-[8px] bg-[#0d0d10] text-white text-[13px] font-medium hover:bg-black transition cursor-pointer"
                      >
                        Add integration
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. Tab Content: Payouts & Tax */}
          {activeTab === "payouts" && (
            <div className="flex flex-col gap-6 w-full">
              {/* Top Row: Payment Methods & Tax Details */}
              <div className="flex flex-col lg:flex-row gap-5 items-stretch w-full">
                {/* Left Card: Where we pay you */}
                <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 flex-1 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex flex-col gap-0.5">
                      <h2 className="text-[16px] font-semibold text-[#070b13] leading-5">
                        Where we pay you
                      </h2>
                      <p className="text-[12px] text-[#8491a3] leading-4">
                        Released fees reach this account 2 days after approval
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddPaymentMethodModalOpen(true)}
                      className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer shrink-0"
                    >
                      Add method
                    </button>
                  </div>

                  {/* Method 1: HDFC Bank */}
                  <div className="border-t border-[#edeff3] pt-3 pb-3 flex items-center justify-between gap-3 w-full">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-[#070b13]">
                          {bankAccount.bankName} {bankAccount.accountNumberMasked}
                        </span>
                        {bankAccount.isDefault && (
                          <span className="bg-[#f1f4ff] text-[#3b5bff] text-[12px] font-medium px-2 py-0.5 rounded-full leading-normal">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#8491a3] leading-normal">
                        {bankAccount.accountHolder} · {bankAccount.accountType} · {bankAccount.verifiedDate}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditBankModalOpen(true)}
                      className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Method 2: UPI */}
                  <div className="border-t border-[#edeff3] pt-3 pb-3 flex items-center justify-between gap-3 w-full">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-medium text-[#070b13]">
                        UPI · {upiDetails.upiId}
                      </span>
                      <p className="text-[12px] text-[#8491a3] leading-normal">
                        {upiDetails.note}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditUpiModalOpen(true)}
                      className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Right Card: Tax Details */}
                <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 w-full lg:w-[380px] shrink-0 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex flex-col gap-0.5">
                      <h2 className="text-[16px] font-semibold text-[#070b13] leading-5">
                        Tax details
                      </h2>
                      <p className="text-[12px] text-[#8491a3] leading-4">
                        Used on the invoices Kreyio makes for you
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditTaxModalOpen(true)}
                      className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer shrink-0"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex flex-col text-[13px]">
                    <div className="border-t border-[#edeff3] py-2.5 flex items-center">
                      <span className="text-[#8491a3] w-[110px] shrink-0">Legal name</span>
                      <span className="font-medium text-[#070b13] flex-1">{taxDetails.legalName}</span>
                    </div>
                    <div className="border-t border-[#edeff3] py-2.5 flex items-center">
                      <span className="text-[#8491a3] w-[110px] shrink-0">GSTIN</span>
                      <span className="font-medium text-[#070b13] flex-1">{taxDetails.gstin}</span>
                    </div>
                    <div className="border-t border-[#edeff3] py-2.5 flex items-center">
                      <span className="text-[#8491a3] w-[110px] shrink-0">Address</span>
                      <span className="font-medium text-[#070b13] flex-1">{taxDetails.address}</span>
                    </div>
                    <div className="border-t border-[#edeff3] py-2.5 flex items-center">
                      <span className="text-[#8491a3] w-[110px] shrink-0">Place of supply</span>
                      <span className="font-medium text-[#070b13] flex-1">{taxDetails.placeOfSupply}</span>
                    </div>
                    <div className="border-t border-[#edeff3] py-2.5 flex items-center">
                      <span className="text-[#8491a3] w-[110px] shrink-0">Invoices to</span>
                      <span className="font-medium text-[#070b13] flex-1">{taxDetails.invoicesTo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card: Invoices / Payouts */}
              <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-5 flex flex-col gap-3.5 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                  <div className="flex flex-col gap-0.5">
                    <h2 className="text-[16px] font-semibold text-[#070b13] leading-5">
                      Payouts
                    </h2>
                    <p className="text-[12px] text-[#8491a3] leading-4">
                      Every payout with its invoice · 11% Kreyio fee shown on each payout · GST is paid by the brand on top
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadAllPayouts}
                    className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    Download all
                  </button>
                </div>

                {/* Table */}
                <div className="border border-[#e5e7eb] rounded-[10px] overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-[#f3f5f7] text-[12px] font-medium text-[#8491a3] border-b border-[#e5e7eb]">
                          <th className="py-2.5 px-3.5 w-[90px]">DATE</th>
                          <th className="py-2.5 px-3.5 w-[150px]">INVOICE</th>
                          <th className="py-2.5 px-3.5">PROJECT</th>
                          <th className="py-2.5 px-3.5 w-[110px]">AMOUNT</th>
                          <th className="py-2.5 px-3.5 w-[110px]">STATUS</th>
                          <th className="py-2.5 px-3.5 w-[80px] text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#edeff3] text-[13px]">
                        {payoutsList.map((p) => (
                          <tr key={p.id} className="hover:bg-[#fafafa] transition">
                            <td className="py-3 px-3.5 font-medium text-[#070b13] whitespace-nowrap">
                              {p.date}
                            </td>
                            <td className="py-3 px-3.5 text-[#070b13] whitespace-nowrap">
                              {p.invoiceId}
                            </td>
                            <td className="py-3 px-3.5">
                              <div className="flex flex-col">
                                <span className="text-[#070b13]">{p.project}</span>
                                {p.subtitle && (
                                  <span className="text-[12px] text-[#8491a3]">
                                    {p.subtitle}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3.5 text-[#070b13] whitespace-nowrap">
                              {p.amount}
                            </td>
                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#e1fce3] text-[#149d46]">
                                <span className="size-1.5 rounded-full bg-[#149d46]" />
                                Paid
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleDownloadInvoice(p.invoiceId)}
                                className="text-[13px] font-medium text-[#3b5bff] hover:underline cursor-pointer"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Tab Content: Notifications */}
          {activeTab === "notifications" && (
            <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-6 max-w-3xl flex flex-col gap-6 shadow-2xs">
              <div>
                <h2 className="text-[16px] font-semibold text-[#0d0d10]">Notification preferences</h2>
                <p className="text-[13px] text-[#71717a] mt-1">
                  Choose what alerts reach you via email, WhatsApp, and in-app bell.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { title: "Direct brand invitations & offers", desc: "Get notified when a brand invites you to a paid campaign", defaultChecked: true },
                  { title: "Deliverable reviews & approvals", desc: "When a brand requests changes or approves your submitted drafts", defaultChecked: true },
                  { title: "Payment released to escrow", desc: "Instant updates when milestone funds are credited to your account", defaultChecked: true },
                  { title: "Weekly performance digest", desc: "Summary of your Reel views, link clicks, and creator rank", defaultChecked: false },
                ].map((item, idx) => (
                  <label key={idx} className="flex items-start gap-3 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      defaultChecked={item.defaultChecked}
                      className="size-4 mt-0.5 rounded border-[#e3e5ec] text-[#0d0d10] focus:ring-0 cursor-pointer"
                    />
                    <div>
                      <p className="text-[14px] font-medium text-[#0d0d10] leading-5">{item.title}</p>
                      <p className="text-[12px] text-[#71717a] leading-4">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 7. Tab Content: Security */}
          {activeTab === "security" && (
            <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-6 max-w-3xl flex flex-col gap-6 shadow-2xs">
              <div>
                <h2 className="text-[16px] font-semibold text-[#0d0d10]">Login &amp; Security</h2>
                <p className="text-[13px] text-[#71717a] mt-1">
                  Manage password, two-factor authentication, and active sessions.
                </p>
              </div>

              <div className="flex flex-col divide-y divide-[#edeff3]">
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-[#0d0d10]">Password</p>
                    <p className="text-[12px] text-[#71717a]">Last changed 3 months ago</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Password reset link sent to your registered email.")}
                    className="h-8 px-3 rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
                  >
                    Change password
                  </button>
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-[#0d0d10]">Two-factor authentication (2FA)</p>
                    <p className="text-[12px] text-[#71717a]">SMS code verification enabled for +91 98••••••21</p>
                  </div>
                  <span className="text-[12px] font-medium text-[#16a34a] bg-[#e1fce3] px-2.5 py-0.5 rounded-full">
                    Enabled
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL 1: Edit Name & Photo */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-[#0d0d10]">Edit name &amp; photo</h3>
              <button
                type="button"
                onClick={() => setIsEditProfileModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-[13px]">
              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Handle</label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Primary niche</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Languages</label>
                <input
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditProfileModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditProfileModalOpen(false);
                  showToast("Profile details saved successfully.");
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <Check className="size-4" />
                <span>Save changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit About Me */}
      {isEditAboutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-lg w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-[#0d0d10]">Edit about me</h3>
              <button
                type="button"
                onClick={() => setIsEditAboutModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Bio / Story</label>
                <textarea
                  rows={4}
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                  className="w-full p-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10] leading-5 resize-none"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                  Skills &amp; niches (comma separated)
                </label>
                <input
                  type="text"
                  value={niches.join(", ")}
                  onChange={(e) =>
                    setNiches(
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditAboutModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditAboutModalOpen(false);
                  showToast("About me updated successfully.");
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <Check className="size-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Rates */}
      {isEditRatesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-lg w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-[#0d0d10]">Edit services &amp; guide rates</h3>
              <button
                type="button"
                onClick={() => setIsEditRatesModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
              {rates.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-44 text-[13px] font-medium text-[#0d0d10] truncate">
                    {item.format}
                  </span>
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => {
                      const updated = [...rates];
                      updated[idx].price = e.target.value;
                      setRates(updated);
                    }}
                    className="flex-1 h-9 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditRatesModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditRatesModalOpen(false);
                  showToast("Rates updated.");
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <Check className="size-4" />
                <span>Save rates</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Manage Pins */}
      {isManagePinsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-lg w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold text-[#0d0d10]">Manage pinned portfolio posts</h3>
              <button
                type="button"
                onClick={() => setIsManagePinsModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-[13px] text-[#71717a]">
              Choose up to 6 published posts or UGC deliverables to show prominently at the top of your public profile.
            </p>

            <div className="flex flex-col gap-2 py-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#e3e5ec]">
                <div className="flex items-center gap-2.5">
                  <img src={videoThumbImg} alt="" className="size-10 rounded object-cover" />
                  <div>
                    <p className="text-[13px] font-medium text-[#0d0d10]">Festive GRWM · Minimalist</p>
                    <p className="text-[11px] text-[#71717a]">3.0 L views · Instagram</p>
                  </div>
                </div>
                <span className="text-[12px] text-[#16a34a] font-medium bg-[#e1fce3] px-2 py-0.5 rounded">Pinned #1</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-[#e3e5ec]">
                <div className="flex items-center gap-2.5">
                  <img src={media1} alt="" className="size-10 rounded object-cover" />
                  <div>
                    <p className="text-[13px] font-medium text-[#0d0d10]">Launch day · Minimalist</p>
                    <p className="text-[11px] text-[#71717a]">2.6 L views · Instagram</p>
                  </div>
                </div>
                <span className="text-[12px] text-[#16a34a] font-medium bg-[#e1fce3] px-2 py-0.5 rounded">Pinned #2</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsManagePinsModalOpen(false)}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Preview as a Brand */}
      {isBrandPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[16px] border border-[#e3e5ec] shadow-2xl max-w-2xl w-full p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#edeff3]">
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-[#3b5bff]" />
                <h3 className="text-[16px] font-semibold text-[#0d0d10]">
                  Brand View: {name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBrandPreviewModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img src={avatarImg} alt={name} className="size-16 rounded-full object-cover shadow-sm" />
              <div>
                <h4 className="text-[18px] font-bold text-[#0d0d10]">{name}</h4>
                <p className="text-[13px] text-[#71717a]">{handle} · {niche}</p>
                <p className="text-[12px] text-[#16a34a] font-medium mt-1">★ 4.9 (12 reviews) · Top creator</p>
              </div>
            </div>

            <div className="p-3 bg-[#f8f9fb] rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] leading-5">
              {aboutMe}
            </div>

            <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-lg bg-[#f4f6fb]">
              <div>
                <p className="text-[14px] font-bold text-[#0d0d10]">1.5 L</p>
                <p className="text-[11px] text-[#71717a]">Followers</p>
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0d0d10]">6.1%</p>
                <p className="text-[11px] text-[#71717a]">Eng. rate</p>
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0d0d10]">12</p>
                <p className="text-[11px] text-[#71717a]">Projects</p>
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0d0d10]">98%</p>
                <p className="text-[11px] text-[#71717a]">On-time</p>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsBrandPreviewModalOpen(false)}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black"
              >
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: Video Player */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-black rounded-xl overflow-hidden max-w-lg w-full relative shadow-2xl flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 size-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 cursor-pointer"
            >
              <X className="size-4" />
            </button>
            <div className="relative w-full aspect-video flex items-center justify-center bg-zinc-900">
              <img
                src={videoThumbImg}
                alt="Intro video"
                className="size-full object-contain"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white gap-2">
                <Play className="size-12 fill-white opacity-80" />
                <p className="text-[14px] font-medium">Intro video preview (0:45)</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL 7: Manage Channel Modal */}
      {selectedManageChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-[#f4f6fb] flex items-center justify-center">
                  {selectedManageChannel.platform === "Instagram" ? (
                    <img src="/assets/platform-instagram.svg" alt="" className="size-5" />
                  ) : (
                    <img src="/assets/platform-youtube.svg" alt="" className="size-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#0d0d10]">
                    Manage {selectedManageChannel.platform}
                  </h3>
                  <p className="text-[12px] text-[#71717a]">{selectedManageChannel.handle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedManageChannel(null)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 bg-[#f8f9fb] p-3.5 rounded-lg border border-[#e3e5ec] text-[13px]">
              <div className="flex justify-between items-center">
                <span className="text-[#71717a]">Connection status</span>
                <span className="font-medium text-[#16a34a] inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#16a34a]" />
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71717a]">Sync frequency</span>
                <span className="text-[#0d0d10] font-medium">Every 24 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#71717a]">Data shared with brands</span>
                <span className="text-[#0d0d10] font-medium">Followers, Reach, Views</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedManageChannel(null);
                  showToast(`Refreshed ${selectedManageChannel.platform} metrics.`);
                }}
                className="w-full h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="size-3.5" />
                <span>Refresh stats now</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedManageChannel(null);
                  showToast(`${selectedManageChannel.platform} disconnected.`);
                }}
                className="w-full h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#dc2626] hover:bg-[#fee2e2]/40 transition"
              >
                Disconnect account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 8: Connect Channel Modal */}
      {selectedConnectChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-[#f3f5f7] flex items-center justify-center">
                  {selectedConnectChannel === "Pinterest" ? (
                    <img src="/assets/platform-pinterest.svg" alt="" className="size-5" />
                  ) : (
                    <img src="/assets/platform-snapchat.svg" alt="" className="size-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#0d0d10]">
                    Connect {selectedConnectChannel}
                  </h3>
                  <p className="text-[12px] text-[#71717a]">Verify your stats and pin activity</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedConnectChannel(null)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-[13px]">
              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                  {selectedConnectChannel} profile handle or link
                </label>
                <input
                  type="text"
                  placeholder={`e.g. @ishitarao or ${selectedConnectChannel.toLowerCase()}.com/ishita`}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>
              <p className="text-[12px] text-[#71717a] leading-4">
                You will be redirected to {selectedConnectChannel} to grant read-only permissions for views, reach, and follower count.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setSelectedConnectChannel(null)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedConnectChannel(null);
                  showToast(`Connected ${selectedConnectChannel} successfully.`);
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <ExternalLink className="size-3.5" />
                <span>Authorize &amp; Connect</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 9: Add Tool Modal */}
      {isAddToolModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0d0d10]">Add Tool Integration</h3>
                <p className="text-[12px] text-[#71717a]">Connect workflow tools, cloud storage, or API webhook</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddToolModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { name: "Google Drive", desc: "Auto-sync raw footage and export deliverables" },
                { name: "Dropbox", desc: "Deliver high-res footage to brands seamlessly" },
                { name: "Notion", desc: "Sync campaign deliverables to your personal kanban" },
                { name: "Custom Webhook", desc: "Send real-time campaign milestone payloads" },
              ].map((tool) => (
                <div key={tool.name} className="p-3 border border-[#e3e5ec] rounded-lg flex items-center justify-between hover:bg-[#f8f9fb] transition">
                  <div>
                    <p className="text-[13px] font-medium text-[#0d0d10]">{tool.name}</p>
                    <p className="text-[11px] text-[#71717a]">{tool.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddToolModalOpen(false);
                      showToast(`Integrated ${tool.name} with your creator account.`);
                    }}
                    className="h-7 px-2.5 rounded border border-[#e3e5ec] text-[12px] font-medium text-[#0d0d10] hover:border-[#0d0d10]"
                  >
                    Install
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsAddToolModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 10: Add Payment Method Modal */}
      {isAddPaymentMethodModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0d0d10]">Add payment method</h3>
                <p className="text-[12px] text-[#71717a]">
                  Direct escrow disbursements for completed brand deals
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPaymentMethodModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-[13px]">
              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. ICICI Bank, Axis Bank, SBI"
                  id="new-bank-name"
                  defaultValue="ICICI Bank"
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter bank account number"
                  id="new-acc-num"
                  defaultValue="102938475612"
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. ICIC0001029"
                  id="new-ifsc"
                  defaultValue="ICIC0000047"
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                  Beneficiary Name
                </label>
                <input
                  type="text"
                  id="new-beneficiary"
                  defaultValue={name}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsAddPaymentMethodModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const bName = (document.getElementById("new-bank-name") as HTMLInputElement)?.value || "Bank Account";
                  const bNum = (document.getElementById("new-acc-num") as HTMLInputElement)?.value || "4821";
                  setBankAccount({
                    ...bankAccount,
                    bankName: bName,
                    accountNumberMasked: `···· ${bNum.slice(-4)}`,
                    verifiedDate: "verified just now",
                  });
                  setIsAddPaymentMethodModalOpen(false);
                  showToast("Payment method added successfully.");
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <Check className="size-4" />
                <span>Add method</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 11: Edit Bank Modal */}
      {isEditBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0d0d10]">Edit Bank Account</h3>
                <p className="text-[12px] text-[#71717a]">Update account details or set as primary</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditBankModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-[13px]">
              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankAccount.bankName}
                  onChange={(e) => setBankAccount({ ...bankAccount, bankName: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Account Holder</label>
                <input
                  type="text"
                  value={bankAccount.accountHolder}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountHolder: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Account Type</label>
                <select
                  value={bankAccount.accountType}
                  onChange={(e) => setBankAccount({ ...bankAccount, accountType: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                >
                  <option value="savings">Savings Account</option>
                  <option value="current">Current Account</option>
                </select>
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bankAccount.isDefault}
                  onChange={(e) => setBankAccount({ ...bankAccount, isDefault: e.target.checked })}
                  className="size-4 rounded border-[#e3e5ec] text-[#0d0d10] focus:ring-0"
                />
                <span className="text-[13px] text-[#070b13]">Default payment method</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditBankModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditBankModalOpen(false);
                  showToast("Bank account details saved.");
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <Check className="size-4" />
                <span>Save changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 12: Edit UPI Modal */}
      {isEditUpiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0d0d10]">Edit UPI ID</h3>
                <p className="text-[12px] text-[#71717a]">Instant transfer fallback</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditUpiModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-[13px]">
              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">UPI ID</label>
                <input
                  type="text"
                  value={upiDetails.upiId}
                  onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
                  placeholder="e.g. username@okhdfcbank"
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Note / Description</label>
                <input
                  type="text"
                  value={upiDetails.note}
                  onChange={(e) => setUpiDetails({ ...upiDetails, note: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditUpiModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditUpiModalOpen(false);
                  showToast("UPI details updated.");
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <Check className="size-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 13: Edit Tax Details Modal */}
      {isEditTaxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#e3e5ec] shadow-xl max-w-md w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-[#0d0d10]">Edit Tax details</h3>
                <p className="text-[12px] text-[#71717a]">Used on invoices generated for brands</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditTaxModalOpen(false)}
                className="size-8 rounded-md flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-[13px]">
              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Legal name</label>
                <input
                  type="text"
                  value={taxDetails.legalName}
                  onChange={(e) => setTaxDetails({ ...taxDetails, legalName: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">GSTIN</label>
                <input
                  type="text"
                  value={taxDetails.gstin}
                  onChange={(e) => setTaxDetails({ ...taxDetails, gstin: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Address</label>
                <input
                  type="text"
                  value={taxDetails.address}
                  onChange={(e) => setTaxDetails({ ...taxDetails, address: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Place of supply</label>
                <input
                  type="text"
                  value={taxDetails.placeOfSupply}
                  onChange={(e) => setTaxDetails({ ...taxDetails, placeOfSupply: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>

              <div>
                <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">Invoices to</label>
                <input
                  type="email"
                  value={taxDetails.invoicesTo}
                  onChange={(e) => setTaxDetails({ ...taxDetails, invoicesTo: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditTaxModalOpen(false)}
                className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditTaxModalOpen(false);
                  showToast("Tax details saved successfully.");
                }}
                className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
              >
                <Check className="size-4" />
                <span>Save tax details</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Launcher (Node 795:13700) */}
      <button
        type="button"
        onClick={() => showToast("Assistant chat is ready to help.")}
        className="fixed bottom-6 right-6 size-14 rounded-full bg-[#0d0d10] text-white flex items-center justify-center shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.18)] hover:scale-105 active:scale-95 transition cursor-pointer z-40"
        aria-label="Assistant chat"
      >
        <MessageCircle className="size-6 text-white" />
      </button>
    </CreatorShell>
  );
}
