import { CreatorShell } from "@/creator/components/CreatorShell";
import { useState } from "react";
import CounterOfferModal from "../components/CounterOfferModal";

const imgDot = "https://www.figma.com/api/mcp/asset/a91b4316-0eba-4711-99a6-bb19ec6deb1f.svg";
const imgDot1 = "https://www.figma.com/api/mcp/asset/a834d692-f233-4d1d-bcb1-c35e03dd0045.svg";
const imgKreyioWordmark = "https://www.figma.com/api/mcp/asset/4307356b-f8ad-4693-8952-ded842ee22bc.svg";
const imgCampaignBanner = "https://www.figma.com/api/mcp/asset/5bb990f4-3da9-4c70-8c6c-c7975a5c586b.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/835a47f1-146b-4484-8b6f-80703e02b470.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/2fa35d3b-7240-4016-bb9d-80f27606492a.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/2234e818-e202-40b6-9bac-f2540722bede.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/a173c4f4-4a49-49fe-87c7-1199f8e5455a.svg";
const imgChevron = "https://www.figma.com/api/mcp/asset/08e131b5-3773-43d2-84d2-9b1f73efe12d.svg";
const imgBullet = "https://www.figma.com/api/mcp/asset/8febcf52-9b2c-416c-86c3-52c72346be37.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/3e7e9d3f-eb12-4b1f-9649-8a64e65e154f.svg";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/30171048-7ebd-4127-8d22-fd964f038b27.svg";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/0f0d8131-6754-4f1a-ab32-ca5b6d819dfb.svg";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/30f6de1f-d95f-46c6-a3a9-cb9b1910f525.svg";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/9b12a17a-6162-4dee-9394-4ab6e6194e16.svg";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/a25ed725-6757-45fb-aba8-30c97c5e9f6d.svg";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/5d91cc07-7670-4a2d-a509-c344c3bcaea9.svg";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/05b2b5f8-0268-4e80-9524-ebfc40ca18d5.svg";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/35d1a5a3-3907-4d1e-9e6f-5d33b8021429.svg";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/d12df754-7073-4a55-a2de-8ffbeff44a11.svg";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/abd317df-cf42-49cd-8aad-be5f1a881fd8.svg";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/76b87e5d-f701-4f9b-95fe-a2f3e0ac81fb.svg";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/b0ba26f8-fda9-46c6-a729-a156b0d2d3d4.svg";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/8e923bb1-aed9-476b-873e-178c50f4ca9a.svg";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/9d0effce-70ab-471c-9f10-4258c083e757.svg";
const imgPlatformLogo = "https://www.figma.com/api/mcp/asset/58044693-cee3-4e59-88fe-eea12da0cb83.svg";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/d1f8e5a6-b2b3-4ce9-87be-a914034fe440.svg";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/e5007dd7-9cea-4f3b-97a8-42ba7edeb525.svg";
const imgIcon20 = "https://www.figma.com/api/mcp/asset/a01c2a30-caaa-413b-8a7a-09569d9e5872.svg";

type BadgeProps = {
  className?: string;
  label?: string;
  showDot?: boolean;
  tone?: "Success" | "Neutral";
};

function Badge({ className, label = "Live", showDot = true, tone = "Success" }: BadgeProps) {
  const isNeutral = tone === "Neutral";
  const isSuccess = tone === "Success";
  return (
    <div className={className || `content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] ${isNeutral ? "bg-[var(--status-neutral-bg,#f4f6fb)]" : "bg-[var(--status-success-bg,#e1fce3)]"}`} id={isNeutral ? "node-5_118" : "node-5_102"}>
      {isSuccess && showDot && (
        <div className="relative shrink-0 size-[6px]" data-node-id="5:103" data-name="Dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot} />
        </div>
      )}
      {isSuccess && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)] whitespace-nowrap" data-node-id="5:104">
          {label}
        </p>
      )}
      {isNeutral && showDot && (
        <div className="relative shrink-0 size-[6px]" data-node-id="5:119" data-name="Dot">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDot1} />
        </div>
      )}
      {isNeutral && (
        <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--status-neutral-fg,#4a4a55)] whitespace-nowrap" data-node-id="5:120">
          {label}
        </p>
      )}
    </div>
  );
}

type LogoProps = {
  className?: string;
  theme?: "On light";
};

