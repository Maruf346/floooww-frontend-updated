import { Link } from "react-router-dom";
import { cn } from "@/common/utils/cn";
import { ROUTES } from "@/common/constants/routes";
import {
  CREATORS_COPY,
  type CreatorItem,
  type CampaignItem,
  type RunwayItem,
} from "@/landing/data/creators";

export function profileLink(creator: CreatorItem) {
  return `${ROUTES.signup}?${new URLSearchParams({ role: "brand", q: creator.name }).toString()}`;
}

const SHADOW = "shadow-[0_24px_48px_-8px_rgba(8,13,26,0.1)]";

/** 860 × 420 runway profile (Figma "Profile · Aditi Sharma", "Profile · Meera Iyer", "Profile · Tanya Bhatia"). */
export function FeatureCard({
  creator,
  interactive = true,
}: {
  creator: CreatorItem;
  interactive?: boolean;
}) {
  const dark = creator.theme === "dark";
  const white = creator.theme === "white";

  return (
    <div
      className={cn(
        "relative h-[420px] w-[860px] overflow-hidden rounded-[44px]",
        SHADOW,
        dark
          ? "bg-[#0d0d10] text-white"
          : white
            ? "border border-[#ededf3] bg-white text-ink"
            : "bg-[#f5f5f7] text-ink",
      )}
    >
      {/* CREATOR label */}
      <div className="absolute left-11 top-10">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 font-inter-semibold text-[11px] font-semibold tracking-[1px] uppercase leading-none",
            dark ? "bg-white/12 text-white" : "bg-white text-ink shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
          )}
        >
          CREATOR
        </span>
      </div>

      {/* Name */}
      <p
        className={cn(
          "absolute left-11 top-[78px] font-inter-extrabold text-[30px] font-extrabold leading-normal tracking-[-0.3px] whitespace-nowrap",
          dark ? "text-white" : "text-ink",
        )}
      >
        {creator.displayName}
      </p>

      {/* Niche & Handle */}
      <p
        className={cn(
          "absolute left-11 top-[120px] font-inter-regular text-[15px] leading-normal whitespace-nowrap",
          dark ? "text-white/80" : "text-neutral",
        )}
      >
        {creator.handle}
      </p>

      {/* Smaller Bio */}
      <p
        className={cn(
          "absolute left-11 top-[158px] w-[400px] font-inter-medium text-[24px] font-medium leading-[32px] tracking-[-0.35px]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {creator.bio}
      </p>

      {/* Tags */}
      <div className="absolute left-11 top-[263px] flex flex-wrap items-center gap-2">
        {creator.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "rounded-full px-3.5 py-1 text-[13px] font-inter-medium font-medium leading-normal whitespace-nowrap",
              dark ? "bg-white/12 text-white" : "bg-[#edf2fc] text-ink",
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Pill button 'View full profile' */}
      <div className="absolute left-11 top-[336px]">
        <Link
          to={profileLink(creator)}
          tabIndex={interactive ? 0 : -1}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-inter-semibold text-[15px] font-semibold leading-normal whitespace-nowrap transition-[background-color,transform] duration-300",
            dark
              ? "bg-white text-ink hover:bg-white/90"
              : "bg-[#0d0d10] text-white hover:bg-[#27272a]",
          )}
        >
          <span>{CREATORS_COPY.viewProfile}</span>
          <span className="text-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1">
            ›
          </span>
        </Link>
      </div>

      {/* Photo Panel */}
      <div className="absolute left-[480px] top-5 h-[380px] w-[360px] overflow-hidden rounded-[32px]">
        <img
          src={creator.photo}
          alt={creator.name}
          className="absolute inset-0 size-full max-w-none rounded-[32px] object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,10,20,0)] from-45% to-[rgba(8,10,20,0.75)]" />
        <span className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1.5 font-inter-semibold text-[13px] font-semibold leading-normal text-ink shadow-sm whitespace-nowrap">
          {creator.fit}
        </span>
        <div className="absolute bottom-[26px] left-[26px] flex gap-[60px] leading-normal text-white whitespace-nowrap">
          <div className="flex flex-col gap-0.5">
            <p className="font-inter-bold text-[36px] font-bold tracking-[-1px]">
              {creator.followers}
            </p>
            <p className="font-inter-medium text-[14px] font-medium text-white/90">followers</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-inter-bold text-[36px] font-bold tracking-[-1px]">
              {creator.engagement}
            </p>
            <p className="font-inter-medium text-[14px] font-medium text-white/90">engagement</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 645 × 315 wide campaign card (Figma "Campaign · Vitamin-C Serum", "Campaign · Velvet Matte Launch", etc.). */
