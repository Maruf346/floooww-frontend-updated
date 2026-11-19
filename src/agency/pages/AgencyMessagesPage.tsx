import { useEffect, useMemo, useState } from "react";
import { Paperclip, Search, Send } from "lucide-react";
import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { AgencyShell } from "@/agency/components/AgencyShell";
import { agencyClientProjectDetailRoute } from "@/common/constants/routes";

type Thread = {
  id: string;
  name: string;
  project: string;
  preview: string;
  time: string;
  avatar: string;
  meta: string;
};

type ChatItem =
  | { kind: "event"; id: string; text: string }
  | { kind: "incoming" | "outgoing"; id: string; text: string };

const threads: Thread[] = [
  {
    id: "meera",
    name: "Meera Iyer",
    project: "Vitamin-C Serum",
    preview: "Short is uploaded for review 🎬",
    time: "2 m",
    avatar: "https://www.figma.com/api/mcp/asset/f8edfeb0-72e8-4028-b332-b7a18e8a13ee.png",
    meta: "Vitamin-C Serum · 3 of 4 deliverables · ₹7,500 in escrow",
  },
  {
    id: "nisha",
    name: "Nisha Verma",
    project: "Vitamin-C Serum",
    preview: "Accepted! When will escrow be funded?",
    time: "1 h",
    avatar: "https://www.figma.com/api/mcp/asset/f1446219-46cd-4333-8a8e-f892d7525bba.png",
    meta: "Vitamin-C Serum · 2 of 3 deliverables · ₹12,500 in escrow",
  },
  {
    id: "rohan",
    name: "Rohan Desai",
    project: "Monsoon Sunscreen",
    preview: "Both Shorts are live now",
    time: "1 d",
    avatar: "https://www.figma.com/api/mcp/asset/64aa2972-a0bd-4363-9d2f-cb74174a38d8.png",
    meta: "Monsoon Sunscreen · 2 of 2 deliverables · ₹7,500 released",
  },
  {
    id: "ishita",
    name: "Ishita Rao",
    project: "Vitamin-C Serum",
    preview: "Thank you for the quick approval!",
    time: "2 d",
    avatar: "https://www.figma.com/api/mcp/asset/9c35f616-7381-49dc-8b0c-5a3c647ef7da.png",
    meta: "Vitamin-C Serum · 3 of 4 deliverables · ₹4,250 in escrow",
  },
];

const initialMessages: Record<string, ChatItem[]> = {
  meera: [
    { id: "offer", kind: "event", text: "Offer accepted · ₹30,000 held in escrow · 14 Oct" },
    {
      id: "draft",
      kind: "incoming",
      text: "Hi Ananya! Sharing the Short draft: routine in 3 steps, code at 0:12.",
    },
    { id: "submitted", kind: "event", text: "Content submitted · YouTube Short · 28 Oct" },
    {
      id: "reply",
      kind: "outgoing",
      text: "Looks great, approving now. Can you pin the link in the description too?",
    },
  ],
  nisha: [
    {
      id: "invite",
      kind: "event",
      text: "Invitation accepted · funding is held in escrow · 27 Oct",
    },
    { id: "question", kind: "incoming", text: "Accepted! When will escrow be funded?" },
  ],
  rohan: [
    { id: "accepted", kind: "event", text: "Project accepted · 25 Oct" },
    {
      id: "live",
      kind: "incoming",
      text: "Both Shorts are live now. I’ve added the links to the deliverables.",
    },
  ],
  ishita: [
    { id: "approved", kind: "event", text: "Content approved · ₹11,250 released · 26 Oct" },
    { id: "thanks", kind: "incoming", text: "Thank you for the quick approval!" },
  ],
};

