import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/common/constants/motion";
import { cn } from "@/common/utils/cn";
import { ASSETS } from "@/common/constants/assets";
import { MCP_CHAT } from "@/landing/data/mcp";

export const MCP_CARD_WIDTH = 600;
export const MCP_CARD_HEIGHT = 439;

const COLUMN_WIDTHS = [107.805, 69.756, 57.073, 44.39, 38.049];

/** Each thread item plays in on cue once the card is on screen, like a live conversation. */
function Beat({
  order,
  play,
  children,
  className,
}: {
  order: number;
  play: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.55, delay: play ? 0.35 + order * 0.45 : 0, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

function Mark({ src, width, height }: { src: string; width: number; height: number }) {
  return (
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      className="block shrink-0 max-w-none"
      style={{ width, height }}
    />
  );
}

/** Figma MCP card (2050:2615): gradient frame with the dark assistant window inside. */
export function AssistantChatMock({ play }: { play: boolean }) {
  const chat = MCP_CHAT;
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-line-subtle"
      style={{
        width: MCP_CARD_WIDTH,
        height: MCP_CARD_HEIGHT,
        backgroundImage:
          "linear-gradient(143.808deg, rgb(238, 243, 255) 14.286%, rgb(246, 248, 251) 85.714%)",
      }}
    >
      <div className="absolute left-[39px] top-[39px] flex w-[520px] items-start overflow-hidden rounded-[10.146px] border-[0.634px] border-mock-frame bg-mock-bg leading-normal shadow-[0_14px_36px_0_rgba(13,20,51,0.22)]">
        {/* Sidebar */}
        <div className="flex w-[135.707px] shrink-0 flex-col items-start gap-[1.268px] self-stretch overflow-hidden border-r-[0.634px] border-mock-divider bg-mock-sidebar px-[5.707px] py-[8.878px]">
          {chat.nav.map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex w-full items-center gap-[6.976px] rounded-[5.707px] px-[5.707px] py-[4.439px]",
                item.active && "bg-mock-raised",
              )}
            >
              <Mark src={item.icon} width={10.78} height={10.78} />
              <p
                className={cn(
                  "text-[8.244px] text-mock-text whitespace-nowrap",
                  item.dot && "min-w-px flex-1",
                )}
              >
                {item.label}
              </p>
              {item.dot && <span className="size-[3.805px] shrink-0 rounded-full bg-mock-blue" />}
            </div>
          ))}
          <div className="h-[7.61px] shrink-0" />
          <p className="text-[6.976px] text-mock-muted whitespace-nowrap">Recents</p>
          <div className="h-[2.537px] shrink-0" />
          {chat.recents.map((recent, index) => (
            <div
              key={recent}
              className={cn(
                "flex w-full items-center rounded-[5.073px] px-[5.707px] py-[3.805px]",
                index === 0 && "bg-mock-raised",
              )}
            >
              <p
                className={cn(
                  "min-w-px flex-1 text-[7.61px]",
                  index === 0 ? "text-mock-text" : "text-mock-dim",
                )}
              >
                {recent}
              </p>
            </div>
          ))}
          <div className="min-h-px w-full flex-1" />
          <div className="flex w-full items-center gap-[5.073px] border-t-[0.634px] border-mock-divider px-[5.707px] pb-[1.268px] pt-[6.341px]">
            <span className="flex size-[15.22px] shrink-0 items-center justify-center rounded-full bg-mock-avatar font-inter-medium text-[6.341px] font-medium text-mock-text">
              {chat.user.initial}
            </span>
            <p className="text-[8.244px] text-mock-text whitespace-nowrap">{chat.user.name}</p>
            <p className="text-[6.976px] text-mock-muted whitespace-nowrap">{chat.user.org}</p>
          </div>
        </div>

        {/* Chat */}
        <div className="flex min-w-px flex-1 flex-col items-center overflow-hidden">
          <div className="flex w-full items-center justify-between px-[11.415px] py-[7.61px]">
            <p className="text-[7.61px] text-mock-dim whitespace-nowrap">{chat.chatTitle}</p>
            <div className="flex items-center gap-[3.805px] rounded-[5.073px] border-[0.634px] border-mock-border px-[5.707px] py-[2.537px]">
              <Mark src={ASSETS.mcp.markHeader} width={6.459} height={9.48} />
              <p className="text-[6.976px] text-mock-dim whitespace-nowrap">Floooww</p>
              <motion.span
                className="size-[3.805px] shrink-0 rounded-full bg-mock-green"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="flex w-[342.439px] flex-col items-start gap-[7.61px] overflow-hidden pb-[6.341px] pt-[1.268px]">
            <Beat order={0} play={play} className="flex w-full items-start justify-end">
              <div className="w-[240.976px] rounded-[9.512px] bg-mock-bubble px-[8.244px] py-[5.707px]">
                <p className="w-full text-[8.244px] leading-[12.049px] text-mock-text">
                  {chat.prompt}
                </p>
              </div>
            </Beat>
            <Beat order={1} play={play}>
              <div className="flex items-center gap-[4.439px] rounded-[5.073px] border-[0.634px] border-mock-border px-[5.707px] py-[3.171px]">
                <Mark src={ASSETS.mcp.markTool} width={7.453} height={10.939} />
                <p className="font-roboto-mono text-[6.976px] text-mock-text whitespace-nowrap">
                  {chat.tool}
                </p>
                <p className="text-[6.976px] text-mock-muted whitespace-nowrap">Floooww</p>
                <p className="text-[7.61px] text-mock-muted whitespace-nowrap">›</p>
              </div>
            </Beat>
            <Beat order={2} play={play} className="w-full">
              <p className="font-source-serif text-[9.512px] leading-[13.951px] text-mock-text">
                {chat.answer}
              </p>
            </Beat>
            <Beat order={3} play={play} className="w-full">
              <div className="flex w-full flex-col items-start overflow-hidden rounded-[6.341px] border-[0.634px] border-mock-border">
                <div className="flex w-full items-start bg-mock-head px-[6.341px] py-[4.439px] font-inter-medium text-[6.341px] font-medium text-mock-muted">
                  {chat.columns.map((column, index) => (
                    <p key={column} className="shrink-0" style={{ width: COLUMN_WIDTHS[index] }}>
                      {column}
                    </p>
                  ))}
                </div>
                {chat.rows.map((row) => (
                  <div
                    key={row.name}
                    className="flex w-full items-center border-t-[0.634px] border-mock-border px-[6.341px] py-[4.439px]"
                  >
                    <div
                      className="flex shrink-0 items-center gap-[5.073px]"
                      style={{ width: COLUMN_WIDTHS[0] }}
                    >
                      <img
                        src={row.photo}
                        alt=""
                        className="block size-[13.951px] shrink-0 rounded-full object-cover"
                      />
                      <p className="font-inter-medium text-[7.61px] font-medium text-mock-text whitespace-nowrap">
                        {row.name}
                      </p>
                    </div>
                    <p
                      className="shrink-0 text-[6.976px] text-mock-dim"
                      style={{ width: COLUMN_WIDTHS[1] }}
                    >
                      {row.audience}
                    </p>
                    <p
                      className="shrink-0 text-[6.976px] text-mock-dim"
                      style={{ width: COLUMN_WIDTHS[2] }}
                    >
                      {row.sales}
                    </p>
                    <p
                      className="shrink-0 text-[6.976px] text-mock-text"
                      style={{ width: COLUMN_WIDTHS[3] }}
                    >
                      {row.fee}
                    </p>
                    <p
                      className="shrink-0 font-inter-semibold text-[6.976px] font-semibold text-mock-green"
                      style={{ width: COLUMN_WIDTHS[4] }}
                    >
                      {row.match}
                    </p>
                  </div>
                ))}
              </div>
            </Beat>
            <Beat order={4} play={play} className="w-full">
              <p className="font-source-serif text-[9.512px] leading-[13.951px] text-mock-text">
                {chat.summary}
              </p>
            </Beat>
            <Beat order={5} play={play} className="w-full">
              <div className="flex w-full items-center gap-[5.707px] rounded-[7.61px] border-[0.634px] border-mock-border bg-mock-bubble py-[5.707px] pl-[7.61px] pr-[5.707px]">
                <Mark src={ASSETS.mcp.markPrompt} width={8.943} height={13.127} />
                <p className="min-w-px flex-1 font-inter-medium text-[7.61px] font-medium text-mock-text">
                  {chat.permission}
                </p>
                <span className="rounded-[5.073px] border-[0.634px] border-mock-border px-[6.976px] py-[3.805px] font-inter-medium text-[6.976px] font-medium text-mock-text whitespace-nowrap">
                  {chat.deny}
                </span>
                <motion.span
                  className="rounded-[5.073px] bg-mock-text px-[6.976px] py-[3.805px] font-inter-medium text-[6.976px] font-medium text-mock-sidebar whitespace-nowrap"
                  animate={
                    play
                      ? {
                          boxShadow: [
                            "0 0 0 0 rgba(236,233,225,0)",
                            "0 0 0 3px rgba(236,233,225,0.18)",
                            "0 0 0 0 rgba(236,233,225,0)",
                          ],
                        }
                      : undefined
                  }
                  transition={{ duration: 2.2, delay: 3.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {chat.allow}
                </motion.span>
              </div>
            </Beat>
          </div>

          <div className="h-[3.805px] shrink-0" />
          <div className="flex w-[342.439px] flex-col items-start gap-[5px] rounded-[10.146px] border-[0.634px] border-mock-border bg-mock-bubble pb-[5.707px] pl-[8.878px] pr-[7.61px] pt-[7.61px]">
            <p className="text-[8.244px] text-mock-muted whitespace-nowrap">{chat.composer}</p>
            <div className="flex w-full items-center gap-[5.707px]">
              <p className="text-[11.415px] text-mock-text whitespace-nowrap">+</p>
              <div className="flex items-center gap-[3.171px] rounded-[5.073px] border-[0.634px] border-mock-border px-[5.073px] py-[1.902px]">
                <Mark src={ASSETS.mcp.markComposer} width={5.465} height={8.022} />
                <p className="text-[6.976px] text-mock-dim whitespace-nowrap">Floooww</p>
              </div>
              <div className="min-w-px flex-1" />
              <span className="size-[4.439px] shrink-0 rounded-full bg-mock-green" />
            </div>
          </div>
          <div className="flex w-[342.439px] items-start justify-between px-[2.537px] pb-[8.878px] pt-[4.439px] text-[6.976px] whitespace-nowrap">
            <p className="text-mock-dim">{chat.project}</p>
            <p className="text-mock-muted">{chat.connected}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
