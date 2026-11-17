import { useState, useRef, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Paperclip, Search, Send, ArrowLeft } from "lucide-react";
import { CreatorShell } from "@/creator/components/CreatorShell";
import { ROUTES } from "@/common/constants/routes";

interface ChatMessage {
  id: string;
  kind: "event" | "incoming" | "outgoing";
  text: string;
  time?: string;
}

interface MessageThread {
  id: string;
  brandName: string;
  contactPerson: string;
  brandCode: string;
  brandColor: string;
  project: string;
  subtitle: string;
  preview: string;
  time: string;
  messages: ChatMessage[];
}

const INITIAL_THREADS: MessageThread[] = [
  {
    id: "minimalist-vcs",
    brandName: "Minimalist",
    contactPerson: "Ananya Mehta",
    brandCode: "MI",
    brandColor: "bg-[#3b5bff]",
    project: "Vitamin-C Serum",
    subtitle: "Vitamin-C Serum · 3 of 4 deliverables approved · ₹4,250 in escrow",
    preview: "Can you add the coupon on screen?",
    time: "2 h",
    messages: [
      {
        id: "m-1",
        kind: "event",
        text: "Offer accepted · ₹17,000 held in escrow · 7 Oct",
      },
      {
        id: "m-2",
        kind: "incoming",
        text: "Hi Ishita! Loved Reel 2. For the Story, can you add the coupon ISHITA15 on screen?",
        time: "10:14 AM",
      },
      {
        id: "m-3",
        kind: "event",
        text: "Changes asked · Story · 28 Oct",
      },
      {
        id: "m-4",
        kind: "outgoing",
        text: "Sure! I'll upload version 2 by 30 Oct with ISHITA15 on screen.",
        time: "10:32 AM",
      },
    ],
  },
  {
    id: "velvet-lip",
    brandName: "Velvet Lip Co.",
    contactPerson: "Pooja Shah",
    brandCode: "VL",
    brandColor: "bg-[#8b5cf6]",
    project: "Matte Lip Launch",
    subtitle: "Matte Lip Launch · Offer sent · ₹15,000 fee",
    preview: "Offer sent · reply by 2 Nov",
    time: "1 d",
    messages: [
      {
        id: "vl-1",
        kind: "event",
        text: "Offer received · 1 Reel + 1 Story · ₹15,000 · 29 Oct",
      },
      {
        id: "vl-2",
        kind: "incoming",
        text: "Hey Ishita! We'd love to partner on our Matte Lip Launch. Please review the deliverables and brief.",
        time: "Yesterday, 3:20 PM",
      },
      {
        id: "vl-3",
        kind: "outgoing",
        text: "Hi Pooja! Thanks for the invite, reviewing now!",
        time: "Yesterday, 4:05 PM",
      },
    ],
  },
  {
    id: "dewdrop",
    brandName: "Dewdrop Naturals",
    contactPerson: "Kavita Sen",
    brandCode: "DN",
    brandColor: "bg-[#0d9488]",
    project: "Night Repair Range",
    subtitle: "Night Repair Range · Brief discussion · ₹6,000 fee",
    preview: "Thanks for your ask: checking with the team",
    time: "2 d",
    messages: [
      {
        id: "dn-1",
        kind: "outgoing",
        text: "Hi Kavita! Could you share whether the Night Repair Range requires a 30-day review timeline or 15 days?",
        time: "2 days ago, 11:15 AM",
      },
      {
        id: "dn-2",
        kind: "incoming",
        text: "Thanks for your ask: checking with the team and will update the brief by tomorrow!",
        time: "2 days ago, 1:40 PM",
      },
    ],
  },
  {
    id: "minimalist-glow",
    brandName: "Minimalist",
    contactPerson: "Rahul Verma",
    brandCode: "MI",
    brandColor: "bg-[#3b5bff]",
    project: "Glow Squad",
    subtitle: "Glow Squad · Long-term · Cycle 1 approved",
    preview: "Cycle 1 approved · payout on 2 Nov",
    time: "3 d",
    messages: [
      {
        id: "mg-1",
        kind: "event",
        text: "Cycle 1 completed · 2 Reels + 1 Story approved · 27 Sep",
      },
      {
        id: "mg-2",
        kind: "incoming",
        text: "Amazing work on Cycle 1 deliverables! Cycle 1 approved · payout on 2 Nov.",
        time: "3 days ago, 5:30 PM",
      },
      {
        id: "mg-3",
        kind: "outgoing",
        text: "Thank you Rahul! Looking forward to Cycle 2!",
        time: "3 days ago, 6:10 PM",
      },
    ],
  },
];

