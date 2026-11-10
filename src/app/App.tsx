import { RouterProvider } from "react-router-dom";
import { DelayedPageLoading } from "@/common/components/ui/PageLoadingSkeleton";
import { router } from "./router";

export default function App() {
  return <RouterProvider router={router} fallbackElement={<DelayedPageLoading />} />;
}
