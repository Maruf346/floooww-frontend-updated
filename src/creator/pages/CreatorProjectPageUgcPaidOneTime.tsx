import { useState } from "react";
import CounterOfferModal from "../components/CounterOfferModal";

const imgDot = "https://www.figma.com/api/mcp/asset/c0f9d658-0186-47d8-9a6f-8ee495d9ac37.svg";
const imgDot1 = "https://www.figma.com/api/mcp/asset/340c64ef-c279-402a-b50d-98c4beb2138a.svg";
const imgKreyioWordmark = "https://www.figma.com/api/mcp/asset/72eaefdf-6086-4692-b825-96c631341bee.svg";
const imgCampaignBanner = "https://www.figma.com/api/mcp/asset/6d251891-8b4b-484c-9e60-7219f15629bb.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/dc102339-174b-479d-90e4-43aba5a76e1f.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/ccfaacf5-0651-4383-a6c7-122ec0561f4a.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/6c2f667b-7d35-4f37-9845-f33c7c1e0baf.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/2dca0f45-d9cf-486d-b2b6-e52563cbe1d1.svg";
const imgChevron = "https://www.figma.com/api/mcp/asset/12cf0f84-a043-4818-93d7-ffb91faf8f3e.svg";
const imgBullet = "https://www.figma.com/api/mcp/asset/331db91d-ca69-4fc8-8014-0c1c512bda74.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/9eb8beda-d80b-4308-af29-7b5bff2aadfb.svg";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/99ee56f0-aba7-4dd6-aa03-d95f19ed0e4a.svg";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/bd487217-0716-4c7a-b87a-c0a5024599ae.svg";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/ff9f85b3-8942-41ef-86f7-dec8262383fc.svg";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/804aa46e-93b9-42b1-b342-19691bdc5b4b.svg";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/ea4c6f6d-b758-43dd-a9fd-aef8d5d8ac70.svg";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/6ab2b7d4-955d-4f9b-b07b-e111c83bfd26.svg";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/db36c773-482a-44ea-9486-012b15429730.svg";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/2d5bb5d0-9610-429e-aee6-6cee28ab37f1.svg";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/80bd668c-ba68-4cc0-9b20-888478e7adda.svg";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/aaa2bb3f-3c41-4acd-8d78-2bb2edb12f6e.svg";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/9dd4a797-2ae5-4698-89eb-fe3015116e39.svg";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/82b4449b-4c60-4476-a05f-987a4a8aeaea.svg";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/964bef86-1d71-4501-990d-2ef745e402de.svg";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/ff6f636c-efcb-4753-b1d7-f185f7d0ad7d.svg";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/3b833662-50db-4428-9500-b15c968feebd.svg";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/6d268e38-8700-46d1-a6ca-cd53ae6b8fc4.svg";
const imgIcon20 = "https://www.figma.com/api/mcp/asset/2572b2f7-f5d9-472d-be6b-ed4f434c895c.svg";

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

