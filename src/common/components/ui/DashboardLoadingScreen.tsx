import { Logo } from "@/common/components/brand/Logo";

/**
 * APP-L1 · Dashboard loading (Figma node 2007:230).
 * Matches the exact Figma layout:
 * - 248px Left Sidebar with logo and 8 skeleton nav rows
 * - Top bar with search input mockup and user avatar (Ananya Mehta)
 * - Main content with header skeletons, 4 KPI metric cards, and 6-row table card
 */
export function DashboardLoadingScreen() {
  const sidebarNavWidths = [100, 137, 114, 151, 128, 105, 142, 119];

  return (
    <div
      aria-label="Loading dashboard"
      aria-live="polite"
      className="flex min-h-screen w-full items-start bg-[#f6f8fb] text-ink select-none"
    >
      {/* 248px Sidebar (Figma node 2007:231) */}
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col gap-[6px] border-r border-[#edeff3] bg-white px-[16px] py-[24px] md:flex">
        {/* Logo (Figma node 2007:232) */}
        <div className="flex items-center shrink-0">
          <Logo className="h-[32px] w-auto origin-left" />
        </div>

        {/* Spacer (Figma node 2007:237) */}
        <div className="h-[20px] w-full shrink-0" />

        {/* 8 Navigation Item Skeletons (Figma nodes 2007:238 - 2007:261) */}
        {sidebarNavWidths.map((width, index) => (
          <div
            key={index}
            className="flex w-full items-center gap-[10px] rounded-[8px] px-[12px] py-[9px]"
          >
            <div className="size-[18px] shrink-0 rounded-[6px] bg-[#edeff3] skeleton-shimmer" />
            <div
              className="h-[12px] rounded-[6px] bg-[#edeff3] skeleton-shimmer"
              style={{ width: `${width}px` }}
            />
          </div>
        ))}
      </aside>

      {/* Main Area (Figma node 2007:262) */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (Figma node 2007:263) */}
        <header className="sticky top-0 z-10 flex h-[73px] w-full shrink-0 items-center justify-between border-b border-[#edeff3] bg-white px-6 sm:px-[32px] py-[16px]">
          {/* Mobile logo when sidebar is hidden */}
          <div className="flex items-center gap-3 md:hidden">
            <Logo className="h-[28px] w-auto" />
          </div>

          {/* Search bar mockup (Figma node 2007:264) */}
          <div className="hidden sm:flex w-[420px] max-w-[420px] items-center rounded-[10px] bg-[#f3f5f7] px-[14px] py-[10px]">
            <p className="font-inter-regular text-[13px] font-normal leading-[20px] text-[#a2a7b3] whitespace-nowrap">
              Search projects, creators, content…
            </p>
          </div>

          {/* User profile (Figma node 2007:266) */}
          <div className="flex items-center gap-[10px] shrink-0 ml-auto">
            <div className="size-[32px] shrink-0 rounded-full bg-[#dee8fe]" />
            <p className="font-inter-medium text-[13px] font-medium leading-[20px] text-[#070b13] whitespace-nowrap">
              Ananya Mehta
            </p>
          </div>
        </header>

        {/* Content Area (Figma node 2007:269) */}
        <main className="flex flex-1 flex-col gap-[24px] p-5 sm:p-8 lg:p-[40px]">
          {/* Header skeletons (Figma node 2007:270) */}
          <div className="flex w-full flex-col gap-[10px]">
            <div className="h-[28px] w-[260px] max-w-full rounded-[8px] bg-[#edeff3] skeleton-shimmer" />
            <div className="h-[14px] w-[180px] max-w-[70%] rounded-[6px] bg-[#edeff3] skeleton-shimmer" />
          </div>

          {/* 4 KPI cards (Figma node 2007:273) */}
          <div className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((card) => (
              <div
                key={card}
                className="flex flex-col gap-[12px] rounded-[16px] border border-[#edeff3] bg-white p-[20px]"
              >
                <div className="size-[32px] shrink-0 rounded-[10px] bg-[#edeff3] skeleton-shimmer" />
                <div className="h-[12px] w-[90px] rounded-[6px] bg-[#edeff3] skeleton-shimmer" />
                <div className="h-[24px] w-[130px] rounded-[6px] bg-[#edeff3] skeleton-shimmer" />
              </div>
            ))}
          </div>

          {/* Table skeleton card (Figma node 2007:290) */}
          <div className="flex w-full flex-col overflow-hidden rounded-[16px] border border-[#edeff3] bg-white">
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="flex items-center gap-[16px] border-t border-[#edeff3] px-[20px] py-[16px] first:border-t-0"
              >
                <div className="size-[36px] shrink-0 rounded-full bg-[#edeff3] skeleton-shimmer" />
                <div className="h-[12px] w-[140px] sm:w-[200px] rounded-[6px] bg-[#edeff3] skeleton-shimmer" />
                <div className="hidden h-[12px] w-[120px] rounded-[6px] bg-[#edeff3] skeleton-shimmer sm:block" />
                <div className="hidden h-[12px] w-[90px] rounded-[6px] bg-[#edeff3] skeleton-shimmer md:block" />
                <div className="ml-auto h-[24px] w-[70px] shrink-0 rounded-full bg-[#edeff3] skeleton-shimmer" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
