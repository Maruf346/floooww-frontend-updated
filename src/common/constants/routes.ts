/** Every route path in the app. Never hard-code a path in a component. */
export const ROUTES = {
  home: "/",
  howItWorks: "/how-it-works",
  mcp: "/mcp",
  docsMcp: "/docs/mcp",
  faq: "/faq",
  help: "/help",
  enquiry: "/enquiry",
  login: "/login",
  signup: "/signup",
  brand: "/brand",
  agency: "/agency",
  creator: "/creator",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
