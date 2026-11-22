import { Link } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";

export type ResourceTabKey = "blog" | "faq" | "help" | "enquiry";

export function ResourceTabs({ active }: { active?: ResourceTabKey }) {
  const tabs = [
    { key: "blog", to: ROUTES.blog, label: "Blog" },
    { key: "faq", to: ROUTES.faq, label: "FAQ" },
    { key: "help", to: ROUTES.help, label: "Help Centre" },
    { key: "enquiry", to: ROUTES.enquiry, label: "Contact us" },
  ] as const;

  return (
    <div
      aria-label="Resources"
      className="flex max-w-full gap-1.5 overflow-x-auto rounded-[14px] border border-line-subtle bg-white p-[5px]"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <Link
            key={tab.key}
            to={tab.to}
            className={`shrink-0 rounded-[10px] px-3.5 py-2.5 font-inter-medium text-[13px] font-medium transition-colors ${
              isActive ? "bg-ink text-white" : "text-neutral hover:bg-subtle hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
