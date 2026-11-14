import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Link2,
  Plus,
  PenLine,
  Send,
  Smartphone,
  Trash2,
  Video,
} from "lucide-react";
import { BrandShell } from "@/brand/components/BrandShell";
import { PlatformLogo } from "@/common/components/brand/PlatformLogo";
import { Button } from "@/common/components/ui/Button";
import { Dropdown, MultiDropdown } from "@/common/components/ui/Dropdown";
import type { Platform } from "@/common/types";
import {
  brandCreatorProfileRoute,
  brandProjectRoute,
} from "@/common/constants/routes";
import { getCreatorProfile } from "./project-applications/creatorProfileData";

type Step = "setup" | "review" | "sent";
type Deliverable = {
  id: number;
  type: string;
  platform: string;
  deadline: string;
  tracking: boolean;
  coupons: string[];
  fee: string;
  usage: string;
  products: string[];
  shipments: string[];
  brief: string;
};
const blank = (id: number): Deliverable => ({
  id,
  type: "",
  platform: "",
  deadline: "",
  tracking: false,
  coupons: [],
  fee: "",
  usage: "Organic",
  products: [],
  shipments: [],
  brief: "",
});
const generatedLinks: Record<string, string> = {
  "1 Reel · kit routine": "flw.to/diya-reel",
  "1 Story · code reminder": "flw.to/diya-st1",
  "1 Story · results check-in": "flw.to/diya-st2",
};
const shipmentChoices = [
  {
    value: "Vitamin C Glow Serum · DLV4829173650",
    name: "Vitamin C Glow Serum",
    detail: "Delhivery · DLV4829173650 · delivered 27 Oct",
    tracking: "DLV4829173650",
  },
  {
    value: "Sunscreen gel · SPF 50 · D60318842271",
    name: "Sunscreen gel · SPF 50",
    detail: "DTDC · D60318842271 · out for delivery",
    tracking: "D60318842271",
  },
  {
    value: "Glow Squad kit · BD7731045…",
    name: "Glow Squad kit · cleanser + serum",
    detail: "Blue Dart · BD7731045528 · in transit",
    tracking: "BD7731045528",
  },
];
const productChoices = [
  {
    value: "Vitamin C Glow Serum",
    name: "Vitamin C Glow Serum",
    detail: "minimalist.in/products/vitamin-c-serum · ₹899 · in stock",
  },
  {
    value: "Sunscreen gel · SPF 50",
    name: "Sunscreen gel · SPF 50",
    detail: "minimalist.in/products/sunscreen-spf50 · ₹649 · in stock",
  },
  {
    value: "Glow Squad kit",
    name: "Glow Squad kit · cleanser + serum",
    detail: "minimalist.in/products/glow-squad-kit · ₹1,499 · in stock",
  },
  {
    value: "Festive gift set",
    name: "Festive gift set",
    detail: "minimalist.in/products/festive-gift-set · ₹1,999 · in stock",
  },
  {
    value: "Glow Cleanser",
    name: "Glow Cleanser",
    detail: "minimalist.in/products/glow-cleanser · ₹599 · in stock",
  },
  {
    value: "SPF 50",
    name: "SPF 50",
    detail: "minimalist.in/products/spf-50 · ₹649 · in stock",
  },
];
const couponChoices = [
  {
    value: "DIYAVITC10",
    detail: "10% off · Vitamin C Glow Serum · used 42 times",
  },
  {
    value: "DIYASPF10",
    detail: "10% off · Sunscreen gel SPF 50 · new",
  },
  {
    value: "DIYAGLOW15",
    detail: "15% off · whole store · expired 31 Oct",
  },
  {
    value: "SQUADDIYA",
    detail: "10% off · Glow Squad products · used 42 times",
  },
  {
    value: "GLOW10",
    detail: "10% off · whole store · active",
  },
];
const filledCycleDeliverables: Deliverable[] = [
  {
    id: 1,
    type: "1 Reel · kit routine",
    platform: "Instagram",
    deadline: "2026-11-10",
    tracking: true,
    coupons: ["SQUADDIYA"],
    fee: "7500",
    usage: "Organic",
    products: ["Glow Squad kit"],
    shipments: ["Glow Squad kit · BD7731045…"],
    brief:
      "Unbox the kit in the first 3 seconds; say code SQUADDIYA at the end",
  },
  {
    id: 2,
    type: "1 Story · code reminder",
    platform: "Instagram",
    deadline: "2026-11-15",
    tracking: true,
    coupons: ["SQUADDIYA"],
    fee: "2500",
    usage: "Organic",
    products: ["Glow Squad kit"],
    shipments: [],
    brief: "Link sticker to flw.to/diya-st1; mention 10% off",
  },
  {
    id: 3,
    type: "1 Story · results check-in",
    platform: "Instagram",
    deadline: "2026-11-28",
    tracking: true,
    coupons: ["SQUADDIYA"],
    fee: "2500",
    usage: "Organic",
    products: ["Vitamin C Glow Serum"],
    shipments: [],
    brief: "Share your before/after; tag @minimalist",
  },
];