function ThreadRow({
  thread,
  selected,
  onClick,
}: {
  thread: Thread;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full gap-2.5 px-4 py-3 text-left transition ${selected ? "bg-primary-subtle" : "bg-white hover:bg-subtle"}`}
    >
      <img src={thread.avatar} alt="" className="size-9 shrink-0 rounded-full object-cover" />
      <span className="min-w-0 flex-1">
        <span className="flex items-start gap-2">
          <span className="flex-1 truncate text-[14px] font-medium leading-[22px] text-ink">
            {thread.name}
          </span>
          <span className="shrink-0 text-[12px] leading-4 text-tertiary">{thread.time}</span>
        </span>
        <span className="block truncate text-[12px] leading-4 text-primary">{thread.project}</span>
        <span className="mt-0.5 block truncate text-[13px] leading-5 text-secondary">
          {thread.preview}
        </span>
      </span>
    </button>
  );
}

export function AgencyMessagesPage() {
  const [searchParams] = useSearchParams();

  const threadParam = searchParams.get("thread") || searchParams.get("creator");
  const nameParam = searchParams.get("name");

  const [threadList, setThreadList] = useState<Thread[]>(() => {
    if (threadParam && !threads.some((t) => t.id === threadParam)) {
      const newThread: Thread = {
        id: threadParam,
        name: nameParam || threadParam.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        project: "Vitamin-C Serum",
        preview: "Start a conversation…",
        time: "Just now",
        avatar: `/assets/creators/${threadParam.split("-")[0]}.png`,
        meta: "Vitamin-C Serum · Invited creator",
      };
      return [newThread, ...threads];
    }
    return threads;
  });

  const [selectedId, setSelectedId] = useState<string>(() => threadParam || "meera");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    if (threadParam) {
      if (!threadList.some((t) => t.id === threadParam)) {
        const newThread: Thread = {
          id: threadParam,
          name: nameParam || threadParam.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          project: "Vitamin-C Serum",
          preview: "Start a conversation…",
          time: "Just now",
          avatar: `/assets/creators/${threadParam.split("-")[0]}.png`,
          meta: "Vitamin-C Serum · Invited creator",
        };
        setThreadList((prev) => [newThread, ...prev]);
      }
      setSelectedId(threadParam);
    }
  }, [threadParam, nameParam]);

  const selected = threadList.find((thread) => thread.id === selectedId) ?? threadList[0];
  const visibleThreads = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term
      ? threadList.filter((thread) => `${thread.name} ${thread.project}`.toLowerCase().includes(term))
      : threadList;
  }, [query, threadList]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((current) => ({
      ...current,
      [selected.id]: [
        ...(current[selected.id] ?? []),
        { id: crypto.randomUUID(), kind: "outgoing", text },
      ],
    }));
    setDraft("");
  };

  return (
    <AgencyShell>
      <div className="-m-5 flex h-[calc(100dvh-64px)] min-h-[560px] overflow-hidden bg-page sm:-m-8">
        <aside className="flex w-full shrink-0 flex-col border-r border-line bg-white md:w-[340px]">
          <div className="p-4">
            <h1 className="text-[16px] font-semibold leading-6 text-ink">Messages</h1>
            <label className="relative mt-2.5 block">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-3 text-secondary"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search messages…"
                className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-[13px] text-ink outline-none placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </label>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto border-t border-line-subtle md:border-t-0">
            {visibleThreads.length ? (
              visibleThreads.map((thread) => (
                <ThreadRow
                  key={thread.id}
                  thread={thread}
                  selected={thread.id === selected.id}
                  onClick={() => setSelectedId(thread.id)}
                />
              ))
            ) : (
              <p className="px-4 py-8 text-center text-[13px] text-secondary">
                No conversations found.
              </p>
            )}
          </div>
        </aside>

        <section className="hidden min-w-0 flex-1 flex-col bg-subtle md:flex">
          <header className="flex items-center gap-2.5 border-b border-line bg-white px-5 py-3.5">
            <img src={selected.avatar} alt="" className="size-9 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[14px] font-semibold leading-5 text-ink">
                {selected.name}
              </h2>
              <p className="truncate text-[12px] leading-4 text-secondary">{selected.meta}</p>
            </div>
            <Link
              to={agencyClientProjectDetailRoute("minimalist", selected.project === "Monsoon Sunscreen" ? 9 : 1)}
              className="inline-flex h-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white px-3 text-[13px] font-medium leading-[18px] text-ink transition hover:bg-subtle"
            >
              View project
            </Link>
          </header>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
            {(messages[selected.id] ?? []).map((message, index) =>
              message.kind === "event" ? (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: index * 0.03 }}
                  className="flex justify-center"
                >
                  <p className="rounded-xl bg-muted px-3.5 py-2 text-[12px] leading-4 text-secondary">
                    {message.text}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: index * 0.03 }}
                  className={`flex ${message.kind === "outgoing" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[80%] rounded-xl px-3.5 py-2 text-[13px] leading-5 ${message.kind === "outgoing" ? "bg-[#0d0d10] text-white" : "border border-line bg-white text-ink"}`}
                  >
                    {message.text}
                  </p>
                </motion.div>
              ),
            )}
          </div>
          <footer className="flex items-center gap-2.5 border-t border-line bg-white px-4 py-3">
            <button
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-md text-secondary transition hover:bg-subtle"
              aria-label="Attach a file"
            >
              <Paperclip size={18} />
            </button>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              placeholder="Write a message…"
              className="h-10 min-w-0 flex-1 rounded-lg border border-line px-3 text-[13px] text-ink outline-none placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={send}
              disabled={!draft.trim()}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium text-white transition hover:bg-[#27272a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />
              Send
            </button>
          </footer>
        </section>
        <section className="grid flex-1 place-items-center bg-subtle p-6 text-center md:hidden">
          <div>
            <h2 className="text-[16px] font-semibold text-ink">{selected.name}</h2>
            <p className="mt-1 text-[13px] text-secondary">
              Select a message thread on a wider screen to continue the conversation.
            </p>
          </div>
        </section>
      </div>
    </AgencyShell>
  );
}
