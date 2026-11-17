import { useState } from "react";
import CounterOfferModal from "../components/CounterOfferModal";

const imgDot = "https://www.figma.com/api/mcp/asset/82cd51e2-0158-4f6b-9b42-ef142e2504d5.svg";
const imgDot1 = "https://www.figma.com/api/mcp/asset/2fb31e0f-8110-4ffb-9a01-6cdce35e9fef.svg";
const imgKreyioWordmark = "https://www.figma.com/api/mcp/asset/e2928aaf-e386-4817-b13e-d249c30af080.svg";
const imgCampaignBanner = "https://www.figma.com/api/mcp/asset/e51426b4-4ea8-4948-bcd9-92fb2ff2a4b2.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/6a36a397-fb31-489b-8a65-4919bb0cc723.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/a7ce1afb-5b59-4809-bef9-45d3717926c2.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/85f755c7-8eb9-4b32-8f74-2c416c01cbf8.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/e398b495-34b7-4465-b08e-e25a5c0bc9a5.svg";
const imgChevron = "https://www.figma.com/api/mcp/asset/d55cea67-d995-47d6-bc8d-2cdf852744ad.svg";
const imgBullet = "https://www.figma.com/api/mcp/asset/ea7b8e31-1d54-4f24-911b-4278c38a2a5e.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/5d05a577-d192-4b60-a4c4-3d32a5854030.svg";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/2c02d5fe-a9fc-4558-88c4-af1f398b530c.svg";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/cdb219d4-83c9-46b4-b2e5-e1f52de59dc5.svg";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/9be57c30-3c1d-4918-973d-b29589d9b553.svg";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/79b12682-21e3-4e16-a4ac-62e6d6ffca68.svg";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/559d7df5-f395-4e4f-b599-ded1ebfae879.svg";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/5e38b9eb-c938-4297-ae8c-03292ecd2ff4.svg";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/23a69234-70f5-4b6c-9a7c-6588e2549aa9.svg";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/57d2e0dc-1d08-45f2-b433-c462737a7da5.svg";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/9b372ee6-282c-4517-8d51-d373b17adf0d.svg";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/b3dd51b6-32de-4e5d-b99e-d4050c9576f2.svg";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/2b8fa226-b808-4b2e-aaa0-c55c5beab875.svg";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/a392f02a-baf7-40e4-9fdc-41c9f6ce8e2a.svg";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/3b190030-9dcb-4e56-a3ad-c49a54d20c2c.svg";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/5f3f8abc-6ec0-4fef-864c-51d417bf1f2c.svg";
const imgPlatformLogo = "https://www.figma.com/api/mcp/asset/6e36843d-5479-4b32-b0a5-1984835dfe0c.svg";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/4495b46d-7ed6-44f1-9539-e1cc7f1a7506.svg";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/205c08ae-82d8-49da-9847-26971e11a6c7.svg";
const imgIcon20 = "https://www.figma.com/api/mcp/asset/65b31315-c09b-47a1-b9ad-add0e58dcac3.svg";
const imgIcon21 = "https://www.figma.com/api/mcp/asset/76db217e-a9dc-4764-bd07-b38fbd40b415.svg";

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

