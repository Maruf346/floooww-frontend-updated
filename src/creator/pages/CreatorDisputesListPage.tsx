import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { CreatorShell } from "@/creator/components/CreatorShell";
import { CreatorDisputesListContent } from "../components/CreatorDisputesListContent";
import { ROUTES } from "@/common/constants/routes";

const TABS = [
  { label: "Overview", key: "overview", path: ROUTES.creatorEarnings },
  { label: "Projects", key: "projects", path: `${ROUTES.creatorEarnings}?tab=projects` },
  { label: "Statements", key: "statements", path: `${ROUTES.creatorEarnings}?tab=statements` },
  { label: "Where we pay you", key: "payouts", path: `${ROUTES.creatorEarnings}?tab=payouts` },
  { label: "Tax details", key: "tax", path: `${ROUTES.creatorEarnings}?tab=tax` },
  { label: "Disputes", key: "disputes", path: ROUTES.creatorDisputes, badge: "2" },
] as const;

export function CreatorDisputesListPage() {
  const navigate = useNavigate();
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);

  return (
    <CreatorShell>
      <div className="w-full bg-white text-[#0d0d10]" data-node-id="1664:53802" data-name="CR-08b · Disputes: list">
        <div className="w-full px-[20px] sm:px-[32px] pt-[28px] pb-[48px] flex flex-col gap-[24px]">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-[4px] max-w-2xl">
              <h1 className="text-[28px] font-semibold tracking-[-0.14px] text-[#0d0d10] leading-[34px]">
                Earnings
              </h1>
              <p className="text-[14px] text-[#4a4a55] leading-[20px]">
                After the 11% Kreyio fee. Brands pay any GST on top. Paid as soon as the brand approves.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0" data-name="Actions">
              <button
                type="button"
                onClick={() => {
                  // Trigger raise modal from child content or dispatch
                  const btn = document.querySelector<HTMLButtonElement>('[data-trigger-raise="true"]');
                  if (btn) {
                    btn.click();
                  } else {
                    setIsRaiseModalOpen(true);
                  }
                }}
                className="bg-[#0d0d10] hover:bg-black/90 text-white flex items-center justify-center gap-2 h-[40px] px-4 rounded-[8px] text-[14px] font-medium transition cursor-pointer shadow-xs"
              >
                <Plus size={16} />
                <span>Raise a dispute</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs matching Figma Node 1664:53813 */}
          <div className="border-b border-[#e5e7eb] flex items-center gap-6 overflow-x-auto">
            {TABS.map((tab) => {
              const isActive = tab.key === "disputes";
              return (
                <Link
                  key={tab.key}
                  to={tab.path}
                  className={`flex items-center gap-2 pb-3 text-[14px] transition whitespace-nowrap relative ${
                    isActive
                      ? "font-semibold text-[#3b5bff]"
                      : "font-medium text-[#6b7280] hover:text-[#0d0d10]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="inline-flex items-center justify-center h-4.5 min-w-4.5 px-1.5 rounded-full text-[11px] font-semibold bg-[#feefce] text-[#d97706]">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3b5bff]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Content */}
          <CreatorDisputesListContent />
        </div>
      </div>
    </CreatorShell>
  );
}

export default CreatorDisputesListPage;
