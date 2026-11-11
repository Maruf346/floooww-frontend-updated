import { Outlet } from "react-router-dom";
import { ScrollManager } from "@/common/components/navigation/ScrollManager";
import { NavigationLoadingOverlay } from "@/common/components/ui/PageLoadingSkeleton";
import { LANDING_PATHS } from "@/landing/constants/sections";
import { ProjectFlowProvider } from "@/brand/context/ProjectFlowContext";

export function RootLayout() {
  return (
    <>
      <ScrollManager skipPaths={LANDING_PATHS} />
      <ProjectFlowProvider><Outlet /></ProjectFlowProvider>
      <NavigationLoadingOverlay />
    </>
  );
}
