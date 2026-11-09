import { Link } from "react-router-dom";
import { cn } from "@/common/utils/cn";
import { ROUTES } from "@/common/constants/routes";
import {
  CREATORS_COPY,
  type Creator,
  type FeatureCreator,
  type QuoteCreator,
} from "@/landing/data/creators";

export function profileLink(creator: Creator) {
  return `${ROUTES.signup}?${new URLSearchParams({ role: "brand", q: creator.name }).toString()}`;
}

const SHADOW = "shadow-[0_24px_48px_-8px_rgba(8,13,26,0.1)]";

const FEATURE_THEME: Record<
  FeatureCreator["theme"],
  { card: string; title: string; meta: string; blurb: string; link: string }
> = {
  blue: {
    card: "bg-primary-muted",
    title: "text-ink",
    meta: "text-neutral",
    blurb: "text-ink",
    link: "text-primary",
  },
  gradient: {
    card: "bg-gradient-to-r from-primary to-primary-soft",
    title: "text-white",
    meta: "text-white opacity-80",
    blurb: "text-white",
    link: "text-white",
  },
  white: {
    card: "border border-line-subtle bg-white",
    title: "text-ink",
    meta: "text-neutral",
    blurb: "text-ink",
    link: "text-primary",
  },
};

function PhotoPanel({ creator, className }: { creator: FeatureCreator; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[32px]", className)}>
      <img
        src={creator.photo}
        alt={creator.name}
        className="absolute inset-0 size-full max-w-none rounded-[32px] object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,10,20,0)] from-45% to-[rgba(8,10,20,0.75)]" />
      <div className="absolute bottom-[26px] left-[26px] flex gap-[60px] leading-normal text-white whitespace-nowrap">
        <div className="flex flex-col gap-0.5">
          <p className="font-inter-bold text-[36px] font-bold tracking-[-1.08px]">
            {creator.followers}
          </p>
          <p className="font-inter-medium text-[14px] font-medium">followers</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-inter-bold text-[36px] font-bold tracking-[-1.08px]">
            {creator.engagement}
          </p>
          <p className="font-inter-medium text-[14px] font-medium">engagement</p>
        </div>
      </div>
      <span className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1.5 font-inter-semibold text-[13px] font-semibold leading-normal text-ink whitespace-nowrap">
        {creator.fit}
      </span>
    </div>
  );
}

function ViewProfile({
  creator,
  className,
  interactive,
}: {
  creator: Creator;
  className?: string;
  interactive: boolean;
}) {
  return (
    <Link
      to={profileLink(creator)}
      tabIndex={interactive ? 0 : -1}
      className={cn(
        "group inline-flex items-center gap-2 font-inter-semibold font-semibold leading-normal whitespace-nowrap",
        className,
      )}
    >
      <span className="text-[16px]">{CREATORS_COPY.viewProfile}</span>
      <span className="text-[20px] transition-transform duration-300 ease-out group-hover:translate-x-1">
        ›
      </span>
    </Link>
  );
}

/** 860 × 420 runway profile (Figma "Profile · Aditi Sharma"). */
export function FeatureCard({
  creator,
  interactive = true,
}: {
  creator: FeatureCreator;
  interactive?: boolean;
}) {
  const theme = FEATURE_THEME[creator.theme];
  return (
    <div
      className={cn(
        "relative h-[420px] w-[860px] overflow-hidden rounded-[44px]",
        SHADOW,
        theme.card,
      )}
    >
      <p
        className={cn(
          "absolute left-11 top-11 font-inter-extrabold text-[30px] font-extrabold leading-normal tracking-[-0.3px] whitespace-nowrap",
          theme.title,
        )}
      >
        {creator.displayName}
      </p>
      <p
        className={cn(
          "absolute left-11 top-[88px] text-[15px] leading-normal whitespace-nowrap",
          theme.meta,
        )}
      >
        {creator.handle}
      </p>
      <p
        className={cn(
          "absolute left-11 top-[136px] w-[400px] font-inter-medium text-[30px] font-medium leading-[38px] tracking-[-0.45px]",
          theme.blurb,
        )}
      >
        {creator.blurb}
      </p>
      <ViewProfile
        creator={creator}
        interactive={interactive}
        className={cn("absolute left-11 top-[352px]", theme.link)}
      />
      <PhotoPanel creator={creator} className="absolute left-[480px] top-5 h-[380px] w-[360px]" />
    </div>
  );
}

