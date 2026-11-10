import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import { WebErrorPage } from "@/common/pages/WebErrorPage";
import { PageLoadingSkeleton } from "@/common/components/ui/PageLoadingSkeleton";
import { LandingLayout } from "@/landing/layouts/LandingLayout";
import { LandingPage } from "@/landing/pages/LandingPage";
import { FaqDocsPage } from "@/landing/pages/FaqDocsPage";
import { HelpCentrePage } from "@/landing/pages/HelpCentrePage";
import { EnquiryPage } from "@/landing/pages/EnquiryPage";
import { LegalPage } from "@/landing/pages/LegalPage";
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
            { path: ROUTES.help, element: <HelpCentrePage /> },
            { path: ROUTES.enquiry, element: <EnquiryPage /> },
            { path: ROUTES.terms, element: <LegalPage kind="terms" /> },
            { path: ROUTES.privacy, element: <LegalPage kind="privacy" /> },
            { path: ROUTES.refunds, element: <LegalPage kind="refunds" /> },
            { path: ROUTES.notFound, element: <WebErrorPage kind="not-found" /> },
            { path: ROUTES.serverError, element: <WebErrorPage kind="server-error" /> },
            { path: ROUTES.maintenance, element: <WebErrorPage kind="maintenance" /> },
            { path: ROUTES.loading, element: <PageLoadingSkeleton /> },
            { path: "/:section?", element: <LandingPage /> },
            { path: "*", element: <WebErrorPage kind="not-found" /> },
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
          path: ROUTES.verifyEmail,
          lazy: async () => ({ Component: (await import("@/auth/pages/VerifyEmailPage")).VerifyEmailPage }),
        },
        {
          path: ROUTES.forgotPassword,
          lazy: async () => ({ Component: (await import("@/auth/pages/ForgotPasswordPage")).ForgotPasswordPage }),
        },
        {
          path: ROUTES.resetPassword,
          lazy: async () => ({ Component: (await import("@/auth/pages/ResetPasswordPage")).ResetPasswordPage }),
        },
        {
          path: ROUTES.chooseWorkspace,
          lazy: async () => ({ Component: (await import("@/auth/pages/ChooseWorkspacePage")).ChooseWorkspacePage }),
        },
        {
          path: ROUTES.onboarding,
          lazy: async () => ({ Component: (await import("@/auth/pages/OnboardingPage")).OnboardingPage }),
        },
        {
          path: ROUTES.brand,
          lazy: async () => ({
            Component: (await import("@/brand/pages/BrandDashboardPage")).BrandDashboardPage,
          }),
        },
        {
          path: ROUTES.brandNewProject,
          lazy: async () => ({
            Component: (await import("@/brand/pages/BrandProjectTypePage")).BrandProjectTypePage,
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
      ],
    },
  ],
  { basename },
);
