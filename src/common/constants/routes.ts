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
  notFound: "/404",
  serverError: "/500",
  maintenance: "/maintenance",
  loading: "/loading",
  login: "/login",
  signup: "/signup",
  verifyEmail: "/verify-email",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  chooseWorkspace: "/choose-workspace",
  onboarding: "/onboarding/:role",
  brand: "/brand",
  brandProjects: "/brand/projects",
  brandNewProject: "/brand/projects/new",
  brandNewProjectPartnership: "/brand/projects/new/partnership",
  brandNewProjectDuration: "/brand/projects/new/duration",
  brandNewProjectDetails: "/brand/projects/new/details",
  brandNewProjectCreators: "/brand/projects/new/creators",
  brandNewProjectDeliverables: "/brand/projects/new/deliverables",
  brandNewProjectBudget: "/brand/projects/new/budget",
  brandNewProjectPayment: "/brand/projects/new/payment",
  brandNewProjectReview: "/brand/projects/new/review",
  brandProjectPublished: "/brand/projects/new/published",
  brandProject: "/brand/projects/:projectId",
  brandProjectPerformance: "/brand/projects/:projectId/performance",
  brandCreatorProfile: "/brand/projects/:projectId/applications/:creatorId",
  brandCreatorInvite: "/brand/projects/:projectId/applications/:creatorId/invite",
  agency: "/agency",
  creator: "/creator",
} as const;

export const brandProjectRoute = (projectId: number | string) => `/brand/projects/${projectId}`;
export const brandProjectPerformanceRoute = (projectId: number | string) =>
  `/brand/projects/${projectId}/performance`;
export const brandCreatorProfileRoute = (projectId: number | string, creatorId: string) =>
  `/brand/projects/${projectId}/applications/${creatorId}`;
export const brandCreatorInviteRoute = (projectId: number | string, creatorId: string) =>
  `/brand/projects/${projectId}/applications/${creatorId}/invite`;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
