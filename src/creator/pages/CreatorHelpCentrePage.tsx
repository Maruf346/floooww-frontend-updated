import { useState } from "react";
import {
  Search,
  Compass,
  Image as ImageIcon,
  Wallet,
  Scale,
  BarChart3,
  MessageSquare,
  MessageCircle,
  X,
  Send,
  Paperclip,
  Check,
  ChevronRight,
  ArrowLeft,
  Clock,
  Sparkles,
  Bot,
  User,
} from "lucide-react";
import { CreatorShell } from "@/creator/components/CreatorShell";

type Ticket = {
  id: string;
  subject: string;
  status: "Waiting on us" | "Solved";
  updated: string;
  category?: string;
  messages?: { sender: "user" | "support"; text: string; time: string }[];
};

type HelpTopic = {
  id: string;
  title: string;
  description: string;
  icon: typeof Compass;
  articles: { title: string; content: string }[];
};

const HELP_TOPICS: HelpTopic[] = [
  {
    id: "finding-projects",
    title: "Finding projects",
    description: "Discovery, fit score, applying and offers",
    icon: Compass,
    articles: [
      {
        title: "How does the creator fit score work?",
        content:
          "Floooww matches your niche, engagement rate, primary audience demographics, and past campaign performance with the brand's requirements to compute your fit score.",
      },
      {
        title: "Applying to open project briefs",
        content:
          "Browse through 'Project discovery', review the deliverables, rate, and timeline. Click 'Apply' to send your pitch note, media kit, and requested rates.",
      },
      {
        title: "Accepting or countering brand offers",
        content:
          "When a brand sends an offer or counter-offer, you can accept immediately to lock in escrow, decline, or send a counter-proposal with updated deliverables or pricing.",
      },
    ],
  },
  {
    id: "your-content",
    title: "Your content",
    description: "Uploading, approvals and usage rights",
    icon: ImageIcon,
    articles: [
      {
        title: "Uploading deliverable drafts for review",
        content:
          "Upload your video files (MP4, MOV up to 2GB) in 'My projects' under the active project. Brands have 48 hours to request revisions or approve.",
      },
      {
        title: "Understanding usage rights and whitelisting",
        content:
          "Organic posting includes standard 30-day rights. If a brand requests paid ad whitelisting or spark ads, an additional licensing fee applies as specified in your agreement.",
      },
      {
        title: "Revisions and feedback rounds",
        content:
          "Standard collaborations include 1 complimentary revision round for minor script/caption changes. Additional re-shoots outside the agreed brief require brand approval.",
      },
    ],
  },
  {
    id: "getting-paid",
    title: "Getting paid",
    description: "Escrow, payouts, the Kreyio fee, invoices",
    icon: Wallet,
    articles: [
      {
        title: "How escrow protection guarantees your payment",
        content:
          "Before you film or start work, 100% of the project funds are secured in Floooww's RBI-compliant escrow account. Funds are released automatically once deliverables are approved.",
      },
      {
        title: "Payout processing times and methods",
        content:
          "Approved payouts are credited directly to your verified bank account via IMPS/NEFT within 24 to 48 hours. You can download GST tax invoices under 'Earnings'.",
      },
      {
        title: "Kreyio creator platform fee",
        content:
          "Kreyio charges a flat, transparent 11% platform fee on completed collaborations, which covers escrow protection, contract drafting, and dispute mediation.",
      },
    ],
  },
  {
    id: "disputes",
    title: "Disputes",
    description: "How disputes work and timelines",
    icon: Scale,
    articles: [
      {
        title: "What happens if a brand is unresponsive?",
        content:
          "If a brand does not review your uploaded deliverable within 5 business days, the milestone auto-approves and escrow funds are released to you.",
      },
      {
        title: "Initiating a dispute review",
        content:
          "If there is a disagreement regarding deliverables or scope changes, you can raise a dispute ticket. A Floooww mediator will review the chat logs and briefs within 24 hours.",
      },
      {
        title: "Mediation process and resolution",
        content:
          "Both parties are given 48 hours to submit evidence. The mediator reaches an equitable resolution based strictly on the signed project agreement.",
      },
    ],
  },
  {
    id: "profile-stats",
    title: "Profile & stats",
    description: "Connected accounts, media kit, results",
    icon: BarChart3,
    articles: [
      {
        title: "Connecting Instagram, YouTube, and TikTok accounts",
        content:
          "Go to Settings > Connected accounts. Authorize your professional or creator Instagram and YouTube accounts via OAuth to sync live analytics.",
      },
      {
        title: "Updating your rate card and primary niche",
        content:
          "Keep your primary niche and baseline deliverable pricing updated in Settings > Account so matching brands can discover you accurately.",
      },
      {
        title: "Public media kit link and verified badges",
        content:
          "Share your verified floooww.me creator profile link in your bio or pitch emails. Badges like 'Top creator' are awarded based on completion rate and client reviews.",
      },
    ],
  },
];

