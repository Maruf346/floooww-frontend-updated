import { useState } from "react";
import CounterOfferModal from "../components/CounterOfferModal";

const imgDot = "https://www.figma.com/api/mcp/asset/49c9641a-9e97-4432-a71d-61c3bf1eafe6.svg";
const imgDot1 = "https://www.figma.com/api/mcp/asset/8907a981-c3b5-4ed9-9f47-9cc4409d5d4b.svg";
const imgKreyioWordmark = "https://www.figma.com/api/mcp/asset/359c636f-e8fc-46ea-9d5a-3058e1053995.svg";
const imgCampaignBanner = "https://www.figma.com/api/mcp/asset/9fad65e4-9712-4afc-b472-565f9e275136.png";
const imgIcon = "https://www.figma.com/api/mcp/asset/4b9a601d-88b8-4bdd-b67b-e715a52fe34b.svg";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/ce9de8bf-b669-47b5-a589-877dceb6f43d.svg";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/739c4b45-5c63-4c7b-a422-8cdf84b3e737.svg";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/7deec2e9-cfcb-4806-9349-dcdb1ec428eb.svg";
const imgChevron = "https://www.figma.com/api/mcp/asset/2f026360-1915-425c-9eb1-f606a9956691.svg";
const imgBullet = "https://www.figma.com/api/mcp/asset/72b07165-0284-49f8-b81a-74bfc8f761e7.svg";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/ca5f6ce5-2b2a-4d63-ab57-6e671996be0d.svg";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/ad2f9abe-2390-4690-9ac9-80088562e9fc.svg";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/50c2cec8-9374-4e39-833d-02c4c895ac60.svg";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/3200370c-f319-4855-94be-2589e77eb8c7.svg";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/5c874d5d-0abf-46b7-a820-866cbd869804.svg";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/b07c46e0-9efd-4109-bb0e-e3f464c8007e.svg";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/5f95ef3f-2933-4280-be1c-6e2eb042f5c8.svg";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/0bece68b-7878-4d04-bccc-2213c9d060cf.svg";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/97848208-4c90-4613-b448-7a20f04486d4.svg";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/3665ca49-a6e8-48ef-ae0d-57dedbbd26ac.svg";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/3baef9f5-bd37-4598-b493-0fa125b51f0f.svg";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/1dbefce6-e98a-41bb-b759-59944c5a8fc7.svg";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/76b4b976-df7a-45bd-8e3b-c114ab803dbe.svg";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/eec6b78c-715e-48dc-bcbd-5e04f7c18186.svg";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/733d0274-b7e7-4b96-a80e-cb70219f753a.svg";
const imgPlatformLogo = "https://www.figma.com/api/mcp/asset/38777f25-5b2d-493f-8f5c-4e2853d03ec5.svg";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/a4ed0be9-f250-4e66-b896-e753f64b986d.svg";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/b9c04036-ba8a-4528-9176-cc3fde492824.svg";
const imgIcon20 = "https://www.figma.com/api/mcp/asset/1a08df6f-b6a4-4350-9e5d-88ef23e38e1a.svg";

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

