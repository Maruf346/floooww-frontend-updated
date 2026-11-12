import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";

interface OtpInputProps {
  onComplete?: (code: string) => void;
}

export function OtpInput({ onComplete }: OtpInputProps) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const commit = (next: string[]) => {
    setDigits(next);
    if (next.every(Boolean)) onComplete?.(next.join(""));
  };
  const change = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    commit(next);
    if (digit && index < 5) refs.current[index + 1]?.focus();
  };
  const key = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) refs.current[index - 1]?.focus();
    if (event.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus();
  };
  const paste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const next = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    commit([...next, ...Array(6 - next.length).fill("")]);
    refs.current[Math.min(next.length, 5)]?.focus();
  };
  return (
    <div className="flex gap-2 sm:gap-[10px]" aria-label="Six digit verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element;
          }}
          value={digit}
          onChange={(event) => change(index, event.target.value)}
          onKeyDown={(event) => key(index, event)}
          onPaste={paste}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${index + 1}`}
          className="h-14 min-w-0 flex-1 rounded-xl border border-line-strong bg-white text-center text-[24px] font-semibold outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
      ))}
    </div>
  );
}
