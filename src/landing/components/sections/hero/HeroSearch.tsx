import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import { HERO_COPY } from "@/landing/data/hero";

/** Hero search: submitting (or picking a popular niche) starts sign-up with the query attached. */
export function useHeroSearch() {
  const navigate = useNavigate();
  return (query: string) => {
    const params = new URLSearchParams({ role: "brand", q: query.trim() });
    navigate(`${ROUTES.signup}?${params.toString()}`);
  };
}

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const search = useHeroSearch();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) {
      inputRef.current?.focus();
      return;
    }
    search(query);
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="flex w-full max-w-[620px] items-center gap-3 rounded-float border border-line bg-white py-1.5 pl-[18px] pr-1.5 shadow-float transition-[border-color,box-shadow] duration-300 ease-out focus-within:border-primary/40 focus-within:shadow-[0_12px_32px_0_rgba(8,13,38,0.1),0_0_0_4px_rgba(37,99,235,0.08)]"
    >
      <span
        aria-hidden="true"
        className="shrink-0 font-inter-medium text-[18px] font-medium leading-normal text-tertiary"
      >
        ⌕
      </span>
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={HERO_COPY.searchPlaceholder}
        aria-label="Search projects, creators, or categories"
        className="min-w-0 flex-1 bg-transparent font-inter-regular text-[15px] leading-normal text-ink outline-none placeholder:text-tertiary [&::-webkit-search-cancel-button]:hidden"
      />
      <button
        type="submit"
        className="shrink-0 rounded-[10px] bg-primary px-4 py-3 font-inter-semibold text-[15px] font-semibold leading-normal text-white transition-[background-color,transform] duration-200 ease-out hover:bg-primary-hover active:scale-[0.98] sm:px-[22px]"
      >
        {HERO_COPY.searchCta}
      </button>
    </form>
  );
}
