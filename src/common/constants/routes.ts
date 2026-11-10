/** Every route path in the app. Never hard-code a path in a component. */
export const ROUTES = {
  home: "/",
  howItWorks: "/how-it-works",
  mcp: "/mcp",
  docsMcp: "/docs/mcp",
  faq: "/faq",
  help: "/help",
  enquiry: "/enquiry",
  terms: "/terms",
  privacy: "/privacy",
  refunds: "/refunds",
  login: "/login",
  signup: "/signup",
  verifyEmail: "/verify-email",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  chooseWorkspace: "/choose-workspace",
  onboarding: "/onboarding/:role",
  brand: "/brand",
  agency: "/agency",
  creator: "/creator",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
