import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandShell } from "@/brand/components/BrandShell";
import { BrandOverviewWithCampaigns } from "./BrandOverviewWithCampaigns";
import { BrandOverviewEmptySetup } from "./BrandOverviewEmptySetup";

/**
 * Brand home overview.
 * Supports:
 * - Client mode Step 1 / Empty setup state (Figma 1716:668: AG · BR-01 · Overview: 1 · No campaigns yet)
 * - Brand overview with active campaigns
 */
export function BrandDashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const clientParam = searchParams.get("client");
  const viewParam = searchParams.get("view");

  // In client mode (e.g. ?client=minimalist), default to Step 1 setup view (1716:668)
  // unless explicitly requested to see campaigns view
  const isSetupView =
    viewParam === "setup" ||
    (Boolean(clientParam) && viewParam !== "campaigns");

  const toggleView = (view: "setup" | "campaigns") => {
    const params = new URLSearchParams(location.search);
    params.set("view", view);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <BrandShell>
      {/* Dev / Reviewer Quick State Switcher Pill */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-[#e3e5ec] bg-[#f8f9fb] px-3.5 py-2">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[12px] font-medium text-[#0d0d10]">
            {isSetupView
              ? "Screen: BR-01 · Overview: 1 · No campaigns yet (Figma 1716:668)"
              : "Screen: BR-01 · Overview: Active campaigns"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-[#e3e5ec] bg-white p-0.5 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => toggleView("setup")}
            className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              isSetupView
                ? "bg-[#0d0d10] text-white"
                : "text-[#71717a] hover:text-[#0d0d10]"
            }`}
          >
            Step 1 · Setup (1716:668)
          </button>
          <button
            type="button"
            onClick={() => toggleView("campaigns")}
            className={`rounded-md px-2.5 py-1 transition-colors cursor-pointer ${
              !isSetupView
                ? "bg-[#0d0d10] text-white"
                : "text-[#71717a] hover:text-[#0d0d10]"
            }`}
          >
            Active campaigns
          </button>
        </div>
      </div>

      {isSetupView ? <BrandOverviewEmptySetup /> : <BrandOverviewWithCampaigns />}
    </BrandShell>
  );
}