/** 440 × 400 runway quote card (Figma "Profile · Riya Kapoor"). */
export function QuoteCard({
  creator,
  interactive = true,
}: {
  creator: QuoteCreator;
  interactive?: boolean;
}) {
  const blue = creator.theme === "blue";
  return (
    <Link
      to={profileLink(creator)}
      tabIndex={interactive ? 0 : -1}
      aria-label={`${creator.name}, view profile`}
      className={cn(
        "relative block h-[400px] w-[440px] overflow-hidden rounded-[44px]",
        SHADOW,
        blue ? "bg-primary-muted" : "border border-line-subtle bg-white",
      )}
    >
      <p className="absolute left-10 top-11 w-[360px] font-inter-medium text-[25px] font-medium leading-[33px] tracking-[-0.375px] text-ink">
        {creator.quote}
      </p>
      <div className="absolute left-10 top-64 flex items-center gap-2 text-[13px] leading-normal whitespace-nowrap">
        {[
          [creator.followers, "followers"],
          [creator.engagement, "engagement"],
        ].map(([value, label]) => (
          <span
            key={label}
            className={cn(
              "flex items-center gap-[5px] rounded-full px-3 py-1.5",
              blue ? "bg-white" : "bg-subtle",
            )}
          >
            <span className="font-inter-bold font-bold text-ink">{value}</span>
            <span className="text-neutral">{label}</span>
          </span>
        ))}
      </div>
      <div className="absolute left-10 top-[304px] flex items-center gap-3.5">
        <img
          src={creator.avatar}
          alt=""
          width={56}
          height={56}
          className="block size-14 shrink-0 max-w-none"
        />
        <div className="flex flex-col gap-0.5 leading-normal whitespace-nowrap">
          <p className="font-inter-semibold text-[16px] font-semibold text-ink">{creator.name}</p>
          <p className="text-[13px] text-neutral">{creator.byline}</p>
        </div>
      </div>
    </Link>
  );
}

export function RunwayCard({ creator, interactive }: { creator: Creator; interactive?: boolean }) {
  return creator.layout === "feature" ? (
    <FeatureCard creator={creator} interactive={interactive} />
  ) : (
    <QuoteCard creator={creator} interactive={interactive} />
  );
}

/** Responsive card for grid view and small screens: same content, fluid layout. */
export function CompactCreatorCard({ creator }: { creator: Creator }) {
  if (creator.layout === "feature") {
    const theme = FEATURE_THEME[creator.theme];
    return (
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-[32px] p-3",
          SHADOW,
          theme.card,
        )}
      >
        <PhotoPanel creator={creator} className="aspect-[360/380] w-full rounded-[24px]" />
        <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
          <p
            className={cn(
              "font-inter-extrabold text-[22px] font-extrabold leading-normal tracking-[-0.22px]",
              theme.title,
            )}
          >
            {creator.displayName}
          </p>
          <p className={cn("mt-1 text-[14px] leading-normal", theme.meta)}>{creator.handle}</p>
          <p
            className={cn(
              "mt-4 font-inter-medium text-[19px] font-medium leading-[26px] tracking-[-0.2px]",
              theme.blurb,
            )}
          >
            {creator.blurb}
          </p>
          <div className="mt-auto pt-6">
            <ViewProfile creator={creator} interactive className={theme.link} />
          </div>
        </div>
      </div>
    );
  }
  const blue = creator.theme === "blue";
  return (
    <Link
      to={profileLink(creator)}
      className={cn(
        "flex h-full flex-col justify-between gap-10 rounded-[32px] p-7",
        SHADOW,
        blue ? "bg-primary-muted" : "border border-line-subtle bg-white",
      )}
    >
      <p className="font-inter-medium text-[21px] font-medium leading-[29px] tracking-[-0.3px] text-ink">
        {creator.quote}
      </p>
      <div>
        <div className="flex flex-wrap items-center gap-2 text-[13px] leading-normal">
          {[
            [creator.followers, "followers"],
            [creator.engagement, "engagement"],
          ].map(([value, label]) => (
            <span
              key={label}
              className={cn(
                "flex items-center gap-[5px] rounded-full px-3 py-1.5",
                blue ? "bg-white" : "bg-subtle",
              )}
            >
              <span className="font-inter-bold font-bold text-ink">{value}</span>
              <span className="text-neutral">{label}</span>
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3.5">
          <img
            src={creator.avatar}
            alt=""
            width={56}
            height={56}
            className="block size-14 shrink-0 max-w-none"
          />
          <div className="flex flex-col gap-0.5 leading-normal">
            <p className="font-inter-semibold text-[16px] font-semibold text-ink">{creator.name}</p>
            <p className="text-[13px] text-neutral">{creator.byline}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
