import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import { CreatorLogoutModal } from "./CreatorLogoutModal";

type CreatorShellProps = { children: ReactNode };

const projectLinks = [
  ["Invitations & offers", "4", "invitations"],
  ["Applied", "3", "applied"],
  ["Live", "2", "live"],
  ["Completed", "7", "completed"],
  ["Declined", "3", "declined"],
] as const;

function NavCount({ children, active = false }: { children: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 text-[12px] font-medium leading-4 transition-colors ${
        active
          ? "bg-primary-muted text-primary font-semibold"
          : "bg-muted text-secondary"
      }`}
    >
      {children}
    </span>
  );
}

function CreatorSidebar({ close, onLogout }: { close?: () => void; onLogout: () => void }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const myProjectsActive =
    pathname === ROUTES.creatorMyProjects ||
    pathname.startsWith(`${ROUTES.creatorMyProjects}/`) ||
    pathname.startsWith("/creator/project/");

  const [projectsOpen, setProjectsOpen] = useState(myProjectsActive);

  // Automatically close My Projects dropdown when navigating to any other route
  useEffect(() => {
    if (!myProjectsActive) {
      setProjectsOpen(false);
    }
  }, [pathname, myProjectsActive]);

  const navClass = "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-[14px] transition-colors";
  const overviewActive = pathname === ROUTES.creator;
  const discoveryActive = pathname === ROUTES.creatorProjects || pathname.startsWith(`${ROUTES.creatorProjects}/`);
  const contentActive = pathname === ROUTES.creatorContent;
  const performanceActive = pathname === ROUTES.creatorPerformance;
  const earningsActive = pathname === ROUTES.creatorEarnings;
  const messagesActive = pathname === ROUTES.creatorMessages;
  const settingsActive = pathname === ROUTES.creatorSettings;
  const helpActive = pathname === ROUTES.creatorHelp;

  const currentTab = (searchParams.get("tab") || (myProjectsActive ? "invitations" : "")).toLowerCase();

  const handleOtherNavClick = () => {
    setProjectsOpen(false);
    close?.();
  };

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
        <Link to={ROUTES.creator} onClick={handleOtherNavClick} className={`${navClass} ${overviewActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}><Home size={18} />Overview</Link>
        <Link to={ROUTES.creatorProjects} onClick={handleOtherNavClick} className={`${navClass} mt-0.5 ${discoveryActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}><Search size={18} />Project discovery</Link>
        
        {/* Foldable My Projects Item */}
        <div className="mt-0.5">
          <div
            onClick={() => {
              if (!myProjectsActive) {
                navigate(ROUTES.creatorMyProjects);
                setProjectsOpen(true);
                close?.();
              } else {
                setProjectsOpen((prev) => !prev);
              }
            }}
            className={`flex h-9 w-full items-center justify-between rounded-md px-3 text-[14px] transition-colors cursor-pointer select-none ${
              myProjectsActive
                ? "bg-primary-subtle font-semibold text-primary"
                : "text-ink hover:bg-subtle"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <FolderKanban size={18} className="shrink-0" />
              <span className="truncate text-left flex-1">My projects</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setProjectsOpen((prev) => !prev);
              }}
              className="p-1 text-secondary hover:text-ink cursor-pointer shrink-0 rounded hover:bg-black/5"
              aria-label="Toggle My Projects menu"
              aria-expanded={projectsOpen}
            >
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  projectsOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
          </div>

          {projectsOpen && (
            <div className="mt-0.5 flex flex-col gap-0.5 animate-in fade-in duration-150">
              {projectLinks.map(([label, count, tabKey]) => {
                const isSubActive =
                  myProjectsActive &&
                  (currentTab === tabKey || (tabKey === "live" && currentTab === "active"));
                return (
                  <Link
                    key={label}
                    to={`${ROUTES.creatorMyProjects}?tab=${tabKey}`}
                    onClick={close}
                    className={`flex h-8 w-full items-center gap-2.5 rounded-md px-3 pl-10 text-[13px] transition-colors ${
                      isSubActive
                        ? "bg-[#f1f4ff] font-medium text-primary"
                        : "text-secondary hover:bg-subtle hover:text-ink"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        isSubActive ? "bg-[#014ef6]" : "bg-[#a3a3ac]"
                      }`}
                    />
                    <span className="flex-1 text-left">{label}</span>
                    <NavCount active={isSubActive}>{count}</NavCount>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <Link
          to={ROUTES.creatorContent}
          onClick={handleOtherNavClick}
          className={`${navClass} mt-0.5 ${contentActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}
        >
          <Image size={18} />
          <span className="flex-1 text-left">Content</span>
          <NavCount>18</NavCount>
        </Link>
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">CONTENT &amp; DATA</p>
        <Link
          to={ROUTES.creatorPerformance}
          onClick={handleOtherNavClick}
          className={`${navClass} mt-0.5 ${performanceActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}
        >
          <TrendingUp size={18} />
          <span className="flex-1 text-left">Performance</span>
        </Link>
        <Link
          to={ROUTES.creatorEarnings}
          onClick={handleOtherNavClick}
          className={`${navClass} mt-0.5 ${earningsActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}
        >
          <WalletCards size={18} />
          <span className="flex-1 text-left">Earnings</span>
        </Link>
        <p className="px-3 pb-1.5 pt-4 text-[12px] font-semibold leading-4 tracking-[.06em] text-tertiary">ACCOUNT</p>
        <Link
          to={ROUTES.creatorMessages}
          onClick={handleOtherNavClick}
          className={`${navClass} mt-0.5 ${messagesActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}
        >
          <MessageSquare size={18} />
          <span className="flex-1 text-left">Messages</span>
          <NavCount>1</NavCount>
        </Link>
        <Link
          to={ROUTES.creatorSettings}
          onClick={handleOtherNavClick}
          className={`${navClass} mt-0.5 ${settingsActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}
        >
          <Settings size={18} />
          <span className="flex-1 text-left">Settings</span>
        </Link>
      </nav>
      <div className="mt-auto border-t border-line pt-2">
        <Link
          to={ROUTES.creatorHelp}
          onClick={handleOtherNavClick}
          className={`${navClass} ${helpActive ? "bg-primary-subtle font-semibold text-primary" : "text-ink hover:bg-subtle"}`}
        >
          <CircleHelp size={18} />
          <span className="flex-1 text-left">Help centre</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            close?.();
            onLogout();
          }}
          className={`${navClass} text-ink hover:bg-subtle cursor-pointer`}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export function CreatorShell({ children }: CreatorShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    setLogoutModalOpen(false);
    navigate(ROUTES.login);
  };

  const isWhiteBg =
    pathname === ROUTES.creator ||
    pathname === ROUTES.creatorMyProjects ||
    pathname === ROUTES.creatorContent ||
    pathname === ROUTES.creatorPerformance ||
    pathname === ROUTES.creatorEarnings ||
    pathname === ROUTES.creatorMessages ||
    pathname === ROUTES.creatorSettings ||
    pathname === ROUTES.creatorHelp;

  return (
    <div className={`min-h-dvh ${isWhiteBg ? "bg-white" : "bg-page"}`}>
      <div className="flex min-h-dvh">
        <div className="sticky top-0 hidden h-dvh shrink-0 self-start lg:block">
          <CreatorSidebar onLogout={() => setLogoutModalOpen(true)} />
        </div>
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-ink/30 lg:hidden">
            <CreatorSidebar
              close={() => setMenuOpen(false)}
              onLogout={() => setLogoutModalOpen(true)}
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <header className="flex h-16 items-center gap-3 border-b border-line bg-white px-5 sm:px-8">
            <button type="button" onClick={() => setMenuOpen(true)} className="lg:hidden" aria-label="Open navigation"><Menu size={20} /></button>
            <button type="button" className="hidden h-9 w-[380px] items-center gap-2 rounded-md border border-line bg-subtle px-3 text-left md:flex"><Search size={16} className="text-secondary" /><span className="flex-1 text-[13px] text-tertiary">Search projects, messages, content...</span><kbd className="rounded border border-line bg-white px-1.5 text-[12px] text-tertiary">⌘K</kbd></button>
            <div className="flex-1" />
            <button type="button" className="grid size-9 place-items-center rounded-md border border-line text-secondary" aria-label="Notifications"><Bell size={18} /></button>
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-subtle transition text-left cursor-pointer"
              title="Click to manage account or log out"
            >
              <span className="grid size-8 place-items-center rounded-full bg-primary-muted text-[12px] font-medium text-primary">IR</span>
              <div className="hidden sm:block"><p className="text-[14px] font-semibold leading-5 text-ink">Ishita Rao</p><p className="text-[12px] leading-4 text-tertiary">Creator</p></div>
              <ChevronDown size={14} className="hidden text-secondary sm:block" />
            </button>
          </header>
          <main className={`min-h-[calc(100dvh-64px)] ${
            pathname === ROUTES.creatorPerformance ||
            pathname === ROUTES.creatorEarnings ||
            pathname === ROUTES.creatorMessages ||
            pathname === ROUTES.creatorMyProjects ||
            pathname === ROUTES.creatorContent
              ? "p-0 bg-white"
              : pathname === ROUTES.creatorHelp
                ? "pb-10 pt-7 px-5 sm:px-8 bg-white"
                : isWhiteBg
                  ? "p-5 sm:p-8 bg-white"
                  : "p-5 sm:p-8"
          }`}>{children}</main>
        </div>
      </div>

      <CreatorLogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
