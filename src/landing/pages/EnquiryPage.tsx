import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check, Upload } from "lucide-react";
import { Container } from "@/common/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/common/components/motion/Reveal";
import { ROUTES } from "@/common/constants/routes";

const CONTENTS = [
  [
    "what-you-can-raise",
    "1. What you can raise",
    "Account and login · A project · Payment or refund · A dispute on an order · Usage rights · Privacy and data · Grievance · Careers · Partnerships and press · Something else.",
  ],
  [
    "what-to-include",
    "2. What to include",
    "Who you are (brand, creator or agency), the project or order ID if there is one, what happened, any dates and amounts, and the outcome you want. Screenshots and files help.",
  ],
  [
    "what-happens-next",
    "3. What happens next",
    "You get a reference number, for example ENQ-10482, sent to your email. The right team reviews the project, messages and payments, and reaches out within one working day by email, or by phone if you added one. For disputes, money stays in escrow until a decision is made.",
  ],
  [
    "signed-in",
    "4. Signed in?",
    "Raise it from the project itself and we attach the order details for you.",
  ],
  ["your-enquiry", "5. Your enquiry", "Fill in the form below."],
] as const;

const ROLES = ["Brand", "Creator", "Agency", "Someone else"];
const TOPICS = [
  "Account & login",
  "A project",
  "Payment or refund",
  "Dispute on an order",
  "Usage rights",
  "Privacy & data",
  "Partnerships & press",
  "Something else",
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[10px] border px-3.5 py-2.5 font-inter-medium text-[14px] font-medium transition-colors ${active ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-neutral hover:border-ink hover:text-ink"}`}
    >
      {children}
    </button>
  );
}

function ResourceTabs() {
  return (
    <div
      aria-label="Resources"
      className="flex max-w-full gap-1.5 overflow-x-auto rounded-[14px] border border-line-subtle bg-white p-[5px]"
    >
      <span className="shrink-0 rounded-[10px] px-3.5 py-2.5 font-inter-medium text-[13px] font-medium text-neutral">
        Blog
      </span>
      <Link
        to={ROUTES.faq}
        className="shrink-0 rounded-[10px] px-3.5 py-2.5 font-inter-medium text-[13px] font-medium text-neutral"
      >
        FAQ
      </Link>
      <Link
        to={ROUTES.help}
        className="shrink-0 rounded-[10px] px-3.5 py-2.5 font-inter-medium text-[13px] font-medium text-neutral"
      >
        Help Centre
      </Link>
      <span className="shrink-0 rounded-[10px] bg-ink px-3.5 py-2.5 font-inter-medium text-[13px] font-medium text-white">
        Contact us
      </span>
    </div>
  );
}