export default function CreatorMessagesPage() {
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>("minimalist-vcs");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread =
    threads.find((t) => t.id === activeThreadId) || threads[0];

  const filteredThreads = threads.filter(
    (t) =>
      t.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThreadId, activeThread?.messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      kind: "outgoing",
      text: inputText.trim(),
      time: "Just now",
    };

    setThreads((prevThreads) =>
      prevThreads.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            preview: inputText.trim(),
            time: "Just now",
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    setInputText("");
  };

  return (
    <CreatorShell>
      <div className="flex h-[calc(100dvh-64px)] w-full overflow-hidden bg-white text-[#0d0d10]">
        {/* Left Pane: Threads List */}
        <aside
          className={`${
            mobileThreadOpen ? "hidden md:flex" : "flex"
          } w-full md:w-[320px] lg:w-[360px] shrink-0 flex-col border-r border-[#e3e5ec] bg-white h-full overflow-hidden`}
        >
          {/* Header */}
          <div className="p-4 border-b border-[#e3e5ec] flex flex-col gap-3 shrink-0">
            <h1 className="text-[16px] font-semibold text-[#0d0d10] leading-6">
              Messages
            </h1>
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3ac]" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-[8px] border border-[#e3e5ec] text-[13px] text-[#0d0d10] placeholder:text-[#a3a3ac] focus:outline-hidden focus:border-[#0d0d10] bg-white transition"
              />
            </div>
          </div>

          {/* Thread List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#f4f6fb]">
            {filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setMobileThreadOpen(true);
                  }}
                  className={`w-full p-4 flex items-start gap-3 text-left transition cursor-pointer select-none ${
                    isActive ? "bg-[#f1f4ff]" : "hover:bg-[#f8f9fb]"
                  }`}
                >
                  {/* Brand Avatar Badge */}
                  <div
                    className={`size-9 rounded-[8px] flex items-center justify-center text-white text-[12px] font-semibold shrink-0 shadow-xs ${thread.brandColor}`}
                  >
                    {thread.brandCode}
                  </div>

                  {/* Thread Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-[14px] font-medium text-[#0d0d10] truncate">
                        {thread.brandName}
                      </p>
                      <span className="text-[12px] text-[#a3a3ac] shrink-0 font-normal">
                        {thread.time}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#71717a] font-normal truncate mt-0.5">
                      {thread.project}
                    </p>
                    <p className="text-[13px] text-[#4a4a55] font-normal truncate mt-1">
                      {thread.preview}
                    </p>
                  </div>
                </button>
              );
            })}

            {filteredThreads.length === 0 && (
              <div className="p-8 text-center text-[13px] text-[#8491a3]">
                No messages found
              </div>
            )}
          </div>
        </aside>

        {/* Right Pane: Chat Conversation Area */}
        <section
          className={`${
            mobileThreadOpen ? "flex" : "hidden md:flex"
          } flex-1 flex-col h-full bg-white overflow-hidden`}
        >
          {/* Chat Header */}
          <header className="h-[64px] border-b border-[#e3e5ec] px-5 sm:px-6 flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileThreadOpen(false)}
                className="md:hidden size-8 flex items-center justify-center text-[#4a4a55] hover:bg-[#f4f6fb] rounded-md mr-1"
                aria-label="Back to threads"
              >
                <ArrowLeft className="size-5" />
              </button>

              <div
                className={`size-9 rounded-[8px] flex items-center justify-center text-white text-[12px] font-semibold shrink-0 ${activeThread.brandColor}`}
              >
                {activeThread.brandCode}
              </div>

              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#0d0d10] leading-5 truncate">
                  {activeThread.brandName} · {activeThread.contactPerson}
                </p>
                <p className="text-[12px] text-[#71717a] leading-4 truncate">
                  {activeThread.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                to={ROUTES.creatorProjectDetail}
                className="h-[36px] px-3.5 border border-[#e3e5ec] rounded-[8px] text-[13px] font-medium text-[#0d0d10] hover:bg-[#f8f9fb] transition flex items-center justify-center shadow-xs whitespace-nowrap"
              >
                View project
              </Link>
            </div>
          </header>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-4 bg-white">
            {activeThread.messages.map((msg) => {
              if (msg.kind === "event") {
                return (
                  <div key={msg.id} className="flex justify-center my-1.5">
                    <span className="bg-[#f4f6fb] px-3.5 py-1 rounded-full text-[12px] text-[#4a4a55] font-normal max-w-md text-center">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              if (msg.kind === "incoming") {
                return (
                  <div key={msg.id} className="flex flex-col items-start gap-1 max-w-[500px]">
                    <div className="bg-white border border-[#e3e5ec] text-[#0d0d10] rounded-2xl rounded-tl-xs p-3.5 text-[13px] leading-[20px] shadow-2xs">
                      {msg.text}
                    </div>
                    {msg.time && (
                      <span className="text-[10px] text-[#a3a3ac] pl-1">{msg.time}</span>
                    )}
                  </div>
                );
              }

              return (
                <div key={msg.id} className="flex flex-col items-end gap-1 max-w-[500px] ml-auto">
                  <div className="bg-[#0d0d10] text-white rounded-2xl rounded-tr-xs p-3.5 text-[13px] leading-[20px] shadow-2xs">
                    {msg.text}
                  </div>
                  {msg.time && (
                    <span className="text-[10px] text-[#a3a3ac] pr-1">{msg.time}</span>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-[#e3e5ec] p-4 bg-white flex items-center gap-3 shrink-0"
          >
            <button
              type="button"
              onClick={() => alert("File attachment dialog (images, videos, briefs)...")}
              className="size-10 flex items-center justify-center rounded-lg text-[#71717a] hover:text-[#0d0d10] hover:bg-[#f4f6fb] transition cursor-pointer shrink-0"
              title="Attach files"
            >
              <Paperclip className="size-5" />
            </button>

            <input
              type="text"
              placeholder="Write a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 px-3.5 border border-[#e3e5ec] rounded-lg text-[13px] text-[#0d0d10] focus:outline-hidden focus:border-[#0d0d10] placeholder:text-[#a3a3ac] bg-white transition"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="h-10 px-4 bg-[#0d0d10] hover:bg-black disabled:opacity-40 disabled:hover:bg-[#0d0d10] text-white text-[13px] font-medium rounded-lg flex items-center gap-2 cursor-pointer transition shadow-xs shrink-0"
            >
              <span>Send</span>
              <Send className="size-3.5" />
            </button>
          </form>
        </section>
      </div>
    </CreatorShell>
  );
}
