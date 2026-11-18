import { useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Circle,
  CircleCheck,
  Clock3,
  CreditCard,
  FileImage,
  FileText,
  Gift,
  Info,
  Landmark,
  Megaphone,
  Package,
  Pencil,
  Plus,
  Send,
  ShieldCheck,
  Smartphone,
  Trash2,
  Upload,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AgencyClientShell } from "../components/AgencyClientShell";
import { AGENCY_CLIENTS } from "../components/AgencyWorkspaceSwitcher";
import {
  ROUTES,
  agencyClientRoute,
  agencyClientProjectPublishedRoute,
} from "@/common/constants/routes";
import { Button } from "@/common/components/ui/Button";
import { Dropdown, MultiDropdown } from "@/common/components/ui/Dropdown";
import {
  getProjectDurationLabel,
  getProjectSteps,
  getProjectTarget,
  type ProjectDuration,
  type ProjectPartnership,
  type ProjectType,
} from "@/brand/context/ProjectFlowContext";

const NICHES = ["Beauty", "Skincare", "Fashion", "Lifestyle", "Wellness", "Fitness", "Other"];
const GENDER_OPTIONS = ["Any", "Mostly women", "Mostly men", "Balanced"];
const AGE_OPTIONS = ["13–17", "18–24", "25–34", "35–44", "45–54", "55+"];
const LOCATION_OPTIONS = ["Bengaluru", "Mumbai", "Delhi", "Andhra Pradesh", "Tamil Nadu", "Goa"];
const PLATFORMS = ["Instagram", "YouTube", "Snapchat", "Pinterest"] as const;
type Platform = (typeof PLATFORMS)[number];

const CONTENT_OPTIONS = [
  "Product demo (30 s)",
  "Unboxing (45 s)",
  "Product photo set (5)",
  "Before and after (15 s)",
  "Testimonial (60 s)",
  "How-to (30 s)",
  "Lifestyle photo set (5)",
  "Short ad cut (15 s)",
  "Routine walkthrough (60 s)",
];

type Deliverable = { id: number; platform: Platform; content: string; quantity: number };

