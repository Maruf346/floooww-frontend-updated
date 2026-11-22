import { useEffect, useState } from "react";
import { useLocation, useNavigation, useSearchParams } from "react-router-dom";
import { Footer } from "@/landing/components/layout/Footer";
import { Header } from "@/landing/components/layout/Header";
import { DashboardLoadingScreen } from "./DashboardLoadingScreen";

export { DashboardLoadingScreen };

export function isDashboardPath(path?: string): boolean {
  if (!path) return false;
  return (
    path.startsWith("/brand") ||
    path.startsWith("/creator") ||
    path.startsWith("/agency") ||
    path.startsWith("/dashboard") ||
    path.includes("dashboard")
  );
}

interface SkeletonProps {
  className?: string;
}

/** A neutral layout placeholder. It intentionally carries no content semantics. */
export function Skeleton({ className = "" }: SkeletonProps) {
  return <span aria-hidden="true" className={`skeleton-shimmer block bg-muted ${className}`} />;
}

/** WEB-L1: the responsive marketing-page loading layout. */
export function PageLoadingSkeleton() {
  return (
    <section
      aria-label="Loading page"
      aria-live="polite"
      className="flex flex-col items-center gap-10 px-5 py-16 sm:gap-14 sm:px-8 sm:py-24 lg:px-[120px] lg:py-24"
    >
      <div className="flex w-full max-w-[720px] flex-col items-center gap-4">
        <Skeleton className="h-[22px] w-[140px] rounded-full" />
        <Skeleton className="h-10 w-full rounded-[10px] sm:h-12" />
        <Skeleton className="h-10 w-[72%] rounded-[10px] sm:h-12" />
        <Skeleton className="h-[18px] w-[78%] rounded-lg" />
        <Skeleton className="h-[18px] w-[58%] rounded-lg" />
        <div className="flex gap-3 pt-3">
          <Skeleton className="h-12 w-32 rounded-xl sm:w-40" />
          <Skeleton className="h-12 w-28 rounded-xl sm:w-[140px]" />
        </div>
      </div>

      <div className="grid w-full max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {[0, 1, 2].map((card) => (
          <div key={card} className="overflow-hidden rounded-[20px] border border-muted">
            <Skeleton className="h-44 w-full rounded-none sm:h-[200px]" />
            <div className="flex flex-col gap-2.5 px-[22px] pt-3.5 pb-[22px]">
              <Skeleton className="h-5 w-[90px] rounded-full" />
              <Skeleton className="h-5 w-[85%] rounded-lg" />
              <Skeleton className="h-5 w-[65%] rounded-lg" />
              <Skeleton className="mt-0.5 h-3.5 w-[78%] rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 text-[14px] font-medium leading-[21px] text-secondary">
        <span aria-hidden="true" className="spinner-arc size-[18px]" />
        <span>Loading…</span>
      </div>
    </section>
  );
}

/**
 * Loading page route component that renders either:
 * - DashboardLoadingScreen (Figma 2007:230) for dashboards or when type=dashboard
 * - PageLoadingSkeleton for marketing / public pages
 */
export function AppLoadingRoute() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const type = searchParams.get("type");

  if (type === "dashboard" || type === "app" || isDashboardPath(location.pathname)) {
    return <DashboardLoadingScreen />;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageLoadingSkeleton />
      </main>
      <Footer />
    </div>
  );
}

/**
 * Router fallback that remains visually quiet for fast transitions. A skeleton
 * appears only when the pending page has exceeded the 300 ms design threshold.
 */
export function DelayedPageLoading() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    const isDash = isDashboardPath(location.pathname);
    return <div className={`min-h-dvh ${isDash ? "bg-[#f6f8fb]" : "bg-white"}`} aria-hidden="true" />;
  }

  if (isDashboardPath(location.pathname)) {
    return <DashboardLoadingScreen />;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageLoadingSkeleton />
      </main>
      <Footer />
    </div>
  );
}

/** Displays the appropriate loading fallback for lazy route transitions after the 250 ms threshold. */
export function NavigationLoadingOverlay() {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 250);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

  if (!visible) return null;

  // Check target navigation path, fallback to current path
  const targetPath = navigation.location?.pathname || location.pathname;

  if (isDashboardPath(targetPath)) {
    return (
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#f6f8fb]">
        <DashboardLoadingScreen />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">
          <PageLoadingSkeleton />
        </main>
        <Footer />
      </div>
    </div>
  );
}
