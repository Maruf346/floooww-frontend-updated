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
  brandCreatorDiscovery: "/brand/creator-discovery",
  brandContentHub: "/brand/content-hub",
  brandPayments: "/brand/payments",
  brandPaymentDispute: "/brand/payments/disputes/:disputeId",
  brandMessages: "/brand/messages",
  brandHelp: "/brand/help",
  brandSettings: "/brand/settings",
  brandCustomReports: "/brand/reports",
  brandCustomReportNew: "/brand/reports/new",
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
  brandInvitedCreator: "/brand/projects/:projectId/invited/:creatorId",
  brandCreatorDeliverables: "/brand/projects/:projectId/invited/:creatorId/deliverables",
  agency: "/agency",
  agencyClients: "/agency/clients",
  agencyClientNew: "/agency/clients/new",
  agencyClientOverview: "/agency/client",
  agencyClientDetail: "/agency/client/:clientId",
  agencyClientProjects: "/agency/client/:clientId/projects",
  agencyClientNewProject: "/agency/client/:clientId/projects/new",
  agencyClientProjectPublished: "/agency/client/:clientId/projects/published",
  agencyClientProjectDetail: "/agency/client/:clientId/projects/:projectId",
  agencyClientProjectPerformance:
    "/agency/client/:clientId/projects/:projectId/performance",
  agencyClientCreatorProfile:
    "/agency/client/:clientId/projects/:projectId/applications/:creatorId",
  agencyClientCreatorInvite:
    "/agency/client/:clientId/projects/:projectId/applications/:creatorId/invite",
  agencyClientInvitedCreator:
    "/agency/client/:clientId/projects/:projectId/invited/:creatorId",
  agencyClientCreatorDeliverables:
    "/agency/client/:clientId/projects/:projectId/invited/:creatorId/deliverables",
  agencyClientContent: "/agency/client/:clientId/content",
  agencyClientContentHub: "/agency/client/:clientId/content-hub",
  agencyClientCreatorDiscovery: "/agency/client/:clientId/creators",
  agencyBilling: "/agency/billing",
  agencyReports: "/agency/reports",
  agencyReportNew: "/agency/reports/new",
  agencyReportDetail: "/agency/reports/:reportId",
  agencyTeam: "/agency/team",
  agencyMessages: "/agency/messages",
  agencySettings: "/agency/settings",
  agencyHelp: "/agency/help",
  creator: "/creator",
  creatorProjects: "/creator/projects",
  creatorMyProjects: "/creator/my-projects",
  creatorContent: "/creator/content",
  creatorPerformance: "/creator/performance",
  creatorEarnings: "/creator/earnings",
  creatorMessages: "/creator/messages",
  creatorSettings: "/creator/settings",
  creatorHelp: "/creator/help",
  creatorProject: "/creator/projects/:projectId",
  creatorProjectDetail: "/creator/project",
} as const;

export const creatorProjectRoute = (projectId: number | string) =>
  `/creator/projects/${projectId}`;

export const brandProjectRoute = (projectId: number | string) => `/brand/projects/${projectId}`;
export const brandProjectPerformanceRoute = (projectId: number | string) =>
  `/brand/projects/${projectId}/performance`;
export const brandCreatorProfileRoute = (projectId: number | string, creatorId: string) =>
  `/brand/projects/${projectId}/applications/${creatorId}`;
export const brandCreatorInviteRoute = (projectId: number | string, creatorId: string) =>
  `/brand/projects/${projectId}/applications/${creatorId}/invite`;
export const brandInvitedCreatorRoute = (projectId: number | string, creatorId: string) =>
  `/brand/projects/${projectId}/invited/${creatorId}`;
export const brandCreatorDeliverablesRoute = (projectId: number | string, creatorId: string) =>
  `/brand/projects/${projectId}/invited/${creatorId}/deliverables`;
export const brandPaymentDisputeRoute = (disputeId: string) =>
  `/brand/payments/disputes/${disputeId}`;
export const agencyReportDetailRoute = (reportId: string) => `/agency/reports/${reportId}`;
export const agencyClientRoute = (clientId: string) => `/agency/client/${clientId}`;
export const agencyClientProjectsRoute = (clientId: string) =>
  `/agency/client/${clientId}/projects`;
export const agencyClientNewProjectRoute = (clientId: string) =>
  `/agency/client/${clientId}/projects/new`;
export const agencyClientProjectPublishedRoute = (clientId: string) =>
  `/agency/client/${clientId}/projects/published`;
export const agencyClientProjectDetailRoute = (clientId: string, projectId: number | string) =>
  `/agency/client/${clientId}/projects/${projectId}`;
export const agencyClientProjectPerformanceRoute = (
  clientId: string,
  projectId: number | string,
) => `/agency/client/${clientId}/projects/${projectId}/performance`;
export const agencyClientCreatorProfileRoute = (
  clientId: string,
  projectId: number | string,
  creatorId: string,
) => `/agency/client/${clientId}/projects/${projectId}/applications/${creatorId}`;
export const agencyClientCreatorInviteRoute = (
  clientId: string,
  projectId: number | string,
  creatorId: string,
) => `/agency/client/${clientId}/projects/${projectId}/applications/${creatorId}/invite`;
export const agencyClientInvitedCreatorRoute = (
  clientId: string,
  projectId: number | string,
  creatorId: string,
) => `/agency/client/${clientId}/projects/${projectId}/invited/${creatorId}`;
export const agencyClientCreatorDeliverablesRoute = (
  clientId: string,
  projectId: number | string,
  creatorId: string,
) => `/agency/client/${clientId}/projects/${projectId}/invited/${creatorId}/deliverables`;
export const agencyClientContentRoute = (clientId: string) =>
  `/agency/client/${clientId}?tab=content`;
export const agencyClientCreatorDiscoveryRoute = (clientId: string) =>
  `/agency/client/${clientId}?tab=creators`;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
