import { Building } from "lucide-react";
import { DashboardPlaceholder } from "@/common/components/layout/DashboardPlaceholder";

export function AgencyDashboardPage() {
  return (
    <DashboardPlaceholder
      icon={Building}
      title="Agency dashboard"
      description="Every client, project and report in one place. This workspace is coming next."
    />
  );
}
