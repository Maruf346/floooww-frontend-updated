import { Camera } from "lucide-react";
import { DashboardPlaceholder } from "@/common/components/layout/DashboardPlaceholder";

export function CreatorDashboardPage() {
  return (
    <DashboardPlaceholder
      icon={Camera}
      title="Creator dashboard"
      description="Invites, deliverables and payouts. This workspace is coming next."
    />
  );
}
