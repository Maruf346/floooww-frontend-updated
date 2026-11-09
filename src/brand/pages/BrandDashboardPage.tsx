import { Megaphone } from "lucide-react";
import { DashboardPlaceholder } from "@/common/components/layout/DashboardPlaceholder";

export function BrandDashboardPage() {
  return (
    <DashboardPlaceholder
      icon={Megaphone}
      title="Brand dashboard"
      description="Projects, creators, approvals and results. This workspace is coming next."
    />
  );
}