export function AgencyClientNewProjectPage() {
  const params = useParams<{ clientId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const clientId = params.clientId || searchParams.get("client") || "minimalist";
  const activeClient =
    AGENCY_CLIENTS.find((c) => c.id === clientId) || {
      id: clientId,
      name: clientId.charAt(0).toUpperCase() + clientId.slice(1),
    };

  // State management across all 9 steps
  const initialType = searchParams.get("type") === "influencer" ? "Influencer marketing" : "UGC";
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const s = searchParams.get("step");
    if (s === "partnership" || s === "2") return 1;
    if (s === "duration" || s === "3") return 2;
    if (s === "details" || s === "4") return 3;
    if (s === "creators" || s === "5") return 4;
    if (s === "deliverables" || s === "6") return 5;
    if (s === "budget" || s === "7") return 6;
    if (s === "payment" || s === "8") return 7;
    if (s === "review" || s === "9") return 8;
    return 0;
  });

  const [projectType, setProjectType] = useState<ProjectType>(initialType);
  const [partnership, setPartnership] = useState<ProjectPartnership>("Paid");
  const [duration, setDuration] = useState<ProjectDuration>("One-time");

  // Step 4 Details
  const [projectName, setProjectName] = useState(
    initialType === "Influencer marketing" ? "Vitamin-C Serum" : "Glow Edit UGC Pack"
  );
  const [brief, setBrief] = useState(
    initialType === "Influencer marketing"
      ? "Show your glow using the Vitamin C Glow Serum, a 3-step routine before getting ready. Mention your code in the caption and pin the link in your story."
      : "Make three short videos and a photo set of the Vitamin C Glow Serum in a 3-step routine. You send raw files; nothing is posted on your channel."
  );
  const [languages, setLanguages] = useState(["English", "Hindi"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["Instagram", "YouTube"]);
  const [startDate, setStartDate] = useState("2026-10-07");
  const [endDate, setEndDate] = useState("2026-11-07");
  const [applyDeadline, setApplyDeadline] = useState("2026-10-12");
  const [banner, setBanner] = useState({
    name: "vitamin-c-serum-banner.jpg",
    size: "2.1 MB",
  });

  // Step 5 Creators
  const [creatorCount, setCreatorCount] = useState("10");
  const [selectedNiches, setSelectedNiches] = useState(["Beauty", "Skincare"]);
  const [gender, setGender] = useState("Mostly women");
  const [ages, setAges] = useState(["18–24", "25–34"]);
  const [location, setLocation] = useState("Bengaluru");
  const [turnaround, setTurnaround] = useState("Within 5 days");

  // Step 6 Deliverables
  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: 1, platform: "Instagram", content: "Product demo (30 s)", quantity: 2 },
    { id: 2, platform: "Instagram", content: "Product photo set (5)", quantity: 1 },
    { id: 3, platform: "YouTube", content: "Unboxing (45 s)", quantity: 1 },
  ]);

  // Step 7 Budget (for Paid)
  const [feeRange, setFeeRange] = useState("₹3,000 – ₹12,000");
  const numCreators = Math.max(1, Number(creatorCount.replace(/\D/g, "")) || 10);
  const creatorFees = numCreators * 10000;
  const gst = Math.round(creatorFees * 0.18);
  const totalBudget = creatorFees + gst;

  // Step 8 Payment (for Paid)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("upi");
  const [billingName, setBillingName] = useState(`${activeClient.name} Pvt Ltd`);
  const [gstin, setGstin] = useState("27AABCG1234M1Z5");
  const [placeOfSupply, setPlaceOfSupply] = useState("Maharashtra");
  const [invoiceEmail, setInvoiceEmail] = useState(`finance@${activeClient.id}.in`);

  // Step 9 Review & Publish
  const [agreed, setAgreed] = useState(true);
  const [saved, setSaved] = useState(false);

  // Stepper calculations (Gift exchange skips Budget & Payment)
  const isGift = partnership === "Gift exchange";
  const activeSteps = getProjectSteps(partnership);
  const totalStepsCount = activeSteps.length;

  const handleExit = () => {
    navigate(agencyClientRoute(clientId));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate(agencyClientRoute(clientId));
    } else {
      if (isGift && currentStep === 6) {
        // From Review back to Deliverables in Gift
        setCurrentStep(5);
      } else {
        setCurrentStep((prev) => prev - 1);
      }
    }
  };

  const handleContinue = () => {
    if (currentStep === 5 && isGift) {
      // In Gift mode, step 6 is Review & Publish
      setCurrentStep(6);
    } else if (currentStep < (isGift ? 6 : 8)) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handlePublish();
    }
  };

  const handleSaveDraft = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePublish = () => {
    // Store published project info for the published dashboard
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `floooww-client-${clientId}-latest-project`,
        JSON.stringify({
          name: projectName,
          type: projectType,
          partnership,
          duration,
          creators: numCreators,
          budget: isGift ? "Gift" : `₹${(totalBudget / 100000).toFixed(1)} L`,
          publishedAt: new Date().toISOString(),
        })
      );
    }
    // Navigate to published page in client mode
    navigate(agencyClientProjectPublishedRoute(clientId));
  };

  const handleBannerUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      });
    }
  };

  // Step index mapper for the Review card "Edit" buttons
  const goToStep = (stepIdx: number) => {
    setCurrentStep(stepIdx);
  };

  return (
    <AgencyClientShell activeClientId={clientId}>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-16">
        {/* Reviewer / Fast Navigation Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-[#e3e5ec] bg-[#f8f9fb] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-medium text-[#0d0d10]">
              Acting for {activeClient.name} · Step {currentStep + 1} of {totalStepsCount}:{" "}
              {activeSteps[currentStep] || "Review"}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-[#e3e5ec] bg-white p-0.5 text-[11px] font-medium">
            {activeSteps.map((s, idx) => (
              <button
                key={s}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`rounded-md px-2 py-0.5 transition-colors cursor-pointer ${
                  currentStep === idx
                    ? "bg-[#0d0d10] text-white"
                    : "text-[#71717a] hover:text-[#0d0d10]"
                }`}
              >
                {idx + 1}·{s}
              </button>
            ))}
          </div>
        </div>

        {/* Page Header (Figma 1716:6631 & 1716:6705) */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] font-normal leading-4 text-[#71717a]">
              Projects&nbsp;&nbsp;/&nbsp;&nbsp;New project
            </p>
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
              Create new project
            </h1>
            <p className="text-[13px] leading-5 text-[#71717a]">
              {saved ? "Draft saved just now" : "Saved as a draft automatically"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExit}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <X size={16} />
            <span>Exit</span>
          </button>
        </header>

        {/* Stepper (Figma 1716:6639 & 1716:6713) */}
        <section className="overflow-x-auto rounded-xl border border-[#e3e5ec] bg-white px-5 py-4 shadow-xs">
          <div className="flex min-w-[760px] items-start justify-between">
            {activeSteps.map((step, index) => {
              const isCurrent = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={step}
                  className="flex flex-1 flex-col items-center gap-1.5 cursor-pointer"
                  onClick={() => setCurrentStep(index)}
                >
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-[12px] font-medium transition-colors ${
                      isCurrent
                        ? "bg-[#0d0d10] text-white"
                        : isCompleted
                          ? "bg-[#16a34a] text-white"
                          : "border border-[#d4d7df] bg-white text-[#a3a3ac]"
                    }`}
                  >
                    {isCompleted ? <Check size={14} strokeWidth={2.5} /> : index + 1}
                  </span>
                  <span
                    className={`text-[12px] leading-4 text-center ${
                      isCurrent
                        ? "font-medium text-[#0d0d10]"
                        : isCompleted
                          ? "font-normal text-[#0d0d10]"
                          : "text-[#a3a3ac]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content Grid: Form (Left) + Project Setup Summary (Right) */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Left Form Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6 rounded-xl border border-[#e3e5ec] bg-white p-6 sm:p-8 shadow-xs"
          >
            {/* STEP 1: Type (Figma 1716:6626) */}
            {currentStep === 0 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 1 OF {totalStepsCount}
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Project type
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    This decides the deliverables and creator requirements you’ll see next.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      value: "UGC" as ProjectType,
                      title: "UGC",
                      icon: Camera,
                      desc: "Creators make photos and videos for you to post or use in ads. No posting on their channels.",
                    },
                    {
                      value: "Influencer marketing" as ProjectType,
                      title: "Influencer marketing",
                      icon: Users,
                      desc: "Creators post on their own Instagram, YouTube, Snapchat or Pinterest.",
                    },
                  ].map((option) => {
                    const isSelected = option.value === projectType;
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setProjectType(option.value)}
                        className={`flex min-h-[131px] flex-col gap-2.5 rounded-xl p-[18px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[1.5px] border-[#0d0d10] bg-[#f1f4ff]"
                            : "border border-[#e3e5ec] bg-white hover:border-[#0d0d10]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${
                              isSelected ? "bg-[#0d0d10] text-white" : "bg-[#f4f6fb] text-[#0d0d10]"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <span className="flex-1 text-[14px] font-semibold text-[#0d0d10]">
                            {option.title}
                          </span>
                          <div
                            className={`flex size-[18px] items-center justify-center rounded-full shrink-0 ${
                              isSelected
                                ? "border-2 border-[#0d0d10]"
                                : "border border-[#d4d7df] bg-white"
                            }`}
                          >
                            {isSelected && <div className="size-2.5 rounded-full bg-[#0d0d10]" />}
                          </div>
                        </div>
                        <p className="text-[13px] leading-5 text-[#71717a]">{option.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* STEP 2: Partnership (Figma 1716:6700) */}
            {currentStep === 1 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 2 OF {totalStepsCount}
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Partnership
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      value: "Paid" as ProjectPartnership,
                      title: "Paid",
                      icon: WalletCards,
                      desc: "You pay creators a fee from escrow. Money is held when you invite them and released after you approve.",
                    },
                    {
                      value: "Gift exchange" as ProjectPartnership,
                      title: "Gift exchange",
                      icon: Gift,
                      desc: "Creators get your product in return for content. No fee, you ship the product.",
                      tag: "Product value per creator · shipping",
                    },
                  ].map((option) => {
                    const isSelected = option.value === partnership;
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPartnership(option.value)}
                        className={`flex min-h-[171px] flex-col justify-between rounded-xl p-[18px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[1.5px] border-[#0d0d10] bg-[#f1f4ff]"
                            : "border border-[#e3e5ec] bg-white hover:border-[#0d0d10]"
                        }`}
                      >
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${
                                isSelected ? "bg-[#0d0d10] text-white" : "bg-[#f4f6fb] text-[#0d0d10]"
                              }`}
                            >
                              <Icon size={18} />
                            </div>
                            <span className="flex-1 text-[14px] font-semibold text-[#0d0d10]">
                              {option.title}
                            </span>
                            <div
                              className={`flex size-[18px] items-center justify-center rounded-full shrink-0 ${
                                isSelected
                                  ? "border-2 border-[#0d0d10]"
                                  : "border border-[#d4d7df] bg-white"
                              }`}
                            >
                              {isSelected && <div className="size-2.5 rounded-full bg-[#0d0d10]" />}
                            </div>
                          </div>
                          <p className="text-[13px] leading-5 text-[#0d0d10]">{option.desc}</p>
                        </div>
                        <div className="h-4 flex items-center">
                          {option.tag && (
                            <p className="text-[12px] text-[#a3a3ac] leading-4">{option.tag}</p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* STEP 3: Duration */}
            {currentStep === 2 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 3 OF {totalStepsCount}
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Project duration
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Select whether this is a one-time campaign or an ongoing long-term retainer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      value: "One-time" as ProjectDuration,
                      title: "One-time",
                      desc: "Single campaign with fixed deliverables, run once over 30 to 60 days.",
                    },
                    {
                      value: "Long-term" as ProjectDuration,
                      title: "Long-term",
                      desc: "Ongoing partnership renewed monthly or quarterly with retainer milestones.",
                    },
                  ].map((option) => {
                    const isSelected = option.value === duration;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDuration(option.value)}
                        className={`flex min-h-[131px] flex-col gap-2.5 rounded-xl p-[18px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[1.5px] border-[#0d0d10] bg-[#f1f4ff]"
                            : "border border-[#e3e5ec] bg-white hover:border-[#0d0d10]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${
                              isSelected ? "bg-[#0d0d10] text-white" : "bg-[#f4f6fb] text-[#0d0d10]"
                            }`}
                          >
                            <Clock3 size={18} />
                          </div>
                          <span className="flex-1 text-[14px] font-semibold text-[#0d0d10]">
                            {option.title}
                          </span>
                          <div
                            className={`flex size-[18px] items-center justify-center rounded-full shrink-0 ${
                              isSelected
                                ? "border-2 border-[#0d0d10]"
                                : "border border-[#d4d7df] bg-white"
                            }`}
                          >
                            {isSelected && <div className="size-2.5 rounded-full bg-[#0d0d10]" />}
                          </div>
                        </div>
                        <p className="text-[13px] leading-5 text-[#71717a]">{option.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* STEP 4: Details */}
            {currentStep === 3 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 4 OF {totalStepsCount}
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Project details
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Give your project a name and brief to introduce the campaign to creators.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                      Project name *
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[14px] text-[#0d0d10] focus:border-[#0d0d10] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                      Project brief description *
                    </label>
                    <textarea
                      rows={3}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      className="w-full rounded-lg border border-[#e3e5ec] p-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                        Campaign start date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[13px] text-[#0d0d10]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                        Campaign end date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[13px] text-[#0d0d10]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                      Platforms
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((p) => {
                        const active = selectedPlatforms.includes(p);
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() =>
                              setSelectedPlatforms((prev) =>
                                active ? prev.filter((item) => item !== p) : [...prev, p]
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg border text-[13px] font-medium transition-colors cursor-pointer ${
                              active
                                ? "border-[#0d0d10] bg-[#0d0d10] text-white"
                                : "border-[#e3e5ec] bg-white text-[#71717a] hover:border-[#0d0d10]"
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 5: Creators */}
            {currentStep === 4 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 5 OF {totalStepsCount}
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Creator requirements
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    We use this to rank creators by match score. Only required fields hide creators.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                      How many creators do you need?
                    </label>
                    <input
                      type="number"
                      value={creatorCount}
                      onChange={(e) => setCreatorCount(e.target.value)}
                      className="w-full max-w-[200px] rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[14px] text-[#0d0d10]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                      Niches *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {NICHES.map((n) => {
                        const active = selectedNiches.includes(n);
                        return (
                          <button
                            key={n}
                            type="button"
                            onClick={() =>
                              setSelectedNiches((prev) =>
                                active ? prev.filter((item) => item !== n) : [...prev, n]
                              )
                            }
                            className={`px-3 py-1.5 rounded-full border text-[13px] font-medium transition-colors cursor-pointer ${
                              active
                                ? "border-[#0d0d10] bg-[#f1f4ff] text-[#0d0d10]"
                                : "border-[#e3e5ec] bg-white text-[#71717a] hover:border-[#0d0d10]"
                            }`}
                          >
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                        Audience gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-lg border border-[#e3e5ec] px-3 py-2 text-[13px] text-[#0d0d10] bg-white"
                      >
                        {GENDER_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                        Target location
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-lg border border-[#e3e5ec] px-3 py-2 text-[13px] text-[#0d0d10] bg-white"
                      >
                        {LOCATION_OPTIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 6: Deliverables */}
            {currentStep === 5 && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 6 OF {totalStepsCount}
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Deliverables
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Specify what creators need to produce for this campaign.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {deliverables.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-[#e3e5ec] bg-[#f8f9fb]"
                    >
                      <span className="size-6 rounded-full bg-[#0d0d10] text-white text-[11px] font-medium flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#0d0d10]">{item.content}</p>
                        <p className="text-[12px] text-[#71717a]">{item.platform}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-[#71717a]">Qty:</span>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 1;
                            setDeliverables((prev) =>
                              prev.map((d) => (d.id === item.id ? { ...d, quantity: val } : d))
                            );
                          }}
                          className="w-14 rounded-md border border-[#e3e5ec] bg-white px-2 py-1 text-[13px] text-center"
                        />
                        <button
                          type="button"
                          onClick={() => setDeliverables((prev) => prev.filter((d) => d.id !== item.id))}
                          className="p-1 text-[#71717a] hover:text-[#dc2626]"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setDeliverables((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          platform: "Instagram",
                          content: "Product photo set (5)",
                          quantity: 1,
                        },
                      ]);
                    }}
                    className="inline-flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-[#d4d7df] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors"
                  >
                    <Plus size={16} />
                    <span>Add deliverable</span>
                  </button>
                </div>
              </>
            )}

            {/* STEP 7: Budget (only if Paid) */}
            {currentStep === 6 && !isGift && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 7 OF 9
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Project budget
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Set the creator fee range and total budget allocation for {activeClient.name}.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#0d0d10] mb-1.5">
                      Fee range per creator
                    </label>
                    <input
                      type="text"
                      value={feeRange}
                      onChange={(e) => setFeeRange(e.target.value)}
                      className="w-full rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[14px] text-[#0d0d10]"
                    />
                  </div>

                  <div className="rounded-xl border border-[#e3e5ec] bg-[#f8f9fb] p-4 flex flex-col gap-2.5 text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-[#71717a]">Estimated creator fees</span>
                      <span className="font-semibold text-[#0d0d10]">
                        ₹{creatorFees.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71717a]">Floooww fee</span>
                      <span className="font-semibold text-emerald-600">Free for brands</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71717a]">GST (18%) on fees</span>
                      <span className="text-[#0d0d10]">₹{gst.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="h-px bg-[#e3e5ec] my-1" />
                    <div className="flex justify-between text-[14px]">
                      <span className="font-bold text-[#0d0d10]">Total commitment</span>
                      <span className="font-bold text-[#0d0d10]">
                        ₹{totalBudget.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 8: Payment (only if Paid) */}
            {currentStep === 7 && !isGift && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP 8 OF 9
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Payment method
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Held in escrow and released only upon client approval of deliverables.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-[13px] font-medium transition-all ${
                        paymentMethod === "upi"
                          ? "border-[#0d0d10] bg-[#f1f4ff] text-[#0d0d10]"
                          : "border-[#e3e5ec] bg-white text-[#71717a]"
                      }`}
                    >
                      <Smartphone size={18} />
                      <span>UPI AutoPay</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-[13px] font-medium transition-all ${
                        paymentMethod === "card"
                          ? "border-[#0d0d10] bg-[#f1f4ff] text-[#0d0d10]"
                          : "border-[#e3e5ec] bg-white text-[#71717a]"
                      }`}
                    >
                      <CreditCard size={18} />
                      <span>Credit / Debit Card</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#0d0d10] mb-1">
                      Billing entity name
                    </label>
                    <input
                      type="text"
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                      className="w-full rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[13px] text-[#0d0d10]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-[#0d0d10] mb-1">
                        GSTIN
                      </label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        className="w-full rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[13px] text-[#0d0d10]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#0d0d10] mb-1">
                        Invoice email
                      </label>
                      <input
                        type="email"
                        value={invoiceEmail}
                        onChange={(e) => setInvoiceEmail(e.target.value)}
                        className="w-full rounded-lg border border-[#e3e5ec] px-3.5 py-2 text-[13px] text-[#0d0d10]"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 9 (or STEP 7 for Gift): Review and Publish */}
            {((!isGift && currentStep === 8) || (isGift && currentStep === 6)) && (
              <>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[12px] font-semibold tracking-[0.72px] text-[#0d0d10] uppercase">
                    STEP {totalStepsCount} OF {totalStepsCount}
                  </p>
                  <h2 className="text-[26px] font-bold leading-[34px] tracking-[-0.13px] text-[#0d0d10]">
                    Review and publish
                  </h2>
                  <p className="text-[14px] leading-[22px] text-[#71717a]">
                    Check everything once. Some fields lock after creators apply.
                  </p>
                </div>

                {/* Review Cards (Matching BrandProjectReviewPage) */}
                <div className="flex flex-col gap-3">
                  {/* Setup Card */}
                  <div className="flex items-start justify-between rounded-xl border border-[#e3e5ec] p-4 bg-white">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-semibold text-[#0d0d10]">Setup</h4>
                      <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
                        <div>
                          <dt className="text-[#71717a]">Type:</dt>
                          <dd className="font-medium text-[#0d0d10]">{projectType}</dd>
                        </div>
                        <div>
                          <dt className="text-[#71717a]">Partnership:</dt>
                          <dd className="font-medium text-[#0d0d10]">{partnership}</dd>
                        </div>
                        <div>
                          <dt className="text-[#71717a]">Duration:</dt>
                          <dd className="font-medium text-[#0d0d10]">{duration}</dd>
                        </div>
                      </dl>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(0)}
                      className="p-1 text-[#71717a] hover:text-[#0d0d10] flex items-center gap-1 text-[12px] font-medium"
                    >
                      <Pencil size={14} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Details Card */}
                  <div className="flex items-start justify-between rounded-xl border border-[#e3e5ec] p-4 bg-white">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-semibold text-[#0d0d10]">Details</h4>
                      <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
                        <div>
                          <dt className="text-[#71717a]">Name:</dt>
                          <dd className="font-medium text-[#0d0d10]">{projectName}</dd>
                        </div>
                        <div>
                          <dt className="text-[#71717a]">Dates:</dt>
                          <dd className="font-medium text-[#0d0d10]">
                            {startDate} – {endDate}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-[#71717a]">Platforms:</dt>
                          <dd className="font-medium text-[#0d0d10]">
                            {selectedPlatforms.join(", ")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="p-1 text-[#71717a] hover:text-[#0d0d10] flex items-center gap-1 text-[12px] font-medium"
                    >
                      <Pencil size={14} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Creators Card */}
                  <div className="flex items-start justify-between rounded-xl border border-[#e3e5ec] p-4 bg-white">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-semibold text-[#0d0d10]">Creators</h4>
                      <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
                        <div>
                          <dt className="text-[#71717a]">Creators needed:</dt>
                          <dd className="font-medium text-[#0d0d10]">{numCreators}</dd>
                        </div>
                        <div>
                          <dt className="text-[#71717a]">Niches:</dt>
                          <dd className="font-medium text-[#0d0d10]">
                            {selectedNiches.join(", ")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(4)}
                      className="p-1 text-[#71717a] hover:text-[#0d0d10] flex items-center gap-1 text-[12px] font-medium"
                    >
                      <Pencil size={14} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Deliverables Card */}
                  <div className="flex items-start justify-between rounded-xl border border-[#e3e5ec] p-4 bg-white">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-semibold text-[#0d0d10]">Deliverables</h4>
                      <div className="mt-2 text-[12px] flex flex-col gap-1">
                        {deliverables.map((d) => (
                          <div key={d.id} className="text-[#0d0d10]">
                            • {d.quantity}× {d.content} ({d.platform})
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(5)}
                      className="p-1 text-[#71717a] hover:text-[#0d0d10] flex items-center gap-1 text-[12px] font-medium"
                    >
                      <Pencil size={14} />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Budget & Payment (only if Paid) */}
                  {!isGift && (
                    <div className="flex items-start justify-between rounded-xl border border-[#e3e5ec] p-4 bg-white">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-semibold text-[#0d0d10]">
                          Budget & Payment
                        </h4>
                        <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
                          <div>
                            <dt className="text-[#71717a]">Total escrow:</dt>
                            <dd className="font-semibold text-[#0d0d10]">
                              ₹{totalBudget.toLocaleString("en-IN")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[#71717a]">Billing entity:</dt>
                            <dd className="font-medium text-[#0d0d10]">{billingName}</dd>
                          </div>
                        </dl>
                      </div>
                      <button
                        type="button"
                        onClick={() => goToStep(6)}
                        className="p-1 text-[#71717a] hover:text-[#0d0d10] flex items-center gap-1 text-[12px] font-medium"
                      >
                        <Pencil size={14} />
                        <span>Edit</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Terms agreement checkbox */}
                <label className="flex items-center gap-2.5 text-[13px] text-[#0d0d10] cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="size-4 rounded border-[#d4d7df] accent-[#0d0d10]"
                  />
                  <span>I agree to the project terms and creator code of conduct</span>
                </label>
              </>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center gap-3 border-t border-[#e3e5ec] pt-5 mt-2">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className="flex-1" />
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex h-10 items-center justify-center px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] rounded-lg transition-colors cursor-pointer"
              >
                Save draft
              </button>

              {((!isGift && currentStep === 8) || (isGift && currentStep === 6)) ? (
                <button
                  type="button"
                  disabled={!agreed}
                  onClick={handlePublish}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-5 text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>Publish project</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Right: Project Setup Sidebar */}
          <aside className="flex flex-col gap-4 rounded-xl border border-[#e3e5ec] bg-white p-5 shadow-xs">
            <div>
              <h3 className="text-[16px] font-semibold text-[#0d0d10]">Project setup</h3>
              <p className="text-[12px] text-[#71717a]">Shapes your dashboard</p>
            </div>

            <div className="flex flex-col gap-3 text-[13px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Target</span>
                <span className="font-medium text-[#0d0d10]">
                  {getProjectTarget(projectType, partnership, duration)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Type</span>
                <span className="font-medium text-[#0d0d10]">{projectType}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Partnership</span>
                <span
                  className={`font-medium ${
                    currentStep >= 1 ? "text-[#0d0d10]" : "text-[#a3a3ac]"
                  }`}
                >
                  {currentStep >= 1 ? partnership : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#71717a]">Duration</span>
                <span
                  className={`font-medium ${
                    currentStep >= 2 ? "text-[#0d0d10]" : "text-[#a3a3ac]"
                  }`}
                >
                  {currentStep >= 2
                    ? getProjectDurationLabel(partnership, duration)
                    : "-"}
                </span>
              </div>
            </div>

            <div className="h-px bg-[#e3e5ec]" />

            {/* Checklist */}
            <div className="flex flex-col gap-3">
              {activeSteps.map((label, stepIndex) => {
                const isStepActive = currentStep === stepIndex;
                const isStepDone = currentStep > stepIndex;

                return (
                  <div
                    key={label}
                    onClick={() => setCurrentStep(stepIndex)}
                    className="flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    {isStepDone ? (
                      <Check size={16} className="text-[#16a34a] shrink-0" strokeWidth={2.5} />
                    ) : isStepActive ? (
                      <Clock3 size={16} className="text-[#0d0d10] shrink-0" />
                    ) : (
                      <div className="size-4 rounded-full border border-[#d4d7df] shrink-0" />
                    )}
                    <span
                      className={`leading-tight ${
                        isStepActive
                          ? "text-[14px] font-medium text-[#0d0d10]"
                          : isStepDone
                            ? "text-[13px] text-[#0d0d10]"
                            : "text-[13px] text-[#a3a3ac]"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </AgencyClientShell>
  );
}
