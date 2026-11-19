import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AGENCY_CLIENTS } from "@/agency/components/AgencyWorkspaceSwitcher";
import { ROUTES, agencyClientNewProjectRoute } from "@/common/constants/routes";

const CATEGORIES = [
  "Beauty & skincare",
  "Fashion & apparel",
  "Food & beverage",
  "Health & wellness",
  "Home & living",
  "Tech & gadgets",
  "Men's grooming",
  "Fitness",
];

const COMPANY_SIZES = [
  "1–10 people",
  "11–50 people",
  "51–200 people",
  "201–500 people",
  "500+ people",
];

const BILLING_STATES = [
  "Maharashtra",
  "Karnataka",
  "Delhi NCR",
  "Tamil Nadu",
  "Gujarat",
  "Telangana",
  "Haryana",
  "Uttar Pradesh",
  "West Bengal",
  "Kerala",
  "Rajasthan",
];

const CLIENT_ROLES = [
  "Manager",
  "Owner",
  "Finance",
  "Content approver",
  "View only",
];

const BRIGHTSIDE_MANAGERS = [
  "Rahul Verma",
  "Priya Sharma",
  "Neha Kapoor",
  "Karan Mehta",
  "Sana Qureshi",
];

const BRIGHTSIDE_MEMBERS = [
  "Sana Qureshi · Approve content · all projects",
  "Karan Mehta · View only",
  "Neha Kapoor · Finance",
  "Priya Sharma · Account manager",
];

type ClientContact = {
  id: string;
  email: string;
  role: string;
};

const easeCurve = [0.22, 1, 0.36, 1] as const;

