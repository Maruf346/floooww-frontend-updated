import { useState } from "react";
import {
  ClipboardList,
  FileBarChart,
  Search,
  Send,
  ShieldAlert,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";

type Ticket = {
  id: string;
  subject: string;
  status: "Waiting on us" | "Solved";
  updated: string;
};

const helpTopics = [
  {
    title: "Projects",
    description: "Project types, briefs and dashboards",
    Icon: ClipboardList,
  },
  {
    title: "Creators",
    description: "Discovery, match score, invites",
    Icon: Users,
  },
  {
    title: "Payments & escrow",
    description: "Funding, releases, GST invoices",
    Icon: Wallet,
  },
  {
    title: "Disputes",
    description: "How disputes work and timelines",
    Icon: ShieldAlert,
  },
  {
    title: "Performance & custom reports",
    description: "Metrics, attribution, exports",
    Icon: FileBarChart,
  },
] as const;

function ContactSupportDialog({
  close,
  submit,
}: {
  close: () => void;
  submit: (subject: string) => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"
      role="presentation"
      onMouseDown={close}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 8, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-[520px] rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,.12)]"
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <h2
              id="support-dialog-title"
              className="text-[18px] font-semibold leading-6 text-[#070b13]"
            >
              Contact support
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-[#8491a3]">
              Tell us what happened and we’ll get back to you by email.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid size-8 place-items-center rounded-lg text-secondary hover:bg-subtle"
            aria-label="Close support form"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-5 grid gap-3">
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Subject
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="What can we help with?"
              className="h-10 rounded-lg border border-line px-3 text-[13px] font-normal outline-none placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
          <label className="grid gap-1.5 text-[12px] font-medium leading-4 text-ink">
            Message
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Include any useful project, creator, or payment details."
              className="min-h-28 resize-y rounded-lg border border-line px-3 py-2.5 text-[13px] font-normal leading-5 outline-none placeholder:text-tertiary focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="h-8 rounded-lg px-3 text-[13px] font-medium leading-[18px] text-ink hover:bg-subtle"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!subject.trim() || !message.trim()}
            onClick={() => submit(subject.trim())}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#27272a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={16} />
            Send request
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function BrandHelpCentrePage() {
  const [query, setQuery] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "#4821",
      subject: "Shopify keeps disconnecting",
      status: "Waiting on us",
      updated: "2 h ago",
    },
    { id: "#4710", subject: "GST invoice for September", status: "Solved", updated: "12 Oct" },
  ]);

  const visibleTopics = helpTopics.filter((topic) => {
    const text = `${topic.title} ${topic.description}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });
  const openTopic = (title: string) => {
    setSelectedTopic(title);
    setQuery(title);
  };
  const createTicket = (subject: string) => {
    setTickets((current) => [
      { id: `#${4822 + current.length}`, subject, status: "Waiting on us", updated: "Now" },
      ...current,
    ]);
    setContactOpen(false);
  };

  return (
    <BrandShell>
      <div className="mx-auto w-full max-w-[1440px] space-y-6 pb-10">
        <header className="flex flex-wrap items-end gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-[26px] font-bold leading-[34px] tracking-[-.01em] text-ink">
              Help centre
            </h1>
            <p className="text-[13px] leading-5 text-secondary">Answers, guides and support.</p>
          </div>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0d0d10] px-4 text-[14px] font-medium leading-5 text-white transition hover:bg-[#27272a]"
          >
            <Send size={16} />
            Contact support
          </button>
        </header>

        <label className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <Search size={16} className="shrink-0 text-secondary" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedTopic(null);
            }}
            placeholder={"Search help: e.g. “how does escrow work”"}
            className="min-w-0 flex-1 bg-transparent text-[13px] leading-5 text-ink outline-none placeholder:text-tertiary"
          />
        </label>

        {selectedTopic && (
          <p
            role="status"
            className="rounded-lg bg-primary-subtle px-3 py-2 text-[12px] font-medium leading-4 text-primary"
          >
            Showing guides for {selectedTopic}. Search to explore another topic.
          </p>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Help topics">
          {visibleTopics.map(({ title, description, Icon }, index) => (
            <motion.button
              key={title}
              type="button"
              onClick={() => openTopic(title)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: index * 0.035, ease: "easeOut" }}
              className="flex min-h-[148px] flex-col items-start gap-2 rounded-xl border border-line bg-white p-5 text-left transition hover:border-primary/40 hover:shadow-sm"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-primary-subtle text-primary">
                <Icon size={18} />
              </span>
              <span className="text-[14px] font-semibold leading-5 text-ink">{title}</span>
              <span className="text-[13px] leading-5 text-secondary">{description}</span>
            </motion.button>
          ))}
        </section>

        {visibleTopics.length === 0 && (
          <div className="rounded-xl border border-line bg-white px-5 py-10 text-center">
            <p className="text-[14px] font-medium text-ink">No help topic found</p>
            <p className="mt-1 text-[12px] leading-4 text-tertiary">
              Try a different search, or contact support.
            </p>
          </div>
        )}

        <section className="rounded-xl border border-line bg-white p-5">
          <h2 className="text-[16px] font-semibold leading-6 text-ink">Your tickets</h2>
          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[610px]">
              <div className="grid grid-cols-[110px_minmax(220px,1fr)_120px_110px] gap-3 bg-subtle px-4 py-2.5 text-[12px] font-semibold leading-4 text-secondary">
                <span>Ticket</span>
                <span>Subject</span>
                <span>Status</span>
                <span>Updated</span>
              </div>
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="grid grid-cols-[110px_minmax(220px,1fr)_120px_110px] items-center gap-3 border-t border-subtle px-4 py-3"
                >
                  <span className="text-[14px] font-medium leading-[22px] text-ink">
                    {ticket.id}
                  </span>
                  <span className="text-[13px] leading-5 text-ink">{ticket.subject}</span>
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium leading-4 ${ticket.status === "Solved" ? "bg-[#e1fce3] text-[#149d46]" : "bg-[#feefce] text-[#f59e0b]"}`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {ticket.status}
                  </span>
                  <span className="text-[13px] leading-5 text-ink">{ticket.updated}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {contactOpen && (
        <ContactSupportDialog close={() => setContactOpen(false)} submit={createTicket} />
      )}
    </BrandShell>
  );
}
