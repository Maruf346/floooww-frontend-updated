import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronUp,
  ChevronDown,
  Check,
  Shield,
  Bell,
  Receipt,
  Users,
  Building2,
} from "lucide-react";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { AgencyAddClientModal } from "@/agency/components/AgencyAddClientModal";

type SettingsTab = "account" | "team" | "billing" | "notifications" | "security";

const SERVICE_OPTIONS = [
  "Influencer marketing",
  "UGC",
  "Paid social",
  "Creative strategy",
  "Content production",
  "Influencer casting",
];

const easeCurve = [0.22, 1, 0.36, 1] as const;

export function AgencySettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for "Account" tab
  const [agencyName, setAgencyName] = useState("Brightside Agency");
  const [websiteUrl, setWebsiteUrl] = useState("https://brightside.agency");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Influencer marketing",
    "UGC",
    "Paid social",
  ]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [gstin, setGstin] = useState("27AABCG1234M1Z5");
  const [instagram, setInstagram] = useState("instagram.com/brightside.agency");
  const [youtube, setYoutube] = useState("youtube.com/@brightsideagency");
  const [linkedin, setLinkedin] = useState("linkedin.com/company/brightside-agency");
  const [teamSize, setTeamSize] = useState("6 people · 4 account managers");
  const [aboutAgency, setAboutAgency] = useState(
    "Influencer-marketing agency · runs campaigns for 6 beauty brands and manages 14 creators"
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const servicesRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      showToast("Logo updated successfully.");
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSave = () => {
    showToast("Agency profile saved successfully.");
  };

  return (
    <AgencyShell onAddClient={() => setIsAddClientOpen(true)}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeCurve }}
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 pb-12"
      >
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-[#0d0d10] px-4 py-2.5 text-[13px] font-medium text-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
            {toastMessage}
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10] leading-[34px]">
            Settings
          </h1>
          <p className="text-[13px] text-[#0d0d10] font-normal leading-[20px]">
            Brightside Agency · agency workspace
          </p>
        </div>

        {/* Settings Body: 2 Columns */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Sub-navigation Menu */}
          <div className="w-full md:w-[240px] rounded-[12px] border border-[#e3e5ec] bg-white p-2 shrink-0 flex flex-col gap-0.5">
            {[
              {
                id: "account",
                title: "Account",
                subtitle: "Agency name, logo, website",
                icon: Building2,
              },
              {
                id: "team",
                title: "Team & roles",
                subtitle: "Members, clients, access levels",
                icon: Users,
              },
              {
                id: "billing",
                title: "Billing & tax",
                subtitle: "Your GSTIN, invoice template, how clients pay you",
                icon: Receipt,
              },
              {
                id: "notifications",
                title: "Notifications",
                subtitle: "Email, WhatsApp, in-app · per client",
                icon: Bell,
              },
              {
                id: "security",
                title: "Security",
                subtitle: "Password, 2-step, devices",
                icon: Shield,
              },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`w-full text-left rounded-[8px] px-3 py-2.5 transition cursor-pointer select-none ${
                    isActive
                      ? "bg-[#f1f4ff] text-[#0d0d10]"
                      : "hover:bg-[#f8f9fb] text-[#0d0d10]"
                  }`}
                >
                  <p
                    className={`text-[14px] leading-snug ${
                      isActive ? "font-medium text-[#0d0d10]" : "font-normal text-[#0d0d10]"
                    }`}
                  >
                    {tab.title}
                  </p>
                  <p className="text-[12px] text-[#a3a3ac] leading-tight mt-0.5 truncate">
                    {tab.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Main Content Panel */}
          <div className="flex-1 w-full min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "account" && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-6"
                >
                  {/* Card Head */}
                  <div className="flex flex-col gap-1 border-b border-[#edeff3] pb-4">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
                      Agency profile
                    </h2>
                    <p className="text-[12px] text-[#0d0d10] font-normal leading-4">
                      Shown to clients when you add them and on invoices · creators see the client brand, not the agency
                    </p>
                  </div>

                  {/* Logo Row */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3.5">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Agency Logo"
                          className="size-16 rounded-[12px] object-cover border border-[#e3e5ec]"
                        />
                      ) : (
                        <div className="size-16 rounded-[12px] bg-[#f1f4ff] grid place-items-center text-[16px] font-semibold text-[#0d0d10] shrink-0 border border-[#e3e5ec]">
                          BA
                        </div>
                      )}

                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleLogoUpload}
                          accept="image/png, image/jpeg"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:border-[#0d0d10] cursor-pointer"
                        >
                          <img
                            src="/assets/agency/icons/upload.svg"
                            alt=""
                            className="size-4 shrink-0"
                          />
                          <span>Upload logo</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#8591a3] font-normal leading-normal">
                      Square, at least 400 × 400 px, JPG or PNG. Shown next to your brand name on project pages and in creators’ invites.
                    </p>
                  </div>

                  {/* Form Grid */}
                  <div className="flex flex-col gap-4">
                    {/* Row 1: Agency name & Website URL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Agency name
                        </label>
                        <input
                          type="text"
                          value={agencyName}
                          onChange={(e) => setAgencyName(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Website URL
                        </label>
                        <input
                          type="text"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Services & GSTIN */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Services Custom Dropdown */}
                      <div className="relative" ref={servicesRef}>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Services
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className={`flex h-10 w-full items-center justify-between rounded-[8px] bg-white px-3 text-left transition cursor-pointer ${
                            isServicesOpen
                              ? "border border-[#0d0d10]"
                              : "border border-[#e3e5ec] hover:border-[#0d0d10]"
                          }`}
                        >
                          <span className="text-[13px] text-[#0d0d10] truncate">
                            {selectedServices.length > 0
                              ? selectedServices.join(" · ")
                              : "Select services"}
                          </span>
                          <div className="size-4 shrink-0 grid place-items-center text-[#71717a]">
                            {isServicesOpen ? (
                              <ChevronUp className="size-4 stroke-[1.8]" />
                            ) : (
                              <ChevronDown className="size-4 stroke-[1.8]" />
                            )}
                          </div>
                        </button>

                        {/* Dropdown Popover matching Dropdown spec */}
                        {isServicesOpen && (
                          <div className="absolute left-0 top-[calc(100%+4px)] z-40 w-full rounded-[10px] border border-[#e5e7eb] bg-white p-1.5 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] animate-in fade-in zoom-in-95 duration-100 flex flex-col gap-0.5">
                            {SERVICE_OPTIONS.map((service) => {
                              const isSelected = selectedServices.includes(service);
                              return (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => toggleService(service)}
                                  className={`flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-left text-[13px] transition cursor-pointer ${
                                    isSelected
                                      ? "bg-[#f1f4ff] text-[#0d0d10]"
                                      : "text-[#0d0d10] hover:bg-[#f8f9fb]"
                                  }`}
                                >
                                  <span>{service}</span>
                                  {isSelected && (
                                    <Check className="size-4 text-[#0d0d10] stroke-[2] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* GSTIN */}
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          GSTIN
                        </label>
                        <input
                          type="text"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Instagram & YouTube */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Instagram
                        </label>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          YouTube
                        </label>
                        <input
                          type="text"
                          value={youtube}
                          onChange={(e) => setYoutube(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 4: LinkedIn & Team size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                          Team size
                        </label>
                        <input
                          type="text"
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="h-10 w-full rounded-[8px] border border-[#e3e5ec] bg-white px-3 text-[13px] text-[#a2a7b3] focus:border-[#0d0d10] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 5: About the agency */}
                    <div>
                      <label className="text-[12px] font-medium text-[#0d0d10] block mb-1">
                        About the agency
                      </label>
                      <textarea
                        rows={4}
                        maxLength={300}
                        value={aboutAgency}
                        onChange={(e) => setAboutAgency(e.target.value)}
                        className="w-full rounded-[8px] border border-[#e3e5ec] bg-white p-3 text-[13px] text-[#0d0d10] focus:border-[#0d0d10] focus:outline-none resize-none leading-relaxed"
                      />
                      <div className="flex items-center justify-between text-[12px] text-[#a3a3ac] mt-1 font-normal">
                        <span>Shown to creators on every project page</span>
                        <span>{aboutAgency.length} / 300</span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex h-10 items-center justify-center rounded-[8px] bg-[#0d0d10] px-5 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Other tabs placeholders for subsequent tabs */}
              {activeTab === "team" && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-4"
                >
                  <div className="border-b border-[#edeff3] pb-3">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                      Team & roles
                    </h2>
                    <p className="text-[12px] text-[#71717a]">
                      Members, client access and permission scopes
                    </p>
                  </div>
                  <p className="text-[13px] text-[#71717a]">
                    Team & roles management view will be configured in the next tab step.
                  </p>
                </motion.div>
              )}

              {activeTab === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-4"
                >
                  <div className="border-b border-[#edeff3] pb-3">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                      Billing & tax (AG-05b)
                    </h2>
                    <p className="text-[12px] text-[#71717a]">
                      Your GSTIN, invoice template, and how clients pay you (FeeRules)
                    </p>
                  </div>
                  <p className="text-[13px] text-[#71717a]">
                    Billing & tax configuration will be implemented in the AG-05b step.
                  </p>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-4"
                >
                  <div className="border-b border-[#edeff3] pb-3">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                      Notifications (AG-05c)
                    </h2>
                    <p className="text-[12px] text-[#71717a]">
                      Email, WhatsApp, and in-app alerts per client & project scope
                    </p>
                  </div>
                  <p className="text-[13px] text-[#71717a]">
                    Notification scopes will be implemented in the AG-05c step.
                  </p>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: easeCurve }}
                  className="rounded-[12px] border border-[#e3e5ec] bg-white p-6 flex flex-col gap-4"
                >
                  <div className="border-b border-[#edeff3] pb-3">
                    <h2 className="text-[16px] font-semibold text-[#0d0d10]">
                      Security
                    </h2>
                    <p className="text-[12px] text-[#71717a]">
                      Password, two-factor authentication, and connected devices
                    </p>
                  </div>
                  <p className="text-[13px] text-[#71717a]">
                    Security settings will be implemented in the security step.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Add Client Modal */}
      <AgencyAddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSuccess={() => {}}
      />
    </AgencyShell>
  );
}