function EnquiryForm() {
  const [role, setRole] = useState("Brand");
  const [topic, setTopic] = useState("Dispute on an order");
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  const field =
    "mt-2 w-full rounded-xl border border-line-strong bg-white px-4 py-3.5 text-[15px] leading-[23px] text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
  const label = "font-inter-semibold text-[14px] font-semibold text-ink";
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-white p-5 sm:p-8 lg:p-10"
    >
      <div className="space-y-6">
        <fieldset>
          <legend className={label}>I am a</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {ROLES.map((item) => (
              <Chip key={item} active={role === item} onClick={() => setRole(item)}>
                {item}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={label}>What is it about?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TOPICS.map((item) => (
              <Chip key={item} active={topic === item} onClick={() => setTopic(item)}>
                {item}
              </Chip>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Full name
            <input required defaultValue="Ananya Mehta" className={field} />
          </label>
          <label className={label}>
            Work email
            <input required type="email" defaultValue="ananya@brand.in" className={field} />
            <span className="mt-1 block font-inter-regular text-[13px] font-normal text-secondary">
              We reply here. We never share it.
            </span>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Phone{" "}
            <span className="font-inter-regular text-[13px] font-normal text-tertiary">
              Optional
            </span>
            <input placeholder="+91 98xxx xxxxx" className={field} />
          </label>
          <label className={label}>
            Project or order ID{" "}
            <span className="font-inter-regular text-[13px] font-normal text-tertiary">
              Optional
            </span>
            <input placeholder="e.g. FLW-24817" className={field} />
            <span className="mt-1 block font-inter-regular text-[13px] font-normal text-secondary">
              Speeds things up for disputes and payments.
            </span>
          </label>
        </div>
        <label className={label}>
          Tell us what happened
          <textarea
            required
            rows={5}
            defaultValue="The creator posted after the deadline and used the wrong discount code. I’d like to request changes or a partial refund."
            className={`${field} min-h-[140px] resize-y border-2 border-primary`}
          />
          <span className="mt-1 block font-inter-regular text-[13px] font-normal text-secondary">
            Include dates, amounts and what outcome you want.
          </span>
        </label>
        <label className="flex cursor-pointer items-center gap-3.5 rounded-[14px] border border-dashed border-line-strong px-5 py-[18px] transition-colors hover:border-primary">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary-tint text-primary">
            <Upload size={18} strokeWidth={2} />
          </span>
          <span>
            <span className="block font-inter-semibold text-[14px] font-semibold text-ink">
              Add screenshots or files
            </span>
            <span className="block text-[13px] text-secondary">
              PNG, JPG, PDF or MP4 · up to 5 files, 20 MB each
            </span>
          </span>
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,application/pdf,video/mp4"
            className="sr-only"
          />
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 text-[14px] text-neutral">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="sr-only"
          />
          <span
            className={`flex size-[18px] items-center justify-center rounded-[5px] ${consent ? "bg-ink text-white" : "border border-line-strong bg-white"}`}
          >
            {consent && <Check size={12} strokeWidth={3} />}
          </span>
          I agree that Floooww can contact me about this enquiry.
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-secondary">Average first reply: under 1 working day</p>
          <button
            type="submit"
            disabled={!consent}
            className="rounded-xl bg-ink px-[26px] py-[15px] font-inter-semibold text-[15px] font-semibold text-white transition hover:bg-[#161a20] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit enquiry
          </button>
        </div>
        {submitted && (
          <p role="status" className="rounded-lg bg-success-bg px-4 py-3 text-[14px] text-success">
            Thanks — your enquiry has been received. We’ll reply within one working day.
          </p>
        )}
      </div>
    </form>
  );
}

/** Dedicated contact page based on Figma WEB-06; shared header/footer are inherited from LandingLayout. */
export function EnquiryPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#eef3ff] to-white">
        <Container className="py-14 sm:py-[72px] lg:pb-[48px]">
          <RevealGroup stagger={0.1} className="flex max-w-[760px] flex-col items-start gap-3">
            <RevealItem
              as="p"
              className="font-inter-semibold text-[12px] font-semibold tracking-[0.72px] text-primary"
            >
              RESOURCES · CONTACT US
            </RevealItem>
            <RevealItem>
              <h1 className="font-inter-bold text-[38px] font-bold leading-tight tracking-[-1.5px] text-ink sm:text-[52px] sm:leading-[64px]">
                Raise an enquiry
              </h1>
            </RevealItem>
            <RevealItem as="p" className="text-[14px] leading-[22px] text-secondary">
              Tell us what you need. Our team reviews every enquiry, reaches out and stays with it
              until it is resolved.
            </RevealItem>
            <RevealItem className="flex flex-wrap gap-2">
              <span className="rounded-full border border-primary-muted bg-white px-3 py-1.5 font-inter-medium text-[13px] font-medium text-primary">
                Last updated 8 November 2026
              </span>
              <span className="rounded-full border border-line bg-white px-3 py-1.5 font-inter-medium text-[13px] font-medium text-neutral">
                2 min
              </span>
            </RevealItem>
            <RevealItem>
              <ResourceTabs />
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>
      <Container className="grid gap-10 py-12 lg:grid-cols-[260px_minmax(0,760px)] lg:gap-16 xl:gap-20 xl:pb-20">
        <aside className="lg:sticky lg:top-[104px] lg:self-start">
          <nav
            aria-label="On this page"
            className="rounded-2xl border border-line bg-[#f6f8fb] p-4 lg:w-[260px] lg:px-4 lg:py-5"
          >
            <p className="px-2 pb-1 font-inter-semibold text-[12px] font-semibold tracking-[0.72px] text-tertiary">
              ON THIS PAGE
            </p>
            <div className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1 lg:mx-0 lg:flex-col lg:px-0">
              {CONTENTS.map(([id, title]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="shrink-0 rounded-lg px-2.5 py-2 font-inter-regular text-[13px] leading-5 text-neutral transition hover:bg-white hover:text-primary"
                >
                  {title}
                </a>
              ))}
            </div>
          </nav>
        </aside>
        <main className="min-w-0 space-y-7" aria-label="Raise an enquiry">
          {CONTENTS.map(([id, title, body]) => (
            <Reveal key={id}>
              <section id={id} className="scroll-mt-28 border-t border-line-subtle pt-7">
                <h2 className="font-inter-bold text-[22px] font-bold leading-[34px] tracking-[-0.11px] text-ink">
                  {title}
                </h2>
                <p className="mt-2 text-[14px] leading-[27px] text-body">{body}</p>
              </section>
            </Reveal>
          ))}
          <Reveal>
            <EnquiryForm />
          </Reveal>
        </main>
      </Container>
    </>
  );
}