export default function Cr03ProjectPageInfluencerPaidOneTime() {
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  return (
    <div className="bg-[var(--bg-page,white)] content-stretch flex items-start relative size-full" data-node-id="550:670" data-name="CR-03 · Project page: Influencer · Paid · One-time">
      <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-r border-solid content-stretch flex flex-col gap-[2px] items-start overflow-clip pb-[16px] pt-[20px] px-[16px] relative self-stretch shrink-0 w-[260px]" data-node-id="550:671" data-name="Sidebar / Creator">
        <Logo className="content-stretch flex items-center overflow-clip relative rounded-[9.778px] shrink-0" />
        <div className="h-[16px] relative shrink-0 w-[10px]" data-node-id="I550:671;9:488" data-name="gap" />
        <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[10px] items-center overflow-clip p-[10px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[228px]" data-node-id="I550:671;9:489" data-name="Workspace switcher">
          <div className="bg-[var(--primary-default,#0d0d10)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[32px]" data-node-id="I550:671;9:489;9:61" data-name="Initials">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-on-primary,white)] whitespace-nowrap" data-node-id="I550:671;9:489;9:62">
              IR
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="I550:671;9:489;9:63" data-name="Text">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:489;9:64">
              Ishita Rao
            </p>
            <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I550:671;9:489;9:65">
              Creator · @ishitarao
            </p>
          </div>
          <div className="relative shrink-0 size-[16px]" data-node-id="I550:671;9:489;9:66" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} />
          </div>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I550:671;9:497" data-name="Section · MAIN">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I550:671;9:498">
            MAIN
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:499" data-name="Home">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:499;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} />
          </div>
          <a href="/creator" className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)] cursor-pointer" data-node-id="I550:671;9:499;9:11">
            Overview
          </a>
        </div>
        <div className="bg-[var(--primary-subtle,#f1f4ff)] content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:510" data-name="Find projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:510;9:18" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon2} />
          </div>
          <a href="/creator/projects" className="[word-break:break-word] block cursor-pointer flex-[1_0_0] font-['Inter:Semi_Bold'] font-semibold leading-[0] min-w-px not-italic relative text-[14px] text-[color:var(--primary-default,#0d0d10)]" data-node-id="I550:671;9:510;9:21">
            <p className="leading-[20px]">Project discovery</p>
          </a>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:521" data-name="My projects">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:521;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon3} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:521;9:11">
            My projects
          </p>
          <div className="relative shrink-0 size-[14px]" data-node-id="I550:671;9:521;9:14" data-name="Chevron">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevron} />
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:531" data-name="Invitations & offers">
          <div className="relative shrink-0 size-[4px]" data-node-id="I550:671;9:531;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I550:671;9:531;9:29">{`Invitations & offers`}</p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I550:671;9:531;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I550:671;9:531;9:31">
              4
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:538" data-name="Applied">
          <div className="relative shrink-0 size-[4px]" data-node-id="I550:671;9:538;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I550:671;9:538;9:29">
            Applied
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I550:671;9:538;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I550:671;9:538;9:31">
              3
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:545" data-name="Active">
          <div className="relative shrink-0 size-[4px]" data-node-id="I550:671;9:545;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I550:671;9:545;9:29">
            Live
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I550:671;9:545;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I550:671;9:545;9:31">
              2
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:552" data-name="Completed">
          <div className="relative shrink-0 size-[4px]" data-node-id="I550:671;9:552;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I550:671;9:552;9:29">
            Completed
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I550:671;9:552;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I550:671;9:552;9:31">
              7
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[32px] items-center overflow-clip pl-[40px] pr-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;778:13550" data-name="Declined">
          <div className="relative shrink-0 size-[4px]" data-node-id="I550:671;778:13550;9:28" data-name="Bullet">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBullet} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="I550:671;778:13550;9:29">
            Declined
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I550:671;778:13550;9:30" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I550:671;778:13550;9:31">
              3
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:559" data-name="Content">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:559;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon4} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:559;9:11">
            Content
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I550:671;9:559;9:12" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I550:671;9:559;9:13">
              2
            </p>
          </div>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I550:671;9:571" data-name="Section · CONTENT & DATA">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I550:671;9:572">{`CONTENT & DATA`}</p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:573" data-name="Performance">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:573;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon5} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:573;9:11">
            Performance
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:584" data-name="Earnings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:584;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon6} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:584;9:11">
            Earnings
          </p>
        </div>
        <div className="content-stretch flex items-start overflow-clip pb-[6px] pt-[16px] px-[12px] relative shrink-0" data-node-id="I550:671;9:596" data-name="Section · ACCOUNT">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] tracking-[0.72px] whitespace-nowrap" data-node-id="I550:671;9:597">
            ACCOUNT
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:609" data-name="Messages">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:609;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon7} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:609;9:11">
            Messages
          </p>
          <div className="bg-[var(--bg-muted,#edeff3)] content-stretch flex h-[18px] items-center overflow-clip px-[6px] relative rounded-[var(--radius-full,999px)] shrink-0" data-node-id="I550:671;9:609;9:12" data-name="Count">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="I550:671;9:609;9:13">
              1
            </p>
          </div>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:619" data-name="Settings">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:619;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon8} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:619;9:11">
            Settings
          </p>
        </div>
        <div className="h-[121px] relative shrink-0 w-px" data-node-id="I550:671;9:630" data-name="Spacer" />
        <div className="bg-[var(--border-default,#e3e5ec)] h-px relative shrink-0 w-[228px]" data-node-id="I550:671;9:631" data-name="Divider" />
        <div className="h-[8px] relative shrink-0 w-[10px]" data-node-id="I550:671;9:632" data-name="gap" />
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:633" data-name="Help Center">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:633;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon9} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:633;9:11">
            Help centre
          </p>
        </div>
        <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[228px]" data-node-id="I550:671;9:645" data-name="Logout">
          <div className="relative shrink-0 size-[18px]" data-node-id="I550:671;9:645;9:8" data-name="Icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon10} />
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[22px] min-w-px not-italic relative text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:671;9:645;9:11">
            Logout
          </p>
        </div>
      </div>
      <div className="bg-[var(--bg-page,white)] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative" data-node-id="550:811" data-name="Main">
        <div className="bg-[var(--bg-surface,white)] border-[var(--border-default,#e3e5ec)] border-b border-solid content-stretch flex gap-[12px] h-[64px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="550:812" data-name="Top bar">
          <div className="bg-[var(--bg-subtle,#f4f6fb)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex gap-[8px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[var(--radius-md,8px)] shrink-0 w-[380px]" data-node-id="I550:812;10:343" data-name="Search">
            <div className="relative shrink-0 size-[16px]" data-node-id="I550:812;10:344" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon11} />
            </div>
            <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I550:812;10:347">
              Search projects, creators, content…
            </p>
            <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip px-[6px] py-px relative rounded-[4px] shrink-0" data-node-id="I550:812;10:348" data-name="Kbd">
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)] whitespace-nowrap" data-node-id="I550:812;10:349">
                ⌘K
              </p>
            </div>
          </div>
          <div className="flex-[1_0_0] h-px min-w-px relative" data-node-id="I550:812;10:350" data-name="Spacer" />
          <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-md,8px)] shrink-0 size-[36px]" data-node-id="I550:812;72:2241" data-name="Notifications">
            <div className="relative shrink-0 size-[18px]" data-node-id="I550:812;72:2242" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon12} />
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="I550:812;10:355" data-name="Account">
            <div className="bg-[var(--primary-muted,#e3e9ff)] content-stretch flex items-center justify-center overflow-clip relative rounded-[var(--radius-full,999px)] shrink-0 size-[32px]" data-node-id="I550:812;10:356" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="I550:812;10:357">
                IR
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="I550:812;10:358" data-name="Name">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="I550:812;10:359">
                Ishita Rao
              </p>
              <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-tertiary,#a3a3ac)]" data-node-id="I550:812;10:360">
                Creator · @ishitarao
              </p>
            </div>
            <div className="relative shrink-0 size-[14px]" data-node-id="I550:812;10:361" data-name="Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon13} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip pb-[40px] pt-[28px] px-[32px] relative shrink-0 w-full" data-node-id="765:9904" data-name="Content">
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[6px] items-center leading-[16px] not-italic overflow-clip relative shrink-0 text-[12px] w-full" data-node-id="765:9905" data-name="Breadcrumb">
            <p className="relative shrink-0 text-[color:var(--text-secondary,#0d0d10)] whitespace-pre" data-node-id="765:9906">{`Project discovery  /  Minimalist  /`}</p>
            <p className="relative shrink-0 text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="765:9907">
              Monsoon Sunscreen
            </p>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="765:9908" data-name="Profile header">
            <div className="h-[180px] relative rounded-[8px] shrink-0 w-full" data-node-id="767:9612" data-name="Campaign banner">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgCampaignBanner} onError={(e) => { e.currentTarget.src = "/assets/creator/projects/monsoon-sunscreen.png"; }} />
            </div>
            <div className="content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="765:9909" data-name="Top">
              <div className="bg-[#3b5bff] content-stretch flex items-center justify-center overflow-clip relative rounded-[15px] shrink-0 size-[72px]" data-node-id="767:9613" data-name="Brand logo">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-white whitespace-nowrap" data-node-id="767:9614">
                  MI
                </p>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="765:9911" data-name="Identity">
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-node-id="765:9912" data-name="n">
                  <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[34px] not-italic relative shrink-0 text-[26px] text-[color:var(--text-primary,#0d0d10)] tracking-[-0.13px] whitespace-nowrap" data-node-id="765:9913">
                    Monsoon Sunscreen
                  </p>
                  <Badge className="bg-[var(--status-success-bg,#e1fce3)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Verified brand" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-secondary,#0d0d10)] whitespace-nowrap" data-node-id="765:9915">
                  Minimalist · Paid · 1–30 Nov 2026
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[22px] min-w-full not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] w-[min-content]" data-node-id="765:9916">
                  Minimalist’s new Mineral Sunscreen SPF 50: light, no white cast, works under make-up. Show it in a real monsoon routine.
                </p>
                <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0" data-node-id="765:9917" data-name="Niches">
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Skincare" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Sun care" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Monsoon" tone="Neutral" />
                  <Badge className="bg-[var(--status-neutral-bg,#f4f6fb)] content-stretch flex gap-[6px] items-center overflow-clip px-[8px] py-[2px] relative rounded-[var(--radius-full,999px)] shrink-0" label="Instagram" tone="Neutral" />
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="765:9922" data-name="Actions">
                <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex items-start overflow-clip p-[10px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="765:9923" data-name="Save">
                  <div className="relative shrink-0 size-[18px]" data-node-id="765:9924" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon14} />
                  </div>
                </div>
                <a className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="765:9925" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I765:9925;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon15} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I765:9925;5:33">
                    Message brand
                  </p>
                </a>
                <button
                  type="button"
                  onClick={() => setIsCounterOfferOpen(true)}
                  className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0 hover:bg-[#f9fafb] transition"
                  data-node-id="766:9756"
                  data-name="Button"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="I766:9756;5:30" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon16} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] text-left whitespace-nowrap" data-node-id="I766:9756;5:33">
                    Counter offer
                  </p>
                </button>
                <a className="bg-[var(--prim-gray-900,#0d0d10)] content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center justify-center overflow-clip px-[16px] relative rounded-[var(--radius-md,8px)] shrink-0" data-node-id="765:9926" data-name="Button">
                  <div className="relative shrink-0 size-[16px]" data-node-id="I765:9926;5:6" data-name="Icon">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon17} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-on-primary,white)] text-left whitespace-nowrap" data-node-id="I765:9926;5:9">
                    Apply
                  </p>
                </a>
              </div>
            </div>
            <div className="bg-[var(--bg-subtle,#f4f6fb)] content-stretch flex gap-[10px] items-center overflow-clip px-[14px] py-[10px] relative rounded-[10px] shrink-0 w-full" data-node-id="765:9927" data-name="Application context">
              <div className="relative shrink-0 size-[16px]" data-node-id="765:9928" data-name="Icon">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon18} />
              </div>
              <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px not-italic relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9929">
                Apply by 2 Nov · 5 days left · you meet all 5 requirements · 96% match
              </p>
              <a href="/creator/projects" className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[13px] text-[color:var(--primary-default,#0d0d10)] whitespace-nowrap" data-node-id="765:9930">
                <p className="leading-[20px]">Back to discovery</p>
              </a>
            </div>
          </div>
          <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start not-italic overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="770:9604" data-name="Campaign setup">
            <div className="bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="770:9605" data-name="Card head">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="770:9606">
                Project setup
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="770:9607">
                Set by Minimalist when creating this project
              </p>
            </div>
            <div className="bg-white content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="770:9608" data-name="Cells">
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="770:9613" data-name="Cell · Type">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="770:9614">
                  Type
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="770:9615">
                  Influencer marketing
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="770:9616">
                  Posted on your own page
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="770:9617" data-name="Cell · Partnership">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="770:9618">
                  Partnership
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="770:9619">
                  Paid
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="770:9620">
                  Fee range ₹15,000–₹20,000
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="770:9621" data-name="Cell · Duration">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="770:9622">
                  Duration
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="770:9623">
                  One-time
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="770:9624">
                  1–30 Nov 2026
                </p>
              </div>
              <div className="bg-[#f3f5f7] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px overflow-clip px-[14px] py-[12px] relative rounded-[8px] self-stretch" data-node-id="770:9625" data-name="Cell · Platforms">
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="770:9626">
                  Platforms
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#070b13] text-[14px] w-full" data-node-id="770:9627">
                  Instagram
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[#4b5563] text-[13px] w-full" data-node-id="770:9628">
                  English, Hindi
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="765:9957" data-name="What you would post">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="765:9958" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="765:9959" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9960">
                  What you would post
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:9961">
                  Each post has its own deadline · Instagram
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="765:9962" data-name="Platform cards">
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="765:9963" data-name="Platform · Instagram">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="765:9964" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="765:9965" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="765:9966" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9967">
                      Reel · monsoon routine
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="765:9968">
                      30–60 s · with code + link
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:9969" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:9970">
                    Goes live by
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9971">
                    12 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:9972" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:9973">
                    Length
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9974">
                    30–60 s
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:9975" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:9976">
                    Tracking
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9977">
                    code + link
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="765:9978" data-name="Platform · YouTube">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="765:9979" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="765:9980" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="765:9981" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9982">
                      Story · unboxing
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="765:9983">
                      3 frames · link sticker
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:9984" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:9985">
                    Goes live by
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9986">
                    6 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:9987" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:9988">
                    Frames
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9989">
                    3
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:9990" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:9991">
                    Link sticker
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9992">
                    Yes
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="765:9993" data-name="Platform · Pinterest">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="765:9994" data-name="h">
                  <div className="relative shrink-0 size-[18px]" data-node-id="765:9995" data-name="Platform logo">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlatformLogo} />
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="765:9996" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:9997">
                      Story · 1 week later
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="765:9998">
                      3 frames · link sticker
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:9999" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10000">
                    Goes live by
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10001">
                    19 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10002" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10003">
                    Frames
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10004">
                    3
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10005" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10006">
                    Link sticker
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10007">
                    Yes
                  </p>
                </div>
              </div>
              <div className="border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[10px] h-[158px] items-start min-w-px overflow-clip p-[14px] relative rounded-[var(--radius-md,8px)]" data-node-id="765:10008" data-name="Platform · Snapchat">
                <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="765:10009" data-name="h">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="765:10011" data-name="t">
                    <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10012">
                      Product
                    </p>
                    <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--status-success-fg,#16a34a)]" data-node-id="765:10013">
                      Yours to keep
                    </p>
                  </div>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10014" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10015">
                    Sunscreen
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10016">
                    SPF 50
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10017" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10018">
                    Ships by
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10019">
                    3 Nov
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal items-center justify-between not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10020" data-name="r">
                  <p className="leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10021">
                    Worth
                  </p>
                  <p className="leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10022">
                    ₹1,450
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="770:9629" data-name="Row · Fit">
            <div className="bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px] self-stretch" data-node-id="770:9630" data-name="Who can apply">
              <div className="[word-break:break-word] bg-white content-stretch flex flex-col gap-[2px] items-start leading-[20px] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="770:9631" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px]" data-node-id="770:9632">
                  Who can apply
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px]" data-node-id="770:9633">
                  Minimalist’s requirements · checked against your connected Instagram
                </p>
              </div>
              <div className="[word-break:break-word] bg-white content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[12px] items-start leading-[16px] not-italic overflow-clip relative shrink-0 text-[#8491a3] text-[12px] w-full" data-node-id="770:9634" data-name="Head row">
                <p className="relative shrink-0 w-[150px]" data-node-id="770:9635">
                  Requirement
                </p>
                <p className="relative shrink-0 w-[230px]" data-node-id="770:9636">
                  Minimalist wants
                </p>
                <p className="flex-[1_0_0] min-w-px relative" data-node-id="770:9637">
                  You
                </p>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="770:9638" data-name="Req · Followers">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="770:9639">
                  Followers
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="770:9640">
                  10K – 5 L
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="770:9641" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="770:9642" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="770:9644">
                    1.12 L
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="770:9645" data-name="Req · Min. engagement">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="770:9646">
                  Min. engagement
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="770:9647">
                  3.0%
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="770:9648" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="770:9649" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="770:9651">
                    4.8%
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="770:9652" data-name="Req · Niche">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="770:9653">
                  Niche
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="770:9654">
                  Beauty, Skincare
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="770:9655" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="770:9656" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="770:9658">
                    Skincare, beauty
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="770:9659" data-name="Req · Audience">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="770:9660">
                  Audience
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="770:9661">
                  Mostly women · 18–34 · India metros
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="770:9662" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="770:9663" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="770:9665">
                    84% women · 91% aged 18–34
                  </p>
                </div>
              </div>
              <div className="bg-white border-[#eef0f3] border-solid border-t content-stretch flex gap-[12px] items-center overflow-clip pt-[10px] relative shrink-0 w-full" data-node-id="770:9666" data-name="Req · Language">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[150px]" data-node-id="770:9667">
                  Language
                </p>
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] w-[230px]" data-node-id="770:9668">
                  English, Hindi
                </p>
                <div className="bg-white content-stretch flex flex-[1_0_0] gap-[6px] items-center min-w-px overflow-clip relative" data-node-id="770:9669" data-name="You">
                  <div className="relative shrink-0 size-[16px]" data-node-id="770:9670" data-name="Icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconCheck} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#070b13] text-[13px] whitespace-nowrap" data-node-id="770:9672">
                    English, Hindi, Tamil
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[#149d46] text-[13px] whitespace-nowrap" data-node-id="770:9673">
                You meet all 5 · you can apply
              </p>
            </div>
            <div className="[word-break:break-word] bg-white border border-[#e5e7eb] border-solid content-stretch flex flex-col gap-[16px] items-start leading-[20px] not-italic overflow-clip p-[20px] relative rounded-[12px] self-stretch shrink-0 w-[360px]" data-node-id="770:9674" data-name="How you’re measured">
              <div className="bg-white content-stretch flex flex-col gap-[2px] items-start overflow-clip relative shrink-0" data-node-id="770:9675" data-name="Card head">
                <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#070b13] text-[14px] whitespace-nowrap" data-node-id="770:9676">
                  How it’s tracked
                </p>
                <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#8491a3] text-[13px] w-[320px]" data-node-id="770:9677">
                  Instagram stats from your connected account
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="770:9678" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="770:9679">
                  Tracked with
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="770:9680">
                  Coupon code + tracking link
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="770:9681" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="770:9682">
                  Also read
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="770:9683">
                  Views and engagement from your connected Instagram
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="770:9684" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="770:9685">
                  Project ends
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="770:9686">
                  7 Nov 2026 · usage rights until 7 Dec
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="770:9687" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="770:9688">
                  Your code
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="770:9689">
                  ISHITA15 · set at invite
                </p>
              </div>
              <div className="bg-white content-stretch flex font-['Inter:Regular'] font-normal gap-[8px] items-start overflow-clip relative shrink-0 text-[13px] w-full" data-node-id="770:9690" data-name="r">
                <p className="relative shrink-0 text-[#8491a3] w-[110px]" data-node-id="770:9691">
                  Sales read from
                </p>
                <p className="flex-[1_0_0] min-w-px relative text-[#070b13] text-right" data-node-id="770:9692">
                  Minimalist’s Shopify · orders with your code or link
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#4b5563] text-[13px] w-[320px]" data-node-id="770:9693">
                Keep your account connected, views and engagement update every 2 hours.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="765:10023" data-name="Row">
            <div className="bg-[var(--bg-surface,white)] border border-[#e5e7eb] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip p-[20px] relative rounded-[12px]" data-node-id="766:9681" data-name="Brief">
              <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-full" data-node-id="766:9682" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="766:9683" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[24px] relative shrink-0 text-[16px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="766:9684">
                    Brief
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="766:9685">
                    What Minimalist wants · read before you apply
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full" data-node-id="766:9686" data-name="r">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="766:9687" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="766:9688">
                    Do
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="766:9689" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="766:9690" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="766:9691">
                      Show it on bare skin and over make-up
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="766:9692" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="766:9693" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="766:9694">
                      Mention SPF 50 and no white cast
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="766:9695" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="766:9696" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon19} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="766:9697">
                      Use code ISHITA15 and your link
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[10px] items-start min-w-px overflow-clip relative" data-node-id="766:9698" data-name="c">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="766:9699">
                    Don’t
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="766:9700" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="766:9701" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="766:9702">
                      Compare with other brands by name
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="766:9703" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="766:9704" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="766:9705">
                      Make medical claims
                    </p>
                  </div>
                  <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full" data-node-id="766:9706" data-name="r">
                    <div className="relative shrink-0 size-[16px]" data-node-id="766:9707" data-name="Icon">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon20} />
                    </div>
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[20px] not-italic relative shrink-0 text-[13px] text-[color:var(--text-body,#0d0d10)] whitespace-nowrap" data-node-id="766:9708">
                      Post before Minimalist approves
                    </p>
                  </div>
                </div>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="766:9740" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="766:9741">
                  Usage rights
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="766:9742">
                  Organic reposts on Minimalist’s Instagram for 60 days
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="766:9746" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="766:9747">
                  Product
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="766:9748">
                  Shipped by 3 Nov · yours to keep
                </p>
              </div>
              <div className="[word-break:break-word] border-[var(--border-subtle,#edeff3)] border-solid border-t content-stretch flex gap-[10px] items-start not-italic overflow-clip py-[9px] relative shrink-0 w-full" data-node-id="766:9749" data-name="kv">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="766:9750">
                  Payment
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)] whitespace-nowrap" data-node-id="766:9751">
                  Held in escrow once you are accepted, released when Minimalist approves
                </p>
              </div>
            </div>
            <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[10px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-[420px]" data-node-id="765:10207" data-name="Fee and terms">
              <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="765:10208" data-name="Card head">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="765:10209" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10210">
                    Fee and terms
                  </p>
                  <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10211">
                    Minimalist set a fee range · you pick your fee inside it
                  </p>
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="765:10212" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="765:10214">
                  Fee range
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="765:10215">
                  ₹15,000 – ₹20,000
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="765:10216" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="765:10218">
                  Covers
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="765:10219">
                  all 3 posts
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="765:10220" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="765:10222">
                  Paid into escrow
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="765:10223">
                  when Minimalist accepts you
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="765:10224" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="765:10226">
                  Released
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="765:10227">
                  on approval of each post
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 text-[color:var(--text-primary,#0d0d10)] w-full" data-node-id="1678:1259" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px]" data-node-id="1678:1261">
                  Your fee (example)
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] whitespace-nowrap" data-node-id="1678:1262">
                  ₹18,000 for all 3 posts
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1263" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1265">{`Platform & service fee · Kreyio`}</p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#db231f] text-[14px] whitespace-nowrap" data-node-id="1678:1266">
                  − ₹1,800
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1267" data-name="r">
                <p className="flex-[1_0_0] font-['Inter:Regular'] font-normal leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1269">
                  GST on the service fee
                </p>
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[#db231f] text-[14px] whitespace-nowrap" data-node-id="1678:1270">
                  − ₹324
                </p>
              </div>
              <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold gap-[8px] items-center not-italic overflow-clip relative shrink-0 w-full" data-node-id="1678:1271" data-name="r">
                <p className="flex-[1_0_0] leading-[20px] min-w-px relative text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="1678:1273">
                  You receive
                </p>
                <p className="leading-[22px] relative shrink-0 text-[#149d46] text-[14px] whitespace-nowrap" data-node-id="1678:1274">
                  ₹15,876
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg-surface,white)] border border-[var(--border-default,#e3e5ec)] border-solid content-stretch flex flex-col gap-[8px] items-start overflow-clip p-[20px] relative rounded-[var(--radius-lg,12px)] shrink-0 w-full" data-node-id="765:10177" data-name="Key dates">
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="765:10178" data-name="Card head">
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="765:10179" data-name="t">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[20px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10180">
                  Key dates
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10181">
                  Project runs 1–30 Nov 2026 · each post has its own deadline
                </p>
              </div>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10182" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="765:10183" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10184">
                  Apply by
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10185">
                  Minimalist picks creators by 3 Nov
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10186">
                2 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10187" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="765:10188" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10189">
                  Product ships
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10190">
                  SPF 50 · tracked delivery
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10191">
                by 3 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10192" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="765:10193" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10194">
                  Story · unboxing goes live
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10195">
                  Send for approval 2 days before
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10196">
                6 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10197" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="765:10198" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10199">
                  Reel · monsoon routine goes live
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10200">
                  Send for approval by 9 Nov
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10201">
                12 Nov
              </p>
            </div>
            <div className="[word-break:break-word] border-[var(--border-default,#e3e5ec)] border-solid border-t content-stretch flex gap-[8px] items-center not-italic overflow-clip py-[10px] relative shrink-0 w-full whitespace-nowrap" data-node-id="765:10202" data-name="row">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px overflow-clip relative" data-node-id="765:10203" data-name="l">
                <p className="font-['Inter:Medium'] font-medium leading-[22px] relative shrink-0 text-[14px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10204">
                  Story · 1 week later goes live
                </p>
                <p className="font-['Inter:Regular'] font-normal leading-[16px] relative shrink-0 text-[12px] text-[color:var(--text-secondary,#0d0d10)]" data-node-id="765:10205">
                  Last post · project ends 30 Nov
                </p>
              </div>
              <p className="font-['Inter:Regular'] font-normal leading-[20px] relative shrink-0 text-[13px] text-[color:var(--text-primary,#0d0d10)]" data-node-id="765:10206">
                19 Nov
              </p>
            </div>
          </div>
        </div>
      </div>
      <CounterOfferModal
        isOpen={isCounterOfferOpen}
        onClose={() => setIsCounterOfferOpen(false)}
        brandName="Minimalist"
        rangeText="Minimalist's range is ₹15,000 – ₹20,000 for 3 posts"
        postsText="all 3 posts"
        initialFee={24000}
        quickPicks={[22000, 25000]}
        maxRange={20000}
        defaultNote="My Minimalist Reels averaged 2.8 L views and drove 392 orders in Vitamin-C Serum."
      />
    </div>
  );
}

export { Cr03ProjectPageInfluencerPaidOneTime };
