import { ChevronDown, Download, FilePenLine, Info, PencilLine, Plus, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { BrandShell } from "@/brand/components/BrandShell";
import { Button } from "@/common/components/ui/Button";

type FilterGroup = {
  title: string;
  fields: [string, string][];
};

const filterGroups: FilterGroup[] = [
  {
    title: "PROJECT",
    fields: [
      ["Projects", "All projects"],
      ["Project type", "Influencer · UGC"],
      ["Partnership", "Paid · Gift exchange"],
      ["Duration", "One-time · Long-term"],
      ["Project status", "Live · Paused · Upcoming · Completed"],
      ["Cycle (long-term)", "All cycles"],
      ["Target type", "Net sales · Orders · Views"],
      ["Content language", "All languages"],
    ],
  },
  {
    title: "CREATORS",
    fields: [
      ["Creators", "All creators"],
      ["Deliverable progress", "Completed · In progress · Behind"],
      ["Invite status", "Invited · Accepted · Declined · Applied"],
      ["Delivery status", "On time · Overdue · Delivered"],
      ["Shipment status", "Sent · In transit · Delivered"],
      ["Courier", "Any courier"],
      ["UGC turnaround", "Within 2 · 3 · 5 · 7 · 10 days"],
      ["Fulfilment method", "Own · Shiprocket · Pickup · Gift card"],
      ["Ship from", "Any address"],
    ],
  },
  {
    title: "PLATFORM",
    fields: [
      ["Platform", "All platforms"],
      ["Format", "All formats"],
      ["Usage rights", "All usage rights"],
    ],
  },
  {
    title: "CONTENT",
    fields: [
      ["Content status", "All statuses"],
      ["Approval status", "Approved · To review"],
      ["Content type", "Posts · Files · Videos"],
    ],
  },
  {
    title: "CONVERSIONS",
    fields: [
      ["Attribution", "Coupon · Tracking link"],
      ["Order status", "All orders"],
      ["Discount code", "All codes"],
    ],
  },
  {
    title: "AUDIENCE",
    fields: [
      ["Audience country", "All countries"],
      ["Audience age", "All ages"],
      ["Audience gender", "All genders"],
    ],
  },
  {
    title: "PERFORMANCE THRESHOLDS",
    fields: [
      ["Reach", "Any reach"],
      ["Engagement rate", "Any engagement rate"],
      ["Views", "Any views"],
    ],
  },
  {
    title: "PAYMENTS",
    fields: [
      ["Payment status", "Released · In escrow"],
      ["Fee range", "Any fee"],
      ["GST", "All invoices"],
    ],
  },
  {
    title: "DELIVERY",
    fields: [
      ["Deadline", "Any deadline"],
      ["Late status", "On time · Overdue"],
      ["Delivery month", "All months"],
    ],
  },
];

function FilterField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium leading-4 text-[#394357]">{label}</span>
      <button
        className="flex min-h-9 w-full items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-2 text-left text-[12px] leading-4 text-secondary transition hover:bg-subtle"
        type="button"
      >
        <span className="min-w-0 flex-1 truncate">{value}</span>
        <ChevronDown className="shrink-0 text-tertiary" size={13} />
      </button>
    </label>
  );
}

export function BrandCustomReportBuilderPage() {
  return (
    <BrandShell compactSidebar hideChat>
      <div className="mx-auto w-full max-w-[1680px] pb-10">
        <motion.header
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[12px] leading-4 text-tertiary">
            Custom reports&nbsp; / &nbsp;New report
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[24px] font-semibold leading-8 text-tertiary">
                  Untitled report
                </h1>
                <button
                  aria-label="Rename report"
                  className="text-primary hover:text-primary-hover"
                  type="button"
                >
                  <PencilLine size={15} />
                </button>
              </div>
              <p className="mt-1 text-[12px] leading-4 text-tertiary">Auto-saves as you build</p>
            </div>
            <Button kind="secondary" size="s" leadingIcon={<Share2 size={15} />}>
              Share
            </Button>
            <Button kind="secondary" size="s" leadingIcon={<Download size={15} />}>
              Download
            </Button>
            <Button className="bg-ink hover:bg-ink/90" size="s" leadingIcon={<Plus size={15} />}>
              Add block
            </Button>
          </div>
        </motion.header>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex flex-col gap-5 lg:flex-row"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.44, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          <aside className="w-full shrink-0 rounded-xl border border-line bg-white p-4 lg:w-[260px]">
            <div className="flex items-center">
              <h2 className="flex-1 text-[15px] font-semibold leading-5 text-ink">Filters</h2>
              <button className="text-[11px] font-medium text-primary" type="button">
                Clear all
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-tertiary">
              Set once: every block follows these.
            </p>
            <div className="mt-3 space-y-3">
              <FilterField label="Date range" value="7 Oct – 7 Nov 2026" />
              <FilterField label="Compare with" value="Previous period" />
            </div>
            <div className="my-3 h-px bg-muted" />
            <div className="space-y-4">
              {filterGroups.map((group) => (
                <section key={group.title}>
                  <h3 className="mb-3 pt-1 text-[10px] font-semibold leading-4 tracking-[0.04em] text-tertiary">
                    {group.title}
                  </h3>
                  <div className="space-y-3">
                    {group.fields.map(([label, value]) => (
                      <FilterField key={label} label={label} value={value} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <p className="mt-4 text-[10px] leading-4 text-tertiary">
              71 filters · all from what you set up in Floooww
            </p>
          </aside>
          <section className="flex min-h-[620px] min-w-0 flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-line bg-white px-6 text-center">
            <div className="grid size-12 place-items-center rounded-full bg-subtle text-secondary">
              <FilePenLine size={22} strokeWidth={1.7} />
            </div>
            <h2 className="mt-3 text-[16px] font-medium leading-6 text-ink">
              Your report will appear here
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-secondary">
              Choose filters on the left, then add a block.
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-[12px] leading-4 text-tertiary">
              <Info size={14} />
              Every block shares these filters.
            </p>
          </section>
        </motion.div>
      </div>
    </BrandShell>
  );
}
