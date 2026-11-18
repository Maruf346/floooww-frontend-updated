import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Plus,
  Check,
  Megaphone,
  MessageSquare,
  X,
  Sparkles,
  ShoppingBag,
  Store,
  Play,
  FileText,
  ArrowRight,
  TrendingUp,
  Clock,
  CircleDollarSign,
  Users,
} from "lucide-react";
import { AgencyClientShell } from "../components/AgencyClientShell";
import { AGENCY_CLIENTS } from "../components/AgencyWorkspaceSwitcher";
import { ROUTES } from "@/common/constants/routes";

export function AgencyClientOverviewPage() {
  const params = useParams<{ clientId?: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = params.clientId || searchParams.get("client") || "minimalist";

  const activeClient =
    AGENCY_CLIENTS.find((c) => c.id === clientId) || {
      id: clientId,
      name: clientId.charAt(0).toUpperCase() + clientId.slice(1),
      category: "Beauty & skincare",
    };

  const [viewState, setViewState] = useState<"setup" | "campaigns">("setup");
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [storeConnected, setStoreConnected] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [overviewVideoOpen, setOverviewVideoOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<"influencer" | "ugc" | null>(null);

  const [chatMessages, setChatMessages] = useState<Array<{ role: "assistant" | "user"; text: string }>>([
    {
      role: "assistant",
      text: `Hi Rahul! Acting on behalf of ${activeClient.name}. How can I assist with this client workspace today?`,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setInputMessage("");
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      {
        role: "assistant",
        text: `I've prepared recommended creator tiers and brief targets for ${activeClient.name}. Click "Create new project" to launch the campaign brief!`,
      },
    ]);
  };

  const handleStartProject = (type?: "influencer" | "ugc") => {
    setSelectedProjectType(type || "influencer");
    setNewProjectModalOpen(true);
  };

  return (
    <AgencyClientShell activeClientId={clientId}>
      <div className="relative pb-16">
        {/* Reviewer / State Toggle Pill */}
        <div className="mb-4 flex items-center justify-between rounded-lg border border-[#e3e5ec] bg-[#f8f9fb] px-3.5 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-medium text-[#0d0d10]">
              Agency Client Workspace: {activeClient.name} (Figma 1716:668)
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[#e3e5ec] bg-white p-0.5 text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setViewState("setup")}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                viewState === "setup"
                  ? "bg-[#0d0d10] text-white"
                  : "text-[#71717a] hover:text-[#0d0d10]"
              }`}
            >
              Step 1 · Setup (1716:668)
            </button>
            <button
              type="button"
              onClick={() => setViewState("campaigns")}
              className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
                viewState === "campaigns"
                  ? "bg-[#0d0d10] text-white"
                  : "text-[#71717a] hover:text-[#0d0d10]"
              }`}
            >
              Active campaigns
            </button>
          </div>
        </div>

        {viewState === "setup" ? (
          /* Step 1 · Setup / No campaigns yet (Figma Node 1716:668) */
          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="text-[26px] font-bold tracking-[-0.13px] text-[#0d0d10]">
                  Welcome, Ananya
                </h1>
                <p className="text-[13px] text-[#71717a]">
                  {activeClient.name} · Complete your account setup to start working with creators
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleStartProject()}
                  className="inline-flex h-[40px] items-center justify-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-black cursor-pointer shadow-sm"
                >
                  <Plus size={16} />
                  <span>Create new project</span>
                </button>
              </div>
            </div>

            {/* Account Setup Card (1716:682) */}
            <div className="rounded-xl border border-[#e3e5ec] bg-white p-5 flex flex-col gap-4 shadow-sm">
              {/* Card head */}
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[16px] font-semibold text-[#0d0d10]">Account setup</h2>
                <p className="text-[12px] text-[#71717a]">
                  {storeConnected
                    ? "2 of 3 steps complete · approx. 3 minutes"
                    : "1 of 3 steps complete · approx. 5 minutes"}
                </p>
              </div>

              {/* Progress Bar (1716:687) */}
              <div className="h-[6px] w-full overflow-hidden rounded-[3px] bg-[#edeff3]">
                <div
                  className="h-full rounded-[3px] bg-[#0d0d10] transition-all duration-300"
                  style={{ width: storeConnected ? "66.6%" : "33.3%" }}
                />
              </div>

              {/* Step 1: Business email verified (1716:689) */}
              <div className="flex items-center gap-3.5 border-b border-[#edeff3] py-3.5">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e1fce3] text-[#16a34a]">
                  <Check size={18} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[#0d0d10]">Business email verified</p>
                  <p className="text-[12px] text-[#71717a]">
                    ananya@{activeClient.id}.in
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#e1fce3] px-2 py-0.5 text-[12px] font-medium text-[#16a34a] shrink-0">
                  <span className="size-1.5 rounded-full bg-[#16a34a]" />
                  <span>Complete</span>
                </div>
              </div>

              {/* Step 2: Connect your store (1716:696) */}
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

              {/* Step 3: Create your first project (1716:703) */}
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
                <button
                  type="button"
                  onClick={() => handleStartProject()}
                  className="inline-flex h-8 items-center justify-center rounded-lg border border-[#e3e5ec] bg-white px-3 text-[13px] font-medium text-[#0d0d10] transition hover:bg-[#f4f6fb] shrink-0 cursor-pointer"
                >
                  Start a project
                </button>
              </div>

              {/* Nested Project Types (1716:710) */}
              <div className="pl-0 sm:pl-[50px] pt-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Influencer Marketing Card (1716:711) */}
                  <div
                    onClick={() => handleStartProject("influencer")}
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

                  {/* User-generated content Card (1716:716) */}
                  <div
                    onClick={() => handleStartProject("ugc")}
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

            {/* Need help getting started? Banner (1716:721) */}
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
        ) : (
          /* Active campaigns view */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[20px] font-bold text-[#0d0d10]">{activeClient.name} · Campaigns</h2>
                <p className="text-[13px] text-[#71717a]">Active projects managed by Brightside Agency</p>
              </div>
              <button
                type="button"
                onClick={() => handleStartProject()}
                className="inline-flex h-[38px] items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
              >
                <Plus size={16} />
                <span>New project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#e3e5ec] bg-white p-4">
                <div className="flex items-center justify-between text-[#71717a]">
                  <span className="text-[13px]">Active Projects</span>
                  <TrendingUp size={16} />
                </div>
                <p className="mt-2 text-[24px] font-bold text-[#0d0d10]">5</p>
                <p className="mt-1 text-[11px] text-emerald-600 font-medium">All on schedule</p>
              </div>
              <div className="rounded-xl border border-[#e3e5ec] bg-white p-4">
                <div className="flex items-center justify-between text-[#71717a]">
                  <span className="text-[13px]">Creators Live</span>
                  <Users size={16} />
                </div>
                <p className="mt-2 text-[24px] font-bold text-[#0d0d10]">16</p>
                <p className="mt-1 text-[11px] text-[#71717a]">Across 3 platforms</p>
              </div>
              <div className="rounded-xl border border-[#e3e5ec] bg-white p-4">
                <div className="flex items-center justify-between text-[#71717a]">
                  <span className="text-[13px]">In Escrow</span>
                  <CircleDollarSign size={16} />
                </div>
                <p className="mt-2 text-[24px] font-bold text-[#0d0d10]">₹2,00,000</p>
                <p className="mt-1 text-[11px] text-[#71717a]">Protected &amp; release on approval</p>
              </div>
            </div>
          </div>
        )}

        {/* Floating Chatbot Launcher (1716:727) */}
        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-[#0d0d10] text-white shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.22)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Toggle assistant"
        >
          <MessageSquare size={22} className="fill-white" />
        </button>

        {/* Floating Chatbot Drawer / Popover */}
        {chatOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl border border-[#e3e5ec] bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between bg-[#0d0d10] px-4 py-3.5 text-white">
              <div className="flex items-center gap-2.5">
                <div className="grid size-7 place-items-center rounded-full bg-white/10">
                  <Sparkles size={14} className="text-amber-300" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-4">Floooww Agency Assistant</p>
                  <p className="text-[11px] text-[#a3a3ac]">Managing {activeClient.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[300px] min-h-[220px] overflow-y-auto p-4 space-y-3 bg-[#fbfcfd]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-5 ${
                      msg.role === "user"
                        ? "bg-[#0d0d10] text-white"
                        : "bg-[#f4f6fb] border border-[#e3e5ec] text-[#0d0d10]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick starter chips */}
            <div className="border-t border-[#e3e5ec] bg-white px-3 py-2 flex gap-1.5 overflow-x-auto text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setInputMessage(`Draft influencer brief for ${activeClient.name}`);
                }}
                className="rounded-full bg-[#f4f6fb] px-2.5 py-1 text-[#0d0d10] hover:bg-[#e3e5ec] whitespace-nowrap cursor-pointer transition-colors"
              >
                Draft influencer brief
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputMessage("Recommend top creators for this niche");
                }}
                className="rounded-full bg-[#f4f6fb] px-2.5 py-1 text-[#0d0d10] hover:bg-[#e3e5ec] whitespace-nowrap cursor-pointer transition-colors"
              >
                Top creators
              </button>
            </div>

            <div className="flex items-center gap-2 border-t border-[#e3e5ec] bg-white p-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask anything or request a brief..."
                className="flex-1 rounded-lg border border-[#e3e5ec] px-3 py-1.5 text-[13px] outline-none focus:border-[#0d0d10]"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="rounded-lg bg-[#0d0d10] px-3 py-1.5 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        )}

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
                  <h3 className="text-[18px] font-semibold text-[#0d0d10]">Connect store for {activeClient.name}</h3>
                  <p className="mt-1 text-[13px] text-[#71717a]">
                    Link client e-commerce store to track automatic sales attribution and creator coupon redemptions.
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

        {/* Start Project Modal */}
        {newProjectModalOpen && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
            role="presentation"
            onClick={() => setNewProjectModalOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#0d0d10]">Create project for {activeClient.name}</h3>
                  <p className="mt-1 text-[13px] text-[#71717a]">
                    Brightside Agency manages execution, approvals and creator disbursements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="p-1 rounded-lg text-[#71717a] hover:bg-[#f4f6fb] cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <div
                  onClick={() => {
                    setNewProjectModalOpen(false);
                    setViewState("campaigns");
                  }}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors cursor-pointer ${
                    selectedProjectType === "influencer"
                      ? "border-[#0d0d10] bg-[#fcfdfd]"
                      : "border-[#e3e5ec] hover:border-[#0d0d10]"
                  }`}
                >
                  <span className="text-[20px] font-bold text-[#0d0d10] shrink-0">₹</span>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-[#0d0d10]">Influencer marketing</p>
                    <p className="text-[12px] text-[#71717a]">Creators post sponsored reels, videos, stories on their accounts.</p>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setNewProjectModalOpen(false);
                    setViewState("campaigns");
                  }}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors cursor-pointer ${
                    selectedProjectType === "ugc"
                      ? "border-[#0d0d10] bg-[#fcfdfd]"
                      : "border-[#e3e5ec] hover:border-[#0d0d10]"
                  }`}
                >
                  <Megaphone size={20} className="text-[#0d0d10] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-[#0d0d10]">User-generated content (UGC)</p>
                    <p className="text-[12px] text-[#71717a]">High-performance video ads &amp; creative assets for client channels.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="h-9 px-4 text-[13px] font-medium text-[#71717a] hover:text-[#0d0d10] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewProjectModalOpen(false);
                    setViewState("campaigns");
                  }}
                  className="h-9 rounded-lg bg-[#0d0d10] px-4 text-[13px] font-medium text-white hover:bg-black cursor-pointer"
                >
                  Proceed to brief
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
                  <h3 className="text-[17px] font-semibold text-[#0d0d10]">Client Onboarding Guide</h3>
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
                  As an agency manager, you can run full campaigns under your client's brand identity:
                </p>
                <div className="rounded-xl bg-[#f4f6fb] p-3.5 space-y-2 text-[#0d0d10]">
                  <p className="font-semibold text-[13px]">1. Client isolation</p>
                  <p className="text-[12px] text-[#71717a]">
                    Creators only see the client brand ({activeClient.name}) and never your internal agency rate cards or client margins.
                  </p>
                  <p className="font-semibold text-[13px]">2. Attribution &amp; Store Sync</p>
                  <p className="text-[12px] text-[#71717a]">
                    Connect client Shopify/WooCommerce store to tie creator clicks to actual checkout GMV.
                  </p>
                  <p className="font-semibold text-[13px]">3. Custom Reports</p>
                  <p className="text-[12px] text-[#71717a]">
                    Export branded executive performance PDFs directly from Agency Custom Reports.
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
    </AgencyClientShell>
  );
}
