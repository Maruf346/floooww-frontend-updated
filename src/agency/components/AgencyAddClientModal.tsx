import { useState, useEffect } from "react";
import { X, Check, Building2, Store, Users, ArrowRight } from "lucide-react";
import { CreatorNicheDropdown } from "@/creator/components/CreatorNicheDropdown";

type AgencyAddClientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (clientName: string) => void;
};

export function AgencyAddClientModal({
  isOpen,
  onClose,
  onSuccess,
}: AgencyAddClientModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("Beauty & skincare");
  const [storePlatform, setStorePlatform] = useState("shopify");
  const [teamEmail, setTeamEmail] = useState("");
  const [teamRole, setTeamRole] = useState("Admin");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !brandName.trim()) return;
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    } else if (step === 3) {
      setStep(4); // Confirmation
    } else {
      onSuccess(brandName || "New Client");
      onClose();
      setStep(1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#070b13]/40 p-4 animate-in fade-in duration-150"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        data-name="Modal · Add client"
        className="w-full max-w-[520px] rounded-[16px] bg-white p-6 shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.18)] flex flex-col gap-5 animate-in zoom-in-95 duration-150 border border-[#e3e5ec]"
      >
        <div className="flex items-center justify-between border-b border-[#e3e5ec] pb-4">
          <div>
            <h2 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
              {step === 4 ? "Client Workspace Created!" : "Add a New Client"}
            </h2>
            <p className="text-[12px] text-[#71717a]">
              {step === 4
                ? "The client workspace is live with Brightside Agency attached."
                : `Step ${step} of 3 · Setup client brand workspace`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step 1: About the Brand */}
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#0d0d10]">
              <Building2 size={16} className="text-[#014ef6]" />
              <span>1. About the Brand</span>
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Nykaa, Sugar Cosmetics"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                Website / Store URL
              </label>
              <input
                type="text"
                placeholder="https://brand.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
              />
            </div>
            <CreatorNicheDropdown
              value={category}
              onChange={setCategory}
              label="Category / Niche"
            />
          </div>
        )}

        {/* Step 2: Store & Analytics */}
        {step === 2 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#0d0d10]">
              <Store size={16} className="text-[#014ef6]" />
              <span>2. Store &amp; Analytics Integration</span>
            </div>
            <p className="text-[12px] text-[#71717a]">
              Connect the client’s e-commerce store to track conversions, ROAS, and creator sales automatically.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "shopify", name: "Shopify", desc: "Direct app integration" },
                { id: "woocommerce", name: "WooCommerce", desc: "Plugin or webhook" },
                { id: "custom", name: "Custom API", desc: "API key connection" },
                { id: "later", name: "Connect Later", desc: "Skip for now" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStorePlatform(item.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    storePlatform === item.id
                      ? "border-[#014ef6] bg-[#f1f4ff]"
                      : "border-[#e3e5ec] hover:border-[#0d0d10]"
                  }`}
                >
                  <p className="text-[13px] font-semibold text-[#0d0d10]">{item.name}</p>
                  <p className="text-[11px] text-[#71717a]">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Invite Client Team */}
        {step === 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#0d0d10]">
              <Users size={16} className="text-[#014ef6]" />
              <span>3. Invite Client Contacts</span>
            </div>
            <p className="text-[12px] text-[#71717a]">
              Client contacts get guest seats on their brand workspace (view, review, and approve content).
            </p>
            <div>
              <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                Client Contact Email
              </label>
              <input
                type="email"
                placeholder="poc@clientbrand.com"
                value={teamEmail}
                onChange={(e) => setTeamEmail(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                Access Level
              </label>
              <select
                value={teamRole}
                onChange={(e) => setTeamRole(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] bg-white focus:outline-none focus:border-[#0d0d10]"
              >
                <option>Owner (Full brand access)</option>
                <option>Admin (Manage campaigns &amp; content)</option>
                <option>Reviewer (Approve content &amp; view stats)</option>
                <option>Viewer (Read-only reports)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="flex flex-col items-center gap-3 py-4 text-center animate-in zoom-in-95 duration-150">
            <div className="size-12 rounded-full bg-[#e1fce3] text-[#16a34a] flex items-center justify-center">
              <Check size={24} className="stroke-[2.5]" />
            </div>
            <h3 className="text-[17px] font-semibold text-[#0d0d10]">
              {brandName || "New Client"} is Ready!
            </h3>
            <p className="text-[13px] text-[#71717a] max-w-sm">
              The client workspace has been configured with Brightside Agency as the managing agency. You can switch to this client anytime from the sidebar.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[#e3e5ec] pt-4 mt-2">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
              className="h-9 px-3.5 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {step < 4 && (
              <button
                type="button"
                onClick={onClose}
                className="h-9 px-3.5 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={step === 1 && !brandName.trim()}
              className="h-9 px-4 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
            >
              <span>{step === 4 ? "Open Workspace" : step === 3 ? "Create Client" : "Next"}</span>
              {step < 3 && <ArrowRight size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