function Stepper({ step }: { step: Step }) {
  const active = step === "setup" ? 1 : step === "review" ? 2 : 3;
  const steps = ["Project and deliverables", "Review & pay", "Done"];
  return (
    <div className="grid w-full grid-cols-[auto_minmax(24px,1fr)_auto_minmax(24px,1fr)_auto] items-center gap-x-2 rounded-lg border border-line bg-white px-3 py-3 sm:gap-x-3 sm:px-4">
      {steps.map((label, index) => {
        const number = index + 1;
        const complete = number < active;
        const current = number === active;
        return (
          <div className="contents" key={label}>
            <div className="flex min-w-0 items-center justify-center">
              <span
                className={`grid size-4 shrink-0 place-items-center rounded-full text-[9px] font-medium sm:size-5 sm:text-[10px] ${complete || current ? "bg-primary text-white" : "bg-muted text-tertiary"}`}
              >
                {complete ? <Check size={11} strokeWidth={3} /> : number}
              </span>
              <span
                className={`ml-1.5 truncate whitespace-nowrap text-[10px] leading-4 sm:text-[12px] ${current ? "font-medium text-ink" : complete ? "text-secondary" : "text-tertiary"}`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                className={`h-0.5 min-w-6 ${number < active ? "bg-primary" : "bg-line-strong"}`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

type DeliverableChoice = {
  label: string;
  platform?: Platform;
  kind: "platform" | "live";
};

const deliverableChoices: DeliverableChoice[] = [
  { label: "Reel", platform: "Instagram", kind: "platform" },
  { label: "Story", platform: "Instagram", kind: "platform" },
  { label: "Carousel", platform: "Instagram", kind: "platform" },
  { label: "Static post", platform: "Instagram", kind: "platform" },
  { label: "Short", platform: "YouTube", kind: "platform" },
  { label: "Video (dedicated)", platform: "YouTube", kind: "platform" },
  { label: "Idea Pin", platform: "Pinterest", kind: "platform" },
  { label: "Story", platform: "Snapchat", kind: "platform" },
  { label: "Live session", kind: "live" },
];

function DeliverableTypeDropdown({
  value,
  platform,
  onChange,
}: {
  value: string;
  platform: string;
  onChange: (choice: { type: string; platform: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 270 });

  const updatePosition = () => {
    const bounds = triggerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition({
      left: Math.max(12, Math.min(bounds.left, window.innerWidth - 282)),
      top: bounds.bottom + 6,
      width: Math.max(270, bounds.width),
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
        setCustom(false);
      }
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const choose = (choice: DeliverableChoice) => {
    onChange({ type: choice.label, platform: choice.platform ?? "Instagram" });
    setOpen(false);
    setCustom(false);
  };
  const saveCustom = () => {
    const type = customValue.trim();
    if (!type) return;
    onChange({ type, platform: "Instagram" });
    setOpen(false);
    setCustom(false);
    setCustomValue("");
  };

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          id="deliverable-type-menu"
          role="listbox"
          aria-label="Deliverable type"
          className="fixed z-[10000] overflow-hidden rounded-lg border border-line bg-white p-1.5 shadow-[0_14px_30px_rgba(11,20,39,0.22)]"
          style={position}
        >
          {deliverableChoices.map((choice) => {
            const selected =
              value === choice.label &&
              (!choice.platform || platform === choice.platform);
            return (
              <button
                key={`${choice.platform ?? "general"}-${choice.label}`}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => choose(choice)}
                className={`flex h-9 w-full items-center gap-2 rounded-md px-2.5 text-left text-[14px] leading-5 transition ${selected ? "bg-primary-subtle text-primary" : "text-ink hover:bg-subtle"}`}
              >
                {choice.platform ? (
                  <PlatformLogo platform={choice.platform} size={16} />
                ) : (
                  <Video size={16} className="text-secondary" />
                )}
                <span className="min-w-0 flex-1 truncate">{choice.label}</span>
                {selected ? <Check size={16} className="shrink-0" /> : null}
              </button>
            );
          })}
          <div className="my-1 h-px bg-line-subtle" />
          {custom ? (
            <div className="flex gap-2 px-1 py-1">
              <input
                autoFocus
                value={customValue}
                onChange={(event) => setCustomValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") saveCustom();
                }}
                placeholder="Type deliverable"
                className="h-8 min-w-0 flex-1 rounded-md border border-line px-2 text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <button
                type="button"
                onClick={saveCustom}
                disabled={!customValue.trim()}
                className="h-8 rounded-md bg-primary px-3 text-[13px] font-medium text-white disabled:opacity-45"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setCustom(true)}
              className="flex h-9 w-full items-center gap-2 rounded-md px-2.5 text-left text-[14px] text-primary transition hover:bg-primary-subtle"
            >
              <PenLine size={16} />
              Other: type your own
            </button>
          )}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-controls="deliverable-type-menu"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-primary" : "border-line"}`}
      >
        <span className="min-w-0 flex-1 truncate">
          {value || "Choose a deliverable"}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {menu}
    </>
  );
}

function PlatformDropdown({
  value,
  creatorName,
  onChange,
}: {
  value: string;
  creatorName: string;
  onChange: (platform: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 236 });
  const accounts: { platform: Platform; detail: string; connected: boolean }[] =
    [
      {
        platform: "Instagram",
        detail: "1.2M followers · connected",
        connected: true,
      },
      {
        platform: "YouTube",
        detail: `Not connected for ${creatorName}`,
        connected: false,
      },
      {
        platform: "Pinterest",
        detail: `Not connected for ${creatorName}`,
        connected: false,
      },
      {
        platform: "Snapchat",
        detail: `Not connected for ${creatorName}`,
        connected: false,
      },
    ];
  const updatePosition = () => {
    const bounds = triggerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition({
      left: Math.max(12, Math.min(bounds.left, window.innerWidth - 248)),
      top: bounds.bottom + 6,
      width: Math.max(236, bounds.width),
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          role="listbox"
          aria-label="Platform"
          className="fixed z-[10000] overflow-hidden rounded-md border border-line bg-white p-1 shadow-[0_14px_30px_rgba(11,20,39,0.18)]"
          style={position}
        >
          {accounts.map((account) => {
            const selected = value === account.platform;
            return (
              <button
                key={account.platform}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={!account.connected}
                onClick={() => {
                  onChange(account.platform);
                  setOpen(false);
                }}
                className={`flex min-h-10 w-full items-center gap-2 rounded-sm px-2 text-left transition ${selected ? "bg-primary-subtle text-primary" : "text-ink hover:bg-subtle"} ${account.connected ? "" : "cursor-not-allowed opacity-45"}`}
              >
                <PlatformLogo platform={account.platform} size={14} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] leading-4">
                    {account.platform}
                  </span>
                  <span className="block truncate text-[10px] leading-3 text-secondary">
                    {account.detail}
                  </span>
                </span>
                {selected ? <Check size={14} className="shrink-0" /> : null}
              </button>
            );
          })}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-primary" : "border-line"}`}
      >
        <span className="min-w-0 flex-1 truncate">{value || "Platform"}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {menu}
    </>
  );
}

function CouponDropdown({
  values,
  onChange,
}: {
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [position, setPosition] = useState({ left: 0, top: 0, width: 280 });
  const selectedCodes = couponChoices.filter((coupon) =>
    values.includes(coupon.value),
  );
  const selectionLabel = selectedCodes.length
    ? `Coupons: ${selectedCodes.map((coupon) => coupon.value).join(", ")}`
    : "Generate codes";

  useEffect(() => {
    if (!open) return;
    const positionMenu = () => {
      const bounds = triggerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const width = Math.max(bounds.width, 280);
      setPosition({
        left: Math.max(8, Math.min(bounds.left, window.innerWidth - width - 8)),
        top: bounds.bottom + 6,
        width,
      });
    };
    positionMenu();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  }, [open]);

  const toggleCoupon = (coupon: string) => {
    onChange(
      values.includes(coupon)
        ? values.filter((value) => value !== coupon)
        : [...values, coupon],
    );
  };
  const generateCoupon = () => {
    const nextCoupon = couponChoices.find(
      (coupon) => !values.includes(coupon.value),
    );
    if (nextCoupon) onChange([...values, nextCoupon.value]);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Coupon codes"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-[1.5px] border-primary" : "border-line"}`}
      >
        <span className={`min-w-0 flex-1 truncate ${selectedCodes.length ? "text-ink" : "text-tertiary"}`}>
          {selectionLabel}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-label="Coupon codes"
            aria-multiselectable="true"
            className="fixed z-[10000] overflow-hidden rounded-md border border-line bg-white p-1.5 shadow-[0_14px_30px_rgba(11,20,39,0.18)]"
            style={position}
          >
            <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-medium uppercase tracking-[0.04em] text-secondary">
              Diya&apos;s codes · Shopify · {selectedCodes.length} selected
            </p>
            {couponChoices.map((coupon) => {
              const selected = values.includes(coupon.value);
              return (
                <button
                  key={coupon.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => toggleCoupon(coupon.value)}
                  className={`flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${selected ? "bg-primary-subtle" : "hover:bg-subtle"}`}
                >
                  <span
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] border ${selected ? "border-primary bg-primary text-white" : "border-line-strong bg-white"}`}
                  >
                    {selected && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] leading-5 text-ink">
                      {coupon.value}
                    </span>
                    <span className="block text-[12px] leading-4 text-secondary">
                      {coupon.detail}
                    </span>
                  </span>
                </button>
              );
            })}
            <div className="my-1 h-px bg-line-subtle" />
            <button
              type="button"
              onClick={generateCoupon}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-[13px] leading-5 text-link transition-colors hover:bg-primary-subtle"
            >
              <Plus size={14} />
              Generate a new code
            </button>
            <p className="px-2.5 pb-1 pt-0.5 text-[12px] leading-4 text-tertiary">
              Pick one or more. Codes are created in your store and each one
              tracks its own sales.
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}

function ProductDropdown({
  values,
  onChange,
}: {
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [position, setPosition] = useState({ left: 0, top: 0, width: 320 });
  const selectedProducts = productChoices.filter((product) =>
    values.includes(product.value),
  );
  const visibleProducts = productChoices.filter((product) =>
    `${product.name} ${product.detail}`.toLowerCase().includes(search.toLowerCase()),
  );
  const selectionLabel = selectedProducts.length
    ? `Products: ${selectedProducts.map((product) => product.name).join(", ")}`
    : "Select products";

  useEffect(() => {
    if (!open) return;
    const positionMenu = () => {
      const bounds = triggerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const width = Math.max(bounds.width, 320);
      setPosition({
        left: Math.max(8, Math.min(bounds.left, window.innerWidth - width - 8)),
        top: bounds.bottom + 6,
        width,
      });
    };
    positionMenu();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
        setSearch("");
      }
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  }, [open]);

  const toggleProduct = (product: string) => {
    onChange(
      values.includes(product)
        ? values.filter((value) => value !== product)
        : [...values, product],
    );
  };
  const addProduct = () => {
    const nextProduct = productChoices.find(
      (product) => !values.includes(product.value),
    );
    if (nextProduct) onChange([...values, nextProduct.value]);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select products"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-[1.5px] border-primary" : "border-line"}`}
      >
        <span className={`min-w-0 flex-1 truncate ${selectedProducts.length ? "text-ink" : "text-tertiary"}`}>
          {selectionLabel}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-label="Products"
            aria-multiselectable="true"
            className="fixed z-[10000] overflow-hidden rounded-md border border-line bg-white p-1.5 shadow-[0_14px_30px_rgba(11,20,39,0.18)]"
            style={position}
          >
            <label className="mb-1.5 block">
              <span className="sr-only">Search products</span>
              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products on minimalist.in"
                className="h-8 w-full rounded-md bg-subtle px-2.5 text-[13px] text-ink outline-none placeholder:text-tertiary focus:ring-2 focus:ring-primary/15"
              />
            </label>
            <p className="px-2.5 pb-1.5 pt-0.5 text-[10px] font-medium uppercase tracking-[0.04em] text-secondary">
              From your website · Shopify · {selectedProducts.length} selected
            </p>
            <div className="max-h-[248px] overflow-y-auto">
              {visibleProducts.map((product) => {
                const selected = values.includes(product.value);
                return (
                  <button
                    key={product.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => toggleProduct(product.value)}
                    className={`flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${selected ? "bg-primary-subtle" : "hover:bg-subtle"}`}
                  >
                    <span
                      className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] border ${selected ? "border-primary bg-primary text-white" : "border-line-strong bg-white"}`}
                    >
                      {selected && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] leading-5 text-ink">
                        {product.name}
                      </span>
                      <span className="block text-[12px] leading-4 text-secondary">
                        {product.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
              {!visibleProducts.length && (
                <p className="px-2.5 py-3 text-[12px] text-tertiary">
                  No matching products
                </p>
              )}
            </div>
            <div className="my-1 h-px bg-line-subtle" />
            <button
              type="button"
              onClick={addProduct}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-[13px] leading-5 text-link transition-colors hover:bg-primary-subtle"
            >
              <Plus size={14} />
              Add another product link
            </button>
            <p className="px-2.5 pb-1 pt-0.5 text-[12px] leading-4 text-tertiary">
              Pick one or more. Each product gets its own tracking link; the
              coupon works on all of them.
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}

function ShipmentDropdown({
  values,
  onChange,
}: {
  values: string[];
  onChange: (values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [position, setPosition] = useState({ left: 0, top: 0, width: 280 });
  const selectedShipments = shipmentChoices.filter((shipment) =>
    values.includes(shipment.value),
  );
  const selectionLabel = selectedShipments.length
    ? `Shipping: ${selectedShipments.length} shipment${selectedShipments.length === 1 ? "" : "s"} · ${selectedShipments.map((shipment) => shipment.tracking).join(", ")}`
    : "Select shipments";

  useEffect(() => {
    if (!open) return;
    const positionMenu = () => {
      const bounds = triggerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      const width = Math.max(bounds.width, 280);
      setPosition({
        left: Math.max(8, Math.min(bounds.left, window.innerWidth - width - 8)),
        top: bounds.bottom + 6,
        width,
      });
    };
    positionMenu();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("resize", positionMenu);
    window.addEventListener("scroll", positionMenu, true);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("resize", positionMenu);
      window.removeEventListener("scroll", positionMenu, true);
    };
  }, [open]);

  const toggleShipment = (shipment: string) => {
    onChange(
      values.includes(shipment)
        ? values.filter((value) => value !== shipment)
        : [...values, shipment],
    );
  };
  const addShipment = () => {
    const nextShipment = shipmentChoices.find(
      (shipment) => !values.includes(shipment.value),
    );
    if (nextShipment) onChange([...values, nextShipment.value]);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select shipments"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] leading-5 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-[1.5px] border-primary" : "border-line"}`}
      >
        <span className={`min-w-0 flex-1 truncate ${selectedShipments.length ? "text-ink" : "text-tertiary"}`}>
          {selectionLabel}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-secondary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-label="Shipments"
            aria-multiselectable="true"
            className="fixed z-[10000] overflow-hidden rounded-md border border-line bg-white p-1.5 shadow-[0_14px_30px_rgba(11,20,39,0.18)]"
            style={position}
          >
            <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-medium uppercase tracking-[0.04em] text-secondary">
              Shipped to Diya · {selectedShipments.length} selected
            </p>
            {shipmentChoices.map((shipment) => {
              const selected = values.includes(shipment.value);
              return (
                <button
                  key={shipment.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => toggleShipment(shipment.value)}
                  className={`flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors ${selected ? "bg-primary-subtle" : "hover:bg-subtle"}`}
                >
                  <span
                    className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] border ${selected ? "border-primary bg-primary text-white" : "border-line-strong bg-white"}`}
                  >
                    {selected && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] leading-5 text-ink">
                      {shipment.name}
                    </span>
                    <span className="block truncate text-[12px] leading-4 text-secondary">
                      {shipment.detail}
                    </span>
                  </span>
                </button>
              );
            })}
            <div className="my-1 h-px bg-line-subtle" />
            <button
              type="button"
              onClick={addShipment}
              className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-[13px] leading-5 text-link transition-colors hover:bg-primary-subtle"
            >
              <Plus size={14} />
              Add a new shipment
            </button>
            <p className="px-2.5 pb-1 pt-0.5 text-[12px] leading-4 text-tertiary">
              Pick every shipment for this deliverable. Courier and tracking
              numbers fill in automatically.
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}

