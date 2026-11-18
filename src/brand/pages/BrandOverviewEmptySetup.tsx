import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Plus,
  Check,
  Megaphone,
  HelpCircle,
  ExternalLink,
  X,
  ShoppingBag,
  Store,
  Play,
  FileText,
  ArrowRight,
} from "lucide-react";
import { ROUTES } from "@/common/constants/routes";

export function BrandOverviewEmptySetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get("client") || "minimalist";

  // Modals state
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [storeConnected, setStoreConnected] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [overviewVideoOpen, setOverviewVideoOpen] = useState(false);

  const newProjectUrl = `${ROUTES.brandNewProject}?client=${clientId}`;

  return (
    <div className="relative pb-16">
      <div className="flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10]">
              Welcome, Ananya
            </h1>
            <p className="text-[13px] text-[#71717a]">
              Minimalist · Complete your account setup to start working with creators
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={newProjectUrl}
              className="inline-flex h-[40px] items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer shadow-sm"
            >
              <Plus size={16} />
              <span>Create new project</span>
            </Link>
          </div>
        </div>

        {/* Account Setup Card */}
        <div className="rounded-xl border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-sm">
          {/* Card head */}
          <div className="flex flex-col gap-0.5">
            <h2 className="text-[16px] font-semibold text-[#0d0d10]">Account setup</h2>
            <p className="text-[12px] text-[#71717a]">
              {storeConnected ? "2 of 3 steps complete · approx. 3 minutes" : "1 of 3 steps complete · approx. 5 minutes"}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-[6px] w-full overflow-hidden rounded-[3px] bg-[#edeff3]">
            <div
              className="h-full rounded-[3px] bg-[#0d0d10] transition-all duration-300"
              style={{ width: storeConnected ? "66.6%" : "33.3%" }}
            />
          </div>

          {/* Step 1: Business email verified */}
          <div className="flex items-center gap-3.5 border-b border-[#edeff3] py-3.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e1fce3] text-[#16a34a]">
              <Check size={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#0d0d10]">Business email verified</p>
              <p className="text-[12px] text-[#71717a]">ananya@minimalist.in</p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium text-[#16a34a] shrink-0">
              <span className="size-1.5 rounded-full bg-[#16a34a]" />
              <span>Complete</span>
            </div>
          </div>

          {/* Step 2: Connect your store */}
          <div className="flex items-center gap-3.5 border-b border-[#edeff3] py-3.5">
            <div
              className={`grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-medium ${
                storeConnected
                  ? "bg-[#e1fce3] text-[#16a34a]"
                  : "bg-[#f4f6fb] text-[#0d0d10]"
              }`}
            >
              {storeConnected ? <Check size={18} strokeWidth={2.5} /> : "2"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#0d0d10]">Connect your store</p>
              <p className="text-[12px] text-[#71717a]">
                For e-commerce brands. Enables automatic attribution of creator-driven sales and orders. Supports Shopify, WooCommerce and tracking links.
              </p>
            </div>
            {storeConnected ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium text-[#16a34a] shrink-0">
                <span className="size-1.5 rounded-full bg-[#16a34a]" />
                <span>Shopify connected</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setStoreModalOpen(true)}
                className="inline-flex h-8 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:bg-[#f4f6fb] shrink-0 cursor-pointer"
              >
                Connect store
              </button>
            )}
          </div>

          {/* Step 3: Create your first project */}
          <div className="flex items-center gap-3.5 py-3.5">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f4f6fb] text-[12px] font-medium text-[#0d0d10]">
              3
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#0d0d10]">Create your first project</p>
              <p className="text-[12px] text-[#71717a]">
                Select a project type. You will define the budget, brief and creator criteria in the next steps.
              </p>
            </div>
            <Link
              to={newProjectUrl}
              className="inline-flex h-8 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:bg-[#f4f6fb] shrink-0 cursor-pointer"
            >
              Start a project
            </Link>
          </div>

          {/* Nested Project Types (indented) */}
          <div className="pl-0 sm:pl-[50px] pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Influencer Marketing Card */}
              <div
                onClick={() => navigate(`${ROUTES.brandNewProject}?client=${clientId}&type=influencer`)}
                className="flex flex-col gap-2 rounded-lg border border-[#e3e5ec] bg-white p-4 transition-all hover:border-[#0d0d10] hover:shadow-sm cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[18px] font-bold text-[#0d0d10]">₹</span>
                  <ArrowRight size={14} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#0d0d10]">Influencer marketing</p>
                  <p className="mt-1 text-[12px] text-[#71717a]">
                    Creators publish sponsored content on their own channels
                  </p>
                  <p className="mt-1 text-[12px] text-[#a3a3ac]">
                    Paid or gift exchange
                  </p>
                </div>
              </div>

              {/* User-generated content Card */}
              <div
                onClick={() => navigate(`${ROUTES.brandNewProject}?client=${clientId}&type=ugc`)}
                className="flex flex-col gap-2 rounded-lg border border-[#e3e5ec] bg-white p-4 transition-all hover:border-[#0d0d10] hover:shadow-sm cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <Megaphone size={18} className="text-[#0d0d10]" />
                  <ArrowRight size={14} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#0d0d10]">User-generated content</p>
                  <p className="mt-1 text-[12px] text-[#71717a]">
                    Content produced for your brand channels and ads
                  </p>
                  <p className="mt-1 text-[12px] text-[#a3a3ac]">
                    Includes usage rights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Need help getting started? Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-[#f4f6fb] p-5 pr-6 sm:pr-12">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[14px] font-medium text-[#0d0d10]">Need help getting started?</h3>
            <p className="text-[12px] text-[#71717a]">
              Our assistant can draft a project from your brief, or you can review how similar brands structured their first project.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setGuideModalOpen(true)}
              className="inline-flex h-8 items-center justify-center rounded-lg px-3 text-[13px] font-medium text-[#0d0d10] hover:bg-black/5 transition cursor-pointer"
            >
              Read the guide
            </button>
            <button
              type="button"
              onClick={() => setOverviewVideoOpen(true)}
              className="inline-flex h-8 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] hover:bg-[#edeff3] transition cursor-pointer shadow-xs"
            >
              Watch overview
            </button>
          </div>
        </div>
      </div>

      {/* Connect Store Modal */}
      {storeModalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="presentation"
          onClick={() => setStoreModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[18px] font-semibold text-[#0d0d10]">Connect your store</h3>
                <p className="mt-1 text-[13px] text-[#71717a]">
                  Link Minimalist store to track sales attribution and creator coupon redemptions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStoreModalOpen(false)}
                className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div
                onClick={() => {
                  setStoreConnected(true);
                  setStoreModalOpen(false);
                }}
                className="flex items-center gap-3.5 rounded-xl border border-[#e3e5ec] p-3.5 hover:border-[#0d0d10] hover:bg-[#fcfdfd] transition-colors cursor-pointer group"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-[#95BF47]/15 text-[#95BF47] font-bold">
                  <ShoppingBag size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-[#0d0d10]">Shopify</p>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[12px] text-[#71717a]">
                    Instant 1-click sync for orders, discounts &amp; tracking.
                  </p>
                </div>
                <ArrowRight size={16} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
              </div>

              <div
                onClick={() => {
                  setStoreConnected(true);
                  setStoreModalOpen(false);
                }}
                className="flex items-center gap-3.5 rounded-xl border border-[#e3e5ec] p-3.5 hover:border-[#0d0d10] hover:bg-[#fcfdfd] transition-colors cursor-pointer group"
              >
                <div className="grid size-10 place-items-center rounded-lg bg-[#7F54B3]/15 text-[#7F54B3] font-bold">
                  <Store size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-[#0d0d10]">WooCommerce</p>
                  <p className="text-[12px] text-[#71717a]">
                    Connect via Consumer Key &amp; Webhook integration.
                  </p>
                </div>
                <ArrowRight size={16} className="text-[#a3a3ac] group-hover:text-[#0d0d10] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setStoreModalOpen(false)}
                className="h-9 px-4 text-[13px] font-medium text-[#71717a] hover:text-[#0d0d10] cursor-pointer"
              >
                Connect later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {guideModalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          role="presentation"
          onClick={() => setGuideModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid size-9 place-items-center rounded-full bg-[#f4f6fb] text-[#0d0d10]">
                  <FileText size={18} />
                </div>
                <h3 className="text-[17px] font-semibold text-[#0d0d10]">Getting Started Guide</h3>
              </div>
              <button
                type="button"
                onClick={() => setGuideModalOpen(false)}
                className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-[13px] text-[#71717a] leading-5">
              <p>
                Welcome to Floooww! Here is how agency and brand teams collaborate to run high-converting creator campaigns:
              </p>
              <div className="rounded-xl bg-[#f4f6fb] p-3.5 space-y-2 text-[#0d0d10]">
                <p className="font-semibold text-[13px]">1. Define your brief</p>
                <p className="text-[12px] text-[#71717a]">
                  Choose between Influencer marketing (sponsored posts on creator handles) or UGC (content for brand channels &amp; paid ads).
                </p>
                <p className="font-semibold text-[13px]">2. Invite or discover creators</p>
                <p className="text-[12px] text-[#71717a]">
                  Use Creator Discovery with verified engagement metrics and demographic filters across India &amp; global regions.
                </p>
                <p className="font-semibold text-[13px]">3. Review &amp; approve deliverables</p>
                <p className="text-[12px] text-[#71717a]">
                  All drafts and revisions are handled seamlessly inside the Content Hub with escrow protection.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setGuideModalOpen(false)}
                className="h-9 rounded-lg bg-[#0d0d10] px-4 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Overview Modal */}
      {overviewVideoOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          role="presentation"
          onClick={() => setOverviewVideoOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#e3e5ec]">
              <div className="flex items-center gap-2">
                <Play size={16} className="text-[#0d0d10]" />
                <h3 className="text-[16px] font-semibold text-[#0d0d10]">Platform Overview (2 min)</h3>
              </div>
              <button
                type="button"
                onClick={() => setOverviewVideoOpen(false)}
                className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 aspect-video rounded-xl bg-[#0d0d10] flex flex-col items-center justify-center text-white relative overflow-hidden group">
              <div className="grid size-14 place-items-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform cursor-pointer">
                <Play size={24} className="fill-white translate-x-0.5" />
              </div>
              <p className="mt-3 text-[13px] text-white/80">Interactive Video Walkthrough</p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOverviewVideoOpen(false)}
                className="h-9 rounded-lg bg-[#0d0d10] px-4 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
