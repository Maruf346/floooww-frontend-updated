import { type ReactNode, useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  FileBarChart,
  Home,
  Image,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Wallet,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/common/components/brand/Logo";
import { ROUTES } from "@/common/constants/routes";

const projectFilters: [string, string?][] = [
  ["Live", "5"],
  ["Upcoming", "1"],
  ["Completed", "3"],
  ["Drafts", "2"],
  ["Paused"],
  ["Archived"],
  ["Deleted"],
];

function Sidebar({ close }: { close?: () => void }) {
  const location = useLocation();
  const [projectsOpen, setProjectsOpen] = useState(true);
  const isNewProject = location.pathname === ROUTES.brandNewProject;
  const isProjects = location.pathname === ROUTES.brandProjects;
  const isOverview = location.pathname === ROUTES.brand;
  const closeMenu = () => close?.();
  const topLink = (active: boolean) =>
    active ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle";

  return (
    <aside className="flex h-full w-[260px] flex-col overflow-y-auto border-r border-line bg-white px-4 pb-4 pt-5">
      <div className="flex h-11 items-center justify-between">
        <Logo className="origin-left scale-[1.22]" />
        <button type="button" onClick={closeMenu} className="lg:hidden">
          <X size={20} />
        </button>
      </div>
      <div className="h-4 shrink-0" />
      <nav className="flex flex-col">
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">
          MAIN
        </p>
        <Link
          to={ROUTES.brand}
          onClick={closeMenu}
          className={
            "flex h-9 items-center gap-2.5 rounded-md px-3 text-[14px] " + topLink(isOverview)
          }
        >
          <Home size={18} />
          <span>Overview</span>
        </Link>
        <div className="mt-0.5">
          <button
            type="button"
            onClick={() => setProjectsOpen((isOpen) => !isOpen)}
            aria-expanded={projectsOpen}
            aria-controls="brand-projects-menu"
            className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] font-normal leading-[22px] text-ink transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <ClipboardList size={18} />
            <span className="flex-1">Projects</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${projectsOpen ? "" : "-rotate-90"}`}
            />
          </button>
          {projectsOpen && (
            <div id="brand-projects-menu">
              <Link
                to={ROUTES.brandNewProject}
                onClick={closeMenu}
                className={
                  isNewProject
                    ? "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] font-medium text-primary"
                    : "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] text-secondary hover:bg-subtle"
                }
              >
                <span className="size-1 rounded-full bg-current" />
                Create new project
              </Link>
              <Link
                to={ROUTES.brandProjects}
                onClick={closeMenu}
                className={
                  isProjects && !location.search
                    ? "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] font-medium text-primary"
                    : "flex h-8 items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] text-secondary hover:bg-subtle"
                }
              >
                <span className="size-1 rounded-full bg-current" />
                <span className="flex-1">All projects</span>
                <Count value="11" />
              </Link>
              {projectFilters.map(([label, count]) => (
                <Link
                  to={`${ROUTES.brandProjects}?status=${encodeURIComponent(label)}`}
                  onClick={closeMenu}
                  key={label}
                  className={
                    location.pathname === ROUTES.brandProjects &&
                    new URLSearchParams(location.search).get("status") === label
                      ? "flex h-8 items-center gap-2.5 rounded-md px-3 pl-[58px] text-[13px] font-medium text-primary"
                      : "flex h-8 items-center gap-2.5 rounded-md px-3 pl-[58px] text-[13px] text-secondary hover:bg-subtle"
                  }
                >
                  <span className="size-1 rounded-full bg-current" />
                  <span className="flex-1">{label}</span>
                  {count && <Count value={count} />}
                </Link>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          className="mt-0.5 flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] hover:bg-subtle"
        >
          <Search size={18} />
          <span>Creator discovery</span>
        </button>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] hover:bg-subtle"
        >
          <Image size={18} />
          <span className="flex-1">Content hub</span>
          <Count value="7" />
        </button>
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">
          CONTENT &amp; DATA
        </p>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] hover:bg-subtle"
        >
          <FileBarChart size={18} />
          Custom reports
        </button>
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">
          ACCOUNT
        </p>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] hover:bg-subtle"
        >
          <Wallet size={18} />
          <span className="flex-1">Payments</span>
          <Count value="2" />
        </button>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] hover:bg-subtle"
        >
          <MessageSquare size={18} />
          <span className="flex-1">Messages</span>
          <Count value="4" />
        </button>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-left text-[14px] hover:bg-subtle"
        >
          <Settings size={18} />
          Settings
        </button>
      </nav>
      <div className="mt-auto border-t border-line pt-2">
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 px-3 text-[14px] hover:bg-subtle"
        >
          <CircleHelp size={18} />
          Help centre
        </button>
        <button
          type="button"
          className="flex h-9 w-full items-center gap-2.5 px-3 text-[14px] hover:bg-subtle"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function Count({ value }: { value: string }) {
  return (
    <span className="inline-flex h-[18px] items-center rounded-full bg-muted px-1.5 text-[12px] font-medium leading-4 text-secondary">
      {value}
    </span>
  );
}

function Topbar({ open }: { open: () => void }) {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-line bg-white px-4 sm:px-8">
      <button type="button" onClick={open} className="lg:hidden">
        <Menu size={20} />
      </button>
      <div className="hidden h-9 w-[380px] items-center gap-2 rounded-md border border-line bg-subtle px-3 md:flex">
        <Search size={16} />
        <span className="flex-1 text-[13px] text-tertiary">
          Search projects, creators, content...
        </span>
        <kbd className="rounded border border-line bg-white px-1.5 text-[12px] text-tertiary">
          Cmd K
        </kbd>
      </div>
      <div className="flex-1" />
      <button
        type="button"
        className="flex size-9 items-center justify-center rounded-md border border-line"
      >
        <Bell size={18} />
      </button>
      <span className="flex size-8 items-center justify-center rounded-full bg-primary-muted text-[12px] font-medium text-primary">
        AM
      </span>
      <div className="hidden sm:block">
        <p className="text-[14px] font-semibold">Ananya Mehta</p>
        <p className="text-[12px] text-tertiary">Owner - Minimalist</p>
      </div>
    </header>
  );
}

export function BrandShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-page">
      <div className="flex min-h-dvh">
        <div className="sticky top-0 hidden h-dvh shrink-0 self-start lg:block">
          <Sidebar />
        </div>
        {open && (
          <div className="fixed inset-0 z-50 bg-ink/30 lg:hidden">
            <div className="h-full w-[260px] bg-white">
              <Sidebar close={() => setOpen(false)} />
            </div>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <Topbar open={() => setOpen(true)} />
          <main className="min-h-[calc(100dvh-64px)] p-5 sm:p-8">{children}</main>
        </div>
      </div>
      <button
        type="button"
        className="fixed bottom-6 right-6 z-20 rounded-full bg-primary p-4 text-white shadow-[0_16px_40px_-8px_rgba(8,10,20,.14)]"
        aria-label="Open Floooww Assistant"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