export default function CreatorProjectPageUgcPaidOneTime() {
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  return (
    <div className="bg-[var(--bg-page,white)] content-stretch flex items-start relative size-full" data-node-id="772:10125" data-name="Creator · Project page: UGC · Paid · One-time">
      <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-r border-solid content-stretch flex flex-col gap-[2px] items-start overflow-clip pb-[16px] pt-[20px] px-[16px] relative self-stretch shrink-0 w-[260px]" data-node-id="772:10126" data-name="Sidebar / Creator">
        <Logo className="content-stretch flex items-center overflow-clip relative rounded-[9.778px] shrink-0" />
        <div className="h-[16px] relative shrink-0 w-[10px]" data-node-id="I772:10126;9:488" data-name="gap" />
        <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[10px] items-center overflow-clip p-[10px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:489" data-name="Workspace switcher">
          <div className="bg-[var(--primary-default,#0d0d10)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[32px]" data-node-id="I772:10126;9:489;9:61" data-name="Initials">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-on-primary,white)] whitespace-nowrap" data-node-id="I772:10126;9:489;9:62">
              IR
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="I772:10126;9:489;9:63" data-name="Text">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:489;9:64">
              Ishita Rao
            </p>
            <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I772:10126;9:489;9:65">
              Creator · @ishitarao
            </p>
          </div>
          <div className="relative shrink-0 size-[16px]" data-node-id="I772:10126;9:489;9:66" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I772:10126;9:497" data-name="Section · MAIN">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I772:10126;9:498">
            MAIN
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:499" data-name="Home">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:499;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <a href="/creator" className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)] cursor-pointer" data-node-id="I772:10126;9:499;9:11">
            Overview
          </a>
        </div>
        <div className="bg-[var(--primary-subtle,#f1f4ff)] content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:510" data-name="Find projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:510;9:18" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <a href="/creator/projects" className="[word-break:break-word] block cursor-pointer flex-[1_0_0] font-['Inter:Semi_Bold'] font-semibold leading-[0] min-w-px not-italic relative text-[14px] text-[color:var(--primary-default,#0d0d10)]" data-node-id="I772:10126;9:510;9:21">
            <p className="leading-[20px]">Project discovery</p>
          </a>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:521" data-name="My projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:521;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:521;9:11">
            My projects
          </p>
          <div className="relative shrink-0 size-[14px]" data-node-id="I772:10126;9:521;9:14" data-name="Chevron">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevron} />
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:531" data-name="Invitations & offers">
          <div className="relative shrink-0 size-[4px]" data-node-id="I772:10126;9:531;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I772:10126;9:531;9:29">{`Invitations & offers`}</p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I772:10126;9:531;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I772:10126;9:531;9:31">
              4
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:538" data-name="Applied">
          <div className="relative shrink-0 size-[4px]" data-node-id="I772:10126;9:538;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I772:10126;9:538;9:29">
            Applied
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I772:10126;9:538;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I772:10126;9:538;9:31">
              3
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:545" data-name="Active">
          <div className="relative shrink-0 size-[4px]" data-node-id="I772:10126;9:545;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I772:10126;9:545;9:29">
            Live
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I772:10126;9:545;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I772:10126;9:545;9:31">
              2
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:552" data-name="Completed">
          <div className="relative shrink-0 size-[4px]" data-node-id="I772:10126;9:552;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I772:10126;9:552;9:29">
            Completed
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I772:10126;9:552;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I772:10126;9:552;9:31">
              7
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;778:13550" data-name="Declined">
          <div className="relative shrink-0 size-[4px]" data-node-id="I772:10126;778:13550;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I772:10126;778:13550;9:29">
            Declined
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I772:10126;778:13550;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I772:10126;778:13550;9:31">
              3
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:559" data-name="Content">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:559;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:559;9:11">
            Content
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I772:10126;9:559;9:12" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I772:10126;9:559;9:13">
              2
            </p>
          </div>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I772:10126;9:571" data-name="Section · CONTENT & DATA">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I772:10126;9:572">{`CONTENT & DATA`}</p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:573" data-name="Performance">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:573;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon5} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:573;9:11">
            Performance
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:584" data-name="Earnings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:584;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon6} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:584;9:11">
            Earnings
          </p>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I772:10126;9:596" data-name="Section · ACCOUNT">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I772:10126;9:597">
            ACCOUNT
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:609" data-name="Messages">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:609;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon7} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:609;9:11">
            Messages
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I772:10126;9:609;9:12" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I772:10126;9:609;9:13">
              1
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:619" data-name="Settings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:619;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon8} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:619;9:11">
            Settings
          </p>
        </div>
        <div className="h-[121px] relative shrink-0 w-px" data-node-id="I772:10126;9:630" data-name="Spacer" />
        <div className="bg-[var(--border-default,#e3e5ec)] h-px relative shrink-0 w-[228px]" data-node-id="I772:10126;9:631" data-name="Divider" />
        <div className="h-[8px] relative shrink-0 w-[10px]" data-node-id="I772:10126;9:632" data-name="gap" />
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:633" data-name="Help Center">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:633;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon9} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:633;9:11">
            Help centre
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I772:10126;9:645" data-name="Logout">
          <div className="relative shrink-0 size-[18px]" data-node-id="I772:10126;9:645;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon10} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10126;9:645;9:11">
            Logout
          </p>
        </div>
      </div>
      <div className="bg-[var(--bg-page,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="772:10127" data-name="Main">
        <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-b border-solid content-stretch flex gap-[12px] h-[64px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="772:10128" data-name="Top bar">
          <div className="bg-[var(--bg-subtle,#f4f6fb)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[380px]" data-node-id="I772:10128;10:343" data-name="Search">
            <div className="relative shrink-0 size-[16px]" data-node-id="I772:10128;10:344" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon11} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I772:10128;10:347">
              Search projects, creators, content…
            </p>
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip px-[6px] py-px relative rounded-[4px] shrink-0" data-node-id="I772:10128;10:348" data-name="Kbd">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] whitespace-nowrap" data-node-id="I772:10128;10:349">
                ⌘K
              </p>
            </div>
          </div>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="I772:10128;10:350" data-name="Spacer" />
          <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I772:10128;72:2241" data-name="Notifications">
            <div className="relative shrink-0 size-[18px]" data-node-id="I772:10128;72:2242" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon12} />
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="I772:10128;10:355" data-name="Account">
            <div className="bg-[var(--primary-muted,#e3e9ff)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-full,999px)] shrink-0 size-[32px]" data-node-id="I772:10128;10:356" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="I772:10128;10:357">
                IR
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="I772:10128;10:358" data-name="Name">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I772:10128;10:359">
                Ishita Rao
              </p>
              <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I772:10128;10:360">
                Creator · @ishitarao
              </p>
            </div>
            <div className="relative shrink-0 size-[14px]" data-node-id="I772:10128;10:361" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon13} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[40px] pt-[28px] px-[32px] relative shrink-0 w-full" data-node-id="772:10129" data-name="Content">
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[6px] items-center leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] w-full" data-node-id="772:10130" data-name="Breadcrumb">
            <p className="relative shrink-0 text-[color:var(--text-secondary,#0d0d10)] whitespace-pre" data-node-id="772:10131">{`Project discovery  /  Strand Studio  /`}</p>
            <p className="relative shrink-0 text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:10132">
              Festive Haircare Tutorials
            </p>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="772:10133" data-name="Profile header">
            <div className="h-[180px] relative rounded-[8px] shrink-0 w-full" data-node-id="772:10134" data-name="Campaign banner">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgCampaignBanner} onError={(e) => { e.currentTarget.src = "/assets/creator/projects/festive-haircare-tutorials.png"; }} />
            </div>
            <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10135" data-name="Top">
              <div className="bg-[#db2777] content-stretch flex items-center justify-center overflow-clip relative rounded-[15px] shrink-0 size-[72px]" data-node-id="772:10604" data-name="Brand logo">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-white whitespace-nowrap" data-node-id="772:10605">
                  SS
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="772:10138" data-name="Identity">
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="772:10139" data-name="n">
                  <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[34px] not-italic relative shrink-0 text-[26px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.13px] whitespace-nowrap" data-node-id="772:10140">
                    Festive Haircare Tutorials
                  </p>
                  <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Verified brand" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="772:10142">
                  Strand Studio · UGC · Paid · One-time · 10–30 Nov 2026
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[22px] min-w-full not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] w-[min-content]" data-node-id="772:10143">
                  Film 3 short festive hairstyle tutorials. You send the files, Strand Studio posts them on its own page and in ads.
                </p>
                <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="772:10144" data-name="Niches">
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Haircare" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Festive" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="UGC" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Files only" tone="Neutral" />
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="772:10149" data-name="Actions">
                <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip p-[10px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="772:10150" data-name="Save">
                  <div className="relative shrink-0 size-[18px]" data-node-id="772:10151" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon14} />
                  </div>
                </div>
                <a className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="772:10152" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I772:10152;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon15} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I772:10152;5:33">
                    Message brand
                  </p>
                </a>
                <button
                  type="button"
                  onClick={() => setIsCounterOfferOpen(true)}
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f9fafb] transition"
                  data-node-id="772:10153"
                  data-name="Button"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="I772:10153;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon16} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I772:10153;5:33">
                    Counter offer
                  </p>
                </button>
                <a className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="772:10154" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I772:10154;5:6" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon17} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap" data-node-id="I772:10154;5:9">
                    Apply
                  </p>
                </a>
              </div>
            </div>
            <div className="bg-[var(--bg-subtle,#f4f6fb)] content-stretch flex gap-[10px] items-center overflow-clip px-[14px] py-[10px] relative rounded-[10px] shrink-0 w-full" data-node-id="772:10155" data-name="Application context">
              <div className="relative shrink-0 size-[16px]" data-node-id="772:10156" data-name="Icon">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon18} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10157">
                Apply by 6 Nov · 9 days left · you meet all 5 requirements · 84% match
              </p>
              <a href="/creator/projects" className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="772:10158">
                <p className="leading-[20px]">Back to discovery</p>
              </a>
            </div>
          </div>
          <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start not-italic overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="772:10159" data-name="Campaign setup">
            <div className="bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="772:10160" data-name="Card head">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="772:10161">
                Project setup
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="772:10162">
                Set by Strand Studio when creating this project
              </p>
            </div>
            <div className="bg-white content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10163" data-name="Cells">
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:10168" data-name="Cell · Type">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:10169">
                  Type
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:10170">
                  UGC
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:10171">
                  Files only · not on your page
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:10172" data-name="Cell · Partnership">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:10173">
                  Partnership
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:10174">
                  Paid
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:10175">
                  ₹7,000–₹9,000 per video
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:10176" data-name="Cell · Duration">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:10177">
                  Duration
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:10178">
                  One-time
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:10179">
                  10–30 Nov 2026
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="772:10180" data-name="Cell · Platforms">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:10181">
                  Platforms
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="772:10182">
                  Brand’s Instagram
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="772:10183">
                  Hindi or English voice-over
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="772:10184" data-name="What you would post">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10185" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10186" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10187">
                  What you would make
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10188">
                  Video files only · Strand Studio posts them
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10189" data-name="Platform cards">
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:10190" data-name="Platform · Instagram">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10191" data-name="h">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10193" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10194">
                      Video 1 · Diwali bun
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:10195">
                      30–45 s · vertical 9:16
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10196" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10197">
                    Files due
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10198">
                    14 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10199" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10200">
                    Format
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10201">
                    MP4 · 4K
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10202" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10203">
                    Voice-over
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10204">
                    Yes
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:10205" data-name="Platform · YouTube">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10206" data-name="h">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10208" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10209">
                      Video 2 · Open curls
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:10210">
                      30–45 s · vertical 9:16
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10211" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10212">
                    Files due
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10213">
                    20 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10214" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10215">
                    Format
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10216">
                    MP4 · 4K
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10217" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10218">
                    Voice-over
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10219">
                    Yes
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:10220" data-name="Platform · Pinterest">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10221" data-name="h">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10223" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10224">
                      Video 3 · Quick braid
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:10225">
                      30–45 s · vertical 9:16
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10226" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10227">
                    Files due
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10228">
                    26 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10229" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10230">
                    Format
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10231">
                    MP4 · 4K
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10232" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10233">
                    Voice-over
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10234">
                    Yes
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="772:10235" data-name="Platform · Snapchat">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10236" data-name="h">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10238" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10239">
                      Hair kit
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="772:10240">
                      Yours to keep
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10241" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10242">
                    Items
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10243">
                    Serum + heat spray
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10244" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10245">
                    Ships by
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10246">
                    8 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10247" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10248">
                    Worth
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10249">
                    ₹1,800
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10250" data-name="Row · Fit">
            <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px] self-stretch" data-node-id="772:10251" data-name="Who can apply">
              <div className="[word-break:break-word] bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="772:10252" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="772:10253">
                  Who can apply
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="772:10254">
                  Strand Studio’s requirements · checked against your profile
                </p>
              </div>
              <div className="[word-break:break-word] bg-white content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[12px] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="772:10255" data-name="Head row">
                <p className="relative shrink-0 w-[150px]" data-node-id="772:10256">
                  Requirement
                </p>
                <p className="relative shrink-0 w-[230px]" data-node-id="772:10257">
                  Strand Studio wants
                </p>
                <p className="flex-[1_0_0] min-w-px relative" data-node-id="772:10258">
                  You
                </p>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:10259" data-name="Req · Followers">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:10260">
                  Hair videos
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:10261">
                  3+ in your portfolio
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:10262" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:10263" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:10264">
                    6 hair videos
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:10265" data-name="Req · Min. engagement">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:10266">
                  Video quality
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:10267">
                  Clear light, steady shots
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:10268" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:10269" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:10270">
                    Rated 4.8 by brands
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:10271" data-name="Req · Niche">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:10272">
                  Niche
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:10273">
                  Hair, Beauty
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:10274" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:10275" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:10276">
                    Skincare, beauty
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:10277" data-name="Req · Audience">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:10278">
                  Followers
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:10279">
                  Not needed · files only
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:10280" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:10281" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:10282">
                    -
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="772:10283" data-name="Req · Language">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="772:10284">
                  Voice-over
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="772:10285">
                  Hindi or English
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="772:10286" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="772:10287" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="772:10288">
                    English, Hindi, Tamil
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#149d46] text-[13px] whitespace-nowrap" data-node-id="772:10289">
                You meet all 5 · you can apply
              </p>
            </div>
            <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start leading-[20px] not-italic overflow-clip p-[20px] relative rounded-[12px] self-stretch shrink-0 w-[360px]" data-node-id="772:10290" data-name="How you’re measured">
              <div className="bg-white content-stretch flex flex-col gap-[2px] items-start overflow-clip relative shrink-0" data-node-id="772:10291" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px] whitespace-nowrap" data-node-id="772:10292">
                  How it’s tracked
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px] w-[320px]" data-node-id="772:10293">
                  On Strand Studio’s own posts
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:10294" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:10295">
                  Tracked with
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:10296">
                  Minimalist’s own posts · engagement
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:10297" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:10298">
                  Also read
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:10299">
                  Saves, shares, watch time
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:10300" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:10301">
                  Project ends
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:10302">
                  30 Nov 2026
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:10303" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:10304">
                  Your files
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:10305">
                  3 videos
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="772:10306" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="772:10307">
                  Sales read from
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="772:10308">
                  Strand Studio’s Instagram + ad account
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#4b5563] text-[13px] w-[320px]" data-node-id="772:10309">
                Your fee doesn’t depend on results, it is released when each file is approved.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10310" data-name="Row">
            <div className="bg-[var(--bg-surface,white)] border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px]" data-node-id="772:10311" data-name="Brief">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10312" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10313" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10314">
                    Brief
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10315">
                    What Strand Studio wants · read before you apply
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10316" data-name="r">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="772:10317" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:10318">
                    Do
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10319" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:10320" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:10321">
                      Film in natural light, vertical 9:16
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10322" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:10323" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:10324">
                      Show each step clearly
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10325" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:10326" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:10327">
                      Add a Hindi or English voice-over
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="772:10328" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:10329">
                    Don’t
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10330" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:10331" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:10332">
                      Post the videos on your own page
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10333" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:10334" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:10335">
                      Use music you don’t have rights to
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="772:10336" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="772:10337" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="772:10338">
                      Show other hair brands
                    </p>
                  </div>
                </div>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:10339" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10340">
                  Usage rights
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:10341">
                  Organic + paid ads for 6 months
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:10342" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10343">
                  Paid ads
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:10344">
                  Included in the fee
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:10345" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10346">
                  Product
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:10347">
                  Hair kit · yours to keep
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="772:10348" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10349">
                  Payment
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="772:10350">
                  Escrow per video · released on approval
                </p>
              </div>
            </div>
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[420px]" data-node-id="772:10351" data-name="Fee and terms">
              <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10352" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10353" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10354">
                    Fee and terms
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10355">
                    Strand Studio set a fee per video · you pick inside it
                  </p>
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:10356" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:10358">
                  Fee range
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:10359">
                  ₹7,000 – ₹9,000 / video
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:10360" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:10362">
                  Covers
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:10363">
                  3 videos (₹21,000 – ₹27,000)
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:10364" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:10366">
                  Paid into escrow
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:10367">
                  when Strand Studio accepts you
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="772:10368" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="772:10370">
                  Released
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="772:10371">
                  on approval of each file
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="1678:1476" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="1678:1478">
                  Your fee (example)
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="1678:1479">
                  ₹8,000 × 3 videos = ₹24,000
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1480" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1482">{`Platform & service fee · Kreyio`}</p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#db231f] text-[14px] whitespace-nowrap" data-node-id="1678:1483">
                  − ₹2,400
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1484" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1486">
                  GST on the service fee
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#db231f] text-[14px] whitespace-nowrap" data-node-id="1678:1487">
                  − ₹432
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1488" data-name="r">
                <p className="flex-[1_0_0] leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1490">
                  You receive
                </p>
                <p className="leading-[22px] relative shrink-0 text-[#149d46] text-[14px] whitespace-nowrap" data-node-id="1678:1491">
                  ₹21,168
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="772:10377" data-name="Key dates">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="772:10378" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="772:10379" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10380">
                  Key dates
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10381">
                  Project runs 10–30 Nov 2026 · each video has its own deadline
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10382" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:10383" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10384">
                  Apply by
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10385">
                  Strand Studio picks 3 creators by 8 Nov
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10386">
                6 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10387" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:10388" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10389">
                  Hair kit ships
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10390">
                  Serum + heat spray · tracked
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10391">
                8 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10392" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:10393" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10394">
                  Video 1 files due
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10395">
                  Diwali bun · send in the app
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10396">
                14 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10397" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:10398" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10399">
                  Video 2 files due
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10400">
                  Open curls
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10401">
                20 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="772:10402" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="772:10403" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10404">
                  Video 3 files due
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="772:10405">
                  Quick braid · project ends 30 Nov
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="772:10406">
                26 Nov
              </p>
            </div>
          </div>
        </div>
      </div>
      <CounterOfferModal
        isOpen={isCounterOfferOpen}
        onClose={() => setIsCounterOfferOpen(false)}
        brandName="Strand Studio"
        rangeText="Strand Studio's fee is ₹8,000 per video for 3 videos"
        postsText="all 3 UGC videos"
        initialFee={10000}
        quickPicks={[9000, 12000]}
        maxRange={8000}
        defaultNote="My haircare tutorials have high completion rates and detailed aesthetic styling."
      />
    </div>
  );
}

export { CreatorProjectPageUgcPaidOneTime };

