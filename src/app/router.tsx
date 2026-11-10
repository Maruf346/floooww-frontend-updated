import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import { NotFoundPage } from "@/common/pages/NotFoundPage";
import { LandingLayout } from "@/landing/layouts/LandingLayout";
import { LandingPage } from "@/landing/pages/LandingPage";
import { FaqDocsPage } from "@/landing/pages/FaqDocsPage";
import { McpDocsPage } from "@/landing/pages/McpDocsPage";
import { RootLayout } from "./RootLayout";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          element: <LandingLayout />,
          // One route for "/" and every section path, so the page never remounts between them.
          children: [
            { path: ROUTES.docsMcp, element: <McpDocsPage /> },
            { path: ROUTES.faq, element: <FaqDocsPage /> },
            { path: "/:section?", element: <LandingPage /> },
          ],
        },
        // Non-landing areas load on demand to keep the homepage bundle lean.
        {
          path: ROUTES.login,
          lazy: async () => ({ Component: (await import("@/auth/pages/LoginPage")).LoginPage }),
        },
        {
          path: ROUTES.signup,
          lazy: async () => ({ Component: (await import("@/auth/pages/SignupPage")).SignupPage }),
        },
        {
          path: ROUTES.brand,
          lazy: async () => ({
            Component: (await import("@/brand/pages/BrandDashboardPage")).BrandDashboardPage,
          }),
        },
        {
          path: ROUTES.agency,
          lazy: async () => ({
            Component: (await import("@/agency/pages/AgencyDashboardPage")).AgencyDashboardPage,
          }),
        },
        {
          path: ROUTES.creator,
          lazy: async () => ({
            Component: (await import("@/creator/pages/CreatorDashboardPage")).CreatorDashboardPage,
          }),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  { basename },
);