export function CreatorHelpCentrePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    content: string;
  } | null>(null);

  // Tickets state
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "#5120",
      subject: "Payout for Reel 2 isn’t in my bank yet",
      status: "Waiting on us",
      updated: "2 h ago",
      category: "Getting paid",
      messages: [
        {
          sender: "user",
          text: "Hi support team, deliverable was approved yesterday morning by Foxtale, but the payout status still shows processing. Can you confirm when it will reflect in HDFC?",
          time: "2 h ago",
        },
      ],
    },
    {
      id: "#4987",
      subject: "How do I add YouTube to my media kit?",
      status: "Solved",
      updated: "12 Oct",
      category: "Profile & stats",
      messages: [
        {
          sender: "user",
          text: "Hi, I just started posting YouTube Shorts. How do I connect YouTube to show up on my profile card?",
          time: "12 Oct, 10:15 AM",
        },
        {
          sender: "support",
          text: "Hello Ishita! You can head over to Settings -> Connected Accounts -> Click 'Connect YouTube' to sync your subscriber count and average shorts views.",
          time: "12 Oct, 11:30 AM",
        },
      ],
    },
  ]);

  // Modals and Drawers
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Contact form state
  const [contactSubject, setContactSubject] = useState("");
  const [contactCategory, setContactCategory] = useState("Getting paid");
  const [contactMessage, setContactMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // AI Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "assistant" | "user"; text: string }[]
  >([
    {
      sender: "assistant",
      text: "Hi Ishita! I'm Floooww Creator Assistant. Ask me anything about payouts, escrow, deliverable guidelines, or your project status.",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactSubject.trim() || !contactMessage.trim()) return;

    const newTicketId = `#${5121 + tickets.length}`;
    const newTicket: Ticket = {
      id: newTicketId,
      subject: contactSubject.trim(),
      status: "Waiting on us",
      updated: "Just now",
      category: contactCategory,
      messages: [
        {
          sender: "user",
          text: contactMessage.trim(),
          time: "Just now",
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setIsContactModalOpen(false);
    setContactSubject("");
    setContactMessage("");
    showToast(`Support ticket ${newTicketId} created successfully. Our team will reply shortly.`);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      let reply =
        "Thanks for asking! Escrow payouts are processed within 24-48 hours once brand approval is given. If you need urgent assistance, you can also submit a support ticket above.";
      const lower = userText.toLowerCase();
      if (lower.includes("paid") || lower.includes("payout") || lower.includes("money")) {
        reply =
          "Payouts are released directly to your verified bank account via IMPS/NEFT within 24 to 48 business hours after the brand approves your deliverables. You can check the transaction status anytime in the Earnings tab.";
      } else if (lower.includes("niche") || lower.includes("language") || lower.includes("profile")) {
        reply =
          "You can update your primary niche, languages, bio, and handle under Settings > Account. Click 'Edit profile' to customize your tags and details.";
      } else if (lower.includes("deliverable") || lower.includes("upload") || lower.includes("video")) {
        reply =
          "To upload drafts, go to 'My projects', select your active project, and navigate to the Deliverables tab. You can upload video files up to 2GB in MP4 or MOV format.";
      }
      setChatMessages((prev) => [...prev, { sender: "assistant", text: reply }]);
    }, 600);
  };

  // Filter topics based on search query
  const filteredTopics = HELP_TOPICS.filter((topic) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesTopic =
      topic.title.toLowerCase().includes(q) ||
      topic.description.toLowerCase().includes(q);
    const matchesArticles = topic.articles.some(
      (a) =>
        a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
    );
    return matchesTopic || matchesArticles;
  });

  return (
    <CreatorShell>
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-6 relative" data-name="CR-11 · Help centre">
        {/* Toast notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 bg-[#0d0d10] text-white px-4 py-2.5 rounded-lg shadow-lg text-[13px] font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <Check className="size-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-['Inter'] font-bold text-[26px] text-[#0d0d10] leading-[34px] tracking-[-0.13px]">
              Help centre
            </h1>
            <p className="font-['Inter'] text-[13px] text-[#71717a] leading-[20px] mt-1">
              Answers, guides and support for creators.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="bg-[#0d0d10] hover:bg-black text-white h-10 px-4 rounded-[8px] flex items-center justify-center gap-2 text-[14px] font-medium transition cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <MessageSquare className="size-4" />
            <span>Contact support</span>
          </button>
        </div>

        {/* Search Field */}
        <div className="w-full">
          <div className="bg-white border border-[#e3e5ec] hover:border-[#0d0d10] focus-within:border-[#0d0d10] transition h-10 px-3 rounded-[8px] flex items-center gap-2 w-full">
            <Search className="size-4 text-[#71717a] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedTopic(null);
                setSelectedArticle(null);
              }}
              placeholder="Search help: e.g. “when do I get paid”"
              className="w-full text-[13px] text-[#0d0d10] placeholder:text-[#a3a3ac] focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#a3a3ac] hover:text-[#0d0d10] p-1"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Selected Topic or Article View */}
        {selectedArticle ? (
          <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-1.5 text-[13px] text-[#71717a] hover:text-[#0d0d10] font-medium"
              >
                <ArrowLeft className="size-4" />
                <span>Back to {selectedTopic?.title || "topics"}</span>
              </button>
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[#0d0d10] leading-7">
                {selectedArticle.title}
              </h2>
              <p className="mt-3 text-[14px] text-[#4a4a55] leading-relaxed">
                {selectedArticle.content}
              </p>
            </div>
            <div className="border-t border-[#f0f1f5] pt-4 mt-2 flex items-center justify-between text-[13px] text-[#71717a]">
              <span>Was this article helpful?</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast("Thank you for your feedback!")}
                  className="px-3 py-1.5 rounded-md border border-[#e3e5ec] hover:border-[#0d0d10] text-[#0d0d10] font-medium transition"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-3 py-1.5 rounded-md border border-[#e3e5ec] hover:border-[#0d0d10] text-[#0d0d10] font-medium transition"
                >
                  No, contact support
                </button>
              </div>
            </div>
          </div>
        ) : selectedTopic ? (
          <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="inline-flex items-center gap-1.5 text-[13px] text-[#71717a] hover:text-[#0d0d10] font-medium"
              >
                <ArrowLeft className="size-4" />
                <span>All topics</span>
              </button>
              <span className="text-[12px] text-[#71717a]">
                {selectedTopic.articles.length} guides
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[8px] bg-[#f1f4ff] text-[#0d0d10] flex items-center justify-center shrink-0">
                <selectedTopic.icon className="size-[18px]" />
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-[#0d0d10]">
                  {selectedTopic.title}
                </h2>
                <p className="text-[13px] text-[#71717a]">
                  {selectedTopic.description}
                </p>
              </div>
            </div>
            <div className="divide-y divide-[#f0f1f5] border-t border-[#f0f1f5] mt-2">
              {selectedTopic.articles.map((article) => (
                <button
                  key={article.title}
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-3.5 flex items-center justify-between text-left hover:text-blue-600 group transition"
                >
                  <span className="text-[14px] font-medium text-[#0d0d10] group-hover:text-[#014ef6]">
                    {article.title}
                  </span>
                  <ChevronRight className="size-4 text-[#a3a3ac] group-hover:text-[#014ef6] transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* 5 Topic Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {filteredTopics.map((topic) => {
              const IconComp = topic.icon;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-white border border-[#e3e5ec] hover:border-[#0d0d10] rounded-[12px] p-5 flex flex-col gap-2 transition cursor-pointer text-left hover:shadow-sm group"
                >
                  <div className="size-9 rounded-[8px] bg-[#f1f4ff] text-[#0d0d10] flex items-center justify-center shrink-0 group-hover:bg-[#e4ebff] transition">
                    <IconComp className="size-[18px]" />
                  </div>
                  <h3 className="font-['Inter'] font-semibold text-[14px] text-[#0d0d10] leading-5 whitespace-nowrap mt-1">
                    {topic.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-[13px] text-[#71717a] leading-5">
                    {topic.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Your Tickets Section */}
        <div className="bg-white border border-[#e3e5ec] rounded-[12px] p-5 flex flex-col gap-4 w-full" data-name="Your tickets">
          <div className="flex items-center justify-between">
            <h2 className="font-['Inter'] font-semibold text-[16px] text-[#0d0d10] leading-6">
              Your tickets
            </h2>
            <span className="text-[12px] text-[#71717a]">
              {tickets.length} total
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            <div className="min-w-[640px] flex flex-col w-full">
              {/* Header */}
              <div className="bg-[#f4f6fb] flex gap-3 items-center px-4 py-2.5 rounded-[6px] text-[12px] font-semibold text-[#71717a]">
                <div className="w-[110px] shrink-0">Ticket</div>
                <div className="flex-1 min-w-[200px]">Subject</div>
                <div className="w-[140px] shrink-0">Status</div>
                <div className="w-[110px] shrink-0 text-right sm:text-left">Updated</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#edeff3]">
                {tickets.map((t) => {
                  const isWaiting = t.status === "Waiting on us";
                  return (
                    <div
                      key={t.id}
                      onClick={() => setActiveTicket(t)}
                      className="flex gap-3 items-center px-4 py-3 hover:bg-[#fafafc] transition cursor-pointer group"
                    >
                      <div className="w-[110px] shrink-0 font-medium text-[14px] text-[#0d0d10] group-hover:underline">
                        {t.id}
                      </div>
                      <div className="flex-1 min-w-[200px] text-[13px] text-[#0d0d10] truncate">
                        {t.subject}
                      </div>
                      <div className="w-[140px] shrink-0">
                        {isWaiting ? (
                          <span className="bg-[#feefce] text-[#b45309] font-medium text-[12px] px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 whitespace-nowrap">
                            <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                            <span>Waiting on us</span>
                          </span>
                        ) : (
                          <span className="bg-[#e1fce3] text-[#15803d] font-medium text-[12px] px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 whitespace-nowrap">
                            <span className="size-1.5 rounded-full bg-[#16a34a]" />
                            <span>Solved</span>
                          </span>
                        )}
                      </div>
                      <div className="w-[110px] shrink-0 text-[13px] text-[#71717a] text-right sm:text-left">
                        {t.updated}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Chatbot Launcher Button */}
        <button
          type="button"
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          aria-label="Open Creator Assistant"
          className="fixed right-6 bottom-6 z-40 size-14 rounded-full bg-[#0d0d10] hover:bg-black text-white shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.22)] flex items-center justify-center cursor-pointer transition transform hover:scale-105"
        >
          {isAssistantOpen ? (
            <X className="size-6 text-white" />
          ) : (
            <MessageCircle className="size-6 text-white" />
          )}
        </button>

        {/* Floating AI Assistant Drawer / Popover */}
        {isAssistantOpen && (
          <div className="fixed right-6 bottom-24 z-50 w-[380px] max-w-[calc(100vw-32px)] bg-white rounded-2xl border border-[#e3e5ec] shadow-[0px_20px_50px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
            {/* Header */}
            <div className="bg-[#0d0d10] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[14px] leading-5">
                    Floooww Assistant
                  </h3>
                  <p className="text-[11px] text-white/70 leading-4">
                    AI instant creator support
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAssistantOpen(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="p-3 bg-[#f8f9fb] border-b border-[#edeff3] flex gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setChatInput("When will my payout arrive?")}
                className="text-[11px] bg-white border border-[#e3e5ec] hover:border-[#0d0d10] px-2.5 py-1 rounded-full whitespace-nowrap text-[#4a4a55] transition"
              >
                When will my payout arrive?
              </button>
              <button
                type="button"
                onClick={() => setChatInput("How does escrow work?")}
                className="text-[11px] bg-white border border-[#e3e5ec] hover:border-[#0d0d10] px-2.5 py-1 rounded-full whitespace-nowrap text-[#4a4a55] transition"
              >
                How does escrow work?
              </button>
            </div>

            {/* Messages Body */}
            <div className="p-4 flex flex-col gap-3 max-h-[340px] overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 items-start ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`size-6 rounded-full flex items-center justify-center shrink-0 text-[11px] ${
                      msg.sender === "user"
                        ? "bg-[#0d0d10] text-white"
                        : "bg-subtle text-[#3B5BFF]"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="size-3.5" />
                    ) : (
                      <Bot className="size-3.5" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-xl text-[13px] leading-relaxed max-w-[82%] ${
                      msg.sender === "user"
                        ? "bg-[#0d0d10] text-white rounded-tr-none"
                        : "bg-[#f4f6fb] text-[#0d0d10] rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendChatMessage}
              className="p-3 border-t border-[#edeff3] bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about payments, briefs, rates..."
                className="flex-1 h-9 px-3 text-[13px] border border-[#e3e5ec] rounded-lg focus:outline-none focus:border-[#0d0d10]"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="size-9 rounded-lg bg-[#3B5BFF] text-white flex items-center justify-center hover:bg-[#2a4be6] transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        )}

        {/* Contact Support Modal */}
        {isContactModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-2xl w-full max-w-[500px] border border-[#e5e7eb] shadow-2xl p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0f1f5]">
                <div>
                  <h3 className="text-[18px] font-bold text-[#0d0d10]">
                    Contact support
                  </h3>
                  <p className="text-[12px] text-[#71717a] mt-0.5">
                    Submit a query and our team will reply within 2 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="size-8 rounded-lg flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="flex flex-col gap-4">
                <div>
                  <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Briefly summarize your request"
                    className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10]"
                  />
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                    Category
                  </label>
                  <select
                    value={contactCategory}
                    onChange={(e) => setContactCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10] bg-white cursor-pointer"
                  >
                    <option value="Getting paid">Getting paid / Escrow</option>
                    <option value="Finding projects">Finding projects & proposals</option>
                    <option value="Your content">Content & deliverable reviews</option>
                    <option value="Disputes">Dispute resolution</option>
                    <option value="Profile & stats">Profile, stats & connections</option>
                    <option value="Other">Other enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[12px] font-medium text-[#4a4a55] block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Provide relevant details such as project name, date or error description..."
                    className="w-full p-3 rounded-lg border border-[#e3e5ec] text-[13px] text-[#0d0d10] focus:outline-none focus:border-[#0d0d10] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => showToast("File attachment option selected.")}
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#71717a] hover:text-[#0d0d10] px-2 py-1 rounded"
                  >
                    <Paperclip className="size-4" />
                    <span>Attach screenshot</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsContactModalOpen(false)}
                      className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 h-9 rounded-lg bg-[#0d0d10] text-[13px] font-medium text-white hover:bg-black inline-flex items-center gap-1.5"
                    >
                      <Send className="size-3.5" />
                      <span>Submit ticket</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Ticket Details Modal */}
        {activeTicket && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-2xl w-full max-w-[560px] border border-[#e5e7eb] shadow-2xl p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-[#f0f1f5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[18px] text-[#0d0d10]">
                      {activeTicket.id}
                    </span>
                    {activeTicket.status === "Waiting on us" ? (
                      <span className="bg-[#feefce] text-[#b45309] font-medium text-[11px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="size-1 rounded-full bg-[#f59e0b]" />
                        <span>Waiting on us</span>
                      </span>
                    ) : (
                      <span className="bg-[#e1fce3] text-[#15803d] font-medium text-[11px] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="size-1 rounded-full bg-[#16a34a]" />
                        <span>Solved</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-[14px] font-semibold text-[#0d0d10] mt-1">
                    {activeTicket.subject}
                  </h4>
                  <p className="text-[12px] text-[#71717a] mt-0.5">
                    Category: {activeTicket.category || "General"} · Updated {activeTicket.updated}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTicket(null)}
                  className="size-8 rounded-lg flex items-center justify-center text-[#71717a] hover:bg-[#f4f6fb]"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Message thread */}
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto py-2">
                {activeTicket.messages?.map((m, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl text-[13px] ${
                      m.sender === "user"
                        ? "bg-[#f8f9fb] text-[#0d0d10] border border-[#e5e7eb]"
                        : "bg-[#f1f4ff] text-[#0d0d10] border border-[#d8e0ff]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 text-[11px] text-[#71717a]">
                      <span className="font-semibold text-[#0d0d10]">
                        {m.sender === "user" ? "Ishita Rao (You)" : "Floooww Support Agent"}
                      </span>
                      <span>{m.time}</span>
                    </div>
                    <p className="leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0f1f5]">
                <button
                  type="button"
                  onClick={() => setActiveTicket(null)}
                  className="px-4 h-9 rounded-lg border border-[#e3e5ec] text-[13px] font-medium text-[#4a4a55] hover:bg-[#f8f9fb]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CreatorShell>
  );
}
export default CreatorHelpCentrePage;
