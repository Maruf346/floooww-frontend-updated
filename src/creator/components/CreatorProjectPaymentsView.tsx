import { useState } from "react";
import { CreditCard, DollarSign, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

type BadgeProps = {
  className?: string;
  label?: string;
  showDot?: boolean;
  tone?: "Success" | "Warning" | "Info" | "Neutral";
};

function Badge({ className, label = "Paid", showDot = true, tone = "Success" }: BadgeProps) {
  const isInfo = tone === "Info";
  const isSuccess = tone === "Success";
  const isWarning = tone === "Warning";
  const isNeutral = tone === "Neutral";

  return (
    <div
      className={
        className ||
        `content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0 ${
          isInfo
            ? "bg-[var(--status-info-bg,#f1f4ff)]"
            : isWarning
            ? "bg-[var(--status-warning-bg,#feefce)]"
            : isNeutral
            ? "bg-[#edeff3]"
            : "bg-[var(--status-success-bg,#e1fce3)]"
        }`
      }
    >
      {showDot && (
        <div className="relative shrink-0 size-[6px]">
          <div
            className={`size-full rounded-full ${
              isInfo
                ? "bg-[#3b5bff]"
                : isWarning
                ? "bg-[#f59e0b]"
                : isNeutral
                ? "bg-[#8491a3]"
                : "bg-[#16a34a]"
            }`}
          />
        </div>
      )}
      <p
        className={`[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] whitespace-nowrap ${
          isInfo
            ? "text-[color:var(--status-info-fg,#3b5bff)]"
            : isWarning
            ? "text-[color:var(--status-warning-fg,#f59e0b)]"
            : isNeutral
            ? "text-[#394357]"
            : "text-[color:var(--status-success-fg,#16a34a)]"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export function CreatorProjectPaymentsView() {
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[20px] items-start w-full" data-node-id="718:4238">
      {/* 4 Top KPI Tiles (Figma node 718:4681) */}
      <div
        className="bg-white border border-[#e5e7eb] border-solid content-stretch flex gap-[12px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full"
        data-node-id="718:4681"
        data-name="KPI tiles"
      >
        {/* KPI Tile 1: Your fee */}
        <div
          className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px p-[16px] relative rounded-[var(--radius-lg,12px)]"
          data-node-id="718:4682"
          data-name="KPI tile"
        >
          <div
            className="bg-[var(--bg-inverse,#0d0d10)] content-stretch flex items-center justify-center relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]"
            data-name="Icon chip"
          >
            <CreditCard size={18} className="text-white" />
          </div>
          <div className="h-[14px]" />
          <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
            Your fee
          </p>
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[28px] text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px]">
            ₹17,000
          </p>
          <div className="h-[10px]" />
          <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]">
            held in escrow on 7 Oct
          </p>
        </div>

        {/* KPI Tile 2: Paid to you */}
        <div
          className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px p-[16px] relative rounded-[var(--radius-lg,12px)]"
          data-node-id="718:4683"
          data-name="KPI tile"
        >
          <div
            className="bg-[var(--status-success-fg,#16a34a)] content-stretch flex items-center justify-center relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]"
            data-name="Icon chip"
          >
            <DollarSign size={18} className="text-white" />
          </div>
          <div className="h-[14px]" />
          <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
            Paid to you
          </p>
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[28px] text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px]">
            ₹11,095
          </p>
          <div className="h-[10px]" />
          <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--status-success-fg,#16a34a)]">
            2 payments
          </p>
        </div>

        {/* KPI Tile 3: In escrow */}
        <div
          className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px p-[16px] relative rounded-[var(--radius-lg,12px)]"
          data-node-id="718:4684"
          data-name="KPI tile"
        >
          <div
            className="bg-[var(--status-warning-fg,#f59e0b)] content-stretch flex items-center justify-center relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]"
            data-name="Icon chip"
          >
            <Clock size={18} className="text-white" />
          </div>
          <div className="h-[14px]" />
          <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
            In escrow
          </p>
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[28px] text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px]">
            ₹3,000
          </p>
          <div className="h-[10px]" />
          <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]">
            Story · when approved
          </p>
        </div>

        {/* KPI Tile 4: Platform & service fee */}
        <div
          className="bg-[var(--bg-surface,white)] border border-[var(--border-subtle,#edeff3)] border-solid content-stretch flex flex-[1_0_0] flex-col items-start min-w-px p-[16px] relative rounded-[var(--radius-lg,12px)]"
          data-node-id="718:4685"
          data-name="KPI tile"
        >
          <div
            className="bg-[var(--bg-inverse,#0d0d10)] content-stretch flex items-center justify-center relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]"
            data-name="Icon chip"
          >
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div className="h-[14px]" />
          <p className="font-['Inter:Regular'] font-normal leading-[16px] text-[12px] text-[color:var(--text-secondary,#0d0d10)]">
            Platform &amp; service fee · Kreyio · incl. GST
          </p>
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[28px] text-[22px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.33px]">
            ₹2,207
          </p>
          <div className="h-[10px]" />
          <p className="font-['Inter:Medium'] font-medium leading-[16px] text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]">
            11% of your ₹17,000 fee + 18% GST on that fee
          </p>
        </div>
      </div>

      {/* Main Row: Left (Sticky) vs Right (Scrollable naturally with page) */}
      <div
        className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full"
        data-node-id="718:4919"
        data-name="Row"
      >
        {/* Left Column: Deliverables and payments Table + Escrow banner (Sticky) */}
        <div
          className="content-stretch flex flex-[1_0_0] flex-col gap-[14px] items-start min-w-px relative sticky top-[80px] self-start"
          data-node-id="718:4777"
          data-name="Deliverables and payments"
        >
          {/* Main Table Card */}
          <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full">
            {/* Card head */}
            <div
              className="content-stretch flex items-center relative shrink-0 w-full"
              data-node-id="718:4778"
              data-name="Card head"
            >
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
                <p
                  className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[16px]"
                  data-node-id="718:4780"
                >
                  Deliverables and payments
                </p>
                <p
                  className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                  data-node-id="718:4781"
                >
                  Minimalist paid ₹17,000 into escrow on 7 Oct. Each fee is released when Minimalist approves the deliverable.
                </p>
              </div>
            </div>

            {/* Table */}
            <div
              className="border border-[#e5e7eb] border-solid content-stretch flex flex-col items-start relative rounded-[10px] shrink-0 w-full overflow-hidden"
              data-node-id="718:4794"
              data-name="Table"
            >
              {/* Table Header */}
              <div
                className="bg-[#f3f5f7] content-stretch flex gap-[10px] items-center px-[14px] py-[9px] relative shrink-0 w-full"
                data-node-id="718:4795"
                data-name="Header"
              >
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[18px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#8491a3] text-[12px]">#</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
                  <p className="font-['Inter:Medium'] font-medium text-[#8491a3] text-[12px]">DELIVERABLE</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[62px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#8491a3] text-[12px]">FEE</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[66px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#8491a3] text-[12px]">YOU GET</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[128px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#8491a3] text-[12px]">CONTENT</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[88px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#8491a3] text-[12px]">PAYMENT</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[92px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#8491a3] text-[12px]">PAID TO BANK</p>
                </div>
              </div>

              {/* Row 1 */}
              <div
                onClick={() => setSelectedRowId(1)}
                className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[10px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                  selectedRowId === 1 ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
                }`}
                data-node-id="718:4810"
              >
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[18px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">1</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    Festive GRWM · Reel
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Reel · Instagram
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[62px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹8,500</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[66px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹7,397</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[128px]">
                  <Badge label="Approved · paid" tone="Success" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[88px]">
                  <Badge label="Paid" tone="Success" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[92px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">19 Oct</p>
                </div>
              </div>

              {/* Row 2 */}
              <div
                onClick={() => setSelectedRowId(2)}
                className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[10px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                  selectedRowId === 2 ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
                }`}
                data-node-id="718:4824"
              >
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[18px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">2</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    Launch day · Story
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Story · Instagram
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[62px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹4,250</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[66px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹3,698</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[128px]">
                  <Badge label="Approved · paid" tone="Success" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[88px]">
                  <Badge label="Paid" tone="Success" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[92px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">21 Oct</p>
                </div>
              </div>

              {/* Row 3 */}
              <div
                onClick={() => setSelectedRowId(3)}
                className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[10px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                  selectedRowId === 3 ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
                }`}
                data-node-id="718:4838"
              >
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[18px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">3</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    Results after 7 days · Reel
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Reel · Instagram
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[62px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹3,000</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[66px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹2,611</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[128px]">
                  <Badge label="Waiting for approval" tone="Warning" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[88px]">
                  <Badge label="In escrow" tone="Info" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[92px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">on approval</p>
                </div>
              </div>

              {/* Row 4 */}
              <div
                onClick={() => setSelectedRowId(4)}
                className={`border-[#edeff3] border-solid border-t content-stretch flex gap-[10px] items-center px-[14px] py-[12px] relative shrink-0 w-full transition cursor-pointer ${
                  selectedRowId === 4 ? "bg-[#f1f4ff]" : "hover:bg-[#f9fafb]"
                }`}
                data-node-id="1663:107"
              >
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[18px]">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">4</p>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    Last-day reminder · Story
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Story · Instagram
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[62px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹1,250</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[66px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">₹1,088</p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[128px]">
                  <Badge label="Not started" tone="Neutral" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[88px]">
                  <Badge label="In escrow" tone="Info" />
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-[92px]">
                  <p className="font-['Inter:Regular'] font-normal text-[#070b13] text-[13px]">on approval</p>
                </div>
              </div>
            </div>

            {/* Totals Summary */}
            <div
              className="bg-[#f8f9fb] content-stretch flex flex-col gap-[4px] items-start p-[14px] relative rounded-[10px] shrink-0 w-full"
              data-node-id="718:4852"
              data-name="Totals"
            >
              <p
                className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[13px]"
                data-node-id="718:4853"
              >
                Fee ₹17,000 · ₹11,095 paid to you · ₹3,699 due from escrow · ₹2,207 platform &amp; service fee incl. GST
              </p>
              <p
                className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                data-node-id="718:4854"
              >
                If the Story isn’t posted by 7 Nov, its ₹3,000 goes back to Minimalist automatically.
              </p>
            </div>
          </div>

          {/* Escrow Banner (Figma node 718:4855) */}
          <div
            className="bg-[#e9f9ee] content-stretch flex items-center p-[16px] relative rounded-[12px] shrink-0 w-full border border-[#d2f3db]"
            data-node-id="718:4855"
            data-name="Escrow"
          >
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start relative text-[#26543a]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#149d46]" />
                <p
                  className="font-['Inter:Semi_Bold'] font-semibold text-[14px]"
                  data-node-id="718:4857"
                >
                  Your money is safe in escrow
                </p>
              </div>
              <p
                className="font-['Inter:Regular'] font-normal text-[12px] text-[#26543a] leading-relaxed mt-0.5"
                data-node-id="718:4858"
              >
                Minimalist paid before you started. Kreyio holds it and releases each fee the moment Minimalist approves. GST is paid by Minimalist on top, it never comes out of your fee.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Side panel (380px, auto-scrolled naturally) */}
        <div
          className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[380px]"
          data-node-id="718:4918"
          data-name="Side"
        >
          {/* Card 1: Payment summary (Figma node 718:4859) */}
          <div
            className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full shadow-2xs"
            data-node-id="718:4859"
            data-name="Payment summary"
          >
            <div
              className="content-stretch flex items-center relative shrink-0 w-full"
              data-node-id="718:4860"
              data-name="Card head"
            >
              <p
                className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[16px]"
                data-node-id="718:4862"
              >
                Payment summary
              </p>
            </div>

            <div className="w-full flex flex-col text-[13px]">
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4863"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[150px]">Your fee</p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#070b13]">₹17,000</p>
              </div>
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4866"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[150px]">
                  Platform &amp; service fee · Kreyio · incl. GST
                </p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#070b13]">− ₹2,207</p>
              </div>
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4869"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[150px]">You get</p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#070b13]">₹14,793</p>
              </div>
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4872"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[150px]">Paid so far</p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#149d46]">₹11,095</p>
              </div>
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4875"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[150px]">In escrow</p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#b26b00]">₹3,699</p>
              </div>
            </div>
          </div>

          {/* Card 2: Payout timeline (Figma node 718:4893) */}
          <div
            className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full shadow-2xs"
            data-node-id="718:4893"
            data-name="Payout timeline"
          >
            <div
              className="content-stretch flex items-center relative shrink-0 w-full"
              data-node-id="718:4894"
              data-name="Card head"
            >
              <p
                className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[16px]"
                data-node-id="718:4896"
              >
                Payout timeline
              </p>
            </div>

            <div className="flex flex-col gap-[4px] w-full">
              {/* Item 1 */}
              <div
                className="flex gap-[12px] items-start py-[8px] relative shrink-0 w-full"
                data-node-id="718:4897"
              >
                <div className="size-2.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    ₹11,095 paid
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Festive GRWM · Reel
                  </p>
                </div>
                <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                  15 Oct
                </p>
              </div>

              {/* Item 2 */}
              <div
                className="flex gap-[12px] items-start py-[8px] relative shrink-0 w-full border-t border-[#f4f6fb]"
                data-node-id="718:4904"
              >
                <div className="size-2.5 rounded-full bg-[#16a34a] mt-1.5 shrink-0" />
                <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    ₹11,095 paid
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Launch day · Story
                  </p>
                </div>
                <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                  22 Oct
                </p>
              </div>

              {/* Item 3 */}
              <div
                className="flex gap-[12px] items-start py-[8px] relative shrink-0 w-full border-t border-[#f4f6fb]"
                data-node-id="718:4911"
              >
                <div className="size-2.5 rounded-full bg-[#f59e0b] mt-1.5 shrink-0" />
                <div className="flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px">
                  <p className="font-['Inter:Medium'] font-medium text-[#070b13] text-[13px]">
                    ₹2,611 next
                  </p>
                  <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                    Results after 7 days · Reel
                  </p>
                </div>
                <p className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]">
                  After approval
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Where we pay you (Figma node 718:4879) */}
          <div
            className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full shadow-2xs"
            data-node-id="718:4879"
            data-name="Where we pay you"
          >
            <div
              className="content-stretch flex items-center relative shrink-0 w-full"
              data-node-id="718:4880"
              data-name="Card head"
            >
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px relative">
                <p
                  className="font-['Inter:Semi_Bold'] font-semibold text-[#070b13] text-[16px]"
                  data-node-id="718:4882"
                >
                  Where we pay you
                </p>
                <p
                  className="font-['Inter:Regular'] font-normal text-[#8491a3] text-[12px]"
                  data-node-id="718:4883"
                >
                  Same account for all projects
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col text-[13px]">
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4884"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[100px]">Bank</p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#070b13]">HDFC ···· 4821</p>
              </div>
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4887"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[100px]">UPI</p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#070b13]">ishita@okhdfc</p>
              </div>
              <div
                className="border-[#edeff3] border-solid border-t flex gap-[12px] items-center py-[10px] w-full"
                data-node-id="718:4890"
              >
                <p className="font-['Inter:Regular'] text-[#8491a3] w-[100px]">Arrives</p>
                <p className="flex-[1_0_0] font-['Inter:Medium'] text-[#070b13]">
                  within 2 working days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorProjectPaymentsView;