function Logo({ className, theme = "On light" }: LogoProps) {
  return (
    <div className={className || "content-stretch flex items-center overflow-clip relative rounded-[8px]"} data-node-id="9:3">
      <div className="h-[36px] relative shrink-0 w-[99.09px]" data-node-id="2193:2483" data-name="Kreyio wordmark">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgKreyioWordmark} />
      </div>
    </div>
  );
}

export default function CreatorProjectPageInfluencerPaidLongTerm() {
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  return (
    <CreatorShell>
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[40px] pt-[28px] px-[32px] relative shrink-0 w-full" data-node-id="772:9648" data-name="Content">
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[6px] items-center leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] w-full" data-node-id="772:9649" data-name="Breadcrumb">
            <p className="relative shrink-0 text-[color:var(--text-secondary,#0d0d10)] whitespace-pre" data-node-id="772:9650">{`Project discovery  /  Petal & Pine  /`}</p>
            <p className="relative shrink-0 text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:9651">
              Clean Beauty Collective
            </p>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="772:9652" data-name="Profile header">
            <div className="h-[180px] relative rounded-[8px] shrink-0 w-full" data-node-id="772:9653" data-name="Campaign banner">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgCampaignBanner} onError={(e) => { e.currentTarget.src = "/assets/creator/project-detail/clean-beauty-collective.png"; }} />
            </div>
            <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9654" data-name="Top">
              <div className="bg-[#149d46] content-stretch flex items-center justify-center overflow-clip relative rounded-[15px] shrink-0 size-[72px]" data-node-id="772:10123" data-name="Brand logo">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-white whitespace-nowrap" data-node-id="772:10124">
                  PP
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="772:9657" data-name="Identity">
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="772:9658" data-name="n">
                  <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[34px] not-italic relative shrink-0 text-[26px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.13px] whitespace-nowrap" data-node-id="772:9659">
                    Clean Beauty Collective
                  </p>
                  <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Verified brand" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="772:9661">{`Petal & Pine · Paid · 6 months · Dec 2026 – May 2027`}</p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[22px] min-w-full not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] w-[min-content]" data-node-id="772:9662">{`Partner with Petal & Pine for 6 months. Every month: 2 Reels and 4 Stories with your own code. Paid monthly.`}</p>
                <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="772:9663" data-name="Niches">
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Clean beauty" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Makeup" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Long-term" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Instagram" tone="Neutral" />
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="772:9668" data-name="Actions">
                <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip p-[10px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="772:9669" data-name="Save">
                  <div className="relative shrink-0 size-[18px]" data-node-id="772:9670" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon14} />
                  </div>
                </div>
                <a className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="772:9671" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I772:9671;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon15} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I772:9671;5:33">
                    Message brand
                  </p>
                </a>
                <button
                  type="button"
                  onClick={() => setIsCounterOfferOpen(true)}
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f9fafb] transition"
                  data-node-id="772:9672"
                  data-name="Button"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="I772:9672;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon16} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I772:9672;5:33">
                    Counter offer
                  </p>
                </button>
                <a className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="772:9673" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I772:9673;5:6" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon17} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap" data-node-id="I772:9673;5:9">
                    Apply
                  </p>
                </a>
              </div>
            </div>
            <div className="bg-[var(--bg-subtle,#f4f6fb)] content-stretch flex gap-[10px] items-center overflow-clip px-[14px] py-[10px] relative rounded-[10px] shrink-0 w-full" data-node-id="772:9674" data-name="Application context">
              <div className="relative shrink-0 size-[16px]" data-node-id="772:9675" data-name="Icon">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon18} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9676">
                Apply by 10 Nov · 13 days left · you meet all 5 requirements · 86% match
              </p>
              <a href="/creator/projects" className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="772:9677">
                <p className="leading-[20px]">Back to discovery</p>
              </a>
            </div>
          </div>
          <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start not-italic overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="772:9678" data-name="Campaign setup">
            <div className="bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="772:9679" data-name="Card head">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="772:9680">
                Project setup
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="772:9681">{`Set by Petal & Pine when creating this project`}</p>
            </div>
            <div className="bg-white content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9682" data-name="Cells">
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:9687" data-name="Cell · Type">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:9688">
                  Type
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:9689">
                  Influencer
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:9690">
                  6-month partnership · your page
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:9691" data-name="Cell · Partnership">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:9692">
                  Partnership
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:9693">
                  Paid
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:9694">
                  ₹18,000–₹22,000 a month
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:9695" data-name="Cell · Duration">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:9696">
                  Duration
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:9697">
                  Long-term
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:9698">
                  6 monthly cycles · Dec – May
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:9699" data-name="Cell · Platforms">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:9700">
                  Platforms
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:9701">
                  Instagram
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:9702">
                  English, Hindi, Kannada
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="772:9703" data-name="What you would post">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9704" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9705" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9706">
                  What you would post each month
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9707">
                  Same plan every month for 6 months · Instagram
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9708" data-name="Platform cards">
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:9709" data-name="Platform · Instagram">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9710" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="772:9711" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9712" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9713">
                      Reels · monthly routine
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:9714">
                      2 a month · code + link
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9715" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9716">
                    Goes live
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9717">
                    by 15th and 25th
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9718" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9719">
                    Length
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9720">
                    30–60 s
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9721" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9722">
                    Tracking
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9723">
                    code + link
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:9724" data-name="Platform · YouTube">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9725" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="772:9726" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9727" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9728">
                      Stories · product use
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:9729">
                      4 a month · link sticker
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9730" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9731">
                    Goes live
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9732">
                    weekly
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9733" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9734">
                    Frames
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9735">
                    3 each
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9736" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9737">
                    Link sticker
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9738">
                    Yes
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:9739" data-name="Platform · Pinterest">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9740" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="772:9741" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9742" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9743">
                      Exclusivity
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:9744">
                      for the 6 months
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9745" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9746">
                    Category
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9747">
                    Makeup
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9748" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9749">
                    Rival brands
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9750">
                    Not allowed
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9751" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9752">
                    Other brands
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9753">
                    Allowed
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:9754" data-name="Platform · Snapchat">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9755" data-name="h">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9757" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9758">
                      Monthly kit
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:9759">
                      Yours to keep
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9760" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9761">
                    Items
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9762">
                    New launches
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9763" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9764">
                    Ships by
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9765">
                    1st of month
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9766" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9767">
                    Worth
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9768">
                    ≈ ₹3,000
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9769" data-name="Row · Fit">
            <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px] self-stretch" data-node-id="772:9770" data-name="Who can apply">
              <div className="[word-break:break-word] bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="772:9771" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="772:9772">
                  Who can apply
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="772:9773">{`Petal & Pine’s requirements · checked against your connected Instagram`}</p>
              </div>
              <div className="[word-break:break-word] bg-white content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[12px] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:9774" data-name="Head row">
                <p className="relative shrink-0 w-[150px]" data-node-id="772:9775">
                  Requirement
                </p>
                <p className="relative shrink-0 w-[230px]" data-node-id="772:9776">
                  Minimalist wants
                </p>
                <p className="flex-[1_0_0] min-w-px relative" data-node-id="772:9777">
                  You
                </p>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:9778" data-name="Req · Followers">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:9779">
                  Followers
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:9780">
                  25K – 5 L
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:9781" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:9782" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:9783">
                    1.12 L
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:9784" data-name="Req · Min. engagement">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:9785">
                  Min. engagement
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:9786">
                  3.5%
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:9787" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:9788" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:9789">
                    4.8%
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:9790" data-name="Req · Niche">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:9791">
                  Niche
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:9792">
                  Makeup, Clean beauty
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:9793" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:9794" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:9795">
                    Skincare, beauty
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:9796" data-name="Req · Audience">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:9797">
                  Audience
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:9798">
                  Women · 18–34 · India
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:9799" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:9800" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:9801">
                    84% women · 91% aged 18–34
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:9802" data-name="Req · Language">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:9803">
                  Language
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:9804">
                  English, Hindi
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:9805" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:9806" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:9807">
                    English, Hindi, Tamil
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#149d46] text-[13px] whitespace-nowrap" data-node-id="772:9808">
                You meet all 5 · you can apply
              </p>
            </div>
            <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start leading-[20px] not-italic overflow-clip p-[20px] relative rounded-[12px] self-stretch shrink-0 w-[360px]" data-node-id="772:9809" data-name="How you’re measured">
              <div className="bg-white content-stretch flex flex-col gap-[2px] items-start overflow-clip relative shrink-0" data-node-id="772:9810" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px] whitespace-nowrap" data-node-id="772:9811">
                  How it’s tracked
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px] w-[320px]" data-node-id="772:9812">
                  Shopify code and link made for you
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:9813" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:9814">
                  Tracked with
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:9815">
                  Net sales (after returns)
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:9816" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:9817">
                  Also read
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:9818">
                  Orders, AOV, link clicks
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:9819" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:9820">
                  Project ends
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:9821">
                  ₹12 L net sales · 5 creators
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:9822" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:9823">
                  Your code
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:9824">
                  ≈ ₹2.4 L over 6 months
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:9825" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:9826">
                  Sales read from
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:9827">
                  Shopify · code MEERAPP + flw.to/ishita-pp
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#4b5563] text-[13px] w-[320px]" data-node-id="772:9828">
                Your code and link are made for you when you’re accepted.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9829" data-name="Row">
            <div className="bg-[var(--bg-surface,white)] border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px]" data-node-id="772:9830" data-name="Brief">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9831" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9832" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9833">
                    Brief
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9834">{`What Petal & Pine wants · read before you apply`}</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9835" data-name="r">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="772:9836" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:9837">
                    Do
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9838" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:9839" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:9840">
                      Use the products for 2 weeks before posting
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9841" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:9842" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:9843">
                      Show the full look, start to finish
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9844" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:9845" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:9846">
                      Use code MEERAPP and your link
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="772:9847" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:9848">
                    Don’t
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9849" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:9850" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:9851">
                      Post rival makeup brands for 6 months
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9852" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:9853" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:9854">
                      Crop the code out of Stories
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:9855" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:9856" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:9857">{`Post before Petal & Pine approves`}</p>
                  </div>
                </div>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:9858" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9859">
                  Usage rights
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:9860">
                  6 months · until 30 Apr (locked on invite)
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:9861" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9862">
                  Paid ads
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:9863">
                  Not included · ask for more to add
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:9864" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9865">
                  Product
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:9866">
                  Monthly kit · yours to keep
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:9867" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9868">
                  Payment
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:9869">
                  Escrow funded each month · released on approval
                </p>
              </div>
            </div>
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[420px]" data-node-id="772:9870" data-name="Fee and terms">
              <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9871" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9872" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9873">
                    Fee and terms
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9874">{`Petal & Pine set a monthly fee range · you pick inside it`}</p>
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:9875" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:9877">
                  Fee range
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:9878">
                  ₹18,000 – ₹22,000 / month
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:9879" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:9881">
                  Covers
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:9882">
                  2 Reels + 4 Stories a month
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:9883" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:9885">
                  Paid into escrow
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:9886">
                  at the start of each month
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:9887" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:9889">
                  Released
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:9890">
                  on approval of that month’s posts
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="1678:1039" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="1678:1041">{`Your fee `}</p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="1678:1042">
                  ₹20,000 / month
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1043" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1045">{`Platform & service fee `}</p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#db231f] text-[14px] whitespace-nowrap" data-node-id="1678:1046">
                  − ₹2,000
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1047" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1049">{`GST `}</p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#db231f] text-[14px] whitespace-nowrap" data-node-id="1678:1050">
                  − ₹360
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1051" data-name="r">
                <p className="flex-[1_0_0] leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1053">
                  You receive
                </p>
                <p className="leading-[22px] relative shrink-0 text-[#149d46] text-[14px] whitespace-nowrap" data-node-id="1678:1054">
                  ₹17,640 / month
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="772:9896" data-name="Key dates">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="772:9897" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:9898" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9899">
                  Monthly cycles
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9900">
                  6 cycles · Dec 2026 – May 2027 · same plan each month
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9901" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:9902" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9903">
                  Apply by
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9904">{`Petal & Pine picks 5 creators by 15 Nov`}</p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9905">
                10 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9906" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:9907" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9908">
                  Cycle 1 · December
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9909">
                  Kit ships 1 Dec · posts by 25 Dec
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9910">
                1–31 Dec
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9911" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:9912" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9913">
                  Cycle 2 · January
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9914">
                  Escrow funded 1 Jan with your consent
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9915">
                1–31 Jan
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:9916" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:9917" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9918">
                  Cycles 3–6
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:9919">
                  Same plan each month
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:9920">
                Feb – May
              </p>
            </div>
          </div>
        </div>
      <CounterOfferModal
        isOpen={isCounterOfferOpen}
        onClose={() => setIsCounterOfferOpen(false)}
        brandName="Petal & Pine"
        rangeText="Petal & Pine's fee is ₹20,000 / month for 6 months"
        postsText="monthly deliverables (6 posts/mo)"
        initialFee={25000}
        quickPicks={[24000, 28000]}
        maxRange={20000}
        defaultNote="I have strong organic engagement with clean beauty and skincare audiences."
      />
    </CreatorShell>
  );
}

export { CreatorProjectPageInfluencerPaidLongTerm };

