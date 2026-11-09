import { ASSETS } from "@/common/constants/assets";
import { cn } from "@/common/utils/cn";

export type IntegrationService =
  | "Shopify"
  | "WooCommerce"
  | "Google Analytics"
  | "Meta"
  | "Razorpay"
  | "Google Ads"
  | "Slack"
  | "Zapier"
  | "OpenAI"
  | "Claude"
  | "Gemini"
  | "Floooww AI";

/* Lettermark tiles from Figma Integration logo (137:40). */
const LETTERMARKS: Partial<
  Record<IntegrationService, { glyph: string; tile: string; text: string; left: string }>
> = {
  "Google Ads": { glyph: "G", tile: "bg-white", text: "text-[#4285f4]", left: "left-[7.5px]" },
  Slack: { glyph: "#", tile: "bg-[#4a154b]", text: "text-white", left: "left-[8px]" },
  Zapier: { glyph: "Z", tile: "bg-[#ff4f00]", text: "text-white", left: "left-[8px]" },
  OpenAI: { glyph: "◎", tile: "bg-[#0f172a]", text: "text-white", left: "left-[6px]" },
  Claude: { glyph: "A", tile: "bg-[#c96442]", text: "text-white", left: "left-[7.5px]" },
  Gemini: { glyph: "G", tile: "bg-[#1a73e8]", text: "text-white", left: "left-[7.5px]" },
};

export function IntegrationLogo({
  service,
  className,
}: {
  service: IntegrationService;
  className?: string;
}) {
  const lettermark = LETTERMARKS[service];

  if (lettermark) {
    return (
      <span
        role="img"
        aria-label={service}
        className={cn("relative block size-6 shrink-0 rounded-md", lettermark.tile, className)}
      >
        <span
          className={cn(
            "absolute top-[5.5px] font-inter-bold text-[11px] font-bold leading-normal",
            lettermark.left,
            lettermark.text,
          )}
        >
          {lettermark.glyph}
        </span>
      </span>
    );
  }

  if (service === "WooCommerce") {
    return (
      <span
        role="img"
        aria-label={service}
        className={cn("relative block size-6 shrink-0", className)}
      >
        <span className="absolute inset-x-0 inset-y-[20.83%]">
          <img
            src={ASSETS.integration.WooCommerce}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        </span>
        <span className="absolute inset-[31.25%_12.5%_27.08%_12.5%] text-center font-inter-bold text-[8px] font-bold leading-normal text-white">
          Woo
        </span>
      </span>
    );
  }

  if (service === "Floooww AI") {
    return (
      <span
        role="img"
        aria-label={service}
        className={cn("relative block size-6 shrink-0 rounded-md bg-white", className)}
      >
        <span className="absolute inset-[8.33%_21.61%]">
          <img
            src={ASSETS.integration["Floooww AI"]}
            alt=""
            className="absolute inset-0 block size-full max-w-none"
          />
        </span>
      </span>
    );
  }

  const src = ASSETS.integration[service as keyof typeof ASSETS.integration];
  return (
    <img
      src={src}
      alt={service}
      width={24}
      height={24}
      className={cn("block size-6 shrink-0", className)}
    />
  );
}
