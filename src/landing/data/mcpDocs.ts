export interface McpDocSection {
  id: string;
  title: string;
  body: string[];
  code?: string;
}

export const MCP_DOC_SECTIONS: McpDocSection[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: [
      "The Floooww MCP server lets AI assistants such as Claude and ChatGPT work with your Floooww workspace: search creators, check project status, review content, read reports and prepare payments, in plain language. It follows the open Model Context Protocol, uses your Floooww login and permissions, and is free with every workspace.",
    ],
  },
  {
    id: "before-you-start",
    title: "2. Before you start",
    body: [
      "• A Floooww account with access to at least one workspace",
      "• An AI client that supports remote MCP servers over Streamable HTTP with OAuth sign-in (Claude, ChatGPT, Claude Code, Cursor, VS Code and others)",
      "• For clients that only support local servers: Node.js 18 or later, to run the mcp-remote bridge",
    ],
  },
  {
    id: "server-details",
    title: "3. Server details",
    body: [
      "Server URL: https://mcp.floooww.com/mcp",
      "Transport: Streamable HTTP",
      "Authentication: OAuth 2.1 with PKCE, using your Floooww account",
      "API base URL: https://api.floooww.com/v1",
      "Docs: https://docs.floooww.com · Status: https://status.floooww.com",
      "[All URLs are placeholders until the server is live.]",
    ],
  },
  {
    id: "connect-claude",
    title: "4. Connect Claude",
    body: [
      "1. In Claude (web or desktop), open Settings › Connectors.",
      "2. Select Add custom connector.",
      "3. Name it Floooww and paste the server URL.",
      "4. Select Connect, sign in to Floooww and choose a workspace.",
      "5. In a new chat, enable Floooww from the tools menu and ask: “What is waiting for my approval?”",
    ],
  },
  {
    id: "connect-chatgpt",
    title: "5. Connect ChatGPT",
    body: [
      "1. In ChatGPT, open Settings › Connectors.",
      "2. Add a custom connector and paste the server URL.",
      "3. Sign in to Floooww when asked and choose a workspace.",
      "4. Start a chat and select Floooww as a connector.",
    ],
  },
  {
    id: "connect-claude-code",
    title: "6. Connect Claude Code",
    body: ["Run this in your terminal, then type /mcp inside Claude Code to sign in:"],
    code: "claude mcp add --transport http floooww https://mcp.floooww.com/mcp",
  },
  {
    id: "connect-cursor",
    title: "7. Connect Cursor",
    body: [
      "Add this to ~/.cursor/mcp.json (or .cursor/mcp.json in a project), save and restart Cursor. You will be asked to sign in the first time a Floooww tool is used.",
    ],
    code: '{\n  "mcpServers": {\n    "floooww": {\n      "url": "https://mcp.floooww.com/mcp"\n    }\n  }\n}',
  },
  {
    id: "connect-vscode",
    title: "8. Connect VS Code",
    body: [
      "Add this to .vscode/mcp.json in your workspace, then select Start above the server entry and sign in.",
    ],
    code: '{\n  "servers": {\n    "floooww": {\n      "type": "http",\n      "url": "https://mcp.floooww.com/mcp"\n    }\n  }\n}',
  },
  {
    id: "other-clients",
    title: "9. Other clients (local bridge)",
    body: [
      "If your client only supports local servers, run Floooww through the mcp-remote bridge:",
    ],
    code: '{\n  "mcpServers": {\n    "floooww": {\n      "command": "npx",\n      "args": ["-y", "mcp-remote", "https://mcp.floooww.com/mcp"]\n    }\n  }\n}',
  },
  {
    id: "sign-in",
    title: "10. Sign in and workspaces",
    body: [
      "The first time your assistant uses Floooww, a browser window opens to sign in. Choose the workspace to connect; agencies can choose the agency workspace or a single client. Access tokens refresh automatically. To disconnect, go to Settings › Connected apps in Floooww and select Revoke.",
    ],
  },
  {
    id: "permissions",
    title: "11. Permissions",
    body: [
      "Your assistant can only do what your Floooww role allows. Scopes requested at sign-in:",
      "• creators:read, search and view creators",
      "• projects:read / projects:write, view projects, create drafts, invite creators",
      "• content:read / content:write, view content, approve or request changes",
      "• reports:read, read performance and custom reports",
      "• payments:read / payments:write, view payments, prepare releases (always confirmed in Floooww)",
    ],
  },
  {
    id: "tools-read",
    title: "12. Tools: read",
    body: [
      "search_creators, rank creators for a project, with match score, reasons and typical fee",
      "get_creator: profile, audience, past brands and reviews",
      "get_project_status, invites, drafts to review, disputes and next actions",
      "list_content: content hub items with status, usage rights and results",
      "get_report, net sales, orders, clicks and views by creator, post or platform",
      "get_payments: held amounts, upcoming releases, refunds and invoices",
      "Example input for search_creators:",
    ],
    code: '{\n  "project_id": "prj_vitamin_c_serum",\n  "platform": "instagram",\n  "city": "Pune",\n  "niche": ["skincare"],\n  "followers": { "min": 10000, "max": 500000 },\n  "engagement_min": 3,\n  "fee_max": 15000,\n  "limit": 5\n}',
  },
  {
    id: "tools-write",
    title: "13. Tools: write",
    body: [
      "create_project_draft, start a project with type, partnership, duration, platforms, deliverables, budget and target",
      "invite_creators: invite creators to a project with the brief attached",
      "review_content: approve a draft or request changes with a note",
      "prepare_payment_release: prepare a release from escrow",
      "Example input for invite_creators:",
    ],
    code: '{\n  "project_id": "prj_monsoon_sunscreen",\n  "creators": [\n    { "creator_id": "cr_sneha_patil", "fee": 12500 },\n    { "creator_id": "cr_ishita_rao", "fee": 11000 }\n  ]\n}',
  },
  {
    id: "confirmations",
    title: "14. Confirmations",
    body: [
      "Write tools never act on their own. They return a summary and a link, and nothing happens until you confirm in Floooww. Links expire after 15 minutes.",
    ],
    code: '{\n  "status": "needs_confirmation",\n  "summary": "Release ₹7,500 to Meera Iyer for Short · Vitamin-C Serum",\n  "confirm_url": "https://app.floooww.com/confirm/act_8Kd2",\n  "expires_at": "2026-11-08T10:45:00+05:30"\n}',
  },
  {
    id: "example-prompts",
    title: "15. Example prompts",
    body: [
      "“Find five skincare creators in Pune within ₹15,000 for Monsoon Sunscreen.”",
      "“What is waiting for my approval on Vitamin-C Serum?”",
      "“Which creators drove the most net sales this month?”",
      "“Which usage rights end in the next 30 days?”",
      "“What needs me across all clients today?” (agencies)",
      "“When will my Glow Squad payment arrive?” (creators)",
    ],
  },
  {
    id: "errors",
    title: "16. Errors",
    body: [
      "unauthorized: sign in again",
      "forbidden: your role does not allow this action",
      "not_found, the project, creator or item does not exist in this workspace",
      "validation_error, an input is missing or invalid; the message says which",
      "confirmation_required: open the confirm_url to finish the action",
      "rate_limited: wait and try again",
    ],
  },
  {
    id: "rate-limits",
    title: "17. Rate limits",
    body: [
      "MCP: 60 tool calls per minute per user. REST API: 600 requests per minute per key. Remaining limits are returned in response headers. [Placeholders: confirm before launch.] ",
    ],
  },
  {
    id: "test-connection",
    title: "18. Test your connection",
    body: ["Use the MCP Inspector to check the server and sign-in before connecting an assistant:"],
    code: "npx @modelcontextprotocol/inspector\n# Transport: Streamable HTTP\n# URL: https://mcp.floooww.com/mcp",
  },
  {
    id: "troubleshooting",
    title: "19. Troubleshooting",
    body: [
      "Sign-in keeps looping: allow pop-ups for floooww.com and try again.",
      "Tools are missing: check your role in Floooww; some tools need write access.",
      "Wrong workspace: revoke the connection in Settings › Connected apps and connect again.",
      "Behind a company proxy: allow mcp.floooww.com and api.floooww.com.",
    ],
  },
  {
    id: "rest-api",
    title: "20. REST API",
    body: [
      "Create a key in Settings › Developers, choose a workspace and read or write access, and send it as a Bearer token. Lists use cursor pagination.",
    ],
    code: 'curl https://api.floooww.com/v1/projects/prj_vitamin_c_serum \\\n  -H "Authorization: Bearer $FLOOOWW_API_KEY"',
  },
  {
    id: "webhooks",
    title: "21. Webhooks",
    body: [
      "Add a URL in Settings › Developers and choose events: invite.accepted, escrow.held, content.submitted, content.changes_requested, content.approved, post.live, payment.released, dispute.opened. Verify each request’s Floooww-Signature header (HMAC-SHA256 of the raw body with your signing secret). Failed deliveries are retried for 24 hours.",
    ],
    code: 'const expected = crypto\n  .createHmac("sha256", process.env.FLOOOWW_WEBHOOK_SECRET)\n  .update(rawBody)\n  .digest("hex");\nif (expected !== req.headers["floooww-signature"]) reject();',
  },
  {
    id: "security",
    title: "22. Security and data",
    body: [
      "The MCP server and API follow our Privacy Policy. Access is limited to your role, tokens can be revoked at any time, and Floooww does not use your workspace data to train AI models. The assistant you connect is run by its own provider, whose terms apply to what you share with it.",
    ],
  },
  {
    id: "support",
    title: "23. Changelog and support",
    body: [
      "Changes are published at https://docs.floooww.com/changelog. For help, contact us and choose Developers.",
    ],
  },
];
