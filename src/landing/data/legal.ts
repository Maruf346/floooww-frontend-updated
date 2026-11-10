export interface LegalSection {
  id: string;
  title: string;
  body: string;
}
export interface LegalDocument {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

const terms: LegalSection[] = [
  [
    "about",
    "About these terms",
    "Floooww is operated by Floooww Limited. These terms apply to everyone who uses floooww.com and our apps: brands, agencies acting for brands, and creators. By creating an account or using Floooww, you accept these terms, our Privacy Policy and our Refund Policy.",
  ],
  [
    "definitions",
    "Definitions",
    "Brand means a business that creates projects. Agency means a business that manages projects for one or more brands. Creator means an individual or business that delivers content. Project means a brief published on Floooww. Deliverable means a piece of content agreed in a project. Escrow means money held by our payment partner until it is released or refunded.",
  ],
  [
    "eligibility",
    "Eligibility",
    "You must be able to enter into a binding contract and provide accurate account information. If you use Floooww for a business, you confirm that you have authority to accept these terms for that business.",
  ],
  [
    "account",
    "Your account",
    "Keep your login details secure and tell us promptly if you suspect unauthorised access. You are responsible for activity under your account and for the people you invite to your workspace.",
  ],
  [
    "projects",
    "How projects work",
    "Brands publish briefs, creators accept offers, and both sides agree deliverables, fees, timelines and usage rights. Messages, approvals and changes made through Floooww form the project record.",
  ],
  [
    "fees",
    "Fees",
    "Brands and agencies pay no Floooww subscription, seat or platform fee. Creators pay the platform and service fee shown before accepting an offer, plus applicable taxes.",
  ],
  [
    "payments",
    "Payments and escrow",
    "Brands fund each deliverable into escrow when a creator accepts. Money is released when a deliverable is approved and refunds follow our Refund Policy. Paying outside Floooww removes escrow protection.",
  ],
  [
    "taxes",
    "Taxes",
    "Each party is responsible for its own tax obligations. Floooww may collect or report taxes where required by law and provides payment records and invoices where available.",
  ],
  [
    "content",
    "Content and usage rights",
    "Creators retain ownership of their content unless agreed otherwise. Brands receive only the licence, channels, duration and territory stated in the project or an accepted rights request.",
  ],
  [
    "responsibilities",
    "Your responsibilities",
    "Use Floooww lawfully, treat other users respectfully, provide accurate project and payment information, and do not infringe rights or upload unlawful, harmful or misleading content.",
  ],
  [
    "payment-terms",
    "Payment terms",
    "Payments, releases, refunds and payouts are recorded in Payments with downloadable invoices and statements. Amounts are in Indian rupees unless stated otherwise.",
  ],
  [
    "usage-rights",
    "Usage rights",
    "Use content only within the rights agreed in the project. Any extension, new channel, territory or duration requires an accepted rights request and any additional fee.",
  ],
  [
    "community",
    "Community guidelines",
    "Do not use Floooww for fraud, harassment, spam, fake engagement, misleading advertising or activity that harms other users or the platform.",
  ],
  [
    "third-party",
    "Third-party services",
    "Connected platforms, payment partners and integrations have their own terms. We are not responsible for their services, availability or policies.",
  ],
  [
    "ip",
    "Floooww’s intellectual property",
    "Floooww and its software, branding and content are protected by intellectual-property laws. These terms grant you a limited right to use the Services, not ownership of them.",
  ],
  [
    "user-disputes",
    "Disputes between users",
    "Either side can raise a dispute on Floooww. Money stays in escrow while we review the brief, messages and content. We aim to decide within five working days of both sides replying.",
  ],
  [
    "suspension",
    "Suspension and closing your account",
    "We may suspend or close accounts that breach these terms, create risk, or are required to be closed by law. You may close your account once open projects and payment obligations are complete.",
  ],
  [
    "disclaimers",
    "Disclaimers",
    "The Services are provided on an as-available basis. We do not guarantee a creator, campaign, sale, result, platform connection or uninterrupted availability.",
  ],
  [
    "liability",
    "Limitation of liability",
    "To the extent permitted by law, Floooww is not liable for indirect, incidental or consequential losses arising from use of the Services or a project between users.",
  ],
  [
    "indemnity",
    "Indemnity",
    "You will indemnify Floooww against claims arising from your content, projects, breach of these terms or unlawful use of the Services.",
  ],
  [
    "fraud",
    "Fraud",
    "We may investigate suspected fraud, freeze relevant funds, request information and report activity where required.",
  ],
  [
    "communications",
    "Electronic communications",
    "You agree that notices and records may be provided electronically through the app or your account email address.",
  ],
  [
    "law",
    "Governing law and disputes",
    "These terms are governed by the laws of India. Courts with applicable jurisdiction will resolve disputes that cannot be resolved directly.",
  ],
  [
    "changes",
    "Changes to these terms",
    "We may update these terms and will provide notice of material changes before they take effect.",
  ],
  [
    "contact",
    "Grievance Officer and contact",
    "For questions or grievances, use our contact page and choose the most relevant topic. We will respond within the time required by applicable law.",
  ],
].map(([id, title, body]) => ({ id, title, body }));

const privacy: LegalSection[] = [
  [
    "about",
    "About this policy",
    "This Privacy Policy explains how Floooww Limited handles personal data when you use floooww.com, our apps, the MCP server, API and integrations. It applies to brands, agencies, creators and visitors.",
  ],
  [
    "who-we-are",
    "Who we are",
    "Floooww Limited is responsible for processing personal data described in this policy.",
  ],
  [
    "key-terms",
    "Key terms",
    "Personal data means information about an identifiable individual. Processing means collecting, storing, using, sharing or deleting that information.",
  ],
  [
    "you-give",
    "Information you give us",
    "This includes account, profile, contact, payment, tax, project, content, message and support information you choose to provide.",
  ],
  [
    "connected",
    "Information from connected accounts",
    "When you connect social, commerce or payment accounts, we receive the data needed to provide the connection, such as profile, audience, performance and transaction information.",
  ],
  [
    "automatic",
    "Information collected automatically",
    "We collect device, browser, log, cookie and usage information needed to operate, secure and improve the Services.",
  ],
  [
    "others",
    "Information from others",
    "We may receive information from agencies, brands, creators, service providers and public sources where allowed by law.",
  ],
  [
    "use",
    "How we use your information",
    "We use information to provide and secure Floooww, operate projects and escrow payments, support users, prevent fraud, issue invoices and meet legal obligations.",
  ],
  [
    "basis",
    "Our legal basis",
    "We process data to perform our contract with you, comply with legal obligations, pursue legitimate interests such as security, or with consent where required.",
  ],
  [
    "automation",
    "Match scores and automated processing",
    "Match scores use project and creator signals to help users assess fit. They do not make decisions that legally or similarly significantly affect you without appropriate review.",
  ],
  [
    "visibility",
    "Who can see your information on Floooww",
    "Information is visible to workspace members, invited clients and project participants according to the role and permissions set in Floooww.",
  ],
  [
    "providers",
    "Sharing with service providers",
    "We share data with service providers such as payment partners, cloud hosting and storage providers, communications providers and professional advisers as needed to operate the Services.",
  ],
  [
    "disclosures",
    "Other disclosures",
    "We may disclose information where required by law, to protect rights and safety, or in connection with a business transaction.",
  ],
  [
    "no-sale",
    "We never sell your data",
    "We do not sell personal data or use workspace data to train public AI models.",
  ],
  [
    "cookies",
    "Cookies",
    "We use essential cookies for sign-in and security, and optional analytics cookies only with your choice. You can change preferences through Cookie settings.",
  ],
  [
    "integrations",
    "Integrations and platform policies",
    "Connected third-party platforms apply their own terms and privacy policies. You can revoke access from the relevant connection or platform permissions page.",
  ],
  [
    "storage",
    "Where your data is stored",
    "Data may be processed in locations where Floooww and its service providers operate, subject to appropriate safeguards.",
  ],
  [
    "security",
    "How we protect your data",
    "We use technical and organisational measures designed to protect data. No system is completely secure, so please keep account credentials confidential.",
  ],
  [
    "retention",
    "How long we keep your data",
    "We retain data for as long as needed to provide the Services, meet legal obligations, resolve disputes and enforce agreements.",
  ],
  [
    "rights",
    "Your rights",
    "Depending on applicable law, you may request access, correction, deletion, restriction, objection or portability of your personal data.",
  ],
  [
    "response",
    "How quickly we respond",
    "We aim to respond to privacy requests promptly and within the periods required by applicable law.",
  ],
  [
    "children",
    "Children",
    "Floooww is not intended for children. Do not use the Services if you are below the minimum age required to enter a binding agreement.",
  ],
  [
    "purpose",
    "Changes of purpose",
    "If we use data for a new purpose, we will provide any notice required by law.",
  ],
  [
    "websites",
    "Third-party websites",
    "Our Services may link to third-party websites. Their privacy practices are governed by their own policies.",
  ],
  [
    "changes",
    "Changes to this policy",
    "We will notify you by email or in the app before a material change takes effect and show the effective date at the top of this page.",
  ],
  [
    "contact",
    "Grievance Officer and data protection contact",
    "To exercise privacy rights or raise a concern, use our contact page and choose Privacy and data.",
  ],
].map(([id, title, body]) => ({ id, title, body }));

const refunds: LegalSection[] = [
  [
    "scope",
    "1. Scope",
    "This policy covers money brands and agencies pay into escrow for creator fees on Floooww. Floooww itself charges brands and agencies no fee, so there is no Floooww fee to refund.",
  ],
  [
    "full",
    "2. Full refunds",
    "You get a full refund of the amount held for a deliverable if the creator declines your invite, if you cancel before the creator accepts, if the creator does not deliver by the agreed deadline and you choose not to extend it, or if both sides agree to cancel.",
  ],
  [
    "partial",
    "3. Partial refunds",
    "If a dispute is decided with a partial release, the rest of the money held for that deliverable is refunded to you.",
  ],
  [
    "how",
    "4. How refunds work",
    "Refunds are made automatically to your original payment method, usually within 5–7 working days, and appear under Payments › Refunds with the reason.",
  ],
  [
    "long-term",
    "5. Long-term projects",
    "Each cycle of a long-term project is treated separately. Refund eligibility applies to the amount held for the relevant cycle.",
  ],
  [
    "approved",
    "6. Approved content",
    "Once you approve a deliverable and payment is released to the creator, it cannot be refunded except through a dispute raised before release.",
  ],
  [
    "gift",
    "7. Gift projects",
    "Gift projects carry no creator payment in escrow, so no payment refund applies.",
  ],
  [
    "fees",
    "8. Fees on refunds",
    "Creators pay a platform and service fee only on money released to them. Money that is refunded carries no fee for anyone.",
  ],
  [
    "agency",
    "9. Agency fees",
    "If an agency charges its client its own fee, any refund of that fee is a matter between the agency and its client.",
  ],
  [
    "questions",
    "10. Questions",
    "For anything about a refund, raise an enquiry and choose Payment or refund. Add the project or order ID to speed things up.",
  ],
].map(([id, title, body]) => ({ id, title, body }));

export const LEGAL_DOCUMENTS: Record<"terms" | "privacy" | "refunds", LegalDocument> = {
  terms: {
    eyebrow: "LEGAL",
    title: "Terms of Service",
    description: "The terms that govern your use of Floooww, projects, payments and content.",
    updated: "Last updated 8 November 2026",
    sections: terms,
  },
  privacy: {
    eyebrow: "LEGAL",
    title: "Privacy Policy",
    description: "How Floooww collects, uses, shares and protects information.",
    updated: "Effective 8 November 2026",
    sections: privacy,
  },
  refunds: {
    eyebrow: "LEGAL",
    title: "Refund Policy",
    description: "When brands get money back, how refunds work and how long they take.",
    updated: "Last updated 8 November 2026",
    sections: refunds,
  },
};
