import { BrandShell } from "@/brand/components/BrandShell";
import { BrandOverviewWithCampaigns } from "./BrandOverviewWithCampaigns";

/** Brand home overview with active projects. Other dashboard views remain isolated pages. */
export function BrandDashboardPage() {
  return <BrandShell><BrandOverviewWithCampaigns /></BrandShell>;
}