export default function Cr03ProjectPageInfluencerGiftOneTime() {
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  return (
    <div className="bg-[var(--bg-page,white)] content-stretch flex items-start relative size-full" data-node-id="773:10036" data-name="CR-03 · Project page: Influencer · Gift · One-time">
      <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-r border-solid content-stretch flex flex-col gap-[2px] items-start overflow-clip pb-[16px] pt-[20px] px-[16px] relative self-stretch shrink-0 w-[260px]" data-node-id="773:10037" data-name="Sidebar / Creator">
        <Logo className="content-stretch flex items-center overflow-clip relative rounded-[9.778px] shrink-0" />
        <div className="h-[16px] relative shrink-0 w-[10px]" data-node-id="I773:10037;9:488" data-name="gap" />
        <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[10px] items-center overflow-clip p-[10px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:489" data-name="Workspace switcher">
          <div className="bg-[var(--primary-default,#0d0d10)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[32px]" data-node-id="I773:10037;9:489;9:61" data-name="Initials">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-on-primary,white)] whitespace-nowrap" data-node-id="I773:10037;9:489;9:62">
              IR
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="I773:10037;9:489;9:63" data-name="Text">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:489;9:64">
              Ishita Rao
            </p>
            <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I773:10037;9:489;9:65">
              Creator · @ishitarao
            </p>
          </div>
          <div className="relative shrink-0 size-[16px]" data-node-id="I773:10037;9:489;9:66" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I773:10037;9:497" data-name="Section · MAIN">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I773:10037;9:498">
            MAIN
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:499" data-name="Home">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:499;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <a href="/creator" className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)] cursor-pointer" data-node-id="I773:10037;9:499;9:11">
            Overview
          </a>
        </div>
        <div className="bg-[var(--primary-subtle,#f1f4ff)] content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:510" data-name="Find projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:510;9:18" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <a href="/creator/projects" className="[word-break:break-word] block cursor-pointer flex-[1_0_0] font-['Inter:Semi_Bold'] font-semibold leading-[0] min-w-px not-italic relative text-[14px] text-[color:var(--primary-default,#0d0d10)]" data-node-id="I773:10037;9:510;9:21">
            <p className="leading-[20px]">Project discovery</p>
          </a>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:521" data-name="My projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:521;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:521;9:11">
            My projects
          </p>
          <div className="relative shrink-0 size-[14px]" data-node-id="I773:10037;9:521;9:14" data-name="Chevron">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevron} />
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:531" data-name="Invitations & offers">
          <div className="relative shrink-0 size-[4px]" data-node-id="I773:10037;9:531;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I773:10037;9:531;9:29">{`Invitations & offers`}</p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I773:10037;9:531;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I773:10037;9:531;9:31">
              4
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:538" data-name="Applied">
          <div className="relative shrink-0 size-[4px]" data-node-id="I773:10037;9:538;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I773:10037;9:538;9:29">
            Applied
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I773:10037;9:538;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I773:10037;9:538;9:31">
              3
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:545" data-name="Active">
          <div className="relative shrink-0 size-[4px]" data-node-id="I773:10037;9:545;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I773:10037;9:545;9:29">
            Live
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I773:10037;9:545;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I773:10037;9:545;9:31">
              2
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:552" data-name="Completed">
          <div className="relative shrink-0 size-[4px]" data-node-id="I773:10037;9:552;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I773:10037;9:552;9:29">
            Completed
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I773:10037;9:552;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I773:10037;9:552;9:31">
              7
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;778:13550" data-name="Declined">
          <div className="relative shrink-0 size-[4px]" data-node-id="I773:10037;778:13550;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I773:10037;778:13550;9:29">
            Declined
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I773:10037;778:13550;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I773:10037;778:13550;9:31">
              3
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:559" data-name="Content">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:559;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:559;9:11">
            Content
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I773:10037;9:559;9:12" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I773:10037;9:559;9:13">
              2
            </p>
          </div>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I773:10037;9:571" data-name="Section · CONTENT & DATA">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I773:10037;9:572">{`CONTENT & DATA`}</p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:573" data-name="Performance">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:573;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon5} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:573;9:11">
            Performance
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:584" data-name="Earnings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:584;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon6} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:584;9:11">
            Earnings
          </p>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I773:10037;9:596" data-name="Section · ACCOUNT">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I773:10037;9:597">
            ACCOUNT
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:609" data-name="Messages">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:609;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon7} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:609;9:11">
            Messages
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I773:10037;9:609;9:12" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I773:10037;9:609;9:13">
              1
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:619" data-name="Settings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:619;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon8} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:619;9:11">
            Settings
          </p>
        </div>
        <div className="h-[121px] relative shrink-0 w-px" data-node-id="I773:10037;9:630" data-name="Spacer" />
        <div className="bg-[var(--border-default,#e3e5ec)] h-px relative shrink-0 w-[228px]" data-node-id="I773:10037;9:631" data-name="Divider" />
        <div className="h-[8px] relative shrink-0 w-[10px]" data-node-id="I773:10037;9:632" data-name="gap" />
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:633" data-name="Help Center">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:633;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon9} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:633;9:11">
            Help centre
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I773:10037;9:645" data-name="Logout">
          <div className="relative shrink-0 size-[18px]" data-node-id="I773:10037;9:645;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon10} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10037;9:645;9:11">
            Logout
          </p>
        </div>
      </div>
      <div className="bg-[var(--bg-page,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="773:10038" data-name="Main">
        <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-b border-solid content-stretch flex gap-[12px] h-[64px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="773:10039" data-name="Top bar">
          <div className="bg-[var(--bg-subtle,#f4f6fb)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[380px]" data-node-id="I773:10039;10:343" data-name="Search">
            <div className="relative shrink-0 size-[16px]" data-node-id="I773:10039;10:344" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon11} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I773:10039;10:347">
              Search projects, creators, content…
            </p>
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip px-[6px] py-px relative rounded-[4px] shrink-0" data-node-id="I773:10039;10:348" data-name="Kbd">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] whitespace-nowrap" data-node-id="I773:10039;10:349">
                ⌘K
              </p>
            </div>
          </div>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="I773:10039;10:350" data-name="Spacer" />
          <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I773:10039;72:2241" data-name="Notifications">
            <div className="relative shrink-0 size-[18px]" data-node-id="I773:10039;72:2242" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon12} />
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="I773:10039;10:355" data-name="Account">
            <div className="bg-[var(--primary-muted,#e3e9ff)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-full,999px)] shrink-0 size-[32px]" data-node-id="I773:10039;10:356" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="I773:10039;10:357">
                IR
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="I773:10039;10:358" data-name="Name">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I773:10039;10:359">
                Ishita Rao
              </p>
              <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I773:10039;10:360">
                Creator · @ishitarao
              </p>
            </div>
            <div className="relative shrink-0 size-[14px]" data-node-id="I773:10039;10:361" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon13} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[40px] pt-[28px] px-[32px] relative shrink-0 w-full" data-node-id="773:10040" data-name="Content">
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[6px] items-center leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] w-full" data-node-id="773:10041" data-name="Breadcrumb">
            <p className="relative shrink-0 text-[color:var(--text-secondary,#0d0d10)] whitespace-pre" data-node-id="773:10042">{`Project discovery  /  Minimalist  /`}</p>
            <p className="relative shrink-0 text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="773:10043">
              Hydration Bundle
            </p>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="773:10044" data-name="Profile header">
            <div className="h-[180px] relative rounded-[8px] shrink-0 w-full" data-node-id="773:10045" data-name="Campaign banner">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgCampaignBanner} onError={(e) => { e.currentTarget.src = "/assets/creator/projects/hydration-bundle.png"; }} />
            </div>
            <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10046" data-name="Top">
              <div className="bg-[#3b5bff] content-stretch flex items-center justify-center overflow-clip relative rounded-[15px] shrink-0 size-[72px]" data-node-id="773:10515" data-name="Brand logo">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-white whitespace-nowrap" data-node-id="773:10516">
                  MI
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="773:10049" data-name="Identity">
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="773:10050" data-name="n">
                  <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[34px] not-italic relative shrink-0 text-[26px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.13px] whitespace-nowrap" data-node-id="773:10051">
                    Hydration Bundle
                  </p>
                  <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Verified brand" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="773:10053">
                  Minimalist · Gift · One-time · 4–25 Nov 2026
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[22px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] w-[886px]" data-node-id="773:10054">
                  Try Minimalist’s Hydration Bundle and share a Reel with your link. Gift onlyyou keep the kit worth ₹6,500.
                </p>
                <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="773:10055" data-name="Niches">
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Skincare" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Gift" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Link in bio" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Instagram" tone="Neutral" />
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="773:10060" data-name="Actions">
                <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip p-[10px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="773:10061" data-name="Save">
                  <div className="relative shrink-0 size-[18px]" data-node-id="773:10062" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon14} />
                  </div>
                </div>
                <a className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="773:10063" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I773:10063;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon15} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I773:10063;5:33">
                    Message brand
                  </p>
                </a>
                <button
                  type="button"
                  onClick={() => setIsCounterOfferOpen(true)}
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f9fafb] transition"
                  data-node-id="773:10064"
                  data-name="Button"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="I773:10064;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon16} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I773:10064;5:33">
                    Ask for a fee
                  </p>
                </button>
                <a className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="773:10065" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I773:10065;5:6" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon17} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap" data-node-id="I773:10065;5:9">
                    Apply
                  </p>
                </a>
              </div>
            </div>
            <div className="bg-[var(--bg-subtle,#f4f6fb)] content-stretch flex gap-[10px] items-center overflow-clip px-[14px] py-[10px] relative rounded-[10px] shrink-0 w-full" data-node-id="773:10066" data-name="Application context">
              <div className="relative shrink-0 size-[16px]" data-node-id="773:10067" data-name="Icon">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon18} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10068">
                Apply by 3 Nov · 6 days left · you meet all 5 requirements · 77% match
              </p>
              <a href="/creator/projects" className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="773:10069">
                <p className="leading-[20px]">Back to discovery</p>
              </a>
            </div>
          </div>
          <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start not-italic overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="773:10070" data-name="Campaign setup">
            <div className="bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="773:10071" data-name="Card head">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="773:10072">
                Project setup
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="773:10073">
                Set by Minimalist when creating this project
              </p>
            </div>
            <div className="bg-white content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10074" data-name="Cells">
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="773:10079" data-name="Cell · Type">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="773:10080">
                  Type
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="773:10081">
                  Influencer marketing
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="773:10082">
                  Posted on your own page
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="773:10083" data-name="Cell · Partnership">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="773:10084">
                  Partnership
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="773:10085">
                  Gift exchange
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="773:10086">
                  Kit worth ₹6,500 · no cash fee
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="773:10087" data-name="Cell · Duration">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="773:10088">
                  Duration
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="773:10089">
                  One-time
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="773:10090">
                  4–25 Nov 2026
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="773:10091" data-name="Cell · Platforms">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="773:10092">
                  Platforms
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="773:10093">
                  Instagram
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="773:10094">
                  English, Hindi
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="773:10095" data-name="What you would post">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10096" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="773:10097" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10098">
                  What you would post
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10099">
                  Post within 7 days of the kit arriving · Instagram
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10100" data-name="Platform cards">
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="773:10101" data-name="Platform · Instagram">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10102" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="773:10103" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="773:10104" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10105">
                      Reel · bundle routine
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="773:10106">
                      30–45 s · link in bio
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10107" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10108">
                    Post within
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10109">
                    7 days of delivery
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10110" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10111">
                    Length
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10112">
                    30–45 s
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10113" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10114">
                    Tracking
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10115">
                    your link
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="773:10116" data-name="Platform · YouTube">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10117" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="773:10118" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="773:10119" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10120">
                      Story · with link
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="773:10121">
                      1 frame · link sticker
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10122" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10123">
                    Post
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10124">
                    same day as Reel
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10125" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10126">
                    Frames
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10127">
                    1
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10128" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10129">
                    Link sticker
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10130">
                    Yes
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="773:10146" data-name="Platform · Snapchat">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10147" data-name="h">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="773:10149" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10150">
                      Hydration Bundle
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="773:10151">
                      Yours to keep
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10152" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10153">
                    Items
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10154">
                    4 products
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10155" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10156">
                    Ships by
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10157">
                    5 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10158" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10159">
                    Worth
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10160">
                    ₹6,500
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10161" data-name="Row · Fit">
            <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px] self-stretch" data-node-id="773:10162" data-name="Who can apply">
              <div className="[word-break:break-word] bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="773:10163" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="773:10164">
                  Who can apply
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="773:10165">
                  Minimalist’s requirements · checked against your connected Instagram
                </p>
              </div>
              <div className="[word-break:break-word] bg-white content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[12px] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="773:10166" data-name="Head row">
                <p className="relative shrink-0 w-[150px]" data-node-id="773:10167">
                  Requirement
                </p>
                <p className="relative shrink-0 w-[230px]" data-node-id="773:10168">
                  Minimalist wants
                </p>
                <p className="flex-[1_0_0] min-w-px relative" data-node-id="773:10169">
                  You
                </p>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="773:10170" data-name="Req · Followers">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="773:10171">
                  Followers
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="773:10172">
                  10K – 2 L
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="773:10173" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="773:10174" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="773:10175">
                    1.12 L
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="773:10176" data-name="Req · Min. engagement">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="773:10177">
                  Min. engagement
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="773:10178">
                  3.0%
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="773:10179" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="773:10180" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="773:10181">
                    4.8%
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="773:10182" data-name="Req · Niche">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="773:10183">
                  Niche
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="773:10184">
                  Beauty, Skincare
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="773:10185" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="773:10186" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="773:10187">
                    Skincare, beauty
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="773:10188" data-name="Req · Audience">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="773:10189">
                  Audience
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="773:10190">
                  Mostly women · 18–34 · India metros
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="773:10191" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="773:10192" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="773:10193">
                    84% women · 91% aged 18–34
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="773:10194" data-name="Req · Language">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="773:10195">
                  On-time score
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="773:10196">
                  90%+
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="773:10197" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="773:10198" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="773:10199">
                    98%
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#149d46] text-[13px] whitespace-nowrap" data-node-id="773:10200">
                You meet all 5 · you can apply
              </p>
            </div>
            <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start leading-[20px] not-italic overflow-clip p-[20px] relative rounded-[12px] self-stretch shrink-0 w-[360px]" data-node-id="773:10201" data-name="How you’re measured">
              <div className="bg-white content-stretch flex flex-col gap-[2px] items-start overflow-clip relative shrink-0" data-node-id="773:10202" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px] whitespace-nowrap" data-node-id="773:10203">
                  How it’s tracked
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px] w-[320px]" data-node-id="773:10204">
                  Tracked with your own link
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="773:10205" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="773:10206">
                  Tracked with
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="773:10207">
                  Visits to minimalist.in
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="773:10208" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="773:10209">
                  Also read
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="773:10210">
                  Link clicks, time on site
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="773:10211" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="773:10212">
                  Project ends
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="773:10213">
                  25 Nov 2026 · usage rights 30 days
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="773:10214" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="773:10215">
                  Your code
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="773:10216">
                  flw.to/ishita-hydra
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="773:10217" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="773:10218">
                  Sales read from
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="773:10219">
                  flw.to/ishita-hydra · Minimalist’s Shopify
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#4b5563] text-[13px] w-[320px]" data-node-id="773:10220">
                Keep the link in your bio until 25 Nov.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10221" data-name="Row">
            <div className="bg-[var(--bg-surface,white)] border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px]" data-node-id="773:10222" data-name="Brief">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10223" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="773:10224" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10225">
                    Brief
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10226">
                    What Minimalist wants · read before you apply
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10227" data-name="r">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="773:10228" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="773:10229">
                    Do
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10230" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="773:10231" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="773:10232">
                      Use the kit for a week before posting
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10233" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="773:10234" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="773:10235">
                      Show the texture on your skin
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10236" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="773:10237" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="773:10238">
                      Put flw.to/ishita-hydra in your bio
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="773:10239" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="773:10240">
                    Don’t
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10241" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="773:10242" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="773:10243">
                      Sell or give away the kit
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10244" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="773:10245" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="773:10246">
                      Make medical claims
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="773:10247" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="773:10248" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="773:10249">
                      Post before Minimalist approves
                    </p>
                  </div>
                </div>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="773:10250" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10251">
                  Usage rights
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="773:10252">
                  Organic reposts on Minimalist’s Instagram for 30 days
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="773:10253" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10254">
                  Paid ads
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="773:10255">
                  Not included
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="773:10256" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10257">
                  Product
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="773:10258">
                  Ships by 5 Nov · yours to keep
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="773:10259" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10260">
                  Payment
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="773:10261">
                  No payment · gift project
                </p>
              </div>
            </div>
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[420px]" data-node-id="773:10262" data-name="Fee and terms">
              <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10263" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="773:10264" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10265">
                    Gift and terms
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10266">
                    Gift project · no cash fee
                  </p>
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="773:10267" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="773:10269">
                  Gift exchange
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="773:10270">
                  Hydration Bundle
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="773:10271" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="773:10273">
                  Worth
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="773:10274">
                  ₹6,500
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="773:10275" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="773:10277">
                  Ships
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="773:10278">
                  by 5 Nov · tracked
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="773:10279" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="773:10281">
                  Post within
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="773:10282">
                  7 days of delivery
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="773:10288" data-name="Key dates">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="773:10289" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="773:10290" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10291">
                  Key dates
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10292">
                  Project runs 4–25 Nov 2026
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10293" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="773:10294" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10295">
                  Apply by
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10296">
                  Minimalist picks 8 creators by 4 Nov
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10297">
                3 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10298" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="773:10299" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10300">
                  Kit ships
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10301">
                  Hydration Bundle · tracked delivery
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10302">
                5 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10303" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="773:10304" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10305">
                  Confirm it arrived
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10306">
                  Auto-confirms 48 h after delivery
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10307">
                ≈ 7 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10308" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="773:10309" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10310">
                  Reel + Story go live
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10311">
                  Within 7 days of delivery · send for approval first
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10312">
                by 14 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="773:10313" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="773:10314" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10315">
                  Link stays in bio
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="773:10316">
                  Project ends
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="773:10317">
                25 Nov
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[var(--primary-default,#0d0d10)] content-stretch flex items-center justify-center overflow-clip right-[24px] rounded-[var(--radius-full,999px)] shadow-[0px_16px_40px_-8px_rgba(8,10,20,0.14)] size-[56px] top-[820px]" data-node-id="773:10318" data-name="Chatbot launcher">
        <div className="relative shrink-0 size-[24px]" data-node-id="I773:10318;19:46" data-name="Icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon21} />
        </div>
      </div>
      <CounterOfferModal
        isOpen={isCounterOfferOpen}
        onClose={() => setIsCounterOfferOpen(false)}
        brandName="Minimalist"
        rangeText="Minimalist's project is Gift (Kit worth ₹6,500) for 1 Reel + 1 Story"
        postsText="1 Reel + 1 Story"
        initialFee={6000}
        quickPicks={[4000, 6000, 8000]}
        maxRange={0}
        defaultNote="I can create an in-depth routine Reel + Story featuring the full Hydration kit."
      />
    </div>
  );
}

export { Cr03ProjectPageInfluencerGiftOneTime };