export function AgencyAddClientPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: About the client
  const [brandName, setBrandName] = useState("Minimalist");
  const [website, setWebsite] = useState("minimalist.in");
  const [category, setCategory] = useState("Beauty & skincare");
  const [companySize, setCompanySize] = useState("11–50 people");
  const [gstin, setGstin] = useState("27AABCG1234M1Z5");
  const [billingState, setBillingState] = useState("Maharashtra");

  // Step 2: Store & analytics
  const [isShopifyConnected, setIsShopifyConnected] = useState(true);
  const [isWooConnected, setIsWooConnected] = useState(false);

  // Step 3: Team & access
  const [contacts, setContacts] = useState<ClientContact[]>([
    { id: "1", email: "arjun@minimalist.in", role: "Manager" },
    { id: "2", email: "tanvi@minimalist.in", role: "Content approver" },
    { id: "3", email: "nisha@minimalist.in", role: "Finance" },
  ]);
  const [accountManager, setAccountManager] = useState("Rahul Verma");
  const [otherMembers, setOtherMembers] = useState(
    "Sana Qureshi · Approve content · all projects",
  );

  const [draftToast, setDraftToast] = useState(false);

  const handleSaveDraft = () => {
    setDraftToast(true);
    setTimeout(() => setDraftToast(false), 2500);
  };

  const handleAddContact = () => {
    setContacts((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        email: "",
        role: "Content approver",
      },
    ]);
  };

  const handleRemoveContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateContact = (
    id: string,
    field: "email" | "role",
    val: string,
  ) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c)),
    );
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!brandName.trim()) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!AGENCY_CLIENTS.some((c) => c.id === clientIdSlug)) {
        AGENCY_CLIENTS.push({
          id: clientIdSlug,
          name: brandName,
          category: category,
          statusText: `${category} · onboarding`,
          statusTone: "onboarding",
          initials: brandName.slice(0, 2).toUpperCase(),
          liveProjectsCount: 0,
        });
      }
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate(ROUTES.agencyClients);
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const clientIdSlug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "new-client";

  return (
    <AgencyShell>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-16">
        {/* Page Header */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[12px] text-[#8c94a0] leading-none">
              {step === 4 ? `Agency / Clients / ${brandName}` : "Agency / Clients / Add client"}
            </p>
            <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10] leading-[34px]">
              {step === 4 ? "Client added" : "Add a client"}
            </h1>
            <p className="text-[13px] text-[#0d0d10] font-normal leading-[20px]">
              {step === 4
                ? `${brandName} · ${category} · added just now · managed by Brightside Agency`
                : "Saved as a draft automatically · the client gets a workspace Brightside manages"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(ROUTES.agencyClients)}
            className="flex h-10 items-center gap-2 rounded-lg px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer"
          >
            <X size={16} />
            <span>Exit</span>
          </button>
        </div>

        {/* Stepper (Steps 1 to 3) */}
        {step < 4 && (
          <div className="flex items-center rounded-xl border border-[#e3e5ec] bg-white px-5 py-4">
            {/* Step 1 */}
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`grid size-7 place-items-center rounded-full text-[12px] font-medium transition-colors ${
                  step === 1
                    ? "bg-[#0d0d10] text-white"
                    : step > 1
                      ? "bg-emerald-500 text-white"
                      : "border border-[#d4d7df] bg-white text-[#a3a3ac]"
                }`}
              >
                {step > 1 ? <Check size={14} strokeWidth={2.5} /> : "1"}
              </div>
              <span
                className={`text-[12px] leading-none ${
                  step === 1 ? "font-semibold text-[#0d0d10]" : "text-[#71717a]"
                }`}
              >
                About the client
              </span>
            </div>

            <div className="h-px flex-1 max-w-[60px] bg-[#e3e5ec]" />

            {/* Step 2 */}
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`grid size-7 place-items-center rounded-full text-[12px] font-medium transition-colors ${
                  step === 2
                    ? "bg-[#0d0d10] text-white"
                    : step > 2
                      ? "bg-emerald-500 text-white"
                      : "border border-[#d4d7df] bg-white text-[#a3a3ac]"
                }`}
              >
                {step > 2 ? <Check size={14} strokeWidth={2.5} /> : "2"}
              </div>
              <span
                className={`text-[12px] leading-none ${
                  step === 2 ? "font-semibold text-[#0d0d10]" : "text-[#71717a]"
                }`}
              >
                Store &amp; analytics
              </span>
            </div>

            <div className="h-px flex-1 max-w-[60px] bg-[#e3e5ec]" />

            {/* Step 3 */}
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`grid size-7 place-items-center rounded-full text-[12px] font-medium transition-colors ${
                  step === 3
                    ? "bg-[#0d0d10] text-white"
                    : "border border-[#d4d7df] bg-white text-[#a3a3ac]"
                }`}
              >
                3
              </div>
              <span
                className={`text-[12px] leading-none ${
                  step === 3 ? "font-semibold text-[#0d0d10]" : "text-[#71717a]"
                }`}
              >
                Team &amp; access
              </span>
            </div>
          </div>
        )}

        {/* Main 2-Column Content */}
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Column: Form Card / Completion Card */}
          <div className="flex-1 w-full rounded-2xl border border-[#e3e5ec] bg-white p-6 sm:p-8 shadow-xs">
            <AnimatePresence mode="wait">
              {/* STEP 1: ABOUT THE CLIENT */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: easeCurve }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-semibold tracking-[0.72px] uppercase text-[#0d0d10]">
                      STEP 1 OF 3
                    </span>
                    <h2 className="text-[26px] font-bold text-[#0d0d10] tracking-[-0.13px] leading-tight">
                      About the client
                    </h2>
                    <p className="text-[14px] text-[#0d0d10] leading-snug">
                      Shows on the client’s projects, creators see the brand, not the agency.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                          Client brand name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Minimalist"
                          className="h-10 w-full rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                          Website
                        </label>
                        <input
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="e.g. minimalist.in"
                          className="h-10 w-full rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="h-10 w-full appearance-none rounded-lg border border-[#e3e5ec] bg-white px-3 pr-8 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors cursor-pointer"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-3 text-[#8c94a0]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                          Company size
                        </label>
                        <div className="relative">
                          <select
                            value={companySize}
                            onChange={(e) => setCompanySize(e.target.value)}
                            className="h-10 w-full appearance-none rounded-lg border border-[#e3e5ec] bg-white px-3 pr-8 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors cursor-pointer"
                          >
                            {COMPANY_SIZES.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-3 text-[#8c94a0]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: GSTIN */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                        GSTIN (optional)
                      </label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        placeholder="27AABCG1234M1Z5"
                        className="h-10 w-full rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors"
                      />
                      <p className="text-[12px] text-[#a3a3ac] leading-none">
                        Added to service fee invoices so you can claim input tax credit.
                      </p>
                    </div>

                    {/* Row 4: Billing State */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                        Billing state
                      </label>
                      <div className="relative">
                        <select
                          value={billingState}
                          onChange={(e) => setBillingState(e.target.value)}
                          className="h-10 w-full appearance-none rounded-lg border border-[#e3e5ec] bg-white px-3 pr-8 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors cursor-pointer"
                        >
                          {BILLING_STATES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-3 text-[#8c94a0]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Footer */}
                  <div className="flex items-center justify-between border-t border-[#e3e5ec] pt-5 mt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex h-10 items-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="h-10 px-4 text-[14px] font-medium text-[#0d0d10] hover:text-[#71717a] transition-colors cursor-pointer"
                      >
                        Save draft
                      </button>

                      <button
                        type="button"
                        onClick={handleContinue}
                        disabled={!brandName.trim()}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-5 text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <span>Continue</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: STORE & ANALYTICS */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: easeCurve }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-semibold tracking-[0.72px] uppercase text-[#0d0d10]">
                      STEP 2 OF 3
                    </span>
                    <h2 className="text-[26px] font-bold text-[#0d0d10] tracking-[-0.13px] leading-tight">
                      Connect the client’s store and analytics
                    </h2>
                    <p className="text-[14px] text-[#0d0d10] leading-snug">
                      Needed to track the client’s sales and ROAS · the client can authorise now, or you send them a secure link.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {/* Shopify Integration */}
                    <div
                      className={`flex items-center justify-between px-[14px] py-[12px] rounded-[12px] border transition-all ${
                        isShopifyConnected
                          ? "border-[#86efac] bg-white"
                          : "border-[#e5e7eb] bg-white hover:border-[#0d0d10]"
                      }`}
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="size-[36px] rounded-[8px] bg-[#5e8e3e] flex items-center justify-center text-white font-bold text-[15px] shrink-0">
                          S
                        </div>
                        <div className="flex flex-col gap-[2px]">
                          <h4 className="text-[14px] font-semibold text-[#070b13] leading-none">
                            Shopify
                          </h4>
                          <p className="text-[12px] text-[#6b7280] leading-normal">
                            Orders and net sales from creator codes and links
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsShopifyConnected(!isShopifyConnected)}
                        className={`transition cursor-pointer ${
                          isShopifyConnected
                            ? "bg-[#e1fce3] px-[8px] py-[2px] rounded-full flex items-center gap-[6px] text-[12px] font-medium text-[#16a34a]"
                            : "h-[32px] px-[12px] rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb]"
                        }`}
                      >
                        {isShopifyConnected ? (
                          <>
                            <span className="size-[6px] rounded-full bg-[#16a34a]" />
                            <span>Connected</span>
                          </>
                        ) : (
                          "Connect"
                        )}
                      </button>
                    </div>

                    {/* WooCommerce Integration */}
                    <div
                      className={`flex items-center justify-between px-[14px] py-[12px] rounded-[12px] border transition-all ${
                        isWooConnected
                          ? "border-[#86efac] bg-white"
                          : "border-[#e5e7eb] bg-white hover:border-[#0d0d10]"
                      }`}
                    >
                      <div className="flex items-center gap-[12px]">
                        <div className="size-[36px] rounded-[8px] bg-[#7f54b3] flex items-center justify-center text-white font-bold text-[15px] shrink-0">
                          W
                        </div>
                        <div className="flex flex-col gap-[2px]">
                          <h4 className="text-[14px] font-semibold text-[#070b13] leading-none">
                            WooCommerce
                          </h4>
                          <p className="text-[12px] text-[#6b7280] leading-normal">
                            Orders from WordPress stores
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsWooConnected(!isWooConnected)}
                        className={`transition cursor-pointer ${
                          isWooConnected
                            ? "bg-[#e1fce3] px-[8px] py-[2px] rounded-full flex items-center gap-[6px] text-[12px] font-medium text-[#16a34a]"
                            : "h-[32px] px-[12px] rounded-[8px] border border-[#e3e5ec] bg-white text-[13px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb]"
                        }`}
                      >
                        {isWooConnected ? (
                          <>
                            <span className="size-[6px] rounded-full bg-[#16a34a]" />
                            <span>Connected</span>
                          </>
                        ) : (
                          "Connect"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Step 2 Footer */}
                  <div className="flex items-center justify-between border-t border-[#e3e5ec] pt-5 mt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex h-10 items-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="h-10 px-4 text-[14px] font-medium text-[#0d0d10] hover:text-[#71717a] transition-colors cursor-pointer"
                      >
                        Save draft
                      </button>

                      <button
                        type="button"
                        onClick={handleContinue}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-5 text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer"
                      >
                        <span>Continue</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: TEAM & ACCESS */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: easeCurve }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-semibold tracking-[0.72px] uppercase text-[#0d0d10]">
                      STEP 3 OF 3
                    </span>
                    <h2 className="text-[26px] font-bold text-[#0d0d10] tracking-[-0.13px] leading-tight">
                      Invite the client’s team and assign yours
                    </h2>
                    <p className="text-[14px] text-[#0d0d10] leading-snug">
                      Client contacts get a guest seat (view &amp; approve) · your team members get access per project.
                    </p>
                  </div>

                  {/* Client Contacts List */}
                  <div className="space-y-3">
                    {contacts.map((contact, idx) => (
                      <div
                        key={contact.id}
                        className="grid grid-cols-1 sm:grid-cols-[2fr_1.2fr_auto] items-end gap-3"
                      >
                        <div className="flex flex-col gap-1.5">
                          {idx === 0 && (
                            <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                              Client contact · work email
                            </label>
                          )}
                          <input
                            type="email"
                            value={contact.email}
                            onChange={(e) =>
                              handleUpdateContact(contact.id, "email", e.target.value)
                            }
                            placeholder="name@client.in"
                            className="h-10 w-full rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          {idx === 0 && (
                            <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                              Role
                            </label>
                          )}
                          <div className="relative">
                            <select
                              value={contact.role}
                              onChange={(e) =>
                                handleUpdateContact(contact.id, "role", e.target.value)
                              }
                              className="h-10 w-full appearance-none rounded-lg border border-[#e3e5ec] bg-white px-3 pr-8 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors cursor-pointer"
                            >
                              {CLIENT_ROLES.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="pointer-events-none absolute right-3 top-3 text-[#8c94a0]"
                            />
                          </div>
                        </div>

                        {contacts.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveContact(contact.id)}
                            className="h-10 w-10 flex items-center justify-center rounded-lg text-[#8c94a0] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                            title="Remove contact"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddContact}
                      className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-primary-hover transition cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>+ Add another client contact</span>
                    </button>
                  </div>

                  <div className="h-px bg-[#e3e5ec]" />

                  {/* Agency Team Assignments */}
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                        Account manager (Brightside)
                      </label>
                      <div className="relative">
                        <select
                          value={accountManager}
                          onChange={(e) => setAccountManager(e.target.value)}
                          className="h-10 w-full appearance-none rounded-lg border border-[#e3e5ec] bg-white px-3 pr-8 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors cursor-pointer"
                        >
                          {BRIGHTSIDE_MANAGERS.map((mgr) => (
                            <option key={mgr} value={mgr}>
                              {mgr}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-3 text-[#8c94a0]"
                        />
                      </div>
                      <p className="text-[12px] text-[#a3a3ac] leading-none">
                        Owns this client · sees everything
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] font-medium leading-none text-[#0d0d10]">
                        Other Brightside members
                      </label>
                      <div className="relative">
                        <select
                          value={otherMembers}
                          onChange={(e) => setOtherMembers(e.target.value)}
                          className="h-10 w-full appearance-none rounded-lg border border-[#e3e5ec] bg-white px-3 pr-8 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none transition-colors cursor-pointer"
                        >
                          {BRIGHTSIDE_MEMBERS.map((mem) => (
                            <option key={mem} value={mem}>
                              {mem}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-3 text-[#8c94a0]"
                        />
                      </div>
                      <p className="text-[12px] text-[#a3a3ac] leading-none">
                        Add members with a project and an access level
                      </p>
                    </div>
                  </div>

                  {/* Step 3 Footer */}
                  <div className="flex items-center justify-between border-t border-[#e3e5ec] pt-5 mt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex h-10 items-center gap-2 rounded-lg border border-[#e3e5ec] bg-white px-4 text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="h-10 px-4 text-[14px] font-medium text-[#0d0d10] hover:text-[#71717a] transition-colors cursor-pointer"
                      >
                        Save draft
                      </button>

                      <button
                        type="button"
                        onClick={handleContinue}
                        className="flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-5 text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer shadow-xs"
                      >
                        <span>Add client</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: CLIENT ADDED (COMPLETION SCREEN) */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: easeCurve }}
                  className="flex flex-col gap-6"
                >
                  {/* Status Banner */}
                  <div className="flex items-center gap-[14px]">
                    <div className="grid size-[44px] place-items-center rounded-full bg-[#e1fce3] text-[#16a34a] shrink-0">
                      <Check size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                      <h2 className="text-[22px] font-semibold text-[#070b13] leading-none">
                        {brandName} is now your client
                      </h2>
                      <p className="text-[14px] text-[#8491a3] leading-normal">
                        The client workspace is ready. Nothing is charged until the client funds a project.
                      </p>
                    </div>
                  </div>

                  {/* What happens next Card */}
                  <div className="rounded-[12px] border border-[#e5e7eb] bg-white flex flex-col overflow-hidden">
                    <div className="pb-[12px] pt-[16px] px-[20px] flex flex-col gap-[2px]">
                      <h3 className="text-[16px] font-semibold text-[#070b13] leading-none">
                        What happens next
                      </h3>
                      <p className="text-[13px] text-[#8491a3] leading-normal">
                        Every client runs the same way. Kreyio reminds both sides of each step.
                      </p>
                    </div>

                    <div className="divide-y divide-[#edeff3]">
                      {[
                        {
                          num: 1,
                          title: "Create the client’s first project",
                          desc: "Type, partnership, duration, creators, deliverables, budget, same flow as a brand.",
                        },
                        {
                          num: 2,
                          title: "Client approves the budget and funds escrow",
                          desc: `${brandName} pays into escrow; you or the client can trigger funding.`,
                        },
                        {
                          num: 3,
                          title: "Invite creators and run the project as usual",
                          desc: "Approvals, payments and shipments work exactly as in a brand workspace.",
                        },
                        {
                          num: 4,
                          title: "Client contacts can view and approve content",
                          desc: "Guest seats: view & approve · nothing else unless you change the access level.",
                        },
                        {
                          num: 5,
                          title: "Results show in the client’s Performance and your Reports",
                          desc: "Client sees the same numbers you do · cross-client view in Reports.",
                        },
                        {
                          num: 6,
                          title: "Your agency fee is invoiced monthly",
                          desc: "Service fees billed from Billing · GST invoice to the client.",
                        },
                      ].map((item) => (
                        <div key={item.num} className="flex items-start gap-[14px] px-[20px] py-[12px]">
                          <span className="grid size-[26px] place-items-center rounded-full bg-[#f1f4ff] text-[12px] font-semibold text-[#3b5bff] shrink-0 mt-0.5">
                            {item.num}
                          </span>
                          <div className="flex flex-col gap-[2px]">
                            <p className="text-[14px] font-medium text-[#070b13] leading-snug">
                              {item.title}
                            </p>
                            <p className="text-[13px] text-[#8491a3] leading-normal">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between border-t border-[#e3e5ec] pt-[20px]">
                    <button
                      type="button"
                      onClick={() => navigate(`/agency/client/${clientIdSlug}`)}
                      className="flex h-[40px] items-center gap-[8px] rounded-[8px] border border-[#e3e5ec] bg-white px-[16px] text-[14px] font-medium text-[#0d0d10] hover:bg-[#f4f6fb] transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      <span>Open client workspace</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate(agencyClientNewProjectRoute(clientIdSlug))}
                      className="flex h-[40px] items-center gap-[8px] rounded-[8px] bg-[#0d0d10] px-[16px] text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Create their first project</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Client setup Sidebar */}
          <div className="w-full lg:w-[320px] shrink-0 rounded-2xl border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-xs">
            <div>
              <h3 className="text-[16px] font-semibold text-[#0d0d10] leading-tight">
                Client setup
              </h3>
              <p className="text-[12px] text-[#8c94a0] mt-0.5">What the client will see</p>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-[#71717a]">Client</span>
                <span className="font-medium text-[#0d0d10] truncate max-w-[170px]">
                  {brandName || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#71717a]">Store</span>
                <span className="font-medium text-[#0d0d10]">
                  {isShopifyConnected
                    ? "Shopify · connected"
                    : isWooConnected
                      ? "Woo · connected"
                      : "Not connected"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#71717a]">Team</span>
                <span className="font-medium text-[#0d0d10]">
                  {step >= 3
                    ? `${contacts.filter((c) => c.email.trim()).length || 2} contacts · ${accountManager}`
                    : "—"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#71717a]">Managed by</span>
                <span className="font-medium text-[#0d0d10]">Brightside Agency</span>
              </div>
            </div>

            <div className="h-px bg-[#e3e5ec]" />

            {/* Steps / Checklist Indicators */}
            <div className="space-y-3 text-[13px]">
              <div
                className={`flex items-center gap-2.5 ${
                  step === 1 ? "font-semibold text-[#0d0d10]" : step > 1 ? "text-[#0d0d10]" : "text-[#a3a3ac]"
                }`}
              >
                {step > 1 ? (
                  <Check size={16} className="text-emerald-500 shrink-0" />
                ) : (
                  <ArrowRight size={16} className="text-[#0d0d10] shrink-0" />
                )}
                <span>About the client</span>
              </div>

              <div
                className={`flex items-center gap-2.5 ${
                  step === 2
                    ? "font-semibold text-[#0d0d10]"
                    : step > 2
                      ? "text-[#0d0d10]"
                      : "text-[#a3a3ac]"
                }`}
              >
                {step > 2 ? (
                  <Check size={16} className="text-emerald-500 shrink-0" />
                ) : step === 2 ? (
                  <ArrowRight size={16} className="text-[#0d0d10] shrink-0" />
                ) : (
                  <Clock size={16} className="shrink-0 text-[#a3a3ac]" />
                )}
                <span>Store &amp; analytics</span>
              </div>

              <div
                className={`flex items-center gap-2.5 ${
                  step === 3
                    ? "font-semibold text-[#0d0d10]"
                    : step > 3
                      ? "text-[#0d0d10]"
                      : "text-[#a3a3ac]"
                }`}
              >
                {step > 3 ? (
                  <Check size={16} className="text-emerald-500 shrink-0" />
                ) : step === 3 ? (
                  <ArrowRight size={16} className="text-[#0d0d10] shrink-0" />
                ) : (
                  <Clock size={16} className="shrink-0 text-[#a3a3ac]" />
                )}
                <span>Team &amp; access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-save Draft Toast */}
      {draftToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-[#0d0d10] px-4 py-2.5 text-[13px] font-medium text-white shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check size={16} className="text-emerald-400" />
          <span>Draft saved automatically</span>
        </div>
      )}
    </AgencyShell>
  );
}