export function CampaignCard({
  campaign,
  interactive = true,
}: {
  campaign: CampaignItem;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative h-[315px] w-[645px] overflow-hidden rounded-[33px] border border-[#e1e5ef] bg-white text-ink",
        SHADOW,
      )}
    >
      {/* BRAND CAMPAIGN label */}
      <div className="absolute left-[33px] top-[30px]">
        <span className="inline-flex items-center rounded-full bg-[#0d0d10] px-2.5 py-0.5 font-inter-semibold text-[8.5px] font-semibold tracking-wider text-white uppercase leading-none">
          BRAND CAMPAIGN
        </span>
      </div>

      {/* Campaign Name */}
      <p className="absolute left-[33px] top-[59px] font-inter-extrabold text-[22px] font-extrabold tracking-[-0.2px] text-ink uppercase leading-none whitespace-nowrap">
        {campaign.name}
      </p>

      {/* Brand & Apply-by Date */}
      <p className="absolute left-[33px] top-[90px] font-inter-regular text-[11.5px] text-neutral leading-none whitespace-nowrap">
        {campaign.brandMeta}
      </p>

      {/* One-line Brief */}
      <p className="absolute left-[33px] top-[119px] w-[300px] font-inter-medium text-[18px] font-medium leading-[24px] text-ink">
        {campaign.brief}
      </p>

      {/* Tags */}
      <div className="absolute left-[33px] top-[176px] flex flex-wrap items-center gap-1.5">
        {campaign.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#edf2fc] px-2.5 py-0.5 text-[10px] font-inter-medium font-medium text-ink leading-normal whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Pill button 'Apply now' */}
      <div className="absolute left-[33px] top-[252px]">
        <Link
          to={`${ROUTES.signup}?role=creator`}
          tabIndex={interactive ? 0 : -1}
          className="group inline-flex items-center gap-1.5 rounded-full bg-[#0d0d10] px-4 py-1.5 font-inter-semibold text-[12px] font-semibold text-white whitespace-nowrap transition-colors duration-300 hover:bg-[#27272a]"
        >
          <span>{CREATORS_COPY.applyNow}</span>
          <span className="text-[14px] transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            ›
          </span>
        </Link>
      </div>

      {/* Product photo panel */}
      <div className="absolute left-[360px] top-[15px] h-[285px] w-[270px] overflow-hidden rounded-[24px]">
        <img
          src={campaign.photo}
          alt={campaign.name}
          className="absolute inset-0 size-full max-w-none rounded-[24px] object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,10,20,0)] from-45% to-[rgba(8,10,20,0.75)]" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/92 px-2.5 py-1 font-inter-semibold text-[10px] font-semibold text-ink shadow-sm whitespace-nowrap">
          {campaign.fit}
        </span>
        <div className="absolute bottom-5 left-5 flex gap-8 leading-normal text-white whitespace-nowrap">
          <div className="flex flex-col gap-0.5">
            <p className="font-inter-bold text-[26px] font-bold tracking-tight">{campaign.fee}</p>
            <p className="font-inter-medium text-[10.5px] font-medium text-white/90">fee</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-inter-bold text-[26px] font-bold tracking-tight">{campaign.posts}</p>
            <p className="font-inter-medium text-[10.5px] font-medium text-white/90">to deliver</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RunwayCard({ item, interactive }: { item: RunwayItem; interactive?: boolean }) {
  return item.kind === "creator" ? (
    <FeatureCard creator={item} interactive={interactive} />
  ) : (
    <CampaignCard campaign={item} interactive={interactive} />
  );
}

/** Responsive creator card for grid view and mobile. */
export function CompactCreatorCard({ creator }: { creator: CreatorItem }) {
  const dark = creator.theme === "dark";
  const white = creator.theme === "white";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[32px] p-4 transition-transform duration-300 hover:-translate-y-1",
        SHADOW,
        dark
          ? "bg-[#0d0d10] text-white"
          : white
            ? "border border-[#ededf3] bg-white text-ink"
            : "bg-[#f5f5f7] text-ink",
      )}
    >
      <div className="relative aspect-[360/320] w-full overflow-hidden rounded-[24px]">
        <img
          src={creator.photo}
          alt={creator.name}
          className="absolute inset-0 size-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-[rgba(8,10,20,0.75)]" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/92 px-2.5 py-1 font-inter-semibold text-[11px] font-semibold text-ink shadow-sm">
          {creator.fit}
        </span>
        <div className="absolute bottom-3.5 left-3.5 flex gap-6 text-white">
          <div>
            <p className="font-inter-bold text-[24px] font-bold">{creator.followers}</p>
            <p className="font-inter-medium text-[11px] text-white/80">followers</p>
          </div>
          <div>
            <p className="font-inter-bold text-[24px] font-bold">{creator.engagement}</p>
            <p className="font-inter-medium text-[11px] text-white/80">engagement</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 font-inter-semibold text-[10px] font-semibold uppercase tracking-wider",
              dark ? "bg-white/12 text-white" : "bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
            )}
          >
            CREATOR
          </span>
          <span className={cn("text-[12px]", dark ? "text-white/70" : "text-neutral")}>
            {creator.handle}
          </span>
        </div>

        <p className={cn("mt-2 font-inter-bold text-[20px] font-bold", dark ? "text-white" : "text-ink")}>
          {creator.displayName}
        </p>

        <p className={cn("mt-2 font-inter-medium text-[15px] font-medium leading-[22px]", dark ? "text-white/90" : "text-ink")}>
          {creator.bio}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {creator.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-inter-medium font-medium",
                dark ? "bg-white/10 text-white" : "bg-[#edf2fc] text-ink",
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <Link
            to={profileLink(creator)}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-inter-semibold text-[13px] font-semibold transition-colors duration-300",
              dark
                ? "bg-white text-ink hover:bg-white/90"
                : "bg-[#0d0d10] text-white hover:bg-[#27272a]",
            )}
          >
            <span>{CREATORS_COPY.viewProfile}</span>
            <span className="text-[16px] transition-transform duration-300 group-hover:translate-x-0.5">
              ›
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Responsive campaign card for grid view and mobile. */
export function CompactCampaignCard({ campaign }: { campaign: CampaignItem }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[32px] border border-[#e1e5ef] bg-white p-4 text-ink transition-transform duration-300 hover:-translate-y-1",
        SHADOW,
      )}
    >
      <div className="relative aspect-[360/320] w-full overflow-hidden rounded-[24px]">
        <img
          src={campaign.photo}
          alt={campaign.name}
          className="absolute inset-0 size-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-[rgba(8,10,20,0.75)]" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white/92 px-2.5 py-1 font-inter-semibold text-[11px] font-semibold text-ink shadow-sm">
          {campaign.fit}
        </span>
        <div className="absolute bottom-3.5 left-3.5 flex gap-6 text-white">
          <div>
            <p className="font-inter-bold text-[22px] font-bold">{campaign.fee}</p>
            <p className="font-inter-medium text-[11px] text-white/80">fee</p>
          </div>
          <div>
            <p className="font-inter-bold text-[22px] font-bold">{campaign.posts}</p>
            <p className="font-inter-medium text-[11px] text-white/80">to deliver</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#0d0d10] px-2.5 py-0.5 font-inter-semibold text-[9px] font-semibold uppercase tracking-wider text-white">
            BRAND CAMPAIGN
          </span>
          <span className="text-[11.5px] text-neutral">{campaign.brandMeta}</span>
        </div>

        <p className="mt-2 font-inter-bold text-[18px] font-bold uppercase tracking-tight text-ink">
          {campaign.name}
        </p>

        <p className="mt-2 font-inter-medium text-[14px] font-medium leading-[20px] text-ink">
          {campaign.brief}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {campaign.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#edf2fc] px-2.5 py-0.5 text-[10px] font-inter-medium font-medium text-ink"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <Link
            to={`${ROUTES.signup}?role=creator`}
            className="group inline-flex items-center gap-1.5 rounded-full bg-[#0d0d10] px-4 py-2 font-inter-semibold text-[12px] font-semibold text-white transition-colors duration-300 hover:bg-[#27272a]"
          >
            <span>{CREATORS_COPY.applyNow}</span>
            <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-0.5">
              ›
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CompactCard({ item }: { item: RunwayItem }) {
  return item.kind === "creator" ? (
    <CompactCreatorCard creator={item} />
  ) : (
    <CompactCampaignCard campaign={item} />
  );
}
