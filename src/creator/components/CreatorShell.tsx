import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  FolderKanban,
  Home,
  Image,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";
import { Logo } from "@/common/components/brand/Logo";
import { ROUTES } from "@/common/constants/routes";

type CreatorShellProps = { children: ReactNode };

const projectLinks = [
  ["Invitations & offers", "4"],
  ["Applied", "2"],
  ["Active", "2"],
  ["Completed", "8"],
  ["Declined", "1"],
] as const;

function NavCount({ children }: { children: string }) {
  return (
    <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-muted px-1.5 text-[12px] font-medium leading-4 text-secondary">
      {children}
    </span>
  );
}

function CreatorSidebar({ close }: { close?: () => void }) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const { pathname } = useLocation();
  const navClass = "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-[14px] transition-colors";
  const overviewActive = pathname === ROUTES.creator;
  const discoveryActive = pathname === ROUTES.creatorProjects || pathname.startsWith(`${ROUTES.creatorProjects}/`);

  return (
    <aside className="flex h-full w-[260px] flex-col overflow-y-auto border-r border-line bg-white px-4 pb-4 pt-5">
      <div className="flex h-11 items-center justify-between">
        <Logo className="origin-left scale-[1.22]" />
        <button className="lg:hidden" onClick={close} type="button" aria-label="Close navigation"><X size={20} /></button>
      </div>
      <div className="h-4 shrink-0" />
      <button type="button" className="flex w-full items-center gap-2.5 rounded-xl border border-line p-2.5 text-left">
        <span className="grid size-8 place-items-center rounded-md bg-ink text-[12px] font-semibold text-white">IR</span>
        <span className="min-w-0 flex-1"><span className="block truncate text-[14px] font-semibold leading-5 text-ink">Ishita Rao</span><span className="block truncate text-[12px] leading-4 text-tertiary">Creator workspace</span></span>
        <ChevronDown size={16} className="text-secondary" />
      </button>
      <nav className="mt-4 flex flex-col">
        <p className="px-3 pb-1.5 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">MAIN</p>
        <Link to={ROUTES.creator} className={`${navClass} ${overviewActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}><Home size={18} />Overview</Link>
        <Link to={ROUTES.creatorProjects} className={`${navClass} mt-0.5 ${discoveryActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}><Search size={18} />Project discovery</Link>
        <div className="mt-0.5">
          <button type="button" onClick={() => setProjectsOpen((value) => !value)} className={`${navClass} text-ink hover:bg-subtle`} aria-expanded={projectsOpen}><FolderKanban size={18} /><span className="flex-1 text-left">My projects</span><ChevronDown size={14} className={`transition-transform duration-200 ${projectsOpen ? "" : "-rotate-90"}`} /></button>
          {projectsOpen && <div>{projectLinks.map(([label, count]) => <button key={label} type="button" className="flex h-8 w-full items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] text-secondary transition-colors hover:bg-subtle"><span className="size-1 rounded-full bg-current" /><span className="flex-1 text-left">{label}</span><NavCount>{count}</NavCount></button>)}</div>}
        </div>
        <button type="button" className={`${navClass} text-ink hover:bg-subtle`}><Image size={18} /><span className="flex-1 text-left">Content</span><NavCount>5</NavCount></button>
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">CONTENT &amp; DATA</p>
        <button type="button" className={`${navClass} text-ink hover:bg-subtle`}><TrendingUp size={18} />Performance</button>
        <button type="button" className={`${navClass} text-ink hover:bg-subtle`}><WalletCards size={18} />Earnings</button>
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">ACCOUNT</p>
        <button type="button" className={`${navClass} text-ink hover:bg-subtle`}><MessageSquare size={18} /><span className="flex-1 text-left">Messages</span><NavCount>3</NavCount></button>
        <button type="button" className={`${navClass} text-ink hover:bg-subtle`}><Settings size={18} />Settings</button>
      </nav>
      <div className="mt-auto border-t border-line pt-2">
        <button type="button" className={`${navClass} text-ink hover:bg-subtle`}><CircleHelp size={18} />Help centre</button>
        <button type="button" className={`${navClass} text-ink hover:bg-subtle`}><LogOut size={18} />Logout</button>
      </div>
    </aside>
  );
}

export function CreatorShell({ children }: CreatorShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-page">
      <div className="flex min-h-dvh">
        <div className="sticky top-0 hidden h-dvh shrink-0 self-start lg:block"><CreatorSidebar /></div>
        {menuOpen && <div className="fixed inset-0 z-50 bg-ink/30 lg:hidden"><CreatorSidebar close={() => setMenuOpen(false)} /></div>}
        <div className="min-w-0 flex-1">
          <header className="flex h-16 items-center gap-3 border-b border-line bg-white px-5 sm:px-8">
            <button type="button" onClick={() => setMenuOpen(true)} className="lg:hidden" aria-label="Open navigation"><Menu size={20} /></button>
            <button type="button" className="hidden h-9 w-[380px] items-center gap-2 rounded-md border border-line bg-subtle px-3 text-left md:flex"><Search size={16} className="text-secondary" /><span className="flex-1 text-[13px] text-tertiary">Search projects, messages, content...</span><kbd className="rounded border border-line bg-white px-1.5 text-[12px] text-tertiary">⌘K</kbd></button>
            <div className="flex-1" />
            <button type="button" className="grid size-9 place-items-center rounded-md border border-line text-secondary" aria-label="Notifications"><Bell size={18} /></button>
            <span className="grid size-8 place-items-center rounded-full bg-primary-muted text-[12px] font-medium text-primary">IR</span>
            <div className="hidden sm:block"><p className="text-[14px] font-semibold leading-5 text-ink">Ishita Rao</p><p className="text-[12px] leading-4 text-tertiary">Creator</p></div><ChevronDown size={14} className="hidden text-secondary sm:block" />
          </header>
          <main className="min-h-[calc(100dvh-64px)] p-5 sm:p-8">{children}</main>
        </div>
      </div>
      <button type="button" aria-label="Open Kreyio Assistant" className="fixed bottom-6 right-6 z-20 grid size-14 place-items-center rounded-full bg-ink text-white shadow-[0_16px_40px_-8px_rgba(8,10,20,.14)]"><MessageSquare size={24} /></button>
    </div>
  );
}
