import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { CreatorPerformanceTab } from "@/brand/components/CreatorPerformanceTab";
import type { Platform } from "@/common/types";

export function CreatorProjectPerformanceView() {
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const platforms: Platform[] = ["Instagram", "TikTok", "YouTube"];

  return (
    <div className="w-full flex flex-col gap-6" data-name="Performance View">
      {/* Platform & Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] text-[#4a4a55]">
          Performance data updates daily from connected social and affiliate links.
        </p>

        <div className="flex items-center gap-2.5">
          {/* Platform Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 h-9 px-3 bg-white border border-[#e3e5ec] rounded-lg text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
            >
              <span>{platform}</span>
              <ChevronDown className="size-3.5 text-[#8491a3]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#e3e5ec] rounded-lg shadow-lg py-1 z-30">
                {platforms.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPlatform(p);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[13px] transition cursor-pointer hover:bg-[#f1f4ff] hover:text-[#3b5bff] ${
                      platform === p ? "font-semibold text-[#3b5bff] bg-[#f8f9fb]" : "text-[#0d0d10]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download Report Button */}
          <button
            type="button"
            onClick={() => alert("Downloading campaign performance report (PDF)...")}
            className="flex items-center justify-center size-9 bg-white border border-[#e3e5ec] rounded-lg text-[#4a4a55] hover:text-[#0d0d10] hover:bg-[#f8f9fb] transition cursor-pointer"
            title="Download report"
          >
            <Download className="size-4" />
          </button>
        </div>
      </div>

      {/* Performance Dashboard from Brand/Creator Mirror (Custom report omitted for creator) */}
      <CreatorPerformanceTab creatorName="Ishita Rao" platform={platform} showCustomReport={false} />
    </div>
  );
}