const formatDeadline = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

function DeadlinePicker({
  value,
  onChange,
  pickerId,
}: {
  value: string;
  onChange: (value: string) => void;
  pickerId: string;
}) {
  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    () => selectedDate ?? new Date(2026, 11, 1),
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 300 });
  const calendarStart = new Date(2026, 10, 2);
  const calendarEnd = new Date(2027, 0, 31);
  const monthStart = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1,
  );
  const mondayOffset = (monthStart.getDay() + 6) % 7;
  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const cellCount = Math.ceil((mondayOffset + daysInMonth) / 7) * 7;
  const gridStart = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1 - mondayOffset,
  );
  const days = Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
  const updatePosition = () => {
    const bounds = triggerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition({
      left: Math.max(12, Math.min(bounds.left, window.innerWidth - 312)),
      top: bounds.bottom + 6,
      width: 300,
    });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const close = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      )
        setOpen(false);
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const toggle = () => {
    if (!open) setVisibleMonth(selectedDate ?? new Date(2026, 11, 1));
    setOpen((current) => !current);
  };
  const cycleDescription = () => {
    if (!selectedDate)
      return "Choose a deadline to see which project cycle it belongs to.";
    const iso = toIsoDate(selectedDate);
    if (iso >= "2026-12-02" && iso <= "2027-01-01")
      return `${formatDeadline(iso).replace(" 2026", "")} falls in Cycle 2 · 2 Dec – 1 Jan`;
    if (iso >= "2027-01-02")
      return `${formatDeadline(iso).replace(" 2027", "")} falls in Cycle 3 · 2 Jan – 31 Jan`;
    return `${formatDeadline(iso).replace(" 2026", "")} falls in Cycle 1 · 2 Nov – 1 Dec`;
  };

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          id={pickerId}
          role="dialog"
          aria-label="Choose deadline"
          className="fixed z-[10000] overflow-hidden rounded-lg border border-line bg-white p-3 shadow-[0_14px_30px_rgba(11,20,39,0.22)]"
          style={position}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setVisibleMonth(
                  (date) =>
                    new Date(date.getFullYear(), date.getMonth() - 1, 1),
                )
              }
              className="grid size-7 place-items-center rounded-md text-secondary hover:bg-subtle"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-[14px] font-medium text-ink">
              {new Intl.DateTimeFormat("en-GB", {
                month: "long",
                year: "numeric",
              }).format(visibleMonth)}
            </p>
            <button
              type="button"
              onClick={() =>
                setVisibleMonth(
                  (date) =>
                    new Date(date.getFullYear(), date.getMonth() + 1, 1),
                )
              }
              className="grid size-7 place-items-center rounded-md text-secondary hover:bg-subtle"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1 text-center">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <span
                className="h-5 text-[12px] leading-5 text-secondary"
                key={day}
              >
                {day}
              </span>
            ))}
            {days.map((date) => {
              const iso = toIsoDate(date);
              const selected = iso === value;
              const outside = date.getMonth() !== visibleMonth.getMonth();
              const blocked =
                date < calendarStart || date > calendarEnd || outside;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={blocked}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`h-8 rounded-md text-[13px] transition ${selected ? "bg-primary text-white" : outside || blocked ? "text-tertiary" : "bg-subtle text-ink hover:bg-primary-subtle"}`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          <div className="mt-3 rounded-md bg-primary-subtle px-3 py-2">
            <p className="text-[12px] font-medium text-ink">
              {cycleDescription()}
            </p>
            <p className="mt-1 text-[12px] leading-4 text-secondary">
              Shaded days are cycle 2. Dates after 31 Jan 2027 are blocked; the
              project ends then.
            </p>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-controls={pickerId}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={toggle}
        className={`flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-left text-[13px] text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${open ? "border-primary" : "border-line"}`}
      >
        <CalendarDays size={15} className="shrink-0 text-secondary" />
        <span className="min-w-0 flex-1 truncate">
          {value ? formatDeadline(value) : "dd/mm/yyyy"}
        </span>
      </button>
      {menu}
    </>
  );
}

function FieldRow({
  value,
  onChange,
  remove,
  position,
  creatorName,
}: {
  value: Deliverable;
  onChange: (next: Deliverable) => void;
  remove: () => void;
  position: number;
  creatorName: string;
}) {
  const update = (data: Partial<Deliverable>) =>
    onChange({ ...value, ...data });
  return (
    <div className="border-b border-line-subtle px-4 py-4 last:border-0">
      <div className="grid gap-2 lg:grid-cols-[minmax(190px,1.4fr)_150px_150px_minmax(150px,1fr)_minmax(160px,1fr)_32px]">
        <DeliverableTypeDropdown
          value={value.type}
          platform={value.platform}
          onChange={({ type, platform }) => update({ type, platform })}
        />
        <PlatformDropdown
          value={value.platform}
          creatorName={creatorName.split(" ")[0]}
          onChange={(platform) => update({ platform })}
        />
        <DeadlinePicker
          value={value.deadline}
          onChange={(deadline) => update({ deadline })}
          pickerId={`deadline-${position}`}
        />
        <button
          type="button"
          onClick={() => update({ tracking: !value.tracking })}
          className={`flex h-10 items-center gap-2 rounded-md border px-3 text-[13px] ${value.tracking ? "border-primary bg-primary-subtle text-primary" : "border-line bg-white text-secondary"}`}
        >
          <Link2 size={15} />
          {value.tracking
            ? generatedLinks[value.type] || "UTM created"
            : "Generate UTM"}
          <Copy className="ml-auto" size={14} />
        </button>
        <CouponDropdown
          values={value.coupons}
          onChange={(coupons) => update({ coupons })}
        />
        <button
          type="button"
          aria-label={`Remove deliverable ${position}`}
          onClick={remove}
          className="grid h-10 place-items-center rounded-md text-secondary hover:bg-danger-subtle hover:text-danger"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div className="mt-2 grid gap-2 lg:grid-cols-[180px_200px_minmax(190px,1fr)_minmax(190px,1fr)]">
        <label className="flex h-10 items-center rounded-md border border-line bg-white px-3 text-[13px] text-secondary">
          Fee
          <input
            inputMode="numeric"
            value={value.fee ? Number(value.fee).toLocaleString("en-IN") : ""}
            onChange={(event) =>
              update({ fee: event.target.value.replace(/[^0-9]/g, "") })
            }
            placeholder="₹0"
            className="min-w-0 flex-1 bg-transparent pl-2 text-[13px] text-ink outline-none"
          />
        </label>
        <Dropdown
          value={value.usage}
          options={["Organic", "Paid Ads", "Paid ads", "Perpetual"]}
          onChange={(usage) => update({ usage })}
          ariaLabel="Usage rights"
          displayValue={value.usage}
          otherLabel="Other type your own"
          otherIcon={<PenLine size={14} />}
          otherPlaceholder="Describe usage rights"
        />
        <ProductDropdown
          values={value.products}
          onChange={(products) => update({ products })}
        />
        <ShipmentDropdown
          values={value.shipments}
          onChange={(shipments) => update({ shipments })}
        />
      </div>
      <label className="mt-2 flex min-h-[76px] items-start rounded-md border border-line bg-white px-3 py-3 text-[13px]">
        <b className="mr-2 font-medium text-ink">Brief:</b>
        <textarea
          value={value.brief}
          onChange={(event) => update({ brief: event.target.value })}
          placeholder="Add a brief: key messages, hook, do’s and don’ts, references (optional)"
          className="min-h-[44px] w-full resize-none bg-transparent text-[13px] text-ink outline-none placeholder:text-tertiary"
        />
      </label>
    </div>
  );
}

function CycleSchedule({ fee }: { fee: number }) {
  const cycles = [
    ["Cycle 1 · 2 Nov – 1 Dec", "10, 15, 28 Nov · paid now"],
    ["Cycle 2 · 2 Dec – 1 Jan", "10, 15, 28 Dec"],
    ["Cycle 3 · 2 Jan – 31 Jan", "10, 15, 28 Jan · ends with project"],
  ];

  return (
    <div className="mt-3 rounded-lg border border-primary bg-primary-subtle/45 p-3">
      <p className="text-[12px] text-secondary">
        Same 3 deliverables, dates moved one cycle. You can edit or stop any
        time, even after the creator accepts.
      </p>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {cycles.map(([title, detail]) => (
          <div
            key={title}
            className="rounded-md border border-line bg-white px-3 py-2"
          >
            <p className="text-[13px] font-medium text-ink">{title}</p>
            <p className="mt-1 text-[12px] text-secondary">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-md border border-warning bg-warning-bg/45 px-3 py-2.5">
        <p className="text-[13px] font-medium text-ink">
          You’ll be charged at the start of every cycle
        </p>
        <p className="mt-1 text-[12px] leading-4 text-secondary">
          ₹{fee.toLocaleString("en-IN")} is charged into escrow on 2 Dec and 2
          Jan. Each cycle’s UTM links and coupon codes are generated
          automatically and sent to the creator.
        </p>
      </div>
    </div>
  );
}

const reviewDateRange = (entries: Deliverable[]) => {
  const dates = entries
    .map((entry) => entry.deadline)
    .filter(Boolean)
    .sort();
  if (!dates.length) return "Dates to be set";
  const format = (iso: string) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(new Date(`${iso}T00:00:00`));
  return dates[0] === dates[dates.length - 1]
    ? format(dates[0])
    : `${format(dates[0])} – ${format(dates[dates.length - 1])}`;
};

function Review({
  entries,
  recurring,
  payWith,
  onPayWith,
  agreement,
  onAgreementChange,
  edit,
  send,
}: {
  entries: Deliverable[];
  recurring: boolean;
  payWith: string;
  onPayWith: (value: string) => void;
  agreement: boolean;
  onAgreementChange: (value: boolean) => void;
  edit: () => void;
  send: () => void;
}) {
  const fee = entries.reduce(
    (total, entry) => total + Number(entry.fee || 0),
    0,
  );
  const gst = Math.round(fee * 0.18);
  const chargedNow = fee + gst;
  const deliverySummary = recurring
    ? `Cycle 1 · 2 Nov – 1 Dec · ${entries.length} deliverable${entries.length === 1 ? "" : "s"} · creator fee`
    : `${entries.length} deliverable${entries.length === 1 ? "" : "s"} · ${reviewDateRange(entries)} · creator fee`;
  const agreementTitle = recurring
    ? "I agree to be charged at the start of every cycle until 31 Jan 2027"
    : "I agree to pay for this one-time collaboration";
  const agreementDetail = recurring
    ? `₹${chargedNow.toLocaleString("en-IN")} on 2 Dec and 2 Jan, held in escrow and released to the creator only after you approve that cycle’s content. If a payment fails, the cycle is delayed and work is paused until you pay. You can edit or stop repeating any time.`
    : `₹${chargedNow.toLocaleString("en-IN")} is held in escrow and released to the creator only after you approve the agreed deliverables.`;
  const paymentMethods = [
    {
      value: "UPI AutoPay · minimalist@okhdfcbank",
      detail:
        "Mandate up to ₹16,000 a cycle · approve once in your UPI app · covers fee changes",
      icon: (
        <span className="grid size-5 place-items-center rounded-full bg-primary text-white">
          <Smartphone size={13} />
        </span>
      ),
    },
    {
      value: "Visa •••• 4242",
      detail: "Card auto-charged at each cycle start · expires 08/28",
      icon: <CreditCard size={18} className="text-secondary" />,
    },
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="p-5">
        <div className="overflow-hidden rounded-lg border border-line">
          <div className="space-y-4 px-3.5 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
              <p className="text-secondary">{deliverySummary}</p>
              <p className="font-medium text-ink">
                ₹{fee.toLocaleString("en-IN")}
              </p>
            </div>
            <div className={recurring ? "flex items-center justify-between gap-3 text-[13px]" : "hidden"}>
              <p className="text-secondary">Floooww fee</p>
              <p className="text-ink">Free</p>
            </div>
            <div className="flex items-center justify-between gap-3 text-[13px]">
              <p className="text-secondary">GST (18%)</p>
              <p className="text-ink">₹{gst.toLocaleString("en-IN")}</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line bg-subtle px-3.5 py-3 text-[14px] font-medium text-ink">
            <span>{recurring ? "Charged now · cycle 1" : "Charged now"}</span>
            <span>₹{chargedNow.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <label
          className={`mt-5 flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 ${agreement ? "border-primary bg-primary-subtle/45" : "border-line bg-white"}`}
        >
          <input
            type="checkbox"
            checked={agreement}
            onChange={(event) => onAgreementChange(event.target.checked)}
            className="mt-0.5 size-4 accent-primary"
          />
          <span>
            <span className="block text-[14px] font-medium text-ink">
              {agreementTitle}
            </span>
            <span className="mt-1 block text-[12px] leading-4 text-secondary">
              {agreementDetail}
            </span>
          </span>
        </label>

        <section className="mt-4">
          <p className="text-[12px] text-secondary">Pay with</p>
          <div className="mt-3 overflow-hidden rounded-lg border border-line">
            {paymentMethods.map((method) => {
              const selected = payWith === method.value;
              return (
                <button
                  type="button"
                  key={method.value}
                  onClick={() => onPayWith(method.value)}
                  className={`flex w-full items-start gap-3 px-3 py-3 text-left transition ${selected ? "bg-primary-subtle/70" : "bg-white hover:bg-subtle"}`}
                >
                  <span
                    className={`mt-1 grid size-[18px] place-items-center rounded-full border-2 ${selected ? "border-primary" : "border-line-strong"}`}
                  >
                    {selected ? (
                      <span className="size-2 rounded-full bg-primary" />
                    ) : null}
                  </span>
                  <span className="flex size-5 shrink-0 items-center justify-center">
                    {method.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-medium text-ink">
                      {method.value}
                    </span>
                    <span className="mt-1 block text-[12px] leading-4 text-secondary">
                      {method.detail}
                    </span>
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              className="flex h-9 w-full items-center gap-2 border-t border-line px-3 text-[13px] font-medium text-ink hover:bg-subtle"
            >
              <Plus size={16} className="text-primary" />
              Add another payment method
            </button>
          </div>
        </section>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-subtle/60 px-5 py-4">
        <div>
          <p className="text-[14px] font-medium text-ink">
            {recurring
              ? `Today ₹${chargedNow.toLocaleString("en-IN")} · then ₹${chargedNow.toLocaleString("en-IN")} on 2 Dec and 2 Jan`
              : `Today ₹${chargedNow.toLocaleString("en-IN")}`}
          </p>
          <p className="mt-1 text-[12px] text-secondary">
            {recurring
              ? `₹${(chargedNow * 3).toLocaleString("en-IN")} over 3 cycles · GST invoice each cycle`
              : "One-time charge · GST invoice included"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            kind="secondary"
            onClick={edit}
            leadingIcon={<ChevronLeft size={16} />}
          >
            Back
          </Button>
          <Button
            disabled={!agreement || !payWith}
            onClick={send}
            leadingIcon={<Send size={16} />}
          >
            Pay ₹{chargedNow.toLocaleString("en-IN")} &amp; send invite
          </Button>
        </div>
      </footer>
    </section>
  );
}

export function BrandCreatorInvitePage() {
  const { projectId = "1", creatorId = "diya" } = useParams();
  const navigate = useNavigate();
  const creator = useMemo(() => getCreatorProfile(creatorId), [creatorId]);
  const [step, setStep] = useState<Step>("setup");
  const [entries, setEntries] = useState<Deliverable[]>([blank(1)]);
  const [repeat, setRepeat] = useState(false);
  const [payWith, setPayWith] = useState("UPI AutoPay · minimalist@okhdfcbank");
  const [agreement, setAgreement] = useState(true);
  const valid = entries.some(
    (entry) => entry.type && entry.platform && entry.deadline,
  );
  const fee = entries.reduce(
    (total, entry) => total + Number(entry.fee || 0),
    0,
  );
  const update = (id: number, next: Deliverable) =>
    setEntries((current) =>
      current.map((entry) => (entry.id === id ? next : entry)),
    );
  const remove = (id: number) =>
    setEntries((current) =>
      current.length === 1
        ? [blank(1)]
        : current.filter((entry) => entry.id !== id),
    );
  const ready = entries.filter(
    (entry) => entry.type && entry.platform && entry.deadline,
  );
  const readyFee = ready.reduce(
    (total, entry) => total + Number(entry.fee || 0),
    0,
  );
  const sentCharge = readyFee + Math.round(readyFee * 0.18);
  const sentProjectName = repeat ? "Glow Squad" : "Vitamin-C Serum";
  const oneTimeDueDate = reviewDateRange(ready);
  return (
    <BrandShell>
      <div className="w-full pb-10">
        <nav className="flex flex-wrap items-center gap-2 text-[12px] text-secondary">
          <Link to="/brand/projects">Projects</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Vitamin-C Serum</Link>
          <span>/</span>
          <Link to={brandProjectRoute(projectId)}>Applications</Link>
          <span>/</span>
          <Link
            to={brandCreatorProfileRoute(projectId, creator.handle.slice(1))}
          >
            {creator.name}
          </Link>
          <span>/</span>
          <span className="text-ink">Invite</span>
        </nav>
        {step === "sent" ? (
          <header className="mt-2">
            <h1 className="text-[28px] font-semibold leading-8 text-ink">
              Invite sent to {creator.name}
            </h1>
            <p className="mt-1 text-[13px] text-secondary">
              {creator.handle} · {creator.city} · Instagram 1.54 L · {sentProjectName}
            </p>
          </header>
        ) : (
          <header className="mt-2 flex items-center gap-3">
            <img
              src={`/assets/creators/${creator.avatar}.png`}
              alt=""
              className="size-9 rounded-full object-cover"
            />
            <div>
              <h1 className="text-[28px] font-semibold leading-8 text-ink">
                Invite {creator.name}
              </h1>
              <p className="mt-1 text-[13px] text-secondary">
                {creator.handle} · {creator.city} · {creator.match}% match for
                Vitamin-C Serum
              </p>
            </div>
          </header>
        )}
        {step !== "sent" ? (
          <div className="mt-5">
            <Stepper step={step} />
          </div>
        ) : null}
        <div className="mt-5">
          {step === "setup" ? (
            <section className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="p-5">
                <div className="flex flex-wrap justify-between gap-3 rounded-lg bg-subtle px-4 py-3.5">
                  <div>
                    <h2 className="text-[14px] font-semibold text-ink">
                      Vitamin-C Serum
                    </h2>
                    <p className="mt-1 text-[12px] text-secondary">
                      Influencer · Paid · Long-term
                    </p>
                    <p className="mt-3 text-[12px] text-secondary">Dates</p>
                    <p className="mt-1 text-[13px] text-ink">
                      1 Aug 2026 – 31 Jan 2027 · 3 months left
                    </p>
                  </div>
                  <span className="h-fit rounded-full bg-success-bg px-2 py-0.5 text-[12px] font-medium text-success">
                    • Live · month 4 of 6
                  </span>
                </div>
                <div className="mt-5">
                  <h2 className="text-[14px] font-semibold text-ink">
                    {valid
                      ? "Cycle 1 · 2 Nov – 1 Dec 2026 · deliverables"
                      : "Cycle 1 deliverables"}
                  </h2>
                  <p className="mt-1 text-[12px] text-secondary">
                    {valid
                      ? `A cycle starts the day ${creator.name.split(" ")[0]} accepts and runs to the same date next month, so a deadline near month-end stays in one cycle.`
                      : `This cycle starts when ${creator.name.split(" ")[0]} accepts and runs to the same date next month.`}
                  </p>
                  <div className="mt-4 overflow-x-auto rounded-lg border border-line">
                    <div className="min-w-[960px]">
                      <div className="grid grid-cols-[minmax(190px,1.4fr)_150px_150px_minmax(150px,1fr)_minmax(160px,1fr)_32px] gap-2 bg-subtle px-4 py-3 text-[12px] text-secondary">
                        <span>Deliverable</span>
                        <span>Platform</span>
                        <span>Deadline</span>
                        <span>Tracking link</span>
                        <span>Coupon code</span>
                        <span />
                      </div>
                      {entries.map((entry, index) => (
                        <FieldRow
                          key={entry.id}
                          value={entry}
                          position={index + 1}
                          creatorName={creator.name}
                          onChange={(next) => update(entry.id, next)}
                          remove={() => remove(entry.id)}
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setEntries((current) => [
                            ...current,
                            blank(Date.now()),
                          ])
                        }
                        className="flex h-12 items-center gap-2 px-4 text-[13px] font-medium text-primary hover:bg-primary-subtle"
                      >
                        <Plus size={16} />
                        Add deliverable
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-[12px] text-secondary">
                    A tracking link and coupon are made for each deliverable
                    once you pick its platform.
                  </p>
                  <div
                    role="group"
                    onClick={() => setRepeat((current) => !current)}
                    className={`mt-5 flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 ${repeat ? "border-primary bg-primary-subtle/45" : "border-line"}`}
                  >
                    <button
                      type="button"
                      role="switch"
                      aria-checked={repeat}
                      aria-label="Repeat deliverables every cycle"
                      onClick={(event) => {
                        event.stopPropagation();
                        setRepeat((current) => !current);
                      }}
                      className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${repeat ? "bg-primary" : "bg-muted"}`}
                    >
                      <span
                        className={`size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${repeat ? "translate-x-4" : "translate-x-0"}`}
                      />
                    </button>
                    <span>
                      <span className="block text-[14px] font-medium text-ink">
                        Repeat these deliverables every cycle until the project
                        ends
                      </span>
                      <span className="mt-1 block text-[12px] text-secondary">
                        {repeat
                          ? "These deliverables will repeat and be funded at the start of each cycle once you add them."
                          : "Turn on to repeat these deliverables in every cycle until 31 Jan 2027."}
                      </span>
                    </span>
                  </div>
                  {repeat && valid ? <CycleSchedule fee={fee} /> : null}
                  <div className="mt-4 rounded-lg bg-subtle px-3 py-3">
                    <p className="text-[14px] font-medium text-ink">
                      Fee per cycle: ₹{fee.toLocaleString("en-IN")}
                    </p>
                    <p className="mt-1 text-[12px] text-secondary">
                      {repeat && valid
                        ? "Reel ₹7,500 + 2 Stories × ₹2,500 · adds up from each deliverable"
                        : "Adds up from the fee on each deliverable"}
                    </p>
                  </div>
                </div>
              </div>
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-subtle/60 px-5 py-4">
                <div>
                  <p className="text-[14px] font-medium text-ink">
                    {valid
                      ? repeat
                        ? `${ready.length} deliverables a cycle × 3 cycles`
                        : `${ready.length} deliverable${ready.length === 1 ? "" : "s"} ready`
                      : "No deliverables yet"}
                  </p>
                  <p className="mt-1 text-[12px] text-secondary">
                    {valid
                      ? repeat
                        ? `₹${fee.toLocaleString("en-IN")} a cycle · ₹${(fee * 3).toLocaleString("en-IN")} in creator fees`
                        : "Deadlines can be edited later."
                      : "Add at least one complete deliverable to continue"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button kind="secondary" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button
                    disabled={!valid}
                    onClick={() => setStep("review")}
                    trailingIcon={<ArrowRight size={16} />}
                  >
                    Next: review &amp; pay
                  </Button>
                </div>
              </footer>
            </section>
          ) : step === "review" ? (
            <Review
              entries={ready}
              recurring={repeat}
              payWith={payWith}
              onPayWith={setPayWith}
              agreement={agreement}
              onAgreementChange={setAgreement}
              edit={() => setStep("setup")}
              send={() => {
                window.sessionStorage.setItem(
                  `floooww-project-${projectId}-invited`,
                  "true",
                );
                setStep("sent");
              }}
            />
          ) : (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-xl border border-line bg-white"
            >
              <div className="p-5">
                <div className="grid size-14 place-items-center rounded-full bg-success-bg text-success">
                  <span className="grid size-6 place-items-center rounded-full border-2 border-success">
                    <Check size={15} strokeWidth={3} />
                  </span>
                </div>
                <p className="mt-4 text-[13px] text-secondary">
                  {repeat
                    ? `₹${sentCharge.toLocaleString("en-IN")} paid for cycle 1 · held until you approve the content`
                    : `₹${sentCharge.toLocaleString("en-IN")} paid · held in escrow until you approve the content`}
                </p>
                {repeat ? <div className="mt-4 grid gap-2 md:grid-cols-3">
                  {[
                    [
                      "Cycle 1 · 2 Nov – 1 Dec",
                      `Paid · ₹${sentCharge.toLocaleString("en-IN")} held`,
                      "success",
                    ],
                    [
                      "Cycle 2 · 2 Dec – 1 Jan",
                      `Charged 2 Dec · ₹${sentCharge.toLocaleString("en-IN")}`,
                      "neutral",
                    ],
                    [
                      "Cycle 3 · 2 Jan – 31 Jan",
                      `Charged 2 Jan · ₹${sentCharge.toLocaleString("en-IN")}`,
                      "neutral",
                    ],
                  ].map(([title, detail, tone]) => (
                    <div
                      key={title}
                      className="rounded-lg border border-line bg-white px-3 py-3"
                    >
                      <p className="text-[14px] font-medium text-ink">
                        {title}
                      </p>
                      <span
                        className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[12px] font-medium ${tone === "success" ? "bg-success-bg text-success" : "bg-neutral-bg text-neutral"}`}
                      >
                        • {detail}
                      </span>
                    </div>
                  ))}
                </div> : null}
                <section className="mt-4 rounded-lg bg-subtle px-4 py-3">
                  <h2 className="text-[14px] font-medium text-ink">
                    What happens next
                  </h2>
                  <ul className="mt-3 space-y-2 text-[12px] leading-4 text-secondary">
                    <li className="flex gap-2">
                      <Check size={14} className="shrink-0 text-success" />
                      {creator.name.split(" ")[0]} gets the invite, project
                      details, brief, links and coupon in Messages.
                    </li>
                    <li className="flex gap-2">
                      <Check size={14} className="shrink-0 text-success" />
                      The creator has 48 hours to accept. If not accepted,
                      ₹{sentCharge.toLocaleString("en-IN")} is refunded automatically.
                    </li>
                    <li className="flex gap-2">
                      <Check size={14} className="shrink-0 text-success" />
                      {repeat
                        ? "On 2 Dec and 2 Jan you’re charged automatically. If a payment fails, the cycle is delayed and work is paused until you pay."
                        : `${creator.name.split(" ")[0]} posts each deliverable by ${oneTimeDueDate}. Payment is released when you approve the content.`}
                    </li>
                  </ul>
                </section>
              </div>
              <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-subtle/70 px-5 py-4">
                <div>
                  <p className="text-[14px] font-medium text-ink">
                    {repeat
                      ? "Glow Squad · 7 creators invited"
                      : "Vitamin-C Serum · 17 creators invited"}
                  </p>
                  <p className="mt-1 text-[12px] text-secondary">
                    {repeat
                      ? "Budget now ₹4,87,500 for the project"
                      : "Budget now ₹21,500 committed for the project"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    kind="secondary"
                    onClick={() => navigate(brandProjectRoute(projectId))}
                  >
                    Done
                  </Button>
                  <Button
                    onClick={() => {
                      window.sessionStorage.setItem(
                        `floooww-project-${projectId}-active-tab`,
                        "Invited creators",
                      );
                      navigate(brandProjectRoute(projectId));
                    }}
                    trailingIcon={<ArrowRight size={16} />}
                  >
                    View invited creators
                  </Button>
                </div>
              </footer>
            </motion.section>
          )}
        </div>
      </div>
    </BrandShell>
  );
}
