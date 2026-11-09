import { Outlet } from "react-router-dom";
import { ScrollManager } from "@/common/components/navigation/ScrollManager";
import { LANDING_PATHS } from "@/landing/constants/sections";

export function RootLayout() {
  return (
    <>
      <ScrollManager skipPaths={LANDING_PATHS} />
      <Outlet />
    </>
  );
}
