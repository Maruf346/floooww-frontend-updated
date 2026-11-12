import type { ElementType, ReactNode } from "react";
import { cn } from "@/common/utils/cn";

export interface KpiTileProps {
  icon?: ElementType<{ size?: number; className?: string }>;
  iconChip?: ReactNode;
  iconBg?: string;
  label: string;
  value: ReactNode;
  detail: ReactNode;
  className?: string;
  dataNodeId?: string;
}

export function KpiTile({
  icon: Icon,
  iconChip,
  iconBg = "bg-primary",
  label,
  value,
  detail,
  className,
  dataNodeId,
}: KpiTileProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#edeff3] content-stretch flex flex-col items-start overflow-clip p-[16px] relative rounded-[12px] size-full",
        className,
      )}
      data-node-id={dataNodeId}
      data-name="KPI tile"
    >
      {iconChip ? (
        iconChip
      ) : Icon ? (
        <div
          className={cn(
            "content-stretch flex items-center justify-center overflow-clip relative rounded-[8px] shrink-0 size-[36px] text-white",
            iconBg,
          )}
          data-name="Icon chip"
        >
          <div className="relative shrink-0 size-[18px]" data-name="Icon">
            <Icon size={18} />
          </div>
        </div>
      ) : null}
      <div className="h-[14px] relative shrink-0 w-px" data-name="Gap" />
      <p
        className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[#8491a3]"
        data-name="Label"
      >
        {label}
      </p>
      <p
        className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[28px] min-w-full not-italic relative shrink-0 text-[22px] text-[#070b13] tracking-[-0.33px]"
        data-name="Value"
      >
        {value}
      </p>
      <div className="h-[10px] relative shrink-0 w-px" data-name="Gap" />
      <p
        className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[16px] min-w-full not-italic relative shrink-0 text-[12px] text-[#a2a7b3]"
        data-name="Detail"
      >
        {detail}
      </p>
    </div>
  );
}

